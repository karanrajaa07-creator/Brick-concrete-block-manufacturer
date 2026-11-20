/**
 * TITAN BRICK & CONCRETE INDUSTRIES
 * Commercial Forms Validation & Feedback Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initQuoteModalForm();
  initDeliveryForm();
  initNewsletterForms();
  initAuthForms();
  initCommentForm();
});

/* ==========================================================================
   1. CONTACT US FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="fullName"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const category = form.querySelector('[name="productCategory"]')?.value;
    const quantity = form.querySelector('[name="quantity"]')?.value.trim();
    const location = form.querySelector('[name="deliveryLocation"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !phone || !email || !category || !quantity || !location) {
      window.showToast('Please complete all required fields (*)', 'error');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      window.showToast('Please enter a valid business email address', 'error');
      return;
    }

    // Submit feedback
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Validating & Generating Ticket...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      const ticketId = 'TBN-' + Math.floor(100000 + Math.random() * 900000);
      window.showToast(`Enquiry logged! Dispatch Ticket #${ticketId} created. (Demo frontend simulation: our plant sales engineer would contact you within 2 business hours).`, 'success', 6000);
    }, 1000);
  });
}

/* ==========================================================================
   2. QUICK QUOTE MODAL FORM
   ========================================================================== */
function initQuoteModalForm() {
  const form = document.getElementById('quick-quote-modal-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#quote-name')?.value.trim();
    const phone = form.querySelector('#quote-phone')?.value.trim();
    const email = form.querySelector('#quote-email')?.value.trim();
    const product = form.querySelector('#quote-product-select')?.value;
    const qty = form.querySelector('#quote-qty')?.value.trim();
    const location = form.querySelector('#quote-location')?.value.trim();

    if (!name || !phone || !email || !product || !qty) {
      window.showToast('Please fill out all required quote parameters', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Calculating Rate...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      window.closeAllModals();
      form.reset();

      window.showToast(`Bulk estimate generated for ${product} (${qty})! Quote Reference #EST-${Math.floor(10000 + Math.random() * 90000)} logged for review.`, 'success', 5000);
    }, 900);
  });
}

/* ==========================================================================
   3. DELIVERY FREIGHT ENQUIRY FORM
   ========================================================================== */
function initDeliveryForm() {
  const form = document.getElementById('delivery-enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const siteAddress = form.querySelector('[name="siteAddress"]')?.value.trim();
    const truckType = form.querySelector('[name="truckType"]')?.value;
    const estimatedTonnage = form.querySelector('[name="tonnage"]')?.value.trim();
    const contactPhone = form.querySelector('[name="phone"]')?.value.trim();

    if (!siteAddress || !truckType || !contactPhone) {
      window.showToast('Please provide your site location, truck requirement, and phone number', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Routing Fleet Route...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      window.showToast('Fleet dispatch schedule checked. Delivery route confirmed within serviceable radius. (Demo simulation feedback).', 'info', 5500);
    }, 1100);
  });
}

/* ==========================================================================
   4. NEWSLETTER SUBSCRIPTION FORMS
   ========================================================================== */
function initNewsletterForms() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !/^\S+@\S+\.\S+$/.test(input.value.trim())) {
        window.showToast('Please enter a valid engineering/contractor email', 'error');
        return;
      }

      const emailVal = input.value.trim();
      input.value = '';
      window.showToast(`Thank you! ${emailVal} has been subscribed to Titan Technical Bulletins & Monthly Wholesale Price Index.`, 'success', 4500);
    });
  });
}

/* ==========================================================================
   5. AUTHENTICATION FORMS (LOGIN & REGISTER)
   ========================================================================== */
function initAuthForms() {
  // Login Form
  const loginForm = document.getElementById('contractor-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('[name="email"]')?.value.trim();
      const password = loginForm.querySelector('[name="password"]')?.value;

      if (!email || !password) {
        window.showToast('Please provide your contractor email and portal password', 'error');
        return;
      }

      window.showToast(`Demo Portal: Authenticated as ${email}. Redirecting to Contractor Dashboard...`, 'success', 4000);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    });
  }

  // Register Form
  const regForm = document.getElementById('contractor-register-form');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const company = regForm.querySelector('[name="companyName"]')?.value.trim();
      const email = regForm.querySelector('[name="email"]')?.value.trim();
      const password = regForm.querySelector('[name="password"]')?.value;
      const confirm = regForm.querySelector('[name="confirmPassword"]')?.value;
      const terms = regForm.querySelector('[name="agreeTerms"]')?.checked;

      if (!company || !email || !password) {
        window.showToast('Please fill out all mandatory registration fields', 'error');
        return;
      }

      if (password !== confirm) {
        window.showToast('Passwords do not match. Please re-enter.', 'error');
        return;
      }

      if (!terms) {
        window.showToast('Please accept the Contractor Supply Terms & Conditions', 'error');
        return;
      }

      window.showToast(`Contractor wholesale account created for "${company}"! You may now sign in.`, 'success', 4500);
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    });
  }
}

/* ==========================================================================
   6. BLOG COMMENTS
   ========================================================================== */
function initCommentForm() {
  const commentForm = document.getElementById('article-comment-form');
  if (!commentForm) return;

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = commentForm.querySelector('[name="commentAuthor"]')?.value.trim();
    const comment = commentForm.querySelector('[name="commentText"]')?.value.trim();

    if (!author || !comment) {
      window.showToast('Please fill in your name and comment message', 'error');
      return;
    }

    const commentsList = document.getElementById('comments-container');
    if (commentsList) {
      const newComment = document.createElement('div');
      newComment.className = 'p-5 bg-gray-50 border border-gray-200 rounded-md mb-4 animate-fade-in';
      newComment.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <div class="font-heading font-bold text-gray-900">${author} <span class="ml-2 font-mono text-xs text-orange-600 bg-orange-100 px-2 py-0.5 rounded">Contractor</span></div>
          <span class="text-xs text-gray-400 font-mono">Just now</span>
        </div>
        <p class="text-gray-700 text-sm leading-relaxed">${comment}</p>
      `;
      commentsList.prepend(newComment);
    }

    commentForm.reset();
    window.showToast('Your comment has been posted successfully!', 'success');
  });
}
