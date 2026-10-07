import { useRef, useState, type MouseEvent } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type Transition } from 'motion/react'
import { ArrowDown, Star } from '@phosphor-icons/react'
import { Container } from './components/Container'
import { Photo } from './components/Photo'
import { media } from './content/media'
import { reviews, sampleReviews } from './content/reviews'
import { smoothScrollTo } from './lib/smoothScroll'

/*
 * Mi-Luna: one product, one page.
 * Hero -> how it works -> USPs -> reviews -> closing configurator -> footer.
 */
export default function App() {
  return (
    <>
      <main>
        <Hero />
        <HowItWorks />
        <Usps />
        <Reviews />
        <Configurator />
      </main>
      <Footer />
    </>
  )
}

function Hero() {
  function goToConfigurator(event: MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById('abonnement')
    if (!target) return
    event.preventDefault()
    smoothScrollTo(target)
  }

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col bg-espresso text-ecru">
      <Photo
        src={media.hero}
        alt="Model in Mi-Luna lingerie"
        fetchPriority="high"
        className="absolute inset-0 -z-10 size-full object-[60%_center]"
      />
      {/* Espresso scrim, heavier at the bottom where the copy sits. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-espresso/25" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-espresso/80 to-transparent" />

      <Container className="pt-8 md:pt-10">
        <p className="text-sm font-medium tracking-[0.3em] uppercase">Mi-Luna</p>
      </Container>

      <Container className="mt-auto pb-16 md:pb-24">
        <h1 className="reveal max-w-4xl text-5xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-8xl">
          One subscription, endless confidence.
        </h1>
        <p className="reveal reveal-delay mt-10 max-w-[42ch] text-base leading-relaxed text-ecru/80 md:mt-12 md:text-lg">
          Het Mi-Luna string abonnement. Premium materialen, een feilloze pasvorm en elke maand een
          nieuw moment van luxe in je brievenbus.
        </p>
        <a
          href="#abonnement"
          onClick={goToConfigurator}
          className="reveal reveal-delay group mt-10 inline-flex min-h-11 items-center gap-3 border-b border-ecru/40 pt-2 pb-2 text-sm font-medium tracking-wide transition-colors duration-200 ease-out hover:border-ecru md:mt-14"
        >
          Kies jouw maat
          <ArrowDown
            size={14}
            weight="bold"
            className="transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0.5"
          />
        </a>
      </Container>
    </section>
  )
}


/* Shared strong ease-out for entrances. */
const EASE_OUT = [0.23, 1, 0.32, 1] as const

const STEPS = [
  { title: 'Kies je maat', body: 'Van XS tot XL. Je past je maat altijd aan.' },
  { title: 'Jouw eerste set is gratis', body: 'Je betaalt pas vanaf de tweede maand.' },
  { title: 'Oneindige zelfverzekerdheid', body: 'Elke maand een nieuwe string, discreet in je brievenbus.' },
]

/*
 * Staircase grid: each step drops lower than the last on desktop, so the eye
 * reads 01 -> 02 -> 03 diagonally. Collapses to a single column on mobile.
 */
function HowItWorks() {
  return (
    <section aria-labelledby="hoe-title" className="py-32 md:py-48">
      <Container>
        <h2 id="hoe-title" className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-6xl">
          Hoe werkt het?
        </h2>
        <ol className="mt-20 grid grid-cols-1 gap-16 md:mt-28 md:grid-cols-3 md:gap-12">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className={`border-t border-espresso/15 pt-8 ${i === 1 ? 'md:mt-24' : ''} ${i === 2 ? 'md:mt-48' : ''}`}
            >
              <span aria-hidden className="block text-7xl leading-none font-thin tracking-[-0.04em] tabular-nums md:text-8xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-10 text-xl font-medium tracking-[-0.01em]">{step.title}</h3>
              <p className="mt-3 max-w-[30ch] leading-relaxed text-espresso/60">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

const USPS = [
  {
    title: 'Ultiem draagcomfort',
    body: 'Zacht tegen je huid, van de ochtend tot diep in de nacht. Je vergeet dat je hem draagt.',
    image: media.comfort,
    alt: 'Close-up van zachte premium stof op de huid',
  },
  {
    title: 'Seamless ontwerp',
    body: 'Geen naden, geen lijnen. Onzichtbaar onder je strakste jurk of jeans.',
    image: media.seamless,
    alt: 'Detail van naadloos afgewerkt kant',
  },
  {
    title: 'Perfecte pasvorm',
    body: 'Van XS tot XL ontworpen om te blijven zitten waar hij hoort.',
    image: media.fit,
    alt: 'Model in een minimalistische zandkleurige studio',
  },
  {
    title: 'Hoogwaardige kwaliteit',
    body: 'Premium materialen, met zorg afgewerkt. Gemaakt om lang mee te gaan.',
    image: media.quality,
    alt: 'Model in Mi-Luna lingerie, warm licht',
  },
]

/* Editorial alternating rows: image right, then image left, with wide gaps. */
function Usps() {
  return (
    <section aria-label="Waarom je hem niet meer uittrekt" className="pb-32 md:pb-48">
      <Container className="flex flex-col gap-32 md:gap-56">
        {USPS.map((usp, i) => {
          const imageLeft = i % 2 === 1
          // Every other pair runs a narrower, taller frame so the zigzag never repeats exactly.
          const wide = i % 4 < 2
          return (
            <article key={usp.title} className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-12">
              <ParallaxPhoto
                src={usp.image}
                alt={usp.alt}
                aspect={wide ? 'aspect-[4/5]' : 'aspect-[3/4]'}
                className={`${wide ? 'md:col-span-7' : 'md:col-span-5'} ${imageLeft ? 'md:order-1' : `md:order-2 ${wide ? 'md:col-start-6' : 'md:col-start-8'}`}`}
              />
              <div
                className={`md:col-span-4 ${imageLeft ? `md:order-2 ${wide ? 'md:col-start-9' : 'md:col-start-8'}` : 'md:order-1 md:col-start-1'}`}
              >
                <h3 className="text-3xl leading-[1.1] font-semibold tracking-[-0.03em] md:text-5xl">{usp.title}</h3>
                <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-espresso/60">{usp.body}</p>
              </div>
            </article>
          )
        })}
      </Container>
    </section>
  )
}

/*
 * Slow fade-in plus a light parallax drift: the photo rises a little slower
 * than the page while scrolling. Uses a transform string (not Motion's `y`)
 * so it stays hardware accelerated. Reduced motion keeps only the fade.
 */
function ParallaxPhoto({
  src,
  alt,
  aspect,
  className = '',
}: {
  src: string
  alt: string
  aspect: string
  className?: string
}) {
  const frame = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] })
  const transform = useTransform(scrollYProgress, [0, 1], ['translateY(6%)', 'translateY(-6%)'])

  return (
    <motion.div
      ref={frame}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: reduceMotion ? 0.3 : 1.4, ease: EASE_OUT }}
      className={`relative ${aspect} overflow-hidden bg-espresso ${className}`}
    >
      <motion.div style={reduceMotion ? undefined : { transform }} className="absolute inset-x-0 -inset-y-[8%]">
        <Photo src={src} alt={alt} loading="lazy" className="size-full" />
      </motion.div>
    </motion.div>
  )
}

/* Real reviews in production; sample copy only while developing locally. */
const visibleReviews = reviews.length > 0 ? reviews : import.meta.env.DEV ? sampleReviews : []

function Stars() {
  return (
    <div className="flex gap-1" role="img" aria-label="5 van 5 sterren">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={14} weight="fill" className="text-espresso" />
      ))}
    </div>
  )
}

/*
 * One large featured quote, two quieter ones stacked beside it.
 * Hidden entirely when there are no reviews to show.
 */
function Reviews() {
  if (visibleReviews.length === 0) return null
  const [featured, ...rest] = visibleReviews

  return (
    <section aria-labelledby="reviews-title" className="border-t border-espresso/10 py-32 md:py-48">
      <Container className="grid grid-cols-1 gap-20 md:grid-cols-12 md:gap-12">
        <h2 id="reviews-title" className="sr-only">
          Wat abonnees zeggen
        </h2>

        <figure className="md:col-span-7">
          <Stars />
          <blockquote className="mt-10 text-3xl leading-[1.2] font-medium tracking-[-0.025em] md:text-5xl">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-10 text-sm text-espresso/60">
            {featured.name}, maat {featured.size}
          </figcaption>
        </figure>

        <div className="flex flex-col gap-16 md:col-span-4 md:col-start-9 md:pt-24">
          {rest.map((review) => (
            <figure key={review.name}>
              <Stars />
              <blockquote className="mt-6 text-lg leading-relaxed">&ldquo;{review.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm text-espresso/60">
                {review.name}, maat {review.size}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const
type Size = (typeof SIZES)[number]

// TODO: take price and interval from the Shopify selling plan once it exists.
const PLAN = { price: '€14,95', interval: 'per maand' }

const BENEFITS = [
  'Je eerste set is gratis',
  'Ultiem draagcomfort, seamless ontwerp',
  'Perfecte pasvorm van XS tot XL',
  'Elke maand nieuw, discreet bezorgd',
]

/* Soft, interruptible spring for the selected-size marker. */
const markerSpring: Transition = { type: 'spring', duration: 0.45, bounce: 0.15 }

/* Closing section: a calm recap of the benefits, then size and the one CTA. */
function Configurator() {
  const [size, setSize] = useState<Size | null>(null)
  // Keyboard changes are repeated quickly; they move the marker without animation.
  const [viaKeyboard, setViaKeyboard] = useState(false)
  const reduceMotion = useReducedMotion()
  const instant = reduceMotion || viaKeyboard

  return (
    <section
      id="abonnement"
      tabIndex={-1}
      aria-labelledby="abonnement-title"
      className="border-t border-espresso/10 py-32 outline-none md:py-48"
    >
      <Container className="grid grid-cols-1 gap-20 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <h2 id="abonnement-title" className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-6xl">
            Waarom Mi&#8209;Luna?
          </h2>
          <ul className="mt-12 space-y-4 text-lg">
            {BENEFITS.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="mt-12 text-lg">
            {PLAN.price} <span className="text-espresso/60">{PLAN.interval}</span>
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7 md:pt-3">
          <fieldset onKeyDown={() => setViaKeyboard(true)} onPointerDown={() => setViaKeyboard(false)}>
            <legend className="text-sm text-espresso/60">Kies jouw maat</legend>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {SIZES.map((option) => {
                const isSelected = option === size
                return (
                  <label
                    key={option}
                    className="group relative isolate flex h-16 cursor-pointer items-center justify-center rounded-full border border-espresso/30 text-sm font-medium transition-[transform,border-color] duration-150 ease-out active:scale-[0.97] md:h-20 md:text-base [@media(hover:hover)_and_(pointer:fine)]:hover:border-espresso/70"
                  >
                    <input
                      type="radio"
                      name="size"
                      value={option}
                      checked={isSelected}
                      onChange={() => setSize(option)}
                      className="peer sr-only"
                    />
                    {isSelected && (
                      <motion.span
                        layoutId="size-marker"
                        transition={instant ? { duration: 0 } : markerSpring}
                        className="absolute -inset-px -z-10 rounded-full bg-espresso"
                      />
                    )}
                    <span
                      className={`transition-colors duration-200 ease-out ${isSelected ? 'text-ecru' : 'text-espresso'}`}
                    >
                      {option}
                    </span>
                    <span className="pointer-events-none absolute -inset-px rounded-full peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-espresso" />
                  </label>
                )
              })}
            </div>
          </fieldset>

          <p aria-live="polite" className="mt-6 h-6 text-sm text-espresso/60">
            {size ? `Maat ${size}. Je past je maat altijd aan.` : 'Twijfel je? Kies je gebruikelijke slipmaat.'}
          </p>

          <motion.button
            type="button"
            disabled={!size}
            // TODO: add the selling-plan variant to a Shopify cart and redirect to checkout.
            initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(12px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="mt-10 flex h-20 w-full items-center justify-center rounded-full bg-espresso text-base font-medium tracking-wide text-ecru transition-[scale] duration-150 ease-out not-disabled:active:scale-[0.98] disabled:cursor-not-allowed md:h-24 md:text-lg"
          >
            <span className={`transition-opacity duration-200 ${size ? 'opacity-100' : 'opacity-50'}`}>
              {size ? 'Activeer jouw abonnement' : 'Kies eerst je maat'}
            </span>
          </motion.button>

          <p className="mt-8 text-sm text-espresso/60">Pauzeren of opzeggen kan altijd.</p>
        </div>
      </Container>
    </section>
  )
}

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className="border-t border-espresso/10 py-12">
      <Container className="flex flex-col gap-3 text-sm text-espresso/60 sm:flex-row sm:justify-between">
        <p>One subscription, endless confidence.</p>
        <p>&copy; {year} Mi-Luna</p>
      </Container>
    </footer>
  )
}
