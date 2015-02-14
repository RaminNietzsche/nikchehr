# coding: utf-8

from flask import Flask, render_template, request, send_from_directory
from flask.ext.socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/read/back/')
def back():
    pass
    #return render_template('check.html', status = status, msg = msg)

@socketio.on('my event', namespace='/nikchehr')
def take_event(message):
    emit('my response', {'data': message['data'], 'value': message['value']}, broadcast=True)


def configure_template_tag(app):
    from utils.template_tag import init_filters
    init_filters(app)

if __name__ == '__main__':
    configure_template_tag(app)
    socketio.run(app, host="0.0.0.0")
