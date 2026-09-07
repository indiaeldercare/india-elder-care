/**
 * India Elder Care Services - Forms & Modal System
 * Handles: Modals, Lead Form, Member Service Requests, Job Application, Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initModals();
  initLeadForms();
  initMemberServiceRequestForm();
  initCareerForm();
});

/* ==========================================================================
   1. Modal System
   ========================================================================== */
function initModals() {
  const overlayModals = document.querySelectorAll('.modal-overlay');

  window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // prevent background scrolling
    }
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Close triggers
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Click outside to close
  overlayModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlayModals.forEach(m => m.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });

  // Buttons with data-open-modal
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModal = trigger.dataset.openModal;
      window.openModal(targetModal);
    });
  });
}

/* ==========================================================================
   2. Toast Notifications
   ========================================================================== */
window.showToast = function(title, message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconSvg = type === 'success' 
    ? `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`
    : `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-content">
      <h5>${title}</h5>
      <p>${message}</p>
    </div>
  `;

  container.appendChild(toast);

  // Auto remove after 4.5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
};

/* ==========================================================================
   3. Lead & Free Consultation Forms
   ========================================================================== */
function initLeadForms() {
  const forms = ['heroLeadForm', 'modalLeadForm'];

  forms.forEach(formId => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="full_name"]')?.value || 'Valued Family';
      const city = form.querySelector('[name="parent_city"]')?.value || 'your selected city';
      const phone = form.querySelector('[name="contact_number"]')?.value || '';

      // Save submission to localStorage for demo persistence
      const submissions = JSON.parse(localStorage.getItem('care_inquiries') || '[]');
      submissions.push({
        name,
        city,
        phone,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('care_inquiries', JSON.stringify(submissions));

      // Reset form
      form.reset();

      // Close modal if inside modal
      const modal = form.closest('.modal-overlay');
      if (modal) {
        window.closeModal(modal.id);
      }

      // Show warm confirmation toast
      window.showToast(
        'Assessment Request Received!',
        `Thank you ${name}. Our Senior Care Coordinator in ${city} will call you within 2 hours to arrange a personalized care discussion.`,
        'success'
      );
    });
  });
}

/* ==========================================================================
   4. Member Service Request Form (Home Repair, Physio, Concerts, Escort)
   ========================================================================== */
function initMemberServiceRequestForm() {
  const form = document.getElementById('memberServiceRequestForm');
  if (!form) return;

  // Category change helper to adjust instructions placeholder
  const serviceRadios = form.querySelectorAll('input[name="req_service_type"]');
  const detailsField = form.querySelector('[name="service_details"]');

  serviceRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const parentOption = radio.closest('.service-type-option');
      form.querySelectorAll('.service-type-option').forEach(opt => opt.classList.remove('selected'));
      if (parentOption) parentOption.classList.add('selected');

      if (detailsField) {
        switch(radio.value) {
          case 'physiotherapy':
            detailsField.placeholder = 'e.g. Doctor recommendation, knee rehab, preferred male/female therapist...';
            break;
          case 'maintenance':
            detailsField.placeholder = 'e.g. Electrician for geyser, plumber for faucet leak, AC servicing...';
            break;
          case 'events':
            detailsField.placeholder = 'e.g. Sabha concert tickets, Chennai music season pass, temple festival escort...';
            break;
          case 'doctor_visit':
            detailsField.placeholder = 'e.g. Apollo Hospital appointment at 10 AM, wheelchair assistance needed...';
            break;
          default:
            detailsField.placeholder = 'Describe requirements to brief our Care Buddy...';
        }
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const memberName = form.querySelector('[name="member_name"]')?.value || 'Member';
    const serviceType = form.querySelector('input[name="req_service_type"]:checked')?.value || 'Care Service';

    form.reset();
    window.closeModal('serviceRequestModal');

    window.showToast(
      'Service Request Dispatched!',
      `Request registered for ${memberName}. Your dedicated Care Buddy has been notified and will coordinate with you shortly.`,
      'success'
    );
  });
}

/* ==========================================================================
   5. Career Form ("Become a Care Buddy")
   ========================================================================== */
function initCareerForm() {
  const form = document.getElementById('careBuddyCareerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const applicantName = form.querySelector('[name="applicant_name"]')?.value || 'Applicant';

    form.reset();
    window.closeModal('careerModal');

    window.showToast(
      'Application Submitted!',
      `Thank you, ${applicantName}! Our HR and Training team will review your credentials and get back to you for an interview.`,
      'success'
    );
  });
}
