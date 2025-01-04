from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from datetime import datetime
from utils.logger import setup_logger, init_request_logging
from utils.rate_limiter import rate_limit

# Import models and routes
from models.user import User
from routes.auth import auth_bp
from routes.stripe_webhook import stripe_bp
from routes.calendar import calendar_bp
from routes.dialogflow import dialogflow_bp

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configure CORS
    cors_origins = os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(',')
    CORS(app, origins=cors_origins, supports_credentials=True)
    
    # Setup logging
    setup_logger(app)
    init_request_logging(app)
    
    # Initialize database tables
    try:
        User.create_table_if_not_exists()
    except Exception as e:
        print(f"Warning: Could not create tables: {e}")

    # Configure app
    app.config.update(
        SECRET_KEY=os.getenv('FLASK_SECRET_KEY'),
        GOOGLE_CLIENT_ID=os.getenv('GOOGLE_OAUTH_CLIENT_ID'),
        GOOGLE_CLIENT_SECRET=os.getenv('GOOGLE_OAUTH_CLIENT_SECRET'),
        STRIPE_SECRET_KEY=os.getenv('STRIPE_SECRET_KEY'),
        STRIPE_WEBHOOK_SECRET=os.getenv('STRIPE_WEBHOOK_SECRET'),
        CALENDAR_ID=os.getenv('GOOGLE_CALENDAR_ID'),
        CALENDAR_CREDENTIALS={
            'token': os.getenv('GOOGLE_CALENDAR_TOKEN'),
            'refresh_token': os.getenv('GOOGLE_CALENDAR_REFRESH_TOKEN'),
        },
        SESSION_COOKIE_SECURE=os.getenv('SESSION_COOKIE_SECURE', 'false').lower() == 'true',
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE=os.getenv('SESSION_COOKIE_SAMESITE', 'Lax'),
        RATE_LIMIT_DEFAULT=os.getenv('RATE_LIMIT_DEFAULT', '100/hour'),
        RATE_LIMIT_AUTH=os.getenv('RATE_LIMIT_AUTH', '20/minute')
    )

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(stripe_bp, url_prefix='/stripe')
    app.register_blueprint(calendar_bp, url_prefix='/calendar')
    app.register_blueprint(dialogflow_bp, url_prefix='/dialogflow')

    # Error handlers
    @app.errorhandler(404)
    def not_found_error(error):
        app.logger.warning(f"404 error: {request.url}")
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        app.logger.error(f"500 error: {error}", exc_info=True)
        return jsonify({'error': 'Internal server error'}), 500

    @app.route('/health')
    @rate_limit('100/minute')
    def health_check():
        return jsonify({
            'status': 'healthy',
            'timestamp': datetime.utcnow().isoformat()
        })

    return app

if __name__ == '__main__':
    app = create_app()
    debug_mode = os.getenv('FLASK_DEBUG', '0') == '1'
    app.run(
        host=os.getenv('FLASK_HOST', '0.0.0.0'),
        port=int(os.getenv('FLASK_PORT', 5000)),
        debug=debug_mode
    )
