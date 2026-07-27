import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFlightStore } from '../store/useFlightStore';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null!);
  const reducedMotion = useFlightStore((s) => s.reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;

    const el = ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          delay,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, reducedMotion]);

  return (
    <div ref={ref} className={className} style={{ opacity: reducedMotion ? 1 : undefined }}>
      {children}
    </div>
  );
}
