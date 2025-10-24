// --- Daily Streak Logic ---
async function checkDailyStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastLogin = window.userData.lastLogin;

    if (lastLogin === today) {
        // Already logged in today
        return;
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (lastLogin === yesterday) {
        // It's a consecutive day
        window.userData.streak++;
        window.userData.points += 50; // Award 50 bonus points
        console.log(`Streak incremented to: ${window.userData.streak}`);
        // Check for streak-related achievements
        if (window.userData.streak >= 7) {
            await awardAchievement('streak_star');
        }
    } else {
        // Streak is broken
        console.log("Streak broken. Resetting to 1.");
        window.userData.streak = 1;
    }

    window.userData.lastLogin = today;
    await saveData('userData', window.userData);
    updateHeaderStats();
}

// --- Achievement Logic ---
async function awardAchievement(achievementId) {
    if (window.userData.unlockedAchievements.includes(achievementId)) {
        return; // Already have it
    }

    const achievement = window.appData.achievements.find(a => a.id === achievementId);
    if (achievement) {
        console.log(`Achievement Unlocked: ${achievement.name}`);
        window.userData.unlockedAchievements.push(achievementId);
        window.userData.points += 100; // Bonus 100 points for any achievement
        await saveData('userData', window.userData);
        updateHeaderStats();
        
        // Show a simple notification
        alert(`Achievement Unlocked: ${achievement.name}\n+100 Points!`);
    }
}

// Function to be called from other parts of the app
async function checkQuizAchievement(subject, score) {
    // Example logic:
    if (subject === 'science' && score === 100) {
        await awardAchievement('science_whiz');
    }
    // You would add more logic here, e.g., tracking total math quizzes
}

// --- Init Function for Achievements Page ---
function initAchievements() {
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;

    const allAchievements = window.appData.achievements;
    const unlockedIds = window.userData.unlockedAchievements;

    grid.innerHTML = allAchievements.map(ach => `
        <div class="achievement-card ${unlockedIds.includes(ach.id) ? 'unlocked' : ''}">
            <div class="icon">${ach.icon}</div>
            <h3>${ach.name}</h3>
            <p>${ach.description}</p>
        </div>
    `).join('');
}
