import { useEffect, useRef, useState, type ReactNode } from 'react'
import logo from '../assets/vfh-logo.webp'
import mapRadius from '../assets/vfh-map-radius.webp'
import mapResults from '../assets/vfh-map-results.webp'
import junsei from '../assets/vfh-junsei.webp'
import radisson from '../assets/vfh-radisson.webp'
import caia from '../assets/vfh-caia.webp'
import './VenueHeroPrototype.css'

// An auto-playing walk through the Venue Finder flow on a phone, for the top of the case study. The UI is
// rebuilt from Ashni's six HeadBox screens (the logo, map and venue photos are cropped from those screens).
// Autoplay only, and only while on screen. Reduced motion shows the first screen, still.

const W = 393 // the phone's CSS width the screens are drawn at
const H = 820
const PROMPT = "I'm looking for a senior leadership private dining venue for 7 people, we need vegan options and a private room."
const CANCEL = Symbol('cancel')

type Screen = 'landing' | 'prompt' | 'details' | 'contact' | 'results' | 'success'
type Venue = 'interested' | 'passed' | null

const Arrow = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
  </svg>
)
const Back = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M13 8H4M7.5 4.5 4 8l3.5 3.5" />
  </svg>
)
const Sparkle = () => (
  <svg className="vhp__sparkle" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M10 3l1.8 5.2L17 10l-5.2 1.8L10 17l-1.8-5.2L3 10l5.2-1.8zM18 14l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z" />
  </svg>
)

function Header() {
  return (
    <header className="vhp__bar">
      <img src={logo} alt="HeadBox" width={168} height={42} />
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h18M3 12h18M3 18h18" />
      </svg>
    </header>
  )
}

function Footer({ children }: { children: ReactNode }) {
  return <footer className="vhp__foot">{children}</footer>
}

function Radio({ on, children, t }: { on: boolean; children: ReactNode; t?: string }) {
  return (
    <span className="vhp__radio" data-on={on} data-t={t}>
      <i />
      {children}
    </span>
  )
}

function Check({ on, children, t }: { on: boolean; children: ReactNode; t?: string }) {
  return (
    <span className="vhp__check" data-on={on} data-t={t}>
      <i>
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2 6.5 5 9.5 10 3" />
        </svg>
      </i>
      {children}
    </span>
  )
}

export function VenueHeroPrototype() {
  const root = useRef<HTMLDivElement>(null)
  const ui = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const scaleRef = useRef(1)
  scaleRef.current = scale
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  const [screen, setScreen] = useState<Screen>('landing')
  const [location, setLocation] = useState('Shoreditch, London, UK')
  const [kind, setKind] = useState<'corporate' | 'personal' | null>('corporate')
  const [prompt, setPrompt] = useState('')
  const [eventName, setEventName] = useState('')
  const [occasion, setOccasion] = useState('Party')
  const [attendees, setAttendees] = useState('40')
  const [date, setDate] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [soon, setSoon] = useState(0)
  const [contact, setContact] = useState(['Johan', 'Sundwall', 'XYZ Partners', 'johan@xyz.com', '+4412345678'])
  const [terms, setTerms] = useState(true)
  const [offers, setOffers] = useState(true)
  const [venues, setVenues] = useState<Venue[]>([null, null, null])
  const [cursor, setCursor] = useState({ x: 200, y: 520, show: false, down: false })
  const [focus, setFocus] = useState<string | null>(null)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Fit the 393px-wide phone into whatever width it is given.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const fit = () => setScale(el.clientWidth / (W + 24))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !visible) return
    let live = true
    const wait = (ms: number) =>
      new Promise<void>((res, rej) =>
        setTimeout(() => (live ? res() : rej(CANCEL)), ms),
      )
    const s = () => scaleRef.current

    const target = (sel: string) => ui.current!.querySelector<HTMLElement>(`[data-t="${sel}"]`)!
    const scroller = (el: HTMLElement) => el.closest<HTMLElement>('.vhp__scroll')

    async function scrollTo(box: HTMLElement, top: number, ms = 700) {
      const start = box.scrollTop
      const t0 = performance.now()
      await new Promise<void>((res, rej) => {
        const tick = (now: number) => {
          if (!live) return rej(CANCEL)
          const p = Math.min(1, (now - t0) / ms)
          const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
          box.scrollTop = start + (top - start) * e
          p < 1 ? requestAnimationFrame(tick) : res()
        }
        requestAnimationFrame(tick)
      })
    }

    // Bring an element to roughly the middle of its screen, then glide the pointer onto it.
    async function point(sel: string, down = true) {
      const el = target(sel)
      const box = scroller(el)
      if (box) {
        const er = el.getBoundingClientRect()
        const br = box.getBoundingClientRect()
        const want = (er.top - br.top) / s() - (br.height / s()) * 0.42
        if (Math.abs(want) > 60) await scrollTo(box, Math.max(0, box.scrollTop + want), 650)
      }
      const u = ui.current!.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      setCursor({ x: (r.left + r.width / 2 - u.left) / s(), y: (r.top + r.height / 2 - u.top) / s(), show: true, down: false })
      await wait(560)
      if (down) {
        setCursor((c) => ({ ...c, down: true }))
        await wait(140)
        setCursor((c) => ({ ...c, down: false }))
        await wait(120)
      }
    }

    async function type(set: (v: string) => void, text: string, per = 34) {
      for (let i = 1; i <= text.length; i++) {
        set(text.slice(0, i))
        await wait(per)
      }
    }

    async function run() {
      while (live) {
        // Reset
        setScreen('landing')
        setLocation('')
        setKind(null)
        setPrompt('')
        setEventName('')
        setOccasion('Party')
        setAttendees('')
        setDate('')
        setFrom('')
        setTo('')
        setSoon(0)
        setContact(['', '', '', '', ''])
        setTerms(false)
        setOffers(false)
        setVenues([null, null, null])
        setFocus(null)
        setCursor({ x: 200, y: 520, show: false, down: false })
        await wait(900)

        // Landing: scroll the page, then fill in the card.
        setCursor((c) => ({ ...c, show: true }))
        const land = target('landing-scroll')
        await scrollTo(land, 520, 1100)
        await wait(250)
        await scrollTo(land, 0, 800)
        await point('location')
        setFocus('location')
        await type(setLocation, 'Shoreditch, London, UK', 38)
        setFocus(null)
        await wait(250)
        await point('corporate')
        setKind('corporate')
        await wait(350)
        await point('start')
        await wait(150)

        // Prompt
        setScreen('prompt')
        await wait(900)
        await point('prompt-box')
        setFocus('prompt')
        await type(setPrompt, PROMPT, 30)
        setFocus(null)
        await wait(450)
        await point('next')
        setScreen('details')
        await wait(800)

        // A few quick essentials
        await point('name')
        setFocus('name')
        await type(setEventName, 'Leadership dinner', 24)
        setFocus(null)
        await point('private-dining')
        setOccasion('Private Dining')
        await point('attendees')
        setFocus('attendees')
        await type(setAttendees, '7', 60)
        setFocus(null)
        await point('date')
        setFocus('date')
        await type(setDate, '20 Nov 2026', 22)
        setFocus(null)
        await point('from')
        setFrom('19:00')
        await wait(120)
        await point('to')
        setTo('22:00')
        await point('soon-weeks')
        setSoon(1)
        await wait(250)
        await point('next')
        setScreen('contact')
        await wait(800)

        // Contact details, all in one go.
        setCursor((c) => ({ ...c, show: false }))
        const fields = ['Johan', 'Sundwall', 'XYZ Partners', 'johan@xyz.com', '+4412345678']
        await Promise.all(
          fields.map((f, i) =>
            (async () => {
              for (let k = 1; k <= f.length; k++) {
                setContact((c) => c.map((v, j) => (j === i ? f.slice(0, k) : v)))
                await wait(26)
              }
            })(),
          ),
        )
        await wait(150)
        setTerms(true)
        setOffers(true)
        await wait(600)
        await point('next')
        setScreen('results')
        await wait(1500)

        // Results: scroll down to the last card, then react.
        const res = target('results-scroll')
        await scrollTo(res, 520, 1100)
        await wait(250)
        await point('v0-yes')
        setVenues((v) => [('interested' as Venue), v[1], v[2]])
        await wait(300)
        await point('v1-no')
        setVenues((v) => [v[0], 'passed', v[2]])
        await wait(300)
        await scrollTo(res, 980, 900)
        await point('v2-yes')
        setVenues((v) => [v[0], v[1], 'interested'])
        await wait(500)
        await point('next')
        setScreen('success')
        setCursor((c) => ({ ...c, show: false }))
        await wait(4500)
      }
    }

    run().catch((e) => {
      if (e !== CANCEL) throw e
    })
    return () => {
      live = false
    }
  }, [visible, reduced])

  const placeholder = <span className="vhp__ph" />

  return (
    <figure className="vhp" ref={root} aria-label="An auto-playing walk through the Venue Finder flow on a phone">
      <div className="vhp__phone" style={{ height: (H + 24) * scale }}>
        <span className="vhp__camera" aria-hidden="true" />
        <div className="vhp__screen" style={{ width: W * scale, height: H * scale }}>
          <div className="vhp__ui" ref={ui} style={{ width: W, height: H, transform: `scale(${scale})` }}>
            <div className="vhp__screen-in" key={screen}>
              {screen === 'landing' && (
                <>
                  <Header />
                  <div className="vhp__scroll" data-t="landing-scroll">
                    <h2>Let’s find the perfect venue to host your event!</h2>
                    <ol className="vhp__steps">
                      <li>
                        <b>1</b>
                        <span>Tell us about your event. The more details, the better!</span>
                      </li>
                      <li>
                        <b>2</b>
                        <span>Get messages from venues available venues.</span>
                      </li>
                      <li>
                        <b>3</b>
                        <span>Choose your favourite and finish booking your event!</span>
                      </li>
                    </ol>
                    <div className="vhp__card vhp__card--centre">
                      <h3>What location works best?</h3>
                      <div className="vhp__input" data-t="location" data-focus={focus === 'location'}>
                        {location || placeholder}
                      </div>
                      <p className="vhp__small">You’ll mainly hear from venues within within a 5km radius of this area</p>
                      <img className="vhp__map" src={mapRadius} alt="" width={328} height={260} />
                      <h4>What type of event are you planning?</h4>
                      <div className="vhp__row">
                        <Radio on={kind === 'corporate'} t="corporate">
                          Corporate
                        </Radio>
                        <Radio on={kind === 'personal'}>Personal</Radio>
                      </div>
                      <span className="vhp__cta" data-t="start">
                        Start booking <Arrow />
                      </span>
                      <p className="vhp__body">We’ll help you shortlist a few venues, they’ll get back to you with quotes to compare.</p>
                    </div>
                    <blockquote className="vhp__quote">
                      <p>
                        “Simple easy and cost effective. HeadBox is super easy to work with. Shared a list of beautiful
                        venues I hadn’t even heard of before and have been in the industry for a while.”
                      </p>
                      <span>★★★★★</span>
                      <b>Moll, England</b>
                    </blockquote>
                    <blockquote className="vhp__quote">
                      <p>
                        “HeadBox is a great service! It took a lot of the stress out of searching for a suitable,
                        available and affordable venue - would definitely recommend!”
                      </p>
                      <span>★★★★★</span>
                      <b>Zastra, England</b>
                    </blockquote>
                  </div>
                </>
              )}

              {screen === 'prompt' && (
                <>
                  <Header />
                  <div className="vhp__scroll">
                    <div className="vhp__card">
                      <h3 className="vhp__left">Tell us about your event, is there anything specific you would like?</h3>
                      <p className="vhp__small vhp__left">Example prompts:</p>
                      <div className="vhp__chips">
                        <span>Christmas party</span>
                        <span>Meeting</span>
                        <span>Birthday</span>
                      </div>
                      <div className="vhp__area" data-t="prompt-box" data-focus={focus === 'prompt'}>
                        {prompt || <span className="vhp__ph">I’m looking for an elegant rooftop bar</span>}
                      </div>
                      <p className="vhp__hint">
                        <Sparkle />
                        The more detailed the information you include here the better the suggestions we can find for you.
                      </p>
                    </div>
                    <span className="vhp__ghost">Skip this step</span>
                    <p className="vhp__body vhp__body--light">
                      Skipping this step means you’ll have to add the in details manually.
                    </p>
                    <p className="vhp__found">
                      <Sparkle />
                      We found 45 in this area that could be a good fit
                    </p>
                    <img className="vhp__map vhp__map--wide" src={mapResults} alt="" width={346} height={230} />
                  </div>
                  <Footer>
                    <span className="vhp__cta vhp__cta--foot" data-t="next">
                      Next <Arrow />
                    </span>
                  </Footer>
                </>
              )}

              {screen === 'details' && (
                <>
                  <Header />
                  <div className="vhp__scroll">
                    <h2 className="vhp__sub">Add a few more details to help us find you the best venues:</h2>
                    <div className="vhp__card">
                      <p className="vhp__q">
                        Give your event a name: <em>1 of 6</em>
                      </p>
                      <div className="vhp__input" data-t="name" data-focus={focus === 'name'}>
                        {eventName || ''}
                      </div>
                      <p className="vhp__small vhp__left">Suggested name:</p>
                      <span className="vhp__pill">
                        <Sparkle /> Chill company social
                      </span>
                      <p className="vhp__small vhp__left vhp__gap">Whats the occasion?</p>
                      <div className="vhp__grid">
                        {['Party', 'Studio', 'Team activity', 'Presentation', 'Private Dining', 'Wedding', 'Networking', 'Meeting/Workshop'].map(
                          (o) => (
                            <Radio key={o} on={occasion === o} t={o === 'Private Dining' ? 'private-dining' : undefined}>
                              {o}
                            </Radio>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="vhp__card">
                      <p className="vhp__q">
                        Who’s attending? <em>2 of 6</em>
                      </p>
                      <p className="vhp__small vhp__left">Attendees</p>
                      <div className="vhp__input vhp__input--short" data-t="attendees" data-focus={focus === 'attendees'}>
                        {attendees || ''}
                      </div>
                      <div className="vhp__row vhp__row--left">
                        <Radio on>Seated</Radio>
                        <Radio on={false}>Standing</Radio>
                      </div>
                    </div>
                    <div className="vhp__card">
                      <p className="vhp__q">
                        When is it taking place? <em>3 of 6</em>
                      </p>
                      <p className="vhp__small vhp__left">Date</p>
                      <div className="vhp__input vhp__input--select" data-t="date" data-focus={focus === 'date'}>
                        {date || <span className="vhp__ph">Text</span>}
                      </div>
                      <Check on>I’m flexible with the date</Check>
                      <div className="vhp__times">
                        <div>
                          <p className="vhp__small vhp__left">Starting time:</p>
                          <div className="vhp__input vhp__input--select" data-t="from">
                            {from || <span className="vhp__ph">00:00</span>}
                          </div>
                        </div>
                        <div>
                          <p className="vhp__small vhp__left">Finishing time:</p>
                          <div className="vhp__input vhp__input--select" data-t="to">
                            {to || <span className="vhp__ph">00:00</span>}
                          </div>
                        </div>
                      </div>
                      <Check on>I’m flexible on the time</Check>
                      <p className="vhp__q vhp__gap">How soon do you want to book?</p>
                      <div className="vhp__stack">
                        <Radio on={soon === 0}>Urgently, in the next few days</Radio>
                        <Radio on={soon === 1} t="soon-weeks">
                          Within the next few weeks
                        </Radio>
                        <Radio on={soon === 2}>I’m just browsing</Radio>
                      </div>
                    </div>
                    <p className="vhp__found">
                      <Sparkle />
                      We found 32 Venues that could be a good fit!
                    </p>
                  </div>
                  <Footer>
                    <span className="vhp__ghost vhp__ghost--foot">
                      <Back /> Back
                    </span>
                    <span className="vhp__cta vhp__cta--foot" data-t="next">
                      Next <Arrow />
                    </span>
                  </Footer>
                </>
              )}

              {screen === 'contact' && (
                <>
                  <Header />
                  <div className="vhp__scroll">
                    <div className="vhp__card vhp__card--form">
                      <h3 className="vhp__left">How should we contact you with quotes?</h3>
                      {['First name', 'Last name', 'Company name', 'Email', 'Phone number'].map((l, i) => (
                        <div key={l}>
                          <p className="vhp__label">{l}</p>
                          <div className="vhp__input">{contact[i]}</div>
                        </div>
                      ))}
                      <Check on={terms}>I agree to the HeadBox Terms and Conditions</Check>
                      <Check on={offers}>I want to hear about offers and promotions</Check>
                    </div>
                  </div>
                  <Footer>
                    <span className="vhp__ghost vhp__ghost--foot">
                      <Back /> Back
                    </span>
                    <span className="vhp__cta vhp__cta--foot" data-t="next">
                      Next <Arrow />
                    </span>
                  </Footer>
                </>
              )}

              {screen === 'results' && (
                <>
                  <Header />
                  <div className="vhp__scroll" data-t="results-scroll">
                    <h2 className="vhp__sub vhp__sub--tight">Do you like any of these options?</h2>
                    <p className="vhp__lede">Shortlist your favourite venues - you can review them at the end</p>
                    {[
                      { n: 'Junsei - Full venue hire', img: junsei, w: 342, h: 210, loc: 'Marylebone, London', cap: '200 standing', price: '£££', d: 'We are a yakitori restaurant that specialises in the art of grilling chicken. This style of cooking ...' },
                      { n: 'Radisson Blu Hotel, London South Kensington', img: radisson, w: 342, h: 205, loc: 'South Kensington, London', cap: '200 standing', price: '', d: 'We’ve got private dining spaces with breakout rooms and private bar areas available for hire. We host ...' },
                      { n: 'Caia - Full venue hire', img: caia, w: 338, h: 206, loc: 'Marylebone, London', cap: '200 standing', price: '£££', d: 'Seasonally crafted menu of wine-friendly fare cooked on a custom-made, open fire grill. Simple...' },
                    ].map((v, i) => (
                      <article key={v.n} className="vhp__venue" data-state={venues[i] ?? ''} style={{ animationDelay: `${i * 140}ms` }}>
                        <img src={v.img} alt="" width={v.w} height={v.h} />
                        <h3>{v.n}</h3>
                        <p>
                          <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M8 14s4.5-4 4.5-7.5a4.5 4.5 0 1 0-9 0C3.5 10 8 14 8 14Zm0-6.2a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z" />
                          </svg>
                          {v.loc}
                        </p>
                        <p>
                          <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M8 7.5a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6ZM3 14c0-2.4 2.2-4 5-4s5 1.6 5 4" />
                          </svg>
                          {v.cap}
                        </p>
                        {v.price && (
                          <p>
                            <svg viewBox="0 0 16 16" aria-hidden="true">
                              <path d="M2 4h12v8H2Zm0 3h12" />
                            </svg>
                            {v.price}
                          </p>
                        )}
                        <p className="vhp__desc">{v.d}</p>
                        <span className="vhp__opt" data-t={`v${i}-yes`} data-on={venues[i] === 'interested'}>
                          <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M8 13.5S2.5 10 2.5 6.2A2.9 2.9 0 0 1 8 5a2.9 2.9 0 0 1 5.5 1.2C13.5 10 8 13.5 8 13.5Z" />
                          </svg>
                          {venues[i] === 'interested' ? 'Interested' : 'I’m interested'}
                        </span>
                        <span className="vhp__opt" data-t={`v${i}-no`} data-on={venues[i] === 'passed'}>
                          <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M4 4l8 8M12 4l-8 8" />
                          </svg>
                          Not for me
                        </span>
                      </article>
                    ))}
                    <p className="vhp__more">+ Show 6 more</p>
                    <img className="vhp__map vhp__map--wide" src={mapResults} alt="" width={346} height={230} />
                    <p className="vhp__found">
                      <Sparkle />
                      45 venues in Shoreditch
                    </p>
                    <p className="vhp__body vhp__body--light vhp__tail">We’re 100% free to use - only pay the venue you book!</p>
                  </div>
                  <Footer>
                    <span className="vhp__ghost vhp__ghost--foot">
                      <Back /> Back
                    </span>
                    <span className="vhp__cta vhp__cta--foot" data-t="next">
                      Next <Arrow />
                    </span>
                  </Footer>
                </>
              )}

              {screen === 'success' && (
                <>
                  <Header />
                  <div className="vhp__done">
                    <h2>Great!</h2>
                    <p className="vhp__sent">We’ve sent your event to 2 venues</p>
                    <div className="vhp__sent-cards">
                      <span>
                        <img src={junsei} alt="" width={342} height={210} />
                        <b>Junsei</b>
                      </span>
                      <span>
                        <img src={caia} alt="" width={338} height={206} />
                        <b>Caia</b>
                      </span>
                    </div>
                    <p className="vhp__body vhp__body--light">We’ll notify you when they get back with quotes to compare.</p>
                    <p className="vhp__body vhp__body--light">
                      Other HeadBox partner venues might also reach out if they fit your brief
                    </p>
                  </div>
                  <Footer>
                    <span className="vhp__cta vhp__cta--foot">
                      View your event <Arrow />
                    </span>
                  </Footer>
                </>
              )}
            </div>
            <span
              className="vhp__cursor"
              data-down={cursor.down}
              style={{ opacity: cursor.show ? 1 : 0, transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </figure>
  )
}
