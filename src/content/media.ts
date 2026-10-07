/*
 * Page photography.
 * TODO: Unsplash fashion placeholder. Replace with Mi-Luna campaign photography
 * (or a curated Unsplash lingerie shot in warm sand / espresso tones) before launch.
 */
const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const media = {
  hero: unsplash('photo-1515886657613-9f3515b0c78f', 2400),
}
