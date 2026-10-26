import React from 'react';
import CmsContentPage, { readCmsPage } from '@/components/layout/CmsContentPage';

export const metadata = {
  title: 'About NHIT Durgapur | New Horizons Institute of Technology',
  description:
    "About The New Horizons Institute of Technology — one of Eastern India's largest diploma engineering institutes, est. 2007, with six disciplines, ITI trades and 40+ laboratories.",
};

export default function AboutPage() {
  const page = readCmsPage('about');
  return <CmsContentPage page={page} breadcrumbs={[{ label: 'About NHIT' }]} />;
}
