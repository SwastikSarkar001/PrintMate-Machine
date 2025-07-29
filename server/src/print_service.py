from flask import Blueprint, request, jsonify
import subprocess
import os
import requests
from src.logger import logger

router = Blueprint('print_service', __name__)

UPLOAD_FOLDER = '/tmp/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

PRINTER_NAME = 'HP_Smart_Tank_720'  # Replace with actual printer name
API_KEY = 'your-strong-secret-key'  # Replace in production

@router.route('/', methods=['POST'])
def print_file():
    key = request.headers.get('X-API-KEY')
    # Uncomment this in production for security
    # if key != API_KEY:
    #     logger.warning(f"Unauthorized attempt from {request.remote_addr}")
    #     return jsonify({"status": "error", "message": "Unauthorized"}), 403

    data = request.get_json()
    if not data or 'fileUrl' not in data:
        return jsonify({"status": "error", "message": "No file URL provided"}), 400

    file_url = data['fileUrl']
    if not file_url:
        return jsonify({"status": "error", "message": "Empty file URL"}), 400

    try:
        response = requests.get(file_url)
        response.raise_for_status()

        filename = file_url.split('/')[-1] or 'download.pdf'
        if '.' not in filename:
            filename += '.pdf'

        filepath = os.path.join(UPLOAD_FOLDER, filename)
        with open(filepath, 'wb') as f:
            f.write(response.content)

        logger.info(f"Received print job from {request.remote_addr}: {filepath}")

        try:
            subprocess.run(['lp', '-d', PRINTER_NAME, filepath], check=True)
            logger.info(f"Print job sent to printer: {PRINTER_NAME}")
            return jsonify({"status": "success", "message": "Print job submitted"}), 200
        except subprocess.CalledProcessError as e:
            logger.error(f"Printing failed: {e}")
            return jsonify({"status": "error", "message": f"Printing failed: {str(e)}"}), 500
        finally:
            if os.path.exists(filepath):
                os.remove(filepath)  # Clean up
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to download file from {file_url}: {e}")
        return jsonify({"status": "error", "message": f"Failed to download file: {str(e)}"}), 400
