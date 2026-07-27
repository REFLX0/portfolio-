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

    const blobs: Blob[] = [
      { x: 0.2, y: 0.3, vx: 0.0003, vy: 0.0002, radius: 250, color: '#e85d3a', opacity: 0.08, phase: 0, speed: 0.0008 },
      { x: 0.7, y: 0.6, vx: -0.0002, vy: 0.0003, radius: 300, color: '#7c3aed', opacity: 0.06, phase: 2, speed: 0.0006 },
      { x: 0.5, y: 0.8, vx: 0.0001, vy: -0.0002, radius: 200, color: '#3b82f6', opacity: 0.07, phase: 4, speed: 0.001 },
      { x: 0.8, y: 0.2, vx: -0.0003, vy: -0.0001, radius: 180, color: '#10b981', opacity: 0.05, phase: 1, speed: 0.0007 },
    ];

    let time = 0;

    function draw() {
      const W = w();
      const H = h();
      ctx.clearRect(0, 0, W, H);

      if (!reducedMotion) time += 1;

      for (const b of blobs) {
        const ox = reducedMotion ? 0 : Math.sin(time * b.speed + b.phase) * 80;
        const oy = reducedMotion ? 0 : Math.cos(time * b.speed * 0.7 + b.phase) * 60;
        const cx = b.x * W + ox;
        const cy = b.y * H + oy;
        const r = b.radius;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, b.color + '20');
        grad.addColorStop(0.5, b.color + '08');
        grad.addColorStop(1, b.color + '00');

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
