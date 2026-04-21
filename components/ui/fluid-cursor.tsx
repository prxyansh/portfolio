'use client';

import { motionTokens } from '@/lib/motion';
import { motion, useMotionTemplate, useSpring } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

const cursorStyles: Record<string, { size: number; blur: number; opacity: number }> = {
  default: { size: 72, blur: 28, opacity: 0.55 },
  focus: { size: 120, blur: 50, opacity: 0.4 },
  text: { size: 52, blur: 18, opacity: 0.45 },
};

export default function FluidCursor() {
  const cursorX = useSpring(0, motionTokens.springs.magnetic);
  const cursorY = useSpring(0, motionTokens.springs.magnetic);
  const scaleSpring = useSpring(1, motionTokens.springs.magnetic);
  const pointerX = useSpring(0, motionTokens.springs.float);
  const pointerY = useSpring(0, motionTokens.springs.float);
  const [hasMoved, setHasMoved] = useState(false);

  const [variant, setVariant] = useState<keyof typeof cursorStyles>('default');
  const enabled = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
    []
  );
  const hasMovedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const handlePointerMove = (event: PointerEvent) => {
      const style = cursorStyles[variant];
      cursorX.set(event.clientX - style.size / 2);
      cursorY.set(event.clientY - style.size / 2);
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setHasMoved(true);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [cursorX, cursorY, pointerX, pointerY, variant, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-cursor='focus']")) {
        setVariant('focus');
      } else if (target.closest("[data-cursor='text']")) {
        setVariant('text');
      } else {
        setVariant('default');
      }
    };

    const handlePointerDown = () => scaleSpring.set(0.75);
    const handlePointerUp = () => scaleSpring.set(1);

    window.addEventListener('pointerover', handlePointerOver, true);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerover', handlePointerOver, true);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [enabled, scaleSpring]);

  if (!enabled) return null;

  const { size, blur, opacity } = cursorStyles[variant];
  const pointerGradient = useMotionTemplate`radial-gradient(420px circle at ${pointerX}px ${pointerY}px, rgba(255,255,255,0.25), transparent 65%)`;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[40] hidden lg:block"
        style={{
          backgroundImage: pointerGradient,
          opacity: hasMoved ? 0.35 : 0,
          mixBlendMode: 'color-dodge',
          filter: 'blur(90px)',
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
        style={{
          width: size,
          height: size,
          translateX: cursorX,
          translateY: cursorY,
          scale: scaleSpring,
          filter: `blur(${blur}px)`,
          opacity,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.65), rgba(80,83,255,0.65))',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}
