from flask import Blueprint, request, jsonify, current_app
import stripe
from src.models.user import User
from src.models.payment import PaymentHistory
from src.utils.logger import logger
from datetime import datetime, timedelta

stripe_bp = Blueprint('stripe', __name__)

# Ensure tables exist
User.create_table_if_not_exists()
PaymentHistory.create_table_if_not_exists()

def get_subscription_end_date(interval: str, interval_count: int = 1) -> datetime:
    """Calculate subscription end date based on the plan interval"""
    now = datetime.utcnow()
    if interval == 'week':
        return now + timedelta(weeks=interval_count)
    elif interval == 'month':
        return now + timedelta(days=30 * interval_count)
    return now + timedelta(days=365 * interval_count)

@stripe_bp.route('/webhook', methods=['POST'])
def webhook():
    """Handle Stripe webhook events"""
    payload = request.get_data()
    sig_header = request.headers.get('Stripe-Signature')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, current_app.config['STRIPE_WEBHOOK_SECRET']
        )
    except ValueError as e:
        logger.error(f"Invalid payload in Stripe webhook: {str(e)}")
        return jsonify({'error': 'Invalid payload'}), 400
    except stripe.error.SignatureVerificationError as e:
        logger.error(f"Invalid Stripe signature: {str(e)}")
        return jsonify({'error': 'Invalid signature'}), 400

    logger.info(f"Received Stripe webhook event: {event['type']}")

    try:
        # Create payment history record
        payment = PaymentHistory(
            user_email=event['data']['object'].get('customer_details', {}).get('email'),
            stripe_event_id=event['id'],
            event_type=event['type']
        )

        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            customer_email = session['customer_details']['email']
            customer_id = session['customer']
            
            # Get the price ID and amount from the session
            line_items = stripe.checkout.Session.list_line_items(session['id'])
            price_id = line_items['data'][0]['price']['id']
            amount = line_items['data'][0]['amount_total'] / 100  # Convert from cents
            currency = line_items['data'][0]['currency']

            # Update payment record
            payment.amount = amount
            payment.currency = currency
            payment.status = 'completed'
            
            # Map price IDs to subscription types
            subscription_mapping = {
                'price_weekly_live': {
                    'status': 'active',
                    'plan': 'weekly_live',
                    'interval': 'week',
                    'interval_count': 1
                },
                'price_monthly_office': {
                    'status': 'active',
                    'plan': 'monthly_office',
                    'interval': 'month',
                    'interval_count': 1
                },
                'price_app_access': {
                    'status': 'active',
                    'plan': 'app_access',
                    'interval': 'month',
                    'interval_count': 1
                }
            }

            if price_id in subscription_mapping:
                subscription = subscription_mapping[price_id]
                end_date = get_subscription_end_date(
                    subscription['interval'],
                    subscription['interval_count']
                )

                # Update user subscription
                user = User.find_by_email(customer_email)
                if user:
                    user.update_subscription(
                        status=subscription['status'],
                        end_date=end_date,
                        plan=subscription['plan'],
                        payment_status='succeeded'
                    )
                    # Update Stripe customer ID if not already set
                    if not user.stripe_customer_id:
                        user.stripe_customer_id = customer_id
                        user.save()
                else:
                    logger.error(f"User not found for email: {customer_email}")

        elif event['type'] == 'customer.subscription.deleted':
            subscription = event['data']['object']
            customer = stripe.Customer.retrieve(subscription['customer'])
            payment.user_email = customer['email']
            payment.status = 'cancelled'
            
            # Update user subscription status
            user = User.find_by_email(customer['email'])
            if user:
                user.update_subscription(
                    status='cancelled',
                    payment_status='cancelled'
                )
            else:
                logger.error(f"User not found for customer: {customer['id']}")

        elif event['type'] == 'invoice.payment_failed':
            invoice = event['data']['object']
            customer = stripe.Customer.retrieve(invoice['customer'])
            payment.user_email = customer['email']
            payment.status = 'failed'
            payment.amount = invoice['amount_due'] / 100
            payment.currency = invoice['currency']
            
            # Update user payment status
            user = User.find_by_email(customer['email'])
            if user:
                user.update_subscription(
                    status=user.subscription_status,  # Keep current status
                    payment_status='failed'
                )
            else:
                logger.error(f"User not found for customer: {customer['id']}")

        # Save payment history
        payment.save()
        logger.info(f"Successfully processed {event['type']} event")
        
    except Exception as e:
        logger.error(f"Error processing Stripe webhook: {str(e)}")
        return jsonify({'error': str(e)}), 500

    return jsonify({'status': 'success'})

@stripe_bp.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    """Create a Stripe Checkout Session"""
    try:
        price_id = request.json.get('priceId')
        success_url = request.json.get('successUrl', 'http://localhost:3000/success')
        cancel_url = request.json.get('cancelUrl', 'http://localhost:3000/cancel')

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': price_id,
                'quantity': 1,
            }],
            mode='subscription',
            success_url=success_url,
            cancel_url=cancel_url,
        )

        return jsonify({'sessionId': checkout_session.id})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
