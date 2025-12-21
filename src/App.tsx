// src/App.tsx
import React, { useState, useEffect } from 'react';
import { PROJECTS, CONTACT_INFO, RESEARCH_LINKS, type ResearchLink } from './constants.ts';
import { ViewState, type ViewState as ViewStateType } from './types';
import { SketchRoom } from './components/SketchRoom.tsx';
import { SketchyButton } from './components/SketchyButton.tsx';
import type { Project } from './types';

const RESUME_PDF_URL = `${import.meta.env.BASE_URL}resume.pdf`;
// ✅ 建议：把你的简历 PDF 放到 public/resume.pdf

const CV_IMAGE_URL =
  'https://freight.cargo.site/t/original/i/H2705368758647484656775227470757/EEEF2095A3B24FADE118BE8C669433B0.png';

// ✅ 书签热区（百分比定位）——你按图片实际书签位置微调这几个数
const CV_BOOKMARKS = [
  { id: 'cv', left: 84, top: 18, width: 14, height: 10, label: 'Download CV' },
];

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewStateType>(ViewState.HOME);
  const [projectIndex, setProjectIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProjectIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const closeModal = () => setViewState(ViewState.HOME);

  const renderModal = () => {
    switch (viewState) {
case ViewState.CV:
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={closeModal}
    >
      {/* ✅ 直接用图片做“弹窗主体”，不要白底外框 */}
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 右上角关闭按钮（悬浮在图片上） */}
        <div className="absolute top-2 right-2 z-30">
          <SketchyButton onClick={closeModal} variant="accent">
            Close
          </SketchyButton>
        </div>

        {/* 图片 + 热区 */}
        <div className="relative w-full">
          <img
            src={CV_IMAGE_URL}
            alt="CV preview"
            className="w-full h-auto block select-none"
            draggable={false}
          />

          {CV_BOOKMARKS.map((b) => (
            <a
              key={b.id}
              href={RESUME_PDF_URL}
              download
              // ✅ 如果你更想“强制下载”，建议删掉 target="_blank"
              target="_blank"
              rel="noreferrer"
              className="absolute group"
              style={{
                left: `${b.left}%`,
                top: `${b.top}%`,
                width: `${b.width}%`,
                height: `${b.height}%`,
              }}
              title={b.label}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 点击区域本体（透明） */}
              <span className="block w-full h-full">
                <span className="sr-only">{b.label}</span>
              </span>

              {/* hover 提示框：Download CV */}
              <span
                className="
                  pointer-events-none
                  absolute
                  -top-10 left-1/2 -translate-x-1/2
                  opacity-0 group-hover:opacity-100
                  transition-opacity
                  z-20
                "
              >
                <span
                  className="
                    bg-white border-2 border-ink text-sm
                    px-2 py-1 md:text-xl md:px-4 md:py-2
                    rounded font-hand font-bold text-ink
                    shadow-[2px_2px_0px_0px_#2d2d2d]
                    whitespace-nowrap
                  "
                >
                  Download CV
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );


      case ViewState.CONTACT:
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="bg-white p-8 max-w-md border-4 border-ink rough-border shadow-xl transform -rotate-1"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-hand text-4xl mb-6 font-bold text-accent">Contact</h2>
              <ul className="space-y-4 font-hand text-2xl">
                <li className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary border-2 border-ink inline-block"></span>
                  {CONTACT_INFO.email}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-accent border-2 border-ink inline-block"></span>
                  {CONTACT_INFO.instagram}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-neutral border-2 border-ink inline-block"></span>
                  {CONTACT_INFO.twitter}
                </li>
              </ul>
              <div className="flex justify-end mt-8">
                <SketchyButton onClick={closeModal}>Close</SketchyButton>
              </div>
            </div>
          </div>
        );

      case ViewState.RESEARCH:
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="bg-white p-8 max-w-lg w-full border-4 border-ink rough-border shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-hand text-4xl mb-6 font-bold border-b-2 border-ink inline-block">
                My Research
              </h2>
              <div className="space-y-4">
                {RESEARCH_LINKS.map((link: ResearchLink, idx: number) => (
                  <a
                    key={idx}
                    href={link.url}
                    className="block p-4 border-2 border-ink hover:bg-neutral transition-colors font-hand text-xl font-bold group"
                  >
                    {idx + 1}. {link.title}
                    <span className="float-right group-hover:translate-x-1 transition-transform">
                      -&gt;
                    </span>
                  </a>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <SketchyButton onClick={closeModal}>Close Book</SketchyButton>
              </div>
            </div>
          </div>
        );

      case ViewState.PROJECTS:
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={closeModal}
          >
            <div
              className="max-w-4xl w-full bg-neutral p-4 md:p-8 border-4 border-ink rough-border min-h-[50vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-hand text-5xl font-bold text-ink">My Work</h2>
                <SketchyButton onClick={closeModal} variant="accent">
                  Close Window
                </SketchyButton>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {PROJECTS.map((project: Project) => (
                  <div
                    key={project.id}
                    className="bg-white border-2 border-ink p-2 hover:rotate-1 transition-transform duration-300"
                  >
                    <div className="aspect-video overflow-hidden border-2 border-ink mb-2">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-hand text-2xl font-bold">{project.title}</h3>
                    <p className="font-hand text-lg text-gray-600">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] bg-fixed">
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-4 md:mb-8">
        <h1 className="font-hand text-4xl md:text-6xl font-bold text-ink drop-shadow-sm -rotate-2">
          My <span className="text-primary">Sketchy</span> Studio
        </h1>
      </header>

      {/* 主房间 */}
      <main className="w-full">
        <SketchRoom
          projects={PROJECTS}
          currentProjectIndex={projectIndex}
          onNavigate={setViewState}
        />
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center font-hand text-ink/50 text-lg">
        Click objects in the room to explore.
      </footer>

      {renderModal()}
    </div>
  );
};

export default App;
