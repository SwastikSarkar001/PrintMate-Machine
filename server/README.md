# Steps to run the server

Firstly, open the server folder in the root and create a virtual environment by using the comamnd:
```bash
virtualenv venv
```

Secondly, activate the virtual environment:

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

Thirdly, install all the pip packages:

**Windows:**
```bash
pip install -r requirements.txt
```

**macOS/Linux:**
```bash
pip3 install -r requirements.txt
```

Note: On some systems, you may need to use `python -m pip` or `python3 -m pip` if the pip command is not found.

Fourthly, set up the environment variables:

1. Copy the `.env.example` file and rename it to `.env`:
```bash
cp .env.example .env
```

2. Open the `.env` file and configure the required environment variables according to your setup.

Note: Make sure to replace the placeholder values in the `.env` file with your actual configuration values.

Finally, run the Flask server in development mode:

```bash
flask run --debug
```

or alternatively:

**Windows:**
```bash
python app.py
```

**macOS/Linux:**
```bash
python3 app.py
```

The `--debug` flag enables auto-reloading, so the server will automatically restart whenever you make changes to your code files.

Note: Make sure your main Flask application file is named `app.py` or set the `FLASK_APP` environment variable to point to your main application file.