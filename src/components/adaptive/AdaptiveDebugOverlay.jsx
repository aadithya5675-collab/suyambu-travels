import React, { useState } from 'react';
import { useAdaptivePerformance } from '../../adaptive/useAdaptivePerformance';
import { PERFORMANCE_TIERS } from '../../adaptive/adaptiveConfig';

export function AdaptiveDebugOverlay() {
  const {
    tier,
    capabilities,
    network,
    features,
    fps,
    debugMode,
    overrideTier,
    setOverrideTier
  } = useAdaptivePerformance();

  const [minimized, setMinimized] = useState(false);

  // Show only if explicitly enabled via ?adaptiveDebug=1
  if (!debugMode) return null;

  const tierColors = {
    [PERFORMANCE_TIERS.STATIC]: '#8E9A8E',
    [PERFORMANCE_TIERS.LIGHT]: '#D9A74A',
    [PERFORMANCE_TIERS.STANDARD]: '#4A90E2',
    [PERFORMANCE_TIERS.HIGH]: '#2D9C5E'
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 99999,
        fontFamily: 'monospace',
        fontSize: '12px',
        backgroundColor: 'rgba(27, 46, 35, 0.94)',
        color: '#FFFFFF',
        borderRadius: '12px',
        padding: minimized ? '8px 12px' : '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        maxWidth: '340px',
        lineHeight: 1.4
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: tierColors[tier] || '#FFF'
            }}
          />
          <strong style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Adaptive Engine <span style={{ opacity: 0.6, fontSize: '0.85em', textTransform: 'none' }}>(Local Test)</span>
          </strong>
        </div>

        <button
          onClick={() => setMinimized(!minimized)}
          style={{
            background: 'none',
            border: 'none',
            color: '#AAA',
            cursor: 'pointer',
            fontSize: '11px',
            padding: '2px 4px'
          }}
        >
          {minimized ? 'Expand ↗' : 'Collapse ↘'}
        </button>
      </div>

      {!minimized && (
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <span style={{ color: '#AAA' }}>Active Tier:</span>
            <span style={{ color: tierColors[tier], fontWeight: 700, textTransform: 'uppercase' }}>
              {tier} {overrideTier ? '(FORCED)' : '(AUTO)'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#AAA' }}>Viewport:</span>
            <span>{capabilities.viewportWidth} × {capabilities.viewportHeight}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#AAA' }}>DPR / WebGL:</span>
            <span>{capabilities.dpr}x / {capabilities.webgl2 ? 'WebGL2' : capabilities.webgl ? 'WebGL' : 'None'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#AAA' }}>Network / Cores:</span>
            <span>{network.effectiveType} ({network.saveData ? 'SaveData' : 'Normal'}) / {capabilities.hardwareConcurrency} Cores</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#AAA' }}>Sampled FPS:</span>
            <span>{fps ? `${fps} FPS` : 'Probing...'}</span>
          </div>

          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <span style={{ color: '#AAA', display: 'block', marginBottom: '6px', fontSize: '11px' }}>
              Features: Lenis:{features.smoothScroll ? '✓' : '✗'} | 3D:{features.hero3D ? '✓' : '✗'} | Shader:{features.shader ? '✓' : '✗'}
            </span>
          </div>

          <div style={{ marginTop: '6px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {Object.values(PERFORMANCE_TIERS).map((t) => (
              <button
                key={t}
                onClick={() => setOverrideTier(t)}
                style={{
                  flex: '1 1 auto',
                  padding: '4px 6px',
                  fontSize: '10px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: overrideTier === t ? tierColors[t] : 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  fontWeight: overrideTier === t ? 700 : 400
                }}
              >
                {t}
              </button>
            ))}
            <button
              onClick={() => setOverrideTier(null)}
              style={{
                flex: '1 1 auto',
                padding: '4px 6px',
                fontSize: '10px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: !overrideTier ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              Auto
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
