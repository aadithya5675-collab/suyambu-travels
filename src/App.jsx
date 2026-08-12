import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useMediaQuery } from './utils/useMediaQuery';

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
import { BookingPanel } from './components/BookingPanel';
import { MobileBookingBar } from './components/MobileBookingBar';

import { vehicles } from './data/vehicles';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [bookingPanelOpen, setBookingPanelOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let lenis;
    let updateLenis;
    
    if (!prefersReducedMotion && !isMobile) {
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
  }, [isMobile]);

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
            <MobileBookingProcess onBook={handleOpenBooking} />
            <MobileTravelCTA />
          </>
        ) : (
          /* Desktop & Laptop View (>= 769px): Full Cinematic Spatial Storytelling Architecture */
          <>
            <Hero onBook={handleOpenBooking} />
            <TrustIntro />
            <SignatureFleet vehicles={vehicles} onBook={handleOpenBooking} />
            <VehicleChooser vehicles={vehicles} onBook={handleOpenBooking} />
            <Pricing vehicles={vehicles} onBook={handleOpenBooking} />
            <BookingProcess />
            <TravelCTA />
          </>
        )}
      </main>

      {isMobile ? <MobileFooter /> : <Footer />}
      
      <MobileBookingBar />
      <BookingPanel 
        isOpen={bookingPanelOpen} 
        onClose={handleCloseBooking} 
        vehicles={vehicles} 
        initialVehicleId={selectedVehicleId} 
      />
    </>
  );
}

export default App;
