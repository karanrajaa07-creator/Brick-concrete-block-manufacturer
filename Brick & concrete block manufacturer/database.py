import sqlite3
import os
import random
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "enquiries.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.executescript("""
    CREATE TABLE IF NOT EXISTS enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reference_no TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        company_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        contractor_license TEXT,
        project_name TEXT NOT NULL,
        project_type TEXT NOT NULL,
        product_id TEXT,
        product_name TEXT,
        quantity INTEGER NOT NULL,
        unit_type TEXT DEFAULT 'units',
        delivery_zip TEXT NOT NULL,
        delivery_city TEXT,
        offload_method TEXT NOT NULL,
        target_date TEXT,
        enquiry_type TEXT NOT NULL,
        blueprint_file TEXT,
        notes TEXT,
        status TEXT DEFAULT 'Under Review',
        assigned_engineer TEXT,
        estimated_total REAL DEFAULT 0.0,
        created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_enquiries_ref ON enquiries(reference_no);
    CREATE INDEX IF NOT EXISTS idx_enquiries_date ON enquiries(created_at);
    """)
    conn.commit()

    # Pre-seed demo enquiries if empty
    cursor.execute("SELECT COUNT(*) FROM enquiries")
    count = cursor.fetchone()[0]
    if count == 0:
        demo_enquiries = [
            (
                "ENQ-2026-8492",
                "Marcus Vance",
                "Vance Heavy Civil Constructors",
                "m.vance@vanceheavy.com",
                "+1 (555) 342-8801",
                "GC-94021-CA",
                "Midtown Logistics Freight Terminal - Retaining Barrier",
                "Civil Infrastructure",
                "cmu-solid-8",
                "8\" Ultra-Dense Solid Foundation Block",
                7200,
                "units (120 pallets)",
                "94107",
                "San Francisco, CA",
                "Truck-Mounted Moffett Forklift",
                "2026-12-15",
                "Bulk Price Quotation & Batch Lab Test Cert",
                "Site_Foundation_Plan_Rev3.dwg",
                "Need 55 MPa core compressive test compliance report for port authority specs. Delivery split across 5 flatbeds.",
                "Quote Prepared",
                "Eng. David Vance, PE",
                38880.00,
                "2026-11-06 09:15:00"
            ),
            (
                "ENQ-2026-7140",
                "Elena Rostova",
                "Apex Architectural Design Group",
                "elena@apexarch.studio",
                "+1 (555) 789-2244",
                "AIA-882194",
                "Oasis Contemporary Cultural Pavilion",
                "Commercial Architectural",
                "clay-long-roman",
                "Roman Linear Architectural Facing Brick",
                25000,
                "units (72 pallets)",
                "98101",
                "Seattle, WA",
                "Flatbed Boom Crane",
                "2027-01-20",
                "Free Contractor Sample Box & Mockup Wall Consultation",
                "Exterior_Elevation_Detail.pdf",
                "Requesting sample boxed kit of Roman linear format in charcoal and iron-spot buff for client mock-up wall approval.",
                "Sample Dispatched",
                "Arch. Rachel Miller",
                59625.00,
                "2026-11-08 14:30:00"
            ),
            (
                "ENQ-2026-9503",
                "Thomas Miller",
                "Miller & Sons Masonry Contractors",
                "tmiller@millermasonry.net",
                "+1 (555) 601-9923",
                "LIC-448201",
                "Highland Ridge Medical Center Shear Core",
                "Commercial High-Rise",
                "cmu-hollow-8",
                "8\" Two-Core Structural Hollow CMU",
                18000,
                "units (240 pallets)",
                "60601",
                "Chicago, IL",
                "Flatbed Direct Jobsite Delivery",
                "2026-11-28",
                "Formal Tender Bid & Kiln Slot Reservation",
                "Structural_Wall_Schedule.xlsx",
                "Urgent tender submission deadline. Require 4-hour fire rating certificate and batch delivery schedule.",
                "Under Review",
                "Senior Estimator J. Sterling",
                48276.00,
                "2026-11-09 08:45:00"
            )
        ]

        cursor.executemany("""
        INSERT INTO enquiries (
            reference_no, full_name, company_name, email, phone, contractor_license,
            project_name, project_type, product_id, product_name, quantity, unit_type,
            delivery_zip, delivery_city, offload_method, target_date, enquiry_type,
            blueprint_file, notes, status, assigned_engineer, estimated_total, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, demo_enquiries)
        conn.commit()

    conn.close()

def generate_reference_no():
    # Format ENQ-2026-XXXX
    num = random.randint(1000, 9999)
    return f"ENQ-2026-{num}"

def create_enquiry(data: dict):
    conn = get_connection()
    cursor = conn.cursor()
    ref_no = generate_reference_no()

    # Ensure uniqueness
    while True:
        cursor.execute("SELECT id FROM enquiries WHERE reference_no = ?", (ref_no,))
        if not cursor.fetchone():
            break
        ref_no = generate_reference_no()

    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    engineers = ["Eng. David Vance, PE", "Arch. Rachel Miller", "Senior Estimator J. Sterling", "Eng. Carlos Mendez, SE"]
    assigned = random.choice(engineers)

    cursor.execute("""
    INSERT INTO enquiries (
        reference_no, full_name, company_name, email, phone, contractor_license,
        project_name, project_type, product_id, product_name, quantity, unit_type,
        delivery_zip, delivery_city, offload_method, target_date, enquiry_type,
        blueprint_file, notes, status, assigned_engineer, estimated_total, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        ref_no,
        data.get("full_name", "").strip(),
        data.get("company_name", "").strip(),
        data.get("email", "").strip(),
        data.get("phone", "").strip(),
        data.get("contractor_license", "").strip(),
        data.get("project_name", "").strip(),
        data.get("project_type", "Commercial Construction"),
        data.get("product_id", ""),
        data.get("product_name", ""),
        int(data.get("quantity", 0)),
        data.get("unit_type", "units"),
        data.get("delivery_zip", "").strip(),
        data.get("delivery_city", "").strip(),
        data.get("offload_method", "Jobsite Forklift Unload"),
        data.get("target_date", ""),
        data.get("enquiry_type", "Bulk Price Quotation"),
        data.get("blueprint_file", ""),
        data.get("notes", "").strip(),
        "Under Review",
        assigned,
        float(data.get("estimated_total", 0.0)),
        created_at
    ))
    conn.commit()
    conn.close()
    return ref_no

def get_enquiry_by_ref(ref_no: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM enquiries WHERE UPPER(reference_no) = UPPER(?)", (ref_no.strip(),))
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict(row)
    return None

def get_enquiry_stats():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as total, SUM(quantity) as total_units FROM enquiries")
    row = cursor.fetchone()
    conn.close()
    return {"total_enquiries": row["total"], "total_units_quoted": row["total_units"] or 0}

