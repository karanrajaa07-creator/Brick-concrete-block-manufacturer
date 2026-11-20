/**
 * TITAN BRICK & CONCRETE INDUSTRIES
 * Commercial Material Estimator & Bulk Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  initBulkCalculator();
});

function initBulkCalculator() {
  const form = document.getElementById('material-calculator-form');
  if (!form) return;

  const productSelect = document.getElementById('calc-product');
  const calcMode = document.getElementById('calc-mode'); // 'area' or 'units'
  const areaInput = document.getElementById('calc-area');
  const unitType = document.getElementById('calc-unit-type'); // 'sqft' or 'sqm'
  const unitsDirectInput = document.getElementById('calc-units-direct');
  const areaGroup = document.getElementById('calc-area-group');
  const directGroup = document.getElementById('calc-direct-group');
  const wastageSelect = document.getElementById('calc-wastage');

  // Outputs
  const outUnits = document.getElementById('calc-result-units');
  const outPallets = document.getElementById('calc-result-pallets');
  const outWeight = document.getElementById('calc-result-weight');
  const outMortar = document.getElementById('calc-result-mortar');
  const outPriceEst = document.getElementById('calc-result-price');
  const sendToQuoteBtn = document.getElementById('calc-send-quote');

  const PRODUCT_SPECS = {
    'solid-8': {
      name: 'Solid Concrete Block (8-Inch)',
      unitsPerSqM: 12.5,
      weightPerUnitKg: 35.5,
      palletQty: 60,
      mortarBagsPer100: 3.5,
      unitPriceMin: 2.45,
      unitPriceMax: 2.85
    },
    'hollow-8': {
      name: 'Hollow Concrete Block (2-Core)',
      unitsPerSqM: 12.5,
      weightPerUnitKg: 19.5,
      palletQty: 72,
      mortarBagsPer100: 2.8,
      unitPriceMin: 1.85,
      unitPriceMax: 2.15
    },
    'aac-block': {
      name: 'AAC Lightweight Block (600x200mm)',
      unitsPerSqM: 8.33,
      weightPerUnitKg: 14.2,
      palletQty: 54,
      mortarBagsPer100: 1.2, // thinbed adhesive
      unitPriceMin: 2.60,
      unitPriceMax: 3.10
    },
    'fly-ash': {
      name: 'Fly Ash Brick (Standard)',
      unitsPerSqM: 52.0,
      weightPerUnitKg: 3.2,
      palletQty: 500,
      mortarBagsPer100: 0.8,
      unitPriceMin: 0.38,
      unitPriceMax: 0.48
    },
    'red-clay': {
      name: 'Red Clay Kiln Brick',
      unitsPerSqM: 50.0,
      weightPerUnitKg: 3.4,
      palletQty: 500,
      mortarBagsPer100: 0.85,
      unitPriceMin: 0.52,
      unitPriceMax: 0.65
    },
    'paver-80': {
      name: 'Zig-Zag Paver Block (80mm)',
      unitsPerSqM: 36.0,
      weightPerUnitKg: 4.8,
      palletQty: 430,
      mortarBagsPer100: 0, // bedding sand
      unitPriceMin: 0.40,
      unitPriceMax: 0.50
    }
  };

  // Toggle mode
  if (calcMode) {
    calcMode.addEventListener('change', () => {
      if (calcMode.value === 'direct') {
        areaGroup.classList.add('hidden');
        directGroup.classList.remove('hidden');
      } else {
        areaGroup.classList.remove('hidden');
        directGroup.classList.add('hidden');
      }
      calculate();
    });
  }

  function calculate() {
    const prodKey = productSelect.value;
    const spec = PRODUCT_SPECS[prodKey] || PRODUCT_SPECS['solid-8'];
    const wastage = parseFloat(wastageSelect.value) || 0.05;

    let baseUnits = 0;

    if (calcMode && calcMode.value === 'direct') {
      baseUnits = parseFloat(unitsDirectInput.value) || 0;
    } else {
      const areaVal = parseFloat(areaInput.value) || 0;
      const isSqFt = unitType && unitType.value === 'sqft';
      const areaSqM = isSqFt ? (areaVal * 0.092903) : areaVal;
      baseUnits = areaSqM * spec.unitsPerSqM;
    }

    const totalUnits = Math.ceil(baseUnits * (1 + wastage));
    const pallets = Math.ceil(totalUnits / spec.palletQty);
    const totalWeightTonnes = ((totalUnits * spec.weightPerUnitKg) / 1000).toFixed(1);
    const mortarBags = Math.ceil((totalUnits / 100) * spec.mortarBagsPer100);

    const priceMin = Math.round(totalUnits * spec.unitPriceMin);
    const priceMax = Math.round(totalUnits * spec.unitPriceMax);

    if (outUnits) outUnits.innerText = totalUnits.toLocaleString() + " Units";
    if (outPallets) outPallets.innerText = pallets.toLocaleString() + " Pallets";
    if (outWeight) outWeight.innerText = totalWeightTonnes + " Tonnes";
    if (outMortar) {
      outMortar.innerText = spec.mortarBagsPer100 > 0 ? (mortarBags + " Bags (50kg)") : "Bedding Sand Required";
    }
    if (outPriceEst) {
      outPriceEst.innerText = `$${priceMin.toLocaleString()} - $${priceMax.toLocaleString()}`;
    }
  }

  // Bind inputs
  [productSelect, areaInput, unitType, unitsDirectInput, wastageSelect].forEach(el => {
    if (el) el.addEventListener('input', calculate);
    if (el) el.addEventListener('change', calculate);
  });

  calculate();

  // Send to Quote button
  if (sendToQuoteBtn) {
    sendToQuoteBtn.addEventListener('click', () => {
      const prodKey = productSelect.value;
      const spec = PRODUCT_SPECS[prodKey] || PRODUCT_SPECS['solid-8'];
      const totalUnits = outUnits ? outUnits.innerText : '';
      const estimatedPrice = outPriceEst ? outPriceEst.innerText : '';

      window.openQuoteModal(spec.name);

      const modal = document.getElementById('quote-modal');
      if (modal) {
        const qtyField = modal.querySelector('#quote-qty');
        const notesField = modal.querySelector('#quote-notes');
        if (qtyField) qtyField.value = totalUnits;
        if (notesField) {
          notesField.value = `Material Estimator Calculation:\nProduct: ${spec.name}\nQuantity: ${totalUnits} (${outPallets.innerText}, ~${outWeight.innerText})\nEstimated Budget Range: ${estimatedPrice}`;
        }
      }
    });
  }
}
