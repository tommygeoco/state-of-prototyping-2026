export interface Sponsor {
  name: string
  url: string
  label: string
  slug: string
}

export const sponsors: Sponsor[] = [
  { name: 'Framer', url: 'https://framer.com', label: 'Design and publish websites', slug: 'framer' },
  { name: 'dscout', url: 'https://dscout.com', label: 'Research platform', slug: 'dscout' },
  { name: 'MagicPatterns', url: 'https://magicpatterns.com', label: 'AI design patterns', slug: 'magicpatterns' },
  { name: 'MagicPath', url: 'https://magicpath.ai', label: 'Canvas-first AI prototyping', slug: 'magicpath' },
  { name: 'Mobbin', url: 'https://mobbin.com', label: 'Design reference', slug: 'mobbin' },
  { name: 'Dazl', url: 'https://dazl.dev/?utm_source=uxtools&utm_medium=survey', label: 'Portfolio builder', slug: 'dazl' },
]
