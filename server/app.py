from flask import Flask, jsonify
from flask_cors import CORS
from src.print_service import router

app = Flask(__name__)
app.register_blueprint(router, url_prefix='/print')

# CORS(app, origins=['https://printmate.vercel.app'], supports_credentials=True)
CORS(app, origins=['*'], supports_credentials=True)

@app.route("/")
def helloWorld():
    return jsonify({
        'message': 'App is running successfully!'
    })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5050, debug=True)