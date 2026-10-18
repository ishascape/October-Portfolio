import wolf from '../assets/sketches/wolf.webp'
import tiger from '../assets/sketches/tiger.webp'
import owl from '../assets/sketches/owl.webp'
import gorilla from '../assets/sketches/gorilla.webp'
import riding from '../assets/ashni-riding.webp'
import planting from '../assets/ashni-planting.webp'
import gigOrchestra from '../assets/gig-orchestra.webp'
import gigLornaShore from '../assets/gig-lorna-shore.webp'
import travelDiving from '../assets/travel-diving.webp'
import travelBallooning from '../assets/travel-ballooning.webp'
import travelQuad from '../assets/travel-quad-biking.webp'
import hqOverview from '../assets/hosthq-card-overview.webp'
import hqRequests from '../assets/hosthq-card-requests.webp'
import hqProposal from '../assets/hosthq-card-proposal.webp'
import vfStreet from '../assets/vf-card-street.webp'
import vfSwipe from '../assets/vf-card-swipe.webp'
import vfDesktop from '../assets/vf-card-desktop.webp'
import taPhones from '../assets/ta-card-phones.webp'
import taDesktop from '../assets/ta-card-desktop.webp'
import taLanding from '../assets/ta-card-landing.webp'

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
  images?: { src: string; alt: string; fit?: 'contain'; bg?: string }[] // 2–3 card carousel images; placeholders until Ashni sends them
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'hosthq',
    number: '01',
    title: 'HostHQ',
    summary: 'Four separate host tools combined into one platform.',
    company: 'HeadBox',
    district: 'HeadBox',
    role: 'Senior Product Designer · 3 months, discovery to release',
    leadMetric: { value: '55+', label: 'new One Platform clients in 3 months' },
    supporting: ['+32% hosts reporting closed bookings', '-25% navigation support tickets'],
    system:
      'Hosts, leadership, Sales, Support · four product lines rebuilt around host workflows · proposals, dashboards and reporting in one place',
    tags: ['B2B SaaS', 'Systems thinking', 'Information architecture', 'Product strategy', 'Platform design'],
    existing: 'Lead Feed · PowerHost · HeadBox for Business · 3D Studio',
    proposed: 'One Platform',
    slug: 'hosthq',
    images: [
      {
        src: hqOverview,
        alt: 'Three HostHQ screens floating around a monitor: proposals with an urgent-requests alert, leads, and Lead Feed reports',
      },
      {
        src: hqRequests,
        alt: 'A laptop showing the HostHQ requests list, with urgent events and Send Proposal buttons',
      },
      {
        src: hqProposal,
        alt: 'A tablet showing a HostHQ submitted proposal with booking status and availability',
      },
    ],
  },
  {
    id: 'venue-finder',
    number: '02',
    title: 'Venue Finder',
    summary: 'An AI-assisted way to find venues, replacing a 13-step brief builder.',
    company: 'HeadBox',
    district: 'HeadBox',
    role: 'Sole product designer, team of 4 engineers · 2 months',
    leadMetric: { value: '+30%', label: 'qualified inbound enquiries' },
    supporting: ['40% shorter user journey', 'New sponsored-placement revenue'],
    system:
      'Guests, hosts, Marketing, account managers · brief-to-lead workflow · AI parsing and automated lead routing',
    tags: ['Marketplace', 'AI Products', 'Workflow automation', 'User research', 'Experiment design'],
    existing: '13-step brief builder · 83% drop-off',
    proposed: 'AI-assisted venue finder · 40% shorter journey',
    slug: 'venue-finder',
    images: [
      {
        src: vfStreet,
        alt: 'A phone held on a London street showing the HeadBox Venue Finder map with 45 matching venues',
      },
      {
        src: vfSwipe,
        alt: "A thumb on a phone showing a Venue Finder venue card with I'm interested and Not for me buttons",
      },
      {
        src: vfDesktop,
        alt: 'A tablet showing Venue Finder options with venue cards, a map and a How does HeadBox work panel',
      },
    ],
  },
  {
    id: 'treeassist',
    number: '03',
    title: 'TreeAssist',
    summary: 'Onboarding for a family history subscription: eight forms cut to three with AI suggestions.',
    company: 'Findmypast',
    district: 'Findmypast',
    role: 'Product Designer · 2 months, 2-week experiment cycles',
    leadMetric: { value: '+18%', label: 'free-trial starts' },
    supporting: ['+8% trial-to-subscription conversion', '-13% onboarding drop-off'],
    system: 'PM, data science, engineering · sign-up-to-subscription funnel · record matching replaces manual entry',
    tags: ['B2C Conversion', 'AI Products', 'Experiment design', 'Mobile first'],
    existing: '8 onboarding forms · blank tree · 41% dropped off before value',
    proposed: '3 forms + AI-suggested relatives',
    slug: 'tree-assist',
    images: [
      { src: taPhones, alt: 'Five phones showing the TreeAssist onboarding on the Findmypast mobile site' },
      { src: taDesktop, alt: 'The Findmypast family tree on desktop with a next-steps checklist on the canvas' },
      { src: taLanding, alt: 'The Findmypast landing page with a short "Let\'s start with you" sign-up form' },
    ],
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
    evidence: [{ source: 'This site', text: 'Designed and built with AI-assisted code in React and TypeScript.' }],
  },
  {
    number: '2',
    title: 'Let the data and research decide.',
    body: 'Opinions start the conversation; evidence ends it.',
    evidence: [
      {
        source: 'HeadBox',
        text: 'Interviewed 10 event bookers; every brief hinged on one non-negotiable requirement, which became the product hypothesis.',
      },
      {
        source: 'Findmypast',
        text: '5× free-trial conversion at Findmypast via behavioural analysis and A/B testing.',
      },
    ],
  },
  {
    number: '3',
    title: 'Iterative development.',
    body: 'Ship, measure, refine. Each version earns the next.',
    evidence: [
      {
        source: 'HeadBox',
        text: 'V1 lost users at the AI prompt (38% drop-off) and account creation (27%). V2 made the prompt optional, softened sign-up and shipped.',
      },
      { source: 'Findmypast', text: 'Two-week experiment cycles took onboarding from eight forms to three.' },
    ],
  },
  {
    number: '4',
    title: 'Stay curious, stay ambitious.',
    body: 'From architecture to product, and from Kilimanjaro to AI tooling, I keep learning the next thing.',
    evidence: [
      {
        source: 'HeadBox',
        text: 'Launch in a New City: AI research agents and ops tooling cut launch planning from 12+ weeks to 2.',
      },
      { source: 'Memorisely', text: 'AI Coding for Designers, March 2026.' },
    ],
  },
]

export const revisions = [
  { rev: 'E', date: 'Jan 2026', role: 'Senior Product Designer', company: 'HeadBox, London' },
  { rev: 'D', date: 'Apr 2025', role: 'Product Designer', company: 'HeadBox, London' },
  { rev: 'C', date: 'Apr 2023', role: 'Product Designer', company: 'Findmypast, London' },
  { rev: 'B', date: 'Jan 2022', role: 'Junior Product Designer', company: 'Findmypast, London' },
  { rev: 'A', date: '2020–21', role: 'Sales & Marketing Associate', company: 'HealthCare Direct, Nairobi' },
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
  {
    fig: '07',
    group: 'Find me at all sorts of gigs',
    caption: 'Fig. 07. Anoushka Shankar and the London Contemporary Orchestra',
    ratio: '17 / 20',
    src: gigOrchestra,
    alt: 'A concert seen from the balcony: an orchestra of strings, percussion and a drum kit on a stepped stage under green beams of light, with the audience in the foreground.',
  },
  {
    fig: '08',
    group: 'Find me at all sorts of gigs',
    caption: 'Fig. 08. Lorna Shore ft. Will Ramos, belting',
    ratio: '17 / 20',
    src: gigLornaShore,
    alt: 'A singer with pink hair holding a microphone above the crowd, a drummer behind them and a screen of orange flames glowing in red stage light.',
  },
  {
    fig: '09',
    group: 'Exploring the planet',
    caption: 'Fig. 09. Diving, Great Barrier Reef, AU',
    ratio: '25 / 16',
    src: travelDiving,
    alt: 'A scuba diver in a black wetsuit with an orange tank swims over a coral reef in blue water.',
  },
  {
    fig: '10',
    group: 'Exploring the planet',
    caption: 'Fig. 10. Ballooning, Masai Mara, KE',
    ratio: '1 / 1',
    src: travelBallooning,
    alt: 'A hot air balloon basket full of waving passengers, seen from above, with its burner flaring over the green plains of the Masai Mara.',
  },
  {
    fig: '11',
    group: 'Exploring the planet',
    caption: 'Fig. 11. Quad biking, Queenstown, NZ',
    ratio: '4 / 3',
    src: travelQuad,
    alt: 'Ashni in a helmet and waterproofs standing on a red quad bike with both arms raised, above a blue lake and mountains near Queenstown.',
  },
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
