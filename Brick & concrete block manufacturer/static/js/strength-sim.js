// Hydraulic Compressive Strength Testing Rig Simulator

const SIM_SPECIMENS = {
  "clay-eng-a": {
    name: "Luxeris Class A Vitrified Engineering Brick",
    spec: "ASTM C216 Grade SW",
    astmMinMpa: 20.0,
    peakMpa: 55.4,
    failureMpa: 58.2,
    areaSqIn: 34.0, // 8.5" x 4"
    blockColor: "#7c2d12",
    blockPattern: "clay",
    coreType: "solid"
  },
  "cmu-solid-8": {
    name: "Luxeris 8\" Ultra-Dense Solid Foundation Block",
    spec: "ASTM C90 Heavy-Duty Solid",
    astmMinMpa: 17.2,
    peakMpa: 38.5,
    failureMpa: 41.0,
    areaSqIn: 128.0, // 8" x 16"
    blockColor: "#475569",
    blockPattern: "concrete",
    coreType: "solid"
  },
  "paver-heavy-80": {
    name: "Luxeris 80mm Armor-Lock Interlocking Port Paver",
    spec: "ASTM C936 Port Specification",
    astmMinMpa: 40.0,
    peakMpa: 50.0,
    failureMpa: 53.5,
    areaSqIn: 38.7,
    blockColor: "#334155",
    blockPattern: "paver",
    coreType: "solid"
  },
  "cmu-hollow-8": {
    name: "Luxeris 8\" Two-Core Structural Hollow CMU",
    spec: "ASTM C90 Grade S (Net Area)",
    astmMinMpa: 13.1,
    peakMpa: 24.0,
    failureMpa: 26.5,
    areaSqIn: 68.0, // Net Area considering dual cores
    blockColor: "#64748b",
    blockPattern: "cmu-cores",
    coreType: "cores"
  },
  "aac-thermal-block": {
    name: "Luxeris Thermal-Shield AAC Autoclaved Block",
    spec: "ASTM C1693 Class 4 (Insulating)",
    astmMinMpa: 3.5,
    peakMpa: 4.5,
    failureMpa: 5.2,
    areaSqIn: 144.0,
    blockColor: "#94a3b8",
    blockPattern: "aac-cellular",
    coreType: "cellular"
  }
};

let currentSpecimenKey = "clay-eng-a";
let appliedPressureMpa = 0;
let isCrushed = false;
let autoPumpInterval = null;

function pumpSimulatorRam() {
  const pumpBtn = document.getElementById("sim-pump-btn");
  if (autoPumpInterval) {
    clearInterval(autoPumpInterval);
    autoPumpInterval = null;
    if (pumpBtn) {
      pumpBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4 inline mr-1"></i> Auto-Pump Ram`;
      if (window.lucide) lucide.createIcons();
    }
  } else {
    if (isCrushed) resetSimulator();
    if (pumpBtn) {
      pumpBtn.innerHTML = `<i data-lucide="square" class="w-4 h-4 inline mr-1"></i> Halt Pump`;
      if (window.lucide) lucide.createIcons();
    }
    autoPumpInterval = setInterval(() => {
      const slider = document.getElementById("sim-pressure-slider");
      if (!slider) return;
      let nextVal = parseFloat(slider.value) + 1.2;
      const maxVal = parseFloat(slider.max);
      if (nextVal >= maxVal || isCrushed) {
        clearInterval(autoPumpInterval);
        autoPumpInterval = null;
        if (pumpBtn) {
          pumpBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4 inline mr-1"></i> Auto-Pump Ram`;
          if (window.lucide) lucide.createIcons();
        }
      } else {
        slider.value = nextVal;
        setSimPressure(nextVal);
      }
    }, 70);
  }
}

function initStrengthSimulator() {
  const specimenSelect = document.getElementById("sim-specimen-select");
  const pressureSlider = document.getElementById("sim-pressure-slider");
  const pumpBtn = document.getElementById("sim-pump-btn");
  const resetBtn = document.getElementById("sim-reset-btn");

  if (!specimenSelect || !pressureSlider) return;

  specimenSelect.addEventListener("change", (e) => {
    currentSpecimenKey = e.target.value;
    resetSimulator();
  });

  pressureSlider.addEventListener("input", (e) => {
    setSimPressure(parseFloat(e.target.value));
  });

  if (pumpBtn) {
    pumpBtn.addEventListener("click", pumpSimulatorRam);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetSimulator);
  }

  updateSpecimenUI();
  drawStressStrainCurve();
  renderBlockGraphic();
}

function setSimPressure(mpa) {
  appliedPressureMpa = mpa;
  const spec = SIM_SPECIMENS[currentSpecimenKey];

  // Check if crushed
  if (appliedPressureMpa >= spec.failureMpa) {
    isCrushed = true;
    if (autoPumpInterval) {
      clearInterval(autoPumpInterval);
      autoPumpInterval = null;
      const pumpBtn = document.getElementById("sim-pump-btn");
      if (pumpBtn) {
        pumpBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4 inline mr-1"></i> Auto-Pump Hydraulic Ram`;
        lucide.createIcons();
      }
    }
  } else {
    isCrushed = false;
  }

  updateMetricsUI(spec);
  renderBlockGraphic();
  drawStressStrainCurve();
}

function resetSimulator() {
  if (autoPumpInterval) {
    clearInterval(autoPumpInterval);
    autoPumpInterval = null;
  }
  const slider = document.getElementById("sim-pressure-slider");
  if (slider) slider.value = 0;
  appliedPressureMpa = 0;
  isCrushed = false;

  const pumpBtn = document.getElementById("sim-pump-btn");
  if (pumpBtn) {
    pumpBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4 inline mr-1"></i> Auto-Pump Hydraulic Ram`;
    lucide.createIcons();
  }

  updateSpecimenUI();
  updateMetricsUI(SIM_SPECIMENS[currentSpecimenKey]);
  renderBlockGraphic();
  drawStressStrainCurve();
}

function updateSpecimenUI() {
  const spec = SIM_SPECIMENS[currentSpecimenKey];
  const titleEl = document.getElementById("sim-specimen-title");
  const specStandardEl = document.getElementById("sim-specimen-standard");
  const astmMinEl = document.getElementById("sim-astm-min");
  const certifiedPeakEl = document.getElementById("sim-certified-peak");

  if (titleEl) titleEl.innerText = spec.name;
  if (specStandardEl) specStandardEl.innerText = spec.spec;
  if (astmMinEl) astmMinEl.innerText = `${spec.astmMinMpa} MPa (${Math.round(spec.astmMinMpa * 145.038)} PSI)`;
  if (certifiedPeakEl) certifiedPeakEl.innerText = `${spec.peakMpa} MPa (${Math.round(spec.peakMpa * 145.038)} PSI)`;

  const slider = document.getElementById("sim-pressure-slider");
  if (slider) {
    slider.max = Math.ceil(spec.failureMpa * 1.15);
  }
}

function updateMetricsUI(spec) {
  const psiVal = Math.round(appliedPressureMpa * 145.038);
  const pressureValEl = document.getElementById("sim-display-mpa");
  const pressurePsiEl = document.getElementById("sim-display-psi");
  const totalTonsEl = document.getElementById("sim-display-tons");
  const safetyFactorEl = document.getElementById("sim-display-safety");
  const statusBannerEl = document.getElementById("sim-status-banner");

  if (pressureValEl) pressureValEl.innerText = appliedPressureMpa.toFixed(1);
  if (pressurePsiEl) pressurePsiEl.innerText = psiVal.toLocaleString();

  // Force in metric tons: Stress (N/mm2) * Area (mm2) / 9806.65 N per ton
  const areaMm2 = spec.areaSqIn * 645.16;
  const forceNewtons = appliedPressureMpa * areaMm2;
  const forceMetricTons = forceNewtons / 9806.65;
  if (totalTonsEl) totalTonsEl.innerText = `${forceMetricTons.toFixed(1)} MT`;

  // Safety Factor vs ASTM Minimum Requirement
  const safetyRatio = appliedPressureMpa / spec.astmMinMpa;
  if (safetyFactorEl) {
    if (appliedPressureMpa === 0) {
      safetyFactorEl.innerText = "0.0x";
      safetyFactorEl.className = "text-slate-400 font-mono-tech font-bold";
    } else if (appliedPressureMpa < spec.astmMinMpa) {
      safetyFactorEl.innerText = `${safetyRatio.toFixed(2)}x (Below ASTM Min)`;
      safetyFactorEl.className = "text-amber-400 font-mono-tech font-bold";
    } else {
      safetyFactorEl.innerText = `${safetyRatio.toFixed(2)}x ASTM Minimum`;
      safetyFactorEl.className = "text-emerald-400 font-mono-tech font-bold";
    }
  }

  if (statusBannerEl) {
    if (isCrushed) {
      statusBannerEl.className = "p-3 bg-red-950/80 border border-red-500 text-red-200 text-sm font-semibold rounded flex items-center justify-between";
      statusBannerEl.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
          <span><strong>SPECIMEN COMPRESSIVE FAILURE REACHED</strong> (${spec.failureMpa} MPa). Ultimate shear rupture achieved.</span>
        </div>
        <button onclick="resetSimulator()" class="px-2 py-1 bg-red-800 hover:bg-red-700 text-xs text-white rounded font-mono">Reset Rig</button>
      `;
    } else if (appliedPressureMpa >= spec.peakMpa) {
      statusBannerEl.className = "p-3 bg-amber-950/70 border border-amber-500 text-amber-200 text-sm font-semibold rounded flex items-center gap-2";
      statusBannerEl.innerHTML = `
        <span class="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></span>
        <span><strong>PEAK CERTIFIED RATING ATTAINED</strong> (${spec.peakMpa} MPa). Micro-cracking initiating under extreme hydraulic tonnage.</span>
      `;
    } else if (appliedPressureMpa >= spec.astmMinMpa) {
      statusBannerEl.className = "p-3 bg-emerald-950/70 border border-emerald-500 text-emerald-200 text-sm font-semibold rounded flex items-center gap-2";
      statusBannerEl.innerHTML = `
        <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
        <span><strong>EXCEEDS ASTM STANDARD REQUIREMENT</strong> (${spec.astmMinMpa} MPa). Masonry unit remains structurally intact with zero deformation.</span>
      `;
    } else {
      statusBannerEl.className = "p-3 bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded flex items-center gap-2";
      statusBannerEl.innerHTML = `
        <span class="w-3 h-3 rounded-full bg-slate-500"></span>
        <span>Hydraulic ram seated. Advance pressure lever or click "Auto-Pump" to stress-test the specimen.</span>
      `;
    }
  }
}

function renderBlockGraphic() {
  const blockContainer = document.getElementById("sim-graphic-canvas");
  if (!blockContainer) return;

  const spec = SIM_SPECIMENS[currentSpecimenKey];
  const maxMpa = spec.failureMpa;
  const loadRatio = Math.min(1.0, appliedPressureMpa / maxMpa);

  // Piston movement: moves down 0 to 18px
  const pistonTravel = isCrushed ? 24 : Math.round(loadRatio * 14);

  // Micro-crack opacity / lines
  const crackOpacity = appliedPressureMpa > (spec.peakMpa * 0.85) ? Math.min(1.0, (appliedPressureMpa - spec.peakMpa * 0.85) / (spec.failureMpa - spec.peakMpa * 0.85)) : 0;

  // Deformation scale
  const blockDeformX = 1 + (loadRatio * 0.04);
  const blockDeformY = isCrushed ? 0.78 : 1 - (loadRatio * 0.05);

  let coreSvg = '';
  if (spec.coreType === 'cores') {
    coreSvg = `
      <rect x="70" y="45" width="45" height="70" rx="4" fill="#0b0f17" stroke="#334155" stroke-width="2"/>
      <rect x="145" y="45" width="45" height="70" rx="4" fill="#0b0f17" stroke="#334155" stroke-width="2"/>
    `;
  }

  let crackSvg = '';
  if (crackOpacity > 0 || isCrushed) {
    crackSvg = `
      <g stroke="#ff4444" stroke-width="${isCrushed ? '3' : '1.5'}" fill="none" opacity="${isCrushed ? '1' : crackOpacity}">
        <path d="M 60,30 L 75,55 L 70,85 L 90,120"/>
        <path d="M 190,30 L 180,60 L 195,90 L 175,120"/>
        ${isCrushed ? '<path d="M 10,65 L 250,75 M 30,95 L 230,85" stroke="#ef4444" stroke-width="3"/>' : ''}
      </g>
    `;
  }

  const shakeClass = isCrushed ? 'crush-stress-fracture' : (appliedPressureMpa >= spec.peakMpa ? 'animate-pulse' : '');

  blockContainer.innerHTML = `
    <div class="relative w-full h-80 flex flex-col items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded select-none overflow-hidden">
      <!-- Background Rig Steel Columns -->
      <div class="absolute left-6 top-0 bottom-0 w-5 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-800 border-x border-slate-900 shadow-inner"></div>
      <div class="absolute right-6 top-0 bottom-0 w-5 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-800 border-x border-slate-900 shadow-inner"></div>

      <!-- Upper Crosshead Hydraulic Cylinder -->
      <div class="relative z-10 w-64 bg-gradient-to-b from-slate-700 to-slate-900 border-2 border-slate-600 rounded-t shadow-lg text-center py-2">
        <div class="text-[10px] font-mono uppercase tracking-widest text-amber-400">100-Ton Hydraulic Calibrated Ram</div>
        <div class="text-xs font-mono font-bold text-slate-200">ASTM C140 COMPRESSIVE RIG</div>
      </div>

      <!-- Moving Steel Piston Head -->
      <div class="relative z-10 w-52 bg-gradient-to-b from-slate-600 to-slate-400 border border-slate-300 shadow-md transition-transform duration-100 ease-out text-center py-1"
           style="transform: translateY(${pistonTravel}px);">
        <div class="h-2 bg-amber-500 w-full mb-1"></div>
        <span class="text-[9px] font-mono text-slate-900 font-bold uppercase">Bearing Platen (Machined Tool Steel)</span>
      </div>

      <!-- Specimen Testing Chamber -->
      <div class="relative z-10 my-auto flex items-center justify-center ${shakeClass}" style="transform: scale(${blockDeformX}, ${blockDeformY}); transform-origin: bottom center;">
        <svg width="260" height="150" viewBox="0 0 260 150" class="drop-shadow-2xl">
          <!-- Masonry Block Base -->
          <rect x="20" y="20" width="220" height="110" rx="3" fill="${spec.blockColor}" stroke="#1e293b" stroke-width="2"/>
          
          <!-- Block Texture Details -->
          <line x1="20" y1="20" x2="240" y2="20" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
          <line x1="20" y1="130" x2="240" y2="130" stroke="rgba(0,0,0,0.5)" stroke-width="2"/>
          
          <!-- Cores if hollow -->
          ${coreSvg}

          <!-- Stress Cracks -->
          ${crackSvg}
        </svg>

        <!-- Dynamic Load Indicator Badge -->
        <div class="absolute bottom-1 bg-black/80 backdrop-blur px-2 py-0.5 border border-slate-600 rounded text-[10px] font-mono text-amber-300">
          ${spec.name}
        </div>
      </div>

      <!-- Lower Platen Base Bed -->
      <div class="relative z-10 w-full max-w-sm bg-gradient-to-t from-slate-900 to-slate-800 border-2 border-slate-700 py-2.5 px-4 rounded text-center shadow-2xl">
        <div class="flex justify-between items-center text-[10px] font-mono text-slate-400">
          <span>RIG BED: REINFORCED FORGED STEEL</span>
          <span class="text-amber-400 font-bold">LOAD CELL: PASSING ASTM E4</span>
        </div>
      </div>
    </div>
  `;
}

function drawStressStrainCurve() {
  const canvas = document.getElementById("sim-chart-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const spec = SIM_SPECIMENS[currentSpecimenKey];
  const maxPlotMpa = spec.failureMpa * 1.15;
  const maxStrain = 0.0035;

  const padLeft = 45;
  const padBottom = 30;
  const plotW = w - padLeft - 20;
  const plotH = h - padBottom - 20;

  // Grid lines
  ctx.strokeStyle = "rgba(71, 85, 105, 0.25)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = 20 + (plotH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(w - 20, y);
    ctx.stroke();

    const mpaLabel = Math.round(maxPlotMpa - (i / 4) * maxPlotMpa);
    ctx.fillStyle = "#64748b";
    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.textAlign = "right";
    ctx.fillText(mpaLabel + " MPa", padLeft - 6, y + 3);
  }

  // ASTM Minimum Requirement Line
  const astmY = 20 + plotH * (1 - (spec.astmMinMpa / maxPlotMpa));
  ctx.strokeStyle = "rgba(234, 179, 8, 0.7)";
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(padLeft, astmY);
  ctx.lineTo(w - 20, astmY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#eab308";
  ctx.textAlign = "left";
  ctx.fillText("ASTM Req (" + spec.astmMinMpa + " MPa)", padLeft + 6, astmY - 4);

  // Parabolic Stress-Strain curve
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 2.5;
  ctx.beginPath();

  const peakStrain = 0.0022;
  const pts = 40;
  for (let i = 0; i <= pts; i++) {
    const strain = (i / pts) * (peakStrain * 1.35);
    let stress = 0;
    if (strain <= peakStrain) {
      stress = spec.peakMpa * (2 * (strain / peakStrain) - Math.pow(strain / peakStrain, 2));
    } else {
      const softenRatio = (strain - peakStrain) / (peakStrain * 0.35);
      stress = spec.peakMpa * (1 - 0.25 * softenRatio);
    }
    const px = padLeft + (strain / maxStrain) * plotW;
    const py = 20 + plotH * (1 - (stress / maxPlotMpa));
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Current Applied Stress Marker Dot
  const currentRatio = Math.min(1.0, appliedPressureMpa / spec.peakMpa);
  const currentStrain = currentRatio * peakStrain;
  const curX = padLeft + (currentStrain / maxStrain) * plotW;
  const curY = 20 + plotH * (1 - (appliedPressureMpa / maxPlotMpa));

  ctx.beginPath();
  ctx.arc(curX, curY, isCrushed ? 6 : 5, 0, Math.PI * 2);
  ctx.fillStyle = isCrushed ? "#ef4444" : (appliedPressureMpa >= spec.peakMpa ? "#f59e0b" : "#10b981");
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Axis Labels
  ctx.fillStyle = "#94a3b8";
  ctx.textAlign = "center";
  ctx.font = "10px 'JetBrains Mono', monospace";
  ctx.fillText("Deformation Strain (ε)", padLeft + plotW / 2, h - 8);
}

function startSimulatorTest() {
  if (!autoPumpInterval) {
    pumpSimulatorRam();
  }
}

function stopSimulatorTest() {
  if (autoPumpInterval) {
    clearInterval(autoPumpInterval);
    autoPumpInterval = null;
    const pumpBtn = document.getElementById("sim-pump-btn");
    if (pumpBtn) {
      pumpBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4 inline mr-1"></i> Auto-Pump Ram`;
      if (window.lucide) lucide.createIcons();
    }
    if (typeof showIndustrialToast === "function") {
      showIndustrialToast(`Hydraulic pacing paused at ${appliedPressureMpa.toFixed(1)} MPa.`, "info");
    }
  }
}

function viewSimulatorResults() {
  const spec = SIM_SPECIMENS[currentSpecimenKey];
  const chartEl = document.getElementById("sim-chart-canvas") || document.getElementById("sim-status-banner");
  if (chartEl) {
    chartEl.scrollIntoView({ behavior: "smooth" });
  }
  if (typeof showIndustrialToast === "function") {
    showIndustrialToast(
      `Current Assay: ${spec.name} • Applied: ${appliedPressureMpa.toFixed(1)} MPa • ASTM Threshold: ${spec.astmMinMpa} MPa`,
      "info"
    );
  }
}

window.initStrengthSimulator = initStrengthSimulator;
window.resetSimulator = resetSimulator;
window.pumpSimulatorRam = pumpSimulatorRam;
window.startSimulatorTest = startSimulatorTest;
window.stopSimulatorTest = stopSimulatorTest;
window.viewSimulatorResults = viewSimulatorResults;

