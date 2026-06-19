import { fonts } from '../styles/tokens'

export default function Header({ tokens }) {
  return (
    <header style={{ marginBottom: '2.5rem', position: 'relative' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        marginBottom: '1rem',
      }}>
      </div>

     <h1
      style={{
        fontFamily: fonts.display,
        fontWeight: 600,
        fontSize: 'clamp(1.85rem, 5vw, 2.6rem)',
        letterSpacing: '-0.01em',
        color: tokens.text,
        margin: '0 0 0.6rem 0',
        lineHeight: 1.15,
        textAlign: 'center',
      }}
    >
      Shorten links<br />
    </h1>


    </header>
  )
}
