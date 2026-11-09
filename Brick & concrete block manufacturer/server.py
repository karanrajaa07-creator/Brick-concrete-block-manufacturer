import os
import json
import math
from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, EmailStr
from typing import Optional, List

from database import init_db, create_enquiry, get_enquiry_by_ref, get_enquiry_stats

# Initialize database
init_db()

# Load products catalog
PRODUCTS_FILE = os.path.join(os.path.dirname(__file__), "data", "products.json")
def load_products():
    with open(PRODUCTS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

ALL_PRODUCTS = load_products()

app = FastAPI(
    title="Luxeris Masonry & Concrete Works API",
    description="Commercial Heavy Brick & Concrete Block Manufacturing Portal",
    version="2.0.0"
)

# Mount static files
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
os.makedirs(STATIC_DIR, exist_ok=True)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Models
class BulkCalcRequest(BaseModel):
    product_id: str
    calc_mode: Optional[str] = "units" # 'units', 'pallets', or 'dimensions'
    quantity: Optional[int] = 1000
    pallets: Optional[int] = None
    wall_length_ft: Optional[float] = None
    wall_height_ft: Optional[float] = None
    waste_percent: Optional[float] = 5.0
    freight_zone: Optional[str] = "regional" # local (0-50mi), regional (50-150mi), freight (150-350mi)
    offload_service: Optional[str] = "forklift" # standard_tailgate, forklift, boom_crane, yard_pickup

class EnquiryRequest(BaseModel):
    full_name: str
    company_name: str
    email: str
    phone: str
    contractor_license: Optional[str] = ""
    project_name: str
    project_type: str = "Commercial Construction"
    product_id: Optional[str] = ""
    product_name: Optional[str] = ""
    quantity: int = 1
    unit_type: Optional[str] = "units"
    delivery_zip: str
    delivery_city: Optional[str] = ""
    offload_method: str = "Truck-Mounted Moffett Forklift"
    target_date: Optional[str] = ""
    enquiry_type: str = "Bulk Price Quotation"
    blueprint_file: Optional[str] = ""
    notes: Optional[str] = ""
    estimated_total: Optional[float] = 0.0

@app.get("/")
def get_index():
    root_index = os.path.join(os.path.dirname(__file__), "index.html")
    if os.path.exists(root_index):
        return FileResponse(root_index)
    index_path = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "Luxeris Masonry API is online."}

@app.get("/api/products")
def get_products(
    type: Optional[str] = None,
    size_category: Optional[str] = None,
    min_strength: Optional[float] = None,
    application: Optional[str] = None,
    search: Optional[str] = None
):
    results = load_products()

    if type and type != "all":
        results = [p for p in results if p.get("type", "").lower() == type.lower()]

    if size_category and size_category != "all":
        results = [p for p in results if size_category.lower() in p.get("sizeCategory", "").lower()]

    if min_strength is not None and min_strength > 0:
        results = [p for p in results if p.get("compressiveStrengthMpa", 0) >= min_strength]

    if application and application != "all":
        results = [p for p in results if application.lower() in p.get("application", "").lower()]

    if search:
        s = search.lower().strip()
        results = [
            p for p in results
            if s in p.get("name", "").lower()
            or s in p.get("description", "").lower()
            or s in p.get("astmStandard", "").lower()
            or s in p.get("dimensionsImperial", "").lower()
            or s in p.get("dimensionsMetric", "").lower()
            or s in p.get("category", "").lower()
        ]

    return {
        "total": len(results),
        "products": results
    }

@app.get("/api/products/{product_id}")
def get_product_detail(product_id: str):
    products = load_products()
    product = next((p for p in products if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail=f"Product with id '{product_id}' not found")

    # Add technical stress-strain curve points for interactive chart
    peak_stress = product["compressiveStrengthMpa"]
    strain_at_peak = 0.0022
    curve_points = []
    for step in range(11):
        strain = (step / 10.0) * (strain_at_peak * 1.35)
        if strain <= strain_at_peak:
            stress = peak_stress * (2 * (strain / strain_at_peak) - (strain / strain_at_peak)**2)
        else:
            # softening post-peak
            ratio = (strain - strain_at_peak) / (strain_at_peak * 0.35)
            stress = peak_stress * (1 - 0.25 * ratio)
        curve_points.append({
            "strain": round(strain, 5),
            "stressMpa": round(max(0, stress), 2),
            "stressPsi": round(max(0, stress) * 145.038, 0)
        })

    return {
        **product,
        "stressStrainCurve": curve_points,
        "qualityAssurance": {
            "curingMethod": "Automated 48-hour high-pressure steam autoclaving",
            "batchTestingFrequency": "1 core crush test per 2,000 units produced (ASTM C140)",
            "rawAggregateSource": "Primary crushed basalt, coarse quartz sand, Type I/II Portland cement",
            "dimensionalTolerance": "± 1.5 mm (exceeds ASTM ± 3.0 mm allowable)",
            "leedCredits": "Contributes to MR Credit 4.1/4.2 (Recycled Content) and Regional Materials"
        }
    }

@app.post("/api/bulk-calculate")
def calculate_bulk(req: BulkCalcRequest):
    products = load_products()
    product = next((p for p in products if p["id"] == req.product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    units_per_pallet = product.get("unitsPerPallet", 100)
    unit_weight_lbs = product.get("weightLbs", 30.0)
    base_price = product.get("priceBase", 3.00)

    calculated_units = 0

    if req.calc_mode == "dimensions" and req.wall_length_ft and req.wall_height_ft:
        # Standard wall computation
        # For standard 8x16 CMU block: 1.125 units per square foot
        # For standard brick: 6.85 units per square foot
        # For paver: approx 4.5 units per sq ft
        sq_ft = req.wall_length_ft * req.wall_height_ft
        ptype = product.get("type", "solid")
        if "brick" in ptype or "clay" in ptype or "eco" in ptype:
            units_per_sqft = 6.85
        elif "paver" in ptype:
            units_per_sqft = 4.2
        else:
            # 8x16 block face is 128 sq inches = 0.888 sq ft -> 1.125 blocks/sqft
            units_per_sqft = 1.125

        raw_units = sq_ft * units_per_sqft
        waste_mult = 1.0 + (req.waste_percent or 5.0) / 100.0
        calculated_units = math.ceil(raw_units * waste_mult)
    elif req.calc_mode == "pallets" and req.pallets:
        calculated_units = req.pallets * units_per_pallet
    else:
        calculated_units = max(1, req.quantity or 1000)

    # Number of pallets needed (rounded up to complete pallet for delivery)
    pallets_needed = math.ceil(calculated_units / units_per_pallet)
    total_billable_units = pallets_needed * units_per_pallet

    # Weight computation
    total_weight_lbs = total_billable_units * unit_weight_lbs
    total_weight_tonnes = (total_weight_lbs * 0.453592) / 1000.0

    # Flatbed semi-truck loads (standard legal max cargo weight is ~48,000 lbs = 24 short tons)
    truckloads = math.ceil(total_weight_lbs / 48000.0) if total_weight_lbs > 0 else 1

    # Tier discount evaluation
    # Tier 1: 1 - 5 pallets: 0% discount (baseline wholesale)
    # Tier 2: 6 - 15 pallets: 10% discount
    # Tier 3: 16 - 30 pallets (Full Truckload): 18% discount
    # Tier 4: 31+ pallets (Multi-Truck Tender Fleet): 25% discount
    if pallets_needed >= 31:
        tier_name = "Major Civil / Tender Fleet Tier"
        discount_rate = 0.25
        tier_description = "25% Volume Tier + Direct Yard Kiln Priority Allocation"
    elif pallets_needed >= 16:
        tier_name = "Full Truckload Semi Tier"
        discount_rate = 0.18
        tier_description = "18% Volume Tier + Full Semi-Trailer Loading Efficiency"
    elif pallets_needed >= 6:
        tier_name = "Commercial Contractor Volume Tier"
        discount_rate = 0.10
        tier_description = "10% Volume Tier for medium residential/commercial jobs"
    else:
        tier_name = "Standard Wholesale Contractor Tier"
        discount_rate = 0.0
        tier_description = "Standard wholesale contractor tier (1-5 pallets)"

    discounted_unit_price = round(base_price * (1.0 - discount_rate), 3)
    material_subtotal = round(total_billable_units * discounted_unit_price, 2)
    original_subtotal = round(total_billable_units * base_price, 2)
    discount_savings = round(original_subtotal - material_subtotal, 2)

    # Freight computation
    freight_rates_per_truck = {
        "local": 280.0,      # 0-50 miles
        "regional": 550.0,   # 50-150 miles
        "freight": 1150.0    # 150-350 miles
    }
    base_freight_per_truck = freight_rates_per_truck.get(req.freight_zone, 550.0)

    offload_fees = {
        "yard_pickup": 0.0,
        "standard_tailgate": 60.0 * truckloads,
        "forklift": 140.0 * truckloads, # Piggyback Moffett on flatbed
        "boom_crane": 290.0 * truckloads
    }
    offload_fee = offload_fees.get(req.offload_service, 140.0 * truckloads)
    total_freight = (base_freight_per_truck * truckloads) + offload_fee if req.offload_service != "yard_pickup" else 0.0

    grand_total = round(material_subtotal + total_freight, 2)

    # Mortar and Grout Estimations
    ptype = product.get("type", "solid")
    if "brick" in ptype or "clay" in ptype or "eco" in ptype:
        mortar_bags_80lb = math.ceil((total_billable_units / 1000.0) * 7.2)
        grout_cu_yds = 0.0
        rebar_linear_ft = 0
    elif "paver" in ptype:
        mortar_bags_80lb = 0 # dry-laid joint sand
        grout_cu_yds = 0.0
        rebar_linear_ft = 0
    else:
        # Standard CMU blocks
        mortar_bags_80lb = math.ceil((total_billable_units / 100.0) * 3.3)
        if "hollow" in ptype:
            # Grout for reinforced cores (standard 48" o.c. code compliance)
            grout_cu_yds = round((total_billable_units / 100.0) * 0.28, 2)
            rebar_linear_ft = math.ceil(total_billable_units * 1.1)
        else:
            grout_cu_yds = 0.0
            rebar_linear_ft = math.ceil(total_billable_units * 0.4)

    return {
        "product": {
            "id": product["id"],
            "name": product["name"],
            "dimensions": product["dimensionsImperial"],
            "compressiveStrengthMpa": product["compressiveStrengthMpa"],
            "unitsPerPallet": units_per_pallet,
            "unitWeightLbs": unit_weight_lbs,
            "basePrice": base_price
        },
        "calculation": {
            "requestedUnits": calculated_units,
            "totalBillableUnits": total_billable_units,
            "palletsNeeded": pallets_needed,
            "totalWeightLbs": round(total_weight_lbs, 1),
            "totalWeightTonnes": round(total_weight_tonnes, 2),
            "flatbedTrucksRequired": truckloads,
            "tierName": tier_name,
            "discountPercent": int(discount_rate * 100),
            "tierDescription": tier_description,
            "baseUnitPrice": base_price,
            "discountedUnitPrice": discounted_unit_price,
            "materialSubtotal": material_subtotal,
            "originalSubtotal": original_subtotal,
            "discountSavings": discount_savings,
            "freightZone": req.freight_zone,
            "freightCost": round(total_freight, 2),
            "offloadService": req.offload_service,
            "grandTotal": grand_total,
            "masonryAccessories": {
                "mortarBags80lb": mortar_bags_80lb,
                "mortarType": "Type S High-Strength Mortar (ASTM C270)",
                "groutCuYds": grout_cu_yds,
                "groutType": "Coarse Pea Gravel Core-Fill (ASTM C476)",
                "rebarLinearFt": rebar_linear_ft
            }
        }
    }

@app.post("/api/enquiries")
def submit_enquiry(enquiry: EnquiryRequest):
    data = enquiry.dict()
    ref_no = create_enquiry(data)
    return {
        "success": True,
        "reference_no": ref_no,
        "message": "Commercial Masonry Enquiry received and logged in system.",
        "confirmation": {
            "reference_no": ref_no,
            "projectName": data.get("project_name"),
            "productName": data.get("product_name"),
            "quantity": data.get("quantity"),
            "unitType": data.get("unit_type"),
            "deliveryLocation": f"{data.get('delivery_city', '')} {data.get('delivery_zip', '')}".strip(),
            "status": "Under Review",
            "turnaround": "Quotation & Lab Cert Dispatch within 2-4 Business Hours"
        }
    }

@app.get("/api/enquiries/{ref_no}")
def lookup_enquiry(ref_no: str):
    record = get_enquiry_by_ref(ref_no)
    if not record:
        raise HTTPException(status_code=404, detail=f"No commercial enquiry found with Reference #{ref_no}")
    return record

@app.get("/api/plant-info")
def get_plant_info():
    stats = get_enquiry_stats()
    return {
        "company": "Luxeris Masonry & Concrete Works",
        "founded": 1984,
        "certifications": ["ASTM C90", "ASTM C216", "ASTM C140", "ASTM E119", "ISO 9001:2015", "LEED v4"],
        "dailyKilnCapacity": "140,000 units/day",
        "totalAnnualOutput": "42,000,000 units",
        "activeEnquiries": stats["total_enquiries"],
        "totalUnitsQuoted": stats["total_units_quoted"],
        "plants": [
            {
                "id": "plant-north",
                "name": "Luxeris Main Kiln & Heavy Aggregate Works",
                "address": "1420 Heavy Industrial Parkway, Quarry Sector 9",
                "city": "Denver, CO 80216",
                "phone": "+1 (800) 848-2678",
                "dispatchRadio": "CB Channel 19",
                "capabilities": "8\" & 12\" CMU, Ultra-Dense Solid Blocks, Class A Engineering Bricks",
                "weighbridgeCapacity": "80-ton certified scale",
                "yardHours": "Mon-Sat: 05:00 - 18:00 MST",
                "status": "OPERATIONAL - FULL PRODUCTION"
            },
            {
                "id": "plant-coastal",
                "name": "Luxeris Architectural & Coastal Paver Terminal",
                "address": "88 Stone Quarry Rd, Terminal Gate 4",
                "city": "Tacoma, WA 98421",
                "phone": "+1 (800) 848-2679",
                "dispatchRadio": "CB Channel 21",
                "capabilities": "80mm Port Pavers, Split-Face Retaining Wall Blocks, Roman Facing Bricks",
                "weighbridgeCapacity": "70-ton certified scale",
                "yardHours": "Mon-Fri: 06:00 - 17:00 PST",
                "status": "OPERATIONAL - FULL PRODUCTION"
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)

