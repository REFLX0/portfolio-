import { useEffect, useCallback, useState } from 'react';
import { useFlightStore } from './store/useFlightStore';
import { useReducedMotion } from './hooks/useReducedMotion';
import CanvasBackground from './components/CanvasBackground';
import ScrollReveal from './components/ScrollReveal';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import Flagship from './sections/Flagship';
import ProjectGrid from './sections/ProjectGrid';
import Skills from './sections/Skills';
import Timeline from './sections/Timeline';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import type { WaypointIndex } from './data/profile';

export default function App() {
  const setScrollProgress = useFlightStore((s) => s.setScrollProgress);
  const setActiveWaypoint = useFlightStore((s) => s.setActiveWaypoint);
  const setAssetsLoaded = useFlightStore((s) => s.setAssetsLoaded);
  const setBootComplete = useFlightStore((s) => s.setBootComplete);
  const reducedMotion = useReducedMotion();
  const setReducedMotionStore = useFlightStore((s) => s.setReducedMotion);
  const [hotspotInfo, setHotspotInfo] = useState<{ label: string; blurb: string } | null>(null);

  useEffect(() => {
    setReducedMotionStore(reducedMotion);
  }, [reducedMotion, setReducedMotionStore]);

  // Skip boot sequence for instant load
  useEffect(() => {
    setAssetsLoaded(true);
    setBootComplete(true);
  }, [setAssetsLoaded, setBootComplete]);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context> | undefined;

    const init = async () => {
      const gsapMod = await import('gsap');
      const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger');
      const gsap = gsapMod.gsap;
      gsap.registerPlugin(ST);

      ctx = gsap.context(() => {
        ST.create({
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const wpIndex = Math.min(5, Math.floor(self.progress * 6)) as WaypointIndex;
            setActiveWaypoint(wpIndex);
          },
        });
      });
    };

    init();
    return () => { ctx?.revert(); };
  }, [setScrollProgress, setActiveWaypoint]);

  const handleHotspotClick = useCallback((_part: string, label: string, blurb: string) => {
    setHotspotInfo({ label, blurb });
  }, []);

  return (
    <>
      <CanvasBackground />
      <Nav />
      {hotspotInfo && (
        <div
          className="fixed bottom-6 right-4 z-50 px-4 py-3 rounded-lg max-w-xs"
          style={{
            background: 'color-mix(in srgb, var(--color-panel) 95%, transparent)',
            border: '1px solid var(--color-signal)',
            backdropFilter: 'blur(12px)',
            fontFamily: 'var(--font-body)',
          }}
        >
          <div className="text-sm font-medium mb-1" style={{ color: 'var(--color-signal)' }}>
            {hotspotInfo.label}
          </div>
          <div className="text-xs text-muted" style={{ lineHeight: 1.5 }}>
            {hotspotInfo.blurb}
          </div>
          <button
            className="absolute top-2 right-2 text-xs text-muted cursor-pointer"
            onClick={() => setHotspotInfo(null)}
            aria-label="Close"
            style={{ background: 'none', border: 'none', padding: 4 }}
          >
            ×
          </button>
        </div>
      )}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <ScrollReveal>
          <Flagship onHotspotClick={handleHotspotClick} />
        </ScrollReveal>
        <ScrollReveal>
          <ProjectGrid />
        </ScrollReveal>
        <ScrollReveal>
          <Skills />
        </ScrollReveal>
        <ScrollReveal>
          <Timeline />
        </ScrollReveal>
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </main>
    </>
  );
}
