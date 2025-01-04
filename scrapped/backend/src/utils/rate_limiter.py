from flask import request, jsonify
from functools import wraps
import time
from collections import defaultdict
import threading

class RateLimiter:
    def __init__(self):
        self.requests = defaultdict(list)
        self.lock = threading.Lock()

    def _cleanup_old_requests(self, key, window):
        """Remove requests older than the window"""
        current_time = time.time()
        with self.lock:
            self.requests[key] = [req_time for req_time in self.requests[key]
                                if current_time - req_time < window]

    def is_rate_limited(self, key, limit, window):
        """
        Check if the request should be rate limited
        
        Args:
            key: Identifier for the client (e.g., IP address)
            limit: Number of requests allowed in the window
            window: Time window in seconds
        """
        self._cleanup_old_requests(key, window)
        
        with self.lock:
            if len(self.requests[key]) >= limit:
                return True
            
            self.requests[key].append(time.time())
            return False

def parse_rate_limit(rate_limit_string):
    """Parse rate limit string (e.g., '100/hour' or '20/minute')"""
    count, period = rate_limit_string.split('/')
    count = int(count)
    
    if period == 'second':
        window = 1
    elif period == 'minute':
        window = 60
    elif period == 'hour':
        window = 3600
    elif period == 'day':
        window = 86400
    else:
        raise ValueError(f"Unsupported rate limit period: {period}")
    
    return count, window

# Global rate limiter instance
rate_limiter = RateLimiter()

def rate_limit(limit_string):
    """
    Rate limiting decorator
    
    Args:
        limit_string: Rate limit in format "number/period" (e.g., "100/hour")
    """
    limit, window = parse_rate_limit(limit_string)
    
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Get client identifier (IP address)
            client_id = request.remote_addr
            
            # Add route to client ID to separate limits for different endpoints
            rate_limit_key = f"{client_id}:{request.endpoint}"
            
            if rate_limiter.is_rate_limited(rate_limit_key, limit, window):
                response = {
                    'error': 'Rate limit exceeded',
                    'message': f'Please try again later. Limit is {limit_string}.'
                }
                return jsonify(response), 429
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator
