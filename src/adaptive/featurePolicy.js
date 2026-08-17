/**
 * Feature Policy Resolver Module
 * Takes capabilities, network profile, runtime metrics, and performance tier,
 * and produces the final feature flags for components.
 */

import { PERFORMANCE_TIERS, FEATURE_POLICIES, FPS_THRESHOLDS } from './adaptiveConfig';

export function resolvePerformanceTier(capabilities, network, runtimeMetrics = {}, forcedTier = null) {
  if (forcedTier && Object.values(PERFORMANCE_TIERS).includes(forcedTier)) {
    return forcedTier;
  }

  // 1. Absolute Reduced Motion -> STATIC Tier
  if (capabilities.reducedMotion) {
    return PERFORMANCE_TIERS.STATIC;
  }

  // 2. Save Data or very constrained network -> LIGHT Tier
  if (capabilities.saveData || network.saveData || ['slow-2g', '2g', '3g'].includes(network.effectiveType)) {
    return PERFORMANCE_TIERS.LIGHT;
  }

  // 3. WebGL missing entirely -> max LIGHT Tier
  if (!capabilities.webgl) {
    return PERFORMANCE_TIERS.LIGHT;
  }

  // 4. Very low hardware concurrency (< 2) or memory (< 2GB) -> LIGHT Tier
  if (capabilities.hardwareConcurrency <= 2 || capabilities.deviceMemory < 2) {
    return PERFORMANCE_TIERS.LIGHT;
  }

  // 5. Small mobile viewports (<= 768px) -> max STANDARD Tier
  if (capabilities.viewportWidth <= 768) {
    return PERFORMANCE_TIERS.STANDARD;
  }

  // 6. Runtime FPS checks if probe has finished
  if (typeof runtimeMetrics.avgFps === 'number') {
    if (runtimeMetrics.avgFps < FPS_THRESHOLDS.LIGHT_MIN_FPS) {
      return PERFORMANCE_TIERS.LIGHT;
    }
    if (runtimeMetrics.avgFps < FPS_THRESHOLDS.HIGH_MIN_FPS) {
      return PERFORMANCE_TIERS.STANDARD;
    }

    // 7. Capable Large Desktop (>= 1200px) with 4+ cores & WebGL2 -> HIGH Tier
    // Only reachable if FPS probe finished and avgFps >= HIGH_MIN_FPS
    if (capabilities.viewportWidth >= 1200 && capabilities.hardwareConcurrency >= 4 && capabilities.webgl2) {
      return PERFORMANCE_TIERS.HIGH;
    }
  }

  // Default fallback: STANDARD
  return PERFORMANCE_TIERS.STANDARD;
}

export function getFeaturesForTier(tier) {
  return FEATURE_POLICIES[tier] || FEATURE_POLICIES[PERFORMANCE_TIERS.STANDARD];
}
