import React, { useRef, useEffect, useState } from 'react';

interface PlaybackProgressProps {
  readonly progressPercent: number;
}

export const PlaybackProgress: React.FC<PlaybackProgressProps> = ({ progressPercent }) => {
  const lastProgressRef = useRef<number>(progressPercent);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  useEffect(() => {
    // Detect loop wrap-around (progress drops by more than 50%)
    if (progressPercent < lastProgressRef.current - 50) {
      setIsResetting(true);
      const timer = setTimeout(() => {
        setIsResetting(false);
      }, 50);
      lastProgressRef.current = progressPercent;
      return () => clearTimeout(timer);
    }

    lastProgressRef.current = progressPercent;
    return undefined;
  }, [progressPercent]);

  return (
    <div
      role="progressbar"
      aria-label="Cinematic video sequence playback position"
      aria-valuenow={Math.round(progressPercent)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="video-progress-track"
    >
      <div
        className={`video-progress-fill ${isResetting ? 'is-resetting' : ''}`}
        style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
      />
    </div>
  );
};
