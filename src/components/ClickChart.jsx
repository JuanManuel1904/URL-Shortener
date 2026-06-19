import { fonts, radii } from '../styles/tokens'

const DAY_MS = 24 * 60 * 60 * 1000

function buildLast7Days(links) {
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  const startOfToday = today.getTime() - DAY_MS + 1

  const days = Array.from({ length: 7 }, (_, i) => {
    const dayStart = startOfToday - (6 - i) * DAY_MS
    const dayEnd = dayStart + DAY_MS - 1
    const label = new Date(dayStart).toLocaleDateString('en-US', { weekday: 'short' })
    return { dayStart, dayEnd, label, count: 0 }
  })

  links.forEach(link => {
    link.clickLog.forEach(ts => {
      const day = days.find(d => ts >= d.dayStart && ts <= d.dayEnd)
      if (day) day.count++
    })
  })

  return days
}

export default function ClickChart({ links, tokens }) {
  const days = buildLast7Days(links)
  const maxCount = Math.max(...days.map(d => d.count), 1)

  return (
    <div style={{
      background: tokens.surface,
      border: `1px solid ${tokens.border}`,
      borderRadius: radii.lg,
      padding: '1.5rem',
      boxShadow: `0 4px 16px ${tokens.shadow}`,
    }}>
      <p style={{
        fontFamily: fonts.mono,
        fontSize: '0.7rem',
        color: tokens.faint,
        letterSpacing: '0.1em',
        margin: '0 0 1.25rem 0',
      }}>
        CLICKS · LAST 7 DAYS
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '0.6rem',
        height: '90px',
      }}>
        {days.map((d, i) => {
          const heightPct = (d.count / maxCount) * 100
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', height: '100%' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                <div
                  title={`${d.count} click${d.count === 1 ? '' : 's'}`}
                  style={{
                    width: '100%',
                    height: `${Math.max(heightPct, d.count > 0 ? 6 : 2)}%`,
                    background: d.count > 0
                      ? `linear-gradient(to top, ${tokens.accent}, ${tokens.accentMid})`
                      : tokens.surface2,
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.4s ease',
                  }}
                />
              </div>
              <span style={{ fontFamily: fonts.mono, fontSize: '0.65rem', color: tokens.faint }}>
                {d.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
