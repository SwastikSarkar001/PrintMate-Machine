import os

class Config:
  """Base configuration class."""
  
  # API key for external services
  API_KEY = os.getenv('API_KEY')
  if not API_KEY:
    raise ValueError("API_KEY must be set in the environment variables.")
  
  # Flask configuration
  FLASK_DEBUG = False
  TESTING = False
  
  # CORS settings
  CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(',')
  
  # File upload settings
  MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
  UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
  ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'txt', 'png', 'jpg', 'jpeg'}
  
  # Printer settings
  PRINTER_NAME = os.getenv('PRINTER_NAME')
  if not PRINTER_NAME:
    raise ValueError("PRINTER_NAME must be set in the environment variables.")

  # JWT settings
  JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-jwt-secret-key-here')
  JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 3600))

class DevelopmentConfig(Config):
  """Development configuration class."""
  
  CORS_ORIGINS = ['*']  # Allow all origins in development
  FLASK_DEBUG = True

class ProductionConfig(Config):
  """Production configuration class."""
  
  CORS_ORIGINS = ['https://printmate.vercel.app']  # Restrict to production domain
  FLASK_DEBUG = False

class TestingConfig(Config):
  """Testing configuration class."""
  TESTING = True