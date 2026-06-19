import { fonts, radii, transitions } from '../styles/tokens'

export default function ThemeToggle({ theme, onToggle, tokens }) {
  const isLight = theme === 'light'
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle light/dark theme"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: tokens.surface,
        border: `1px solid ${tokens.border}`,
        borderRadius: radii.full,
        padding: '0.45rem 0.9rem 0.45rem 0.6rem',
        cursor: 'pointer',
        fontFamily: fonts.mono,
        fontSize: '0.75rem',
        color: tokens.muted,
        transition: transitions.fast,
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = tokens.borderHover}
      onMouseLeave={e => e.currentTarget.style.borderColor = tokens.border}
    >
      <span style={{ fontSize: '1rem' }}>{isLight ? '☀️' : '🌙'}</span>
      {isLight ? 'Light' : 'Dark'}
    </button>
  )
}
