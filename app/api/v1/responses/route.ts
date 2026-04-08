import { cacheHeaders } from '@/lib/api/headers'
import { loadResponses } from '@/lib/data/loaders'

const DEFAULT_LIMIT = 100
const MAX_LIMIT = 1478

function parseInteger(value: string | null, fallback: number) {
  if (value == null) {
    return fallback
  }

  const parsed = Number(value)
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
    return null
  }

  return parsed
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const parsedLimit = parseInteger(searchParams.get('limit'), DEFAULT_LIMIT)
  const parsedOffset = parseInteger(searchParams.get('offset'), 0)

  if (parsedLimit == null || parsedOffset == null) {
    return Response.json(
      { error: '`limit` and `offset` must be integers.' },
      { status: 400, headers: cacheHeaders },
    )
  }

  if (parsedLimit < 1 || parsedOffset < 0) {
    return Response.json(
      { error: '`limit` must be at least 1 and `offset` cannot be negative.' },
      { status: 400, headers: cacheHeaders },
    )
  }

  const limit = Math.min(parsedLimit, MAX_LIMIT)
  const offset = parsedOffset
  const all = await loadResponses()

  const page = all.slice(offset, offset + limit)

  return Response.json(
    {
      total: all.length,
      limit,
      offset,
      count: page.length,
      data: page,
    },
    { headers: cacheHeaders },
  )
}
