import { loadFullSummary } from '@/lib/data/loaders'
import { cacheHeaders } from '@/lib/api/headers'

export async function GET() {
  return Response.json(await loadFullSummary(), { headers: cacheHeaders })
}
