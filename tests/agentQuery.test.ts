import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  AGENT_MAX_QUESTION_LENGTH,
  AGENT_RATE_LIMIT_WINDOW_MS,
  InMemorySlidingWindowRateLimiter,
  hasValidAgentApiKey,
  isAllowedBrowserOrigin,
  isTrustedFirstPartyRequest,
  readJsonBodyWithLimit,
  RequestSecurityError,
  validateQuestion,
} from '../lib/security/agentQuery'

describe('agentQuery security helpers', () => {
  afterEach(() => {
    delete process.env.AGENT_QUERY_API_KEY
    delete process.env.NEXT_PUBLIC_SITE_URL
    vi.useRealTimers()
  })

  it('rejects oversized chunked bodies before JSON parsing completes', async () => {
    const payload = `{"question":"${'x'.repeat(5000)}"}`
    const request = new Request('https://survey.uxtools.co/api/v1/agent/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(payload))
          controller.close()
        },
      }),
      duplex: 'half',
    } as RequestInit & { duplex: 'half' })

    await expect(readJsonBodyWithLimit<{ question: string }>(request, 1024)).rejects.toMatchObject({
      status: 413,
    })
  })

  it('blocks invalid browser origins and allows configured first-party requests', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://survey.uxtools.co'

    const crossOriginRequest = new Request('https://survey.uxtools.co/api/v1/agent/query', {
      method: 'POST',
      headers: {
        origin: 'https://evil.example',
      },
    })

    const firstPartyRequest = new Request('https://survey.uxtools.co/api/v1/agent/query', {
      method: 'POST',
      headers: {
        origin: 'https://survey.uxtools.co',
        referer: 'https://survey.uxtools.co/agent',
      },
    })

    expect(isAllowedBrowserOrigin(crossOriginRequest)).toBe(false)
    expect(isAllowedBrowserOrigin(firstPartyRequest)).toBe(true)
    expect(isTrustedFirstPartyRequest(firstPartyRequest)).toBe(true)
  })

  it('accepts only matching API keys', () => {
    process.env.AGENT_QUERY_API_KEY = 'super-secret'

    const validRequest = new Request('https://survey.uxtools.co/api/v1/agent/query', {
      method: 'POST',
      headers: {
        authorization: 'Bearer super-secret',
      },
    })

    const invalidRequest = new Request('https://survey.uxtools.co/api/v1/agent/query', {
      method: 'POST',
      headers: {
        'x-api-key': 'wrong-secret',
      },
    })

    expect(hasValidAgentApiKey(validRequest)).toBe(true)
    expect(hasValidAgentApiKey(invalidRequest)).toBe(false)
  })

  it('rate limits repeated requests within the active window', () => {
    vi.useFakeTimers()

    const limiter = new InMemorySlidingWindowRateLimiter(2, AGENT_RATE_LIMIT_WINDOW_MS)
    expect(limiter.check('client-1').allowed).toBe(true)
    expect(limiter.check('client-1').allowed).toBe(true)

    const blocked = limiter.check('client-1')
    expect(blocked.allowed).toBe(false)
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0)
  })

  it('validates non-empty questions and length limits', () => {
    expect(validateQuestion('  Which role vibes the most?  ')).toBe('Which role vibes the most?')

    expect(() => validateQuestion('')).toThrow(RequestSecurityError)
    expect(() => validateQuestion('x'.repeat(AGENT_MAX_QUESTION_LENGTH + 1))).toThrow(RequestSecurityError)
  })
})
