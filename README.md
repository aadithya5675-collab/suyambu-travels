# Suyambu Travels — Outstation Taxi & Vehicle Rentals

Production-quality web application for **Suyambu Travels**, an outstation travel and vehicle rental business based in Saravanampatti, Coimbatore, Tamil Nadu.

---

## 🚀 Key Architectural Highlights

### 1. Dual-Architecture Responsive Experience
- **Desktop (>= 1024px)**: Full cinematic spatial scroll story:
  - **Hero**: Restrained vertical parallax (`↓`).
  - **Trust**: Split horizontal reveal & drift exit (`← →`).
  - **Signature Fleet**: Pinned horizontal canvas (`RIGHT → LEFT`) featuring Dzire ← Crysta ← Hycross ← Tempo ← Urbania.
  - **Vehicle Chooser**: Upward rise entrance (`↑`).
  - **Pricing**: Progressive Left-to-Right row reveal (`→`).
  - **Booking Process**: Split-screen convergence & separation (`← →`).
  - **Travel CTA**: GPU-accelerated spatial depth expansion (`◎`).
  - **Footer**: Calm visual resting point (`↓`).
- **Mobile (<= 768px)**: Conversion-first compact flow (**VIEW → CHOOSE → PRICE → WHATSAPP**):
  - **Compact Hero**: Immediate WhatsApp/Call CTAs above the fold.
  - **Horizontal Swipe Fleet**: Native CSS `scroll-snap-type: x mandatory` cards with interactive dot indicators.
  - **Compact Chooser & Collapsible Pricing**: Fast passenger lookup and expandable rate list.
  - **Bottom Action Bar**: Direct one-tap Call (`tel:`) and WhatsApp access (`wa.me/`).
- **Tablet (769–1023px)**: Clean hybrid navigation overlay.

### 2. Library Ownership Boundaries
- **GSAP & ScrollTrigger**: Spatial section choreography, pinned horizontal canvas, scrub transitions.
- **Anime.js**: Micro-interactions (buttons, arrows, option cards, booking panel drawer).
- **Shader UI (`@toriistudio/shader-ui`)**: Atmospheric visual treatment on CTA image with `ShaderErrorBoundary` fallback.

### 3. Engineering & Performance Enhancements
- **Responsive Motion Control**: Anime.js dynamically handles `translateX` on desktop drawer and `translateY` on mobile bottom sheet.
- **Presence Unmounting (`isMounted`)**: Closed booking drawer unmounts from DOM so invisible controls cannot receive focus.
- **Safe Body Scroll Locking (`useBodyScrollLock`)**: Reference-counted lock preventing scroll race conditions across overlays.
- **Idle Image Preloader**: Decodes horizontal fleet images in background during idle time so panels are ready during scroll.
- **Zero Unsupported Claims**: Truthful business data (`8 Years`, `Coimbatore`, `+91 98426 51518`).

---

## 🛠️ Technology Stack
- **Framework**: React 19 + Vite
- **Animations**: GSAP 3.15 + ScrollTrigger, Anime.js 3.2, Lenis 1.3
- **Shader FX**: `@toriistudio/shader-ui` + Three.js
- **Icons & Styling**: Vanilla CSS design system tokens (`index.css`), SVG branding
- **Linting**: Oxlint

---

## 📂 Project Structure
```text
suyambu-travels/
├── src/
│   ├── components/       # Shared UI (Navbar, BookingPanel, Button, RevealText, etc.)
│   ├── data/             # Shared business & vehicle datasets (business.js, vehicles.js)
│   ├── motion/           # Motion tokens & Shader UI components
│   ├── sections/         # Desktop spatial sections (Hero, TrustIntro, SignatureFleet, etc.)
│   ├── sections/mobile/  # Mobile presentation sections (MobileHero, MobileFleetSwipe, etc.)
│   ├── utils/            # Utilities (whatsapp.js, useMediaQuery.js, useBodyScrollLock.js)
│   ├── App.jsx           # Root responsive layout switcher
│   ├── index.css         # Canonical CSS design system tokens
│   └── main.jsx
├── public/               # Static assets & SVG favicon
├── package.json
└── README.md
```

---

## ⚡ Development & Build Scripts

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Run Oxlint code linter
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```
