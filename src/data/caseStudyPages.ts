// Case-study pages, rebuilt from the live ashnidave.com pages (read 14 Oct 2026).
// The CV is the source of truth (Ashni, 15 Oct 2026). Venue Finder match-rate claims are left out, and
// the CV's "-28% churn" belongs to the guest booking journeys work, so it is not shown on HostHQ.
import type { CaseStudyId } from './content'
import hosthqHero from '../assets/hosthq-hero.webp'
import treeassistHero from '../assets/treeassist-hero.webp'
import treeassistExp1 from '../assets/treeassist-exp1.webp'
import treeassistExp2 from '../assets/treeassist-exp2.webp'
import treeassistExp3 from '../assets/treeassist-exp3.webp'
import treeassistDesktop from '../assets/treeassist-desktop.webp'

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
  image?: { src: string; alt: string; width: number; height: number } // a real screen, shown beside the text
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
  image?: { src: string; alt: string; caption: string; width: number; height: number } // a real screenshot
  plan?: 'parti' | 'flow' // the existing/proposed drawing (parti) or the TreeAssist two-lane flow, shown under this section
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
  // A real product image for the page header. When set, the existing/proposed plan drawing moves to sit
  // under the first section instead of the header.
  heroImage?: { src: string; alt: string; width: number; height: number }
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
        text: 'Sole product designer, working with 4 engineers for 2 months. I interviewed 10 event bookers and designed both versions of the brief journey, the flow where guests describe their event to venues.',
      },
      decision: {
        text: 'I argued for keeping Venue Finder going and for judging it differently. Counting leads rewarded volume over quality and left customers on both sides of the marketplace disappointed. The first version cut Lead Feed volume by 40%, so we shipped a more moderate second version.',
      },
      outcome: {
        text: 'Qualified inbound enquiries rose 30%, and the journey became 40% shorter than the old 13-step builder, which lost 83% of users. Measured with A/B tests in 2-week cycles and by monitoring engagement patterns.',
      },
    },
    kicker: 'HeadBox · Demand side',
    subtitle:
      'HeadBox is a marketplace connecting people planning events with venue hosts. I redesigned how guests describe their event, so hosts received fewer, better-qualified enquiries.',
    meta: [
      { label: 'Role', value: 'Sole product designer' },
      { label: 'Team', value: '4 engineers' },
      { label: 'Timescale', value: '2 months, 2-week experiment cycles' },
      { label: 'Marketplace', value: 'Guests planning events (demand) · venue hosts (supply)' },
    ],
    problem:
      'The old model rewarded the number of briefs submitted, not the intent to book. A brief is a guest’s event request. Unqualified briefs flooded hosts, and Lead Feed churn hit 55%.',
    solution:
      'An AI-powered brief journey that recommends venues, plus Spotlight Partner, a sponsored-placement model for venues.',
    impact: [
      { value: '+30%', label: 'Qualified inbound enquiries' },
      { value: '40%', label: 'Shorter user journey' },
      { value: 'New', label: 'Sponsored-placement revenue' },
    ],
    sections: [
      {
        label: '01 · The systemic problem',
        heading: 'Optimised for the wrong metric.',
        body: [
          'Marketing measured briefs submitted, not bookings. Hosts often needed 27 or more messages to close a single booking.',
        ],
      },
      {
        label: '02 · Research',
        heading: 'Every brief hinged on one non-negotiable.',
        eyebrow: 'Interview insight',
        body: [
          'HeadBox had done no guest research in over four years, so I interviewed 10 event bookers. Every brief had one fixed requirement, and venues that missed it were rejected immediately.',
          'Hypothesis: if we capture intent and encourage shortlisting before a brief is submitted, fewer low-quality briefs reach hosts and each lead is worth more to them.',
        ],
        figure: 'Research synthesis',
      },
      {
        label: '03 · The system',
        heading: 'How an event brief travels.',
        body: [
          'Venue Finder uses an LLM to read what a guest needs, ranks venues from a vectorised inventory and lets guests compare quotes. The brief then arrives in the host’s Lead Feed, so one workflow serves both sides of the marketplace.',
        ],
        figure: 'Brief-to-lead system diagram',
      },
      {
        label: '04 · Experiments',
        heading: 'A control, a first version that failed, and a second that shipped.',
        experiments: [
          {
            name: 'Control · Legacy brief builder',
            intent: 'The baseline.',
            change: 'The existing 13-step builder, made of preset options.',
            result: '83% of users dropped off.',
          },
          {
            name: 'V1 · Disruptive',
            intent: 'Capture intent up front and show venues before a brief is submitted.',
            change:
              'An AI prompt, venue recommendations before submission, a required account-creation step and multi-venue selection.',
            result:
              'Lead Feed volume fell 40%. 38% of users dropped off at the AI input and 27% at account creation. Direct enquiries rose 26%, and guests shortlisted 2.2 venues on average.',
            verdict: 'Failed, and taught us the most.',
          },
          {
            name: 'V2 · Moderate',
            intent: 'Keep the intent signal and remove the friction.',
            change:
              'An optional prompt, magic-link sign-up, recommendations shown only after sign-up to deter scraping, and faster load times.',
            result:
              'Kept in regions with plenty of venues. Lead Feed covers regions with few venues, and high-value briefs outside active regions go to an account manager.',
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
        heading: 'A bold experiment teaches the most when it is framed in economics.',
        list: [
          {
            title: 'The challenges',
            text: 'Executives were attached to Lead Feed, marketing targets rewarded volume, and recommendation quality was limited.',
          },
          {
            title: 'What worked',
            text: 'Framing the problem in marketplace economics, being explicit about trade-offs, and letting experiments decide.',
          },
          {
            title: 'Next',
            text: 'Ranking venues by how likely they are to convert, a shortlist-first flow for repeat users, an agent-assisted mode for launching in a new city, and separate metrics for marketing volume and marketplace health.',
          },
        ],
      },
    ],
  },

  hosthq: {
    id: 'hosthq',
    heroImage: {
      src: hosthqHero,
      alt: 'Three HostHQ screens floating around a monitor: proposals with an urgent-requests alert, a leads list, and Lead Feed reports.',
      width: 1800,
      height: 654,
    },
    summary: {
      role: {
        text: 'Senior Product Designer on a project built from scratch in 3 months. I ran the host focus groups, set the consolidation strategy and scoped the MVP (first release) across four products.',
        gap: 'Team size and who you worked with day to day.',
      },
      decision: {
        text: 'I argued for round-table research instead of a redesign driven only by stakeholder opinion and support tickets. The research set the MVP scope, the workflows that mattered most under a tight deadline, and the order of what comes next. We shipped structure over completeness and deferred the 3D Studio migration, full reporting and mobile.',
      },
      outcome: {
        text: '55+ new One Platform clients in 3 months, 32% more hosts reporting closed bookings, and 25% fewer support tickets about navigation.',
        gap: 'How these were measured (baseline, period, source).',
      },
    },
    kicker: 'HeadBox · Supply side',
    subtitle:
      'Venue hosts on HeadBox used four separate tools. I combined them into one platform, so hosts could see how they were earning and act on it.',
    meta: [
      { label: 'Role', value: 'Senior Product Designer: design strategy, execution, IA and workflow redesign' },
      { label: 'Stakeholders', value: 'Platform clients, CEO, CTO, Head of Marketing, Head of Venue Sales' },
      { label: 'Timescale', value: '3 months, 0→1, discovery to full release' },
    ],
    problem:
      'Hosts are the venues that list on HeadBox, and their platform was really four separate products: Lead Feed, PowerHost, HeadBox for Business and 3D Studio. We were shipping our org chart: confusing navigation, repeated workflows, inconsistent data and little use of more than one product.',
    solution:
      'One Platform: a single system for hosts, organised around the jobs they do and positioned as a structured way to earn revenue.',
    impact: [
      { value: '55+', label: 'New One Platform clients in 3 months' },
      { value: '+32%', label: 'Hosts reporting closed bookings' },
      { value: '-25%', label: 'Navigation support tickets' },
    ],
    sections: [
      {
        label: '01 · Research',
        heading: 'HeadBox was a side channel for leads, not where hosts ran their business.',
        eyebrow: 'Research insight',
        body: [
          'I ran interactive focus groups with different types of venue. Hosts wanted clear signals of how they were growing and what return they were getting, not more features.',
          'Making revenue clear became the main goal, and it shaped the consolidation strategy.',
        ],
        figure: 'Host focus groups',
      },
      {
        label: '02 · Strategy',
        heading: 'From fixing usability to growing supply.',
        list: [
          { text: 'Replace scattered tools with one place to start.' },
          { text: 'Organise around host goals instead of product lines.' },
          { text: 'Bring performance data together into one clear story of return on investment.' },
          { text: 'Build a modular foundation that is ready for automation, AI and integrations.' },
        ],
        figure: 'Before and after information architecture',
        plan: 'parti',
      },
      {
        label: '03 · The MVP',
        heading: 'A coherent system before surface polish.',
        body: [
          'With three months before peak season, I chose structure over completeness: unified navigation and information architecture, consolidated workflows, dashboards that prompt action, and a stronger proposal builder as the main revenue lever.',
        ],
        list: [
          {
            title: '3D Studio',
            text: 'Legacy dependencies blocked a full integration, so it was embedded in the proposal flow and the migration was deferred.',
          },
          { title: 'Reporting', text: 'The data needed cleaning first, so we shipped marketplace reporting only.' },
          {
            title: 'Performance',
            text: 'Migrating the data slowed version 1 load times for hosts with large datasets.',
          },
          { title: 'Mobile', text: 'The MVP was desktop-only, because hosts work mainly on desktop.' },
        ],
        figure: 'One Platform dashboard and proposal builder',
      },
      {
        label: '04 · With 12 months instead of 3',
        heading: 'What comes next.',
        list: [
          { text: 'Group hosts by maturity and revenue band.' },
          { text: 'Predictive performance insights, and risk and opportunity scoring for event briefs.' },
          { text: 'Automated recommendations for improving listings.' },
          { text: 'AI-powered demand signals on the dashboard.' },
          { text: 'A supply-side North Star metric beyond churn, such as host lifetime value.' },
          { text: 'Consolidated reporting on a clean data layer.' },
        ],
      },
      {
        label: '05 · Reflections',
        heading: 'A fragmented platform is an alignment problem before it is a design problem.',
        body: [
          'Reactive growth had caused the fragmentation, and the fix was to reframe the product around clearer growth signals for hosts. Strong marketplaces run on structural clarity and features that improve workflows, not on shipping features faster.',
        ],
        diagram: true,
      },
    ],
  },

  treeassist: {
    id: 'treeassist',
    heroImage: {
      src: treeassistHero,
      alt: 'Five phones at an angle showing the TreeAssist onboarding in the Findmypast mobile site: a "Let\'s build your tree together" welcome screen with a Get started button, an "Add a mother" form, a success message about a maiden name added, and the family tree view.',
      width: 1800,
      height: 1111,
    },
    summary: {
      role: {
        text: 'Product Designer, working with the Lead Product Designer, a PM, data science and engineering for 2 months. I owned the UI and the experiment design for the three tests below, and the team lead guided strategy.',
      },
      decision: {
        text: 'I argued for interactive states in the desktop onboarding, instead of the view-only state engineers proposed to speed up development. Three tests then cut onboarding from 8 forms to 3 and moved users into AI-assisted tree building.',
      },
      outcome: {
        text: 'Free-trial starts rose 18%, trial-to-subscription conversion rose 8% and onboarding drop-off fell 13%. The starting point was 41% of new users leaving before they reached value. Measured with A/B tests in 2-week cycles and by monitoring engagement patterns.',
      },
    },
    kicker: 'Findmypast · Activation',
    subtitle:
      'Findmypast is a family history subscription. I redesigned onboarding so new users reached value sooner, using AI-powered relative suggestions to lift activation and free-trial conversion.',
    meta: [
      { label: 'Role', value: 'Product Designer, with the Lead Product Designer' },
      { label: 'Team', value: 'PM, data science and engineering' },
      { label: 'Stakeholders', value: 'New users, Head of Tree Product, Head of Product Experience' },
      { label: 'Timescale', value: '2 months, 2-week experiment cycles' },
    ],
    problem:
      '41% of new users left before they reached value. Onboarding was heavy on admin forms, and users then faced a blank family-tree canvas.',
    solution:
      'AI-assisted onboarding: relative suggestions inside the product and step-by-step guidance replaced a form-heavy setup.',
    impact: [
      { value: '+18%', label: 'Free-trial starts' },
      { value: '+8%', label: 'Trial-to-subscription conversion' },
      { value: '+26%', label: 'Users building trees with 10+ people' },
      { value: '-13%', label: 'Onboarding drop-off' },
    ],
    sections: [
      {
        plan: 'flow',
        label: '01 · The problem',
        heading: 'Value arrived too late.',
        body: [
          'The business goal was stronger early activation, to lift free-trial starts and subscriptions. The user goal was to reach something valuable before the admin wore them out.',
          'Hypothesis: replacing form-heavy onboarding with AI-assisted suggestions and guided building would lift activation, tree size and free-trial conversion.',
        ],
      },
      {
        label: '02 · Experiments',
        heading: 'Three experiments, two weeks each.',
        experiments: [
          {
            name: 'Experiment 1 · Reveal immediate value',
            intent: 'Show value straight after sign-up.',
            change: 'Used sign-up details to surface a likely birth record, for users with British or Irish ancestry.',
            result: '60% of users accepted the suggested task.',
            image: {
              src: treeassistExp1,
              alt: 'A phone showing the Findmypast mobile site. "These records match your details. Which one belongs to you?" sits above two civil birth records, the first for Alex Green with the mother\'s maiden name Smith highlighted, and the question "Is this your birth record?" with tick and cross buttons.',
              width: 670,
              height: 1200,
            },
          },
          {
            name: 'Experiment 2 · Guide the next action',
            intent: 'Reduce confusion after onboarding.',
            change: 'Suggested mothers and spouses on the tree canvas.',
            result: 'Hint engagement rose 32%, and trees grew more.',
            image: {
              src: treeassistExp2,
              alt: 'A phone showing the Findmypast family tree. A dotted orange box for a suggested mother, Smith, has the prompt "Is this Alex\'s mother?" with Reject and Accept buttons, above the highlighted Alex Green card, born 1983.',
              width: 670,
              height: 1200,
            },
          },
          {
            name: 'Experiment 3 · Interactive onboarding',
            intent: 'Reach the core product faster.',
            change:
              'Cut onboarding from 8 forms to 3, then moved users into AI-assisted tree building with suggested relatives.',
            result: 'Onboarding drop-off fell 13%, and activation rose.',
            image: {
              src: treeassistExp3,
              alt: 'A phone showing the Findmypast family tree after onboarding. Christopher Smith is marked Added, a suggested relative, Ingrid Green, has an Add button, and a banner reads "You\'ve added Christopher to your tree."',
              width: 670,
              height: 1200,
            },
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
            text: 'Fewer steps up front meant less profile data in the short term.',
          },
          {
            title: 'Record availability',
            text: 'Suggestions depended on historical record matches, so they worked best for British ancestry.',
          },
          {
            title: 'Advanced users',
            text: 'Experienced genealogists took longer to reach advanced search and editing.',
          },
        ],
      },
      {
        label: '04 · Descope dungeon',
        heading: 'Latency: Designing for a 2 to 30 second wait.',
        eyebrow: 'Descoped, not forgotten',
        eyebrowIcon: 'sword',
        body: [
          'Suggestions took between 2 and 30 seconds to appear. I proposed showing progressive, personalised content during the wait, such as newspaper headlines from the user’s birthday. It was descoped so the team could focus on core improvements and release speed.',
        ],
        figure: 'Wait-state concepts',
      },
      {
        label: '05 · Reflections',
        heading: 'Deliver value before asking for data.',
        body: [
          'Early value often beats perfect upfront data, and designing for momentum can unlock engagement and monetisation. Next step: a personalised task list on the tree canvas to guide users through their free trial.',
        ],
        image: {
          src: treeassistDesktop,
          alt: 'A laptop showing the Findmypast family tree on desktop. Suggested relatives wait to be added around the tree, and a "Let\'s keep building the Green family tree" checklist on the right offers three next steps: review suggested relatives, build your tree with hints, and start a 7-day free trial.',
          caption: 'Desktop layout - with next steps on canvas for user to engage with after onboarding.',
          width: 1800,
          height: 1142,
        },
      },
    ],
  },
}
