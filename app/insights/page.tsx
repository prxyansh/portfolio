import Link from 'next/link';
import MagneticButton from '@/components/ui/magnetic-button';
import { identity, insights } from '@/lib/content';

export default function InsightsPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6">
      <section className="glass-panel flex flex-col gap-6 px-8 py-12">
        <p className="font-mono text-xs uppercase tracking-[0.5em] text-white/50">Insights</p>
        <h1 className="font-[var(--font-display)] text-4xl text-white">Writing, notes, and research logs.</h1>
        <p className="text-sm text-white/70">
          Essays and idea starters covering complexity analysis, security hardening, user-focused marketplaces, and engineering
          rigor. Long-form entries will land here as we publish.
        </p>
      </section>

      <div className="space-y-8">
        {insights.map((post) => (
          <article key={post.slug} className="glass-panel flex flex-col gap-4 px-8 py-6">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-white/40">In progress</p>
            <h2 className="font-[var(--font-display)] text-2xl text-white">{post.title}</h2>
            <p className="text-sm text-white/70">{post.summary}</p>
            <Link href="#" className="text-xs uppercase tracking-[0.4em] text-white/40">
              Coming soon ↗
            </Link>
          </article>
        ))}
      </div>

      <section className="glass-panel flex flex-col gap-4 px-8 py-8">
        <h2 className="font-[var(--font-display)] text-2xl text-white">Have a topic in mind?</h2>
        <p className="text-sm text-white/70">{identity.availability}</p>
        <div className="flex gap-4">
          <MagneticButton href={`mailto:${identity.email}`} label="Propose a topic" />
          <MagneticButton href="/work" label="View projects" subtle />
        </div>
      </section>
    </div>
  );
}
