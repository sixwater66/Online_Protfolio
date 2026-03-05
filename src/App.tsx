// src/App.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  PROJECTS,
  CONTACT_INFO,
  RESEARCH_LINKS,
  MAP_BG_URL,
  MARKER_IMAGE_URL,
  SEE_ALL_BUTTON_URL,
  CATEGORIES,
  ABOUT_BG_URL,
  BIO_IMAGE_URL,
  PORTFOLIO_BTN_IMAGE,
  CV_BTN_IMAGE,
  RESEARCH_BG_URL,
} from './constants';

import type { Project, ViewState as ViewStateType } from './types';
import { ViewState } from './types';

import { SketchRoom } from './components/SketchRoom';
import { SketchyButton } from './components/SketchyButton';
import ProjectDetail from './components/ProjectDetail';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewStateType>(ViewState.HOME);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  /**
   * ✅ public/ 下文件名：
   * - CV.pdf
   * - Portfolio.pdf
   * ✅ BASE_URL 兼容 GitHub Pages base
   */
  const CV_PDF_URL = useMemo(() => {
    const base = import.meta.env.BASE_URL ?? '/';
    const normalized = base.endsWith('/') ? base : `${base}/`;
    return `${normalized}CV.pdf`;
  }, []);

  const PORTFOLIO_PDF_URL = useMemo(() => {
    const base = import.meta.env.BASE_URL ?? '/';
    const normalized = base.endsWith('/') ? base : `${base}/`;
    return `${normalized}Portfolio.pdf`;
  }, []);

  // Home 轮播
  useEffect(() => {
    if (viewState !== ViewState.HOME) return;

    const interval = setInterval(() => {
      setProjectIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [viewState]);

  // ====== 导航函数 ======
  const goHome = () => {
    setViewState(ViewState.HOME);
    setActiveProjectId(null);
    setSelectedCategory(null);
    window.scrollTo(0, 0);
  };

  const goMap = () => {
    setViewState(ViewState.MAP_VIEW);
    setActiveProjectId(null);
    setSelectedCategory(null);
    window.scrollTo(0, 0);
  };

  const goProjects = (category: string | null = null) => {
    setSelectedCategory(category);
    setViewState(ViewState.PROJECTS);
    setActiveProjectId(null);
    window.scrollTo(0, 0);
  };

  const openProjectDetail = (id: number) => {
    setActiveProjectId(id);
    setViewState(ViewState.PROJECT_DETAIL);
    window.scrollTo(0, 0);
  };

  const backToProjects = () => {
    setViewState(ViewState.PROJECTS);
    window.scrollTo(0, 0);
  };

  // ====== 统一页面宽度（和房间页一致）======
  const MAX_FRAME = 'md:max-w-[1800px] mx-auto';

  // ✅ PageWrapper：allowOverflow 开关（解决超出被裁剪）
  const PageWrapper = ({
    title,
    children,
    color = 'bg-white',
    showBacks = true,
    backHome = { text: '← Back Home', action: goHome },
    backPrev = null,
    hideHeader = false,
    allowOverflow = false,
  }: {
    title: string;
    children?: React.ReactNode;
    color?: string;
    showBacks?: boolean;
    backHome?: { text: string; action: () => void };
    backPrev?: { text: string; action: () => void } | null;
    hideHeader?: boolean;
    allowOverflow?: boolean;
  }) => (
    <div className="min-h-screen w-full flex flex-col p-4 md:p-12 animate-draw">
      {!hideHeader && (
        <nav className={`mb-10 flex flex-col md:flex-row justify-between items-center w-full gap-4 ${MAX_FRAME}`}>
          <h2 className="font-hand text-4xl md:text-6xl font-bold text-ink -rotate-1">{title}</h2>

          {showBacks && (
            <div className="flex flex-wrap justify-center gap-3">
              {backPrev ? (
                <SketchyButton onClick={backPrev.action} variant="neutral" className="text-sm whitespace-nowrap">
                  {backPrev.text}
                </SketchyButton>
              ) : null}

              <SketchyButton onClick={backHome.action} variant="accent" className="text-sm whitespace-nowrap">
                {backHome.text}
              </SketchyButton>
            </div>
          )}
        </nav>
      )}

      <main
        className={`
          ${MAX_FRAME} w-full ${color}
          border-4 border-ink rough-border shadow-2xl
          ${allowOverflow ? 'overflow-visible' : 'overflow-hidden'}
          relative
          ${hideHeader ? 'min-h-[85vh]' : 'p-4 md:p-10 mb-10'}
        `}
      >
        {hideHeader && showBacks && (
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50 flex flex-wrap justify-end gap-3 pointer-events-none">
            <div className="pointer-events-auto flex gap-3">
              {backPrev ? (
                <SketchyButton onClick={backPrev.action} variant="neutral" className="text-xs md:text-sm whitespace-nowrap">
                  {backPrev.text}
                </SketchyButton>
              ) : null}

              <SketchyButton onClick={backHome.action} variant="accent" className="text-xs md:text-sm whitespace-nowrap">
                {backHome.text}
              </SketchyButton>
            </div>
          </div>
        )}

        {children}
      </main>
    </div>
  );

  // ====== 页面渲染 ======
  const renderHome = () => (
    <div className="relative min-h-screen w-full bg-neutral flex flex-col items-center">
      <header
        className={`relative w-full flex flex-col md:flex-row justify-between items-center gap-4 mt-10 mb-6 z-10 px-4 ${MAX_FRAME}`}
      >
        <div className="text-center md:text-left">
          <h1 className="font-hand text-5xl sm:text-6xl font-bold text-ink drop-shadow-md -rotate-2 animate-wobble-slow">
            My <span className="text-primary underline decoration-ink/20">Sketchy</span> Studio
          </h1>
          <p className="font-hand text-xl text-ink/60 mt-1">Digital Crafting Room</p>
        </div>
      </header>

      <main className={`relative w-full flex-grow flex items-center justify-center z-10 px-4 ${MAX_FRAME}`}>
        <SketchRoom projects={PROJECTS} currentProjectIndex={projectIndex} onNavigate={setViewState} />
      </main>

      <footer className="relative mt-6 mb-4 text-center font-hand text-ink/40 text-lg flex flex-col items-center gap-2 z-10">
        <p className="animate-float">Click objects in the room to explore</p>
        <div className="text-sm border-t-2 border-ink/10 pt-2">© 2025 Hand-Drawn Experience</div>
      </footer>
    </div>
  );

  const renderMap = () => (
    <PageWrapper
      title="Creation Map"
      hideHeader
      color="bg-transparent"
      backHome={{ text: '← Back Home', action: goHome }}
      allowOverflow
    >
      <div className="relative w-full overflow-visible">
        <img
          src={MAP_BG_URL}
          alt="Creation Map Background"
          className="w-full h-auto block md:w-[70%] md:mx-auto md:-translate-y-[200px]"
          draggable={false}
        />

        {/* Marker 1 */}
        <div
          className="absolute top-[39%] left-[28%] md:top-[31%] md:left-[35%] group cursor-pointer z-20"
          onClick={() => goProjects(CATEGORIES.INTERACTIVE)}
        >
          <img
            src={MARKER_IMAGE_URL}
            className="w-10 h-10 md:w-16 md:h-16 animate-bounce"
            style={{ animationDuration: '2s' }}
            alt="marker"
            draggable={false}
          />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border-4 border-ink px-4 py-2 rounded-xl font-hand font-bold text-lg text-ink shadow-2xl whitespace-nowrap z-50 rough-border pointer-events-none">
            {CATEGORIES.INTERACTIVE}
          </div>
        </div>

        {/* Marker 2 */}
        <div
          className="absolute top-[52%] left-[48%] md:top-[42%] md:left-[48%] group cursor-pointer z-20"
          onClick={() => goProjects(CATEGORIES.NARRATIVE)}
        >
          <img
            src={MARKER_IMAGE_URL}
            className="w-10 h-10 md:w-16 md:h-16 animate-bounce"
            style={{ animationDuration: '2.4s' }}
            alt="marker"
            draggable={false}
          />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border-4 border-ink px-4 py-2 rounded-xl font-hand font-bold text-lg text-ink shadow-2xl whitespace-nowrap z-50 rough-border pointer-events-none">
            {CATEGORIES.NARRATIVE}
          </div>
        </div>

        {/* Marker 3 */}
        <div
          className="absolute top-[68%] left-[24%] md:top-[64%] md:left-[34%] group cursor-pointer z-20"
          onClick={() => goProjects(CATEGORIES.STATIC)}
        >
          <img
            src={MARKER_IMAGE_URL}
            className="w-10 h-10 md:w-16 md:h-16 animate-bounce"
            style={{ animationDuration: '1.8s' }}
            alt="marker"
            draggable={false}
          />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border-4 border-ink px-4 py-2 rounded-xl font-hand font-bold text-lg text-ink shadow-2xl whitespace-nowrap z-50 rough-border pointer-events-none">
            {CATEGORIES.STATIC}
          </div>
        </div>

        {/* Marker 4 */}
        <div
          className="absolute top-[75%] left-[75%] md:top-[65%] md:left-[68%] group cursor-pointer z-20"
          onClick={() => goProjects(CATEGORIES.HANDMADE)}
        >
          <img
            src={MARKER_IMAGE_URL}
            className="w-10 h-10 md:w-16 md:h-16 animate-bounce"
            style={{ animationDuration: '2.1s' }}
            alt="marker"
            draggable={false}
          />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border-4 border-ink px-4 py-2 rounded-xl font-hand font-bold text-lg text-ink shadow-2xl whitespace-nowrap z-50 rough-border pointer-events-none">
            {CATEGORIES.HANDMADE}
          </div>
        </div>

        {/* See All */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-40">
          <button onClick={() => goProjects(null)} className="group transition-transform hover:scale-110 active:scale-95">
            <img
              src={SEE_ALL_BUTTON_URL}
              alt="See all the spot"
              className="w-32 md:w-64 h-auto drop-shadow-2xl"
              draggable={false}
            />
          </button>
        </div>
      </div>
    </PageWrapper>
  );

  const renderProjects = () => {
    const categorized = Object.values(CATEGORIES).map((cat) => ({
      name: cat,
      items: PROJECTS.filter((p) => p.category === cat),
    }));

    return (
      <PageWrapper
        title="Selected Works"
        color="bg-neutral"
        backHome={{ text: '← Back Home', action: goHome }}
        backPrev={{ text: '← Back to Map', action: goMap }}
      >
        <div className="flex flex-wrap gap-4 mb-10 justify-center">
          <SketchyButton
            variant={selectedCategory === null ? 'primary' : 'neutral'}
            onClick={() => setSelectedCategory(null)}
            className="text-sm"
          >
            All Spots
          </SketchyButton>

          {Object.values(CATEGORIES).map((cat) => (
            <SketchyButton
              key={cat}
              variant={selectedCategory === cat ? 'primary' : 'neutral'}
              onClick={() => setSelectedCategory(cat)}
              className="text-sm"
            >
              {cat.split(' - ')[0]}
            </SketchyButton>
          ))}
        </div>

        <div className="space-y-14">
          {categorized.map((group) =>
            (selectedCategory === null || selectedCategory === group.name) && group.items.length > 0 ? (
              <div key={group.name} className="animate-draw">
                <h3 className="font-hand text-2xl md:text-4xl font-bold mb-8 border-b-4 border-primary inline-block text-ink">
                  {group.name}
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {group.items.map((project: Project) => (
                    <div
                      key={project.id}
                      onClick={() => openProjectDetail(project.id)}
                      className="bg-white border-4 border-ink p-3 hover:-translate-y-2 hover:rotate-2 transition-all duration-300 shadow-lg group cursor-pointer"
                    >
                      <div className="aspect-square overflow-hidden border-2 border-ink mb-4 bg-primary/5">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          draggable={false}
                        />
                      </div>
                      <h3 className="font-hand text-2xl font-bold mb-1">{project.title}</h3>
                      <p className="font-hand text-lg text-ink/70">View Details →</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </PageWrapper>
    );
  };

  const renderProjectDetail = () => {
    const project = PROJECTS.find((p) => p.id === activeProjectId) || PROJECTS[0];
    return (
      <PageWrapper
        title={project.title}
        backHome={{ text: '← Back Home', action: goHome }}
        backPrev={{ text: '← Back to Works', action: backToProjects }}
      >
        <ProjectDetail project={project} onBack={backToProjects} onHome={goHome} />
      </PageWrapper>
    );
  };

  // ✅ About：CV / Portfolio 都从 public 打开 PDF（用上方 useMemo 的 URL，避免 unused 报错）
  const renderAbout = () => (
    <PageWrapper
      title="About Me"
      hideHeader
      allowOverflow
      color="bg-transparent"
      backHome={{ text: '← Back Home', action: goHome }}
    >
      <div className="relative w-full overflow-visible">
        <img src={ABOUT_BG_URL} alt="Background" className="w-full h-auto block" draggable={false} />

        <div
          className="
            absolute
            top-[8%] bottom-[10%] left-[10%] right-[8%]
            md:top-[6%] md:bottom-[8%] md:left-[8%] md:right-[8%]
            z-10
            overflow-y-auto
            font-hand text-ink pr-4
          "
        >
          <div className="absolute top-0 right-[2%] z-50 pointer-events-none">
            {/* CV：打开 CV.pdf */}
            <a
              href={CV_PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="
                pointer-events-auto
                absolute
                top-2 md:top-4
                right-2 md:right-[-30px]
                w-36 md:w-[450px]
                group
              "
              title="Open CV.pdf"
            >
              <img
                src={CV_BTN_IMAGE}
                alt="Open CV"
                className="w-full h-auto drop-shadow-lg transition-transform group-hover:scale-105"
                draggable={false}
              />
            </a>

            {/* Portfolio：打开 Portfolio.pdf */}
            <a
              href={PORTFOLIO_PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="
                pointer-events-auto
                absolute
                top-16 md:top-[200px]
                right-[-18px] md:right-[-30px]
                w-36 md:w-[450px]
                group
              "
              title="Open Portfolio.pdf"
            >
              <img
                src={PORTFOLIO_BTN_IMAGE}
                alt="Open Portfolio"
                className="w-full h-auto drop-shadow-lg transition-transform group-hover:scale-105"
                draggable={false}
              />
            </a>
          </div>

          <div className="flex flex-col gap-8 md:gap-12 pt-20 md:pt-24 pb-6">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
              <div className="w-64 md:w-[500px] flex-shrink-0 animate-wobble-slow md:mt-[100px] md:ml-[500px]">
                <img src={BIO_IMAGE_URL} alt="Bio" className="w-full h-auto object-contain" draggable={false} />
              </div>

              <div className="md:flex-1 ml-[10%] w-[420px] md:ml-[-55%] md:mt-[50%]">
                <h2 className="text-4xl md:text-9xl font-bold mb-4 text-primary underline decoration-ink/20">Bio</h2>
                <div className="space-y-4 text-xl md:text-7xl leading-relaxed text-ink">
                  <p>
                    I’m a cross-media narrative designer and creative technologist, supporting game teams and creative projects
                    from concept to a presentable prototype.
                  </p>
                  <p>My core skills include Unity/Unreal development, sensing interaction (Arduino), and AI-assisted workflows.</p>
                </div>
              </div>
            </div>

            <div className="relative ml-[10%] w-[420px] md:ml-[15%] md:w-[1020px] md:mt-[0%]">
              <h2 className="text-4xl md:text-9xl font-bold mb-4 text-primary underline decoration-ink/20">Artist Statement</h2>
              <p className="text-xl md:text-7xl leading-relaxed italic mb-8 border-l-4 border-primary pl-4 text-ink/90">
                My practice treats interactive media as both a research object and a method—building playful systems to test how
                perception, narrative, and technology reshape each other.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );

  const renderResearch = () => (
    <PageWrapper
      title="Research & Thoughts"
      hideHeader
      color="bg-transparent"
      backHome={{ text: '← Back Home', action: goHome }}
    >
      <div className="relative w-full overflow-hidden top-[150px] md:top-[0px]">
        <img src={RESEARCH_BG_URL} alt="Research Background" className="w-full h-auto block" draggable={false} />

        <div className="absolute top-[12%] bottom-[12%] left-[10%] right-[10%] z-10 overflow-y-auto font-hand text-ink pr-2">
          <div className="flex flex-col gap-6 py-6">
            <h2 className="text-4xl md:text-9xl font-bold mb-4 text-primary underline decoration-ink/20 text-center relative left-[-50px] md:left-[-200px]">
              Journal & Notes
            </h2>

            <div className="space-y-4 w-full max-w-[280px] mx-[9%] md:max-w-[690px] md:mx-[10%]">
              {RESEARCH_LINKS.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    group block p-4 md:p-6 border-4 border-ink bg-white/60 hover:bg-primary/20
                    transition-all font-hand text-xl md:text-7xl font-bold relative cursor-pointer
                    shadow-md rough-border -rotate-1 hover:rotate-0
                  "
                  title="Open Link"
                >
                  <span className="relative z-10">
                    {idx + 1}. {link.title}
                  </span>
                  <span className="float-right group-hover:translate-x-2 transition-transform text-ink/50 text-xl md:text-7xl">
                    Open Link →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );

  const renderContact = () => (
    <PageWrapper title="Contact" color="bg-white" backHome={{ text: '← Back Home', action: goHome }}>
      <div className="max-w-md mx-auto text-center py-10">
        <h2 className="font-hand text-4xl mb-10 font-bold text-primary animate-twitch">Get in Touch</h2>
        <ul className="space-y-8 font-hand text-3xl">
          <li className="flex items-center justify-center gap-6 group">
            <span className="w-12 h-12 rounded-full bg-primary border-4 border-ink group-hover:scale-110 transition-transform shadow-lg" />
            <span className="border-b-4 border-ink/10 group-hover:border-primary transition-colors cursor-pointer">
              {CONTACT_INFO.email}
            </span>
          </li>

          <li className="flex items-center justify-center gap-6 group">
            <span className="w-12 h-12 rounded-full bg-accent border-4 border-ink group-hover:scale-110 transition-transform shadow-lg" />
            <span className="border-b-4 border-ink/10 group-hover:border-accent transition-colors cursor-pointer">
              {CONTACT_INFO.instagram}
            </span>
          </li>

          <li className="flex items-center justify-center gap-6 group">
            <span className="w-12 h-12 rounded-full bg-neutral border-4 border-ink group-hover:scale-110 transition-transform shadow-lg" />
            <span className="border-b-4 border-ink/10 group-hover:border-neutral transition-colors cursor-pointer">
              {CONTACT_INFO.twitter}
            </span>
          </li>
        </ul>
      </div>
    </PageWrapper>
  );

  const renderView = () => {
    switch (viewState) {
      case ViewState.HOME:
        return renderHome();
      case ViewState.MAP_VIEW:
        return renderMap();
      case ViewState.PROJECTS:
        return renderProjects();
      case ViewState.PROJECT_DETAIL:
        return renderProjectDetail();
      case ViewState.ABOUT:
        return renderAbout();
      case ViewState.RESEARCH:
        return renderResearch();
      case ViewState.CONTACT:
        return renderContact();
      default:
        return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] bg-fixed selection:bg-primary/40">
      {renderView()}
    </div>
  );
};

export default App;