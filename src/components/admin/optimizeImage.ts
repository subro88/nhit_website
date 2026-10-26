'use client';

/*
 * optimizeImage — client-side photo optimizer for the admin panel.
 *
 * Big photos (phone cameras easily shoot 4000×3000 at 4–8 MB) are resized to
 * at most 1920px on the longest side and re-encoded as WebP quality 85 BEFORE
 * they are sent to the server. The result looks the same on screen but is
 * typically 5–10× smaller, so pages keep loading fast.
 *
 * Safety rules:
 *   - SVG and GIF pass through untouched (vector / animation would break).
 *   - Files that are already small (≤ 250 KB) pass through untouched.
 *   - PNG transparency is preserved (WebP keeps the alpha channel).
 *   - If a browser cannot encode WebP, fall back to JPEG 85 (white base).
 *   - If the re-encoded file is not actually smaller, keep the original.
 *   - Any error → keep the original; the server still validates magic bytes.
 */

export interface OptimizeResult {
  file: File; // final file to upload (may be the original untouched)
  optimized: boolean; // true when we recompressed it
  originalSize: number;
  finalSize: number;
  savedPct: number; // 0 when untouched
}

const MAX_DIM = 1920; // full HD — sharp on every normal screen
const QUALITY = 0.85; // visually identical for photos, much smaller
const SKIP_UNDER = 250 * 1024; // already-light files stay exactly as they are
const PASS_THROUGH = new Set(['image/gif', 'image/svg+xml']);

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => {
    try {
      canvas.toBlob((b) => resolve(b), type, quality);
    } catch {
      resolve(null);
    }
  });
}

async function decode(file: File): Promise<{ src: ImageBitmap | HTMLImageElement; w: number; h: number }> {
  if (typeof createImageBitmap === 'function') {
    try {
      // imageOrientation:'from-image' respects the EXIF rotation of phone photos.
      const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
      return { src: bmp, w: bmp.width, h: bmp.height };
    } catch {
      /* fall through to <img> decoding */
    }
  }
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ src: img, w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('decode-failed'));
    };
    img.src = url;
  });
}

export async function optimizeImage(file: File): Promise<OptimizeResult> {
  const untouched = (): OptimizeResult => ({
    file,
    optimized: false,
    originalSize: file.size,
    finalSize: file.size,
    savedPct: 0,
  });

  if (PASS_THROUGH.has(file.type) || file.size <= SKIP_UNDER) return untouched();

  try {
    const { src, w, h } = await decode(file);

    const scale = Math.min(1, MAX_DIM / Math.max(w, h));
    const cw = Math.max(1, Math.round(w * scale));
    const ch = Math.max(1, Math.round(h * scale));

    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d');
    if (!ctx) return untouched();
    ctx.drawImage(src, 0, 0, cw, ch);

    // Preferred: WebP (small + keeps transparency).
    let blob = await canvasToBlob(canvas, 'image/webp', QUALITY);
    let type = 'image/webp';

    if (!blob || blob.type !== 'image/webp') {
      // Browser could not encode WebP → JPEG on a white base (no alpha).
      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(src, 0, 0, cw, ch);
      blob = await canvasToBlob(canvas, 'image/jpeg', QUALITY);
      type = 'image/jpeg';
    }

    if ('close' in src && typeof src.close === 'function') src.close();

    // Not worth it if we barely saved anything — keep the original bytes.
    if (!blob || blob.size >= file.size * 0.95) return untouched();

    const base = (file.name || 'photo').replace(/\.[^.]+$/, '') || 'photo';
    const ext = type === 'image/webp' ? 'webp' : 'jpg';
    const out = new File([blob], `${base}.${ext}`, { type });

    return {
      file: out,
      optimized: true,
      originalSize: file.size,
      finalSize: blob.size,
      savedPct: Math.max(1, Math.round((1 - blob.size / file.size) * 100)),
    };
  } catch {
    // Could not decode in this browser — upload the original as-is.
    return untouched();
  }
}
