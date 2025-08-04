import os
from flask import Flask, jsonify
from dotenv import load_dotenv

load_dotenv()

from .config import DevelopmentConfig, ProductionConfig, TestingConfig
from .extensions import cors
from .routes.print_service import router

_config_map = {
  'development': DevelopmentConfig,
  'production': ProductionConfig,
  'testing': TestingConfig
}

def create_app(env_name: str | None = None):
  env = env_name or os.getenv('FLASK_ENV', 'development')
  cfg_class = _config_map[env]
  if cfg_class is None:
    raise ValueError(f"Unknown FLASK_ENV '{env}'")
  
  app = Flask(__name__)
  app.config.from_object(cfg_class)
  
  if not app.config.get('API_KEY'):
    raise RuntimeError("API_KEY must be set in environment")
  if not app.config.get('PRINTER_NAME'):
    raise RuntimeError("PRINTER_NAME must be set in environment")
  
  cors.init_app(app, origins=app.config['CORS_ORIGINS'], supports_credentials=True)
  
  app.register_blueprint(router, url_prefix='/print')
  
  @app.route("/")
  def index():
    healthy = True  # Placeholder for actual health check logic
    if not healthy:
      return jsonify({
        'service': 'pipeline',
        'status': 'error',
        'code': 503,
        'message': 'Pipeline backend unavailable. Try again later!'
      }), 503
    else:
      return jsonify({
        'service': 'pipeline',
        'status': 'ok',
        'code': 200,
        'message': f'Pipeline is running successfully{f" in {env.capitalize()} Mode" if (env != "production") else ""}!'
      }), 200
  
  return app