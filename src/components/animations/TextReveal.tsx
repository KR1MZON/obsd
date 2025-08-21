'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'word' | 'letter' | 'line';
  once?: boolean;
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  duration = 0.05,
  type = 'word',
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once });

  const getItems = () => {
    switch (type) {
      case 'word':
        return text.split(' ');
      case 'letter':
        return text.split('');
      case 'line':
        return text.split('\n');
      default:
        return text.split(' ');
    }
  };

  const items = getItems();

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={container}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ willChange: 'transform, opacity' }}
        >
          {item}
          {type === 'word' && ' '}
          {type === 'line' && <br />}
        </motion.span>
      ))}
    </motion.div>
  );
}