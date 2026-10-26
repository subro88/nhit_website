#!/usr/bin/env python3
"""Seed infrastructure / student-life / about / iti-courses into pages.json,
extracting the exact content currently hardcoded in each page component."""
import json

P = '/home/z/my-project/src/data/pages.json'
data = json.load(open(P))

data['our-infrastructure'] = {
    "kicker": "Campus & Facilities Tour",
    "badge": "40+ Laboratories",
    "title": "Our Infrastructure",
    "subtitle": "Explore our sprawling educational campus in City Center, Durgapur — engineered with state-of-the-art laboratory bays, high-speed computing, and comprehensive student amenities.",
    "layout": "sidebar",
    "sections": [
        {
            "type": "text",
            "tag": "Campus Environment",
            "heading": "Built for Hands-On Engineering Mastery",
            "paragraphs": [
                "Strategically situated at **Phase-II, City Center, Durgapur** near Gandhi More, the NHIT campus offers an expansive, peaceful, and technologically vibrant learning environment. Connected directly to National Highway 19 (Grand Trunk Road) and Durgapur Railway Station, students enjoy effortless transit.",
                "Every square meter of the academic complex has been planned according to **AICTE norms**, featuring heavy floor-load capacity for industrial machinery, proper acoustic separation for workshops, fire-safety hydrants, and uninterrupted high-capacity power backup."
            ],
            "photos": [
                {"src": "/images/hero-campus.jpg", "caption": "Main Academic Block"},
                {"src": "/images/hero-computers.jpg", "caption": "Central Computing Lab"},
                {"src": "/images/lab-mechanical.jpg", "caption": "Mechanical Machine Bay"}
            ],
            "photoStyle": "card"
        },
        {
            "type": "iconCards",
            "tag": "Amenities & Specialized Units",
            "heading": "Key Campus Infrastructure Pillars",
            "items": [
                {"icon": "Cog", "tone": "red", "title": "40+ Advanced Engineering Laboratories", "desc": "Dedicated practical bays for all 6 disciplines — CNC machining centres, hydraulics, electrical machines, material testing UTM, soil mechanics, and automotive engine testbeds."},
                {"icon": "Cpu", "tone": "red", "title": "Central Computing & Optical Fiber Hub", "desc": "Multiple air-conditioned computer laboratories equipped with high-end workstations, Linux/Windows dual-boot environments, gigabit LAN, and 100 Mbps leased line Internet."},
                {"icon": "BookOpen", "tone": "red", "title": "Central Library & Digital Repository", "desc": "Vast physical collection of 25,000+ technical volumes, National & International journals, DELNET e-resources, British Council literature access, and spacious reading halls."},
                {"icon": "Building2", "tone": "red", "title": "Smart Classrooms & Seminar Halls", "desc": "Acoustically treated lecture theatres equipped with high-definition digital projectors, smart podiums, and public address audio systems for seminars and workshops."},
                {"icon": "Shield", "tone": "red", "title": "On-Campus Hostels (Boys & Girls)", "desc": "Secure residential facilities with round-the-clock CCTV surveillance, biometric access, hygienic mess facilities, dedicated resident wardens, and 24-hour power backup."},
                {"icon": "Bus", "tone": "red", "title": "Institute Bus Transportation Fleet", "desc": "Convenient fleet of college buses serving key transport corridors including Asansol, Raniganj, Andal, Jamuria, and Bardhaman for day scholars."},
                {"icon": "HeartPulse", "tone": "red", "title": "Healthcare Center & First-Aid", "desc": "Dedicated on-campus medical inspection room with basic diagnostic tools, first-aid supplies, and on-call ambulance ties with leading Durgapur super-specialty hospitals."},
                {"icon": "Coffee", "tone": "red", "title": "Cafeteria & Student Recreation", "desc": "Spacious student cafeteria serving hygienic meals, snacks, and beverages, alongside indoor table tennis, badminton, and outdoor cricket/football sports fields."}
            ]
        }
    ]
}

data['student-life'] = {
    "kicker": "Vibrant Campus Ecosystem · Co-Curricular & Research Hubs",
    "title": "Student Life & Innovation",
    "subtitle": "Learning continues after the last bell: national engineering societies, joint research with CSIR-CMERI, annual Horizon festivals, sports tournaments, and active student clubs.",
    "layout": "full",
    "sections": [
        {
            "type": "hubCards",
            "tag": "Active Chapters & Cells",
            "heading": "Innovation Hubs & Activity Tracks",
            "sub": "Our registered institutional MoUs and society memberships provide students with national platforms, research projects, and startup acceleration.",
            "items": [
                {"code": "HUB: NEN Cell", "status": "MoU Active", "statusColor": "emerald", "title": "Entrepreneurship Cell", "track": "Foundership & Startups", "mode": "All Branches Eligible", "accent": "#ff3115", "icon": "Rocket", "desc": "National Entrepreneurship Network membership — startup ideation bootcamps, business-plan drills, investor pitch decks, and annual E-season events for student founders."},
                {"code": "HUB: CSIR Track", "status": "Govt. MoU Active", "statusColor": "blue", "title": "CSIR-CMERI Project Track", "track": "R&D / Advanced Testing", "mode": "Project-Based", "accent": "#00bcd4", "icon": "FlaskConical", "desc": "Joint engineering research, live plant visits, and instrumentation exposure with Central Mechanical Engineering Research Institute (CSIR-CMERI) right in Durgapur."},
                {"code": "HUB: ISTE Chapter", "status": "Member Institution", "statusColor": "purple", "title": "ISTE Students Chapter", "track": "Technical Seminars", "mode": "Campus Symposia", "accent": "#92278f", "icon": "Sparkles", "desc": "Indian Society for Technical Education programmes — academic symposiums, coding marathons, skill workshops, and faculty-student technical conventions."},
                {"code": "HUB: IE(I) Chapter", "status": "Life Institutional Member", "statusColor": "amber", "title": "IE(I) Student Chapter", "track": "Professional Cadre", "mode": "Chapter Meets", "accent": "#fc7f0c", "icon": "Award", "desc": "Institution of Engineers (India) institutional membership — senior guest lectures, paper presentations, professional networking, and national engineering symposiums."},
                {"code": "HUB: BCL Access", "status": "Institutional Member", "statusColor": "indigo", "title": "British Council Library", "track": "Global Journals & English", "mode": "Member Card Access", "accent": "#4f46e5", "icon": "BookOpen", "desc": "Direct institutional access to the British Council Library network — international peer-reviewed journals, IELTS preparation materials, and advanced reading culture."},
                {"code": "HUB: Workshop Floor", "status": "Daily Practice", "statusColor": "cyan", "title": "Workshop & Garage Practice", "track": "Hands-On Craft", "mode": "Scheduled Lab Benches", "accent": "#0891b2", "icon": "Wrench", "desc": "Fitting, welding, lathe machining, and automotive garage bays — where hands-on craft meets council engineering theory. Industrial plant tours scheduled every session."}
            ]
        },
        {
            "type": "banner",
            "badge": "Campus Landmark Event",
            "heading": "Annual Technical Symposium & Cultural Horizon Fest",
            "paragraphs": [
                "The flagship campus fest returns each year with multi-college robo-races, CAD drafting challenges, coding hackathons, project model expos, and energetic musical evenings."
            ],
            "btnText": "Watch Event Circulars",
            "btnHref": "/circulars"
        },
        {
            "type": "photoGrid",
            "heading": "Life on the NHIT Campus",
            "sub": "Glimpses of daily academic, social, and recreational facilities in Durgapur",
            "linkText": "Tour Full Campus Infrastructure →",
            "linkHref": "/our-infrastructure",
            "photoStyle": "overlay",
            "columnsCount": 4,
            "photos": [
                {"src": "/images/campus-library.jpg", "caption": "Central Library & Reading Hall (25,000+ Books)"},
                {"src": "/images/campus-cafeteria.jpg", "caption": "Spacious Student Cafeteria & Dining"},
                {"src": "/images/campus-auditorium.jpg", "caption": "Annual Fest & Seminar Auditorium"},
                {"src": "/images/campus-ground.jpg", "caption": "Football & Cricket Sports Pavilion"}
            ]
        }
    ]
}

data['about'] = {
    "kicker": "Institutional Profile · Est. 2007",
    "badge": "18+ Years Legacy",
    "title": "About The New Horizons Institute of Technology",
    "subtitle": "One of Eastern India's largest diploma engineering institutes — six specialised engineering disciplines, two ITI trades, and 40+ laboratories in Durgapur, West Bengal.",
    "layout": "sidebar",
    "sections": [
        {
            "type": "text",
            "tag": "Genesis & Heritage",
            "heading": "Engineering Futures in Eastern India",
            "paragraphs": [
                "**The New Horizons Institute of Technology (NHIT)** opened its first academic session on **16 August 2007** at Durgapur. Established under the aegis of **Durgapur Ispat People's Society** (registered under the West Bengal Societies Registration Act XXVI of 1961), NHIT was founded with a singular conviction: to create an institution where technical education is rigorous, hands-on, and accessible to students across West Bengal and neighboring states.",
                "Today, NHIT is one of eastern India's largest diploma engineering institutes by student intake, running six diploma branches and an NCVT-approved Private ITI. The institute's foundational pass-out batch set the standard: **85% moved directly into industry employment or B.Tech lateral entry**."
            ],
            "stats": [
                {"value": "18+ Years", "label": "Est. 2007", "color": "red"},
                {"value": "40+ Labs", "label": "Campus Floor", "color": "dark"},
                {"value": "80–85%", "label": "Placement Record", "color": "green"},
                {"value": "6,000+", "label": "Alumni Network", "color": "cyan"}
            ]
        },
        {
            "type": "visionMission",
            "visionEmoji": "🎯",
            "visionTitle": "Our Vision",
            "visionText": "To emerge as a premier centre of excellence in polytechnic engineering, technical craftsmanship, and management education in Eastern India — cultivating innovation, industry-ready competency, and ethical leadership.",
            "missionEmoji": "🚀",
            "missionTitle": "Our Mission",
            "missionItems": [
                "**Workshop-First Pedagogy:** Hands-on machinery from Semester One.",
                "**Industry & Research Ties:** Active MoUs with CSIR-CMERI and top MNCs.",
                "**Affordable Access:** Subsidized training with SVMCM and OASIS support."
            ]
        },
        {
            "type": "milestones",
            "tag": "Timeline",
            "heading": "Milestones of an 18-Year Educational Journey",
            "items": [
                {"year": "2007", "title": "First Academic Session", "desc": "Inaugurated on 16 August 2007 with core diploma branches in Mechanical, Electrical, and Civil Engineering."},
                {"year": "2010", "title": "First Graduating Batch", "desc": "First graduating class achieved 85% placement and B.Tech lateral entry success, establishing recruitment benchmark."},
                {"year": "2014", "title": "NCVT ITI Establishment", "desc": "Establishment of NHIT Private ITI offering Electrician and Fitter trade certifications with dedicated workshop bays."},
                {"year": "2020", "title": "CSIR-CMERI Research MoU", "desc": "Formal partnership with CSIR-CMERI Durgapur, facilitating high-end research exposure and faculty development programs."},
                {"year": "2026", "title": "Undergraduate Wing (MAKAUT)", "desc": "Launch of MAKAUT-affiliated Bachelor of Computer Applications (BCA), BBA, and BBA Hospital Management."}
            ]
        },
        {
            "type": "linkCards",
            "tag": "Governance Desk",
            "heading": "Institutional Leadership Messages",
            "items": [
                {"emoji": "🏛️", "title": "President & Secretary", "desc": "Sponsoring body vision, trust history, and expansion charter.", "href": "/messages-from-president-secretary"},
                {"emoji": "🎓", "title": "Principal’s Desk", "desc": "Academic rigor, laboratory excellence, and career pathways.", "href": "/message-from-principal"},
                {"emoji": "🛡️", "title": "Vice Principal", "desc": "Student welfare, anti-ragging security, and scholarships.", "href": "/message-from-vice-principal"}
            ]
        },
        {
            "type": "grid",
            "tag": "Credibility & Networks",
            "heading": "Institutional Affiliations, MoUs & Memberships",
            "items": [
                {"title": "CSIR-CMERI Durgapur", "type": "Govt. of India MoU", "desc": "Research exposure, joint technical workshops, and engineering instrumentation projects."},
                {"title": "National Entrepreneurship Network (NEN)", "type": "Incubation Partner", "desc": "Startup mentoring, business plan bootcamps, and student enterprise incubation."},
                {"title": "HCL Technologies", "type": "Industry Tie-Up", "desc": "Enterprise skills training, campus recruitment drives, and cloud labs support."},
                {"title": "The Institution of Engineers (India)", "type": "Life Institutional Member", "desc": "Professional engineering chapter activities, technical paper presentations, and seminars."},
                {"title": "Indian Society for Technical Education (ISTE)", "type": "National Member", "desc": "Faculty development programs and student technical convention representation."},
                {"title": "British Council Library", "type": "Knowledge Access", "desc": "Digital technical repository and international language lab learning resources."}
            ]
        }
    ]
}

data['iti-courses'] = {
    "kicker": "DGT / NCVT Govt. of India Approved · DGT-6/25/12/2014-TC",
    "title": "NCVT Industrial Training Institute (ITI)",
    "subtitle": "Master high-demand technical craftsmanship with national certification, 100% practical machinery training, direct railway/PSU eligibility, and diploma lateral entry pathways.",
    "layout": "full",
    "sections": [
        {
            "type": "helplines",
            "boxes": [
                {"title": "Affiliation Body", "value": "NCVT / DGT India", "note": "National Trade Certificate", "color": "dark"},
                {"title": "Practical Ratio", "value": "70% Hands-On", "note": "Machinery & Bench Work", "color": "green"},
                {"title": "Annual Quota", "value": "40 Total Seats", "note": "20 Electrician · 20 Fitter", "color": "dark"},
                {"title": "Placement Support", "value": "100% Placement", "note": "Core Plants & PSUs", "color": "blue"}
            ]
        },
        {
            "type": "tradeCards",
            "items": [
                {
                    "slug": "iti-electrician",
                    "title": "ITI Electrician Trade",
                    "badge": "NCVT CTS Code: 0231",
                    "duration": "2 Years (4 Semesters / Annual Pattern)",
                    "intake": "20 Seats",
                    "accent": "#f59e0b",
                    "icon": "Zap",
                    "image": "/images/iti/iti-electrician-workbench.jpg",
                    "tagline": "Residential wiring, 3-phase industrial power circuits, transformer testing, DC/AC rotating machines, motor rewinding, and solar PV installations.",
                    "highlights": [
                        "National Trade Certificate (NTC) awarded by DGT / NCVT",
                        "Direct recruitment eligibility for Indian Railways (ALP & Technician)",
                        "State DISCOM recruitment (WBSEDCL, WBSETCL, DVC)",
                        "Direct Lateral Entry into 2nd Year Diploma Electrical Engineering via VOCLET"
                    ],
                    "workshops": "Electrical Machinery Bay, House Wiring Testboards, Armature Winding Station"
                },
                {
                    "slug": "iti-fitter",
                    "title": "ITI Fitter Trade",
                    "badge": "NCVT CTS Code: 0227",
                    "duration": "2 Years (4 Semesters / Annual Pattern)",
                    "intake": "20 Seats",
                    "accent": "#f97316",
                    "icon": "Wrench",
                    "image": "/images/iti/iti-fitter-workshop.jpg",
                    "tagline": "Precision bench fitting to ±0.04mm accuracy, center lathe turning, drilling, hand/machine reaming, pipeline fabrication, and mechanical assembly.",
                    "highlights": [
                        "National Trade Certificate (NTC) valid across India and abroad",
                        "Top recruitment preference by Indian Railways Loco & Carriage Workshops",
                        "SAIL Durgapur Steel Plant & Heavy Engineering apprentice recruitment",
                        "Direct Lateral Entry into 2nd Year Diploma Mechanical Engineering via VOCLET"
                    ],
                    "workshops": "Fitting & Toolroom Shop, Center Lathe Bay, Pillar Drilling & Grinding Rigs"
                }
            ]
        },
        {
            "type": "iconCards",
            "tag": "Ministry of Skill Development & Entrepreneurship",
            "heading": "Why Study ITI at NHIT Durgapur?",
            "paragraphs": [
                "NHIT Private Industrial Training Institute operates within the comprehensive 2.5-acre technical education campus of NHIT Durgapur, providing ITI trainees with university-grade infrastructure, hostel facilities, industrial workshops, and placement cells."
            ],
            "items": [
                {"icon": "Award", "tone": "red", "title": "National Trade Certificate (NTC)", "desc": "Govt. of India recognized certificate enabling students to apply for central government jobs, Indian Railways, defence ordnance factories, and global overseas employment."},
                {"icon": "GraduationCap", "tone": "blue", "title": "VOCLET Lateral Entry Bridge", "desc": "Eligible for direct entry into the 2nd Year (3rd Semester) of 3-Year Diploma in Engineering at NHIT, saving a full year and elevating qualifications to polytechnic and B.Tech levels."},
                {"icon": "Briefcase", "tone": "green", "title": "Campus Placement & Apprenticeship", "desc": "Regular campus interview drives from leading engineering leaders including Tata Motors, L&T, Shyam Steel, Kiswok Industries, and Gabriel India with competitive starter packages."}
            ]
        },
        {
            "type": "photoGrid",
            "heading": "Workshop & Practical Training Facilities",
            "sub": "Real photos from NHIT Private ITI workshop floor and student practice sessions",
            "linkText": "Explore Full Campus Infrastructure →",
            "linkHref": "/our-infrastructure",
            "photoStyle": "overlay",
            "columnsCount": 4,
            "photos": [
                {"src": "/images/iti/iti-electrician-workbench.jpg", "caption": "Electrician Testboards & Motor Testing"},
                {"src": "/images/iti/iti-fitter-tools.jpg", "caption": "Precision Measuring Tools & Verniers"},
                {"src": "/images/iti/iti-electrical-panel.jpg", "caption": "Industrial Switchgear & Relay Panel"},
                {"src": "/images/iti/iti-practical-training.jpg", "caption": "Hand Filing & Fitment Training"}
            ]
        }
    ]
}

json.dump(data, open(P, 'w'), indent=2, ensure_ascii=False)
print('seeded. pages now:', list(data.keys()))
