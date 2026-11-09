// Luxeris Technical Journal & Masonry Engineering Blog Module

const blogArticles = [
  {
    id: "seismic-cmu-shear-walls",
    title: "Seismic Shear Wall Optimization: High-Strength CMUs Under ASCE 7-22 and ASTM C90",
    category: "Structural",
    categoryLabel: "Structural Engineering",
    categoryColor: "amber",
    date: "October 28, 2026",
    author: "Dr. Henrik Vance, PE, SE",
    authorTitle: "Principal Structural Metrologist & VP of Engineering",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=800&q=80",
    tags: ["ASTM C90", "ASCE 7-22", "Seismic Design", "CMU Shear Walls", "Core Grouting"],
    summary: "An investigation into ductile plastic hinge formation in multi-story reinforced concrete masonry unit shear walls. Comparative cyclic testing demonstrates how specifying 38.5 MPa solid foundation units mitigates boundary element crushing under maximum considered earthquake (MCE) events.",
    content: `
      <div class="space-y-6 text-slate-300 font-sans text-sm leading-relaxed">
        <p class="text-base font-serif italic text-amber-300/90 border-l-2 border-amber-500 pl-4 py-1">
          "The conventional assumption that reinforced hollow masonry behaves predictably as a homogeneous isotropic shear element fails when cyclic drift ratios exceed 1.5% in Seismic Design Categories D through F."
        </p>

        <h3 class="text-xl font-heading text-slate-100 tracking-wide mt-6">1. The Boundary Element Challenge in Tall Masonry Cores</h3>
        <p>
          Under modern seismic performance benchmarks defined in <strong>ASCE 7-22 Chapter 14</strong> and <strong>TMS 402/602 Building Code Requirements for Masonry Structures</strong>, high-aspect ratio shear walls develop extreme compressive strains at extreme toes. When using standard 13.1 MPa (1,900 PSI) commodity CMU blocks, premature spalling of face shells often initiates brittle rebar buckling before total tensile yield of vertical boundary reinforcement occurs.
        </p>
        <p>
          Luxeris engineered <strong>38.5 MPa (5,584 PSI) solid foundation units (LX-CMU-SOLID-8)</strong> provide a 124% net compressive safety cushion over minimum code mandates. Under cyclic reversed-shear tests executed at the Luxeris Seismic Simulation Rig, these high-density basalt-aggregate units delayed toe spalling beyond a 2.4% lateral drift angle.
        </p>

        <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg my-4 font-mono text-xs space-y-2">
          <div class="text-amber-400 font-bold uppercase text-[11px]">Key Mathematical Governing Equation (TMS 402-22 §9.3.4):</div>
          <div class="text-slate-200 bg-slate-950 p-3 rounded border border-slate-800/80 overflow-x-auto">
            V_n = [ (4.0 - 1.75 * (M_u / (V_u * d_v))) * A_nv * sqrt(f'_m) + 0.5 * (A_vh * f_y * d_v / s) ] * phi_v
          </div>
          <p class="text-slate-400 text-[11px]">
            Where f'_m is the verified net compressive strength of masonry assembly, proving that upgrading f'_m from 13.8 MPa to 28.0 MPa increases pure diagonal tension capacity by 42.5% without enlarging wall footprint.
          </p>
        </div>

        <h3 class="text-xl font-heading text-slate-100 tracking-wide mt-6">2. Saturated Steam Autoclaving vs Moisture Expansion</h3>
        <p>
          Standard steam-cured concrete masonry exhibits long-term drying shrinkage of 0.04% to 0.065%. In tall structural shear cores, differential shrinkage between concrete columns and masonry infill creates diagonal crack patterns mistaken for foundation settlement.
        </p>
        <p>
          By subjecting all Luxeris structural CMUs to <strong>185°C high-pressure steam autoclaving for 48 hours</strong>, the cementitious matrix converts unreacted calcium silicate hydrate into crystalline tobermorite (5CaO·6SiO2·5H2O). This eliminates reversible moisture expansion and locks dimensional shrinkage below 0.015%, exceeding ASTM C90 Type I Linear Shrinkage limits.
        </p>

        <h3 class="text-xl font-heading text-slate-100 tracking-wide mt-6">3. Practical Structural Recommendations for Specifiers</h3>
        <ul class="list-disc list-inside space-y-2 pl-2 text-slate-300">
          <li><strong>Specify Class S High-Strength CMUs:</strong> For critical ground-floor transfer levels, designate net compressive core crush rating ≥ 28.0 MPa.</li>
          <li><strong>Grout Slump Management:</strong> Enforce fine grout slump of 200–280 mm per ASTM C476 with mechanical vibrator reconsolidation at 15-minute intervals to eliminate grout bridging.</li>
          <li><strong>Horizontal Wire Spacing:</strong> Utilize 9-gauge ladder-type heavy joint reinforcement every 8 inches (200 mm) vertical pitch in conjunction with bond beam U-blocks at all diaphragm connections.</li>
        </ul>
      </div>
    `
  },
  {
    id: "efflorescence-prevention-clay-bricks",
    title: "Efflorescence Mitigation & Silicate Leaching in Severe Weathering Architectural Clay Brickwork",
    category: "Materials",
    categoryLabel: "Materials Science",
    categoryColor: "orange",
    date: "October 14, 2026",
    author: "Elena Rostova",
    authorTitle: "Director of Ceramic Chemistry & Silicate Metrology",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80",
    tags: ["ASTM C216", "Efflorescence", "Vitrification", "Mortar Chemistry", "Severe Weathering"],
    summary: "A chemical analysis of salt deposition kinetics on architectural facing brick facades. Explores how vitrified clay body formulation and 5-hour boiling water absorption rates below 4.2% effectively eliminate primary and secondary cryptoflorescence.",
    content: `
      <div class="space-y-6 text-slate-300 font-sans text-sm leading-relaxed">
        <p class="text-base font-serif italic text-orange-300/90 border-l-2 border-orange-500 pl-4 py-1">
          "Efflorescence is not merely an aesthetic blemish on architectural facades; sub-surface salt crystallization (cryptoflorescence) exerts internal hydraulic pressures exceeding 25 MPa, fracturing face shells during seasonal freeze-thaw cycles."
        </p>

        <h3 class="text-xl font-heading text-slate-100 tracking-wide mt-6">1. The Thermodynamic Chemistry of Salt Migration</h3>
        <p>
          For efflorescence to manifest on an exterior masonry wall, three interdependent physical factors must coexist simultaneously:
        </p>
        <ol class="list-decimal list-inside space-y-1.5 pl-2">
          <li>Water-soluble chemical salts (primarily Na2SO4, K2SO4, CaSO4, and MgSO4) within the brick body or mortar bed.</li>
          <li>Liquid water penetrating through porous microscopic pore capillaries.</li>
          <li>A vapor pressure drive pulling pore water to the exterior evaporating boundary surface.</li>
        </ol>

        <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg my-4 font-mono text-xs space-y-2">
          <div class="text-orange-400 font-bold uppercase text-[11px]">Primary Chemical Reaction:</div>
          <div class="text-slate-200 bg-slate-950 p-3 rounded border border-slate-800/80">
            Ca(OH)_2 (aq) + CO_2 (g) &rarr; CaCO_3 (s) &darr; + H_2O
          </div>
          <p class="text-slate-400 text-[11px]">
            Calcium hydroxide liberated during Portland cement hydration migrates through capillary micro-channels, reacting with atmospheric carbon dioxide to precipitate insoluble calcium carbonate bloom.
          </p>
        </div>

        <h3 class="text-xl font-heading text-slate-100 tracking-wide mt-6">2. Vitrification Purity: Why 5-Hour Boil Rates Matter</h3>
        <p>
          Standard commercial facing bricks allow cold water absorption up to 8.0% and 5-hour boil absorption up to 17.0% under ASTM C216 Grade MW. Under winter conditions with repetitive freeze-thaw cycles, this large pore network acts like a sponge.
        </p>
        <p>
          Luxeris <strong>Heritage Red Face Bricks (LX-CLAY-FACING-RED)</strong> and <strong>Class A High-Strength Engineering Bricks (LX-CLAY-ENG-A)</strong> are tunnel-kiln fired at 1,180°C with mineral fluxes that sinter clay particulates into a dense vitrified ceramic body. Continuous 5-hour boiling water absorption is held strictly below <strong>4.2%</strong>, choking off pore capillaries and rendering the brick virtually immune to salt transport.
        </p>

        <h3 class="text-xl font-heading text-slate-100 tracking-wide mt-6">3. Specification Best Practices for Architects</h3>
        <ul class="list-disc list-inside space-y-2 pl-2 text-slate-300">
          <li><strong>Specify Grade SW (Severe Weathering):</strong> Never allow Grade MW on exterior architectural building envelopes where the Weathering Index exceeds 50.</li>
          <li><strong>Mortar Compatibility:</strong> Mandate Type N or Type S mortar formulated with low-alkali Portland cement (ASTM C150 alkali content < 0.60%).</li>
          <li><strong>Cavity Weep Ventilation:</strong> Provide open vertical head joint weep holes at 24 inches on center with continuous drainage mesh to evacuate moisture before it can enter the inner wythe.</li>
        </ul>
      </div>
    `
  },
  {
    id: "high-axle-port-pavements",
    title: "High-Axle Intermodal Port Pavements: 80mm Armor-Lock vs 100-Ton Reach Stacker Stresses",
    category: "Infrastructure",
    categoryLabel: "Civil Infrastructure",
    categoryColor: "sky",
    date: "September 29, 2026",
    author: "Capt. Marcus Sterling",
    authorTitle: "Senior Port Terminal Logistics & Pavement Engineer",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    tags: ["ASTM C936", "Interlocking Pavers", "Port Logistics", "Heavy Haulage", "Axle Loads"],
    summary: "Heavy freight logistics terminals generate extreme concentrated point loads from container top-picks and reach stackers. Discover how engineered 80mm interlocking segmental concrete pavers distribute tire shear forces and resist surface rutting.",
    content: `
      <div class="space-y-6 text-slate-300 font-sans text-sm leading-relaxed">
        <p class="text-base font-serif italic text-sky-300/90 border-l-2 border-sky-500 pl-4 py-1">
          "Asphalt pavements in container marshalling yards fail rapidly under 100-ton loaded reach stackers due to localized plastic shear flow, creating deep wheel ruts that prevent autonomous guided vehicles (AGVs) from maintaining navigational alignment."
        </p>

        <h3 class="text-xl font-heading text-slate-100 tracking-wide mt-6">1. The Mechanical Dynamics of Segmental Interlock</h3>
        <p>
          Unlike monolithic concrete slabs which rely on tensile flexural strength and inevitably suffer expansion joint spalling under continuous container corner-casting impacts, <strong>interlocking concrete pavement (ICP)</strong> functions as a flexible structural diaphragm with three distinct load-transfer mechanisms:
        </p>
        <ul class="list-disc list-inside space-y-1.5 pl-2">
          <li><strong>Vertical Interlock:</strong> Shear transfer between adjacent paver sidewalls through compacted jointing sand.</li>
          <li><strong>Rotational Interlock:</strong> Resistance to tilting under high braking forces provided by optimal aspect ratios and 80mm thickness.</li>
          <li><strong>Horizontal Interlock:</strong> Herringbone laying patterns preventing displacement along longitudinal vehicle travel tracks.</li>
        </ul>

        <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg my-4 font-mono text-xs space-y-2">
          <div class="text-sky-400 font-bold uppercase text-[11px]">Load Distribution Angle Comparison:</div>
          <p class="text-slate-300">
            While asphalt distributes wheel loads through a narrow 30° cone of influence, a properly compacted 80mm interlocking paver system with joint sand widening distributes localized 80-ton wheel loads through a broad <strong>45° stress dispersion pyramid</strong>, halving subgrade compressive strain.
          </p>
        </div>

        <h3 class="text-xl font-heading text-slate-100 tracking-wide mt-6">2. Material Rigor: Exceeding ASTM C936 Standards</h3>
        <p>
          The standard specification for solid concrete interlocking paving units, <strong>ASTM C936 / C936M</strong>, mandates a minimum compressive strength of 50.0 MPa (7,250 PSI) and water absorption below 5.0%.
        </p>
        <p>
          Luxeris <strong>80mm Armor-Lock Port Pavers (LX-PAVER-HEAVY-80)</strong> are manufactured with dry-mix quartz aggregates subjected to dual-axis 60 Hz hydraulic vibration, achieving verified test breaks of <strong>52.5 MPa to 58.0 MPa</strong>. In deicing salt freeze-thaw durability testing per ASTM C1645, mass loss is confined to under 200 g/m² after 50 cycles, preventing winter salt scaling in marine port terminals.
        </p>

        <h3 class="text-xl font-heading text-slate-100 tracking-wide mt-6">3. Construction Execution Protocol</h3>
        <p>
          For heavy industrial port operations, subgrade preparation must follow a rigid structural sequence: 12 inches of cement-stabilized crushed aggregate base, 1 inch of uncompacted washed concrete sand bedding (ASTM C33), machine-laid 80mm pavers in 90° herringbone bond, and immediate dual-pass plate vibrator compaction with dry polymeric joint sand.
        </p>
      </div>
    `
  },
  {
    id: "embodied-carbon-aac-blocks",
    title: "Embodied Carbon vs Thermal Mass: Life Cycle Assessment (LCA) of Autoclaved Aerated Concrete (AAC)",
    category: "Sustainability",
    categoryLabel: "Sustainability & LEED",
    categoryColor: "emerald",
    date: "September 15, 2026",
    author: "Dr. Maya Lin, LEED AP BD+C",
    authorTitle: "Lead Materials Scientist & Carbon Lifecycle Analyst",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=800&q=80",
    tags: ["ASTM C1693", "LEED v4", "Thermal Envelope", "AAC Blocks", "Decarbonization"],
    summary: "A cradle-to-grave Environmental Product Declaration (EPD) analysis comparing cellular Autoclaved Aerated Concrete (AAC) to standard tilt-up panels and insulated cavity walls. Highlights up to 45% operational energy reductions via thermal dampening.",
    content: `
      <div class="space-y-6 text-slate-300 font-sans text-sm leading-relaxed">
        <p class="text-base font-serif italic text-emerald-300/90 border-l-2 border-emerald-500 pl-4 py-1">
          "True building decarbonization cannot be evaluated solely through upfront cradle-to-gate embodied carbon; the thermodynamic thermal mass of continuous inorganic masonry saves up to eight times its manufacturing footprint over a 60-year building lifecycle."
        </p>

        <h3 class="text-xl font-heading text-slate-100 tracking-wide mt-6">1. Cellular Microstructure: The Physics of Thermal Dampening</h3>
        <p>
          Unlike conventional concrete which possesses high density (2,200–2,400 kg/m³) and relatively poor thermal resistivity (R-0.08 per inch), <strong>Autoclaved Aerated Concrete (AAC per ASTM C1693)</strong> is engineered with a cellular matrix containing 70% to 80% microscopic closed air pockets.
        </p>
        <p>
          This micro-porous structure yields a dry density of merely <strong>550–650 kg/m³</strong> while maintaining structural integrity (4.5 MPa compressive strength for Class 4 units). The continuous inorganic matrix provides a steady-state thermal resistance of <strong>R-1.25 per inch</strong>, completely eliminating thermal bridging along vertical studs.
        </p>

        <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg my-4 font-mono text-xs space-y-2">
          <div class="text-emerald-400 font-bold uppercase text-[11px]">Thermal Mass Time-Lag Effect:</div>
          <p class="text-slate-300">
            In ASHRAE 90.1 Climate Zones 3 through 5, high diurnal outdoor temperature swings (up to 20°C day-to-night differential) are absorbed by an 8" AAC wall and delayed by <strong>8 to 11 hours</strong>. Peak solar heat gains hit the occupied interior during the cool night hours, shifting air conditioning electrical demand off peak utility hours.
          </p>
        </div>

        <h3 class="text-xl font-heading text-slate-100 tracking-wide mt-6">2. Cradle-to-Gate Carbon Reductions</h3>
        <p>
          Because AAC incorporates finely ground sand, gypsum, water, and minute amounts of aluminum powder as an aeration agent, raw cement consumption per cubic meter of finished wall is reduced by approximately <strong>60%</strong> compared to cast-in-place reinforced concrete.
        </p>
        <p>
          Furthermore, Luxeris Thermal-Shield AAC blocks utilize recycled Class F fly ash (a by-product of regional industrial operations), offsetting virgin clinker calcination emissions and contributing directly to <strong>LEED v4 MR Credit: Building Product Disclosure and Optimization</strong>.
        </p>

        <h3 class="text-xl font-heading text-slate-100 tracking-wide mt-6">3. Fire Safety and Zero Smoke Toxicity</h3>
        <p>
          As an all-mineral silicate material, AAC is classified as completely non-combustible under <strong>ASTM E136</strong>. A 6-inch (150 mm) unplastered Luxeris AAC wall achieves a certified <strong>4-hour fire endurance rating under ASTM E119</strong> without emitting toxic gases, volatile organic compounds, or smoke fumes.
        </p>
      </div>
    `
  },
  {
    id: "economics-dimensional-metrology",
    title: "The Economics of Dimensional Metrology: Why ±0.01 mm Dry-Cast Molds Eliminate Bed Joint Wedging",
    category: "Metrology",
    categoryLabel: "Metrology & Quality",
    categoryColor: "amber",
    date: "August 30, 2026",
    author: "Arthur Pendelton",
    authorTitle: "Chief Tooling & Precision Machining Engineer",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    tags: ["Metrology", "Tolerances", "CNC Molds", "Masonry Productivity", "ASTM C90"],
    summary: "How precision-machined carbide mold cores and automated laser micrometer grading reduce mason labor hours by 28%. An economic study showing why sub-millimeter unit tolerance prevents cumulative joint elevation drift on commercial jobsites.",
    content: `
      <div class="space-y-6 text-slate-300 font-sans text-sm leading-relaxed">
        <p class="text-base font-serif italic text-amber-300/90 border-l-2 border-amber-500 pl-4 py-1">
          "On a 20-story commercial shear core, a 2.0 mm unit height variance across individual CMUs compounds into over 40 mm of cumulative elevation distortion, forcing masons to chisel mortar joints or shim bed lines to maintain window rough opening heights."
        </p>

        <h3 class="text-xl font-heading text-slate-100 tracking-wide mt-6">1. The High Cost of Standard ASTM C90 Permissible Tolerances</h3>
        <p>
          Under <strong>ASTM C90 Section 7.2</strong>, permissible dimensional variation for individual loadbearing units allows dimensions to deviate by up to <strong>±3.2 mm (1/8 inch)</strong> from nominal dimensions.
        </p>
        <p>
          While allowable by code, when a mason lays 12 courses in a single work shift, alternating between units that are 3 mm oversized and 3 mm undersized requires constant joint thickness modulation between 6 mm and 16 mm. This constant checking with bubble levels and stringlines slows laying speeds down to an average of 18–22 blocks per hour per mason.
        </p>

        <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg my-4 font-mono text-xs space-y-2">
          <div class="text-amber-400 font-bold uppercase text-[11px]">Field Productivity Differential:</div>
          <div class="grid grid-cols-2 gap-4 text-[11px] pt-1">
            <div class="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span class="text-slate-500 block uppercase">Standard ±3.2 mm CMUs</span>
              <span class="text-slate-200 font-bold text-sm">21 Units / Mason-Hour</span>
              <span class="text-red-400 block text-[10px] mt-1">Frequent bed adjustment required</span>
            </div>
            <div class="bg-slate-950 p-2.5 rounded border border-amber-500/30">
              <span class="text-amber-400 block uppercase">Luxeris ±0.01 mm CMUs</span>
              <span class="text-amber-300 font-bold text-sm">27–30 Units / Mason-Hour</span>
              <span class="text-emerald-400 block text-[10px] mt-1">+28.5% Laying Speed Increase</span>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-heading text-slate-100 tracking-wide mt-6">2. Luxeris Metrology: Optical In-Line Sorting</h3>
        <p>
          At Luxeris Manufacturing Plant Lines 1 and 2, every unit stripped from hardened steel molds passes across an automated conveyor equipped with six multi-point <strong>laser triangulation micrometers</strong>. Dimensions along length, width, height, and diagonal squareness are recorded at 50 points per unit.
        </p>
        <p>
          Any unit displaying elevation variation exceeding <strong>±0.01 mm (0.0004")</strong> is mechanically diverted before palletizing. The result is perfectly planar top and bottom bed joints that allow uniform, consistent 3/8" (10 mm) mortar beds across full building stories.
        </p>
      </div>
    `
  }
];

let currentBlogCategory = "all";
let currentBlogSearch = "";

function initBlog() {
  renderBlog("all", "");
  setupBlogSearch();
}

function renderBlog(category = "all", searchQuery = "") {
  currentBlogCategory = category;
  currentBlogSearch = searchQuery;
  window.currentBlogCategory = category;
  window.currentBlogSearch = searchQuery;

  const container = document.getElementById("blog-articles-grid");
  const countBadge = document.getElementById("blog-count-badge");
  if (!container) return;

  let filtered = category === "all" 
    ? blogArticles 
    : blogArticles.filter(a => a.category.toLowerCase() === category.toLowerCase());

  if (searchQuery) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (countBadge) {
    countBadge.innerText = `Showing ${filtered.length} of ${blogArticles.length} Technical Papers`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400 font-mono text-xs space-y-3 bg-slate-900/50 border border-slate-800 rounded-lg">
        <i data-lucide="search-x" class="w-8 h-8 mx-auto text-slate-600"></i>
        <p>No engineering articles matched your search query "${searchQuery}".</p>
        <button onclick="filterBlogByCategory('all')" class="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded text-xs transition-all">
          Clear Filters
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  let html = "";
  filtered.forEach(article => {
    const colorClass = 
      article.categoryColor === "amber" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" :
      article.categoryColor === "orange" ? "bg-orange-500/10 text-orange-400 border-orange-500/30" :
      article.categoryColor === "sky" ? "bg-sky-500/10 text-sky-400 border-sky-500/30" :
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";

    const tagsHtml = article.tags.map(t => `
      <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800">
        #${t}
      </span>
    `).join("");

    html += `
      <article class="blog-card bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl hover:border-amber-500/60 transition-all duration-300 flex flex-col group">
        <!-- Cover Photography with Zoom -->
        <div class="relative aspect-[16/10] overflow-hidden bg-slate-950">
          <img src="${article.image}" alt="${article.title}" 
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          
          <!-- Category & Read Time Badges -->
          <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span class="px-2.5 py-1 rounded text-[10px] font-mono-tech font-bold uppercase tracking-wider border shadow-md ${colorClass}">
              ${article.categoryLabel}
            </span>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 text-slate-300 border border-slate-800 backdrop-blur-sm">
              ${article.readTime}
            </span>
          </div>
        </div>

        <!-- Article Body -->
        <div class="p-5 md:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-amber-500"></i>
              <span>${article.date}</span>
              <span class="text-slate-600">•</span>
              <span class="text-slate-300 font-semibold truncate">${article.author}</span>
            </div>

            <h3 class="text-lg md:text-xl font-heading text-slate-100 group-hover:text-amber-400 transition-colors leading-snug">
              <button onclick="openBlogModal('${article.id}')" class="text-left w-full hover:underline focus:outline-none">
                ${article.title}
              </button>
            </h3>

            <p class="text-xs font-mono text-slate-400 line-clamp-3 leading-relaxed">
              ${article.summary}
            </p>
          </div>

          <!-- Tags & Read Button -->
          <div class="pt-4 border-t border-slate-800/80 space-y-3">
            <div class="flex flex-wrap gap-1.5">
              ${tagsHtml}
            </div>

            <button onclick="openBlogModal('${article.id}')" 
                    class="w-full inline-flex items-center justify-between px-3.5 py-2.5 bg-slate-950 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-mono text-xs font-bold rounded border border-slate-800 hover:border-amber-400 transition-all cursor-pointer group/btn">
              <span>Read Full Technical Paper</span>
              <i data-lucide="arrow-right" class="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;
  if (window.lucide) lucide.createIcons();
}

function filterBlogByCategory(cat) {
  const chips = document.querySelectorAll(".blog-category-chip");
  chips.forEach(c => {
    c.classList.remove("active", "bg-amber-500", "text-slate-950", "border-amber-400");
    c.classList.add("bg-slate-900", "text-slate-200");
  });
  if (window.event && window.event.currentTarget) {
    window.event.currentTarget.classList.add("active", "bg-amber-500", "text-slate-950", "border-amber-400");
    window.event.currentTarget.classList.remove("bg-slate-900", "text-slate-200");
  }

  const searchInput = document.getElementById("blog-search-input");
  const q = searchInput ? searchInput.value : "";
  renderBlog(cat, q);
}

function setupBlogSearch() {
  const searchInput = document.getElementById("blog-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderBlog(currentBlogCategory, e.target.value);
    });
  }
}

function openBlogModal(articleId) {
  const article = blogArticles.find(a => a.id === articleId);
  if (!article) return;

  const modal = document.getElementById("blog-modal");
  const content = document.getElementById("blog-modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <!-- Modal Header -->
    <div class="relative bg-slate-950 border-b border-slate-800 p-6 sm:p-8">
      <div class="flex items-center justify-between gap-4 mb-4">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <i data-lucide="file-text" class="w-3.5 h-3.5"></i> ${article.categoryLabel}
        </span>
        <button onclick="closeBlogModal()" class="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors" title="Close Paper">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading text-slate-100 tracking-tight leading-tight">
        ${article.title}
      </h1>

      <div class="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-4">
        <div class="flex items-center gap-2 text-slate-200">
          <i data-lucide="user" class="w-4 h-4 text-amber-500"></i>
          <span class="font-bold">${article.author}</span>
          <span class="text-slate-500">(${article.authorTitle})</span>
        </div>
        <span class="text-slate-600">•</span>
        <div class="flex items-center gap-1.5">
          <i data-lucide="calendar" class="w-4 h-4 text-slate-500"></i>
          <span>${article.date}</span>
        </div>
        <span class="text-slate-600">•</span>
        <div class="flex items-center gap-1.5">
          <i data-lucide="clock" class="w-4 h-4 text-slate-500"></i>
          <span>${article.readTime}</span>
        </div>
      </div>
    </div>

    <!-- Article Featured Image Banner -->
    <div class="relative aspect-[21/9] max-h-80 overflow-hidden bg-slate-950">
      <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
    </div>

    <!-- Article Content Body -->
    <div class="p-6 sm:p-8 space-y-6 bg-slate-950/80">
      ${article.content}

      <!-- Citation & Metrology Footer -->
      <div class="mt-8 pt-6 border-t border-slate-800 text-xs font-mono text-slate-400 bg-slate-900/60 p-4 rounded-lg border space-y-2">
        <div class="text-amber-400 font-bold uppercase text-[10px]">Academic & Engineering Citation Format:</div>
        <p class="text-slate-300 font-mono text-[11px] select-all bg-slate-950 p-2.5 rounded border border-slate-800">
          ${article.author.split(",")[0]} et al. (2026). "${article.title}." <em>Luxeris Journal of Materials & Structural Masonry Metrology</em>, Technical Paper No. LX-${article.id.toUpperCase().substring(0, 10)}.
        </p>
        <div class="flex items-center justify-between pt-2">
          <div class="flex gap-2">
            ${article.tags.map(t => `<span class="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">#${t}</span>`).join("")}
          </div>
          <button onclick="window.print()" class="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors">
            <i data-lucide="printer" class="w-3.5 h-3.5"></i> Print Technical Paper
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
  if (window.lucide) lucide.createIcons();
}

function closeBlogModal() {
  const modal = document.getElementById("blog-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
}

// Window attachments
window.initBlog = initBlog;
window.renderBlog = renderBlog;
window.filterBlogByCategory = filterBlogByCategory;
window.openBlogModal = openBlogModal;
window.closeBlogModal = closeBlogModal;

