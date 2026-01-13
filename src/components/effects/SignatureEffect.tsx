import React from 'react';
import { motion } from 'framer-motion';

// This component handles specific visual effects requested via data-signature-effect
// Currently a wrapper, but extensible for specific shader or canvas effects if needed.

interface SignatureEffectProps {
  children: React.ReactNode;
  effect?: string;
  className?: string;
}

export const SignatureEffect = ({ children, effect, className = '' }: SignatureEffectProps) => {
  // Placeholder for future specific effects (e.g. distortion, grain, etc.)
  // For now, it passes through with the class name.
  return (
    <div className={`relative ${className}`} data-signature-effect={effect}>
      {children}
    </div>
  );
};
