import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SubpageHero from './SubpageHero';
import SidebarNav from './SidebarNav';
import { CheckCircle, Award } from 'lucide-react';
import { readJson, PAGES_FILE } from '@/lib/cmsStore';
import type { PageContent, PageSection, StatTile } from '@/lib/pageTypes';
import { iconFor } from './iconMap';

/*
 * Renders **bold** markers inside CMS strings.
 */
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
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
  red: 'text-[#FF3115]',
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
        <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">{tag}</span>
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

function Section({ s }: { s: PageSection }) {
  switch (s.type) {
    case 'text':
      return (
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
          <SectionHeader tag={s.tag} heading={s.heading} h2 />
          <div className="text-neutral-700 text-sm leading-relaxed space-y-4 font-roboto">
            {(s.paragraphs ?? []).map((p, i) => (
              <p key={i}>{renderInline(p)}</p>
            ))}
          </div>
          {!!s.photos?.length && (
            <div className="pt-2">
              <PhotoStrip photos={s.photos} style={s.photoStyle ?? 'card'} columns={3} />
            </div>
          )}
          {!!s.stats?.length && <StatBar stats={s.stats} />}
        </article>
      );

    case 'quote':
      return (
        <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
          <SectionHeader tag={s.tag} heading={s.heading} h2 />
          <div className="p-6 rounded-2xl bg-[#FFF0ED] border-l-4 border-[#FF3115] text-neutral-800 text-sm leading-relaxed space-y-3 font-roboto">
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
                  card.labelColor === 'green' ? 'text-[#10B981]' : 'text-[#FF3115]'
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
              </tbody>
            </table>
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
                  <span className="text-[10px] font-bold text-[#FF3115] bg-[#FFF0ED] px-2 py-0.5 rounded shrink-0">
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
                  TILE_COLORS[box.color ?? 'red'] ?? 'text-[#FF3115]'
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
            <div className="w-20 h-20 rounded-2xl bg-[#FF3115] flex items-center justify-center text-white shrink-0 shadow-lg">
              <Award className="w-10 h-10" />
            </div>
          )}
          <div className={`space-y-2 text-center sm:text-left ${s.btnText ? 'flex-1' : ''}`}>
            {s.badge && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-[#ff3115] border border-[#ff3115]/30 mb-1">
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
            <Link
              href={s.btnHref}
              className="shrink-0 px-6 py-3.5 bg-[#ff3115] hover:bg-[#e0260c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>{s.btnText}</span>
              <Award className="w-4 h-4" />
            </Link>
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
                    : 'bg-[#FFF0ED] text-[#FF3115]';
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
                  <span className="text-xs font-bold uppercase tracking-wider text-[#ff3115]">{s.tag}</span>
                )}
                {s.heading && <h2 className="text-2xl font-bold font-heading text-gray-900 mt-1">{s.heading}</h2>}
                {s.sub && <p className="text-xs text-gray-500 mt-1">{s.sub}</p>}
              </div>
              {s.linkText && s.linkHref && (
                <Link href={s.linkHref} className="text-xs font-bold text-[#ff3115] hover:underline">
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
            {s.tag && <span className="text-xs font-bold uppercase tracking-wider text-[#ff3115]">{s.tag}</span>}
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
                  style={{ borderTop: `4px solid ${h.accent || '#ff3115'}` }}
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
                        style={{ backgroundColor: h.accent || '#ff3115' }}
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
                          style={{ backgroundColor: t.accent || '#ff3115' }}
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
                    className="flex-1 py-3 px-4 rounded-xl bg-gray-900 hover:bg-[#ff3115] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <span>View Trade Details &amp; Syllabus</span>
                    <Award className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/admissions"
                    className="py-3 px-5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#ff3115] text-xs font-bold transition-colors"
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
                  <div className="w-16 h-10 rounded-lg bg-[#FF3115] text-white flex items-center justify-center font-black text-sm tracking-wide shrink-0">
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
              <div className="w-10 h-10 rounded-xl bg-[#FFF0ED] text-[#FF3115] flex items-center justify-center font-bold text-xl mb-4">
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
                  className="group p-5 rounded-xl border border-neutral-200 hover:border-[#FF3115] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl mb-2">{l.emoji || '📄'}</div>
                    <h4 className="font-bold text-sm text-neutral-900 group-hover:text-[#FF3115] transition-colors">{l.title}</h4>
                    <p className="text-xs text-neutral-500 mt-1">{renderInline(l.desc ?? '')}</p>
                  </div>
                  <span className="text-xs font-bold text-[#FF3115] mt-4 flex items-center gap-1">Read Message →</span>
                </Link>
              );
            })}
          </div>
        </article>
      );

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
