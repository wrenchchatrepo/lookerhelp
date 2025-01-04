import logging
import os
from logging.handlers import RotatingFileHandler
from flask import request, has_request_context
import traceback

class RequestFormatter(logging.Formatter):
    """Custom formatter that includes request information"""
    
    def format(self, record):
        if has_request_context():
            record.url = request.url
            record.method = request.method
            record.remote_addr = request.remote_addr
            record.path = request.path
        else:
            record.url = None
            record.method = None
            record.remote_addr = None
            record.path = None

        if record.exc_info:
            record.exc_text = ''.join(traceback.format_exception(*record.exc_info))
        else:
            record.exc_text = ''

        return super().format(record)

def setup_logger(app):
    """Configure application logging
    
    Args:
        app: Flask application instance
    """
    # Get configuration from environment
    log_level = os.getenv('LOG_LEVEL', 'INFO')
    log_format = os.getenv('LOG_FORMAT', 
        '%(asctime)s - %(name)s - %(levelname)s - %(remote_addr)s - %(method)s %(url)s - %(message)s%(exc_text)s'
    )
    log_file = os.getenv('LOG_FILE', 'app.log')

    # Create logs directory if it doesn't exist
    log_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'logs')
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)
    log_path = os.path.join(log_dir, log_file)

    # Configure root logger
    logger = logging.getLogger()
    logger.setLevel(log_level)

    # Remove existing handlers
    for handler in logger.handlers[:]:
        logger.removeHandler(handler)

    # Create formatter
    formatter = RequestFormatter(log_format)

    # File handler with rotation
    file_handler = RotatingFileHandler(
        log_path,
        maxBytes=10485760,  # 10MB
        backupCount=10
    )
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

    # Set Flask logger to use the same configuration
    app.logger.handlers = logger.handlers
    app.logger.setLevel(log_level)

    # Log application startup
    app.logger.info(f"Application started with log level: {log_level}")

def log_request():
    """Log incoming request details"""
    if has_request_context():
        app_logger = logging.getLogger('flask.app')
        app_logger.info(
            f"Request: {request.method} {request.url} - "
            f"Client: {request.remote_addr} - "
            f"User Agent: {request.user_agent}"
        )

def log_response(response):
    """Log response details
    
    Args:
        response: Flask response object
    """
    if has_request_context():
        app_logger = logging.getLogger('flask.app')
        app_logger.info(
            f"Response: {response.status} - "
            f"Size: {response.content_length} bytes"
        )
    return response

def init_request_logging(app):
    """Initialize request/response logging for the application
    
    Args:
        app: Flask application instance
    """
    app.before_request(log_request)
    app.after_request(log_response)
