import React from 'react';
import CmsContentPage, { readCmsPage } from '@/components/layout/CmsContentPage';

export default function AntiRaggingCommitteePage() {
  return (
    <CmsContentPage
      page={readCmsPage('anti-ragging-committee')}
      breadcrumbs={[{ label: 'About NHIT', href: '/about' },
        { label: 'Anti-Ragging Committee' }]}
    />
  );
}
