import fs from 'fs';
import path from 'path';

/*
 * NHIT CMS — content store.
 *
 * All editable content lives in plain files that are also tracked by git:
 *   - src/data/departments.json            (department page data)
 *   - content/circulars/notices-index.json (notice board index)
 *   - content/circulars/<slug>.mdx         (notice files, for git history)
 *   - content/blog/posts.json              (blog posts)
 *
 * Every write first snapshots the current file into cms-backups/ so a bad
 * save can always be rolled back.
 */

const ROOT = process.cwd();
const BACKUP_DIR = path.join(ROOT, 'cms-backups');
const MAX_BACKUPS_PER_FILE = 20;

export const DEPARTMENTS_FILE = 'src/data/departments.json';
export const HOMEPAGE_FILE = 'src/data/homepage.json';
export const MESSAGES_FILE = 'src/data/messages.json';
export const PAGES_FILE = 'src/data/pages.json';
export const NOTICES_INDEX_FILE = 'content/circulars/notices-index.json';
export const NOTICES_DIR = 'content/circulars';
export const BLOG_FILE = 'content/blog/posts.json';
export const FACULTY_FILE = 'content/faculty/faculty-roster.json';

export function readJson<T>(relPath: string, fallback: T): T {
  try {
    const full = path.join(ROOT, relPath);
    if (!fs.existsSync(full)) return fallback;
    return JSON.parse(fs.readFileSync(full, 'utf-8')) as T;
  } catch {
    return fallback;
  }
}

function backupFile(relPath: string): void {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return;
  try {
    if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
    const safeName = relPath.replace(/[/\\]/g, '__');
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    fs.copyFileSync(full, path.join(BACKUP_DIR, `${safeName}.${stamp}.bak`));

    // keep only the newest MAX_BACKUPS_PER_FILE backups for this file
    const prefix = `${safeName}.`;
    const old = fs
      .readdirSync(BACKUP_DIR)
      .filter((f) => f.startsWith(prefix) && f.endsWith('.bak'))
      .sort();
    while (old.length > MAX_BACKUPS_PER_FILE) {
      fs.unlinkSync(path.join(BACKUP_DIR, old.shift() as string));
    }
  } catch {
    // backup failure must never block a save
  }
}

export function writeJson(relPath: string, data: unknown): void {
  backupFile(relPath);
  const full = path.join(ROOT, relPath);
  const tmp = `${full}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, full);
}

export function writeTextFile(relPath: string, contents: string): void {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
}

export function deleteFileIfExists(relPath: string): void {
  const full = path.join(ROOT, relPath);
  if (fs.existsSync(full)) fs.unlinkSync(full);
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

export function todayFormatted(): string {
  const now = new Date();
  const month = now.toLocaleString('en-US', { month: 'long' });
  const day = String(now.getDate()).padStart(2, '0');
  return `${month} ${day}, ${now.getFullYear()}`;
}

export function nowStamp(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:00`;
}
