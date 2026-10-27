import React from 'react';
import type { Metadata } from 'next';
import CmsContentPage, { readCmsPage } from '@/components/layout/CmsContentPage';

export function generateMetadata(): Metadata {
  const page = readCmsPage('mandatory-disclosure');
  return {
    title: page.meta?.title ?? 'Mandatory Disclosure — NHIT Durgapur',
    description: page.meta?.description,
  };
}

export default function MandatoryDisclosurePage() {
  const page = readCmsPage('mandatory-disclosure');
  return (
    <CmsContentPage
      page={page}
      breadcrumbs={[{ label: 'About NHIT', href: '/about' }, { label: 'Mandatory Disclosure' }]}
    />
  );
}
