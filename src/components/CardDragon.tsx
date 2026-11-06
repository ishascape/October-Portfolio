// Three chubby kawaii baby dragons that live on the case study cards: one nibbles a bite out of a corner, one peeks
// over an edge, one flies across a corner. Decorative only (aria-hidden, no pointer events). Each dragon has its own
// pastel (set in Work.css as --d, --dl, --db, --ds), so they read in light and dark.
export type DragonKind = 'bite' | 'peek' | 'fly'

/* ---------- shared parts, drawn around (0, 0) = the middle of the head ---------- */

function Horns() {
  return (
    <>
      <path className="d-horn" d="M-15 -22 C-20 -34 -14 -44 -9 -47 C-6 -39 -4 -31 -5 -24 Z" />
      <path className="d-horn" d="M15 -22 C20 -34 14 -44 9 -47 C6 -39 4 -31 5 -24 Z" />
      <path className="d-tuft" d="M-4 -26 C-3 -35 4 -37 8 -32" />
    </>
  )
}

function Ears() {
  return (
    <>
      <path className="d-body" d="M-24 -12 L-45 -24 L-38 0 Z" />
      <path className="d-ear" d="M-27 -10 L-39 -18 L-35 -3 Z" />
      <path className="d-body" d="M24 -12 L45 -24 L38 0 Z" />
      <path className="d-ear" d="M27 -10 L39 -18 L35 -3 Z" />
    </>
  )
}

/* The face: big glossy eyes, little snout, rosy cheeks, and an open smile (or a closed one). */
function Face({ open = true }: { open?: boolean }) {
  return (
    <>
      <ellipse className="d-eye" cx="-13" cy="-2" rx="5.6" ry="6.6" />
      <ellipse className="d-eye" cx="13" cy="-2" rx="5.6" ry="6.6" />
      <circle className="d-glint" cx="-11" cy="-4.6" r="2.2" />
      <circle className="d-glint" cx="15" cy="-4.6" r="2.2" />
      <circle className="d-glint" cx="-14.6" cy="1" r="1" />
      <circle className="d-glint" cx="11.4" cy="1" r="1" />
      <circle className="d-cheek" cx="-23" cy="9" r="6" />
      <circle className="d-cheek" cx="23" cy="9" r="6" />
      <ellipse className="d-snout" cx="0" cy="10" rx="10" ry="6.5" />
      <circle className="d-nostril" cx="-3.4" cy="8.6" r="1.1" />
      <circle className="d-nostril" cx="3.4" cy="8.6" r="1.1" />
      {open ? (
        <>
          <path className="d-mouth" d="M-6 14.5 Q0 24 6 14.5 Z" />
          <ellipse className="d-tongue" cx="0" cy="19.6" rx="3" ry="1.8" />
        </>
      ) : (
        <path className="d-line" d="M-5 15 Q0 19 5 15" />
      )}
    </>
  )
}

/* Little jaw fins and a head crest, the bits that say dragon and not pig. */
function Fins() {
  return (
    <>
      <path className="d-fin" d="M-29 8 L-40 4 L-35 12 L-41 15 L-30 18 Z" />
      <path className="d-fin" d="M29 8 L40 4 L35 12 L41 15 L30 18 Z" />
      <path className="d-fin" d="M-7 -26 L-3 -33 L0 -27 L4 -34 L7 -26 Z" />
    </>
  )
}

function Head({ open = true }: { open?: boolean }) {
  return (
    <>
      <Ears />
      <Horns />
      <Fins />
      <ellipse className="d-body" cx="0" cy="0" rx="31" ry="27" />
      <Face open={open} />
    </>
  )
}

/* A bat wing, drawn for the right side; mirror it with scale(-1 1). */
function Wing({ far = false }: { far?: boolean }) {
  return (
    <g className={far ? 'd-wing d-wing--far' : 'd-wing'}>
      <path d="M14 36 C32 14 52 20 62 6 C60 20 66 28 56 36 C55 31 47 33 45 40 C42 35 34 38 30 46 Z" />
      <path className="d-vein" d="M14 36 L58 12 M16 38 L52 30 M18 40 L40 40" />
    </g>
  )
}

function Belly() {
  return (
    <>
      <ellipse className="d-belly" cx="0" cy="53" rx="14" ry="18" />
      <path className="d-line" d="M-10 46 Q0 50 10 46 M-11 54 Q0 58 11 54 M-9 62 Q0 66 9 62" />
    </>
  )
}

function Toes({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <circle className="d-toe" cx={cx - 5} cy={cy} r="1.7" />
      <circle className="d-toe" cx={cx} cy={cy + 2} r="1.7" />
      <circle className="d-toe" cx={cx + 5} cy={cy} r="1.7" />
    </>
  )
}

function Seated() {
  return (
    <>
      <path className="d-tail" d="M18 66 C38 72 46 54 38 50" />
      <ellipse className="d-body" cx="0" cy="50" rx="23" ry="25" />
      <Belly />
      <ellipse className="d-body" cx="-14" cy="72" rx="11" ry="7" />
      <ellipse className="d-body" cx="14" cy="72" rx="11" ry="7" />
      <Toes cx={-14} cy={73} />
      <Toes cx={14} cy={73} />
      <g className="dragon__chew">
        <Head open />
      </g>
    </>
  )
}

/* ---------- the three dragons ---------- */

function Bite() {
  return (
    <svg className="dragon dragon--bite dragon__art dragon__art--mint" viewBox="-64 -52 128 132" aria-hidden="true">
      <g transform="scale(-1 1)">
        <Wing far />
      </g>
      <Wing />
      <Seated />
      {/* both paws hold a nibbled chunk of card up to its mouth */}
      <path className="d-crumb" d="M-24 22 l16 -6 l6 12 l-13 8 Z" />
      <ellipse className="d-body" cx="-26" cy="32" rx="6" ry="5" />
      <ellipse className="d-body" cx="-8" cy="30" rx="6" ry="5" />
      <path className="d-crumb" d="M-34 54 l5 -1 l1 5 l-5 1 Z" />
      <path className="d-crumb" d="M-4 62 l4 -1 l1 4 l-4 1 Z" />
    </svg>
  )
}

function Peek() {
  return (
    <svg className="dragon dragon--peek dragon__art dragon__art--sky" viewBox="-56 -52 112 96" aria-hidden="true">
      {/* small wings folded behind the head */}
      <g transform="translate(2 -6) scale(0.72)">
        <Wing far />
      </g>
      <g transform="translate(-2 -6) scale(-0.72 0.72)">
        <Wing far />
      </g>
      <Head open={false} />
      {/* paws gripping the edge */}
      <ellipse className="d-body" cx="-22" cy="36" rx="11" ry="7" />
      <ellipse className="d-body" cx="22" cy="36" rx="11" ry="7" />
      <Toes cx={-22} cy={37} />
      <Toes cx={22} cy={37} />
    </svg>
  )
}

function Fly() {
  return (
    <svg className="dragon dragon--fly dragon__art dragon__art--lilac" viewBox="-70 -58 140 136" aria-hidden="true">
      <path className="d-trail" d="M-62 70 C-56 62 -52 66 -46 58 M-68 58 C-64 52 -60 56 -56 50" />
      <g className="dragon__bob" transform="rotate(-10 0 40)">
        <g className="dragon__flap dragon__flap--far">
          <g transform="scale(-1 1)">
            <Wing far />
          </g>
        </g>
        <g className="dragon__flap">
          <Wing />
        </g>
        <path className="d-tail" d="M-14 64 C-36 72 -44 56 -36 50" />
        <ellipse className="d-body" cx="0" cy="50" rx="23" ry="25" />
        <Belly />
        <ellipse className="d-body" cx="-12" cy="72" rx="8" ry="6" />
        <ellipse className="d-body" cx="12" cy="72" rx="8" ry="6" />
        <Head open />
      </g>
    </svg>
  )
}

export function CardDragon({ kind }: { kind: DragonKind }) {
  if (kind === 'bite') return <Bite />
  if (kind === 'peek') return <Peek />
  return <Fly />
}
