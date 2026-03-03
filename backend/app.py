from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from models import db, Expense, User
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret123'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = False
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

app.config.update(
    SESSION_COOKIE_SAMESITE='Lax',
    SESSION_COOKIE_SECURE=False,
)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

with app.app_context():
    db.create_all()
@app.route('/')
def home():
    return jsonify({"message": "Expense Tracker API is running"})

@app.route('/register', methods=['POST'])
def register(): 
    data = request.get_json()
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"message": "Username already exists"}), 400
    new_user = User(username=data['username'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        login_user(user)
        return jsonify({"message": "Login successful", "username": user.username})
    return jsonify({"message": "Invalid username or password"}), 401

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    session.clear()
    return jsonify({"message": "Logout successful"})

@app.route('/expenses', methods=['GET'])
@login_required
def get_expenses(): 
    expenses = Expense.query.filter_by(user_id=current_user.id).all()
    data = [{
        "id": e.id,
        "title": e.title,
        "amount": e.amount,
        "category": e.category,
        "date":e.date,
        "description": e.description
    } for e in expenses]
    return jsonify(data)

@app.route('/expenses', methods=['POST'])
@login_required
def add_expense():
    data = request.get_json()
    new_expense = Expense(
        title=data['title'],
        amount=data['amount'],
        category=data['category'],
        date=data['date'],
        description=data['description'],
        user_id=current_user.id
    )
    db.session.add(new_expense)
    db.session.commit()
    return jsonify({"message": "Expense Added Successfully"}),201

@app.route('/expenses/<int:id>', methods=['DELETE'])
def delete_expense(id): 
    expense = Expense.query.get(id)
    if not expense:
        return jsonify({"message": "Expense Not Found"}),404
    db.session.delete(expense)
    db.session.commit()
    return jsonify({"message": "Expense Deleted Successfully"})

@app.route('/expenses/<int:id>', methods=['PUT'])
def update_expense(id):
    expense = Expense.query.get(id)
    if not expense:
        return jsonify({"message": "Expense Not Found"}), 404
    data = request.get_json()
    expense.title = data.get('title', expense.title)
    expense.amount = data.get('amount', expense.amount)
    expense.category = data.get('category', expense.category)
    expense.date = data.get('date', expense.date)
    expense.description = data.get('description', expense.description)
    db.session.commit()
    return jsonify({"message": "Expense Updated Successfully"})

if __name__ == '__main__':
    app.run(debug=True)