// src/components/ProjectDetail.tsx
import React from 'react';
import type { Project } from '../types';
import { SketchyButton } from './SketchyButton';

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.replace('/', '') || null;
    if (u.searchParams.get('v')) return u.searchParams.get('v');
    const parts = u.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] ?? null;
  } catch {
    return null;
  }
}

const ProjectDetail: React.FC<{
  project: Project;
  onBack: () => void;
  onClose: () => void;
}> = ({ project, onBack, onClose }) => {
  const ytId = project.videoUrl ? getYouTubeId(project.videoUrl) : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md overflow-y-auto" onClick={onClose}>
      <div className="mx-auto w-full max-w-5xl p-4 md:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="bg-neutral border-4 border-ink rough-border shadow-2xl p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="font-hand text-4xl md:text-6xl font-bold text-ink">{project.title}</h2>
            <div className="flex gap-3 justify-end">
              <SketchyButton variant="neutral" onClick={onBack} className="text-sm md:text-base">
                ← Back to Works
              </SketchyButton>
              <SketchyButton variant="accent" onClick={onClose} className="text-sm md:text-base">
                Close
              </SketchyButton>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white border-4 border-ink rough-border p-2 rotate-1 shadow-xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover border-2 border-ink"
                draggable={false}
              />
            </div>

            <div className="font-hand text-ink">
              <p className="text-xl md:text-2xl leading-relaxed text-ink/80 mb-4">{project.description}</p>

              <div className="space-y-3 text-lg md:text-xl">
                {project.year && (
                  <div className="flex gap-2">
                    <span className="font-bold">Year:</span>
                    <span>{project.year}</span>
                  </div>
                )}
                {project.role && (
                  <div className="flex gap-2">
                    <span className="font-bold">Role:</span>
                    <span>{project.role}</span>
                  </div>
                )}
                {project.tools?.length ? (
                  <div className="flex gap-2">
                    <span className="font-bold">Tools:</span>
                    <span>{project.tools.join(' · ')}</span>
                  </div>
                ) : null}
              </div>

              {project.videoUrl && ytId && (
                <div className="mt-6">
                  <div className="aspect-video w-full border-4 border-ink rough-border shadow-2xl bg-ink">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${ytId}`}
                      title={`${project.title} Video`}
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {project.gallery?.length ? (
            <div className="mt-10">
              <h3 className="font-hand text-3xl md:text-4xl font-bold mb-4 border-b-4 border-primary inline-block">
                Gallery
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.gallery.map((src, i) => (
                  <div key={i} className="bg-white border-4 border-ink rough-border p-2 shadow-lg">
                    <img
                      src={src}
                      alt={`${project.title} gallery ${i + 1}`}
                      className="w-full h-48 object-cover border-2 border-ink"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {project.sections?.length ? (
            <div className="mt-10 space-y-8">
              {project.sections.map((sec, idx) => (
                <section
                  key={idx}
                  className="bg-white border-4 border-ink rough-border shadow-lg p-6 md:p-8"
                >
                  <h3 className="font-hand text-3xl md:text-4xl font-bold mb-4 border-b-4 border-primary inline-block">
                    {sec.title}
                  </h3>
                  <div className="font-hand text-xl md:text-2xl leading-relaxed space-y-3 text-ink/80">
                    {sec.body.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
