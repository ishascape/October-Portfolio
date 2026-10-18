import portrait from '../assets/ashni-portrait.webp'
import portraitSketch from '../assets/ashni-portrait-sketch.webp'
import { revealAt, revealEnd } from './reveal'

// The hero portrait. On hover a 40px circle of the line drawing follows the pointer.
export function HeroPuzzle() {
  return (
    <div className="hero__puzzle hero__puzzle--single">
      <div className="hero__piece hero__piece--face" onPointerMove={revealAt} onPointerLeave={revealEnd}>
        <img
          className="hero__piece-photo"
          src={portrait}
          alt="Ashni Dave smiling, with long dark hair, in a blue denim top, standing in a garden."
          width={960}
          height={1200}
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__piece-sketch" aria-hidden="true">
          <img className="hero__piece-photo" src={portraitSketch} alt="" width={960} height={1200} />
        </div>
      </div>
    </div>
  )
}
