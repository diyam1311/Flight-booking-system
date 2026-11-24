import { useEffect, useState } from 'react'
import { getHelpContent } from '../services/helpService'

// Loads the help content once and keeps it in state.
export function useHelpContent() {
  const [content, setContent] = useState({ topics: [], faqs: [], contacts: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let stopped = false // do nothing if the user already left the page
    getHelpContent().then((data) => {
      if (stopped) return
      setContent(data)
      setLoading(false)
    })
    return () => { stopped = true }
  }, [])

  return { ...content, loading }
}
