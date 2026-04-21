import MagneticButton from '@/components/ui/magnetic-button';
import { certifications, education, identity, highlights } from '@/lib/content';

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6">
      <section className="glass-panel flex flex-col gap-6 px-8 py-12">
        <p className="font-mono text-xs uppercase tracking-[0.5em] text-white/50">About</p>
        <h1 className="font-[var(--font-display)] text-4xl text-white">{identity.name}</h1>
        <p className="text-white/70">{identity.headline}</p>
        <p className="text-sm text-white/70">{identity.mission}</p>
        <div className="flex gap-4">
          <MagneticButton href={`mailto:${identity.email}`} label="Get in touch" />
          <MagneticButton href="/work" label="View Work" subtle />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="glass-panel p-6">
          <h2 className="font-[var(--font-display)] text-2xl text-white">Highlights</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-panel p-6">
          <h2 className="font-[var(--font-display)] text-2xl text-white">Education</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {education.map((item) => (
              <li key={item.program}>
                <p className="font-semibold text-white">{item.program}</p>
                <p className="text-white/60">{item.institution}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="glass-panel p-6">
        <h2 className="font-[var(--font-display)] text-2xl text-white">Certifications & Recognitions</h2>
        <ul className="mt-4 space-y-2 text-sm text-white/70">
          {certifications.map((cert) => (
            <li key={cert} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
              <span>{cert}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
