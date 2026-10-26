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
} from 'lucide-react';
import ImagePicker from './ImagePicker';

/*
 * MessagesEditor — edits the four leader message pages:
 * Principal, Vice Principal, President, Secretary.
 * One tab per person. Paragraph lines: one line = one paragraph.
 * **bold** inside a line renders as bold text.
 */

interface Msg {
  [key: string]: unknown;
}

const PEOPLE = [
  { key: 'principal', label: 'Principal', href: '/message-from-principal' },
  { key: 'vicePrincipal', label: 'Vice Principal', href: '/message-from-vice-principal' },
  { key: 'president', label: 'President', href: '/messages-from-president-secretary' },
  { key: 'secretary', label: 'Secretary', href: '/messages-from-president-secretary' },
];

const inputCls =
  'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#9E0B0F] bg-slate-50 focus:bg-white transition';

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-slate-400">{hint}</span>}
    </label>
  );
}

export default function MessagesEditor() {
  const [data, setData] = useState<Record<string, Msg> | null>(null);
  const [activeKey, setActiveKey] = useState('principal');
  const [tab, setTab] = useState<'form' | 'json'>('form');
  const [jsonText, setJsonText] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/messages');
      const json = await res.json();
      if (res.ok) {
        setData(json.messages);
        setJsonText(JSON.stringify(json.messages, null, 2));
      } else {
        setMsg({ ok: false, text: json.error || 'Could not load messages' });
      }
      setLoading(false);
    })();
  }, []);

  const person = data?.[activeKey] ?? {};

  function set(path: string, value: string | boolean) {
    setData((prev) => {
      if (!prev) return prev;
      const next: any = { ...prev };
      const obj = { ...(next[activeKey] as any) };
      obj[path] = value;
      next[activeKey] = obj;
      return next;
    });
  }

  function get(path: string): any {
    return (person as any)?.[path] ?? '';
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
    const res = await fetch('/api/admin/messages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: payload }),
    });
    const json = await res.json();
    setBusy(false);

    if (res.ok) {
      setData(payload as Record<string, Msg>);
      if (tab === 'json') setJsonText(JSON.stringify(payload, null, 2));
      setMsg({ ok: true, text: 'Saved! The live message pages are updated.' });
    } else {
      setMsg({ ok: false, text: json.error || 'Could not save' });
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
        Loading message pages…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 p-10 text-center text-sm text-red-700">
        {msg?.text || 'Could not load messages.'}
      </div>
    );
  }

  const activePerson = PEOPLE.find((p) => p.key === activeKey)!;

  return (
    <div className="space-y-5">
      {/* Person switcher */}
      <div className="flex flex-wrap gap-2">
        {PEOPLE.map((p) => (
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
            href={activePerson.href}
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
          {/* Banner / hero */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Page Banner
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Small Line Above Title (kicker)">
                <input className={inputCls} value={get('kicker')} onChange={(e) => set('kicker', e.target.value)} />
              </Field>
              <Field label="Badge">
                <input className={inputCls} value={get('badge')} onChange={(e) => set('badge', e.target.value)} />
              </Field>
            </div>
            <Field label="Page Title">
              <input className={inputCls} value={get('title')} onChange={(e) => set('title', e.target.value)} />
            </Field>
            <Field label="Banner Subtitle">
              <textarea rows={2} className={inputCls} value={get('subtitle')} onChange={(e) => set('subtitle', e.target.value)} />
            </Field>
          </section>

          {/* Person card */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Person &amp; Message
            </h3>
            <ImagePicker
              label="Photo (leave empty to hide the photo)"
              value={get('photo')}
              onChange={(url) => set('photo', url)}
            />
            <Field label="Photo Alt Text">
              <input className={inputCls} value={get('photoAlt')} onChange={(e) => set('photoAlt', e.target.value)} />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Red Role Tag">
                <input className={inputCls} value={get('roleTag')} onChange={(e) => set('roleTag', e.target.value)} />
              </Field>
              <Field label="Card Heading">
                <input className={inputCls} value={get('heading')} onChange={(e) => set('heading', e.target.value)} />
              </Field>
            </div>
            <Field label="Organisation Line (under heading)">
              <input className={inputCls} value={get('orgLine')} onChange={(e) => set('orgLine', e.target.value)} />
            </Field>
            <Field label="Green Approval Chip (leave empty to hide)">
              <input className={inputCls} value={get('approvalChip')} onChange={(e) => set('approvalChip', e.target.value)} />
            </Field>

            <Field
              label="Message Paragraphs"
              hint="One paragraph per line. Wrap words with **double stars** to make them bold."
            >
              <textarea
                rows={12}
                className={`${inputCls} font-normal leading-relaxed`}
                value={((person.paragraphs as string[]) ?? []).join('\n')}
                onChange={(e) => {
                  const lines = e.target.value.split('\n');
                  setData((prev) => {
                    if (!prev) return prev;
                    const next: any = { ...prev };
                    const obj = { ...(next[activeKey] as any) };
                    obj.paragraphs = lines;
                    next[activeKey] = obj;
                    return next;
                  });
                }}
              />
            </Field>
          </section>

          {/* Signature */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Signature Area
            </h3>
            <Field label="Place (left side)">
              <input className={inputCls} value={get('signPlace')} onChange={(e) => set('signPlace', e.target.value)} />
            </Field>
            <Field label="Signed Name">
              <input className={inputCls} value={get('signName')} onChange={(e) => set('signName', e.target.value)} />
            </Field>
            <Field label="Signed Organisation Line">
              <input className={inputCls} value={get('signOrg')} onChange={(e) => set('signOrg', e.target.value)} />
            </Field>
          </section>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Full messages data (JSON)
            </span>
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
