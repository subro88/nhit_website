#!/usr/bin/env python3
"""Seed about-society / admissions / placements / contact / mandatory-disclosure into pages.json."""
import json, copy, os

PAGES = 'src/data/pages.json'

data = json.load(open(PAGES))
backup = copy.deepcopy(data)
json.dump(backup, open('src/data/pages.json.pre-seed2.bak', 'w'), indent=2, ensure_ascii=False)

pages = {}

# ---------------------------------------------------------------- about-society
pages['about-society'] = {
    "layout": "sidebar",
    "meta": {
        "title": "About The Sponsoring Society | Durgapur Ispat People's Society — NHIT Durgapur",
        "description": "Durgapur Ispat People's Society (Reg. No. S/1L/18925), registered under the West Bengal Societies Registration Act XXVI of 1961, establishes and manages NHIT Durgapur.",
    },
    "kicker": "Sponsoring Body · Est. 2004–05",
    "badge": "Reg. No. S/1L/18925",
    "title": "About The Sponsoring Society",
    "subtitle": "The New Horizons Institute of Technology is established and managed by Durgapur Ispat People's Society, registered under the West Bengal Societies Registration Act XXVI of 1961.",
    "sections": [
        {
            "type": "text",
            "tag": "Genesis & Founding Vision",
            "heading": "Genesis of Durgapur Ispat People's Society",
            "paragraphs": [
                "**Durgapur Ispat People's Society** is a non-profit registered educational society registered with the Registrar of Societies, Government of West Bengal under the West Bengal Societies Registration Act XXVI of 1961 (Registration No. **S/1L/18925 of 2003–2004**).",
                "The idea germinated in **2004–2005**, when a distinguished collective of educators, industrial engineers, and philanthropic visionaries came together to realize their dream of spreading affordable, high-quality technical education throughout Eastern India.",
                "On **16 August 2007**, the Society founded its flagship institution, **The New Horizons Institute of Technology (NHIT)**, offering AICTE-approved diploma programs in Mechanical, Electrical, and Civil Engineering. Over subsequent years, the Society expanded into Computer Science, Automobile Engineering, Electronics, and NCVT ITI trades.",
            ],
            "callout": "“Durgapur had transformed into the primary industrial and educational hub of Eastern India, housing premier universities, engineering colleges, and secondary schools. However, a high-caliber polytechnic institution offering specialized 3-year diploma engineering tailored directly to core industries was conspicuously absent. The Society was formed to bridge this critical deficit.”",
            "calloutPos": 2,
        },
        {
            "type": "iconCards",
            "tag": "Charter & Values",
            "heading": "Core Aims & Objectives of the Society",
            "items": [
                {"icon": "CircleDot", "tone": "red", "title": "Democratize Technical Education", "desc": "Extend professional polytechnic engineering and vocational crafts to rural, semi-urban, and economically backward youth across eastern India."},
                {"icon": "CircleDot", "tone": "red", "title": "Industry-Aligned Curricula", "desc": "Bridge the critical gap between theoretical technical knowledge and heavy industrial requirements in the Durgapur-Asansol-Raniganj industrial corridor."},
                {"icon": "CircleDot", "tone": "red", "title": "State-of-the-Art Workshop Infrastructure", "desc": "Build and maintain modern physical laboratories, CNC tooling setups, high-voltage test bays, and computer laboratories exceeding AICTE requirements."},
                {"icon": "CircleDot", "tone": "red", "title": "Lifelong Employability & Foundership", "desc": "Instill workplace discipline, entrepreneurship aptitude through NEN, and ethical leadership to build resilient career trajectories."},
            ],
        },
        {
            "type": "text",
            "tag": "Statutory Records",
            "heading": "Registration & Governance Details",
            "kv": [
                {"label": "Name of Society", "value": "Durgapur Ispat People's Society"},
                {"label": "Act of Registration", "value": "West Bengal Societies Registration Act XXVI of 1961"},
                {"label": "Registration Number", "value": "S/1L/18925 of 2003–2004", "highlight": True},
                {"label": "Registered Office", "value": "Phase-II, City Center, South G.T. Road, Durgapur, Paschim Bardhaman — 713208"},
                {"label": "Flagship Institution", "value": "The New Horizons Institute of Technology (NHIT)"},
            ],
        },
    ],
}

# ---------------------------------------------------------------- admissions
BROCHURE = "https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf"
pages['admissions'] = {
    "layout": "full",
    "meta": {
        "title": "Admissions 2026–27 | Eligibility, Roadmap & Fee Structure — NHIT Durgapur",
        "description": "Complete admissions portal for NHIT Durgapur. 3-Year Diploma in Engineering (JEXPO / Direct), 2-Year VOCLET Lateral Entry, and NCVT ITI Trades. Verified fee structure and scholarship guidance.",
    },
    "kicker": "Session 2026–2027 Admissions Open · AICTE Approved",
    "title": "Admissions Hub",
    "subtitle": "Join eastern India's premier technical institute in Durgapur. Direct entry for Class 10 school leavers, 2nd-year lateral entry via VOCLET, and 2-year NCVT ITI trades.",
    "sections": [
        {
            "type": "stepCards",
            "centered": True,
            "columnsCount": 5,
            "tag": "Step-by-Step Guidance",
            "heading": "Admission Roadmap — Class 10 to Engineer",
            "sub": "A transparent, hassle-free 5-stage admission procedure designed for aspiring polytechnic and ITI candidates.",
            "items": [
                {"num": "01", "title": "Check Eligibility", "desc": "Class 10 (Madhyamik or equivalent) with Science, Mathematics & English. Minimum qualifying aggregate per Council norms. Relaxations apply for reserved/sports categories."},
                {"num": "02", "title": "Apply & Counsel", "desc": "Collect and submit application form at the NHIT Admission Desk (Phase-II, City Centre, Durgapur) or register online. Connect with departmental academic counsellors."},
                {"num": "03", "title": "Merit & Branch Selection", "desc": "Selection on Class 10 merit or state JEXPO rank following WBSCT&VE&SD norms. Branch preference is locked in directly with the admissions officer."},
                {"num": "04", "title": "Verify & Enroll", "desc": "Marksheets, admit card, Aadhaar ID proof, and passport photos are verified on the spot. Initial semester fee payment completes institutional enrolment."},
                {"num": "05", "title": "Begin Semester 1", "desc": "Campus induction, workshop floor allotment, and identity card issuance. Classes begin per State Council academic calendar with early workshop practice."},
            ],
        },
        {
            "type": "checkCards",
            "items": [
                {
                    "badge": "PATHWAY 01 · 3 YEARS (6 SEMESTERS)", "badgeTone": "blue",
                    "title": "1st Year Diploma Entry (After 10th / Madhyamik)",
                    "desc": "Direct entry for school pass-outs into foundational and applied technical sciences. Replaces general high school theory with hands-on workshop craft and state-certified diploma curriculum.",
                    "bullets": [
                        "Passed Class 10 / Madhyamik from any recognized Board with min. 35% aggregate marks.",
                        "Compulsory subjects: Mathematics, Physical Science, and English.",
                        "Valid rank in JEXPO counseling OR Direct Institutional Quota seat allotment.",
                        "No upper age limit as per AICTE and State Council directives.",
                    ],
                    "btnText": "Call Desk: (0343) 2542103", "btnHref": "tel:03432542103",
                },
                {
                    "badge": "PATHWAY 02 · 2 YEARS (4 SEMESTERS)", "badgeTone": "amber",
                    "title": "2nd Year Lateral Entry (VOCLET / ITI Pass-Outs)",
                    "desc": "Fast-track 2-year diploma pathway directly into 3rd Semester with full credit recognition for 10+2 Science / Vocational or 2-Year ITI certificate holders. Saves an entire academic year.",
                    "bullets": [
                        "Passed 10+2 with Physics/Chemistry/Math/Vocational OR 10th + 2-Year ITI trade.",
                        "Valid rank in VOCLET entrance examination conducted by WBSCTVESD.",
                        "Directly admitted to 3rd Semester across Mechanical, Electrical, Civil, CST, Automobile, ETCE.",
                        "Subsequent eligibility for B.Tech lateral entry through JELET.",
                    ],
                    "btnText": "Download 2026 Brochure (PDF)", "btnHref": BROCHURE, "btnTone": "red",
                },
            ],
        },
        {
            "type": "table",
            "tag": "Statutory Financial Disclosures",
            "heading": "Fee & Installment Scaffold",
            "paragraphs": [
                "NHIT follows transparent fee regulations stipulated by the State Fee Committee, Government of West Bengal, with installment payment flexibility.",
            ],
            "columns": ["Fee Head", "Schedule", "Policy Notes"],
            "rows": [
                {"main": "Tuition Fee", "cells": ["Per Semester", "As notified by WBSCT&VE&SD / Institute each session"]},
                {"main": "Admission & Registration", "cells": ["One-time (Sem 1)", "Council registration and administrative admission fee"]},
                {"main": "Laboratory & Workshop Fee", "cells": ["Per Semester", "Covers consumable workshop materials, tool access & lab power"]},
                {"main": "Examination Fee", "cells": ["Per Council Cycle", "Collected as per WBSCTVESD state examination schedule"]},
                {"main": "Institutional Development", "cells": ["Annual", "Library access, high-speed Wi-Fi & campus facilities"]},
            ],
            "note": "// Current session fee schedule is issued with the admission brochure. Confirm at admission desk or call +91 98005 71423.",
            "photoSrc": "/images/nhit-fees-2024.png",
            "photoTitle": "Official Fee Structure Notification",
            "photoSub": "Official publication document detailing branch-wise breakdown",
            "photoLinkText": "View Full-Size Document",
            "photoLinkHref": "/images/nhit-fees-2024.png",
        },
        {
            "type": "stepCards",
            "columnsCount": 4,
            "tag": "Financial Aid & Inclusivity",
            "heading": "Government Scholarship Guidance",
            "sub": "NHIT has a dedicated SC/ST/OBC and Minority Welfare Cell that actively facilitates student scholarship applications on state and national portals:",
            "items": [
                {"badge": "₹18,000 / Year", "badgeTone": "green", "title": "Swami Vivekananda Merit-cum-Means (SVMCM)", "sub": "Govt. of West Bengal Higher Education Dept.", "desc": "Min. 60% in Madhyamik / Class 10 for family income < ₹2.5 Lakhs/yr", "footer": "Full Application Assistance at NHIT Desk", "footerTone": "green"},
                {"badge": "Tuition + Maintenance Grants", "badgeTone": "green", "title": "OASIS Scholarship", "sub": "Backward Classes Welfare Dept., Govt. of West Bengal", "desc": "Eligible SC, ST, and OBC candidates enrolled in full-time diploma courses", "footer": "Full Application Assistance at NHIT Desk", "footerTone": "green"},
                {"badge": "State Fellowship Support", "badgeTone": "green", "title": "Aikyashree Scholarship", "sub": "West Bengal Minorities Development & Finance Corp.", "desc": "Merit-cum-means scholarship for minority community students (Muslim, Christian, etc.)", "footer": "Full Application Assistance at NHIT Desk", "footerTone": "green"},
                {"badge": "Annual Grant for Girl Students", "badgeTone": "green", "title": "Kanyashree Prakalpa (K2 & K3)", "sub": "Women & Social Welfare Dept., Govt. of West Bengal", "desc": "Empowering female technical candidates pursuing diploma engineering", "footer": "Full Application Assistance at NHIT Desk", "footerTone": "green"},
            ],
        },
        {
            "type": "banner",
            "badge": "Personalized Counseling",
            "heading": "Need Help Choosing the Right Engineering Branch?",
            "paragraphs": [
                "Visit our City Centre campus counseling center or speak directly with our senior admission advisors. We walk you through branch career prospects, lab tours, and fee installment schedules.",
            ],
            "btnText": "+91 98005 71423", "btnHref": "tel:+919800571423",
            "btn2Text": "WhatsApp Counseling ↗", "btn2Href": "https://wa.me/917407294943", "btn2Tone": "emerald",
        },
    ],
}

# ---------------------------------------------------------------- placements
pages['placements'] = {
    "layout": "full",
    "meta": {
        "title": "Training & Placements | Recruiter Wall & Placement Metrics — NHIT Durgapur",
        "description": "Official Training & Placement (T&P) portal of NHIT Durgapur. 80–85% placement rate, 14+ alumni batches, marquee core & IT recruiters (Tata Motors, L&T, Cummins), and brochure download.",
    },
    "kicker": "Industry-Ready Polytechnic Engineers · 14+ Graduating Batches",
    "title": "Training & Placements",
    "subtitle": "Bridging classroom rigor with core shop-floor craftsmanship. NHIT graduates are trusted by India's leading automotive, steel, power, and software engineering giants.",
    "sections": [
        {
            "type": "helplines",
            "boxes": [
                {"title": "Placed or Lateral B.Tech", "value": "80–85%", "note": "Interested & eligible final-year candidates", "color": "red"},
                {"title": "Batches Graduated", "value": "14+", "note": "Continuous track record since est. 2007", "color": "red"},
                {"title": "Higher Studies Progression", "value": "15–20%", "note": "Admitted to elite B.Tech lateral engineering", "color": "red"},
                {"title": "Corporate Hiring Partners", "value": "50+", "note": "Tier-1 manufacturing, energy & IT companies", "color": "red"},
            ],
        },
        {"type": "placementRadar"},
        {
            "type": "logoWall",
            "tag": "Corporate Recruiters",
            "heading": "Where Our Diploma Engineers Work",
            "sub": "Our graduates are employed across heavy engineering, automotive manufacturing, power utilities, and infrastructure projects nationwide.",
            "items": [
                {"src": "/images/rec-tata.png", "alt": "Tata Motors"},
                {"src": "/images/rec-lt.png", "alt": "Larsen & Toubro"},
                {"src": "/images/rec-cummins.png", "alt": "Cummins India"},
                {"src": "/images/rec-magna.png", "alt": "Magna Automotive"},
                {"src": "/images/rec-force.png", "alt": "Force Motors"},
                {"src": "/images/rec-kiswok.jpg", "alt": "Kiswok Industries"},
                {"src": "/images/rec-mate.jpg", "alt": "MATE"},
                {"src": "/images/rec-wmark.jpg", "alt": "Campus Recruiter Partner"},
                {"src": "/images/rec-hex.png", "alt": "Piaggio Vehicles"},
                {"name": "JOHN DEERE", "cat": "Agri-Machinery"},
                {"name": "JBM GROUP", "cat": "Auto Systems"},
                {"name": "TIL INDIA", "cat": "Heavy Equipment"},
                {"name": "ANAND GROUP", "cat": "Automotive Components"},
                {"name": "SHARDA MOTORS", "cat": "Automotive Exhaust"},
                {"name": "HCL TECH", "cat": "Technology Partner"},
                {"name": "SCHNEIDER ELECTRIC", "cat": "Power & Switchgear"},
                {"name": "TATA POWER", "cat": "Renewable & Distribution"},
            ],
        },
        {
            "type": "stepCards",
            "columnsCount": 4,
            "tag": "Holistic Employability",
            "heading": "Training & Placement Cell Roadmap",
            "sub": "Starting from the 3rd semester, every student undergoes continuous employability training designed by industrial advisors:",
            "items": [
                {"num": "01", "title": "Aptitude & Quantitative Problem Solving", "desc": "Rigorous weekly problem sets covering numerical ability, data interpretation, and abstract reasoning for corporate entry tests.", "footer": "Mandatory Semester Module", "footerTone": "green"},
                {"num": "02", "title": "Technical Core Viva & Domain Drills", "desc": "Faculty-mentored mock viva sessions covering machines, circuit diagrams, AutoCAD blueprints, and software system architectures.", "footer": "Mandatory Semester Module", "footerTone": "green"},
                {"num": "03", "title": "Corporate Soft Skills & Group Discussions", "desc": "Spoken English labs, corporate email etiquette, personality development workshops, and mock GD rounds.", "footer": "Mandatory Semester Module", "footerTone": "green"},
                {"num": "04", "title": "Industrial Safety & Shop Floor Discipline", "desc": "Certification in industrial safety, PPE guidelines, 5S workplace principles, and preventive plant maintenance.", "footer": "Mandatory Semester Module", "footerTone": "green"},
            ],
        },
        {
            "type": "banner",
            "badge": "For Corporate HR & Campus Hiring Teams",
            "heading": "Recruiter Placement Brochure — Verified Distribution",
            "paragraphs": [
                "The annual campus placement booklet containing graduating batch demographics, discipline-wise candidate counts, and laboratory profiles is shared directly with verified recruitment partners.",
            ],
            "btnText": "Request Brochure →", "btnHref": "mailto:info@nhit.in?subject=Recruiter%20Brochure%20Request%20—%20NHIT",
            "btn2Text": "(0343) 254-2103", "btn2Href": "tel:03432542103", "btn2Tone": "dark",
        },
    ],
}

# ---------------------------------------------------------------- contact
MAP_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.4300300613247!2d87.30403337602377!3d23.553018296347077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f77227d8ce6017%3A0x1ff4a0ff8e67a4d5!2sThe%20New%20Horizons%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
pages['contact'] = {
    "layout": "full",
    "meta": {
        "title": "Contact NHIT Durgapur | Admission Helplines, Campus Address & Inquiry Form",
        "description": "Contact The New Horizons Institute of Technology, Durgapur — admission helplines (+91 98005 71423), campus address at City Centre Durgapur, official emails, inquiry form and campus map.",
    },
    "kicker": "Campus Communication & Direct Helplines",
    "title": "Contact NHIT Durgapur",
    "subtitle": "Connect with our admission desk, principal's office, training cell, or visit our central campus in Durgapur City Centre.",
    "sections": [
        {
            "type": "contactCards",
            "items": [
                {
                    "icon": "PhoneCall", "iconTone": "red", "label": "// Admissions Desk", "title": "Direct Helplines",
                    "lines": [
                        {"text": "+91 98005 71423", "href": "tel:+919800571423", "sub": "Primary Admission Mobile"},
                        {"text": "+91 74072 94943", "href": "tel:+917407294943", "sub": "Counseling & WhatsApp Line"},
                        {"text": "Landlines: (0343) 254-2102 / 03 / 06 / 08", "dividerBefore": True},
                        {"text": "Fax: (0343) 254-2106"},
                    ],
                    "btnText": "Chat on WhatsApp", "btnHref": "https://wa.me/917407294943", "btnTone": "emerald",
                },
                {
                    "icon": "MapPin", "iconTone": "blue", "label": "// Campus Address", "title": "Durgapur Campus",
                    "lines": [
                        {"text": "The New Horizons Institute of Technology", "bold": True},
                        {"text": "Phase-II, City Center, South G.T. Road,"},
                        {"text": "Near Gandhi More, Durgapur – 713208,"},
                        {"text": "Paschim Bardhaman, West Bengal, India."},
                        {"text": "• 5 mins from City Centre Bus Terminus", "dividerBefore": True},
                        {"text": "• 4.5 km from Durgapur Railway Station (DGR)"},
                        {"text": "• 18 km from Kazi Nazrul Islam Airport (RKN)"},
                    ],
                    "btnText": "Get Driving Directions", "btnHref": "https://maps.google.com/?q=The+New+Horizons+Institute+of+Technology+Durgapur", "btnTone": "dark",
                },
                {
                    "icon": "Mail", "iconTone": "purple", "label": "// Digital Channels", "title": "Official Channels",
                    "lines": [
                        {"text": "General Inquiries", "kicker": True},
                        {"text": "info@nhit.in", "href": "mailto:info@nhit.in"},
                        {"text": "Principal's Desk", "kicker": True},
                        {"text": "principal@nhit.in", "href": "mailto:principal@nhit.in"},
                        {"text": "[Facebook ↗](https://facebook.com/nhit.in) • [LinkedIn ↗](https://linkedin.com/school/the-new-horizons-institute-of-technology) • [YouTube ↗](https://youtube.com/channel/UCEHFtTcABsXgNYkX-vE7BXA)", "dividerBefore": True},
                    ],
                    "btnText": "Institute Brochure (PDF)", "btnHref": BROCHURE, "btnTone": "light",
                },
            ],
        },
        {
            "type": "inquiryForm",
            "tag": "Fast Academic Response",
            "heading": "Send an Academic or Admission Inquiry",
            "sub": "Our career counseling cell will contact you within 24 hours with syllabus brochures and fee details.",
            "nameLabel": "Student Full Name *", "namePh": "e.g. Rahul Sharma",
            "phoneLabel": "Mobile / WhatsApp No. *", "phonePh": "e.g. +91 98765 43210",
            "emailLabel": "Email Address", "emailPh": "student@example.com",
            "branchLabel": "Course / Branch of Interest *",
            "options": [
                "Computer Science & Technology (CST)",
                "Diploma in Mechanical Engineering (ME)",
                "Diploma in Electrical Engineering (EE)",
                "Diploma in Civil Engineering (CE)",
                "Diploma in Electronics & Telecom (ETCE)",
                "Diploma in Automobile Engineering (AE)",
                "NCVT ITI Electrician Trade",
                "NCVT ITI Fitter Trade",
            ],
            "queryLabel": "Questions or Specific Queries",
            "queryPh": "Ask about hostel facilities, JEXPO/VOCLET counseling, fee installment schedules, or scholarship eligibility...",
            "submitLabel": "Submit Inquiry to Admission Cell",
            "successTitle": "Inquiry Received Successfully!",
            "successText": "Thank you for reaching out, {name}. An NHIT academic counselor will contact you at {phone} regarding the {branch} program.",
            "resendLabel": "Send Another Inquiry",
            "hoursTitle": "Administrative Hours",
            "hoursRows": [
                {"day": "Monday – Friday:", "time": "10:00 AM – 5:00 PM"},
                {"day": "Saturday:", "time": "10:00 AM – 3:30 PM"},
                {"day": "Sunday & Public Holidays:", "time": "Closed", "danger": True},
            ],
            "transitTitle": "Transit & Accessibility",
            "transitText": "NHIT is situated in prime City Centre Durgapur, directly accessible via South Bengal State Transport (SBSTC), City Minibuses, and auto-rickshaws terminating at Gandhi More.",
        },
        {
            "type": "mapEmbed",
            "heading": "The New Horizons Institute of Technology Campus Location",
            "embedUrl": MAP_URL,
        },
    ],
}

# ------------------------------------------------------- mandatory-disclosure
pages['mandatory-disclosure'] = {
    "layout": "sidebar",
    "meta": {
        "title": "Mandatory Disclosure | AICTE Compliance & Institutional Governance — NHIT Durgapur",
        "description": "Official AICTE Mandatory Disclosure for The New Horizons Institute of Technology (NHIT Durgapur). Comprehensive statutory information on governance, approved intakes, faculty, and student redressal cells.",
    },
    "title": "Mandatory Disclosure",
    "subtitle": "Statutory disclosures under AICTE Approval Process Handbook regulations, detailing legal registration, infrastructure metrics, sanctioned intake capacities, faculty credentials, and grievance mechanisms.",
    "sections": [
        {
            "type": "text",
            "pill": "AICTE Statutory Compliance",
            "pillNote": "Updated as per Current Regulations",
            "heading": "1. Basic Institutional Profile",
            "paragraphs": [
                "In compliance with the regulations formulated by the **All India Council for Technical Education (AICTE)**, New Delhi, and the **West Bengal State Council of Technical and Vocational Education and Skill Development (WBSCTE)**, Kolkata, The New Horizons Institute of Technology publishes its comprehensive institutional profile for public transparency and statutory governance verification.",
            ],
            "kv": [
                {"label": "Name of Institution", "value": "THE NEW HORIZONS INSTITUTE OF TECHNOLOGY (NHIT)"},
                {"label": "AICTE Permanent ID", "value": "1-475249561 (First Approved in 2007)", "highlight": True},
                {"label": "Campus Address", "value": "Phase-II, City Centre, South G.T. Road, Near Gandhi More, Durgapur, Paschim Bardhaman, West Bengal – 713208"},
                {"label": "Campus Phone & Fax", "value": "Phone: (0343) 2542102 / 2542103 / 2542104 / 2542106 | Fax: (0343) 2542106"},
                {"label": "Official Email & Web", "value": "[info@nhit.in](mailto:info@nhit.in) / [principal@nhit.in](mailto:principal@nhit.in) | www.nhit.in"},
                {"label": "Nearest Railway & Airport", "value": "Railway: Durgapur Railway Station (DGR - 4.5 km) | Airport: Kazi Nazrul Islam Airport, Andal (RKN - 18 km) & NSCBI Kolkata (CCU - 165 km)"},
                {"label": "Institution Type", "value": "Private Self-Financed Polytechnic Institute (Non-Autonomous, Co-Educational)"},
            ],
            "note": "The institute operates on a unified, self-contained **2.50 Acre institutional land parcel** in prime Durgapur City Centre, granted via official long-term government lease registered with the **Asansol Durgapur Development Authority (ADDA)**, Government of West Bengal. The entire educational building infrastructure is fully sanctioned and custom-constructed for technical education.",
            "noteTitle": "Campus Land & Title Verification",
            "noteTone": "amber",
            "noteIcon": "Building",
        },
        {
            "type": "text",
            "heading": "2. Sponsoring Society / Trust Information",
            "paragraphs": [
                "The New Horizons Institute of Technology was founded and is managed by **Durgapur Ispat Peoples' Society**, a registered non-profit educational body dedicated to industrial skill advancement and higher technical learning in eastern India.",
            ],
            "kv": [
                {"label": "Name of Society", "value": "DURGAPUR ISPAT PEOPLES' SOCIETY"},
                {"label": "Registration Type & Act", "value": "Registered under West Bengal Societies Registration Act XXVI of 1961 (Reg. No. S/1L/18925)"},
                {"label": "Registered Office", "value": "6/7, Einstein Avenue, B-Zone, Durgapur – 713205, Paschim Bardhaman, West Bengal"},
                {"label": "Corporate / Campus Office", "value": "NHIT Campus, Phase-II, City Centre, South G.T. Road, Near Gandhi More, Durgapur – 713208"},
                {"label": "Contact Numbers", "value": "+91 9332038481 / +91 9332038482 / (0343) 2542106"},
                {"label": "Society Official Email", "value": "[dipsdgp@rediffmail.com](mailto:dipsdgp@rediffmail.com) / [info@nhit.in](mailto:info@nhit.in)"},
            ],
        },
        {
            "type": "text",
            "heading": "3. Head of the Institution (Principal)",
            "kv": [
                {"label": "Principal Name", "value": "Mr. Sandip Hazra"},
                {"label": "Designation", "value": "Principal, The New Horizons Institute of Technology"},
                {"label": "Academic Qualifications", "value": "B.Tech (Electrical Engineering), M.Tech (Electrical Engineering)"},
                {"label": "Specialization Area", "value": "Power Systems Engineering & Industrial Power Plant Drives"},
                {"label": "Total Experience", "value": "18+ Years in Technical Education, Academic Administration & Research"},
                {"label": "Official Telephone & Mobile", "value": "Office: (0343) 2542106 | Mobile: +91 81609 09460"},
                {"label": "Official Email", "value": "[principal@nhit.in](mailto:principal@nhit.in)"},
            ],
        },
        {
            "type": "table",
            "heading": "4. Programmes Offered & Approved Intakes",
            "paragraphs": [
                "All diploma programs are run in strict compliance with the AICTE Approved Intake Matrix, featuring full-time 3-year curriculum (6 semesters) affiliated with WBSCTE:",
            ],
            "columns": ["Course Name", "Level", "Duration", "Sanctioned Intake", "Affiliating Body"],
            "rows": [
                {"main": "Diploma in Mechanical Engineering (ME)", "cells": ["Diploma", "3 Years", "120 Seats", "AICTE / WBSCTE"]},
                {"main": "Diploma in Electrical Engineering (EE)", "cells": ["Diploma", "3 Years", "120 Seats", "AICTE / WBSCTE"]},
                {"main": "Diploma in Civil Engineering (CE)", "cells": ["Diploma", "3 Years", "60 Seats", "AICTE / WBSCTE"]},
                {"main": "Diploma in Computer Science & Technology (CST)", "cells": ["Diploma", "3 Years", "60 Seats", "AICTE / WBSCTE"]},
                {"main": "Diploma in Automobile Engineering (AE)", "cells": ["Diploma", "3 Years", "60 Seats", "AICTE / WBSCTE"]},
                {"main": "Diploma in Electronics & Telecommunication (ETCE)", "cells": ["Diploma", "3 Years", "60 Seats", "AICTE / WBSCTE"]},
                {"main": "ITI Electrician Trade", "cells": ["NCVT Certificate", "2 Years", "20 Seats", "DGT / NCVT Govt. of India"]},
                {"main": "ITI Fitter Trade", "cells": ["NCVT Certificate", "2 Years", "20 Seats", "DGT / NCVT Govt. of India"]},
            ],
            "foot": {"main": "Total Approved Annual Intake", "cells": ["All Disciplines", "—", "520 Students / Year", "Full AICTE & NCVT Quota"]},
        },
        {
            "type": "checkCards",
            "heading": "5. Statutory Grievance & Welfare Committees",
            "paragraphs": [
                "To preserve student equity, mental wellbeing, academic fairness, and complete campus security, the following statutory bodies are instituted and functional:",
            ],
            "items": [
                {"tone": "red", "title": "Anti-Ragging Committee & Squad", "desc": "Operates 24x7 with faculty patrolling, student counsellors, local police liaison, and mandatory online undertaking via anti-ragging portal. Zero tolerance enforcement.", "linkText": "View Roster & Helpline →", "linkHref": "/anti-ragging-committee"},
                {"tone": "blue", "title": "Internal Complaints Committee (ICC)", "desc": "Constituted under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, ensuring safe learning environment for female students and staff."},
                {"tone": "green", "title": "Student Grievance Redressal Cell (SGRC)", "desc": "Headed by Senior Faculty for examination, hostel, transport, or administrative appeals with statutory resolution timeframes."},
                {"tone": "purple", "title": "SC / ST / OBC & Minority Cell", "desc": "Dedicated cell supervising state scholarships (SVMCM, OASIS, Aikyashree, National Scholarship Portal) and ensuring affirmative counseling without bias."},
            ],
        },
        {
            "type": "docCards",
            "heading": "6. Official Statutory Disclosure Documents",
            "paragraphs": [
                "Students, parents, regulatory inspection officers, and academic auditors may access and download authentic scanned disclosure dossiers:",
            ],
            "items": [
                {"icon": "FileText", "title": "AICTE Mandatory Disclosure (Complete Booklet)", "sub": "Official AICTE Formatted Dossier · PDF Document", "btnText": "Download PDF Booklet", "btnHref": BROCHURE, "btnTone": "red"},
                {"icon": "ShieldCheck", "iconTone": "blue", "title": "AICTE Extension of Approval (EoA) Archive", "sub": "Annual Extension of Approval Archive (2007–Present)", "btnText": "View Approval Letters", "btnHref": "/approval-affiliation-association", "btnTone": "dark"},
            ],
        },
    ],
}

# merge & write
data.update(pages)
json.dump(data, open(PAGES, 'w'), indent=2, ensure_ascii=False)
print('Seeded pages:', ', '.join(pages.keys()))
print('Total pages in pages.json:', len(data))
