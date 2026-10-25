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

export default function HomePage() {
  return (
    <div className="nhit-home-wrapper">
      {/* 1. Hero Slider with 3D Floating Chips */}
      <HeroSlider />

      {/* 2. Features Grid (Est. 2007, Affiliation, 40+ Labs, MoUs) */}
      <FeaturesGrid />

      {/* 3. About NHIT & Latest News Ticker */}
      <AboutSection />

      {/* 4. Animated Counters & SVG Wave Tilt */}
      <CountersSection />

      {/* 5. Popular Diploma Courses Grid & NCVT ITI Hub */}
      <CourseGridSection />

      {/* 6. Outcomes Infographic (3D Isometric Bar Chart) */}
      <OutcomesSection />

      {/* 7. Recruiters Wall (Logo Cells & Wordmarks) */}
      <RecruiterWall />

      {/* 8. Placement Radar Cockpit Console (Branch Tabs & SVG Trajectory) */}
      <PlacementRadar />

      {/* 9. Career Journey (350vh Pinned Interactive Transformation Track) */}
      <CareerJourney />

      {/* 10. Testimonials (Alumni & Parents) */}
      <TestimonialsSection />

      {/* 11. Inside NHIT Campus Gallery (12 Photo Figures) */}
      <CampusGallery />

      {/* 12. Admission Inquiry Lead Capture Form */}
      <LeadCaptureSection />
    </div>
  );
}
