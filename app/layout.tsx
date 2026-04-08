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
  metadataBase: new URL('https://data.prototypingstate.com'),
  title: {
    default: 'State of Prototyping 2026 Open Dataset',
    template: '%s · State of Prototyping 2026',
  },
  description:
    'Open survey dataset, charts, API routes, and agent-ready context for State of Prototyping Spring 2026.',
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="ai-context" href="/agent/SURVEY_CONTEXT.md" />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
