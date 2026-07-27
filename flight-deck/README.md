# Mohamed Aziz Jlassi — Portfolio

A dark-themed, scroll-driven portfolio for an AI & Robotics engineer. Minimal, fast, readable — no heavy 3D, no templates.

## Tech Stack

- **Framework:** Vite + React 19 + TypeScript
- **Animation:** GSAP (ScrollTrigger)
- **State:** Zustand
- **Styling:** Tailwind CSS v4 (CSS-first config)
- **Background:** 2D Canvas particle network (zero WebGL)
- **Fonts:** Bricolage Grotesque, IBM Plex Sans, IBM Plex Mono (self-hosted)
- **Icons:** Lucide React

## Getting Started

```bash
npm install
npm run dev
npm run build
```

## Features

- Animated circuit-board SVG in the hero (robotics/automation theme)
- 2D Canvas particle network background
- GSAP ScrollTrigger-driven section reveals
- Six content sections: Hero, Flagship Project, Projects, Skills, Experience, Contact
- Interactive drone subsystem hotspots
- Responsive from 360px to ultrawide
- Mobile nav with dot indicators, desktop with labels
- `prefers-reduced-motion` fully respected
- Keyboard accessible with visible focus states

## License

MIT