/* ==========================================
   SUYAMBU TRAVELS — REFINED JAVASCRIPT V2
   GSAP & ScrollTrigger Motion System
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initNavigation();
  initWhatsAppLinks();

  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    initHeroAnimations();
    initScrollTriggers();
    initBookingStickyScroll();
  } else {
    // Reduced motion fallback
    document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
});

/* ------------------------------------------
   1. Navigation Header & Mobile Menu
   ------------------------------------------ */
function initNavigation() {
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

/* ------------------------------------------
   2. WhatsApp Prefilled Action Helpers
   ------------------------------------------ */
function initWhatsAppLinks() {
  const defaultPhone = '919842651518';
  const defaultMsg = 'Hi Suyambu Travels, I would like to enquire about a vehicle booking.';

  document.querySelectorAll('[data-wa-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const vehicle = btn.getAttribute('data-vehicle');
      let msg = defaultMsg;
      if (vehicle) {
        msg = `Hi Suyambu Travels, I would like to enquire about booking the ${vehicle}.`;
      }
      const waUrl = `https://wa.me/${defaultPhone}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
    });
  });
}

/* ------------------------------------------
   3. Refined Hero Cinematic Animation
   ------------------------------------------ */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Background image scale settle
  tl.to('.hero-bg-image', {
    scale: 1,
    duration: 1.8,
    ease: 'power2.out'
  }, 0);

  // 2. Header slide down
  tl.from('.header', {
    y: -25,
    opacity: 0,
    duration: 0.85
  }, 0.2);

  // 3. Eyebrow reveal
  tl.from('.hero-eyebrow', {
    y: 20,
    opacity: 0,
    duration: 0.6
  }, 0.45);

  // 4. Headline lines reveal
  tl.from('.hero-title-line', {
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.14
  }, 0.55);

  // 5. Subtitle & CTA buttons
  tl.from('.hero-subtitle', {
    y: 25,
    opacity: 0,
    duration: 0.7
  }, 0.85);

  tl.from('.hero-cta-group .btn-pill', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12
  }, 1.0);

  // 6. Bottom metadata chips
  tl.from('.hero-chip', {
    y: 15,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08
  }, 1.2);
}

/* ------------------------------------------
   4. ScrollTrigger Image Reveals & Staggers
   ------------------------------------------ */
function initScrollTriggers() {
  // Reusable reveal-up text and containers
  gsap.utils.toArray('.reveal-up').forEach(el => {
    gsap.fromTo(el,
      { y: 45, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Reusable reveal-scale containers
  gsap.utils.toArray('.reveal-scale').forEach(el => {
    gsap.fromTo(el,
      { scale: 0.93, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 86%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Inner image scale-down reveals for overflow-hidden containers
  gsap.utils.toArray('.image-reveal-wrap img').forEach(img => {
    gsap.fromTo(img,
      { scale: 1.1, opacity: 0.8 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Fleet Intro items stagger
  const fleetIntroItems = document.querySelectorAll('.fleet-card-unboxed');
  if (fleetIntroItems.length > 0) {
    gsap.fromTo(fleetIntroItems,
      { y: 45, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.fleet-intro-grid',
          start: 'top 82%'
        }
      }
    );
  }

  // Complete Fleet Editorial Items stagger
  const fleetGridItems = document.querySelectorAll('.fleet-grid-editorial-item');
  if (fleetGridItems.length > 0) {
    gsap.fromTo(fleetGridItems,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.fleet-grid-asymmetric',
          start: 'top 85%'
        }
      }
    );
  }

  // Pricing Editorial Items stagger
  const pricingItems = document.querySelectorAll('.pricing-editorial-item');
  if (pricingItems.length > 0) {
    gsap.fromTo(pricingItems,
      { y: 45, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pricing-editorial-grid',
          start: 'top 84%'
        }
      }
    );
  }
}

/* ------------------------------------------
   5. Booking Timeline Scroll Activation
   ------------------------------------------ */
function initBookingStickyScroll() {
  const timelineItems = document.querySelectorAll('.booking-timeline-item');
  if (timelineItems.length === 0) return;

  timelineItems.forEach((item, index) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 65%',
      end: 'bottom 45%',
      onEnter: () => activateTimelineStep(index),
      onEnterBack: () => activateTimelineStep(index)
    });
  });

  function activateTimelineStep(activeIndex) {
    timelineItems.forEach((it, i) => {
      if (i === activeIndex) {
        it.classList.add('active');
      } else {
        it.classList.remove('active');
      }
    });
  }
}
