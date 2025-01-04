from flask import Blueprint, request, jsonify, current_app, session
from google.oauth2 import id_token
from google.oauth2.credentials import Credentials
from google.auth.transport import requests
from google_auth_oauthlib.flow import Flow
from src.utils.oauth_helper import get_valid_credentials, create_credentials_from_flow
from src.utils.rate_limiter import rate_limit
from src.models.user import User
import jwt
from functools import wraps
from datetime import datetime, timedelta

auth_bp = Blueprint('auth', __name__)

def create_token(user_email):
    """Create a JWT token for the user"""
    payload = {
        'email': user_email,
        'exp': datetime.utcnow() + timedelta(days=1)
    }
    return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')

def token_required(require_subscription=False):
    """
    Decorator to protect routes with JWT and optionally verify subscription
    :param require_subscription: If True, checks if user has an active subscription
    """
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'message': 'Token is missing'}), 401

            try:
                token = token.split('Bearer ')[1]
                data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
                current_user = User.find_by_email(data['email'])
                
                if not current_user:
                    return jsonify({'message': 'User not found'}), 401
                
                if require_subscription:
                    if not current_user.subscription_status:
                        return jsonify({'message': 'Active subscription required'}), 403
                    
                    # Check if subscription is expired
                    if current_user.subscription_end_date and \
                       current_user.subscription_end_date < datetime.utcnow():
                        return jsonify({'message': 'Subscription expired'}), 403

            except Exception as e:
                return jsonify({'message': 'Token is invalid', 'error': str(e)}), 401

            return f(current_user, *args, **kwargs)
        return decorated
    return decorator

@auth_bp.route('/google', methods=['POST'])
@rate_limit('20/minute')  # Stricter rate limit for auth endpoints
def google_auth():
    """Handle Google OAuth code exchange and user authentication"""
    try:
        code = request.json.get('code')
        if not code:
            return jsonify({'message': 'Authorization code is required'}), 400

        try:
            # Configure OAuth 2.0 flow
            flow = Flow.from_client_config(
                current_app.config['GOOGLE_CLIENT_CONFIG'],
                scopes=['https://www.googleapis.com/auth/userinfo.email',
                       'https://www.googleapis.com/auth/userinfo.profile',
                       'https://www.googleapis.com/auth/calendar'],
                redirect_uri=current_app.config['GOOGLE_REDIRECT_URI']
            )

            # Exchange auth code for credentials
            flow.fetch_token(code=code)
            credentials = create_credentials_from_flow(flow)

            # Get user info using the access token
            request_session = requests.Request()
            token_info = id_token.verify_oauth2_token(
                credentials.id_token,
                request_session,
                current_app.config['GOOGLE_CLIENT_ID']
            )

            email = token_info['email']
            name = token_info.get('name')
            picture = token_info.get('picture')

            # Find or create/update user with OAuth credentials
            user = User.find_by_email(email)
            if not user:
                user = User(
                    email=email,
                    name=name,
                    picture=picture,
                    refresh_token=credentials.refresh_token,
                    token_expiry=credentials.expiry
                )
                user.save()
            else:
                # Update existing user's OAuth credentials
                user.refresh_token = credentials.refresh_token
                user.token_expiry = credentials.expiry
                user.save()

            # Store session data
            session['user_email'] = email
            session['user_name'] = name
            session.permanent = True  # Make session persistent

            # Create JWT token
            jwt_token = create_token(email)

        except Exception as e:
            if 'Failed to exchange authorization code' in str(e):
                return jsonify({'message': 'Failed to exchange authorization code', 'error': str(e)}), 400
            return jsonify({'message': 'Authentication failed', 'error': str(e)}), 401

        return jsonify({
            'token': jwt_token,
            'user': {
                'email': email,
                'name': name,
                'picture': picture,
                'subscription_status': user.subscription_status
            }
        })

    except Exception as e:
        return jsonify({'message': 'Authentication failed', 'error': str(e)}), 401

@auth_bp.route('/verify', methods=['GET'])
@rate_limit('100/minute')
@token_required()
def verify_token(current_user):
    """Verify JWT token and return user info"""
    try:
        # Verify OAuth credentials are still valid
        credentials = get_valid_credentials(current_user)
        
        return jsonify({
            'email': current_user.email,
            'name': current_user.name,
            'picture': current_user.picture,
            'subscription_status': current_user.subscription_status,
            'token_valid': True
        })
    except Exception as e:
        return jsonify({
            'message': 'Token refresh failed',
            'error': str(e),
            'token_valid': False
        }), 401

@auth_bp.route('/subscription', methods=['GET'])
@rate_limit('100/minute')
@token_required(require_subscription=True)
def get_subscription_status(current_user):
    """Get user's subscription status"""
    try:
        # Verify OAuth credentials when checking subscription
        credentials = get_valid_credentials(current_user)
        
        return jsonify({
            'status': current_user.subscription_status,
            'end_date': current_user.subscription_end_date.isoformat() if current_user.subscription_end_date else None,
            'token_valid': True
        })
    except Exception as e:
        return jsonify({
            'message': 'Token refresh failed',
            'error': str(e),
            'token_valid': False
        }), 401

@auth_bp.route('/logout', methods=['POST'])
@rate_limit('20/minute')
def logout():
    """Clear user session and tokens"""
    session.clear()
    return jsonify({'message': 'Successfully logged out'})
