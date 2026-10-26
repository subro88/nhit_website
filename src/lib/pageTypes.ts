/*
 * NHIT CMS — types for simple content pages (src/data/pages.json).
 * Each page = hero fields + an ordered list of typed sections.
 */

export interface PhotoItem {
  src: string;
  caption?: string;
}

export interface StatTile {
  value: string;
  label?: string;
  color?: 'red' | 'green' | 'cyan' | 'blue' | 'dark';
}

export interface PageSection {
  type:
    | 'text'        // tag + heading + paragraphs (+ optional stat bar / photo strip)
    | 'quote'       // red-accent declaration box (+ optional signature)
    | 'officerCards'// info boxes (e.g. PIO / FAA)
    | 'steps'       // numbered list
    | 'table'       // roster table (main+sub first column, extra cells)
    | 'objectives'  // check-circle title+desc list
    | 'grid'        // 2-column title+type+desc cards
    | 'approvals'   // approval rows with status badge
    | 'helplines'   // big-number boxes (also used for value strips)
    | 'banner'      // dark highlight box (+ optional badge & button)
    // ——— richer section types (infrastructure / student life / about / ITI) ———
    | 'iconCards'   // icon + title + desc cards inside one article card
    | 'photoGrid'   // photo gallery (card or overlay style)
    | 'hubCards'    // innovation hub / chapter cards with status badges
    | 'tradeCards'  // ITI trade showcase cards (photo, highlights, workshop line)
    | 'milestones'  // year timeline rows
    | 'visionMission' // two-column vision + mission checklist
    | 'linkCards'   // emoji link cards (e.g. leadership messages)
    // ——— admissions / placements / contact / society / disclosure ———
    | 'stepCards'   // numbered or badged card grid (roadmap, scholarships, training)
    | 'checkCards'  // big cards with check-list bullets + optional button (pathways, committees)
    | 'logoWall'    // recruiter logo images + text brand tiles
    | 'contactCards'// contact info cards (icon, label, rich lines, footer button)
    | 'inquiryForm' // inquiry form + office hours + transit note (client island)
    | 'mapEmbed'    // google maps iframe
    | 'docCards'    // download / document cards with icon + button
    | 'placementRadar'; // embeds the home-page PlacementRadar chart
  tag?: string;
  heading?: string;
  sub?: string;
  paragraphs?: string[];

  // text extras
  stats?: StatTile[];

  // text: top pill row (e.g. AICTE compliance badge)
  pill?: string;
  pillNote?: string;

  // text: red/amber callout quote inserted between paragraphs
  callout?: string;
  calloutPos?: number; // paragraph index after which the callout renders
  calloutTitle?: string;
  calloutTone?: 'red' | 'amber';
  calloutIcon?: string;

  // text: label/value mini table (registration details, profiles)
  kv?: Array<{ label?: string; value?: string; highlight?: boolean }>;

  // text: tinted note box at the end (amber = warning style)
  noteTitle?: string;
  noteTone?: 'red' | 'amber';
  noteIcon?: string;

  // iconCards / hubCards / linkCards / tradeCards items
  items?: Array<Record<string, unknown> | string>;

  // officerCards
  cards?: Array<{ label?: string; labelColor?: string; title?: string; lines?: string[] }>;

  // table
  columns?: string[];
  rows?: Array<{ main?: string; sub?: string; cells?: string[] }>;
  foot?: { main?: string; cells?: string[] }; // highlighted total row
  photoSrc?: string;   // optional side photo card next to the table
  photoTitle?: string;
  photoSub?: string;
  photoLinkText?: string;
  photoLinkHref?: string;

  // helplines / stat strips
  boxes?: Array<{ title?: string; value?: string; note?: string; color?: string }>;
  columnsCount?: 2 | 4 | 5;
  centered?: boolean;

  // photoGrid
  photos?: PhotoItem[];
  photoStyle?: 'card' | 'overlay';
  linkText?: string;
  linkHref?: string;

  // visionMission
  visionTag?: string;
  visionTitle?: string;
  visionText?: string;
  visionEmoji?: string;
  missionTitle?: string;
  missionItems?: string[];
  missionEmoji?: string;

  // banner
  badge?: string;
  btnText?: string;
  btnHref?: string;
  btn2Text?: string;   // second optional button
  btn2Href?: string;
  btn2Tone?: 'red' | 'dark' | 'emerald';

  // inquiryForm
  nameLabel?: string;
  namePh?: string;
  phoneLabel?: string;
  phonePh?: string;
  emailLabel?: string;
  emailPh?: string;
  branchLabel?: string;
  options?: string[];
  queryLabel?: string;
  queryPh?: string;
  submitLabel?: string;
  successTitle?: string;
  successText?: string;
  resendLabel?: string;
  hoursTitle?: string;
  hoursRows?: Array<{ day?: string; time?: string; danger?: boolean }>;
  transitTitle?: string;
  transitText?: string;

  // mapEmbed
  embedUrl?: string;

  signedBy?: string;
  signedOrg?: string;
  icon?: string;
  note?: string;
}

export interface PageContent {
  kicker?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  layout?: 'sidebar' | 'full'; // sidebar = narrow main + left nav, full = wide no nav
  sections?: PageSection[];
  meta?: { title?: string; description?: string }; // browser tab SEO
}

export type PagesFileData = Record<string, PageContent>;
