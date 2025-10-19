function initSync() {
    const syncButton = document.getElementById('sync-button');
    if (!syncButton) return;

    // Check online status
    updateSyncStatus();
    window.addEventListener('online', updateSyncStatus);
    window.addEventListener('offline', updateSyncStatus);

    syncButton.addEventListener('click', async () => {
        if (!navigator.onLine) {
            alert('Cannot sync. You are offline.');
            return;
        }

        syncButton.classList.add('syncing');
        syncButton.textContent = '...';
        syncButton.disabled = true;

        try {
            // Get all user data to send
            const achievements = await getData('userData', 'unlockedAchievements') || [];
            const userData = await getData('userData', 'currentUser');
            
            const response = await fetch('/api/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userData: userData,
                    achievements: achievements
                })
            });

            if (response.ok) {
                localStorage.setItem('lastSync', new Date().toISOString());
                console.log('Sync successful');
            } else {
                throw new Error('Sync failed on server');
            }

        } catch (error) {
            console.error('Sync error:', error);
            alert('Sync failed. Please try again later.');
        } finally {
            syncButton.classList.remove('syncing');
            updateSyncStatus();
            syncButton.disabled = false;
        }
    });
}

function updateSyncStatus() {
    const syncButton = document.getElementById('sync-button');
    if (!navigator.onLine) {
        syncButton.textContent = 'Offline';
        syncButton.title = 'You are currently offline';
        syncButton.classList.add('offline');
    } else {
        const lastSync = localStorage.getItem('lastSync');
        const title = lastSync ? `Last Synced: ${new Date(lastSync).toLocaleString()}` : 'Ready to sync';
        syncButton.textContent = '🔄';
        syncButton.title = title;
        syncButton.classList.remove('offline');
    }
}