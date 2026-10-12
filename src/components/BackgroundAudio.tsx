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

      {/* Discreet, accessible speaker icon toggle */}
      <button
        type="button"
        onClick={handleToggleSound}
        className={`sound-icon-btn ${!isMuted ? 'is-active' : ''}`}
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
              : 'Sound: Active (Click to mute)'
        }
      >
        {isMuted ? (
          <svg
            className="sound-icon-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </svg>
        ) : (
          <svg
            className="sound-icon-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
        <span className="sr-only">
          {!isAudioReady ? '(loading audio)' : ''}
        </span>
      </button>
    </>
  );
};
