// src/constants.ts
import type { Project } from './types';

// 先用占位图，后面你可以换成自己那三张 Cargo 链接
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Escape To The Outdoors',
    image: 'https://freight.cargo.site/t/original/i/S2665703116674631133526218994597/8.png',
    description: "An exploration of nature's quiet moments.",
  },
  {
    id: 2,
    title: 'Say And Guess',
    image: 'https://freight.cargo.site/t/original/i/S2665703615363910422190237381541/46.png',
    description: 'Finding beauty in broken concrete.',
  },
  {
    id: 3,
    title: 'Little Toad, Huge world',
    image: 'https://freight.cargo.site/t/original/i/O2665734549299343436096047903653/.png',
    description: 'Cyberpunk aesthetics in modern web design.',
  },
];

// 明确给 RESEARCH_LINKS 一个类型，避免隐式 any
export interface ResearchLink {
  title: string;
  url: string;
}

export const RESEARCH_LINKS: ResearchLink[] = [
  { title: 'Color Theory in Digital Art', url: '#' },
  { title: 'The History of Web Brutalism', url: '#' },
  { title: 'Generative AI Ethics', url: '#' },
];

export const CONTACT_INFO = {
  email: 'artist@sketchy.world',
  instagram: '@sketchy_art',
  twitter: '@sketchy_dev',
};
