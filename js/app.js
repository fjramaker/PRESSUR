/**
 * app.js
 * Handles Login Form, User Creation, and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Only run this logic if we are on the login page
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        initializeLoginPage();
    }
});

function initializeLoginPage() {
    const userSelect = document.getElementById('userSelect');
    const nameGroup = document.getElementById('nameGroup');
    const existingUsers = Session.getAllUsers();

    // 1. Populate the "Select User" Dropdown
    if (existingUsers.length > 0) {
        existingUsers.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            userSelect.appendChild(option);
        });
    }

    // 2. Handle Dropdown Change (Show/Hide Name Input)
    userSelect.addEventListener('change', function() {
        if (this.value === 'new') {
            nameGroup.style.display = 'block';
            document.getElementById('userName').setAttribute('required', 'true');
        } else {
            nameGroup.style.display = 'none';
            document.getElementById('userName').removeAttribute('required');
        }
    });

    // 3. Handle Form Submission
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const selection = userSelect.value;
        const pin = document.getElementById('userPin').value;
        
        if (selection === 'new') {
            // --- CREATE NEW USER ---
            const name = document.getElementById('userName').value.trim();
            const users = Session.getAllUsers();

            // Check for duplicate names (Case Insensitive)
            const nameExists = users.some(u => u.name.toLowerCase() === name.toLowerCase());
            
            if (nameExists) {
                alert("This name is already taken. Please choose another or select your profile from the list.");
                return;
            }

            if (!name || pin.length !== 4) {
                alert("Please enter a name and a 4-digit PIN.");
                return;
            }

            const newUser = {
                id: 'user_' + Date.now(),
                name: name,
                pin: pin,
                favorites: [],
                stats: { totalSessions: 0, totalMinutes: 0 }
            };

            users.push(newUser);
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
            Session.login(newUser);
        } else {
            // --- LOGIN EXISTING USER ---
            const users = Session.getAllUsers();
            const foundUser = users.find(u => u.id === selection);

            if (foundUser && foundUser.pin === pin) {
                Session.login(foundUser);
            } else {
                alert("Incorrect PIN. Please try again.");
                document.getElementById('userPin').value = ''; // Clear PIN
            }
        }
    });
}