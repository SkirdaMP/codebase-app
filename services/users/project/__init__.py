#services/users/project/__init__.py

from flask import Flask, jsonify

#initiate app

app = Flask(__name__)

app.config.from_object('project.config.DevelopmentConfig')


@app.route('/users/ping', methods=['GET'])
def ping_pong():
    return jsonify({
        'status': 'Success',
        'message': 'Pong',
    })