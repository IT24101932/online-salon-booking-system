const apiBase = 'http://localhost:8080/api';
const token = localStorage.getItem('token') || '';
const serviceSelect = document.getElementById('serviceSelect');
const staffSelect = document.getElementById('staffSelect');
const bookingForm = document.getElementById('bookingForm');
const messageBox = document.getElementById('messageBox');

const fallbackServices = [
  { id: 1, serviceName: 'Signature Hair Cut', price: 60, duration: 45 },
  { id: 2, serviceName: 'Color Refresh', price: 120, duration: 90 },
  { id: 3, serviceName: 'Glow Facial', price: 85, duration: 50 },
];

const fallbackStaff = [
  { id: 1, fullName: 'Nadeesha' },
  { id: 2, fullName: 'Malith' },
  { id: 3, fullName: 'Sajani' },
];

async function loadServices() {
  try {
    const res = await fetch(`${apiBase}/services`);
    if (!res.ok) throw new Error('offline');
    const services = await res.json();
    renderServices(services);
  } catch (error) {
    renderServices(fallbackServices);
  }
}

function renderServices(services) {
  serviceSelect.innerHTML = services.map(service => `<option value="${service.id}">${service.serviceName} - Rs.${service.price}</option>`).join('');
}

async function loadStaff() {
  try {
    const res = await fetch(`${apiBase}/staff`);
    if (!res.ok) throw new Error('offline');
    const staff = await res.json();
    renderStaff(staff);
  } catch (error) {
    renderStaff(fallbackStaff);
  }
}

function renderStaff(staff) {
  staffSelect.innerHTML = '<option value="">Any stylist</option>' + staff.map(item => `<option value="${item.id}">${item.fullName}</option>`).join('');
}

bookingForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!token) {
    messageBox.textContent = 'Please login first.';
    return;
  }

  const payload = {
    serviceId: serviceSelect.value,
    staffId: staffSelect.value || null,
    bookingDate: document.getElementById('bookingDate').value,
    bookingTime: document.getElementById('bookingTime').value,
  };

  try {
    const res = await fetch(`${apiBase}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.id) {
      messageBox.textContent = 'Appointment booked successfully.';
      bookingForm.reset();
    } else {
      messageBox.textContent = 'Booking failed. Please try again.';
    }
  } catch (error) {
    messageBox.textContent = 'The booking service is unavailable right now. Please try again later.';
  }
});

loadServices();
loadStaff();
