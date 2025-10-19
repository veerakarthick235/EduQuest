import json
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# --- Helper function to load JSON data ---
def load_json_data(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

# --- Routes for HTML Pages ---
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/store')
def store():
    return render_template('store.html')

@app.route('/achievements')
def achievements():
    return render_template('achievements.html')

@app.route('/teacher')
def teacher_dashboard():
    # In a real app, this would be behind a login
    return render_template('teacher_dashboard.html')


# --- API Endpoints ---
@app.route('/api/initial-data')
def get_initial_data():
    """Provides all necessary data for the app to start."""
    data = {
        "store_items": load_json_data('static/data/store_items.json'),
        "achievements": load_json_data('static/data/achievements.json'),
        "tutor_hints": load_json_data('static/data/tutor_hints.json')
    }
    return jsonify(data)

@app.route('/api/leaderboard/<class_id>')
def get_leaderboard(class_id):
    """Returns mock leaderboard data for a class."""
    # In a real app, you would query your database for this.
    mock_leaderboard = [
        {"name": "Karthick", "points": 1550},
        {"name": "Priya", "points": 1400},
        {"name": "Arjun", "points": 1200},
        {"name": "Ananya", "points": 950},
        {"name": "Rohan", "points": 800}
    ]
    return jsonify(mock_leaderboard)

@app.route('/api/sync', methods=['POST'])
def sync_data():
    """Receives progress data from a client to save to the database."""
    progress = request.json
    print("Received data to sync:", progress)
    # Here, you would save progress['userData'] and progress['achievements'] to your main database.
    return jsonify({"status": "success", "message": "Data synced successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)