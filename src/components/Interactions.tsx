import { useSyncExternalStore, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

/* Hover physics only make sense with a real mouse, never on touch. */
const FINE_POINTER = '(hover: hover) and (pointer: fine)'

function subscribe(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function useFinePointer() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  )
}

const followSpring = { stiffness: 260, damping: 22, mass: 0.6 }

/*
 * Magnetic hover: the element leans a few pixels toward the cursor and springs
 * back on leave. Values live in motion values (no re-renders) and are written
 * as a transform string so the browser can composite them.
 */
export function Magnetic({
  children,
  strength = 0.18,
  max = 5,
  className = '',
}: {
  children: ReactNode
  strength?: number
  max?: number
  className?: string
}) {
  const finePointer = useFinePointer()
  const reduceMotion = useReducedMotion()
  const enabled = finePointer && !reduceMotion
  const x = useSpring(useMotionValue(0), followSpring)
  const y = useSpring(useMotionValue(0), followSpring)
  const transform = useTransform([x, y], ([lx, ly]) => `translate3d(${lx}px, ${ly}px, 0)`)

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!enabled) return
    const rect = event.currentTarget.getBoundingClientRect()
    const clamp = (v: number) => Math.max(-max, Math.min(max, v))
    x.set(clamp((event.clientX - (rect.left + rect.width / 2)) * strength))
    y.set(clamp((event.clientY - (rect.top + rect.height / 2)) * strength))
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={enabled ? { transform } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/*
 * Soft tilt that follows the cursor across the element, at most a few degrees,
 * smoothed by a spring and reset on leave.
 */
export function Tilt({
  children,
  maxDeg = 3,
  className = '',
}: {
  children: ReactNode
  maxDeg?: number
  className?: string
}) {
  const finePointer = useFinePointer()
  const reduceMotion = useReducedMotion()
  const enabled = finePointer && !reduceMotion
  const rx = useSpring(useMotionValue(0), followSpring)
  const ry = useSpring(useMotionValue(0), followSpring)
  const transform = useTransform(
    [rx, ry],
    ([a, b]) => `perspective(1000px) rotateX(${a}deg) rotateY(${b}deg)`,
  )

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!enabled) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rx.set(-py * maxDeg * 2)
    ry.set(px * maxDeg * 2)
  }

  function reset() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={enabled ? { transform } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  )
}
