const urlStorage = JSON.parse(localStorage.getItem('urlStorage')) || {};

// URL Shortening Logic
function shortenUrl() {
    const url = document.getElementById('urlInput').value;
    const slug = document.getElementById('slugInput').value || Math.random().toString(36).substring(7);
    urlStorage[slug] = { url: url, count: 0 };
    localStorage.setItem('urlStorage', JSON.stringify(urlStorage));
    document.getElementById('shortenedUrl').innerHTML = `
        <strong>Shortened URL:</strong> 
        <a href="?r=${slug}">${window.location.origin}?r=${slug}</a>`;
}

// Redirection Logic
function redirectToUrl() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('r');
    if (slug && urlStorage[slug]) {
        urlStorage[slug].count += 1;
        localStorage.setItem('urlStorage', JSON.stringify(urlStorage));
        window.location.href = urlStorage[slug].url;
    }
}

// Admin Login
function login() {
    const password = document.getElementById('password').value;
    if (password === 'admin123') {
        document.getElementById('adminPanel').style.display = 'block';
        loadAnalytics();
    } else {
        alert('Incorrect password!');
    }
}

// Load Analytics
function loadAnalytics() {
    const analyticsTable = document.getElementById('analyticsTable');
    analyticsTable.innerHTML = '';
    for (const slug in urlStorage) {
        const row = `<tr>
            <td>${slug}</td>
            <td>${urlStorage[slug].url}</td>
            <td>${urlStorage[slug].count}</td>
        </tr>`;
        analyticsTable.innerHTML += row;
    }
}

window.onload = () => {
    if (window.location.search.includes('r=')) {
        redirectToUrl();
    }
};