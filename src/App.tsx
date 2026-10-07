import { useState, type MouseEvent } from 'react'
import { motion, useReducedMotion, type Transition } from 'motion/react'
import { ArrowDown } from '@phosphor-icons/react'
import { Container } from './components/Container'
import { Photo } from './components/Photo'
import { media } from './content/media'
import { smoothScrollTo } from './lib/smoothScroll'

/*
 * Mi-Luna: one product, one page.
 * Hero (full viewport) -> size configurator -> quiet footer.
 */
export default function App() {
  return (
    <>
      <main>
        <Hero />
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

const SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const
type Size = (typeof SIZES)[number]

// TODO: take price and interval from the Shopify selling plan once it exists.
const PLAN = { price: '€19,95', interval: 'per maand' }

const INCLUDED = ['Gratis verzending', 'Pauzeren wanneer je wilt', 'Opzeggen met een klik']

/* Soft, interruptible spring for the selected-size marker. */
const markerSpring: Transition = { type: 'spring', duration: 0.45, bounce: 0.15 }

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
      className="py-32 outline-none md:py-48"
    >
      <Container className="grid grid-cols-1 gap-20 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <h2 id="abonnement-title" className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-6xl">
            Kies jouw maat.
          </h2>
          <p className="mt-10 text-lg">
            {PLAN.price} <span className="text-espresso/60">{PLAN.interval}</span>
          </p>
          <p className="mt-4 max-w-[34ch] leading-relaxed text-espresso/60">
            Elke maand een nieuwe string, discreet verpakt. Twijfel je over je maat? Kies je gebruikelijke
            slipmaat.
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7 md:pt-3">
          <fieldset
            onKeyDown={() => setViaKeyboard(true)}
            onPointerDown={() => setViaKeyboard(false)}
          >
            <legend className="sr-only">Maat</legend>
            <div className="grid grid-cols-5 gap-2">
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
            {size ? `Maat ${size}. Je past je maat altijd aan.` : ''}
          </p>

          <motion.button
            type="button"
            disabled={!size}
            // TODO: add the selling-plan variant to a Shopify cart and redirect to checkout.
            initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(12px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="mt-10 flex h-20 w-full items-center justify-center rounded-full bg-espresso text-base font-medium tracking-wide text-ecru transition-[scale] duration-150 ease-out not-disabled:active:scale-[0.98] disabled:cursor-not-allowed md:h-24 md:text-lg"
          >
            <span className={`transition-opacity duration-200 ${size ? 'opacity-100' : 'opacity-50'}`}>
              {size ? 'Activeer abonnement' : 'Kies eerst je maat'}
            </span>
          </motion.button>

          <ul className="mt-16 flex flex-col gap-3 border-t border-espresso/10 pt-8 text-sm text-espresso/60 sm:flex-row sm:gap-10">
            {INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
