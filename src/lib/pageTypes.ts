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
    | 'linkCards';  // emoji link cards (e.g. leadership messages)
  tag?: string;
  heading?: string;
  sub?: string;
  paragraphs?: string[];

  // text extras
  stats?: StatTile[];

  // iconCards / hubCards / linkCards / tradeCards items
  items?: Array<Record<string, unknown> | string>;

  // officerCards
  cards?: Array<{ label?: string; labelColor?: string; title?: string; lines?: string[] }>;

  // table
  columns?: string[];
  rows?: Array<{ main?: string; sub?: string; cells?: string[] }>;

  // helplines / stat strips
  boxes?: Array<{ title?: string; value?: string; note?: string; color?: string }>;
  columnsCount?: 2 | 4;

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
}

export type PagesFileData = Record<string, PageContent>;
