import React from 'react';

export const EditorialHeader: React.FC = () => {
  return (
    <header className="editorial-top-bar" aria-label="Project identity and archival study reference">
      {/* 1. Minimal top-left identity mark: R / 深紅 */}
      <div className="type-identity-mark" aria-label="RONIN, 深紅 (Crimson)">
        <span className="identity-mark-letter">R</span>
        <span className="identity-mark-slash" aria-hidden="true">/</span>
        <span className="identity-mark-jp" aria-hidden="true">
          深紅
        </span>
      </div>

      {/* 2. Restrained top-right editorial label: AN EXPERIMENT IN STILLNESS */}
      <div className="type-editorial-label" aria-label="An Experiment in Stillness">
        <span>AN EXPERIMENT IN STILLNESS</span>
      </div>
    </header>
  );
};
