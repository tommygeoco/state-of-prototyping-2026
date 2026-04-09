import { noStoreHeaders } from '@/lib/api/headers'

export async function GET(request: Request) {
  console.warn(
    '[security]',
    JSON.stringify({
      event: 'blocked-row-level-csv-download',
      pathname: new URL(request.url).pathname,
      at: new Date().toISOString(),
    }),
  )

  return Response.json(
    {
      error: 'Row-level response CSV downloads are no longer publicly distributed.',
      available_downloads: ['/api/v1/download/json', '/api/v1/download/csv'],
    },
    {
      status: 410,
      headers: noStoreHeaders,
    },
  )
}
