# Pre-Final Fix Baseline Audit

## 1. Hashes (Locked Data)
- `src/data/business.js`: `49F945A387F5B999CAB86867E1EF04D5DCDF8F220E6CBE315586B725662FE04D`
- `src/data/vehicles.js`: `F64D4BBCB482F440BA000327BCA0CE69746ABBF0D65E5CD372493B0CE2EFD959`

## 2. Linter Results
1 warning:
```
  ! eslint(no-unused-vars): Parameter 'enableShader' is declared but never used.
```
0 errors.

## 3. Bundle Size
- Core JS (`index.js`): `1,329.07 kB` (gzip: `376.19 kB`)
- Lazy 3D Chunk (`HeroRouteRibbon.js`): `157.98 kB` (gzip: `50.31 kB`)

## 4. Dependencies
- `@react-three/drei`
- `@react-three/fiber`
- `@toriistudio/shader-ui`
- `animejs`
- `clsx`
- `gsap`
- `lenis`
- `motion`
- `postprocessing`
- `react` / `react-dom`
- `three`
- `three-stdlib`

*Note: Needs audit to confirm `three-stdlib`, `postprocessing`, and `@react-three/drei` are actively utilized.*
