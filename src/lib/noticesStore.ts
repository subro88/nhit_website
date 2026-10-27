import {
  SessionUser,
} from '@/lib/auth';
import {
  NOTICES_DIR,
  NOTICES_INDEX_FILE,
  nowStamp,
  readJson,
  slugify,
  writeJson,
  writeTextFile,
  deleteFileIfExists,
} from '@/lib/cmsStore';

export interface NoticeEntry {
  title: string;
  slug: string;
  date: string;
  category: string;
  summary: string;
  department?: string;
}

export const VALID_CATEGORIES = ['exam', 'fee', 'admission', 'event', 'general'];

export function readNotices(): NoticeEntry[] {
  return readJson<NoticeEntry[]>(NOTICES_INDEX_FILE, []);
}

export function writeNotices(notices: NoticeEntry[]) {
  const sorted = [...notices].sort((a, b) =>
    (b.date || '').localeCompare(a.date || '')
  );
  writeJson(NOTICES_INDEX_FILE, sorted);
}

export function canManageNotice(
  user: SessionUser,
  entry: NoticeEntry | undefined
): boolean {
  if (user.role === 'superadmin') return true;
  if (user.role !== 'department') return false;
  if (!entry) return false;
  // Department users can only manage notices tagged with their own dept.
  return !!entry.department && entry.department === user.dept;
}

function noticeMdx(entry: NoticeEntry): string {
  const fm = [
    `title: ${JSON.stringify(entry.title)}`,
    `slug: ${JSON.stringify(entry.slug)}`,
    `date: ${JSON.stringify(entry.date)}`,
    `category: ${JSON.stringify(entry.category)}`,
    entry.department ? `department: ${JSON.stringify(entry.department)}` : null,
  ]
    .filter(Boolean)
    .join('\n');
  return `---\n${fm}\n---\n\n${entry.summary.trim()}\n`;
}

export function uniqueSlug(base: string, existing: NoticeEntry[]): string {
  const taken = new Set(existing.map((n) => n.slug));
  if (!taken.has(base)) return base;
  let i = 2;
  while (taken.has(`${base}-${i}`)) i += 1;
  return `${base}-${i}`;
}

export function mdxPath(slug: string): string {
  return `${NOTICES_DIR}/${slug}.mdx`;
}

export function saveNoticeFiles(entry: NoticeEntry): void {
  writeNoticesPatch(entry);
  writeTextFile(mdxPath(entry.slug), noticeMdx(entry));
}

function writeNoticesPatch(entry: NoticeEntry): void {
  const notices = readNotices();
  const idx = notices.findIndex((n) => n.slug === entry.slug);
  if (idx >= 0) notices[idx] = entry;
  else notices.push(entry);
  writeNotices(notices);
}

export function removeNotice(slug: string): void {
  const notices = readNotices().filter((n) => n.slug !== slug);
  writeNotices(notices);
  deleteFileIfExists(mdxPath(slug));
}

export function createNotice(
  input: Pick<NoticeEntry, 'title' | 'category' | 'summary'> & {
    date?: string;
    department?: string;
  }
): NoticeEntry {
  const notices = readNotices();
  const entry: NoticeEntry = {
    title: input.title,
    slug: uniqueSlug(slugify(input.title), notices),
    date: input.date?.trim() || nowStamp(),
    category: input.category,
    summary: input.summary,
  };
  if (input.department) entry.department = input.department;
  saveNoticeFiles(entry);
  return entry;
}
