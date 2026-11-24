import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import FormField from './FormField'

// FormField + a button that shows / hides the password.
export default function PasswordField(props) {
  const [visible, setVisible] = useState(false)
  return (
    <FormField
      {...props}
      type={visible ? 'text' : 'password'}
      rightSlot={
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="text-slate-400 hover:text-slate-600"
        >
          {visible ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      }
    />
  )
}
