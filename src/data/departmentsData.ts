export interface DepartmentPillar {
  tag: string;
  title: string;
  desc: string;
  skills: string[];
}

export interface DepartmentEvent {
  title: string;
  date_badge: string;
  desc: string;
  image: string;
  type?: string;
  link?: string;
}

export interface DepartmentProject {
  title: string;
  team: string;
  stack: string;
  desc: string;
  image: string;
  link?: string;
}

export interface DepartmentTestimonial {
  name: string;
  role: string;
  org: string;
  quote: string;
  photo: string;
}

export interface DepartmentCareerGroup {
  title: string;
  desc: string;
  items: string[];
}

export interface DepartmentCareers {
  roles: DepartmentCareerGroup;
  psu: DepartmentCareerGroup;
  lateral: DepartmentCareerGroup;
  recruiters: string[];
}

export interface DepartmentFaq {
  q: string;
  a: string;
}

export interface DepartmentLab {
  name: string;
  spec: string;
  img?: string;
}

export interface DepartmentHod {
  name: string;
  desig: string;
  img: string;
  message: string;
}

export interface DepartmentHudSpec {
  label: string;
  val: string;
  sub: string;
}

export interface DepartmentData {
  slug: string;
  code: string;
  title: string;
  order: number;
  tagline: string;
  accentHex: string;
  accentRgb: string;
  intake: string;
  duration: string;
  regulatory: string;
  practicalRatio: string;
  eligibility: string;
  syllabusPdf: string;
  stats: {
    placementRate: string;
    highestCtc: string;
    medianCtc: string;
  };
  heroSlides: string[];
  hudSpecs: DepartmentHudSpec[];
  pillars: DepartmentPillar[];
  narrative: string;
  hod: DepartmentHod;
  labs: DepartmentLab[];
  sems: Record<string, string[]>;
  events: DepartmentEvent[];
  projects: DepartmentProject[];
  testimonials: DepartmentTestimonial[];
  careers: DepartmentCareers;
  faqs: DepartmentFaq[];
}

// Department content is stored in departments.json so the CMS admin panel
// can update it safely without touching TypeScript source files.
import departmentsJson from './departments.json';

export const departmentsData: Record<string, DepartmentData> =
  departmentsJson as unknown as Record<string, DepartmentData>;
