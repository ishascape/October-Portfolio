# Imagery

Images are evidence. They are real product screens, real photos of Ashni, and her own sketches. Nothing is generated, mocked up or borrowed.

## Types of image

| Type | Where | Treatment |
|---|---|---|
| **Portrait** | Hero polaroid | 4:5 crop inside a raised paper print with a handwritten caption. Loaded eagerly with `fetchpriority="high"`. |
| **Product screens** | Case cards, case study figures, hero of each study | Shown as delivered. Cut-outs on white keep a white background only as large as the image (`surface.media`). Transparent cut-outs sit straight on paper (`--clear`). |
| **Device mockups** | Card slides, study heroes | Only from Ashni's own exports. |
| **Field notes photos** | About › Field notes pile | Photos from travel, gigs and volunteering, each with a group label and a Caveat caption. |
| **Sketches** | `src/assets/sketches` (animals), portrait line drawing | Ashni's own drawings. EXIF stripped. |
| **Prototypes** | Venue Finder hero and section 04, HostHQ MVP | Autoplay loops built from Ashni's real screens, UI untouched. |

## Rules

1. **Never invent a screenshot.** If an image doesn't exist yet, show a labelled placeholder frame: dashed graphite border, sunken paper, a drawing number ("Drawing 01a") and what is coming ("Key screens to come").
2. **Never alter a product UI** in a screen or prototype. Crop and frame, don't redraw.
3. **Figma links can't be read** by the build process. Ashni exports PNGs, which are converted to WebP.
4. **Format:** WebP, sized for the largest slot it fills. Set `width` and `height` on every `img` to prevent layout shift.
5. **Loading:** the portrait and first hero images are eager; everything else is `loading="lazy"` and `decoding="async"`.
6. **Cropping:** card slides use `object-fit: cover` anchored to the top, so any extra height is trimmed from the bottom. Use `fit: 'contain'` when nothing may be cropped; the graph paper shows around it.
7. **Zoom:** any real screenshot inside a case study opens full size in the [lightbox](../components/lightbox.md) on click (`cursor: zoom-in`).

## Alt text

Describe what the image shows and why it's there, in one sentence, as you'd describe it to a hiring manager on the phone.

| Good | Not good |
|---|---|
| "Venue Finder results on a phone: venue cards with I'm interested and Not for me buttons." | "Screenshot" |
| "Ashni Dave smiling, with long dark hair, in a blue denim top, standing in a garden." | "Profile photo" |

Decorative images (the sketch overlay, carousel slides that repeat the card's text) get `alt=""` or sit inside an `aria-hidden` container.

## Framing devices

| Device | Use with |
|---|---|
| Polaroid print (raised paper, square corners, caption) | Photos of Ashni and field notes |
| Dotted-paper well | Carousel card images and contain-fit screens |
| 6:5 looping clip | Home case card media (poster frame as fallback) |
| 1px ink border (`--bordered`) | Screens whose edge would otherwise disappear into paper |
| White ground (`surface.media`) | Screens cut out on white |
