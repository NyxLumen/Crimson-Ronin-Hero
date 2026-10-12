import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MediaErrorFallback } from './MediaErrorFallback';

interface BackgroundVideoProps {
  readonly webmSrc?: string;
  readonly mp4Src?: string;
  readonly src?: string;
  readonly isPaused?: boolean;
  readonly onPlaybackStateChange?: (isPlaying: boolean) => void;
  readonly onProgress?: (progressPercent: number, currentTime: number, duration: number) => void;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  webmSrc = '/media/video.webm',
  mp4Src = '/media/video.mp4',
  src,
  isPaused = false,
  onPlaybackStateChange,
  onProgress,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isRevealedRef = useRef<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState<boolean>(false);

  const fallbackMp4Src = src || mp4Src;

  // Reveal the video once a real frame is rendered and playback has started
  const revealVideo = useCallback(() => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
  }, []);

  const checkFrameAndReveal = useCallback(() => {
    const video = videoRef.current;
    if (!video || isRevealedRef.current) return;

    // Strict requirement: verify real frame available using requestVideoFrameCallback with compatible fallback
    if ('requestVideoFrameCallback' in video && typeof (video as unknown as { requestVideoFrameCallback?: unknown }).requestVideoFrameCallback === 'function') {
      (video as unknown as { requestVideoFrameCallback: (callback: () => void) => number }).requestVideoFrameCallback(() => {
        revealVideo();
      });
    } else {
      // Fallback for browsers without requestVideoFrameCallback
      if (video.currentTime > 0 || video.readyState >= 2) {
        revealVideo();
      } else {
        const handleFirstFrame = () => {
          if (video.currentTime > 0) {
            video.removeEventListener('timeupdate', handleFirstFrame);
            revealVideo();
          }
        };
        video.addEventListener('timeupdate', handleFirstFrame);
      }
    }
  }, [revealVideo]);

  // Handle native 'playing' event to confirm playback has started
  const handlePlaying = useCallback(() => {
    setIsAutoplayBlocked(false);
    onPlaybackStateChange?.(true);
    checkFrameAndReveal();
  }, [onPlaybackStateChange, checkFrameAndReveal]);

  // Handle loadeddata for reduced-motion scenarios where playback does not autoplay
  const handleLoadedData = useCallback(() => {
    if (isPaused && !isRevealedRef.current) {
      revealVideo();
    }
  }, [isPaused, revealVideo]);

  // Muted autoplay on mount
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
            checkFrameAndReveal();
          })
          .catch((err: unknown) => {
            console.warn('[RONIN] Video autoplay deferred or prevented by browser policy:', err);
            setIsAutoplayBlocked(true);
            onPlaybackStateChange?.(false);
          });
      }
    }
  }, [webmSrc, fallbackMp4Src, isPaused, onPlaybackStateChange, checkFrameAndReveal]);

  // Sync external pause state (e.g. reduced-motion)
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
        checkFrameAndReveal();
      })
      .catch((err: unknown) => {
        console.error('[RONIN] Manual video play failed:', err);
      });
  }, [onPlaybackStateChange, checkFrameAndReveal]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const progressPercent = (video.currentTime / video.duration) * 100;
    onProgress?.(progressPercent, video.currentTime, video.duration);

    // Secondary safety check to trigger reveal once playback is progressing
    if (!isRevealedRef.current && !video.paused && video.currentTime > 0) {
      checkFrameAndReveal();
    }
  }, [onProgress, checkFrameAndReveal]);

  const handleError = useCallback(() => {
    console.error(`[RONIN] Failed to load background video sources: ${webmSrc}, ${fallbackMp4Src}`);
    setHasError(true);
    onPlaybackStateChange?.(false);
  }, [webmSrc, fallbackMp4Src, onPlaybackStateChange]);

  if (hasError) {
    return (
      <div className="video-container">
        <MediaErrorFallback
          mediaType="video"
          assetName={`${webmSrc} / ${fallbackMp4Src}`}
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
      {/* Native HTML5 video element with WebM priority and MP4 fallback */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={handlePlaying}
        onLoadedData={handleLoadedData}
        onTimeUpdate={handleTimeUpdate}
        onError={handleError}
        className={`background-video ${isRevealed ? 'is-revealed' : ''}`}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={fallbackMp4Src} type="video/mp4" />
      </video>

      {/* Autoplay fallback button if browser policy strictly blocked muted autoplay */}
      {isAutoplayBlocked && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
            backgroundColor: '#000000',
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
