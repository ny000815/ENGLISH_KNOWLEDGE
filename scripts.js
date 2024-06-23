console.log("Script loaded successfully");

const themeToggle = document.getElementById('themeToggle');

function switchTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
}

function updateThemeToggleIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '🌝' : '🌞';
}

themeToggle.addEventListener('click', switchTheme);

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', defaultTheme);
    updateThemeToggleIcon(defaultTheme);
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    const postGrid = document.getElementById('postGrid');
    if (postGrid) {
        const postIndex = 'Posts/post_index.html';
        fetch(postIndex)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const postCards = doc.querySelectorAll('.post-card');
                postCards.forEach(postCard => {
                    postGrid.appendChild(postCard);
                });
            })
            .catch(error => console.error('Error loading post index:', error));
    }
});