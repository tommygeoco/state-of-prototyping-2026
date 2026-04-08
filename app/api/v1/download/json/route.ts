import { loadFullSummary } from '@/lib/data/loaders'

export async function GET() {
  return Response.json(await loadFullSummary())
}
