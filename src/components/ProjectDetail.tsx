// src/components/ProjectDetail.tsx
import React, { useEffect, useMemo, useState } from 'react';
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
  onHome: () => void;
}> = ({ project, onBack, onHome }) => {
  const ytId = useMemo(() => (project.videoUrl ? getYouTubeId(project.videoUrl) : null), [project.videoUrl]);

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const openLightbox = (src: string) => setLightboxSrc(src);
  const closeLightbox = () => setLightboxSrc(null);

// ✅ ESC 关闭 + 打开时锁背景滚动（但弹层自己可滚动）
useEffect(() => {
  if (!lightboxSrc) return;

  const body = document.body;
  const prevOverflow = body.style.overflow;
  const prevPaddingRight = body.style.paddingRight;

  // 防止锁滚动后页面横跳：补偿滚动条宽度
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  body.style.overflow = 'hidden';
  if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setLightboxSrc(null);
  };
  window.addEventListener('keydown', onKeyDown);

  return () => {
    body.style.overflow = prevOverflow;
    body.style.paddingRight = prevPaddingRight;
    window.removeEventListener('keydown', onKeyDown);
  };
}, [lightboxSrc]);

  return (
    <div className="w-full">
      {/* 顶部标题 + 按钮 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="font-hand text-4xl md:text-6xl font-bold text-ink">{project.title}</h2>
        <div className="flex gap-3 justify-end">
          <SketchyButton variant="neutral" onClick={onBack} className="text-sm md:text-base">
            ← Back to Works
          </SketchyButton>
          <SketchyButton variant="accent" onClick={onHome} className="text-sm md:text-base">
            Home
          </SketchyButton>
        </div>
      </div>

      {/* 主体信息 */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-white border-4 border-ink rough-border p-2 rotate-1 shadow-xl">
          <img src={project.image} alt={project.title} className="w-full h-auto object-cover border-2 border-ink" draggable={false} />
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

      {/* Gallery */}
      {project.gallery?.length ? (
        <div className="mt-10">
          <h3 className="font-hand text-3xl md:text-4xl font-bold mb-4 border-b-4 border-primary inline-block">
            Gallery
          </h3>

          <p className="font-hand text-base md:text-lg text-ink/60 mb-4">
            Tip: click or double-click an image to zoom. Press ESC to close.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                className="bg-white border-4 border-ink rough-border p-2 shadow-lg text-left cursor-zoom-in"
                onClick={() => openLightbox(src)}
                onDoubleClick={() => openLightbox(src)}
              >
                <img
                  src={src}
                  alt={`${project.title} gallery ${i + 1}`}
                  className="w-full h-48 object-cover border-2 border-ink select-none"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Sections */}
      {project.sections?.length ? (
        <div className="mt-10 space-y-8">
          {project.sections.map((sec, idx) => (
            <section key={idx} className="bg-white border-4 border-ink rough-border shadow-lg p-6 md:p-8">
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

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* ✅ 弹层本身可滚动：你要的“上下翻阅”就在这里 */}
          <div className="w-full h-full overflow-y-auto overscroll-contain p-4 md:p-8">
            {/* ✅ 这里用 min-h-full + flex，让内容能居中但仍支持滚动 */}
            <div className="min-h-full flex items-center justify-center">
              <div
                className="relative w-full max-w-[1200px]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="sticky top-3 ml-auto block z-10"
                  aria-label="Close"
                  title="Close"
                >
                  <div className="bg-white border-4 border-ink rough-border shadow-xl px-3 py-2 font-hand font-bold text-ink hover:scale-[1.02] transition-transform">
                    Close ✕
                  </div>
                </button>

                {/* ✅ 关键：不要 max-h 限死；让图片按原尺寸显示，超出就滚动看 */}
                <div className="bg-white border-4 border-ink rough-border shadow-2xl p-2 mt-3">
                  <img
                    src={lightboxSrc}
                    alt="Zoomed"
                    className="w-full h-auto object-contain select-none block"
                    draggable={false}
                  />
                </div>

                <div className="mt-3 text-center font-hand text-white/80 text-sm">
                  Scroll to view · Click outside / press ESC to close
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;