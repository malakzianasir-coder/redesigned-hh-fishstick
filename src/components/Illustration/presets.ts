export type IllustrationPreset = {
  collection?: string
  slug?: string
  title?: string
  icon: string
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  motif?: 'pulse' | 'ecg' | 'orbit' | 'breathe' | 'none'
  accent: string
  soft: string
  ink?: string
  mainAnim?: string
  satellites?: Array<string | { icon: string; anim?: string }>
}

export const ILLUSTRATION_PRESETS: Record<string, IllustrationPreset> = {
  "dept/anesthesiology": {
    "collection": "departments",
    "slug": "anesthesiology",
    "title": "Anesthesiology",
    "icon": "syringe",
    "motif": "pulse",
    "accent": "#6366F1",
    "soft": "#E2E4FC",
    "satellites": [
      "thermometer",
      "pill",
      "monitor"
    ]
  },
  "dept/bio-medical": {
    "collection": "departments",
    "slug": "bio-medical",
    "title": "Bio-Medical",
    "icon": "cpu",
    "motif": "orbit",
    "accent": "#475569",
    "soft": "#E2E8F0",
    "satellites": [
      "gear",
      "monitor",
      "flask"
    ]
  },
  "dept/cardiology": {
    "collection": "departments",
    "slug": "cardiology",
    "title": "Cardiology",
    "icon": "heartbeat",
    "motif": "ecg",
    "accent": "#E11D2E",
    "soft": "#FBE0E2",
    "satellites": [
      "heart",
      "stethoscope",
      "clipboard-text"
    ],
    "mainAnim": "a-beat"
  },
  "dept/dentistry": {
    "collection": "departments",
    "slug": "dentistry",
    "title": "Dentistry",
    "icon": "tooth",
    "motif": "pulse",
    "accent": "#0891B2",
    "soft": "#D8F0F8",
    "satellites": [
      "sparkle",
      "syringe",
      "clipboard-text"
    ]
  },
  "dept/dermatology": {
    "collection": "departments",
    "slug": "dermatology",
    "title": "Dermatology",
    "icon": "hand",
    "motif": "breathe",
    "accent": "#C2703D",
    "soft": "#F8E7D9",
    "satellites": [
      "sun",
      "drop",
      "sparkle"
    ]
  },
  "dept/dialysis": {
    "collection": "departments",
    "slug": "dialysis",
    "title": "Dialysis",
    "icon": "drop",
    "motif": "pulse",
    "accent": "#0284C7",
    "soft": "#D9EFFC",
    "satellites": [
      "waves",
      "bed",
      "heartbeat"
    ]
  },
  "dept/dietetics--nutrition": {
    "collection": "departments",
    "slug": "dietetics--nutrition",
    "title": "Dietetics & Nutrition",
    "icon": "carrot",
    "motif": "breathe",
    "accent": "#65A30D",
    "soft": "#E9F5D8",
    "satellites": [
      "fork-knife",
      "apple-logo",
      "heartbeat"
    ]
  },
  "dept/emergency": {
    "collection": "departments",
    "slug": "emergency",
    "title": "Emergency",
    "icon": "ambulance",
    "motif": "pulse",
    "accent": "#EA580C",
    "soft": "#FDE3D3",
    "satellites": [
      "siren",
      "first-aid",
      "phone-call"
    ],
    "mainAnim": "a-beat"
  },
  "dept/endocrinology": {
    "collection": "departments",
    "slug": "endocrinology",
    "title": "Endocrinology",
    "icon": "pill",
    "motif": "orbit",
    "accent": "#7C3AED",
    "soft": "#EAE0FC",
    "satellites": [
      "heartbeat",
      "thermometer",
      "clipboard-text"
    ]
  },
  "dept/ent-ear-nose--throat": {
    "collection": "departments",
    "slug": "ent-ear-nose--throat",
    "title": "ENT (Ear, Nose & Throat)",
    "icon": "ear",
    "motif": "orbit",
    "accent": "#8B5CF6",
    "soft": "#EBE3FD",
    "satellites": [
      "speaker-high",
      "waves",
      "thermometer"
    ]
  },
  "dept/gastroenterology": {
    "collection": "departments",
    "slug": "gastroenterology",
    "title": "Gastroenterology",
    "icon": "stomach",
    "motif": "breathe",
    "accent": "#0D9488",
    "soft": "#D3F0EC",
    "satellites": [
      "pill",
      "thermometer",
      "clipboard-text"
    ]
  },
  "dept/general-medicine": {
    "collection": "departments",
    "slug": "general-medicine",
    "title": "General Medicine",
    "icon": "stethoscope",
    "motif": "orbit",
    "accent": "#1B2A4A",
    "soft": "#E2E8F2",
    "satellites": [
      "clipboard-text",
      "pill",
      "thermometer"
    ]
  },
  "dept/general-surgery": {
    "collection": "departments",
    "slug": "general-surgery",
    "title": "General Surgery",
    "icon": "scissors",
    "motif": "pulse",
    "accent": "#475569",
    "soft": "#E2E8F0",
    "satellites": [
      "first-aid",
      "syringe",
      "band-aid"
    ]
  },
  "dept/gynaecology--obstetrics": {
    "collection": "departments",
    "slug": "gynaecology--obstetrics",
    "title": "Gynaecology & Obstetrics",
    "icon": "gender-female",
    "motif": "breathe",
    "accent": "#DB2777",
    "soft": "#FBDFEC",
    "satellites": [
      "baby",
      "hand-heart",
      "heart"
    ]
  },
  "dept/laboratory": {
    "collection": "departments",
    "slug": "laboratory",
    "title": "Laboratory",
    "icon": "test-tube",
    "motif": "pulse",
    "accent": "#144CD9",
    "soft": "#DCE7FD",
    "satellites": [
      "flask",
      "microscope",
      "drop"
    ]
  },
  "dept/mammography": {
    "collection": "departments",
    "slug": "mammography",
    "title": "Mammography",
    "icon": "scan",
    "motif": "orbit",
    "accent": "#DB2777",
    "soft": "#FBDFEC",
    "satellites": [
      "x-ray",
      "monitor",
      "heart"
    ]
  },
  "dept/nephrology": {
    "collection": "departments",
    "slug": "nephrology",
    "title": "Nephrology",
    "icon": "drop",
    "motif": "pulse",
    "accent": "#0369A1",
    "soft": "#D6ECF9",
    "satellites": [
      "waves",
      "pill",
      "heartbeat"
    ]
  },
  "dept/nursery": {
    "collection": "departments",
    "slug": "nursery",
    "title": "Nursery",
    "icon": "baby",
    "motif": "pulse",
    "accent": "#EC4899",
    "soft": "#FCDEEE",
    "satellites": [
      "crib",
      "heart",
      "hand-heart"
    ]
  },
  "dept/ophthalmology": {
    "collection": "departments",
    "slug": "ophthalmology",
    "title": "Ophthalmology",
    "icon": "eye",
    "motif": "breathe",
    "accent": "#0284C7",
    "soft": "#D9EFFC",
    "satellites": [
      "eyeglasses",
      "sun",
      "drop"
    ]
  },
  "dept/orthopedics": {
    "collection": "departments",
    "slug": "orthopedics",
    "title": "Orthopedics",
    "icon": "bone",
    "motif": "orbit",
    "accent": "#64748B",
    "soft": "#E2E8F0",
    "satellites": [
      "wheelchair",
      "band-aid",
      "person-simple-walk"
    ]
  },
  "dept/pathology": {
    "collection": "departments",
    "slug": "pathology",
    "title": "Pathology",
    "icon": "microscope",
    "motif": "pulse",
    "accent": "#4F46E5",
    "soft": "#E1E3FB",
    "satellites": [
      "flask",
      "dna",
      "test-tube"
    ]
  },
  "dept/pediatrics": {
    "collection": "departments",
    "slug": "pediatrics",
    "title": "Pediatrics",
    "icon": "baby",
    "motif": "pulse",
    "accent": "#EC4899",
    "soft": "#FCDEEE",
    "satellites": [
      "balloon",
      "smiley",
      "baby-carriage"
    ]
  },
  "dept/physiotherapy": {
    "collection": "departments",
    "slug": "physiotherapy",
    "title": "Physiotherapy",
    "icon": "person-simple-walk",
    "motif": "pulse",
    "accent": "#65A30D",
    "soft": "#E9F5D8",
    "satellites": [
      "barbell",
      "wheelchair-motion",
      "heartbeat"
    ]
  },
  "dept/plastic--reconstructive-surgery": {
    "collection": "departments",
    "slug": "plastic--reconstructive-surgery",
    "title": "Plastic & Reconstructive Surgery",
    "icon": "sparkle",
    "motif": "breathe",
    "accent": "#A855F7",
    "soft": "#F0E2FC",
    "satellites": [
      "hand",
      "scissors",
      "band-aid"
    ]
  },
  "dept/psychiatry": {
    "collection": "departments",
    "slug": "psychiatry",
    "title": "Psychiatry",
    "icon": "brain",
    "motif": "breathe",
    "accent": "#7C3AED",
    "soft": "#EAE0FC",
    "satellites": [
      "heart",
      "leaf",
      "handshake"
    ]
  },
  "dept/pulmonology": {
    "collection": "departments",
    "slug": "pulmonology",
    "title": "Pulmonology",
    "icon": "lungs",
    "motif": "breathe",
    "accent": "#0D9488",
    "soft": "#D3F0EC",
    "satellites": [
      "wind",
      "thermometer",
      "pill"
    ]
  },
  "dept/radiology": {
    "collection": "departments",
    "slug": "radiology",
    "title": "Radiology",
    "icon": "x-ray",
    "motif": "orbit",
    "accent": "#4F46E5",
    "soft": "#E1E3FB",
    "satellites": [
      "scan",
      "monitor",
      "radioactive"
    ]
  },
  "dept/urology": {
    "collection": "departments",
    "slug": "urology",
    "title": "Urology",
    "icon": "drop",
    "motif": "orbit",
    "accent": "#0EA5E9",
    "soft": "#D9F2FC",
    "satellites": [
      "syringe",
      "clipboard-text",
      "pill"
    ]
  },
  "svc/ambulance-services": {
    "collection": "services",
    "slug": "ambulance-services",
    "title": "Ambulance Services",
    "icon": "ambulance",
    "motif": "pulse",
    "accent": "#EA580C",
    "soft": "#FDE3D3",
    "satellites": [
      "siren",
      "map-pin",
      "phone-call"
    ],
    "mainAnim": "a-beat"
  },
  "svc/anesthesia": {
    "collection": "services",
    "slug": "anesthesia",
    "title": "Anesthesia",
    "icon": "syringe",
    "motif": "breathe",
    "accent": "#6366F1",
    "soft": "#E2E4FC",
    "satellites": [
      "thermometer",
      "pill",
      "monitor"
    ]
  },
  "svc/birth-certificate-issuance": {
    "collection": "services",
    "slug": "birth-certificate-issuance",
    "title": "Birth Certificate Issuance",
    "icon": "certificate",
    "motif": "orbit",
    "accent": "#DB2777",
    "soft": "#FBDFEC",
    "satellites": [
      "baby",
      "identification-badge",
      "clipboard-text"
    ]
  },
  "svc/blood-bank": {
    "collection": "services",
    "slug": "blood-bank",
    "title": "Blood Bank",
    "icon": "drop",
    "motif": "pulse",
    "accent": "#B91C1C",
    "soft": "#F9DFDF",
    "satellites": [
      "hand-heart",
      "flask",
      "heartbeat"
    ],
    "mainAnim": "a-beat"
  },
  "svc/blood-transfusion": {
    "collection": "services",
    "slug": "blood-transfusion",
    "title": "Blood Transfusion",
    "icon": "drop",
    "motif": "pulse",
    "accent": "#DC2626",
    "soft": "#FADDDD",
    "satellites": [
      "syringe",
      "heartbeat",
      "hand-heart"
    ]
  },
  "svc/cafeteria": {
    "collection": "services",
    "slug": "cafeteria",
    "title": "Cafeteria",
    "icon": "coffee",
    "motif": "breathe",
    "accent": "#D97706",
    "soft": "#FDEBD3",
    "satellites": [
      "fork-knife",
      "cake",
      "storefront"
    ]
  },
  "svc/cardiac-diagnostics": {
    "collection": "services",
    "slug": "cardiac-diagnostics",
    "title": "Cardiac Diagnostics",
    "icon": "heartbeat",
    "motif": "ecg",
    "accent": "#E11D2E",
    "soft": "#FBE0E2",
    "satellites": [
      "heart",
      "monitor",
      "stethoscope"
    ],
    "mainAnim": "a-beat"
  },
  "svc/dialysis-care-unit": {
    "collection": "services",
    "slug": "dialysis-care-unit",
    "title": "Dialysis Care Unit",
    "icon": "drop",
    "motif": "pulse",
    "accent": "#0284C7",
    "soft": "#D9EFFC",
    "satellites": [
      "waves",
      "bed",
      "heartbeat"
    ]
  },
  "svc/dressing-major--minor": {
    "collection": "services",
    "slug": "dressing-major--minor",
    "title": "Dressing (Major & Minor)",
    "icon": "band-aid",
    "motif": "pulse",
    "accent": "#F59E0B",
    "soft": "#FEF0D6",
    "satellites": [
      "first-aid",
      "hand",
      "pill"
    ]
  },
  "svc/ecg": {
    "collection": "services",
    "slug": "ecg",
    "title": "E.C.G",
    "icon": "heartbeat",
    "motif": "ecg",
    "accent": "#E11D2E",
    "soft": "#FBE0E2",
    "satellites": [
      "monitor",
      "stethoscope",
      "clipboard-text"
    ],
    "mainAnim": "a-beat"
  },
  "svc/emergency-medical-treatment": {
    "collection": "services",
    "slug": "emergency-medical-treatment",
    "title": "Emergency Medical Treatment",
    "icon": "first-aid",
    "motif": "pulse",
    "accent": "#EA580C",
    "soft": "#FDE3D3",
    "satellites": [
      "siren",
      "ambulance",
      "syringe"
    ],
    "mainAnim": "a-beat"
  },
  "svc/emergency-services": {
    "collection": "services",
    "slug": "emergency-services",
    "title": "Emergency Services",
    "icon": "siren",
    "motif": "pulse",
    "accent": "#EA580C",
    "soft": "#FDE3D3",
    "satellites": [
      "ambulance",
      "phone-call",
      "first-aid"
    ],
    "mainAnim": "a-beat"
  },
  "svc/free-medical-camp": {
    "collection": "services",
    "slug": "free-medical-camp",
    "title": "Free Medical Camp",
    "icon": "tent",
    "motif": "pulse",
    "accent": "#16A34A",
    "soft": "#DBF3E3",
    "satellites": [
      "stethoscope",
      "users",
      "first-aid"
    ]
  },
  "svc/inpatient-department-ipd": {
    "collection": "services",
    "slug": "inpatient-department-ipd",
    "title": "Inpatient Department (IPD)",
    "icon": "bed",
    "motif": "breathe",
    "accent": "#475569",
    "soft": "#E2E8F0",
    "satellites": [
      "heartbeat",
      "clipboard-text",
      "pill"
    ]
  },
  "svc/intensive-care-unit-icu": {
    "collection": "services",
    "slug": "intensive-care-unit-icu",
    "title": "Intensive Care Unit (ICU)",
    "icon": "bed",
    "motif": "ecg",
    "accent": "#475569",
    "soft": "#E2E8EF",
    "satellites": [
      "monitor",
      "syringe",
      "heartbeat"
    ]
  },
  "svc/labor-room": {
    "collection": "services",
    "slug": "labor-room",
    "title": "Labor Room",
    "icon": "baby",
    "motif": "breathe",
    "accent": "#DB2777",
    "soft": "#FBDFEC",
    "satellites": [
      "gender-female",
      "heart",
      "hand-heart"
    ]
  },
  "svc/medicine-distribution": {
    "collection": "services",
    "slug": "medicine-distribution",
    "title": "Medicine Distribution",
    "icon": "pill",
    "motif": "orbit",
    "accent": "#16A34A",
    "soft": "#DBF3E3",
    "satellites": [
      "prescription",
      "package",
      "handshake"
    ]
  },
  "svc/nursing-care": {
    "collection": "services",
    "slug": "nursing-care",
    "title": "Nursing Care",
    "icon": "hand-heart",
    "motif": "breathe",
    "accent": "#0D9488",
    "soft": "#D3F0EC",
    "satellites": [
      "bed",
      "heartbeat",
      "pill"
    ]
  },
  "svc/operation-theater": {
    "collection": "services",
    "slug": "operation-theater",
    "title": "Operation Theater",
    "icon": "scissors",
    "motif": "pulse",
    "accent": "#1B2A4A",
    "soft": "#E2E8F2",
    "satellites": [
      "syringe",
      "monitor",
      "first-aid"
    ]
  },
  "svc/outpatient-department-opd": {
    "collection": "services",
    "slug": "outpatient-department-opd",
    "title": "Outpatient Department (OPD)",
    "icon": "buildings",
    "motif": "orbit",
    "accent": "#144CD9",
    "soft": "#DCE7FD",
    "satellites": [
      "calendar-check",
      "stethoscope",
      "users"
    ]
  },
  "svc/clinical-laboratory": {
    "collection": "services",
    "slug": "clinical-laboratory",
    "title": "Clinical Laboratory",
    "icon": "microscope",
    "motif": "pulse",
    "accent": "#4F46E5",
    "soft": "#E1E3FB",
    "satellites": [
      "flask",
      "dna",
      "test-tube"
    ]
  },
  "svc/pharmacy": {
    "collection": "services",
    "slug": "pharmacy",
    "title": "Pharmacy",
    "icon": "pill",
    "motif": "pulse",
    "accent": "#16A34A",
    "soft": "#DBF3E3",
    "satellites": [
      "prescription",
      "first-aid-kit",
      "storefront"
    ]
  },
  "svc/private--vip-rooms": {
    "collection": "services",
    "slug": "private--vip-rooms",
    "title": "Private & VIP Rooms",
    "icon": "door",
    "motif": "breathe",
    "accent": "#A855F7",
    "soft": "#F0E2FC",
    "satellites": [
      "bed",
      "sparkle",
      "crown"
    ]
  },
  "svc/radiology-and-imaging": {
    "collection": "services",
    "slug": "radiology-and-imaging",
    "title": "Radiology & Imaging",
    "icon": "x-ray",
    "motif": "orbit",
    "accent": "#4F46E5",
    "soft": "#E1E3FB",
    "satellites": [
      "scan",
      "monitor",
      "radioactive"
    ]
  },
  "svc/service-rooms": {
    "collection": "services",
    "slug": "service-rooms",
    "title": "Service Rooms",
    "icon": "door-open",
    "motif": "orbit",
    "accent": "#64748B",
    "soft": "#E2E8F0",
    "satellites": [
      "bed",
      "gear",
      "broom"
    ]
  },
  "svc/ultrasound": {
    "collection": "services",
    "slug": "ultrasound",
    "title": "Ultrasound",
    "icon": "waves",
    "motif": "breathe",
    "accent": "#0891B2",
    "soft": "#D8F0F8",
    "satellites": [
      "monitor",
      "baby",
      "scan"
    ]
  },
  "svc/x-rays": {
    "collection": "services",
    "slug": "x-rays",
    "title": "X-Rays",
    "icon": "x-ray",
    "motif": "orbit",
    "accent": "#4F46E5",
    "soft": "#E1E3FB",
    "satellites": [
      "scan",
      "bone",
      "monitor"
    ]
  },
  "page/home": {
    "collection": "pages",
    "slug": "home",
    "title": "Home",
    "icon": "hospital",
    "motif": "pulse",
    "accent": "#E30016",
    "soft": "#FBE0E2",
    "satellites": [
      "heartbeat",
      "hand-heart",
      "users"
    ]
  },
  "page/about": {
    "collection": "pages",
    "slug": "about",
    "title": "About",
    "icon": "info",
    "motif": "orbit",
    "accent": "#1B2A4A",
    "soft": "#E2E8F2",
    "satellites": [
      "flag",
      "users",
      "sparkle"
    ]
  },
  "page/vision--mission": {
    "collection": "pages",
    "slug": "vision--mission",
    "title": "Vision & Mission",
    "icon": "target",
    "motif": "orbit",
    "accent": "#144CD9",
    "soft": "#DCE7FD",
    "satellites": [
      "flag",
      "eye",
      "handshake"
    ]
  },
  "page/our-philosophy": {
    "collection": "pages",
    "slug": "our-philosophy",
    "title": "Our Philosophy",
    "icon": "lightbulb",
    "motif": "breathe",
    "accent": "#7C3AED",
    "soft": "#EAE0FC",
    "satellites": [
      "heart",
      "leaf",
      "sparkle"
    ]
  },
  "page/our-values": {
    "collection": "pages",
    "slug": "our-values",
    "title": "Our Values",
    "icon": "heart",
    "motif": "breathe",
    "accent": "#E11D2E",
    "soft": "#FBE0E2",
    "satellites": [
      "handshake",
      "sparkle",
      "users"
    ]
  },
  "page/our-journey": {
    "collection": "pages",
    "slug": "our-journey",
    "title": "Our Journey",
    "icon": "path",
    "motif": "orbit",
    "accent": "#0D9488",
    "soft": "#D3F0EC",
    "satellites": [
      "flag",
      "calendar-check",
      "map-pin"
    ]
  },
  "page/our-founders": {
    "collection": "pages",
    "slug": "our-founders",
    "title": "Our Founders",
    "icon": "users-three",
    "motif": "orbit",
    "accent": "#1B2A4A",
    "soft": "#E2E8F2",
    "satellites": [
      "heart",
      "sparkle",
      "identification-badge"
    ]
  },
  "page/chairmans-message": {
    "collection": "pages",
    "slug": "chairmans-message",
    "title": "Chairman's Message",
    "icon": "chat-circle-text",
    "motif": "breathe",
    "accent": "#1B2A4A",
    "soft": "#E2E8F2",
    "satellites": [
      "user-circle",
      "quotes",
      "heart"
    ]
  },
  "page/presidents-message": {
    "collection": "pages",
    "slug": "presidents-message",
    "title": "President's Message",
    "icon": "chat-circle-text",
    "motif": "breathe",
    "accent": "#1B2A4A",
    "soft": "#E2E8F2",
    "satellites": [
      "user-circle",
      "quotes",
      "heart"
    ]
  },
  "page/board-of-governors-bog": {
    "collection": "pages",
    "slug": "board-of-governors-bog",
    "title": "Board of Governors",
    "icon": "briefcase",
    "motif": "orbit",
    "accent": "#475569",
    "soft": "#E2E8F0",
    "satellites": [
      "users",
      "identification-badge",
      "buildings"
    ]
  },
  "page/senior-management": {
    "collection": "pages",
    "slug": "senior-management",
    "title": "Senior Management",
    "icon": "briefcase",
    "motif": "orbit",
    "accent": "#475569",
    "soft": "#E2E8F0",
    "satellites": [
      "users",
      "identification-badge",
      "handshake"
    ]
  },
  "page/executive-committee": {
    "collection": "pages",
    "slug": "executive-committee",
    "title": "Executive Committee",
    "icon": "users-three",
    "motif": "orbit",
    "accent": "#475569",
    "soft": "#E2E8F0",
    "satellites": [
      "briefcase",
      "clipboard-text",
      "handshake"
    ]
  },
  "page/core-committees": {
    "collection": "pages",
    "slug": "core-committees",
    "title": "Core Committees",
    "icon": "users",
    "motif": "orbit",
    "accent": "#64748B",
    "soft": "#E2E8F0",
    "satellites": [
      "clipboard-text",
      "handshake",
      "buildings"
    ]
  },
  "page/team": {
    "collection": "pages",
    "slug": "team",
    "title": "Team",
    "icon": "users",
    "motif": "orbit",
    "accent": "#144CD9",
    "soft": "#DCE7FD",
    "satellites": [
      "stethoscope",
      "identification-badge",
      "handshake"
    ]
  },
  "page/our-faculty": {
    "collection": "pages",
    "slug": "our-faculty",
    "title": "Our Faculty",
    "icon": "graduation-cap",
    "motif": "orbit",
    "accent": "#4F46E5",
    "soft": "#E1E3FB",
    "satellites": [
      "book-open",
      "users",
      "clipboard-text"
    ]
  },
  "page/heads-of-departments": {
    "collection": "pages",
    "slug": "heads-of-departments",
    "title": "Heads of Departments",
    "icon": "identification-badge",
    "motif": "orbit",
    "accent": "#1B2A4A",
    "soft": "#E2E8F2",
    "satellites": [
      "stethoscope",
      "users",
      "buildings"
    ]
  },
  "page/visiting-consultants": {
    "collection": "pages",
    "slug": "visiting-consultants",
    "title": "Visiting Consultants",
    "icon": "user-circle",
    "motif": "orbit",
    "accent": "#0D9488",
    "soft": "#D3F0EC",
    "satellites": [
      "stethoscope",
      "calendar-check",
      "buildings"
    ]
  },
  "page/departments": {
    "collection": "pages",
    "slug": "departments",
    "title": "Departments",
    "icon": "buildings",
    "motif": "orbit",
    "accent": "#144CD9",
    "soft": "#DCE7FD",
    "satellites": [
      "stethoscope",
      "heartbeat",
      "hospital"
    ]
  },
  "page/services": {
    "collection": "pages",
    "slug": "services",
    "title": "Services",
    "icon": "first-aid-kit",
    "motif": "orbit",
    "accent": "#0D9488",
    "soft": "#D3F0EC",
    "satellites": [
      "ambulance",
      "pill",
      "bed"
    ]
  },
  "page/diagnostics": {
    "collection": "pages",
    "slug": "diagnostics",
    "title": "Diagnostics",
    "icon": "test-tube",
    "motif": "pulse",
    "accent": "#144CD9",
    "soft": "#DCE7FD",
    "satellites": [
      "microscope",
      "x-ray",
      "flask"
    ]
  },
  "page/patient-care": {
    "collection": "pages",
    "slug": "patient-care",
    "title": "Patient Care",
    "icon": "hand-heart",
    "motif": "breathe",
    "accent": "#0D9488",
    "soft": "#D3F0EC",
    "satellites": [
      "bed",
      "heartbeat",
      "users"
    ]
  },
  "page/patient-welfare": {
    "collection": "pages",
    "slug": "patient-welfare",
    "title": "Patient Welfare",
    "icon": "hand-heart",
    "motif": "breathe",
    "accent": "#E11D2E",
    "soft": "#FBE0E2",
    "satellites": [
      "heart",
      "handshake",
      "coins"
    ]
  },
  "page/financial-assistance": {
    "collection": "pages",
    "slug": "financial-assistance",
    "title": "Financial Assistance & Welfare",
    "icon": "coins",
    "motif": "breathe",
    "accent": "#D97706",
    "soft": "#FDEBD3",
    "satellites": [
      "hand-heart",
      "handshake",
      "heart"
    ]
  },
  "page/admission-process": {
    "collection": "pages",
    "slug": "admission-process",
    "title": "Patient Admission Process",
    "icon": "clipboard-text",
    "motif": "orbit",
    "accent": "#144CD9",
    "soft": "#DCE7FD",
    "satellites": [
      "identification-badge",
      "calendar-check",
      "bed"
    ]
  },
  "page/patient-rights": {
    "collection": "pages",
    "slug": "patient-rights",
    "title": "Patient Rights & Responsibilities",
    "icon": "scales",
    "motif": "orbit",
    "accent": "#475569",
    "soft": "#E2E8F0",
    "satellites": [
      "shield-check",
      "handshake",
      "info"
    ]
  },
  "page/patient-stories": {
    "collection": "pages",
    "slug": "patient-stories",
    "title": "Patient Stories",
    "icon": "chat-circle-text",
    "motif": "breathe",
    "accent": "#DB2777",
    "soft": "#FBDFEC",
    "satellites": [
      "heart",
      "users",
      "sparkle"
    ]
  },
  "page/free-medical-camps": {
    "collection": "pages",
    "slug": "free-medical-camps",
    "title": "Free Medical Camps",
    "icon": "tent",
    "motif": "pulse",
    "accent": "#16A34A",
    "soft": "#DBF3E3",
    "satellites": [
      "stethoscope",
      "users",
      "first-aid"
    ]
  },
  "page/dialysis-support": {
    "collection": "pages",
    "slug": "dialysis-support",
    "title": "Dialysis Patient Support",
    "icon": "drop",
    "motif": "pulse",
    "accent": "#144CD9",
    "soft": "#DCE7FD",
    "satellites": [
      "heartbeat",
      "hand-heart",
      "first-aid"
    ]
  },
  "page/free-medicines": {
    "collection": "pages",
    "slug": "free-medicines",
    "title": "Free Medicines",
    "icon": "pill",
    "motif": "breathe",
    "accent": "#7C3AED",
    "soft": "#EDE9FE",
    "satellites": [
      "first-aid",
      "hand-heart",
      "sparkle"
    ]
  },
  "page/free-meals": {
    "collection": "pages",
    "slug": "free-meals",
    "title": "Free Meals",
    "icon": "bowl-food",
    "motif": "breathe",
    "accent": "#D97706",
    "soft": "#FDEBD3",
    "satellites": [
      "heart",
      "users",
      "hand-heart"
    ]
  },
  "page/sehat-sahulat": {
    "collection": "pages",
    "slug": "sehat-sahulat",
    "title": "Sehat Sahulat Program",
    "icon": "shield-check",
    "motif": "orbit",
    "accent": "#059669",
    "soft": "#D1FAE5",
    "satellites": [
      "identification-badge",
      "hospital",
      "handshake"
    ]
  },
  "page/patient-information-guide": {
    "collection": "pages",
    "slug": "patient-information-guide",
    "title": "Patient Information Guide",
    "icon": "clipboard-text",
    "motif": "orbit",
    "accent": "#475569",
    "soft": "#E2E8F0",
    "satellites": [
      "info",
      "calendar-check",
      "files"
    ]
  },
  "page/donate": {
    "collection": "pages",
    "slug": "donate",
    "title": "Donate",
    "icon": "hand-heart",
    "motif": "pulse",
    "accent": "#E30016",
    "soft": "#FBE0E2",
    "satellites": [
      "coins",
      "heart",
      "handshake"
    ],
    "mainAnim": "a-beat"
  },
  "page/thank-you": {
    "collection": "pages",
    "slug": "thank-you",
    "title": "Thank You",
    "icon": "seal-check",
    "motif": "breathe",
    "accent": "#E30016",
    "soft": "#FBE0E2",
    "ink": "#1B2441",
    "satellites": [
      "hand-heart",
      "sparkle",
      "heartbeat"
    ],
    "mainAnim": "a-beat"
  },
  "page/donations": {
    "collection": "pages",
    "slug": "donations",
    "title": "Donations",
    "icon": "hand-coins",
    "motif": "pulse",
    "accent": "#E30016",
    "soft": "#FBE0E2",
    "satellites": [
      "heart",
      "gift",
      "handshake"
    ]
  },
  "page/sadaqah": {
    "collection": "pages",
    "slug": "sadaqah",
    "title": "Sadaqah",
    "icon": "hands-praying",
    "motif": "breathe",
    "accent": "#16A34A",
    "soft": "#DBF3E3",
    "satellites": [
      "heart",
      "hand-heart",
      "sparkle"
    ]
  },
  "page/eidi-fitrana": {
    "collection": "pages",
    "slug": "eidi-fitrana",
    "title": "Eidi & Fitrana",
    "icon": "gift",
    "motif": "pulse",
    "accent": "#D97706",
    "soft": "#FDEBD3",
    "satellites": [
      "heart",
      "sparkle",
      "hand-heart"
    ],
    "mainAnim": "a-beat"
  },
  "page/how-to-donate": {
    "collection": "pages",
    "slug": "how-to-donate",
    "title": "How to Donate",
    "icon": "list-checks",
    "motif": "orbit",
    "accent": "#144CD9",
    "soft": "#DCE7FD",
    "satellites": [
      "hand-coins",
      "credit-card",
      "handshake"
    ]
  },
  "page/donate-online": {
    "collection": "pages",
    "slug": "donate-online",
    "title": "Online Donation",
    "icon": "credit-card",
    "motif": "orbit",
    "accent": "#144CD9",
    "soft": "#DCE7FD",
    "satellites": [
      "lock",
      "seal-check",
      "hand-coins"
    ]
  },
  "page/mobile-wallet": {
    "collection": "pages",
    "slug": "mobile-wallet",
    "title": "Mobile Wallet",
    "icon": "device-mobile",
    "motif": "pulse",
    "accent": "#7C3AED",
    "soft": "#EAE0FC",
    "satellites": [
      "qr-code",
      "hand-coins",
      "seal-check"
    ]
  },
  "page/bank-transfer": {
    "collection": "pages",
    "slug": "bank-transfer",
    "title": "Bank Transfer",
    "icon": "bank",
    "motif": "orbit",
    "accent": "#0D9488",
    "soft": "#D3F0EC",
    "satellites": [
      "buildings",
      "identification-badge",
      "hand-coins"
    ]
  },
  "page/meezan-app": {
    "collection": "pages",
    "slug": "meezan-app",
    "title": "Meezan Mobile App",
    "icon": "qr-code",
    "motif": "orbit",
    "accent": "#16A34A",
    "soft": "#DBF3E3",
    "satellites": [
      "device-mobile",
      "mosque",
      "hand-coins"
    ]
  },
  "page/cheque-donation": {
    "collection": "pages",
    "slug": "cheque-donation",
    "title": "Cheque or Bank Draft",
    "icon": "envelope-open",
    "motif": "breathe",
    "accent": "#475569",
    "soft": "#E2E8F0",
    "satellites": [
      "scroll",
      "map-pin",
      "hand-coins"
    ]
  },
  "page/pick-up-donation": {
    "collection": "pages",
    "slug": "pick-up-donation",
    "title": "Pick-Up Donation Service",
    "icon": "truck",
    "motif": "pulse",
    "accent": "#EA580C",
    "soft": "#FDE3D3",
    "satellites": [
      "package",
      "map-pin",
      "handshake"
    ]
  },
  "page/what-you-can-support": {
    "collection": "pages",
    "slug": "what-you-can-support",
    "title": "What You Can Support",
    "icon": "users-three",
    "motif": "breathe",
    "accent": "#E11D2E",
    "soft": "#FBE0E2",
    "satellites": [
      "gift",
      "hand-heart",
      "heart"
    ]
  },
  "page/donate-a-meal": {
    "collection": "pages",
    "slug": "donate-a-meal",
    "title": "Donate a Meal",
    "icon": "fork-knife",
    "motif": "breathe",
    "accent": "#D97706",
    "soft": "#FDEBD3",
    "satellites": [
      "bowl-food",
      "heart",
      "hand-heart"
    ]
  },
  "page/donate-in-kind": {
    "collection": "pages",
    "slug": "donate-in-kind",
    "title": "Donate in Kind",
    "icon": "package",
    "motif": "orbit",
    "accent": "#64748B",
    "soft": "#E2E8F0",
    "satellites": [
      "first-aid-kit",
      "pill",
      "handshake"
    ]
  },
  "page/sponsor-a-patient": {
    "collection": "pages",
    "slug": "sponsor-a-patient",
    "title": "Sponsor a Patient",
    "icon": "user-circle",
    "motif": "breathe",
    "accent": "#0D9488",
    "soft": "#D3F0EC",
    "satellites": [
      "hand-heart",
      "heartbeat",
      "users"
    ]
  },
  "page/sponsor-free-surgeries": {
    "collection": "pages",
    "slug": "sponsor-free-surgeries",
    "title": "Sponsor Free Surgeries",
    "icon": "scissors",
    "motif": "pulse",
    "accent": "#1B2A4A",
    "soft": "#E2E8F2",
    "satellites": [
      "first-aid",
      "hand-heart",
      "heartbeat"
    ]
  },
  "page/support-a-project": {
    "collection": "pages",
    "slug": "support-a-project",
    "title": "Support a Project",
    "icon": "buildings",
    "motif": "orbit",
    "accent": "#144CD9",
    "soft": "#DCE7FD",
    "satellites": [
      "hard-hat",
      "gear",
      "handshake"
    ]
  },
  "page/contact": {
    "collection": "pages",
    "slug": "contact",
    "title": "Contact",
    "icon": "phone",
    "motif": "orbit",
    "accent": "#144CD9",
    "soft": "#DCE7FD",
    "satellites": [
      "map-pin",
      "envelope",
      "chat-circle"
    ]
  },
  "page/complaints-and-feedback": {
    "collection": "pages",
    "slug": "complaints-and-feedback",
    "title": "Complaints and Feedback",
    "icon": "chat-circle-dots",
    "motif": "orbit",
    "accent": "#EA580C",
    "soft": "#FDE3D3",
    "satellites": [
      "envelope",
      "clipboard-text",
      "handshake"
    ]
  },
  "page/news": {
    "collection": "pages",
    "slug": "news",
    "title": "News",
    "icon": "newspaper",
    "motif": "orbit",
    "accent": "#475569",
    "soft": "#E2E8F0",
    "satellites": [
      "calendar-check",
      "megaphone",
      "bookmark"
    ]
  },
  "page/events": {
    "collection": "pages",
    "slug": "events",
    "title": "Events",
    "icon": "calendar-blank",
    "motif": "orbit",
    "accent": "#7C3AED",
    "soft": "#EAE0FC",
    "satellites": [
      "users",
      "map-pin",
      "ticket"
    ]
  },
  "page/success-stories": {
    "collection": "pages",
    "slug": "success-stories",
    "title": "Success Stories",
    "icon": "trophy",
    "motif": "breathe",
    "accent": "#D97706",
    "soft": "#FDEBD3",
    "satellites": [
      "heart",
      "sparkle",
      "users"
    ]
  },
  "page/publication-and-research": {
    "collection": "pages",
    "slug": "publication-and-research",
    "title": "Publication And Research",
    "icon": "book-open",
    "motif": "orbit",
    "accent": "#4F46E5",
    "soft": "#E1E3FB",
    "satellites": [
      "flask",
      "microscope",
      "pencil-simple"
    ]
  },
  "page/new-machinery": {
    "collection": "pages",
    "slug": "new-machinery",
    "title": "New Machinery",
    "icon": "gear",
    "motif": "orbit",
    "accent": "#64748B",
    "soft": "#E2E8F0",
    "satellites": [
      "cpu",
      "hospital",
      "sparkle"
    ]
  },
  "page/facts--statistics": {
    "collection": "pages",
    "slug": "facts--statistics",
    "title": "Facts & Statistics",
    "icon": "chart-bar",
    "motif": "orbit",
    "accent": "#144CD9",
    "soft": "#DCE7FD",
    "satellites": [
      "trend-up",
      "clipboard-text",
      "buildings"
    ]
  },
  "page/affiliations": {
    "collection": "pages",
    "slug": "affiliations",
    "title": "Affiliations",
    "icon": "handshake",
    "motif": "orbit",
    "accent": "#0D9488",
    "soft": "#D3F0EC",
    "satellites": [
      "buildings",
      "flag",
      "users"
    ]
  },
  "page/our-health-partners": {
    "collection": "pages",
    "slug": "our-health-partners",
    "title": "Our Health Partners",
    "icon": "handshake",
    "motif": "orbit",
    "accent": "#0D9488",
    "soft": "#D3F0EC",
    "satellites": [
      "hospital",
      "users",
      "heart"
    ]
  },
  "page/our-friends--supporters": {
    "collection": "pages",
    "slug": "our-friends--supporters",
    "title": "Our Supporters",
    "icon": "users",
    "motif": "breathe",
    "accent": "#E11D2E",
    "soft": "#FBE0E2",
    "satellites": [
      "heart",
      "handshake",
      "gift"
    ]
  },
  "page/our-compliance": {
    "collection": "pages",
    "slug": "our-compliance",
    "title": "Our Compliance",
    "icon": "shield-check",
    "motif": "orbit",
    "accent": "#475569",
    "soft": "#E2E8F0",
    "satellites": [
      "scales",
      "clipboard-text",
      "seal-check"
    ]
  },
  "page/awards-": {
    "collection": "pages",
    "slug": "awards-",
    "title": "Awards",
    "icon": "trophy",
    "motif": "pulse",
    "accent": "#D97706",
    "soft": "#FDEBD3",
    "satellites": [
      "medal",
      "sparkle",
      "flag"
    ]
  },
  "page/welfare-sharia": {
    "collection": "pages",
    "slug": "welfare-sharia",
    "title": "Welfare Sharia",
    "icon": "mosque",
    "motif": "breathe",
    "accent": "#16A34A",
    "soft": "#DBF3E3",
    "satellites": [
      "hand-heart",
      "coins",
      "heart"
    ]
  },
  "page/privacy-policy": {
    "collection": "pages",
    "slug": "privacy-policy",
    "title": "Privacy Policy",
    "icon": "lock",
    "motif": "orbit",
    "accent": "#475569",
    "soft": "#E2E8F0",
    "satellites": [
      "shield-check",
      "eye",
      "info"
    ]
  },
  "page/terms-and-conditions": {
    "collection": "pages",
    "slug": "terms-and-conditions",
    "title": "Terms and Conditions",
    "icon": "scroll",
    "motif": "orbit",
    "accent": "#64748B",
    "soft": "#E2E8F0",
    "satellites": [
      "scales",
      "clipboard-text",
      "info"
    ]
  },
  "page/404": {
    "collection": "pages",
    "slug": "404",
    "title": "Page not found",
    "icon": "magnifying-glass",
    "motif": "orbit",
    "accent": "#E30016",
    "soft": "#FBE0E2",
    "satellites": [
      "compass",
      "map-pin",
      "first-aid"
    ]
  }
}
