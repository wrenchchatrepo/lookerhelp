from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from datetime import datetime, timedelta
from flask import current_app

def get_valid_credentials(user):
    """
    Get valid OAuth2 credentials for a user.
    Refreshes the access token if necessary using the stored refresh token.
    
    Args:
        user: User object containing OAuth credentials
        
    Returns:
        Credentials object with valid access token
    """
    if not user.refresh_token:
        raise ValueError("No refresh token available")

    credentials = Credentials(
        None,  # No access token needed as we'll refresh it
        refresh_token=user.refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=current_app.config['GOOGLE_CLIENT_ID'],
        client_secret=current_app.config['GOOGLE_CLIENT_SECRET'],
        scopes=[
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/calendar'
        ]
    )

    # Check if token needs refresh
    if not user.token_expiry or datetime.utcnow() >= user.token_expiry:
        try:
            credentials.refresh(Request())
            
            # Update user's token expiry
            user.update_oauth_credentials(
                refresh_token=credentials.refresh_token or user.refresh_token,
                token_expiry=credentials.expiry
            )
        except Exception as e:
            raise ValueError(f"Failed to refresh token: {str(e)}")

    return credentials

def create_credentials_from_flow(flow):
    """
    Create OAuth2 credentials from a completed flow
    
    Args:
        flow: Completed OAuth2 flow
        
    Returns:
        Credentials object
    """
    return Credentials(
        token=flow.credentials.token,
        refresh_token=flow.credentials.refresh_token,
        token_uri=flow.credentials.token_uri,
        client_id=flow.credentials.client_id,
        client_secret=flow.credentials.client_secret,
        scopes=flow.credentials.scopes,
        expiry=flow.credentials.expiry
    )
