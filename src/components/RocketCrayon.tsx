// The blue crayon from the Selected work heading. On hover (or, on touch screens, when it scrolls into view)
// it turns into a rocket, blasts off and flies into Saturn. Drawn in the same flat blue marker style.
export function RocketCrayon() {
  return (
    <svg className="rk" viewBox="0 0 84 20" aria-hidden="true">
      {/* Saturn, up and to the right of the rocket, in space the icon box reserves so it never touches the heading text. */}
      <g className="rk__saturn">
        <g transform="translate(70 -5.6) rotate(-20)">
          <ellipse className="rk__ring" cx="0" cy="0" rx="9" ry="2.4" />
          <circle className="rk__planet" cx="0" cy="0" r="5.5" />
          <path className="rk__ring-front" d="M-5.4 1.9 Q0 2.9 5.4 1.9" />
        </g>
      </g>
      <circle className="rk__burst" cx="70" cy="-5.6" r="5.5" />

      <g transform="rotate(-18 22 10)">
        <g className="rk__crayon">
          <rect className="crayon__cap" x="3" y="5.5" width="5" height="9" rx="1.5" />
          <rect className="crayon__body" x="7" y="5" width="25" height="10" rx="1.2" />
          <path className="crayon__tip" d="M32 5 L40.5 9.2 Q41.4 10 40.5 10.8 L32 15 Z" />
          <path className="crayon__band" d="M11 5.5 v9 M28 5.5 v9" />
          <path className="crayon__zigzag" d="M14 10 l2 -2.2 l2 4.4 l2 -4.4 l2 4.4 l2 -4.4 l2 2.2" />
        </g>

        <g className="rk__rocket">
          <path className="rk__flame" d="M3 6.5 Q-9 10 3 13.5 Q0 10 3 6.5 Z" />
          <path className="rk__fin" d="M17 5 L9.5 -2 L8 5 Z M17 15 L9.5 22 L8 15 Z" />
          <rect className="crayon__cap" x="3" y="5.5" width="5" height="9" rx="1.5" />
          <rect className="crayon__body" x="7" y="5" width="25" height="10" rx="1.2" />
          <path className="crayon__tip" d="M32 5 L40.5 9.2 Q41.4 10 40.5 10.8 L32 15 Z" />
          <path className="crayon__band" d="M11 5.5 v9 M28 5.5 v9" />
          <circle className="rk__window" cx="20" cy="10" r="3.2" />
        </g>
      </g>
    </svg>
  )
}
