export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePostalCode = (code: string, country: string): boolean => {
  if (country === 'US') return /^\d{5}(-\d{4})?$/.test(code)
  if (country === 'CA') return /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i.test(code)
  return code.length > 3
}
