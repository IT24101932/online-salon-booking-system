const apiBase = 'http://localhost:8080/api';
let token = localStorage.getItem('token') || '';
let services = [];
let staff = [];

const serviceList = document.getElementById('serviceList');
const serviceSelect = document.getElementById('serviceSelect');
const staffSelect = document.getElementById('staffSelect');
const bookingForm = document.getElementById('bookingForm');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const messageBox = document.getElementById('messageBox');
const authStatus = document.getElementById('authStatus');

function setMessage(text, isError = false) {
  messageBox.textContent = text;
  messageBox.style.color = isError ? '#b42318' : '#8f4d3c';
}

async function loadServices() {
  const res = await fetch(`${apiBase}/services`);
  services = await res.json();
  serviceList.innerHTML = services.map(service => `
    <article class="card">
      <img src="${service.image || 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80'}" alt="${service.serviceName}">
      <h3>${service.serviceName}</h3>
      <p>${service.description}</p>
      <div class="section-title" style="margin-top: 0.5rem;">
        <span>${service.duration} min</span>
        <strong class="price">Rs.${service.price}</strong>
      </div>
    </article>
  `).join('');

  serviceSelect.innerHTML = services.map(service => `<option value="${service.id}">${service.serviceName} - Rs.${service.price}</option>`).join('');
}

async function loadStaff() {
  const res = await fetch(`${apiBase}/staff`);
  staff = await res.json();
  staffSelect.innerHTML = '<option value="">Any stylist</option>' + staff.map(item => `<option value="${item.id}">${item.fullName} (${item.specialization || 'Stylist'})</option>`).join('');
}

function updateAuthUI() {
  authStatus.textContent = token ? 'Signed in' : 'Guest mode';
}

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = {
    fullName: document.getElementById('regName').value,
    email: document.getElementById('regEmail').value,
    password: document.getElementById('regPassword').value,
    phone: document.getElementById('regPhone').value,
  };

  const res = await fetch(`${apiBase}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (data.token) {
    token = data.token;
    localStorage.setItem('token', token);
    updateAuthUI();
    setMessage('Registration complete. You can book now.');
  } else {
    setMessage('Registration failed. Try another email.', true);
  }
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = {
    email: document.getElementById('loginEmail').value,
    password: document.getElementById('loginPassword').value,
  };

  const res = await fetch(`${apiBase}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (data.token) {
    token = data.token;
    localStorage.setItem('token', token);
    updateAuthUI();
    setMessage('Welcome back! Your booking is ready.');
  } else {
    setMessage('Login failed. Check your credentials.', true);
  }
});

bookingForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!token) {
    setMessage('Please log in before booking.', true);
    return;
  }

  const payload = {
    serviceId: serviceSelect.value,
    staffId: staffSelect.value || null,
    bookingDate: document.getElementById('bookingDate').value,
    bookingTime: document.getElementById('bookingTime').value,
  };

  const res = await fetch(`${apiBase}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (data.id) {
    setMessage('Appointment booked successfully.');
    bookingForm.reset();
  } else {
    setMessage('Booking failed. Please try again.', true);
  }
});

updateAuthUI();
loadServices();
loadStaff();
