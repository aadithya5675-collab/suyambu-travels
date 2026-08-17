import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PERFORMANCE_TIERS, FEATURE_POLICIES } from './adaptiveConfig';
import { detectCapabilities } from './capabilityDetection';
import { getNetworkProfile, subscribeNetworkChanges } from './networkDetection';
import { runFPSProbe, initLongTaskObserver } from './performanceMonitor';
import { subscribeTabVisibility } from './visibilityManager';
import { resolvePerformanceTier } from './featurePolicy';
import { AdaptivePerformanceContext } from './AdaptivePerformanceContext';

export function AdaptivePerformanceProvider({ children }) {
  // 1. Initial Synchronous Detection
  const [capabilities, setCapabilities] = useState(() => detectCapabilities());
  const [network, setNetwork] = useState(() => getNetworkProfile());
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [runtimeMetrics, setRuntimeMetrics] = useState({});
  const [hasDowngraded, setHasDowngraded] = useState(false);

  // 2. Query Parameter Overrides (?perf=high|standard|light|static & ?adaptiveDebug=1)
  const [overrideTier, setOverrideTierState] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const params = new URLSearchParams(window.location.search);
      const perfParam = params.get('perf')?.toLowerCase();
      if (perfParam && Object.values(PERFORMANCE_TIERS).includes(perfParam)) {
        return perfParam;
      }
    } catch {
      // Guard URLSearchParams
    }
    return null;
  });

  const debugMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('adaptiveDebug') === '1' || params.has('debug');
    } catch {
      return false;
    }
  }, []);

  const setOverrideTier = useCallback((newTier) => {
    if (!newTier || Object.values(PERFORMANCE_TIERS).includes(newTier)) {
      setOverrideTierState(newTier);
    }
  }, []);

  // 3. Subscriptions to Network, Tab Visibility, and Resize
  useEffect(() => {
    const handleResize = () => {
      setCapabilities(detectCapabilities());
    };

    window.addEventListener('resize', handleResize);
    const unsubNet = subscribeNetworkChanges(setNetwork);
    const unsubVis = subscribeTabVisibility(setIsTabVisible);

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubNet();
      unsubVis();
    };
  }, []);

  // 4a. Temporary FPS Probe (Runs exactly once for ~100 frames after critical mount, then stops)
  useEffect(() => {
    let active = true;

    runFPSProbe().then((metrics) => {
      if (active) {
        setRuntimeMetrics((prev) => ({ ...prev, ...metrics }));
      }
    });

    return () => {
      active = false;
    };
  }, []);

  // 4b. Observe long tasks for graceful downgrade (re-binds if hasDowngraded changes, but once true, it ignores)
  useEffect(() => {
    const unsubLongTasks = initLongTaskObserver(() => {
      if (!hasDowngraded) {
        setHasDowngraded(true);
      }
    });

    return () => {
      unsubLongTasks();
    };
  }, [hasDowngraded]);

  // 5. Calculate Final Tier & Features
  const currentTier = useMemo(() => {
    if (overrideTier) return overrideTier;
    if (hasDowngraded) return PERFORMANCE_TIERS.LIGHT;
    return resolvePerformanceTier(capabilities, network, runtimeMetrics);
  }, [overrideTier, hasDowngraded, capabilities, network, runtimeMetrics]);

  const features = useMemo(() => {
    return FEATURE_POLICIES[currentTier] || FEATURE_POLICIES[PERFORMANCE_TIERS.STANDARD];
  }, [currentTier]);

  // 6. Synchronize Document Attributes & CSS Motion Tokens
  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.documentElement.setAttribute('data-performance', currentTier);
    document.documentElement.style.setProperty('--motion-duration-scale', String(features.motionDurationScale));
  }, [currentTier, features.motionDurationScale]);

  const contextValue = useMemo(() => ({
    tier: currentTier,
    capabilities,
    network,
    features,
    isTabVisible,
    fps: runtimeMetrics.avgFps ?? null,
    debugMode,
    overrideTier,
    setOverrideTier
  }), [currentTier, capabilities, network, features, isTabVisible, runtimeMetrics.avgFps, debugMode, overrideTier, setOverrideTier]);

  return (
    <AdaptivePerformanceContext.Provider value={contextValue}>
      {children}
    </AdaptivePerformanceContext.Provider>
  );
}
