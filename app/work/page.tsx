import MagneticButton from '@/components/ui/magnetic-button';
import { identity, projects } from '@/lib/content';

export default function WorkIndex() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6">
      <section className="glass-panel flex flex-col gap-6 px-8 py-12">
        <p className="font-mono text-xs uppercase tracking-[0.5em] text-white/50">Case Studies</p>
        <h1 className="font-[var(--font-display)] text-4xl text-white">Systems engineered for real impact.</h1>
        <p className="text-white/70">
          Explore deep dives across complexity analytics, secure desktop tooling, multiplayer protocols, GAN experiments, and
          AI-assisted marketplaces. Each project links back to the flagship experience while offering full context here.
        </p>
        <div>
          <MagneticButton href={`mailto:${identity.email}`} label="Collaborate" />
        </div>
      </section>

      <div className="space-y-10">
        {projects.map((project) => (
          <article key={project.slug} className="glass-panel flex flex-col gap-4 px-8 py-6">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-white/40">{project.role}</p>
              <h2 className="mt-2 font-[var(--font-display)] text-3xl text-white">{project.name}</h2>
            </div>
            <p className="text-sm text-white/70">{project.summary}</p>
            <p className="font-mono text-xs text-white/60">{project.stack}</p>
            <ul className="space-y-2 text-sm text-white/65">
              {project.impact.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 rounded-full bg-white/50" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4 pt-4">
              <MagneticButton href={`/work/${project.slug}`} label="Open Case" subtle />
              {project.liveUrl && (
                <MagneticButton href={project.liveUrl} label="Live" subtle />
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
