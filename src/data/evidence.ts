// The evidence inventory: everything the case studies still need from Ashni before they are complete.
// Each id is used by one <EvidencePlaceholder id="..." /> in caseStudyPages.ts. Nothing here is rendered in
// production. Priorities: P0 essential for credibility or interview readiness, P1 significantly improves
// seniority and differentiation, P2 optional polish or depth.

export type EvidenceKind = 'evidence' | 'verify'
export type EvidencePriority = 'P0' | 'P1' | 'P2'

export interface EvidenceItem {
  kind: EvidenceKind
  priority: EvidencePriority
  page: 'Venue Finder' | 'HostHQ' | 'TreeAssist' | 'Homepage'
  title: string
  ask: string // one sentence: what to provide
  why: string // why it matters to a hiring manager
  format: string // what would work best
  ratio?: string // CSS aspect ratio for screenshot frames
}

export const evidence = {
  // Venue Finder
  'vf-v1-v2-screens': {
    kind: 'evidence',
    priority: 'P0',
    page: 'Venue Finder',
    title: 'V1 vs V2 screens',
    ask: 'Side-by-side screens of V1 and V2 that show what actually changed in the UX (prompt step, sign-up, results).',
    why: 'The V1 to V2 move is the heart of the story, and hiring managers want to see the design change, not only read about it.',
    format: 'Two to four screenshots with short callouts, or one comparison image.',
    ratio: '16 / 7',
  },
  'vf-eng-decisions': {
    kind: 'evidence',
    priority: 'P0',
    page: 'Venue Finder',
    title: 'Decisions made with engineering',
    ask: 'Name one or two decisions you made with the four engineers between V1 and V2, what the options were and what you chose.',
    why: 'It shows how you work with engineering, the biggest gap in the portfolio review.',
    format: '3 to 4 sentences per decision.',
  },
  'vf-verify-metrics': {
    kind: 'verify',
    priority: 'P0',
    page: 'Venue Finder',
    title: 'Impact figures',
    ask: 'Confirm the +30% qualified enquiries (baseline and measurement period), what the 40% shorter journey measures, and whether any Spotlight revenue can be stated.',
    why: 'These are the headline claims, and interviewers will ask how they were measured.',
    format: 'One line each: figure, baseline, period, source.',
  },
  'vf-ranking-balance': {
    kind: 'evidence',
    priority: 'P1',
    page: 'Venue Finder',
    title: 'Relevance vs commercial boosting',
    ask: 'Show or describe how the team actually balanced relevance against paid Spotlight and active-venue boosts, only if it is documented.',
    why: 'It is the commercial trade-off at the centre of the marketplace.',
    format: 'A short decision summary or a comparison diagram.',
  },
  'vf-edge-treatment': {
    kind: 'evidence',
    priority: 'P2',
    page: 'Venue Finder',
    title: 'Edge-case screens',
    ask: 'A screenshot or spec of the unavailable-location page or the concierge route, or of how sparse inventory was treated.',
    why: 'Real edge-case UI shows craft beyond the happy path.',
    format: 'One screenshot with a one-line note.',
    ratio: '16 / 9',
  },
  // HostHQ
  'hq-workflow': {
    kind: 'evidence',
    priority: 'P0',
    page: 'HostHQ',
    title: 'End-to-end host workflow',
    ask: 'One diagram or screen sequence of the host workflow from lead to proposal to outcome.',
    why: 'It is the clearest proof of complex workflow design and of how the pieces fit.',
    format: 'A flow diagram or three to five screens in sequence.',
    ratio: '16 / 7',
  },
  'hq-screens-annotated': {
    kind: 'evidence',
    priority: 'P2',
    page: 'HostHQ',
    title: 'Annotated product screens',
    ask: 'Optional: annotate the three product screens above with the interaction decisions and states you want a design lead to notice.',
    why: 'It points a reviewer at the craft in each screen.',
    format: 'The same screenshots with three to five short callouts.',
  },
  'hq-eng-constraint': {
    kind: 'evidence',
    priority: 'P0',
    page: 'HostHQ',
    title: 'Engineering constraint and compromise',
    ask: 'Describe one real engineering constraint from delivery (for example the 3D Studio dependencies or the data migration), the options discussed, your role and what shipped.',
    why: 'It turns "we deferred it" into visible collaboration and judgement.',
    format: '3 to 4 sentences, plus an optional annotated screenshot.',
  },
  'hq-responsibilities': {
    kind: 'evidence',
    priority: 'P0',
    page: 'HostHQ',
    title: 'My responsibilities vs the team',
    ask: 'List what you owned, what the PM owned, what engineering owned and who else contributed.',
    why: 'Hiring managers need to see individual ownership without guessing.',
    format: 'A short two-column list.',
  },
  'hq-verify-metrics': {
    kind: 'verify',
    priority: 'P0',
    page: 'HostHQ',
    title: 'Impact figures',
    ask: 'Confirm how 55+ clients, +32% hosts reporting closed bookings and -25% navigation tickets were measured, over what period, and what is attributable to this work. Churn is not shown here because the CV places it on guest booking journeys.',
    why: 'These figures lead the case study and need a measurement story.',
    format: 'One line each: figure, baseline, period, source, attribution.',
  },
  // TreeAssist
  'ta-contribution': {
    kind: 'evidence',
    priority: 'P0',
    page: 'TreeAssist',
    title: 'My contribution alongside the Lead Product Designer',
    ask: 'Say which parts you designed and decided and which the Lead Product Designer did.',
    why: 'The role line says you worked with a lead, so reviewers need to see what was yours.',
    format: '2 to 3 sentences.',
  },
  'ta-final-states': {
    kind: 'evidence',
    priority: 'P1',
    page: 'TreeAssist',
    title: 'Final interaction states',
    ask: 'Screens or states that explain the shipped interaction, such as the suggestion accept, reject and loading states.',
    why: 'It shows the interaction design behind the experiments.',
    format: 'Two or three annotated screens.',
    ratio: '9 / 16',
  },
  'ta-experiment-results': {
    kind: 'evidence',
    priority: 'P1',
    page: 'TreeAssist',
    title: 'Experiment baselines and results',
    ask: 'Add baselines, sample sizes or durations for the three experiments where you have them.',
    why: 'Percentages without baselines are hard to trust.',
    format: 'A small table: experiment, baseline, result, period.',
  },
  'ta-eng-latency': {
    kind: 'evidence',
    priority: 'P1',
    page: 'TreeAssist',
    title: 'Engineering and suggestion latency',
    ask: 'Describe how you worked with engineering on the 2 to 30 second suggestion wait and what was agreed.',
    why: 'It shows a real technical constraint shaping the design.',
    format: '3 to 4 sentences.',
  },
  'ta-verify-attribution': {
    kind: 'verify',
    priority: 'P0',
    page: 'TreeAssist',
    title: 'Which outcomes are attributable',
    ask: 'Confirm which of +18% trial starts, +8% trial-to-subscription, +26% larger trees and -13% drop-off came from your three tests, and whether 41% drop-off is the baseline.',
    why: 'The results come from a team, so attribution needs to be stated plainly.',
    format: 'One line per figure.',
  },
} satisfies Record<string, EvidenceItem>

export type EvidenceId = keyof typeof evidence
