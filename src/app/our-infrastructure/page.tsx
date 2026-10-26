import React from 'react';
import CmsContentPage, { readCmsPage } from '@/components/layout/CmsContentPage';

export const metadata = {
  title: 'Our Infrastructure | Campus & Facilities — NHIT Durgapur',
  description:
    'Explore the NHIT Durgapur campus: 40+ engineering laboratories, central computing hub, library, hostels, transport fleet, healthcare and sports facilities.',
};

export default function OurInfrastructurePage() {
  const page = readCmsPage('our-infrastructure');
  return (
    <CmsContentPage
      page={page}
      breadcrumbs={[{ label: 'About NHIT', href: '/about' }, { label: 'Our Infrastructure' }]}
    />
  );
}
