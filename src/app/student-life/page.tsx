import React from 'react';
import CmsContentPage, { readCmsPage } from '@/components/layout/CmsContentPage';

export const metadata = {
  title: 'Student Life & Innovation Hubs | Campus Culture — NHIT Durgapur',
  description:
    'Life at NHIT goes beyond textbooks: NEN Entrepreneurship Cell, CSIR-CMERI research track, ISTE and IE(I) technical chapters, British Council Library access, Horizon fest, and sports grounds.',
};

export default function StudentLifePage() {
  const page = readCmsPage('student-life');
  return <CmsContentPage page={page} breadcrumbs={[{ label: 'Student Life' }]} />;
}
