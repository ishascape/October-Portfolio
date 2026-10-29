import type { ReactNode } from 'react'
import { skills, type Nudge } from '../Skills'

// The fixed eight-card deck. The factual content (`evidence`, `proof`) is trusted local copy from the Core Expertise
// section; nothing here is generated. The drawings and hover nudges are the original Core Expertise partis.

export type CardId =
  | 'architect'
  | 'weaver'
  | 'connector'
  | 'alchemist'
  | 'experimenter'
  | 'seer'
  | 'maker'
  | 'foundation'

export type CaseStudyId = 'venue-finder' | 'hosthq' | 'treeassist'

export type OracleCardData = {
  id: CardId
  numeral: string
  archetype: string
  title: string // the real expertise
  meaning: string // one-line interpretation
  practice: string // how it gets applied in a product
  proof: string // one line of supported work or achievement
  evidence: string // the original Core Expertise copy, verbatim
  drawing: () => ReactNode
  hover: Nudge[]
  related?: CaseStudyId
}

type Seed = Omit<OracleCardData, 'drawing' | 'hover' | 'evidence' | 'title'> & { skill: number }

const seeds: Seed[] = [
  {
    id: 'architect',
    numeral: 'I',
    archetype: 'The Architect',
    skill: 0,
    meaning: 'Connect user needs, commercial goals and the wider product ecosystem before jumping into solutions.',
    practice: 'Map the whole system first: who is involved, what each part depends on and where value is made or lost.',
    proof: "Helped shape HeadBox's One Platform strategy, connecting the B2C marketplace and B2B SaaS platform.",
  },
  {
    id: 'weaver',
    numeral: 'II',
    archetype: 'The Weaver',
    skill: 1,
    meaning:
      'Pull separate tools and workflows into one coherent product, so the complexity sits in the system and not in the user.',
    practice: 'Audit every tool and handoff, then design one structure that the whole workflow can live in.',
    proof: 'Redesigned HostHQ, merging four host tools into one.',
    related: 'hosthq',
  },
  {
    id: 'connector',
    numeral: 'III',
    archetype: 'The Connector',
    skill: 2,
    meaning: 'Balance both sides of a marketplace, so every search, listing and match makes the next one more likely.',
    practice: 'Design for supply and demand together, and find the single moment where a match is made or missed.',
    proof: 'Improved venue discovery at HeadBox, contributing to a 30% rise in qualified inbound enquiries.',
    related: 'venue-finder',
  },
  {
    id: 'alchemist',
    numeral: 'IV',
    archetype: 'The Alchemist',
    skill: 3,
    meaning:
      'Use experimentation and behavioural insights to turn better user experiences into measurable commercial impact.',
    practice: 'Tie each design decision to a commercial measure, then check the measure moved for the right reason.',
    proof: 'Improved free-trial conversion 5× and reduced checkout drop-off by 23% at Findmypast.',
    related: 'treeassist',
  },
  {
    id: 'experimenter',
    numeral: 'V',
    archetype: 'The Experimenter',
    skill: 4,
    meaning: 'Turn hunches into testable bets, and keep the changes that measurably remove friction.',
    practice: 'Change one thing at a time, agree the success measure up front and let the result decide what ships.',
    proof: 'Ran A/B tests in a growth squad at Findmypast, lifting free-trial conversion 5×.',
    related: 'treeassist',
  },
  {
    id: 'seer',
    numeral: 'VI',
    archetype: 'The Seer',
    skill: 5,
    meaning:
      'Pair what customers say with what the product data shows, to see what is really going on before anyone designs a fix.',
    practice:
      'Read behaviour in the funnel, then ask customers why, so the numbers and the stories explain each other.',
    proof: "Used research and funnel analysis to rethink HeadBox's AI Venue Finder.",
    related: 'venue-finder',
  },
  {
    id: 'maker',
    numeral: 'VII',
    archetype: 'The Maker',
    skill: 6,
    meaning:
      'Turn ambiguous product challenges into tangible, well-crafted experiences, from discovery and research through to engineering collaboration and delivery.',
    practice: 'Get to something real quickly, test it with people and keep working with engineering until it ships.',
    proof: "Owned HeadBox's B2B platform and B2C marketplace design as its sole product designer.",
    related: 'hosthq',
  },
  {
    id: 'foundation',
    numeral: 'VIII',
    archetype: 'The Foundation',
    skill: 7,
    meaning:
      'Build reusable components, tokens and rules, so the product stays consistent as it scales and teams move faster.',
    practice:
      'Write the system down once, in components and rules, so every new screen starts from the same foundations.',
    proof: "Supported Findmypast's migration from Sketch to Figma.",
  },
]

export const DECK: OracleCardData[] = seeds.map(({ skill, ...seed }) => ({
  ...seed,
  title: skills[skill].title,
  evidence: skills[skill].text,
  drawing: skills[skill].drawing,
  hover: skills[skill].hover,
}))

export const CARD_BY_ID = Object.fromEntries(DECK.map((c) => [c.id, c])) as Record<CardId, OracleCardData>
export const CARD_IDS = DECK.map((c) => c.id)

// Only these pages exist. caseStudyId in a reading must be one of these keys.
export const CASE_STUDIES: Record<CaseStudyId, { slug: string; name: string }> = {
  'venue-finder': { slug: 'venue-finder', name: 'Venue Finder' },
  hosthq: { slug: 'hosthq', name: 'HostHQ' },
  treeassist: { slug: 'tree-assist', name: 'TreeAssist' },
}
