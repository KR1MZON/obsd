'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HoverEffectProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  rotate?: number;
  translateY?: number;
  brightness?: number;
  shadow?: boolean;
}

export default function HoverEffect({
  children,
  className = '',
  scale = 1.05,
  rotate = 0,
  translateY = -5,
  brightness = 1.1,
  shadow = true,
}: HoverEffectProps) {
  return (
    <motion.div
      className={`${className} ${shadow ? 'transition-shadow' : ''}`}
      whileHover={{
        scale,
        rotate: rotate,
        y: translateY,
        filter: `brightness(${brightness})`,
        boxShadow: shadow ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 15,
      }}
      style={{ willChange: 'transform, filter, box-shadow' }}
    >
      {children}
    </motion.div>
  );
}