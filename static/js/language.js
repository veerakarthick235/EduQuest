let currentLanguage = 'en';
let langData = {};

async function loadLanguage(lang) {
    if (langData[lang]) {
        return langData[lang];
    }
    
    try {
        const response = await fetch(`/static/data/lang/${lang}.json`);
        if (!response.ok) {
            throw new Error('Language file not found');
        }
        const data = await response.json();
        langData[lang] = data;
        return data;
    } catch (error) {
        console.error('Error loading language:', error);
        return langData['en']; // Default to English
    }
}

function translateUI(lang) {
    const data = langData[lang];
    if (!data) return;

    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (data[key]) {
            element.textContent = data[key];
        }
    });
    currentLanguage = lang;
    localStorage.setItem('eduquest_lang', lang);
}

async function initLanguage() {
    const savedLang = localStorage.getItem('eduquest_lang') || 'en';
    
    // Load English first as a fallback
    await loadLanguage('en');
    
    if (savedLang !== 'en') {
        await loadLanguage(savedLang);
    }
    
    translateUI(savedLang);

    const toggle = document.getElementById('language-toggle');
    if (toggle) {
        toggle.value = savedLang;
        toggle.addEventListener('change', async (e) => {
            const newLang = e.target.value;
            await loadLanguage(newLang);
            translateUI(newLang);
        });
    }
}
