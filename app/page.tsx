'use client';

import FluidCursor from '@/components/ui/fluid-cursor';
import MagneticButton from '@/components/ui/magnetic-button';
import { ProjectModal } from '@/components/ui/project-modal';
import { ProjectMediaLayer } from '@/components/ui/project-media-layer';
import { ScrollytellingCanvas } from '@/components/ui/scrollytelling-canvas';
import { SoundProvider, useSound } from '@/components/ui/sound-provider';
import {
  capabilities,
  heroMetrics,
  highlights,
  identity,
  projects,
  storyChapters,
  timelineMilestones,
} from '@/lib/content';
import type { Project } from '@/lib/content';
import { motionTokens } from '@/lib/motion';
import type { MotionValue } from 'framer-motion';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const HeroScene = dynamic(() => import('@/components/ui/hero-scene').then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-[32px] bg-white/5" />,
});

const grainTexture =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: motionTokens.durations.base, ease: motionTokens.easings.luxe },
  viewport: { once: true, margin: '-80px' },
};

export default function Home() {
  return (
    <SoundProvider>
      <PageContent />
    </SoundProvider>
  );
}

function PageContent() {
  const { scrollYProgress } = useScroll();
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { play } = useSound();

  const handleOpenProject = (project: Project) => {
    play('modal');
    setActiveProject(project);
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-night)] text-[var(--color-smoke)]">
      <FluidCursor />
      <VignetteNoiseLayer progress={scrollYProgress} />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[40rem] blur-[120px]"
        style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(111,108,255,0.35), transparent 60%)',
          y: glowY,
        }}
      />
      <main className="relative z-10 mx-auto flex min-h-screen max-w-[1800px] flex-col gap-32 px-6 py-16 md:px-10 lg:px-20">
        <HeroSection />
        <ParallaxDepthSection />
        <BentoGridSection />
        <ChronologySection />
        <ScrollytellingSection />
        <ShowcaseSection onOpen={handleOpenProject} />
        <FinalCallout />
      </main>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] });
  const [heroScroll, setHeroScroll] = useState(0);
  const [webglReady, setWebglReady] = useState<null | boolean>(null);
  useMotionValueEvent(scrollYProgress, 'change', (latest) => setHeroScroll(latest));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglReady(!!gl);
    } catch (e) {
      setWebglReady(false);
    }
  }, []);

  return (
    <section ref={heroRef} className="glass-panel relative overflow-hidden px-5 py-14 sm:px-10 sm:py-16">
      <motion.div
        className="absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/30 via-white/5 to-transparent blur-[120px] lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative z-10 flex flex-col gap-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-6 text-balance">
            <p className="label-chip text-white/60">{identity.name}</p>
            <motion.h1
              {...reveal}
              className="ligature-play font-[var(--font-display)] text-4xl leading-[1.05] text-white md:text-6xl lg:text-7xl"
            >
              {identity.headline}
            </motion.h1>
            <motion.p
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.15 }}
              className="max-w-2xl text-lg text-white/70"
              data-cursor="text"
            >
              {identity.mission}
            </motion.p>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-4">
                <MagneticButton href="#work" label="View Work" className="bg-white/80 text-slate-900" />
                <MagneticButton href="/work" label="Case Studies" subtle />
              </div>
              <motion.div
                className="hidden items-center gap-4 text-sm text-white/60 md:flex"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: motionTokens.durations.base, ease: motionTokens.easings.luxe }}
              >
                <span className="h-[1px] w-24 bg-white/30" />
                {identity.availability}
              </motion.div>
            </div>
          </div>
          <div className="relative order-first h-[320px] rounded-[32px] bg-white/5 p-2 sm:h-[380px] lg:order-last lg:h-[520px] lg:sticky lg:top-28">
            {webglReady === true ? (
              <HeroScene scrollProgress={heroScroll} />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-[28px] bg-gradient-to-br from-white/10 via-white/5 to-transparent text-xs uppercase tracking-[0.4em] text-white/60">
                {webglReady === false ? 'WebGL unavailable — showing fallback' : 'Initializing renderer…'}
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-6 pb-5 text-[0.65rem] uppercase tracking-[0.5em] text-white/40">
              <span>Realtime refractive study</span>
              <span>{Math.round(heroScroll * 100)}% scroll light</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 border-t border-white/10 pt-8 text-white/70 md:grid-cols-3">
          {heroMetrics.map((stat) => (
            <motion.div key={stat.label} {...reveal} className="space-y-2" data-cursor="text">
              <p className="label-chip text-white/45">{stat.label}</p>
              <p className="font-[var(--font-display)] text-4xl text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="border border-white/10 p-5 sm:p-6">
          <p className="label-chip text-white/45">Highlights</p>
          <ul className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-pretty">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ParallaxDepthSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const layerSlow = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const layerMid = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const layerFast = useTransform(scrollYProgress, [0, 1], ['0%', '-32%']);

  return (
    <section ref={ref} className="relative overflow-hidden rounded-[32px] border border-white/10 px-5 py-16 sm:px-12 sm:py-20">
      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        <p className="label-chip text-white/45">Parallax Canvas</p>
        <h2 className="ligature-play font-[var(--font-display)] text-4xl text-white">Precision layers choreographed by scroll.</h2>
        <p className="max-w-2xl text-sm text-white/65">
          Micro-depth cues reinforce hierarchy. Scroll to watch spectral lines, particles, and liquid gradients drift at distinct
          velocities—an ambient stage for immersive case studies.
        </p>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-30%] top-8 h-64 rounded-full opacity-40 blur-[80px]"
        style={{
          background: 'linear-gradient(120deg, rgba(126,124,255,0.35), rgba(255,198,143,0.25))',
          y: layerSlow,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-10%] top-32 h-64 border border-white/10 opacity-60"
        style={{ y: layerMid }}
      >
        <div className="grid-lines h-full w-full opacity-40" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-20%] top-48 h-56 rotate-6 opacity-70"
        style={{ y: layerFast }}
      >
        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </motion.div>
    </section>
  );
}

function ChronologySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end end'] });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const { play } = useSound();

  return (
    <section ref={ref} id="timeline" className="flex flex-col gap-10">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <p className="label-chip text-white/50">Scroll-triggered timeline</p>
        <h2 className="ligature-play max-w-3xl font-[var(--font-display)] text-4xl text-white">
          Each milestone unlocks with motion, revealing the systems thinking that shaped it.
        </h2>
      </div>

      <div className="relative pl-8 sm:pl-12">
        <span className="absolute left-3 sm:left-4 top-0 h-full w-px bg-white/15" />
        <motion.span
          className="absolute left-3 sm:left-4 top-0 w-px bg-gradient-to-b from-white via-white/60 to-transparent"
          style={{ height: progressHeight }}
        />
        <div className="space-y-10 sm:space-y-12">
          {timelineMilestones.map((item) => (
            <motion.article
              key={`${item.year}-${item.title}`}
              {...reveal}
              className="pl-5 sm:pl-6"
              transition={{ ...reveal.transition, duration: motionTokens.durations.lg }}
              onViewportEnter={() => play('timeline')}
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/40">{item.year}</span>
                <span className="h-px flex-1 bg-white/15" />
              </div>
              <h3 className="font-[var(--font-display)] text-2xl text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-white/70">{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollytellingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const observers = chapterRefs.current.map((chapterRef, index) => {
      if (!chapterRef) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            setActiveChapter(index);
            console.log('Active chapter:', index + 1);
          }
        },
        { threshold: [0, 0.2, 0.5, 0.8, 1], rootMargin: '-20% 0px -20% 0px' }
      );
      observer.observe(chapterRef);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section ref={ref} className="grid gap-10 lg:grid-cols-[0.52fr_0.48fr]">
      <div 
        className="glass-panel relative p-8 lg:sticky lg:top-24 lg:h-[500px] lg:p-10"
        style={{ borderRadius: 48 }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ borderRadius: 48 }}>
          <ScrollytellingCanvas progress={scrollYProgress} activeChapter={activeChapter} totalChapters={storyChapters.length} />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <p className="label-chip text-[var(--color-iris)]/80">Scrollytelling Lab</p>
            <h2 className="ligature-play mt-4 font-[var(--font-display)] text-4xl text-white">
              Sticky narrative, adaptive visuals.
            </h2>
            <p className="mt-4 max-w-md text-sm text-white/70">
              Scroll to pin the narrative while gradients, particles, and light leaks recompose to echo each chapter.
            </p>
          </div>
          <p className="label-chip text-[var(--color-iris)]/75">
            Chapter {activeChapter + 1} of {storyChapters.length}
          </p>
        </div>
      </div>

      <div className="space-y-16" data-cursor="text">
        {storyChapters.map((frame, index) => (
          <motion.article
            key={frame.label}
            ref={(el) => {
              chapterRefs.current[index] = el;
            }}
            {...reveal}
            transition={{ ...reveal.transition, delay: index * 0.05 }}
            className="border-l border-white/15 pl-6"
          >
            <p className="label-chip text-white/45">{frame.label}</p>
            <h3 className="mt-3 font-[var(--font-display)] text-2xl text-white">{frame.title}</h3>
            <p className="drop-cap mt-3 text-sm text-white/70">{frame.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function BentoGridSection() {
  return (
    <section id="capabilities" className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <p className="label-chip text-white/55">Capabilities</p>
        <h2 className="ligature-play max-w-5xl font-[var(--font-display)] text-5xl text-white">Architecting sensory systems across the stack.</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-cursor="text">
        {capabilities.map((item) => (
          <motion.article
            key={item.title}
            {...reveal}
            className="glass-panel relative flex flex-col gap-4 p-6"
          >
            <span className="label-chip text-white/45">{item.accent}</span>
            <h3 className="font-[var(--font-display)] text-2xl text-white">{item.title}</h3>
            <p className="text-sm text-white/70">{item.description}</p>
            <div className="mt-auto flex items-center gap-2 text-xs text-white/50">
              <span className="h-[1px] w-12 bg-white/20" />
              Always bespoke
            </div>
            <motion.div
              className="absolute inset-0 -z-10 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                background:
                  'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15), transparent 45%), radial-gradient(circle at 80% 0%, rgba(251,214,171,0.2), transparent 50%)',
              }}
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ShowcaseSection({ onOpen }: { onOpen: (project: Project) => void }) {
  return (
    <section id="work" className="flex flex-col gap-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <p className="label-chip text-white/55">Showcase</p>
          <h2 className="ligature-play font-[var(--font-display)] text-5xl text-white text-balance">Editorial-grade experiments in motion.</h2>
        </div>
        <div className="flex items-end">
          <p className="max-w-2xl text-base text-white/65">
            Swipe through a cinematic reel—each build blends research depth, tactile UI, and measurable throughput.
          </p>
        </div>
      </div>

      <div className="scrollbar-hide flex gap-6 overflow-x-auto overflow-y-visible py-4 snap-x snap-mandatory sm:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const { slug, name, role, stack, summary, impact, media } = project;
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltX = useTiltSpring();
  const tiltY = useTiltSpring();
  const { play } = useSound();

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;
    tiltX.set((0.5 - relY) * 12);
    tiltY.set((relX - 0.5) * 16);
  };

  return (
    <motion.article
      layoutId={`project-card-${slug}`}
      ref={cardRef}
      data-cursor="focus"
      className="glass-panel relative min-h-[420px] w-[280px] flex-shrink-0 snap-center overflow-visible px-6 pt-8 pb-6 sm:w-[320px] sm:snap-start origin-center"
      whileHover={{ scale: 1.005 }}
      style={{ rotateX: tiltX.spring, rotateY: tiltY.spring }}
      onMouseEnter={() => play('hover')}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => {
        tiltX.reset();
        tiltY.reset();
      }}
      onClick={() => onOpen(project)}
      onFocus={() => play('hover')}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(project);
        }
      }}
      aria-label={`Open case study for ${name}`}
    >
      <div className="relative z-10 flex flex-col gap-6">
        <div className="space-y-2">
          <motion.p layoutId={`project-role-${slug}`} className="label-chip text-white/55 break-words">
            {role}
          </motion.p>
          <motion.h3 layoutId={`project-title-${slug}`} className="font-[var(--font-display)] text-3xl text-white break-words">
            {name}
          </motion.h3>
        </div>
        <motion.p layoutId={`project-summary-${slug}`} className="text-sm text-white/70">
          {summary}
        </motion.p>
        <motion.p layoutId={`project-stack-${slug}`} className="font-mono text-xs text-white/60">
          {stack}
        </motion.p>
        {project.metrics?.length ? (
          <div className="flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-white/70">
            {project.metrics.slice(0, 2).map((metric) => (
              <span
                key={`${slug}-${metric.label}`}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80"
              >
                {metric.value}
              </span>
            ))}
          </div>
        ) : null}
        <ul className="space-y-2 text-xs text-white/60">
          {impact.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="mt-1 h-1 w-1 rounded-full bg-white/60" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <Link
          href={`/work/${slug}`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-white hover:text-white/70"
        >
          Case Study <span>↗</span>
        </Link>
      </div>
      <ProjectMediaLayer {...media} />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/10" aria-hidden />
    </motion.article>
  );
}

function FinalCallout() {
  return (
    <section id="contact" className="glass-panel flex flex-col gap-8 px-8 py-14 text-center">
      <p className="label-chip text-white/55">Let&apos;s design the future</p>
      <h2 className="ligature-play font-[var(--font-display)] text-4xl text-white">
        Seeking collaborations where engineering, security, and intelligence intersect.
      </h2>
      <p className="drop-cap mx-auto max-w-3xl text-sm text-white/70">
        Exploring secure software, ML tooling, marketplaces, and computational artistry. Bring the bold problems—let’s map the
        system and ship it.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <MagneticButton href={`mailto:${identity.email}`} label="Email Priyansh" />
        <MagneticButton href="/about" label="About" subtle />
      </div>
      <div className="flex justify-center gap-8 text-xs uppercase tracking-[0.4em] text-white/40">
        <Link href={identity.links.github} target="_blank" rel="noreferrer">
          GitHub
        </Link>
        <Link href={identity.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </Link>
      </div>
    </section>
  );
}

function useTiltSpring(limit = 14) {
  const raw = useMotionValue(0);
  const spring = useSpring(raw, motionTokens.springs.gentle);
  return {
    spring,
    set: (value: number) => raw.set(Math.max(Math.min(value, limit), -limit)),
    reset: () => raw.set(0),
  };
}

function VignetteNoiseLayer({ progress }: { progress: MotionValue<number> }) {
  const vignetteOpacity = useTransform(progress, [0, 1], [0.35, 0.65]);
  const vignetteX = useTransform(progress, [0, 1], ['30%', '65%']);
  const vignetteY = useTransform(progress, [0, 1], ['35%', '60%']);
  const vignetteBackground = useMotionTemplate`radial-gradient(circle at ${vignetteX} ${vignetteY}, rgba(255, 255, 255, 0.12), transparent 55%), radial-gradient(circle at 50% 120%, rgba(2, 3, 8, 0.92), transparent 72%)`;
  const grainOpacity = useTransform(progress, [0, 1], [0.12, 0.2]);
  const grainX = useTransform(progress, [0, 1], ['0px', '80px']);
  const grainY = useTransform(progress, [0, 1], ['0px', '120px']);
  const grainPosition = useMotionTemplate`${grainX} ${grainY}`;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] mix-blend-soft-light"
        style={{ opacity: vignetteOpacity, backgroundImage: vignetteBackground }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] mix-blend-screen"
        style={{
          opacity: grainOpacity,
          backgroundImage: `url(${grainTexture})`,
          backgroundSize: '240px 240px',
          backgroundPosition: grainPosition,
        }}
      />
    </>
  );
}
