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
    # This is now our Login Page
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
    return render_template('teacher_dashboard.html')

# --- THIS IS THE MISSING ROUTE ---
@app.route('/register')
def register():
    return render_template('register.html')
# --- END OF MISSING ROUTE ---


# --- API Endpoints ---
@app.route('/api/initial-data')
def get_initial_data():
    """Provides all necessary data for the app to start (except quizzes/hints)."""
    data = {
        "store_items": load_json_data('static/data/store_items.json'),
        "achievements": load_json_data('static/data/achievements.json')
    }
    return jsonify(data)

@app.route('/api/quiz/<topic_id>')
def get_quiz(topic_id):
    """Fetches a single quiz by its topic ID."""
    all_quizzes = load_json_data('static/data/quizzes.json')
    quiz = all_quizzes.get(topic_id)
    if quiz:
        return jsonify(quiz)
    else:
        return jsonify({"error": "Quiz not found"}), 404

@app.route('/api/hint/<question_id>')
def get_hint(question_id):
    """Fetches hints for a specific question ID."""
    all_hints = load_json_data('static/data/tutor_hints.json')
    hints = all_hints.get(question_id)
    if hints:
        # Return the list of hints
        return jsonify(hints)
    else:
        return jsonify({"error": "Hints not found"}), 404


@app.route('/api/leaderboard/<class_id>')
def get_leaderboard(class_id):
    """Returns mock leaderboard data for a class."""
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
    return jsonify({"status": "success", "message": "Data synced successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
