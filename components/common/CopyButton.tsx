'use client'

import { useState } from 'react'

import { copyToClipboard } from '@/lib/copy'

interface CopyButtonProps {
  text: string
  label?: string
}

export function CopyButton({ text, label = 'Copy link' }: CopyButtonProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function handleCopy() {
    const ok = await copyToClipboard(text)
    setState(ok ? 'copied' : 'failed')
    window.setTimeout(() => setState('idle'), 2000)
  }

  const statusText = state === 'copied' ? 'Copied!' : state === 'failed' ? 'Copy failed' : label

  return (
    <>
      <button type="button" onClick={handleCopy} className="button-secondary">
        {statusText}
      </button>
      {state !== 'idle' && (
        <span className="sr-only" aria-live="polite">{statusText}</span>
      )}
    </>
  )
}
