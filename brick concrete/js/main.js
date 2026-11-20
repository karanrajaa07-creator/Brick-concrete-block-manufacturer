/**
 * TITAN BRICK & CONCRETE INDUSTRIES
 * Main Interactive Engine (Global UI, Dark/Light, LTR/RTL, Modals, Toasts, Sticky Nav, Drawer, Counters)
 */

// Immediate Theme & Direction Initialization to prevent FOUC (Flash of Unstyled Content)
(function initImmediateState() {
  try {
    const savedTheme = localStorage.getItem('titan-theme') || 'dark';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }

    const savedDir = localStorage.getItem('titan-dir') || 'ltr';
    if (savedDir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  } catch (e) {}
})();

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndDirection();
  initStickyHeader();
  initMobileMenu();
  initActiveNavLink();
  initBackToTop();
  initCounters();
  initGlobalModals();
});

/* ==========================================================================
   1. THEME (DARK / LIGHT) & DIRECTION (LTR / RTL) CONTROLS
   ========================================================================== */
function initThemeAndDirection() {
  updateToggleButtonsUI();

  // Event delegation for all direction buttons (desktop navbar + mobile drawer)
  document.addEventListener('click', (e) => {
    const dirBtn = e.target.closest('.dir-opt-btn');
    if (dirBtn) {
      e.preventDefault();
      const targetDir = dirBtn.getAttribute('data-dir');
      setDirection(targetDir);
      return;
    }

    const themeBtn = e.target.closest('.theme-opt-btn');
    if (themeBtn) {
      e.preventDefault();
      const targetTheme = themeBtn.getAttribute('data-theme');
      setTheme(targetTheme);
      return;
    }
  });
}

function setDirection(dir) {
  if (dir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
    localStorage.setItem('titan-dir', 'rtl');
    showToast('Switched to RTL (Right-to-Left Layout)', 'info', 2500);
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    localStorage.setItem('titan-dir', 'ltr');
    showToast('Switched to LTR (Left-to-Right Layout)', 'info', 2500);
  }
  updateToggleButtonsUI();
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    localStorage.setItem('titan-theme', 'dark');
    showToast('Switched to Dark Mode', 'info', 2500);
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    localStorage.setItem('titan-theme', 'light');
    showToast('Switched to Light Mode', 'info', 2500);
  }
  updateToggleButtonsUI();
}

function updateToggleButtonsUI() {
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const currentDir = document.documentElement.getAttribute('dir') || 'ltr';

  // Update direction buttons
  document.querySelectorAll('.dir-opt-btn').forEach(btn => {
    if (btn.getAttribute('data-dir') === currentDir) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update theme buttons
  document.querySelectorAll('.theme-opt-btn').forEach(btn => {
    if (btn.getAttribute('data-theme') === currentTheme) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

/* ==========================================================================
   2. STICKY HEADER & SCROLL BEHAVIOR
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   3. MOBILE DRAWER MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');

  if (!toggleBtn || !drawer) return;

  function openMenu() {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    drawer.classList.add('drawer-open');
    if (isRtl) {
      drawer.style.transform = 'translateX(0)';
    } else {
      drawer.classList.add('translate-x-0');
      drawer.classList.remove('translate-x-full');
      drawer.style.transform = '';
    }
    if (overlay) {
      overlay.classList.remove('hidden', 'opacity-0');
      overlay.classList.add('opacity-100');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    drawer.classList.remove('drawer-open');
    if (isRtl) {
      drawer.style.transform = 'translateX(-100%)';
    } else {
      drawer.classList.remove('translate-x-0');
      drawer.classList.add('translate-x-full');
      drawer.style.transform = '';
    }
    if (overlay) {
      overlay.classList.remove('opacity-100');
      overlay.classList.add('opacity-0');
      setTimeout(() => overlay.classList.add('hidden'), 300);
    }
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  const mobileLinks = drawer.querySelectorAll('a:not(.dropdown-toggle)');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   4. ACTIVE NAV LINK HIGHLIGHTING
   ========================================================================== */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link-item');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-brick-red', 'font-bold');
      link.classList.remove('text-concrete-300', 'text-concrete-200');
      link.style.borderBottom = '2px solid var(--brick-red)';
    }
  });
}

/* ==========================================================================
   5. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   6. ANIMATED STATS COUNTER
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  let animated = false;

  const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-target') || el.innerText.replace(/[^0-9]/g, ''), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000;
    const step = 20;
    let current = 0;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.innerText = prefix + target.toLocaleString() + suffix;
        clearInterval(timer);
      } else {
        el.innerText = prefix + Math.floor(current).toLocaleString() + suffix;
      }
    }, step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(c => countUp(c));
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   7. GLOBAL QUOTE & PRODUCT MODALS
   ========================================================================== */
function initGlobalModals() {
  document.addEventListener('click', (e) => {
    const quoteTrigger = e.target.closest('[data-open-quote]');
    if (quoteTrigger) {
      e.preventDefault();
      const productName = quoteTrigger.getAttribute('data-product-name') || '';
      openQuoteModal(productName);
      return;
    }

    const detailsTrigger = e.target.closest('[data-open-details]');
    if (detailsTrigger) {
      e.preventDefault();
      const productId = detailsTrigger.getAttribute('data-product-id');
      openProductDetailsModal(productId);
      return;
    }

    const closeTrigger = e.target.closest('[data-close-modal]');
    if (closeTrigger) {
      e.preventDefault();
      closeAllModals();
      return;
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });
}

function openQuoteModal(productName = '') {
  const modal = document.getElementById('quote-modal');
  if (!modal) return;
  const productInput = modal.querySelector('#quote-product-select');
  if (productInput && productName) {
    productInput.value = productName;
  }
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = '';
}

function openProductDetailsModal(productId) {
  const modal = document.getElementById('details-modal');
  if (!modal || !window.PRODUCTS_DATA) return;

  const product = window.PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const content = modal.querySelector('#details-modal-content');
  if (content) {
    content.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div class="relative overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 mb-4 h-72">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
            <span class="absolute top-3 left-3 bg-red-700 text-white font-mono text-xs uppercase px-2.5 py-1 rounded font-bold">${product.badge || 'Industrial Spec'}</span>
          </div>
          <div class="bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 p-4 rounded text-sm text-gray-700 dark:text-gray-300">
            <div class="font-bold text-gray-900 dark:text-white mb-1 font-heading text-lg">Recommended Applications:</div>
            <p>${product.specs.recommendedUse || 'Commercial foundations & structural envelope systems.'}</p>
          </div>
        </div>
        <div>
          <div class="text-xs uppercase font-mono tracking-wider text-orange-600 font-semibold mb-1">${product.categoryLabel}</div>
          <h2 class="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-3">${product.name}</h2>
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">${product.shortDesc}</p>

          <div class="border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-6 space-y-2.5 text-sm">
            <div class="flex justify-between items-center">
              <span class="text-gray-500 dark:text-gray-400">Standard Dimensions:</span>
              <span class="font-mono font-semibold text-gray-900 dark:text-white">${product.sizes}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500 dark:text-gray-400">Verified Compressive Strength:</span>
              <span class="font-mono font-bold text-red-700 dark:text-red-400">${product.strength}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500 dark:text-gray-400">Dry Density:</span>
              <span class="font-mono text-gray-800 dark:text-gray-200">${product.specs.density || 'Standard'}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500 dark:text-gray-400">Water Absorption:</span>
              <span class="font-mono text-gray-800 dark:text-gray-200">${product.specs.waterAbsorption || '< 7.5%'}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500 dark:text-gray-400">Fire Safety Classification:</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">${product.specs.fireRating || 'Non-combustible'}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500 dark:text-gray-400">Standard Packaging:</span>
              <span class="font-mono text-gray-800 dark:text-gray-200">${product.specs.palletQuantity || 'Palletized & Strapped'}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500 dark:text-gray-400">Sample Pricing:</span>
              <span class="font-mono font-bold text-gray-900 dark:text-white">${product.priceEst}</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button onclick="closeAllModals(); openQuoteModal('${product.name}');" class="btn-brick flex-1 text-center">
              <i class="fa-solid fa-file-invoice mr-2"></i> Request Bulk Quote
            </button>
            <a href="bulk-pricing.html" class="btn-outline-dark text-center">
              <i class="fa-solid fa-calculator mr-2"></i> Pricing Matrix
            </a>
          </div>
        </div>
      </div>
    `;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   8. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, type = 'success', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-msg toast-${type}`;
  
  let icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-triangle-exclamation';
  if (type === 'info') icon = 'fa-circle-info';

  toast.innerHTML = `
    <i class="fa-solid ${icon} text-lg mt-0.5"></i>
    <div class="flex-1 text-sm font-medium leading-snug">${message}</div>
    <button class="text-gray-400 hover:text-white ml-2 text-xs" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = document.documentElement.getAttribute('dir') === 'rtl' ? 'translateX(-60px)' : 'translateX(60px)';
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

// Global expose
window.showToast = showToast;
window.openQuoteModal = openQuoteModal;
window.closeAllModals = closeAllModals;
window.openProductDetailsModal = openProductDetailsModal;
window.setDirection = setDirection;
window.setTheme = setTheme;
