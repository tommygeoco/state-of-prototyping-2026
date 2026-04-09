import type { Metadata } from 'next'
import { headers } from 'next/headers'
import type { ReactNode } from 'react'

import { inter, spaceMono } from '@/lib/fonts'

import './globals.css'

const themeInitScript = `(function () {
  var storedTheme = localStorage.getItem('theme') || 'system';
  var resolvedTheme =
    storedTheme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : storedTheme;

  if (resolvedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
})();`

export const metadata: Metadata = {
  metadataBase: new URL('https://survey.uxtools.co'),
  title: {
    default: 'State of Prototyping Spring 2026 | UX Tools',
    template: '%s | State of Prototyping 2026',
  },
  description:
    '1,478 designers told us how they actually work. 43.8% spend 50%+ of their time vibe coding. Open dataset, API, and full report.',
  openGraph: {
    title: 'State of Prototyping Spring 2026',
    description:
      '1,478 designers told us how they actually work. 43.8% spend 50%+ of their time vibe coding. Open dataset, API, and full report.',
    url: 'https://survey.uxtools.co',
    siteName: 'UX Tools',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'State of Prototyping Spring 2026',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'State of Prototyping Spring 2026',
    description:
      '1,478 designers told us how they actually work. 43.8% spend 50%+ of their time vibe coding.',
    images: ['/og-image.jpg'],
    site: '@uxtoolsco',
    creator: '@designertom',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: '/',
  },
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const nonce = (await headers()).get('x-nonce') ?? undefined

  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="ai-context" href="/agent/SURVEY_CONTEXT.md" />
      </head>
      <body>{children}</body>
    </html>
  )
}
