'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
  once?: boolean;
}

export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
  distance = 50,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once });

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      case 'none':
        return {};
      default:
        return { y: distance };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...getDirectionOffset(),
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : (direction === 'left' ? distance : direction === 'right' ? -distance : 0),
        y: isInView ? 0 : (direction === 'up' ? distance : direction === 'down' ? -distance : 0),
      }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  );
}