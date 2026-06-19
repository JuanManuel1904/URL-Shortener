import { useState, useEffect, useCallback } from 'react'
import { loadLinks, saveLinks } from '../utils/storage'
import { generateShortcode, validateAndNormalizeUrl } from '../utils/urlHelpers'

export function useLinks() {
  const [links, setLinks] = useState([])
  const [loaded, setLoaded] = useState(false)

  // Load from storage once on mount
  useEffect(() => {
    setLinks(loadLinks())
    setLoaded(true)
  }, [])

  // Persist whenever links change (after initial load)
  useEffect(() => {
    if (loaded) saveLinks(links)
  }, [links, loaded])

  const createLink = useCallback((rawUrl, customCode) => {
    const { valid, url, error } = validateAndNormalizeUrl(rawUrl)
    if (!valid) return { success: false, error }

    let shortcode = customCode?.trim()
    if (shortcode) {
      const taken = links.some(l => l.shortcode.toLowerCase() === shortcode.toLowerCase())
      if (taken) return { success: false, error: 'That custom code is already taken' }
      if (!/^[a-zA-Z0-9_-]{3,20}$/.test(shortcode)) {
        return { success: false, error: '3-20 characters: letters, numbers, - or _' }
      }
    } else {
      do {
        shortcode = generateShortcode()
      } while (links.some(l => l.shortcode === shortcode))
    }

    const newLink = {
      id: crypto.randomUUID(),
      shortcode,
      originalUrl: url,
      createdAt: Date.now(),
      clicks: 0,
      clickLog: [],
    }

    setLinks(prev => [newLink, ...prev])
    return { success: true, link: newLink }
  }, [links])

  const deleteLink = useCallback((id) => {
    setLinks(prev => prev.filter(l => l.id !== id))
  }, [])

  const registerClick = useCallback((id) => {
    setLinks(prev => prev.map(l =>
      l.id === id
        ? { ...l, clicks: l.clicks + 1, clickLog: [...l.clickLog, Date.now()] }
        : l
    ))
  }, [])

  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0)

  return { links, loaded, createLink, deleteLink, registerClick, totalClicks }
}
