/**
 * Adaptive Performance Engine Configuration & Constants
 * Single source of truth for tiers, feature matrices, and thresholds.
 */

export const PERFORMANCE_TIERS = {
  STATIC: 'static',     // Tier 0: Safe baseline, reduced motion, or severe constraints
  LIGHT: 'light',       // Tier 1: Constrained hardware, save-data, slow network, small mobile
  STANDARD: 'standard', // Tier 2: Normal laptops, modern phones, tablets
  HIGH: 'high'          // Tier 3: High-capability desktops, discrete/fast GPU, smooth 60fps
};

export const FEATURE_POLICIES = {
  [PERFORMANCE_TIERS.STATIC]: {
    smoothScroll: false,
    cinematicGSAP: false,
    hero3D: false,
    shader: false,
    animeRoute: false,
    motionDurationScale: 0,
    webglMaxDpr: 1.0,
    preloadFleetImages: false
  },
  [PERFORMANCE_TIERS.LIGHT]: {
    smoothScroll: false,
    cinematicGSAP: 'reduced',
    hero3D: false,
    shader: false,
    animeRoute: false,
    motionDurationScale: 0.7,
    webglMaxDpr: 1.0,
    preloadFleetImages: false
  },
  [PERFORMANCE_TIERS.STANDARD]: {
    smoothScroll: true,
    cinematicGSAP: true,
    hero3D: false,
    shader: true,
    animeRoute: true,
    motionDurationScale: 1.0,
    webglMaxDpr: 1.25,
    preloadFleetImages: true
  },
  [PERFORMANCE_TIERS.HIGH]: {
    smoothScroll: true,
    cinematicGSAP: true,
    hero3D: true,
    shader: true,
    animeRoute: true,
    motionDurationScale: 1.0,
    webglMaxDpr: 1.5,
    preloadFleetImages: true
  }
};

export const FPS_THRESHOLDS = {
  HIGH_MIN_FPS: 55,
  STANDARD_MIN_FPS: 40,
  LIGHT_MIN_FPS: 25,
  PROBE_FRAME_COUNT: 100 // Probe runs once for ~1.6 seconds then stops
};
