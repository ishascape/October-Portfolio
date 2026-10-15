import wolf from '../assets/sketches/wolf.webp'
import tiger from '../assets/sketches/tiger.webp'
import owl from '../assets/sketches/owl.webp'
import warrior from '../assets/sketches/warrior.webp'

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
      'Guests, hosts, Marketing and account managers · brief-to-lead workflow · AI parsing and automated routing of high-value briefs',
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
      'Hosts, leadership, Sales and Support · four product lines reorganised around host workflows · proposals, dashboards and reporting in one place',
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
      'PM, data science and engineering · sign-up to subscription funnel · record matching that replaced manual form entry',
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
    title: 'Design the system, not the project in isolation.',
    body: "I map the workflows, teams, processes and touch points around a product before designing screens, and automate the steps people shouldn't be doing by hand.",
    evidence: [
      { source: 'HostHQ', text: "Reorganised four separately built host products around the way hosts actually work, instead of HeadBox's internal product lines." },
      { source: 'Venue Finder', text: 'Designed both ends of the brief-to-lead workflow, including automated routing of high-value briefs to account managers.' },
      { source: 'CV', text: 'Launch in a New City: AI research agents and operational tooling cut launch planning from over 12 weeks to 2.' },
    ],
  },
  {
    number: '1',
    title: 'Design with commercial sense.',
    body: "I treat revenue, retention and marketplace health as design constraints, not someone else's problem.",
    evidence: [
      { source: 'Venue Finder', text: 'Spotted that marketing KPIs rewarded brief volume over intent, and introduced a new sponsored-placement revenue model.' },
      { source: 'HostHQ', text: "Reframed the platform around hosts' revenue and ROI visibility; 55+ new One Platform clients in 3 months." },
      { source: 'CV', text: 'Gift Subscription MVP, over £500k in first-year revenue.' },
    ],
  },
  {
    number: '2',
    title: 'Facilitate and ideate with groups.',
    body: 'I bring customers, leadership and engineering into the same room and leave with a decision.',
    evidence: [
      { source: 'HostHQ', text: 'Ran interactive focus groups with host customers across venue types, and aligned the CEO, CTO, Head of Marketing and Head of Venue Sales on one consolidation strategy.' },
      { source: 'CV', text: 'Facilitated cross-functional product planning with Product, Engineering and Commercial leadership at HeadBox.' },
    ],
  },
  {
    number: '3',
    title: 'Turn research into product vision.',
    body: 'I go to users first, and the vision comes out of what they actually need.',
    evidence: [
      { source: 'Venue Finder', text: 'Interviewed 10 event bookers, found every brief hinged on one non-negotiable requirement, and built the product hypothesis around it.' },
      { source: 'HostHQ', text: 'Research showed HeadBox was a peripheral lead channel for hosts, which reframed the whole platform vision.' },
      { source: 'CV', text: "Set up HeadBox's first continuous research programme in over four years." },
    ],
  },
  {
    number: '4',
    title: 'Use data to make design and product decisions.',
    body: 'I run experiments, read the results honestly, and change course when the data says so.',
    evidence: [
      { source: 'Venue Finder', text: 'V1 lost users at the AI prompt (38% drop-off) and account creation (27%), so V2 made the prompt optional and softened sign-up, and it shipped.' },
      { source: 'TreeAssist', text: 'Three onboarding experiments in two-week cycles, aimed at the 41% of new users who left before reaching value.' },
      { source: 'CV', text: '5× free-trial conversion at Findmypast through behavioural analysis and A/B testing.' },
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
  { date: '2016–20', course: 'BSc Architecture', school: 'University of Bath' },
]

export interface FieldNote {
  fig: string
  group: string
  caption: string
  ratio: string
  src?: string // no src = placeholder until Ashni sends the photo
  alt?: string
}

// Sketches are Ashni's own (uploaded 15 Oct 2026, EXIF stripped). Photos still to come.
export const fieldNotes: FieldNote[] = [
  { fig: '01', group: 'Portrait', caption: 'Fig. 01. Portrait, to come', ratio: '4 / 5' },
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
    caption: 'Fig. 05. Warrior, with the pens that drew it',
    ratio: '3 / 4',
    src: warrior,
    alt: 'A sketchbook page with an ink and marker drawing of an armoured warrior holding an axe, with the pens and markers laid beside it.',
  },
  { fig: '06', group: 'Concerts', caption: 'Fig. 06. Performing, to come', ratio: '3 / 2' },
  { fig: '07', group: 'Travel', caption: 'Fig. 07. Summit, to come', ratio: '4 / 5' },
  { fig: '08', group: 'Travel', caption: 'Fig. 08. Everest Base Camp, to come', ratio: '3 / 2' },
]

// Ashni, 15 Oct 2026: no mention of visa sponsorship; permanent senior roles first, contracts too.
export const availability = {
  headline: "I'm open to permanent Senior Product Designer roles.",
  detail: "I'm also open to contracts.",
  short: 'Open to permanent senior roles and contracts',
}

export const contact = {
  email: 'ashni.dave111@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ashni-dave/',
  resume: `${import.meta.env.BASE_URL}ashni-dave-resume.pdf`,
}
