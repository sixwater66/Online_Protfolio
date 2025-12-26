// src/constants.ts
import type { Project } from './types';

export interface ResearchLink {
  title: string;
  url: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Escape To The Outdoors',
    image: 'https://freight.cargo.site/t/original/i/S2665703116674631133526218994597/8.png',
    description:
      "A hybrid physical-digital installation tackling 'Nature Deficit Disorder' by connecting urban children with soil through interactive sensing and generative visualization.",
    year: '2025',
    role: 'Concept / Interaction / Unity + Arduino Prototype',
    tools: ['Arduino', 'Sensors', 'Unity', 'Physical Prototyping'],
    videoUrl: 'https://youtu.be/Xp60Bq2VX1U',
    gallery: [
      'https://freight.cargo.site/t/original/i/S2665703116674631133526218994597/8.png',
    ],
    sections: [
      {
        title: 'Project Introduction',
        body: [
          'Builds a hybrid physical-digital field using sensor-captured soil moisture data.',
          'Transforms real-world environmental signals into interactive visual landscapes in Unity.',
        ],
      },
      {
        title: 'What I Did',
        body: [
          'Designed interaction flow and physical form factor.',
          'Implemented data mapping + real-time visual response in Unity.',
          'Iterated through tests and refined reward/feedback clarity.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Say And Guess',
    image: 'https://freight.cargo.site/t/original/i/S2665703615363910422190237381541/46.png',
    description:
      'A collaborative VR game exploring communication noise and the distortion of information in the digital age.',
    year: '2025',
    role: 'Game Design / Music / Visual Design (Character + UI + Scenes)',
    tools: ['VR', 'Unity/Unreal (prototype)', 'Audio Design', 'UI Design'],
    videoUrl: 'https://youtu.be/_ipO_RUhqH4',
    gallery: [
      'https://freight.cargo.site/t/original/i/S2665703615363910422190237381541/46.png',
    ],
    sections: [
      {
        title: 'Core Idea',
        body: [
          'Co-op guessing game in VR, using “noise” as a mechanic and metaphor.',
          'Turns miscommunication into playful constraints and collaborative problem solving.',
        ],
      },
      {
        title: 'Highlights',
        body: [
          'Designed cooperative loop + round structure.',
          'Created art direction for characters/UI/scene set, and composed music.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Little Toad, Huge world',
    image: 'https://freight.cargo.site/t/original/i/O2665734549299343436096047903653/.png',
    description:
      "An educational RPG utilizing 'inverse anthropomorphism' to let children experience the world from a non-human perspective.",
    year: '2025',
    role: 'Solo Dev (Design → Code → 3D Assets)',
    tools: ['Unity', '3D Modeling/Scanning', 'World Building'],
    sections: [
      {
        title: 'Concept',
        body: [
          'Uses a non-human perspective to challenge human-centric storytelling in children’s education.',
          'Explores perception, scale, and embodied learning through gameplay.',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Colorful',
    image: 'https://freight.cargo.site/t/original/i/E2708352401331564640565727818661/4e61c33a2105144c60b8f4e5e5cb801b.png',
    description:
      'An interactive generative art piece translating emotions into brushstroke systems via creative coding.',
    year: '2025',
    role: 'Creative Coding / Interaction',
    tools: ['Creative Coding', 'Generative System'],
    videoUrl: 'https://youtu.be/ntqGDg-NCe0',
  },
  {
    id: 10,
    title: 'Permeate',
    image: 'https://freight.cargo.site/t/original/i/F2711229517038544747562883576741/CDF92C0B2A9405443864E2EE6B225B3C.png',
    description:
      'A silent film capturing emotional distance in family relationships and how relational patterns may be learned over time.',
    year: '2025',
    role: 'Film / Narrative',
    tools: ['Filmmaking', 'Editing'],
    videoUrl: 'https://youtu.be/5tFH6kx4974',
  },
  {
    id: 6,
    title: 'Climb the steps',
    image: 'https://freight.cargo.site/t/original/i/M2708352401350011384639437370277/QQ_1766387217315.png',
    description:
      'A documentary short contrasting three social strata at a local antique market under time pressure.',
    year: '2025',
    role: 'Director / Camera / Interview',
    tools: ['Documentary', 'Editing'],
    videoUrl: 'https://youtu.be/sBUrjyLJlns',
  },
];

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
