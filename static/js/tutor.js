// This file doesn't need an 'init' function, just a function to be called by the game logic

function getTutorHint(questionId) {
    const allHints = window.appData.tutor_hints;
    
    if (allHints && allHints[questionId]) {
        const hints = allHints[questionId];
        // Return a random hint from the available hints for that question
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        return randomHint;
    } else {
        return "Sorry, I don't have a specific hint for this question. Try re-reading the topic!";
    }
}

// --- Example of how to use it in your game modal ---
/*
// Inside your quiz logic, you would add a "Hint" button:
const hintButton = document.createElement('button');
hintButton.textContent = 'Get Hint 💡';
hintButton.className = 'btn-ghost';
hintButton.onclick = () => {
    const questionId = 'math_q1'; // Get this from your question object
    const hint = getTutorHint(questionId);
    alert(`Tutor Says: ${hint}`);
};
gameArea.appendChild(hintButton);
*/