# 🚀 EduQuest

**EduQuest** is a **gamified digital learning platform** designed to enhance STEM education for **students in rural schools (Grades 6–12)**.  
It combines **a futuristic space theme**, **interactive quizzes**, and **offline-first capabilities** to make STEM learning accessible, engaging, and inclusive — even in areas with limited internet connectivity.

---

## 🌌 Overview

Students embark on an interstellar learning journey through the **Galaxy Map Dashboard**, where **subjects appear as stars** and **quizzes as planets**.  
Each completed quiz earns **points**, **badges**, and **achievements**, promoting continuous engagement and learning motivation.

---

## ✨ Key Features

### 🎨 Futuristic UI
- Immersive **Galaxy Map** interface for exploring subjects and quizzes.  
- Smooth animations and thematic transitions.

### 🌐 Offline-First (PWA)
- Built as a **Progressive Web App (PWA)** with a **Service Worker**.  
- All core assets are cached for full offline functionality.

### 🔐 Login & Registration
- Secure login and registration system with floating animations.  
- Offline credentials cached via IndexedDB for rural accessibility.

### 🧩 Gamified Quizzes
- API-driven quizzes covering **Math, Science, Technology, Engineering, and Agri-STEM**.  
- Dynamic scoring and progress tracking.

### 💡 API-Based Hints
- “**Get Hint**” button fetches help from a dedicated Hint API.  
- Future upgrade planned for **AI-powered tutoring**.

### 🧍 Avatar Customization Store
- Students can redeem earned points to buy and equip avatar items.

### 🏅 Achievement System
- Unlock badges for milestones (e.g., “7-day login streak”).  
- Visual feedback to encourage consistency.

### 📈 Classroom Leaderboard
- Displays ranking and progress among classmates.

### 🧪 STEM Sandbox
- Interactive physics playground powered by **Matter.js**.  
- Encourages hands-on experimentation in Science & Engineering.

### 🌍 Multilingual Support
- UI text can switch between **English** and **Tamil** seamlessly.

### 👩‍🏫 Teacher Analytics Portal
- Mock dashboard for teachers to view student progress and analytics.  
- Planned integration for real data insights.

---

## 🛠️ Tech Stack

| Layer | Technology |
|:------|:------------|
| **Backend** | Python (Flask) |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Database (Offline)** | IndexedDB |
| **Physics/Simulation** | Matter.js |
| **Offline Support** | Progressive Web App (PWA) via Service Worker |

---

## 🚀 Getting Started

Follow the steps below to set up **EduQuest** locally.

### 1️⃣ Clone the Repository
```bash
git clone [your-repo-url]
cd EduQuest
```

### 2️⃣ Create and Activate a Virtual Environment
**Windows**
```bash
python -m venv venv
.env\Scriptsctivate
```
**Mac/Linux**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3️⃣ Install Required Packages
```bash
pip install -r requirements.txt
```

### 4️⃣ Run the Flask Server
```bash
python app.py
```

### 5️⃣ Access the Application
Open your browser and visit:  
👉 http://127.0.0.1:5000

---

## 📁 Project Structure

```
EduQuest/
├── app.py                  # Main Flask app (serves pages & API)
├── requirements.txt        # Python dependencies
├── static/
│   ├── css/
│   │   └── style.css       # Futuristic theme styling
│   ├── js/
│   │   ├── database.js     # IndexedDB logic
│   │   ├── gamification.js # Game logic (points, badges)
│   │   ├── main.js         # Core app logic
│   │   └── serviceWorker.js# PWA caching
│   ├── data/
│   │   ├── quizzes.json    # Mock quiz data
│   │   ├── tutor_hints.json# Hints API data
│   │   ├── store_items.json# Avatar store items
│   │   └── ...
│   └── images/             # Placeholder for theme graphics
└── templates/
    ├── layout.html         # Base layout
    ├── index.html          # Login page
    ├── register.html       # Registration page
    ├── dashboard.html      # Galaxy Map dashboard
    ├── store.html          # Avatar Store
    ├── achievements.html   # Achievements & badges
    └── teacher_dashboard.html # Teacher analytics
```

---

## 💡 Future Implementation

### 🔗 Full Database Integration
- Replace mock data with a real database (PostgreSQL or MongoDB).  
- IndexedDB to act as an offline cache for user data and progress.

### 🔄 Robust Offline Sync
- Background Sync API to queue quiz results and sync automatically when online.

### 👩‍🏫 Expanded Teacher Portal
- Secure teacher login and analytics dashboard.  
- Quiz Builder for custom quizzes per class.

### 🤖 AI Tutor Upgrade
- Integrate Gemini API (or similar) for intelligent, conversational hints.

### 🧠 Advanced STEM Sandbox
- Add new modules like Circuit Builder (Engineering) and Chemical Reaction Simulator (Science).

### ⚔️ Student Collaboration
- “Challenge Mode” for real-time quiz battles with classmates.

### 📱 Native App Deployment
- Package PWA using Capacitor or Cordova for Play Store release.

---

## 👥 Contributors
- **Veera Karthick** — Founder & Developer  
- Open for collaboration: AI, EdTech, and UI/UX enthusiasts are welcome!

---

## 🧾 License
This project is licensed under the **MIT License** — feel free to use, modify, and distribute with proper attribution.
