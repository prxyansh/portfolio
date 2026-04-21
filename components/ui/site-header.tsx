import Link from 'next/link';
import MagneticButton from './magnetic-button';

const navLinks = [
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Timeline', href: '/#timeline' },
  { label: 'Work', href: '/#work' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
];

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex justify-center pt-6">
      <div className="glass-panel flex w-[92vw] max-w-5xl items-center justify-between px-6 py-3 text-sm">
        <Link href="/" className="font-[var(--font-display)] text-lg text-white">
          Obsidian Studio
        </Link>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.4em] text-white/60 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <MagneticButton href="mailto:priyanshupaswan@gmail.com" label="Contact" subtle />
        </div>
      </div>
    </header>
  );
}
