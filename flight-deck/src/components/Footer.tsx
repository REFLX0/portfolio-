import { profile } from '../data/profile.ts';

export default function Footer() {
  return (
    <footer
      className="py-6 text-center text-xs"
      style={{ color: 'var(--color-line)', fontFamily: 'var(--font-mono)' }}
    >
      &copy; {new Date().getFullYear()} {profile.meta.name}. Built from scratch, no templates.
    </footer>
  );
}
