/*
 * One-off seed script: builds src/data/homepage.json from the current
 * hard-coded content of the home page components.
 * Run:  bun scripts/seed-homepage.ts
 */
import fs from 'fs';
import path from 'path';
import {
  CheckCircle, Book, Compass, Network,
  Building, Users, Wifi, IdCard,
  Cog, Cpu, Car, Code,
  MessageSquare, UserCheck, FileText, Video,
  Briefcase, Award, Rocket, GraduationCap,
} from 'lucide-react';
import { STAGES } from '../src/components/journey/CareerJourney';

// ── lucide icon name lookup (identity map) ──────────────────────────────
const ICONS: Array<[unknown, string]> = [
  [CheckCircle, 'CheckCircle'], [Book, 'Book'], [Compass, 'Compass'], [Network, 'Network'],
  [Building, 'Building'], [Users, 'Users'], [Wifi, 'Wifi'], [IdCard, 'IdCard'],
  [Cog, 'Cog'], [Cpu, 'Cpu'], [Car, 'Car'], [Code, 'Code'],
  [MessageSquare, 'MessageSquare'], [UserCheck, 'UserCheck'], [FileText, 'FileText'], [Video, 'Video'],
  [Briefcase, 'Briefcase'], [Award, 'Award'], [Rocket, 'Rocket'], [GraduationCap, 'GraduationCap'],
];
const iconName = (icon: unknown): string => {
  const hit = ICONS.find(([cmp]) => cmp === icon);
  if (!hit) throw new Error('Unknown icon in STAGES pills');
  return hit[1];
};

// ── career journey stages (icons → names) ───────────────────────────────
const journey = {
  visible: true,
  kicker: 'The Student Transformation',
  title: 'From Aspiring Student to',
  titleEm: 'Industry-Ready Engineer',
  sub: 'Experience the transformative 3-year journey at NHIT Durgapur — where school-level curiosity turns into workshop mastery, professional grooming, and high-value industry careers.',
  ctaTitle: 'Start Your Engineering Story at NHIT',
  ctaText: 'Admissions open for Session 2026–27. Scholarships available for meritorious students across all 6 diploma engineering streams.',
  ctaBtn1Text: 'Apply for Admission 2026',
  ctaBtn1Href: '/admissions',
  ctaBtn2Text: 'Download Brochure',
  ctaBtn2Href: 'https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf',
  stages: STAGES.map((s) => ({
    id: s.id,
    phase: s.phase,
    title: s.title,
    desc: s.desc,
    tag: s.tag,
    pin: s.pin,
    accent: s.accent,
    glow: s.glow,
    image: s.image,
    pills: s.pills.map((p) => ({ icon: iconName(p.icon), text: p.text })),
    metric1: s.metric1,
    metric2: s.metric2,
  })),
};

// ── placement radar branches (Record → ordered array) ───────────────────
const OUT = path.join(process.cwd(), 'src', 'data', 'homepage.json');
const existing = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf-8')) : {};
const radar = {
  visible: true,
  kicker: 'Career Launchpad & Placements',
  title: 'From Diploma Classrooms to',
  titleEm: 'Tier-1 Engineering MNCs',
  titleAfter: '',
  sub: 'Explore branch-wise placement trajectories, verified compensation packages, and day-1 corporate recruiter networks across 18+ years of technical excellence at NHIT Durgapur.',
  pipelineTitle: 'Career Development Pipeline',
  pipelineBadge: 'Click Milestones to Inspect',
  deckHeading: 'Key Recruiting Partners & Job Profiles',
  deckLegend: '* Annual CTC figures based on NHIT T&P records',
  ctaTitle: 'Prepare for Your Engineering Future at NHIT',
  ctaText:
    'Our dedicated Training & Placement Cell arranges campus interviews, soft-skill grooming, and industry MoUs.',
  ctaBtn1Text: 'Download Placement Brochure',
  ctaBtn1Href: 'https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf',
  ctaBtn2Text: 'Explore T&P Cell',
  ctaBtn2Href: '/placements',
  branches: existing.placementRadar?.branches ?? [],
};

// ── full homepage content object ────────────────────────────────────────
const homepage = {
  hero: {
    visible: true,
    slides: [
      {
        bg: '/images/hero-campus.jpg',
        kicker: 'Welcome to NHIT · Est. 2007',
        title: 'Build Your Engineering Career ',
        titleEm: 'Hands-On',
        titleAfter: ' in Durgapur',
        text: "One of eastern India's largest diploma engineering institutes — six branches, two ITI trades and 40+ laboratories, affiliated to WBSCT&VE&SD.",
        btnPrimaryText: 'Apply — Session 2026 →',
        btnPrimaryHref: '/admissions',
        btnGhostText: 'Explore Departments',
        btnGhostHref: '/departments',
      },
      {
        bg: '/images/hero-computers.jpg',
        kicker: 'Learn By Doing',
        title: 'Labs You Work In From ',
        titleEm: 'Semester One',
        titleAfter: ', Not Year Three',
        text: 'From compiler labs to solar-power rigs and live engine teardowns — every branch runs its own laboratory programme with industry MoUs behind it.',
        btnPrimaryText: 'See Lab Floors →',
        btnPrimaryHref: '/departments',
        btnGhostText: 'Placement Record',
        btnGhostHref: '/placements',
      },
      {
        bg: '/images/hero-electronics.jpg',
        kicker: 'Placements & Pathways',
        title: '80–85% of Eligible Students ',
        titleEm: 'Placed',
        titleAfter: ' or in B.Tech',
        text: 'Recruiters from Tata Motors to L&T, MoUs with CSIR-CMERI and HCL, and a proven ladder into B.Tech lateral entry.',
        btnPrimaryText: 'Placement Story →',
        btnPrimaryHref: '/placements',
        btnGhostText: 'Visit the Campus',
        btnGhostHref: '/contact',
      },
    ],
    chips: [
      { label: 'Placement Record', value: '80–85%*', tone: 'red' },
      { label: 'Labs on Campus', value: '40+ Tracked', tone: 'plain' },
      { label: 'R&D MoU', value: 'CSIR-CMERI', tone: 'plain' },
    ],
  },

  features: {
    visible: true,
    items: [
      {
        icon: 'fa-graduation-cap',
        title: 'Est. 2007 — 18+ Years',
        desc: 'First session began 16 August 2007; 14+ batches have passed out into industry and B.Tech programmes.',
      },
      {
        icon: 'fa-university',
        title: 'WBSCT&VE&SD Affiliated',
        desc: 'All diploma programmes under the West Bengal State Council of Technical & Vocational Education and Skill Development.',
      },
      {
        icon: 'fa-flask',
        title: '40+ Laboratories',
        desc: 'Department-wise lab floors — from CNC machining and solar power to embedded systems and concrete testing.',
      },
      {
        icon: 'fa-handshake-o',
        title: 'Industry MoUs',
        desc: 'CSIR-CMERI and NEN MoUs, an HCL technology tie-up, ISTE & IE(India) memberships and British Council Library access.',
      },
    ],
  },

  about: {
    visible: true,
    image: '/images/about-survey.jpg',
    imageAlt: 'NHIT civil engineering students during a surveying field exercise',
    badgeYear: '2007',
    badgeLabel: 'Serving Since',
    title: 'Welcome to The New Horizons Institute of Technology',
    text: 'NHIT opened its first academic session on 16 August 2007 at Durgapur. Today it is one of eastern India\u2019s largest diploma engineering institutes by student intake — with six diploma branches, a Private ITI, and a first pass-out batch that set the standard:',
    textBold: '85% moved into jobs or B.Tech lateral entry',
    checklist: [
      'Six diploma branches — three years, six semesters each',
      'Private ITI trades: Electrician & Fitter',
      'MoUs with CSIR-CMERI (Govt. of India) and NEN; HCL tie-up',
      'Life Member, Institution of Engineers (India); ISTE member',
    ],
    btnPrimaryText: 'Know More →',
    btnPrimaryHref: '/about',
    btnOutlineText: 'Visit Campus',
    btnOutlineHref: '/contact',
  },

  ticker: {
    visible: true,
    heading: 'Latest News',
    footText: 'View All Notices →',
    footHref: '/circulars',
    items: [
      { day: '02', mon: 'OCT', title: '5th Internal Assessment — Schedule Released', link: '/circulars/5th-internal-assessment-schedule', isNew: true },
      { day: '15', mon: 'SEP', title: '1st Internal Examination — Session 2026 Schedule', link: '/circulars/1st-internal-examination-2026-schedule', isNew: true },
      { day: '20', mon: 'AUG', title: 'Odd Semester Fee Payment Window', link: '/circulars/odd-semester-fee-payment-window', isNew: false },
      { day: '10', mon: 'JUL', title: 'Seminar: Green & Clean Energy', link: '/circulars/seminar-green-clean-energy', isNew: false },
      { day: '18', mon: 'JUN', title: 'NHIT Private ITI — Trade Admissions Open', link: '/circulars/nhit-private-iti-admission-notice', isNew: false },
      { day: '10', mon: 'JUN', title: 'Farewell Ceremony — Batch 2021–2024', link: '/circulars/farewell-ceremony-batch-2021-2024', isNew: false },
    ],
  },

  counters: {
    visible: true,
    items: [
      { target: 17, prefix: '', suffix: '+', label: 'Years of Academic Excellence' },
      { target: 5000, prefix: '', suffix: '+', label: 'Placements' },
      { target: 200, prefix: '', suffix: '+', label: 'Recruiters' },
      { target: 6000, prefix: '', suffix: '+', label: 'Alumni Members' },
    ],
  },

  courses: {
    visible: true,
    kicker: 'Our Programs',
    title: 'Popular Diploma Courses',
    sub: 'Three-year, six-semester diploma programmes after Class 10 — plus two ITI trades.',
    items: [
      { slug: 'computer-science-technology', code: 'CST', title: 'Computer Science & Technology', tagline: 'Software Development, Database Management, Computer Networks & AI Foundations', image: '/images/hero-computers.jpg', labs: '07 LABS', intake: '60 SEATS' },
      { slug: 'diploma-in-mechanical-engineering', code: 'ME', title: 'Mechanical Engineering', tagline: 'Precision Machining, Thermal Systems, Hydraulics & Industrial Manufacturing', image: '/images/lab-mechanical.jpg', labs: '11 LABS', intake: '120 SEATS' },
      { slug: 'diploma-in-electrical-engineering', code: 'EE', title: 'Electrical Engineering', tagline: 'Power Systems, Electrical Machines, Switchgear & Renewable Energy', image: '/images/hero-electronics.jpg', labs: '08 LABS', intake: '120 SEATS' },
      { slug: 'diploma-in-civil-engineering', code: 'CE', title: 'Civil Engineering', tagline: 'Total Station Surveying, Concrete Technology, Structural CAD & Soil Mechanics', image: '/images/about-survey.jpg', labs: '08 LABS', intake: '60 SEATS' },
      { slug: 'diploma-in-electronics-telecommunications-engineering', code: 'ETCE', title: 'Electronics & Telecommunications', tagline: 'Microprocessors, Embedded IoT Systems, Optical Fiber & Wireless Networks', image: '/images/lab-electronics.jpg', labs: '07 LABS', intake: '30 SEATS' },
      { slug: 'diploma-in-automobile-engineering', code: 'AE', title: 'Automobile Engineering', tagline: 'Engine Diagnostics, Vehicle Dynamics, CAD Design & Hybrid/EV Technologies', image: '/images/lab-automobile.jpg', labs: '07 LABS', intake: '60 SEATS' },
    ],
    itiHub: {
      badge: 'NCVT Craftsman Training Scheme (CTS)',
      title: 'Looking for Industrial Training (ITI)?',
      text: 'NHIT offers 2-Year Full-Time NCVT Approved ITI in Electrician and Fitter with intensive workshop practice and 100% placement support.',
      btn1Text: 'ITI Electrician →',
      btn1Href: '/admissions',
      btn2Text: 'ITI Fitter →',
      btn2Href: '/admissions',
      btn3Text: 'Explore ITI Hub ↗',
      btn3Href: '/departments',
    },
  },

  outcomes: {
    visible: true,
    kicker: 'Outcomes Infographic',
    title: 'Where an NHIT Diploma Takes You',
    bars: [
      { value: '80–85%', label: 'Placed / B.Tech*', heightPct: '88%', color: '#ff3115', colorDark: '#c92810' },
      { value: '15–20%', label: 'Higher Studies', heightPct: '52%', color: '#00bcd4', colorDark: '#0097a7' },
      { value: '14+', label: 'Batches Out', heightPct: '66%', color: '#92278f', colorDark: '#6e1d6c' },
    ],
    outcomes: [
      {
        icon: '💼',
        title: 'Industry Placement — 80–85%*',
        text: 'Of interested, eligible students — recruited by Tata Motors, L&T, John Deere, JBM, TIL India, Anand Group, Sharda Motors and more.',
      },
      {
        icon: '🎓',
        title: 'B.Tech Lateral Entry — 15–20%',
        text: 'Diploma holders enter B.E./B.Tech second year directly — the classic diploma-to-degree ladder.',
      },
      {
        icon: '🚀',
        title: 'Foundership via NEN',
        text: 'A few alumni have launched auto-sector enterprises, backed by our National Entrepreneurship Network MoU.',
      },
    ],
    footnote:
      '* As recorded by NHIT placement records (2022) — batch-wise figures available at the T&P cell.',
  },

  recruiters: {
    visible: true,
    kicker: 'Placements & Industry',
    title: 'Recruiters Who Hire NHIT Engineers',
    sub: "Automotive, construction and technology employers from NHIT's placement records.",
    logos: [
      { src: '/images/rec-tata.png', alt: 'Tata Motors' },
      { src: '/images/rec-lt.png', alt: 'Larsen & Toubro' },
      { src: '/images/rec-cummins.png', alt: 'Cummins India' },
      { src: '/images/rec-magna.png', alt: 'Magna Automotive' },
      { src: '/images/rec-force.png', alt: 'Force Motors' },
      { src: '/images/rec-kiswok.jpg', alt: 'Kiswok' },
      { src: '/images/rec-mate.jpg', alt: 'MATE' },
      { src: '/images/rec-wmark.jpg', alt: 'Campus recruiter partner' },
      { src: '/images/rec-hex.png', alt: 'Piaggio' },
    ],
    marks: [
      { name: 'JOHN DEERE', sub: 'Agri-Machinery' },
      { name: 'JBM GROUP', sub: 'Auto Systems' },
      { name: 'TIL INDIA', sub: 'Heavy Equipment' },
      { name: 'ANAND GROUP', sub: 'Components' },
      { name: 'SHARDA MOTORS', sub: 'Automotive' },
      { name: 'HCL', sub: 'Technology Partner' },
    ],
  },

  placementRadar: radar,

  careerJourney: journey,

  testimonials: {
    visible: true,
    heading: 'WHAT PEOPLE SAY',
    sub: 'Voices of our alumni, industry recruiters, and parents reflecting 18+ years of technical excellence at NHIT Durgapur.',
    items: [
      {
        name: 'Debjit Ghosh',
        role: 'Alumnus, Mechanical Engineering (Tata Motors)',
        image: '/images/campus-04.jpg',
        quote: 'NHIT provided the ideal balance of workshop hands-on practice and rigorous theory. The state-of-the-art CNC lab made the campus interview process seamless.',
      },
      {
        name: 'Sneha Mukherjee',
        role: 'Alumna, Computer Science & Technology',
        image: '/images/campus-05.jpg',
        quote: 'The high-speed computing lab and faculty mentoring gave me the technical edge to excel in lateral entry B.Tech and subsequent software development career.',
      },
      {
        name: 'Subhash Mondal',
        role: 'Parent of EE Diploma Graduate',
        image: '/images/campus-06.jpg',
        quote: 'The academic discipline, anti-ragging security, and dedicated placement cell gave our family complete peace of mind. My son secured direct campus placement.',
      },
      {
        name: 'Rajesh Karmakar',
        role: 'Alumnus, Automobile Engineering (Anand Group)',
        image: '/images/campus-07.jpg',
        quote: 'Live vehicle chassis test benches and industry visit exposure at NHIT Durgapur prepared me with real manufacturing skills that auto giants demand.',
      },
    ],
  },

  gallery: {
    visible: true,
    kicker: 'Campus Life',
    title: 'Inside the NHIT Campus',
    items: [
      { src: '/images/hero-campus.jpg', alt: 'NHIT campus main building', caption: 'Main Block' },
      { src: '/images/hero-computers.jpg', alt: 'Computer laboratory', caption: 'Computer Lab' },
      { src: '/images/lab-automobile.jpg', alt: 'Automobile engine laboratory', caption: 'Engine Lab' },
      { src: '/images/lab-mechanical.jpg', alt: 'Hydraulics laboratory', caption: 'Hydraulics Lab' },
      { src: '/images/lab-electronics.jpg', alt: 'Electronics laboratory session', caption: 'Electronics Lab' },
      { src: '/images/about-survey.jpg', alt: 'Surveying field practice', caption: 'Survey Practice' },
      { src: '/images/hero-electronics.jpg', alt: 'Electrical measurement lab', caption: 'Measurement Lab' },
      { src: '/images/gallery-event.jpg', alt: 'Farewell ceremony', caption: 'Farewell 2024' },
      { src: '/images/campus-01.jpg', alt: 'Campus life at NHIT', caption: 'Campus Life' },
      { src: '/images/campus-03.jpg', alt: 'Training session', caption: 'Training Session' },
      { src: '/images/campus-11.jpg', alt: 'Industry visit', caption: 'Industry Visit' },
      { src: '/images/campus-21.jpg', alt: 'Campus event', caption: 'Campus Event' },
    ],
  },

  leadForm: {
    visible: true,
    title: 'Begin Your Journey at NHIT Durgapur',
    text: 'Admissions are now open for Session 2026–2027. Speak directly with our Senior Academic Counselors for branch eligibility, JEXPO/MAKAUT counseling guidance, hostel availability, and merit scholarships.',
    perks: [
      'Official 2026–27 Institute Prospectus & Fee Structure PDF',
      'SVMCM, OASIS & Aikyashree Scholarship Assistance',
      'One-on-One Counseling & Campus Lab Tour Invitation',
      'Institute Bus Route Details (Asansol, Raniganj, Bardhaman)',
    ],
    privacyNote:
      '🔒 Your contact information is kept strictly confidential according to NHIT institutional privacy guidelines.',
    submitText: 'Register Admission Inquiry & Download Brochure ↘',
    successNote:
      'Thank you! Your inquiry has been registered. The admissions desk will reach out on WhatsApp.',
    brochureUrl: 'https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf',
  },
};

const out = OUT;
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(homepage, null, 2));
console.log('Wrote', out, `(${(fs.statSync(out).size / 1024).toFixed(1)} KB)`);
