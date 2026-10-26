import React from 'react';
import CmsContentPage, { readCmsPage } from '@/components/layout/CmsContentPage';

export default function RtiProcessOfficerPage() {
  return (
    <CmsContentPage
      page={readCmsPage('rti-process-officer')}
      breadcrumbs={[{ label: 'About NHIT', href: '/about' },
        { label: 'RTI Process & Officer' }]}
    />
  );
}
