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

  // Contact Form Submission Handling via FormSubmit AJAX
  const contactForm = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

  if (contactForm && feedback) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('[name="name"]').value.trim();
      const phone = contactForm.querySelector('[name="phone"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const city = contactForm.querySelector('[name="city"]').value.trim();
      const service = contactForm.querySelector('[name="service"]').value;
      const notes = contactForm.querySelector('[name="notes"]').value.trim();

      // Set button loading state
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Submitting Request...</span>';
      }

      feedback.style.display = 'none';

      try {
        const response = await fetch('https://formsubmit.co/ajax/bsrajan2013@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            Name: name,
            Phone: phone,
            Email: email || 'Not provided',
            City: city,
            Service: service,
            Notes: notes || 'None',
            _subject: `New Consultation Request: ${name} (${city}) - India Elder Care`,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const result = await response.json();

        if (response.ok || result.success === "true" || result.success === true) {
          feedback.style.display = 'block';
          feedback.style.background = '#e8f0ec';
          feedback.style.color = '#2d5a46';
          feedback.style.border = '1px solid #d4e4db';
          feedback.innerHTML = `
            <strong>Thank you, ${name}!</strong><br>
            Your consultation request for <em>${service}</em> in ${city} has been received and routed to <strong>bsrajan2013@gmail.com</strong>. Our Care Coordinator will reach you at <strong>${phone}</strong> shortly.
          `;
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Submission error');
        }
      } catch (err) {
        feedback.style.display = 'block';
        feedback.style.background = '#fbeae5';
        feedback.style.color = '#9c3418';
        feedback.style.border = '1px solid #f7c8bc';
        feedback.innerHTML = `
          <strong>Notice:</strong> We could not submit your request automatically. Please call or WhatsApp us directly at <a href="tel:+919025878764" style="color: inherit; text-decoration: underline; font-weight: 700;">+91 90258 78764</a> / <a href="tel:+919841063333" style="color: inherit; text-decoration: underline; font-weight: 700;">+91 98410 63333</a> or email <a href="mailto:bsrajan2013@gmail.com" style="color: inherit; text-decoration: underline; font-weight: 700;">bsrajan2013@gmail.com</a>.
        `;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
});
