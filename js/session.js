/**
 * session.js
 * Handles "Authentication" and Route Protection
 * Include this in the <head> of every page.
 */

const SESSION_KEY = 'pressur_user_current';
const USERS_KEY = 'pressur_users_db';

const Session = {
    // Get the currently logged-in user
    getCurrentUser: () => {
        const userJson = localStorage.getItem(SESSION_KEY);
        return userJson ? JSON.parse(userJson) : null;
    },

    // Get all registered users (for the dropdown)
    getAllUsers: () => {
        const usersJson = localStorage.getItem(USERS_KEY);
        return usersJson ? JSON.parse(usersJson) : [];
    },

    // Login: Save user to session and redirect
    login: (user) => {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        window.location.href = 'categories.html';
    },

    // Logout: Clear session and redirect to login
    logout: () => {
        localStorage.removeItem(SESSION_KEY);
        window.location.href = 'index.html';
    },

    // The "Guard" Function - Runs on page load
    check: () => {
        const currentUser = Session.getCurrentUser();
        const path = window.location.pathname;
        const page = path.split("/").pop(); // Get filename (e.g., 'index.html')

        // categories.html now also contains the player + science views (single page).
        // session.html is kept only as a redirect stub for old links.
        const protectedPages = ['categories.html', 'settings.html'];

        // 1. If on a protected page and NOT logged in -> Go to Login
        if (protectedPages.includes(page) && !currentUser) {
            window.location.href = 'index.html';
        }

        // 2. If on Login page and ALREADY logged in -> Go to Categories
        if ((page === 'index.html' || page === '') && currentUser) {
            window.location.href = 'categories.html';
        }
    },

    toggleFavorite: (trackId) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY));
        const currentUser = Session.getCurrentUser();
        const userIndex = users.findIndex(u => u.id === currentUser.id);

        const favIndex = users[userIndex].favorites.indexOf(trackId);
        if (favIndex > -1) {
            users[userIndex].favorites.splice(favIndex, 1); // Remove if exists
        } else {
            users[userIndex].favorites.push(trackId); // Add if not
        }

        // Update both DB and current session
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        localStorage.setItem(SESSION_KEY, JSON.stringify(users[userIndex]));
        return users[userIndex].favorites.includes(trackId);
    },

    isFavorite: (trackId) => {
        const user = Session.getCurrentUser();
        return user && user.favorites ? user.favorites.includes(trackId) : false;
    },

    // Records one completed session. Keeps a short dated history (not just a running
    // total) so the weekly graph on the Session Complete / Settings screens has something
    // real to draw from. History is capped at 90 entries so it can't grow forever.
    saveSessionStats: (mins) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY));
        const currentUser = Session.getCurrentUser();
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        const user = users[userIndex];

        user.stats.totalSessions = (user.stats.totalSessions || 0) + 1;
        user.stats.totalMinutes = (user.stats.totalMinutes || 0) + Number(mins);
        user.stats.totalHours = (user.stats.totalMinutes / 60).toFixed(1);

        if (!Array.isArray(user.stats.history)) user.stats.history = [];
        user.stats.history.push({ date: new Date().toISOString().slice(0, 10), mins: Number(mins) });
        if (user.stats.history.length > 90) user.stats.history = user.stats.history.slice(-90);

        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }
};

// Run the check immediately
Session.check();
