'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { disclosureSections } from '@/data/mandatoryDisclosure';

/*
 * Sticky jump navigation for the Mandatory Disclosure page.
 *  - Desktop (>=1024px): sticky sidebar list with scroll-spy highlighting.
 *  - Mobile: sticky chip strip under the header, horizontally scrollable.
 *  - A floating back-to-top button appears after the first screenful.
 *
 * Scroll-spy uses a scroll listener + rAF (not IntersectionObserver) so the
 * "current" section is the one just under the header, matching how readers
 * perceive position in a long statutory document.
 */

export default function DisclosureNav() {
  const [active, setActive] = useState<string>(disclosureSections[0].id);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const marker = 140; /* a section is "current" once its top passes 140px below the viewport top */
      let current: string = disclosureSections[0].id;
      for (const s of disclosureSections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= marker) current = s.id;
      }
      setActive(current);
      setShowTop(window.scrollY > 700);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const jump = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  }, []);

  return (
    <>
      {/* Mobile chip strip */}
      <nav className="disc-chips" aria-label="Jump to disclosure section">
        {disclosureSections.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`disc-chip${active === s.id ? ' is-active' : ''}`}
            onClick={() => jump(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* Desktop sidebar */}
      <aside className="disc-nav" aria-label="Disclosure sections">
        <p className="disc-nav__title">Contents</p>
        {disclosureSections.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`disc-nav__item${active === s.id ? ' is-active' : ''}`}
            onClick={() => jump(s.id)}
          >
            <span className="disc-nav__dot" aria-hidden="true" />
            {s.label}
          </button>
        ))}
      </aside>

      {/* Back to top */}
      <button
        type="button"
        aria-label="Back to top"
        className={`disc-top${showTop ? ' is-shown' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={19} strokeWidth={2.4} />
      </button>
    </>
  );
}
