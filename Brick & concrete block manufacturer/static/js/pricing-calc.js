// Bulk Pricing & Haulage Logistics Calculator Module

let bulkCalcResult = null;

async function initPricingCalculator() {
  populateProductDropdown();
  setupCalculatorListeners();
  calculateBulkEstimate();
}

function populateProductDropdown() {
  const select = document.getElementById("calc-product-select");
  const contactSelect = document.getElementById("contact-product-select");
  if (!select) return;

  // Wait if products haven't loaded yet
  if (!window.productsData || window.productsData.length === 0) {
    setTimeout(populateProductDropdown, 150);
    return;
  }

  select.innerHTML = "";
  if (contactSelect) contactSelect.innerHTML = `<option value="">-- Select Product Specification --</option>`;

  window.productsData.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.innerText = `${p.name} [${p.dimensionsImperial}] - $${p.priceBase.toFixed(2)}/ea (${p.compressiveStrengthMpa} MPa)`;
    select.appendChild(opt);

    if (contactSelect) {
      const cOpt = document.createElement("option");
      cOpt.value = p.id;
      cOpt.innerText = `${p.name} (${p.dimensionsImperial} | ${p.compressiveStrengthMpa} MPa)`;
      contactSelect.appendChild(cOpt);
    }
  });

  // Default to 8" CMU or first item
  const defaultItem = window.productsData.find(p => p.id === "cmu-hollow-8") || window.productsData[0];
  if (defaultItem) select.value = defaultItem.id;
}

function setupCalculatorListeners() {
  const modeRadios = document.querySelectorAll("input[name='calc-mode']");
  const unitsContainer = document.getElementById("calc-mode-units-container");
  const dimensionsContainer = document.getElementById("calc-mode-dimensions-container");

  modeRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "dimensions") {
        unitsContainer.classList.add("hidden");
        dimensionsContainer.classList.remove("hidden");
      } else {
        dimensionsContainer.classList.add("hidden");
        unitsContainer.classList.remove("hidden");
      }
      calculateBulkEstimate();
    });
  });

  const inputsToTrigger = [
    "calc-product-select",
    "calc-units-input",
    "calc-wall-length",
    "calc-wall-height",
    "calc-waste-select",
    "calc-freight-zone",
    "calc-offload-select"
  ];

  inputsToTrigger.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", calculateBulkEstimate);
      el.addEventListener("change", calculateBulkEstimate);
    }
  });

  // Transfer to quote request button
  const transferBtn = document.getElementById("calc-transfer-to-quote-btn");
  if (transferBtn) {
    transferBtn.addEventListener("click", transferCalcToEnquiryForm);
  }
}

async function calculateBulkEstimate() {
  const productSelect = document.getElementById("calc-product-select");
  if (!productSelect || !productSelect.value) return;

  const modeRadio = document.querySelector("input[name='calc-mode']:checked");
  const mode = modeRadio ? modeRadio.value : "units";

  const unitsInput = document.getElementById("calc-units-input");
  const wallLenInput = document.getElementById("calc-wall-length");
  const wallHtInput = document.getElementById("calc-wall-height");
  const wasteSelect = document.getElementById("calc-waste-select");
  const zoneSelect = document.getElementById("calc-freight-zone");
  const offloadSelect = document.getElementById("calc-offload-select");

  const payload = {
    product_id: productSelect.value,
    calc_mode: mode,
    quantity: unitsInput ? parseInt(unitsInput.value) || 1000 : 1000,
    wall_length_ft: wallLenInput ? parseFloat(wallLenInput.value) || 0 : 0,
    wall_height_ft: wallHtInput ? parseFloat(wallHtInput.value) || 0 : 0,
    waste_percent: wasteSelect ? parseFloat(wasteSelect.value) || 5.0 : 5.0,
    freight_zone: zoneSelect ? zoneSelect.value : "regional",
    offload_service: offloadSelect ? offloadSelect.value : "forklift"
  };

  try {
    const res = await fetch("/api/bulk-calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Calculation failed");
    const data = await res.json();
    bulkCalcResult = data;
    renderCalculationResults(data);
  } catch (err) {
    console.error("Bulk Calc Error:", err);
  }
}

function renderCalculationResults(data) {
  const c = data.calculation;
  const p = data.product;

  const billableUnitsEl = document.getElementById("res-billable-units");
  const palletsCountEl = document.getElementById("res-pallets-count");
  const grossWeightEl = document.getElementById("res-gross-weight");
  const trucksEl = document.getElementById("res-flatbed-trucks");

  const tierBadgeEl = document.getElementById("res-tier-badge");
  const basePriceEl = document.getElementById("res-base-unit-price");
  const discountedPriceEl = document.getElementById("res-discounted-unit-price");
  const savingsEl = document.getElementById("res-discount-savings");

  const materialSubtotalEl = document.getElementById("res-material-subtotal");
  const freightCostEl = document.getElementById("res-freight-cost");
  const grandTotalEl = document.getElementById("res-grand-total");

  if (billableUnitsEl) billableUnitsEl.innerText = `${c.totalBillableUnits.toLocaleString()} units`;
  if (palletsCountEl) palletsCountEl.innerText = `${c.palletsNeeded} Pallets (${p.unitsPerPallet}/plt)`;
  if (grossWeightEl) grossWeightEl.innerText = `${c.totalWeightLbs.toLocaleString()} lbs (${c.totalWeightTonnes} MT)`;
  if (trucksEl) trucksEl.innerText = `${c.flatbedTrucksRequired} Semi Flatbed${c.flatbedTrucksRequired > 1 ? 's' : ''}`;

  if (tierBadgeEl) {
    tierBadgeEl.innerHTML = `
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold ${
        c.discountPercent >= 20 ? 'bg-amber-500 text-slate-950' :
        c.discountPercent > 0 ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' :
        'bg-slate-800 text-slate-400'
      }">
        <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> ${c.tierName} (${c.discountPercent}% OFF)
      </span>
    `;
  }

  if (basePriceEl) basePriceEl.innerText = `$${c.baseUnitPrice.toFixed(2)}`;
  if (discountedPriceEl) discountedPriceEl.innerText = `$${c.discountedUnitPrice.toFixed(2)}`;
  if (savingsEl) savingsEl.innerText = `-$${c.discountSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (materialSubtotalEl) materialSubtotalEl.innerText = `$${c.materialSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (freightCostEl) freightCostEl.innerText = c.freightCost > 0 ? `$${c.freightCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "Self-Pickup ($0)";
  if (grandTotalEl) grandTotalEl.innerText = `$${c.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Masonry Accessories (Mortar, Core Grout, Rebar)
  const mortarEl = document.getElementById("res-mortar-bags");
  const groutEl = document.getElementById("res-grout-volume");
  const rebarEl = document.getElementById("res-rebar-footage");

  if (c.masonryAccessories) {
    const acc = c.masonryAccessories;
    if (mortarEl) mortarEl.innerText = acc.mortarBags80lb > 0 ? `${acc.mortarBags80lb.toLocaleString()} Bags (80 lb Type S)` : "Joint Sand / Dry Lay";
    if (groutEl) groutEl.innerText = acc.groutCuYds > 0 ? `${acc.groutCuYds.toFixed(2)} Cu Yds Core Fill` : "Solid Unit (0 Cu Yd)";
    if (rebarEl) rebarEl.innerText = acc.rebarLinearFt > 0 ? `${acc.rebarLinearFt.toLocaleString()} Lin Ft (#4/#5)` : "Non-Reinforced";
  }

  // Highlight Tier Milestone in the Schedule Table
  updateTierHighlight(c.palletsNeeded);

  lucide.createIcons();
}

function openFormalQuotationModal() {
  if (!bulkCalcResult) {
    calculateBulkEstimate();
  }
  if (!bulkCalcResult) return;

  const c = bulkCalcResult.calculation;
  const p = bulkCalcResult.product;
  const quoteRef = `LX-QUOTE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const modal = document.getElementById("tds-modal");
  const content = document.getElementById("tds-modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="p-6 md:p-10 space-y-6 bg-slate-900 text-slate-200">
      
      <!-- Letterhead Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-amber-500 pb-5 gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-amber-500 text-slate-950 font-heading font-black text-2xl flex items-center justify-center rounded">
            LX
          </div>
          <div>
            <h2 class="text-2xl font-heading text-slate-100">LUXERIS MASONRY & CONCRETE WORKS</h2>
            <div class="text-[11px] font-mono text-slate-400">Commercial Masonry Manufacturing • ASTM C90 / C216 Certified</div>
          </div>
        </div>

        <div class="text-left sm:text-right font-mono text-xs">
          <div class="text-amber-400 font-bold text-sm">FORMAL COMMERCIAL TAKEOFF</div>
          <div class="text-slate-300 font-bold">${quoteRef}</div>
          <div class="text-slate-400 text-[10px]">Date: ${new Date().toLocaleDateString()} • Valid 30 Days</div>
        </div>
      </div>

      <!-- Itemized Takeoff Table -->
      <div class="overflow-x-auto border border-slate-800 rounded">
        <table class="w-full text-left tech-table text-xs font-mono">
          <thead>
            <tr class="border-b border-slate-800 bg-slate-950">
              <th class="p-3">Specified Item</th>
              <th class="p-3">Nominal Size</th>
              <th class="p-3 text-right">Strength</th>
              <th class="p-3 text-right">Quantity</th>
              <th class="p-3 text-right">Pallets</th>
              <th class="p-3 text-right">Unit Price</th>
              <th class="p-3 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800 text-slate-300">
            <tr>
              <td class="p-3 font-bold text-slate-100">${p.name}</td>
              <td class="p-3">${p.dimensions}</td>
              <td class="p-3 text-right text-amber-400 font-bold">${p.compressiveStrengthMpa} MPa</td>
              <td class="p-3 text-right font-mono-tech">${c.totalBillableUnits.toLocaleString()} units</td>
              <td class="p-3 text-right">${c.palletsNeeded} plts</td>
              <td class="p-3 text-right font-mono-tech">$${c.discountedUnitPrice.toFixed(2)}</td>
              <td class="p-3 text-right font-mono-tech font-bold text-slate-100">$${c.materialSubtotal.toLocaleString()}</td>
            </tr>
            <tr class="bg-slate-950/40">
              <td colspan="5" class="p-3 text-slate-400">
                <strong>Volume Tier Applied:</strong> ${c.tierName} (${c.discountPercent}% Discount Saved: -$${c.discountSavings.toLocaleString()})
              </td>
              <td class="p-3 text-right text-slate-400 font-bold">Freight & Offload:</td>
              <td class="p-3 text-right font-mono-tech font-bold text-slate-100">
                ${c.freightCost > 0 ? '$' + c.freightCost.toLocaleString() : 'Self-Pickup ($0)'}
              </td>
            </tr>
            <tr class="bg-slate-950 border-t-2 border-slate-700 text-sm">
              <td colspan="5" class="p-3 text-slate-300 font-bold">TOTAL COMMERCIAL ESTIMATE:</td>
              <td colspan="2" class="p-3 text-right font-mono-tech font-black text-amber-400 text-lg">
                $${c.grandTotal.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Contractor Materials Takeoff Details -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded border border-slate-800 text-xs font-mono">
        <div>
          <span class="text-slate-500 uppercase text-[10px] block">Gross Haulage Mass:</span>
          <strong class="text-slate-200">${c.totalWeightLbs.toLocaleString()} lbs (${c.totalWeightTonnes} MT)</strong>
          <span class="text-sky-400 block text-[11px]">${c.flatbedTrucksRequired} Flatbed Semi-Trailer(s)</span>
        </div>
        <div>
          <span class="text-slate-500 uppercase text-[10px] block">Mortar Bed Estimate:</span>
          <strong class="text-slate-200">${c.masonryAccessories ? c.masonryAccessories.mortarBags80lb : 0} Bags Type S</strong>
          <span class="text-slate-400 block text-[11px]">ASTM C270 High-Bond</span>
        </div>
        <div>
          <span class="text-slate-500 uppercase text-[10px] block">Core Grout & Reinforcement:</span>
          <strong class="text-slate-200">${c.masonryAccessories ? c.masonryAccessories.groutCuYds : 0} Cu Yds Pea Gravel</strong>
          <span class="text-slate-400 block text-[11px]">${c.masonryAccessories ? c.masonryAccessories.rebarLinearFt : 0} Lin Ft Grade 60 Rebar</span>
        </div>
      </div>

      <!-- Terms & Signature -->
      <div class="border-t border-slate-800 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-400">
        <div class="space-y-1">
          <div>• Net 30 Terms available for licensed commercial contractors (pending credit approval).</div>
          <div>• Kiln slot reserved upon receipt of signed quotation and jobsite delivery schedule.</div>
          <div>• Dispatch Weighbridge Scale Certified (Denver & Tacoma Plants).</div>
        </div>
        
        <div class="flex items-center gap-2 no-print">
          <button onclick="window.print()" class="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs uppercase rounded flex items-center gap-1.5 shadow">
            <i data-lucide="printer" class="w-4 h-4"></i> Print Official Quotation
          </button>
          <button onclick="closeTdsModal()" class="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold font-mono text-xs uppercase rounded border border-slate-700">
            Close
          </button>
        </div>
      </div>

    </div>
  `;

  modal.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function updateTierHighlight(pallets) {
  const rows = document.querySelectorAll(".tier-row");
  rows.forEach(r => r.classList.remove("bg-amber-500/10", "border-amber-500", "font-bold"));

  let targetId = "tier-1";
  if (pallets >= 31) targetId = "tier-4";
  else if (pallets >= 16) targetId = "tier-3";
  else if (pallets >= 6) targetId = "tier-2";

  const targetRow = document.getElementById(targetId);
  if (targetRow) {
    targetRow.classList.add("bg-amber-500/10", "border-amber-500", "font-bold");
  }
}

function transferCalcToEnquiryForm() {
  if (!bulkCalcResult) {
    calculateBulkEstimate();
  }
  if (!bulkCalcResult) return;

  const c = bulkCalcResult.calculation;
  const p = bulkCalcResult.product;

  // Jump to contact tab
  if (typeof window.navigateTo === "function") {
    window.navigateTo("contact");
  } else {
    window.location.hash = "contact";
  }

  setTimeout(() => {
    const contactProdSelect = document.getElementById("contact-product-select");
    const contactQtyInput = document.getElementById("contact-quantity");
    const contactUnitType = document.getElementById("contact-unit-type");
    const contactOffload = document.getElementById("contact-offload-method");
    const contactNotes = document.getElementById("contact-notes");

    if (contactProdSelect) contactProdSelect.value = p.id;
    if (contactQtyInput) contactQtyInput.value = c.totalBillableUnits;
    if (contactUnitType) contactUnitType.value = `units (${c.palletsNeeded} pallets)`;

    if (contactOffload) {
      if (c.offloadService === "forklift") contactOffload.value = "Truck-Mounted Moffett Forklift";
      else if (c.offloadService === "boom_crane") contactOffload.value = "Flatbed Boom Crane";
      else if (c.offloadService === "yard_pickup") contactOffload.value = "Contractor Yard Self-Pickup (Denver/Tacoma)";
      else contactOffload.value = "Standard Jobsite Flatbed Tailgate";
    }

    if (contactNotes) {
      contactNotes.value = `[AUTO-ESTIMATE IMPORTED FROM BULK CALCULATOR]\n` +
        `• Product: ${p.name} (${p.dimensions})\n` +
        `• Total Units: ${c.totalBillableUnits.toLocaleString()} (${c.palletsNeeded} pallets)\n` +
        `• Gross Weight: ${c.totalWeightLbs.toLocaleString()} lbs (${c.flatbedTrucksRequired} Flatbeds)\n` +
        `• Volume Tier: ${c.tierName} (${c.discountPercent}% Discount)\n` +
        `• Estimated Quote: $${c.grandTotal.toLocaleString()} (Material: $${c.materialSubtotal.toLocaleString()} + Freight: $${c.freightCost.toLocaleString()})\n` +
        `Please confirm kiln slot reservation and batch test certification for this volume.`;
    }

    // Scroll to contact form
    const contactSec = document.getElementById("commercial-enquiry-form") || document.getElementById("contact");
    if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });

    if (typeof showIndustrialToast === "function") {
      showIndustrialToast(`Transferred ${c.totalBillableUnits.toLocaleString()} units to Formal Quotation Form!`, "success");
    }
  }, 120);
}

window.initPricingCalculator = initPricingCalculator;
window.populateProductDropdown = populateProductDropdown;
window.calculateBulkEstimate = calculateBulkEstimate;
window.transferCalcToEnquiryForm = transferCalcToEnquiryForm;
window.openFormalQuotationModal = openFormalQuotationModal;
