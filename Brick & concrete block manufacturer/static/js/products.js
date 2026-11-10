// Products Catalog Module: Filtering by Type, Size, Strength, Search, Sorting & Technical Data Sheets

// Embedded verified dataset ensuring zero-delay synchronous rendering and offline/file:// reliability
const DEFAULT_PRODUCTS = [
  {
    "id": "cmu-solid-4",
    "name": "Luxeris 4\" Solid Heavy-Duty Concrete Block",
    "category": "Solid Concrete Blocks",
    "type": "solid",
    "sizeCategory": "4-inch",
    "dimensionsImperial": "4\" x 8\" x 16\"",
    "dimensionsMetric": "100 x 200 x 400 mm",
    "compressiveStrengthMpa": 25.5,
    "compressiveStrengthPsi": 3700,
    "astmStandard": "ASTM C90 / C140",
    "weightKg": 14.8,
    "weightLbs": 32.6,
    "unitsPerPallet": 120,
    "palletWeightLbs": 3912,
    "fireRatingHours": 3.0,
    "waterAbsorption": 5.2,
    "density": "Normal Weight (2200 kg/m\u00b3)",
    "application": "Load-Bearing, Partition Walls, Elevator Shafts, Foundation Veneer",
    "priceBase": 2.85,
    "inStock": true,
    "image": "./static/images/products/cmu-solid-4.jpg",
    "description": "Solid normal-weight concrete masonry unit manufactured with high-tensile basalt aggregate. Engineered for high fire separation and heavy compressive loads in commercial partitioning.",
    "features": [
      "Non-combustible 3-hour rating",
      "Vibratory dense compaction",
      "Zero core cavities for maximum shear strength"
    ]
  },
  {
    "id": "cmu-solid-6",
    "name": "Luxeris 6\" Solid Structural Concrete Block",
    "category": "Solid Concrete Blocks",
    "type": "solid",
    "sizeCategory": "6-inch",
    "dimensionsImperial": "6\" x 8\" x 16\"",
    "dimensionsMetric": "150 x 200 x 400 mm",
    "compressiveStrengthMpa": 32.0,
    "compressiveStrengthPsi": 4640,
    "astmStandard": "ASTM C90 Class S",
    "weightKg": 21.5,
    "weightLbs": 47.4,
    "unitsPerPallet": 90,
    "palletWeightLbs": 4266,
    "fireRatingHours": 4.0,
    "waterAbsorption": 4.8,
    "density": "High Density (2300 kg/m\u00b3)",
    "application": "Load-Bearing, Heavy Retaining, Blast-Resistant Walls, Sub-grade",
    "priceBase": 3.95,
    "inStock": true,
    "image": "./static/images/products/cmu-solid-6.jpg",
    "description": "Heavy industrial solid block with 32 MPa tested compressive rating. Designed for subgrade earth retention, heavy warehouse blast walls, and security perimeters.",
    "features": [
      "4-Hour UL Fire Endurance",
      "Ultra-low water ingress",
      "Resistant to aggressive soil sulfates"
    ]
  },
  {
    "id": "cmu-solid-8",
    "name": "Luxeris 8\" Ultra-Dense Solid Foundation Block",
    "category": "Solid Concrete Blocks",
    "type": "solid",
    "sizeCategory": "8-inch",
    "dimensionsImperial": "8\" x 8\" x 16\"",
    "dimensionsMetric": "200 x 200 x 400 mm",
    "compressiveStrengthMpa": 38.5,
    "compressiveStrengthPsi": 5580,
    "astmStandard": "ASTM C90 Heavy-Duty",
    "weightKg": 29.2,
    "weightLbs": 64.4,
    "unitsPerPallet": 60,
    "palletWeightLbs": 3864,
    "fireRatingHours": 4.0,
    "waterAbsorption": 4.1,
    "density": "Heavy Weight (2350 kg/m\u00b3)",
    "application": "Sub-Base Foundations, Machine Plinths, Nuclear Shielding, Retaining",
    "priceBase": 5.4,
    "inStock": true,
    "image": "./static/images/products/cmu-solid-8.jpg",
    "description": "Massive monolithic concrete block yielding 5,580 PSI compressive load tolerance. Ideal for machine mounting pads, heavy infrastructure piers, and flood-resilient foundation walls.",
    "features": [
      "Maximum gravity load capacity",
      "Certified shear resistance",
      "Freeze-thaw 50-cycle immune"
    ]
  },
  {
    "id": "cmu-solid-12",
    "name": "Luxeris 12\" Heavy Engineering Solid Block",
    "category": "Solid Concrete Blocks",
    "type": "solid",
    "sizeCategory": "12-inch",
    "dimensionsImperial": "12\" x 8\" x 16\"",
    "dimensionsMetric": "300 x 200 x 400 mm",
    "compressiveStrengthMpa": 42.0,
    "compressiveStrengthPsi": 6090,
    "astmStandard": "ASTM C90 Grade N",
    "weightKg": 44.5,
    "weightLbs": 98.1,
    "unitsPerPallet": 40,
    "palletWeightLbs": 3924,
    "fireRatingHours": 4.0,
    "waterAbsorption": 3.9,
    "density": "Ultra-Dense (2400 kg/m\u00b3)",
    "application": "Foundation, Gravity Walls, Bridge Abutments, Coastal Armor",
    "priceBase": 7.85,
    "inStock": true,
    "image": "./static/images/products/cmu-solid-12.jpg",
    "description": "Engineered for civil engineering works requiring immense ballast, high gravity mass, and maximum shear friction resistance.",
    "features": [
      "Over 6,000 PSI capacity",
      "Extreme overturning stability",
      "Industrial marine & coastal rated"
    ]
  },
  {
    "id": "cmu-hollow-4",
    "name": "Luxeris 4\" Hollow Core Partition CMU Block",
    "category": "Hollow Core CMU",
    "type": "hollow",
    "sizeCategory": "4-inch",
    "dimensionsImperial": "4\" x 8\" x 16\"",
    "dimensionsMetric": "100 x 200 x 400 mm",
    "compressiveStrengthMpa": 19.5,
    "compressiveStrengthPsi": 2830,
    "astmStandard": "ASTM C90 Type I",
    "weightKg": 9.8,
    "weightLbs": 21.6,
    "unitsPerPallet": 140,
    "palletWeightLbs": 3024,
    "fireRatingHours": 2.0,
    "waterAbsorption": 6.8,
    "density": "Medium Weight (1950 kg/m\u00b3)",
    "application": "Partition Walls, Corridor Firewalls, Non-Loadbearing Veneer",
    "priceBase": 2.15,
    "inStock": true,
    "image": "./static/images/products/cmu-hollow-4.jpg",
    "description": "Lightweight dual-core 4-inch concrete block designed for fast erection of interior partitions, electrical conduit routing, and mechanical chase separation.",
    "features": [
      "2-Hour UL fire containment",
      "Generous internal vertical conduit cores",
      "Reduced structural dead-load on elevated slabs"
    ]
  },
  {
    "id": "cmu-hollow-6",
    "name": "Luxeris 6\" Two-Core Hollow CMU Block",
    "category": "Hollow Core CMU",
    "type": "hollow",
    "sizeCategory": "6-inch",
    "dimensionsImperial": "6\" x 8\" x 16\"",
    "dimensionsMetric": "150 x 200 x 400 mm",
    "compressiveStrengthMpa": 22.0,
    "compressiveStrengthPsi": 3190,
    "astmStandard": "ASTM C90 Type I",
    "weightKg": 13.5,
    "weightLbs": 29.8,
    "unitsPerPallet": 105,
    "palletWeightLbs": 3129,
    "fireRatingHours": 2.0,
    "waterAbsorption": 6.5,
    "density": "Medium Weight (1980 kg/m\u00b3)",
    "application": "Partition Walls, Utility Enclosures, Perimeter Fences",
    "priceBase": 2.65,
    "inStock": true,
    "image": "./static/images/products/cmu-hollow-6.jpg",
    "description": "Standard two-core hollow block optimized for weight efficiency and electrical/plumbing chase routing in commercial structures.",
    "features": [
      "Precision flanged web design",
      "High mortar-bed adhesion grooves",
      "Integrated conduit voids"
    ]
  },
  {
    "id": "cmu-hollow-8",
    "name": "Luxeris 8\" Two-Core Structural Hollow CMU",
    "category": "Hollow Core CMU",
    "type": "hollow",
    "sizeCategory": "8-inch",
    "dimensionsImperial": "8\" x 8\" x 16\"",
    "dimensionsMetric": "200 x 200 x 400 mm",
    "compressiveStrengthMpa": 28.5,
    "compressiveStrengthPsi": 4130,
    "astmStandard": "ASTM C90 Grade S",
    "weightKg": 17.2,
    "weightLbs": 37.9,
    "unitsPerPallet": 75,
    "palletWeightLbs": 2842,
    "fireRatingHours": 3.0,
    "waterAbsorption": 5.8,
    "density": "Normal Weight (2100 kg/m\u00b3)",
    "application": "Load-Bearing, Shear Walls, Seismic Zones, Core Enclosures",
    "priceBase": 3.15,
    "inStock": true,
    "image": "./static/images/products/cmu-hollow-8.jpg",
    "description": "The quintessential North American commercial construction block. Dual cellular cells accommodate heavy vertical steel rebar and high-slump grout consolidation.",
    "features": [
      "Accommodates #4 to #8 rebar",
      "High lateral earthquake shear rating",
      "Autoclave steam cured for minimal shrinkage"
    ]
  },
  {
    "id": "cmu-bond-beam-8",
    "name": "Luxeris 8\" Bond Beam U-Block (Rebar Channel)",
    "category": "Hollow Core CMU",
    "type": "hollow",
    "sizeCategory": "8-inch",
    "dimensionsImperial": "8\" x 8\" x 16\"",
    "dimensionsMetric": "200 x 200 x 400 mm",
    "compressiveStrengthMpa": 28.5,
    "compressiveStrengthPsi": 4130,
    "astmStandard": "ASTM C90 Channel Unit",
    "weightKg": 18.0,
    "weightLbs": 39.7,
    "unitsPerPallet": 75,
    "palletWeightLbs": 2977,
    "fireRatingHours": 3.0,
    "waterAbsorption": 5.6,
    "density": "Normal Weight (2100 kg/m\u00b3)",
    "application": "Horizontal Lintel Beams, Seismic Tie Beams, Parapet Reinforcement",
    "priceBase": 3.65,
    "inStock": true,
    "image": "./static/images/products/cmu-bond-beam-8.jpg",
    "description": "Continuous trough masonry unit engineered for placing continuous horizontal rebar reinforcement and poured grout to create lintels and seismic bond beams.",
    "features": [
      "Smooth continuous flow rebar trough",
      "Eliminates wood forming for door/window lintels",
      "Matches standard 8x8x16 coursing seamlessly"
    ]
  },
  {
    "id": "cmu-hollow-12",
    "name": "Luxeris 12\" Heavy Structural Dual-Chamber CMU",
    "category": "Hollow Core CMU",
    "type": "hollow",
    "sizeCategory": "12-inch",
    "dimensionsImperial": "12\" x 8\" x 16\"",
    "dimensionsMetric": "300 x 200 x 400 mm",
    "compressiveStrengthMpa": 34.0,
    "compressiveStrengthPsi": 4930,
    "astmStandard": "ASTM C90 Commercial",
    "weightKg": 25.8,
    "weightLbs": 56.9,
    "unitsPerPallet": 45,
    "palletWeightLbs": 2560,
    "fireRatingHours": 4.0,
    "waterAbsorption": 5.1,
    "density": "Normal Weight (2150 kg/m\u00b3)",
    "application": "Deep Basement Walls, Industrial Warehouses, Elevator Shafts",
    "priceBase": 4.95,
    "inStock": true,
    "image": "./static/images/products/cmu-hollow-12.jpg",
    "description": "High-volume 12-inch core volume allows heavy grout fill for subterranean earth retention and multi-story structural column piers.",
    "features": [
      "Huge core grout capacity",
      "Superior lateral hydrostatic pressure support",
      "4-hour continuous firewall compliance"
    ]
  },
  {
    "id": "clay-eng-a",
    "name": "Luxeris Class A High-Strength Engineering Brick",
    "category": "Engineering & Clay Bricks",
    "type": "clay",
    "sizeCategory": "4-inch",
    "dimensionsImperial": "2-5/8\" x 4\" x 8-1/2\"",
    "dimensionsMetric": "65 x 102 x 215 mm",
    "compressiveStrengthMpa": 75.0,
    "compressiveStrengthPsi": 10875,
    "astmStandard": "BS EN 771-1 / ASTM C62 SW",
    "weightKg": 3.4,
    "weightLbs": 7.5,
    "unitsPerPallet": 400,
    "palletWeightLbs": 3000,
    "fireRatingHours": 4.0,
    "waterAbsorption": 4.2,
    "density": "High Density Vitrified (2300 kg/m\u00b3)",
    "application": "Damp-Proof Coursing, Bridge Abutments, Manholes, Acid-Resistant Works",
    "priceBase": 1.45,
    "inStock": true,
    "image": "./static/images/products/clay-eng-a.jpg",
    "description": "Class A vitrified high-compressive clay engineering brick fired above 1,180\u00b0C. Virtually impervious to groundwater salts, industrial effluent, and extreme compressive stress.",
    "features": [
      "Exceeds 10,000 PSI crushing load",
      "Ultra-low water absorption (< 4.5%)",
      "Certified chemical and acid resistant"
    ]
  },
  {
    "id": "clay-modular-4",
    "name": "Luxeris 4\" Modular Facing & Engineering Brick",
    "category": "Engineering & Clay Bricks",
    "type": "clay",
    "sizeCategory": "4-inch",
    "dimensionsImperial": "4\" x 2-2/3\" x 8\"",
    "dimensionsMetric": "100 x 67 x 200 mm",
    "compressiveStrengthMpa": 52.0,
    "compressiveStrengthPsi": 7540,
    "astmStandard": "ASTM C216 Grade SW",
    "weightKg": 2.9,
    "weightLbs": 6.4,
    "unitsPerPallet": 500,
    "palletWeightLbs": 3200,
    "fireRatingHours": 3.0,
    "waterAbsorption": 4.9,
    "density": "Vitrified Extruded Clay (2250 kg/m\u00b3)",
    "application": "Commercial Exterior Cladding, Load-Bearing Facing, Institutional Architecture",
    "priceBase": 1.15,
    "inStock": true,
    "image": "./static/images/products/clay-modular-4.jpg",
    "description": "Standard 4-inch modular architectural wirecut brick designed for perfect 8-inch coursing alignment in composite brick-and-block wall systems. Weather-immune severe weathering (SW) rated.",
    "features": [
      "Modular 4-inch wall footprint",
      "Crisp wirecut edges with sharp shadowlines",
      "ASTM C216 Grade SW severe freeze-thaw certified"
    ]
  },
  {
    "id": "clay-king-blue",
    "name": "Luxeris Staffordshire Blue 4\" Engineering Brick",
    "category": "Engineering & Clay Bricks",
    "type": "clay",
    "sizeCategory": "4-inch",
    "dimensionsImperial": "4\" x 2-7/8\" x 9\"",
    "dimensionsMetric": "102 x 73 x 228 mm",
    "compressiveStrengthMpa": 105.0,
    "compressiveStrengthPsi": 15225,
    "astmStandard": "BS EN 771-1 Class A / ASTM C62",
    "weightKg": 4.1,
    "weightLbs": 9.0,
    "unitsPerPallet": 360,
    "palletWeightLbs": 3240,
    "fireRatingHours": 4.0,
    "waterAbsorption": 3.2,
    "density": "Ultra-Vitrified Iron Clay (2450 kg/m\u00b3)",
    "application": "Damp-Proof Coursing, Heavy Rail Piers, Canal Locks, Sewer Infrastructure",
    "priceBase": 2.25,
    "inStock": true,
    "image": "./static/images/products/clay-king-blue.jpg",
    "description": "Kiln-reduced ironstone clay brick delivering legendary 105 MPa compressive capacity. The ultimate barrier brick for civil railway viaducts, coastal seawalls, and water treatment retaining.",
    "features": [
      "15,000+ PSI maximum compressive rating",
      "Vitreous metallic blue-black finish",
      "Zero degradation under aggressive sulfate groundwaters"
    ]
  },
  {
    "id": "clay-facing-red",
    "name": "Luxeris Heritage Red Wirecut Face Brick",
    "category": "Engineering & Clay Bricks",
    "type": "clay",
    "sizeCategory": "4-inch",
    "dimensionsImperial": "2-1/4\" x 3-5/8\" x 8\"",
    "dimensionsMetric": "57 x 92 x 203 mm",
    "compressiveStrengthMpa": 38.0,
    "compressiveStrengthPsi": 5510,
    "astmStandard": "ASTM C216 Type FBS",
    "weightKg": 2.2,
    "weightLbs": 4.85,
    "unitsPerPallet": 520,
    "palletWeightLbs": 2522,
    "fireRatingHours": 2.5,
    "waterAbsorption": 6.1,
    "density": "Extruded Clay (2100 kg/m\u00b3)",
    "application": "Exterior Facades, Residential Veneers, Architectural Pilasters",
    "priceBase": 0.98,
    "inStock": true,
    "image": "./static/images/products/clay-facing-red.jpg",
    "description": "Classic rich iron-oxide red wirecut facing brick with subtle textural variations. Combines aesthetic warmth with structural longevity.",
    "features": [
      "UV-stable natural mineral coloration",
      "Excellent mortar bond keying",
      "Classified non-efflorescing"
    ]
  },
  {
    "id": "clay-long-roman",
    "name": "Luxeris Roman Linear Architectural Facing Brick",
    "category": "Engineering & Clay Bricks",
    "type": "clay",
    "sizeCategory": "Custom Sizes",
    "dimensionsImperial": "1-5/8\" x 4\" x 16\"",
    "dimensionsMetric": "40 x 102 x 400 mm",
    "compressiveStrengthMpa": 35.0,
    "compressiveStrengthPsi": 5075,
    "astmStandard": "ASTM C216 Type FBX",
    "weightKg": 4.6,
    "weightLbs": 10.1,
    "unitsPerPallet": 260,
    "palletWeightLbs": 2626,
    "fireRatingHours": 2.0,
    "waterAbsorption": 5.4,
    "density": "Architectural Clay (2180 kg/m\u00b3)",
    "application": "Contemporary Facades, Luxury Commercial, Horizontal Feature Bands",
    "priceBase": 3.85,
    "inStock": true,
    "image": "./static/images/products/clay-long-roman.jpg",
    "description": "Ultra-elongated linear format architectural brick. Emphasizes modern horizontal perspective lines with razor-sharp 1.5mm dimensional tolerances.",
    "features": [
      "Striking 1:10 aspect ratio",
      "Architect-specified modern silhouette",
      "Extruded de-aired clay formulation"
    ]
  },
  {
    "id": "clay-paver-clinker",
    "name": "Luxeris Heavy Clinker Clay Paving Brick",
    "category": "Engineering & Clay Bricks",
    "type": "clay",
    "sizeCategory": "4-inch",
    "dimensionsImperial": "2-1/4\" x 4\" x 8\"",
    "dimensionsMetric": "57 x 102 x 203 mm",
    "compressiveStrengthMpa": 82.0,
    "compressiveStrengthPsi": 11890,
    "astmStandard": "ASTM C902 Class SX",
    "weightKg": 3.6,
    "weightLbs": 7.9,
    "unitsPerPallet": 450,
    "palletWeightLbs": 3555,
    "fireRatingHours": 4.0,
    "waterAbsorption": 3.5,
    "density": "Super-Vitrified Paver Clay (2380 kg/m\u00b3)",
    "application": "Heavy Pedestrian Plazas, Commercial Streetscapes, Historic Promenades",
    "priceBase": 1.75,
    "inStock": true,
    "image": "./static/images/products/clay-paver-clinker.jpg",
    "description": "Heavy-duty vitrified clay paving brick formulated for vehicular and high-traffic municipal plazas. High slip-resistance without surface glazing.",
    "features": [
      "Over 11,800 PSI crushing tolerance",
      "High skid resistance dry and wet",
      "Unfading kiln-fired terra cotta tone"
    ]
  },
  {
    "id": "flyash-press-eco",
    "name": "Luxeris Hydraulic High-Density Fly Ash Eco-Brick",
    "category": "Eco-Smart & Fly Ash",
    "type": "eco",
    "sizeCategory": "4-inch",
    "dimensionsImperial": "2-3/4\" x 4\" x 9\"",
    "dimensionsMetric": "70 x 100 x 230 mm",
    "compressiveStrengthMpa": 24.0,
    "compressiveStrengthPsi": 3480,
    "astmStandard": "ASTM C1634 / IS 1077",
    "weightKg": 2.7,
    "weightLbs": 5.95,
    "unitsPerPallet": 500,
    "palletWeightLbs": 2975,
    "fireRatingHours": 3.0,
    "waterAbsorption": 7.2,
    "density": "Eco Composite Matrix (1850 kg/m\u00b3)",
    "application": "Green Building Envelopes, LEED Certified Projects, Low-Rise Housing",
    "priceBase": 0.72,
    "inStock": true,
    "image": "./static/images/products/flyash-press-eco.jpg",
    "description": "High-pressure hydraulic press brick incorporating 65% pulverized fuel ash (PFA) and mineral slag binders. Delivers 60% lower embodied carbon than traditional clay.",
    "features": [
      "LEED v4 MR credit contributor",
      "Uniform sharp machine corners (zero plaster required)",
      "High dimensional accuracy"
    ]
  },
  {
    "id": "flyash-block-4",
    "name": "Luxeris 4\" High-Pressure Fly Ash Eco-Block",
    "category": "Eco-Smart & Fly Ash",
    "type": "eco",
    "sizeCategory": "4-inch",
    "dimensionsImperial": "4\" x 8\" x 16\"",
    "dimensionsMetric": "100 x 200 x 400 mm",
    "compressiveStrengthMpa": 20.5,
    "compressiveStrengthPsi": 2970,
    "astmStandard": "ASTM C1634 Grade I",
    "weightKg": 11.2,
    "weightLbs": 24.7,
    "unitsPerPallet": 130,
    "palletWeightLbs": 3211,
    "fireRatingHours": 3.0,
    "waterAbsorption": 6.9,
    "density": "Hydraulic Pozzolanic Matrix (1920 kg/m\u00b3)",
    "application": "Green Partitions, Energy-Efficient Enclosures, Sustainable Warehouses",
    "priceBase": 2.25,
    "inStock": true,
    "image": "./static/images/products/flyash-block-4.jpg",
    "description": "Modular 4-inch sustainable concrete block utilizing recycled coal-combustion fly ash. Saves cement while achieving superior long-term pozzolanic strength gain.",
    "features": [
      "55% industrial byproduct substitution",
      "Low water permeability through pozzolanic micro-filling",
      "Modular 4x8x16 standard installation"
    ]
  },
  {
    "id": "aac-thermal-block",
    "name": "Luxeris Thermal-Shield AAC Autoclaved Block",
    "category": "Eco-Smart & Fly Ash",
    "type": "eco",
    "sizeCategory": "6-inch",
    "dimensionsImperial": "6\" x 8\" x 24\"",
    "dimensionsMetric": "150 x 200 x 600 mm",
    "compressiveStrengthMpa": 6.5,
    "compressiveStrengthPsi": 940,
    "astmStandard": "ASTM C1693 Class 4",
    "weightKg": 11.5,
    "weightLbs": 25.3,
    "unitsPerPallet": 80,
    "palletWeightLbs": 2024,
    "fireRatingHours": 4.0,
    "waterAbsorption": 14.5,
    "density": "Ultra-Lightweight Cellular (550 kg/m\u00b3)",
    "application": "Insulating Envelopes, Fire-Walls, High-Rise Infill, Acoustic Barriers",
    "priceBase": 3.45,
    "inStock": true,
    "image": "./static/images/products/aac-thermal-block.jpg",
    "description": "Autoclaved Aerated Concrete with micro-cellular air voids. Offers exceptional thermal insulation (R-Value ~ 1.25 per inch) and 4-hour non-combustible fire protection.",
    "features": [
      "Superb R-10+ thermal envelope",
      "Workable with standard carpentry saws",
      "Ultra-low dead load for high-rise steel frames"
    ]
  },
  {
    "id": "ggbs-slag-block",
    "name": "Luxeris 8\" Low-Carbon GGBS Slag Matrix CMU",
    "category": "Eco-Smart & Fly Ash",
    "type": "eco",
    "sizeCategory": "8-inch",
    "dimensionsImperial": "8\" x 8\" x 16\"",
    "dimensionsMetric": "200 x 200 x 400 mm",
    "compressiveStrengthMpa": 30.0,
    "compressiveStrengthPsi": 4350,
    "astmStandard": "ASTM C90 Eco-Matrix",
    "weightKg": 17.5,
    "weightLbs": 38.6,
    "unitsPerPallet": 75,
    "palletWeightLbs": 2895,
    "fireRatingHours": 3.5,
    "waterAbsorption": 5.2,
    "density": "Slag Composite (2120 kg/m\u00b3)",
    "application": "Structural Foundations, Sub-grade Walls, Salt-Exposed Parking Garages",
    "priceBase": 3.4,
    "inStock": true,
    "image": "./static/images/products/ggbs-slag-block.jpg",
    "description": "Structural 8-inch block manufactured with 50% Ground Granulated Blast-Furnace Slag (GGBS). Offers superior chloride and sulfate defense in aggressive marine soils.",
    "features": [
      "50% embodied CO2 reduction",
      "Continuous pozzolanic hydration over 50 years",
      "Certified marine salt resistance"
    ]
  },
  {
    "id": "paver-heavy-80",
    "name": "Luxeris 80mm Armor-Lock Interlocking Port Paver",
    "category": "Heavy-Duty Pavers",
    "type": "pavers",
    "sizeCategory": "4-inch",
    "dimensionsImperial": "3.15\" (80mm) x 4\" x 8\"",
    "dimensionsMetric": "80 x 100 x 200 mm",
    "compressiveStrengthMpa": 55.0,
    "compressiveStrengthPsi": 7975,
    "astmStandard": "ASTM C936 Class 1",
    "weightKg": 3.8,
    "weightLbs": 8.4,
    "unitsPerPallet": 380,
    "palletWeightLbs": 3192,
    "fireRatingHours": 2.0,
    "waterAbsorption": 4.1,
    "density": "Dry-Cast Heavy Aggregate (2400 kg/m\u00b3)",
    "application": "Port Terminals, Airport Aprons, Heavy Cargo Yards, Bus Depots",
    "priceBase": 0.88,
    "inStock": true,
    "image": "./static/images/products/paver-heavy-80.jpg",
    "description": "80mm industrial interlocking paver built to withstand 100,000+ lb axle loads from container reach-stackers and airport ground support vehicles.",
    "features": [
      "Multi-directional load dispersion lugs",
      "Anti-creep joint interlock system",
      "Resistant to fuel and hydraulic fluids"
    ]
  },
  {
    "id": "paver-zigzag-60",
    "name": "Luxeris 60mm Uni-Lock Commercial Traffic Paver",
    "category": "Heavy-Duty Pavers",
    "type": "pavers",
    "sizeCategory": "4-inch",
    "dimensionsImperial": "2.36\" (60mm) x 4\" x 8\"",
    "dimensionsMetric": "60 x 100 x 200 mm",
    "compressiveStrengthMpa": 45.0,
    "compressiveStrengthPsi": 6525,
    "astmStandard": "ASTM C936 Pedestrian/Vehicular",
    "weightKg": 2.8,
    "weightLbs": 6.17,
    "unitsPerPallet": 500,
    "palletWeightLbs": 3085,
    "fireRatingHours": 2.0,
    "waterAbsorption": 4.5,
    "density": "High-Pressure Compacted (2350 kg/m\u00b3)",
    "application": "Commercial Retail Plazas, Driveways, Parking Lots, Urban Walkways",
    "priceBase": 0.65,
    "inStock": true,
    "image": "./static/images/products/paver-zigzag-60.jpg",
    "description": "Engineered for medium vehicular traffic and pedestrian boulevards. Geometric zigzag edge profile locks units horizontally to eliminate rutting.",
    "features": [
      "Chamfered top edge protects against chipping",
      "High solar reflectance index (SRI) options",
      "Rapid mechanical laying compatibility"
    ]
  },
  {
    "id": "paver-permeable-80",
    "name": "Luxeris 80mm Eco-Flow Permeable Stormwater Paver",
    "category": "Heavy-Duty Pavers",
    "type": "pavers",
    "sizeCategory": "Custom Sizes",
    "dimensionsImperial": "3.15\" (80mm) x 5\" x 10\"",
    "dimensionsMetric": "80 x 125 x 250 mm",
    "compressiveStrengthMpa": 48.0,
    "compressiveStrengthPsi": 6960,
    "astmStandard": "ASTM C1781 / C936",
    "weightKg": 4.5,
    "weightLbs": 9.9,
    "unitsPerPallet": 320,
    "palletWeightLbs": 3168,
    "fireRatingHours": 2.0,
    "waterAbsorption": 4.4,
    "density": "Engineered Void Spacers (2320 kg/m\u00b3)",
    "application": "Permeable Parking Lots, Sustainable Urban Drainage (SUDS), Alleyways",
    "priceBase": 1.25,
    "inStock": true,
    "image": "./static/images/products/paver-permeable-80.jpg",
    "description": "Specialized stormwater management paver featuring engineered 8mm spacer nibs that permit 100% rainwater infiltration into sub-base retention aquifers.",
    "features": [
      "Infiltration rate > 500 inches/hour",
      "Eliminates retention pond requirements",
      "Qualifies for local municipal stormwater fee reductions"
    ]
  },
  {
    "id": "retaining-split-wedge",
    "name": "Luxeris 12\" Keystone Split-Face Retaining Wall Block",
    "category": "Retaining & Facades",
    "type": "retaining",
    "sizeCategory": "12-inch",
    "dimensionsImperial": "12\" x 8\" x 18\"",
    "dimensionsMetric": "300 x 200 x 450 mm",
    "compressiveStrengthMpa": 35.0,
    "compressiveStrengthPsi": 5075,
    "astmStandard": "ASTM C1372 Segmental Retaining",
    "weightKg": 37.0,
    "weightLbs": 81.6,
    "unitsPerPallet": 36,
    "palletWeightLbs": 2937,
    "fireRatingHours": 4.0,
    "waterAbsorption": 4.6,
    "density": "Rockface Heavy Matrix (2300 kg/m\u00b3)",
    "application": "Highway Overpasses, Commercial Cut Slopes, Terraced Landscaping",
    "priceBase": 6.25,
    "inStock": true,
    "image": "./static/images/products/retaining-split-wedge.jpg",
    "description": "Heavy-duty rear-lipped segmental retaining wall unit. Gravity stacked with fiberglass alignment pins to build tall, geogrid-reinforced civil earth retaining walls.",
    "features": [
      "Integrated rear alignment setback lip",
      "Rugged fractured-rock split texture",
      "Engineered for walls exceeding 30 feet with geogrid"
    ]
  },
  {
    "id": "retaining-facade-4",
    "name": "Luxeris 4\" Split-Face Architectural Veneer Block",
    "category": "Retaining & Facades",
    "type": "retaining",
    "sizeCategory": "4-inch",
    "dimensionsImperial": "4\" x 8\" x 16\"",
    "dimensionsMetric": "100 x 200 x 400 mm",
    "compressiveStrengthMpa": 28.0,
    "compressiveStrengthPsi": 4060,
    "astmStandard": "ASTM C90 Veneer",
    "weightKg": 13.6,
    "weightLbs": 30.0,
    "unitsPerPallet": 110,
    "palletWeightLbs": 3300,
    "fireRatingHours": 3.0,
    "waterAbsorption": 5.0,
    "density": "Architectural Stone Matrix (2240 kg/m\u00b3)",
    "application": "Commercial Plinths, Building Skirts, Monument Signs, Retaining Veneers",
    "priceBase": 3.25,
    "inStock": true,
    "image": "./static/images/products/retaining-facade-4.jpg",
    "description": "4-inch thin-footprint architectural block with rugged quarry-chiseled rockface texture. Imparts the solid permanence of natural stone masonry at a fraction of the weight.",
    "features": [
      "Authentic quarried rockface relief",
      "Standard 4-inch veneer cavity integration",
      "Integral water-repellent silane admixture"
    ]
  },
  {
    "id": "retaining-corner-block",
    "name": "Luxeris 90\u00b0 Universal Split-Face Corner Unit",
    "category": "Retaining & Facades",
    "type": "retaining",
    "sizeCategory": "8-inch",
    "dimensionsImperial": "8\" x 8\" x 16\"",
    "dimensionsMetric": "200 x 200 x 400 mm",
    "compressiveStrengthMpa": 35.0,
    "compressiveStrengthPsi": 5075,
    "astmStandard": "ASTM C1372 Grade A",
    "weightKg": 26.0,
    "weightLbs": 57.3,
    "unitsPerPallet": 48,
    "palletWeightLbs": 2750,
    "fireRatingHours": 4.0,
    "waterAbsorption": 4.7,
    "density": "Dual-Face Rockface (2280 kg/m\u00b3)",
    "application": "Retaining Wall 90\u00b0 Turns, End Pilasters, Architectural Columns",
    "priceBase": 6.85,
    "inStock": true,
    "image": "./static/images/products/retaining-corner-block.jpg",
    "description": "Dual-sided split face unit designed to create clean, rugged 90-degree corners and structural end pilasters without manual stone chipping on-site.",
    "features": [
      "Finished split texture on face and return end",
      "Interchangeable for left and right corners",
      "Eliminates jobsite cutting waste"
    ]
  },
  {
    "id": "retaining-cap-stone",
    "name": "Luxeris Double-Sided Chiseled Coping Cap Unit",
    "category": "Retaining & Facades",
    "type": "retaining",
    "sizeCategory": "12-inch",
    "dimensionsImperial": "14\" x 4\" x 18\"",
    "dimensionsMetric": "350 x 100 x 450 mm",
    "compressiveStrengthMpa": 32.0,
    "compressiveStrengthPsi": 4640,
    "astmStandard": "ASTM C1372 Cap Spec",
    "weightKg": 21.0,
    "weightLbs": 46.3,
    "unitsPerPallet": 64,
    "palletWeightLbs": 2963,
    "fireRatingHours": 3.0,
    "waterAbsorption": 4.9,
    "density": "Coping Stone Matrix (2260 kg/m\u00b3)",
    "application": "Wall Terminations, Parapets, Freestanding Garden Walls, Planters",
    "priceBase": 5.1,
    "inStock": true,
    "image": "./static/images/products/retaining-cap-stone.jpg",
    "description": "Universal protective coping unit featuring chiseled rockface finishes on both front and back edges. Protects retaining wall core gravels from surface stormwater erosion.",
    "features": [
      "Double-sided rockface chisel finish",
      "Built-in drip edge groove prevents staining",
      "Secured with high-strength structural polyurethane adhesive"
    ]
  },
  {
    "id": "cmu-solid-10",
    "name": "Luxeris 10\" Solid Heavy-Duty Foundation Block",
    "category": "Solid Concrete Blocks",
    "type": "solid",
    "sizeCategory": "10-inch",
    "dimensionsImperial": "10\" x 8\" x 16\"",
    "dimensionsMetric": "250 x 200 x 400 mm",
    "compressiveStrengthMpa": 36.0,
    "compressiveStrengthPsi": 5220,
    "astmStandard": "ASTM C90 Heavy-Duty",
    "weightKg": 36.8,
    "weightLbs": 81.1,
    "unitsPerPallet": 48,
    "palletWeightLbs": 3893,
    "fireRatingHours": 4.0,
    "waterAbsorption": 4.5,
    "density": "Heavy Weight (2320 kg/m\u00b3)",
    "application": "Load-Bearing, Heavy Retaining, Deep Sub-grade Foundations",
    "priceBase": 6.45,
    "inStock": true,
    "image": "./static/images/products/cmu-solid-10.jpg",
    "description": "Dense monolithic 10-inch concrete block engineered for high-load bearing commercial basements, bridge abutments, and continuous grade beams.",
    "features": [
      "5,220 PSI certified load rating",
      "High shear friction monolithic core",
      "ASTM C90 heavy-duty certified"
    ]
  },
  {
    "id": "cmu-hollow-10",
    "name": "Luxeris 10\" Two-Core Structural Hollow CMU",
    "category": "Hollow Core CMU",
    "type": "hollow",
    "sizeCategory": "10-inch",
    "dimensionsImperial": "10\" x 8\" x 16\"",
    "dimensionsMetric": "250 x 200 x 400 mm",
    "compressiveStrengthMpa": 30.0,
    "compressiveStrengthPsi": 4350,
    "astmStandard": "ASTM C90 Grade S",
    "weightKg": 21.2,
    "weightLbs": 46.7,
    "unitsPerPallet": 60,
    "palletWeightLbs": 2802,
    "fireRatingHours": 3.5,
    "waterAbsorption": 5.4,
    "density": "Normal Weight (2120 kg/m\u00b3)",
    "application": "Load-Bearing, Commercial Warehouses, Elevator Shafts",
    "priceBase": 4.1,
    "inStock": true,
    "image": "./static/images/products/cmu-hollow-10.jpg",
    "description": "10-inch standard two-core structural CMU. Provides extra grout cell capacity for heavy vertical rebar schedules in hurricane and seismic hazard zones.",
    "features": [
      "Large cellular grout cavities",
      "Accommodates #6 to #9 vertical rebar",
      "Autoclaved for minimal moisture expansion"
    ]
  },
  {
    "id": "retaining-wedge-10",
    "name": "Luxeris 10\" Interlocking Earth Retaining Block",
    "category": "Retaining & Facades",
    "type": "retaining",
    "sizeCategory": "10-inch",
    "dimensionsImperial": "10\" x 8\" x 16\"",
    "dimensionsMetric": "250 x 200 x 400 mm",
    "compressiveStrengthMpa": 34.0,
    "compressiveStrengthPsi": 4930,
    "astmStandard": "ASTM C1372 Segmental Retaining",
    "weightKg": 31.5,
    "weightLbs": 69.4,
    "unitsPerPallet": 40,
    "palletWeightLbs": 2776,
    "fireRatingHours": 4.0,
    "waterAbsorption": 4.8,
    "density": "Split-Rock Heavy Matrix (2290 kg/m\u00b3)",
    "application": "Highway Slopes, Industrial Grade Changes, Terraced Retention",
    "priceBase": 5.75,
    "inStock": true,
    "image": "./static/images/products/retaining-wedge-10.jpg",
    "description": "10-inch depth rear-lipped segmental retaining wall unit. Optimally balanced for contractor handling and structural slope retention.",
    "features": [
      "Rear alignment locking lip",
      "Fractured quarry rock face texture",
      "High shear resistance between courses"
    ]
  },
  {
    "id": "custom-arch-mould",
    "name": "Luxeris Custom Architectural Engineered Unit",
    "category": "Retaining & Facades",
    "type": "retaining",
    "sizeCategory": "Custom Sizes",
    "dimensionsImperial": "Custom Engineered Dimensions (up to 24\")",
    "dimensionsMetric": "Custom Tolerances \u00b1 1.0 mm",
    "compressiveStrengthMpa": 45.0,
    "compressiveStrengthPsi": 6525,
    "astmStandard": "ASTM C90 / C140 Custom Profile",
    "weightKg": 28.5,
    "weightLbs": 62.8,
    "unitsPerPallet": 50,
    "palletWeightLbs": 3140,
    "fireRatingHours": 4.0,
    "waterAbsorption": 4.0,
    "density": "Ultra-Dense (2380 kg/m\u00b3)",
    "application": "Architectural Feature Facades, Historic Restoration, Civil Monuments",
    "priceBase": 9.5,
    "inStock": true,
    "image": "./static/images/products/custom-arch-mould.jpg",
    "description": "Precision factory-molded custom architectural masonry units fabricated to custom engineering CAD drawings, chamfers, and reveal specifications.",
    "features": [
      "Bespoke architect molds and chamfer details",
      "Tight \u00b1 1.0mm laser-verified dimensional tolerances",
      "High strength 45 MPa dense mix design"
    ]
  },
  {
    "id": "custom-clay-special",
    "name": "Luxeris Custom Radial & Bullnose Engineering Brick",
    "category": "Engineering & Clay Bricks",
    "type": "clay",
    "sizeCategory": "Custom Sizes",
    "dimensionsImperial": "Custom Special Shapes (Bullnose, Cant, Radial)",
    "dimensionsMetric": "Bespoke Kiln Fired Dimensions",
    "compressiveStrengthMpa": 60.0,
    "compressiveStrengthPsi": 8700,
    "astmStandard": "ASTM C216 Type FBA Custom",
    "weightKg": 3.8,
    "weightLbs": 8.4,
    "unitsPerPallet": 350,
    "palletWeightLbs": 2940,
    "fireRatingHours": 4.0,
    "waterAbsorption": 4.2,
    "density": "Vitrified Extruded Clay (2300 kg/m\u00b3)",
    "application": "Special Arches, Radial Columns, Window Surrounds, Chimneys",
    "priceBase": 4.2,
    "inStock": true,
    "image": "./static/images/products/custom-clay-special.jpg",
    "description": "Special shaped engineering clay bricks fired for circular columns, bullnose edges, plinths, and bespoke historic restorative masonry profiles.",
    "features": [
      "Factory-formed custom radial and bullnose profiles",
      "Vitrified severe weathering (SW) rated clay body",
      "Zero on-site masonry cutting required"
    ]
  }
];

let productsData = [...DEFAULT_PRODUCTS];
window.productsData = productsData;

let activeFilters = {
  type: "all",
  sizeCategory: "all",
  minStrength: 0,
  application: "all",
  search: "",
  sortBy: "strength-desc",
  viewMode: "grid" // 'grid' or 'table'
};
window.activeFilters = activeFilters;
let currentModalChart = null;

async function initProducts() {
  if (!productsData || productsData.length === 0) {
    productsData = [...DEFAULT_PRODUCTS];
    window.productsData = productsData;
  }
  
  setupProductEventListeners();
  renderProducts();

  // Asynchronously fetch fresh data if available from server
  await fetchProducts();
}

async function fetchProducts() {
  try {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const json = await res.json();
    if (json && Array.isArray(json.products) && json.products.length > 0) {
      productsData = json.products;
      window.productsData = productsData;
      if (typeof populateProductDropdown === "function") {
        populateProductDropdown();
      }
      renderProducts();
    }
  } catch (err) {
    console.info("Using verified embedded product dataset:", err.message);
    if (typeof populateProductDropdown === "function") {
      populateProductDropdown();
    }
  }
}

function matchProductSize(p, sizeCategory) {
  if (!sizeCategory || sizeCategory === "all") return true;
  const s = sizeCategory.toLowerCase().trim();
  const cat = (p.sizeCategory || "").toLowerCase().trim();
  
  if (s === "4-inch" || s === "4") return cat === "4-inch" || cat.includes("4-inch");
  if (s === "6-inch" || s === "6") return cat === "6-inch" || cat.includes("6-inch");
  if (s === "8-inch" || s === "8") return cat === "8-inch" || cat.includes("8-inch");
  if (s === "10-inch" || s === "10") return cat === "10-inch" || cat.includes("10-inch");
  if (s === "12-inch" || s === "12") return cat === "12-inch" || cat.includes("12-inch");
  if (s === "custom" || s === "custom sizes") return cat === "custom sizes" || cat.includes("custom");

  return cat === s || cat.includes(s);
}

function matchProductApplication(p, appCategory) {
  if (!appCategory || appCategory === "all") return true;
  const target = appCategory.toLowerCase().trim();
  const text = ((p.application || "") + " " + (p.description || "") + " " + (p.category || "") + " " + (p.type || "")).toLowerCase();

  if (target === "structural" || target.includes("structural")) {
    return text.includes("structural") || text.includes("load-bearing") || text.includes("foundation") || text.includes("shear") || p.type === "solid" || p.type === "hollow";
  }
  if (target === "load-bearing" || target.includes("load-bearing") || target.includes("bearing")) {
    return text.includes("load-bearing") || text.includes("shear") || text.includes("gravity") || text.includes("structural");
  }
  if (target === "partition" || target.includes("partition")) {
    return text.includes("partition") || text.includes("corridor") || text.includes("infill") || text.includes("non-loadbearing") || text.includes('4"');
  }
  if (target === "commercial" || target.includes("commercial")) {
    return text.includes("commercial") || text.includes("warehouse") || text.includes("industrial") || text.includes("terminal") || text.includes("port") || text.includes("office");
  }
  if (target === "residential" || target.includes("residential")) {
    return text.includes("residential") || text.includes("housing") || text.includes("veneer") || text.includes("facing") || text.includes("driveway") || text.includes("garden");
  }
  if (target === "paving" || target.includes("paving") || target.includes("landscaping")) {
    return text.includes("paver") || text.includes("paving") || text.includes("traffic") || text.includes("walkway") || text.includes("plaza") || text.includes("landscaping") || p.type === "pavers";
  }
  if (target === "retaining" || target.includes("retaining")) {
    return text.includes("retaining") || text.includes("gravity") || text.includes("terrace") || text.includes("slope") || text.includes("abutment") || text.includes("keystone") || p.type === "retaining";
  }
  if (target === "facade" || target.includes("facade") || target.includes("architectural")) {
    return text.includes("facade") || text.includes("facing") || text.includes("veneer") || text.includes("cladding") || text.includes("architectural") || text.includes("linear") || p.type === "clay";
  }

  return text.includes(target);
}

function matchProductSearch(p, query) {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  if (!q) return true;

  const sku = (p.id || "").toLowerCase();
  const luxSku = ("lx-" + (p.id || "")).toLowerCase();
  const name = (p.name || "").toLowerCase();
  const cat = (p.category || "").toLowerCase();
  const ptype = (p.type || "").toLowerCase();
  const dimImp = (p.dimensionsImperial || "").toLowerCase();
  const dimMet = (p.dimensionsMetric || "").toLowerCase();
  const strengthMpa = (p.compressiveStrengthMpa + " mpa").toLowerCase();
  const strengthPsi = (p.compressiveStrengthPsi + " psi").toLowerCase();
  const astm = (p.astmStandard || "").toLowerCase();
  const desc = (p.description || "").toLowerCase();
  const app = (p.application || "").toLowerCase();
  const features = Array.isArray(p.features) ? p.features.join(" ").toLowerCase() : "";

  const searchable = `${sku} ${luxSku} ${name} ${cat} ${ptype} ${dimImp} ${dimMet} ${strengthMpa} ${strengthPsi} ${astm} ${desc} ${app} ${features}`;

  const tokens = q.split(/\s+/).filter(Boolean);
  return tokens.every(token => searchable.includes(token));
}

function clearProductSearch() {
  activeFilters.search = "";
  const searchInput = document.getElementById("products-search-input");
  const clearBtn = document.getElementById("clear-search-btn");
  if (searchInput) {
    searchInput.value = "";
    searchInput.focus();
  }
  if (clearBtn) clearBtn.classList.add("hidden");
  renderProducts();
}
window.clearProductSearch = clearProductSearch;

function filterProductsByType(type) {
  if (!type) type = "all";

  // Amber highlight on active category button
  const typeButtons = document.querySelectorAll(".filter-type-btn");
  typeButtons.forEach(btn => {
    if (btn.dataset.type === type) {
      btn.classList.add("active", "bg-amber-500", "text-slate-950", "font-bold");
      btn.classList.remove("bg-slate-800", "text-slate-300");
    } else {
      btn.classList.remove("active", "bg-amber-500", "text-slate-950", "font-bold");
      btn.classList.add("bg-slate-800", "text-slate-300");
    }
  });

  activeFilters.type = type;

  // If a specific dimension was selected that has 0 products in this new category, reset to 'all'
  if (type !== "all" && activeFilters.sizeCategory !== "all") {
    const hasSizeMatch = productsData.some(p => p.type && p.type.toLowerCase() === type.toLowerCase() && matchProductSize(p, activeFilters.sizeCategory));
    if (!hasSizeMatch) {
      activeFilters.sizeCategory = "all";
      const sizeSelect = document.getElementById("filter-size-select");
      if (sizeSelect) sizeSelect.value = "all";
    }
  }

  // If a minimum strength was selected that has 0 products in this new category, reset to 0
  if (type !== "all" && activeFilters.minStrength > 0) {
    const hasStrMatch = productsData.some(p => p.type && p.type.toLowerCase() === type.toLowerCase() && (p.compressiveStrengthMpa || 0) >= activeFilters.minStrength);
    if (!hasStrMatch) {
      activeFilters.minStrength = 0;
      const strSelect = document.getElementById("filter-strength-select");
      if (strSelect) strSelect.value = "0";
    }
  }

  // If an application was selected that has 0 products in this new category, reset to 'all'
  if (type !== "all" && activeFilters.application !== "all") {
    const hasAppMatch = productsData.some(p => p.type && p.type.toLowerCase() === type.toLowerCase() && matchProductApplication(p, activeFilters.application));
    if (!hasAppMatch) {
      activeFilters.application = "all";
      const appSelect = document.getElementById("filter-app-select");
      if (appSelect) appSelect.value = "all";
    }
  }

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
  window.activeFilters = activeFilters;

  const sizeSelect = document.getElementById("filter-size-select");
  const strengthSelect = document.getElementById("filter-strength-select");
  const appSelect = document.getElementById("filter-app-select");
  const searchInput = document.getElementById("products-search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  const sortSelect = document.getElementById("products-sort-select");

  if (sizeSelect) sizeSelect.value = "all";
  if (strengthSelect) strengthSelect.value = "0";
  if (appSelect) appSelect.value = "all";
  if (searchInput) searchInput.value = "";
  if (clearSearchBtn) clearSearchBtn.classList.add("hidden");
  if (sortSelect) sortSelect.value = "strength-desc";

  const typeButtons = document.querySelectorAll(".filter-type-btn");
  typeButtons.forEach(btn => {
    if (btn.dataset.type === "all") {
      btn.classList.add("active", "bg-amber-500", "text-slate-950", "font-bold");
      btn.classList.remove("bg-slate-800", "text-slate-300");
    } else {
      btn.classList.remove("active", "bg-amber-500", "text-slate-950", "font-bold");
      btn.classList.add("bg-slate-800", "text-slate-300");
    }
  });

  renderProducts();
}

function resetSubFiltersKeepType() {
  activeFilters.sizeCategory = "all";
  activeFilters.minStrength = 0;
  activeFilters.application = "all";
  activeFilters.search = "";
  window.activeFilters = activeFilters;

  const sizeSelect = document.getElementById("filter-size-select");
  const strengthSelect = document.getElementById("filter-strength-select");
  const appSelect = document.getElementById("filter-app-select");
  const searchInput = document.getElementById("products-search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");

  if (sizeSelect) sizeSelect.value = "all";
  if (strengthSelect) strengthSelect.value = "0";
  if (appSelect) appSelect.value = "all";
  if (searchInput) searchInput.value = "";
  if (clearSearchBtn) clearSearchBtn.classList.add("hidden");

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
    btn.onclick = (e) => {
      e.preventDefault();
      filterProductsByType(btn.dataset.type);
    };
  });

  // Size category select
  const sizeSelect = document.getElementById("filter-size-select");
  if (sizeSelect) {
    sizeSelect.onchange = (e) => {
      activeFilters.sizeCategory = e.target.value;
      renderProducts();
    };
  }

  // Strength filter
  const strengthSelect = document.getElementById("filter-strength-select");
  if (strengthSelect) {
    strengthSelect.onchange = (e) => {
      activeFilters.minStrength = parseFloat(e.target.value) || 0;
      renderProducts();
    };
  }

  // Application select
  const appSelect = document.getElementById("filter-app-select");
  if (appSelect) {
    appSelect.onchange = (e) => {
      activeFilters.application = e.target.value;
      renderProducts();
    };
  }

  // Search input with real-time updates and clear button
  const searchInput = document.getElementById("products-search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  if (searchInput) {
    searchInput.oninput = (e) => {
      activeFilters.search = e.target.value.trim();
      if (clearSearchBtn) {
        if (activeFilters.search.length > 0) {
          clearSearchBtn.classList.remove("hidden");
        } else {
          clearSearchBtn.classList.add("hidden");
        }
      }
      renderProducts();
    };
  }

  // Sort select
  const sortSelect = document.getElementById("products-sort-select");
  if (sortSelect) {
    sortSelect.onchange = (e) => {
      activeFilters.sortBy = e.target.value;
      renderProducts();
    };
  }

  // View toggle
  const gridViewBtn = document.getElementById("view-grid-btn");
  const tableViewBtn = document.getElementById("view-table-btn");
  if (gridViewBtn) {
    gridViewBtn.onclick = () => setProductViewMode("grid");
  }
  if (tableViewBtn) {
    tableViewBtn.onclick = () => setProductViewMode("table");
  }

  // Reset filters
  const resetBtn = document.getElementById("reset-filters-btn");
  if (resetBtn) {
    resetBtn.onclick = (e) => {
      if (e) e.preventDefault();
      resetProductFilters();
    };
  }
}

window.filterProductsByType = filterProductsByType;
window.resetProductFilters = resetProductFilters;
window.resetSubFiltersKeepType = resetSubFiltersKeepType;
window.setProductViewMode = setProductViewMode;
window.matchProductSize = matchProductSize;
window.matchProductApplication = matchProductApplication;
window.matchProductSearch = matchProductSearch;

function getFilteredProducts() {
  return productsData.filter(p => {
    // 1. Category type match
    if (activeFilters.type !== "all" && p.type.toLowerCase() !== activeFilters.type.toLowerCase()) {
      return false;
    }
    // 2. Dimension / Size match
    if (activeFilters.sizeCategory !== "all") {
      if (!matchProductSize(p, activeFilters.sizeCategory)) {
        return false;
      }
    }
    // 3. Minimum strength match
    if (activeFilters.minStrength > 0 && (p.compressiveStrengthMpa || 0) < activeFilters.minStrength) {
      return false;
    }
    // 4. Application match
    if (activeFilters.application !== "all") {
      if (!matchProductApplication(p, activeFilters.application)) {
        return false;
      }
    }
    // 5. Search keyword match (name, code, category, dimension, strength, ASTM, description)
    if (activeFilters.search) {
      if (!matchProductSearch(p, activeFilters.search)) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    switch (activeFilters.sortBy) {
      case "strength-desc":
        return ((b.compressiveStrengthMpa || 0) - (a.compressiveStrengthMpa || 0)) || (a.name || "").localeCompare(b.name || "");
      case "strength-asc":
        return ((a.compressiveStrengthMpa || 0) - (b.compressiveStrengthMpa || 0)) || (a.name || "").localeCompare(b.name || "");
      case "name-asc":
        return (a.name || "").localeCompare(b.name || "");
      case "name-desc":
        return (b.name || "").localeCompare(a.name || "");
      case "price-asc":
        return ((a.priceBase != null ? a.priceBase : Infinity) - (b.priceBase != null ? b.priceBase : Infinity)) || (a.name || "").localeCompare(b.name || "");
      case "price-desc":
        return ((b.priceBase != null ? b.priceBase : -Infinity) - (a.priceBase != null ? a.priceBase : -Infinity)) || (a.name || "").localeCompare(b.name || "");
      case "weight-desc":
        return ((b.weightLbs || 0) - (a.weightLbs || 0)) || (a.name || "").localeCompare(b.name || "");
      default:
        return ((b.compressiveStrengthMpa || 0) - (a.compressiveStrengthMpa || 0)) || (a.name || "").localeCompare(b.name || "");
    }
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
    const categoryLabels = {
      all: "All Types",
      solid: "Solid Concrete Blocks",
      hollow: "Hollow Core CMU",
      clay: "Engineering & Clay Bricks",
      eco: "Eco-Smart & Fly Ash",
      pavers: "Heavy-Duty Pavers",
      retaining: "Retaining & Facades"
    };
    const currentCategoryTitle = categoryLabels[activeFilters.type] || "Selected Category";

    let activeFilterParts = [];
    if (activeFilters.type !== "all") activeFilterParts.push(`Category: <span class="text-amber-400 font-bold">${currentCategoryTitle}</span>`);
    if (activeFilters.sizeCategory !== "all") activeFilterParts.push(`Dimension: <span class="text-amber-400 font-bold">${activeFilters.sizeCategory}</span>`);
    if (activeFilters.minStrength > 0) activeFilterParts.push(`Min Strength: <span class="text-amber-400 font-bold">${activeFilters.minStrength}+ MPa</span>`);
    if (activeFilters.application !== "all") activeFilterParts.push(`Application: <span class="text-amber-400 font-bold">${activeFilters.application}</span>`);
    if (activeFilters.search) activeFilterParts.push(`Search: "<span class="text-amber-400 font-bold">${activeFilters.search}</span>"`);

    const filtersSummaryHtml = activeFilterParts.length > 0 
      ? `<div class="mt-3 flex flex-wrap justify-center items-center gap-2 text-xs font-mono text-slate-300">
           <span class="text-slate-400">Active Filters:</span>
           ${activeFilterParts.map(f => `<span class="px-2.5 py-1 bg-slate-950 border border-slate-700 rounded">${f}</span>`).join(" ")}
         </div>`
      : "";

    container.innerHTML = `
      <div class="col-span-full py-16 px-6 text-center bg-slate-900 border border-slate-800 rounded-lg shadow-xl">
        <i data-lucide="shield-alert" class="w-14 h-14 text-amber-500 mx-auto mb-3"></i>
        <h3 class="text-xl font-heading text-slate-100 uppercase tracking-wide">NO PRODUCTS FOUND</h3>
        <p class="text-xs font-mono text-slate-400 mt-2 max-w-lg mx-auto leading-relaxed">
          No certified masonry units match all your currently applied filter criteria. Try broadening your dimensions, reducing minimum compressive strength, or resetting your filters.
        </p>
        ${filtersSummaryHtml}
        <div class="mt-6 flex flex-wrap justify-center items-center gap-3">
          ${activeFilters.search ? `
            <button onclick="clearProductSearch()" class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded border border-slate-700 font-mono transition-all cursor-pointer flex items-center gap-1.5">
              <i data-lucide="x" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>Clear Search Keyword</span>
            </button>
          ` : (activeFilters.type !== "all" ? `
            <button onclick="resetSubFiltersKeepType()" class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded border border-slate-700 font-mono transition-all cursor-pointer flex items-center gap-1.5">
              <i data-lucide="filter-x" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>Show All ${currentCategoryTitle}</span>
            </button>
          ` : '')}
          <button id="empty-reset-filters-btn" onclick="resetProductFilters()" class="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded font-mono shadow-md transition-all cursor-pointer flex items-center gap-1.5">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
            <span>Reset All Filters</span>
          </button>
        </div>
      </div>
    `;
    if (window.lucide && typeof lucide.createIcons === "function") {
      lucide.createIcons();
    }
    return;
  }

  if (activeFilters.viewMode === "table") {
    renderTableView(filtered, container);
  } else {
    renderGridView(filtered, container);
  }

  if (window.lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }
}

function getAvailableSizesForProduct(p) {
  let sizes = ['4"', '6"', '8"', '10"', '12"', 'Custom'];
  return sizes.map(s => {
    const sClean = s.replace('"', '').toLowerCase();
    const isCurrent = (p.sizeCategory && p.sizeCategory.toLowerCase().includes(sClean)) ||
                      (p.dimensionsImperial && p.dimensionsImperial.includes(s.replace('"', '')));
    return `<span class="size-pill ${isCurrent ? 'current' : ''}">${s}</span>`;
  }).join("");
}


function renderGridView(products, container) {
  let html = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">`;

  products.forEach(p => {
    const strengthPercent = Math.min(100, Math.round((p.compressiveStrengthMpa / 60) * 100));
    const isHighStrength = p.compressiveStrengthMpa >= 35.0;
    const prodImg = p.image || "./static/images/products/hollow_cmu_block.jpg";
    const availableSizesHtml = getAvailableSizesForProduct(p);

    const categoryBadgeClass = 
      p.type === 'clay' ? 'bg-orange-950 text-orange-200 border border-orange-700' :
      p.type === 'solid' ? 'bg-slate-900 text-slate-200 border border-slate-700' :
      p.type === 'pavers' ? 'bg-sky-950 text-sky-200 border border-sky-700' :
      p.type === 'retaining' ? 'bg-emerald-950 text-emerald-200 border border-emerald-700' :
      'bg-indigo-950 text-indigo-200 border border-indigo-700';

    html += `
      <div class="architectural-product-card group flex flex-col justify-between">
        
        <!-- Professional Masonry Photography with Dark Gradient Vignette -->
        <div class="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
          <img src="${prodImg}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" onerror="this.onerror=null; this.src='./static/images/products/hollow_cmu_block.jpg'">
          <div class="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-transparent to-black/35"></div>
          
          <!-- Category & Product Code Badges -->
          <div class="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span class="inline-block text-[10px] font-mono-tech uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow ${categoryBadgeClass}">
              ${p.category}
            </span>
            <span class="text-[9px] font-mono bg-slate-950/90 text-amber-400 border border-slate-700 px-1.5 py-0.5 rounded font-bold tracking-wider">
              LX-${p.id.toUpperCase()}
            </span>
          </div>

          <!-- ASTM Standard Badge -->
          <div class="absolute top-3 right-3">
            <span class="text-[10px] font-mono-tech font-bold text-amber-400 bg-slate-950/95 px-2 py-0.5 border border-amber-500/40 rounded shadow">
              ${(p.astmStandard || 'ASTM C90').split('/')[0].trim()}
            </span>
          </div>

          <!-- Clear Dimension & Base Price Floating Pill -->
          <div class="absolute bottom-2.5 left-3 right-3 flex justify-between items-end text-xs font-mono">
            <span class="text-white font-bold bg-slate-950/90 backdrop-blur px-2.5 py-1 rounded border border-slate-700 shadow flex items-center gap-1.5">
              <i data-lucide="ruler" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>${p.dimensionsImperial}</span>
            </span>
            <span class="text-emerald-400 font-mono-tech font-bold bg-slate-950/90 backdrop-blur px-2.5 py-1 rounded border border-slate-700 shadow">
              $${p.priceBase ? p.priceBase.toFixed(2) : '2.85'} / ea
            </span>
          </div>
        </div>

        <!-- Product Body: Title, Dimensions, Material Description, Applications -->
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

          <!-- Material Engineering Description -->
          <p class="text-xs font-mono text-slate-300 line-clamp-2 leading-relaxed">
            ${p.description}
          </p>

          <!-- Available Applications -->
          <div class="bg-[#070b16] border border-slate-800 rounded p-2 text-xs font-mono text-slate-300 flex items-start gap-1.5">
            <i data-lucide="layers" class="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0"></i>
            <div>
              <span class="text-slate-400 uppercase font-bold text-[10px] block">Available Applications:</span>
              <span class="text-slate-200 leading-tight">${p.application || 'Structural Construction, Load-Bearing Walls'}</span>
            </div>
          </div>

          <!-- Available Sizes Row -->
          <div class="space-y-1 pt-1">
            <span class="text-[10px] font-mono uppercase text-slate-400 font-bold block">Available Modular Sizes:</span>
            <div class="flex flex-wrap gap-1">
              ${availableSizesHtml}
            </div>
          </div>

          <!-- Material Strength Rating Gauge -->
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
              <strong class="text-slate-200">${(p.density || 'Normal Weight').split('(')[0].trim()}</strong>
            </div>
          </div>
        </div>

        <!-- Technical Specification Links & Request Quote Buttons -->
        <div class="p-5 pt-1 grid grid-cols-2 gap-2 mt-auto">
          <button onclick="openTdsModal('${p.id}')" class="px-3 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-bold font-mono uppercase tracking-wider rounded border border-slate-700 hover:border-amber-400 flex items-center justify-center gap-1.5 transition-all cursor-pointer">
            <i data-lucide="file-text" class="w-3.5 h-3.5 text-amber-400"></i>
            <span>View Details</span>
          </button>
          <button onclick="requestQuoteForProduct('${p.id}')" class="btn-amber-freight justify-center text-xs py-2.5 font-bold cursor-pointer flex items-center gap-1.5">
            <i data-lucide="calculator" class="w-3.5 h-3.5 text-slate-950"></i>
            <span>Request a Quote</span>
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
    const prodImg = p.image || "./static/images/products/solid_concrete_block.jpg";
    html += `
      <tr class="transition-colors hover:bg-slate-800/40">
        <td class="p-2.5">
          <img src="${prodImg}" alt="${p.name}" class="w-12 h-10 object-cover rounded border border-slate-700 shadow-sm" loading="lazy" onerror="this.onerror=null; this.src='./static/images/products/hollow_cmu_block.jpg'">
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
    let p = null;
    try {
      const res = await fetch(`/api/products/${productId}`);
      if (res.ok) p = await res.json();
    } catch(e) {}
    if (!p) {
      p = productsData.find(x => x.id === productId) || DEFAULT_PRODUCTS.find(x => x.id === productId);
    }
    if (!p) throw new Error("Product not found");

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
          <img src="${p.image || './static/images/products/solid_concrete_block.jpg'}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src='./static/images/products/solid_concrete_block.jpg'">
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
  if (typeof window.navigateTo === "function") {
    window.navigateTo("pricing");
  } else {
    window.location.hash = "pricing";
  }
  setTimeout(() => {
    const productSelect = document.getElementById("calc-product-select");
    if (productSelect) {
      productSelect.value = productId;
      productSelect.dispatchEvent(new Event("change"));
    }
    const calcSection = document.getElementById("pricing");
    if (calcSection) calcSection.scrollIntoView({ behavior: 'smooth' });
    if (typeof showIndustrialToast === "function") {
      showIndustrialToast("Product transferred to Bulk Freight Takeoff.", "info");
    }
  }, 100);
}

function requestSampleFromModal(productId, productName) {
  closeTdsModal();
  if (typeof window.navigateTo === "function") {
    window.navigateTo("contact");
  } else {
    window.location.hash = "contact";
  }
  setTimeout(() => {
    const enquiryTypeSelect = document.getElementById("enquiry-type");
    if (enquiryTypeSelect) enquiryTypeSelect.value = "Free Contractor Sample Box & Mockup Consultation";

    const prodSelect = document.getElementById("contact-product-select");
    if (prodSelect) prodSelect.value = productId;

    const notesEl = document.getElementById("contact-notes");
    if (notesEl) notesEl.value = `Requesting official boxed sample kit of ${productName} for architectural review and client mock-up approval.`;

    const contactSection = document.getElementById("commercial-enquiry-form") || document.getElementById("contact");
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    if (typeof showIndustrialToast === "function") {
      showIndustrialToast(`Sample kit request configured for ${productName}.`, "info");
    }
  }, 100);
}

function openCertificationsModal() {
  const modal = document.getElementById("tds-modal");
  const content = document.getElementById("tds-modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="p-6 md:p-10 space-y-6 bg-slate-900 text-slate-200">
      <div class="flex items-center justify-between border-b-2 border-amber-500 pb-5">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-amber-500 text-slate-950 font-heading font-black text-2xl flex items-center justify-center rounded">
            LX
          </div>
          <div>
            <h2 class="text-2xl font-heading text-slate-100">LUXERIS QUALITY METROLOGY &amp; CERTIFICATIONS</h2>
            <div class="text-[11px] font-mono text-slate-400">Accredited Laboratory Testing Standards • ASTM / ISO Compliance</div>
          </div>
        </div>
        <button onclick="closeTdsModal()" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono text-xs cursor-pointer">
          ✕ Close
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div class="bg-slate-950 p-4 rounded border border-slate-800 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-amber-400 font-bold">ASTM C90</span>
            <span class="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded text-[10px] font-bold">ACTIVE CERTIFIED</span>
          </div>
          <h4 class="text-white font-bold text-sm">Loadbearing Concrete Masonry Units</h4>
          <p class="text-slate-400 text-[11px] leading-relaxed">
            Standard specification for hollow and solid concrete masonry units. Minimum individual compressive strength threshold: 13.1 MPa (1,900 PSI); net area average threshold: 14.8 MPa (2,150 PSI). Luxeris units consistently deliver 24.0 – 42.0 MPa net compressive strength.
          </p>
        </div>

        <div class="bg-slate-950 p-4 rounded border border-slate-800 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-amber-400 font-bold">ASTM C216</span>
            <span class="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded text-[10px] font-bold">ACTIVE CERTIFIED</span>
          </div>
          <h4 class="text-white font-bold text-sm">Facing Brick (Solid Masonry Units)</h4>
          <p class="text-slate-400 text-[11px] leading-relaxed">
            Severe Weathering (Grade SW) specification. Requires 20.7 MPa individual minimum strength and under 17% boiling water absorption. Luxeris vitrified ceramic units test at 55.4 MPa with &lt; 4.2% water absorption.
          </p>
        </div>

        <div class="bg-slate-950 p-4 rounded border border-slate-800 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-amber-400 font-bold">ASTM C936</span>
            <span class="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded text-[10px] font-bold">ACTIVE CERTIFIED</span>
          </div>
          <h4 class="text-white font-bold text-sm">Solid Concrete Interlocking Paving Units</h4>
          <p class="text-slate-400 text-[11px] leading-relaxed">
            Industrial and heavy port vehicle pavement standard. Requires 50.0 MPa minimum compressive strength and 50-cycle freeze-thaw endurance. Luxeris armor pavers deliver 55.0 – 62.0 MPa.
          </p>
        </div>

        <div class="bg-slate-950 p-4 rounded border border-slate-800 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-amber-400 font-bold">ISO/IEC 17025</span>
            <span class="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded text-[10px] font-bold">ACCREDITED LAB</span>
          </div>
          <h4 class="text-white font-bold text-sm">Calibration &amp; Testing Competence</h4>
          <p class="text-slate-400 text-[11px] leading-relaxed">
            All in-house 300-ton hydraulic compression test frames, load cells, servo pacing valves, and laser digital calipers are calibrated and certified annually by ISO/IEC 17025 accredited metrology authorities.
          </p>
        </div>
      </div>

      <div class="flex justify-between items-center pt-4 border-t border-slate-800">
        <button onclick="downloadCsiDivision04Spec('all')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer">
          <i data-lucide="download" class="w-4 h-4"></i> Download Full CSI 04 Spec Package
        </button>
        <button onclick="closeTdsModal()" class="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs uppercase rounded cursor-pointer">
          Done
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
  if (window.lucide) lucide.createIcons();
}

function openQualityTestingModal(pillarTitle) {
  const modal = document.getElementById("tds-modal");
  const content = document.getElementById("tds-modal-content");
  if (!modal || !content) return;

  const testingPillars = {
    "3000 kN Automated Compression Rig": {
      title: "3000 kN Automated Hydraulic Compression Rig",
      standard: "ASTM C140 / C39 / ISO 17025",
      calibration: "NIST-traceable Class 1 electronic load cell calibration every 90 days",
      procedure: "Specimens are mounted between spherically seated steel bearing platens. High-precision servo valves apply continuous load at 0.15–0.35 MPa/s until complete structural failure. Dual digital LVDTs capture real-time stress-strain deformation and modulus of rupture.",
      capacity: "3,000 kN (674,000 lbf) capacity; 0.05% measurement uncertainty",
      reporting: "Instantaneous digital load curves, acoustic micro-crack detection, automated mill test report generation."
    },
    "Brick Compression Testing": {
      title: "Full-Scale Brick Compression Testing",
      standard: "ASTM C216 / C67 Grade SW",
      calibration: "High-strength sulfur capped bearing faces per ASTM C67",
      procedure: "5 full-size face brick specimens are sampled per 50,000 unit production run. Sulfur capping ensures frictionless, plane-parallel load distribution under axial compressive loading until brittle fracture.",
      capacity: "Up to 55.4 MPa (8,035 PSI) peak compressive capacity verified",
      reporting: "Gross and net compressive strength, initial rate of absorption (IRA), and 5-hour boil absorption indices."
    },
    "Laboratory Material Inspection": {
      title: "Petrographic Aggregate & Sieve Inspection",
      standard: "ASTM C136 / C33 / C618",
      calibration: "ISO/IEC 17025 accredited laboratory balance & mechanical sieve shakers",
      procedure: "Continuous sieve analysis of dense crushed basalt, volcanic pozzolans, and Type I/II Portland cement. Petrographic thin-section microscopy verifies absence of reactive alkali-silica aggregates (ASR).",
      capacity: "Gradation ranges from 19mm top size down to 75µm (No. 200 sieve)",
      reporting: "Fineness modulus, specific gravity, water demand, and pozzolanic activity index."
    },
    "Industrial Measuring Instruments": {
      title: "Precision Metrology & Coordinate Scanning",
      standard: "ASTM C90 / C140 Dimensional Tolerances",
      calibration: "Mitutoyo digital vernier calipers calibrated to NIST gage blocks",
      procedure: "Robotic coordinate scanning lasers and digital calipers verify 6-point dimensions (length, width, height, face-shell thickness, web thickness, and perpendicularity) immediately after autoclave discharge.",
      capacity: "±0.01mm caliper resolution; ±1.5mm max allowable deviation per ASTM C90",
      reporting: "Web-to-face shell cross-sectional area ratios, equivalent web thickness, and corner squareness."
    },
    "Material Strength Testing": {
      title: "Flexural Tensile & Cyclic Environmental Testing",
      standard: "ASTM E518 / ASTM C1262 / ASTM C936",
      calibration: "Environmental climate chamber with NIST temperature & saline logging",
      procedure: "Prism beam three-point flexural bending evaluates mortar-to-unit bond strength. Accelerated freeze-thaw chamber subjects water-saturated units to 300 rapid thermal cycles (+4°C to -18°C) in a 3% saline bath.",
      capacity: "300 continuous freeze-thaw cycles; < 0.5% mass loss threshold",
      reporting: "Modulus of rupture (MOR), tensile bond strength, and freeze-thaw durability index."
    },
    "Mill Test Reports (MTR)": {
      title: "Mill Test Reports (MTR) & Production Batch Traceability",
      standard: "CSI Division 04 / ISO 9001:2015 Clause 8.5.2",
      calibration: "Serial barcode automated logging with weighbridge integration",
      procedure: "Every pallet cube is assigned a unique batch barcode linked to raw material mix tickets, autoclave chamber telemetry, 28-day break tests, and gross weighbridge weight tickets.",
      capacity: "100% digital batch archival for 25-year structural warranty records",
      reporting: "Official certified PDF test submittals for commercial architects, engineers of record, and building inspectors."
    }
  };

  const p = testingPillars[pillarTitle] || testingPillars["3000 kN Automated Compression Rig"];

  content.innerHTML = `
    <div class="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
          <i data-lucide="microscope" class="w-5 h-5"></i>
        </div>
        <div>
          <span class="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">Laboratory Quality Pillar</span>
          <h2 class="text-xl font-heading text-white">${p.title}</h2>
        </div>
      </div>
      <button onclick="closeTdsModal()" class="text-slate-400 hover:text-white p-2 rounded hover:bg-slate-800 transition-colors cursor-pointer" aria-label="Close modal">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
    </div>

    <div class="p-6 space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-slate-950 p-4 rounded border border-slate-800 space-y-1">
          <span class="text-slate-400 text-xs font-mono uppercase block">Governing Civil Standard:</span>
          <strong class="text-amber-400 font-mono text-sm">${p.standard}</strong>
        </div>
        <div class="bg-slate-950 p-4 rounded border border-slate-800 space-y-1">
          <span class="text-slate-400 text-xs font-mono uppercase block">Calibration Protocol:</span>
          <strong class="text-emerald-400 font-mono text-sm">${p.calibration}</strong>
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="text-sm font-mono text-amber-400 uppercase tracking-wider font-bold">Laboratory Testing Procedure</h3>
        <p class="text-xs font-mono text-slate-300 leading-relaxed bg-[#060912] p-4 rounded border border-slate-800">${p.procedure}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-slate-950 p-4 rounded border border-slate-800 space-y-1.5">
          <span class="text-slate-400 text-xs font-mono uppercase block">Testing Rig Capacity & Limits:</span>
          <p class="text-xs font-mono text-slate-200">${p.capacity}</p>
        </div>
        <div class="bg-slate-950 p-4 rounded border border-slate-800 space-y-1.5">
          <span class="text-slate-400 text-xs font-mono uppercase block">Engineering Reporting & Compliance:</span>
          <p class="text-xs font-mono text-slate-200">${p.reporting}</p>
        </div>
      </div>

      <div class="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-slate-800">
        <button onclick="downloadCsiDivision04Spec('all')" class="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-colors">
          <i data-lucide="download" class="w-4 h-4"></i> Download Full CSI 04 Spec Package
        </button>
        <button onclick="openCertificationsModal()" class="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-colors">
          <i data-lucide="award" class="w-4 h-4"></i> View All ASTM & ISO Certificates
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
  if (window.lucide) lucide.createIcons();
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
    const prodImg = p.image || "./static/images/products/solid_concrete_block.jpg";
    const astmInfo = getAstmMinimum(p.astmStandard);
    const safetyMargin = Math.round(((p.compressiveStrengthMpa - astmInfo.minMpa) / astmInfo.minMpa) * 100);

    html += `
      <tr class="hover:bg-slate-900/70 transition-colors border-b border-slate-800/80">
        <!-- SKU & Specimen -->
        <td class="p-3.5 font-mono text-xs whitespace-nowrap">
          <div class="flex items-center gap-2.5">
            <img src="${prodImg}" alt="${p.name}" class="w-10 h-8 object-cover rounded border border-slate-700 shrink-0" loading="lazy" onerror="this.onerror=null; this.src='./static/images/products/hollow_cmu_block.jpg'">
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
window.openCertificationsModal = openCertificationsModal;
window.openQualityTestingModal = openQualityTestingModal;


// Self-executing initialization ensuring immediate catalog display on page open
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initProducts();
  });
} else {
  initProducts();
}


function requestQuoteForProduct(productId) {
  if (typeof sendToBulkCalc === "function") {
    sendToBulkCalc(productId);
  }
}
window.requestQuoteForProduct = requestQuoteForProduct;
