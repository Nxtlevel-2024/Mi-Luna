import { useEffect, useRef, useState, type MouseEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Transition,
  type Variants,
} from 'framer-motion'
import { ArrowDown, Check, Star } from '@phosphor-icons/react'
import { Container } from './components/Container'
import { Magnetic, Tilt } from './components/Interactions'
import { Photo } from './components/Photo'
import { media } from './content/media'
import { reviews, sampleReviews } from './content/reviews'
import { smoothScrollTo } from './lib/smoothScroll'

/*
 * Mi-Luna: one product, told as one continuous scroll.
 * Cinematic hero -> pinned "how it works" -> word-by-word USP reveal ->
 * staggered reviews -> configurator -> footer, plus a sticky nudge.
 *
 * Motion rules (Emil Kowalski): everything is either scroll-linked (it follows
 * the scrollbar, so it can never be "mid-animation") or a Framer Motion
 * transition, which retargets from its current value when interrupted.
 * No CSS keyframes. Only transform and opacity animate.
 */
export default function App() {
  return (
    <>
      <main>
        <Hero />
        <HowItWorks />
        <UspReveal />
        <Reviews />
        <Configurator />
      </main>
      <Footer />
      <StickyNudge />
    </>
  )
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const

function goToConfigurator(event: MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById('abonnement')
  if (!target) return
  event.preventDefault()
  smoothScrollTo(target)
}

/* ------------------------------------------------------------------ Hero */

/*
 * The photo starts slightly zoomed in (scale 1.1) and settles to 1.0 as the
 * hero scrolls away; it also fades in slowly on first paint. The copy drifts
 * up and fades out with the scroll, so the hero hands over to the next scene.
 */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageTransform = useTransform(scrollYProgress, [0, 1], ['scale(1.1)', 'scale(1)'])
  const copyTransform = useTransform(scrollYProgress, [0, 0.6], ['translateY(0px)', 'translateY(-48px)'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex h-[100dvh] min-h-[560px] flex-col overflow-hidden bg-espresso text-ecru"
    >
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0.3 : 2.2, ease: EASE_OUT }}
        style={reduceMotion ? undefined : { transform: imageTransform }}
        className="absolute inset-0 -z-10 origin-center"
      >
        <Photo src={media.hero} alt="" fetchPriority="high" className="size-full object-[60%_center]" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-espresso/25" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-espresso/85 to-transparent"
      />

      <Container className="pt-8 md:pt-10">
        <p className="text-sm font-medium tracking-[0.3em] uppercase">Mi-Luna</p>
      </Container>

      <motion.div
        style={reduceMotion ? undefined : { transform: copyTransform, opacity: copyOpacity }}
        className="mt-auto"
      >
        <Container className="pb-16 md:pb-24">
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(24px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.2 }}
            className="max-w-5xl text-5xl leading-[0.98] font-bold tracking-[-0.045em] sm:text-7xl lg:text-[7.5rem]"
          >
            One subscription, endless confidence.
          </motion.h1>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(16px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.4 }}
            className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-[42ch] text-base leading-relaxed text-ecru/80 md:text-lg">
              Het Mi-Luna string abonnement. Premium materialen, een feilloze pasvorm en elke maand een nieuw
              moment van luxe in je brievenbus.
            </p>
            <a
              href="#abonnement"
              onClick={goToConfigurator}
              className="group inline-flex min-h-11 shrink-0 items-center gap-3 self-start border-b border-ecru/40 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ease-out hover:border-ecru"
            >
              Kies jouw maat
              <ArrowDown
                size={14}
                weight="bold"
                className="transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0.5"
              />
            </a>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------- How it works */

const STEPS = [
  { title: 'Kies je maat', body: 'Van XS tot XL. Je past je maat altijd aan.' },
  { title: 'Jouw eerste set is gratis', body: 'Je betaalt pas vanaf de tweede maand.' },
  { title: 'Oneindige zelfverzekerdheid', body: 'Elke maand een nieuwe string, discreet in je brievenbus.' },
]

/*
 * Split sticky: on desktop the photo pins to the left half of the viewport
 * while the right half scrolls through the three steps. Each step comes into
 * full focus while it sits in the middle of the screen. Mobile stacks.
 */
function HowItWorks() {
  return (
    <section aria-labelledby="hoe-title" className="relative md:grid md:grid-cols-2">
      <div className="h-[70dvh] md:sticky md:top-0 md:h-[100dvh]">
        <Photo
          src={media.comfort}
          alt="Model in Mi-Luna lingerie in een zandkleurige studio"
          loading="lazy"
          className="size-full"
        />
      </div>

      <div className="px-4 sm:px-6 md:px-16 lg:px-24">
        <div className="flex min-h-[50dvh] items-end pt-32 pb-8 md:min-h-[100dvh] md:items-center md:py-0">
          <h2 id="hoe-title" className="text-5xl leading-[1] font-bold tracking-[-0.04em] md:text-7xl">
            Hoe werkt het?
          </h2>
        </div>
        <ol>
          {STEPS.map((step, i) => (
            <Step key={step.title} index={i} title={step.title} body={step.body} />
          ))}
        </ol>
        <div aria-hidden className="h-16 md:h-[20dvh]" />
      </div>
    </section>
  )
}

function Step({ index, title, body }: { index: number; title: string; body: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0.15 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.6 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="flex min-h-[55dvh] flex-col justify-center py-12 md:min-h-[80dvh]"
    >
      <span
        aria-hidden
        className="text-8xl leading-none font-thin tracking-[-0.05em] tabular-nums md:text-9xl"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="mt-12 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{title}</h3>
      <p className="mt-4 max-w-[32ch] text-lg leading-relaxed text-espresso/60">{body}</p>
    </motion.li>
  )
}

/* --------------------------------------------------------- USP reveal */

const CLAIMS = [
  { title: 'Ultiem draagcomfort.', body: 'Zacht tegen je huid, van de ochtend tot diep in de nacht.' },
  { title: 'Seamless ontwerp.', body: 'Geen naden, geen lijnen. Onzichtbaar onder alles wat je draagt.' },
  { title: 'Perfecte pasvorm.', body: 'Van XS tot XL ontworpen om te blijven zitten waar hij hoort.' },
]

function UspReveal() {
  return (
    <section aria-label="Waarom je hem niet meer uittrekt" className="py-40 md:py-64">
      <Container className="flex flex-col gap-40 md:gap-64">
        {CLAIMS.map((claim) => (
          <div key={claim.title}>
            <RevealText
              as="h3"
              text={claim.title}
              className="max-w-5xl text-5xl leading-[1.02] font-bold tracking-[-0.045em] sm:text-7xl lg:text-8xl"
            />
            <RevealText
              as="p"
              text={claim.body}
              className="mt-10 max-w-[30ch] text-xl leading-relaxed md:ml-[40%] md:text-2xl"
            />
          </div>
        ))}
      </Container>
    </section>
  )
}

/*
 * Word-by-word text mask: every word starts as a faint espresso tint and
 * resolves to full contrast as the line travels from the bottom of the screen
 * to its centre. Tied to scroll progress, so scrolling back un-reveals it.
 */
function RevealText({ text, as, className }: { text: string; as: 'h3' | 'p'; className: string }) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.5'] })
  const words = text.split(' ')
  const Tag = as

  if (reduceMotion) return <Tag className={className}>{text}</Tag>

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </Tag>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <span aria-hidden>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </span>
  )
}

/* ------------------------------------------------------------ Reviews */

/* Real reviews in production; sample copy only while developing locally. */
const visibleReviews = reviews.length > 0 ? reviews : import.meta.env.DEV ? sampleReviews : []

const reviewList: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.1 } },
}

const reviewCard: Variants = {
  hidden: { opacity: 0, transform: 'translateY(32px)' },
  shown: {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: { type: 'spring', duration: 0.8, bounce: 0.15 },
  },
}

function Stars() {
  return (
    <div className="flex gap-1" role="img" aria-label="5 van 5 sterren">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={13} weight="fill" className="text-espresso" />
      ))}
    </div>
  )
}

/* Three cards that rise in one after another. Depth from a tinted shadow, no borders. */
function Reviews() {
  const reduceMotion = useReducedMotion()
  if (visibleReviews.length === 0) return null

  return (
    <section aria-labelledby="reviews-title" className="pb-40 md:pb-64">
      <Container>
        <h2 id="reviews-title" className="text-4xl leading-[1.05] font-bold tracking-[-0.04em] md:text-6xl">
          Wat abonnees zeggen.
        </h2>
        <motion.ul
          variants={reviewList}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="shown"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-20 grid grid-cols-1 gap-6 md:mt-28 md:grid-cols-3 md:items-start"
        >
          {visibleReviews.map((review, i) => (
            <motion.li key={review.name} variants={reviewCard} className={i === 1 ? 'md:mt-16' : ''}>
              <Tilt>
                <figure className="rounded-[28px] bg-ecru p-10 shadow-[0_40px_80px_-40px_rgba(28,25,23,0.28),0_2px_6px_rgba(28,25,23,0.04)] md:p-12">
                  <Stars />
                  <blockquote className="mt-8 text-xl leading-snug font-medium tracking-[-0.015em]">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 text-sm text-espresso/60">
                    {review.name}, maat {review.size}
                  </figcaption>
                </figure>
              </Tilt>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------- Configurator */

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

const REASSURANCE = ['Altijd gratis bezorgd', 'Maandelijks opzegbaar', 'Past door de brievenbus']

/* Elastic but quick capsule spring; retargets mid-flight when the size changes again. */
const capsuleSpring: Transition = { type: 'spring', duration: 0.5, bounce: 0.25 }

function Configurator() {
  const [size, setSize] = useState<Size | null>(null)
  // Keyboard changes are repeated quickly; they move the capsule without animation.
  const [viaKeyboard, setViaKeyboard] = useState(false)
  const reduceMotion = useReducedMotion()
  const instant = reduceMotion || viaKeyboard

  return (
    <section
      id="abonnement"
      tabIndex={-1}
      aria-labelledby="abonnement-title"
      className="bg-espresso/[0.03] py-40 outline-none md:py-56"
    >
      <Container className="grid grid-cols-1 gap-20 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <h2 id="abonnement-title" className="text-5xl leading-[1] font-bold tracking-[-0.04em] md:text-7xl">
            Waarom Mi&#8209;Luna?
          </h2>
          <ul className="mt-14 space-y-4 text-lg">
            {BENEFITS.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="mt-14 text-2xl font-medium tracking-[-0.02em]">
            {PLAN.price} <span className="text-base font-normal text-espresso/60">{PLAN.interval}</span>
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7 md:pt-4">
          <fieldset onKeyDown={() => setViaKeyboard(true)} onPointerDown={() => setViaKeyboard(false)}>
            <legend className="text-sm text-espresso/60">Kies jouw maat</legend>
            {/* Capsule track: a soft inset well, no borders. */}
            <div className="mt-5 grid grid-cols-5 gap-1 rounded-full bg-espresso/[0.05] p-1.5 shadow-[inset_0_1px_3px_rgba(28,25,23,0.08)]">
              {SIZES.map((option) => {
                const isSelected = option === size
                return (
                  <Magnetic key={option}>
                    <label className="relative isolate flex h-14 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-transform duration-150 ease-out active:scale-[0.96] md:h-16 md:text-base">
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
                          layoutId="size-capsule"
                          transition={instant ? { duration: 0 } : capsuleSpring}
                          className="absolute inset-0 -z-10 rounded-full bg-espresso shadow-[0_8px_20px_-8px_rgba(28,25,23,0.5)]"
                        />
                      )}
                      <span
                        className={`transition-[color,opacity] duration-200 ease-out ${
                          isSelected
                            ? 'text-ecru'
                            : 'text-espresso/70 [@media(hover:hover)_and_(pointer:fine)]:hover:text-espresso'
                        }`}
                      >
                        {option}
                      </span>
                      <span className="pointer-events-none absolute inset-0 rounded-full peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-espresso" />
                    </label>
                  </Magnetic>
                )
              })}
            </div>
          </fieldset>

          <p aria-live="polite" className="mt-6 h-6 text-sm text-espresso/60">
            {size
              ? `Maat ${size}. Je past je maat altijd aan.`
              : 'Twijfel je? Kies je gebruikelijke slipmaat.'}
          </p>

          <motion.button
            type="button"
            disabled={!size}
            // TODO: add the selling-plan variant to a Shopify cart and redirect to checkout.
            initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(12px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="mt-10 flex h-20 w-full items-center justify-center rounded-full bg-espresso text-base font-medium tracking-wide text-ecru shadow-[0_24px_48px_-24px_rgba(28,25,23,0.6)] transition-[scale] duration-150 ease-out not-disabled:active:scale-[0.98] disabled:cursor-not-allowed md:h-24 md:text-lg"
          >
            <span className={`transition-opacity duration-200 ${size ? 'opacity-100' : 'opacity-50'}`}>
              {size ? 'Activeer jouw abonnement' : 'Kies eerst je maat'}
            </span>
          </motion.button>

          <ul className="mt-8 flex flex-col gap-3 text-sm text-espresso/60 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {REASSURANCE.map((line) => (
              <li key={line} className="flex items-center gap-2">
                <Check size={14} weight="bold" className="shrink-0 text-espresso" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------- Footer */

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className="py-16">
      <Container className="flex flex-col gap-3 text-sm text-espresso/60 sm:flex-row sm:justify-between">
        <p>One subscription, endless confidence.</p>
        <p>&copy; {year} Mi-Luna</p>
      </Container>
    </footer>
  )
}

/* -------------------------------------------------------- Sticky nudge */

/*
 * Slim bar that slides in once the hero has scrolled away and slides out as
 * soon as the configurator is reached, so it never covers the real CTA.
 */
function StickyNudge() {
  const [heroGone, setHeroGone] = useState(false)
  const [configReached, setConfigReached] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const hero = document.getElementById('top')
    const config = document.getElementById('abonnement')
    if (!hero || !config) return

    const heroObserver = new IntersectionObserver(([entry]) => setHeroGone(!entry.isIntersecting))
    const configObserver = new IntersectionObserver(([entry]) =>
      setConfigReached(entry.isIntersecting || entry.boundingClientRect.top < 0),
    )
    heroObserver.observe(hero)
    configObserver.observe(config)
    return () => {
      heroObserver.disconnect()
      configObserver.disconnect()
    }
  }, [])

  const visible = heroGone && !configReached

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(100%)' }}
          animate={{ opacity: 1, transform: 'translateY(0%)' }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(100%)' }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="fixed inset-x-0 bottom-0 z-20 bg-ecru pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_32px_-16px_rgba(28,25,23,0.18)]"
        >
          <Container className="flex h-18 items-center justify-between gap-6">
            <p className="text-sm">
              {PLAN.price}{' '}
              <span className="text-espresso/60">
                {PLAN.interval}
                <span className="hidden sm:inline">, eerste set gratis</span>
              </span>
            </p>
            <a
              href="#abonnement"
              onClick={goToConfigurator}
              className="inline-flex h-11 shrink-0 items-center rounded-full bg-espresso px-6 text-sm font-medium text-ecru transition-transform duration-150 ease-out active:scale-[0.97]"
            >
              Kies jouw maat
            </a>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
