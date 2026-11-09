# LUXERIS MASONRY & CONCRETE WORKS
### Architectural Bricks & Heavy Structural Concrete Blocks

A commercial-grade web application for **LUXERIS**, an architectural brick and heavy concrete block manufacturer. Built with a sturdy industrial layout, high-tensile material engineering aesthetics, real verified masonry photography, ASTM laboratory testing simulations, and live inquiry tracking.

---

## 🏗️ Brand & Architecture

### 1. Brand Identity
- **Company**: **LUXERIS MASONRY & CONCRETE WORKS**
- **Monogram**: **LX**
- **Tagline**: *Architectural Bricks & Heavy Structural Concrete Blocks • Est. 1984*
- **Dispatch Facilities**:
  - *Luxeris Main Kiln & Heavy Aggregate Works* (Denver, CO - 80-Ton Weighbridge, CB Ch. 19)
  - *Luxeris Architectural & Coastal Paver Terminal* (Tacoma, WA - 70-Ton Weighbridge, CB Ch. 21)
  - Daily Combined Kiln Capacity: **140,000 units/day**

---

### 2. High-Resolution Verified Imagery
- **Hero & Architecture**: Real high-end architectural masonry building envelopes (`images.unsplash.com`).
- **Product Photography**: Every product card in both Grid and Table view features verified high-resolution photography of solid concrete masonry units, hollow CMU cores, rich heritage red wirecut bricks, vitrified Class A engineering bricks, long linear Roman format bricks, and heavy-duty 80mm interlocking pavers.
- **Case Studies & Plants**: Authentic photography of intermodal container terminals, heavy retaining rail walls, civic courthouses, and commercial logistics freight yards.

---

### 3. Key Pages & Components

1. **Home & Product Strength (`#home`)**:
   - Hero section with compressive strength metrics: 55.4 MPa (8,035 PSI), 4-Hour ASTM E119 fire endurance, &lt; 4.2% water absorption.
   - **Interactive Hydraulic Compression Testing Rig**: ASTM C140 laboratory crush simulator with manual pressure lever (0–70 MPa), **Auto-Pump** mechanism, animated hydraulic ram platen deflection, and real-time **Canvas Stress-Strain Curve Plotter**.
   - ASTM standards grid (C90, C216, C140, E119, C936, LEED v4).
   - Major infrastructure case studies with real project photos.

2. **Products by Type & Size (`#products`)**:
   - Filter by **Type**: Solid Concrete Blocks, Hollow Core CMU, Engineering & Clay Bricks, Eco-Smart & Fly Ash, Heavy-Duty Pavers, Retaining Systems.
   - Filter by **Size Category**: Modular Brick (2.5"–4"), 4-inch, 6-inch, 8-inch, 12-inch Heavy, Large Format / Linear, and 60mm/80mm Pavers.
   - Filter by **Compressive Strength**: Any, ≥ 20 MPa, ≥ 30 MPa, ≥ 50 MPa.
   - Filter by **Application**: Load-Bearing, Foundation & Sub-Grade, Heavy Transit Paving, Retaining, Facades, Firewalls.
   - View modes: Photographic Card Grid view & dense Technical Spec Table view.
   - **Technical Data Sheet (TDS) Modal**: High-res product photo banner, dimension blueprints, core geometry, and Chart.js stress-strain curve.

3. **Master Spec Index (`#index`)**:
   - Complete numerical and alphabetical table of all 16 Luxeris models.
   - Filter chips for quick lookup by ASTM standard (ASTM C90, C216, C936, C1372, C1693).
   - Direct 1-click takeoff transfer to the Bulk Calculator or Technical Data Sheets.

4. **Bulk Pricing & Freight Logistics (`#pricing`)**:
   - 4-Tier volume discount schedule (up to 25% OFF for 31+ pallets).
   - **Interactive Calculator**: Direct units mode or Wall Area Takeoff (Length × Height in feet with 5% or 10% cutting waste buffer).
   - Automatic calculation of pallets, total dry weight (lbs & MT), number of 24-ton flatbed semi-trucks, volume discount savings, freight, and grand total.
   - One-click transfer to formal quote request.

5. **Contact & Commercial Enquiry (`#contact`)**:
   - Comprehensive contractor specification and tender bid submission form.
   - Blueprint and wall schedule file attachment upload simulation.
   - Asynchronous storage into SQLite (`enquiries.db`) with unique reference code generation (e.g. `ENQ-2026-2648`).
   - **Live Inquiry Status Tracker**: Real-time status lookup by Reference # (`Under Review`, `Quote Prepared`, `Sample Dispatched`).

---

## 🚀 Running the Web Application

The FastAPI server is running at:
```
http://127.0.0.1:8000
```

To run manually or restart:
```powershell
py -m uvicorn server:app --host 127.0.0.1 --port 8000
```
Or open [index.html](file:///c:/Users/Karan/Downloads/Brick%20&%20concrete%20block%20manufacturer/index.html) directly in any modern browser.
