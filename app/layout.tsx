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
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
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
