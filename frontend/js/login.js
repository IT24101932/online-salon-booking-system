const apiBase = 'http://localhost:8080/api';
const form = document.getElementById('loginForm');
const messageBox = document.getElementById('messageBox');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = {
    email: document.getElementById('loginEmail').value,
    password: document.getElementById('loginPassword').value,
  };

  try {
    const res = await fetch(`${apiBase}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      messageBox.textContent = 'Login successful. You can now book.';
      window.location.href = 'booking.html';
    } else {
      messageBox.textContent = 'Login failed. Please try again.';
    }
  } catch (error) {
    messageBox.textContent = 'The authentication service is unavailable right now.';
  }
});
