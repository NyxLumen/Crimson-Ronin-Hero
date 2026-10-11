import React from 'react';

export const EditorialHeader: React.FC = () => {
  return (
    <header className="editorial-top-bar" aria-label="Project identity and archival study reference">
      {/* 1. Minimal top-left identity mark: R / 深紅 */}
      <div className="type-identity-mark" aria-label="RONIN, 深紅 (Crimson)">
        <span style={{ fontWeight: 600 }}>R</span>
        <span style={{ color: 'var(--color-ivory-dim)', fontFamily: 'var(--font-mono)' }}>/</span>
        <span style={{ fontFamily: 'var(--font-serif-jp)', color: 'var(--color-vermilion-muted)' }}>
          深紅
        </span>
      </div>

      {/* 2. Small top-right editorial label: A VISUAL STUDY · 001 */}
      <div className="type-editorial-label" aria-label="A Visual Study 001">
        <span>A VISUAL STUDY · 001</span>
      </div>
    </header>
  );
};
