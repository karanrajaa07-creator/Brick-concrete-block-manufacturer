/**
 * TITAN BRICK & CONCRETE INDUSTRIES
 * Products Page Interactive Catalogue & Filters
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductsCatalogue();
  initFeaturedProductsHome();
});

function initProductsCatalogue() {
  const container = document.getElementById('products-grid-container');
  if (!container || !window.PRODUCTS_DATA) return;

  const searchInput = document.getElementById('product-search-input');
  const sortSelect = document.getElementById('product-sort-select');
  const filterBtns = document.querySelectorAll('.product-filter-btn');
  const resultCount = document.getElementById('product-result-count');

  let activeCategory = 'all';
  let searchQuery = '';
  let sortBy = 'default';

  // Check URL parameters for preset category (e.g. products.html?category=solid-concrete)
  const urlParams = new URLSearchParams(window.location.search);
  const paramCat = urlParams.get('category');
  if (paramCat) {
    activeCategory = paramCat;
    filterBtns.forEach(btn => {
      if (btn.getAttribute('data-category') === paramCat) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function render() {
    let filtered = window.PRODUCTS_DATA.filter(item => {
      const matchCat = (activeCategory === 'all' || item.category === activeCategory);
      const matchQuery = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sizes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });

    // Sorting
    if (sortBy === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'strength-high') {
      filtered.sort((a, b) => {
        const strA = parseFloat(a.strength) || 0;
        const strB = parseFloat(b.strength) || 0;
        return strB - strA;
      });
    }

    if (resultCount) {
      resultCount.innerText = `Showing ${filtered.length} of ${window.PRODUCTS_DATA.length} products`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center bg-gray-50 border border-dashed border-gray-300 rounded-lg">
          <i class="fa-solid fa-cubes text-4xl text-gray-400 mb-3"></i>
          <h3 class="text-xl font-heading font-bold text-gray-800">No Matching Building Materials Found</h3>
          <p class="text-gray-500 text-sm max-w-md mx-auto mt-1 mb-4">Try adjusting your keyword search or select "All Products" to see our complete industrial inventory.</p>
          <button id="reset-filters-btn" class="btn-brick text-sm">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          filterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === 'all'));
          render();
        });
      }
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="product-card bg-white rounded-md overflow-hidden flex flex-col justify-between h-full group shadow-sm hover:shadow-xl transition-all border border-gray-200">
        <div class="flex flex-col flex-1">
          <!-- Image Box -->
          <div class="relative overflow-hidden bg-gray-100 h-52 w-full flex-shrink-0">
            <img src="${item.image}" alt="${item.name}" class="product-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <span class="absolute top-3 left-3 bg-red-700 text-white font-mono text-xs uppercase px-2 py-0.5 rounded font-semibold tracking-wider shadow">
              ${item.badge || 'Standard'}
            </span>
            <span class="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-gray-200 font-mono text-[11px] px-2 py-0.5 rounded">
              ${item.categoryLabel}
            </span>
          </div>

          <!-- Content Body -->
          <div class="p-5 flex flex-col flex-1 justify-between">
            <div>
              <h3 class="text-lg font-heading font-bold text-gray-900 group-hover:text-red-700 transition-colors mb-2 leading-snug line-clamp-1" title="${item.name}">
                ${item.name}
              </h3>
              <p class="text-gray-600 text-xs line-clamp-2 mb-4 leading-relaxed">
                ${item.shortDesc}
              </p>
            </div>

            <!-- Technical Spec Snippets -->
            <div class="space-y-1.5 mb-2 text-xs font-mono bg-gray-50 p-2.5 rounded border border-gray-100">
              <div class="flex items-center text-gray-700">
                <i class="fa-solid fa-ruler-combined text-red-600 w-4 text-[10px]"></i>
                <span class="text-gray-500 mr-1">Size:</span>
                <span class="font-semibold text-gray-900 truncate">${item.sizes}</span>
              </div>
              <div class="flex items-center text-gray-700">
                <i class="fa-solid fa-shield-halved text-orange-600 w-4 text-[10px]"></i>
                <span class="text-gray-500 mr-1">Strength:</span>
                <span class="font-bold text-red-700">${item.strength}</span>
              </div>
              <div class="flex items-center text-gray-700">
                <i class="fa-solid fa-boxes-stacked text-gray-500 w-4 text-[10px]"></i>
                <span class="text-gray-500 mr-1">Pallet:</span>
                <span class="text-gray-800 truncate">${item.specs.palletQuantity || 'Bulk Pallet'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 pt-0 border-t border-gray-100 flex items-center gap-2 mt-auto">
          <button data-open-quote data-product-name="${item.name}" class="btn-brick text-xs flex-1 py-2 text-center">
            <i class="fa-solid fa-tag mr-1"></i> Request Price
          </button>
          <button data-open-details data-product-id="${item.id}" class="btn-outline-dark text-xs py-2 px-3 text-center" title="View Full Engineering Specs">
            <i class="fa-solid fa-eye"></i> Details
          </button>
        </div>
      </div>
    `).join('');
  }

  // Event Listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      render();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      render();
    });
  }

  render();
}

function initFeaturedProductsHome() {
  const container = document.getElementById('featured-products-container');
  if (!container || !window.PRODUCTS_DATA) return;

  const featured = window.PRODUCTS_DATA.slice(0, 8);

  container.innerHTML = featured.map(item => `
    <div class="product-card bg-white rounded-md overflow-hidden flex flex-col justify-between h-full group shadow-sm hover:shadow-xl transition-all border border-gray-200">
      <div class="flex flex-col flex-1">
        <div class="relative overflow-hidden bg-gray-100 h-52 w-full flex-shrink-0">
          <img src="${item.image}" alt="${item.name}" class="product-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <span class="absolute top-3 left-3 bg-red-700 text-white font-mono text-xs uppercase px-2 py-0.5 rounded font-semibold tracking-wider shadow">
            ${item.badge || 'Certified'}
          </span>
          <span class="absolute top-3 right-3 bg-black/75 text-gray-200 font-mono text-[11px] px-2 py-0.5 rounded">
            ${item.categoryLabel}
          </span>
        </div>
        <div class="p-5 flex flex-col flex-1 justify-between">
          <div>
            <h3 class="text-lg font-heading font-bold text-gray-900 group-hover:text-red-700 transition-colors mb-2 leading-snug line-clamp-1" title="${item.name}">
              ${item.name}
            </h3>
            <p class="text-gray-600 text-xs line-clamp-2 mb-4 leading-relaxed">
              ${item.shortDesc}
            </p>
          </div>
          <div class="space-y-1 text-xs font-mono mb-2 bg-gray-50 p-2.5 rounded border border-gray-100 text-gray-700">
            <div class="flex justify-between border-b border-gray-200/60 pb-1">
              <span class="text-gray-500">Dimensions:</span>
              <span class="font-medium text-gray-900 truncate ml-1">${item.sizes}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Compressive Strength:</span>
              <span class="font-bold text-red-700">${item.strength}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="p-5 pt-0 border-t border-gray-100 flex items-center gap-2 mt-auto">
        <button data-open-quote data-product-name="${item.name}" class="btn-brick text-xs flex-1 py-2 text-center">
          Request Price
        </button>
        <button data-open-details data-product-id="${item.id}" class="btn-outline-dark text-xs py-2 px-3 text-center">
          Specs
        </button>
      </div>
    </div>
  `).join('');
}
