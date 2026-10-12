import React from 'react';
import { MEDIA_MANIFEST } from '../config/mediaManifest';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export const MediaAuditOverview: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 1.5rem 5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '3.5rem',
      }}
    >
      {/* Editorial Header */}
      <header
        style={{
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <span
            className="type-label-meta"
            style={{
              color: 'var(--color-vermilion-accent)',
              border: '1px solid var(--color-border-vermilion)',
              padding: '0.25rem 0.6rem',
              borderRadius: '2px',
            }}
          >
            Phase 0 • Asset Audit & Foundation
          </span>
          <span className="type-label-meta" style={{ color: 'var(--color-ivory-dim)' }}>
            Reduced Motion: {prefersReducedMotion ? 'Enabled (System)' : 'Disabled'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', flexWrap: 'wrap' }}>
          <h1 className="type-title-hero" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            RONIN
          </h1>
          <span className="type-subtitle-jp" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            深紅
          </span>
        </div>

        <p className="type-body" style={{ maxWidth: '680px', color: 'var(--color-ivory-muted)' }}>
          A cinematic single-screen experience inspired by Japanese ronin culture, solitude,
          and crimson sunsets. Phase 0 inspects workspace assets, verifies technical metadata,
          and establishes a production-grade React + TypeScript + Vite foundation.
        </p>
      </header>

      {/* Art Direction Color Palette Verification */}
      <section aria-labelledby="palette-heading">
        <div style={{ marginBottom: '1.25rem' }}>
          <span className="type-label-meta">Art Direction</span>
          <h2 id="palette-heading" className="type-heading-section" style={{ marginTop: '0.25rem' }}>
            Color Harmony & Material Tokens
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            { name: 'Warm Ivory', hex: '#EEE6DC', var: '--color-ivory-warm', role: 'Primary Typography' },
            { name: 'Muted Vermilion', hex: '#B83A2C', var: '--color-vermilion-muted', role: 'Crimson Accent & Kanji' },
            { name: 'Deep Burgundy', hex: '#240B11', var: '--color-burgundy-deep', role: 'Shadows & Atmosphere' },
            { name: 'Dark Near-Black', hex: '#0B0809', var: '--color-bg-base', role: 'Base Background Canvas' },
          ].map((token) => (
            <div
              key={token.name}
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '4px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  height: '48px',
                  borderRadius: '2px',
                  backgroundColor: token.hex,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>{token.name}</p>
                <p className="type-label-meta" style={{ fontSize: '0.68rem', color: 'var(--color-ivory-dim)', marginTop: '2px' }}>
                  {token.hex} • {token.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Shots Sequence Audit */}
      <section aria-labelledby="shots-heading">
        <div style={{ marginBottom: '1.25rem' }}>
          <span className="type-label-meta">Video Playback Sequence (Verified Master Composite)</span>
          <h2 id="shots-heading" className="type-heading-section" style={{ marginTop: '0.25rem' }}>
            Verified Video Shot Inventory
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {MEDIA_MANIFEST.shots.map((shot) => (
            <article
              key={shot.id}
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '4px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '16/9', backgroundColor: '#000' }}>
                <img
                  src={shot.posterSrc}
                  alt={`Poster for Shot ${shot.shotNumber}: ${shot.title}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  className="type-label-meta"
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    backgroundColor: 'rgba(11, 8, 9, 0.85)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '2px',
                    color: 'var(--color-vermilion-accent)',
                    border: '1px solid var(--color-border-vermilion)',
                  }}
                >
                  Shot 0{shot.shotNumber} • {shot.durationSeconds.toFixed(1)}s
                </span>
                <span
                  className="type-subtitle-jp"
                  style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    right: '0.75rem',
                    backgroundColor: 'rgba(11, 8, 9, 0.85)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '2px',
                    fontSize: '1rem',
                  }}
                >
                  {shot.japaneseTitle}
                </span>
              </div>

              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                <div>
                  <h3 className="type-heading-section" style={{ fontSize: '1.05rem', letterSpacing: '0.12em' }}>
                    {shot.title}
                  </h3>
                  <p className="type-body" style={{ fontSize: '0.82rem', marginTop: '0.25rem' }}>
                    {shot.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                    fontSize: '0.72rem',
                  }}
                  className="type-label-meta"
                >
                  <div>
                    <span style={{ color: 'var(--color-ivory-dim)' }}>Specs: </span>
                    <span>{shot.dimensions.width}×{shot.dimensions.height} @ {shot.fps} fps</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-ivory-dim)' }}>Codec: </span>
                    <span>{shot.codecs.video}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-ivory-dim)' }}>Size: </span>
                    <span>{(shot.fileSizeBytes / (1024 * 1024)).toFixed(2)} MB</span>
                  </div>
                  <div style={{ wordBreak: 'break-all' }}>
                    <span style={{ color: 'var(--color-ivory-dim)' }}>Source: </span>
                    <span style={{ color: 'var(--color-ivory-warm)' }}>{shot.originalFilename}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Audio & Composite Audit */}
      <section aria-labelledby="audio-heading">
        <div style={{ marginBottom: '1.25rem' }}>
          <span className="type-label-meta">Background Music & Composite Montage</span>
          <h2 id="audio-heading" className="type-heading-section" style={{ marginTop: '0.25rem' }}>
            Audio Tracks & Full Composite
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {MEDIA_MANIFEST.audioTracks.map((track) => (
            <div
              key={track.id}
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '4px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  className="type-label-meta"
                  style={{ color: 'var(--color-vermilion-accent)' }}
                >
                  {track.id === 'track-01' ? 'Primary Audio Track' : 'Alternate Take'}
                </span>
                <span className="type-label-meta" style={{ color: 'var(--color-ivory-dim)' }}>
                  {track.durationSeconds.toFixed(1)}s • {track.bitrateKbps} kbps
                </span>
              </div>
              <div>
                <h3 className="type-heading-section" style={{ fontSize: '1rem', letterSpacing: '0.1em' }}>
                  {track.title}
                </h3>
                <p className="type-body" style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  {track.genre}
                </p>
              </div>
              <div
                className="type-label-meta"
                style={{
                  fontSize: '0.72rem',
                  borderTop: '1px solid var(--color-border-subtle)',
                  paddingTop: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.3rem',
                }}
              >
                <div>
                  <span style={{ color: 'var(--color-ivory-dim)' }}>Audio Stream: </span>
                  <span>{track.format} ({track.sampleRate} Hz, Stereo)</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-ivory-dim)' }}>File: </span>
                  <span style={{ color: 'var(--color-ivory-warm)' }}>{track.src}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Composite Reference Video */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: '4px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="type-label-meta" style={{ color: 'var(--color-vermilion-accent)' }}>
                Full Stitched Composite
              </span>
              <span className="type-label-meta" style={{ color: 'var(--color-ivory-dim)' }}>
                {MEDIA_MANIFEST.composite.durationSeconds.toFixed(1)}s • 30 fps
              </span>
            </div>
            <div>
              <h3 className="type-heading-section" style={{ fontSize: '1rem', letterSpacing: '0.1em' }}>
                Seamless 3-Shot Continuous Stream
              </h3>
              <p className="type-body" style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                Combines Shots 1, 2, and 3 in sequence. Serves as fallback baseline or continuous loop reference.
              </p>
            </div>
            <div
              className="type-label-meta"
              style={{
                fontSize: '0.72rem',
                borderTop: '1px solid var(--color-border-subtle)',
                paddingTop: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
              }}
            >
              <div>
                <span style={{ color: 'var(--color-ivory-dim)' }}>Resolution: </span>
                <span>{MEDIA_MANIFEST.composite.dimensions.width}×{MEDIA_MANIFEST.composite.dimensions.height}</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-ivory-dim)' }}>Size: </span>
                <span>{(MEDIA_MANIFEST.composite.fileSizeBytes / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contract Verification Summary */}
      <footer
        style={{
          backgroundColor: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: '4px',
          padding: '1.5rem',
        }}
      >
        <span className="type-label-meta" style={{ color: 'var(--color-vermilion-accent)' }}>
          Phase 1 Handoff Contract
        </span>
        <h3 className="type-heading-section" style={{ fontSize: '1.1rem', margin: '0.5rem 0 1rem' }}>
          Playback Specifications Ready for Implementation
        </h3>
        <ul
          className="type-body"
          style={{
            fontSize: '0.85rem',
            paddingLeft: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <li>
            <strong>Sequential Video Loop:</strong> Three shots play in order (Approach → Island Overhead → Twisted Pine).
            Native HTML5 video, inline, muted, cross-faded with pre-buffering to eliminate black flashes.
          </li>
          <li>
            <strong>Autonomous Background Music:</strong> Separate HTML5 audio element, starts muted, unmuted exclusively via explicit user interaction with smooth GSAP volume fading.
          </li>
          <li>
            <strong>Art Direction Integrity:</strong> Cinematic editorial typography, warm ivory palette, deep burgundy atmosphere, no decorative visual slop.
          </li>
        </ul>
      </footer>
    </div>
  );
};
