document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    const logoutButton = document.getElementById('logoutButton');

    const users = JSON.parse(localStorage.getItem('users')) || [
        { email: 'user@example.com', password: 'password123' }
    ];

    function showMessage(message, isError = false) {
        errorMessage.textContent = message;
        errorMessage.style.color = isError ? 'red' : 'green';
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    function login(email, password) {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            showMessage('Email ou senha inválidos', true);
        }
    }

    function logout() {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            login(email, password);
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && window.location.pathname.includes('index.html')) {
        document.getElementById('user-name').textContent = currentUser.email.split('@')[0];
        document.getElementById('user-email').textContent = currentUser.email;
    } else if (!currentUser && window.location.pathname.includes('index.html')) {
        window.location.href = 'login.html';
    }
});
