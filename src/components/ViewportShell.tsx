import React, { useState, useCallback } from 'react';
import { BackgroundVideo } from './BackgroundVideo';
import { BackgroundAudio } from './BackgroundAudio';
import { MotionControl } from './MotionControl';

export const ViewportShell: React.FC = () => {
  const [isVideoPaused, setIsVideoPaused] = useState<boolean>(false);

  const handleToggleVideoPause = useCallback(() => {
    setIsVideoPaused((prev) => !prev);
  }, []);

  return (
    <main
      className="viewport-shell"
      role="main"
      aria-label="RONIN cinematic media experience"
    >
      {/* 1. Full-Screen Background Video */}
      <BackgroundVideo
        src="/media/video.mp4"
        posterSrc="/posters/shot-01-poster.jpg"
        isPaused={isVideoPaused}
      />

      {/* 2. Restrained Vignette Overlay for Atmospheric Contrast */}
      <div className="vignette-overlay" aria-hidden="true" />

      {/* 3. Accessible Controls & Status Bar (Restrained Phase 1 Foundation) */}
      <footer className="phase1-controls-bar" aria-label="Media playback controls">
        <div className="control-pill-group">
          <div
            className="editorial-control-btn"
            style={{
              cursor: 'default',
              pointerEvents: 'none',
              background: 'rgba(11, 8, 9, 0.65)',
            }}
          >
            <span className="type-label-meta" style={{ color: 'var(--color-vermilion-accent)' }}>
              深紅
            </span>
            <span className="type-label-meta" style={{ color: 'var(--color-ivory-dim)' }}>
              RONIN // FOUNDATION
            </span>
          </div>
        </div>

        <nav className="control-pill-group" aria-label="Media toggles">
          <MotionControl
            isPaused={isVideoPaused}
            onTogglePause={handleToggleVideoPause}
          />
          <BackgroundAudio
            src="/media/track1.mp3"
          />
        </nav>
      </footer>
    </main>
  );
};
