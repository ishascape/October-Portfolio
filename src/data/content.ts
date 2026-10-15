import wolf from '../assets/sketches/wolf.webp'
import tiger from '../assets/sketches/tiger.webp'
import owl from '../assets/sketches/owl.webp'
import gorilla from '../assets/sketches/gorilla.webp'
import riding from '../assets/ashni-riding.webp'
import planting from '../assets/ashni-planting.webp'

// All copy and figures come from notes/homepage-content.md (approved 14 Oct 2026).
// Never add a metric here that isn't in that doc or the CV.

export type CaseStudyId = 'venue-finder' | 'hosthq' | 'treeassist'

export interface CaseStudy {
  id: CaseStudyId
  number: string
  title: string
  summary: string
  company: string
  district: 'HeadBox' | 'Findmypast'
  role: string
  leadMetric: { value: string; label: string }
  supporting: string[]
  system: string
  tags: string[]
  existing: string
  proposed: string
  slug: string // URL path, kept identical to the old site's
  images?: { src: string; alt: string }[] // 2–3 card carousel images; placeholders until Ashni sends them
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'venue-finder',
    number: '01',
    title: 'Venue Finder',
    summary: 'AI-assisted venue discovery that replaced a 13-step brief builder.',
    company: 'HeadBox',
    district: 'HeadBox',
    role: 'Sole product designer, team of 4 engineers · 2 months',
    leadMetric: { value: '+33%', label: 'high-intent enquiries' },
    supporting: ['40% shorter user journey', 'New sponsored-placement revenue'],
    system:
      'Guests, hosts, Marketing, account managers · brief-to-lead workflow · AI parsing and automated lead routing',
    tags: ['Marketplace', 'AI Products', 'Workflow automation', 'User research', 'Experiment design'],
    existing: '13-step brief builder · 83% drop-off',
    proposed: 'AI-assisted venue finder · 40% shorter journey',
    slug: 'venue-finder',
  },
  {
    id: 'hosthq',
    number: '02',
    title: 'HostHQ',
    summary: 'Four siloed host products consolidated into one platform.',
    company: 'HeadBox',
    district: 'HeadBox',
    role: 'Senior Product Designer · 3 months, discovery to release',
    leadMetric: { value: '-28%', label: 'host churn (Q1)' },
    supporting: ['55+ new One Platform clients in 3 months', '-25% navigation support tickets'],
    system:
      'Hosts, leadership, Sales, Support · four product lines rebuilt around host workflows · proposals, dashboards and reporting in one place',
    tags: ['B2B SaaS', 'Systems thinking', 'Information architecture', 'Product strategy', 'Platform design'],
    existing: 'Lead Feed · PowerHost · HeadBox for Business · 3D Studio',
    proposed: 'One Platform',
    slug: 'hosthq',
  },
  {
    id: 'treeassist',
    number: '03',
    title: 'TreeAssist',
    summary: 'AI-assisted onboarding that cut eight forms to three.',
    company: 'Findmypast',
    district: 'Findmypast',
    role: 'Product Designer · 2 months, 2-week experiment cycles',
    leadMetric: { value: '+18%', label: 'free-trial starts' },
    supporting: ['+8% trial-to-subscription conversion', '-13% onboarding drop-off'],
    system:
      'PM, data science, engineering · sign-up-to-subscription funnel · record matching replaces manual entry',
    tags: ['B2C Conversion', 'AI Products', 'Experiment design', 'Mobile first'],
    existing: '8 onboarding forms · blank tree · 41% dropped off before value',
    proposed: '3 forms + AI-suggested relatives',
    slug: 'tree-assist',
  },
]

export const capabilities = [
  'Systems thinking',
  'Commercial sense',
  'Facilitation',
  'Research → vision',
  'Data-led decisions',
]

export interface Principle {
  number: string
  title: string
  body: string
  evidence: { source: string; text: string }[]
}

// Design ethos (Ashni, 15 Oct 2026). Evidence lines reuse facts already on the site.
export const principles: Principle[] = [
  {
    number: '1',
    title: "Show, don't tell.",
    body: 'A prototype people can click settles more than a deck. I build to show the idea, then let people react to the real thing.',
    evidence: [
      { source: 'This site', text: 'Designed and built with AI-assisted code in React and TypeScript.' },
    ],
  },
  {
    number: '2',
    title: 'Let the data and research decide.',
    body: 'Opinions start the conversation; evidence ends it.',
    evidence: [
      { source: 'HeadBox', text: 'Interviewed 10 event bookers; every brief hinged on one non-negotiable requirement, which became the product hypothesis.' },
      { source: 'CV', text: '5× free-trial conversion at Findmypast via behavioural analysis and A/B testing.' },
    ],
  },
  {
    number: '3',
    title: 'Iterative development.',
    body: 'Ship, measure, refine. Each version earns the next.',
    evidence: [
      { source: 'HeadBox', text: 'V1 lost users at the AI prompt (38% drop-off) and account creation (27%). V2 made the prompt optional, softened sign-up and shipped.' },
      { source: 'Findmypast', text: 'Two-week experiment cycles took onboarding from eight forms to three.' },
    ],
  },
  {
    number: '4',
    title: 'Stay curious, stay ambitious.',
    body: 'From architecture to product, and from Kilimanjaro to AI tooling, I keep learning the next thing.',
    evidence: [
      { source: 'CV', text: 'Launch in a New City: AI research agents and ops tooling cut launch planning from 12+ weeks to 2.' },
      { source: 'Memorisely', text: 'AI Coding for Designers, March 2026.' },
    ],
  },
]

export const revisions = [
  { rev: 'E', date: 'Jan 2026', role: 'Senior Product Designer', company: 'HeadBox, London' },
  { rev: 'D', date: 'Apr 2025', role: 'Product Designer', company: 'HeadBox, London' },
  { rev: 'C', date: 'Apr 2023', role: 'Product Designer', company: 'Findmypast, London' },
  { rev: 'B', date: 'Jan 2022', role: 'Junior Product Designer', company: 'Findmypast, London' },
  { rev: 'A', date: 'Jun 2020–21', role: 'Sales and marketing', company: 'HealthCare Direct, Kenya' },
]


// From the CV, most recent first.
export const education = [
  { date: 'Mar 2026', course: 'AI Coding for Designers', school: 'Memorisely' },
  { date: '2020–21', course: 'UX Immersion and UI Specification', school: 'CareerFoundry' },
  { date: '2016–20', course: 'BSc Architecture', school: 'University of Bath, UK' },
  { date: '2014–16', course: 'IB Diploma', school: 'Aga Khan Academy, Nairobi' },
]

export interface FieldNote {
  fig: string
  group: string
  caption: string
  ratio: string
  src?: string // no src = placeholder until Ashni sends the photo
  alt?: string
}

// Sketches and Figs. 01–02 are Ashni's own (uploaded 15 Oct 2026, EXIF stripped). Other photos still to come.
export const fieldNotes: FieldNote[] = [
  {
    fig: '01',
    group: 'Portrait',
    caption: 'Fig. 01. Ashni, out riding',
    ratio: '3 / 4',
    src: riding,
    alt: 'Ashni smiling beside a saddled dark bay horse at a wooden rail, with grassy hills behind.',
  },
  {
    fig: '02',
    group: 'Portrait',
    caption: 'Fig. 02. Planting trees (to hug later)',
    ratio: '3 / 4',
    src: planting,
    alt: 'Ashni kneeling on grass in gardening gloves, smiling as she presses soil around a newly planted sapling.',
  },
  {
    fig: '03',
    group: 'Sketchbook',
    caption: 'Fig. 03. Wolf',
    ratio: '1 / 1',
    src: wolf,
    alt: 'Pen drawing of a wolf’s head, with a scar running over one eye.',
  },
  {
    fig: '04',
    group: 'Sketchbook',
    caption: 'Fig. 04. Tiger',
    ratio: '1 / 1',
    src: tiger,
    alt: 'Pen drawing of a tiger lying down, front paws forward, looking at the viewer.',
  },
  {
    fig: '05',
    group: 'Sketchbook',
    caption: 'Fig. 05. Owl, in the sketchbook',
    ratio: '3 / 4',
    src: owl,
    alt: 'An open spiral sketchbook on a desk, with a pen drawing of an owl perched on a branch.',
  },
  {
    fig: '06',
    group: 'Sketchbook',
    caption: 'Fig. 06. Silverback gorilla, drawn on the flight back from gorilla trekking in Rwanda',
    ratio: '3 / 4',
    src: gorilla,
    alt: 'A hand holding a sketchbook on a plane tray table, open to a ballpoint pen drawing of a silverback gorilla.',
  },
  { fig: '07', group: 'Concerts', caption: 'Fig. 07. Performing, to come', ratio: '3 / 2' },
  { fig: '08', group: 'Travel', caption: 'Fig. 08. Summit, to come', ratio: '4 / 5' },
  { fig: '09', group: 'Travel', caption: 'Fig. 09. Everest Base Camp, to come', ratio: '3 / 2' },
]

// Ashni, 15 Oct 2026: permanent or contract; design, product or operator roles. No mention of visa sponsorship.
export const availability = {
  headline: "I'm open to permanent and contract Senior Product Designer, Product Manager or operator roles.",
  location: 'Currently based in Sydney, Australia.',
  short: 'Open to permanent and contract roles in design, product or operations',
}

export const contact = {
  email: 'ashni.dave111@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ashni-dave/',
  resume: `${import.meta.env.BASE_URL}ashni-dave-resume.pdf`,
}
