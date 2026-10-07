/*
 * Eased scroll to an element. The page moves on screen, so it uses a strong
 * ease-in-out (easeInOutQuart, ~cubic-bezier(0.77, 0, 0.175, 1)). Duration
 * scales with distance, and any wheel, touch or key input hands control
 * straight back to the user. Reduced motion jumps instantly.
 */
const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2)

const INTERRUPT_EVENTS = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const

export function smoothScrollTo(target: HTMLElement) {
  const startY = window.scrollY
  const endY = target.getBoundingClientRect().top + startY
  const distance = endY - startY
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const finish = () => target.focus({ preventScroll: true })

  if (reduceMotion || Math.abs(distance) < 2) {
    window.scrollTo({ top: endY, behavior: 'instant' })
    finish()
    return
  }

  const duration = Math.min(1000, Math.max(600, Math.abs(distance) * 0.6))
  let start: number | null = null
  let frame = 0

  const stop = () => {
    cancelAnimationFrame(frame)
    INTERRUPT_EVENTS.forEach((e) => window.removeEventListener(e, stop))
  }
  INTERRUPT_EVENTS.forEach((e) => window.addEventListener(e, stop, { passive: true }))

  const step = (now: number) => {
    start ??= now
    const progress = Math.min(1, (now - start) / duration)
    window.scrollTo({ top: startY + distance * easeInOutQuart(progress), behavior: 'instant' })

    if (progress < 1) {
      frame = requestAnimationFrame(step)
    } else {
      stop()
      finish()
    }
  }

  frame = requestAnimationFrame(step)
}
