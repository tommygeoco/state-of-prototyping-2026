'use client'

import { useCallback, useState } from 'react'
import { toPng } from 'html-to-image'

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

  const captureImage = useCallback(() => {
    const node = document.getElementById(anchorId)
    if (!node) return

    const SIZE = 1080

    async function render(): Promise<Blob> {
      const clone = node!.cloneNode(true) as HTMLElement
      clone.removeAttribute('id')
      clone.style.cssText = [
        `position:fixed; left:-9999px; top:0`,
        `width:${SIZE}px; height:${SIZE}px`,
        `margin:0; border-radius:24px`,
        `pointer-events:none; z-index:-1`,
        `overflow:hidden`,
      ].join(';')
      clone.querySelectorAll('[data-chart-actions]').forEach((el) => el.remove())
      document.body.appendChild(clone)

      try {
        const dataUrl = await toPng(clone, {
          width: SIZE,
          height: SIZE,
          pixelRatio: 2,
          cacheBust: true,
        })
        const res = await fetch(dataUrl)
        return await res.blob()
      } finally {
        clone.remove()
      }
    }

    const blobPromise = render()

    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      navigator.clipboard
        .write([new ClipboardItem({ 'image/png': blobPromise })])
        .then(() => setImgState('copied'))
        .catch((err) => {
          console.error('[ChartActions] clipboard.write failed:', err)
          blobPromise.then(downloadFallback).catch(() => setImgState('failed'))
        })
        .finally(() => setTimeout(() => setImgState('idle'), 2000))
    } else {
      blobPromise
        .then(downloadFallback)
        .then(() => setImgState('copied'))
        .catch((err) => {
          console.error('[ChartActions] capture failed:', err)
          setImgState('failed')
        })
        .finally(() => setTimeout(() => setImgState('idle'), 2000))
    }

    function downloadFallback(blob: Blob) {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${anchorId}.png`
      a.click()
      URL.revokeObjectURL(url)
    }
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
        onClick={captureImage}
        aria-label={imgState === 'copied' ? 'Copied!' : 'Copy chart image to clipboard'}
      >
        {imgState === 'copied' ? <CheckIcon /> : <CameraIcon />}
        <span className="chart-action-tooltip">
          {imgState === 'copied' ? 'Copied!' : 'Copy image'}
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
