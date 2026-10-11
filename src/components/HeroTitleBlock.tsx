import React from 'react';

export const HeroTitleBlock: React.FC = () => {
  return (
    <section className="editorial-title-container" aria-label="Cinematic Title: RONIN 深紅">
      {/* Main Title: RONIN */}
      <h1 className="type-title-hero">
        RONIN
      </h1>

      {/* Japanese Subtitle: 深紅 */}
      <div className="type-subtitle-jp" aria-label="深紅 (Crimson)" style={{ marginTop: '0.65rem' }}>
        深紅
      </div>

      {/* Restrained Supporting Line: THE ART OF STILLNESS */}
      <p className="type-tagline" style={{ marginTop: '1.25rem' }}>
        THE ART OF STILLNESS
      </p>
    </section>
  );
};
