
export const fonts = {
  display: "'Fraunces', serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

export const radii = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
  full: '999px',
}

export const transitions = {
  fast: 'all .15s ease',
  base: 'all .25s ease',
}

const light = {
  bg: '#F5F1E8',
  surface: '#FFFFFF',
  surface2: '#EFE9DC',
  border: 'rgba(40,30,20,0.10)',
  borderHover: 'rgba(232,98,61,0.4)',
  accent: '#E8623D',
  accentDim: 'rgba(232,98,61,0.10)',
  accentMid: 'rgba(232,98,61,0.25)',
  accentDark: '#C44E2D',
  text: '#241F18',
  muted: '#6B6155',
  faint: '#9B8F7E',
  danger: '#C0392B',
  dangerDim: 'rgba(192,57,43,0.08)',
  warning: '#B8860B',
  shadow: 'rgba(40,30,20,0.08)',
}

const dark = {
  bg: '#15120E',
  surface: '#211C16',
  surface2: '#2B2519',
  border: 'rgba(255,250,240,0.08)',
  borderHover: 'rgba(232,140,90,0.35)',
  accent: '#E8895D',
  accentDim: 'rgba(232,137,93,0.12)',
  accentMid: 'rgba(232,137,93,0.25)',
  accentDark: '#F0A076',
  text: '#F3EDE2',
  muted: '#A89A85',
  faint: '#766B5A',
  danger: '#E57366',
  dangerDim: 'rgba(229,115,102,0.12)',
  warning: '#E0B84E',
  shadow: 'rgba(0,0,0,0.4)',
}

export function getTokens(theme) {
  return theme === 'light' ? light : dark
}
