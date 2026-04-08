'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

export function AgentQueryPlayground() {
  const [question, setQuestion] = useState('Which role has the highest vibe coding adoption?')
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/v1/agent/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(JSON.stringify({ error: 'Request failed', detail: String(error) }, null, 2))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        border: '1px solid var(--border-card)',
        borderRadius: 8,
        background: 'var(--bg-card)',
        overflow: 'hidden',
      }}
    >
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={2}
          style={{
            width: '100%',
            display: 'block',
            padding: '16px 20px',
            border: 'none',
            borderBottom: '1px solid var(--border-grid)',
            background: 'transparent',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            lineHeight: '22px',
            color: 'var(--text-primary)',
            resize: 'vertical',
            outline: 'none',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            borderBottom: '1px solid var(--border-grid)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-data)',
              fontSize: 11,
              color: 'var(--text-secondary)',
            }}
          >
            POST /api/v1/agent/query
          </span>
          <Button type="submit" size="sm" disabled={loading}>
            {loading ? 'Querying…' : 'Run'}
          </Button>
        </div>
      </form>
      {result ? (
        <pre
          style={{
            padding: '16px 20px',
            margin: 0,
            fontFamily: 'var(--font-data)',
            fontSize: 12,
            lineHeight: '18px',
            color: 'var(--text-body)',
            overflow: 'auto',
            maxHeight: 300,
            background: 'var(--bg-callout)',
          }}
        >
          <code>{result}</code>
        </pre>
      ) : null}
    </div>
  )
}
