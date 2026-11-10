// Contact Page & Commercial Masonry Enquiry Module

function initContactModule() {
  setupEnquiryForm();
  setupTrackerLookup();
  loadPlantDirectory();
}

function setupEnquiryForm() {
  const form = document.getElementById("commercial-enquiry-form");
  if (!form) return;

  // Blueprint file input mock
  const fileInput = document.getElementById("blueprint-upload");
  const fileNameDisplay = document.getElementById("blueprint-filename-display");
  if (fileInput && fileNameDisplay) {
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
        fileNameDisplay.innerHTML = `
          <div class="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-slate-900 px-3 py-1.5 rounded border border-emerald-900/60">
            <i data-lucide="file-check" class="w-4 h-4 text-emerald-400"></i>
            <span><strong>${file.name}</strong> (${sizeMb} MB) Attached</span>
          </div>
        `;
        lucide.createIcons();
      }
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("contact-name");
    const companyInput = document.getElementById("contact-company");
    const emailInput = document.getElementById("contact-email");
    const phoneInput = document.getElementById("contact-phone");
    const zipInput = document.getElementById("contact-zip");

    const nameVal = nameInput ? nameInput.value.trim() : "";
    const companyVal = companyInput ? companyInput.value.trim() : "";
    const emailVal = emailInput ? emailInput.value.trim() : "";
    const phoneVal = phoneInput ? phoneInput.value.trim() : "";
    const zipVal = zipInput ? zipInput.value.trim() : "";

    // Clear previous error styles
    [nameInput, companyInput, emailInput, phoneInput, zipInput].forEach(inp => {
      if (inp) inp.classList.remove("border-red-500", "bg-red-950/20");
    });

    if (!nameVal) {
      if (typeof showIndustrialToast === "function") showIndustrialToast("Validation error: Contact Name is required.", "error");
      if (nameInput) { nameInput.classList.add("border-red-500", "bg-red-950/20"); nameInput.focus(); }
      return;
    }

    if (!companyVal) {
      if (typeof showIndustrialToast === "function") showIndustrialToast("Validation error: General Contractor or Entity Name is required.", "error");
      if (companyInput) { companyInput.classList.add("border-red-500", "bg-red-950/20"); companyInput.focus(); }
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      if (typeof showIndustrialToast === "function") showIndustrialToast("Validation error: Please provide a valid corporate or engineering email address.", "error");
      if (emailInput) { emailInput.classList.add("border-red-500", "bg-red-950/20"); emailInput.focus(); }
      return;
    }

    const phoneDigits = phoneVal.replace(/\D/g, "");
    if (!phoneVal || phoneDigits.length < 7) {
      if (typeof showIndustrialToast === "function") showIndustrialToast("Validation error: Please enter a valid telephone number with area code.", "error");
      if (phoneInput) { phoneInput.classList.add("border-red-500", "bg-red-950/20"); phoneInput.focus(); }
      return;
    }

    if (!zipVal) {
      if (typeof showIndustrialToast === "function") showIndustrialToast("Validation error: Delivery Jobsite ZIP code is required for haulage routing.", "error");
      if (zipInput) { zipInput.classList.add("border-red-500", "bg-red-950/20"); zipInput.focus(); }
      return;
    }

    const submitBtn = document.getElementById("enquiry-submit-btn");
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline mr-1.5"></i> Logging Commercial Enquiry...`;
    lucide.createIcons();

    const productSelect = document.getElementById("contact-product-select");
    const selectedProduct = window.productsData ? window.productsData.find(p => p.id === productSelect.value) : null;

    const fileInputEl = document.getElementById("blueprint-upload");
    const attachedFile = (fileInputEl && fileInputEl.files && fileInputEl.files[0]) ? fileInputEl.files[0].name : "";

    const payload = {
      full_name: nameVal,
      company_name: companyVal,
      email: emailVal,
      phone: phoneVal,
      contractor_license: document.getElementById("contact-license") ? document.getElementById("contact-license").value.trim() : "",
      project_name: document.getElementById("contact-project-name") ? document.getElementById("contact-project-name").value.trim() : "",
      project_type: document.getElementById("contact-project-type") ? document.getElementById("contact-project-type").value : "Commercial Construction",
      product_id: productSelect ? productSelect.value : "",
      product_name: selectedProduct ? selectedProduct.name : (productSelect ? productSelect.value : "General Inquiry"),
      quantity: parseInt(document.getElementById("contact-quantity").value) || 1000,
      unit_type: document.getElementById("contact-unit-type") ? document.getElementById("contact-unit-type").value : "units",
      delivery_zip: zipVal,
      delivery_city: document.getElementById("contact-city") ? document.getElementById("contact-city").value.trim() : "",
      offload_method: document.getElementById("contact-offload-method") ? document.getElementById("contact-offload-method").value : "Truck-Mounted Moffett Forklift",
      target_date: document.getElementById("contact-target-date") ? document.getElementById("contact-target-date").value : "",
      enquiry_type: document.getElementById("enquiry-type") ? document.getElementById("enquiry-type").value : "Bulk Price Quotation",
      blueprint_file: attachedFile,
      notes: document.getElementById("contact-notes") ? document.getElementById("contact-notes").value.trim() : "",
      estimated_total: window.bulkCalcResult ? window.bulkCalcResult.calculation.grandTotal : 0.0
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to submit enquiry");
      const result = await res.json();

      // Show Confirmation Card
      renderConfirmationCard(result, payload);
      form.reset();
      if (fileNameDisplay) fileNameDisplay.innerHTML = "";

      showIndustrialToast(`Enquiry ${result.reference_no} logged! Kiln dispatch notified.`, "success");

      // Auto-set tracking input
      const trackInput = document.getElementById("tracker-ref-input");
      if (trackInput) trackInput.value = result.reference_no;

    } catch (err) {
      console.error("Enquiry submission failed:", err);
      showIndustrialToast("Network or database error logging enquiry. Please try again or call dispatch directly.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      lucide.createIcons();
    }
  });
}

function renderConfirmationCard(result, payload) {
  const container = document.getElementById("enquiry-confirmation-container");
  if (!container) return;

  container.innerHTML = `
    <div class="p-6 md:p-8 bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/80 rounded-lg shadow-2xl relative overflow-hidden animate-fade-in">
      <div class="hazard-stripe-thin absolute top-0 left-0 right-0"></div>
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">OFFICIAL COMMERCIAL ENQUIRY LOGGED</span>
          </div>
          <h3 class="text-2xl font-heading text-slate-100">Reference: ${result.reference_no}</h3>
          <p class="text-xs font-mono text-slate-400 mt-1">Logged into Luxeris Dispatch Queue | Plant Kiln Batch Verification Active</p>
        </div>
        <div class="text-left sm:text-right">
          <span class="text-[10px] font-mono uppercase text-slate-500 block">SLA Response Window</span>
          <span class="text-sm font-mono-tech font-bold text-amber-400">Within 2 to 4 Business Hours</span>
        </div>
      </div>

      <!-- Logged Details Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-6 text-xs font-mono">
        <div class="bg-slate-950 p-3.5 rounded border border-slate-800">
          <span class="text-slate-500 block mb-1 uppercase text-[10px]">Project Name</span>
          <strong class="text-slate-200 block truncate">${payload.project_name}</strong>
          <span class="text-slate-400 text-[11px]">${payload.company_name}</span>
        </div>
        <div class="bg-slate-950 p-3.5 rounded border border-slate-800">
          <span class="text-slate-500 block mb-1 uppercase text-[10px]">Specified Material</span>
          <strong class="text-slate-200 block truncate">${payload.product_name}</strong>
          <span class="text-amber-400 font-bold">${payload.quantity.toLocaleString()} ${payload.unit_type}</span>
        </div>
        <div class="bg-slate-950 p-3.5 rounded border border-slate-800">
          <span class="text-slate-500 block mb-1 uppercase text-[10px]">Site Logistics</span>
          <strong class="text-slate-200 block truncate">${payload.delivery_city || 'Jobsite'} (${payload.delivery_zip})</strong>
          <span class="text-slate-400 text-[11px] truncate block">${payload.offload_method}</span>
        </div>
        <div class="bg-slate-950 p-3.5 rounded border border-slate-800">
          <span class="text-slate-500 block mb-1 uppercase text-[10px]">Estimated Total</span>
          <strong class="text-emerald-400 text-sm block font-mono-tech font-bold">
            ${payload.estimated_total > 0 ? '$' + payload.estimated_total.toLocaleString() : 'Pending Official Takeoff'}
          </strong>
          <span class="text-slate-500 text-[10px]">Assigned: Sales Estimating Team</span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400">
        <div class="flex items-center gap-2">
          <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
          <span>Save reference <strong>${result.reference_no}</strong> to look up live status below or track tender submission.</span>
        </div>
        <button onclick="document.getElementById('enquiry-confirmation-container').innerHTML = ''" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 font-bold uppercase text-[10px]">
          Dismiss Certificate
        </button>
      </div>
    </div>
  `;
  container.scrollIntoView({ behavior: 'smooth' });
  lucide.createIcons();
}

async function performLookup() {
  const input = document.getElementById("tracker-ref-input");
  const resultContainer = document.getElementById("tracker-result-display");

  if (!input || !resultContainer) return;

  const refNo = input.value.trim();
  if (!refNo) {
    if (typeof showIndustrialToast === "function") {
      showIndustrialToast("Please enter an Enquiry Reference number (e.g. ENQ-2026-8492)", "error");
    }
    return;
  }

  resultContainer.innerHTML = `
    <div class="py-8 text-center text-xs font-mono text-slate-400">
      <i data-lucide="loader-2" class="w-6 h-6 animate-spin text-amber-500 mx-auto mb-2"></i>
      <span>Querying Kiln Dispatch Database for Reference #${refNo}...</span>
    </div>
  `;
  if (window.lucide) lucide.createIcons();

  try {
    const res = await fetch(`/api/enquiries/${encodeURIComponent(refNo)}`);
    if (!res.ok) {
      resultContainer.innerHTML = `
        <div class="p-5 bg-red-950/40 border border-red-800/80 rounded text-center space-y-2">
          <i data-lucide="alert-octagon" class="w-8 h-8 text-red-400 mx-auto"></i>
          <h4 class="text-sm font-mono font-bold text-red-200">No Record Found for Reference "${refNo}"</h4>
          <p class="text-xs text-slate-400 max-w-md mx-auto">Verify your reference formatting (e.g. ENQ-2026-8492) or contact dispatch engineering directly at 1-800-848-2678.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    const enq = await res.json();
    renderTrackerResult(enq, resultContainer);

  } catch (err) {
    console.error("Lookup error:", err);
    resultContainer.innerHTML = `<div class="p-4 bg-red-950 text-red-200 text-xs font-mono rounded">Network error checking status.</div>`;
  }
}

function setupTrackerLookup() {
  const btn = document.getElementById("tracker-lookup-btn");
  const input = document.getElementById("tracker-ref-input");

  if (!btn || !input) return;

  btn.addEventListener("click", performLookup);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performLookup();
    }
  });
}

function renderTrackerResult(enq, container) {
  const isApproved = enq.status === "Quote Prepared" || enq.status === "Sample Dispatched";

  container.innerHTML = `
    <div class="p-5 bg-slate-950 border border-slate-800 rounded-lg space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div class="flex items-center gap-3">
          <span class="text-lg font-heading text-slate-100">${enq.reference_no}</span>
          <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
            enq.status === 'Quote Prepared' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
            enq.status === 'Sample Dispatched' ? 'bg-sky-950 text-sky-300 border border-sky-700' :
            'bg-amber-950 text-amber-300 border border-amber-700'
          }">
            ● ${enq.status.toUpperCase()}
          </span>
        </div>
        <div class="text-xs font-mono text-slate-400">
          Created: ${enq.created_at}
        </div>
      </div>

      <!-- Detail Matrix -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
        <div class="bg-slate-900/80 p-3 rounded border border-slate-800">
          <span class="text-slate-500 uppercase text-[10px] block">Project & Client</span>
          <strong class="text-slate-200 block truncate">${enq.project_name}</strong>
          <span class="text-slate-400">${enq.company_name} (${enq.full_name})</span>
        </div>

        <div class="bg-slate-900/80 p-3 rounded border border-slate-800">
          <span class="text-slate-500 uppercase text-[10px] block">Material & Volume</span>
          <strong class="text-slate-200 block truncate">${enq.product_name || 'Standard CMU'}</strong>
          <span class="text-amber-400 font-bold">${enq.quantity.toLocaleString()} ${enq.unit_type}</span>
        </div>

        <div class="bg-slate-900/80 p-3 rounded border border-slate-800">
          <span class="text-slate-500 uppercase text-[10px] block">Assigned Engineer</span>
          <strong class="text-cyan-400 block truncate">${enq.assigned_engineer || 'Sales Engineering Unit'}</strong>
          <span class="text-slate-400 text-[11px]">Direct Plant Review</span>
        </div>

        <div class="bg-slate-900/80 p-3 rounded border border-slate-800">
          <span class="text-slate-500 uppercase text-[10px] block">Formal Takeoff Total</span>
          <strong class="text-emerald-400 font-mono-tech text-sm block font-bold">
            ${enq.estimated_total > 0 ? '$' + enq.estimated_total.toLocaleString() : 'Takeoff Pending'}
          </strong>
          <span class="text-slate-400 text-[10px]">Target Date: ${enq.target_date || 'TBD'}</span>
        </div>
      </div>

      ${enq.notes ? `
        <div class="bg-slate-900/60 p-3 rounded border border-slate-800/60 text-xs font-mono text-slate-300">
          <span class="text-slate-500 uppercase text-[10px] block mb-1">Contractor Jobsite Notes / Requests:</span>
          <p class="whitespace-pre-line text-slate-300 leading-relaxed">${enq.notes}</p>
        </div>
      ` : ''}

      <div class="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
        <div>
          <span>Delivery Zip: <strong>${enq.delivery_zip}</strong> (${enq.delivery_city || 'Jobsite'})</span> | 
          <span>Offload: <strong>${enq.offload_method}</strong></span>
        </div>
        <button onclick="window.print()" class="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold">
          <i data-lucide="printer" class="w-3.5 h-3.5"></i> Print Quotation Record
        </button>
      </div>
    </div>
  `;
  lucide.createIcons();
}

function loadSampleEnquiry(refNo) {
  const input = document.getElementById("tracker-ref-input");
  if (input) {
    input.value = refNo;
    performLookup();
  }
}

async function loadPlantDirectory() {
  try {
    const res = await fetch("/api/plant-info");
    if (!res.ok) return;
    const info = await res.json();

    const statsBadge = document.getElementById("nav-dispatch-status");
    if (statsBadge) {
      statsBadge.innerHTML = `🟢 2 Plants Active | Daily Kiln Output: ${info.dailyKilnCapacity}`;
    }

    const plantsContainer = document.getElementById("plants-directory-grid");
    if (plantsContainer && info.plants) {
      let html = "";
      info.plants.forEach(plant => {
        html += `
          <div class="bg-concrete-card p-5 rounded border border-slate-800 space-y-3">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-mono-tech font-bold uppercase text-amber-400 bg-slate-950 px-2 py-0.5 border border-slate-800 rounded">
                  ${plant.weighbridgeCapacity}
                </span>
                <h4 class="text-base font-heading text-slate-100 mt-1.5">${plant.name}</h4>
              </div>
              <span class="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                ${plant.status}
              </span>
            </div>

            <div class="space-y-1 text-xs font-mono text-slate-400">
              <div class="flex items-center gap-2">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-500 shrink-0"></i>
                <span class="text-slate-300">${plant.address}, ${plant.city}</span>
              </div>
              <div class="flex items-center gap-2">
                <i data-lucide="phone-call" class="w-3.5 h-3.5 text-amber-500 shrink-0"></i>
                <span class="text-slate-300">${plant.phone} (${plant.dispatchRadio})</span>
              </div>
              <div class="flex items-center gap-2">
                <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-500 shrink-0"></i>
                <span>Yard Dispatch: ${plant.yardHours}</span>
              </div>
            </div>

            <div class="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
              <span class="text-slate-500">Molds & Kiln Production:</span> ${plant.capabilities}
            </div>
          </div>
        `;
      });
      plantsContainer.innerHTML = html;
      lucide.createIcons();
    }
  } catch (err) {
    console.error("Failed to load plant directory:", err);
  }
}

function resetEnquiryForm() {
  const form = document.getElementById("commercial-enquiry-form");
  if (form) form.reset();
  const fileDisplay = document.getElementById("blueprint-filename-display");
  if (fileDisplay) fileDisplay.innerHTML = "";
  const confContainer = document.getElementById("enquiry-confirmation-container");
  if (confContainer) confContainer.innerHTML = "";
  if (typeof showIndustrialToast === "function") {
    showIndustrialToast("Commercial enquiry form fields cleared.", "info");
  }
}

window.initContactModule = initContactModule;
window.loadSampleEnquiry = loadSampleEnquiry;
window.performLookup = performLookup;
window.resetEnquiryForm = resetEnquiryForm;

