import React, { useState, useCallback } from 'react';
import { BackgroundVideo } from './BackgroundVideo';
import { BackgroundAudio } from './BackgroundAudio';
import { MotionControl } from './MotionControl';
import { EditorialHeader } from './EditorialHeader';
import { HeroTitleBlock } from './HeroTitleBlock';
import { PlaybackProgress } from './PlaybackProgress';

export const ViewportShell: React.FC = () => {
  const [isVideoPaused, setIsVideoPaused] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const handleToggleVideoPause = useCallback(() => {
    setIsVideoPaused((prev) => !prev);
  }, []);

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
        src="/media/video.mp4"
        posterSrc="/posters/shot-01-poster.jpg"
        isPaused={isVideoPaused}
        onProgress={handleVideoProgress}
      />

      {/* 2. Restrained Vignette Overlay for Atmospheric Contrast */}
      <div className="vignette-overlay" aria-hidden="true" />

      {/* 3. Minimal Top Editorial Bar: R / 深紅  and  A VISUAL STUDY · 001 */}
      <EditorialHeader />

      {/* 4. Asymmetric Editorial Title Block: RONIN, 深紅, THE ART OF STILLNESS */}
      <HeroTitleBlock />

      {/* 5. Accessible Media Controls Bar */}
      <footer className="editorial-bottom-bar" aria-label="Media playback controls">
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

      {/* 6. Thin 2px Sequence Progress Indicator */}
      <PlaybackProgress progressPercent={progressPercent} />
    </main>
  );
};
