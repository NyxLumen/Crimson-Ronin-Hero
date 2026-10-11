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

### Phase 2: Editorial Hero Composition & Typography
- **Objectives:**
  - Compose single-screen hero layout:
    - Top bar: Minimal brand mark `RONIN` + location/time coordinates.
    - Main center/offset typography: Hero title `RONIN` with generous letter tracking, Japanese kanji `深紅` subtitle.
    - Bottom bar: Status indicator, audio toggle, and ambient status.
  - Subtle cinematic vignette overlay to enhance contrast without obscuring footage.
  - Responsive layout for desktop (16:9 widescreen focus) and mobile (portrait centered focal point).

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
