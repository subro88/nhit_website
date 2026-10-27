import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SubpageHero from './SubpageHero';
import SidebarNav from './SidebarNav';
import { CheckCircle, Award, Download, ShieldCheck, FileText } from 'lucide-react';
import { readJson, PAGES_FILE, HOMEPAGE_FILE } from '@/lib/cmsStore';
import type { PageContent, PageSection, StatTile } from '@/lib/pageTypes';
import { iconFor } from './iconMap';
import InquiryForm from './InquiryForm';
import PlacementRadar from '@/components/home/PlacementRadar';
import type { HomepageData } from '@/lib/homeTypes';

/*
 * Renders **bold** markers and [text](href) links inside CMS strings.
 */
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^\s)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const md = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (md) {
      return (
        <a
          key={i}
          href={md[2]}
          target={md[2].startsWith('http') ? '_blank' : undefined}
          rel={md[2].startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-[color:var(--edu-primary)] hover:underline"
        >
          {md[1]}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

const STATUS_COLORS: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-800',
  blue: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
  amber: 'bg-amber-100 text-amber-800',
  indigo: 'bg-indigo-100 text-indigo-800',
  cyan: 'bg-cyan-100 text-cyan-800',
};

const TILE_COLORS: Record<string, string> = {
  red: 'text-[color:var(--edu-primary)]',
  green: 'text-[#10B981]',
  cyan: 'text-[#00bcd4]',
  blue: 'text-blue-600',
  dark: 'text-neutral-900',
};

function PhotoStrip({
  photos,
  style = 'card',
  columns = 3,
}: {
  photos: Array<{ src: string; caption?: string }>;
  style?: 'card' | 'overlay';
  columns?: number;
}) {
  if (!photos.length) return null;
  const colCls =
    columns === 4
      ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
      : columns === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-3';

  if (style === 'overlay') {
    return (
      <div className={`grid ${colCls} gap-4`}>
        {photos.map((ph, i) => (
          <div key={i} className="group relative h-60 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
            <Image
              src={ph.src}
              alt={ph.caption || 'Campus photo'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            {ph.caption && (
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs font-bold leading-snug">{ph.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${colCls} gap-3`}>
      {photos.map((ph, i) => (
        <div key={i} className="rounded-xl overflow-hidden border border-neutral-200 shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ph.src}
            alt={ph.caption || 'Campus photo'}
            className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300"
          />
          {ph.caption && (
            <div className="p-2.5 bg-neutral-50 text-[11px] font-bold text-neutral-800 text-center">
              {ph.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function StatBar({ stats }: { stats: StatTile[] }) {
  if (!stats.length) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
      {stats.map((st, i) => (
        <div key={i} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
          <div className={`text-xl sm:text-2xl font-black font-montserrat ${TILE_COLORS[st.color ?? 'dark']}`}>
            {st.value}
          </div>
          {st.label && (
            <div className="text-[11px] font-semibold text-neutral-500 mt-0.5">{st.label}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ tag, heading, h2 }: { tag?: string; heading?: string; h2?: boolean }) {
  if (!tag && !heading) return null;
  return (
    <div className="border-b border-neutral-100 pb-5">
      {tag && (
        <span className="text-xs font-bold text-[color:var(--edu-primary)] uppercase tracking-wider">{tag}</span>
      )}
      {heading && (
        <h2
          className={`text-[#0F172A] mt-1 font-montserrat ${
            h2 ? 'text-2xl sm:text-3xl font-extrabold' : 'text-xl sm:text-2xl font-bold'
          }`}
        >
          {heading}
        </h2>
      )}
    </div>
  );
}

/* One rich line inside a contactCards card: optional kicker/sub/link/divider. */
function renderLine(ln: Record<string, unknown>): React.ReactNode {
  if (ln.kicker) {
    return (
      <span className="text-[10px] text-gray-400 uppercase font-bold block">{String(ln.text ?? '')}</span>
    );
  }
  const text = String(ln.text ?? '');
  const body = renderInline(text);
  return (
    <>
      {ln.href ? (
        <a
          href={String(ln.href)}
          target={String(ln.href).startsWith('http') ? '_blank' : undefined}
          rel={String(ln.href).startsWith('http') ? 'noopener noreferrer' : undefined}
          className="font-bold text-sm text-gray-900 hover:text-[color:var(--edu-primary)] transition-colors"
        >
          {body}
        </a>
      ) : (
        <span className={ln.bold ? 'font-bold text-gray-900 text-sm' : 'text-gray-600'}>{body}</span>
      )}
      {ln.sub ? <span className="text-gray-400 text-[10px]">{String(ln.sub)}</span> : null}
    </>
  );
}

/* One card inside a checkCards section (pathways / committees). */
function renderCheckCard(raw: unknown, idx: number): React.ReactNode {
  const it = (typeof raw === 'string' ? { title: raw } : raw) as Record<string, string> & { bullets?: string[] };
  const tone = it.tone;
  return (
    <div
      key={idx}
      className={`rounded-xl space-y-3 flex flex-col justify-between ${
        tone
          ? `p-4 sm:p-5 bg-gray-50 border-l-4 ${
              tone === 'blue'
                ? 'border-blue-600'
                : tone === 'green'
                  ? 'border-green-600'
                  : tone === 'purple'
                    ? 'border-purple-600'
                    : 'border-[color:var(--edu-primary)]'
            }`
          : 'p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
      }`}
    >
      <div>
        {it.badge && (
          <div
            className={`inline-block px-3 py-1 rounded font-bold text-xs font-mono mb-3 ${
              it.badgeTone === 'amber' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
            }`}
          >
            {it.badge}
          </div>
        )}
        <h3 className={`font-bold text-gray-900 ${it.badge ? 'text-2xl font-black mb-3' : 'text-base mb-2'}`}>
          {it.title}
        </h3>
        {it.desc && <p className="text-xs text-gray-600 leading-relaxed mb-4">{renderInline(it.desc)}</p>}
        {!!it.bullets?.length && (
          <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
            {it.bullets.map((b: string, j: number) => (
              <div key={j} className="flex items-start gap-2.5 text-xs text-gray-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{renderInline(b)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {(it.linkText || it.btnText) && (
        <div className="pt-4 border-t border-gray-100">
          {it.btnText && it.btnHref ? (
            <a
              href={it.btnHref}
              target={it.btnHref.startsWith('http') ? '_blank' : undefined}
              rel={it.btnHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`w-full py-3 px-4 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm ${
                it.btnTone === 'red'
                  ? 'bg-[color:var(--edu-primary)] hover:bg-[color:var(--edu-primary-dark)]'
                  : 'bg-gray-900 hover:bg-[color:var(--edu-primary)]'
              }`}
            >
              {it.btnText}
            </a>
          ) : (
            it.linkText &&
            it.linkHref && (
              <Link href={it.linkHref} className="text-xs font-semibold text-[color:var(--edu-primary)] hover:underline">
                {it.linkText}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}

function Section({ s }: { s: PageSection }) {
  switch (s.type) {
    case 'text': {
      const paras = s.paragraphs ?? [];
      const calloutAt = s.callout ? (s.calloutPos ?? paras.length) : -1;
      return (
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
          {(s.pill || s.pillNote) && (
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-neutral-100">
              {s.pill && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-[color:var(--edu-primary)]">
                  <ShieldCheck className="w-4 h-4" /> {s.pill}
                </span>
              )}
              {s.pillNote && <span className="text-xs font-semibold text-neutral-500">{s.pillNote}</span>}
            </div>
          )}
          <SectionHeader tag={s.tag} heading={s.heading} h2 />
          <div className="text-neutral-700 text-sm leading-relaxed space-y-4 font-roboto">
            {paras.slice(0, calloutAt < 0 ? paras.length : calloutAt).map((p, i) => (
              <p key={i}>{renderInline(p)}</p>
            ))}
          </div>
          {s.callout && (
            <div
              className={`p-5 rounded-xl border-l-4 text-neutral-800 text-xs sm:text-sm leading-relaxed italic space-y-2 ${
                s.calloutTone === 'amber'
                  ? 'bg-amber-50/80 border-amber-500 not-italic'
                  : 'bg-[color:rgba(var(--edu-primary-rgb),0.08)] border-[color:var(--edu-primary)]'
              }`}
            >
              {s.calloutTitle && (
                <h4 className="font-bold text-neutral-900 text-sm mb-1 flex items-center gap-2 not-italic">
                  {(() => {
                    const NIcon = iconFor(s.calloutIcon);
                    return <NIcon className="w-4 h-4 text-amber-600" />;
                  })()}
                  {s.calloutTitle}
                </h4>
              )}
              <div className={s.calloutTone === 'amber' ? 'not-italic' : ''}>{renderInline(s.callout)}</div>
            </div>
          )}
          <div className="text-neutral-700 text-sm leading-relaxed space-y-4 font-roboto">
            {(calloutAt >= 0 ? paras.slice(calloutAt) : []).map((p, i) => (
              <p key={i}>{renderInline(p)}</p>
            ))}
          </div>
          {!!s.kv?.length && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-neutral-700 border border-neutral-200 rounded-lg">
                <tbody className="divide-y divide-neutral-200">
                  {s.kv.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-neutral-50' : ''}>
                      <td className="px-4 py-3 font-bold text-neutral-900 w-1/3">{row.label}</td>
                      <td
                        className={`px-4 py-3 ${
                          row.highlight ? 'font-mono font-bold text-[color:var(--edu-primary)]' : ''
                        }`}
                      >
                        {renderInline(row.value ?? '')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {(s.note || s.noteTitle) && (
            <div
              className={`p-4 rounded-r-lg border-l-4 ${
                s.noteTone === 'amber'
                  ? 'bg-amber-50/80 border-amber-500'
                  : 'bg-[color:rgba(var(--edu-primary-rgb),0.08)] border-[color:var(--edu-primary)]'
              }`}>
              {s.noteTitle && (
                <h4 className="font-bold text-neutral-900 text-sm mb-1 flex items-center gap-2">
                  {(() => {
                    const NIcon2 = iconFor(s.noteIcon);
                    return <NIcon2 className="w-4 h-4 text-amber-600" />;
                  })()}
                  {s.noteTitle}
                </h4>
              )}
              {s.note && <p className="text-xs text-neutral-700 leading-relaxed">{renderInline(s.note)}</p>}
            </div>
          )}
          {!!s.photos?.length && (
            <div className="pt-2">
              <PhotoStrip photos={s.photos} style={s.photoStyle ?? 'card'} columns={3} />
            </div>
          )}
          {!!s.stats?.length && <StatBar stats={s.stats} />}
        </article>
      );
    }

    case 'quote':
      return (
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
          <SectionHeader tag={s.tag} heading={s.heading} h2 />
          <div className="p-6 rounded-2xl bg-[color:rgba(var(--edu-primary-rgb),0.08)] border-l-4 border-[color:var(--edu-primary)] text-neutral-800 text-sm leading-relaxed space-y-3 font-roboto">
            {(s.paragraphs ?? []).map((p, i) => (
              <p key={i}>{renderInline(p)}</p>
            ))}
          </div>
          {(s.signedBy || s.signedOrg) && (
            <div className="pt-2 text-right">
              <div className="font-bold text-sm text-neutral-900 font-montserrat">{s.signedBy}</div>
              <div className="text-xs text-neutral-500">{s.signedOrg}</div>
            </div>
          )}
        </article>
      );

    case 'officerCards':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(s.cards ?? []).map((card, i) => (
            <div key={i} className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/80 space-y-2">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider ${
                  card.labelColor === 'green' ? 'text-[#10B981]' : 'text-[color:var(--edu-primary)]'
                }`}
              >
                {card.label}
              </span>
              <h3 className="font-bold text-base text-neutral-900 font-montserrat">{card.title}</h3>
              <div className="text-xs text-neutral-600 space-y-1">
                {(card.lines ?? []).map((line, j) => (
                  <div key={j}>{renderInline(line)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case 'steps':
      return (
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-5">
          <SectionHeader tag={s.tag} heading={s.heading} />
          <ol className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed list-decimal pl-5">
            {(s.items ?? []).map((item, i) => {
              const text = typeof item === 'string' ? item : String(item.value ?? item.title ?? '');
              return <li key={i}>{renderInline(text)}</li>;
            })}
          </ol>
        </article>
      );

    case 'table':
      return (
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
          <SectionHeader tag={s.tag} heading={s.heading} />
          {!!s.paragraphs?.length && (
            <div className="text-sm text-neutral-600 leading-relaxed font-roboto space-y-3">
              {s.paragraphs.map((p, i) => (
                <p key={i}>{renderInline(p)}</p>
              ))}
            </div>
          )}
          <div className={`grid gap-6 items-start ${s.photoSrc ? 'grid-cols-1 lg:grid-cols-12' : ''}`}>
            <div className={s.photoSrc ? 'lg:col-span-7' : ''}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-neutral-700 border border-neutral-200 rounded-lg">
                  <thead className="bg-neutral-100 text-neutral-900 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      {(s.columns ?? []).map((col, i) => (
                        <th key={i} className="px-4 py-3">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {(s.rows ?? []).map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}>
                        <td className="px-4 py-3">
                          <div className="font-bold text-neutral-900">{row.main}</div>
                          {row.sub && <div className="text-[11px] text-neutral-500">{row.sub}</div>}
                        </td>
                        {(row.cells ?? []).map((cell, j) => (
                          <td key={j} className="px-4 py-3 font-mono text-neutral-600">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {s.foot && (
                      <tr className="bg-orange-50/60 font-bold border-t-2 border-[color:var(--edu-primary)]">
                        <td className="px-4 py-3 text-neutral-900">{s.foot.main}</td>
                        {(s.foot.cells ?? []).map((cell, j) => (
                          <td key={j} className="px-4 py-3 text-neutral-700">{cell}</td>
                        ))}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {s.note && (
                <div className="mt-3 p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-[11px] text-neutral-500 font-mono">
                  {s.note}
                </div>
              )}
            </div>
            {s.photoSrc && (
              <div className="lg:col-span-5 bg-neutral-50 rounded-xl p-5 border border-neutral-200 text-center">
                {s.photoTitle && <h4 className="font-bold text-sm text-neutral-900 mb-1">{s.photoTitle}</h4>}
                {s.photoSub && <p className="text-xs text-neutral-500 mb-4">{s.photoSub}</p>}
                <div className="relative h-64 rounded-lg overflow-hidden border border-neutral-300 bg-white">
                  <Image
                    src={s.photoSrc}
                    alt={s.photoTitle || 'Document'}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                {s.photoLinkText && s.photoLinkHref && (
                  <a
                    href={s.photoLinkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[color:var(--edu-primary)] hover:underline"
                  >
                    <span>{s.photoLinkText}</span> →
                  </a>
                )}
              </div>
            )}
          </div>
        </article>
      );

    case 'objectives':
      return (
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
          <SectionHeader tag={s.tag} heading={s.heading} />
          <div className="space-y-4">
            {(s.items ?? []).map((raw, idx) => {
            const obj = (typeof raw === 'string' ? { title: raw, desc: '' } : raw) as Record<string, string>;
            return (
              <div key={idx} className="p-5 rounded-xl border border-neutral-200/80 bg-neutral-50/60 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                  <h4 className="font-bold text-sm text-[#0F172A] font-montserrat">{obj.title}</h4>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-roboto pl-6">{obj.desc}</p>
              </div>
            );
            })}
          </div>
        </article>
      );

    case 'grid':
      return (
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
          <SectionHeader tag={s.tag} heading={s.heading} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(s.items ?? []).map((raw, idx) => {
            const mou = (typeof raw === 'string' ? { title: raw, type: '', desc: '' } : raw) as Record<string, string>;
            return (
              <div key={idx} className="p-5 rounded-xl border border-neutral-200/80 bg-white space-y-2">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h4 className="font-bold text-sm text-neutral-900 font-montserrat">{mou.title}</h4>
                  <span className="text-[10px] font-bold text-[color:var(--edu-primary)] bg-[color:rgba(var(--edu-primary-rgb),0.08)] px-2 py-0.5 rounded shrink-0">
                    {mou.type}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-roboto">{mou.desc}</p>
              </div>
            );
            })}
          </div>
        </article>
      );

    case 'approvals':
      return (
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
          <SectionHeader tag={s.tag} heading={s.heading} h2 />
          <div className="space-y-5">
            {(s.items ?? []).map((raw, idx) => {
            const app = (typeof raw === 'string' ? { title: raw } : raw) as Record<string, string>;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-xl border border-neutral-200/90 bg-neutral-50/60 space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-bold text-base text-[#0F172A] font-montserrat">{app.title}</h3>
                  <span className="text-[11px] font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full w-fit">
                    {app.status}
                  </span>
                </div>
                <div className="text-xs font-semibold text-neutral-500 font-mono">{app.id}</div>
                <p className="text-xs text-neutral-600 font-roboto">{app.body}</p>
                <p className="text-xs sm:text-sm text-neutral-700 font-roboto pt-1 leading-relaxed">
                  {app.details}
                </p>
              </div>
            );
            })}
          </div>
        </article>
      );

    case 'helplines':
      return (
        <div className={`grid grid-cols-2 gap-4 ${(s.boxes ?? []).length >= 4 ? 'md:grid-cols-4' : 'sm:grid-cols-2'}`}>
          {(s.boxes ?? []).map((box, i) => (
            <div key={i} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
              <div className="text-xs font-bold text-neutral-900">{box.title}</div>
              <div
                className={`text-lg font-black font-mono ${
                  TILE_COLORS[box.color ?? 'red'] ?? 'text-[color:var(--edu-primary)]'
                }`}
              >
                {box.value}
              </div>
              <div className="text-[11px] text-neutral-500">{box.note}</div>
            </div>
          ))}
        </div>
      );

    case 'banner':
      return (
        <section className="bg-gradient-to-r from-gray-900 via-neutral-900 to-gray-900 text-white rounded-2xl p-7 sm:p-9 md:p-12 border border-gray-800 shadow-xl flex flex-col sm:flex-row items-center gap-6">
          {!s.badge && (
            <div className="w-20 h-20 rounded-2xl bg-[color:var(--edu-primary)] flex items-center justify-center text-white shrink-0 shadow-lg">
              <Award className="w-10 h-10" />
            </div>
          )}
          <div className={`space-y-2 text-center sm:text-left ${s.btnText ? 'flex-1' : ''}`}>
            {s.badge && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-[color:var(--edu-primary)] border border-[color:var(--edu-primary)]/30 mb-1">
                {s.badge}
              </span>
            )}
            <h3 className="font-bold text-lg sm:text-2xl sm:text-3xl font-heading tracking-tight text-white font-montserrat">{s.heading}</h3>
            {(s.paragraphs ?? []).map((p, i) => (
              <p key={i} className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-roboto">
                {renderInline(p)}
              </p>
            ))}
            {s.note && <div className="text-[11px] font-mono text-neutral-400">{s.note}</div>}
          </div>
          {s.btnText && s.btnHref && (
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href={s.btnHref}
                className="px-6 py-3.5 bg-[color:var(--edu-primary)] hover:bg-[color:var(--edu-primary-dark)] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{s.btnText}</span>
                <Award className="w-4 h-4" />
              </Link>
              {s.btn2Text && s.btn2Href && (
                <a
                  href={s.btn2Href}
                  target={s.btn2Href.startsWith('http') ? '_blank' : undefined}
                  rel={s.btn2Href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`px-6 py-3.5 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                    s.btn2Tone === 'emerald'
                      ? 'bg-emerald-600 hover:bg-emerald-500'
                      : s.btn2Tone === 'red'
                        ? 'bg-[color:var(--edu-primary)] hover:bg-[color:var(--edu-primary-dark)]'
                        : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <span>{s.btn2Text}</span>
                </a>
              )}
            </div>
          )}
        </section>
      );

    case 'iconCards':
      return (
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
          <SectionHeader tag={s.tag} heading={s.heading} />
          {!!s.paragraphs?.length && (
            <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-roboto space-y-3">
              {s.paragraphs.map((p, i) => (
                <p key={i}>{renderInline(p)}</p>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(s.items ?? []).map((raw, idx) => {
              const it = (typeof raw === 'string' ? { title: raw } : raw) as Record<string, string>;
              const Icon = iconFor(it.icon);
              const tone =
                it.tone === 'blue'
                  ? 'bg-blue-100 text-blue-600'
                  : it.tone === 'green'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-[color:rgba(var(--edu-primary-rgb),0.08)] text-[color:var(--edu-primary)]';
              return (
                <div key={idx} className="p-5 rounded-xl border border-neutral-200/80 bg-neutral-50/50 hover:bg-neutral-50 transition-colors space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tone}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-[#0F172A] font-montserrat">{it.title}</h4>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed font-roboto">{renderInline(it.desc ?? '')}</p>
                </div>
              );
            })}
          </div>
        </article>
      );

    case 'photoGrid': {
      const cols = (s.items ?? []).length >= 4 ? 4 : 3;
      return (
        <section className="space-y-6">
          {(s.heading || s.tag || s.linkText) && (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                {s.tag && (
                  <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--edu-primary)]">{s.tag}</span>
                )}
                {s.heading && <h2 className="text-2xl font-bold font-heading text-gray-900 mt-1">{s.heading}</h2>}
                {s.sub && <p className="text-xs text-gray-500 mt-1">{s.sub}</p>}
              </div>
              {s.linkText && s.linkHref && (
                <Link href={s.linkHref} className="text-xs font-bold text-[color:var(--edu-primary)] hover:underline">
                  {s.linkText}
                </Link>
              )}
            </div>
          )}
          <PhotoStrip
            photos={s.photos ?? []}
            style={s.photoStyle ?? 'overlay'}
            columns={s.columnsCount ?? cols}
          />
        </section>
      );
    }

    case 'hubCards':
      return (
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            {s.tag && <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--edu-primary)]">{s.tag}</span>}
            {s.heading && <h2 className="text-3xl font-black font-heading text-gray-900 mt-1">{s.heading}</h2>}
            {s.sub && <p className="text-xs sm:text-sm text-gray-600 mt-2">{renderInline(s.sub)}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(s.items ?? []).map((raw, idx) => {
              const h = (typeof raw === 'string' ? { title: raw } : raw) as Record<string, string>;
              const Icon = iconFor(h.icon);
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  style={{ borderTop: `4px solid ${h.accent || 'var(--edu-primary)'}` }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono font-bold text-gray-500">{h.code}</span>
                      {h.status && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[h.statusColor ?? 'emerald']}`}>
                          {h.status}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: h.accent || 'var(--edu-primary)' }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900">{h.title}</h3>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-6">{h.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-medium text-gray-600">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase">Track</span>
                      <strong className="text-gray-800">{h.track}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 block text-[10px] uppercase">Mode</span>
                      <strong className="text-gray-800">{h.mode}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      );

    case 'tradeCards':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(s.items ?? []).map((raw, idx) => {
            const t = (typeof raw === 'string' ? { title: raw } : raw) as Record<string, any>;
            const Icon = iconFor(t.icon);
            const highlights: string[] = Array.isArray(t.highlights) ? t.highlights : [];
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full bg-gray-900 overflow-hidden">
                    <Image
                      src={t.image || '/images/hero-campus.jpg'}
                      alt={t.title || 'Trade photo'}
                      fill
                      className="object-cover transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    {t.badge && (
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span
                          className="px-3 py-1 rounded-md text-xs font-bold text-white shadow-sm flex items-center gap-1.5"
                          style={{ backgroundColor: t.accent || 'var(--edu-primary)' }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {t.badge}
                        </span>
                      </div>
                    )}
                    {t.intake && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-gray-900">
                          {t.intake}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-black text-white">{t.title}</h3>
                      {t.duration && <p className="text-xs text-gray-300 font-medium mt-1">{t.duration}</p>}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 space-y-6">
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{t.tagline}</p>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                        Key Career &amp; Academic Advantages
                      </h4>
                      <ul className="space-y-2 text-xs text-gray-700">
                        {highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{renderInline(h)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {t.workshops && (
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
                        <strong className="text-gray-900 block mb-1">Dedicated Workshop Facilities:</strong>
                        <span className="text-gray-600">{t.workshops}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6 md:p-8 pt-0 flex flex-wrap gap-3">
                  <Link
                    href={`/iti-courses/${t.slug || ''}`}
                    className="flex-1 py-3 px-4 rounded-xl bg-gray-900 hover:bg-[color:var(--edu-primary)] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <span>View Trade Details &amp; Syllabus</span>
                    <Award className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/admissions"
                    className="py-3 px-5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[color:var(--edu-primary)] text-xs font-bold transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      );

    case 'milestones':
      return (
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
          <SectionHeader tag={s.tag} heading={s.heading} />
          <div className="space-y-4">
            {(s.items ?? []).map((raw, idx) => {
              const m = (typeof raw === 'string' ? { title: raw } : raw) as Record<string, string>;
              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/70 hover:bg-neutral-50 transition-colors"
                >
                  <div className="w-16 h-10 rounded-lg bg-[color:var(--edu-primary)] text-white flex items-center justify-center font-black text-sm tracking-wide shrink-0">
                    {m.year}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-neutral-900">{m.title}</h4>
                    <p className="text-xs text-neutral-600 mt-0.5">{renderInline(m.desc ?? '')}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      );

    case 'visionMission':
      return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-7 rounded-2xl border border-neutral-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[color:rgba(var(--edu-primary-rgb),0.08)] text-[color:var(--edu-primary)] flex items-center justify-center font-bold text-xl mb-4">
                {s.visionEmoji || '🎯'}
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] font-montserrat mb-2">{s.visionTitle || 'Our Vision'}</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-roboto">{renderInline(s.visionText ?? '')}</p>
            </div>
          </div>
          <div className="bg-white p-7 rounded-2xl border border-neutral-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center font-bold text-xl mb-4">
                {s.missionEmoji || '🚀'}
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] font-montserrat mb-2">{s.missionTitle || 'Our Mission'}</h3>
              <ul className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-roboto space-y-2">
                {(s.missionItems ?? []).map((mi, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-1" />
                    <span>{renderInline(mi)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      );

    case 'linkCards':
      return (
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
          <SectionHeader tag={s.tag} heading={s.heading} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(s.items ?? []).map((raw, idx) => {
              const l = (typeof raw === 'string' ? { title: raw } : raw) as Record<string, string>;
              return (
                <Link
                  key={idx}
                  href={l.href || '#'}
                  className="group p-5 rounded-xl border border-neutral-200 hover:border-[color:var(--edu-primary)] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl mb-2">{l.emoji || '📄'}</div>
                    <h4 className="font-bold text-sm text-neutral-900 group-hover:text-[color:var(--edu-primary)] transition-colors">{l.title}</h4>
                    <p className="text-xs text-neutral-500 mt-1">{renderInline(l.desc ?? '')}</p>
                  </div>
                  <span className="text-xs font-bold text-[color:var(--edu-primary)] mt-4 flex items-center gap-1">Read Message →</span>
                </Link>
              );
            })}
          </div>
        </article>
      );

    case 'stepCards': {
      const cols =
        (s.columnsCount as number) === 5
          ? 'md:grid-cols-5'
          : (s.columnsCount as number) === 4
            ? 'sm:grid-cols-2 lg:grid-cols-4'
            : 'sm:grid-cols-2 lg:grid-cols-3';
      return (
        <section className="space-y-6">
          {(s.tag || s.heading) && (
            <div className={s.centered ? 'text-center max-w-2xl mx-auto' : ''}>
              {s.tag && (
                <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--edu-primary)]">{s.tag}</span>
              )}
              {s.heading && <h2 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 mt-1">{s.heading}</h2>}
              {s.sub && <p className="text-xs sm:text-sm text-gray-600 mt-2">{renderInline(s.sub)}</p>}
            </div>
          )}
          <div className={`grid grid-cols-1 ${cols} gap-4`}>
            {(s.items ?? []).map((raw, idx) => {
              const it = (typeof raw === 'string' ? { title: raw } : raw) as Record<string, string>;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-[color:var(--edu-primary)] transition-colors"
                >
                  <div>
                    {it.num && <div className="text-2xl font-black text-[color:var(--edu-primary)]/30 mb-2 font-mono">{it.num}</div>}
                    {it.badge && (
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          it.badgeTone === 'green'
                            ? 'bg-emerald-100 text-emerald-800'
                            : it.badgeTone === 'blue'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {it.badge}
                      </span>
                    )}
                    <h3 className={`font-bold text-gray-900 text-sm ${it.num ? 'mb-2' : 'mt-3 mb-1'}`}>{it.title}</h3>
                    {it.sub && <p className="text-[11px] text-gray-400 font-medium mb-3">{it.sub}</p>}
                    <p className="text-xs text-gray-600 leading-relaxed">{renderInline(it.desc ?? '')}</p>
                  </div>
                  {it.footer && (
                    <div
                      className={`mt-4 pt-3 border-t border-gray-100 text-[11px] font-semibold ${
                        it.footerTone === 'green' ? 'text-emerald-600' : 'text-[color:var(--edu-primary)]'
                      }`}
                    >
                      {it.footer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      );
    }

    case 'checkCards':
      {const header = s.tag || s.heading || s.sub;
      return header ? (
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
          <SectionHeader tag={s.tag} heading={s.heading} />
          {!!s.paragraphs?.length && (
            <div className="text-sm text-neutral-600 leading-relaxed font-roboto space-y-3">
              {s.paragraphs.map((p, i) => (
                <p key={i}>{renderInline(p)}</p>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(s.items ?? []).map((raw, idx) => renderCheckCard(raw, idx))}
          </div>
        </article>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(s.items ?? []).map((raw, idx) => renderCheckCard(raw, idx))}
        </section>
      );}

    case 'logoWall':
      return (
        <section className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            {s.tag && <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--edu-primary)]">{s.tag}</span>}
            {s.heading && <h2 className="text-3xl font-black font-heading text-gray-900 mt-1">{s.heading}</h2>}
            {s.sub && <p className="text-xs sm:text-sm text-gray-600 mt-2">{renderInline(s.sub)}</p>}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {(s.items ?? []).map((raw, idx) => {
              const it = (typeof raw === 'string' ? { name: raw } : raw) as Record<string, string>;
              return it.src ? (
                <div
                  key={idx}
                  className="h-24 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center p-3 hover:border-gray-400 transition-colors"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={it.src}
                      alt={it.alt || it.name || 'Recruiter'}
                      fill
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      sizes="(max-width: 768px) 33vw, 20vw"
                    />
                  </div>
                </div>
              ) : (
                <div
                  key={idx}
                  className="h-24 bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center justify-center p-3 text-center hover:border-gray-400 transition-colors"
                >
                  <span className="font-black text-xs sm:text-sm text-gray-800 tracking-tight">{it.name}</span>
                  {it.cat && <span className="text-[10px] text-gray-500 font-medium uppercase mt-0.5">{it.cat}</span>}
                </div>
              );
            })}
          </div>
        </section>
      );

    case 'contactCards':
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(s.items ?? []).map((raw, idx) => {
            const card = (typeof raw === 'string' ? { title: raw } : raw) as Record<string, unknown>;
            const Icon = iconFor(card.icon as string);
            const lines = (card.lines ?? []) as Array<Record<string, unknown>>;
            const tone = (card.iconTone as string) ?? 'red';
            const cLabel = (card.label as string) ?? '';
            const cTitle = (card.title as string) ?? '';
            const cBtnText = (card.btnText as string) ?? '';
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-${
                  tone === 'blue' ? 'blue-600' : tone === 'purple' ? 'purple-600' : '[color:var(--edu-primary)]'
                } transition-colors`}
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                      tone === 'blue'
                        ? 'bg-blue-100 text-blue-600'
                        : tone === 'purple'
                          ? 'bg-purple-100 text-purple-600'
                          : 'bg-orange-100 text-[color:var(--edu-primary)]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {cLabel && (
                    <span className="text-[11px] font-mono font-bold text-gray-500 uppercase">{cLabel}</span>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mt-1 mb-4">{cTitle}</h3>
                  <div className="space-y-2 text-xs text-gray-700">
                    {lines.map((ln, j) => {
                      if (ln.dividerBefore) {
                        return (
                          <div key={j} className="pt-2 border-t border-gray-100 space-y-1">
                            {renderLine(ln)}
                          </div>
                        );
                      }
                      return <div key={j}>{renderLine(ln)}</div>;
                    })}
                  </div>
                </div>
                {cBtnText && !!card.btnHref && (
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <a
                      href={card.btnHref as string}
                      target={(card.btnHref as string).startsWith('http') ? '_blank' : undefined}
                      rel={(card.btnHref as string).startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`w-full py-2.5 px-4 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm ${
                        card.btnTone === 'emerald'
                          ? 'bg-emerald-600 hover:bg-emerald-500'
                          : card.btnTone === 'light'
                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                            : 'bg-gray-900 hover:bg-gray-800'
                      }`}
                    >
                      <span>{cBtnText}</span> →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );

    case 'inquiryForm':
      return <InquiryForm s={s} />;

    case 'mapEmbed':
      return (
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm overflow-hidden">
          <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden">
            <iframe
              title={s.heading || 'Campus Location Map'}
              src={s.embedUrl ?? ''}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      );

    case 'docCards':
      {const dHead = s.tag || s.heading;
      return (
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
          {dHead && <SectionHeader tag={s.tag} heading={s.heading} />}
          {!!s.paragraphs?.length && (
            <div className="text-sm text-neutral-600 leading-relaxed font-roboto space-y-3">
              {s.paragraphs.map((p, i) => (
                <p key={i}>{renderInline(p)}</p>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(s.items ?? []).map((raw, idx) => {
              const d = (typeof raw === 'string' ? { title: raw } : raw) as Record<string, string>;
              const DIcon = iconFor(d.icon);
              return (
                <div
                  key={idx}
                  className={`p-5 border border-gray-200 rounded-xl flex flex-col justify-between hover:border-${
                    d.iconTone === 'blue' ? 'gray-900' : '[color:var(--edu-primary)]'
                  } transition-colors`}
                >
                  <div className="flex items-start gap-3">
                    <DIcon className={`w-8 h-8 shrink-0 ${d.iconTone === 'blue' ? 'text-blue-600' : 'text-[color:var(--edu-primary)]'}`} />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{d.title}</h4>
                      {d.sub && <p className="text-xs text-gray-500 mt-1">{d.sub}</p>}
                    </div>
                  </div>
                  {d.btnText && d.btnHref && (
                    <a
                      href={d.btnHref}
                      target={d.btnHref.startsWith('http') ? '_blank' : undefined}
                      rel={d.btnHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 text-white text-xs font-bold rounded-lg transition-colors ${
                        d.btnTone === 'dark' ? 'bg-gray-900 hover:bg-gray-800' : 'bg-[color:var(--edu-primary)] hover:bg-[color:var(--edu-primary-dark)]'
                      }`}
                    >
                      {d.iconTone === 'blue' ? <ShieldCheck className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                      {d.btnText}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
          {s.note && <div className="text-[11px] font-mono text-neutral-400">{s.note}</div>}
        </article>
      );}

    case 'placementRadar': {
      const hp = readJson<HomepageData>(HOMEPAGE_FILE, {} as HomepageData);
      return (
        <section>
          {(s.tag || s.heading) && (
            <div className="text-center max-w-2xl mx-auto mb-6">
              {s.tag && <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--edu-primary)]">{s.tag}</span>}
              {s.heading && <h2 className="text-3xl font-black font-heading text-gray-900 mt-1">{s.heading}</h2>}
              {s.sub && <p className="text-xs sm:text-sm text-gray-600 mt-2">{renderInline(s.sub)}</p>}
            </div>
          )}
          <PlacementRadar data={hp.placementRadar} />
        </section>
      );
    }

    default:
      return null;
    }
}

/*
 * Generic CMS content page — hero + ordered sections.
 * layout 'sidebar' (default): narrow main column + SidebarNav.
 * layout 'full': wide container without the sidebar.
 */
export default function CmsContentPage({
  page,
  breadcrumbs,
}: {
  page: PageContent;
  breadcrumbs: Array<{ label: string; href?: string }>;
}) {
  const sections = page.sections ?? [];
  const full = page.layout === 'full';

  return (
    <div className={full ? 'bg-[#f8f9fa] min-h-screen text-[#212529]' : 'bg-[#FAF9F6] min-h-screen'}>
      <SubpageHero
        kicker={page.kicker ?? ''}
        badge={page.badge}
        title={page.title ?? ''}
        subtitle={page.subtitle}
        breadcrumbs={breadcrumbs}
      />

      <div className={full ? 'max-w-7xl mx-auto px-4 py-12 md:py-16' : 'max-w-[1240px] mx-auto px-5 py-12'}>
        {full ? (
          <main className="space-y-12 md:space-y-16">{sections.map((s, i) => <Section key={i} s={s} />)}</main>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <main className="flex-1 space-y-8">
              {sections.map((s, i) => (
                <Section key={i} s={s} />
              ))}
            </main>

            <SidebarNav />
          </div>
        )}
      </div>
    </div>
  );
}

/*
 * Server helper: read a page by slug from pages.json.
 */
export function readCmsPage(slug: string): PageContent {
  const all = readJson<Record<string, PageContent>>(PAGES_FILE, {});
  return all[slug] ?? {};
}
