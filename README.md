# Expense Tracker

A full-stack web application for tracking personal expenses with user authentication, categorization, and data visualization.

## Features

- 🔐 User registration and login
- ➕ Add, edit, and delete expenses
- 📊 Category-wise expense breakdown
- 📈 Interactive pie charts and data visualization
- 📱 Responsive dashboard with expense summaries
- 🔍 Recent expenses view with "View All" functionality
- 💾 Secure data storage with SQLite

## Technology Stack

- **Frontend:** React.js, HTML5, CSS3, JavaScript
- **Backend:** Flask (Python), SQLAlchemy ORM
- **Database:** SQLite
- **Authentication:** Flask-Login with session management
- **Charts:** Chart.js for data visualization

## Screenshots

![Dashboard](screenshots/dashboard.png)
![Login](screenshots/login.png)

## Installation & Setup

### Prerequisites
- Python 3.7+
- Node.js 14+
- npm or yarn

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/Hemayalamuri/expense-tracker.git
cd expense-tracker
```

2. Navigate to backend directory:
```bash
cd backend
```

3. Create virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux
```

4. Install Python dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask backend:
```bash
python app.py
```
Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```
Frontend will run on `http://localhost:3000`

## Usage

1. **Registration:** Create a new account with email and password
2. **Login:** Sign in with your credentials
3. **Dashboard:** View expense summaries, charts, and recent transactions
4. **Add Expenses:** Use the "Add Expense" tab to record new expenses
5. **View All Expenses:** Check all your expenses in the "All Expenses" tab

## API Endpoints

- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /expenses` - Get user expenses
- `POST /expenses` - Add new expense
- `PUT /expenses/<id>` - Update expense
- `DELETE /expenses/<id>` - Delete expense

## Project Structure

```
expense-tracker/
├── backend/
│   ├── app.py              # Flask application
│   ├── models.py           # Database models
│   ├── requirements.txt    # Python dependencies
│   └── expenses.db         # SQLite database
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx         # Main App component
│   │   └── index.js        # Entry point
│   ├── public/
│   └── package.json        # Node.js dependencies
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact

Name - [Hema Yalamuri](mailto:hemayalamuri5@gmail.com)

Project Link: [https://github.com/Hemayalamuri/expense-tracker](https://github.com/Hemayalamuri/expense-tracker)
