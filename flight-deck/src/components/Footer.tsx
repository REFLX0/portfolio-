import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} {profile.meta.name} &mdash; Built from scratch, no templates.</p>
    </footer>
  );
}