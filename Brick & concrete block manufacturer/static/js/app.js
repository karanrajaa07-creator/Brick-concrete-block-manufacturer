// Core Application Router, State Management, and UI Utilities

// Safe storage utilities to prevent crashing in sandboxed/restricted environments
function safeGetStorage(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch(e) {
    return fallback;
  }
}

function safeSetStorage(key, val) {
  try {
    localStorage.setItem(key, val);
  } catch(e) {}
}

// Immediate initialization check - handles both standard load and post-DOM execution
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initApp();
  });
} else {
  initApp();
}

function initApp() {
  try { initTheme(); } catch(e) { console.error("Theme init error:", e); }
  try { initDirection(); } catch(e) { console.error("Direction init error:", e); }
  try { setupNavigation(); } catch(e) { console.error("Navigation init error:", e); }
  try { setupThemeAndDirectionControls(); } catch(e) { console.error("Controls init error:", e); }
  try { initToastContainer(); } catch(e) { console.error("Toast init error:", e); }

  // Initialize individual submodules inside isolated try/catch blocks
  try { if (typeof initStrengthSimulator === "function") initStrengthSimulator(); } catch(e) { console.error(e); }
  try { if (typeof initProducts === "function") initProducts(); } catch(e) { console.error(e); }
  try { if (typeof initBondVisualizer === "function") initBondVisualizer(); } catch(e) { console.error(e); }
  try { if (typeof initPricingCalculator === "function") initPricingCalculator(); } catch(e) { console.error(e); }
  try { if (typeof initContactModule === "function") initContactModule(); } catch(e) { console.error(e); }
  try { if (typeof initBlog === "function") initBlog(); } catch(e) { console.error(e); }

  // Handle URL hash on initial load
  handleHashChange();
  window.addEventListener("hashchange", handleHashChange);

  // Initialize icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Global mobile menu toggler
window.toggleMobileMenu = function() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (!mobileMenu) return;
  const isCurrentlyHidden = mobileMenu.classList.contains("hidden") || mobileMenu.style.display === "none";
  if (isCurrentlyHidden) {
    mobileMenu.classList.remove("hidden");
    mobileMenu.style.display = "block";
  } else {
    mobileMenu.classList.add("hidden");
    mobileMenu.style.display = "none";
  }
};

// Global direct page navigator - guaranteed to work from any link, button, or script
window.navigateTo = function(pageId) {
  if (!pageId) pageId = "home";
  pageId = pageId.replace("#", "");

  const validPages = ["home", "home2", "products", "quality", "index", "pricing", "contact", "blog"];
  
  let targetPage = "home";
  let scrollAnchor = null;

  if (validPages.includes(pageId)) {
    targetPage = pageId;
  } else {
    // Check if target element exists anywhere in the document
    const targetEl = document.getElementById(pageId);
    if (targetEl) {
      scrollAnchor = pageId;
      const parentSection = targetEl.closest("section");
      if (parentSection && validPages.includes(parentSection.id)) {
        targetPage = parentSection.id;
      } else {
        targetPage = "home";
      }
    } else {
      targetPage = "home";
    }
  }

  // Sync hash
  if (window.location.hash !== "#" + targetPage && !scrollAnchor) {
    try {
      history.pushState(null, "", "#" + targetPage);
    } catch(e) {
      window.location.hash = targetPage;
    }
  }

  // Show target page section, hide all others
  validPages.forEach(pid => {
    const section = document.getElementById(pid);
    if (section) {
      if (pid === targetPage) {
        section.classList.remove("hidden");
        section.style.display = "block";
      } else {
        section.classList.add("hidden");
        section.style.display = "none";
      }
    }
  });

  // Highlight active nav links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    const href = link.getAttribute("href") || "";
    const linkHash = href.replace("#", "");
    if (linkHash === targetPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Call page-specific render routines if needed
  if (targetPage === "index" && typeof window.renderMasterIndex === "function") {
    try { window.renderMasterIndex(); } catch(e) { console.error("renderMasterIndex err:", e); }
  }
  if (targetPage === "blog" && typeof window.renderBlog === "function") {
    try { window.renderBlog(); } catch(e) { console.error("renderBlog err:", e); }
  }
  if (targetPage === "products" && typeof window.renderProducts === "function") {
    try { window.renderProducts(); } catch(e) { console.error("renderProducts err:", e); }
  }

  // Close mobile navigation drawer if open
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) {
    mobileMenu.classList.add("hidden");
    mobileMenu.style.display = "none";
  }

  // Smooth scroll
  if (scrollAnchor) {
    setTimeout(() => {
      const el = document.getElementById(scrollAnchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Re-generate icons
  if (window.lucide) {
    lucide.createIcons();
  }
};

function setupNavigation() {
  const navLinks = document.querySelectorAll("#main-navbar .nav-link, #mobile-menu .nav-link, .btn-amber-freight");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navbar = document.getElementById("main-navbar");
  const stickyHeader = document.getElementById("header-sticky");

  // Sticky Navbar smooth transition on scroll
  if (stickyHeader || navbar) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        if (navbar) navbar.classList.add("navbar-scrolled");
        if (stickyHeader) stickyHeader.classList.add("header-scrolled");
      } else {
        if (navbar) navbar.classList.remove("navbar-scrolled");
        if (stickyHeader) stickyHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile menu button toggle (only attach if no inline onclick)
  if (mobileMenuBtn && !mobileMenuBtn.getAttribute("onclick")) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.toggleMobileMenu();
    });
  }

  // Close mobile menu when clicking anywhere outside
  document.addEventListener("click", (e) => {
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      if (!mobileMenu.contains(e.target) && mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add("hidden");
        mobileMenu.style.display = "none";
      }
    }
  });

  // Nav link and action button click handling (only attach if no inline onclick)
  navLinks.forEach(link => {
    if (!link.getAttribute("onclick")) {
      link.addEventListener("click", (e) => {
        const targetHash = link.getAttribute("href");
        if (targetHash && targetHash.startsWith("#")) {
          e.preventDefault();
          const pageId = targetHash.substring(1);
          window.navigateTo(pageId);
        }
      });
    }
  });
}

function handleHashChange() {
  const rawHash = window.location.hash.replace("#", "") || "home";
  window.navigateTo(rawHash);
}

// =========================================================================
// THEME SWITCHER (DARK MODE & LIGHT MODE)
// =========================================================================

function initTheme() {
  const savedTheme = safeGetStorage("luxeris_theme", "dark");
  applyTheme(savedTheme, false);
}

function applyTheme(theme, showToast = true) {
  const root = document.documentElement;
  const isLight = theme === "light";

  if (isLight) {
    root.setAttribute("data-theme", "light");
    root.classList.add("theme-light");
    root.classList.remove("dark");
  } else {
    root.setAttribute("data-theme", "dark");
    root.classList.remove("theme-light");
    root.classList.add("dark");
  }

  safeSetStorage("luxeris_theme", theme);

  // Update theme toggle buttons (desktop & mobile) with bright amber SVG
  const buttons = document.querySelectorAll(".theme-toggle-btn");
  buttons.forEach(btn => {
    btn.setAttribute("title", isLight ? "Currently Light Mode — Click to Switch to Dark Mode" : "Currently Dark Mode — Click to Switch to Light Mode");
    btn.setAttribute("aria-label", isLight ? "Switch to Dark Mode" : "Switch to Light Mode");

    const mobileLabel = btn.querySelector("#mobile-theme-label") || btn.querySelector(".text-xs");
    if (mobileLabel) {
      mobileLabel.textContent = isLight ? "Light Mode" : "Dark Mode";
    }

    const svg = btn.querySelector("svg");
    if (svg) {
      if (isLight) {
        svg.outerHTML = '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#F5A000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';
      } else {
        svg.outerHTML = '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#F5A000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
      }
    }
  });

  if (window.lucide) lucide.createIcons();

  if (showToast && typeof showIndustrialToast === "function") {
    showIndustrialToast(isLight ? "Switched to Light Architectural Theme" : "Switched to Midnight Dark Engineering Theme", "info");
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme, true);
}

// =========================================================================
// DIRECTION SWITCHER (LTR AND RTL COMPLETE ENGINE)
// =========================================================================

const UI_TRANSLATIONS = {
  ltr: {
    "nav-home": "HOME 1",
    "nav-home2": "HOME 2",
    "nav-products": "PRODUCTS",
    "nav-quality": "QUALITY",
    "nav-index": "SPEC INDEX",
    "nav-pricing": "PRICING",
    "nav-blog": "BLOG",
    "nav-contact": "CONTACT",
    "nav-freight": "Freight Calc",
    "brand-tagline": "ENGINEERED MASONRY & CONCRETE • EST. 1984"
  },
  rtl: {
    "nav-home": "الرئيسية 1",
    "nav-home2": "المصنع 2",
    "nav-products": "المنتجات",
    "nav-quality": "الجودة",
    "nav-index": "المواصفات",
    "nav-pricing": "الأسعار",
    "nav-blog": "المدونة",
    "nav-contact": "تواصل معنا",
    "nav-freight": "حاسبة الشحن",
    "brand-tagline": "صناعة الطوب والخرسانة الإنشائية • تأسس 1984"
  }
};

function applyTranslations(dir) {
  const dictionary = UI_TRANSLATIONS[dir] || UI_TRANSLATIONS.ltr;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (key && dictionary[key]) {
      el.textContent = dictionary[key];
    }
  });
}

function initDirection() {
  const savedDir = safeGetStorage("luxeris_dir", "ltr");
  applyDirection(savedDir, false);
}

function applyDirection(dir, showToast = true) {
  const isRtl = dir === "rtl";
  const validDir = isRtl ? "rtl" : "ltr";
  const root = document.documentElement;

  root.setAttribute("dir", validDir);
  if (document.body) {
    document.body.setAttribute("dir", validDir);
  }

  if (isRtl) {
    root.classList.add("rtl");
    root.classList.remove("ltr");
  } else {
    root.classList.add("ltr");
    root.classList.remove("rtl");
  }

  safeSetStorage("luxeris_dir", validDir);

  // Update desktop segmented control buttons (LTR & RTL)
  const ltrBtns = document.querySelectorAll("#nav-btn-ltr, .dir-btn-ltr, #mobile-btn-ltr, .mobile-dir-btn-ltr");
  const rtlBtns = document.querySelectorAll("#nav-btn-rtl, .dir-btn-rtl, #mobile-btn-rtl, .mobile-dir-btn-rtl");

  ltrBtns.forEach(btn => {
    if (!isRtl) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  rtlBtns.forEach(btn => {
    if (isRtl) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Update single .dir-toggle-btn (#nav-lang-toggle) & mobile label
  const navDirLabel = document.getElementById("nav-dir-label");
  if (navDirLabel) navDirLabel.textContent = validDir.toUpperCase();

  const mobileDirLabel = document.getElementById("mobile-dir-label");
  if (mobileDirLabel) mobileDirLabel.textContent = validDir.toUpperCase();

  const rtlSpan = document.getElementById("nav-dir-rtl");
  const ltrSpan = document.getElementById("nav-dir-ltr");
  if (rtlSpan && ltrSpan) {
    if (isRtl) {
      rtlSpan.className = "text-[#F5A000] font-extrabold flex items-center gap-0.5";
      rtlSpan.innerHTML = 'RTL <span class="text-[#F5A000] text-[9px]">→</span>';
      ltrSpan.className = "text-slate-400 group-hover:text-white transition-colors";
      ltrSpan.innerHTML = 'LTR';
    } else {
      rtlSpan.className = "text-slate-400 group-hover:text-white transition-colors";
      rtlSpan.innerHTML = 'RTL';
      ltrSpan.className = "text-white font-extrabold flex items-center gap-0.5";
      ltrSpan.innerHTML = 'LTR <span class="text-[#F5A000] text-[9px]">←</span>';
    }
  }

  document.querySelectorAll(".dir-toggle-btn").forEach(btn => {
    const label = btn.querySelector(".dir-label");
    if (label) label.textContent = validDir.toUpperCase();
    btn.setAttribute("title", `Current direction: ${validDir.toUpperCase()} (Click to toggle)`);
    btn.setAttribute("aria-label", `Current direction: ${validDir.toUpperCase()}`);
  });

  // Apply multilingual navigation labels
  applyTranslations(validDir);

  if (window.lucide) {
    lucide.createIcons();
  }

  if (showToast && typeof showIndustrialToast === "function") {
    showIndustrialToast(
      isRtl
        ? "تم تفعيل نمط الاتجاه من اليمين إلى اليسار (RTL Activated)"
        : "Switched layout to Left-to-Right (LTR Activated)",
      "info"
    );
  }
}

function setDirection(dir) {
  applyDirection(dir, true);
}

function toggleDirection() {
  const currentDir = document.documentElement.getAttribute("dir") || "ltr";
  const newDir = currentDir === "ltr" ? "rtl" : "ltr";
  applyDirection(newDir, true);
}

function setupThemeAndDirectionControls() {
  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
    if (!btn.getAttribute("onclick")) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleTheme();
      });
    }
  });

  document.querySelectorAll(".dir-toggle-btn").forEach(btn => {
    if (!btn.getAttribute("onclick")) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleDirection();
      });
    }
  });

  const ltrBtn = document.getElementById("nav-btn-ltr");
  if (ltrBtn && !ltrBtn.getAttribute("onclick")) {
    ltrBtn.addEventListener("click", (e) => {
      e.preventDefault();
      setDirection("ltr");
    });
  }

  const rtlBtn = document.getElementById("nav-btn-rtl");
  if (rtlBtn && !rtlBtn.getAttribute("onclick")) {
    rtlBtn.addEventListener("click", (e) => {
      e.preventDefault();
      setDirection("rtl");
    });
  }
}

window.toggleTheme = toggleTheme;
window.toggleDirection = toggleDirection;
window.setDirection = setDirection;
window.applyTranslations = applyTranslations;
window.navigateTo = navigateTo;
window.openFreightCalculator = openFreightCalculator;

function openFreightCalculator() {
  window.navigateTo("pricing");
  if (typeof window.initPricingCalculator === "function") {
    try { window.initPricingCalculator(); } catch(e) { console.error("calc init err:", e); }
  }
  setTimeout(() => {
    const calcSection = document.getElementById("freight-calculator-section") || document.getElementById("calc-product-select") || document.getElementById("pricing");
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 80);
}

// Industrial Toast Notifications
function initToastContainer() {
  if (!document.getElementById("industrial-toast-container")) {
    const div = document.createElement("div");
    div.id = "industrial-toast-container";
    div.className = "fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none";
    document.body.appendChild(div);
  }
}

function showIndustrialToast(message, type = "info") {
  const container = document.getElementById("industrial-toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `p-3.5 rounded border pointer-events-auto shadow-2xl flex items-center gap-3 text-xs font-mono transition-all transform duration-300 translate-y-3 opacity-0 ${
    type === "success" ? "bg-slate-900 border-emerald-500 text-emerald-200" :
    type === "error" ? "bg-red-950 border-red-500 text-red-100" :
    "bg-slate-900 border-amber-500 text-amber-200"
  }`;

  const iconName = type === "success" ? "check-circle" : type === "error" ? "alert-triangle" : "info";
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-5 h-5 shrink-0"></i>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  // Animate in
  setTimeout(() => {
    toast.classList.remove("translate-y-3", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");
  }, 10);

  // Auto remove after 4.5s
  setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

window.showIndustrialToast = showIndustrialToast;

// =========================================================================
// FOOTER INTERACTIONS & MODALS (PRIVACY, TERMS, NEWSLETTER, SCROLL TO TOP)
// =========================================================================

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openPrivacyModal() {
  const modal = document.getElementById("privacy-modal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    if (window.lucide) lucide.createIcons();
  }
}

function closePrivacyModal() {
  const modal = document.getElementById("privacy-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
}

function openTermsModal() {
  const modal = document.getElementById("terms-modal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    if (window.lucide) lucide.createIcons();
  }
}

function closeTermsModal() {
  const modal = document.getElementById("terms-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
}

function subscribeNewsletter(e) {
  if (e && e.preventDefault) e.preventDefault();
  const input = document.getElementById("newsletter-email");
  if (!input) return false;
  const email = input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showIndustrialToast("Please enter a valid engineering or corporate email address.", "error");
    input.focus();
    input.classList.add("border-red-500");
    return false;
  }
  input.classList.remove("border-red-500");
  input.value = "";
  showIndustrialToast("Subscribed! You will receive our monthly Concrete & Masonry Metrology Journal.", "success");
  return false;
}

window.scrollToTop = scrollToTop;
window.openPrivacyModal = openPrivacyModal;
window.closePrivacyModal = closePrivacyModal;
window.openTermsModal = openTermsModal;
window.closeTermsModal = closeTermsModal;
window.subscribeNewsletter = subscribeNewsletter;
