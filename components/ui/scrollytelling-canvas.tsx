'use client';

import type { MotionValue } from 'framer-motion';
import { useMotionValueEvent } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function ScrollytellingCanvas({ 
  progress, 
  activeChapter = 0, 
  totalChapters = 6 
}: { 
  progress: MotionValue<number>; 
  activeChapter?: number; 
  totalChapters?: number; 
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const chapterRef = useRef(0);
  const totalChaptersRef = useRef(totalChapters);

  useMotionValueEvent(progress, 'change', (latest) => {
    progressRef.current = latest;
  });

  useEffect(() => {
    chapterRef.current = activeChapter;
  }, [activeChapter]);

  useEffect(() => {
    totalChaptersRef.current = totalChapters;
  }, [totalChapters]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let frame = 0;
    let raf = 0;

    const render = () => {
      frame += 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const t = frame * 0.008;
      const mix = progressRef.current;
      const currentChapter = chapterRef.current;
      const chapterProgress = currentChapter / Math.max(1, totalChaptersRef.current - 1);
      const hue = 220 + chapterProgress * 100;
      const accentHue = 230 + chapterProgress * 120;

      ctx.clearRect(0, 0, width, height);

      ctx.save();

      const gradient = ctx.createRadialGradient(
        width / 2 + Math.sin(t * 2.1) * 80,
        height / 2 + Math.cos(t * 1.6) * 60,
        Math.max(60, Math.min(width, height) * 0.12),
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      gradient.addColorStop(0, `hsla(${hue}, 35%, 18%, 0.85)`);
      gradient.addColorStop(0.5, `hsla(${accentHue}, 30%, 12%, 0.65)`);
      gradient.addColorStop(1, 'rgba(4,5,6,0.95)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 4; i += 1) {
        const y = height * (0.2 + i * 0.2) + Math.sin(t * 2 + i) * 40;
        const variation = 1 + chapterProgress * 1.5;
        const waveGradient = ctx.createLinearGradient(0, y, width, y);
        waveGradient.addColorStop(0, `hsla(${hue + i * 15}, 50%, 45%, 0)`);
        waveGradient.addColorStop(0.5, `hsla(${hue + i * 15}, 50%, 45%, ${0.2 + chapterProgress * 0.3})`);
        waveGradient.addColorStop(1, `hsla(${hue + i * 15}, 50%, 45%, 0)`);
        ctx.strokeStyle = waveGradient;
        ctx.lineWidth = 1.5 * variation;
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x <= width; x += 16) {
          const offset = Math.sin(t * 3 + x * 0.015 + i) * 12 * variation;
          ctx.lineTo(x, y + offset);
        }
        ctx.stroke();
      }

      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = `hsla(${accentHue}, 45%, 50%, ${0.05 + chapterProgress * 0.12})`;
      for (let p = 0; p < 80; p += 1) {
        const x = (Math.sin(t * 4 + p) * 0.5 + 0.5) * width;
        const y = (Math.cos(t * 2.6 + p * 1.1) * 0.5 + 0.5) * height;
        const size = 2 + (Math.sin(p + t * 10) + 1) * 2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
