'use client';

import { useState, useEffect } from 'react';

export default function StoryBlock({ story, title }) {
  const [lightbox, setLightbox] = useState(null); // { photos, index }

  // Teclado: ESC para cerrar, flechas para navegar
  useEffect(() => {
    const handler = (e) => {
      if (!lightbox) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(l => ({ ...l, index: (l.index + 1) % l.photos.length }));
      if (e.key === 'ArrowLeft') setLightbox(l => ({ ...l, index: (l.index - 1 + l.photos.length) % l.photos.length }));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  const openLightbox = (photos, index) => setLightbox({ photos, index });

  return (
    <>
      <div className="story">
        {story.map((block, i) => {
          if (block.type === 'text') {
            return (
              <div key={i} className="container-narrow">
                <div className="story-text">
                  <p>{block.content}</p>
                </div>
              </div>
            );
          }

          if (block.type === 'photos') {
            const photos = block.items;
            const isFirst = i === story.findIndex(b => b.type === 'photos');

            // Primera foto del proyecto: portada ancho completo
            if (isFirst) {
              return (
                <div key={i}>
                  <img
                    src={photos[0].url}
                    alt={title}
                    className="story-cover"
                    onClick={() => openLightbox(photos, 0)}
                  />
                  {photos.length > 1 && (
                    <PhotoGrid photos={photos.slice(1)} title={title} onOpen={(idx) => openLightbox(photos, idx + 1)} />
                  )}
                </div>
              );
            }

            return (
              <PhotoGrid key={i} photos={photos} title={title} onOpen={(idx) => openLightbox(photos, idx)} />
            );
          }

          return null;
        })}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <span className="lightbox-close" onClick={() => setLightbox(null)}>×</span>
          {lightbox.photos.length > 1 && (
            <>
              <span className="lightbox-nav prev" onClick={e => { e.stopPropagation(); setLightbox(l => ({ ...l, index: (l.index - 1 + l.photos.length) % l.photos.length })); }}>‹</span>
              <span className="lightbox-nav next" onClick={e => { e.stopPropagation(); setLightbox(l => ({ ...l, index: (l.index + 1) % l.photos.length })); }}>›</span>
            </>
          )}
          <img
            src={lightbox.photos[lightbox.index].url}
            alt={title}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function PhotoGrid({ photos, title, onOpen }) {
  const n = photos.length;

  if (n === 1) return (
    <div className="story-photo-single">
      <img src={photos[0].url} alt={title} loading="lazy" onClick={() => onOpen(0)} />
    </div>
  );

  if (n === 2) return (
    <div className="story-photos-duo">
      {photos.map((p, i) => <img key={p.id} src={p.url} alt={title} loading="lazy" onClick={() => onOpen(i)} />)}
    </div>
  );

  if (n === 3) return (
    <div className="story-photos-trio">
      {photos.map((p, i) => <img key={p.id} src={p.url} alt={title} loading="lazy" onClick={() => onOpen(i)} />)}
    </div>
  );

  return (
    <div className="story-photos-many">
      {photos.map((p, i) => <img key={p.id} src={p.url} alt={title} loading="lazy" onClick={() => onOpen(i)} />)}
    </div>
  );
}
