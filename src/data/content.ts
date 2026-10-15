import wolf from '../assets/sketches/wolf.webp'
import tiger from '../assets/sketches/tiger.webp'
import owl from '../assets/sketches/owl.webp'
import gorilla from '../assets/sketches/gorilla.webp'
import riding from '../assets/ashni-riding.webp'

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

export const principles: Principle[] = [
  {
    number: '0',
    title: 'Design the system, not the screen.',
    body: "I map workflows, teams and touchpoints before designing screens, and automate what people shouldn't do by hand.",
    evidence: [
      { source: 'HostHQ', text: "Rebuilt four separate host products around how hosts work, not HeadBox's internal product lines." },
      { source: 'CV', text: 'Launch in a New City: AI research agents and ops tooling cut launch planning from 12+ weeks to 2.' },
    ],
  },
  {
    number: '1',
    title: 'Design with commercial sense.',
    body: "Revenue, retention and marketplace health are design constraints, not someone else's problem.",
    evidence: [
      { source: 'Venue Finder', text: 'Found marketing KPIs rewarded brief volume over intent; introduced a sponsored-placement revenue model.' },
      { source: 'CV', text: 'Gift Subscription MVP, over £500k in first-year revenue.' },
    ],
  },
  {
    number: '2',
    title: 'Facilitate groups to a decision.',
    body: 'Customers, leadership and engineering in one room, leaving with one decision.',
    evidence: [
      { source: 'HostHQ', text: 'Ran focus groups with hosts across venue types; aligned the CEO, CTO, Head of Marketing and Head of Venue Sales on one consolidation strategy.' },
      { source: 'CV', text: 'Facilitated cross-functional planning with Product, Engineering and Commercial leadership.' },
    ],
  },
  {
    number: '3',
    title: 'Turn research into product vision.',
    body: 'Users first. The vision comes from what they actually need.',
    evidence: [
      { source: 'Venue Finder', text: 'Interviewed 10 event bookers; every brief hinged on one non-negotiable requirement, which became the product hypothesis.' },
      { source: 'CV', text: "Set up HeadBox's first continuous research programme in over four years." },
    ],
  },
  {
    number: '4',
    title: 'Let the data decide.',
    body: 'I run experiments, read results honestly and change course when the data says so.',
    evidence: [
      { source: 'Venue Finder', text: 'V1 lost users at the AI prompt (38% drop-off) and account creation (27%). V2 made the prompt optional, softened sign-up and shipped.' },
      { source: 'CV', text: '5× free-trial conversion at Findmypast via behavioural analysis and A/B testing.' },
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

// Sketches and Fig. 01 are Ashni's own (uploaded 15 Oct 2026, EXIF stripped). Other photos still to come.
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
    group: 'Sketchbook',
    caption: 'Fig. 02. Wolf',
    ratio: '1 / 1',
    src: wolf,
    alt: 'Pen drawing of a wolf’s head, with a scar running over one eye.',
  },
  {
    fig: '03',
    group: 'Sketchbook',
    caption: 'Fig. 03. Tiger',
    ratio: '1 / 1',
    src: tiger,
    alt: 'Pen drawing of a tiger lying down, front paws forward, looking at the viewer.',
  },
  {
    fig: '04',
    group: 'Sketchbook',
    caption: 'Fig. 04. Owl, in the sketchbook',
    ratio: '3 / 4',
    src: owl,
    alt: 'An open spiral sketchbook on a desk, with a pen drawing of an owl perched on a branch.',
  },
  {
    fig: '05',
    group: 'Sketchbook',
    caption: 'Fig. 05. Silverback gorilla, drawn on the flight back home',
    ratio: '3 / 4',
    src: gorilla,
    alt: 'A hand holding a sketchbook on a plane tray table, open to a ballpoint pen drawing of a silverback gorilla.',
  },
  { fig: '06', group: 'Concerts', caption: 'Fig. 06. Performing, to come', ratio: '3 / 2' },
  { fig: '07', group: 'Travel', caption: 'Fig. 07. Summit, to come', ratio: '4 / 5' },
  { fig: '08', group: 'Travel', caption: 'Fig. 08. Everest Base Camp, to come', ratio: '3 / 2' },
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
