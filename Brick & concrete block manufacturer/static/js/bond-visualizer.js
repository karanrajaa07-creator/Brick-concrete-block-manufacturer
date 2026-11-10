// Luxeris Masonry Wall Mockup & Bond Pattern Visualizer Studio

const BOND_MATERIALS = {
  "brick-wirecut": {
    name: "Luxeris Heritage Wirecut Red Brick",
    type: "brick",
    unitW: 68,
    unitH: 26,
    color: "#b94a28",
    colorVariation: ["#c24f2b", "#b04423", "#a33c1d", "#c75532"],
    texture: "wirecut",
    unitsPerSqFt: 6.85
  },
  "brick-engineering": {
    name: "Luxeris Class A Vitrified Blue/Red Brick",
    type: "brick",
    unitW: 68,
    unitH: 26,
    color: "#4a3b32",
    colorVariation: ["#42342c", "#524339", "#3b2e27", "#5c4c42"],
    texture: "vitrified",
    unitsPerSqFt: 6.85
  },
  "brick-roman": {
    name: "Luxeris Roman Linear Architectural Brick",
    type: "brick",
    unitW: 110,
    unitH: 18,
    color: "#8c7b6d",
    colorVariation: ["#948375", "#857467", "#9c8b7d", "#7d6c5f"],
    texture: "linear",
    unitsPerSqFt: 5.2
  },
  "cmu-8": {
    name: "Luxeris 8\" Two-Core Structural CMU Block",
    type: "block",
    unitW: 104,
    unitH: 50,
    color: "#5a6578",
    colorVariation: ["#556072", "#606b7f", "#505a6b", "#667287"],
    texture: "concrete",
    unitsPerSqFt: 1.125
  },
  "retaining-split": {
    name: "Luxeris 12\" Keystone Split-Face Block",
    type: "block",
    unitW: 116,
    unitH: 52,
    color: "#78716c",
    colorVariation: ["#716a65", "#7e7772", "#6a645f", "#857e79"],
    texture: "splitface",
    unitsPerSqFt: 1.0
  },
  "paver-80": {
    name: "Luxeris 80mm Armor-Lock Interlocking Paver",
    type: "paver",
    unitW: 55,
    unitH: 28,
    color: "#3f4756",
    colorVariation: ["#39414f", "#454d5d", "#333b49", "#4b5465"],
    texture: "paver",
    unitsPerSqFt: 4.2
  }
};

const MORTAR_COLORS = {
  "grey": { name: "Natural Grey (Type S ASTM C270)", hex: "#8b949e", text: "Standard Grey" },
  "charcoal": { name: "Charcoal Obsidian Dark", hex: "#1f242c", text: "Obsidian Black" },
  "buff": { name: "Warm Sandstone Buff", hex: "#c99a6b", text: "Sandstone Buff" },
  "white": { name: "Architectural Pure White", hex: "#e2e8f0", text: "Pure White" }
};

let visualizerState = {
  material: "brick-wirecut",
  pattern: "running",
  mortarColor: "grey",
  jointThickness: 3 // px (represents 3/8")
};

function initBondVisualizer() {
  const container = document.getElementById("wall-mockup-canvas-container");
  if (!container) return;

  const matSelect = document.getElementById("mockup-material-select");
  const patternSelect = document.getElementById("mockup-pattern-select");
  const jointSelect = document.getElementById("mockup-joint-select");
  const mortarRadios = document.querySelectorAll("input[name='mockup-mortar']");

  if (matSelect) {
    matSelect.addEventListener("change", (e) => {
      visualizerState.material = e.target.value;
      updateVisualizerPatternOptions();
      renderWallMockup();
    });
  }

  if (patternSelect) {
    patternSelect.addEventListener("change", (e) => {
      visualizerState.pattern = e.target.value;
      renderWallMockup();
    });
  }

  if (jointSelect) {
    jointSelect.addEventListener("change", (e) => {
      visualizerState.jointThickness = parseInt(e.target.value) || 3;
      renderWallMockup();
    });
  }

  mortarRadios.forEach(r => {
    r.addEventListener("change", (e) => {
      visualizerState.mortarColor = e.target.value;
      renderWallMockup();
    });
  });

  updateVisualizerPatternOptions();
  renderWallMockup();
}

function updateVisualizerPatternOptions() {
  const patternSelect = document.getElementById("mockup-pattern-select");
  if (!patternSelect) return;

  const mat = BOND_MATERIALS[visualizerState.material];
  patternSelect.innerHTML = "";

  if (mat.type === "paver") {
    patternSelect.innerHTML = `
      <option value="herringbone">45° / 90° Interlocking Herringbone (Maximum Shear)</option>
      <option value="running">Stretcher Paver Course</option>
      <option value="basketweave">Double Basketweave Pattern</option>
    `;
    visualizerState.pattern = "herringbone";
  } else {
    patternSelect.innerHTML = `
      <option value="running" ${visualizerState.pattern === 'running' ? 'selected' : ''}>Running Bond (Standard 1/2 Stretcher Overlap)</option>
      <option value="stack" ${visualizerState.pattern === 'stack' ? 'selected' : ''}>Stack Bond (Modern Aligned Vertical Joints)</option>
      <option value="flemish" ${visualizerState.pattern === 'flemish' ? 'selected' : ''}>Flemish Bond (Alternating Stretchers & Headers)</option>
      <option value="english" ${visualizerState.pattern === 'english' ? 'selected' : ''}>English Bond (Alternating Stretcher & Header Courses)</option>
    `;
  }
}

function renderWallMockup() {
  const container = document.getElementById("wall-mockup-canvas-container");
  if (!container) return;

  const mat = BOND_MATERIALS[visualizerState.material];
  const mortar = MORTAR_COLORS[visualizerState.mortarColor];
  const joint = visualizerState.jointThickness;

  const svgW = 560;
  const svgH = 280;

  let unitsSvg = "";
  const unitW = mat.unitW;
  const unitH = mat.unitH;
  const colors = mat.colorVariation;

  const rows = Math.ceil(svgH / (unitH + joint)) + 1;
  const cols = Math.ceil(svgW / (unitW + joint)) + 2;

  let unitCounter = 0;

  if (visualizerState.pattern === "herringbone") {
    // Herringbone rendering for pavers
    const pW = unitW;
    const pH = unitH;
    for (let y = -pH; y < svgH + pH; y += pH * 2) {
      for (let x = -pW; x < svgW + pW; x += pW * 2) {
        const col1 = colors[(x + y) % colors.length];
        const col2 = colors[(x * 2 + y) % colors.length];
        unitsSvg += `
          <rect x="${x}" y="${y}" width="${pW - joint}" height="${pH - joint}" rx="1" fill="${col1}" stroke="#1e293b" stroke-width="0.5"/>
          <rect x="${x + pH}" y="${y + pH}" width="${pH - joint}" height="${pW - joint}" rx="1" fill="${col2}" stroke="#1e293b" stroke-width="0.5"/>
        `;
      }
    }
  } else if (visualizerState.pattern === "stack") {
    // Stack bond: perfectly aligned
    for (let r = 0; r < rows; r++) {
      const y = r * (unitH + joint);
      for (let c = 0; c < cols; c++) {
        const x = c * (unitW + joint);
        const col = colors[(r * 3 + c) % colors.length];
        unitsSvg += `<rect x="${x}" y="${y}" width="${unitW}" height="${unitH}" rx="1" fill="${col}" stroke="rgba(0,0,0,0.15)" stroke-width="0.5"/>`;
      }
    }
  } else if (visualizerState.pattern === "flemish") {
    // Flemish bond: Alternating stretcher and header in each row
    const headerW = Math.round(unitW * 0.45);
    for (let r = 0; r < rows; r++) {
      const y = r * (unitH + joint);
      const rowOffset = (r % 2 === 0) ? 0 : -Math.round((unitW + headerW + joint * 2) / 2);
      let curX = rowOffset;
      let toggle = false;
      while (curX < svgW + unitW) {
        const thisW = toggle ? headerW : unitW;
        const col = colors[(r * 5 + curX) % colors.length];
        unitsSvg += `<rect x="${curX}" y="${y}" width="${thisW}" height="${unitH}" rx="1" fill="${col}" stroke="rgba(0,0,0,0.15)" stroke-width="0.5"/>`;
        curX += thisW + joint;
        toggle = !toggle;
      }
    }
  } else if (visualizerState.pattern === "english") {
    // English bond: Alternating stretcher courses and header courses
    const headerW = Math.round(unitW * 0.48);
    for (let r = 0; r < rows; r++) {
      const y = r * (unitH + joint);
      const isHeaderCourse = (r % 2 === 1);
      const thisW = isHeaderCourse ? headerW : unitW;
      const offset = isHeaderCourse ? (headerW * 0.5) : 0;
      const count = Math.ceil((svgW + thisW * 2) / (thisW + joint));
      for (let c = -1; c < count; c++) {
        const x = c * (thisW + joint) + offset;
        const col = colors[(r * 7 + c) % colors.length];
        unitsSvg += `<rect x="${x}" y="${y}" width="${thisW}" height="${unitH}" rx="1" fill="${col}" stroke="rgba(0,0,0,0.15)" stroke-width="0.5"/>`;
      }
    }
  } else {
    // Standard Running Bond (1/2 Stretcher overlap)
    for (let r = 0; r < rows; r++) {
      const y = r * (unitH + joint);
      const offset = (r % 2 === 1) ? -(unitW + joint) / 2 : 0;
      for (let c = -1; c < cols; c++) {
        const x = c * (unitW + joint) + offset;
        const col = colors[(r * 3 + c + 10) % colors.length];
        unitsSvg += `<rect x="${x}" y="${y}" width="${unitW}" height="${unitH}" rx="1" fill="${col}" stroke="rgba(0,0,0,0.15)" stroke-width="0.5"/>`;
      }
    }
  }

  container.innerHTML = `
    <div class="relative w-full rounded-lg overflow-hidden border-2 border-slate-700 shadow-2xl bg-slate-950 select-none">
      <svg width="100%" height="280" viewBox="0 0 ${svgW} ${svgH}" preserveAspectRatio="xMidYMid slice" class="block">
        <!-- Mortar Joint Bed Background -->
        <rect width="${svgW}" height="${svgH}" fill="${mortar.hex}" />
        <!-- Rendered Masonry Units -->
        ${unitsSvg}
      </svg>

      <!-- Technical Overlay Badge -->
      <div class="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur px-3 py-1.5 rounded border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-3">
        <div>
          <span class="text-[10px] text-slate-500 uppercase block">Selected Matrix</span>
          <strong class="text-amber-400">${mat.name}</strong>
        </div>
        <div class="border-l border-slate-700 pl-3">
          <span class="text-[10px] text-slate-500 uppercase block">Mortar Tint</span>
          <strong class="text-slate-200">${mortar.text} (${joint === 3 ? '3/8"' : '1/2"'} Joint)</strong>
        </div>
      </div>

      <div class="absolute top-3 right-3 bg-slate-950/90 backdrop-blur px-2.5 py-1 rounded border border-slate-700 text-[10px] font-mono text-emerald-400 font-bold">
        ✓ ASTM C270 MORTAR SPECIFIED
      </div>
    </div>
  `;

  // Update Callouts UI
  const calloutCoverage = document.getElementById("mockup-callout-coverage");
  const calloutShear = document.getElementById("mockup-callout-shear");
  const calloutMortar = document.getElementById("mockup-callout-mortar");

  if (calloutCoverage) calloutCoverage.innerText = `${mat.unitsPerSqFt} units / sq ft`;
  if (calloutShear) {
    if (visualizerState.pattern === "running") calloutShear.innerText = "Maximum Code Stagger (1/2 Bond)";
    else if (visualizerState.pattern === "herringbone") calloutShear.innerText = "Heavy Dynamic Transit Interlock";
    else if (visualizerState.pattern === "stack") calloutShear.innerText = "Requires Joint Rebar (Ladder Wire)";
    else calloutShear.innerText = "High Multi-Wythe Interlocking Shear";
  }
  if (calloutMortar) calloutMortar.innerText = mortar.name;
}

window.initBondVisualizer = initBondVisualizer;
window.renderWallMockup = renderWallMockup;

