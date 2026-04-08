import { routeAgentQuestion } from '@/lib/agent/router'

const MAX_BODY_SIZE = 4096
const MAX_QUESTION_LENGTH = 500
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 30
const requestLog = new Map<string, number[]>()

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  return forwardedFor?.split(',')[0]?.trim() || realIp || 'anonymous'
}

function isRateLimited(clientKey: string) {
  const now = Date.now()
  const recent = (requestLog.get(clientKey) ?? []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(clientKey, recent)
    return true
  }

  recent.push(now)
  requestLog.set(clientKey, recent)
  return false
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_SIZE) {
    return Response.json({ error: 'Request body is too large.' }, { status: 413 })
  }

  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().includes('application/json')) {
    return Response.json({ error: 'Content-Type must be application/json.' }, { status: 415 })
  }

  const clientKey = getClientKey(request)
  if (isRateLimited(clientKey)) {
    return Response.json({ error: 'Rate limit exceeded. Please try again shortly.' }, { status: 429 })
  }

  let body: { question?: string }

  try {
    const rawBody = await request.text()
    if (rawBody.length > MAX_BODY_SIZE) {
      return Response.json({ error: 'Request body is too large.' }, { status: 413 })
    }

    body = JSON.parse(rawBody) as { question?: string }
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const question = body.question?.trim()

  if (!question) {
    return Response.json({ error: 'A non-empty `question` field is required.' }, { status: 400 })
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return Response.json(
      { error: `Question must be ${MAX_QUESTION_LENGTH} characters or fewer.` },
      { status: 400 },
    )
  }

  return Response.json(await routeAgentQuestion(question))
}
