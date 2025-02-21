from flask import Blueprint, request, jsonify, render_template
from app.models import Todo
from app import db
from app.logging_config import log_request

api_bp = Blueprint('api', __name__)

@api_bp.route('/')
@log_request
def index():
    return render_template('index.html')

@api_bp.route('/todos', methods=['GET'])
@log_request
def get_todos():
    todos = Todo.query.all()
    return jsonify([todo.to_dict() for todo in todos])

@api_bp.route('/todos/<int:todo_id>', methods=['GET'])
@log_request
def get_todo(todo_id):
    todo = Todo.query.get_or_404(todo_id)
    return jsonify(todo.to_dict())

@api_bp.route('/todos', methods=['POST'])
@log_request
def create_todo():
    data = request.get_json()
    
    if not data or 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400

    todo = Todo(
        title=data['title'],
        description=data.get('description', ''),
        completed=data.get('completed', False)
    )
    
    db.session.add(todo)
    db.session.commit()
    
    return jsonify(todo.to_dict()), 201

@api_bp.route('/todos/<int:todo_id>', methods=['PUT'])
@log_request
def update_todo(todo_id):
    todo = Todo.query.get_or_404(todo_id)
    data = request.get_json()

    if 'title' in data:
        todo.title = data['title']
    if 'description' in data:
        todo.description = data['description']
    if 'completed' in data:
        todo.completed = data['completed']

    db.session.commit()
    return jsonify(todo.to_dict())

@api_bp.route('/todos/<int:todo_id>', methods=['DELETE'])
@log_request
def delete_todo(todo_id):
    todo = Todo.query.get_or_404(todo_id)
    db.session.delete(todo)
    db.session.commit()
    return '', 204