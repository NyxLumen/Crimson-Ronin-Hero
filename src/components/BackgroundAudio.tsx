import React, { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';

interface BackgroundAudioProps {
  readonly src?: string;
  readonly targetVolume?: number;
}

export const BackgroundAudio: React.FC<BackgroundAudioProps> = ({
  src = '/media/track1.mp3',
  targetVolume = 0.75,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isAudioReady, setIsAudioReady] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);

  // Initialize audio element on mount: muted by default, preload metadata
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.muted = true;

    const handleCanPlayThrough = () => {
      setIsAudioReady(true);
    };

    const handleError = () => {
      console.warn(`[RONIN] Failed to load audio stream from ${src}`);
      setAudioError(true);
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('error', handleError);
      gsap.killTweensOf(audio);
    };
  }, [src]);

  // Accessible sound toggle activated strictly by user gesture
  const handleToggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audioError) return;

    if (isMuted) {
      // Unmuting: user gesture unlocks Web Audio / media playback
      audio.muted = false;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            gsap.killTweensOf(audio);
            gsap.to(audio, {
              volume: targetVolume,
              duration: 0.6,
              ease: 'power2.out',
            });
            setIsMuted(false);
          })
          .catch((err: unknown) => {
            console.warn('[RONIN] Audio play blocked or deferred:', err);
          });
      }
    } else {
      // Muting: smooth exponential fade out before mute
      gsap.killTweensOf(audio);
      gsap.to(audio, {
        volume: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          audio.muted = true;
          setIsMuted(true);
        },
      });
    }
  }, [isMuted, audioError, targetVolume]);

  return (
    <>
      {/* Exactly one native HTML5 audio element */}
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        loop
        muted
        aria-hidden="true"
      />

      {/* Functional, accessible sound control button */}
      <button
        type="button"
        onClick={handleToggleSound}
        className={`editorial-control-btn ${!isMuted ? 'is-active' : ''}`}
        aria-label={
          isMuted
            ? 'Enable soundtrack: traditional shakuhachi and koto meditation'
            : 'Mute soundtrack'
        }
        aria-pressed={!isMuted}
        disabled={audioError}
        title={
          audioError
            ? 'Soundtrack unavailable'
            : isMuted
              ? 'Sound: Muted (Click to enable)'
              : 'Sound: Active'
        }
      >
        <span
          className={`status-indicator-dot ${!isMuted ? 'is-active' : ''}`}
          aria-hidden="true"
        />
        <span>
          {audioError
            ? 'Sound N/A'
            : isMuted
              ? 'Sound // Off'
              : 'Sound // Active'}
        </span>
        <span className="sr-only">
          {!isAudioReady ? '(loading audio)' : ''}
        </span>
      </button>
    </>
  );
};
