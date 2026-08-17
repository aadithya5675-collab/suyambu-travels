import { createContext } from 'react';
import { PERFORMANCE_TIERS, FEATURE_POLICIES } from './adaptiveConfig';

export const AdaptivePerformanceContext = createContext({
  tier: PERFORMANCE_TIERS.STANDARD,
  capabilities: {},
  network: {},
  features: FEATURE_POLICIES[PERFORMANCE_TIERS.STANDARD],
  isTabVisible: true,
  fps: null,
  debugMode: false,
  overrideTier: null,
  setOverrideTier: () => {}
});
