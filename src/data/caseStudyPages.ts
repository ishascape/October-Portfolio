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
  body?: string[]
  list?: { title?: string; text: string }[]
  experiments?: Experiment[]
  figure?: string // placeholder caption until real images arrive
}

export interface CaseStudyPage {
  id: CaseStudyId
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
    kicker: 'HeadBox · Demand side',
    subtitle:
      'Rebalancing a two-sided events marketplace by capturing guest intent earlier, so hosts get fewer, better leads.',
    meta: [
      { label: 'Role', value: 'Sole product designer' },
      { label: 'Team', value: '4 engineers' },
      { label: 'Timescale', value: '2 months, 2-week experiment cycles' },
      { label: 'Marketplace', value: 'Guests and events (demand) · venue hosts (supply)' },
    ],
    problem:
      'The legacy model rewarded brief volume over booking intent. Unqualified briefs flooded hosts, and hosts churned: Lead Feed churn was 55%.',
    solution:
      'An AI-powered brief journey with venue recommendations, plus a new Spotlight Partner sponsored-placement model.',
    impact: [
      { value: '+33%', label: 'High-intent enquiries' },
      { value: '40%', label: 'Shorter user journey' },
      { value: 'New', label: 'Sponsored-placement revenue' },
    ],
    sections: [
      {
        label: '01 · The systemic problem',
        heading: 'The marketplace was optimised for the wrong number.',
        body: [
          'Marketing KPIs were tied to how many briefs were submitted, not how many turned into bookings. Hosts paid the price: closing a single booking often took 27 or more messages.',
        ],
      },
      {
        label: '02 · Research',
        heading: 'Every brief hinged on one non-negotiable.',
        body: [
          'There had been no guest research in over four years, so I interviewed 10 event bookers. Each brief had one requirement that could not move, and any venue missing it was rejected straight away.',
          'That gave us the hypothesis: capture intent earlier and encourage shortlisting before submission, and we reduce low-quality briefs and improve host ROI.',
        ],
        figure: 'Research synthesis',
      },
      {
        label: '03 · The system',
        heading: 'The lifecycle of an event brief.',
        body: [
          'Venue Finder parses guest requirements with an LLM, ranks venues from vectorised inventory, and lets guests compare quotes before booking. The brief then lands in the host’s Lead Feed, so the same workflow runs through both sides of the marketplace.',
        ],
        figure: 'Brief-to-lead system diagram',
      },
      {
        label: '04 · Experiments',
        heading: 'Control, a failed V1, and the V2 that shipped.',
        experiments: [
          {
            name: 'Control · Legacy brief builder',
            intent: 'The baseline.',
            change: 'A 13-step builder made of preset options.',
            result: '83% drop-off.',
          },
          {
            name: 'V1 · Disruptive',
            intent: 'Capture intent up front and show venues before submission.',
            change: 'An AI prompt, pre-submission recommendations, gated account creation and multi-venue selection.',
            result:
              'Lead Feed volume fell 40%, with drop-off at the AI input (38%) and account creation (27%). Direct enquiries rose 26% and guests shortlisted 2.2 venues on average.',
            verdict: 'Failed, and taught us the most.',
          },
          {
            name: 'V2 · Moderate',
            intent: 'Keep the intent signal, remove the friction.',
            change:
              'The prompt became optional, sign-up softened to a magic link, and recommendations were gated behind sign-up to deter scraping. Load times improved.',
            result:
              'Kept in high-inventory regions. Lead Feed stays as the fallback where inventory is low, and high-value briefs outside active regions route to a human account manager.',
            verdict: 'Shipped.',
          },
        ],
        figure: 'V1 and V2 flows',
      },
      {
        label: '05 · Reflections',
        heading: 'Disruption is a learning tool, if you frame it in economics.',
        list: [
          { title: 'The challenges', text: 'Executive attachment to Lead Feed, marketing KPIs tied to submission volume, and limits on recommendation quality.' },
          { title: 'What worked', text: 'Framing debates around marketplace economics, making trade-offs explicit, and letting experiments make the call.' },
          { title: 'Next', text: 'Conversion-weighted ranking, a shortlist-first flow for repeat users, an agent-assisted city launch mode, and separating marketing volume from marketplace-health metrics.' },
        ],
      },
    ],
  },

  hosthq: {
    id: 'hosthq',
    kicker: 'HeadBox · Supply side',
    subtitle:
      'Consolidating supply workflows and performance visibility to improve retention and cross-product adoption.',
    meta: [
      { label: 'Role', value: 'Senior Product Designer: design strategy and execution, IA and workflow redesign' },
      { label: 'Stakeholders', value: 'Platform clients, CEO, CTO, Head of Marketing, Head of Venue Sales' },
      { label: 'Timescale', value: '3 months, 0→1, discovery to full release' },
    ],
    problem:
      'HeadBox’s host platform had grown into four siloed products: Lead Feed, PowerHost, HeadBox for Business and 3D Studio. We were shipping the org chart to customers, with fragmented navigation, duplicated workflows, inconsistent data and limited cross-product adoption.',
    solution:
      'One Platform: a single supply-side system organised around host workflows rather than internal product lines, and repositioned as a structured revenue engine.',
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
        body: [
          'I ran interactive focus groups with hosts across venue types, to see how they work beyond our product. They didn’t want more features. They wanted clear growth signals and ROI visibility.',
          'That made revenue clarity the primary goal, and it shaped the whole consolidation strategy.',
        ],
        figure: 'Host focus groups',
      },
      {
        label: '02 · Strategy',
        heading: 'From improving usability to a supply-side growth engine.',
        list: [
          { text: 'Collapse fragmented tools into a single system of entry.' },
          { text: 'Re-architect around host goals, not product lines.' },
          { text: 'Centralise performance data into an outcome-driven ROI story.' },
          { text: 'Build a modular architecture ready for automation, AI and integrations.' },
        ],
        figure: 'Before and after information architecture',
      },
      {
        label: '03 · The MVP',
        heading: 'System coherence, not surface polish.',
        body: [
          'We had a fixed three-month runway before peak season, so I prioritised structural impact over completeness: unified navigation and IA, consolidated workflows, action-led dashboards, and a stronger proposal builder as the core revenue lever.',
        ],
        list: [
          { title: '3D Studio', text: 'Legacy dependencies blocked full integration, so it was embedded in the proposal flow and full migration deferred.' },
          { title: 'Reporting', text: 'A unified reporting layer needed a data clean-up first, so only marketplace reporting shipped.' },
          { title: 'Performance', text: 'Data migration slowed v1 load times for hosts with large datasets.' },
          { title: 'Mobile', text: 'Desktop-only for the MVP, because hosts work primarily on desktop.' },
        ],
        figure: 'One Platform dashboard and proposal builder',
      },
      {
        label: '04 · With 12 months instead of 3',
        heading: 'What comes next.',
        list: [
          { text: 'Segment hosts by maturity and revenue band.' },
          { text: 'Predictive performance insights, and risk and opportunity scoring for event briefs.' },
          { text: 'Automated listing-optimisation recommendations.' },
          { text: 'AI-powered demand signals in the dashboard.' },
          { text: 'A supply-side North Star beyond churn, such as host LTV uplift.' },
          { text: 'Consolidated reporting on a clean data layer.' },
        ],
      },
      {
        label: '05 · Reflections',
        heading: 'Platform debt is an alignment problem before it is a design problem.',
        body: [
          'The fragmentation came from reactive growth. The fix was reframing the problem around clearer growth signals for hosts. Strong marketplaces are built on structural clarity and on features that improve existing workflows, not on feature velocity.',
        ],
      },
    ],
  },

  treeassist: {
    id: 'treeassist',
    kicker: 'Findmypast · Activation',
    subtitle:
      'Designing value-first onboarding with AI-powered relative suggestions to accelerate activation and free-trial conversion.',
    meta: [
      { label: 'Role', value: 'Product Designer, with the Lead Product Designer' },
      { label: 'Team', value: 'PM, data science and engineering' },
      { label: 'Stakeholders', value: 'New users, Head of Tree Product, Head of Product Experience' },
      { label: 'Timescale', value: '2 months, 2-week experiment cycles' },
    ],
    problem:
      '41% of new users dropped off before experiencing any product value. They were overwhelmed by admin-heavy onboarding and a blank family-tree canvas.',
    solution:
      'AI-assisted onboarding that replaced form-heavy setup with in-product relative suggestions and progressive guidance.',
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
          'The business needed better early activation to lift free-trial starts and downstream subscriptions. Users needed to reach value before the admin wore them out.',
          'Hypothesis: replace form-heavy onboarding with AI-assisted suggestions and guided building, and activation, tree depth and free-trial conversion all go up.',
        ],
      },
      {
        label: '02 · Experiments',
        heading: 'Three onboarding experiments, two weeks each.',
        experiments: [
          {
            name: 'Experiment 1 · Reveal immediate value',
            intent: 'Reinforce product value immediately after sign-up.',
            change: 'Surfaced a likely birth record from sign-up data, for users with British or Irish ancestry.',
            result: '60% task acceptance.',
          },
          {
            name: 'Experiment 2 · Guide the next action',
            intent: 'Reduce confusion after onboarding.',
            change: 'Suggested mothers and spouses directly on the tree canvas.',
            result: '+32% hint engagement, and more tree expansion.',
          },
          {
            name: 'Experiment 3 · Interactive onboarding',
            intent: 'Get users to the core product faster.',
            change: 'Cut onboarding from 8 forms to 3, then moved users into AI-assisted tree building with suggested relatives.',
            result: '-13% onboarding drop-off and higher activation.',
          },
        ],
        figure: 'Onboarding before and after',
      },
      {
        label: '03 · Trade-offs',
        heading: 'Momentum over completeness.',
        list: [
          { title: 'Activation over data completeness', text: 'Fewer steps up front meant less profile information in the short term.' },
          { title: 'Record availability', text: 'Suggestions relied on historical record matches, so they worked best for British ancestry.' },
          { title: 'Advanced users', text: 'Experienced genealogists found the simpler onboarding slowed their route to advanced search and editing.' },
        ],
      },
      {
        label: '04 · Descope dungeon',
        heading: 'Designing for a 2 to 30 second wait.',
        body: [
          'Suggestions took anywhere from 2 to 30 seconds to generate. I proposed progressive, personalised content during the wait, such as newspaper headlines from your birthday. The team prioritised the core improvements for release speed, so it was descoped.',
        ],
        figure: 'Wait-state concepts',
      },
      {
        label: '05 · Reflections',
        heading: 'Help people feel value before you ask for data.',
        body: [
          'Helping users experience value early is often more impactful than collecting perfect data up front, and designing for momentum can unlock both engagement and monetisation. Next, I’d add a personalised task list on the tree canvas to guide people through their free trial.',
        ],
      },
    ],
  },
}
