'use client';

import { useState } from 'react';

export default function GalleryWithLightbox({ photos, title }) {
  const [selected, setSelected] = useState(null);

  // Con 1 sola foto: ancho completo. Con 2+: masonry 2 columnas
  const isSingle = photos.length === 1;

  return (
    <>
      <div className="container">
        <div
          className="photo-gallery"
          style={isSingle ? { columns: 1 } : {}}
        >
          {photos.map(photo => (
            <img
              key={photo.id}
              src={photo.url}
              alt={`${title} - ${photo.name}`}
              loading="lazy"
              onClick={() => setSelected(photo)}
              style={{ cursor: 'zoom-in' }}
            />
          ))}
        </div>
      </div>

      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <span className="lightbox-close" onClick={() => setSelected(null)}>×</span>
          <img
            src={selected.url}
            alt={title}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
