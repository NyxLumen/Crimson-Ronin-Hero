import React, { useState, useCallback } from 'react';
import { BackgroundVideo } from './BackgroundVideo';
import { BackgroundAudio } from './BackgroundAudio';
import { EditorialHeader } from './EditorialHeader';
import { HeroTitleBlock } from './HeroTitleBlock';
import { PlaybackProgress } from './PlaybackProgress';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export const ViewportShell: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const handleVideoProgress = useCallback((percent: number) => {
    setProgressPercent(percent);
  }, []);

  return (
    <main
      className="viewport-shell"
      role="main"
      aria-label="RONIN 深紅 cinematic editorial experience"
    >
      {/* 1. Full-Screen Background Video */}
      <BackgroundVideo
        webmSrc="/media/video.webm"
        mp4Src="/media/video.mp4"
        isPaused={prefersReducedMotion}
        onProgress={handleVideoProgress}
      />

      {/* 2. Restrained Vignette Overlay for Atmospheric Contrast */}
      <div className="vignette-overlay" aria-hidden="true" />

      {/* 3. Minimal Top Editorial Bar: R / 深紅  and  AN EXPERIMENT IN STILLNESS */}
      <EditorialHeader />

      {/* 4. Asymmetric Editorial Title Block & Right-Side Statement */}
      <HeroTitleBlock />

      {/* 5. Discreet Bottom Bar: Small Speaker Icon Toggle */}
      <footer className="editorial-bottom-bar" aria-label="Media playback controls">
        <BackgroundAudio src="/media/track1.mp3" />
      </footer>

      {/* 7. Thin 2px Sequence Progress Indicator */}
      <PlaybackProgress progressPercent={progressPercent} />
    </main>
  );
};
