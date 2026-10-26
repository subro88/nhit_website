'use client';

import React, { useEffect, useState } from 'react';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  FileJson,
  FormInput,
  ExternalLink,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Trash2,
  Plus,
} from 'lucide-react';
import ImagePicker from './ImagePicker';
import { ICON_NAMES } from '../layout/iconMap';

/*
 * PagesEditor — edits the simple content pages (RTI, Anti-Ragging,
 * Quality Policy, Approvals…). Each page = banner fields + ordered
 * sections. Every section type has a small purpose-built form, and an
 * Advanced JSON tab is available per page.
 */

const PAGE_LIST = [
  { key: 'about', label: 'About NHIT', href: '/about' },
  { key: 'our-infrastructure', label: 'Infrastructure', href: '/our-infrastructure' },
  { key: 'student-life', label: 'Student Life', href: '/student-life' },
  { key: 'iti-courses', label: 'ITI Courses', href: '/iti-courses' },
  { key: 'rti-process-officer', label: 'RTI Process & Officer', href: '/rti-process-officer' },
  { key: 'anti-ragging-committee', label: 'Anti-Ragging', href: '/anti-ragging-committee' },
  { key: 'quality-policy-iso-certification', label: 'Quality Policy & ISO', href: '/quality-policy-iso-certification' },
  { key: 'approval-affiliation-association', label: 'Approvals & MoUs', href: '/approval-affiliation-association' },
];

const SECTION_TYPES: Array<{ value: string; label: string }> = [
  { value: 'text', label: 'Text Block' },
  { value: 'quote', label: 'Declaration Quote' },
  { value: 'officerCards', label: 'Officer / Info Cards' },
  { value: 'steps', label: 'Numbered Steps' },
  { value: 'table', label: 'Roster Table' },
  { value: 'objectives', label: 'Check List (title + text)' },
  { value: 'grid', label: 'Card Grid (title + tag + text)' },
  { value: 'approvals', label: 'Approval Rows' },
  { value: 'helplines', label: 'Number / Value Boxes' },
  { value: 'banner', label: 'Dark Highlight Banner' },
  { value: 'iconCards', label: 'Icon Cards (icon + title + text)' },
  { value: 'photoGrid', label: 'Photo Gallery' },
  { value: 'hubCards', label: 'Innovation Hub Cards' },
  { value: 'tradeCards', label: 'ITI Trade Cards' },
  { value: 'milestones', label: 'Year Timeline' },
  { value: 'visionMission', label: 'Vision + Mission Block' },
  { value: 'linkCards', label: 'Emoji Link Cards' },
];

function defaultSection(type: string): any {
  switch (type) {
    case 'text':
      return { type, tag: '', heading: '', paragraphs: [''] };
    case 'quote':
      return { type, tag: '', heading: '', paragraphs: [''], signedBy: '', signedOrg: '' };
    case 'officerCards':
      return { type, cards: [{ label: '', labelColor: 'red', title: '', lines: [''] }] };
    case 'steps':
      return { type, tag: '', heading: '', items: [''] };
    case 'table':
      return { type, tag: '', heading: '', columns: ['Column 1', 'Column 2'], rows: [{ main: '', sub: '', cells: [''] }] };
    case 'objectives':
      return { type, tag: '', heading: '', items: [{ title: '', desc: '' }] };
    case 'grid':
      return { type, tag: '', heading: '', items: [{ title: '', type: '', desc: '' }] };
    case 'approvals':
      return { type, tag: '', heading: '', items: [{ title: '', status: 'Approved', id: '', body: '', details: '' }] };
    case 'helplines':
      return { type, boxes: [{ title: '', value: '', note: '', color: 'red' }] };
    case 'banner':
      return { type, heading: '', paragraphs: [''], note: '', badge: '', btnText: '', btnHref: '' };
    case 'iconCards':
      return { type, tag: '', heading: '', paragraphs: [], items: [{ icon: 'Star', tone: 'red', title: '', desc: '' }] };
    case 'photoGrid':
      return { type, heading: '', sub: '', linkText: '', linkHref: '', photoStyle: 'overlay', columnsCount: 4, photos: [{ src: '', caption: '' }] };
    case 'hubCards':
      return {
        type,
        tag: '', heading: '', sub: '',
        items: [{ code: '', status: '', statusColor: 'emerald', title: '', track: '', mode: '', accent: '#ff3115', icon: 'Rocket', desc: '' }],
      };
    case 'tradeCards':
      return {
        type,
        items: [{
          slug: '', title: '', badge: '', duration: '', intake: '', accent: '#ff3115',
          icon: 'Wrench', image: '', tagline: '', highlights: [''], workshops: '',
        }],
      };
    case 'milestones':
      return { type, tag: '', heading: '', items: [{ year: '', title: '', desc: '' }] };
    case 'visionMission':
      return {
        type,
        visionEmoji: '🎯', visionTitle: 'Our Vision', visionText: '',
        missionEmoji: '🚀', missionTitle: 'Our Mission', missionItems: [''],
      };
    case 'linkCards':
      return { type, tag: '', heading: '', items: [{ emoji: '📄', title: '', desc: '', href: '' }] };
    default:
      return { type };
  }
}

const inputCls =
  'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#9E0B0F] bg-slate-50 focus:bg-white transition';

function Field({ label, hint, children }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-slate-400">{hint}</span>}
    </label>
  );
}

/* One paragraph-per-line textarea bound to a string[] */
function LinesField({
  label,
  value,
  onChange,
  rows = 5,
  hint,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <textarea
        rows={rows}
        className={inputCls}
        value={(value ?? []).join('\n')}
        onChange={(e) => onChange(e.target.value.split('\n'))}
      />
    </Field>
  );
}

/* Small repeatable list of objects */
function MiniList({
  label,
  items,
  onChange,
  def,
  titleOf,
  renderFields,
}: {
  label: string;
  items: any[];
  onChange: (v: any[]) => void;
  def: any;
  titleOf: (item: any, i: number) => string;
  renderFields: (item: any, set: (patch: any) => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
          {label} ({items.length})
        </span>
        <button
          type="button"
          onClick={() => {
            onChange([...items, JSON.parse(JSON.stringify(def))]);
            setOpen(items.length);
          }}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#9E0B0F] hover:underline"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden">
            <div className="flex items-center gap-1 px-3 py-2">
              <button type="button" className="flex-1 min-w-0 text-left text-sm font-bold text-slate-700 truncate" onClick={() => setOpen(isOpen ? null : i)}>
                {titleOf(item, i) || `Item ${i + 1}`}
              </button>
              <button type="button" title="Move up" disabled={i === 0} onClick={() => { const n = [...items]; [n[i], n[i - 1]] = [n[i - 1], n[i]]; onChange(n); }} className="p-1.5 text-slate-400 hover:text-slate-800 disabled:opacity-30">
                <ChevronUp className="w-4 h-4" />
              </button>
              <button type="button" title="Move down" disabled={i === items.length - 1} onClick={() => { const n = [...items]; [n[i], n[i + 1]] = [n[i + 1], n[i]]; onChange(n); }} className="p-1.5 text-slate-400 hover:text-slate-800 disabled:opacity-30">
                <ChevronDown className="w-4 h-4" />
              </button>
              <button type="button" title="Remove" onClick={() => { if (confirm('Remove this item?')) onChange(items.filter((_, j) => j !== i)); }} className="p-1.5 text-slate-300 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {isOpen && (
              <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-100 bg-white">
                {renderFields(item, (patch) => {
                  const next = [...items];
                  next[i] = { ...next[i], ...patch };
                  onChange(next);
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function IconSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select className={inputCls} value={value || 'Star'} onChange={(e) => onChange(e.target.value)}>
      {ICON_NAMES.map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  );
}

function SectionForm({ section, onChange }: { section: any; onChange: (s: any) => void }) {
  const set = (patch: any) => onChange({ ...section, ...patch });

  switch (section.type) {
    case 'text':
      return (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Small Tag"><input className={inputCls} value={section.tag ?? ''} onChange={(e) => set({ tag: e.target.value })} /></Field>
            <Field label="Heading"><input className={inputCls} value={section.heading ?? ''} onChange={(e) => set({ heading: e.target.value })} /></Field>
          </div>
          <LinesField label="Paragraphs" value={section.paragraphs ?? []} onChange={(v) => set({ paragraphs: v })} hint="One paragraph per line. **double stars** = bold." />
          <MiniList
            label="Stat Tiles (optional)"
            items={section.stats ?? []}
            def={{ value: '', label: '', color: 'dark' }}
            onChange={(v) => set({ stats: v })}
            titleOf={(s) => s.value || ''}
            renderFields={(st, setSt) => (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Big Value"><input className={inputCls} value={st.value ?? ''} onChange={(e) => setSt({ value: e.target.value })} /></Field>
                  <Field label="Small Label"><input className={inputCls} value={st.label ?? ''} onChange={(e) => setSt({ label: e.target.value })} /></Field>
                </div>
                <Field label="Value Color">
                  <select className={inputCls} value={st.color ?? 'dark'} onChange={(e) => setSt({ color: e.target.value })}>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="cyan">Cyan</option>
                    <option value="blue">Blue</option>
                    <option value="dark">Dark</option>
                  </select>
                </Field>
              </>
            )}
          />
          <MiniList
            label="Photos (optional)"
            items={section.photos ?? []}
            def={{ src: '', caption: '' }}
            onChange={(v) => set({ photos: v })}
            titleOf={(p) => p.caption || p.src || ''}
            renderFields={(ph, setPh) => (
              <>
                <ImagePicker label="Photo" value={ph.src ?? ''} onChange={(url) => setPh({ src: url })} />
                <Field label="Caption"><input className={inputCls} value={ph.caption ?? ''} onChange={(e) => setPh({ caption: e.target.value })} /></Field>
              </>
            )}
          />
        </>
      );

    case 'quote':
      return (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Small Tag"><input className={inputCls} value={section.tag ?? ''} onChange={(e) => set({ tag: e.target.value })} /></Field>
            <Field label="Heading"><input className={inputCls} value={section.heading ?? ''} onChange={(e) => set({ heading: e.target.value })} /></Field>
          </div>
          <LinesField label="Quote Paragraphs" value={section.paragraphs ?? []} onChange={(v) => set({ paragraphs: v })} hint="One paragraph per line. **double stars** = bold." />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Signed By"><input className={inputCls} value={section.signedBy ?? ''} onChange={(e) => set({ signedBy: e.target.value })} /></Field>
            <Field label="Signed Organisation"><input className={inputCls} value={section.signedOrg ?? ''} onChange={(e) => set({ signedOrg: e.target.value })} /></Field>
          </div>
        </>
      );

    case 'officerCards':
      return (
        <MiniList
          label="Cards"
          items={section.cards ?? []}
          def={{ label: '', labelColor: 'red', title: '', lines: [''] }}
          onChange={(v) => set({ cards: v })}
          titleOf={(c) => c.title || ''}
          renderFields={(card, setCard) => (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Small Label"><input className={inputCls} value={card.label ?? ''} onChange={(e) => setCard({ label: e.target.value })} /></Field>
                <Field label="Label Color">
                  <select className={inputCls} value={card.labelColor ?? 'red'} onChange={(e) => setCard({ labelColor: e.target.value })}>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                  </select>
                </Field>
              </div>
              <Field label="Card Title"><input className={inputCls} value={card.title ?? ''} onChange={(e) => setCard({ title: e.target.value })} /></Field>
              <LinesField label="Detail Lines" value={card.lines ?? []} onChange={(v) => setCard({ lines: v })} rows={4} hint="**Label:** value format works well." />
            </>
          )}
        />
      );

    case 'steps':
      return (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Small Tag"><input className={inputCls} value={section.tag ?? ''} onChange={(e) => set({ tag: e.target.value })} /></Field>
            <Field label="Heading"><input className={inputCls} value={section.heading ?? ''} onChange={(e) => set({ heading: e.target.value })} /></Field>
          </div>
          <LinesField label="Steps (one per line)" value={section.items ?? []} onChange={(v) => set({ items: v })} rows={6} hint="**Bold start:** then normal text." />
        </>
      );

    case 'table':
      return (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Small Tag"><input className={inputCls} value={section.tag ?? ''} onChange={(e) => set({ tag: e.target.value })} /></Field>
            <Field label="Heading"><input className={inputCls} value={section.heading ?? ''} onChange={(e) => set({ heading: e.target.value })} /></Field>
          </div>
          <LinesField label="Column Headers" value={section.columns ?? []} onChange={(v) => set({ columns: v })} rows={3} hint="First column shows Name (bold) + Sub-line. Remaining columns map to the row cells." />
          <MiniList
            label="Rows"
            items={section.rows ?? []}
            def={{ main: '', sub: '', cells: [''] }}
            onChange={(v) => set({ rows: v })}
            titleOf={(r) => r.main || ''}
            renderFields={(row, setRow) => (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First Cell — Main Text"><input className={inputCls} value={row.main ?? ''} onChange={(e) => setRow({ main: e.target.value })} /></Field>
                  <Field label="First Cell — Small Line"><input className={inputCls} value={row.sub ?? ''} onChange={(e) => setRow({ sub: e.target.value })} /></Field>
                </div>
                <LinesField label="Other Cells (one per column, in order)" value={row.cells ?? []} onChange={(v) => setRow({ cells: v })} rows={3} />
              </>
            )}
          />
        </>
      );

    case 'objectives':
      return (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Small Tag"><input className={inputCls} value={section.tag ?? ''} onChange={(e) => set({ tag: e.target.value })} /></Field>
            <Field label="Heading"><input className={inputCls} value={section.heading ?? ''} onChange={(e) => set({ heading: e.target.value })} /></Field>
          </div>
          <MiniList
            label="Items"
            items={section.items ?? []}
            def={{ title: '', desc: '' }}
            onChange={(v) => set({ items: v })}
            titleOf={(o) => o.title || ''}
            renderFields={(obj, setObj) => (
              <>
                <Field label="Title"><input className={inputCls} value={obj.title ?? ''} onChange={(e) => setObj({ title: e.target.value })} /></Field>
                <Field label="Description"><textarea rows={3} className={inputCls} value={obj.desc ?? ''} onChange={(e) => setObj({ desc: e.target.value })} /></Field>
              </>
            )}
          />
        </>
      );

    case 'grid':
      return (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Small Tag"><input className={inputCls} value={section.tag ?? ''} onChange={(e) => set({ tag: e.target.value })} /></Field>
            <Field label="Heading"><input className={inputCls} value={section.heading ?? ''} onChange={(e) => set({ heading: e.target.value })} /></Field>
          </div>
          <MiniList
            label="Cards"
            items={section.items ?? []}
            def={{ title: '', type: '', desc: '' }}
            onChange={(v) => set({ items: v })}
            titleOf={(o) => o.title || ''}
            renderFields={(obj, setObj) => (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Title"><input className={inputCls} value={obj.title ?? ''} onChange={(e) => setObj({ title: e.target.value })} /></Field>
                  <Field label="Small Red Tag"><input className={inputCls} value={obj.type ?? ''} onChange={(e) => setObj({ type: e.target.value })} /></Field>
                </div>
                <Field label="Description"><textarea rows={3} className={inputCls} value={obj.desc ?? ''} onChange={(e) => setObj({ desc: e.target.value })} /></Field>
              </>
            )}
          />
        </>
      );

    case 'approvals':
      return (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Small Tag"><input className={inputCls} value={section.tag ?? ''} onChange={(e) => set({ tag: e.target.value })} /></Field>
            <Field label="Heading"><input className={inputCls} value={section.heading ?? ''} onChange={(e) => set({ heading: e.target.value })} /></Field>
          </div>
          <MiniList
            label="Approval Rows"
            items={section.items ?? []}
            def={{ title: '', status: 'Approved', id: '', body: '', details: '' }}
            onChange={(v) => set({ items: v })}
            titleOf={(o) => o.title || ''}
            renderFields={(obj, setObj) => (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Title"><input className={inputCls} value={obj.title ?? ''} onChange={(e) => setObj({ title: e.target.value })} /></Field>
                  <Field label="Green Status Badge"><input className={inputCls} value={obj.status ?? ''} onChange={(e) => setObj({ status: e.target.value })} /></Field>
                </div>
                <Field label="ID / Reference Line"><input className={inputCls} value={obj.id ?? ''} onChange={(e) => setObj({ id: e.target.value })} /></Field>
                <Field label="Short Body"><textarea rows={2} className={inputCls} value={obj.body ?? ''} onChange={(e) => setObj({ body: e.target.value })} /></Field>
                <Field label="Details"><textarea rows={3} className={inputCls} value={obj.details ?? ''} onChange={(e) => setObj({ details: e.target.value })} /></Field>
              </>
            )}
          />
        </>
      );

    case 'helplines':
      return (
        <MiniList
          label="Helpline Boxes"
          items={section.boxes ?? []}
          def={{ title: '', value: '', note: '', color: 'red' }}
          onChange={(v) => set({ boxes: v })}
          titleOf={(b) => b.title || ''}
          renderFields={(box, setBox) => (
            <>
              <Field label="Title"><input className={inputCls} value={box.title ?? ''} onChange={(e) => setBox({ title: e.target.value })} /></Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Number"><input className={inputCls} value={box.value ?? ''} onChange={(e) => setBox({ value: e.target.value })} /></Field>
                <Field label="Number Color">
                  <select className={inputCls} value={box.color ?? 'red'} onChange={(e) => setBox({ color: e.target.value })}>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="cyan">Cyan</option>
                    <option value="blue">Blue</option>
                    <option value="dark">Dark</option>
                  </select>
                </Field>
              </div>
              <Field label="Small Note"><input className={inputCls} value={box.note ?? ''} onChange={(e) => setBox({ note: e.target.value })} /></Field>
            </>
          )}
        />
      );

    case 'banner':
      return (
        <>
          <Field label="Banner Heading"><input className={inputCls} value={section.heading ?? ''} onChange={(e) => set({ heading: e.target.value })} /></Field>
          <LinesField label="Banner Text" value={section.paragraphs ?? []} onChange={(v) => set({ paragraphs: v })} rows={3} />
          <Field label="Small Note"><input className={inputCls} value={section.note ?? ''} onChange={(e) => set({ note: e.target.value })} /></Field>
        </>
      );

    case 'banner':
      return (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Badge (optional)" hint="Replaces the round icon with a small orange pill."><input className={inputCls} value={section.badge ?? ''} onChange={(e) => set({ badge: e.target.value })} /></Field>
            <Field label="Banner Heading"><input className={inputCls} value={section.heading ?? ''} onChange={(e) => set({ heading: e.target.value })} /></Field>
          </div>
          <LinesField label="Banner Text" value={section.paragraphs ?? []} onChange={(v) => set({ paragraphs: v })} rows={3} />
          <Field label="Small Note"><input className={inputCls} value={section.note ?? ''} onChange={(e) => set({ note: e.target.value })} /></Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Button Text (optional)"><input className={inputCls} value={section.btnText ?? ''} onChange={(e) => set({ btnText: e.target.value })} /></Field>
            <Field label="Button Link (optional)" hint="e.g. /circulars"><input className={inputCls} value={section.btnHref ?? ''} onChange={(e) => set({ btnHref: e.target.value })} /></Field>
          </div>
        </>
      );

    case 'iconCards':
      return (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Small Tag"><input className={inputCls} value={section.tag ?? ''} onChange={(e) => set({ tag: e.target.value })} /></Field>
            <Field label="Heading"><input className={inputCls} value={section.heading ?? ''} onChange={(e) => set({ heading: e.target.value })} /></Field>
          </div>
          <LinesField label="Intro Paragraphs (optional)" value={section.paragraphs ?? []} onChange={(v) => set({ paragraphs: v })} rows={3} />
          <MiniList
            label="Cards"
            items={section.items ?? []}
            def={{ icon: 'Star', tone: 'red', title: '', desc: '' }}
            onChange={(v) => set({ items: v })}
            titleOf={(o) => o.title || ''}
            renderFields={(it, setIt) => (
              <>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field label="Icon"><IconSelect value={it.icon ?? ''} onChange={(v) => setIt({ icon: v })} /></Field>
                  <Field label="Icon Color">
                    <select className={inputCls} value={it.tone ?? 'red'} onChange={(e) => setIt({ tone: e.target.value })}>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                    </select>
                  </Field>
                  <Field label="Title"><input className={inputCls} value={it.title ?? ''} onChange={(e) => setIt({ title: e.target.value })} /></Field>
                </div>
                <Field label="Description"><textarea rows={3} className={inputCls} value={it.desc ?? ''} onChange={(e) => setIt({ desc: e.target.value })} /></Field>
              </>
            )}
          />
        </>
      );

    case 'photoGrid':
      return (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Heading"><input className={inputCls} value={section.heading ?? ''} onChange={(e) => set({ heading: e.target.value })} /></Field>
            <Field label="Small Line Under Heading"><input className={inputCls} value={section.sub ?? ''} onChange={(e) => set({ sub: e.target.value })} /></Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Corner Link Text (optional)"><input className={inputCls} value={section.linkText ?? ''} onChange={(e) => set({ linkText: e.target.value })} /></Field>
            <Field label="Corner Link URL"><input className={inputCls} value={section.linkHref ?? ''} onChange={(e) => set({ linkHref: e.target.value })} /></Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Photo Style">
              <select className={inputCls} value={section.photoStyle ?? 'overlay'} onChange={(e) => set({ photoStyle: e.target.value })}>
                <option value="overlay">Tall photos, caption on image</option>
                <option value="card">Small photos, caption below</option>
              </select>
            </Field>
            <Field label="Photos Per Row">
              <select className={inputCls} value={String(section.columnsCount ?? 4)} onChange={(e) => set({ columnsCount: Number(e.target.value) })}>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </Field>
          </div>
          <MiniList
            label="Photos"
            items={section.photos ?? []}
            def={{ src: '', caption: '' }}
            onChange={(v) => set({ photos: v })}
            titleOf={(p) => p.caption || p.src || ''}
            renderFields={(ph, setPh) => (
              <>
                <ImagePicker label="Photo" value={ph.src ?? ''} onChange={(url) => setPh({ src: url })} />
                <Field label="Caption"><input className={inputCls} value={ph.caption ?? ''} onChange={(e) => setPh({ caption: e.target.value })} /></Field>
              </>
            )}
          />
        </>
      );

    case 'hubCards':
      return (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Small Tag"><input className={inputCls} value={section.tag ?? ''} onChange={(e) => set({ tag: e.target.value })} /></Field>
            <Field label="Heading"><input className={inputCls} value={section.heading ?? ''} onChange={(e) => set({ heading: e.target.value })} /></Field>
          </div>
          <Field label="Sub Text"><textarea rows={2} className={inputCls} value={section.sub ?? ''} onChange={(e) => set({ sub: e.target.value })} /></Field>
          <MiniList
            label="Hub Cards"
            items={section.items ?? []}
            def={{ code: '', status: '', statusColor: 'emerald', title: '', track: '', mode: '', accent: '#ff3115', icon: 'Rocket', desc: '' }}
            onChange={(v) => set({ items: v })}
            titleOf={(h) => h.title || ''}
            renderFields={(h, setH) => (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Top-Left Code"><input className={inputCls} value={h.code ?? ''} onChange={(e) => setH({ code: e.target.value })} /></Field>
                  <Field label="Status Badge Text"><input className={inputCls} value={h.status ?? ''} onChange={(e) => setH({ status: e.target.value })} /></Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Badge Color">
                    <select className={inputCls} value={h.statusColor ?? 'emerald'} onChange={(e) => setH({ statusColor: e.target.value })}>
                      <option value="emerald">Green</option>
                      <option value="blue">Blue</option>
                      <option value="purple">Purple</option>
                      <option value="amber">Amber</option>
                      <option value="indigo">Indigo</option>
                      <option value="cyan">Cyan</option>
                    </select>
                  </Field>
                  <Field label="Icon"><IconSelect value={h.icon ?? ''} onChange={(v) => setH({ icon: v })} /></Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Title"><input className={inputCls} value={h.title ?? ''} onChange={(e) => setH({ title: e.target.value })} /></Field>
                  <Field label="Accent Color (hex)"><input className={inputCls} value={h.accent ?? ''} onChange={(e) => setH({ accent: e.target.value })} /></Field>
                </div>
                <Field label="Description"><textarea rows={3} className={inputCls} value={h.desc ?? ''} onChange={(e) => setH({ desc: e.target.value })} /></Field>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Track (bottom left)"><input className={inputCls} value={h.track ?? ''} onChange={(e) => setH({ track: e.target.value })} /></Field>
                  <Field label="Mode (bottom right)"><input className={inputCls} value={h.mode ?? ''} onChange={(e) => setH({ mode: e.target.value })} /></Field>
                </div>
              </>
            )}
          />
        </>
      );

    case 'tradeCards':
      return (
        <MiniList
          label="Trade Cards"
          items={section.items ?? []}
          def={{ slug: '', title: '', badge: '', duration: '', intake: '', accent: '#ff3115', icon: 'Wrench', image: '', tagline: '', highlights: [''], workshops: '' }}
          onChange={(v) => set({ items: v })}
          titleOf={(t) => t.title || ''}
          renderFields={(t, setT) => (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Trade Title"><input className={inputCls} value={t.title ?? ''} onChange={(e) => setT({ title: e.target.value })} /></Field>
                <Field label="Detail Page Slug" hint="e.g. iti-electrician — links to /iti-courses/<slug>"><input className={inputCls} value={t.slug ?? ''} onChange={(e) => setT({ slug: e.target.value })} /></Field>
              </div>
              <ImagePicker label="Card Photo" value={t.image ?? ''} onChange={(url) => setT({ image: url })} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Badge (NCVT Code)"><input className={inputCls} value={t.badge ?? ''} onChange={(e) => setT({ badge: e.target.value })} /></Field>
                <Field label="Seats Text"><input className={inputCls} value={t.intake ?? ''} onChange={(e) => setT({ intake: e.target.value })} /></Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Duration Line"><input className={inputCls} value={t.duration ?? ''} onChange={(e) => setT({ duration: e.target.value })} /></Field>
                <Field label="Accent Color (hex)"><input className={inputCls} value={t.accent ?? ''} onChange={(e) => setT({ accent: e.target.value })} /></Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Icon"><IconSelect value={t.icon ?? ''} onChange={(v) => setT({ icon: v })} /></Field>
                <Field label="Tagline"><textarea rows={3} className={inputCls} value={t.tagline ?? ''} onChange={(e) => setT({ tagline: e.target.value })} /></Field>
              </div>
              <LinesField label="Highlight Lines" value={t.highlights ?? []} onChange={(v) => setT({ highlights: v })} rows={4} />
              <Field label="Workshop Facilities Line"><input className={inputCls} value={t.workshops ?? ''} onChange={(e) => setT({ workshops: e.target.value })} /></Field>
            </>
          )}
        />
      );

    case 'milestones':
      return (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Small Tag"><input className={inputCls} value={section.tag ?? ''} onChange={(e) => set({ tag: e.target.value })} /></Field>
            <Field label="Heading"><input className={inputCls} value={section.heading ?? ''} onChange={(e) => set({ heading: e.target.value })} /></Field>
          </div>
          <MiniList
            label="Timeline Rows"
            items={section.items ?? []}
            def={{ year: '', title: '', desc: '' }}
            onChange={(v) => set({ items: v })}
            titleOf={(m) => (m.year ? `${m.year} — ${m.title ?? ''}` : '')}
            renderFields={(m, setM) => (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Year"><input className={inputCls} value={m.year ?? ''} onChange={(e) => setM({ year: e.target.value })} /></Field>
                  <Field label="Title"><input className={inputCls} value={m.title ?? ''} onChange={(e) => setM({ title: e.target.value })} /></Field>
                </div>
                <Field label="Description"><textarea rows={2} className={inputCls} value={m.desc ?? ''} onChange={(e) => setM({ desc: e.target.value })} /></Field>
              </>
            )}
          />
        </>
      );

    case 'visionMission':
      return (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Vision Emoji"><input className={inputCls} value={section.visionEmoji ?? ''} onChange={(e) => set({ visionEmoji: e.target.value })} /></Field>
            <Field label="Vision Title"><input className={inputCls} value={section.visionTitle ?? ''} onChange={(e) => set({ visionTitle: e.target.value })} /></Field>
          </div>
          <Field label="Vision Text"><textarea rows={4} className={inputCls} value={section.visionText ?? ''} onChange={(e) => set({ visionText: e.target.value })} /></Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Mission Emoji"><input className={inputCls} value={section.missionEmoji ?? ''} onChange={(e) => set({ missionEmoji: e.target.value })} /></Field>
            <Field label="Mission Title"><input className={inputCls} value={section.missionTitle ?? ''} onChange={(e) => set({ missionTitle: e.target.value })} /></Field>
          </div>
          <LinesField label="Mission Points" value={section.missionItems ?? []} onChange={(v) => set({ missionItems: v })} rows={4} hint="**Bold start:** then normal text." />
        </>
      );

    case 'linkCards':
      return (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Small Tag"><input className={inputCls} value={section.tag ?? ''} onChange={(e) => set({ tag: e.target.value })} /></Field>
            <Field label="Heading"><input className={inputCls} value={section.heading ?? ''} onChange={(e) => set({ heading: e.target.value })} /></Field>
          </div>
          <MiniList
            label="Link Cards"
            items={section.items ?? []}
            def={{ emoji: '📄', title: '', desc: '', href: '' }}
            onChange={(v) => set({ items: v })}
            titleOf={(l) => l.title || ''}
            renderFields={(l, setL) => (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Emoji"><input className={inputCls} value={l.emoji ?? ''} onChange={(e) => setL({ emoji: e.target.value })} /></Field>
                  <Field label="Title"><input className={inputCls} value={l.title ?? ''} onChange={(e) => setL({ title: e.target.value })} /></Field>
                </div>
                <Field label="Description"><textarea rows={2} className={inputCls} value={l.desc ?? ''} onChange={(e) => setL({ desc: e.target.value })} /></Field>
                <Field label="Link URL" hint="e.g. /message-from-principal"><input className={inputCls} value={l.href ?? ''} onChange={(e) => setL({ href: e.target.value })} /></Field>
              </>
            )}
          />
        </>
      );

    default:
      return <p className="text-xs text-slate-400">Unknown section type.</p>;
  }
}

export default function PagesEditor() {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [activeKey, setActiveKey] = useState(PAGE_LIST[0].key);
  const [tab, setTab] = useState<'form' | 'json'>('form');
  const [jsonText, setJsonText] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/pages');
      const json = await res.json();
      if (res.ok) {
        setData(json.pages);
        setJsonText(JSON.stringify(json.pages, null, 2));
      } else {
        setMsg({ ok: false, text: json.error || 'Could not load pages' });
      }
      setLoading(false);
    })();
  }, []);

  const page = data?.[activeKey] ?? {};

  function setPage(next: any) {
    setData((prev) => (prev ? { ...prev, [activeKey]: next } : prev));
  }

  function setHero(key: string, value: string) {
    setPage({ ...page, [key]: value });
  }

  function updateSection(idx: number, next: any) {
    const sections = [...(page.sections ?? [])];
    sections[idx] = next;
    setPage({ ...page, sections });
  }

  function moveSection(idx: number, dir: -1 | 1) {
    const sections = [...(page.sections ?? [])];
    const j = idx + dir;
    if (j < 0 || j >= sections.length) return;
    [sections[idx], sections[j]] = [sections[j], sections[idx]];
    setPage({ ...page, sections });
  }

  async function save() {
    setMsg(null);
    let payload = data;

    if (tab === 'json') {
      try {
        payload = JSON.parse(jsonText);
      } catch (e: any) {
        setMsg({ ok: false, text: `JSON error: ${e.message}` });
        return;
      }
    }

    setBusy(true);
    const res = await fetch('/api/admin/pages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pages: payload }),
    });
    const json = await res.json();
    setBusy(false);

    if (res.ok) {
      setData(payload as Record<string, any>);
      if (tab === 'json') setJsonText(JSON.stringify(payload, null, 2));
      setMsg({ ok: true, text: 'Saved! The live pages are updated.' });
    } else {
      setMsg({ ok: false, text: json.error || 'Could not save' });
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
        Loading pages…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 p-10 text-center text-sm text-red-700">
        {msg?.text || 'Could not load pages.'}
      </div>
    );
  }

  const activePage = PAGE_LIST.find((p) => p.key === activeKey)!;
  const sections = (page.sections ?? []) as any[];

  return (
    <div className="space-y-5">
      {/* Page switcher */}
      <div className="flex flex-wrap gap-2">
        {PAGE_LIST.map((p) => (
          <button
            key={p.key}
            onClick={() => setActiveKey(p.key)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
              p.key === activeKey
                ? 'bg-[#9E0B0F] text-white border-[#9E0B0F] shadow'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
          <button
            onClick={() => {
              setTab('form');
              setJsonText(JSON.stringify(data, null, 2));
            }}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${
              tab === 'form' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FormInput className="w-3.5 h-3.5" /> Content Form
          </button>
          <button
            onClick={() => setTab('json')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${
              tab === 'json' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" /> Advanced JSON
          </button>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={activePage.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Page
          </a>
          <button
            onClick={save}
            disabled={busy}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#9E0B0F] hover:bg-[#7B080B] text-white text-xs font-bold shadow disabled:opacity-60"
          >
            <Save className="w-3.5 h-3.5" />
            {busy ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {msg && (
        <div
          className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 ${
            msg.ok
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
              : 'text-red-700 bg-red-50 border border-red-200'
          }`}
        >
          {msg.ok ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          {msg.text}
        </div>
      )}

      {tab === 'form' ? (
        <div className="space-y-5">
          {/* Banner */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Page Banner</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Small Line Above Title (kicker)">
                <input className={inputCls} value={page.kicker ?? ''} onChange={(e) => setHero('kicker', e.target.value)} />
              </Field>
              <Field label="Badge">
                <input className={inputCls} value={page.badge ?? ''} onChange={(e) => setHero('badge', e.target.value)} />
              </Field>
            </div>
            <Field label="Page Title">
              <input className={inputCls} value={page.title ?? ''} onChange={(e) => setHero('title', e.target.value)} />
            </Field>
            <Field label="Banner Subtitle">
              <textarea rows={2} className={inputCls} value={page.subtitle ?? ''} onChange={(e) => setHero('subtitle', e.target.value)} />
            </Field>
          </section>

          {/* Sections */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Page Sections ({sections.length})
              </h3>
              <select
                className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white"
                value=""
                onChange={(e) => {
                  if (!e.target.value) return;
                  setPage({ ...page, sections: [...sections, defaultSection(e.target.value)] });
                  e.target.value = '';
                }}
              >
                <option value="">+ Add Section…</option>
                {SECTION_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {sections.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex items-center gap-1 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                  <span className="flex-1 min-w-0 text-xs font-bold text-slate-700">
                    {i + 1}. {SECTION_TYPES.find((t) => t.value === s.type)?.label ?? s.type}
                    {s.heading ? <span className="text-slate-400 font-semibold"> — {s.heading}</span> : null}
                  </span>
                  <button type="button" title="Move up" disabled={i === 0} onClick={() => moveSection(i, -1)} className="p-1.5 text-slate-400 hover:text-slate-800 disabled:opacity-30">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button type="button" title="Move down" disabled={i === sections.length - 1} onClick={() => moveSection(i, 1)} className="p-1.5 text-slate-400 hover:text-slate-800 disabled:opacity-30">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    title="Remove section"
                    onClick={() => {
                      if (confirm(`Remove this ${s.type} section from the page?`)) {
                        setPage({ ...page, sections: sections.filter((_, j) => j !== i) });
                      }
                    }}
                    className="p-1.5 text-slate-300 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  <SectionForm section={s} onChange={(next) => updateSection(i, next)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Full pages data (JSON)</span>
            <button
              onClick={() => setJsonText(JSON.stringify(data, null, 2))}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            spellCheck={false}
            className="w-full h-[560px] p-5 font-mono text-xs leading-relaxed text-slate-800 focus:outline-none resize-y bg-white"
          />
        </div>
      )}
    </div>
  );
}
