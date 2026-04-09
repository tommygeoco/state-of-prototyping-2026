import { noStoreHeaders } from '@/lib/api/headers'

const MAX_REPORT_SIZE = 16 * 1024

export async function POST(request: Request) {
  let rawBody = ''

  try {
    rawBody = await request.text()
  } catch {
    return new Response(null, { status: 204, headers: noStoreHeaders })
  }

  if (rawBody.length > MAX_REPORT_SIZE) {
    console.warn('[csp-report]', JSON.stringify({ event: 'csp-report-too-large', size: rawBody.length, at: new Date().toISOString() }))
    return new Response(null, { status: 204, headers: noStoreHeaders })
  }

  let report: unknown = rawBody
  try {
    report = JSON.parse(rawBody)
  } catch {
    // Some browsers still send legacy report formats.
  }

  console.warn(
    '[csp-report]',
    JSON.stringify({
      event: 'csp-violation',
      report,
      at: new Date().toISOString(),
    }),
  )

  return new Response(null, { status: 204, headers: noStoreHeaders })
}
