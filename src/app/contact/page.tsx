import React from 'react';
import type { Metadata } from 'next';
import CmsContentPage, { readCmsPage } from '@/components/layout/CmsContentPage';

export function generateMetadata(): Metadata {
  const page = readCmsPage('contact');
  return {
    title: page.meta?.title ?? 'Contact Us — NHIT Durgapur',
    description: page.meta?.description,
  };
}

export default function ContactPage() {
  const page = readCmsPage('contact');
  return <CmsContentPage page={page} breadcrumbs={[{ label: 'Contact Us' }]} />;
}
