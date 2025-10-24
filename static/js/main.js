document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialize Database
    await initDB();

    // 2. Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/static/js/sw.js')
            .then(reg => console.log('Service Worker registered!'))
            .catch(err => console.error('Service Worker registration failed:', err));
    }

    // 3. Load initial app data (or use cached)
    let initialData = await getData('appData', 'initial');
    if (!initialData || !initialData.achievements) { // Check if data is incomplete
        console.log("Fetching new initial data...");
        try {
            const response = await fetch('/api/initial-data');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            initialData = { key: 'initial', ...data };
            await saveData('appData', initialData);
        } catch (e) {
            console.error("Failed to fetch initial data:", e);
            alert("Error loading app data. Please check the server.");
            return;
        }
    }
    window.appData = initialData; // Make it globally accessible

    // 4. Initialize User Data and UI
    let userData = await getData('userData', 'currentUser');
    if (!userData) {
        userData = {
            key: 'currentUser',
            name: 'Karthick',
            points: 1000,
            streak: 1,
            lastLogin: new Date().toISOString().split('T')[0],
            unlockedAchievements: [],
            purchasedItems: ['helmet1', 'suit1'],
            equippedItems: { helmet: 'helmet1', suit: 'suit1' }
        };
        await saveData('userData', userData);
    }
    window.userData = userData;

    // 5. Initialize all feature modules based on the current page
    initLanguage();
    initSync();

    if (document.querySelector('.dashboard-main')) {
        await checkDailyStreak(); // From gamification.js
        updateHeaderStats();
        initAvatar();
        initLeaderboard();
        initSimulation();
        initGalaxyMap(); 
    }
    if (document.querySelector('.store-main')) {
        initStore();
        updateHeaderStats();
    }
    if (document.querySelector('.achievements-main')) {
        initAchievements();
        updateHeaderStats();
    }
});

function updateHeaderStats() {
    document.getElementById('user-points').textContent = `💎 ${window.userData.points}`;
    document.getElementById('user-streak').textContent = `🔥 ${window.userData.streak}`;
}

function initLeaderboard() {
    const leaderboardEl = document.getElementById('leaderboard');
    // In a real app, you'd fetch this. We'll use mock data.
    fetch('/api/leaderboard/classA')
        .then(res => res.json())
        .then(data => {
            leaderboardEl.innerHTML = data.map(u => `<li>${u.name} - ${u.points} pts</li>`).join('');
        });
}

// --- FUNCTIONS TO PLAY THE GAME ---

function initGalaxyMap() {
    document.querySelectorAll('.planet').forEach(planet => {
        if (!planet.classList.contains('locked')) {
            planet.addEventListener('click', () => {
                const topicId = planet.dataset.topic;
                loadGame(topicId);
            });
        }
    });
}

function loadGame(topicId) {
    const modal = document.getElementById('game-modal');
    const title = document.getElementById('game-title');
    const gameArea = document.getElementById('game-area');
    
    // Mock Quiz Data
    const quizData = {
        'algebra': {
            id: 'math_q1',
            title: 'Mission: Algebra Basics',
            question: 'What is 2 + 2?',
            options: ['3', '4', '5'],
            answer: '4'
        },
        // --- ADDED MISSING QUIZ ---
        'geometry': {
            id: 'math_q2',
            title: 'Mission: Geometry',
            question: 'How many sides does a triangle have?',
            options: ['3', '4', '5'],
            answer: '3'
        },
        'physics': {
            id: 'science_q1',
            title: 'Mission: Physics 101',
            question: 'What is the boiling point of water?',
            options: ['90°C', '100°C', '110°C'],
            answer: '100°C' // <-- BUG FIX: Was incorrect
        },
        'logic_puzzles': {
            id: 'tech_q1',
            title: 'Mission: Logic Puzzles',
            question: 'If A > B and B > C, which statement is true?',
            options: ['A < C', 'A = C', 'A > C'],
            answer: 'A > C'
        },
        'algorithms': {
            id: 'tech_q2',
            title: 'Mission: Basic Algorithms',
            question: 'What is the first step in sorting numbers from smallest to largest?',
            options: ['Find the largest number', 'Find the smallest number', 'Average all numbers'],
            answer: 'Find the smallest number'
        },
        'bridge_design': {
            id: 'eng_q1',
            title: 'Mission: Bridge Design',
            question: 'To build a strong bridge, forces from weight should be...?',
            options: ['Concentrated on one point', 'Spread out evenly', 'Pushed upwards only'],
            answer: 'Spread out evenly'
        },
        'crop_science': {
            id: 'agri_q1',
            title: 'Mission: Crop Science',
            question: 'What do plants primarily need from soil to grow?',
            options: ['Sunlight', 'Nutrients', 'Pollen'],
            answer: 'Nutrients'
        }
    };
    
    const data = quizData[topicId];
    if (!data) {
        console.log(`No quiz data found for topic: ${topicId}`);
        return; 
    }

    title.textContent = data.title;
    gameArea.innerHTML = `
        <p class="quiz-question">${data.question}</p>
        <div class="quiz-options">
            ${data.options.map(opt => `<button class="btn-ghost quiz-option">${opt}</button>`).join('')}
        </div>
    `;

    // Add event listeners to the new buttons
    gameArea.querySelectorAll('.quiz-option').forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === data.answer) {
                alert('Correct! +100 Points!');
                window.userData.points += 100;
                saveData('userData', window.userData);
                updateHeaderStats();
                
                // Check for achievements
                if (data.id.startsWith('science')) {
                    checkQuizAchievement('science', 100);
                }
            } else {
                alert('Incorrect. Try again!');
            }
            closeGame();
        });
    });

    // --- HINT BUTTON FIX ---
    // This now correctly finds the button and attaches the click event.
    const hintButton = document.getElementById('tutor-hint-button');
    hintButton.onclick = () => {
        console.log(`Getting hint for: ${data.id}`); // For debugging
        const hint = getTutorHint(data.id); // From tutor.js
        alert(`Tutor Says: ${hint}`);
    };

    modal.style.display = 'flex';
}

function closeGame() {
    const modal = document.getElementById('game-modal');
    modal.style.display = 'none';
}
