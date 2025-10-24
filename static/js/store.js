function initStore() {
    const grid = document.getElementById('store-items-grid');
    if (!grid) return;

    const allItems = window.appData.store_items;
    const purchased = window.userData.purchasedItems;

    grid.innerHTML = allItems.map(item => {
        const isPurchased = purchased.includes(item.id);
        const isEquipped = window.userData.equippedItems[item.type] === item.id;
        
        let buttonHtml;
        if (isEquipped) {
            buttonHtml = `<button class="btn-ghost" disabled>Equipped</button>`;
        } else if (isPurchased) {
            buttonHtml = `<button class="btn-ghost" data-item-id="${item.id}" data-item-type="${item.type}" onclick="equipItem(this)">Equip</button>`;
        } else {
            buttonHtml = `<button class="btn" data-item-id="${item.id}" data-item-price="${item.price}" onclick="buyItem(this)">Buy (💎 ${item.price})</button>`;
        }

        // --- THIS PART IS NEW ---
        // Replaced the <img> tag with a styled <div>
        const placeholderImg = `
            <div class="item-placeholder-img">
                <span>${item.name}</span>
            </div>
        `;

        return `
            <div class="store-item-card">
                ${placeholderImg}
                <h3>${item.name}</h3>
                ${buttonHtml}
            </div>
        `;
    }).join('');
}

async function buyItem(button) {
    const itemId = button.dataset.itemId;
    const price = parseInt(button.dataset.itemPrice);

    if (window.userData.points >= price) {
        // Deduct points and add to inventory
        window.userData.points -= price;
        window.userData.purchasedItems.push(itemId);
        
        // Save and update UI
        await saveData('userData', window.userData);
        updateHeaderStats();
        initStore(); // Redraw the store to update buttons
        
        alert(`Successfully purchased item!`);
    } else {
        alert("You don't have enough points!");
    }
}

async function equipItem(button) {
    const itemId = button.dataset.itemId;
    const itemType = button.dataset.itemType;

    // Equip the new item
    window.userData.equippedItems[itemType] = itemId;
    
    // Save and redraw store
    await saveData('userData', window.userData);
    initStore();
}

// --- THIS FUNCTION IS UPDATED ---
function initAvatar() {
    const avatarDisplay = document.getElementById('avatar-display');
    if (!avatarDisplay) return;
    
    const equipped = window.userData.equippedItems;
    const allItems = window.appData.store_items;

    avatarDisplay.innerHTML = ''; // Clear existing

    // Find and add helmet
    const helmet = allItems.find(item => item.id === equipped.helmet);
    if (helmet) {
        // Replaced <img> with a styled <div>
        avatarDisplay.innerHTML += `
            <div class="avatar-placeholder-part helmet-placeholder">
                <span>${helmet.name}</span>
            </div>
        `;
    }

    // Find and add suit
    const suit = allItems.find(item => item.id === equipped.suit);
    if (suit) {
        // Replaced <img> with a styled <div>
        avatarDisplay.innerHTML += `
            <div class="avatar-placeholder-part suit-placeholder">
                <span>${suit.name}</span>
            </div>
        `;
    }
}
