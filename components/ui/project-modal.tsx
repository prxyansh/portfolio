'use client';

import { ProjectMediaLayer } from '@/components/ui/project-media-layer';
import { useSound } from '@/components/ui/sound-provider';
import type { Project } from '@/lib/content';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { play } = useSound();

  useEffect(() => {
    if (project) {
      play('modal');
    }
  }, [project, play]);

  useEffect(() => {
    if (!project) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[180] bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            layoutId={`project-card-${project.slug}`}
            className="glass-panel fixed inset-x-4 top-6 bottom-6 z-[200] flex flex-col overflow-hidden sm:inset-auto sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:max-h-[85vh] sm:w-[min(92vw,960px)] sm:-translate-x-1/2 sm:-translate-y-1/2"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 text-xs uppercase tracking-[0.45em] text-white/50 transition hover:text-white sm:right-6 sm:top-6 sm:text-sm"
            >
              Close
            </button>
            <div className="overflow-y-auto px-6 py-9 sm:px-10 sm:py-12">
              <motion.p
                layoutId={`project-role-${project.slug}`}
                className="label-chip text-white/55"
              >
                {project.role}
              </motion.p>
              <motion.h2 layoutId={`project-title-${project.slug}`} className="mt-3 font-[var(--font-display)] text-4xl text-white">
                {project.name}
              </motion.h2>
              <motion.p layoutId={`project-summary-${project.slug}`} className="mt-4 text-sm text-white/70">
                {project.summary}
              </motion.p>
              <motion.p layoutId={`project-stack-${project.slug}`} className="mt-2 font-mono text-xs text-white/60">
                {project.stack}
              </motion.p>

              <div className="relative mt-8 overflow-hidden rounded-[32px] border border-white/10">
                <ProjectMediaLayer
                  {...project.media}
                  className="absolute inset-0 h-full w-full rounded-[32px]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/70" aria-hidden />
                <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                  <p className="label-chip text-white/70">Case Study Atmosphere</p>
                  <div>
                    <p className="font-[var(--font-display)] text-2xl">{project.name}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.4em] text-white/70">{project.role}</p>
                  </div>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-white/75">
                {project.impact.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1 w-8 bg-white/20" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 text-sm text-white/70 md:grid-cols-3">
                <div>
                  <p className="label-chip text-white/45">Challenge</p>
                  <p className="mt-3 text-white/80">{project.challenge}</p>
                </div>
                <div>
                  <p className="label-chip text-white/45">Approach</p>
                  <p className="mt-3 text-white/80">{project.approach}</p>
                </div>
                <div>
                  <p className="label-chip text-white/45">Result</p>
                  <p className="mt-3 text-white/80">{project.result}</p>
                </div>
              </div>

              {project.metrics?.length ? (
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="label-chip text-white/45">Signals</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    {project.metrics.map((metric) => (
                      <div key={`${project.slug}-${metric.label}`} className="rounded-2xl border border-white/10 p-4">
                        <p className="label-chip text-white/50">{metric.label}</p>
                        <p className="mt-2 font-[var(--font-display)] text-xl text-white">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-white/60 hover:text-white"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
