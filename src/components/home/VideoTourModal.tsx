'use client';

import React, { useEffect } from 'react';

/*
 * Campus tour modal — plays the hero tour video (a YouTube id from the CMS)
 * in a lightbox. ESC or backdrop click closes; body scroll is locked while
 * open.
 */
export default function VideoTourModal({
  youtubeId,
  title,
  onClose,
}: {
  youtubeId: string;
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="edu-tour-modal" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="edu-tour-modal__box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="edu-tour-modal__close" onClick={onClose} aria-label="Close campus tour video">
          <i className="fa fa-times" aria-hidden="true" />
        </button>
        <div className="edu-tour-modal__frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="edu-tour-modal__caption">{title}</p>
      </div>
    </div>
  );
}
