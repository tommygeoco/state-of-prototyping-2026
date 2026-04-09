import { noStoreHeaders } from '@/lib/api/headers'

export async function GET(request: Request) {
  console.warn(
    '[security]',
    JSON.stringify({
      event: 'blocked-row-level-api-access',
      pathname: new URL(request.url).pathname,
      at: new Date().toISOString(),
    }),
  )

  return Response.json(
    {
      error: 'Row-level response data is no longer publicly distributed.',
      available_endpoints: [
        '/api/v1/download/json',
        '/api/v1/download/csv',
        '/api/v1/stats/headline',
        '/api/v1/stats/tools',
        '/api/v1/stats/vibe-by-role',
        '/api/v1/stats/satisfaction',
        '/api/v1/stats/outlook',
      ],
    },
    { status: 410, headers: noStoreHeaders },
  )
}
