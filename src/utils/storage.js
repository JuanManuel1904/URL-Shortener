const STORAGE_KEY = 'url-shortener:links'

/**
 * Shape of a stored link:
 * {
 *   id: string,
 *   shortcode: string,
 *   originalUrl: string,
 *   createdAt: number (timestamp),
 *   clicks: number,
 *   clickLog: number[] (timestamps of each click, for analytics)
 * }
 */

export function loadLinks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveLinks(links) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links))
    return true
  } catch {
    return false
  }
}

export function clearLinks() {
  localStorage.removeItem(STORAGE_KEY)
}
