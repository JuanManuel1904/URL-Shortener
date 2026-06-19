const SHORTCODE_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const SHORTCODE_LENGTH = 6

/**
 * Generates a random alphanumeric shortcode, e.g. "aZ3kP9"
 */
export function generateShortcode(length = SHORTCODE_LENGTH) {
  let code = ''
  for (let i = 0; i < length; i++) {
    code += SHORTCODE_CHARS[Math.floor(Math.random() * SHORTCODE_CHARS.length)]
  }
  return code
}

/**
 * Validates a URL string. Auto-prepends https:// if no protocol given.
 * Returns { valid: boolean, url: string | null, error: string | null }
 */
export function validateAndNormalizeUrl(input) {
  const trimmed = input.trim()

  if (!trimmed) {
    return { valid: false, url: null, error: 'URL is required' }
  }

  // Prepend protocol if missing
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`

  try {
    const parsed = new URL(candidate)
    // Require at least one dot in hostname (basic sanity check)
    if (!parsed.hostname.includes('.')) {
      return { valid: false, url: null, error: 'Enter a valid domain' }
    }
    return { valid: true, url: parsed.href, error: null }
  } catch {
    return { valid: false, url: null, error: 'That doesn\'t look like a valid URL' }
  }
}

/**
 * Truncates a long URL for display purposes.
 */
export function truncateUrl(url, maxLength = 42) {
  if (url.length <= maxLength) return url
  return `${url.slice(0, maxLength - 3)}...`
}

/**
 * Extracts a clean hostname for display, e.g. "github.com"
 */
export function getHostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
