import { noStoreHeaders } from '@/lib/api/headers'

const MAX_REPORT_SIZE = 16 * 1024

async function readBodyWithLimit(request: Request, maxBytes: number) {
  if (!request.body) {
    return ''
  }

  const reader = request.body.getReader()
  const decoder = new TextDecoder()
  let totalBytes = 0
  let rawBody = ''

  while (true) {
    const { done, value } = await reader.read()

    if (done) {
      break
    }

    totalBytes += value.byteLength
    if (totalBytes > maxBytes) {
      await reader.cancel('CSP report is too large.')
      throw new Error('too-large')
    }

    rawBody += decoder.decode(value, { stream: true })
  }

  rawBody += decoder.decode()

  return rawBody
}

export async function POST(request: Request) {
  let rawBody = ''

  try {
    rawBody = await readBodyWithLimit(request, MAX_REPORT_SIZE)
  } catch (error) {
    console.warn(
      '[csp-report]',
      JSON.stringify({
        event: error instanceof Error && error.message === 'too-large' ? 'csp-report-too-large' : 'csp-report-read-failed',
        limit: MAX_REPORT_SIZE,
        at: new Date().toISOString(),
      }),
    )
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
