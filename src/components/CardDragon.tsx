// Three adult dragons that live on the case study cards: one nibbles a bite out of a corner, one peeks over an edge,
// one flies across a corner. Slender and elegant: long snout, swept-back horns, almond eyes, scalloped wings.
// Decorative only (aria-hidden, no pointer events). Light mode is line art, dark mode solid blue (see Work.css).
export type DragonKind = 'bite' | 'peek' | 'fly'

/* ---------- shared parts. The head is drawn in profile, facing left, around (0, 0) ---------- */

function Head({ open = false }: { open?: boolean }) {
  return (
    <>
      {/* swept-back horns and a small crest */}
      <path className="d-horn" d="M8 -9 C18 -20 32 -23 46 -17 C34 -15 24 -10 16 -3 Z" />
      <path className="d-horn" d="M-1 -10 C6 -22 17 -29 29 -30 C21 -25 15 -18 12 -8 Z" />
      {/* skull and long snout */}
      <path
        className="d-body"
        d="M-40 3 C-36 -4 -24 -9 -10 -10 C4 -11 14 -6 20 2 L24 11 C14 14 4 16 -8 16 C-20 16 -32 12 -40 7 Z"
      />
      {/* jaw: drops open when it is eating */}
      {open ? (
        <path className="d-body" d="M-38 9 C-26 13 -12 20 6 22 C-4 24 -22 22 -36 14 Z" />
      ) : null}
      <path className="d-line" d={open ? 'M-39 6 C-26 8 -12 9 -2 10' : 'M-39 7 C-26 11 -10 13 4 12'} />
      <path className="d-line" d="M-26 -5 C-22 -8 -16 -9 -11 -9" />
      <path className="d-eye" d="M-14 -3 Q-7 -9 0 -3 Q-7 0 -14 -3 Z" />
      <circle className="d-nostril" cx="-34" cy="1.6" r="1.3" />
      {/* cheek fin */}
      <path className="d-fin" d="M12 8 L26 12 L14 14 L22 20 L8 16 Z" />
    </>
  )
}

/* An elegant bat wing for the right side, root at (0, 0). Mirror with scale(-1 1). */
function Wing({ far = false }: { far?: boolean }) {
  return (
    <g className={far ? 'd-wing d-wing--far' : 'd-wing'}>
      <path d="M0 0 C8 -30 34 -54 74 -60 C66 -50 70 -42 58 -34 C58 -26 48 -24 44 -16 C41 -9 32 -7 27 0 Z" />
      <path className="d-vein" d="M0 0 L72 -58 M0 0 L58 -34 M0 0 L44 -16" />
    </g>
  )
}

function Spines({ points }: { points: [number, number, number][] }) {
  return (
    <>
      {points.map(([x, y, r], i) => (
        <path key={i} className="d-fin" d={`M${x} ${y} L${x + 7} ${y - 8} L${x + 9} ${y + 3} Z`} transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </>
  )
}

/* ---------- the three dragons ---------- */

function Bite() {
  return (
    <svg className="dragon dragon--bite dragon__art dragon__art--mint" viewBox="-50 -42 140 140" aria-hidden="true">
      <g transform="translate(18 40) rotate(14) scale(0.8)">
        <Wing far />
      </g>
      <g transform="translate(20 38) rotate(-4)">
        <Wing />
      </g>
      {/* long tail, curling out to a spade tip */}
      <path className="d-tail" d="M28 78 C60 92 84 74 70 56 C66 52 74 46 82 50" />
      {/* neck and body */}
      <path className="d-body" d="M2 12 C-8 28 2 40 -2 54 C-4 70 12 82 30 78 C40 66 36 48 26 36 C20 26 22 16 16 8 Z" />
      <Spines points={[[18, 14, 10], [24, 28, 30], [30, 42, 50]]} />
      <path className="d-belly" d="M-2 56 C0 68 10 76 22 76" />
      <g className="dragon__chew">
        <Head open />
      </g>
      {/* a nibbled chunk of card at its jaws, and crumbs */}
      <path className="d-crumb" d="M-42 12 l9 -3 l3 8 l-9 3 Z" />
      <path className="d-crumb" d="M-36 34 l5 -1 l1 5 l-5 1 Z" />
      <path className="d-crumb" d="M-24 48 l4 -1 l1 4 l-4 1 Z" />
    </svg>
  )
}

function Peek() {
  return (
    <svg className="dragon dragon--peek dragon__art dragon__art--sky" viewBox="-50 -40 110 84" aria-hidden="true">
      {/* wing tips folded up behind the head */}
      <g transform="translate(26 40) rotate(-6) scale(0.55)">
        <Wing far />
      </g>
      <g transform="translate(30 40) rotate(12) scale(0.7)">
        <Wing />
      </g>
      <path className="d-body" d="M6 10 C2 22 8 32 4 44 L40 44 C36 30 40 20 26 10 Z" />
      <Head />
      {/* claws hooked over the edge */}
      <path className="d-fin" d="M-18 40 l-3 -9 l7 3 l2 -7 l4 8 Z" />
      <path className="d-fin" d="M-2 40 l-3 -9 l7 3 l2 -7 l4 8 Z" />
    </svg>
  )
}

/* The flyer is a Japanese dragon (ryu): wingless, long and serpentine, with whiskers, a mane and a pearl. */
function Fly() {
  const neck = 'M14 6 C40 -14 58 28 86 14'
  const tail = 'M86 14 C108 3 120 30 146 20 C158 16 164 24 170 32'
  return (
    <svg className="dragon dragon--fly dragon__art dragon__art--lilac" viewBox="-70 -48 250 110" aria-hidden="true">
      <g className="dragon__bob">
        <path className="d-ribbon" d={neck} />
        <path className="d-ribbon d-ribbon--thin" d={tail} />
        <path className="d-ribbon-in" d={neck} />
        <path className="d-ribbon-in d-ribbon-in--thin" d={tail} />
        {/* mane down the back */}
        <Spines points={[[22, -2, -20], [34, -8, -10], [46, -4, 10], [60, 6, 20], [74, 10, 6]]} />
        {/* two small clawed legs */}
        <path className="d-tail" d="M44 14 l-5 12 l-5 2 M62 20 l-4 12 l-5 2" />
        <Head />
        {/* long whiskers and the pearl */}
        <path className="d-whisker" d="M-38 4 C-52 8 -56 20 -66 22 M-36 6 C-46 16 -48 28 -58 32" />
        <circle className="d-crumb" cx="-54" cy="-10" r="5" />
      </g>
    </svg>
  )
}

export function CardDragon({ kind }: { kind: DragonKind }) {
  if (kind === 'bite') return <Bite />
  if (kind === 'peek') return <Peek />
  return <Fly />
}
