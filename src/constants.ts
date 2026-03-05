// src/constants.ts
import type { Project, ResearchLink } from './types';

// ✅ 保证 base 末尾一定是 “/”
// - dev 时一般是 “/”
// - GitHub Pages 时是 “/Online_Protfolio/”
const BASE = (import.meta.env.BASE_URL ?? '/').replace(/\/?$/, '/');

export const CATEGORIES = {
  INTERACTIVE: 'Interactive Playground - Playful Prototypes',
  NARRATIVE: 'Narrative Screening Hall - Storytelling Cinema',
  STATIC: 'Static Inspiration Gallery - Still Moments',
  HANDMADE: 'Handmade Temperature Station - Handcrafted with Care',
} as const;

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Escape to the Outdoors',
    image: 'https://freight.cargo.site/t/original/i/S2665703116674631133526218994597/8.png',
    description:
      "A hybrid physical-digital installation tackling 'Nature Deficit Disorder' by connecting urban children with soil through interactive sensing and generative visualization.",
    category: CATEGORIES.INTERACTIVE,
    year: '2025',
    role: 'Concept / Interaction / Unity + Arduino Prototype',
    tools: ['Arduino', 'Sensors', 'Unity', 'Physical Prototyping'],
    videoUrl: 'https://youtu.be/Xp60Bq2VX1U',
    gallery: [
      `${BASE}gallery/escape/desired_outcome.JPG`,
      `${BASE}gallery/escape/exhibition_scene_1.png`,
      `${BASE}gallery/escape/exhibition_scene_2.png`,
      `${BASE}gallery/escape/exhibition_scene_3.JPG`,
      `${BASE}gallery/escape/exhibition_scene_4.JPG`,
      `${BASE}gallery/escape/test_device1.png`,
      `${BASE}gallery/escape/test_device2.png`,
      `${BASE}gallery/escape/version_1.png`,
      `${BASE}gallery/escape/version_2.png`,
      `${BASE}gallery/escape/version_3.png`,
    ],
    sections: [
      {
        title: 'Project Introduction',
        body: [
          'Builds a hybrid physical-digital field using sensor-captured soil moisture data.',
          'Transforms environmental signals into interactive visual landscapes in Unity.',
        ],
      },
      {
        title: 'What I Did',
        body: [
          'Designed interaction flow + physical form factor.',
          'Implemented data mapping and interactive generation in Unity.',
          'Iterated through tests and refined reward/feedback clarity.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Say and Guess',
    image: 'https://freight.cargo.site/t/original/i/S2665703615363910422190237381541/46.png',
    description:
      'A collaborative VR game exploring communication noise and the distortion of information in the digital age.',
    category: CATEGORIES.INTERACTIVE,
    year: '2025',
    role: 'Game Design / Music / Visual Design (Character + UI + Scenes)',
    tools: ['VR', 'Unity/Unreal (prototype)', 'Audio Design', 'UI Design'],
    videoUrl: 'https://youtu.be/_ipO_RUhqH4',
    gallery: [
      `${BASE}gallery/guess/character_design.jpg`,
      `${BASE}gallery/guess/during_game.jpg`,
      `${BASE}gallery/guess/environment_design.jpg`,
      `${BASE}gallery/guess/op_process.jpg`,
      `${BASE}gallery/guess/ui_design_process.png`,
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
    title: "Little Toad's Great Adventure",
    image: 'https://freight.cargo.site/t/original/i/O2665734549299343436096047903653/.png',
    description:
      "An educational RPG utilizing 'inverse anthropomorphism' to let children experience the world from a non-human perspective.",
    category: CATEGORIES.INTERACTIVE,
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
    id: 4,
    title: 'Looking Back at Life',
    image: 'https://freight.cargo.site/t/original/i/A2708352401313117896492018267045/01.jpg',
    description: 'A handmade collage series investigating the fragmented nature of memory and time.',
    category: CATEGORIES.HANDMADE,
    year: '2025',
    role: 'Collage / Visual Narrative',
    tools: ['Handmade Collage', 'Visual Composition'],
    gallery: ['https://freight.cargo.site/t/original/i/A2708352401313117896492018267045/01.jpg'],
  },
  {
    id: 5,
    title: 'Colorful',
    image: 'https://freight.cargo.site/t/original/i/E2708352401331564640565727818661/4e61c33a2105144c60b8f4e5e5cb801b.png',
    description: 'An interactive generative art piece translating emotions into brushstroke systems via creative coding.',
    category: CATEGORIES.INTERACTIVE,
    year: '2025',
    role: 'Creative Coding / Interaction',
    tools: ['Creative Coding', 'Generative System'],
    videoUrl: 'https://youtu.be/ntqGDg-NCe0',
  },
  {
    id: 6,
    title: 'Window of Opportunity',
    image: 'https://freight.cargo.site/t/original/i/M2708352401350011384639437370277/QQ_1766387217315.png',
    description: 'A documentary short contrasting three social strata at a local antique market under time pressure.',
    category: CATEGORIES.NARRATIVE,
    year: '2025',
    role: 'Director / Camera / Interview',
    tools: ['Documentary', 'Editing'],
    videoUrl: 'https://youtu.be/sBUrjyLJlns',
  },
  {
    id: 7,
    title: 'Invalid Makeup',
    image: 'https://freight.cargo.site/t/original/i/L2708352401368458128713146921893/Yuxuan_Chen_V1.jpg',
    description: 'Conceptual photography examining appearance anxiety and the friction between self-obscurity and social shells.',
    category: CATEGORIES.STATIC,
    year: '2025',
    role: 'Photography / Concept',
    tools: ['Concept Photography', 'Art Direction'],
    gallery: [
      `${BASE}gallery/makeup/cloth_test.jpg`,
      `${BASE}gallery/makeup/composition_layout_test.png`,
      `${BASE}gallery/makeup/postures_test.png`,
    ],
  },
  {
    id: 8,
    title: 'Horn (The Soft Control)',
    image: 'https://freight.cargo.site/t/original/i/F2708361497144366225639986394021/32503AF051B7D443720E99F6907D88DE.png',
    description: "A fiber art installation discussing how power and control are exercised 'softly' through care and social expectations.",
    category: CATEGORIES.HANDMADE,
    year: '2025',
    role: 'Installation / Fiber Art',
    tools: ['Sewing', 'Textile', 'Installation'],
    gallery: [
      `${BASE}gallery/horn/detail_1.JPG`,
      `${BASE}gallery/horn/detail_2.JPG`,
      `${BASE}gallery/horn/detail_3.JPG`,
      `${BASE}gallery/horn/detail_4.JPG`,
      `${BASE}gallery/horn/detail_5.JPG`,
      `${BASE}gallery/horn/detail_6.JPG`,
      `${BASE}gallery/horn/detail_7.JPG`,
      `${BASE}gallery/horn/draft_1.jpg`,
      `${BASE}gallery/horn/draft_2.jpg`,
      `${BASE}gallery/horn/effect.png`,
      `${BASE}gallery/horn/original_draft_1.png`,
      `${BASE}gallery/horn/original_draft_2.png`,
    ],
  },
  {
    id: 10,
    title: 'Permeate',
    image: 'https://freight.cargo.site/t/original/i/F2711229517038544747562883576741/CDF92C0B2A9405443864E2EE6B225B3C.png',
    description: 'A silent film capturing emotional distance in family relationships and how relational patterns may be learned over time.',
    category: CATEGORIES.NARRATIVE,
    year: '2025',
    role: 'Film / Narrative',
    tools: ['Filmmaking', 'Editing'],
    videoUrl: 'https://youtu.be/5tFH6kx4974',
  },
  {
    id: 11,
    title: 'City of Blood',
    image: 'https://freight.cargo.site/t/original/i/L2711229517020098003489174025125/02.JPG',
    description: 'A collage work exploring structural oppression and historical imagination through density and grid-based logic.',
    category: CATEGORIES.HANDMADE,
    year: '2025',
    role: 'Collage / Visual System',
    tools: ['Collage', 'Grid Composition'],
    gallery: [
      `${BASE}gallery/city/process_1.png`,
      `${BASE}gallery/city/process_2.png`,
      `${BASE}gallery/city/process_3.png`,
      `${BASE}gallery/city/process_4.png`,
      `${BASE}gallery/city/process_5.png`,
    ],
  },
];

export const RESEARCH_LINKS: ResearchLink[] = [
  {
    title: 'From 3D Scans to Playable Worlds in Unity',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7410169254202941440/?originTrackingId=auDsmdwXqaHVNpDXCY%2FB5Q%3D%3D',
  },
  {
    title: 'Arduino to Unity: Real-World Data as Game Input',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7410156104296402944/?originTrackingId=tJVjH%2BhKdVWJBoQSM%2B0dmg%3D%3D',
  },
];

export const CONTACT_INFO = {
  email: '1625311454@qq.com',
  instagram: '@六水各',
  twitter: '@六水各',
};

/** Gemini 版页面背景资源 */
export const MAP_BG_URL =
  'https://freight.cargo.site/t/original/i/S2708400083951385890911508984741/8C2035416F22DAC8544E7689180705BA.png';
export const MARKER_IMAGE_URL =
  'https://freight.cargo.site/t/original/i/B2708374080978217732158521832357/E66158FC2628A7083D18CEB8C7BDEA83.png';
export const SEE_ALL_BUTTON_URL =
  'https://freight.cargo.site/t/original/i/Y2708374080959770988084812280741/7799F0B49155A54FE2D0B240C55DC5A0.png';

export const ABOUT_BG_URL =
  'https://freight.cargo.site/t/original/i/C2708606753745716150654317589413/0AEA070A901D63691C4C3057844F078D.png';
export const BIO_IMAGE_URL =
  'https://freight.cargo.site/t/original/i/D2708863997354959821388351239077/5558E3DC697447086FF7F64F6401D91B.png';
export const PORTFOLIO_BTN_IMAGE =
  'https://freight.cargo.site/t/original/i/S2708606753782609638801736692645/A9EFA547E4A5A48D0203B3C24F9D985E.png';
export const CV_BTN_IMAGE =
  'https://freight.cargo.site/t/original/i/F2708606753764162894728027141029/1B4A9AAFA8F13DD6E0175D00E22897BA.png';

export const RESEARCH_BG_URL =
  'https://freight.cargo.site/t/original/i/L2709586212841952372053298869157/2EEF2928DF03299556DDD1643F9391D3.png';