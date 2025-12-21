// src/types.ts

// 项目数据结构
export interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
}

/**
 * 用常量对象 + 类型代替 enum，兼容 TS 新配置
 */
export const ViewState = {
  HOME: 'HOME',
  PROJECTS: 'PROJECTS',
  RESEARCH: 'RESEARCH',
  CONTACT: 'CONTACT',
  CV: 'CV',
} as const;

// ViewState 类型 = 上面这个对象的值联合类型
export type ViewState = (typeof ViewState)[keyof typeof ViewState];
