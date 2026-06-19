import { fonts, radii } from '../styles/tokens'

export function EmptyState({ tokens }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 1.5rem',
      border: `1px dashed ${tokens.border}`,
      borderRadius: radii.lg,
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem', opacity: 0.6 }}>🎟️</div>
      <h3 style={{
        fontFamily: fonts.display,
        fontSize: '1.15rem',
        color: tokens.text,
        margin: '0 0 0.5rem 0',
      }}>
        No links yet
      </h3>
      <p style={{
        fontFamily: fonts.body,
        fontSize: '0.875rem',
        color: tokens.muted,
        margin: 0,
      }}>
        Shorten your first URL above to see it here.
      </p>
    </div>
  )
}

export function StatPill({ label, value, tokens }) {
  return (
    <div style={{
      background: tokens.surface,
      border: `1px solid ${tokens.border}`,
      borderRadius: radii.md,
      padding: '0.9rem 1.25rem',
      flex: 1,
      minWidth: '120px',
      boxShadow: `0 4px 16px ${tokens.shadow}`,
    }}>
      <p style={{
        fontFamily: fonts.mono,
        fontSize: '1.4rem',
        color: tokens.accent,
        margin: 0,
        lineHeight: 1,
      }}>
        {value}
      </p>
      <p style={{
        fontFamily: fonts.mono,
        fontSize: '0.65rem',
        color: tokens.faint,
        letterSpacing: '0.08em',
        margin: '0.4rem 0 0 0',
      }}>
        {label}
      </p>
    </div>
  )
}
