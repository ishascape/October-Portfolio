import { DrawOnScroll } from './DrawOnScroll'
import { SketchRect } from './Sketch'
import './Parti.css'
import './DesignerSketch.css'

const P = { pathLength: 1 }
const at = (i: number) => ({ 'data-order': i })

// Ashni at her laptop, designing. The scene sketches itself in as it scrolls into view; once it
// is drawn, the screen keeps building a wireframe, the cursor moves between blocks and the typing
// hand taps (see DesignerSketch.css). Linework only, with one blue idea: what is being designed.
export function DesignerSketch() {
  return (
    <figure className="designer">
      <DrawOnScroll viewBox="0 46 460 250" className="designer__drawing">
        {/* Floor and desk */}
        <path {...P} {...at(0)} d="M14 285 H446" className="parti__fine" />
        <path {...P} {...at(1)} d="M150 206 H440 M170 206 V285 M424 206 V285" className="parti__heavy" />

        {/* Chair */}
        <path {...P} {...at(2)} d="M126 228 H208 M168 228 V285 M146 285 H190" className="parti__heavy" />
        <path {...P} {...at(2)} d="M130 226 C122 200 124 170 132 146" className="parti__fine" />

        {/* Legs */}
        <path {...P} {...at(3)} d="M160 216 H246 V236 H166 M246 236 V285 M246 285 H270" className="parti__heavy" />

        {/* Back, long hair and neck */}
        <path {...P} {...at(4)} d="M160 130 C150 164 152 196 158 218" className="parti__heavy" />
        <path {...P} {...at(4)} d="M180 130 C190 162 196 192 190 216" className="parti__heavy" />
        <path {...P} {...at(5)} d="M172 112 V130" className="parti__heavy" />
        <path {...P} {...at(5)} d="M162 66 C142 74 138 98 144 124 C148 144 142 160 150 176" className="parti__heavy" />
        <path {...P} {...at(5)} d="M156 76 C150 96 152 120 148 146" className="parti__fine" />

        {/* Head and face, in profile */}
        <circle {...P} {...at(6)} cx={172} cy={92} r={20} className="parti__heavy" />
        <path {...P} {...at(6)} d="M191 90 L196 98 H191" className="parti__fine" />
        <path {...P} {...at(6)} d="M184 105 Q188 108 192 105" className="parti__fine" />
        <circle cx={182} cy={90} r={1.6} className="parti__dot" />

        {/* Upper arm; the forearm and hand tap away on the keys */}
        <path {...P} {...at(7)} d="M176 138 L198 184" className="parti__heavy" />
        <g className="designer__typing">
          <path {...P} {...at(7)} d="M198 184 L244 198 M244 198 Q252 200 258 195" className="parti__heavy" />
        </g>

        {/* Mug and the laptop */}
        <path
          {...P}
          {...at(8)}
          d="M404 184 V206 H424 V184 Z M424 190 Q434 192 432 200 Q430 204 424 202"
          className="parti__heavy"
        />
        <path {...P} {...at(8)} d="M410 174 Q406 166 411 160 M418 174 Q414 166 419 160" className="parti__fine" />
        <SketchRect {...P} {...at(9)} x={256} y={92} width={134} height={92} o={3} className="parti__heavy" />
        <path {...P} {...at(9)} d="M242 190 H404 L394 206 H252 Z" className="parti__heavy" />

        {/* The screen: a wireframe that keeps building itself */}
        <g className="designer__screen">
          <rect
            x={264}
            y={100}
            width={118}
            height={10}
            className="parti__fine designer__block"
            style={{ animationDelay: '0s' }}
          />
          <rect
            x={264}
            y={116}
            width={30}
            height={60}
            className="parti__fine designer__block"
            style={{ animationDelay: '0.5s' }}
          />
          <rect
            x={300}
            y={116}
            width={36}
            height={26}
            className="parti__key designer__block"
            style={{ animationDelay: '1s' }}
          />
          <rect
            x={342}
            y={116}
            width={40}
            height={26}
            className="parti__fine designer__block"
            style={{ animationDelay: '1.5s' }}
          />
          <rect
            x={300}
            y={148}
            width={82}
            height={28}
            className="parti__fine designer__block"
            style={{ animationDelay: '2s' }}
          />
        </g>
        <g className="draw-late">
          <g className="designer__cursor">
            <path d="M314 130 V146 L318 142 L321 149 L324 148 L321 141 H327 Z" className="parti__key-fill" />
          </g>
        </g>
      </DrawOnScroll>
      <figcaption className="annotation">Ashni, designing.</figcaption>
    </figure>
  )
}
