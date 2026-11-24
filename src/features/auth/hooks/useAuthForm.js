import { useState } from 'react'

// The state both the Login and Signup forms need: values, messages, loading.
//   initialValues : starting values, e.g. { email: '', password: '' }  (a checkbox starts as false)
//   validate(form): returns { fieldName: 'message' }  (empty object = all good)
//   onSubmit(form): the real work (log in / sign up). If it throws, the message is shown to the user.
// Every input must have a "name" that matches a key of initialValues.
export default function useAuthForm({ initialValues, validate, onSubmit }) {
  const [form, setForm] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  // one handler for every input: uses the input's "name" to know which field changed
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setLoading(true)
    try {
      await onSubmit(form)
      // success: GuestRoute sees you are logged in and sends you on (to the page you wanted, or home)
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { form, errors, serverError, loading, handleChange, handleSubmit }
}
