from flask import Flask, jsonify, safe_join, send_from_directory, request
from flask_cors import CORS, cross_origin


STATIC_DIR = '../dist/'


app = Flask(__name__,
            static_folder=STATIC_DIR,
            )

@app.route('/')
def index():
    return app.send_static_file("index.html")


@app.route('/sanity')
def sanity():
    return jsonify({'hi': 'there'})


@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory(safe_join(STATIC_DIR), path)
