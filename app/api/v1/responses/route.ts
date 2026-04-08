import { readFile } from 'node:fs/promises'
import path from 'node:path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Math.min(Number(searchParams.get('limit') ?? 100), 1478)
  const offset = Math.max(Number(searchParams.get('offset') ?? 0), 0)

  const raw = await readFile(path.join(process.cwd(), 'public', 'data', 'responses.json'), 'utf8')
  const all = JSON.parse(raw) as Record<string, string>[]

  const page = all.slice(offset, offset + limit)

  return Response.json({
    total: all.length,
    limit,
    offset,
    count: page.length,
    data: page,
  })
}
