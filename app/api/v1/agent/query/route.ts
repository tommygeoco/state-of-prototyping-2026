import { noStoreHeaders } from '@/lib/api/headers'
import { routeAgentQuestion } from '@/lib/agent/router'
import {
  AGENT_MAX_BODY_SIZE,
  agentRateLimiter,
  getAgentClientKey,
  hasValidAgentApiKey,
  isAgentApiKeyConfigured,
  isAllowedBrowserOrigin,
  isTrustedFirstPartyRequest,
  logAgentSecurityEvent,
  readJsonBodyWithLimit,
  RequestSecurityError,
  requireJsonRequest,
  validateQuestion,
} from '@/lib/security/agentQuery'

function errorResponse(status: number, error: string, headers: HeadersInit = {}) {
  return Response.json(
    { error },
    {
      status,
      headers: {
        ...noStoreHeaders,
        ...headers,
      },
    },
  )
}

export async function POST(request: Request) {
  const clientKey = getAgentClientKey(request)

  if (!isAllowedBrowserOrigin(request)) {
    logAgentSecurityEvent('cross-origin-browser-request-rejected', {
      clientKey: clientKey.slice(0, 12),
      origin: request.headers.get('origin'),
    })

    return errorResponse(403, 'Cross-origin browser requests are not allowed.')
  }

  if (isAgentApiKeyConfigured() && !isTrustedFirstPartyRequest(request) && !hasValidAgentApiKey(request)) {
    logAgentSecurityEvent('integration-api-key-missing-or-invalid', {
      clientKey: clientKey.slice(0, 12),
      origin: request.headers.get('origin'),
      referer: request.headers.get('referer'),
    })

    return errorResponse(401, 'A valid API key is required for non-first-party agent requests.')
  }

  try {
    requireJsonRequest(request)

    const rateLimit = agentRateLimiter.check(clientKey)
    if (!rateLimit.allowed) {
      logAgentSecurityEvent('rate-limit-exceeded', {
        clientKey: clientKey.slice(0, 12),
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      })

      return errorResponse(429, 'Rate limit exceeded. Please try again shortly.', {
        'Retry-After': String(rateLimit.retryAfterSeconds ?? 60),
      })
    }

    const body = await readJsonBodyWithLimit<{ question?: string }>(request, AGENT_MAX_BODY_SIZE)
    const question = validateQuestion(body.question)

    return Response.json(
      await routeAgentQuestion(question),
      {
        headers: noStoreHeaders,
      },
    )
  } catch (error) {
    if (error instanceof RequestSecurityError) {
      logAgentSecurityEvent('request-rejected', {
        clientKey: clientKey.slice(0, 12),
        status: error.status,
        reason: error.message,
      })

      return errorResponse(error.status, error.message, error.headers)
    }

    logAgentSecurityEvent('unexpected-route-error', {
      clientKey: clientKey.slice(0, 12),
      reason: error instanceof Error ? error.message : 'unknown',
    })

    return errorResponse(500, 'Unable to process the agent query right now.')
  }
}
