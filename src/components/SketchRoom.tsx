// src/components/SketchRoom.tsx
import React from 'react';
import type { Project, ViewState as ViewStateType } from '../types';
import { ViewState } from '../types';

interface Props {
  projects: Project[];
  onNavigate: (target: ViewStateType) => void;
  currentProjectIndex: number;
}

export const SketchRoom: React.FC<Props> = ({
  projects,
  onNavigate,
  currentProjectIndex,
}) => {
  const currentProject = projects[currentProjectIndex];

  return (
    <div
      className="
        relative w-full mx-auto
        aspect-[3/4] md:aspect-[4/3]
        md:min-h-screen
        md:max-w-[1800px]
        bg-neutral overflow-hidden select-none
        border-4 border-ink rough-border shadow-2xl
      "
    >
      {/* 中间墙线（手机 / 电脑通用） */}
      <div className="absolute top-[50%] left-0 w-full h-1 bg-ink opacity-80 rough-border" />

      {/* =========================
          1. 窗户区域（作品轮播）
         ========================= */}
      {/* 窗帘（前景层） */}
      <div
        className="
          absolute
          top-[-18%] left-[-15%] right-[-7%] h-[100%]
          md:top-[-21%] md:left-[-15%] md:right-[-6%] md:h-[110%]
          pointer-events-none z-20
        "
      >
        <img
          src="https://freight.cargo.site/t/original/i/U2687340249706951858275328947109/8292FB4D191E9E423455C75995831B2F.png"
          className="w-full h-full object-fill"
          alt="Curtains"
        />
      </div>

      {/* 窗框容器（点击进入 Projects） */}
      <div
        className="
          absolute
          top-[6%] left-[3%] right-[3%] h-[38%]
          border-4 border-ink rounded-sm rough-border
          bg-white overflow-hidden
          cursor-pointer group
          hover:shadow-[4px_4px_0px_0px_rgba(45,45,45,1)] transition-shadow
        "
        onClick={() => onNavigate(ViewState.PROJECTS)}
      >
        {/* 轮播作品图 */}
        <div className="w-full h-full relative">
          <img
            src={currentProject.image}
            alt={currentProject.title}
            className="
              w-full h-full object-cover
              grayscale contrast-125
              group-hover:grayscale-0
              transition-all duration-700
            "
          />
          <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity" />
        </div>

        {/* Open Project 提示 */}
        <div className="absolute bottom-4 right-[40%] md:right-[50%] z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-white border-2 border-ink text-sm px-2 py-1 md:text-xl md:px-4 md:py-2 rounded font-hand font-bold text-ink shadow-[2px_2px_0px_0px_#2d2d2d]">
            Open Project
          </span>
        </div>
      </div>

      {/* =========================
          2. 人物（点击进入 CV）
         ========================= */}
      <div
        className="
          absolute
          top-[15%] left-[8%] w-[45%]
          md:top-[10%] md:left-[18%] md:w-[30%]
          aspect-[1/2] z-30
          group
        "
      >
        <div className="relative w-full h-full">
          {/* ✅ 人物：点击触发 CV 弹窗 */}
          <img
            src="https://freight.cargo.site/t/original/i/S2687356760133193638682730918821/C76CF36F7583DB13EE8FEA352EDEE4AB.png"
            alt="Character"
            className="
              w-full h-full object-contain drop-shadow-xl animate-float
              cursor-pointer
              transition-transform
              hover:scale-[1.02]
            "
            onClick={() => onNavigate(ViewState.CV)}
          />

          {/* ✅ hover 提示框：About me（风格对齐 Open Project） */}
          <div
            className="
              pointer-events-none
              absolute
              top-[50%] left-[50%]
              -translate-x-1/2
              z-40
              opacity-0 group-hover:opacity-100
              transition-opacity
            "
          >
            <span className="bg-white border-2 border-ink text-sm px-2 py-1 md:text-xl md:px-4 md:py-2 rounded font-hand font-bold text-ink shadow-[2px_2px_0px_0px_#2d2d2d] whitespace-nowrap">
              About me
            </span>
          </div>

          {/* ✅ About 按钮图案：保留在原位置，但默认不触发 */}
          <div
            className="
              absolute
              -bottom-[5%] left-[29%] -translate-x-1/2
              md:-bottom-[-2%] md:left-[35%] md:w-[50%]
              w-[55%]
              pointer-events-none
            "
            aria-hidden="true"
          >
            <img
              src="https://freight.cargo.site/t/original/i/U2668197997508340369346596926373/4BB311E6928A49680F3BF2E63E746CCE.png"
              alt="About decoration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* =========================
          3. 右侧大植物
         ========================= */}
      <div
        className="
          absolute
          top-[50%] right-[4%] w-[25%]
          md:top-[55%] md:right-[4%] md:w-[25%]
          aspect-square pointer-events-none
        "
      >
        <img
          src="https://freight.cargo.site/t/original/i/R2687338830875631428905166402469/4334E9CDBA0A0143543C912F446E796A.png"
          alt="Plant"
          className="w-full h-full object-contain animate-[sway_4s_ease-in-out_infinite] origin-bottom"
        />
      </div>

      {/* =========================
          左侧大植物
         ========================= */}
      <div
        className="
          absolute
          top-[60%] right-[85%] w-20
          md:top-[55%] md:right-[84%] md:w-[16%]
          aspect-square pointer-events-none
        "
      >
        <img
          src="https://freight.cargo.site/t/original/i/R2687338830875631428905166402469/4334E9CDBA0A0143543C912F446E796A.png"
          alt="Plant"
          className="w-full h-full object-contain animate-[sway_4s_ease-in-out_infinite] origin-bottom"
        />
      </div>

      {/* =========================
          左侧四葉草
         ========================= */}
      <div
        className="
          absolute
          top-[65%] right-[85%] w-[20%]
          md:top-[70%] md:right-[75%] md:w-[20%]
          aspect-square pointer-events-none
        "
      >
        <img
          src="https://freight.cargo.site/t/original/i/J2687338830838737940757747299237/4C6B30AE21EF2DA310D2BEB4D15F023E.png"
          alt="Plant"
          className="w-full h-full object-contain animate-[sway_4s_ease-in-out_infinite] origin-bottom"
        />
      </div>

      {/* =========================
          4. 书本 + Research
         ========================= */}
      <div
        className="
          absolute
          bottom-[14%] right-[10%] w-[25%]
          md:bottom-[15%] md:right-[25%] md:w-[25%]
          h-auto cursor-pointer group z-30
        "
        onClick={() => onNavigate(ViewState.RESEARCH)}
      >
        <div className="relative transform rotate-3 group-hover:rotate-0 transition-transform origin-bottom-left">
          <img
            src="https://freight.cargo.site/t/original/i/K2687340249725398602349038498725/BEA99D5D3BBB4458FA6D912700AFB864.png"
            alt="Research Books"
            className="w-full h-auto"
          />
          <span className="absolute -top-[2%] left-0 font-hand font-bold text-ink bg-white border border-ink text-sm px-2 py-1 md:text-xl md:px-4 md:py-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Plog
          </span>
        </div>

        {/* 放大镜装饰（电脑端显示） */}
        <div
          className="
            absolute -right-[-45%] -top-[-25%] w-[40%] h-[40%] opacity-0
            group-hover:opacity-100 transition-opacity pointer-events-none animate-jerk
            hidden md:block
          "
        >
          <img
            src="https://freight.cargo.site/t/original/i/V2668197997526787113420306477989/9D1252F0FC899711624253D85377F23C.png"
            alt="Magnifying Glass"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* =========================
          5. Contact 铃铛
         ========================= */}
      <div
        className="
          absolute
          bottom-[1%] md:bottom-[1%]
          left-1/2 -translate-x-1/2
          w-20 md:w-28
          cursor-pointer z-30 group
        "
        onClick={() => onNavigate(ViewState.CONTACT)}
      >
        <img
          src="https://freight.cargo.site/t/original/i/J2668197997489893625272887374757/0C5F40BD6529531A35A7118B8A0C8451.png"
          alt="Contact"
          className="w-full h-auto transition-transform group-hover:scale-105"
        />
      </div>

      {/* =========================
          6. 地面装饰花草（电脑端显示）
         ========================= */}
      <img
        src="https://freight.cargo.site/t/original/i/N2687338830857184684831456850853/90CCE4EB56EC4E858813629168D527BA.png"
        alt="decoration"
        className="
          hidden md:block
          absolute bottom-[25%] left-[7%]
          w-[25%] h-auto pointer-events-none
          transform -rotate-12 animate-sway
        "
      />

      <img
        src="https://freight.cargo.site/t/original/i/J2687338830838737940757747299237/4C6B30AE21EF2DA310D2BEB4D15F023E.png"
        alt="decoration"
        className="
          hidden md:block
          absolute bottom-[35%] right-[14%]
          w-[20%] h-auto pointer-events-none
          transform rotate-6 animate-[sway_3.5s_ease-in-out_infinite]
        "
      />
    </div>
  );
};
