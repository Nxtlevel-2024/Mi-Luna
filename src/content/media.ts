/*
 * Page photography.
 * TODO: Unsplash fashion placeholders, not verified from the build environment.
 * Replace with Mi-Luna campaign photography (or curated Unsplash lingerie shots
 * in warm sand / espresso tones) before launch.
 */
const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const media = {
  hero: unsplash('photo-1515886657613-9f3515b0c78f', 2400),
  comfort: unsplash('photo-1509631179647-0177331693ae', 1400),
}
