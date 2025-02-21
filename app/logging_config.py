import logging
import functools
from flask import request
from datetime import datetime

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

def log_request(f):
    @functools.wraps(f)
    def decorated(*args, **kwargs):
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        logger.info(
            f"[{timestamp}] {request.method} {request.path} - "
            f"IP: {request.remote_addr} - "
            f"User-Agent: {request.headers.get('User-Agent')}"
        )
        response = f(*args, **kwargs)
        logger.info(f"Response Status: {getattr(response, 'status_code', 'N/A')}")
        return response
    return decorated