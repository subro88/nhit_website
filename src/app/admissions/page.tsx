import React from 'react';
import type { Metadata } from 'next';
import CmsContentPage, { readCmsPage } from '@/components/layout/CmsContentPage';

export function generateMetadata(): Metadata {
  const page = readCmsPage('admissions');
  return {
    title: page.meta?.title ?? 'Admissions — NHIT Durgapur',
    description: page.meta?.description,
  };
}

export default function AdmissionsPage() {
  const page = readCmsPage('admissions');
  return <CmsContentPage page={page} breadcrumbs={[{ label: 'Admissions' }]} />;
}
