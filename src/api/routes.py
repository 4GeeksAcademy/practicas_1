"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Task
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#Por recomendacion del profe todos los endPoints deben ser en plural
#Vamos con los endpoints del TodoList

@api.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.serialize() for task in tasks])


@api.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    if 'title' not in data:
        return jsonify( {'error': 'Title is required'}), 400
    
    new_task = Task(title=data['title'], done=data.get('done', False))
    #new_task = Task(title**) otra forma de hacerlo 

    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.serialize()), 201



@api.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify( {'error' : 'Task not found'} ), 404
    data = request.get_json()
    task.title = data.get('title', task.title)
    task.done = data.get('done', task.done)
    db.session.commit()
    return jsonify(task.serialize()), 200


@api.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify( {'error': 'Task not found'} ), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify( {'message': 'Task deleted'} ), 200

