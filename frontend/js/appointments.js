const apiBase = 'http://localhost:8080/api';
const token = localStorage.getItem('token') || '';
const appointmentsList = document.getElementById('appointmentsList');

async function loadAppointments() {
  if (!token) {
    appointmentsList.innerHTML = '<div class="page-card"><p>Please log in first.</p></div>';
    return;
  }

  try {
    const res = await fetch(`${apiBase}/appointments/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('offline');

    const appointments = await res.json();
    if (!appointments.length) {
      appointmentsList.innerHTML = '<div class="page-card"><p>No appointments yet.</p></div>';
      return;
    }

    appointmentsList.innerHTML = `
      <div class="page-card">
        <div class="table-shell">
          <table>
            <thead>
              <tr><th>Date</th><th>Time</th><th>Service</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${appointments.map(item => `
                <tr>
                  <td>${item.bookingDate}</td>
                  <td>${item.bookingTime}</td>
                  <td>${item.service?.serviceName || 'Service'}</td>
                  <td>${item.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (error) {
    appointmentsList.innerHTML = '<div class="page-card"><p>Your appointments cannot be loaded right now.</p></div>';
  }
}

loadAppointments();
