import { useEffect, useCallback, useState } from 'react';
import { useFlightStore } from './store/useFlightStore.ts';
import { useReducedMotion } from './hooks/useReducedMotion.ts';
import Scene from './scene/Scene.tsx';
import Hud from './hud/Hud.tsx';
import Nav from './components/Nav.tsx';
import Hero from './sections/Hero.tsx';
import Flagship from './sections/Flagship.tsx';
import ProjectGrid from './sections/ProjectGrid.tsx';
import Skills from './sections/Skills.tsx';
import Timeline from './sections/Timeline.tsx';
import Contact from './sections/Contact.tsx';
import type { WaypointIndex } from './data/profile.ts';

export default function App() {
  const setScrollProgress = useFlightStore((s) => s.setScrollProgress);
  const setActiveWaypoint = useFlightStore((s) => s.setActiveWaypoint);
  const setAssetsLoaded = useFlightStore((s) => s.setAssetsLoaded);
  const reducedMotion = useReducedMotion();
  const setReducedMotionStore = useFlightStore((s) => s.setReducedMotion);
  const bootComplete = useFlightStore((s) => s.bootComplete);
  const [showHotspots, setShowHotspots] = useState(false);
  const [hotspotInfo, setHotspotInfo] = useState<{ label: string; blurb: string } | null>(null);

  useEffect(() => {
    setReducedMotionStore(reducedMotion);
  }, [reducedMotion, setReducedMotionStore]);

  useEffect(() => {
    const timer = setTimeout(() => setAssetsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, [setAssetsLoaded]);

  useEffect(() => {
    if (!bootComplete) return;
    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined;

    const init = async () => {
      const gsapMod = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapMod.gsap;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const wpIndex = Math.min(5, Math.floor(self.progress * 6)) as WaypointIndex;
            setActiveWaypoint(wpIndex);
            setShowHotspots(wpIndex === 1);
          },
        });
      });
    };

    init();
    return () => { ctx?.revert(); };
  }, [bootComplete, setScrollProgress, setActiveWaypoint]);

  const handleHotspotClick = useCallback((_part: string, label: string, blurb: string) => {
    setHotspotInfo({ label, blurb });
  }, []);

  return (
    <>
      <Scene showHotspots={showHotspots} onHotspotClick={handleHotspotClick} />
      <Hud />
      <Nav />
      {hotspotInfo && (
        <div className="fixed bottom-16 right-4 z-50 px-4 py-3 rounded-md max-w-xs" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-signal)', fontFamily: 'var(--font-body)' }}>
          <div className="text-sm font-medium mb-1" style={{ color: 'var(--color-signal)' }}>{hotspotInfo.label}</div>
          <div className="text-xs text-muted" style={{ lineHeight: 1.5 }}>{hotspotInfo.blurb}</div>
          <button className="absolute top-2 right-2 text-xs text-muted cursor-pointer" onClick={() => setHotspotInfo(null)} aria-label="Close" style={{ background: 'none', border: 'none', padding: 4 }}>&times;</button>
        </div>
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Flagship onHotspotClick={handleHotspotClick} />
        <ProjectGrid />
        <Skills />
        <Timeline />
        <Contact />
      </div>
    </>
  );
}
