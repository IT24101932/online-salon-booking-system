const apiBase = 'http://localhost:8080/api';
const form = document.getElementById('registerForm');
const messageBox = document.getElementById('messageBox');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  messageBox.textContent = '';
  messageBox.style.color = '#8f4d3c';

  const password = document.getElementById('regPassword').value;
  if (password.length < 6) {
    messageBox.style.color = '#b42318';
    messageBox.textContent = 'Password must be at least 6 characters.';
    return;
  }

  const payload = {
    fullName: document.getElementById('regName').value,
    email: document.getElementById('regEmail').value,
    password: password,
    phone: document.getElementById('regPhone').value,
  };

  try {
    const res = await fetch(`${apiBase}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      messageBox.style.color = 'green';
      messageBox.textContent = 'Registration successful! Redirecting to booking...';
      setTimeout(() => {
        window.location.href = 'booking.html';
      }, 1500);
    } else {
      messageBox.style.color = '#b42318';
      messageBox.textContent = data.message || 'Registration failed. Email may already be in use.';
    }
  } catch (error) {
    messageBox.style.color = '#b42318';
    messageBox.textContent = 'Server connection failed. Make sure the backend is running.';
  }
});
