import {
  forbidden,
  getSessionFromRequest,
  unauthorized,
} from '@/lib/auth';
import {
  BlogPost,
  readPosts,
  writePosts,
} from '@/lib/blogStore';

interface RouteParams {
  params: { id: string };
}

/* ── PUT: update a post (super admin only) ──────────────────────────── */
export async function PUT(req: Request, { params }: RouteParams) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();
  if (user.role !== 'superadmin') return forbidden();

  const id = Number(params.id);
  const posts = readPosts();
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return Response.json({ error: 'Post not found' }, { status: 404 });
  }

  let body: Partial<BlogPost>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (body.title?.trim()) post.title = body.title.trim();
  if (body.excerpt?.trim()) post.excerpt = body.excerpt.trim();
  if (body.content?.trim()) post.content = body.content.trim();
  if (body.category?.trim()) post.category = body.category.trim();
  if (body.image?.trim()) post.image = body.image.trim();
  if (body.date?.trim()) post.date = body.date.trim();

  writePosts(posts);
  return Response.json({ ok: true, post });
}

/* ── DELETE: remove a post (super admin only) ───────────────────────── */
export async function DELETE(req: Request, { params }: RouteParams) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();
  if (user.role !== 'superadmin') return forbidden();

  const id = Number(params.id);
  const posts = readPosts();
  const remaining = posts.filter((p) => p.id !== id);
  if (remaining.length === posts.length) {
    return Response.json({ error: 'Post not found' }, { status: 404 });
  }

  writePosts(remaining);
  return Response.json({ ok: true });
}
