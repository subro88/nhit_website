import React from 'react';
import type { Metadata } from 'next';
import CmsContentPage, { readCmsPage } from '@/components/layout/CmsContentPage';

export function generateMetadata(): Metadata {
  const page = readCmsPage('placements');
  return {
    title: page.meta?.title ?? 'Training & Placements — NHIT Durgapur',
    description: page.meta?.description,
  };
}

export default function PlacementsPage() {
  const page = readCmsPage('placements');
  return <CmsContentPage page={page} breadcrumbs={[{ label: 'Placements' }]} />;
}
