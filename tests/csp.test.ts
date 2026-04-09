import { describe, expect, it } from 'vitest'

import { buildContentSecurityPolicy, buildReportToHeader, isSensitiveDataPath, isStaticAssetPath } from '../lib/security/csp'

describe('csp helpers', () => {
  it('builds a strict production policy with a nonce and reporting', () => {
    const policy = buildContentSecurityPolicy('nonce-value', false)

    expect(policy).toContain("script-src 'self' 'nonce-nonce-value' 'strict-dynamic'")
    expect(policy).not.toContain("script-src 'self' 'unsafe-inline'")
    expect(policy).toContain('report-uri /api/v1/security/csp-report')
    expect(policy).toContain('upgrade-insecure-requests')
  })

  it('keeps development websocket and eval allowances scoped to dev', () => {
    const policy = buildContentSecurityPolicy('nonce-value', true)

    expect(policy).toContain("'unsafe-eval'")
    expect(policy).toContain('connect-src \'self\' ws: http: https:')
  })

  it('no longer blocks respondent data paths (open data)', () => {
    expect(isSensitiveDataPath('/data/responses.json')).toBe(false)
    expect(isSensitiveDataPath('/data/responses.csv')).toBe(false)
    expect(isSensitiveDataPath('/data/full-summary.json')).toBe(false)
    expect(isStaticAssetPath('/favicon.ico')).toBe(true)
    expect(isStaticAssetPath('/explore')).toBe(false)
  })

  it('publishes a report-to header for csp telemetry', () => {
    expect(buildReportToHeader()).toContain('csp-endpoint')
    expect(buildReportToHeader()).toContain('/api/v1/security/csp-report')
  })
})
