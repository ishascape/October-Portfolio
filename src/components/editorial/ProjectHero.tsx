import { homeHref } from '../../links'

// The case-study title sheet: a large title beside an oversized drawing number, the product image across the full
// width, and the role details set as a title block under it instead of a narrow sidebar.
export function ProjectHero({
  number,
  title,
  kicker,
  subtitle,
  image,
  meta,
}: {
  number: string
  title: string
  kicker: string
  subtitle: string
  image?: { src: string; alt: string; width: number; height: number }
  meta: { label: string; value: string }[]
}) {
  return (
    <header className="ed-hero">
      <div className="container">
        <p className="label ed-hero__sheet">
          <a href={homeHref('#work')}>← Selected work</a>
          <span>Drawing {number} · Case study</span>
        </p>
        <div className="ed-hero__top">
          <div className="ed-hero__titles">
            <p className="label ed-hero__kicker">{kicker}</p>
            <h1 id="case-title" className="display ed-hero__title" tabIndex={-1}>
              {title}
            </h1>
            <p className="ed-hero__subtitle">{subtitle}</p>
          </div>
          <span className="ed-hero__no" aria-hidden="true">
            {number}
          </span>
        </div>
        {image && (
          <figure className="ed-hero__image">
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        )}
        <dl className="ed-titleblock">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="label">{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  )
}
