import MagneticButton from '@/components/ui/magnetic-button';
import { identity, projects } from '@/lib/content';
import type { Project } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Params = { slug: string };

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return notFound();

  return (
    <article className="mx-auto flex max-w-5xl flex-col gap-12 px-6">
      <section className="glass-panel flex flex-col gap-6 px-8 py-12">
        <Link href="/work" className="text-xs uppercase tracking-[0.4em] text-white/40">
          ← Back to Work
        </Link>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-white/40">{project.role}</p>
        <h1 className="font-[var(--font-display)] text-4xl text-white">{project.name}</h1>
        <p className="text-sm text-white/70">{project.summary}</p>
        <div className="flex flex-wrap gap-6 text-xs font-mono text-white/60">
          <span>{project.stack}</span>
          {project.liveUrl && (
            <Link href={project.liveUrl} target="_blank" rel="noreferrer" className="underline">
              Live Demo ↗
            </Link>
          )}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="glass-panel p-6">
          <h2 className="font-[var(--font-display)] text-2xl text-white">Impact</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {project.impact.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2 h-1 w-1 rounded-full bg-white/50" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-panel p-6">
          <h2 className="font-[var(--font-display)] text-2xl text-white">What&apos;s next</h2>
          <p className="mt-4 text-sm text-white/70">
            Future iterations will introduce richer media, shader-driven storytelling, and audio cues tied to each milestone to
            match the dark-luxury aesthetic. Assets hook directly into the upcoming 3D + video layers.
          </p>
        </div>
      </section>

      <section className="glass-panel flex flex-col gap-4 px-8 py-10">
        <h2 className="font-[var(--font-display)] text-2xl text-white">Partner with Priyansh</h2>
        <p className="text-sm text-white/70">
          {identity.mission}
        </p>
        <div className="flex flex-wrap gap-4">
          <MagneticButton href={`mailto:${identity.email}`} label="Email" />
          <MagneticButton href="/about" label="About" subtle />
        </div>
      </section>
    </article>
  );
}
