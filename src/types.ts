export interface ProjectSection {
  title: string;
  body: string[];
}

export interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;

  year?: string;
  role?: string;
  tools?: string[];
  videoUrl?: string;
  gallery?: string[];
  sections?: ProjectSection[];
}

export interface ResearchLink {
  title: string;
  url?: string;       // 可选：外链（如果你以后要跳外部）
  body?: string[];    // 可选：文章内容（用于 Research Detail）
}

/**
 * ✅ 使用 const + union type，兼容你当前 TS 配置（避免 enum）
 */
export const ViewState = {
  HOME: 'HOME',
  MAP_VIEW: 'MAP_VIEW',
  PROJECTS: 'PROJECTS',
  PROJECT_DETAIL: 'PROJECT_DETAIL',
  ABOUT: 'ABOUT',
  RESEARCH: 'RESEARCH',
  RESEARCH_DETAIL: 'RESEARCH_DETAIL',
  CONTACT: 'CONTACT',
} as const;

export type ViewState = (typeof ViewState)[keyof typeof ViewState];