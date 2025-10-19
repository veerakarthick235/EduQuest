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
    if (!initialData) {
        const response = await fetch('/api/initial-data');
        const data = await response.json();
        initialData = { key: 'initial', ...data };
        await saveData('appData', initialData);
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