import { BLOG_FILE, readJson, slugify, todayFormatted, writeJson } from '@/lib/cmsStore';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
}

export function readPosts(): BlogPost[] {
  return readJson<BlogPost[]>(BLOG_FILE, []);
}

export function writePosts(posts: BlogPost[]): void {
  writeJson(BLOG_FILE, posts);
}

export function uniquePostSlug(base: string, posts: BlogPost[]): string {
  const taken = new Set(posts.map((p) => p.slug));
  if (!taken.has(base)) return base;
  let i = 2;
  while (taken.has(`${base}-${i}`)) i += 1;
  return `${base}-${i}`;
}

export function nextPostId(posts: BlogPost[]): number {
  return posts.reduce((max, p) => Math.max(max, p.id || 0), 100) + 1;
}

export function defaultPostDate(): string {
  return todayFormatted();
}

export { slugify };
