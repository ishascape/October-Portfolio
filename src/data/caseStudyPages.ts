// Case-study pages, rebuilt from the live ashnidave.com pages (read 14 Oct 2026).
// The CV is the source of truth (Ashni, 15 Oct 2026). Venue Finder match-rate claims are left out, and
// the CV's "-28% churn" belongs to the guest booking journeys work, so it is not shown on HostHQ.
import type { CaseStudyId } from './content'
import hosthqHero from '../assets/hosthq-hero.webp'
import hosthqFocusGroup from '../assets/hosthq-focus-group.webp'
import hosthqMvpScope from '../assets/hosthq-mvp-scope.webp'
import hosthqMvpDashboard from '../assets/hosthq-mvp-dashboard.webp'
import vfBriefLifecycle from '../assets/venue-finder-brief-lifecycle.webp'
import hosthqProposalAccepted from '../assets/hosthq-proposal-accepted.webp'
import hosthqFilterEvents from '../assets/hosthq-filter-events.webp'
import treeassistHero from '../assets/treeassist-hero.webp'
import treeassistExp1 from '../assets/treeassist-exp1.webp'
import treeassistExp2 from '../assets/treeassist-exp2.webp'
import treeassistWait from '../assets/treeassist-wait.webp'
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
  quotes?: { name: string; role: string; lines: string[]; dark?: boolean }[] // pull quotes from interviews, as cards
  quotesCaption?: string // hand-lettered line under the quote cards
  figure?: string // placeholder caption until real images arrive
  figures?: string[] // several placeholder frames, one per selected screen
  image?: { src: string; alt: string; caption: string; width: number; height: number; bordered?: boolean } // a real screenshot
  planImage?: { src: string; alt: string; width: number; height: number; bordered?: boolean; transparent?: boolean } // a full-width image under this section
  planImage3?: { src: string; alt: string; caption: string; width: number; height: number; bordered?: boolean } // a third, below the second
  planImage4?: { src: string; alt: string; width: number; height: number } // a fourth, below the third
  bookingStatus?: { caption: string } // the animated booking status widget, below the fourth image
  planImage2?: { src: string; alt: string; caption: string; width: number; height: number } // a second one, below it
  plan?: 'parti' | 'flow' // the existing/proposed drawing (parti) or the TreeAssist two-lane flow, shown under this section
}

export interface CaseStudyPage {
  id: CaseStudyId
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
    kicker: 'HeadBox · Demand side',
    subtitle:
      'HeadBox is a marketplace for event planners and venue hosts. As sole product designer, I redesigned how guests brief venues, so hosts got fewer, better-qualified enquiries.',
    meta: [
      { label: 'Role', value: 'Sole product designer' },
      { label: 'Team', value: '4 engineers' },
      { label: 'Timescale', value: '2 months, 2-week experiment cycles' },
      { label: 'Marketplace', value: 'Guests planning events (demand) · venue hosts (supply)' },
    ],
    problem:
      'The old model rewarded briefs (event requests) submitted, not intent to book. Hosts were flooded with unqualified briefs, Lead Feed churn hit 55% and the 13-step builder lost 83% of users. I advocated for judging Venue Finder on lead quality, not volume.',
    solution:
      'An AI-powered brief journey that recommends venues, plus Spotlight Partner, a sponsored-placement model. My first version cut Lead Feed volume by 40%, so we shipped a more moderate second.',
    impact: [
      { value: '+30%', label: 'Qualified inbound enquiries' },
      { value: '40%', label: 'Shorter journey than the 13-step builder' },
      { value: 'New', label: 'Sponsored-placement revenue' },
    ],
    sections: [
      {
        label: '01 · The systemic problem',
        heading: 'Optimised for the wrong metric.',
        body: [
          'Marketing measured briefs submitted, not bookings. Hosts often needed 27+ messages to close one booking.',
        ],
      },
      {
        label: '02 · Research',
        heading: 'Every brief hinged on one non-negotiable.',
        eyebrow: 'Interview insight',
        body: [
          'HeadBox had done no guest research in over four years, so I interviewed 10 event bookers. Every brief had one fixed requirement, and venues that missed it were rejected at once.',
          'Hypothesis: capturing intent and encouraging shortlisting before submission means fewer, more valuable briefs for hosts.',
        ],
        quotes: [
          {
            name: 'Stephanie',
            role: 'Corporate booker',
            lines: [
              'Once I found my venue, I ignored the rest of the emails. There were so many. I felt bad, but it was too much.',
              'If there’s no natural light and outdoor space, I don’t care. I won’t book the venue for my event even if everything else is fine.',
            ],
          },
          {
            name: 'Barney',
            role: 'Social booker',
            dark: true,
            lines: [
              'All of you - Tagvenue, HeadBox - you’re a nightmare. Too many emails. It’s just so much. I want a venue that allows me to bring my own catering, not to negotiate or be stuck with the set menu.',
              'All I need is one: a confirmation that it’s received, and then one to confirm the meeting. That’s it. Less is more.',
              'I have to read and delete every one just in case it’s important. That’s wasting my time.',
            ],
          },
        ],
        quotesCaption: 'Quotes from guest user interviews - 5 corporate bookers, 5 social bookers',
      },
      {
        label: '03 · The system',
        heading: 'How an event brief travels.',
        body: [
          'An LLM reads what the guest needs, ranks venues from a vectorised inventory and lets guests compare quotes. The brief then lands in the host’s Lead Feed, so one workflow serves both sides.',
        ],
        planImage3: {
          src: vfBriefLifecycle,
          alt: 'Diagram of the life-cycle of an event brief, from event brief to direct enquiry or lead, proposals to review and confirmed booking. It compares the Venue Finder experiment, the Host HQ MVP rolled out, the currently legacy guest home and Host HQ steps, and the legacy Brief builder and LeadFeed flow, with friction notes in red.',
          caption: 'Life-cycle of an event brief',
          width: 2048,
          height: 794,
        },
      },
      {
        label: '04 · Experiments',
        heading: 'A control, a first version that failed, and a second that shipped.',
        experiments: [
          {
            name: 'Control · Legacy brief builder',
            intent: 'The baseline.',
            change: 'The existing 13-step, preset-option builder.',
            result: '83% of users dropped off.',
          },
          {
            name: 'V1 · Disruptive',
            intent: 'Capture intent and show venues before a brief is submitted.',
            change:
              'AI prompt, venue recommendations before submission, required account creation, multi-venue selection.',
            result:
              'Lead Feed volume fell 40%. 38% dropped off at the AI input and 27% at account creation. Direct enquiries rose 26%; guests shortlisted 2.2 venues on average.',
            verdict: 'Failed, and taught us the most.',
          },
          {
            name: 'V2 · Moderate',
            intent: 'Keep the intent signal, remove the friction.',
            change:
              'Optional prompt, magic-link sign-up, recommendations only after sign-up (to deter scraping), faster load.',
            result:
              'Kept in regions with plenty of venues. Lead Feed covers sparse regions; high-value briefs outside active regions go to an account manager.',
            verdict: 'Shipped.',
          },
        ],
        figure: 'V1 and V2 flows',
      },
      {
        label: '05 · Selected screens',
        heading: 'Key moments in the journey.',
        body: ['Selected screens, with a note on what each key moment does for the guest.'],
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
            text: 'Rank venues by likelihood to convert, a shortlist-first flow for repeat users, an agent-assisted mode for new-city launches, and separate metrics for marketing volume and marketplace health.',
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
    kicker: 'HeadBox · Supply side',
    subtitle:
      'Venue hosts on HeadBox used four separate tools. As Senior Product Designer, I ran host focus groups, set the consolidation strategy and scoped the MVP for one platform where hosts see how they earn and act on it.',
    meta: [
      { label: 'Role', value: 'Senior Product Designer: design strategy, execution, IA and workflow redesign' },
      { label: 'Stakeholders', value: 'Platform clients, CEO, CTO, Head of Marketing, Head of Venue Sales' },
      { label: 'Timescale', value: '3 months, 0→1, discovery to full release' },
    ],
    problem:
      'Hosts’ platform was really four products (Lead Feed, PowerHost, HeadBox for Business, 3D Studio): confusing navigation, repeated workflows, inconsistent data, little cross-product use. We were shipping our org chart. I advocated for round-table research over a redesign driven by stakeholder opinion and support tickets.',
    solution:
      'One Platform: a single system organised around the jobs hosts do, positioned as a structured way to earn revenue. Research set the MVP scope and what comes next. We shipped structure over completeness and deferred 3D Studio migration, full reporting and mobile.',
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
          'In focus groups with different venue types, hosts wanted clear signals of growth and return, not more features.',
          'Making revenue clear became the goal and shaped the consolidation strategy.',
        ],
        image: {
          src: hosthqFocusGroup,
          alt: "An isometric drawing of a venue host's day in five moments: running the venue, managing clients, calls and enquiries, a quick HeadBox check where a new enquiry prompts doubts about whether it is genuine, available and will convert, and empty calendar slots to fill with confirmed bookings.",
          caption:
            'Learned about the venue hosts existing workflows and day to day activities outside HeadBox from focus group sessions',
          width: 1800,
          height: 1013,
          bordered: true,
        },
      },
      {
        label: '02 · Strategy',
        heading: 'From fixing usability to growing supply.',
        list: [
          { text: 'Replace scattered tools with one place to start.' },
          { text: 'Organise around host goals, not product lines.' },
          { text: 'Bring performance data into one clear return-on-investment story.' },
          { text: 'Build a modular base ready for automation, AI and integrations.' },
        ],
        planImage: {
          src: hosthqMvpScope,
          alt: 'The MVP scope: one events workflow in four stages. Leads (Unread, Declined) leads to Requests (All Requests, New Requests, Rejected requests), then Proposals (Sent proposals, Accepted, In Progress, Declined), then Bookings (Upcoming, Past, Cancelled). Unify all event types into one intuitive workflow, whether B2B, B2C, free or commissionable, using distinct event card styling to differentiate them without fragmenting the experience.',
          width: 1800,
          height: 703,
          bordered: true,
        },
        planImage2: {
          src: hosthqMvpDashboard,
          alt: 'The HostHQ Requests screen on a tablet: a list of event requests with budgets, dates and locations, Urgent and Commissionable event tags, and a Send Proposal button on each. The Your Events menu lists Requests, Proposals, Bookings and Leads.',
          caption: 'MVP Dashboard UI',
          width: 1536,
          height: 1024,
        },
      },
      {
        label: '03 · The MVP',
        heading: 'Tradeoff: A coherent system before surface polish.',
        body: [
          'With three months before peak season, I chose structure over completeness: unified navigation and IA, consolidated workflows, action-prompting dashboards and a stronger proposal builder as the main revenue lever.',
        ],
        list: [
          {
            title: '3D Studio',
            text: 'Legacy dependencies blocked full integration, so it was embedded in the proposal flow and migration deferred.',
          },
          { title: 'Reporting', text: 'Data needed cleaning first, so we shipped marketplace reporting only.' },
          {
            title: 'Performance',
            text: 'Migrating the data slowed v1 load times for hosts with large datasets.',
          },
          { title: 'Mobile', text: 'Desktop-only, as hosts work mainly on desktop.' },
        ],
        planImage3: {
          src: hosthqFilterEvents,
          alt: 'The HostHQ Leads screen with a Filter events panel open: preset filters such as Weekend events and Corporate parties, sort options, Show checkboxes and a budget field, with Reset filters and Apply filters buttons.',
          caption:
            'Filter events: tailored to what the venue is looking for, with notifications for events that match your venue space and availability.',
          width: 1440,
          height: 1024,
          bordered: true,
        },
        planImage4: {
          src: hosthqProposalAccepted,
          alt: 'The HostHQ proposal screen after a guest accepts: a "John accepted your proposal" banner with the guest\'s verified contact details and a Confirm Booking button, a booking status timeline, and the space and pricing details of the proposal below.',
          width: 1440,
          height: 1024,
        },
        bookingStatus: {
          caption:
            'Host pain point: Not knowing how much time has passed between communication, not knowing what next action is pending, especially when an event is being handled by multiple people',
        },
      },
      {
        label: '04 · With 12 months instead of 3',
        heading: 'What comes next.',
        list: [
          { text: 'Group hosts by maturity and revenue band.' },
          { text: 'Predictive insights, plus risk and opportunity scoring for event briefs.' },
          { text: 'Automated recommendations to improve listings.' },
          { text: 'AI demand signals on the dashboard.' },
          { text: 'A supply-side North Star beyond churn, such as host lifetime value.' },
          { text: 'Consolidated reporting on a clean data layer.' },
        ],
      },
      {
        label: '05 · Reflections',
        heading: 'A fragmented platform is an alignment problem before it is a design problem.',
        body: [
          'Reactive growth caused the fragmentation. The fix was reframing the product around clearer growth signals for hosts. Strong marketplaces run on structural clarity and workflow-improving features, not faster shipping.',
        ],
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
    kicker: 'Findmypast · Activation',
    subtitle:
      'Findmypast is a family history subscription. As Product Designer, I owned the UI and experiment design for three onboarding tests that got new users to value sooner with AI-powered relative suggestions.',
    meta: [
      { label: 'Role', value: 'Product Designer, with the Lead Product Designer' },
      { label: 'Team', value: 'PM, data science and engineering' },
      { label: 'Stakeholders', value: 'New users, Head of Tree Product, Head of Product Experience' },
      { label: 'Timescale', value: '2 months, 2-week experiment cycles' },
    ],
    problem:
      '41% of new users left before reaching value: onboarding was heavy on admin forms, then users faced a blank family-tree canvas.',
    solution:
      'AI-assisted onboarding: relative suggestions in the product and step-by-step guidance replaced a form-heavy setup. I advocated for interactive states in desktop onboarding, not the view-only state engineers proposed. Three tests cut onboarding from 8 forms to 3.',
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
          'Business goal: stronger early activation, to lift free-trial starts and subscriptions. User goal: reach something valuable before the admin wore them out.',
          'Hypothesis: AI-assisted suggestions and guided building, instead of form-heavy onboarding, would lift activation, tree size and free-trial conversion.',
        ],
      },
      {
        label: '02 · Experiments',
        heading: 'Three experiments, two weeks each.',
        experiments: [
          {
            name: 'Experiment 1 · Reveal immediate value',
            intent: 'Show value straight after sign-up.',
            change: 'Used sign-up details to surface a likely birth record (British or Irish ancestry).',
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
      },
      {
        label: '03 · Trade-offs',
        heading: 'Momentum over completeness.',
        list: [
          {
            title: 'Activation over data completeness',
            text: 'Fewer steps up front meant less profile data short term.',
          },
          {
            title: 'Record availability',
            text: 'Suggestions rely on historical record matches, so they work best for British ancestry.',
          },
          {
            title: 'Advanced users',
            text: 'Experienced genealogists reached advanced search and editing more slowly.',
          },
        ],
      },
      {
        label: '04 · Descope dungeon',
        heading: 'Latency: Designing for a 2 to 30 second wait.',
        eyebrow: 'Descoped, not forgotten',
        eyebrowIcon: 'sword',
        body: [
          'Suggestions took 2 to 30 seconds to appear. I proposed progressive, personalised content during the wait, such as headlines from the user’s birthday. It was descoped to focus on core improvements and release speed.',
        ],
        image: {
          src: treeassistWait,
          alt: 'Four phones showing the descoped wait-state concept. A progress bar reads "We\'re checking our records for information on your relatives" above a "Browse while you wait" carousel: tips to grow your family tree, newspaper headlines on your birthday, a "Did you know" fact with a historic photo, and a prompt to try Findmypast free for 7 days.',
          caption: 'Wait-state concepts',
          width: 1800,
          height: 894,
        },
      },
      {
        label: '05 · Reflections',
        heading: 'Deliver value before asking for data.',
        body: [
          'Early value often beats perfect upfront data, and designing for momentum can unlock engagement and monetisation. Next: a personalised task list on the tree canvas to guide the free trial.',
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
