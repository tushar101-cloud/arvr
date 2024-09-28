// Sidebar functionality
const sidebar = document.getElementById('sidebar');
const openSidebarBtn = document.getElementById('open-sidebar');
const closeSidebarBtn = document.getElementById('close-sidebar');
const navbar = document.getElementById('navbar');

// Function to toggle sidebar
function toggleSidebar() {
  sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
  // Adjust navbar positioning when the sidebar is open or closed
  navbar.style.marginLeft = sidebar.style.display === 'block' ? '250px' : '0';
}

// Open sidebar when clicking the button
openSidebarBtn.addEventListener('click', () => {
  toggleSidebar();
});

// Close sidebar when clicking the close button
closeSidebarBtn.addEventListener('click', () => {
  toggleSidebar();
});

// Admin login form handling
document.getElementById('admin-login').addEventListener('click', () => {
  window.location.href = '/admin.html';  // Redirect to admin login page
});

// Form submission for admin login
document.getElementById('admin-login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  if (data.message === 'Login successful') {
    alert('Admin logged in');
    window.location.href = '/admin-tools.html';  // Redirect to admin tools page
  } else {
    alert('Invalid credentials');
  }
});
