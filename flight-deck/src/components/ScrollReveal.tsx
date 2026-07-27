import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFlightStore } from '../store/useFlightStore';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}

export default function ScrollReveal({ children, className, stagger = false, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null!);
  const reducedMotion = useFlightStore((s) => s.reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;

    const el = ref.current;
    const targets = stagger ? el.children : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: stagger ? 0.1 : 0,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, delay, reducedMotion]);

  return (
    <div ref={ref} className={className} style={{ opacity: reducedMotion ? 1 : undefined }}>
      {children}
    </div>
  );
}
