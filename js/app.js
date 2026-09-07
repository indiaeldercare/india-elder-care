/**
 * India Elder Care Services - Clean & Lightweight App Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact Form Submission Handling
  const contactForm = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (contactForm && feedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('[name="name"]').value;
      const phone = contactForm.querySelector('[name="phone"]').value;
      const city = contactForm.querySelector('[name="city"]').value;
      const service = contactForm.querySelector('[name="service"]').value;

      // Display warm, reassuring confirmation feedback
      feedback.style.display = 'block';
      feedback.style.background = '#e8f0ec';
      feedback.style.color = '#2d5a46';
      feedback.style.border = '1px solid #d4e4db';
      feedback.innerHTML = `
        <strong>Thank you, ${name}!</strong><br>
        Your consultation request for <em>${service}</em> in ${city} has been received. Our Care Coordinator will reach you at <strong>${phone}</strong> shortly.
      `;

      // Reset form fields
      contactForm.reset();

      // Scroll to feedback gently
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
});
