import { createHash, timingSafeEqual } from 'node:crypto'

export const AGENT_MAX_BODY_SIZE = 4 * 1024
export const AGENT_MAX_QUESTION_LENGTH = 500
export const AGENT_RATE_LIMIT_WINDOW_MS = 60_000
export const AGENT_RATE_LIMIT_MAX_REQUESTS = 20

const MAX_TRACKED_CLIENTS = 2048
const TRUSTED_IP_PATTERN = /^[a-fA-F0-9:.]+$/
const LOCAL_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000']

export class RequestSecurityError extends Error {
  status: number
  headers: HeadersInit

  constructor(status: number, message: string, headers: HeadersInit = {}) {
    super(message)
    this.name = 'RequestSecurityError'
    this.status = status
    this.headers = headers
  }
}

type RateLimitState = {
  timestamps: number[]
  lastSeenAt: number
}

type RateLimitResult = {
  allowed: boolean
  retryAfterSeconds?: number
}

function normalizeOrigin(origin: string | null) {
  if (!origin) {
    return null
  }

  try {
    return new URL(origin).origin
  } catch {
    return null
  }
}

function normalizeRefererOrigin(referer: string | null) {
  if (!referer) {
    return null
  }

  try {
    return new URL(referer).origin
  } catch {
    return null
  }
}

function getAllowedOrigins() {
  const origins = new Set<string>()
  const configured = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://survey.uxtools.co')

  if (configured) {
    origins.add(configured)
  }

  if (process.env.NODE_ENV !== 'production') {
    for (const origin of LOCAL_ORIGINS) {
      origins.add(origin)
    }
  }

  return origins
}

function normalizeTrustedIp(rawValue: string | null) {
  if (!rawValue) {
    return null
  }

  const candidate = rawValue.split(',')[0]?.trim()
  if (!candidate || candidate.length > 64 || !TRUSTED_IP_PATTERN.test(candidate)) {
    return null
  }

  return candidate
}

function getTrustedIp(request: Request) {
  const isVercel = process.env.VERCEL === '1'
  const headerCandidates = isVercel
    ? [request.headers.get('x-forwarded-for'), request.headers.get('x-real-ip')]
    : [request.headers.get('x-real-ip')]

  if (process.env.NODE_ENV !== 'production') {
    headerCandidates.push(request.headers.get('x-forwarded-for'))
  }

  for (const value of headerCandidates) {
    const trustedIp = normalizeTrustedIp(value)
    if (trustedIp) {
      return trustedIp
    }
  }

  return null
}

function constantTimeEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return timingSafeEqual(leftBuffer, rightBuffer)
}

function getApiKeyFromRequest(request: Request) {
  const authorization = request.headers.get('authorization')
  if (authorization?.startsWith('Bearer ')) {
    return authorization.slice('Bearer '.length).trim()
  }

  return request.headers.get('x-api-key')?.trim() ?? null
}

export function isAllowedBrowserOrigin(request: Request) {
  const origin = normalizeOrigin(request.headers.get('origin'))
  if (!origin) {
    return true
  }

  return getAllowedOrigins().has(origin)
}

export function isTrustedFirstPartyRequest(request: Request) {
  const allowedOrigins = getAllowedOrigins()
  const origin = normalizeOrigin(request.headers.get('origin'))

  if (origin && allowedOrigins.has(origin)) {
    return true
  }

  const refererOrigin = normalizeRefererOrigin(request.headers.get('referer'))
  if (refererOrigin && allowedOrigins.has(refererOrigin)) {
    return true
  }

  return false
}

export function isAgentApiKeyConfigured() {
  return Boolean(process.env.AGENT_QUERY_API_KEY?.trim())
}

export function hasValidAgentApiKey(request: Request) {
  const expectedApiKey = process.env.AGENT_QUERY_API_KEY?.trim()
  if (!expectedApiKey) {
    return false
  }

  const actualApiKey = getApiKeyFromRequest(request)
  if (!actualApiKey) {
    return false
  }

  return constantTimeEquals(actualApiKey, expectedApiKey)
}

export function getAgentClientKey(request: Request) {
  const trustedIp = getTrustedIp(request) ?? 'anonymous'
  const userAgent = request.headers.get('user-agent')?.slice(0, 256) ?? 'unknown'
  const site = normalizeOrigin(request.headers.get('origin')) ?? normalizeRefererOrigin(request.headers.get('referer')) ?? 'unknown'

  return createHash('sha256')
    .update(`${trustedIp}|${site}|${userAgent}`)
    .digest('hex')
}

export class InMemorySlidingWindowRateLimiter {
  private readonly requestLog = new Map<string, RateLimitState>()

  constructor(
    private readonly maxRequests: number,
    private readonly windowMs: number,
    private readonly maxTrackedClients = MAX_TRACKED_CLIENTS,
  ) {}

  private prune(now: number) {
    for (const [clientKey, state] of this.requestLog.entries()) {
      const recent = state.timestamps.filter((timestamp) => now - timestamp < this.windowMs)

      if (recent.length === 0) {
        this.requestLog.delete(clientKey)
        continue
      }

      state.timestamps = recent
    }

    if (this.requestLog.size <= this.maxTrackedClients) {
      return
    }

    const oldest = [...this.requestLog.entries()]
      .sort((left, right) => left[1].lastSeenAt - right[1].lastSeenAt)
      .slice(0, this.requestLog.size - this.maxTrackedClients)

    for (const [clientKey] of oldest) {
      this.requestLog.delete(clientKey)
    }
  }

  check(clientKey: string): RateLimitResult {
    const now = Date.now()
    this.prune(now)

    const state = this.requestLog.get(clientKey) ?? { timestamps: [], lastSeenAt: now }
    state.timestamps = state.timestamps.filter((timestamp) => now - timestamp < this.windowMs)
    state.lastSeenAt = now

    if (state.timestamps.length >= this.maxRequests) {
      this.requestLog.set(clientKey, state)

      const oldestRelevantTimestamp = state.timestamps[0] ?? now
      const retryAfterMs = Math.max(this.windowMs - (now - oldestRelevantTimestamp), 1000)

      return {
        allowed: false,
        retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
      }
    }

    state.timestamps.push(now)
    this.requestLog.set(clientKey, state)

    return { allowed: true }
  }
}

export const agentRateLimiter = new InMemorySlidingWindowRateLimiter(
  AGENT_RATE_LIMIT_MAX_REQUESTS,
  AGENT_RATE_LIMIT_WINDOW_MS,
)

export async function readJsonBodyWithLimit<T>(request: Request, maxBytes: number) {
  const declaredLength = Number(request.headers.get('content-length'))

  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new RequestSecurityError(413, 'Request body is too large.')
  }

  if (!request.body) {
    throw new RequestSecurityError(400, 'Request body is required.')
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
      await reader.cancel('Request body is too large.')
      throw new RequestSecurityError(413, 'Request body is too large.')
    }

    rawBody += decoder.decode(value, { stream: true })
  }

  rawBody += decoder.decode()

  try {
    return JSON.parse(rawBody) as T
  } catch {
    throw new RequestSecurityError(400, 'Invalid JSON body.')
  }
}

export function requireJsonRequest(request: Request) {
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().includes('application/json')) {
    throw new RequestSecurityError(415, 'Content-Type must be application/json.')
  }
}

export function validateQuestion(question: string | undefined) {
  const trimmed = question?.trim()

  if (!trimmed) {
    throw new RequestSecurityError(400, 'A non-empty `question` field is required.')
  }

  if (trimmed.length > AGENT_MAX_QUESTION_LENGTH) {
    throw new RequestSecurityError(400, `Question must be ${AGENT_MAX_QUESTION_LENGTH} characters or fewer.`)
  }

  return trimmed
}

export function logAgentSecurityEvent(event: string, details: Record<string, string | number | boolean | null | undefined>) {
  console.warn(
    '[agent-query]',
    JSON.stringify({
      event,
      ...details,
      at: new Date().toISOString(),
    }),
  )
}
