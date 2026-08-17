import React from 'react';
import { motion } from 'motion/react';

export function Button({ 
  children, 
  variant = 'dark', // 'dark', 'white', 'outline', 'outline-light', 'outline-dark', 'subtle'
  onClick, 
  href,
  className = '',
  hasArrow = true,
  ...props 
}) {
  // Prevent duplicate arrows if children string already contains '→' or '↗'
  const hasExistingArrow = typeof children === 'string' && (children.includes('→') || children.includes('↗'));
  const showArrow = hasArrow && !hasExistingArrow;

  const baseClass = `btn-pill btn-pill-${variant} ${className}`;

  const innerContent = (
    <>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{children}</span>
      {showArrow && (
        <motion.span
          className="arrow-icon"
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{ display: 'inline-block', marginLeft: '6px' }}
        >
          →
        </motion.span>
      )}
    </>
  );

  const motionProps = {
    whileHover: { y: -1, transition: { duration: 0.18, ease: 'easeOut' } },
    whileTap: { scale: 0.97, y: 0, transition: { duration: 0.1 } }
  };

  if (href) {
    return (
      <motion.a 
        href={href} 
        className={baseClass} 
        {...motionProps}
        {...props}
      >
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.button 
      className={baseClass} 
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {innerContent}
    </motion.button>
  );
}
