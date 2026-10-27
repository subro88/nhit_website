import {
  forbidden,
  getSessionFromRequest,
  unauthorized,
} from '@/lib/auth';
import {
  BlogPost,
  defaultPostDate,
  nextPostId,
  readPosts,
  slugify,
  uniquePostSlug,
  writePosts,
} from '@/lib/blogStore';

/* ── GET: list posts (super admin only) ─────────────────────────────── */
export async function GET(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();
  if (user.role !== 'superadmin') return forbidden();
  return Response.json({ posts: readPosts() });
}

/* ── POST: create a post (super admin only) ─────────────────────────── */
export async function POST(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();
  if (user.role !== 'superadmin') return forbidden();

  let body: Partial<BlogPost>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const title = (body.title || '').trim();
  const excerpt = (body.excerpt || '').trim();
  const content = (body.content || '').trim();
  if (!title || !excerpt || !content) {
    return Response.json(
      { error: 'Title, excerpt and content are required' },
      { status: 400 }
    );
  }

  const posts = readPosts();
  const post: BlogPost = {
    id: nextPostId(posts),
    slug: uniquePostSlug(slugify(title), posts),
    title,
    date: body.date?.trim() || defaultPostDate(),
    category: body.category?.trim() || 'Campus Updates',
    image: body.image?.trim() || '/images/campus-01.jpg',
    excerpt,
    content,
  };

  posts.unshift(post);
  writePosts(posts);
  return Response.json({ ok: true, post }, { status: 201 });
}
