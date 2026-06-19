import { useState } from 'react'
import { fonts, radii, transitions } from '../styles/tokens'
import { truncateUrl, getHostname } from '../utils/urlHelpers'

function Barcode({ tokens }) {
  const bars = Array.from({ length: 28 }, (_, i) => (i * 37) % 4 + 1)
  return (
    <div style={{ display: 'flex', gap: '2px', height: '28px', alignItems: 'stretch' }}>
      {bars.map((w, i) => (
        <div
          key={i}
          style={{
            width: `${w}px`,
            background: i % 5 === 0 ? tokens.accent : tokens.faint,
            opacity: i % 5 === 0 ? 0.9 : 0.35,
          }}
        />
      ))}
    </div>
  )
}

export default function LinkTicket({ link, onDelete, onVisit, tokens }) {
  const [copied, setCopied] = useState(false)
  const shortUrl = `shrt.ly/${link.shortcode}`

  function handleCopy() {
    navigator.clipboard.writeText(`https://${shortUrl}`).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  function handleVisit() {
    onVisit(link.id)
    window.open(link.originalUrl, '_blank', 'noopener,noreferrer')
  }

  const date = new Date(link.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })

  return (
    <div
      style={{
        background: tokens.surface,
        border: `1px solid ${tokens.border}`,
        borderRadius: radii.lg,
        overflow: 'hidden',
        animation: 'scaleIn 0.3s ease',
        transition: transitions.base,
        boxShadow: `0 4px 16px ${tokens.shadow}`,
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = tokens.borderHover}
      onMouseLeave={e => e.currentTarget.style.borderColor = tokens.border}
    >
      <div style={{
        height: '3px',
        background: `repeating-linear-gradient(90deg, ${tokens.accent} 0 8px, transparent 8px 14px)`,
        opacity: 0.5,
      }} />

      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem', gap: '1rem' }}>
          <div>
            <p style={{
              fontFamily: fonts.mono,
              fontSize: '0.7rem',
              color: tokens.faint,
              letterSpacing: '0.08em',
              margin: '0 0 0.3rem 0',
            }}>
              SHORT LINK
            </p>
            <button
              onClick={handleVisit}
              style={{
                fontFamily: fonts.display,
                fontSize: '1.2rem',
                fontWeight: 600,
                color: tokens.accent,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                textAlign: 'left',
              }}
            >
              {shortUrl} <span style={{ fontSize: '0.85rem' }}>↗</span>
            </button>
          </div>

          <button
            onClick={() => onDelete(link.id)}
            aria-label="Delete link"
            style={{
              background: tokens.dangerDim,
              color: tokens.danger,
              border: 'none',
              borderRadius: radii.sm,
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              flexShrink: 0,
              transition: transitions.fast,
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            ✕
          </button>
        </div>

        <p style={{
          fontFamily: fonts.body,
          fontSize: '0.85rem',
          color: tokens.muted,
          margin: '0 0 1rem 0',
          wordBreak: 'break-all',
        }} title={link.originalUrl}>
          {truncateUrl(link.originalUrl)}
        </p>

        <div style={{
          borderTop: `1px dashed ${tokens.border}`,
          margin: '0 -1.5rem',
        }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: fonts.mono, fontSize: '1.1rem', color: tokens.text, margin: 0, lineHeight: 1 }}>
                {link.clicks}
              </p>
              <p style={{ fontFamily: fonts.mono, fontSize: '0.65rem', color: tokens.faint, margin: '2px 0 0 0', letterSpacing: '0.06em' }}>
                {link.clicks === 1 ? 'CLICK' : 'CLICKS'}
              </p>
            </div>
            <div style={{ width: '1px', height: '24px', background: tokens.border }} />
            <div>
              <p style={{ fontFamily: fonts.mono, fontSize: '0.8rem', color: tokens.muted, margin: 0 }}>
                {getHostname(link.originalUrl)}
              </p>
              <p style={{ fontFamily: fonts.mono, fontSize: '0.65rem', color: tokens.faint, margin: '2px 0 0 0', letterSpacing: '0.06em' }}>
                {date.toUpperCase()}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            style={{
              fontFamily: fonts.mono,
              fontSize: '0.75rem',
              color: copied ? tokens.bg : tokens.accent,
              background: copied ? tokens.accent : tokens.accentDim,
              border: `1px solid ${tokens.accentMid}`,
              borderRadius: radii.sm,
              padding: '0.45rem 0.85rem',
              cursor: 'pointer',
              transition: transitions.fast,
              fontWeight: copied ? 600 : 400,
            }}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        <div style={{ marginTop: '1.25rem', opacity: 0.8 }}>
          <Barcode tokens={tokens} />
        </div>
      </div>
    </div>
  )
}
