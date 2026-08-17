import React, { useState, useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useMediaQuery } from './utils/useMediaQuery';
import { AdaptivePerformanceProvider } from './adaptive/AdaptivePerformanceProvider';
import { useAdaptivePerformance } from './adaptive/useAdaptivePerformance';
import { AdaptiveDebugOverlay } from './components/adaptive/AdaptiveDebugOverlay';

// Desktop Sections
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { TrustIntro } from './sections/TrustIntro';
import { SignatureFleet } from './sections/SignatureFleet';
import { VehicleChooser } from './sections/VehicleChooser';
import { Pricing } from './sections/Pricing';
import { BookingProcess } from './sections/BookingProcess';
import { TravelCTA } from './sections/TravelCTA';
import { Footer } from './sections/Footer';

// Mobile-Optimized Presentation Sections (<= 768px)
import { MobileHero } from './sections/mobile/MobileHero';
import { MobileFleetSwipe } from './sections/mobile/MobileFleetSwipe';
import { MobileVehicleChooser } from './sections/mobile/MobileVehicleChooser';
import { MobilePricingAccordion } from './sections/mobile/MobilePricingAccordion';
import { MobileBookingProcess } from './sections/mobile/MobileBookingProcess';
import { MobileTravelCTA } from './sections/mobile/MobileTravelCTA';
import { MobileFooter } from './sections/mobile/MobileFooter';

// Shared Components
const BookingPanel = lazy(() => import('./components/BookingPanel').then(m => ({ default: m.BookingPanel })));

import { vehicles } from './data/vehicles';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { features, isTabVisible } = useAdaptivePerformance();
  const [bookingPanelOpen, setBookingPanelOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  useEffect(() => {
    let lenis;
    let updateLenis;
    
    if (features.smoothScroll && !isMobile) {
      lenis = new Lenis({
        lerp: 0.08,
        wheelMultiplier: 0.9,
        touchMultiplier: 2,
        infinite: false,
      });

      updateLenis = (time) => {
        lenis.raf(time * 1000);
      };

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(updateLenis);
    }

    return () => {
      if (lenis) {
        if (updateLenis) gsap.ticker.remove(updateLenis);
        lenis.destroy();
      }
    };
  }, [features.smoothScroll, isMobile]);

  const handleOpenBooking = (vehicleId = null) => {
    if (vehicleId && typeof vehicleId === 'object' && vehicleId.id) {
      setSelectedVehicleId(vehicleId.id);
    } else {
      setSelectedVehicleId(vehicleId);
    }
    setBookingPanelOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingPanelOpen(false);
  };

  return (
    <>
      <Navbar onBook={handleOpenBooking} />
      
      <main>
        {isMobile ? (
          /* Mobile-Optimized View (<= 768px): Speed, Decision, Conversion */
          <>
            <MobileHero onBook={handleOpenBooking} />
            <MobileFleetSwipe vehicles={vehicles} onBook={handleOpenBooking} />
            <MobileVehicleChooser vehicles={vehicles} onBook={handleOpenBooking} />
            <MobilePricingAccordion vehicles={vehicles} onBook={handleOpenBooking} />
            <MobileBookingProcess />
            <MobileTravelCTA />
          </>
        ) : (
          /* Desktop & Laptop View (>= 769px): Full Cinematic Spatial Storytelling Architecture */
          <>
            <Hero 
              onBook={handleOpenBooking} 
              enable3D={features.hero3D} 
              enableGSAP={Boolean(features.cinematicGSAP)} 
              webglMaxDpr={features.webglMaxDpr}
              isTabVisible={isTabVisible}
            />
            <TrustIntro enableAnimation={features.animeRoute} />
            <SignatureFleet 
              vehicles={vehicles} 
              onBook={handleOpenBooking} 
              enableSpatial={features.cinematicGSAP === true} 
              preloadImages={features.preloadFleetImages}
            />
            <VehicleChooser vehicles={vehicles} onBook={handleOpenBooking} enableGSAP={Boolean(features.cinematicGSAP)} />
            <Pricing vehicles={vehicles} onBook={handleOpenBooking} enableGSAP={Boolean(features.cinematicGSAP)} />
            <BookingProcess enableGSAP={Boolean(features.cinematicGSAP)} />
            <TravelCTA enableShader={features.shader} enableGSAP={Boolean(features.cinematicGSAP)} />
          </>
        )}
      </main>

      {isMobile ? <MobileFooter /> : <Footer enableGSAP={Boolean(features.cinematicGSAP)} />}
      
      <Suspense fallback={null}>
        <BookingPanel 
          isOpen={bookingPanelOpen} 
          onClose={handleCloseBooking} 
          vehicles={vehicles} 
          initialVehicleId={selectedVehicleId} 
        />
      </Suspense>

      <AdaptiveDebugOverlay />
    </>
  );
}

function App() {
  return (
    <AdaptivePerformanceProvider>
      <AppContent />
    </AdaptivePerformanceProvider>
  );
}

export default App;
