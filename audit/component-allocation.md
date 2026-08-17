# Component & Visual Stack Allocation Matrix

| Technology | Architectural Role | Evaluated Area | Production Decision | Rationale | Loading Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **shadcn/ui** | Accessible UI primitives & semantics | BookingPanel, Accordion, Select | **YES (Curated)** | Accessible Dialog/Sheet/Accordion primitives in `src/components/ui/` with zero Tailwind dependency, customized to Suyambu tokens | Core bundle |
| **Kokonut UI** | Expressive gallery & card framing | SignatureFleet cards | **YES (1 Pattern)** | Refined card depth and luxury border framing for vehicle cards | Pure CSS & Tokens |
| **Lightswind UI** | Ambient mask & subtle glow effects | TravelCTA & Pricing | **YES (1 Pattern)** | Refined ambient gradient mask and border shimmer for CTA section | Pure CSS & Tokens |
| **Originkit** | Segmented selection & shared indicators | VehicleChooser tabs | **YES (1 Pattern)** | Smooth shared layout active pill indicator for passenger selector | Powered by Motion |
| **Iconsax** | Unified linear/outline icon language | Navbar, Cards, Buttons, Footer | **YES (Linear)** | Consistent linear/outline SVG icon system (`currentColor`), replacing mismatched raw SVGs | Inline SVGs (0 extra runtime) |
| **Motion** | Primary React UI interaction engine | Modals, Hover, Tap, Chooser, Accordions | **YES** | Declarative state animations (hover/press/enter/exit/shared layout) without fighting GSAP | Core UI chunk |
| **GSAP + ScrollTrigger** | Cinematic storytelling & spatial scroll | Hero, Trust, Fleet, Pricing, Booking, CTA | **YES** | Pinned horizontal fleet progression, parallax depth, section transitions | Core desktop scroll |
| **Anime.js** | Specialized isolated effects | Route path line drawing | **YES (Isolated)** | Route path stroke animation in travel storytelling | Isolated micro-effect |
| **Lenis** | Smooth scroll controller | Desktop document scroll | **YES** | Single smooth-scroll controller synced with ScrollTrigger; desktop only | Core desktop |
| **Lottie** | Simple vector loops | Booking process | **Evaluated — Not shipped** | Native animated SVG route with Anime.js provides cleaner visuals with 0 runtime weight | N/A |
| **Rive** | Interactive vector state machines | Vehicle chooser | **Evaluated — Not shipped** | Motion shared-layout provides instant feedback without WASM runtime overhead | N/A |
| **SVGator / Jitter** | Upstream motion authoring | Route and brand assets | **Evaluated (Authoring only)** | Assets consumed as clean SVG | Authoring workflow |
| **Three.js + R3F + Drei** | Subtle abstract 3D travel route ribbon | Hero background | **YES (Lazy Desktop)** | Abstract, subtle road contour ribbon on Hero; paused offscreen; DPR clamped | Code-split chunk (`React.lazy`) |
| **Shader UI** | Atmospheric visual shader | TravelCTA background | **YES** | High-value atmospheric shader on CTA; lifecycle managed to avoid concurrent WebGL load | Offscreen unmounted/paused |
| **Spline** | 3D prototype alternative | Hero visual | **Evaluated — Not shipped** | R3F selected for tighter React integration and smaller footprint | N/A |
| **Babylon.js** | Alternative 3D engine | Hero / 3D | **Evaluated — Not shipped** | Heavy game engine unsuitable for web presentation alongside Three.js | N/A |
| **PlayCanvas** | Alternative WebGL engine | Hero / 3D | **Evaluated — Not shipped** | Engine/editor overhead unnecessary for marketing site | N/A |

## Transform Ownership Rules
- **GSAP**: Owns document-level spatial scrub, track translateX (SignatureFleet), and section-pinning.
- **Motion**: Owns component-level interactive transforms (`scale`, `y` on hover/press, shared layout pill `layoutId`, modal opacity/scale).
- **Anime.js**: Owns isolated SVG path drawing (`strokeDashoffset`).
- **Rule**: Never more than one engine owning transforms on the same DOM element.
