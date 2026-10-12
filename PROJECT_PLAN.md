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

### Phase 2D: Typography Hierarchy Refinement — [COMPLETE]
- [x] **Main Title (`RONIN`):** Tuned Japan Ramen display masthead down by ~8% to `clamp(4.4rem, 11.8vw, 10.1rem)` (mobile: `clamp(2.85rem, 13.5vw, 4.8rem)`), restoring negative space and breathing room while preserving sculptural letterforms, `line-height: 0.88`, and `0.05em` tracking. Remains strictly confined to the left quadrant, ending at ~39% viewport width.
- [x] **Japanese Subtitle (`深紅`):** Tightened vertical separation directly beneath `RONIN` with `margin-top: clamp(0.2rem, 0.5vw, 0.45rem)` in Shippori Mincho Medium (`clamp(1.5rem, 3.2vw, 2.75rem)`), forming a cohesive, aligned title lockup in pale blush (`#F4E8E6`) with `0.28em` tracking.
- [x] **Right-Side Editorial Counterpoint:** Replaced Japan Ramen on `BETWEEN THE LAST LIGHT / AND THE FIRST SILENCE.` with authentic Japanese literary serif **Shippori Mincho** (`font-family: var(--font-serif-jp)`). Switched to sentence case (*Between the last light / and the first silence.*) at `clamp(0.95rem, 1.35vw, 1.45rem)` with generous line leading (`1.75`), subtle letter-spacing (`0.06em`), and pale blush coloration. Eliminates visual competition with `RONIN` while providing a serene poetic counterpoint.
- [x] **Placement & Video Clearance:** Maintained clear right-aligned positioning (`right: clamp(1.5rem, 6vw, 5.5rem)`, `bottom: clamp(5.25rem, 11vh, 8.25rem)`) over dark water reflections, fully unobstructed by the ronin, sword, sun, or pine tree across all 3 shots.
- [x] **Sound Control Refinement:** Modestly increased visible speaker icon SVG from 20×20px to 24×24px with a 48×48px accessible circular click target (`padding: 12px`), distinct muted/active states, and full GSAP exponential volume fading (0.0 ↔ 0.75).
- [x] **Verification & Quality Gate:** Verified across Shot 1, Shot 2, and Shot 3 on desktop (1920×1080) and mobile (390×844) viewports. Full audio interaction test verified. `npm run type-check` (0 errors) and `npm run build` (0 warnings/errors) verified.

---

### Phase 3: WebM Optimization & Black-to-Video Reveal — [COMPLETE]
- [x] **Composition & Art Direction Preservation:**
  - Preserved the approved Didone Japan Ramen masthead (`RONIN`), pale blush kanji (`深紅`), literary counterpoint (*Between the last light / and the first silence.*), minimal header (`R / 深紅` and `AN EXPERIMENT IN STILLNESS`), speaker icon, and bottom progress indicator.
  - Zero UI entrance animations or GSAP text timelines added; zero visual composition changes introduced.
  - Desktop (1920×1080) and mobile (390×844) layouts verified.
- [x] **Existing Video Inspection (`public/media/video.mp4`):**
  - **Duration:** 24.009s (video stream 24.000s, 720 frames; audio stream 24.009s, 1036 frames).
  - **Dimensions & Aspect Ratio:** 1920×1080 (16:9).
  - **Frame Rate:** 30.0 fps progressive (`r_frame_rate=30/1`).
  - **Video Codec:** H.264 / AVC (High Profile, level 40, `yuv420p`, tv range, BT.709 color space/transfer/primaries).
  - **Video Bitrate:** 8,901,242 bps (~8.90 Mbps).
  - **Audio Stream:** AAC (LC), 44100 Hz, stereo, 64,642 bps (~64.6 kbps).
  - **Original File Size:** 26,919,525 bytes (26.92 MB / 25.67 MiB).
  - **Keyframe Structure:** Regular IDR keyframes every 3.0s (at 0.0s, 3.0s, 6.0s, 9.0s, 12.0s, 15.0s, 18.0s, 21.0s), corresponding to a fixed GOP of 90 frames.
- [x] **VP9 WebM Encoding & Compression:**
  - **Encoding Command:**
    ```bash
    ffmpeg -y -i public/media/video.mp4 \
      -c:v libvpx-vp9 -crf 30 -b:v 0 -pix_fmt yuv420p \
      -c:a libopus -b:a 96k -deadline good -cpu-used 2 -row-mt 1 \
      public/media/video.webm
    ```
  - **Resolution & Frame Rate:** 1920×1080 @ 30.0 fps, 24.000s video stream, perfectly matching original sequence.
  - **Color Fidelity:** `yuv420p`, BT.709 color primaries, transfer characteristics, and matrix coefficients.
  - **Audio Track:** Faithful Opus stereo encoding at 48000 Hz, permanently muted in website background video (`video.muted = true`).
  - **Original Size:** 26,919,525 bytes (26.92 MB).
  - **WebM Size:** 13,006,694 bytes (13.01 MB).
  - **Payload Reduction:** **13,912,831 bytes (-51.68% reduction)** — more than cut in half.
- [x] **Visual Fidelity & Loop Verification:**
  - **Shot 1 (Approach / Silhouette, t=2s):** SSIM = 0.959954 (~0.960), PSNR = 41.44 dB (indistinguishable crimson sky gradient and dark silhouette).
  - **Shot 2 (Overhead Vista, t=11s):** SSIM = 0.952329 (~0.952), PSNR = 38.73 dB (water reflection nuances preserved).
  - **Shot 3 (Pine Foliage, t=20s):** SSIM = 0.951865 (~0.952), PSNR = 40.88 dB (fine pine needles and branches remain crisp).
  - **Beginning-to-End Loop:** Boundary frames at t=0.0s and t=24.0s verified for clean wrap-around with zero macroblocking artifacts.
- [x] **Native HTML5 Source Selection:**
  - Configured `<video>` with prioritized `<source src="/media/video.webm" type="video/webm" />` and compatibility fallback `<source src="/media/video.mp4" type="video/mp4" />`.
  - Preserved `autoPlay`, `muted`, `loop`, `playsInline`, `preload="auto"`.
  - Verified in Chromium that the browser natively requests `video.webm` and makes zero redundant requests for `video.mp4`.
  - Verified that in environments without WebM VP9 support, the browser cleanly falls through to `video.mp4`.
- [x] **Poster Asset Audit & Total Removal:**
  - Audited all poster references across `BackgroundVideo`, `ViewportShell`, `MediaErrorFallback`, `MediaAuditOverview`, and stylesheets.
  - Removed `poster` attribute from `<video>` element.
  - Removed static preview `<img>` backdrop layer (`.video-fallback-backdrop`) and CSS references.
  - Safely deleted `public/posters/shot-01-poster.jpg` and removed `public/posters/` directory (234.8 KB reclaimed).
  - Page canvas underneath video is guaranteed pure black (`#000000`).
- [x] **Black-to-Video Reveal (`requestVideoFrameCallback`):**
  - Initial state: `.background-video` starts at `opacity: 0` over `#000000` canvas.
  - Video is never revealed prematurely on `loadedmetadata`.
  - Implemented playback confirmation via `onPlaying` / promise resolution coupled with `video.requestVideoFrameCallback` to ensure a decoded frame is presented before triggering visibility.
  - Includes compatible fallback (`currentTime > 0` / `readyState >= 2` via `timeupdate`) for browsers lacking `requestVideoFrameCallback`.
  - Smooth 1,000 ms CSS opacity fade (`cubic-bezier(0.22, 1, 0.36, 1)`) from 0 to 1 without video flicker.
  - Once revealed, opacity remains latched at 1 across loop boundaries (verified at t=24.0s -> t=0.0s).
  - Autoplay block and media error fallbacks implemented gracefully on pure black background with accessible retry controls.
- [x] **Verification & Quality Gate:**
  - Production build (`vite build`) and type check (`tsc --noEmit`) pass with 0 errors.
  - Headless Chrome CDP automated test verified: initial state starts at pure black; WebM is selected; video fades in once playing; opacity latches at 1 across loop wrap; independent audio toggle functions with smooth volume fading (0.0 ↔ 0.75).

