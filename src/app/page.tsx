import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import AboutSection from '@/components/home/AboutSection';
import CountersSection from '@/components/home/CountersSection';
import CourseGridSection from '@/components/home/CourseGridSection';
import OutcomesSection from '@/components/home/OutcomesSection';
import RecruiterWall from '@/components/home/RecruiterWall';
import PlacementRadar from '@/components/home/PlacementRadar';
import CareerJourney from '@/components/journey/CareerJourney';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CampusGallery from '@/components/home/CampusGallery';
import LeadCaptureSection from '@/components/home/LeadCaptureSection';
import CtaBand from '@/components/home/CtaBand';
import { readJson, HOMEPAGE_FILE } from '@/lib/cmsStore';
import type { HomepageData } from '@/lib/homeTypes';

/*
 * The home page renders entirely from src/data/homepage.json, which is
 * edited from the admin panel (/admin/homepage). Sections can be turned
 * off with their "visible" flag.
 */
export default function HomePage() {
  const data = readJson<HomepageData>(HOMEPAGE_FILE, {} as HomepageData);

  const show = (section: { visible?: boolean } | undefined) => section?.visible !== false;

  return (
    <div className="nhit-home-wrapper">
      {/* 1. Hero Slider with 3D Floating Chips */}
      {show(data.hero) && <HeroSlider data={data.hero} />}

      {/* 2. Features Grid (Est. 2007, Affiliation, 40+ Labs, MoUs) */}
      {show(data.features) && <FeaturesGrid data={data.features} />}

      {/* 3. About NHIT & Latest News Ticker */}
      {show(data.about) && <AboutSection data={data.about} ticker={data.ticker} />}

      {/* 4. Animated Counters & SVG Wave Tilt */}
      {show(data.counters) && <CountersSection data={data.counters} />}

      {/* 5. Popular Diploma Courses Grid & NCVT ITI Hub */}
      {show(data.courses) && <CourseGridSection data={data.courses} />}

      {/* 6. Outcomes Infographic (3D Isometric Bar Chart) */}
      {show(data.outcomes) && <OutcomesSection data={data.outcomes} />}

      {/* 7. Recruiters Wall (Logo Cells & Wordmarks) */}
      {show(data.recruiters) && <RecruiterWall data={data.recruiters} />}

      {/* 8. Placement Radar Cockpit Console (Branch Tabs & SVG Trajectory) */}
      {show(data.placementRadar) && <PlacementRadar data={data.placementRadar} />}

      {/* 9. Career Journey (350vh Pinned Interactive Transformation Track) */}
      {show(data.careerJourney) && <CareerJourney data={data.careerJourney} />}

      {/* 10. Testimonials (Alumni & Parents) */}
      {show(data.testimonials) && <TestimonialsSection data={data.testimonials} />}

      {/* 11. Inside NHIT Campus Gallery (12 Photo Figures) */}
      {show(data.gallery) && <CampusGallery data={data.gallery} />}

      {/* 12. Admission Inquiry Lead Capture Form */}
      {show(data.leadForm) && <LeadCaptureSection data={data.leadForm} />}

      {/* 13. Apply CTA Band — accent strip just before the footer */}
      {show(data.ctaBand) && data.ctaBand && <CtaBand data={data.ctaBand} />}
    </div>
  );
}
