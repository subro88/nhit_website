/*
 * Content + types for the ITI trade detail pages.
 * All facts follow the existing NHIT site copy (CTS codes, intake, CTC figures,
 * recruiter lists, in-charge names) — nothing invented.
 */

import type { LucideIcon } from 'lucide-react';
import {
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarDays,
  ClipboardCheck,
  Clock,
  Cog,
  GraduationCap,
  HardHat,
  IndianRupee,
  Landmark,
  Package,
  Plug,
  Ruler,
  Settings,
  ShieldCheck,
  Sun,
  TrendingUp,
  Zap,
} from 'lucide-react';
import type { CareerStep, PayBand, Semester, TradeMetric } from './tradeShared';

export interface TradeKeyFact {
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface TradeHighlight {
  icon: LucideIcon;
  title: string;
  text: string;
}

export interface Outcome {
  icon: LucideIcon;
  role: string;
  where: string;
}

export interface Recruiter {
  name: string;
  desc: string;
}

export interface ToolGroup {
  heading: string;
  items: string[];
}

export interface Inset {
  image: string;
  alt: string;
  caption: string;
}

export interface ITITrade {
  slug: string;
  trade: string;
  accent: string;
  accentDeep: string;
  heroKicker: string;
  heroSubtitle: string;
  metrics: TradeMetric[];
  overview: {
    paras: string[];
    image: string;
    imageAlt: string;
    badge: string;
    inset: Inset;
  };
  keyFacts: TradeKeyFact[];
  highlights: TradeHighlight[];
  inCharge: { name: string; role: string; quote: string };
  career: {
    steps: CareerStep[];
    outcomes: Outcome[];
    payBands: PayBand[];
    payNote: string;
  };
  semesters: Semester[];
  workshop: {
    image: string;
    imageAlt: string;
    caption: string;
    inset: Inset | null;
    groups: ToolGroup[];
  };
  recruitersGov: Recruiter[];
  recruitersPrivate: string[];
  faqs: { q: string; a: string }[];
  otherTrade: {
    href: string;
    name: string;
    desc: string;
    image: string;
  };
  brochureUrl: string;
  seo: { title: string; description: string };
}

const BROCHURE =
  'https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf';

const ADMISSION_STEPS_ELE = [
  'Check eligibility — Madhyamik (10th) pass with Science & Math',
  'Apply online or visit the NHIT admission cell',
  'NCVT counselling, merit list & document verification',
  'Enrol, collect your tool kit & begin the August session',
];

/* ========================================================================== */
/* ITI ELECTRICIAN                                                            */
/* ========================================================================== */

export const itiElectrician: ITITrade = {
  slug: 'iti-electrician',
  trade: 'Electrician',
  accent: '#10B981',
  accentDeep: '#047857',
  heroKicker: 'NCVT CTS Code: 0231 · 2-Year Craftsman Training Scheme',
  heroSubtitle:
    'NCVT Approved Centre of Excellence for industrial wiring, motor rewinding, transformer testing and power distribution panels — with direct railway & PSU career pathways.',

  metrics: [
    { label: 'Sanctioned Intake', count: 20, suffix: ' Seats' },
    { label: 'Trade Duration', count: 2, suffix: ' Years', note: '4 semesters' },
    { label: 'Placement Success', display: '90–95%', accent: true, note: 'incl. apprenticeship' },
    { label: 'Highest CTC', count: 3.6, decimals: 1, prefix: '₹', suffix: ' LPA', accent: true },
  ],

  overview: {
    paras: [
      'The ITI Electrician trade at The New Horizons Institute of Technology is an intensive 2-year vocational programme affiliated to the National Council for Vocational Training (NCVT) under the Directorate General of Training (DGT), Ministry of Skill Development & Entrepreneurship, Government of India. Trainees move from fundamental electrical science to full industrial panels — wire by wire, test by test.',
      'Electricity is the lifeline of every home, factory, railway and power grid, and certified electricians remain one of India’s most recruited technical workforces. From domestic conduit wiring and safety earthing to 3-phase induction motor rewinding and solar rooftop systems, the trade opens doors in Indian Railways, power utilities, steel plants, private industry and self-employment as a licensed electrical contractor.',
    ],
    image: '/images/iti/iti-electrician-workbench.jpg',
    imageAlt: 'NHIT ITI Electrician trainees during an industrial visit to the National Power Training Institute, Durgapur',
    badge: 'Industrial Visit — NPTI Durgapur',
    inset: {
      image: '/images/iti/ws-motor-ev.jpg',
      alt: 'Trainee inspecting an electric vehicle drive motor on a workshop lift',
      caption: 'Motor & EV maintenance exposure',
    },
  },

  keyFacts: [
    { icon: ClipboardCheck, label: 'Trade Code (CTS)', value: '0231 · NCVT / DGT' },
    { icon: CalendarDays, label: 'Duration', value: '2 Years · 4 Semesters' },
    { icon: GraduationCap, label: 'Eligibility', value: '10th pass with Science & Math' },
    { icon: Clock, label: 'Minimum Age', value: '14 years · no upper limit' },
    { icon: HardHat, label: 'Sanctioned Intake', value: '20 seats per unit' },
    { icon: ShieldCheck, label: 'Award', value: 'National Trade Certificate (NTC)' },
  ],

  highlights: [
    {
      icon: ShieldCheck,
      title: 'NCVT Certification (NTC)',
      text: 'National Trade Certificate recognised across India and abroad for wireman licensing, government technician recruitment and overseas jobs.',
    },
    {
      icon: GraduationCap,
      title: 'Lateral Entry via VOCLET',
      text: 'Direct admission into the 2nd year (3rd semester) of the 3-year Diploma in Electrical Engineering at NHIT — finish your polytechnic in just 2 years.',
    },
    {
      icon: IndianRupee,
      title: 'Apprenticeship & Placement',
      text: 'NAPS portal enrolment for paid 1-year apprenticeship (NAC certificate) plus NHIT Training & Placement Cell support for railway, PSU and private roles.',
    },
  ],

  inCharge: {
    name: 'Soumya Mukherjee',
    role: 'Trade In-Charge (ITI Electrician) · Diploma EE · 8 yrs experience',
    quote:
      'Electrical craftsmen are the indispensable lifeblood of modern industrial infrastructure. At NHIT Private ITI, our training emphasises safety-first protocols, millimetre-accurate panel layouts and mastery over heavy industrial drives so that our trainees secure premier railway and PSU technician appointments.',
  },

  career: {
    steps: [
      {
        icon: BadgeCheck,
        stage: 'Trade Apprentice (NAPS)',
        period: 'Year 0–1',
        note: 'Paid on-job training in industry → National Apprenticeship Certificate (NAC).',
      },
      {
        icon: Zap,
        stage: 'Technician / Wireman',
        period: 'Year 1–3',
        note: 'RRB Technician-III, WBSEDCL lineman, panel wiring & maintenance roles.',
      },
      {
        icon: TrendingUp,
        stage: 'Senior Artisan / Charge-man',
        period: 'Year 3–8',
        note: 'Departmental promotions in PSUs, maintenance in-charge of plants & substations.',
      },
      {
        icon: Briefcase,
        stage: 'Supervisor / Contractor',
        period: 'Year 8+',
        note: 'Licensed electrical contractor, own enterprise or supervisory cadre posts.',
      },
    ],
    outcomes: [
      { icon: Landmark, role: 'Railway Technician / ALP', where: 'RRB Technician-III & Assistant Loco Pilot — largest ITI quota' },
      { icon: Building2, role: 'PSU Artisan (ACTT)', where: 'SAIL Durgapur, DVC, NTPC, Coal India electrical cadres' },
      { icon: Plug, role: 'Licensed Wireman / Contractor', where: 'WBSEDCL wireman licence → own contracting business' },
      { icon: Settings, role: 'Industrial Maintenance Electrician', where: 'Steel plants, thermal power, manufacturing & FMCG plants' },
      { icon: Sun, role: 'Solar & EV-Charging Technician', where: 'Rooftop solar wiring, PM-KUSUM and EV charging infra' },
      { icon: GraduationCap, role: 'Diploma Engineer (VOCLET)', where: 'Direct 2nd-year entry — Diploma in Electrical Engineering' },
    ],
    payBands: [
      { label: 'Private sector — starting package', display: '₹1.8 – 2.8 LPA', pct: 42 },
      { label: 'NAPS apprenticeship stipend', display: '₹7,000 – 12,000 / month', pct: 28 },
      { label: 'Railway / PSU technician (7th CPC Level-2)', display: '₹19,900 – 63,200 / month', pct: 88 },
    ],
    payNote:
      'Indicative ranges from recent railway, PSU and campus recruitments — actual pay varies by recruiter, posting and role.',
  },

  semesters: [
    {
      sem: 1,
      title: 'Semester 1: Workshop Safety, Fundamental Electrical & Tools',
      subjects: [
        'Trade Theory: Safety regulations, first aid & artificial respiration',
        'Trade Practical: common hand tools, wire splicing & soldering',
        'Ohm’s law, Kirchhoff’s laws & resistive network verification',
        'Engineering Drawing & Workshop Calculation & Science-I',
      ],
    },
    {
      sem: 2,
      title: 'Semester 2: AC Circuits, Cells, Earthing & Domestic Wiring',
      subjects: [
        'Trade Theory: single-phase & 3-phase AC circuits (RL, RC, RLC)',
        'Trade Practical: domestic PVC conduit & casing-capping wiring',
        'Pipe earthing & plate earthing field installation and testing',
        'Lead-acid battery maintenance & electrolyte specific-gravity testing',
      ],
    },
    {
      sem: 3,
      title: 'Semester 3: DC Machines, Transformers & Instrumentation',
      subjects: [
        'Trade Theory: DC generator characteristics & DC motor speed control',
        'Trade Practical: 3-point & 4-point starter connections and testing',
        'Single-phase & 3-phase transformer open/short-circuit tests',
        'Moving coil & moving iron meters, megger & earth tester calibration',
      ],
    },
    {
      sem: 4,
      title: 'Semester 4: 3-Phase Induction Motors, Alternators & Panel Wiring',
      subjects: [
        'Trade Theory: synchronous alternators & 3-phase induction motors',
        'Trade Practical: Direct-On-Line (DOL) & star-delta starter wiring',
        'Armature rewinding, coil winding & varnish baking practice',
        'Industrial control panel fabrication, contactor & relay wiring',
      ],
    },
  ],

  workshop: {
    image: '/images/iti/ws-ele-machines-lab.jpg',
    imageAlt: 'Electrical machines laboratory with rows of training panels, meters and motors',
    caption: 'Electrical machines lab practice',
    inset: null,
    groups: [
      {
        heading: 'Wiring Bays & Machines',
        items: [
          'Domestic conduit & casing-capping wiring boards',
          'Motor winding and rewinding bench with varnish baking',
          'Transformer demonstration & testing units',
          'DOL / star-delta starter and control panel fabrication bay',
          'Pipe & plate earthing test installations',
        ],
      },
      {
        heading: 'Instruments & Advanced Trainers',
        items: [
          'Megger, earth tester & clamp meters',
          'Moving-coil / moving-iron panel meters with CT-PT kits',
          'Solar PV rooftop training kit',
          'Soldering, wire-splicing & crimping stations',
          'Calibration & measurement practice with standards',
        ],
      },
    ],
  },

  recruitersGov: [
    { name: 'Indian Railways (RRB)', desc: 'Technician-III Electrical & Assistant Loco Pilot (ALP)' },
    { name: 'WBSEDCL & WBSETCL', desc: 'Lineman, substation attendant & office technical staff' },
    { name: 'SAIL Durgapur Steel Plant', desc: 'Attendant-cum-Technician Trainee (ACTT Electrical)' },
    { name: 'Coal India Limited (ECL / BCCL)', desc: 'Colliery electrical maintenance craftsman' },
    { name: 'Ordnance Factory Board (OFB)', desc: 'Defence electrical fitter & maintenance staff' },
    { name: 'NTPC & DVC Thermal Power', desc: 'Plant electrical artisan & switchyard technician' },
  ],
  recruitersPrivate: [
    'Tata Power',
    'Schneider Electric',
    'Havells India',
    'L&T Construction',
    'CESC Ltd',
    'Switchboard & Panel OEMs',
  ],

  faqs: [
    {
      q: 'What is the eligibility criteria for admission into ITI Electrician?',
      a: 'Candidates must have passed 10th Standard / Madhyamik examination or equivalent from a recognized board with Science and Mathematics. Admissions are conducted through state NCVT counseling and direct merit quota under Directorate General of Training (DGT) guidelines. The minimum age is 14 years, with no upper age limit.',
    },
    {
      q: 'Is this course recognized by NCVT and the Government of India?',
      a: 'Yes. The ITI Electrician trade at NHIT is strictly affiliated to the National Council for Vocational Training (NCVT), Directorate General of Training (DGT), Ministry of Skill Development and Entrepreneurship, Government of India. Successful candidates receive the internationally recognized National Trade Certificate (NTC).',
    },
    {
      q: 'What practical workshop skills are taught in ITI Electrician at NHIT?',
      a: 'Students receive thorough hands-on training in domestic conduit wiring, industrial switchgear assembly, DOL and Star-Delta starters, 3-phase induction motor rewinding, single/3-phase transformer testing, pipe and plate safety earthing installations, and solar photovoltaic rooftop wiring.',
    },
    {
      q: 'Can ITI Electrician graduates enter directly into the 2nd year of Diploma Engineering?',
      a: 'Yes! ITI Electrician pass-outs with 10th standard qualification can appear for the West Bengal state VOCLET examination and enter directly into the 2nd Year (3rd Semester) of the 3-Year Diploma in Electrical Engineering at NHIT or any recognized polytechnic, completing the diploma in just 2 years.',
    },
    {
      q: 'What are the job opportunities in Indian Railways and PSUs for ITI Electricians?',
      a: 'ITI Electrician holds the highest recruitment quota in Indian Railways for RRB Technician-III and Assistant Loco Pilot (ALP). In addition, graduates qualify for SAIL Durgapur Steel Plant (ACTT), WBSEDCL/WBSETCL Lineman & Substation Attendant, Coal India (CIL), and Ordnance Factory Board technical posts.',
    },
    {
      q: 'Which private companies recruit ITI Electricians from NHIT Durgapur?',
      a: 'NHIT maintains a 90–95% placement and apprenticeship placement rate for ITI trades. Major recruiters include Tata Power, Schneider Electric, Havells India, Larsen & Toubro Construction, CESC Ltd, and premier electrical switchboard manufacturers in eastern India.',
    },
    {
      q: 'Does NHIT assist in securing National Apprenticeship Training (NAC)?',
      a: 'Yes. The NHIT Training & Placement Cell assists every graduate in enrolling on the NAPS (National Apprenticeship Promotion Scheme) portal for 1-year paid industrial apprenticeship training leading to the National Apprenticeship Certificate (NAC).',
    },
  ],

  otherTrade: {
    href: '/iti-courses/iti-fitter',
    name: 'ITI Fitter Trade',
    desc: 'Precision bench fitting, lathe machining & mechanical assembly',
    image: '/images/iti/iti-fitter-workshop.jpg',
  },

  brochureUrl: BROCHURE,

  seo: {
    title: 'ITI Electrician Trade — NCVT 2-Year Course (CTS 0231) | NHIT Durgapur',
    description:
      'NCVT-approved ITI Electrician trade at NHIT Private ITI Durgapur: 2-year CTS course, 20 seats, domestic & industrial wiring, motor rewinding, transformer testing. 90–95% placement, railway & PSU recruitment and VOCLET lateral entry to Diploma Electrical Engineering.',
  },
};

/* ========================================================================== */
/* ITI FITTER                                                                 */
/* ========================================================================== */

export const itiFitter: ITITrade = {
  slug: 'iti-fitter',
  trade: 'Fitter',
  accent: '#F97316',
  accentDeep: '#C2410C',
  heroKicker: 'NCVT CTS Code: 0227 · 2-Year Craftsman Training Scheme',
  heroSubtitle:
    'NCVT-approved benchmark training in precision toolroom fitting, centre-lathe turning, assembly metrology and heavy mechanical maintenance.',

  metrics: [
    { label: 'Sanctioned Intake', count: 20, suffix: ' Seats' },
    { label: 'Trade Duration', count: 2, suffix: ' Years', note: '4 semesters' },
    { label: 'Placement Success', display: '90–95%', accent: true, note: 'incl. apprenticeship' },
    { label: 'Highest CTC', count: 3.5, decimals: 1, prefix: '₹', suffix: ' LPA', accent: true },
  ],

  overview: {
    paras: [
      'The ITI Fitter trade at The New Horizons Institute of Technology is a 2-year National Council for Vocational Training (NCVT) programme engineered to build master craftsmen — capable of producing high-precision mechanical assemblies, executing heavy lathe machining and maintaining industrial plant equipment to drawing-specification accuracy.',
      'Every machine, locomotive, production line and steel mill in the country depends on fitters. From filing a surface flat to ±0.04 mm, cutting metric threads on a centre lathe, aligning couplings with dial indicators to overhauling hydraulic and pneumatic circuits — the trade feeds railways workshops, steel plants, defence factories, tool rooms and manufacturing giants with an evergreen demand for skilled hands.',
    ],
    image: '/images/iti/ws-lathe-turning.jpg',
    imageAlt: 'Trainee operating a centre lathe machine in the NHIT machine shop',
    badge: 'Machine Shop Practice',
    inset: {
      image: '/images/iti/ws-micrometer.jpg',
      alt: 'Measuring a workpiece with an outside micrometer',
      caption: 'Precision metrology practice',
    },
  },

  keyFacts: [
    { icon: ClipboardCheck, label: 'Trade Code (CTS)', value: '0227 · NCVT / DGT' },
    { icon: CalendarDays, label: 'Duration', value: '2 Years · 4 Semesters' },
    { icon: GraduationCap, label: 'Eligibility', value: '10th pass with Science & Math' },
    { icon: Clock, label: 'Minimum Age', value: '14 years · no upper limit' },
    { icon: HardHat, label: 'Sanctioned Intake', value: '20 seats per unit' },
    { icon: ShieldCheck, label: 'Award', value: 'National Trade Certificate (NTC)' },
  ],

  highlights: [
    {
      icon: ShieldCheck,
      title: 'NCVT Certification (NTC)',
      text: 'Govt. of India National Trade Certificate authorising appointment in railways, defence factories, shipyards and heavy engineering plants.',
    },
    {
      icon: GraduationCap,
      title: 'Lateral Entry via VOCLET',
      text: 'Direct 2nd-year (3rd-semester) entry into the 3-year Diploma in Mechanical or Automobile Engineering at NHIT Durgapur.',
    },
    {
      icon: IndianRupee,
      title: 'Apprenticeship & Placement',
      text: 'Paid NAPS apprenticeship (NAC certificate) and placement support across railways workshops, steel plants and tier-1 engineering firms.',
    },
  ],

  inCharge: {
    name: 'Biswajit Roy',
    role: 'Trade In-Charge (ITI Fitter) · Diploma ME · 10 yrs experience',
    quote:
      'A fitter is the mechanical backbone of any production line. We teach our trainees how to read intricate engineering blueprints, handle micrometers with tactile sensitivity and operate centre lathes with confidence so they emerge ready for high-precision manufacturing roles.',
  },

  career: {
    steps: [
      {
        icon: BadgeCheck,
        stage: 'Trade Apprentice (NAPS)',
        period: 'Year 0–1',
        note: 'Paid workshop / production-line training → National Apprenticeship Certificate (NAC).',
      },
      {
        icon: Cog,
        stage: 'Fitter / Machinist',
        period: 'Year 1–3',
        note: 'RRB Technician-III (Workshop, C&W), steel-plant ACTT, tool-room & maintenance roles.',
      },
      {
        icon: TrendingUp,
        stage: 'Senior Fitter / Charge-man',
        period: 'Year 3–8',
        note: 'Maintenance in-charge, tool & die upkeep, inspection and quality desks.',
      },
      {
        icon: Briefcase,
        stage: 'Supervisor / Master Craftsman',
        period: 'Year 8+',
        note: 'Supervisory cadre, QA & inspection leadership or own fabrication & repair enterprise.',
      },
    ],
    outcomes: [
      { icon: Landmark, role: 'Railway Workshop Technician', where: 'RRB Technician-III Fitter — Loco, Carriage & Wagon workshops' },
      { icon: Building2, role: 'PSU Artisan (ACTT)', where: 'SAIL Durgapur, BHEL, HAL, Mazagon Dock mechanical cadres' },
      { icon: Settings, role: 'Plant Maintenance Fitter', where: 'Steel, cement, power & process plants across East India' },
      { icon: Ruler, role: 'Tool-Room & Die Maintenance Fitter', where: 'Precision tool rooms, plastic mould & press-tool maintenance' },
      { icon: Package, role: 'Assembly & Machine Operator', where: 'Automobile lines, CNC support & heavy fabrication units' },
      { icon: GraduationCap, role: 'Diploma Engineer (VOCLET)', where: 'Direct 2nd-year entry — Diploma in Mechanical / Automobile Engg.' },
    ],
    payBands: [
      { label: 'Private sector — starting package', display: '₹1.8 – 3.5 LPA', pct: 50 },
      { label: 'NAPS apprenticeship stipend', display: '₹7,000 – 12,000 / month', pct: 28 },
      { label: 'Railway / PSU technician (7th CPC Level-2)', display: '₹19,900 – 63,200 / month', pct: 88 },
    ],
    payNote:
      'Indicative ranges from recent railway, PSU and campus recruitments — actual pay varies by recruiter, posting and role.',
  },

  semesters: [
    {
      sem: 1,
      title: 'Semester 1: Workshop Safety, Precision Hand Tools & Linear Measurement',
      subjects: [
        'Trade Theory: industrial safety, PPE standards & precision measuring instruments',
        'Trade Practical: hacksawing, flat & cross filing to ±0.04 mm accuracy',
        'Vernier caliper, inside/outside micrometer & bevel protractor handling',
        'Engineering Drawing & Workshop Calculation & Science-I',
      ],
    },
    {
      sem: 2,
      title: 'Semester 2: Precision Fitting, Drilling, Reaming & Surface Finishing',
      subjects: [
        'Trade Theory: drilling machines, drill bits, hand/machine reamers & tap-die sets',
        'Trade Practical: step fitting, angular fitting, T-joint & dovetail fitting exercises',
        'Pillar & radial drilling operations, counter-sinking, counter-boring & hand reaming',
        'Scraping techniques, surface-plate checking & blue-matching practice',
      ],
    },
    {
      sem: 3,
      title: 'Semester 3: Lathe Machine Turning, Threading & Metrology',
      subjects: [
        'Trade Theory: centre lathe construction, cutting-tool geometry & thread nomenclature',
        'Trade Practical: facing, plain turning, step turning, chamfering & knurling',
        'Single-point cutting-tool grinding, metric & Whitworth V-thread cutting on lathe',
        'Vernier height gauge, slip gauges, dial test indicators & sine-bar metrology',
      ],
    },
    {
      sem: 4,
      title: 'Semester 4: Assembly Operations, Hydraulics, Pneumatics & Maintenance',
      subjects: [
        'Trade Theory: industrial bearings, fasteners, gaskets, couplings & preventive maintenance',
        'Trade Practical: sub-assembly of machine vices, pipe vices & flanged pipe couplings',
        'Hydraulic & pneumatic circuit assembly, directional control valves & actuators',
        'Machine-tool overhaul, levelling, alignment testing & industrial safety audit',
      ],
    },
  ],

  workshop: {
    image: '/images/iti/ws-bench-vise.jpg',
    imageAlt: 'Bench vise and fitting bench in the machine fitting workshop',
    caption: 'Fitting bench — precision hand work',
    inset: null,
    groups: [
      {
        heading: 'Benches & Machines',
        items: [
          'Centre lathe machines — turning, threading & knurling',
          'Pillar & radial drilling machines',
          'Power hacksaw & cut-off saw section',
          'Bench vises and filing benches for precision fitting',
          'Surface plate & marking-out table with height gauge stands',
        ],
      },
      {
        heading: 'Metrology & Advanced Trainers',
        items: [
          'Vernier caliper, outside/inside micrometer sets',
          'Dial test indicators, slip gauges & sine bar',
          'Bevel protractor & radius-gauge sets',
          'Hydraulic & pneumatic circuit trainer kits',
          'Bearing, coupling & pipe-joint assembly rigs',
        ],
      },
    ],
  },

  recruitersGov: [
    { name: 'Indian Railways (RRB)', desc: 'Technician-III Fitter (Loco Workshop, Carriage & Wagon)' },
    { name: 'SAIL Durgapur Steel Plant', desc: 'Attendant-cum-Technician Trainee (ACTT Mechanical)' },
    { name: 'Ordnance Factory Board (OFB)', desc: 'Gun & Shell Factory, Cossipore & Ishapore Rifle Factory' },
    { name: 'Hindustan Aeronautics Limited (HAL)', desc: 'Aircraft assembly & mechanical fitter trainee' },
    { name: 'Indian Navy / Mazagon Dock', desc: 'Dockyard apprentice & marine hull fitter' },
    { name: 'Bharat Heavy Electricals (BHEL)', desc: 'Heavy engineering artisan & fabrication trainee' },
  ],
  recruitersPrivate: [
    'Tata Motors',
    'Larsen & Toubro',
    'Cummins India',
    'Kiswok Industries',
    'Shyam Steel',
    'Gabriel India',
  ],

  faqs: [
    {
      q: 'What is the eligibility criteria for admission into ITI Fitter at NHIT?',
      a: 'Applicants must have passed 10th Standard / Madhyamik examination or equivalent from a recognized board with Science and Mathematics. Admission is granted based on NCVT merit counseling and direct institutional counseling. Candidates must be at least 14 years old, with no upper age restriction.',
    },
    {
      q: 'What certification is awarded upon completion of the ITI Fitter trade?',
      a: 'Graduates are awarded the official National Trade Certificate (NTC) issued by the National Council for Vocational Training (NCVT), Directorate General of Training (DGT), Government of India, valid for government recruitments and multinational technical positions across India and abroad.',
    },
    {
      q: 'What practical machinery and hand tools do students master during training?',
      a: 'Students master precision hand filing (flat, half-round, triangular to ±0.04mm accuracy), vernier calipers, outside/inside micrometers, height gauges, pillar and radial drilling machines, hand and machine reamers, center lathe turning (facing, plain/step turning, knurling, V-threading), and pipe joint assembly.',
    },
    {
      q: 'Can ITI Fitter pass-outs join Diploma Mechanical Engineering directly in 2nd year?',
      a: 'Yes! Through the West Bengal State Council VOCLET examination, ITI Fitter pass-outs secure direct lateral entry into the 2nd Year (3rd Semester) of 3-Year Diploma in Mechanical Engineering or Automobile Engineering, completing their engineering diploma in just 2 years.',
    },
    {
      q: 'What PSU and railway vacancies are open to NCVT Fitter certificate holders?',
      a: 'ITI Fitter is the premier trade recruited by Indian Railways (RRB Technician-III Fitter in Workshop and Carriage & Wagon divisions, ALP), SAIL Durgapur Steel Plant (ACTT Mechanical), Ordnance Factory Board (Gun & Shell Factory), HAL, BHEL, and Indian Navy Dockyards.',
    },
    {
      q: 'Which private companies recruit ITI Fitters from NHIT Durgapur?',
      a: 'Top engineering firms like Tata Motors, Larsen & Toubro, Cummins India, Kiswok Industries, Shyam Steel, Gabriel India, and tier-1 automobile and steel fabrication plants recruit NHIT fitters with starting packages ranging up to ₹3.5 LPA.',
    },
    {
      q: 'Are hostel and canteen facilities provided on campus for ITI trainees?',
      a: 'Yes, NHIT offers full on-campus hostel accommodation for outstation students with 24/7 security, high-speed Wi-Fi, modern dining halls serving hygienic meals, sports grounds, and medical assistance inside the NHIT Durgapur campus.',
    },
  ],

  otherTrade: {
    href: '/iti-courses/iti-electrician',
    name: 'ITI Electrician Trade',
    desc: 'Industrial wiring, transformer testing & motor rewinding',
    image: '/images/iti/iti-electrician-workbench.jpg',
  },

  brochureUrl: BROCHURE,

  seo: {
    title: 'ITI Fitter Trade — NCVT 2-Year Course (CTS 0227) | NHIT Durgapur',
    description:
      'NCVT-approved ITI Fitter trade at NHIT Private ITI Durgapur: 2-year CTS course, 20 seats, precision fitting, metrology, centre-lathe turning and maintenance. 90–95% placement, railway & PSU recruitment and VOCLET lateral entry to Diploma Mechanical Engineering.',
  },
};

export const ADMISSION_STEPS = ADMISSION_STEPS_ELE;
