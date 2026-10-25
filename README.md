# The New Horizons Institute of Technology (NHIT) — Official Web Platform

<div align="center">
  <h3>Next-Generation Polytechnic & Engineering Institution Web Portal</h3>
  <p><strong>Approved by AICTE, New Delhi · Affiliated to WBSCTVESD, West Bengal · ISO 9001:2015 Certified</strong></p>
  <p>City Center, Durgapur, Paschim Bardhaman, West Bengal — 713208</p>
</div>

---

## 🏛️ About NHIT

**The New Horizons Institute of Technology (NHIT)** is one of eastern India's premier polytechnic institutions, established in 2007. NHIT delivers 3-year AICTE-approved Diploma in Engineering programs and 2-year NCVT-approved Craftsmen Training (ITI) trades designed to produce industry-ready engineering professionals.

---

## ✨ Key Platform Features

- **🚀 60–144 FPS GPU-Accelerated Blueprint Schematics**: Interactive HTML5 Canvas engines rendering authentic vector engineering blueprints (circuit meshes, turbine generators, satellite links, engine blocks, tower cranes).
- **🎯 Dynamic Key Specs Radar HUD**: Interactive 5-metric orbital telemetry dial with sub-pixel SVG dotted leader lines and zero-latency mouse-wheel orbital rotation (`--orbit-angle`).
- **📚 6-Semester WBSCTVESD Curriculum Explorer**: Modular subject breakdowns, laboratory practicals, and AICTE model syllabi.
- **👨‍🏫 Academic Faculty Directory**: Auto-scrolling, touch-friendly faculty carousel with responsive profile frames and academic credentials.
- **💼 Training & Placements Portal**: Recruiter showcase (Tata Motors, L&T, Cummins, Magna, Kiswok), placement sector radar, and pre-placement aptitude training framework (80–85% placement/JELET conversion).
- **🛠️ ITI Craftsmen Institute**: Specialized pages for 2-Year ITI Electrician and ITI Fitter trades affiliated with DGT/NCVT.
- **📋 Admissions 2026–27 Pipeline**: Interactive intake quota matrix, JEXPO / VOCLET eligibility guidelines, scholarship information (SVMCM & Aikyashree), and online inquiry desk.

---

## 🔬 Academic Departments

| Branch Code | Department Name | Key Vector Blueprint Schematics |
| :---: | :--- | :--- |
| **CST** | Computer Science & Technology | Microservices mesh, binary tree recursion, cyber radar nodes, neural network weights |
| **ME** | Mechanical Engineering | 4-cylinder engine block (2.0L DOHC), meshing spur gears, rack & pinion steering, disc rotor |
| **EE** | Electrical Engineering | 400 kV HVAC transmission tower, 3-phase sinusoidal AC phasor, 2.5 MW wind turbine, 3000 RPM generator |
| **CE** | Civil Engineering | Building scaffolding with tower crane (Level +12), viaduct pier, site engineers, Warren bridge truss |
| **ETCE** | Electronics & Telecommunication | Geostationary satellite (36,000 km), 5G NR cell tower (3.5 GHz), BJT & Op-Amp, STM32 ARM IC, fiber optic TIR core |
| **AE** | Automobile Engineering | Aerodynamic coupe silhouette (120 km/h), 4-stroke reciprocating piston & crank, ventilated disc brake |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React Server Components)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS custom properties
- **Vector Rendering**: HTML5 Canvas 2D Context (Procedural Drafting & Ink Dissolve)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Standalone Node.js / Docker container (`next start -p 3000`)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/subro88/nhit_website.git

# Navigate to project directory
cd nhit_website

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

---

## 📁 Project Architecture

```
nhit-website/
├── content/              # Academic MDX & JSON content (faculty rosters, syllabus)
├── public/               # Static assets (campus photos, lab rigs, recruiter logos)
│   └── images/
├── src/
│   ├── app/              # Next.js 14 App Router routes
│   │   ├── departments/  # Dynamic [slug] engineering branch pages
│   │   ├── placements/   # Training & placement radar
│   │   ├── iti-courses/  # ITI Electrician & Fitter trades
│   │   ├── admissions/   # Admissions roadmap & intake matrix
│   │   └── student-life/ # Campus activities & infrastructure
│   ├── components/       # UI components & design system
│   │   ├── department/   # Hero HUD, Blueprint Canvas, Curriculum Tabs, Faculty
│   │   ├── home/         # Campus hero, Placement Radar, Quick Notice Board
│   │   └── layout/       # Responsive Navbar, Header, Footer
│   ├── data/             # Department specifications, metrics, and syllabus data
│   └── lib/              # Utility helpers
├── tailwind.config.ts    # Design tokens & color system
├── tsconfig.json         # TypeScript configuration
└── next.config.mjs       # Next.js runtime configuration
```

---

## 📜 Regulatory Approvals & Accreditation

- **AICTE Approval**: Approved by All India Council for Technical Education, New Delhi.
- **Council Affiliation**: Affiliated to West Bengal State Council of Technical and Vocational Education and Skill Development (WBSCTVESD).
- **NCVT Recognition**: Affiliated to National Council for Vocational Training, DGT, Government of India.
- **Quality Assurance**: ISO 9001:2015 Certified Institution.

---

## 📄 License

Proprietary — All rights reserved © National Headway Institute of Technology (NHIT), Durgapur.
