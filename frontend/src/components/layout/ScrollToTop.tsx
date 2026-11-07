import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Revenir en haut lorsqu'une nouvelle page est ouverte. */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
