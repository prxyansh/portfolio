'use client';

import { useEffect, useRef } from 'react';

interface HeroSceneProps {
  scrollProgress?: number;
}

export function HeroScene({ scrollProgress = 0 }: HeroSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const initCenterX = canvas.clientWidth / 2;
    const initCenterY = canvas.clientHeight / 2;
    targetRef.current = { x: initCenterX, y: initCenterY };
    cursorRef.current = { x: initCenterX, y: initCenterY };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    let frame = 0;
    let raf: number;

    // Auras for the organic premium background
    const auras = [
      { x: 0.3, y: 0.3, r: 0.8, hue: 240, vx: 0.0005, vy: 0.0007 }, // Iris
      { x: 0.7, y: 0.7, r: 0.9, hue: 175, vx: -0.0006, vy: -0.0004 }, // Cyan
      { x: 0.5, y: 0.5, r: 0.7, hue: 280, vx: 0.0004, vy: -0.0006 }, // Purple
    ];

    const render = () => {
      frame++;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const t = frame * 0.003;

      cursorRef.current.x += (targetRef.current.x - cursorRef.current.x) * 0.04;
      cursorRef.current.y += (targetRef.current.y - cursorRef.current.y) * 0.04;

      const mx = (cursorRef.current.x / width - 0.5) * 2;
      const my = (cursorRef.current.y / height - 0.5) * 2;

      ctx.clearRect(0, 0, width, height);
      
      // 1. Deep Space Base
      ctx.fillStyle = '#040506';
      ctx.fillRect(0, 0, width, height);

      // 2. Slow Organic Ambient Gradients (Apple-esque premium feel)
      ctx.globalCompositeOperation = 'screen';
      const baseRadius = Math.min(width, height);
      
      auras.forEach(aura => {
        aura.x += aura.vx;
        aura.y += aura.vy;
        if (aura.x < 0.1 || aura.x > 0.9) aura.vx *= -1;
        if (aura.y < 0.1 || aura.y > 0.9) aura.vy *= -1;

        // Mouse parallax for auras
        const px = aura.x * width + mx * width * 0.05;
        const py = aura.y * height + my * height * 0.05;
        const radius = aura.r * baseRadius;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
        // Fade in and out opacity slightly with time
        const pulse = Math.sin(t + aura.hue) * 0.05 + 0.15;
        
        grad.addColorStop(0, `hsla(${aura.hue}, 70%, 50%, ${pulse})`);
        grad.addColorStop(1, 'rgba(4, 5, 6, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Crisp, Ultra-thin Geometric Rings (Astrolabe / Gyroscope)
      ctx.globalCompositeOperation = 'source-over';
      const cx = width / 2;
      const cy = height / 2;
      const ringSize = Math.min(width, height) * 0.35;

      const drawRing = (rotationX: number, rotationY: number, rotationZ: number, scale: number, opacity: number) => {
        ctx.beginPath();
        const segments = 100;
        
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          
          // Base 3D circle
          let x = Math.cos(theta) * ringSize * scale;
          let y = Math.sin(theta) * ringSize * scale;
          let z = 0;

          // Rotate X
          let y1 = y * Math.cos(rotationX) - z * Math.sin(rotationX);
          let z1 = y * Math.sin(rotationX) + z * Math.cos(rotationX);
          y = y1; z = z1;

          // Rotate Y
          let x1 = x * Math.cos(rotationY) + z * Math.sin(rotationY);
          let z2 = -x * Math.sin(rotationY) + z * Math.cos(rotationY);
          x = x1; z = z2;

          // Rotate Z
          let x2 = x * Math.cos(rotationZ) - y * Math.sin(rotationZ);
          let y2 = x * Math.sin(rotationZ) + y * Math.cos(rotationZ);
          x = x2; y = y2;

          // Parallax & Projection
          const perspective = 800 / (800 + z);
          const px = cx + x * perspective + mx * 40 * scale;
          const py = cy + y * perspective + my * 40 * scale;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      };

      // Ring 1 (Slow dynamic rotation)
      drawRing(t * 0.5, t * 0.3, 0, 1, 0.15);
      
      // Ring 2 (Perpendicular)
      drawRing(t * 0.3 + Math.PI / 2, -t * 0.4, t * 0.1, 0.9, 0.25);
      
      // Ring 3 (Inner, linked directly to mouse)
      drawRing(my * 1.5, mx * 1.5, t * 0.2, 0.4, 0.4);

      // Core Spark
      const sparkGlow = ctx.createRadialGradient(
        cx + mx * 16, cy + my * 16, 0, 
        cx + mx * 16, cy + my * 16, 20
      );
      sparkGlow.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      sparkGlow.addColorStop(0.3, 'rgba(255, 255, 255, 0.2)');
      sparkGlow.addColorStop(1, 'transparent');
      
      ctx.fillStyle = sparkGlow;
      ctx.beginPath();
      ctx.arc(cx + mx * 16, cy + my * 16, 20, 0, Math.PI * 2);
      ctx.fill();

      // Subtle atmospheric noise layer effect (simulated with tiny dots in center)
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      for (let i = 0; i < 30; i++) {
        const nx = cx + (Math.random() - 0.5) * ringSize * 1.5;
        const ny = cy + (Math.random() - 0.5) * ringSize * 1.5;
        ctx.fillRect(nx, ny, 1, 1);
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [scrollProgress]);

  return <canvas ref={canvasRef} className="h-full w-full overflow-hidden rounded-[28px]" aria-label="Premium Ambient Gyroscope" />;
}
