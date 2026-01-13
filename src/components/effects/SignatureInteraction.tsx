import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useReducedMotion } from '../motion/useReducedMotion';

interface SignatureInteractionProps {
  children: React.ReactNode;
  type: 'text-reveal' | 'clip-reveal' | 'parallax' | 'marquee' | 'sticky-progress';
  className?: string;
  speed?: number;
}

export const SignatureInteraction = ({ children, type, className = '', speed = 0.5 }: SignatureInteractionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax Effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  const scale = useTransform(scrollY, [0, 800], [1.1, 1]); // Replicating the specific hero scale logic
  const heroTranslateY = useTransform(scrollY, [0, 800], [0, 40]); // Replicating the specific hero translate logic

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  if (type === 'parallax') {
    // Specifically tailored for the Hero image behavior in the original HTML
    // The original script used: scale(1.1 - scroll * 0.0001) translateY(scroll * 0.05px)
    // We approximate this with framer-motion transforms
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <motion.div style={{ scale, y: heroTranslateY }} className="w-full h-full">
          {children}
        </motion.div>
      </div>
    );
  }

  if (type === 'text-reveal') {
    return (
      <motion.div
        initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 20 }}
        whileInView={{ clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (type === 'clip-reveal') {
    return (
      <motion.div
        initial={{ clipPath: 'inset(10% 10% 10% 10%)', opacity: 0 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={className}>{children}</div>;
};
