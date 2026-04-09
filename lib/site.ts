export interface Sponsor {
  name: string
  url: string
  label: string
  slug: string
  description: string
}

export const sponsors: Sponsor[] = [
  { name: 'Mobbin', url: 'https://mobbin.com', label: 'Design reference', slug: 'mobbin', description: 'Stop screenshotting apps. Browse the largest curated library of real product UI - search by flow, pattern, or screen.' },
  { name: 'Framer', url: 'https://framer.com', label: 'Design and publish websites', slug: 'framer', description: 'Ship real sites without writing code. Full design freedom, built-in CMS, and the performance your clients actually need.' },
  { name: 'MagicPath', url: 'https://magicpath.ai', label: 'Canvas-first AI prototyping', slug: 'magicpath', description: 'Describe what you want, get clickable prototypes on an infinite canvas. Design and code in one place.' },
  { name: 'dscout', url: 'https://dscout.com', label: 'Research platform', slug: 'dscout', description: 'Run user research from recruit to insight - video diaries, interviews, and surveys in one AI-powered platform.' },
  { name: 'MagicPatterns', url: 'https://magicpatterns.com', label: 'AI design patterns', slug: 'magicpatterns', description: 'AI prototyping that matches your existing product. Import your design system, generate on-brand UI, export to Figma or code.' },
  { name: 'Dazl', url: 'https://dazl.dev/?utm_source=uxtools&utm_medium=survey', label: 'AI product platform', slug: 'dazl', description: 'Dazl is the AI platform that takes your product from ideation to hand-off. Visually edit and collaborate with your team in real time at every step of the product journey.' },
]

export const sponsorsByName = Object.fromEntries(
  sponsors.map((sponsor) => [sponsor.name, sponsor]),
) as Record<string, Sponsor>

export function getSponsorByName(name: string) {
  return sponsorsByName[name]
}
