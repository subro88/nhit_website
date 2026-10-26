import React from 'react';
import SubpageHero from '@/components/layout/SubpageHero';
import SidebarNav from '@/components/layout/SidebarNav';
import { CheckCircle, Award } from 'lucide-react';
import { readJson, PAGES_FILE } from '@/lib/cmsStore';
import type { PageContent, PageSection } from '@/lib/pageTypes';

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(s.boxes ?? []).map((box, i) => (
            <div key={i} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
              <div className="text-xs font-bold text-neutral-900">{box.title}</div>
              <div
                className={`text-lg font-black font-mono ${
                  box.color === 'red' ? 'text-[#FF3115]' : 'text-neutral-900'
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
        <article className="bg-gradient-to-br from-[#151515] to-[#262626] text-white rounded-2xl p-7 sm:p-9 shadow-md flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-[#FF3115] flex items-center justify-center text-white shrink-0 shadow-lg">
            <Award className="w-10 h-10" />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-bold text-lg font-montserrat">{s.heading}</h3>
            {(s.paragraphs ?? []).map((p, i) => (
              <p key={i} className="text-xs text-neutral-300 leading-relaxed font-roboto">
                {p}
              </p>
            ))}
            {s.note && <div className="text-[11px] font-mono text-neutral-400">{s.note}</div>}
          </div>
        </article>
      );

    default:
      return null;
  }
}

/*
 * Generic CMS content page — hero + ordered sections + sidebar.
 */
export default function CmsContentPage({
  page,
  breadcrumbs,
}: {
  page: PageContent;
  breadcrumbs: Array<{ label: string; href?: string }>;
}) {
  const sections = page.sections ?? [];

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SubpageHero
        kicker={page.kicker ?? ''}
        badge={page.badge}
        title={page.title ?? ''}
        subtitle={page.subtitle}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-[1240px] mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 space-y-8">
            {sections.map((s, i) => (
              <Section key={i} s={s} />
            ))}
          </main>

          <SidebarNav />
        </div>
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
