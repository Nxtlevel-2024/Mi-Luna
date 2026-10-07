/*
 * All page photography in one place.
 * TODO: these are Unsplash fashion placeholders. Replace them with Mi-Luna
 * campaign photography (or curated Unsplash lingerie shots) before launch.
 */
const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const media = {
  hero: unsplash('photo-1515886657613-9f3515b0c78f', 2400),
  configurator: unsplash('photo-1509631179647-0177331693ae', 1400),
  lookbookWide: unsplash('photo-1469334031218-e382a71b716b', 2400),
  lookbookA: unsplash('photo-1485968579580-b6d095142e6e', 1200),
  lookbookB: unsplash('photo-1496747611176-843222e1e57c', 1200),
}
