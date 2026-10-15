// Case-study pages, rebuilt from the live ashnidave.com pages (read 14 Oct 2026).
// Every figure is from the live page or Ashni's confirmed corrections. The Venue Finder
// match-rate claims and its "-28% churn" are deliberately left out (see homepage-content.md).
import type { CaseStudyId } from './content'

export interface Metric {
  value: string
  label: string
}

export interface Experiment {
  name: string
  intent: string
  change: string
  result: string
  verdict?: string
}

export interface Section {
  label: string // small kicker, like a drawing title
  heading: string
  eyebrow?: string // hand-lettered note above the heading, with a line-drawn light bulb
  eyebrowIcon?: 'bulb' | 'sword' // line-drawn icon before the note (default: bulb)
  body?: string[]
  list?: { title?: string; text: string }[]
  experiments?: Experiment[]
  figure?: string // placeholder caption until real images arrive
  figures?: string[] // several placeholder frames, one per selected screen
  diagram?: boolean // the animated systems diagram, shown full width under the section
}

// One cell of the top summary box. `gap` marks something only Ashni can fill in; it is shown on
// the page as "To confirm" until she answers, so nothing is guessed.
export interface SummaryCell {
  text: string
  gap?: string
}

export interface CaseSummary {
  role: SummaryCell
  decision: SummaryCell
  outcome: SummaryCell
}

export interface CaseStudyPage {
  id: CaseStudyId
  summary: CaseSummary
  kicker: string
  subtitle: string
  meta: { label: string; value: string }[]
  problem: string
  solution: string
  impact: Metric[]
  sections: Section[]
}

export const caseStudyPages: Record<CaseStudyId, CaseStudyPage> = {
  'venue-finder': {
    id: 'venue-finder',
    summary: {
      role: {
        text: 'Sole product designer, with 4 engineers, over 2 months. I interviewed 10 event bookers and designed both the V1 and V2 brief journeys.',
      },
      decision: {
        text: 'I fought to keep Venue Finder alive and to measure it differently: lead volume was a poor measure of quality, and it left customers on both sides of the marketplace disappointed. V1 cut Lead Feed volume by 40%, so we moved to a moderate V2 with an optional prompt, magic-link sign-up and recommendations gated behind sign-up.',
      },
      outcome: {
        text: '+33% high-intent enquiries and a 40% shorter user journey. Measured with A/B testing in 2-week experiment cycles, against the legacy 13-step builder (83% drop-off), and by monitoring engagement patterns.',
      },
    },
    kicker: 'HeadBox · Demand side',
    subtitle:
      'Rebalancing a two-sided events marketplace: capture guest intent earlier, send hosts fewer, better leads.',
    meta: [
      { label: 'Role', value: 'Sole product designer' },
      { label: 'Team', value: '4 engineers' },
      { label: 'Timescale', value: '2 months, 2-week experiment cycles' },
      { label: 'Marketplace', value: 'Guests and events (demand) · venue hosts (supply)' },
    ],
    problem:
      'The legacy model rewarded brief volume over booking intent. Unqualified briefs flooded hosts, and Lead Feed churn hit 55%.',
    solution:
      'AI-powered brief journey with venue recommendations, plus a Spotlight Partner sponsored-placement model.',
    impact: [
      { value: '+33%', label: 'High-intent enquiries' },
      { value: '40%', label: 'Shorter user journey' },
      { value: 'New', label: 'Sponsored-placement revenue' },
    ],
    sections: [
      {
        label: '01 · The systemic problem',
        heading: 'Optimised for the wrong metric.',
        body: [
          'Marketing KPIs tracked briefs submitted, not bookings. Closing one booking often took hosts 27 or more messages.',
        ],
      },
      {
        label: '02 · Research',
        heading: 'Every brief hinged on one non-negotiable.',
        eyebrow: 'Interview insight',
        body: [
          'No guest research in over four years, so I interviewed 10 event bookers. Every brief had one fixed requirement; venues missing it were rejected instantly.',
          'Hypothesis: capture intent and encourage shortlisting before submission to cut low-quality briefs and lift host ROI.',
        ],
        figure: 'Research synthesis',
      },
      {
        label: '03 · The system',
        heading: 'The lifecycle of an event brief.',
        body: [
          'Venue Finder parses requirements with an LLM, ranks venues from vectorised inventory and lets guests compare quotes. The brief then lands in the host’s Lead Feed: one workflow across both sides.',
        ],
        figure: 'Brief-to-lead system diagram',
      },
      {
        label: '04 · Experiments',
        heading: 'Control, failed V1, shipped V2.',
        experiments: [
          {
            name: 'Control · Legacy brief builder',
            intent: 'The baseline.',
            change: '13-step builder of preset options.',
            result: '83% drop-off.',
          },
          {
            name: 'V1 · Disruptive',
            intent: 'Capture intent up front; show venues before submission.',
            change: 'AI prompt, pre-submission recommendations, gated account creation, multi-venue selection.',
            result:
              'Lead Feed volume fell 40%. Drop-off at AI input (38%) and account creation (27%). Direct enquiries rose 26%; guests shortlisted 2.2 venues on average.',
            verdict: 'Failed. Taught us the most.',
          },
          {
            name: 'V2 · Moderate',
            intent: 'Keep the intent signal, cut the friction.',
            change:
              'Optional prompt, magic-link sign-up, recommendations gated behind sign-up to deter scraping, faster load times.',
            result:
              'Kept in high-inventory regions. Lead Feed covers low-inventory areas; high-value briefs outside active regions go to an account manager.',
            verdict: 'Shipped.',
          },
        ],
        figure: 'V1 and V2 flows',
      },
      {
        label: '05 · Selected screens',
        heading: 'Key moments in the journey.',
        body: ['Selected screens, with a note on what each key moment is doing for the guest.'],
        figures: ['Key moment one', 'Key moment two', 'Key moment three'],
      },
      {
        label: '06 · Reflections',
        heading: 'Disruption is a learning tool when framed in economics.',
        list: [
          {
            title: 'The challenges',
            text: 'Executive attachment to Lead Feed, volume-based marketing KPIs, limited recommendation quality.',
          },
          {
            title: 'What worked',
            text: 'Marketplace-economics framing, explicit trade-offs, letting experiments decide.',
          },
          {
            title: 'Next',
            text: 'Conversion-weighted ranking, shortlist-first flow for repeat users, agent-assisted city launch mode, separate marketing-volume and marketplace-health metrics.',
          },
        ],
      },
    ],
  },

  hosthq: {
    id: 'hosthq',
    summary: {
      role: {
        text: 'Senior Product Designer, 0→1 in 3 months. I ran the host focus groups, set the consolidation strategy and scoped the MVP across four products.',
        gap: 'Team size and who you worked with day to day.',
      },
      decision: {
        text: 'I fought for round-table research over a redesign based purely on stakeholder opinion and support tickets. The research set the MVP scope, the essential workflows to ship in 3 months, and the sequence for what comes next. We shipped structure over completeness and deferred the 3D Studio migration, full reporting and mobile.',
      },
      outcome: {
        text: '-28% host churn (Q1), 55+ new One Platform clients in 3 months, +32% of hosts reporting closed bookings and 25% fewer navigation support tickets.',
        gap: 'How these were measured (baseline, period, source).',
      },
    },
    kicker: 'HeadBox · Supply side',
    subtitle: 'Consolidating supply workflows and performance visibility to lift retention and cross-product adoption.',
    meta: [
      { label: 'Role', value: 'Senior Product Designer: design strategy, execution, IA and workflow redesign' },
      { label: 'Stakeholders', value: 'Platform clients, CEO, CTO, Head of Marketing, Head of Venue Sales' },
      { label: 'Timescale', value: '3 months, 0→1, discovery to full release' },
    ],
    problem:
      'HeadBox’s host platform was four siloed products: Lead Feed, PowerHost, HeadBox for Business and 3D Studio. We were shipping the org chart: fragmented navigation, duplicated workflows, inconsistent data, limited cross-product adoption.',
    solution:
      'One Platform: a single supply-side system built around host workflows, repositioned as a structured revenue engine.',
    impact: [
      { value: '-28%', label: 'Host churn (Q1)' },
      { value: '55+', label: 'New One Platform clients in 3 months' },
      { value: '+32%', label: 'Hosts reporting closed bookings' },
      { value: '-25%', label: 'Navigation support tickets' },
    ],
    sections: [
      {
        label: '01 · Research',
        heading: 'HeadBox was a peripheral lead channel, not the hosts’ operating system.',
        eyebrow: 'Research insight',
        body: [
          'I ran interactive focus groups across venue types. Hosts wanted clear growth signals and ROI visibility, not more features.',
          'Revenue clarity became the primary goal, shaping the consolidation strategy.',
        ],
        figure: 'Host focus groups',
      },
      {
        label: '02 · Strategy',
        heading: 'From usability fix to supply-side growth engine.',
        list: [
          { text: 'Collapse fragmented tools into one system of entry.' },
          { text: 'Re-architect around host goals, not product lines.' },
          { text: 'Centralise performance data into an outcome-driven ROI story.' },
          { text: 'Build modular architecture ready for automation, AI and integrations.' },
        ],
        figure: 'Before and after information architecture',
        diagram: true,
      },
      {
        label: '03 · The MVP',
        heading: 'System coherence, not surface polish.',
        body: [
          'With three months before peak season, I prioritised structure over completeness: unified navigation and IA, consolidated workflows, action-led dashboards and a stronger proposal builder as the core revenue lever.',
        ],
        list: [
          {
            title: '3D Studio',
            text: 'Legacy dependencies blocked integration. Embedded in the proposal flow; migration deferred.',
          },
          { title: 'Reporting', text: 'Needed a data clean-up first. Shipped marketplace reporting only.' },
          { title: 'Performance', text: 'Data migration slowed v1 load times for large-dataset hosts.' },
          { title: 'Mobile', text: 'Desktop-only MVP; hosts work primarily on desktop.' },
        ],
        figure: 'One Platform dashboard and proposal builder',
      },
      {
        label: '04 · With 12 months instead of 3',
        heading: 'What comes next.',
        list: [
          { text: 'Segment hosts by maturity and revenue band.' },
          { text: 'Predictive performance insights; risk/opportunity scoring for event briefs.' },
          { text: 'Automated listing-optimisation recommendations.' },
          { text: 'AI-powered dashboard demand signals.' },
          { text: 'Supply-side North Star beyond churn, such as host LTV uplift.' },
          { text: 'Consolidated reporting on a clean data layer.' },
        ],
      },
      {
        label: '05 · Reflections',
        heading: 'Platform debt is an alignment problem first.',
        body: [
          'Reactive growth caused the fragmentation; the fix was reframing around clearer growth signals for hosts. Strong marketplaces run on structural clarity and workflow-improving features, not feature velocity.',
        ],
      },
    ],
  },

  treeassist: {
    id: 'treeassist',
    summary: {
      role: {
        text: 'Product Designer, with the Lead Product Designer, PM, data science and engineering, over 2 months. I owned the UI and the experiment design for the three tests below; the team lead guided strategy.',
      },
      decision: {
        text: 'I fought for interactive states on the desktop onboarding, rather than the view-only state engineers proposed to speed up development. The three tests then cut onboarding from 8 forms to 3 and moved to AI-assisted tree building.',
      },
      outcome: {
        text: '+18% free-trial starts, +8% trial-to-subscription conversion and -13% onboarding drop-off, from a baseline where 41% of new users dropped off before value. Measured with A/B tests in 2-week experiment cycles and by monitoring engagement patterns.',
      },
    },
    kicker: 'Findmypast · Activation',
    subtitle:
      'Value-first onboarding with AI-powered relative suggestions to accelerate activation and free-trial conversion.',
    meta: [
      { label: 'Role', value: 'Product Designer, with the Lead Product Designer' },
      { label: 'Team', value: 'PM, data science and engineering' },
      { label: 'Stakeholders', value: 'New users, Head of Tree Product, Head of Product Experience' },
      { label: 'Timescale', value: '2 months, 2-week experiment cycles' },
    ],
    problem:
      '41% of new users dropped off before reaching value, overwhelmed by admin-heavy onboarding and a blank family-tree canvas.',
    solution:
      'AI-assisted onboarding: in-product relative suggestions and progressive guidance replaced form-heavy setup.',
    impact: [
      { value: '+18%', label: 'Free-trial starts' },
      { value: '+8%', label: 'Trial-to-subscription conversion' },
      { value: '+26%', label: 'Users building trees with 10+ people' },
      { value: '-13%', label: 'Onboarding drop-off' },
    ],
    sections: [
      {
        label: '01 · The problem',
        heading: 'Value arrived too late.',
        body: [
          'Business goal: stronger early activation to lift free-trial starts and subscriptions. User goal: reach value before admin wears them out.',
          'Hypothesis: swap form-heavy onboarding for AI-assisted suggestions and guided building to lift activation, tree depth and free-trial conversion.',
        ],
      },
      {
        label: '02 · Experiments',
        heading: 'Three experiments, two weeks each.',
        experiments: [
          {
            name: 'Experiment 1 · Reveal immediate value',
            intent: 'Show value right after sign-up.',
            change: 'Surfaced a likely birth record from sign-up data for users with British or Irish ancestry.',
            result: '60% task acceptance.',
          },
          {
            name: 'Experiment 2 · Guide the next action',
            intent: 'Reduce post-onboarding confusion.',
            change: 'Suggested mothers and spouses on the tree canvas.',
            result: '+32% hint engagement; more tree expansion.',
          },
          {
            name: 'Experiment 3 · Interactive onboarding',
            intent: 'Reach the core product faster.',
            change: 'Cut onboarding from 8 forms to 3, then into AI-assisted tree building with suggested relatives.',
            result: '-13% onboarding drop-off; higher activation.',
          },
        ],
        figure: 'Onboarding before and after',
      },
      {
        label: '03 · Trade-offs',
        heading: 'Momentum over completeness.',
        list: [
          {
            title: 'Activation over data completeness',
            text: 'Fewer upfront steps meant less profile data short term.',
          },
          {
            title: 'Record availability',
            text: 'Suggestions relied on historical record matches; best for British ancestry.',
          },
          {
            title: 'Advanced users',
            text: 'Experienced genealogists reached advanced search and editing more slowly.',
          },
        ],
      },
      {
        label: '04 · Descope dungeon',
        heading: 'Designing for a 2 to 30 second wait.',
        eyebrow: 'Descoped, not forgotten',
        eyebrowIcon: 'sword',
        body: [
          'Suggestions took 2 to 30 seconds. I proposed progressive, personalised content for the wait, like newspaper headlines from your birthday. Descoped so the team could prioritise core improvements and release speed.',
        ],
        figure: 'Wait-state concepts',
      },
      {
        label: '05 · Reflections',
        heading: 'Deliver value before asking for data.',
        body: [
          'Early value often beats perfect upfront data; designing for momentum can unlock engagement and monetisation. Next: a personalised tree-canvas task list to guide users through their free trial.',
        ],
      },
    ],
  },
}
