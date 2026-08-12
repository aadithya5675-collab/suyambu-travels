import React, { useRef } from 'react';
import anime from 'animejs';

export function Button({ 
  children, 
  variant = 'dark', // 'dark', 'white', 'outline', 'outline-light', 'outline-dark', 'subtle'
  onClick, 
  href,
  className = '',
  hasArrow = true,
  ...props 
}) {
  const arrowRef = useRef(null);
  
  const handleMouseEnter = () => {
    if (arrowRef.current) {
      anime({
        targets: arrowRef.current,
        translateX: 4,
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  };

  const handleMouseLeave = () => {
    if (arrowRef.current) {
      anime({
        targets: arrowRef.current,
        translateX: 0,
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  };

  // Prevent duplicate arrows if children string already contains '→'
  const hasExistingArrow = typeof children === 'string' && children.includes('→');
  const showArrow = hasArrow && !hasExistingArrow;

  const baseClass = `btn-pill btn-pill-${variant} ${className}`;

  const innerContent = (
    <>
      {children}
      {showArrow && (
        <span ref={arrowRef} className="arrow-icon" style={{ display: 'inline-block', marginLeft: '6px' }}>→</span>
      )}
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={baseClass} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button 
      className={baseClass} 
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {innerContent}
    </button>
  );
}
