import React from 'react';

/**
 * EditorialStatement Component
 * Second text composition positioned on the right side of the viewport
 * to balance the left-aligned title block with restrained, editorial typography.
 */
export const EditorialStatement: React.FC = () => {
  return (
    <aside className="editorial-statement" aria-label="Editorial inscription">
      <p className="statement-line">Between the last light</p>
      <p className="statement-line">and the first silence.</p>
    </aside>
  );
};
