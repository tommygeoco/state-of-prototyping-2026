'use client'

import { useCallback, useState } from 'react'

type ActionState = 'idle' | 'copied' | 'failed'

interface ChartActionsProps {
  anchorId: string
}

export function ChartActions({ anchorId }: ChartActionsProps) {
  const [urlState, setUrlState] = useState<ActionState>('idle')
  const [imgState, setImgState] = useState<ActionState>('idle')

  const copyUrl = useCallback(async () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${anchorId}`
      await navigator.clipboard.writeText(url)
      setUrlState('copied')
    } catch {
      setUrlState('failed')
    }
    setTimeout(() => setUrlState('idle'), 2000)
  }, [anchorId])

  const openPng = useCallback(() => {
    try {
      const node = document.getElementById(anchorId)
      const rect = node?.getBoundingClientRect()
      const params = new URLSearchParams()
      if (rect) {
        params.set('w', Math.round(rect.width).toString())
        params.set('h', Math.round(rect.height).toString())
      }
      const pngUrl = `${window.location.origin}/social/png/${anchorId}${params.size ? `?${params.toString()}` : ''}`
      window.open(pngUrl, '_blank')
      setImgState('copied')
    } catch {
      setImgState('failed')
    }
    setTimeout(() => setImgState('idle'), 2000)
  }, [anchorId])

  return (
    <div className="chart-actions" data-chart-actions="">
      <button
        type="button"
        className="chart-action-btn"
        onClick={copyUrl}
        aria-label={urlState === 'copied' ? 'Copied!' : 'Copy link to this chart'}
      >
        {urlState === 'copied' ? <CheckIcon /> : <LinkIcon />}
        <span className="chart-action-tooltip">
          {urlState === 'copied' ? 'Copied!' : 'Copy link'}
        </span>
      </button>
      <button
        type="button"
        className="chart-action-btn"
        onClick={openPng}
        aria-label={imgState === 'copied' ? 'Opened PNG!' : 'Open chart PNG in a new tab'}
      >
        {imgState === 'copied' ? <CheckIcon /> : <CameraIcon />}
        <span className="chart-action-tooltip">
          {imgState === 'copied' ? 'Opened PNG!' : 'Copy PNG'}
        </span>
      </button>
    </div>
  )
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
