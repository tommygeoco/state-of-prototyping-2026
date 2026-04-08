import { loadVibeByRole } from '@/lib/data/loaders'
import { cacheHeaders } from '@/lib/api/headers'

export async function GET() {
  return Response.json(await loadVibeByRole(), { headers: cacheHeaders })
}
