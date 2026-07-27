import { useEffect, useRef } from 'react';
import { useFlightStore } from '../store/useFlightStore';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const reducedMotion = useFlightStore((s) => s.reducedMotion);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const c = ctx;

    let w = 0;
    let h = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      const count = Math.min(60, Math.floor((w * h) / 20000));
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 1 + Math.random() * 2,
          opacity: 0.1 + Math.random() * 0.3,
        });
      }
      particlesRef.current = particles;
    }

    function draw() {
      c.clearRect(0, 0, w, h);

      // Dot grid
      const spacing = 40;
      c.fillStyle = 'rgba(39, 39, 42, 0.5)';
      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          c.fillRect(x, y, 1, 1);
        }
      }

      // Particles
      const particles = particlesRef.current;
      for (const p of particles) {
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
        }
        c.beginPath();
        c.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(111, 199, 212, ${p.opacity})`;
        c.fill();
      }

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = dx * dx + dy * dy;
          if (dist < 18000) {
            c.beginPath();
            c.moveTo(particles[i].x, particles[i].y);
            c.lineTo(particles[j].x, particles[j].y);
            c.strokeStyle = `rgba(111, 199, 212, ${0.06 * (1 - dist / 18000)})`;
            c.lineWidth = 0.5;
            c.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    window.addEventListener('resize', () => { resize(); initParticles(); });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
