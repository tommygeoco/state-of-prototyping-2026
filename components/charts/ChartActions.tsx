'use client'

import { useCallback, useState } from 'react'
import { toPng } from 'html-to-image'

type ActionState = 'idle' | 'copied' | 'failed'

interface ChartActionsProps {
  anchorId: string
}

async function captureNode(node: HTMLElement): Promise<string> {
  const rect = node.getBoundingClientRect()
  const w = Math.ceil(rect.width)
  const h = Math.ceil(rect.height)

  const opts = {
    pixelRatio: 2,
    width: w,
    height: h,
    style: {
      overflow: 'visible',
      margin: '0',
    } as Partial<CSSStyleDeclaration>,
    filter: (el: Element | Text) => {
      if (el instanceof HTMLElement && el.hasAttribute('data-chart-actions')) return false
      return true
    },
  }

  // First pass warms up fonts/images so the second pass is clean
  await toPng(node, opts).catch(() => {})
  return toPng(node, opts)
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

  const openPng = useCallback(async () => {
    try {
      setImgState('copied')
      const node = document.getElementById(anchorId)
      if (!node) {
        setImgState('failed')
        return
      }

      const dataUrl = await captureNode(node)

      const link = document.createElement('a')
      link.download = `${anchorId}.png`
      link.href = dataUrl
      link.click()
    } catch {
      setImgState('failed')
    }
    setTimeout(() => setImgState('idle'), 2000)
  }, [anchorId])

  const urlLabel = urlState === 'copied' ? 'Copied!' : 'Copy link to this chart'
  const imgLabel = imgState === 'copied' ? 'Downloading PNG...' : 'Download chart as PNG'

  return (
    <div className="chart-actions" data-chart-actions="">
      <button
        type="button"
        className="chart-action-btn"
        onClick={copyUrl}
        aria-label={urlLabel}
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
        aria-label={imgLabel}
      >
        {imgState === 'copied' ? <CheckIcon /> : <CameraIcon />}
        <span className="chart-action-tooltip">
          {imgState === 'copied' ? 'Downloading...' : 'Download PNG'}
        </span>
      </button>
      <span className="sr-only" aria-live="polite">
        {urlState === 'copied' ? 'Link copied to clipboard' : ''}
        {imgState === 'copied' ? 'PNG downloading' : ''}
      </span>
    </div>
  )
}

function LinkIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
