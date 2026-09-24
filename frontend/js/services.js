const apiBase = 'http://localhost:8080/api';
const serviceList = document.getElementById('serviceList');

const fallbackServices = [
  { serviceName: 'Signature Hair Cut', description: 'Precision styling with a polished finish.', duration: 45, price: 60, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80' },
  { serviceName: 'Color Refresh', description: 'Vibrant tones with premium care and shine.', duration: 90, price: 120, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80' },
  { serviceName: 'Glow Facial', description: 'Renewing skincare for a brighter, calmer complexion.', duration: 50, price: 85, image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80' },
];

async function loadServices() {
  try {
    const res = await fetch(`${apiBase}/services`);
    if (!res.ok) throw new Error('Failed to load services');
    const services = await res.json();
    if (services && services.length > 0) {
      renderServices(services);
    } else {
      renderServices(fallbackServices);
    }
  } catch (error) {
    renderServices(fallbackServices);
  }
}

function renderServices(services) {
  if (!serviceList) return;
  serviceList.innerHTML = services.map(service => `
    <article class="service-card reveal visible">
      <img src="${service.image || 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80'}" alt="${service.serviceName}">
      <div class="service-body">
        <h3>${service.serviceName}</h3>
        <p>${service.description || ''}</p>
        <div class="service-meta">
          <span>${service.duration} min</span>
          <strong>Rs.${service.price}</strong>
        </div>
      </div>
    </article>
  `).join('');
}

loadServices();
