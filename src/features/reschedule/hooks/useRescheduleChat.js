import { useCallback, useEffect, useState } from 'react'
import { sendChatMessage } from '../services/rescheduleService'
import { nowTime } from '../utils/format'

// The messages of the chat in step 2.  session = what startRescheduleChat() returned (null before step 2).
//   messages : [{ id, from: 'user' | 'agent' | 'notice', ... }]      typing : the agent is writing
//   send(text) : adds the user's message, then the agent's answer when it arrives
export function useRescheduleChat(session) {
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)

  // a new chat started -> show its first messages
  useEffect(() => { setMessages(session?.messages ?? []) }, [session])

  const send = useCallback(async (text) => {
    const clean = text.trim()
    if (!clean || !session) return
    setMessages((list) => [...list, { id: `you-${Date.now()}`, from: 'user', time: nowTime(), author: 'You', text: clean }])
    setTyping(true)
    try {
      const reply = await sendChatMessage(session.id, clean)
      setMessages((list) => [...list, reply])
    } catch {
      setMessages((list) => [...list, { id: `err-${Date.now()}`, from: 'agent', author: 'System', time: nowTime(), text: 'Your message could not be sent. Please try again.' }])
    } finally {
      setTyping(false)
    }
  }, [session])

  return { messages, typing, send }
}
