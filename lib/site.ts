export interface Sponsor {
  name: string
  url: string
  label: string
  slug: string
  description: string
}

export const sponsors: Sponsor[] = [
  { name: 'Framer', url: 'https://framer.com', label: 'Design and publish websites', slug: 'framer', description: 'The professional website builder that lets designers ship production sites without writing code.' },
  { name: 'dscout', url: 'https://dscout.com', label: 'Research platform', slug: 'dscout', description: 'A research platform for gathering in-context insights from real people at scale.' },
  { name: 'MagicPatterns', url: 'https://magicpatterns.com', label: 'AI design patterns', slug: 'magicpatterns', description: 'Generate UI components and design patterns with AI, directly in your design workflow.' },
  { name: 'MagicPath', url: 'https://magicpath.ai', label: 'Canvas-first AI prototyping', slug: 'magicpath', description: 'Canvas-first AI prototyping that turns your ideas into interactive prototypes in seconds.' },
  { name: 'Mobbin', url: 'https://mobbin.com', label: 'Design reference', slug: 'mobbin', description: 'The world\u2019s largest library of real product UI, so you can find design patterns that actually ship.' },
  { name: 'Dazl', url: 'https://dazl.dev/?utm_source=uxtools&utm_medium=survey', label: 'Portfolio builder', slug: 'dazl', description: 'Build a standout design portfolio in minutes with AI-powered layouts and zero config deployment.' },
]
