'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ImagePlus, X, Upload, Loader2, Trash2, Check } from 'lucide-react';

export interface LibImage {
  name: string;
  url: string;
  size: number;
  mtime: string;
}

let cache: { uploads: LibImage[]; bundled: LibImage[] } | null = null;

export async function fetchLibrary(force = false): Promise<{ uploads: LibImage[]; bundled: LibImage[] }> {
  if (cache && !force) return cache;
  const res = await fetch('/api/admin/upload');
  const data = await res.json();
  cache = { uploads: data.uploads || [], bundled: data.bundled || [] };
  return cache;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

/*
 * ImagePicker — reusable "choose an image" field for every editor form.
 * Shows the current image plus a button that opens a modal with:
 *   - Upload a new photo (straight into public/uploads)
 *   - Previously uploaded photos
 *   - Bundled site images (read-only, cannot be deleted)
 */
export default function ImagePicker({
  value,
  onChange,
  label = 'Image',
  hint,
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'uploads' | 'bundled'>('uploads');
  const [uploads, setUploads] = useState<LibImage[]>([]);
  const [bundled, setBundled] = useState<LibImage[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async (force = false) => {
    const lib = await fetchLibrary(force);
    setUploads(lib.uploads);
    setBundled(lib.bundled);
  }, []);

  useEffect(() => {
    if (open) {
      setErr('');
      load(!!cache === false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  async function upload(file: File) {
    setErr('');
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Upload failed');
      } else {
        cache = null;
        await load(true);
        setTab('uploads');
        onChange(data.url);
      }
    } catch {
      setErr('Upload failed. Please try again.');
    }
    setBusy(false);
    if (fileRef.current) fileRef.current.value = '';
  }

  async function remove(name: string) {
    if (!confirm(`Delete ${name}? Pages that still use it will show a broken image.`)) return;
    const res = await fetch(`/api/admin/upload?name=${encodeURIComponent(name)}`, { method: 'DELETE' });
    if (res.ok) {
      cache = null;
      await load(true);
      if (value === `/uploads/${name}`) onChange('');
    }
  }

  return (
    <div className="space-y-1.5">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">{label}</span>

      <div className="flex items-center gap-3">
        <div className="w-20 h-14 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Selected" className="w-full h-full object-cover" />
          ) : (
            <ImagePlus className="w-5 h-5 text-slate-300" />
          )}
        </div>
        <div className="flex flex-col gap-1.5 min-w-0">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-700 transition"
            >
              <ImagePlus className="w-3.5 h-3.5" />
              {value ? 'Change Image' : 'Choose Image'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-red-700 border border-slate-200 bg-white transition"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>
          {value && (
            <span className="text-[11px] text-slate-400 truncate max-w-[220px]" title={value}>
              {value}
            </span>
          )}
          {hint && <span className="text-[11px] text-slate-400">{hint}</span>}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
              <h3 className="text-sm font-extrabold text-slate-900">Choose an Image</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#9E0B0F] hover:bg-[#7B080B] text-white text-xs font-bold disabled:opacity-60"
                >
                  {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                  Upload New
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f);
              }}
            />

            {err && (
              <div className="mx-5 mt-3 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {err}
              </div>
            )}

            {/* Tabs */}
            <div className="px-5 pt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setTab('uploads')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  tab === 'uploads' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
                }`}
              >
                Uploaded ({uploads.length})
              </button>
              <button
                type="button"
                onClick={() => setTab('bundled')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  tab === 'bundled' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
                }`}
              >
                Site Images ({bundled.length})
              </button>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-5">
              {tab === 'uploads' && uploads.length === 0 && (
                <div className="text-center py-12 text-sm text-slate-400">
                  No uploaded photos yet. Click <strong>Upload New</strong> to add one.
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {(tab === 'uploads' ? uploads : bundled).map((img) => (
                  <div
                    key={img.url}
                    className={`group relative rounded-xl border-2 overflow-hidden cursor-pointer transition ${
                      value === img.url ? 'border-[#9E0B0F] ring-2 ring-[#9E0B0F]/20' : 'border-slate-200 hover:border-slate-400'
                    }`}
                    onClick={() => {
                      onChange(img.url);
                      setOpen(false);
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.name} className="w-full h-24 object-cover" />
                    <div className="px-2 py-1.5 bg-white">
                      <div className="text-[10px] font-bold text-slate-700 truncate">{img.name}</div>
                      <div className="text-[9px] text-slate-400">{formatBytes(img.size)}</div>
                    </div>
                    {value === img.url && (
                      <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#9E0B0F] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                    {tab === 'uploads' && (
                      <button
                        type="button"
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          remove(img.name);
                        }}
                        className="absolute bottom-9 right-1.5 w-6 h-6 rounded-md bg-white/90 text-red-600 opacity-0 group-hover:opacity-100 transition flex items-center justify-center shadow"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {tab === 'bundled' && (
                <p className="text-[11px] text-slate-400 mt-4">
                  Site images ship with the website. They can be used anywhere but not deleted.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
