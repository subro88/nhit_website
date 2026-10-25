import type { Metadata } from 'next';
import { Montserrat, Roboto_Condensed } from 'next/font/google';
import '@/styles/font-awesome.min.css';
import '@/styles/base.css';
import '@/styles/sections.css';
import '@/styles/placement-radar.css';
import '@/styles/nhit-journey.css';
import '@/styles/institutional-home.css';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
  title: 'The New Horizons Institute of Technology (NHIT) | Durgapur',
  description:
    'AICTE Approved & WBSCTVESD Affiliated premier diploma engineering institute in Durgapur, West Bengal. 6 Specialised Engineering Branches with 80-85% consistent placement record.',
  keywords:
    'NHIT, Durgapur, Polytechnic, Diploma Engineering, JEXPO, VOCLET, AICTE, WBSCTVESD',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${robotoCondensed.variable} edu-js`}
    >
      <body className="antialiased min-h-screen flex flex-col justify-between">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
