import { useMemo } from 'react'
import { useLinks } from './hooks/useLinks'
import { useTheme } from './hooks/useTheme'
import { getTokens, fonts } from './styles/tokens'
import Header from './components/Header'
import ThemeToggle from './components/ThemeToggle'
import ShortenForm from './components/ShortenForm'
import LinkTicket from './components/LinkTicket'
import ClickChart from './components/ClickChart'
import { EmptyState, StatPill } from './components/States'

export default function App() {
  const { links, loaded, createLink, deleteLink, registerClick, totalClicks } = useLinks()
  const { theme, toggleTheme } = useTheme()
  const tokens = getTokens(theme)

  const avgClicks = useMemo(() => {
    if (links.length === 0) return '0'
    return (totalClicks / links.length).toFixed(1)
  }, [links.length, totalClicks])

  return (
    <div style={{
      minHeight: '100vh',
      background: tokens.bg,
      backgroundImage: theme === 'light'
        ? `radial-gradient(rgba(40,30,20,.04) 1px, transparent 1px)`
        : `radial-gradient(rgba(232,137,93,.05) 1px, transparent 1px)`,
      backgroundSize: '28px 28px',
      transition: 'background 0.3s ease',
    }}>
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '2.5rem 1.5rem 5rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
          <ThemeToggle theme={theme} onToggle={toggleTheme} tokens={tokens} />
        </div>

        <Header tokens={tokens} />

        <ShortenForm onCreate={createLink} tokens={tokens} />

        {!loaded ? null : links.length === 0 ? (
          <div style={{ marginTop: '2rem' }}>
            <EmptyState tokens={tokens} />
          </div>
        ) : (
          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <StatPill label="TOTAL LINKS" value={links.length} tokens={tokens} />
              <StatPill label="TOTAL CLICKS" value={totalClicks} tokens={tokens} />
              <StatPill label="AVG PER LINK" value={avgClicks} tokens={tokens} />
            </div>

            <ClickChart links={links} tokens={tokens} />

            <div>
              <p style={{
                fontFamily: fonts.mono,
                fontSize: '0.7rem',
                color: tokens.faint,
                letterSpacing: '0.1em',
                margin: '0 0 1rem 0',
              }}>
                YOUR LINKS
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {links.map(link => (
                  <LinkTicket
                    key={link.id}
                    link={link}
                    onDelete={deleteLink}
                    onVisit={registerClick}
                    tokens={tokens}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <footer style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: `1px solid ${tokens.border}`,
          textAlign: 'center',
        }}>

        </footer>
      </div>
    </div>
  )
}
