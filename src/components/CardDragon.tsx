// Three hand-sketched baby dragons that live on the case study cards: one takes a bite out of a corner, one peeks
// over an edge, one flies across a corner. Decorative only (aria-hidden, no pointer events). Colours are fixed per
// dragon; outlines use --ink so they read in light and dark. Each dragon has its own wobble filter for the pencil feel.
export type DragonKind = 'bite' | 'peek' | 'fly'

function Wobble({ id }: { id: string }) {
  return (
    <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
    </filter>
  )
}

function Bite() {
  return (
    <svg className="dragon dragon--bite" viewBox="0 0 140 116" aria-hidden="true" focusable="false">
      <defs>
        <Wobble id="dragon-wobble-bite" />
      </defs>
      <g filter="url(#dragon-wobble-bite)" className="dragon__art dragon__art--blue">
        {/* big wing, body and curling tail behind the head */}
        <path className="d-wing" d="M104 36 L82 6 L98 16 L102 -2 L118 24 L124 14 L120 40 Z" />
        <path className="d-tail" d="M122 56 C140 60 142 78 128 74" />
        <ellipse className="d-body" cx="112" cy="48" rx="20" ry="14" transform="rotate(-40 112 48)" />
        <ellipse className="d-belly" cx="107" cy="56" rx="9" ry="6" transform="rotate(-40 107 56)" />
        <path className="d-spikes" d="M121 34 l5 -6 l1 8 M127 42 l6 -3 l-3 8" />
        {/* neck, then the head: skull, snout (upper jaw) and a dropped lower jaw around the crumb */}
        <path className="d-body" d="M96 64 C99 56 103 54 107 52 L101 68 Z" />
        <g className="dragon__chew">
          <ellipse className="d-body" cx="88" cy="72" rx="17" ry="14" transform="rotate(-25 88 72)" />
          <path className="d-horn" d="M92 58 C92 50 96 46 100 44 C100 51 98 56 98 60 Z M99 64 C103 58 108 56 112 56 C109 62 105 66 100 68 Z" />
          <ellipse className="d-body" cx="76" cy="80" rx="12" ry="8" transform="rotate(38 76 80)" />
          <ellipse className="d-mouth" cx="75" cy="88" rx="9" ry="4.5" transform="rotate(30 75 88)" />
          <ellipse className="d-body" cx="72" cy="93" rx="9" ry="5" transform="rotate(30 72 93)" />
          <path className="d-crumb" d="M66 88 l8 -3 l4 6 l-7 4 Z" />
          <circle className="d-eye" cx="70" cy="76" r="1.3" />
          <circle className="d-white" cx="90" cy="68" r="5" />
          <circle className="d-eye" cx="91" cy="69" r="2.6" />
          <circle className="d-cheek" cx="84" cy="80" r="3.4" />
          <path className="d-line" d="M84 61 Q91 58 96 63" />
        </g>
        {/* crumbs falling onto the card */}
        <path className="d-crumb" d="M72 104 l4 -1 l1 4 l-4 1 Z" />
        <path className="d-crumb" d="M86 108 l3 -1 l1 3 l-3 1 Z" />
      </g>
    </svg>
  )
}

function Peek() {
  return (
    <svg className="dragon dragon--peek" viewBox="0 0 110 66" aria-hidden="true" focusable="false">
      <defs>
        <Wobble id="dragon-wobble-peek" />
      </defs>
      <g filter="url(#dragon-wobble-peek)" className="dragon__art dragon__art--coral">
        {/* ear fins, long horns, a wide head with a blunt muzzle */}
        <path className="d-wing" d="M30 34 L14 26 L21 36 L11 42 L22 46 L30 48 Z M80 34 L96 26 L89 36 L99 42 L88 46 L80 48 Z" />
        <path className="d-horn" d="M38 20 C32 12 30 6 25 1 C36 4 43 9 47 16 Z M72 20 C78 12 80 6 85 1 C74 4 67 9 63 16 Z" />
        <path className="d-body" d="M29 36 C29 12 81 12 81 36 C81 47 74 55 67 58 L43 58 C36 55 29 47 29 36 Z" />
        <path className="d-spikes" d="M50 15 l5 -8 l5 8" />
        <ellipse className="d-belly" cx="55" cy="50" rx="13" ry="7" />
        <circle className="d-white" cx="43" cy="33" r="6" />
        <circle className="d-white" cx="67" cy="33" r="6" />
        <circle className="d-eye dragon__look" cx="45" cy="34" r="3" />
        <circle className="d-eye dragon__look" cx="69" cy="34" r="3" />
        <path className="d-line" d="M36 25 Q43 21 49 26 M61 26 Q67 21 74 25" />
        <circle className="d-eye" cx="50" cy="50" r="1.2" />
        <circle className="d-eye" cx="60" cy="50" r="1.2" />
        <path className="d-line" d="M48 54 Q55 59 62 54" />
        <path className="d-horn" d="M51 55 l2 4 l2 -3 M57 55 l2 3 l1 -3" />
        <circle className="d-cheek" cx="35" cy="45" r="3.4" />
        <circle className="d-cheek" cx="75" cy="45" r="3.4" />
        {/* paws gripping the edge */}
        <ellipse className="d-body" cx="30" cy="62" rx="10" ry="6" />
        <ellipse className="d-body" cx="80" cy="62" rx="10" ry="6" />
        <path className="d-line" d="M25 66 v3 M30 67 v3 M35 66 v3 M75 66 v3 M80 67 v3 M85 66 v3" />
      </g>
    </svg>
  )
}

function Fly() {
  return (
    <svg className="dragon dragon--fly" viewBox="0 0 150 100" aria-hidden="true" focusable="false">
      <defs>
        <Wobble id="dragon-wobble-fly" />
      </defs>
      <g filter="url(#dragon-wobble-fly)" className="dragon__art dragon__art--gold">
        <path className="d-trail" d="M8 92 C14 84 18 88 24 80 M2 80 C6 74 10 78 14 72" />
        <g className="dragon__flap">
          <path className="d-wing d-wing--far" d="M84 44 C80 22 92 10 104 6 C100 16 104 24 100 34 Z" />
          <path
            className="d-wing"
            d="M70 46 C58 22 40 16 28 8 C36 24 30 32 42 40 C46 34 54 38 60 40 C58 44 64 46 70 46 Z"
          />
        </g>
        <path className="d-tail" d="M54 62 C42 72 36 66 26 76 C22 80 18 76 20 72 L26 72" />
        <ellipse className="d-body" cx="72" cy="54" rx="22" ry="14" transform="rotate(-14 72 54)" />
        <ellipse className="d-belly" cx="76" cy="60" rx="11" ry="6" transform="rotate(-14 76 60)" />
        <path className="d-spikes" d="M56 46 l-4 -6 l8 1 M66 42 l-2 -7 l7 3" />
        <path className="d-line" d="M82 68 l-2 8 M90 64 l2 8" />
        <circle className="d-body" cx="96" cy="42" r="12" />
        <ellipse className="d-body" cx="107" cy="46" rx="8" ry="6" transform="rotate(10 107 46)" />
        <path className="d-horn" d="M90 33 L88 24 L96 31 Z M99 31 L102 23 L104 33 Z" />
        <circle className="d-eye" cx="99" cy="40" r="2.6" />
        <circle className="d-glint" cx="100" cy="39" r="0.9" />
        <circle className="d-cheek" cx="95" cy="48" r="3" />
        <path className="d-line" d="M105 49 Q109 51 112 48" />
      </g>
    </svg>
  )
}

export function CardDragon({ kind }: { kind: DragonKind }) {
  if (kind === 'bite') return <Bite />
  if (kind === 'peek') return <Peek />
  return <Fly />
}
