import React from 'react';
import { EditorialStatement } from './EditorialStatement';

export const HeroTitleBlock: React.FC = () => {
  return (
    <section className="editorial-title-container" aria-label="Cinematic Title: RONIN 深紅">
      {/* Main Title: RONIN in Didone display */}
      <h1 className="type-title-hero">
        RONIN
      </h1>

      {/* Japanese Subtitle: 深紅 in warm ivory/pale blush */}
      <div className="type-subtitle-jp" aria-label="深紅 (Crimson)">
        深紅
      </div>

      {/* Right-Side Editorial Statement (Fixed lower-right on desktop, flows under title on mobile) */}
      <EditorialStatement />
    </section>
  );
};
