import type { Metadata } from 'next';
import { itiFitter } from '@/components/iti/tradeData';

export const metadata: Metadata = {
  title: itiFitter.seo.title,
  description: itiFitter.seo.description,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'ITI Fitter Trade — NCVT 2-Year Craftsman Training Scheme (CTS 0227)',
  description: itiFitter.seo.description,
  educationalCredentialAwarded: 'National Trade Certificate (NTC), NCVT / DGT, Govt. of India',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'New Horizons Institute of Technology (NHIT), Durgapur',
    url: 'https://nhit.in',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'full-time',
    courseWorkload: 'P2Y',
  },
};

export default function ItiFitterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
