'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  duration?: number;
  delay?: number;
  className?: string;
  barClassName?: string;
  label?: string;
  showValue?: boolean;
}

export default function ProgressBar({
  value,
  max = 100,
  duration = 1.5,
  delay = 0,
  className = '',
  barClassName = '',
  label,
  showValue = false,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div ref={ref} className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          {showValue && (
            <span className="text-sm font-medium">{value}/{max}</span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-red-600 ${barClassName}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{
            duration,
            delay,
            ease: 'easeOut',
          }}
          style={{ willChange: 'width' }}
        />
      </div>
    </div>
  );
}