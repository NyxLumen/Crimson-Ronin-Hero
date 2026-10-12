# RONIN (深紅) — Project Plan & Architecture Roadmap

A cinematic, single-screen editorial web experience inspired by Japanese ronin culture, solitary crimson sunsets, and quiet atmosphere.

---

## 1. Executive Summary & Aesthetic Tenets

- **Core Subject:** A solitary ronin seated on a secluded islet beside a gnarled pine tree beneath a massive crimson sun.
- **Aesthetic Direction:** Cinematic, restrained, quiet, and editorial. The video footage is the primary visual centerpiece.
- **Typography:** Wide-tracked cinematic serif (`Cinzel` / `Cormorant Garamond`), authentic Japanese literary serif (`Shippori Mincho`), and understated monospace technical metadata (`Space Mono`).
- **Color Palette:**
  - Dark Near-Black (`#0B0809`) — Base foundation canvas.
  - Deep Burgundy (`#240B11`, `#3D131D`) — Atmospheric depth and shadow tones.
  - Muted Vermilion (`#B83A2C`, `#CF4332`) — Sunset crimson accents and Japanese title characters (`深紅`).
  - Warm Ivory (`#FAF6F1`, `#EEE6DC`) — Clean, high-legibility editorial text.
- **Restraint Protocol:** Strictly no generic samurai clip-art, no gratuitous particle showers, no cyber-glitch effects, no heavy 3D canvases, and no excessive decorative borders.

---

## 2. Verified Media Assets & Playback Contract

### 2.1 Video Shot Sequence
The hero loops through three continuous 8.0-second shots in fixed chronological order:

| Order | Shot ID | Shot Name | Discovered Filename | Resolution | FPS | Codec | Duration | File Size |
|---|---|---|---|---|---|---|---|---|
| **1** | `shot-01` | Cinematic Approach | `ronin-shot-01-dolly-zoom_1080p_20261011131841.mp4` | 1920×1080 | 24 | H.264 / AAC | 8.0s | 5.50 MB |
| **2** | `shot-02` | Overhead Island Vista | `Animating_still_water_and_tree_20261011132055.mp4` | 1920×1080 | 24 | H.264 / AAC | 8.0s | 5.45 MB |
| **3** | `shot-03` | Twisted Pine Silhouette | `Wind_moving_pine_tree_foliage_20261011133255.mp4` | 1920×1080 | 24 | H.264 / AAC | 8.0s | 4.05 MB |

- **Composite Video:** `video.mp4` (24.009s, 1920×1080 @ 30fps, 25.76 MB) serves as a continuous reference sequence and fallback.
- **Poster Frames:** Clean keyframes generated at 0.0s for every shot (`public/posters/shot-01-poster.jpg`, `shot-02-poster.jpg`, `shot-03-poster.jpg`), alongside original high-res concept artwork (`ronin-concept.png` and `shot-02-concept.jpg`).

### 2.2 Audio Contract
- **Primary Track:** `track1.mp3` (`Crimden Sunset Contemplation`, 60.048s, 192 kbps MP3, 1.39 MB). Traditional Japanese shakuhachi, koto, and wind drone.
- **Alternate Take:** `track2.mp3` (`Crimden Sunset Contemplation (Take 2)`, 60.048s, 192 kbps MP3, 1.39 MB).
- **Playback Policy:**
  - Audio starts strictly **muted** by default.
  - Video tracks are permanently muted (`video.muted = true`).
  - Audio playback is driven by a separate native HTML5 `<audio>` element that plays continuously across video shot transitions without resetting.
  - Enabling audio occurs solely via an explicit user gesture (sound toggle).
  - Mute/unmute transitions apply smooth volume fading (GSAP curve over 400ms) rather than harsh binary cutoffs.

---

## 3. Implementation Phases Roadmap

### Phase 0: Project Setup & Asset Audit — [COMPLETE]
- [x] Workspace and Git inspection.
- [x] Media asset discovery in workspace and system downloads.
- [x] Full `ffprobe` metadata extraction (resolution, frame rate, duration, codecs, sizes, checksums).
- [x] Verified playback sequence determination.
- [x] Project architecture established: React 19 + TypeScript 5.7 + Vite 6 + GSAP 3.
- [x] Static asset directory structure prepared (`public/media/`, `public/posters/`, `public/fonts/`).
- [x] Types and typed media manifest (`src/types/media.ts`, `src/config/mediaManifest.ts`).
- [x] Design token stylesheets created (`variables.css`, `typography.css`, `main.css`).
- [x] Accessible error fallback and Phase 0 inspection dashboard implemented.
- [x] TypeScript type checking and Vite production build verified.

---

### Phase 1: Full-Screen Video Foundation — [COMPLETE]
- [x] **Single Background Video Element:** Implemented `BackgroundVideo` utilizing exactly one native `<video>` element.
- [x] **Continuous 24-Second Composite:** Configured with `/media/video.mp4`, preserving internal cuts without JavaScript splicing.
- [x] **Autoplay & Mute Policy:** Enabled `autoPlay`, `muted`, `loop`, `playsInline`, `preload="auto"` with graceful autoplay catch handler.
- [x] **Visual Stability & Aspect Ratio:** Full viewport coverage via `object-fit: cover; object-position: center;`, zero black flashes or layout shifts.
- [x] **Poster Fallback:** Reliable initial keyframe rendering using `/posters/shot-01-poster.jpg`.
- [x] **Independent Background Music:** Implemented `BackgroundAudio` using a single `<audio>` element with `/media/track1.mp3`, looping independently of video loops.
- [x] **Functional Sound Control:** User-gesture sound button with smooth GSAP exponential volume fading (0.0 ↔ 0.75), WCAG-accessible `aria-pressed` and `aria-label`.
- [x] **Viewport Shell:** Responsive media container with `overflow: hidden`, `100dvh` mobile viewport support, dark background, and subtle vignette overlay.
- [x] **Reduced Motion & Accessibility:** Integrated `MotionControl` toggle allowing users to pause video motion; visible keyboard focus outlines.
- [x] **Verification:** Production build (`npm run build`) and type check (`npm run type-check`) pass cleanly.

---

### Phase 2: Editorial Hero Composition & Typography — [COMPLETE]
- [x] **Main Title (`RONIN`):** Implemented in `Cinzel` serif, warm ivory (`#EEE6DC`), responsive `clamp(3rem, 7.5vw, 6.25rem)`, balanced `0.22em` tracking and matching `text-indent`. Positioned asymmetrically in the left quadrant to leave the central ronin silhouette and crimson sun completely unobstructed.
- [x] **Japanese Subtitle (`深紅`):** Rendered in authentic `Shippori Mincho` in muted vermilion (`#B83A2C`), placed directly beneath `RONIN` with `0.3em` letter-spacing and clear subordinate visual hierarchy.
- [x] **Editorial Tagline (`THE ART OF STILLNESS`):** Monospaced in `Space Mono`, tracked uppercase, providing a serene typographic anchor.
- [x] **Top Identity & Study Label:** Minimal top-left brandmark (`R / 深紅`) and top-right archival label (`A VISUAL STUDY · 001`).
- [x] **24-Second Sequence Progress Indicator:** Implemented `PlaybackProgress` at the absolute viewport bottom (2px), directly synchronized with `video.currentTime` and `video.duration`, resetting smoothly on loop with accessible `role="progressbar"`.
- [x] **Local Typography & Zero FOUT:** Locally served TTF fonts in `public/fonts/` (`Cinzel`, `Shippori Mincho`, `Space Mono`) with `@font-face` declarations in `typography.css`.
- [x] **Responsive Desktop & Mobile Layouts:** Verified across desktop (1920×1080) and mobile (390×844) viewport captures. Text shadows preserve legibility across shifting video frames.
- [x] **Verification:** `npm run type-check` (0 errors) and `npm run build` (0 warnings/errors) verified.

---

### Phase 2B: Experimental Editorial Art Direction — [COMPLETE]
- [x] **Main Display Font (Bodoni Moda):** Replaced classical Cinzel with high-contrast Didone serif `Bodoni Moda` (optical size 96, weight 600, restrained 0.05em tracking). Downloaded and locally served variable TTF font files (`BodoniModa-VariableFont_opsz,wght.ttf` and `BodoniModa-Italic-VariableFont_opsz,wght.ttf`) in `public/fonts/` with zero FOUT.
- [x] **Japanese Subtitle (`深紅`):** Updated from muted crimson to luminous pale blush (`#F4E8E6`), achieving stark sculptural clarity against dark crimson video frames while preserving authentic `Shippori Mincho` glyphs.
- [x] **Motion Control Removal:** Removed the visible motion pause/play button and unused UI slots. Connected background video autoplay directly to system `prefers-reduced-motion` via `usePrefersReducedMotion` hook.
- [x] **Minimalist Speaker Icon:** Replaced rectangular text button (`Sound // Off`) with a discreet, borderless speaker icon button in the bottom-right corner. Features distinct muted (speaker with slash/cross) and active (speaker with acoustic waves) inline SVGs, 44×44px touch target, WCAG-compliant `aria-pressed` / `aria-label`, and smooth GSAP volume fading (0.0 ↔ 0.75).
- [x] **Archival Study Header:** Updated top-right label from `A VISUAL STUDY · 001` to restrained, carefully tracked `AN EXPERIMENT IN STILLNESS`. Preserved understated `R / 深紅` top-left mark with harmonized pale blush kanji.
- [x] **Right-Side Editorial Statement:** Integrated `BETWEEN THE LAST LIGHT / AND THE FIRST SILENCE.` positioned in the lower-right quadrant on desktop (over dark water, clear of the ronin, hat, sword, and pine tree across all 3 composite shots) and cleanly integrated beneath the title block on mobile.
- [x] **Multi-Shot & Multi-Viewport Verification:** Programmatically verified across Shot 1 (Approach), Shot 2 (Vista), and Shot 3 (Pine Silhouette) on both desktop (1920×1080) and mobile (390×844) viewports. Verified zero horizontal overflow across 320px–2560px screen widths.
- [x] **Build & Accessibility:** Production build and type checks verified with 0 errors.

---

### Phase 2C: Japan Ramen Typography & Asset Cleanup — [COMPLETE]
- [x] **Primary Display Font (Japan Ramen):** Located and integrated `JAPAN RAMEN.otf` (MaknaStudio, OpenType CFF display font) into `public/fonts/` as `JapanRamen.otf` and `JAPAN RAMEN.otf`. Configured `@font-face` in `typography.css`.
- [x] **Typographic Masthead (`RONIN`):** Substantially scaled to `clamp(4.8rem, 13vw, 11rem)` with `line-height: 0.88`, `letter-spacing: 0.05em`, warm ivory coloring (`#FAF6F1`), and deep ambient text shadows. Sits boldly in the left quadrant, terminating at ~39% viewport width to ensure 0% overlap with the ronin silhouette across all video frames.
- [x] **Japanese Subtitle (`深紅`):** Scaled to `clamp(1.8rem, 3.8vw, 3.25rem)` in pale blush (`#F4E8E6`) using `Shippori Mincho` Medium, maintaining authentic Kanji typography with `0.32em` tracking directly beneath `RONIN`.
- [x] **Right-Side Editorial Statement:** Scaled to `clamp(1.25rem, 2.2vw, 2.15rem)` in Japan Ramen with pale blush coloration. Fixed in the lower-right quadrant on desktop (`right: clamp(1.5rem, 6vw, 5.5rem)`, `bottom: clamp(5.25rem, 12vh, 8.5rem)`), resting over dark water and remaining clear of the ronin, hat, sword, sun, and pine foliage. On mobile, cleanly stacks beneath `深紅` with ample clearance above the ronin's conical hat.
- [x] **Archival Header & Mark:** Kept `R / 深紅` understated in the top-left (with `R` rendered in Japan Ramen) and `AN EXPERIMENT IN STILLNESS` in monospace in the top-right.
- [x] **Asset Audit & Removal of Redundant Files:**
  - Audited all files across root, `public/`, and `src/`.
  - Safely deleted 3 root duplicate media files: `./video.mp4`, `./track1.mp3`, `./track2.mp3` (~28.8 MB).
  - Safely deleted 3 unused individual video shot files: `public/media/Animating_still_water_...mp4`, `public/media/ronin-shot-01-dolly-zoom_...mp4`, `public/media/Wind_moving_pine_tree_foliage_...mp4` (~15.2 MB).
  - Safely deleted 1 unused audio alternate take: `public/media/track2.mp3` (~1.4 MB).
  - Safely deleted 4 unused poster and concept images: `public/posters/ronin-concept.png`, `shot-02-concept.jpg`, `shot-02-poster.jpg`, `shot-03-poster.jpg` (~2.75 MB).
  - Safely deleted 4 superseded font files: `public/fonts/Cinzel-Regular.ttf`, `Cinzel-SemiBold.ttf`, `BodoniModa-VariableFont_opsz,wght.ttf`, `BodoniModa-Italic-VariableFont_opsz,wght.ttf` (~423 KB).
  - Total reclaimed storage: **~48.6 MB**.
- [x] **Manifest Synchronization:** Updated `src/config/mediaManifest.ts` to reflect the active composite sequence (`/media/video.mp4`), primary audio (`/media/track1.mp3`), and initial frame poster (`/posters/shot-01-poster.jpg`). Zero broken references remaining.
- [x] **Verification & Quality Gate:** Type check (`tsc --noEmit`) and production build (`vite build`) passed with 0 errors.

---

### Phase 3: Motion Choreography & GSAP Timelines
- **Objectives:**
  - Orchestrate delicate initial entrance timeline (title letter reveal, kanji fade, UI controls slide up).
  - Coordinate shot transition cues (smooth subtitle updates and shot counter shifts).
  - Sound button hover and active micro-animations.
  - Full adherence to `prefers-reduced-motion` (instant display without motion when active).

---

### Phase 4: Production Polish, Performance & Accessibility Verification
- **Objectives:**
  - Lighthouse performance audit: verify LCP optimization (Shot 1 poster prioritized with `<link rel="preload">`).
  - Full keyboard navigation test (`Tab`, `Space`, `Enter` on sound toggle and controls).
  - Screen reader audit (clear ARIA announcements and semantic landmarks).
  - Cross-browser verification (Chrome, Firefox, Safari/WebKit video autoplay quirks).
  - Final production build and bundle size optimization.
