import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MediaErrorFallback } from './MediaErrorFallback';

interface BackgroundVideoProps {
  readonly src?: string;
  readonly posterSrc?: string;
  readonly isPaused?: boolean;
  readonly onPlaybackStateChange?: (isPlaying: boolean) => void;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  src = '/media/video.mp4',
  posterSrc = '/posters/shot-01-poster.jpg',
  isPaused = false,
  onPlaybackStateChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState<boolean>(false);

  // Attempt reliable muted autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict browser requirement: must be muted for autoplay
    video.muted = true;

    if (!isPaused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsAutoplayBlocked(false);
            onPlaybackStateChange?.(true);
          })
          .catch((err: unknown) => {
            console.warn('[RONIN] Video autoplay deferred or prevented by browser policy:', err);
            setIsAutoplayBlocked(true);
            onPlaybackStateChange?.(false);
          });
      }
    }
  }, [src, isPaused, onPlaybackStateChange]);

  // Sync external pause state (e.g. reduced-motion or user control)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    if (isPaused) {
      video.pause();
      onPlaybackStateChange?.(false);
    } else {
      video.play().catch((err: unknown) => {
        console.warn('[RONIN] Video resume interrupted:', err);
      });
      onPlaybackStateChange?.(true);
    }
  }, [isPaused, hasError, onPlaybackStateChange]);

  const handleManualPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video
      .play()
      .then(() => {
        setIsAutoplayBlocked(false);
        onPlaybackStateChange?.(true);
      })
      .catch((err: unknown) => {
        console.error('[RONIN] Manual video play failed:', err);
      });
  }, [onPlaybackStateChange]);

  const handleCanPlay = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    console.error(`[RONIN] Failed to load background video from ${src}`);
    setHasError(true);
    onPlaybackStateChange?.(false);
  }, [src, onPlaybackStateChange]);

  if (hasError) {
    return (
      <div className="video-container">
        <MediaErrorFallback
          mediaType="video"
          assetName={src}
          posterSrc={posterSrc}
          onRetry={() => {
            setHasError(false);
            const video = videoRef.current;
            if (video) {
              video.load();
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="video-container" aria-hidden="true">
      {/* Underlying poster fallback ensures visual stability before frame 1 decodes */}
      {!isLoaded && (
        <img
          src={posterSrc}
          alt=""
          className="video-fallback-backdrop"
          aria-hidden="true"
        />
      )}

      {/* Single native HTML5 video element */}
      <video
        ref={videoRef}
        src={src}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        onError={handleError}
        className={`background-video ${!isLoaded ? 'is-loading' : ''}`}
      />

      {/* Autoplay fallback button if browser strictly blocked muted autoplay */}
      {isAutoplayBlocked && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
            backgroundColor: 'rgba(11, 8, 9, 0.4)',
          }}
        >
          <button
            type="button"
            onClick={handleManualPlay}
            className="editorial-control-btn is-active"
            aria-label="Start video playback"
            style={{ pointerEvents: 'auto' }}
          >
            <span className="status-indicator-dot is-active" />
            Play Cinematic Stream
          </button>
        </div>
      )}
    </div>
  );
};
