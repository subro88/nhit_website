'use client';

/*
 * editorKit — shared building blocks for all CMS schema-driven editors.
 * HomeEditor and DeptEditor both render their forms from this kit so the
 * behaviour (deep paths, lists, reorder, image picking) stays identical.
 */

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Copy,
} from 'lucide-react';
import ImagePicker from './ImagePicker';

export type Spec =
  | { t: 'text'; k: string; label: string; hint?: string }
  | { t: 'area'; k: string; label: string; rows?: number; hint?: string }
  | { t: 'img'; k: string; label: string; hint?: string }
  | { t: 'num'; k: string; label: string; hint?: string }
  | { t: 'bool'; k: string; label: string; hint?: string }
  | { t: 'strlist'; k: string; label: string; hint?: string }
  | { t: 'imglist'; k: string; label: string; hint?: string }
  | {
      t: 'list';
      k: string;
      label: string;
      hint?: string;
      titleField?: string;
      def: Record<string, unknown>;
      fields: Spec[];
    };

export interface SectionDef {
  key: string;
  label: string;
  desc: string;
  fields: Spec[];
}

/* ────────────────────────────────────────────────────────────────────────
 * Deep get/set helpers for dotted paths ("stats.highest").
 *──────────────────────────────────────────────────────────────────────── */
export function deepGet(obj: any, path: string): any {
  return path.split('.').reduce<any>((o, k) => (o == null ? o : o[k]), obj);
}

export function deepSet(obj: any, path: string, value: any): any {
  const parts = path.split('.');
  const clone = Array.isArray(obj) ? [...obj] : { ...obj };
  let cur = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    cur[key] = cur[key] != null ? (Array.isArray(cur[key]) ? [...cur[key]] : { ...cur[key] }) : {};
    cur = cur[key];
  }
  cur[parts[parts.length - 1]] = value;
  return clone;
}

export const inputCls =
  'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#9E0B0F] bg-slate-50 focus:bg-white transition';

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
        {label}
      </span>
      {children}
      {hint && <span className="block text-[11px] text-slate-400">{hint}</span>}
    </label>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Image path list (e.g. heroSlides: string[]) — pick, add, remove, move.
 *──────────────────────────────────────────────────────────────────────── */
function ImgListEditor({
  label,
  hint,
  items,
  onChange,
}: {
  label: string;
  hint?: string;
  items: string[];
  onChange: (next: string[]) => void;
}) {
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
          {label} ({items.length})
        </span>
        <button
          type="button"
          onClick={() => onChange([...items, ''])}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#9E0B0F] hover:underline"
        >
          <Plus className="w-3.5 h-3.5" /> Add Photo
        </button>
      </div>
      {hint && <span className="block text-[11px] text-slate-400">{hint}</span>}

      <div className="space-y-2">
        {items.map((url, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3"
          >
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-1">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <ImagePicker
                label={`Photo ${i + 1}`}
                value={url ?? ''}
                onChange={(next) => {
                  const copy = [...items];
                  copy[i] = next;
                  onChange(copy);
                }}
              />
            </div>
            <div className="flex flex-col gap-1 shrink-0">
              <button type="button" title="Move up" onClick={() => move(i, -1)} disabled={i === 0}
                className="p-1.5 text-slate-400 hover:text-slate-800 disabled:opacity-30">
                <ChevronUp className="w-4 h-4" />
              </button>
              <button type="button" title="Move down" onClick={() => move(i, 1)} disabled={i === items.length - 1}
                className="p-1.5 text-slate-400 hover:text-slate-800 disabled:opacity-30">
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Remove"
                onClick={() => {
                  if (!confirm('Remove this photo from the list?')) return;
                  onChange(items.filter((_, j) => j !== i));
                }}
                className="p-1.5 text-slate-300 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Recursive field renderer.
 *──────────────────────────────────────────────────────────────────────── */
export function SpecFields({
  spec,
  value,
  onChange,
}: {
  spec: Spec[];
  value: any;
  onChange: (next: any) => void;
}) {
  return (
    <>
      {spec.map((f) => {
        if (f.t === 'list') {
          const arr: any[] = Array.isArray(deepGet(value, f.k)) ? deepGet(value, f.k) : [];
          const update = (next: any[]) => onChange(deepSet(value, f.k, next));
          return (
            <ListEditor
              key={f.k}
              spec={f}
              items={arr}
              onChange={update}
            />
          );
        }
        if (f.t === 'imglist') {
          const arr: string[] = Array.isArray(deepGet(value, f.k)) ? deepGet(value, f.k) : [];
          const update = (next: string[]) => onChange(deepSet(value, f.k, next));
          return (
            <ImgListEditor
              key={f.k}
              label={f.label}
              hint={f.hint}
              items={arr}
              onChange={update}
            />
          );
        }
        if (f.t === 'strlist') {
          const arr: string[] = Array.isArray(deepGet(value, f.k)) ? deepGet(value, f.k) : [];
          const update = (next: string[]) => onChange(deepSet(value, f.k, next));
          return (
            <div key={f.k} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  {f.label} ({arr.length})
                </span>
                <button
                  type="button"
                  onClick={() => update([...arr, ''])}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#9E0B0F] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Line
                </button>
              </div>
              <div className="space-y-2">
                {arr.map((line, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      className={inputCls}
                      value={line ?? ''}
                      onChange={(e) => {
                        const next = [...arr];
                        next[i] = e.target.value;
                        update(next);
                      }}
                    />
                    <button
                      type="button"
                      title="Remove line"
                      onClick={() => update(arr.filter((_, j) => j !== i))}
                      className="p-2 text-slate-300 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              {f.hint && <span className="block text-[11px] text-slate-400">{f.hint}</span>}
            </div>
          );
        }

        const v = deepGet(value, f.k);
        const set = (nv: any) => onChange(deepSet(value, f.k, nv));

        if (f.t === 'img') {
          return (
            <div key={f.k}>
              <ImagePicker label={f.label} hint={f.hint} value={v ?? ''} onChange={(url) => set(url)} />
            </div>
          );
        }
        if (f.t === 'area') {
          return (
            <label key={f.k} className="block space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{f.label}</span>
              <textarea rows={f.rows ?? 3} className={inputCls} value={v ?? ''} onChange={(e) => set(e.target.value)} />
              {f.hint && <span className="block text-[11px] text-slate-400">{f.hint}</span>}
            </label>
          );
        }
        if (f.t === 'num') {
          return (
            <label key={f.k} className="block space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{f.label}</span>
              <input
                type="number"
                step="any"
                className={inputCls}
                value={v ?? 0}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  set(Number.isFinite(n) ? n : 0);
                }}
              />
              {f.hint && <span className="block text-[11px] text-slate-400">{f.hint}</span>}
            </label>
          );
        }
        if (f.t === 'bool') {
          return (
            <label key={f.k} className="flex items-center gap-2.5 py-1.5">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#9E0B0F]"
                checked={v === true}
                onChange={(e) => set(e.target.checked)}
              />
              <span className="text-sm font-semibold text-slate-700">{f.label}</span>
              {f.hint && <span className="text-[11px] text-slate-400">{f.hint}</span>}
            </label>
          );
        }
        return (
          <label key={f.k} className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{f.label}</span>
            <input className={inputCls} value={v ?? ''} onChange={(e) => set(e.target.value)} />
            {f.hint && <span className="block text-[11px] text-slate-400">{f.hint}</span>}
          </label>
        );
      })}
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Repeatable object list editor (add / remove / move / duplicate).
 *──────────────────────────────────────────────────────────────────────── */
export function ListEditor({
  spec,
  items,
  onChange,
}: {
  spec: Extract<Spec, { t: 'list' }>;
  items: any[];
  onChange: (next: any[]) => void;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const titleOf = (item: any, i: number) => {
    if (spec.titleField) {
      const v = deepGet(item, spec.titleField);
      if (v) return String(v);
    }
    return `${spec.label.replace(/s$/, '')} ${i + 1}`;
  };

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpenIdx(j);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
          {spec.label} ({items.length})
        </span>
        <button
          type="button"
          onClick={() => {
            onChange([...items, JSON.parse(JSON.stringify(spec.def))]);
            setOpenIdx(items.length);
          }}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#9E0B0F] hover:underline"
        >
          <Plus className="w-3.5 h-3.5" /> Add {spec.label.replace(/s$/, '')}
        </button>
      </div>
      {spec.hint && <span className="block text-[11px] text-slate-400">{spec.hint}</span>}

      <div className="space-y-2">
        {items.map((item, i) => {
          const open = openIdx === i;
          return (
            <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden">
              <div className="flex items-center gap-1 px-3 py-2">
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex items-center gap-2 flex-1 min-w-0 text-left"
                >
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-90' : ''}`} />
                  <span className="text-sm font-bold text-slate-700 truncate">{titleOf(item, i)}</span>
                </button>
                <button type="button" title="Move up" onClick={() => move(i, -1)} className="p-1.5 text-slate-400 hover:text-slate-800 disabled:opacity-30" disabled={i === 0}>
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button type="button" title="Move down" onClick={() => move(i, 1)} className="p-1.5 text-slate-400 hover:text-slate-800 disabled:opacity-30" disabled={i === items.length - 1}>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="Duplicate"
                  onClick={() => {
                    const copy = JSON.parse(JSON.stringify(item));
                    const next = [...items];
                    next.splice(i + 1, 0, copy);
                    onChange(next);
                    setOpenIdx(i + 1);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-800"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Remove"
                  onClick={() => {
                    if (!confirm(`Remove this ${spec.label.replace(/s$/, '')}?`)) return;
                    onChange(items.filter((_, j) => j !== i));
                    setOpenIdx(null);
                  }}
                  className="p-1.5 text-slate-300 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {open && (
                <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-100 bg-white">
                  <SpecFields
                    spec={spec.fields}
                    value={item}
                    onChange={(nextItem) => {
                      const next = [...items];
                      next[i] = nextItem;
                      onChange(next);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
