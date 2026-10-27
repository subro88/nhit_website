import React from 'react';
import SubpageHero from '@/components/layout/SubpageHero';
import SidebarNav from '@/components/layout/SidebarNav';
import type { MessageData } from '@/lib/homeTypes';

/*
 * Renders **bold** markers inside CMS paragraphs.
 * Only this safe subset is supported — everything else stays plain text.
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

/*
 * One message card. Used alone (message pages) or stacked
 * (President + Secretary page).
 */
export function MessageArticle({ message }: { message: MessageData }) {
  const paragraphs = message.paragraphs ?? [];

  return (
    <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
      {(message.photo || message.roleTag || message.heading) && (
        <div
          className={`border-b border-neutral-100 pb-6 ${
            message.photo ? 'flex flex-col sm:flex-row gap-6 items-start' : ''
          }`}
        >
          {message.photo && (
            <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-2xl overflow-hidden shrink-0 border-2 border-neutral-200 shadow-md">
              <img
                src={message.photo}
                alt={message.photoAlt || message.heading || ''}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            {message.roleTag && (
              <span className="text-xs font-bold text-[color:var(--edu-primary)] uppercase tracking-wider">
                {message.roleTag}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1 font-montserrat">
              {message.heading}
            </h2>
            {message.orgLine && (
              <p className="text-xs font-semibold text-neutral-500 mt-1">{message.orgLine}</p>
            )}
            {message.approvalChip && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-bold">
                <span>{message.approvalChip}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {message.quoteStyle ? (
        <div className="p-6 rounded-2xl bg-[color:rgba(var(--edu-primary-rgb),0.08)] border-l-4 border-[color:var(--edu-primary)] text-neutral-800 text-sm leading-relaxed space-y-4 font-roboto italic">
          {paragraphs.map((p, i) => (
            <p key={i}>{renderInline(p)}</p>
          ))}
        </div>
      ) : (
        <div className="text-neutral-700 text-sm leading-relaxed space-y-4 font-roboto">
          {paragraphs.map((p, i) => (
            <p key={i}>{renderInline(p)}</p>
          ))}
        </div>
      )}

      <div className="pt-4 border-t border-neutral-100 flex justify-between items-center text-xs text-neutral-500">
        <span>{message.signPlace}</span>
        <span className="text-right">
          <span className="font-bold text-neutral-800 block">{message.signName}</span>
          {message.signOrg && <span className="block mt-0.5">{message.signOrg}</span>}
        </span>
      </div>
    </article>
  );
}

/*
 * Standard single-message page: hero + one card + sidebar nav.
 */
export default function MessagePageLayout({
  message,
  breadcrumbs,
}: {
  message: MessageData;
  breadcrumbs: Array<{ label: string; href?: string }>;
}) {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SubpageHero
        kicker={message.kicker ?? ''}
        badge={message.badge ?? ''}
        title={message.title ?? ''}
        subtitle={message.subtitle ?? ''}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-[1240px] mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 space-y-8">
            <MessageArticle message={message} />
          </main>

          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
