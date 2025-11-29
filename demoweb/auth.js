/* ============================================
   AUTHENTICATION SYSTEM
   ============================================ */

class AuthSystem {
    constructor() {
        this.currentUser = this.getStoredUser();
        this.users = this.getStoredUsers();
        this.initializeUI();
    }

    getStoredUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }

    getStoredUsers() {
        const usersData = localStorage.getItem('allUsers');
        return usersData ? JSON.parse(usersData) : [];
    }

    saveUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;
    }

    saveAllUsers(users) {
        localStorage.setItem('allUsers', JSON.stringify(users));
        this.users = users;
    }

    signup(name, email, password, confirmPassword) {
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            return { success: false, message: 'All fields are required.' };
        }

        if (password !== confirmPassword) {
            return { success: false, message: 'Passwords do not match.' };
        }

        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters.' };
        }

        if (this.users.some(u => u.email === email)) {
            return { success: false, message: 'Email already registered.' };
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // In production, this should be hashed
            createdAt: new Date().toISOString(),
            sessions: []
        };

        this.users.push(newUser);
        this.saveAllUsers(this.users);
        this.saveUser({ id: newUser.id, name, email });

        return { success: true, message: 'Account created successfully!' };
    }

    login(email, password) {
        // Validation
        if (!email || !password) {
            return { success: false, message: 'Email and password are required.' };
        }

        const user = this.users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, message: 'Invalid email or password.' };
        }

        this.saveUser({ id: user.id, name: user.name, email: user.email });
        return { success: true, message: 'Login successful!' };
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    saveSession(sessionData) {
        if (!this.currentUser) return;

        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex === -1) return;

        if (!this.users[userIndex].sessions) {
            this.users[userIndex].sessions = [];
        }

        this.users[userIndex].sessions.push({
            id: Date.now().toString(),
            ...sessionData,
            timestamp: new Date().toISOString()
        });

        this.saveAllUsers(this.users);
    }

    getUserSessions() {
        if (!this.currentUser) return [];

        const user = this.users.find(u => u.id === this.currentUser.id);
        return user ? user.sessions || [] : [];
    }

    initializeUI() {
        // This will be called on page load to update UI based on auth state
        const authLink = document.getElementById('auth-link');
        const logoutLinks = document.querySelectorAll('#logout-link, #user-logout-btn');

        if (this.isLoggedIn()) {
            if (authLink) authLink.textContent = `${this.currentUser.name} ▼`;
            logoutLinks.forEach(link => link.style.display = 'inline-block');
        } else {
            if (authLink) authLink.textContent = 'Login';
            logoutLinks.forEach(link => link.style.display = 'none');
        }
    }

    updateUI() {
        this.initializeUI();
    }
}

// Global auth instance
const auth = new AuthSystem();

/* ============================================
   UI EVENT LISTENERS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Auth Modal
    const authLink = document.getElementById('auth-link');
    const authBtn = document.getElementById('auth-btn');
    const authModal = document.getElementById('auth-modal');
    const closeBtn = authModal?.querySelector('.close-btn');

    if (authLink) {
        authLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (auth.isLoggedIn()) {
                auth.logout();
                auth.updateUI();
                window.location.href = 'index.html';
            } else {
                authModal.classList.remove('hidden');
            }
        });
    }

    if (authBtn) {
        authBtn.addEventListener('click', () => {
            if (auth.isLoggedIn()) {
                auth.logout();
                auth.updateUI();
                location.reload();
            } else {
                authModal.classList.remove('hidden');
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            authModal.classList.add('hidden');
        });
    }

    // Auth tabs
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(f => f.classList.add('hidden'));
            tab.classList.add('active');
            document.getElementById(`${tabName}-form`).classList.remove('hidden');
        });
    });

    // Login
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const result = auth.login(email, password);
            if (result.success) {
                alert(result.message);
                auth.updateUI();
                authModal.classList.add('hidden');
                // Redirect to profile after login
                window.location.href = 'profile.html';
            } else {
                alert(result.message);
            }
        });
    }

    // Sign Up
    const signupBtn = document.getElementById('signup-btn');
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm').value;

            const result = auth.signup(name, email, password, confirmPassword);
            if (result.success) {
                alert(result.message);
                auth.updateUI();
                authModal.classList.add('hidden');
                // Redirect to profile after signup
                window.location.href = 'profile.html';
            } else {
                alert(result.message);
            }
        });
    }

    // Logout buttons
    const logoutLinks = document.querySelectorAll('#logout-link, #user-logout-btn');
    logoutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            auth.logout();
            auth.updateUI();
            window.location.href = 'index.html';
        });
    });

    auth.updateUI();
});
