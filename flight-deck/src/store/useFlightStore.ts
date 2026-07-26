import { create } from 'zustand';
import type { WaypointIndex } from '../data/profile';

interface FlightState {
  /** 0→1 normalised scroll progress through the entire flight */
  scrollProgress: number;
  /** Which waypoint is currently active (0–5) */
  activeWaypoint: WaypointIndex;
  /** Whether fonts + 3D assets are ready */
  assetsLoaded: boolean;
  /** Whether the user prefers reduced motion */
  reducedMotion: boolean;
  /** Whether the boot sequence has finished */
  bootComplete: boolean;

  setScrollProgress: (v: number) => void;
  setActiveWaypoint: (v: WaypointIndex) => void;
  setAssetsLoaded: (v: boolean) => void;
  setReducedMotion: (v: boolean) => void;
  setBootComplete: (v: boolean) => void;
}

export const useFlightStore = create<FlightState>((set) => ({
  scrollProgress: 0,
  activeWaypoint: 0,
  assetsLoaded: false,
  reducedMotion: false,
  bootComplete: false,

  setScrollProgress: (v) => set({ scrollProgress: v }),
  setActiveWaypoint: (v) => set({ activeWaypoint: v }),
  setAssetsLoaded: (v) => set({ assetsLoaded: v }),
  setReducedMotion: (v) => set({ reducedMotion: v }),
  setBootComplete: (v) => set({ bootComplete: v }),
}));
