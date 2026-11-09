// Products Catalog Module: Filtering by Type, Size, Strength, Search & Technical Data Sheets

let productsData = [];
let activeFilters = {
  type: "all",
  sizeCategory: "all",
  minStrength: 0,
  application: "all",
  search: "",
  sortBy: "strength-desc",
  viewMode: "grid" // 'grid' or 'table'
};
let currentModalChart = null;

async function initProducts() {
  await fetchProducts();
  setupProductEventListeners();
  renderProducts();
}

async function fetchProducts() {
  try {
    const res = await fetch("/api/products");
    const json = await res.json();
    productsData = json.products || [];
    window.productsData = productsData;
    if (typeof populateProductDropdown === "function") {
      populateProductDropdown();
    }
  } catch (err) {
    console.error("Failed to load products:", err);
  }
}

function filterProductsByType(type) {
  const typeButtons = document.querySelectorAll(".filter-type-btn");
  typeButtons.forEach(btn => {
    if (btn.dataset.type === type) {
      btn.classList.add("active", "bg-amber-500", "text-slate-950");
      btn.classList.remove("bg-slate-800", "text-slate-300");
    } else {
      btn.classList.remove("active", "bg-amber-500", "text-slate-950");
      btn.classList.add("bg-slate-800", "text-slate-300");
    }
  });
  activeFilters.type = type;
  renderProducts();
}

function resetProductFilters() {
  activeFilters = {
    type: "all",
    sizeCategory: "all",
    minStrength: 0,
    application: "all",
    search: "",
    sortBy: "strength-desc",
    viewMode: activeFilters.viewMode || "grid"
  };
  const sizeSelect = document.getElementById("filter-size-select");
  const strengthSelect = document.getElementById("filter-strength-select");
  const appSelect = document.getElementById("filter-app-select");
  const searchInput = document.getElementById("products-search-input");
  const sortSelect = document.getElementById("products-sort-select");
  if (sizeSelect) sizeSelect.value = "all";
  if (strengthSelect) strengthSelect.value = "0";
  if (appSelect) appSelect.value = "all";
  if (searchInput) searchInput.value = "";
  if (sortSelect) sortSelect.value = "strength-desc";

  const typeButtons = document.querySelectorAll(".filter-type-btn");
  typeButtons.forEach((b, idx) => {
    if (idx === 0) {
      b.classList.add("active", "bg-amber-500", "text-slate-950");
      b.classList.remove("bg-slate-800", "text-slate-300");
    } else {
      b.classList.remove("active", "bg-amber-500", "text-slate-950");
      b.classList.add("bg-slate-800", "text-slate-300");
    }
  });
  renderProducts();
}

function setProductViewMode(mode) {
  activeFilters.viewMode = mode;
  const gridViewBtn = document.getElementById("view-grid-btn");
  const tableViewBtn = document.getElementById("view-table-btn");
  if (mode === "grid") {
    if (gridViewBtn) {
      gridViewBtn.classList.add("bg-slate-700", "text-amber-400");
      gridViewBtn.classList.remove("bg-slate-900", "text-slate-400");
    }
    if (tableViewBtn) {
      tableViewBtn.classList.remove("bg-slate-700", "text-amber-400");
      tableViewBtn.classList.add("bg-slate-900", "text-slate-400");
    }
  } else {
    if (tableViewBtn) {
      tableViewBtn.classList.add("bg-slate-700", "text-amber-400");
      tableViewBtn.classList.remove("bg-slate-900", "text-slate-400");
    }
    if (gridViewBtn) {
      gridViewBtn.classList.remove("bg-slate-700", "text-amber-400");
      gridViewBtn.classList.add("bg-slate-900", "text-slate-400");
    }
  }
  renderProducts();
}

function setupProductEventListeners() {
  // Type filter buttons
  const typeButtons = document.querySelectorAll(".filter-type-btn");
  typeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterProductsByType(btn.dataset.type);
    });
  });

  // Size category select
  const sizeSelect = document.getElementById("filter-size-select");
  if (sizeSelect) {
    sizeSelect.addEventListener("change", (e) => {
      activeFilters.sizeCategory = e.target.value;
      renderProducts();
    });
  }

  // Strength filter
  const strengthSelect = document.getElementById("filter-strength-select");
  if (strengthSelect) {
    strengthSelect.addEventListener("change", (e) => {
      activeFilters.minStrength = parseFloat(e.target.value) || 0;
      renderProducts();
    });
  }

  // Application select
  const appSelect = document.getElementById("filter-app-select");
  if (appSelect) {
    appSelect.addEventListener("change", (e) => {
      activeFilters.application = e.target.value;
      renderProducts();
    });
  }

  // Search input
  const searchInput = document.getElementById("products-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeFilters.search = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Sort select
  const sortSelect = document.getElementById("products-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeFilters.sortBy = e.target.value;
      renderProducts();
    });
  }

  // View toggle
  const gridViewBtn = document.getElementById("view-grid-btn");
  const tableViewBtn = document.getElementById("view-table-btn");
  if (gridViewBtn) {
    gridViewBtn.addEventListener("click", () => setProductViewMode("grid"));
  }
  if (tableViewBtn) {
    tableViewBtn.addEventListener("click", () => setProductViewMode("table"));
  }

  // Reset filters
  const resetBtn = document.getElementById("reset-filters-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetProductFilters);
  }
}

window.filterProductsByType = filterProductsByType;
window.resetProductFilters = resetProductFilters;
window.setProductViewMode = setProductViewMode;

function getFilteredProducts() {
  return productsData.filter(p => {
    // Type match
    if (activeFilters.type !== "all" && p.type.toLowerCase() !== activeFilters.type.toLowerCase()) {
      return false;
    }
    // Size match
    if (activeFilters.sizeCategory !== "all") {
      const sizeLower = activeFilters.sizeCategory.toLowerCase();
      const productSize = (p.sizeCategory + " " + p.dimensionsImperial).toLowerCase();
      if (!productSize.includes(sizeLower)) return false;
    }
    // Min strength match
    if (activeFilters.minStrength > 0 && p.compressiveStrengthMpa < activeFilters.minStrength) {
      return false;
    }
    // Application match
    if (activeFilters.application !== "all") {
      const appLower = activeFilters.application.toLowerCase();
      if (!p.application.toLowerCase().includes(appLower)) return false;
    }
    // Search match
    if (activeFilters.search) {
      const q = activeFilters.search;
      const combined = (p.name + " " + p.description + " " + p.dimensionsImperial + " " + p.astmStandard + " " + p.category).toLowerCase();
      if (!combined.includes(q)) return false;
    }
    return true;
  }).sort((a, b) => {
    if (activeFilters.sortBy === "strength-desc") return b.compressiveStrengthMpa - a.compressiveStrengthMpa;
    if (activeFilters.sortBy === "strength-asc") return a.compressiveStrengthMpa - b.compressiveStrengthMpa;
    if (activeFilters.sortBy === "price-asc") return a.priceBase - b.priceBase;
    if (activeFilters.sortBy === "price-desc") return b.priceBase - a.priceBase;
    if (activeFilters.sortBy === "weight-desc") return b.weightLbs - a.weightLbs;
    return a.name.localeCompare(b.name);
  });
}

function renderProducts() {
  const container = document.getElementById("products-display-container");
  const countBadge = document.getElementById("products-count-badge");
  if (!container) return;

  const filtered = getFilteredProducts();

  if (countBadge) {
    countBadge.innerText = `Showing ${filtered.length} of ${productsData.length} Certified Products`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-slate-900 border border-slate-800 rounded">
        <i data-lucide="shield-alert" class="w-12 h-12 text-amber-500 mx-auto mb-3"></i>
        <h3 class="text-xl font-heading text-slate-200">No Masonry Units Match Your Criteria</h3>
        <p class="text-sm text-slate-400 mt-1 max-w-md mx-auto">Try adjusting your compressive strength, dimension size, or application filters to view available production molds.</p>
        <button onclick="document.getElementById('reset-filters-btn').click()" class="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded">
          Reset All Filters
        </button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  if (activeFilters.viewMode === "table") {
    renderTableView(filtered, container);
  } else {
    renderGridView(filtered, container);
  }

  lucide.createIcons();
}

function getAvailableSizesForProduct(p) {
  let sizes = [];
  if (p.type === "solid") {
    sizes = ['4"', '6"', '8"', '10"', '12"'];
  } else if (p.type === "hollow") {
    sizes = ['6"', '8"', '10"', '12"', 'Bond Beam'];
  } else if (p.type === "clay") {
    sizes = ['Modular (2.25")', 'King (2.75")', 'Roman (1.6"x12")', 'Closure'];
  } else if (p.type === "pavers") {
    sizes = ['80mm Port Heavy', '60mm Standard', 'Zigzag', 'Permeable'];
  } else if (p.type === "retaining") {
    sizes = ['12" Keystone', '8" Standard', 'Corner Unit', 'Cap Stone'];
  } else {
    sizes = ['4"', '6"', '8"', '10"', '12"'];
  }

  return sizes.map(s => {
    const isCurrent = (p.dimensionsImperial && p.dimensionsImperial.includes(s.replace('"', ''))) ||
                      (p.sizeCategory && p.sizeCategory.toLowerCase().includes(s.toLowerCase().replace('"', '')));
    return `<span class="size-pill ${isCurrent ? 'current' : ''}">${s}</span>`;
  }).join("");
}

function renderGridView(products, container) {
  let html = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">`;

  products.forEach(p => {
    const strengthPercent = Math.min(100, Math.round((p.compressiveStrengthMpa / 60) * 100));
    const isHighStrength = p.compressiveStrengthMpa >= 35.0;
    const prodImg = p.image || "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80";
    const availableSizesHtml = getAvailableSizesForProduct(p);

    const categoryBadgeClass = 
      p.type === 'clay' ? 'bg-orange-950 text-orange-200 border border-orange-700' :
      p.type === 'solid' ? 'bg-slate-900 text-slate-200 border border-slate-700' :
      p.type === 'pavers' ? 'bg-sky-950 text-sky-200 border border-sky-700' :
      p.type === 'retaining' ? 'bg-emerald-950 text-emerald-200 border border-emerald-700' :
      'bg-indigo-950 text-indigo-200 border border-indigo-700';

    html += `
      <div class="architectural-product-card group">
        
        <!-- Professional Material Photography with Dark Gradient Vignette -->
        <div class="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
          <img src="${prodImg}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-transparent to-black/35"></div>
          
          <!-- Category & SKU Badges -->
          <div class="absolute top-3 left-3 flex items-center gap-1.5">
            <span class="inline-block text-[10px] font-mono-tech uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow ${categoryBadgeClass}">
              ${p.category}
            </span>
            <span class="text-[9px] font-mono bg-slate-950/90 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded font-bold">
              ${p.id.toUpperCase()}
            </span>
          </div>

          <!-- ASTM Standard Badge -->
          <div class="absolute top-3 right-3">
            <span class="text-[10px] font-mono-tech font-bold text-amber-400 bg-slate-950/95 px-2 py-0.5 border border-amber-500/40 rounded shadow">
              ${p.astmStandard.split('/')[0]}
            </span>
          </div>

          <!-- Clear Dimension & Base Price Floating Pill -->
          <div class="absolute bottom-2.5 left-3 right-3 flex justify-between items-end text-xs font-mono">
            <span class="text-white font-bold bg-slate-950/90 backdrop-blur px-2.5 py-1 rounded border border-slate-700 shadow flex items-center gap-1.5">
              <i data-lucide="ruler" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>${p.dimensionsImperial}</span>
            </span>
            <span class="text-emerald-400 font-mono-tech font-bold bg-slate-950/90 backdrop-blur px-2.5 py-1 rounded border border-slate-700 shadow">
              $${p.priceBase.toFixed(2)} / ea
            </span>
          </div>
        </div>

        <!-- Product Body: Title, Metric Dimensions, Description -->
        <div class="p-5 pb-3 space-y-3 flex-grow">
          <div>
            <h3 class="text-lg font-heading text-white group-hover:text-amber-400 transition-colors leading-tight tracking-wide">
              ${p.name}
            </h3>
            <div class="text-[11px] font-mono text-slate-400 flex items-center gap-2 mt-1">
              <span>Metric: <strong class="text-slate-200">${p.dimensionsMetric}</strong></span>
              <span>•</span>
              <span>Mass: <strong class="text-slate-200">${p.weightLbs} lbs (${p.weightKg} kg)</strong></span>
            </div>
          </div>

          <!-- Product Architectural Description -->
          <p class="text-xs font-mono text-slate-300 line-clamp-2 leading-relaxed">
            ${p.description}
          </p>

          <!-- Available Sizes Row -->
          <div class="space-y-1 pt-1">
            <span class="text-[10px] font-mono uppercase text-slate-400 font-bold block">Available Modular Sizes:</span>
            <div class="flex flex-wrap gap-1">
              ${availableSizesHtml}
            </div>
          </div>

          <!-- Material Strength Rating -->
          <div class="bg-[#070b16] border border-slate-800 rounded p-2.5 space-y-1.5 mt-2">
            <div class="flex justify-between items-center text-xs font-mono">
              <span class="text-slate-400 flex items-center gap-1 uppercase font-semibold text-[11px]">
                <i data-lucide="gauge" class="w-3.5 h-3.5 text-amber-500"></i> Compressive Strength:
              </span>
              <span class="font-mono-tech font-black ${isHighStrength ? 'text-amber-400' : 'text-emerald-400'}">
                ${p.compressiveStrengthMpa} MPa <span class="text-[10px] font-normal text-slate-400">(${p.compressiveStrengthPsi.toLocaleString()} PSI)</span>
              </span>
            </div>
            <div class="strength-bar-bg">
              <div class="strength-bar-fill" style="width: ${strengthPercent}%;"></div>
            </div>
          </div>

          <!-- Quick Specifications Grid -->
          <div class="grid grid-cols-2 gap-2 text-[11px] font-mono bg-[#090e1a] p-2.5 rounded border border-slate-800">
            <div>
              <span class="text-slate-400">Pallet Qty:</span> 
              <strong class="text-slate-200">${p.unitsPerPallet} units</strong>
            </div>
            <div>
              <span class="text-slate-400">Fire Rating:</span> 
              <strong class="text-emerald-400">${p.fireRatingHours}h UL-E119</strong>
            </div>
            <div>
              <span class="text-slate-400">Absorption:</span> 
              <strong class="text-sky-400">&lt; ${p.waterAbsorption}%</strong>
            </div>
            <div>
              <span class="text-slate-400">Density Matrix:</span> 
              <strong class="text-slate-200">${p.density.split('(')[0].trim()}</strong>
            </div>
          </div>
        </div>

        <!-- Technical Specification Links & Request Pricing Buttons -->
        <div class="p-5 pt-1 grid grid-cols-2 gap-2">
          <button onclick="openTdsModal('${p.id}')" class="px-3 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-bold font-mono uppercase tracking-wider rounded border border-slate-700 hover:border-amber-400 flex items-center justify-center gap-1.5 transition-all">
            <i data-lucide="file-text" class="w-3.5 h-3.5 text-amber-400"></i>
            <span>Tech Specs (TDS)</span>
          </button>
          <button onclick="sendToBulkCalc('${p.id}')" class="btn-amber-freight justify-center text-xs py-2.5">
            <i data-lucide="calculator" class="w-3.5 h-3.5 text-slate-950"></i>
            <span>Request Pricing</span>
          </button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

function renderTableView(products, container) {
  let html = `
    <div class="overflow-x-auto border border-slate-800 rounded bg-slate-900 shadow">
      <table class="w-full text-left tech-table text-xs font-mono">
        <thead>
          <tr class="border-b border-slate-800">
            <th class="p-3">Specimen</th>
            <th class="p-3">Product Name</th>
            <th class="p-3">Type</th>
            <th class="p-3">Imperial Size</th>
            <th class="p-3">Metric Size</th>
            <th class="p-3 text-right">Strength (MPa / PSI)</th>
            <th class="p-3 text-right">Unit Wt.</th>
            <th class="p-3 text-right">Pallet Qty</th>
            <th class="p-3 text-right">Base Price</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60 text-slate-300">
  `;

  products.forEach(p => {
    const prodImg = p.image || "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=400&q=80";
    html += `
      <tr class="transition-colors hover:bg-slate-800/40">
        <td class="p-2.5">
          <img src="${prodImg}" alt="${p.name}" class="w-12 h-10 object-cover rounded border border-slate-700 shadow-sm" loading="lazy">
        </td>
        <td class="p-3 font-semibold text-slate-100 flex items-center gap-2">
          <span>${p.name}</span>
          ${p.compressiveStrengthMpa >= 35 ? '<span class="text-[9px] bg-amber-900/60 text-amber-300 border border-amber-700/60 px-1 py-0.2 rounded font-bold">HD</span>' : ''}
        </td>
        <td class="p-3 text-slate-400">${p.category}</td>
        <td class="p-3 font-bold text-slate-200">${p.dimensionsImperial}</td>
        <td class="p-3 text-slate-400">${p.dimensionsMetric}</td>
        <td class="p-3 text-right">
          <span class="font-bold text-amber-400">${p.compressiveStrengthMpa} MPa</span>
          <span class="text-slate-500 block text-[10px]">(${p.compressiveStrengthPsi.toLocaleString()} PSI)</span>
        </td>
        <td class="p-3 text-right">${p.weightLbs} lbs</td>
        <td class="p-3 text-right">${p.unitsPerPallet}</td>
        <td class="p-3 text-right font-bold text-emerald-400">$${p.priceBase.toFixed(2)}</td>
        <td class="p-3 text-center">
          <div class="inline-flex gap-1.5">
            <button onclick="openTdsModal('${p.id}')" title="Technical Spec Sheet" class="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded border border-slate-700">
              <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="sendToBulkCalc('${p.id}')" title="Calculate Bulk Pricing" class="p-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded font-bold">
              <i data-lucide="calculator" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;
  container.innerHTML = html;
}

// Technical Data Sheet (TDS) Modal
async function openTdsModal(productId) {
  try {
    const res = await fetch(`/api/products/${productId}`);
    if (!res.ok) throw new Error("Product not found");
    const p = await res.json();

    const modal = document.getElementById("tds-modal");
    const content = document.getElementById("tds-modal-content");
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="p-6 md:p-8 space-y-6">
        <!-- TDS Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-amber-500 text-slate-950 text-[10px] font-mono-tech font-black px-2 py-0.5 rounded uppercase">ASTM CERTIFIED SPEC</span>
              <span class="text-xs font-mono text-slate-400">${p.astmStandard}</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-heading text-slate-100">${p.name}</h2>
            <p class="text-xs font-mono text-slate-400 mt-0.5">Category: ${p.category} | SKU: LX-${p.id.toUpperCase()}</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.print()" class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold rounded border border-slate-700 flex items-center gap-1.5 no-print">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i> Print TDS
            </button>
            <button onclick="closeTdsModal()" class="px-3 py-2 bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 text-xs font-mono rounded border border-slate-800 no-print">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- Real Photographic Hero Banner in TDS -->
        <div class="relative h-44 w-full rounded-lg overflow-hidden border border-slate-800">
          <img src="${p.image || 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80'}" alt="${p.name}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent flex items-center p-6">
            <div class="max-w-md space-y-1">
              <span class="text-[10px] font-mono-tech uppercase font-bold text-amber-400 bg-black/60 px-2 py-0.5 rounded border border-slate-700">LUXERIS QUALITY VERIFIED</span>
              <h3 class="text-lg font-heading text-white">${p.name}</h3>
              <p class="text-xs font-mono text-slate-300 line-clamp-2">${p.description}</p>
            </div>
          </div>
        </div>

        <!-- Technical Overview Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-slate-950 p-4 border border-slate-800 rounded space-y-1">
            <span class="text-[10px] font-mono uppercase text-slate-500">Compressive Load Capacity</span>
            <div class="text-2xl font-mono-tech font-black text-amber-400">${p.compressiveStrengthMpa} MPa</div>
            <div class="text-xs font-mono text-slate-400">${p.compressiveStrengthPsi.toLocaleString()} PSI (ASTM C140 Lab Certified)</div>
          </div>
          <div class="bg-slate-950 p-4 border border-slate-800 rounded space-y-1">
            <span class="text-[10px] font-mono uppercase text-slate-500">UL Fire Separation Endurance</span>
            <div class="text-2xl font-mono-tech font-black text-emerald-400">${p.fireRatingHours} Hours</div>
            <div class="text-xs font-mono text-slate-400">ASTM E119 / UL 263 Equivalent</div>
          </div>
          <div class="bg-slate-950 p-4 border border-slate-800 rounded space-y-1">
            <span class="text-[10px] font-mono uppercase text-slate-500">Water Absorption Rate</span>
            <div class="text-2xl font-mono-tech font-black text-sky-400">&lt; ${p.waterAbsorption}%</div>
            <div class="text-xs font-mono text-slate-400">50-Cycle Freeze-Thaw Resistance</div>
          </div>
        </div>

        <!-- Blueprint Schematic & Stress-Strain Curve -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Blueprint Card -->
          <div class="blueprint-card p-5 rounded space-y-3">
            <div class="flex justify-between items-center text-xs font-mono text-cyan-400 border-b border-cyan-900/60 pb-2">
              <span>ENGINEERING PROFILE SCHEMATIC</span>
              <span>SCALE: 1:10</span>
            </div>
            
            <div class="flex items-center justify-center py-4">
              <svg width="240" height="130" viewBox="0 0 240 130">
                <rect x="20" y="20" width="200" height="90" rx="3" fill="#0e2338" stroke="#38bdf8" stroke-width="2"/>
                ${p.type === 'hollow' ? `
                  <rect x="50" y="40" width="40" height="50" rx="2" fill="#06121e" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="2,2"/>
                  <rect x="130" y="40" width="40" height="50" rx="2" fill="#06121e" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="2,2"/>
                  <text x="70" y="70" fill="#38bdf8" font-size="9" font-family="monospace" text-anchor="middle">CORE A</text>
                  <text x="150" y="70" fill="#38bdf8" font-size="9" font-family="monospace" text-anchor="middle">CORE B</text>
                ` : `
                  <text x="120" y="70" fill="#38bdf8" font-size="11" font-family="monospace" text-anchor="middle">SOLID MONOLITHIC MATRIX</text>
                `}
                <!-- Dimension Marks -->
                <line x1="20" y1="120" x2="220" y2="120" stroke="#f59e0b" stroke-width="1"/>
                <text x="120" y="126" fill="#f59e0b" font-size="9" font-family="monospace" text-anchor="middle">${p.dimensionsImperial.split('x')[2] || '16"'} L</text>
                <line x1="10" y1="20" x2="10" y2="110" stroke="#f59e0b" stroke-width="1"/>
                <text x="6" y="65" fill="#f59e0b" font-size="9" font-family="monospace" text-anchor="middle" transform="rotate(-90 6 65)">${p.dimensionsImperial.split('x')[1] || '8"'} H</text>
              </svg>
            </div>

            <div class="text-[11px] font-mono text-slate-300 space-y-1">
              <div><strong class="text-cyan-300">Dimensions:</strong> ${p.dimensionsImperial} (${p.dimensionsMetric})</div>
              <div><strong class="text-cyan-300">Density Class:</strong> ${p.density}</div>
              <div><strong class="text-cyan-300">Net Compressive Strength:</strong> ${p.compressiveStrengthMpa} MPa (ASTM C90 / C140)</div>
            </div>
          </div>

          <!-- Stress Strain Curve Graph -->
          <div class="bg-slate-950 p-5 rounded border border-slate-800 space-y-3">
            <div class="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
              <span>STRESS-STRAIN DEFORMATION CURVE</span>
              <span class="text-amber-400 font-bold">PEAK ${p.compressiveStrengthMpa} MPa</span>
            </div>
            <div class="relative h-48 w-full">
              <canvas id="tds-chart-canvas"></canvas>
            </div>
            <div class="text-[10px] font-mono text-slate-400 text-center">
              Vibratory hydraulic compaction yields sustained post-yield plastic deformation prior to brittle fracture.
            </div>
          </div>
        </div>

        <!-- Packaging & Quality Assurance Matrix -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded border border-slate-800 text-xs font-mono">
          <div class="space-y-2">
            <h4 class="text-slate-300 font-heading text-sm text-amber-400">Packaging & Haulage Specs</h4>
            <div class="flex justify-between border-b border-slate-900 pb-1">
              <span class="text-slate-500">Pallet Packaging:</span>
              <span class="text-slate-200 font-bold">${p.unitsPerPallet} units/pallet</span>
            </div>
            <div class="flex justify-between border-b border-slate-900 pb-1">
              <span class="text-slate-500">Unit Mass (Dry):</span>
              <span class="text-slate-200">${p.weightLbs} lbs (${p.weightKg} kg)</span>
            </div>
            <div class="flex justify-between border-b border-slate-900 pb-1">
              <span class="text-slate-500">Pallet Gross Weight:</span>
              <span class="text-slate-200 font-bold">${p.palletWeightLbs.toLocaleString()} lbs</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Legal Flatbed Capacity:</span>
              <span class="text-slate-200">~${Math.floor(48000 / p.palletWeightLbs)} Pallets / Semi</span>
            </div>
          </div>

          <div class="space-y-2">
            <h4 class="text-slate-300 font-heading text-sm text-amber-400">Quality Assurance Standards</h4>
            <div class="flex justify-between border-b border-slate-900 pb-1">
              <span class="text-slate-500">Curing Method:</span>
              <span class="text-slate-200">48-Hr Autoclave High-Steam</span>
            </div>
            <div class="flex justify-between border-b border-slate-900 pb-1">
              <span class="text-slate-500">Dimensional Tolerance:</span>
              <span class="text-slate-200">± 1.5 mm (Tight Machine-Edge)</span>
            </div>
            <div class="flex justify-between border-b border-slate-900 pb-1">
              <span class="text-slate-500">LEED v4 Rating:</span>
              <span class="text-slate-200">Recycled Content Eligible</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Sampling Standard:</span>
              <span class="text-slate-200">1 per 2,000 units (ASTM C140)</span>
            </div>
          </div>
        </div>

        <!-- Modal Footer CTAs -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 no-print">
          <div class="text-xs font-mono text-slate-400">
            Wholesale Contractor Base: <strong class="text-amber-400 text-sm">$${p.priceBase.toFixed(2)} / unit</strong>
          </div>
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <button onclick="requestSampleFromModal('${p.id}', '${p.name}')" class="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold uppercase rounded border border-slate-700">
              Request Sample Box
            </button>
            <button onclick="sendToBulkCalc('${p.id}'); closeTdsModal();" class="flex-1 sm:flex-none px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold uppercase rounded shadow">
              Calculate Bulk Pricing
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
    lucide.createIcons();

    // Render Stress Strain Chart
    renderTdsStressStrainChart(p);

  } catch (err) {
    console.error("Error opening TDS modal:", err);
  }
}

function closeTdsModal() {
  const modal = document.getElementById("tds-modal");
  if (modal) modal.classList.add("hidden");
  if (currentModalChart) {
    currentModalChart.destroy();
    currentModalChart = null;
  }
}

function renderTdsStressStrainChart(product) {
  const canvas = document.getElementById("tds-chart-canvas");
  if (!canvas) return;

  if (currentModalChart) {
    currentModalChart.destroy();
  }

  const curveData = product.stressStrainCurve || [];
  const labels = curveData.map(pt => pt.strain.toFixed(4));
  const stressData = curveData.map(pt => pt.stressMpa);

  currentModalChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Stress (MPa)',
        data: stressData,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.3,
        pointRadius: 2,
        pointBackgroundColor: '#f59e0b'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `Stress: ${ctx.parsed.y} MPa (${Math.round(ctx.parsed.y * 145.038)} PSI)`
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Strain (ε)', color: '#64748b', font: { size: 10 } },
          grid: { color: 'rgba(51, 65, 85, 0.4)' },
          ticks: { color: '#94a3b8', font: { size: 9, family: 'monospace' }, maxTicksLimit: 6 }
        },
        y: {
          title: { display: true, text: 'Stress (MPa)', color: '#64748b', font: { size: 10 } },
          grid: { color: 'rgba(51, 65, 85, 0.4)' },
          ticks: { color: '#94a3b8', font: { size: 9, family: 'monospace' } }
        }
      }
    }
  });
}

function sendToBulkCalc(productId) {
  window.location.hash = "pricing";
  setTimeout(() => {
    const productSelect = document.getElementById("calc-product-select");
    if (productSelect) {
      productSelect.value = productId;
      productSelect.dispatchEvent(new Event("change"));
    }
    const calcSection = document.getElementById("pricing");
    if (calcSection) calcSection.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function requestSampleFromModal(productId, productName) {
  closeTdsModal();
  window.location.hash = "contact";
  setTimeout(() => {
    const enquiryTypeSelect = document.getElementById("enquiry-type");
    if (enquiryTypeSelect) enquiryTypeSelect.value = "Free Contractor Sample Box & Mockup Consultation";

    const prodSelect = document.getElementById("contact-product-select");
    if (prodSelect) prodSelect.value = productId;

    const notesEl = document.getElementById("contact-notes");
    if (notesEl) notesEl.value = `Requesting official boxed sample kit of ${productName} for architectural review and client mock-up approval.`;

    const contactSection = document.getElementById("contact");
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function getAstmMinimum(standard) {
  const s = (standard || "").toLowerCase();
  if (s.includes("c216")) return { minMpa: 20.7, minPsi: 3000, name: "ASTM C216 Grade SW" };
  if (s.includes("c936")) return { minMpa: 50.0, minPsi: 7250, name: "ASTM C936 Heavy Paver" };
  if (s.includes("c1372")) return { minMpa: 20.7, minPsi: 3000, name: "ASTM C1372 Retaining" };
  if (s.includes("c1693")) return { minMpa: 3.5, minPsi: 500, name: "ASTM C1693 AAC Class 4" };
  return { minMpa: 17.2, minPsi: 2500, name: "ASTM C90 Structural" };
}

function renderMasterIndex(standard = 'all', searchQuery = '') {
  const tbody = document.getElementById("master-index-tbody");
  const countBadge = document.getElementById("index-count-badge");
  if (!tbody || !productsData || productsData.length === 0) return;

  let filtered = standard === 'all'
    ? productsData
    : productsData.filter(p => p.astmStandard.toLowerCase().includes(standard.toLowerCase()));

  if (searchQuery) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.astmStandard.toLowerCase().includes(q) ||
      p.dimensionsImperial.toLowerCase().includes(q) ||
      p.dimensionsMetric.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (countBadge) {
    countBadge.innerText = `Displaying ${filtered.length} of ${productsData.length} Certified Specifications`;
  }

  let html = '';
  filtered.forEach(p => {
    const prodImg = p.image || "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=400&q=80";
    const astmInfo = getAstmMinimum(p.astmStandard);
    const safetyMargin = Math.round(((p.compressiveStrengthMpa - astmInfo.minMpa) / astmInfo.minMpa) * 100);

    html += `
      <tr class="hover:bg-slate-900/70 transition-colors border-b border-slate-800/80">
        <!-- SKU & Specimen -->
        <td class="p-3.5 font-mono text-xs whitespace-nowrap">
          <div class="flex items-center gap-2.5">
            <img src="${prodImg}" alt="${p.name}" class="w-10 h-8 object-cover rounded border border-slate-700 shrink-0" loading="lazy">
            <div>
              <span class="font-bold text-amber-400 block font-mono-tech">LX-${p.id.toUpperCase()}</span>
              <span class="text-[10px] text-slate-500 uppercase">${p.category}</span>
            </div>
          </div>
        </td>

        <!-- Model Specification Name -->
        <td class="p-3.5 text-xs text-slate-100">
          <button onclick="openTdsModal('${p.id}')" class="text-left font-semibold hover:text-amber-400 hover:underline transition-colors block">
            ${p.name}
          </button>
          <span class="text-[10px] font-mono text-slate-400 block mt-0.5 line-clamp-1">${p.application}</span>
        </td>

        <!-- ASTM Standard -->
        <td class="p-3.5 whitespace-nowrap">
          <span class="px-2 py-1 rounded text-[10px] font-mono-tech font-bold bg-[#070b16] border border-amber-500/40 text-amber-300 inline-block shadow">
            ${p.astmStandard}
          </span>
          <span class="text-[9px] font-mono text-slate-500 block mt-0.5">${astmInfo.name}</span>
        </td>

        <!-- Compressive Rating (Net MPa & PSI) -->
        <td class="p-3.5 text-right whitespace-nowrap font-mono">
          <div class="font-bold text-sm text-amber-400 font-mono-tech">${p.compressiveStrengthMpa} MPa</div>
          <div class="text-[10px] text-slate-400">${p.compressiveStrengthPsi.toLocaleString()} PSI</div>
          <span class="inline-block px-1.5 py-0.2 rounded text-[9px] font-bold ${safetyMargin >= 0 ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'}">
            ${safetyMargin >= 0 ? '+' + safetyMargin + '% vs ASTM' : 'Code Limit'}
          </span>
        </td>

        <!-- Imperial Dimensions -->
        <td class="p-3.5 font-mono text-xs font-bold text-slate-200 whitespace-nowrap">
          ${p.dimensionsImperial}
        </td>

        <!-- Metric Dimensions -->
        <td class="p-3.5 font-mono text-xs text-slate-300 whitespace-nowrap">
          ${p.dimensionsMetric}
        </td>

        <!-- Tolerances: ASTM vs Luxeris Metrology -->
        <td class="p-3.5 font-mono text-[11px] whitespace-nowrap">
          <div class="text-emerald-400 font-bold">&plusmn;0.01 mm</div>
          <div class="text-[10px] text-slate-500">ASTM Code: &plusmn;3.2 mm</div>
        </td>

        <!-- Water Absorption & Density -->
        <td class="p-3.5 font-mono text-[11px] whitespace-nowrap">
          <div class="text-sky-400 font-semibold">&lt; ${p.waterAbsorption}% (5-Hr Boil)</div>
          <div class="text-[10px] text-slate-400">${p.density.split('(')[0].trim()}</div>
        </td>

        <!-- UL Fire Resistance Rating -->
        <td class="p-3.5 font-mono text-xs text-center whitespace-nowrap">
          <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
            ${p.fireRatingHours}h UL E119
          </span>
        </td>

        <!-- Quality Certification Status -->
        <td class="p-3.5 font-mono text-[10px] whitespace-nowrap">
          <span class="text-emerald-400 font-semibold flex items-center gap-1">
            <i data-lucide="check-circle" class="w-3 h-3"></i> ISO 9001:2015
          </span>
          <span class="text-slate-500 block">Class 1 Batch Trace</span>
        </td>

        <!-- Technical Actions & Downloads -->
        <td class="p-3.5 text-center whitespace-nowrap">
          <div class="inline-flex items-center gap-1.5">
            <button onclick="openTdsModal('${p.id}')" title="Technical Spec Sheet (TDS)" class="p-2 bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 rounded border border-slate-700 transition-colors">
              <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="downloadCsiDivision04Spec('${p.id}')" title="Download CSI Div 04 Spec (.txt)" class="p-2 bg-slate-900 hover:bg-slate-800 text-sky-400 hover:text-sky-300 rounded border border-slate-700 transition-colors">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="sendToBulkCalc('${p.id}')" title="Add to Bulk Freight Takeoff" class="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded font-bold transition-all shadow">
              <i data-lucide="calculator" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
  if (window.lucide) lucide.createIcons();
}

let currentStandardFilter = 'all';
window.currentStandardFilter = 'all';

function filterIndexByStandard(standard) {
  currentStandardFilter = standard;
  window.currentStandardFilter = standard;
  const chips = document.querySelectorAll(".index-chip");
  chips.forEach(c => {
    c.classList.remove("active", "bg-amber-500", "text-slate-950");
    c.classList.add("bg-slate-900", "text-slate-200");
  });
  if (window.event && window.event.currentTarget) {
    window.event.currentTarget.classList.add("active", "bg-amber-500", "text-slate-950");
    window.event.currentTarget.classList.remove("bg-slate-900", "text-slate-200");
  }
  const searchInput = document.getElementById("index-search-input");
  const q = searchInput ? searchInput.value : '';
  renderMasterIndex(standard, q);
}

// Download CSI Division 04 Architectural Specification Document
function downloadCsiDivision04Spec(productId = 'all') {
  let docContent = "";
  const now = new Date().toISOString().split("T")[0];

  if (productId === 'all') {
    docContent = `================================================================================
LUXERIS MASONRY & CONCRETE WORKS INC. - CSI MASTERFORMAT DIVISION 04
ARCHITECTURAL & STRUCTURAL ENGINEERING SPECIFICATION MANUAL
CSI MasterFormat Section: 04 20 00 / 04 22 00 Concrete Unit Masonry
Document Date: ${now} | Certification: ISO 9001:2015 & ASTM Registered
================================================================================

PART 1 - GENERAL

1.1 SECTION INCLUDES
  A. Concrete Masonry Units (CMUs): Loadbearing solid and hollow units per ASTM C90.
  B. Fired Clay Facing Bricks: Severe-weathering vitrified engineering units per ASTM C216.
  C. Interlocking Concrete Pavers: Heavy industrial pavement units per ASTM C936.
  D. Segmental Retaining Units: Concrete retaining blocks per ASTM C1372.
  E. Autoclaved Aerated Concrete Units: Cellular thermal units per ASTM C1693.

1.2 APPLICABLE ASTM STANDARDS
  - ASTM C90: Standard Specification for Loadbearing Concrete Masonry Units.
  - ASTM C140 / C140M: Standard Test Methods for Sampling and Testing Concrete Masonry Units.
  - ASTM C216: Standard Specification for Facing Brick (Solid Masonry Units Made from Clay).
  - ASTM C67: Standard Test Methods for Sampling and Testing Brick and Structural Clay Tile.
  - ASTM C936 / C936M: Standard Specification for Solid Concrete Interlocking Paving Units.
  - ASTM C1372: Standard Specification for Dry-Cast Segmental Retaining Wall Units.
  - ASTM C1693: Standard Specification for Autoclaved Aerated Concrete (AAC).
  - ASTM E119: Standard Test Methods for Fire Tests of Building Construction and Materials.
  - ASTM E518: Standard Test Methods for Flexural Bond Strength of Masonry.
  - ASTM C1262: Standard Test Method for Evaluating Freeze-Thaw Durability.

1.3 SUBMITTALS
  A. Submit product data, technical data sheets (TDS), and independent laboratory test reports.
  B. Submit Mill Test Reports (MTR) showing net compressive core crush verification for each lot.
  C. Submit Environmental Product Declarations (EPD) for LEED v4 regional materials compliance.

PART 2 - PRODUCTS & SPECIFICATIONS SCHEDULE
`;

    productsData.forEach(p => {
      docContent += `
--------------------------------------------------------------------------------
PRODUCT MODEL: ${p.name.toUpperCase()} (SKU: LX-${p.id.toUpperCase()})
--------------------------------------------------------------------------------
Classification: ${p.category} | Type: ${p.type.toUpperCase()}
ASTM Standard Compliance: ${p.astmStandard}
Nominal Dimensions (Imperial): ${p.dimensionsImperial}
Manufactured Dimensions (Metric): ${p.dimensionsMetric}
Net Area Compressive Strength: ${p.compressiveStrengthMpa} MPa (${p.compressiveStrengthPsi.toLocaleString()} PSI)
Dimensional Tolerance: Within +/- 0.01 mm (Strict Metrology Guarantee; Exceeds ASTM +/- 3.2 mm)
Water Absorption: Less than ${p.waterAbsorption}% by 5-Hour Continuous Boiling Test (ASTM C140)
UL Fire Resistance Rating: ${p.fireRatingHours} Hours (ASTM E119 Non-Combustible Assembly)
Dry Unit Mass: ${p.weightLbs} lbs (${p.weightKg} kg) | Pallet Quantity: ${p.unitsPerPallet} Units
Density Classification: ${p.density}
Typical Engineering Applications: ${p.application}
Core Matrix: High-density basalt aggregate with saturated autoclave steam hydration (185 deg C).
`;
    });

    docContent += `
PART 3 - EXECUTION & INSTALLATION TOLERANCES

3.1 TOLERANCES FOR UNIT LAYING
  A. Variation from Plumb: For vertical lines and surfaces of columns and walls, do not exceed 1/4" in 10 ft.
  B. Variation from Level: For bed joints and lines of top of walls, do not exceed 1/4" in 20 ft.
  C. Mortar Joints: Strike joints with uniform concave or raked architectural profiles using Type S (ASTM C270) mortar.
  D. Grouting: Consolidate core grout with mechanical vibrators per ASTM C476.

================================================================================
END OF SPECIFICATION DOCUMENT - LUXERIS MASONRY & CONCRETE WORKS INC.
Dispatch & Metrology Verification: 1-800-848-2678 | engineering@luxerismfg.com
================================================================================`;
  } else {
    const p = productsData.find(item => item.id === productId);
    if (!p) return;
    docContent = `================================================================================
LUXERIS MASONRY SPECIFICATION - CSI SECTION 04 22 00 SUBMITTAL
PRODUCT: ${p.name.toUpperCase()}
SKU: LX-${p.id.toUpperCase()} | Standard: ${p.astmStandard}
Document Generated: ${now} | Plant Registration: ISO 9001:2015
================================================================================

1. PRODUCT CHARACTERISTICS
  - Model Name: ${p.name}
  - Category: ${p.category}
  - Imperial Dimensions: ${p.dimensionsImperial}
  - Metric Dimensions: ${p.dimensionsMetric}
  - Net Compressive Strength: ${p.compressiveStrengthMpa} MPa (${p.compressiveStrengthPsi.toLocaleString()} PSI)
  - ASTM Standard Code: ${p.astmStandard}
  - Water Absorption: < ${p.waterAbsorption}% (ASTM C140 5-Hour Boil Test)
  - Fire Resistance: ${p.fireRatingHours} Hours UL E119 Rated
  - Unit Mass: ${p.weightLbs} lbs (${p.weightKg} kg)
  - Pallet Quantity: ${p.unitsPerPallet} units / pallet (${p.palletWeightLbs} lbs)
  - Aggregate Matrix: Cured basalt stone with 48-hour steam autoclaving (185 deg C)

2. DIMENSIONAL METROLOGY & TOLERANCE
  - Length/Width/Height Tolerance: +/- 0.01 mm (Digital laser caliper verified)
  - Permissible ASTM C90 Variance: Within allowable +/- 3.2 mm (1/8")
  - Squareness & Flatness Deviation: < 1.0 mm per meter span

3. ENGINEERING APPLICATIONS
  ${p.application}

LUXERIS QUALITY CONTROL & METROLOGY DIVISION
Toll-Free Dispatch: 1-800-848-2678 | Denver Plant & Tacoma Marine Terminal
`;
  }

  // Trigger browser download
  const blob = new Blob([docContent], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = productId === 'all' 
    ? `Luxeris_CSI_Division_04_Spec_Manual_${now}.txt` 
    : `Luxeris_Spec_LX_${productId.toUpperCase()}_${now}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  if (typeof showIndustrialToast === "function") {
    showIndustrialToast(`CSI Specification Document downloaded successfully.`, "success");
  }
}

// Export Full Master Specification Table to CSV
function exportSpecTableToCsv() {
  if (!productsData || productsData.length === 0) return;
  const now = new Date().toISOString().split("T")[0];

  const headers = [
    "SKU",
    "Model Name",
    "Category",
    "ASTM Standard",
    "Compressive Strength (MPa)",
    "Compressive Strength (PSI)",
    "Imperial Dimensions",
    "Metric Dimensions",
    "Weight (lbs)",
    "Weight (kg)",
    "Pallet Qty",
    "Pallet Weight (lbs)",
    "Fire Rating (Hours)",
    "Water Absorption (%)",
    "Density Class",
    "Base Price USD",
    "Application"
  ];

  const rows = productsData.map(p => [
    `LX-${p.id.toUpperCase()}`,
    `"${p.name.replace(/"/g, '""')}"`,
    `"${p.category}"`,
    `"${p.astmStandard}"`,
    p.compressiveStrengthMpa,
    p.compressiveStrengthPsi,
    `"${p.dimensionsImperial}"`,
    `"${p.dimensionsMetric}"`,
    p.weightLbs,
    p.weightKg,
    p.unitsPerPallet,
    p.palletWeightLbs,
    p.fireRatingHours,
    p.waterAbsorption,
    `"${p.density}"`,
    p.priceBase.toFixed(2),
    `"${p.application.replace(/"/g, '""')}"`
  ]);

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Luxeris_Master_Specification_Index_${now}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  if (typeof showIndustrialToast === "function") {
    showIndustrialToast("Master Specification Index exported to CSV.", "success");
  }
}

window.initProducts = initProducts;
window.renderProducts = renderProducts;
window.openTdsModal = openTdsModal;
window.closeTdsModal = closeTdsModal;
window.sendToBulkCalc = sendToBulkCalc;
window.requestSampleFromModal = requestSampleFromModal;
window.renderMasterIndex = renderMasterIndex;
window.filterIndexByStandard = filterIndexByStandard;
window.downloadCsiDivision04Spec = downloadCsiDivision04Spec;
window.exportSpecTableToCsv = exportSpecTableToCsv;
