import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  width?: 'fit-content' | '100%';
}

export const Reveal = ({ children, className = '', delay = 0, width = 'fit-content' }: RevealProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 1, 
        ease: [0.22, 1, 0.36, 1], 
        delay: shouldReduceMotion ? 0 : delay 
      }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};
