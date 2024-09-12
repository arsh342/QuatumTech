// Simulated local database with user data
const users = [
    {
        username: "admin",
        password: "admin123",
        role: "admin",
        name: "John Doe",
        title: "Chief Administrator",
        profileImg: "https://static.vecteezy.com/system/resources/previews/020/429/953/non_2x/admin-icon-vector.jpg",
        tasks: [
            { title: "Review user applications", dueDate: "September 20, 2024" },
            { title: "Generate monthly reports", dueDate: "October 5, 2024" },
            { title: "Update system settings", dueDate: "October 15, 2024" }
        ]
    },
    {
        username: "employee",
        password: "employee123",
        role: "employee",
        name: "Jane Smith",
        title: "Software Developer",
        profileImg: "https://static.vecteezy.com/system/resources/previews/035/039/881/non_2x/employee-icon-glyph-icon-for-your-website-mobile-presentation-and-logo-design-vector.jpg",
        tasks: [
            { title: "Complete feature development", dueDate: "September 25, 2024" },
            { title: "Submit weekly progress report", dueDate: "September 28, 2024" },
            { title: "Attend team meeting", dueDate: "September 30, 2024" }
        ]
    }
];

// Selecting elements
const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('dashboard-container');
const userDashboard = document.getElementById('user-dashboard');
const loginMessage = document.getElementById('login-message');
const logoutBtn = document.getElementById('logout-btn');

// Handle login form submission
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Find user
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        loginSuccess(user);
    } else {
        loginFailure();
    }
});

function loginSuccess(user) {
    loginMessage.textContent = ' ';
    loginMessage.style.color = '#2ecc71';

    setTimeout(() => {
        loginContainer.style.display = 'none';
        dashboardContainer.style.display = 'block';
        setupDashboard(user);
    }, 1000);
}

function loginFailure() {
    loginMessage.textContent = 'Invalid username or password!';
    loginMessage.style.color = '#e74c3c';
    shakeForm();
}

function shakeForm() {
    loginForm.classList.add('shake');
    setTimeout(() => loginForm.classList.remove('shake'), 500);
}

function setupDashboard(user) {
    document.getElementById('dashboard-title').textContent = `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard`;
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-title').textContent = user.title;
    document.getElementById('profile-img').src = user.profileImg;

    const taskTimeline = document.getElementById('task-timeline');
    taskTimeline.innerHTML = ''; // Clear existing tasks

    user.tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskTimeline.appendChild(taskElement);
    });
}

function createTaskElement(task) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('timeline-item');

    const taskContent = document.createElement('div');
    taskContent.classList.add('timeline-content');

    const taskTitle = document.createElement('h5');
    taskTitle.textContent = task.title;

    const taskDate = document.createElement('p');
    taskDate.textContent = `Complete by: ${task.dueDate}`;

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', () => {
        taskContent.style.backgroundColor = '#d5f5e3';
        completeBtn.textContent = 'Completed';
        completeBtn.disabled = true;
    });

    taskContent.appendChild(taskTitle);
    taskContent.appendChild(taskDate);
    taskContent.appendChild(completeBtn);
    taskItem.appendChild(taskContent);

    return taskItem;
}

// Handle logout
logoutBtn.addEventListener('click', function () {
    dashboardContainer.style.display = 'none';
    loginContainer.style.display = 'block';
    userDashboard.style.display = 'none';
    loginForm.reset();
    loginMessage.textContent = '';
});

// Add smooth transitions
document.body.style.opacity = '0';
window.addEventListener('DOMContentLoaded', (event) => {
    document.body.style.opacity = '1';
});

// Add current date to the navbar
const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const dateElement = document.createElement('span');
dateElement.textContent = currentDate;
dateElement.classList.add('current-date');
document.querySelector('.navbar').appendChild(dateElement);