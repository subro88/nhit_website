/*
 * NHIT CMS — types for simple content pages (src/data/pages.json).
 * Each page = hero fields + an ordered list of typed sections.
 */

export interface PageSection {
  type:
    | 'text'        // tag + heading + paragraphs
    | 'quote'       // red-accent declaration box (+ optional signature)
    | 'officerCards'// info boxes (e.g. PIO / FAA)
    | 'steps'       // numbered list
    | 'table'       // roster table (main+sub first column, extra cells)
    | 'objectives'  // check-circle title+desc list
    | 'grid'        // 2-column title+type+desc cards
    | 'approvals'   // approval rows with status badge
    | 'helplines'   // big-number boxes
    | 'banner';     // dark highlight box
  tag?: string;
  heading?: string;
  paragraphs?: string[];
  signedBy?: string;
  signedOrg?: string;
  cards?: Array<{ label?: string; labelColor?: string; title?: string; lines?: string[] }>;
  items?: Array<Record<string, string> | string>;
  columns?: string[];
  rows?: Array<{ main?: string; sub?: string; cells?: string[] }>;
  boxes?: Array<{ title?: string; value?: string; note?: string; color?: string }>;
  icon?: string;
  note?: string;
}

export interface PageContent {
  kicker?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  sections?: PageSection[];
}

export type PagesFileData = Record<string, PageContent>;
