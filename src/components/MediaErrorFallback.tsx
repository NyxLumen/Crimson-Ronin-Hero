import React from 'react';

interface MediaErrorFallbackProps {
  readonly mediaType: 'video' | 'audio';
  readonly assetName: string;
  readonly posterSrc?: string;
  readonly onRetry?: () => void;
}

export const MediaErrorFallback: React.FC<MediaErrorFallbackProps> = ({
  mediaType,
  assetName,
  posterSrc,
  onRetry,
}) => {
  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: 'var(--color-burgundy-deep)',
        border: '1px solid var(--color-border-vermilion)',
        borderRadius: '4px',
        color: 'var(--color-ivory-warm)',
        textAlign: 'center',
        overflow: 'hidden',
        minHeight: '220px',
      }}
    >
      {posterSrc && (
        <img
          src={posterSrc}
          alt={`Poster fallback for ${assetName}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.25,
            filter: 'grayscale(60%)',
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '480px' }}>
        <p className="type-label-meta" style={{ color: 'var(--color-vermilion-accent)', marginBottom: '0.5rem' }}>
          Media Playback Notice
        </p>
        <h3
          className="type-heading-section"
          style={{ fontSize: '1.1rem', marginBottom: '0.75rem', letterSpacing: '0.12em' }}
        >
          {mediaType === 'video' ? 'Video Stream Unavailable' : 'Audio Track Unavailable'}
        </h3>
        <p className="type-body" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          Unable to load asset <code className="type-code-inline">{assetName}</code>.
          The visual layout preserves editorial spacing and poster fallbacks.
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            style={{
              padding: '0.5rem 1.25rem',
              background: 'transparent',
              border: '1px solid var(--color-ivory-muted)',
              color: 'var(--color-ivory-warm)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
            }}
          >
            Retry Connection
          </button>
        )}
      </div>
    </div>
  );
};
