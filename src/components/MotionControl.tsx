import React from 'react';

interface MotionControlProps {
  readonly isPaused: boolean;
  readonly onTogglePause: () => void;
}

export const MotionControl: React.FC<MotionControlProps> = ({
  isPaused,
  onTogglePause,
}) => {
  return (
    <button
      type="button"
      onClick={onTogglePause}
      className={`editorial-control-btn ${isPaused ? 'is-active' : ''}`}
      aria-label={isPaused ? 'Resume background video motion' : 'Pause background video motion'}
      aria-pressed={isPaused}
      title={isPaused ? 'Motion: Paused (Click to resume)' : 'Motion: Playing (Click to pause)'}
    >
      <span
        className={`status-indicator-dot ${!isPaused ? 'is-active' : ''}`}
        aria-hidden="true"
      />
      <span>{isPaused ? 'Motion // Paused' : 'Motion // Playing'}</span>
    </button>
  );
};
