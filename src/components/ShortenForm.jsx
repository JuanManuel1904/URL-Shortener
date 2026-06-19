import { useState } from 'react'
import { fonts, radii, transitions } from '../styles/tokens'

export default function ShortenForm({ onCreate, tokens }) {
  const [url, setUrl] = useState('')
  const [customCode, setCustomCode] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const [error, setError] = useState(null)
  const [focused, setFocused] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!url.trim()) {
      setError('Paste a URL to shorten')
      return
    }

    setSubmitting(true)
    const result = onCreate(url, showCustom ? customCode : null)
    setSubmitting(false)

    if (!result.success) {
      setError(result.error)
      return
    }

    setUrl('')
    setCustomCode('')
    setShowCustom(false)
  }

  const inputBaseStyle = {
    width: '100%',
    background: tokens.surface2,
    border: `1px solid ${tokens.border}`,
    borderRadius: radii.md,
    padding: '0.85rem 1rem',
    color: tokens.text,
    fontFamily: fonts.body,
    fontSize: '0.95rem',
    outline: 'none',
    transition: transitions.fast,
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: tokens.surface,
        border: `1px solid ${tokens.border}`,
        borderRadius: radii.lg,
        padding: '1.75rem',
        boxShadow: `0 4px 16px ${tokens.shadow}`,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <label
          htmlFor="url-input"
          style={{
            fontFamily: fonts.mono,
            fontSize: '0.7rem',
            color: tokens.faint,
            letterSpacing: '0.1em',
          }}
        >
          PASTE YOUR LONG URL
        </label>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onFocus={() => setFocused('url')}
            onBlur={() => setFocused(null)}
            placeholder="https://example.com/a-very-long-path/to-shorten"
            style={{
              ...inputBaseStyle,
              flex: '1 1 280px',
              borderColor: focused === 'url' ? tokens.accent : tokens.border,
              boxShadow: focused === 'url' ? `0 0 0 3px ${tokens.accentDim}` : 'none',
            }}
          />
          <button
            type="submit"
            disabled={submitting}
            style={{
              background: tokens.accent,
              color: tokens.bg,
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: '0.95rem',
              padding: '0.85rem 1.75rem',
              borderRadius: radii.md,
              border: 'none',
              cursor: submitting ? 'wait' : 'pointer',
              opacity: submitting ? 0.7 : 1,
              transition: transitions.fast,
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = tokens.accentDark }}
            onMouseLeave={e => { e.currentTarget.style.background = tokens.accent }}
          >
            Shorten →
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowCustom(s => !s)}
          style={{
            alignSelf: 'flex-start',
            background: 'none',
            border: 'none',
            color: tokens.muted,
            fontFamily: fonts.mono,
            fontSize: '0.75rem',
            cursor: 'pointer',
            padding: '0.25rem 0',
            marginTop: '0.25rem',
            transition: transitions.fast,
          }}
          onMouseEnter={e => e.currentTarget.style.color = tokens.accent}
          onMouseLeave={e => e.currentTarget.style.color = tokens.muted}
        >
          {showCustom ? '− Hide custom alias' : '+ Customize your link'}
        </button>

        {showCustom && (
          <div style={{ animation: 'fadeInUp 0.2s ease', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              <span style={{
                fontFamily: fonts.mono,
                fontSize: '0.85rem',
                color: tokens.faint,
                background: tokens.surface2,
                border: `1px solid ${tokens.border}`,
                borderRight: 'none',
                borderRadius: `${radii.md} 0 0 ${radii.md}`,
                padding: '0.7rem 0.85rem',
              }}>
                shrt.ly/
              </span>
              <input
                type="text"
                value={customCode}
                onChange={e => setCustomCode(e.target.value)}
                onFocus={() => setFocused('code')}
                onBlur={() => setFocused(null)}
                placeholder="my-link"
                style={{
                  ...inputBaseStyle,
                  borderRadius: `0 ${radii.md} ${radii.md} 0`,
                  fontFamily: fonts.mono,
                  borderColor: focused === 'code' ? tokens.accent : tokens.border,
                  boxShadow: focused === 'code' ? `0 0 0 3px ${tokens.accentDim}` : 'none',
                }}
              />
            </div>
          </div>
        )}

        {error && (
          <p style={{
            color: tokens.danger,
            fontSize: '0.825rem',
            fontFamily: fonts.body,
            margin: 0,
            animation: 'fadeInUp 0.2s ease',
          }}>
            {error}
          </p>
        )}
      </div>
    </form>
  )
}
