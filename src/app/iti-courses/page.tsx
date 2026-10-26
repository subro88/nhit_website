import React from 'react';
import CmsContentPage, { readCmsPage } from '@/components/layout/CmsContentPage';

export const metadata = {
  title: 'NCVT ITI Courses | Electrician & Fitter Trades — NHIT Durgapur',
  description:
    'NCVT approved 2-Year Craftsman Training Scheme (CTS) in Electrician and Fitter at NHIT Private ITI Durgapur. Direct admission, 100% placement support, and railway/PSU preparation.',
};

export default function ItiCoursesPage() {
  const page = readCmsPage('iti-courses');
  return <CmsContentPage page={page} breadcrumbs={[{ label: 'ITI Courses' }]} />;
}
