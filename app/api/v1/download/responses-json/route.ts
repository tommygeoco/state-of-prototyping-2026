import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { cacheHeaders } from '@/lib/api/headers'

export async function GET() {
  console.info(
    '[telemetry]',
    JSON.stringify({
      event: 'responses-json-download',
      at: new Date().toISOString(),
    }),
  )

  const json = await readFile(path.join(process.cwd(), 'public', 'data', 'responses.json'), 'utf8')

  return new Response(json, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': 'attachment; filename="state-of-prototyping-spring-2026-responses.json"',
      ...cacheHeaders,
    },
  })
}
