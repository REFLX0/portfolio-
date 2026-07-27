import { useEffect, useRef, useCallback } from 'react';
import { useFlightStore } from '../store/useFlightStore';

interface Blob {
  x: number; y: number; vx: number; vy: number;
  radius: number; color: string; opacity: number;
  phase: number; speed: number;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const rafRef = useRef(0);
  const reducedMotion = useFlightStore((s) => s.reducedMotion);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d', { willReadFrequently: false })!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: false })!;

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    // Subtle neutral blobs for dark theme
    const blobs: Blob[] = [
      { x: 0.15, y: 0.25, vx: 0.0002, vy: 0.0001, radius: 350, color: '#ffffff', opacity: 0.03, phase: 0, speed: 0.0005 },
      { x: 0.75, y: 0.55, vx: -0.0001, vy: 0.0002, radius: 400, color: '#ffffff', opacity: 0.025, phase: 2, speed: 0.0004 },
      { x: 0.5, y: 0.8, vx: 0.0001, vy: -0.0001, radius: 300, color: '#ffffff', opacity: 0.02, phase: 4, speed: 0.0006 },
    ];

    let time = 0;

    function draw() {
      const W = w();
      const H = h();
      ctx.clearRect(0, 0, W, H);

      if (!reducedMotion) time += 1;

      for (const b of blobs) {
        const ox = reducedMotion ? 0 : Math.sin(time * b.speed + b.phase) * 100;
        const oy = reducedMotion ? 0 : Math.cos(time * b.speed * 0.7 + b.phase) * 80;
        const cx = b.x * W + ox;
        const cy = b.y * H + oy;
        const r = b.radius;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, 'rgba(255,255,255,0.04)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0.015)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion, handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className="blob-canvas"
      aria-hidden="true"
    />
  );
}
