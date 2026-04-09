import { loadFullSummary } from '@/lib/data/loaders'
import { cacheHeaders } from '@/lib/api/headers'

export async function GET() {
  console.info(
    '[telemetry]',
    JSON.stringify({
      event: 'summary-json-download',
      at: new Date().toISOString(),
    }),
  )

  return Response.json(await loadFullSummary(), { headers: cacheHeaders })
}
