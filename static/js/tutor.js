async function getTutorHint(questionId) {
    try {
        const response = await fetch(`/api/hint/${questionId}`);
        if (!response.ok) {
            throw new Error('Hints not found');
        }
        
        const hints = await response.json();
        
        // Return a random hint from the array
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        return randomHint;

    } catch (error) {
        console.error("Failed to fetch hint:", error);
        return "Sorry, I'm unable to get a hint right now. Please check your connection.";
    }
}
