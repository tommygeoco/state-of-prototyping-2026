import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { cacheHeaders } from '@/lib/api/headers'

export async function GET() {
  const csv = await readFile(path.join(process.cwd(), 'public', 'data', 'full-summary.csv'), 'utf8')

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="state-of-prototyping-spring-2026.csv"',
      ...cacheHeaders,
    },
  })
}
