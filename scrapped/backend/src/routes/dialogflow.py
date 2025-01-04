from flask import Blueprint, request, jsonify, current_app
from src.models.user import User
from datetime import datetime
import json

dialogflow_bp = Blueprint('dialogflow', __name__)

def verify_user_subscription(email):
    """Verify if a user has an active subscription"""
    user = User.find_by_email(email)
    if not user:
        return False
    
    if not user.subscription_status:
        return False
    
    if user.subscription_end_date and user.subscription_end_date < datetime.utcnow():
        return False
    
    return True

@dialogflow_bp.route('/webhook', methods=['POST'])
def webhook():
    """Handle Dialogflow webhook requests"""
    try:
        data = request.json
        
        # Extract the user's email from the Dialogflow request
        user_email = None
        if 'originalDetectIntentRequest' in data:
            payload = data['originalDetectIntentRequest'].get('payload', {})
            if 'data' in payload and 'event' in payload['data']:
                # Extract email from Slack user info
                user_email = payload['data']['event'].get('user', {}).get('email')
        
        # Verify user has active subscription
        if not user_email or not verify_user_subscription(user_email):
            return jsonify({
                'fulfillmentText': 'Sorry, this feature requires an active subscription. Please visit our pricing page to subscribe.'
            })
        
        # Process the Dialogflow intent
        intent = data['queryResult']['intent']['displayName']
        parameters = data['queryResult']['parameters']
        
        # Handle different intents
        response = {
            'fulfillmentText': 'I received your request but I\'m not sure how to help with that yet.'
        }
        
        if intent == 'looker_help':
            response['fulfillmentText'] = 'I can help you with Looker! What specific aspect would you like to learn about?'
        
        elif intent == 'lookml_question':
            response['fulfillmentText'] = 'I can help you with LookML. What specific question do you have?'
        
        elif intent == 'check_subscription':
            user = User.find_by_email(user_email)
            if user and user.subscription_status:
                end_date = user.subscription_end_date.strftime('%Y-%m-%d') if user.subscription_end_date else 'ongoing'
                response['fulfillmentText'] = f'Your {user.subscription_status} subscription is active until {end_date}.'
            else:
                response['fulfillmentText'] = 'You don\'t have an active subscription.'
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({
            'fulfillmentText': 'Sorry, I encountered an error processing your request.'
        }), 500

@dialogflow_bp.route('/verify', methods=['POST'])
def verify_user():
    """Verify if a user has access to the Dialogflow bot"""
    try:
        data = request.json
        email = data.get('email')
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
            
        has_access = verify_user_subscription(email)
        
        return jsonify({
            'has_access': has_access,
            'message': 'User has active subscription' if has_access else 'No active subscription found'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
