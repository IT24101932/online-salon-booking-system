const apiBase = 'http://localhost:8080/api';
const token = localStorage.getItem('token') || '';
const adminList = document.getElementById('adminList');

async function loadAdminAppointments() {
  if (!token) {
    adminList.innerHTML = '<p>Please log in as admin first.</p>';
    return;
  }

  const res = await fetch(`${apiBase}/appointments/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 403) {
    adminList.innerHTML = '<p>Admin access required.</p>';
    return;
  }

  const appointments = await res.json();
  if (!appointments.length) {
    adminList.innerHTML = '<p>No bookings found.</p>';
    return;
  }

  adminList.innerHTML = `
    <table>
      <thead>
        <tr><th>Customer</th><th>Date</th><th>Time</th><th>Service</th><th>Status</th></tr>
      </thead>
      <tbody>
        ${appointments.map(item => `
          <tr>
            <td>${item.user?.fullName || 'Customer'}</td>
            <td>${item.bookingDate}</td>
            <td>${item.bookingTime}</td>
            <td>${item.service?.serviceName || 'Service'}</td>
            <td>
              <select class="small" data-id="${item.id}" data-current="${item.status}">
                <option value="PENDING" ${item.status === 'PENDING' ? 'selected' : ''}>PENDING</option>
                <option value="CONFIRMED" ${item.status === 'CONFIRMED' ? 'selected' : ''}>CONFIRMED</option>
                <option value="CANCELLED" ${item.status === 'CANCELLED' ? 'selected' : ''}>CANCELLED</option>
                <option value="COMPLETED" ${item.status === 'COMPLETED' ? 'selected' : ''}>COMPLETED</option>
              </select>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  document.querySelectorAll('select.small').forEach((select) => {
    select.addEventListener('change', async (event) => {
      const id = event.target.getAttribute('data-id');
      const status = event.target.value;
      await fetch(`${apiBase}/appointments/${id}/status?status=${status}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      loadAdminAppointments();
    });
  });
}

loadAdminAppointments();
