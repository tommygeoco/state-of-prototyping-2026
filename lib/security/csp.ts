const CSP_REPORT_ENDPOINT = '/api/v1/security/csp-report'

function getReportEndpointUrl() {
  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://survey.uxtools.co'

  try {
    return new URL(CSP_REPORT_ENDPOINT, siteOrigin).toString()
  } catch {
    return `https://survey.uxtools.co${CSP_REPORT_ENDPOINT}`
  }
}

function joinDirectives(directives: string[]) {
  return directives.join('; ')
}

function getScriptSrc(nonce: string, isDev: boolean) {
  const directives = ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'"]

  if (isDev) {
    directives.push("'unsafe-eval'")
  }

  return directives.join(' ')
}

export function buildContentSecurityPolicy(nonce: string, isDev: boolean) {
  return joinDirectives([
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    `script-src ${getScriptSrc(nonce, isDev)}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self'${isDev ? ' ws: http: https:' : ''}`,
    `report-uri ${CSP_REPORT_ENDPOINT}`,
    `report-to csp-endpoint`,
    ...(isDev ? [] : ['upgrade-insecure-requests']),
  ])
}

export function buildReportToHeader() {
  return JSON.stringify({
    group: 'csp-endpoint',
    max_age: 10886400,
    endpoints: [{ url: getReportEndpointUrl() }],
  })
}

export function isSensitiveDataPath(pathname: string) {
  return pathname === '/data/responses.json' || pathname === '/data/responses.csv'
}

export function isStaticAssetPath(pathname: string) {
  return /\.[a-z0-9]+$/i.test(pathname)
}
