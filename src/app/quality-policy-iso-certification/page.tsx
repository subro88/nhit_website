import React from 'react';
import CmsContentPage, { readCmsPage } from '@/components/layout/CmsContentPage';

export default function QualityPolicyPage() {
  return (
    <CmsContentPage
      page={readCmsPage('quality-policy-iso-certification')}
      breadcrumbs={[{ label: 'About NHIT', href: '/about' },
        { label: 'Quality Policy & ISO' }]}
    />
  );
}
