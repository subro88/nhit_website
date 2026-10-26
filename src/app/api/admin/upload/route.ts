import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { getSessionFromRequest, forbidden, unauthorized } from '@/lib/auth';

/*
 * NHIT CMS — image upload + image library.
 *
 * POST   /api/admin/upload   → upload one image (multipart field "file")
 * GET    /api/admin/upload   → list all images (uploads + bundled site images)
 * DELETE /api/admin/upload?name=x.jpg → delete an uploaded image
 *
 * Uploaded images live in public/uploads/ and are tracked by git so they
 * survive pushes and restarts. Bundled images under public/images are shown
 * in the picker but can never be deleted or overwritten from the panel.
 */

const ROOT = process.cwd();
const UPLOAD_DIR = path.join(ROOT, 'public', 'uploads');
const BUNDLED_DIR = path.join(ROOT, 'public', 'images');

// Photos are compressed in the browser before they arrive (WebP, max 1920px),
// so the raw limit is generous — it mainly protects against GIF/SVG files that
// skip compression and any browser that cannot compress.
const MAX_SIZE = 15 * 1024 * 1024; // 15 MB
const ALLOWED_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
};

function isSuperAdmin(req: Request): { user: ReturnType<typeof getSessionFromRequest> } | { error: Response } {
  const user = getSessionFromRequest(req);
  if (!user) return { error: unauthorized() };
  if (user.role !== 'superadmin') return { error: forbidden() };
  return { user };
}

function listImages(dir: string, relBase: string, recursive = true): Array<{ name: string; url: string; size: number; mtime: string }> {
  const out: Array<{ name: string; url: string; size: number; mtime: string }> = [];
  if (!fs.existsSync(dir)) return out;
  const stack: string[] = [''];
  while (stack.length) {
    const rel = stack.shift() as string;
    const abs = path.join(dir, rel);
    let entries: fs.Dirent[] = [];
    try {
      entries = fs.readdirSync(abs, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const relPath = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isDirectory() && recursive) {
        stack.push(relPath);
        continue;
      }
      if (!entry.isFile()) continue;
      if (!/\.(jpe?g|png|webp|gif|svg)$/i.test(entry.name)) continue;
      let stat: fs.Stats | null = null;
      try {
        stat = fs.statSync(path.join(abs, entry.name));
      } catch {
        continue;
      }
      if (!stat) continue;
      out.push({
        name: relPath,
        url: `${relBase}/${relPath.split(path.sep).join('/')}`,
        size: stat.size,
        mtime: stat.mtime.toISOString(),
      });
    }
  }
  return out.sort((a, b) => b.mtime.localeCompare(a.mtime));
}

export async function POST(req: Request) {
  const guard = isSuperAdmin(req);
  if ('error' in guard) return guard.error;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: 'Invalid upload request' }, { status: 400 });
  }

  const file = form.get('file');
  if (!file || typeof file === 'string') {
    return Response.json({ error: 'No file received' }, { status: 400 });
  }

  const blob = file as File;
  const ext = ALLOWED_MIME[blob.type.toLowerCase()];
  if (!ext) {
    return Response.json(
      { error: 'Only JPG, PNG, WEBP, GIF or SVG images are allowed' },
      { status: 400 }
    );
  }
  if (blob.size > MAX_SIZE) {
    return Response.json(
      { error: 'Image is larger than 15 MB. Please use a smaller file.' },
      { status: 400 }
    );
  }

  const bytes = Buffer.from(await blob.arrayBuffer());

  // Second line of defence: verify magic bytes so a renamed .exe cannot pass.
  const isPng = bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50;
  const isJpg = bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8;
  const isGif = bytes.length > 6 && bytes.toString('ascii', 0, 3) === 'GIF';
  const isRiff =
    bytes.length > 12 &&
    bytes.toString('ascii', 0, 4) === 'RIFF' &&
    bytes.toString('ascii', 8, 12) === 'WEBP';
  const isSvg =
    ext === 'svg' &&
    bytes.toString('utf-8', 0, 512).includes('<svg');
  if (ext !== 'svg' && !isPng && !isJpg && !isGif && !isRiff) {
    return Response.json(
      { error: 'This file is not a real image. Upload cancelled.' },
      { status: 400 }
    );
  }
  if (ext === 'svg' && !isSvg) {
    return Response.json({ error: 'Invalid SVG file' }, { status: 400 });
  }

  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

  const base = path
    .basename(blob.name || 'image')
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 40) || 'image';
  const name = `${base}-${Date.now()}-${crypto.randomBytes(3).toString('hex')}.${ext}`;
  fs.writeFileSync(path.join(UPLOAD_DIR, name), bytes, { mode: 0o644 });

  return Response.json({
    ok: true,
    name,
    url: `/uploads/${name}`,
    size: bytes.length,
  });
}

export async function GET(req: Request) {
  const guard = isSuperAdmin(req);
  if ('error' in guard) return guard.error;

  return Response.json({
    uploads: listImages(UPLOAD_DIR, '/uploads', false),
    bundled: listImages(BUNDLED_DIR, '/images', true),
  });
}

export async function DELETE(req: Request) {
  const guard = isSuperAdmin(req);
  if ('error' in guard) return guard.error;

  const url = new URL(req.url);
  const name = url.searchParams.get('name') || '';
  if (!name || name.includes('/') || name.includes('..')) {
    return Response.json({ error: 'Invalid file name' }, { status: 400 });
  }
  const abs = path.join(UPLOAD_DIR, name);
  if (!fs.existsSync(abs)) {
    return Response.json({ error: 'File not found' }, { status: 404 });
  }
  fs.unlinkSync(abs);
  return Response.json({ ok: true });
}
