import type { Metadata } from 'next';
import { itiElectrician } from '@/components/iti/tradeData';

export const metadata: Metadata = {
  title: itiElectrician.seo.title,
  description: itiElectrician.seo.description,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'ITI Electrician Trade — NCVT 2-Year Craftsman Training Scheme (CTS 0231)',
  description: itiElectrician.seo.description,
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

export default function ItiElectricianLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
