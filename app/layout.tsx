import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { SiteShell } from '@/components/layout/SiteShell'
import { inter, spaceMono } from '@/lib/fonts'

import './globals.css'

const themeScript = `
(function(){
  var t = localStorage.getItem('theme') || 'system';
  var d = t === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    : t;
  if (d === 'dark') document.documentElement.classList.add('dark');
})();
`

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="ai-context" href="/agent/SURVEY_CONTEXT.md" />
        <script dangerouslySetInnerHTML={{ __html: `
/*

  ██    ██ ██   ██   ████████  ██████   ██████  ██      ███████
  ██    ██  ██ ██       ██    ██    ██ ██    ██ ██      ██
  ██    ██   ███        ██    ██    ██ ██    ██ ██      ███████
  ██    ██  ██ ██       ██    ██    ██ ██    ██ ██           ██
   ██████  ██   ██      ██     ██████   ██████  ███████ ███████

  State of Prototyping · Spring 2026
  1,478 designers · 18 regions · CC BY 4.0

  survey.uxtools.co
  Built by UX Tools

  API:    survey.uxtools.co/api/v1/responses
  Agent:  survey.uxtools.co/agent/SURVEY_CONTEXT.md
  Data:   survey.uxtools.co/api/v1/download/responses-csv

*/
` }} />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
