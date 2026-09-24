document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = '#d9534f';
      } else {
        field.style.borderColor = '';
      }
    });

    if (!valid) {
      event.preventDefault();
      const message = document.createElement('p');
      message.textContent = 'Please complete the required fields.';
      message.style.color = '#b33a3a';
      form.appendChild(message);
      setTimeout(() => message.remove(), 2200);
    }
  });
});
