'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, Loader2, Trash2, ImagePlus, RefreshCw } from 'lucide-react';
import { fetchLibrary, formatBytes, type LibImage } from './ImagePicker';
import { optimizeImage } from './optimizeImage';

/*
 * ImageLibraryManager — full-screen photo manager for /admin/images.
 * Upload new photos, browse everything, delete uploads you no longer need.
 * Every photo is auto-compressed in the browser (resize + WebP) before it is
 * saved, so the site keeps loading fast even with big camera photos.
 */
export default function ImageLibraryManager() {
  const [uploads, setUploads] = useState<LibImage[]>([]);
  const [bundled, setBundled] = useState<LibImage[]>([]);
  const [tab, setTab] = useState<'uploads' | 'bundled'>('uploads');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const lib = await fetchLibrary(true);
    setUploads(lib.uploads);
    setBundled(lib.bundled);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function upload(files: FileList) {
    setErr('');
    setNotes([]);
    setBusy(true);
    let okCount = 0;
    const saved: string[] = [];
    for (const file of Array.from(files)) {
      try {
        // Compress in the browser first — big photos become small WebP files.
        const opt = await optimizeImage(file);
        const fd = new FormData();
        fd.append('file', opt.file);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (res.ok) {
          okCount++;
          if (opt.optimized) {
            saved.push(
              `${opt.file.name} — ${formatBytes(opt.originalSize)} → ${formatBytes(opt.finalSize)} (${opt.savedPct}% smaller)`
            );
          }
        } else setErr(data.error || `Could not upload ${file.name}`);
      } catch {
        setErr(`Could not upload ${file.name}`);
      }
    }
    if (okCount > 0) setTab('uploads');
    setNotes(saved);
    setBusy(false);
    if (fileRef.current) fileRef.current.value = '';
    load();
  }

  async function remove(name: string) {
    if (!confirm(`Delete ${name}? Pages that still use it will show a broken image.`)) return;
    const res = await fetch(`/api/admin/upload?name=${encodeURIComponent(name)}`, { method: 'DELETE' });
    if (res.ok) load();
  }

  const list = tab === 'uploads' ? uploads : bundled;

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
          <button
            onClick={() => setTab('uploads')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              tab === 'uploads' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Uploaded Photos ({uploads.length})
          </button>
          <button
            onClick={() => setTab('bundled')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              tab === 'bundled' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Site Images ({bundled.length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => load()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#9E0B0F] hover:bg-[#7B080B] text-white text-xs font-bold shadow disabled:opacity-60"
          >
            {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
            Upload Photos
          </button>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) upload(e.target.files);
        }}
      />

      {err && (
        <div className="text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {err}
        </div>
      )}

      {!busy && notes.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <p className="text-sm font-bold text-emerald-800">
            Compressed automatically before saving — same sharp look, much faster pages:
          </p>
          <ul className="mt-1.5 space-y-0.5 text-xs font-semibold text-emerald-700 list-disc list-inside">
            {notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
          Loading photo library…
        </div>
      ) : list.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <ImagePlus className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-600">
            {tab === 'uploads' ? 'No photos uploaded yet.' : 'No bundled site images found.'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {tab === 'uploads' && 'Click “Upload Photos” above. You can select many files at once.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map((img) => (
            <div
              key={img.url}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-36 bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.name} className="w-full h-full object-cover" loading="lazy" />
                {tab === 'uploads' && (
                  <button
                    onClick={() => remove(img.name)}
                    title="Delete"
                    className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/95 text-red-600 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="px-3 py-2.5">
                <div className="text-xs font-bold text-slate-800 truncate" title={img.name}>
                  {img.name}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {formatBytes(img.size)} · {new Date(img.mtime).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'uploads' && (
        <p className="text-xs text-slate-400">
          Uploaded photos are stored in the website's <code>public/uploads</code> folder and are included
          when the site is published to GitHub. Large photos are automatically resized to max 1920px and
          compressed to WebP before saving — no visible quality loss, much faster loading.
        </p>
      )}
    </div>
  );
}
