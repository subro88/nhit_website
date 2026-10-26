import React from 'react';
import type { Metadata } from 'next';
import CmsContentPage, { readCmsPage } from '@/components/layout/CmsContentPage';

export function generateMetadata(): Metadata {
  const page = readCmsPage('about-society');
  return {
    title: page.meta?.title ?? 'About The Sponsoring Society — NHIT Durgapur',
    description: page.meta?.description,
  };
}

export default function AboutSocietyPage() {
  const page = readCmsPage('about-society');
  return (
    <CmsContentPage
      page={page}
      breadcrumbs={[{ label: 'About NHIT', href: '/about' }, { label: 'About Society' }]}
    />
  );
}
