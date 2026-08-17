import { useContext } from 'react';
import { AdaptivePerformanceContext } from './AdaptivePerformanceContext';

export function useAdaptivePerformance() {
  return useContext(AdaptivePerformanceContext);
}
