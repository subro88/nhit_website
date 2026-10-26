import React from 'react';
import SubpageHero from '@/components/layout/SubpageHero';
import SidebarNav from '@/components/layout/SidebarNav';
import { MessageArticle } from '@/components/layout/MessagePageLayout';
import { readJson, MESSAGES_FILE } from '@/lib/cmsStore';
import type { MessagesFileData } from '@/lib/homeTypes';

export default function MessagesFromPresidentSecretaryPage() {
  const messages = readJson<MessagesFileData>(MESSAGES_FILE, {} as MessagesFileData);
  const president = messages.president ?? {};
  const secretary = messages.secretary ?? {};

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SubpageHero
        kicker={president.kicker ?? ''}
        badge={president.badge ?? ''}
        title={president.title ?? ''}
        subtitle={president.subtitle ?? ''}
        breadcrumbs={[{ label: 'About NHIT', href: '/about' }, { label: 'President & Secretary' }]}
      />

      <div className="max-w-[1240px] mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 space-y-8">
            <MessageArticle message={president} />
            <MessageArticle message={secretary} />
          </main>

          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
