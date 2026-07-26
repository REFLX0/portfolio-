# Mohamed Aziz Jlassi — Portfolio

A scroll-driven 3D portfolio for an AI & Robotics engineer, built with a flight-deck metaphor drawn from his own autonomous drone project.

## Tech Stack

- **Framework:** Vite + React 19 + TypeScript
- **3D:** Three.js + React Three Fiber + Drei
- **Animation:** GSAP (ScrollTrigger)
- **State:** Zustand
- **Styling:** Tailwind CSS v4 (CSS-first config)
- **Fonts:** Bricolage Grotesque, IBM Plex Sans, IBM Plex Mono (self-hosted via @fontsource)
- **Icons:** Lucide React

## Getting Started

```bash
npm install
npm run dev
npm run build
```

## Features

- Procedurally-built 3D quadcopter (no external models) that flies a path through the page as you scroll
- Live HUD telemetry overlay (altitude, speed, heading, battery, GPS coordinates, waypoint code)
- Boot sequence animation on load
- Six content waypoints (sections): Origin, Primary Mission, Payload Bay, Systems Check, Flight Log, Rendezvous
- Interactive drone subsystem hotspots at the flagship project waypoint
- Responsive design from 360px to ultrawide
- `prefers-reduced-motion` fully respected
- Keyboard accessible with visible focus states
- Semantic HTML with screen-reader alternatives for the 3D scene

## License

MIT
