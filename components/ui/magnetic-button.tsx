'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { ComponentPropsWithoutRef } from 'react';

interface MagneticButtonProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
  label: string;
  subtle?: boolean;
}

const spring = { stiffness: 400, damping: 30, mass: 0.4 };

export default function MagneticButton({
  label,
  subtle = false,
  className = '',
  ...props
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const palette = subtle
    ? 'border-white/20 bg-white/0 text-slate-200 hover:border-white/40 hover:bg-white/10'
    : 'border-white/20 bg-white text-slate-900 hover:border-white/40 hover:bg-white/90';

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <a
        {...props}
        data-cursor="focus"
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={`inline-flex items-center justify-between gap-4 rounded-full border px-8 py-3 text-xs uppercase tracking-[0.35em] transition-all duration-500 ${palette} ${className}`}
      >
        <span className="font-semibold">{label}</span>
        <span className="font-mono text-xs text-current opacity-70">↗</span>
      </a>
    </motion.div>
  );
}
