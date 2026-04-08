import { loadTools } from '@/lib/data/loaders'

export async function GET() {
  return Response.json(await loadTools())
}
