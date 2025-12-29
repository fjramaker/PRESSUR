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

        // List of pages that require login
        const protectedPages = ['categories.html', 'session.html'];

        // 1. If on a protected page and NOT logged in -> Go to Login
        if (protectedPages.includes(page) && !currentUser) {
            window.location.href = 'index.html';
        }

        // 2. If on Login page and ALREADY logged in -> Go to Categories
        if ((page === 'index.html' || page === '') && currentUser) {
            window.location.href = 'categories.html';
        }
    }
};

// Run the check immediately
Session.check();