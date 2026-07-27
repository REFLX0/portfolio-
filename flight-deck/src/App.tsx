import { useEffect } from 'react';
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
import type { WaypointIndex } from './data/profile';

export default function App() {
  const setScrollProgress = useFlightStore((s) => s.setScrollProgress);
  const setActiveWaypoint = useFlightStore((s) => s.setActiveWaypoint);
  const setAssetsLoaded = useFlightStore((s) => s.setAssetsLoaded);
  const setBootComplete = useFlightStore((s) => s.setBootComplete);
  const reducedMotion = useReducedMotion();
  const setReducedMotionStore = useFlightStore((s) => s.setReducedMotion);

  useEffect(() => {
    setReducedMotionStore(reducedMotion);
  }, [reducedMotion, setReducedMotionStore]);

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

  return (
    <>
      <CanvasBackground />
      <Nav />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <div className="section-divider"><hr /></div>
        <ScrollReveal>
          <Flagship />
        </ScrollReveal>
        <div className="section-divider"><hr /></div>
        <ScrollReveal>
          <ProjectGrid />
        </ScrollReveal>
        <div className="section-divider"><hr /></div>
        <ScrollReveal>
          <Skills />
        </ScrollReveal>
        <div className="section-divider"><hr /></div>
        <ScrollReveal>
          <Timeline />
        </ScrollReveal>
        <div className="section-divider"><hr /></div>
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </main>
    </>
  );
}
