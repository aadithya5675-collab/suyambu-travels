import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { SeatIcon } from '../../components/icons/Icons';

export function MobileVehicleChooser({ vehicles, onBook }) {
  const [activeGroup, setActiveGroup] = useState('1-4');
  const [selectedVehicleId, setSelectedVehicleId] = useState('swift-dzire');

  const groups = [
    { id: '1-4', label: '1–4' },
    { id: '5-7', label: '5–7' },
    { id: '8-12', label: '8–12' }
  ];

  const getRecommendations = (groupId) => {
    if (groupId === '1-4') return vehicles.filter(v => v.seats <= 4);
    if (groupId === '5-7') return vehicles.filter(v => v.seats > 4 && v.seats <= 7);
    if (groupId === '8-12') return vehicles.filter(v => v.seats > 7);
    return [];
  };

  const handleGroupChange = (groupId) => {
    setActiveGroup(groupId);
    const recs = getRecommendations(groupId);
    setSelectedVehicleId(recs.length === 1 ? recs[0].id : null);
  };

  const recommendations = getRecommendations(activeGroup);
  const selectedVehicleObj = vehicles.find(v => v.id === selectedVehicleId);

  return (
    <section className="mobile-chooser-section" id="chooser">
      <div className="container">
        <span className="eyebrow" style={{ display: 'block', textAlign: 'center' }}>FIND YOUR RIDE</span>
        <h2 className="heading-md" style={{ textAlign: 'center', marginBottom: '20px' }}>How many passengers?</h2>

        <div className="mobile-chooser-pills" role="tablist" aria-label="Passenger selection">
          {groups.map(group => {
            const isActive = activeGroup === group.id;
            return (
              <button 
                key={group.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleGroupChange(group.id)}
                className={`btn-pill ${isActive ? 'btn-pill-dark' : 'btn-pill-outline'}`}
                style={{ position: 'relative', padding: '8px 20px', fontSize: '0.9rem', zIndex: 1 }}
              >
                <span>{group.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mobile-chooser-box">
          <span className="eyebrow" style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginBottom: '16px', display: 'block' }}>SUITABLE OPTIONS</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {recommendations.map(v => {
              const isSelected = selectedVehicleId === v.id;
              return (
                <button 
                  key={v.id}
                  onClick={() => setSelectedVehicleId(v.id)}
                  className={`mobile-chooser-option ${isSelected ? 'selected' : ''}`}
                  aria-pressed={isSelected}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className={`mobile-radio-indicator ${isSelected ? 'active' : ''}`}>
                      {isSelected && <div className="mobile-radio-dot" />}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>{v.name}</strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <SeatIcon size={12} />
                        {v.seats} Seats • {v.ac ? 'AC' : 'Non-AC'}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>{v.price}</span>
                </button>
              );
            })}
          </div>

          <Button 
            variant="dark" 
            onClick={() => selectedVehicleId && onBook(selectedVehicleId)} 
            disabled={!selectedVehicleId}
            style={{ 
              width: '100%', 
              justifyContent: 'center',
              padding: '12px 16px',
              fontSize: '0.9rem',
              opacity: selectedVehicleId ? 1 : 0.5
            }}
          >
            {selectedVehicleObj ? `Enquire About ${selectedVehicleObj.name} →` : 'Select a Vehicle'}
          </Button>
        </div>
      </div>
    </section>
  );
}
