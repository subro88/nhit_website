import type { Metadata } from 'next';
import { Montserrat, Roboto_Condensed } from 'next/font/google';
import '@/styles/font-awesome.min.css';
import '@/styles/base.css';
import '@/styles/shared.css';
import '@/styles/sections.css';
import '@/styles/placement-radar.css';
import '@/styles/nhit-journey.css';
import '@/styles/institutional-home.css';
import '@/styles/about-subpage.css';
import '@/styles/home-enrich.css';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { readJson, HOMEPAGE_FILE } from '@/lib/cmsStore';
import type { BrandData } from '@/lib/homeTypes';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NHIT Durgapur — Best and Top Diploma College in Durgapur | Est. 2007',
  description:
    'The New Horizons Institute of Technology (NHIT), Durgapur — AICTE-approved, WBSCT&VE&SD-affiliated diploma engineering college since 2007. First two-shift diploma college in Eastern India. Up to 94.7% branch-wise placement. Apply for Session 2026–27.',
  keywords:
    'NHIT, best diploma college in Durgapur, top diploma college, Durgapur, Polytechnic, Diploma Engineering, JEXPO, VOCLET, AICTE, WBSCTVESD',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* Site-wide accent palette + header/footer brand, chosen in Admin → Home Page Editor. */
  const homeData = readJson<{ theme?: { palette?: string }; brand?: BrandData }>(HOMEPAGE_FILE, {});
  const palette = homeData?.theme?.palette || 'nhit-red';
  const brand = homeData?.brand;

  return (
    <html
      lang="en"
      data-theme={palette}
      className={`${montserrat.variable} ${robotoCondensed.variable} edu-js`}
      /* Browser extensions (Grammarly, translators, password managers…) inject
         attributes into <html>/<body>; without this flag that reads as a
         hydration mismatch and throws the Next.js dev overlay. */
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen flex flex-col justify-between" suppressHydrationWarning>
        <Header brand={brand} />
        <main className="flex-1">{children}</main>
        <Footer brand={brand} />
      </body>
    </html>
  );
}
