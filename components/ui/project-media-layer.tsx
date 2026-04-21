'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';

interface ProjectMediaLayerProps {
  palette: string[];
  speed?: number;
  noise?: number;
  seed?: number;
  className?: string;
}

export function ProjectMediaLayer({ palette, speed = 0.6, noise = 0.12, seed = 0, className }: ProjectMediaLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let frame = seed;
    let raf: number | null = null;
    const dpr = window.devicePixelRatio || 1;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animate = !mediaQuery.matches;

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

    const handleMotion = () => {
      animate = !mediaQuery.matches;
      if (!animate) {
        drawFrame(frame);
        if (raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      } else if (!raf) {
        loop();
      }
    };

    mediaQuery.addEventListener('change', handleMotion);

    const drawFrame = (tick: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      const offsetX = Math.sin(tick * 0.002) * width * 0.2;
      const offsetY = Math.cos(tick * 0.0025) * height * 0.2;

      const gradient = ctx.createRadialGradient(
        width / 2 + offsetX,
        height / 2 + offsetY,
        Math.max(40, Math.min(width, height) * 0.15),
        width / 2,
        height / 2,
        Math.max(width, height)
      );

      const stops = palette.length > 1 ? palette.length - 1 : 1;
      palette.forEach((color, index) => {
        gradient.addColorStop(index / stops, color);
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'screen';
      const sweep = ctx.createLinearGradient(0, 0, width, height);
      palette
        .slice()
        .reverse()
        .forEach((color, index) => sweep.addColorStop(index / stops, color));
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = sweep;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      if (noise > 0) {
        const density = Math.max(8, Math.floor((width + height) * 0.1));
        ctx.fillStyle = `rgba(255,255,255,${noise})`;
        for (let i = 0; i < density; i += 1) {
          const x = (Math.sin(tick * 0.01 + i) * 0.5 + 0.5) * width;
          const y = (Math.cos(tick * 0.015 + i * 1.1) * 0.5 + 0.5) * height;
          const size = 1 + Math.random() * 2;
          ctx.fillRect(x, y, size, size);
        }
      }
    };

    const loop = () => {
      frame += speed * 16;
      drawFrame(frame);
      if (animate) {
        raf = requestAnimationFrame(loop);
      }
    };

    drawFrame(frame);
    if (animate) {
      loop();
    }

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleMotion);
    };
  }, [palette, seed, speed, noise]);

  return <canvas ref={canvasRef} className={clsx('absolute inset-0 h-full w-full rounded-[28px]', className)} aria-hidden />;
}
