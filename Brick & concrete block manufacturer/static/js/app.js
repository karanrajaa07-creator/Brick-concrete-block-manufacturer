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

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

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
    lucide.createIcons();
  }
};

function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link, .btn-amber-freight, a[href^='#']");
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

  // Mobile menu button toggle
  if (mobileMenuBtn) {
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

  // Nav link and action button click handling
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetHash = link.getAttribute("href");
      if (targetHash && targetHash.startsWith("#")) {
        e.preventDefault();
        const pageId = targetHash.substring(1);
        window.navigateTo(pageId);
      }
    });
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
    btn.setAttribute("title", isLight ? "Switch to Dark Mode" : "Switch to Light Mode");
    btn.setAttribute("aria-label", isLight ? "Switch to Dark Mode" : "Switch to Light Mode");
    if (isLight) {
      btn.innerHTML = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#F5A000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;
    } else {
      btn.innerHTML = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#F5A000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`;
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
// DIRECTION SWITCHER (LTR AND RTL)
// =========================================================================

function initDirection() {
  const savedDir = safeGetStorage("luxeris_dir", "ltr");
  applyDirection(savedDir, false);
}

function applyDirection(dir, showToast = true) {
  const root = document.documentElement;
  root.setAttribute("dir", dir);
  safeSetStorage("luxeris_dir", dir);

  // Update dir toggle buttons and labels
  const buttons = document.querySelectorAll(".dir-toggle-btn");
  buttons.forEach(btn => {
    const label = btn.querySelector(".dir-label");
    if (label) {
      label.innerText = dir.toUpperCase();
    }
    btn.setAttribute("title", `Current direction: ${dir.toUpperCase()} (Click to toggle)`);
    btn.setAttribute("aria-label", `Current direction: ${dir.toUpperCase()}`);
  });

  if (window.lucide) lucide.createIcons();

  if (showToast && typeof showIndustrialToast === "function") {
    showIndustrialToast(dir === "rtl" ? "Switched layout to RTL (Right-to-Left)" : "Switched layout to LTR (Left-to-Right)", "info");
  }
}

function toggleDirection() {
  const currentDir = document.documentElement.getAttribute("dir") || "ltr";
  const newDir = currentDir === "ltr" ? "rtl" : "ltr";
  applyDirection(newDir, true);
}

function setupThemeAndDirectionControls() {
  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleTheme();
    });
  });

  document.querySelectorAll(".dir-toggle-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleDirection();
    });
  });
}

window.toggleTheme = toggleTheme;
window.toggleDirection = toggleDirection;
window.navigateTo = navigateTo;

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
