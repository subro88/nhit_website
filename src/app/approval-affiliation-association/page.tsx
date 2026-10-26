import React from 'react';
import CmsContentPage, { readCmsPage } from '@/components/layout/CmsContentPage';

export default function ApprovalAffiliationPage() {
  return (
    <CmsContentPage
      page={readCmsPage('approval-affiliation-association')}
      breadcrumbs={[{ label: 'About NHIT', href: '/about' },
        { label: 'Approvals & MoUs' }]}
    />
  );
}
