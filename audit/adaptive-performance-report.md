# Adaptive Performance Report — Suyambu Travels

**System**: Adaptive Frontend Performance Engine  
**Project**: Suyambu Travels React / Vite  
**Date**: August 14, 2026

---

## 1. Engine Architecture

```
src/
├── adaptive/
│   ├── adaptiveConfig.js              # Performance tiers, feature policies, thresholds
│   ├── capabilityDetection.js         # Non-invasive WebGL, CPU cores, memory, DPR detection
│   ├── networkDetection.js            # Network Information API (saveData, effectiveType)
│   ├── performanceMonitor.js          # Temporary 100-frame FPS probe + Longtask observer
│   ├── visibilityManager.js           # Central document visibilitychange coordinator
│   ├── featurePolicy.js               # Policy resolution engine
│   ├── AdaptivePerformanceContext.js  # React Context definition
│   ├── AdaptivePerformanceProvider.jsx# Context Provider + data-performance DOM sync + URL overrides
│   └── useAdaptivePerformance.js      # Consumer hook
│
├── hooks/
│   ├── useElementSize.js              # Throttled ResizeObserver hook
│   ├── useInViewport.js               # IntersectionObserver hook with triggerOnce option
│   └── useReducedMotion.js            # Reactive prefers-reduced-motion hook
│
└── components/
    └── adaptive/
        └── AdaptiveDebugOverlay.jsx   # Dev / ?adaptiveDebug=1 floating diagnostic HUD
```

---

## 2. Performance Tier Breakdown

| Tier | Conditions | Active Visual Features |
| :--- | :--- | :--- |
| **`static` (Tier 0)** | `prefers-reduced-motion: reduce`, severe CPU/GPU constraints, or `?perf=static` | Instant motion (`0ms`), no Lenis, no 3D ribbon, no Shader, static Anime route accent, safe static images |
| **`light` (Tier 1)** | `saveData: true`, 2G/3G network, low cores (≤2), low memory (<2GB), low FPS (<30), or `?perf=light` | Snappy motion (`0.7x`), no Lenis, no 3D ribbon, no Shader, static Anime route accent, lazy image loading |
| **`standard` (Tier 2)** | Modern mobile (<=768px), tablets (769-1024px), standard laptops, or `?perf=standard` | Standard motion (`1.0x`), Lenis (desktop), GSAP storytelling, Shader (when WebGL & in view), animated Anime route accent |
| **`high` (Tier 3)** | Large desktop (>=1200px) with 4+ CPU cores, WebGL2, smooth 55+ FPS, or `?perf=high` | Premium motion (`1.0x`), Lenis desktop, full GSAP pinned horizontal track, 3D Hero ribbon, Shader on CTA, animated Anime route accent |

---

## 3. Production Bundle & Code Splitting

```
dist/index.html                              1.04 kB │ gzip:   0.58 kB
dist/assets/index-DG-uJDuS.css              26.22 kB │ gzip:   5.56 kB
dist/assets/HeroRouteRibbon-Ay7SsD5K.js    157.98 kB │ gzip:  50.31 kB (Lazy-loaded 3D chunk)
dist/assets/index-BNJLeYGm.js            1,327.75 kB │ gzip: 376.21 kB (Core app bundle)
```

- **Zero initial bundle penalty for 3D**: `HeroRouteRibbon` is isolated to a 50.31 kB gzip chunk, loaded exclusively on High-tier desktop via `React.lazy`.

---

## 4. Multi-Dimension Viewport Fixes Summary

1. **1105px (Medium Desktop / Laptop)**:
   - Refactored `TrustIntro`: Placed `"YEARS ON THE ROAD"` and `RoutePathAccent` in a dedicated vertical sub-column beside `"08"`.
   - Applied fluid `clamp(5.5rem, 11vw, 13rem)` typography scaling so numerals never push the right editorial column off the screen.
   - Constrained `RoutePathAccent` SVG with `width: 100%; max-width: 200px`.
2. **780px–992px (Tablet Portrait / Landscape)**:
   - Added `@media (max-width: 991px)` rule in `src/index.css`: Switches desktop navigation to the clean mobile hamburger toggle, eliminating overlapping nav links on intermediate tablet viewports.
   - Refined `.fleet-signature-mobile` list styling: Proportional image container height caps (`max-height: 400px; aspect-ratio: 16/9`), rounded corners, and balanced padding.
3. **Three.js Context Lifecycle**:
   - Replaced deprecated clock calls with standard delta accumulators.
   - Ensured clean unmount and context disposition, eliminating WebGL context loss warnings.

---

## 5. Verification & Compliance Matrix

- **Business Data (`business.js` & `vehicles.js`)**: SHA-256 hashes 100% identical.
- **Copy & Content**: 0 modifications to text, pricing, vehicle names, or contact links.
- **Linter (`oxlint`)**: 0 errors, 0 warnings.
- **Build (`vite build`)**: Production build clean and optimized.
