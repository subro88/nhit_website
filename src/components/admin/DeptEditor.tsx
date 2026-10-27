'use client';

/*
 * DeptEditor v2 — every single detail of a department page is editable.
 *
 * Tabs map 1:1 to the sections of the public department page:
 *   Basics · Hero & HUD · Pillars · HOD Message · Labs · Subjects ·
 *   Events · Projects · Testimonials · Careers · FAQs · Admission CTA ·
 *   Faculty Roster (own instant-save API) · Advanced JSON
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  FileJson,
  FormInput,
  ExternalLink,
  RotateCcw,
  Trash2,
  Plus,
  Users,
} from 'lucide-react';
import { Field, SectionDef, SpecFields, inputCls } from './editorKit';
import ImagePicker from './ImagePicker';

interface FacultyMember {
  id: number;
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  order: number;
  avatar: string;
  department: string;
}

function hexToRgbStr(hex: string): string {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec((hex || '').trim());
  if (!m) return '';
  return `${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}`;
}

/* ────────────────────────────────────────────────────────────────────────
 * Tab definitions — schema driven, paths relative to the dept object.
 *──────────────────────────────────────────────────────────────────────── */
const SECTIONS: SectionDef[] = [
  {
    key: 'basics',
    label: 'Basics',
    desc: 'Identity, theme color, intake facts and the main long texts of the page.',
    fields: [
      {
        t: 'text', k: 'title', label: 'Department Title',
        hint: 'Shown in hero, cards, browser tab and search results.',
      },
      {
        t: 'text', k: 'code', label: 'Short Code',
        hint: 'e.g. CST_01 — shown as [CST] tags in navigation bars.',
      },
      { t: 'num', k: 'order', label: 'Sort Order', hint: 'Position in department lists (1 = first).' },
      {
        t: 'area', k: 'tagline', label: 'Tagline', rows: 2,
        hint: 'Shown under the hero title and in Google results.',
      },
      {
        t: 'text', k: 'accentHex', label: 'Theme Color (hex)',
        hint: 'e.g. #0EA5E9 — recolors the whole department page. The RGB twin is updated automatically.',
      },
      { t: 'text', k: 'intake', label: 'Approved Intake' },
      { t: 'text', k: 'duration', label: 'Course Duration' },
      { t: 'text', k: 'regulatory', label: 'Regulatory Approval Line' },
      { t: 'text', k: 'practicalRatio', label: 'Practical / Theory Ratio' },
      { t: 'text', k: 'syllabusPdf', label: 'Syllabus PDF Link', hint: 'Full https:// link of the downloadable brochure/syllabus.' },
      {
        t: 'text', k: 'cardLabs', label: 'Card Labs Line',
        hint: 'One-line lab summary shown on the /departments listing card. Leave empty to auto-count the labs below.',
      },
      {
        t: 'img', k: 'cardImage', label: 'Listing Card Photo',
        hint: 'Photo used on the /departments listing card. Falls back to the first hero photo.',
      },
      {
        t: 'list', k: 'stats', label: 'Placement Stats',
        titleField: 'placementRate',
        def: { placementRate: '', highestCtc: '', medianCtc: '' },
        fields: [
          { t: 'text', k: 'placementRate', label: 'Placement Rate' },
          { t: 'text', k: 'highestCtc', label: 'Highest Package' },
          { t: 'text', k: 'medianCtc', label: 'Median Package' },
        ],
      },
      {
        t: 'area', k: 'eligibility', label: 'Eligibility Rules', rows: 7,
        hint: 'First line = 1st year entry. Second block = lateral entry rules.',
      },
      { t: 'area', k: 'narrative', label: 'Department Overview Text', rows: 8 },
    ],
  },
  {
    key: 'hero',
    label: 'Hero Photos & HUD',
    desc: 'The rotating photo wall at the top and the 5 floating data tiles.',
    fields: [
      {
        t: 'imglist', k: 'heroSlides', label: 'Hero Photos',
        hint: 'First photo is also used as the share/preview image of this page.',
      },
      {
        t: 'list', k: 'hudSpecs', label: 'HUD Data Tiles',
        titleField: 'label',
        def: { label: '', val: '', sub: '' },
        fields: [
          { t: 'text', k: 'label', label: 'Tile Label', hint: 'e.g. Approved Intake' },
          { t: 'text', k: 'val', label: 'Big Value', hint: 'e.g. 60 Seats' },
          { t: 'text', k: 'sub', label: 'Small Line Under Value' },
        ],
      },
    ],
  },
  {
    key: 'pillars',
    label: 'Core Pillars',
    desc: 'The three highlighted skill pillars under the overview text.',
    fields: [
      {
        t: 'list', k: 'pillars', label: 'Pillars',
        titleField: 'title',
        def: { tag: '', title: '', desc: '', skills: [] },
        fields: [
          { t: 'text', k: 'tag', label: 'Small Tag Line', hint: 'e.g. PILLAR 01 // CORE SYSTEMS' },
          { t: 'text', k: 'title', label: 'Pillar Title' },
          { t: 'area', k: 'desc', label: 'Pillar Description', rows: 3 },
          { t: 'strlist', k: 'skills', label: 'Skill Chips' },
        ],
      },
    ],
  },
  {
    key: 'hod',
    label: 'HOD Message',
    desc: 'Head of the department — photo, designation and the message text.',
    fields: [
      { t: 'text', k: 'hod.name', label: 'Name' },
      { t: 'text', k: 'hod.desig', label: 'Designation' },
      { t: 'img', k: 'hod.img', label: 'Photo' },
      { t: 'area', k: 'hod.message', label: 'Message Text', rows: 7 },
    ],
  },
  {
    key: 'labs',
    label: 'Labs',
    desc: 'Laboratory cards shown in the “Facilities” tab.',
    fields: [
      {
        t: 'list', k: 'labs', label: 'Labs',
        titleField: 'name',
        def: { name: '', spec: '', img: '' },
        fields: [
          { t: 'text', k: 'name', label: 'Lab Name' },
          { t: 'area', k: 'spec', label: 'Equipment / Description', rows: 3 },
          { t: 'img', k: 'img', label: 'Lab Photo' },
        ],
      },
    ],
  },
  {
    key: 'sems',
    label: 'Subjects',
    desc: 'Semester-wise subject lists shown in the “Curriculum” tab.',
    fields: [
      { t: 'strlist', k: 'sems.1', label: 'Semester 1 Subjects' },
      { t: 'strlist', k: 'sems.2', label: 'Semester 2 Subjects' },
      { t: 'strlist', k: 'sems.3', label: 'Semester 3 Subjects' },
      { t: 'strlist', k: 'sems.4', label: 'Semester 4 Subjects' },
      { t: 'strlist', k: 'sems.5', label: 'Semester 5 Subjects' },
      { t: 'strlist', k: 'sems.6', label: 'Semester 6 Subjects' },
    ],
  },
  {
    key: 'events',
    label: 'Events & Visits',
    desc: 'Departmental events, workshops and industrial visit cards.',
    fields: [
      {
        t: 'list', k: 'events', label: 'Events',
        titleField: 'title',
        def: { title: '', date_badge: '', type: '', desc: '', image: '' },
        fields: [
          { t: 'text', k: 'title', label: 'Event Title' },
          { t: 'text', k: 'date_badge', label: 'Badge Text', hint: 'e.g. Annual Flagship, Industrial Tour' },
          { t: 'text', k: 'type', label: 'Type Label', hint: 'e.g. Hackathon, Workshop' },
          { t: 'area', k: 'desc', label: 'Description', rows: 3 },
          { t: 'img', k: 'image', label: 'Event Photo' },
        ],
      },
    ],
  },
  {
    key: 'projects',
    label: 'Projects',
    desc: 'Final-year capstone project showcase cards.',
    fields: [
      {
        t: 'list', k: 'projects', label: 'Projects',
        titleField: 'title',
        def: { title: '', team: '', stack: '', desc: '', image: '' },
        fields: [
          { t: 'text', k: 'title', label: 'Project Title' },
          { t: 'text', k: 'team', label: 'Team / Batch Line' },
          { t: 'text', k: 'stack', label: 'Technology Stack Line' },
          { t: 'area', k: 'desc', label: 'Project Description', rows: 3 },
          { t: 'img', k: 'image', label: 'Project Photo' },
        ],
      },
    ],
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    desc: 'Alumni and topper quotes with their photos.',
    fields: [
      {
        t: 'list', k: 'testimonials', label: 'Testimonials',
        titleField: 'name',
        def: { name: '', role: '', org: '', quote: '', photo: '' },
        fields: [
          { t: 'text', k: 'name', label: 'Person Name' },
          { t: 'text', k: 'role', label: 'Role / Batch Line' },
          { t: 'text', k: 'org', label: 'Company / University Line' },
          { t: 'area', k: 'quote', label: 'Quote', rows: 4 },
          { t: 'img', k: 'photo', label: 'Person Photo' },
        ],
      },
    ],
  },
  {
    key: 'careers',
    label: 'Careers',
    desc: 'Career options, PSU list, higher-studies list and recruiter names.',
    fields: [
      { t: 'text', k: 'careers.roles.title', label: 'Group 1 — Title' },
      { t: 'area', k: 'careers.roles.desc', label: 'Group 1 — Description', rows: 2 },
      { t: 'strlist', k: 'careers.roles.items', label: 'Group 1 — Role Lines' },
      { t: 'text', k: 'careers.psu.title', label: 'Group 2 — Title' },
      { t: 'area', k: 'careers.psu.desc', label: 'Group 2 — Description', rows: 2 },
      { t: 'strlist', k: 'careers.psu.items', label: 'Group 2 — PSU Lines' },
      { t: 'text', k: 'careers.lateral.title', label: 'Group 3 — Title' },
      { t: 'area', k: 'careers.lateral.desc', label: 'Group 3 — Description', rows: 2 },
      { t: 'strlist', k: 'careers.lateral.items', label: 'Group 3 — College Lines' },
      { t: 'strlist', k: 'careers.recruiters', label: 'Recruiter Names' },
    ],
  },
  {
    key: 'faqs',
    label: 'FAQs',
    desc: 'Question & answer accordion at the bottom of the page.',
    fields: [
      {
        t: 'list', k: 'faqs', label: 'FAQs',
        titleField: 'q',
        def: { q: '', a: '' },
        fields: [
          { t: 'text', k: 'q', label: 'Question' },
          { t: 'area', k: 'a', label: 'Answer', rows: 4 },
        ],
      },
    ],
  },
  {
    key: 'cta',
    label: 'Admission CTA',
    desc: 'The red call-to-action banner at the very bottom of the page.',
    fields: [
      { t: 'text', k: 'cta.badge', label: 'Top Badge Line', hint: 'e.g. ADMISSIONS OPEN // ACADEMIC SESSION 2026–27' },
      { t: 'text', k: 'cta.heading', label: 'Big Heading' },
      { t: 'area', k: 'cta.subtext', label: 'Paragraph', rows: 2 },
      { t: 'text', k: 'cta.applyLabel', label: 'Apply Button Text' },
      { t: 'text', k: 'cta.applyHref', label: 'Apply Button Link', hint: 'e.g. /admissions' },
      { t: 'text', k: 'cta.phoneLabel', label: 'Phone Button Text' },
      { t: 'text', k: 'cta.phone', label: 'Phone Number (digits only)', hint: 'e.g. 03432542103' },
    ],
  },
];

const TAB_LABELS: Record<string, string> = Object.fromEntries(
  SECTIONS.map((s) => [s.key, s.label])
);

/* ────────────────────────────────────────────────────────────────────────
 * Faculty roster manager — instant save through /api/admin/faculty.
 *──────────────────────────────────────────────────────────────────────── */
function FacultyManager({ slug }: { slug: string }) {
  const [staff, setStaff] = useState<FacultyMember[]>([]);
  const [edits, setEdits] = useState<Record<number, FacultyMember>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [adding, setAdding] = useState(false);
  const [newRow, setNewRow] = useState({
    name: '', designation: 'Lecturer', qualification: '',
    experience: '', order: 99, avatar: '',
  });

  const load = useCallback(async () => {
    setErr('');
    const res = await fetch(`/api/admin/faculty?dept=${encodeURIComponent(slug)}`);
    const data = await res.json();
    if (res.ok) {
      setStaff(data.faculty);
      setEdits({});
    } else {
      setErr(data.error || 'Could not load faculty');
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  function rowOf(m: FacultyMember): FacultyMember {
    return edits[m.id] ?? m;
  }

  function dirty(m: FacultyMember): boolean {
    const e = edits[m.id];
    if (!e) return false;
    return ['name', 'designation', 'qualification', 'experience', 'order', 'avatar']
      .some((k) => String((e as any)[k] ?? '') !== String((m as any)[k] ?? ''));
  }

  async function saveRow(m: FacultyMember) {
    setBusy(true);
    setErr('');
    const e = edits[m.id];
    const res = await fetch(`/api/admin/faculty/${m.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(e),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) setErr(data.error || 'Could not save staff member');
    await load();
  }

  async function removeRow(m: FacultyMember) {
    if (!confirm(`Remove ${m.name} from the ${slug} faculty list?`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/faculty/${m.id}`, { method: 'DELETE' });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) setErr(data.error || 'Could not remove staff member');
    await load();
  }

  async function addRow() {
    if (!newRow.name.trim()) {
      setErr('Please type the staff name first.');
      return;
    }
    setBusy(true);
    setErr('');
    const res = await fetch('/api/admin/faculty', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newRow, department: slug }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setErr(data.error || 'Could not add staff member');
      return;
    }
    setAdding(false);
    setNewRow({ name: '', designation: 'Lecturer', qualification: '', experience: '', order: 99, avatar: '' });
    await load();
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500">
        Loading faculty roster…
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {err && (
        <div className="text-sm rounded-xl px-4 py-3 text-red-700 bg-red-50 border border-red-200">
          {err}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          {staff.length} staff listed for this department. Changes save instantly and
          appear in the “Our Faculties” section of the live page.
        </p>
        <button
          onClick={() => setAdding((v) => !v)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-white text-xs font-bold"
        >
          <Plus className="w-3.5 h-3.5" /> {adding ? 'Close' : 'Add Staff'}
        </button>
      </div>

      {adding && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-5 space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
            New Staff Member
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name">
              <input className={inputCls} value={newRow.name}
                onChange={(e) => setNewRow({ ...newRow, name: e.target.value })} />
            </Field>
            <Field label="Designation">
              <input className={inputCls} value={newRow.designation}
                onChange={(e) => setNewRow({ ...newRow, designation: e.target.value })} />
            </Field>
            <Field label="Qualification">
              <input className={inputCls} value={newRow.qualification}
                onChange={(e) => setNewRow({ ...newRow, qualification: e.target.value })} />
            </Field>
            <Field label="Experience">
              <input className={inputCls} value={newRow.experience}
                onChange={(e) => setNewRow({ ...newRow, experience: e.target.value })} />
            </Field>
            <Field label="Sort Order" hint="Lower numbers appear first.">
              <input type="number" className={inputCls} value={newRow.order}
                onChange={(e) => setNewRow({ ...newRow, order: Number(e.target.value) || 0 })} />
            </Field>
            <ImagePicker
              label="Photo"
              value={newRow.avatar}
              onChange={(url) => setNewRow({ ...newRow, avatar: url })}
            />
          </div>
          <button
            onClick={addRow}
            disabled={busy}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#9E0B0F] hover:bg-[#7B080B] text-white text-xs font-bold disabled:opacity-60"
          >
            <Plus className="w-3.5 h-3.5" /> Add to Roster
          </button>
        </div>
      )}

      <div className="space-y-2">
        {staff.map((m) => {
          const r = rowOf(m);
          const isDirty = dirty(m);
          return (
            <div key={m.id} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name">
                  <input className={inputCls} value={r.name}
                    onChange={(e) => setEdits({ ...edits, [m.id]: { ...r, name: e.target.value } })} />
                </Field>
                <Field label="Designation">
                  <input className={inputCls} value={r.designation}
                    onChange={(e) => setEdits({ ...edits, [m.id]: { ...r, designation: e.target.value } })} />
                </Field>
                <Field label="Qualification">
                  <input className={inputCls} value={r.qualification}
                    onChange={(e) => setEdits({ ...edits, [m.id]: { ...r, qualification: e.target.value } })} />
                </Field>
                <Field label="Experience">
                  <input className={inputCls} value={r.experience}
                    onChange={(e) => setEdits({ ...edits, [m.id]: { ...r, experience: e.target.value } })} />
                </Field>
                <Field label="Sort Order" hint="Lower numbers appear first.">
                  <input type="number" className={inputCls} value={r.order}
                    onChange={(e) => setEdits({ ...edits, [m.id]: { ...r, order: Number(e.target.value) || 0 } })} />
                </Field>
                <ImagePicker
                  label="Photo"
                  value={r.avatar}
                  onChange={(url) => setEdits({ ...edits, [m.id]: { ...r, avatar: url } })}
                />
              </div>
              <div className="flex items-center gap-2 pt-3">
                <button
                  onClick={() => saveRow(m)}
                  disabled={busy || !isDirty}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9E0B0F] hover:bg-[#7B080B] text-white text-xs font-bold disabled:opacity-40"
                >
                  <Save className="w-3.5 h-3.5" /> Save This Row
                </button>
                {isDirty && (
                  <button
                    onClick={() => setEdits({ ...edits, [m.id]: m })}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 border border-slate-200 bg-white"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Undo
                  </button>
                )}
                <button
                  onClick={() => removeRow(m)}
                  disabled={busy}
                  className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 bg-white disabled:opacity-40"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>
          );
        })}
        {staff.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-400">
            No staff listed yet for this department. Click <strong>Add Staff</strong> to add the first one.
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * The editor itself.
 *──────────────────────────────────────────────────────────────────────── */
type TabKey = 'form' | 'faculty' | 'json';

export default function DeptEditor({ slug }: { slug: string }) {
  const [dept, setDept] = useState<any>(null);
  const [section, setSection] = useState<string>('basics');
  const [tab, setTab] = useState<TabKey>('form');
  const [jsonText, setJsonText] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/departments/${slug}`);
      const data = await res.json();
      if (res.ok) {
        const d = data.department;
        // Seed the CTA block with the live defaults so the form is never empty.
        if (!d.cta) {
          d.cta = {
            badge: 'ADMISSIONS OPEN // ACADEMIC SESSION 2026–27',
            heading: `Ready to Begin Your Technical Career in ${d.title}?`,
            subtext:
              'Direct institutional seats and state merit counseling are now underway. Connect with our admission cell today to secure your counseling rank and hostel allocation.',
            applyLabel: 'Apply for Admission Online',
            applyHref: '/admissions',
            phoneLabel: 'Call Admissions: (0343) 2542103',
            phone: '03432542103',
          };
        }
        setDept(d);
        setJsonText(JSON.stringify(d, null, 2));
      } else {
        setMsg({ ok: false, text: data.error || 'Could not load department' });
      }
      setLoading(false);
    })();
  }, [slug]);

  function updateDept(next: any) {
    // keep the RGB twin of the accent color in sync automatically
    if (dept && next.accentHex !== dept.accentHex) {
      const rgb = hexToRgbStr(next.accentHex);
      if (rgb) next = { ...next, accentRgb: rgb };
    }
    setDept(next);
  }

  async function save() {
    setMsg(null);
    let payload = dept;

    if (tab === 'json') {
      try {
        payload = JSON.parse(jsonText);
      } catch (e: any) {
        setMsg({ ok: false, text: `JSON error: ${e.message}` });
        return;
      }
    }

    if (!payload || payload.slug !== slug) {
      setMsg({ ok: false, text: 'The slug must stay unchanged.' });
      return;
    }

    setBusy(true);
    const res = await fetch(`/api/admin/departments/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ department: payload }),
    });
    const data = await res.json();
    setBusy(false);

    if (res.ok) {
      setDept(payload);
      if (tab === 'json') setJsonText(JSON.stringify(payload, null, 2));
      else setJsonText(JSON.stringify(payload, null, 2));
      setMsg({ ok: true, text: 'Saved! The live page is updated.' });
    } else {
      setMsg({ ok: false, text: data.error || 'Could not save' });
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
        Loading department content…
      </div>
    );
  }

  if (!dept) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 p-10 text-center text-sm text-red-700">
        {msg?.text || 'Department not found.'}
      </div>
    );
  }

  const activeSection = SECTIONS.find((s) => s.key === section) || SECTIONS[0];

  return (
    <div className="space-y-5">
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => {
              setTab('form');
              setSection(s.key);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
              tab === 'form' && section === s.key
                ? 'bg-[#9E0B0F] text-white border-[#9E0B0F] shadow'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
          >
            {s.label}
          </button>
        ))}
        <button
          onClick={() => setTab('faculty')}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
            tab === 'faculty'
              ? 'bg-[#9E0B0F] text-white border-[#9E0B0F] shadow'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
          }`}
        >
          <Users className="w-3.5 h-3.5" /> Faculty Roster
        </button>
        <button
          onClick={() => setTab('json')}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
            tab === 'json'
              ? 'bg-slate-900 text-white border-slate-900 shadow'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
          }`}
        >
          <FileJson className="w-3.5 h-3.5" /> Advanced JSON
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
          <button
            onClick={() => {
              setTab('form');
              setJsonText(JSON.stringify(dept, null, 2));
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
            href={`/departments/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Page
          </a>
          {tab !== 'faculty' && (
            <button
              onClick={save}
              disabled={busy}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#9E0B0F] hover:bg-[#7B080B] text-white text-xs font-bold shadow disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              {busy ? 'Saving…' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>

      {/* Message */}
      {msg && (
        <div
          className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 ${
            msg.ok
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
              : 'text-red-700 bg-red-50 border border-red-200'
          }`}
        >
          {msg.ok ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          {msg.text}
        </div>
      )}

      {/* Body */}
      {tab === 'faculty' ? (
        <FacultyManager slug={slug} />
      ) : tab === 'json' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Full department data (JSON)
            </span>
            <button
              onClick={() => setJsonText(JSON.stringify(dept, null, 2))}
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
      ) : (
        <div className="space-y-4">
          <p className="text-xs text-slate-500">{activeSection.desc}</p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              {TAB_LABELS[activeSection.key]}
            </h3>
            <SpecFields
              spec={activeSection.fields}
              value={dept}
              onChange={updateDept}
            />
          </div>
        </div>
      )}
    </div>
  );
}
