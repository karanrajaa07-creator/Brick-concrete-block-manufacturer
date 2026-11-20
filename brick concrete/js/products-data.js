/**
 * TITAN BRICK & CONCRETE INDUSTRIES
 * Complete Product Catalogue Database - 15 Industrial Masonry Products
 * Full engineering specifications, ASTM / IS standards, and verified local photography
 */

const PRODUCTS_DATA = [
  {
    id: "solid-concrete-block-8",
    name: "Heavy-Duty Solid Concrete Block (8-Inch)",
    category: "solid-concrete",
    categoryLabel: "Solid Concrete Blocks",
    image: "images/products/solid-concrete-block-8.jpg",
    badge: "Bestseller",
    shortDesc: "High-density load-bearing solid concrete block engineered for high-rise foundations, shear walls, and heavy machine footings.",
    sizes: "400 x 200 x 200 mm (16\" x 8\" x 8\")",
    strength: "12.5 N/mm² (1815 PSI) - Grade A",
    specs: {
      compressiveStrength: "12.5 N/mm² (ASTM C90 / IS 2185)",
      density: "2200 kg/m³",
      dryWeight: "35.5 kg / unit",
      waterAbsorption: "< 6.5% by weight",
      fireRating: "4-Hour Fire Resistance (UL Classified)",
      palletQuantity: "60 units / pallet",
      recommendedUse: "Foundation basements, load-bearing exterior walls, industrial load barriers"
    },
    priceEst: "$2.45 - $2.85 per unit (Wholesale Bulk)"
  },
  {
    id: "hollow-concrete-block-2core",
    name: "Reinforced 2-Core Hollow Concrete Block",
    category: "hollow-concrete",
    categoryLabel: "Hollow Concrete Blocks",
    image: "images/products/hollow-concrete-block.jpg",
    badge: "Thermal Efficient",
    shortDesc: "Engineered hollow masonry unit with dual acoustic cavities for vertical rebar reinforcement and integrated grout fill.",
    sizes: "400 x 200 x 200 mm (16\" x 8\" x 8\")",
    strength: "8.5 N/mm² (1230 PSI)",
    specs: {
      compressiveStrength: "8.5 N/mm² (IS 2185 Part I)",
      density: "1450 kg/m³ (Lightened design)",
      dryWeight: "19.5 kg / unit",
      waterAbsorption: "< 8.0%",
      fireRating: "2.5-Hour Fire Rating",
      palletQuantity: "72 units / pallet",
      recommendedUse: "Reinforced masonry, high-rise internal infill walls, sound-attenuating partitions"
    },
    priceEst: "$1.85 - $2.15 per unit"
  },
  {
    id: "aac-lightweight-block",
    name: "Autoclaved Aerated Concrete (AAC) Block",
    category: "aac-blocks",
    categoryLabel: "AAC Blocks",
    image: "images/products/aac-blocks.jpg",
    badge: "Eco & Light",
    shortDesc: "Ultra-lightweight micro-cellular precast concrete block providing unmatched thermal insulation, 50% faster construction speed, and seismic protection.",
    sizes: "600 x 200 x 100/150/200 mm",
    strength: "4.5 N/mm² (Grade 1)",
    specs: {
      compressiveStrength: "4.5 N/mm² average",
      density: "550 - 650 kg/m³ (1/3 weight of standard brick)",
      dryWeight: "14.2 kg (at 600x200x200mm)",
      waterAbsorption: "Graded capillary diffusion",
      fireRating: "4-Hour non-combustible A1",
      palletQuantity: "54 units / pallet",
      recommendedUse: "Multi-storey framed structures, high thermal efficiency green buildings"
    },
    priceEst: "$2.60 - $3.10 per block"
  },
  {
    id: "fly-ash-brick-premium",
    name: "High-Compression Fly Ash Eco-Bricks",
    category: "fly-ash-bricks",
    categoryLabel: "Fly Ash Bricks",
    image: "images/products/fly-ash-bricks.jpg",
    badge: "Green Certified",
    shortDesc: "Hydraulically compressed using pulverized fuel ash, Portland cement, and graded quarry aggregate. Glass-smooth edges reduce mortar use by 30%.",
    sizes: "230 x 110 x 75 mm (Standard Modular)",
    strength: "10.0 N/mm² (1450 PSI)",
    specs: {
      compressiveStrength: "10.0 N/mm² (IS 12894:2002)",
      density: "1750 kg/m³",
      dryWeight: "3.2 kg / brick",
      waterAbsorption: "< 10.0%",
      fireRating: "2-Hour Fire Resistant",
      palletQuantity: "500 bricks / pallet",
      recommendedUse: "Commercial exterior facades, load-bearing housing, boundary walls"
    },
    priceEst: "$0.38 - $0.48 per brick"
  },
  {
    id: "red-clay-wirecut-brick",
    name: "Machine-Pressed Red Clay Kiln Bricks",
    category: "red-clay-bricks",
    categoryLabel: "Red Clay Bricks",
    image: "images/products/red-clay-bricks.jpg",
    badge: "Traditional Strength",
    shortDesc: "Natural alluvial clay extruded and fired in automated tunnel kilns at 1050°C. Delivers classical architectural beauty and perpetual weather resilience.",
    sizes: "230 x 115 x 75 mm & 215 x 102 x 65 mm",
    strength: "17.5 N/mm² (Class 175)",
    specs: {
      compressiveStrength: "15.0 - 20.0 N/mm²",
      density: "1900 kg/m³",
      dryWeight: "3.4 kg / brick",
      waterAbsorption: "< 12.0%",
      fireRating: "4-Hour Class A Fire Resistance",
      palletQuantity: "500 bricks / pallet",
      recommendedUse: "Exposed architectural brickwork, heritage restoration, structural facades"
    },
    priceEst: "$0.52 - $0.65 per brick"
  },
  {
    id: "cement-brick-heavy",
    name: "Hydraulic Compressed Cement Bricks",
    category: "cement-bricks",
    categoryLabel: "Cement Bricks",
    image: "images/products/cement-bricks.jpg",
    badge: "Heavy Duty",
    shortDesc: "High-tonnage hydraulic pressed cement and stone grit bricks. Uniform dimensions ensure perfectly plumb courses and zero site chipping.",
    sizes: "230 x 110 x 75 mm",
    strength: "12.0 N/mm² (1740 PSI)",
    specs: {
      compressiveStrength: "12.0 N/mm²",
      density: "2050 kg/m³",
      dryWeight: "3.6 kg / brick",
      waterAbsorption: "< 8.5%",
      fireRating: "3-Hour Fire Rating",
      palletQuantity: "480 bricks / pallet",
      recommendedUse: "Heavy masonry, compound walls, septic and drainage encasements"
    },
    priceEst: "$0.42 - $0.50 per brick"
  },
  {
    id: "paver-zigzag-heavy-duty",
    name: "Heavy-Duty Interlocking Zig-Zag Paver Blocks (80mm)",
    category: "paver-blocks",
    categoryLabel: "Paver Blocks",
    image: "images/products/paver-blocks.jpg",
    badge: "M-50 Heavy Traffic",
    shortDesc: "Dual-layer vibration compacted interlocking pavers with textured anti-skid quartz wear surface, certified for ports, container terminals, and heavy transit.",
    sizes: "Thickness: 80 mm (Also in 60 mm & 100 mm)",
    strength: "50.0 N/mm² (M-50 Grade)",
    specs: {
      compressiveStrength: "50.0 N/mm² at 28 days (IS 15658)",
      density: "2350 kg/m³",
      abrasionResistance: "< 2.0 mm loss under standard wheel test",
      waterAbsorption: "< 5.0%",
      colors: "Terracotta Red, Charcoal Grey, Natural Concrete, Mustard Yellow",
      palletQuantity: "12 sq. meters / pallet (approx. 430 units)",
      recommendedUse: "Container depots, gas stations, factory arterial roads, municipal sidewalks"
    },
    priceEst: "$14.50 - $18.00 per sq. meter"
  },
  {
    id: "interlocking-drystack-block",
    name: "Interlocking Concrete Masonry Blocks",
    category: "interlocking-blocks",
    categoryLabel: "Interlocking Blocks",
    image: "images/products/interlocking-blocks.jpg",
    badge: "Mortar-Free Dry-Stack",
    shortDesc: "Precision-molded tongue-and-groove interlocking concrete blocks allowing rapid mortar-free dry-stack assembly with vertical locking stability.",
    sizes: "300 x 150 x 150 mm & 300 x 200 x 150 mm",
    strength: "10.0 N/mm² (1450 PSI)",
    specs: {
      compressiveStrength: "10.0 N/mm²",
      density: "1950 kg/m³",
      dryWeight: "16.0 kg / unit",
      waterAbsorption: "< 7.5%",
      fireRating: "2.5-Hour Fire Rating",
      palletQuantity: "80 units / pallet",
      recommendedUse: "Fast-track affordable housing, perimeter defensive walls, flood revetments"
    },
    priceEst: "$2.10 - $2.50 per unit"
  },
  {
    id: "decorative-split-face-block",
    name: "Decorative Split-Face Concrete Blocks",
    category: "decorative-blocks",
    categoryLabel: "Decorative Concrete Blocks",
    image: "images/products/decorative-split-face-blocks.jpg",
    badge: "Textured Facade",
    shortDesc: "Architectural split-face textured concrete masonry units that recreate the rugged texture of natural chiseled quarry stone with uniform internal core strength.",
    sizes: "400 x 200 x 200 mm & 400 x 100 x 200 mm",
    strength: "11.5 N/mm² (1670 PSI)",
    specs: {
      compressiveStrength: "11.5 N/mm² (ASTM C90)",
      density: "2100 kg/m³",
      finish: "Natural rough split stone texture with water-repellent silane admixture",
      waterAbsorption: "< 6.0%",
      palletQuantity: "60 units / pallet",
      recommendedUse: "Architectural commercial facades, high-end perimeter barriers, estate entrance pylons"
    },
    priceEst: "$3.80 - $4.40 per unit"
  },
  {
    id: "decorative-breeze-block",
    name: "Architectural Screen / Breeze Blocks",
    category: "breeze-blocks",
    categoryLabel: "Architectural Screen / Breeze Blocks",
    image: "images/products/decorative-breeze-blocks.jpg",
    badge: "Solar Shading",
    shortDesc: "Geometric pierced ventilation concrete blocks providing passive solar shading, cross-ventilation airflow, and iconic mid-century modern aesthetic facades.",
    sizes: "290 x 290 x 90 mm & 200 x 200 x 100 mm",
    strength: "6.0 N/mm² (Non-Loadbearing Screen)",
    specs: {
      compressiveStrength: "6.0 N/mm²",
      density: "1850 kg/m³",
      dryWeight: "8.2 kg / unit",
      finish: "Smooth precast off-white or natural cement aggregate",
      openVentilationArea: "38% open airflow aperture",
      palletQuantity: "90 units / pallet",
      recommendedUse: "Feature facade screens, parking garage facades, courtyard divider walls"
    },
    priceEst: "$5.20 - $7.50 per unit"
  },
  {
    id: "custom-engineered-precast",
    name: "Custom Size Concrete Blocks & CAD Forms",
    category: "custom-size",
    categoryLabel: "Custom Size Blocks",
    image: "images/products/custom-precast-blocks.jpg",
    badge: "CNC Molded",
    shortDesc: "Precision CNC mold manufacturing tailored for specialized infrastructure, bridge abutments, nuclear containment, and non-standard architectural radii.",
    sizes: "Custom manufactured to client architectural CAD specifications",
    strength: "Up to 60.0 N/mm² (M-60 Grade)",
    specs: {
      compressiveStrength: "Custom spec up to 60 MPa (8700 PSI)",
      density: "Tailored (1800 - 2500 kg/m³)",
      tolerance: "CNC ± 1.0 mm precision",
      curing: "High-pressure autoclave steam curing",
      certification: "Full 3rd party batch lab certificate included",
      recommendedUse: "Infrastructure piers, curved retaining walls, heavy civil engineering"
    },
    priceEst: "Project Quote on Engineering Review"
  },
  {
    id: "precast-modular-blocks",
    name: "Precast Concrete Blocks & Modules",
    category: "precast-blocks",
    categoryLabel: "Precast Concrete Blocks",
    image: "images/products/precast-modular-blocks.jpg",
    badge: "Fast Assembly",
    shortDesc: "Factory-cast modular precast concrete blocks engineered with precision mating edges for retaining systems, box culverts, and structural parapets.",
    sizes: "600 x 300 x 300 mm & 800 x 400 x 400 mm",
    strength: "25.0 N/mm² (3625 PSI)",
    specs: {
      compressiveStrength: "25.0 N/mm² minimum (ASTM C150 / C33)",
      density: "2300 kg/m³",
      dryWeight: "125 kg / module",
      waterAbsorption: "< 5.5%",
      curing: "Accelerated chamber hydration",
      palletQuantity: "16 modules / transport pallet",
      recommendedUse: "Bulk material containment bays, highway gravity walls, stormwater channels"
    },
    priceEst: "$18.50 - $24.00 per module"
  },
  {
    id: "lightweight-concrete-blocks",
    name: "Lightweight Cellular Concrete Blocks",
    category: "lightweight-blocks",
    categoryLabel: "Lightweight Concrete Blocks",
    image: "images/products/lightweight-cellular-blocks.jpg",
    badge: "Dead-Load Reducer",
    shortDesc: "Cellular foamed concrete masonry blocks with expanded shale aggregate, engineered to slash structural dead-weight on multi-story high-rise framed structures.",
    sizes: "400 x 150 x 200 mm & 400 x 200 x 200 mm",
    strength: "5.5 N/mm² (800 PSI)",
    specs: {
      compressiveStrength: "5.5 N/mm² (ASTM C129 Type II)",
      density: "1100 kg/m³ (45% lighter than standard CMU)",
      thermalConductivity: "0.22 W/m-K",
      fireRating: "3-Hour Fire Barrier",
      palletQuantity: "80 units / pallet",
      recommendedUse: "Curtain wall internal masonry, penthouse partitions, lightweight retrofit additions"
    },
    priceEst: "$2.20 - $2.65 per unit"
  },
  {
    id: "heavy-duty-foundation-block",
    name: "Heavy-Duty Foundation & Footing Blocks",
    category: "foundation-blocks",
    categoryLabel: "Heavy-Duty Foundation Blocks",
    image: "images/products/solid-concrete-block-6.jpg",
    badge: "Hydrostatic Grade",
    shortDesc: "Engineered ultra-dense footing blocks designed for maximum ground bearing capacity, subterranean hydrostatic soil pressures, and deep perimeter trenches.",
    sizes: "400 x 300 x 200 mm (16\" x 12\" x 8\")",
    strength: "15.0 N/mm² (2175 PSI)",
    specs: {
      compressiveStrength: "15.0 N/mm² (ASTM C90 Heavyweight)",
      density: "2280 kg/m³",
      dryWeight: "42.0 kg / unit",
      waterAbsorption: "< 5.0% (Zero capillary rise)",
      sulfateResistance: "Class 2 Sulfate Resistant Mix",
      palletQuantity: "45 units / pallet",
      recommendedUse: "Sub-grade foundations, bridge grade-beams, retaining wall leveling pads"
    },
    priceEst: "$3.40 - $3.95 per unit"
  },
  {
    id: "garden-landscaping-blocks",
    name: "Garden & Landscaping Retaining Wall Blocks",
    category: "landscaping-blocks",
    categoryLabel: "Garden & Landscaping Blocks",
    image: "images/products/garden-landscaping-blocks.jpg",
    badge: "Landscape Grade",
    shortDesc: "Beveled-edge segmented retaining wall blocks featuring rear locator lips for natural soil setback, terraced garden planters, and erosion barriers.",
    sizes: "300 x 200 x 125 mm & 400 x 250 x 150 mm",
    strength: "20.0 N/mm² (2900 PSI)",
    specs: {
      compressiveStrength: "20.0 N/mm² (ASTM C1372)",
      density: "2150 kg/m³",
      dryWeight: "18.5 kg / unit",
      waterAbsorption: "< 6.0%",
      colors: "Granite Grey, Sedona Terracotta, Earth Sandstone, Basalt Charcoal",
      palletQuantity: "64 units / pallet",
      recommendedUse: "Terraced residential gardens, slope stabilization, driveway curbs, flowerbed surrounds"
    },
    priceEst: "$4.10 - $4.90 per unit"
  }
];

// Export to window
if (typeof window !== 'undefined') {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
}
