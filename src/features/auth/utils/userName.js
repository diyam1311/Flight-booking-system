// Name helpers (Avatar, UserMenu, Navbar).

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

// "kumar suraj" -> "Kumar"
// Safe if the name is missing: never expose an email or login identifier as a name.
export const getFirstName = (user) => {
  const name = typeof user?.name === 'string' ? user.name.trim() : ''
  const first = name && !name.includes('@') && !/^\+?[\d\s()-]+$/.test(name)
    ? name.split(/\s+/)[0]
    : ''
  return first ? capitalize(first) : 'User'
}
