'use client'

import { useState } from 'react'

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
        headers: {
          'Content-Type': 'application/json',
        },
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
    <div className="rounded-lg border border-border bg-card px-6 py-6">
      <div className="font-display text-sm uppercase tracking-[0.12em] text-text-primary">
        Natural Language Query
      </div>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          className="min-h-[120px] w-full rounded-md border border-border bg-[var(--bg-card-inner)] px-4 py-3 text-sm leading-6 text-text-body outline-none focus:border-text-secondary"
        />
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="button-primary" disabled={loading}>
            {loading ? 'Querying…' : 'Run query'}
          </button>
          <div className="text-sm text-text-secondary">POST /api/v1/agent/query</div>
        </div>
      </form>
      <div className="mt-5">
        <pre className="code-block">
          <code>{result || '{ "question": "Which role vibes the most?" }'}</code>
        </pre>
      </div>
    </div>
  )
}
