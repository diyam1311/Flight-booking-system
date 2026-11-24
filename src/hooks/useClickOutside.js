import { useEffect } from 'react'

// Runs `onOutsideClick` when the user clicks anywhere OUTSIDE the element that `ref` points to.
// Used to close dropdowns and the calendar. `active` = false switches the listener off.
export function useClickOutside(ref, onOutsideClick, active = true) {
  useEffect(() => {
    if (!active) return
    const handleMouseDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onOutsideClick()
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [ref, onOutsideClick, active])
}
