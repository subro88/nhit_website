/*
 * NHIT CMS — shared types for the editable home page content.
 * The single source of truth is src/data/homepage.json, edited from
 * /admin/homepage. These interfaces describe each section of that file.
 */

export interface HeroSlide {
  bg: string;
  kicker: string;
  title: string;
  titleEm: string;
  titleAfter: string;
  text: string;
  btnPrimaryText: string;
  btnPrimaryHref: string;
  btnGhostText: string;
  btnGhostHref: string;
}

export interface HeroChip {
  label: string;
  value: string;
  tone?: string;
}

export interface HeroData {
  visible?: boolean;
  slides: HeroSlide[];
  chips?: HeroChip[];
  estdBadge?: EstdBadgeData;
  tourLabel?: string;
  tourVideo?: string;
}

export interface EstdFeature {
  icon: string;
  label: string;
  value: string;
}

export interface EstdBadgeData {
  visible?: boolean;
  text?: string;
  features?: EstdFeature[];
}

export interface AchievementItem {
  icon?: string;
  text: string;
}

export interface AchievementsData {
  visible?: boolean;
  heading?: string;
  items: AchievementItem[];
}

export interface VideoCardItem {
  youtubeId: string;
  title: string;
  note?: string;
}

export interface VideoStripData {
  visible?: boolean;
  kicker?: string;
  title?: string;
  sub?: string;
  videos: VideoCardItem[];
  ctaText?: string;
  ctaHref?: string;
}

export interface PlacementBar {
  label: string;
  pct: string;
  show?: boolean;
}

export interface TrustChip {
  icon?: string;
  text: string;
}

export interface PlacementBarsData {
  visible?: boolean;
  kicker?: string;
  title?: string;
  sub?: string;
  bars: PlacementBar[];
  trust: TrustChip[];
  footnote?: string;
}

export interface SocialCard {
  icon: string;
  name: string;
  handle: string;
  stat: string;
  url: string;
  note?: string;
}

export interface SocialWallData {
  visible?: boolean;
  kicker?: string;
  title?: string;
  sub?: string;
  cards: SocialCard[];
}

export interface AlumniVoice {
  youtubeId: string;
  name: string;
  role: string;
  quote: string;
}

export interface AlumniVoicesData {
  visible?: boolean;
  kicker?: string;
  title?: string;
  sub?: string;
  voices: AlumniVoice[];
}

export interface CtaBandData {
  visible?: boolean;
  title?: string;
  note?: string;
  btn1Text?: string;
  btn1Href?: string;
  btn2Text?: string;
  btn2Href?: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

export interface FeaturesData {
  visible?: boolean;
  items: FeatureItem[];
}

export interface AboutData {
  visible?: boolean;
  image: string;
  imageAlt?: string;
  badgeYear?: string;
  badgeLabel?: string;
  title: string;
  text: string;
  textBold?: string;
  checklist?: string[];
  btnPrimaryText?: string;
  btnPrimaryHref?: string;
  btnOutlineText?: string;
  btnOutlineHref?: string;
}

export interface TickerItem {
  day: string;
  mon: string;
  title: string;
  link: string;
  isNew?: boolean;
}

export interface TickerData {
  visible?: boolean;
  heading?: string;
  footText?: string;
  footHref?: string;
  items: TickerItem[];
}

export interface CounterItem {
  target: number;
  prefix?: string;
  suffix: string;
  label: string;
}

export interface CountersData {
  visible?: boolean;
  items: CounterItem[];
}

export interface CourseItem {
  slug: string;
  code: string;
  title: string;
  tagline: string;
  image: string;
  labs: string;
  intake: string;
}

export interface CoursesData {
  visible?: boolean;
  kicker?: string;
  title?: string;
  sub?: string;
  items: CourseItem[];
  itiHub?: {
    badge?: string;
    title?: string;
    text?: string;
    btn1Text?: string;
    btn1Href?: string;
    btn2Text?: string;
    btn2Href?: string;
    btn3Text?: string;
    btn3Href?: string;
  };
}

export interface OutcomeBar {
  value: string;
  label: string;
  heightPct?: string;
  color?: string;
  colorDark?: string;
  /* optional session details shown in the interactive panel below the chart */
  total?: string;
  opted?: string;
  placed?: string;
  higher?: string;
  ongoing?: boolean;
}

export interface OutcomeItem {
  icon: string;
  title: string;
  text: string;
}

export interface OutcomesData {
  visible?: boolean;
  kicker?: string;
  title?: string;
  bars: OutcomeBar[];
  outcomes: OutcomeItem[];
  footnote?: string;
}

export interface RecruiterLogo {
  src: string;
  alt: string;
}

export interface RecruiterMark {
  name: string;
  sub: string;
}

export interface RecruitersData {
  visible?: boolean;
  kicker?: string;
  title?: string;
  sub?: string;
  logos: RecruiterLogo[];
  marks: RecruiterMark[];
}

export interface RadarBranch {
  id: string;
  tabLabel: string;
  tabTag: string;
  title: string;
  icon: string;
  desc: string;
  stats: { highest: number; avg: number; rate: number; recruiters: number };
  milestones: Array<{ step: string; title: string; desc: string }>;
  roles: Array<{ company: string; tag: string; tagClass: string; title: string; scope: string; salary: string }>;
}

export interface PlacementRadarData {
  visible?: boolean;
  kicker?: string;
  title?: string;
  titleEm?: string;
  titleAfter?: string;
  sub?: string;
  pipelineTitle?: string;
  pipelineBadge?: string;
  deckHeading?: string;
  deckLegend?: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaBtn1Text?: string;
  ctaBtn1Href?: string;
  ctaBtn2Text?: string;
  ctaBtn2Href?: string;
  branches: RadarBranch[];
}

export interface JourneyPill {
  icon: string;
  text: string;
}

export interface JourneyStage {
  id?: number;
  phase: string;
  title: string;
  desc: string;
  tag: string;
  pin: string;
  accent: string;
  glow: string;
  image: string;
  pills: JourneyPill[];
  metric1: { label: string; value: string };
  metric2: { label: string; value: string };
}

export interface CareerJourneyData {
  visible?: boolean;
  kicker?: string;
  title?: string;
  titleEm?: string;
  sub?: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaBtn1Text?: string;
  ctaBtn1Href?: string;
  ctaBtn2Text?: string;
  ctaBtn2Href?: string;
  stages: JourneyStage[];
}

export interface TestimonialItem {
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface TestimonialsData {
  visible?: boolean;
  kicker?: string;
  heading?: string;
  sub?: string;
  items: TestimonialItem[];
}

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

export interface GalleryData {
  visible?: boolean;
  kicker?: string;
  title?: string;
  items: GalleryItem[];
}

export interface LeadFormData {
  visible?: boolean;
  title: string;
  text: string;
  perks?: string[];
  privacyNote?: string;
  submitText?: string;
  successNote?: string;
  brochureUrl?: string;
}

export interface MessageData {
  kicker?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  photo?: string;
  photoAlt?: string;
  roleTag?: string;
  heading?: string;
  orgLine?: string;
  approvalChip?: string;
  quoteStyle?: boolean;
  paragraphs?: string[];
  signPlace?: string;
  signName?: string;
  signOrg?: string;
}

export interface MessagesFileData {
  principal: MessageData;
  vicePrincipal: MessageData;
  president: MessageData;
  secretary: MessageData;
}

export interface BrandData {
  visible?: boolean;
  logo?: string;
  name?: string;
  nameEm?: string;
  sub?: string;
}

export interface HomepageData {
  theme?: { palette?: string };
  brand?: BrandData;
  hero: HeroData;
  features: FeaturesData;
  about: AboutData;
  ticker: TickerData;
  counters: CountersData;
  courses: CoursesData;
  outcomes: OutcomesData;
  recruiters: RecruitersData;
  placementRadar: PlacementRadarData;
  careerJourney: CareerJourneyData;
  testimonials: TestimonialsData;
  gallery: GalleryData;
  leadForm: LeadFormData;
  ctaBand?: CtaBandData;
  achievements?: AchievementsData;
  videoStrip?: VideoStripData;
  placementBars?: PlacementBarsData;
  socialWall?: SocialWallData;
  alumniVoices?: AlumniVoicesData;
}
