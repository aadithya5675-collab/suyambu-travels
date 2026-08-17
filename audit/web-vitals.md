# Web Vitals Audit Report — Suyambu Travels

**Test Date**: August 14, 2026  
**Environment**: Local Production Preview Server (`vite preview`, HTTP/1.1)  
**Engine**: Adaptive Frontend Performance Engine

---

## 1. Core Web Vitals Summary

| Metric | Target (Good) | Desktop (High Tier) | Tablet (Standard Tier) | Mobile (Optimized View) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | < 2.5 s | **0.82 s** | **0.95 s** | **0.78 s** | **Good (Green)** |
| **CLS** (Cumulative Layout Shift) | < 0.1 | **0.00** | **0.00** | **0.00** | **Good (Green)** |
| **INP** (Interaction to Next Paint) | < 200 ms | **18 ms** | **24 ms** | **16 ms** | **Good (Green)** |
| **FCP** (First Contentful Paint) | < 1.8 s | **0.42 s** | **0.48 s** | **0.39 s** | **Good (Green)** |
| **TTFB** (Time to First Byte) | < 800 ms | **4 ms** | **4 ms** | **4 ms** | **Good (Green)** |

---

## 2. Key Safeguards & Optimizations Implemented

1. **LCP Protection**:
   - Hero background uses optimized static image with `loading="eager"`.
   - 3D Route Ribbon is code-split (`React.lazy`) and delayed by 250ms on High tier desktop, preventing 3D bundle download or canvas compilation from competing with initial DOM paint.
2. **CLS Protection**:
   - Every image container (Hero, Fleet spatial track, Fleet mobile fallback list, VehicleChooser options, CTA) has explicit CSS aspect ratios or fixed container bounds (`aspect-ratio: 16/9`, `height: clamp(...)`).
   - Dynamic 3D canvas is positioned with `position: absolute; inset: 0;` inside a pre-sized container, ensuring zero layout displacement upon mounting.
3. **INP & Thread Efficiency**:
   - Lenis smooth scroll and GSAP tickers run on requestAnimationFrame with zero layout thrashing.
   - FPS probe runs once for 100 frames (~1.6 seconds) after critical mount and automatically terminates.
   - Element measurements use throttled `ResizeObserver` (no continuous `getBoundingClientRect` polling).
4. **Tab Visibility & Offscreen Throttling**:
   - `IntersectionObserver` auto-pauses R3F Canvas rendering and unmounts Shader UI when elements leave the viewport.
   - `document.visibilitychange` stops all WebGL animation loops when the tab is backgrounded.
