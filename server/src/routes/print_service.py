import os
import subprocess
import requests
from ..utils.logger import logger
from flask import Blueprint, request, jsonify

router = Blueprint('print_service', __name__)

UPLOAD_FOLDER = '/tmp/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

PRINTER_NAME = os.getenv('PRINTER_NAME')
API_KEY = os.getenv('API_KEY')

if not PRINTER_NAME:
  logger.error("PRINTER_NAME is not set in the environment variables.")
  raise ValueError("PRINTER_NAME must be set in the environment variables.")
if not API_KEY:
  logger.error("API_KEY is not set in the environment variables.")
  raise ValueError("API_KEY must be set in the environment variables.")

@router.route('/', methods=['POST'])
def print_file():
  key = request.headers.get('X-API-KEY')
  # Uncomment this in production for security
  if key != API_KEY:
    logger.warning(f"Unauthorized attempt from {request.remote_addr}")
    return jsonify({
      "status": "error",
      "message": "Unauthorized"
    }), 403

  data = request.get_json()
  if not data or 'fileUrl' not in data:
    return jsonify({"status": "error", "message": "No file URL provided"}), 400

  file_url = data['fileUrl']
  if not file_url:
    return jsonify({
      "status": "error",
      "message": "Empty file URL"
    }), 400

  try:
    response = requests.get(file_url)
    response.raise_for_status()

    filename = file_url.split('/')[-1] or 'download.pdf'
    if '.' not in filename:
      filename += '.pdf'

    filepath = os.path.join(UPLOAD_FOLDER, filename)
    with open(filepath, 'wb') as f:
      f.write(response.content)

    logger.info("Received print job from %s: %s", request.remote_addr, filepath)

    try:
      subprocess.run(['lp', '-d', PRINTER_NAME, filepath], check=True) # type: ignore
      logger.info("Print job sent to printer: %s", PRINTER_NAME)
      
      return jsonify({
        "status": "success",
        "message": "Print job submitted"
      }), 200
    except subprocess.CalledProcessError as e:
      logger.error("Printing failed: %s", e)
      return jsonify({
        "status": "error",
        "message": f"Printing failed: {str(e)}"
      }), 500
    finally:
      if os.path.exists(filepath):
        os.remove(filepath)  # Clean up
  except requests.exceptions.RequestException as e:
    logger.error("Failed to download file from %s: %s", file_url, e)
    return jsonify({
      "status": "error",
      "message": f"Failed to download file: {str(e)}"
    }), 400
