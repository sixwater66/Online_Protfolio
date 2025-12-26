// src/types.ts

export interface ProjectSection {
  title: string;
  body: string[]; // 每段一行
}

export interface Project {
  id: number;
  title: string;
  image: string;
  description: string;

  // ✅ 详情页用（可选）
  year?: string;
  role?: string;
  tools?: string[];
  videoUrl?: string;        // YouTube 链接（可选）
  gallery?: string[];       // 多图（可选）
  sections?: ProjectSection[];
}

/**
 * 用常量对象 + 类型代替 enum，兼容 TS 新配置
 */
export const ViewState = {
  HOME: 'HOME',
  PROJECTS: 'PROJECTS',
  PROJECT_DETAIL: 'PROJECT_DETAIL', // ✅ NEW
  RESEARCH: 'RESEARCH',
  CONTACT: 'CONTACT',
  CV: 'CV',
} as const;

export type ViewState = (typeof ViewState)[keyof typeof ViewState];
