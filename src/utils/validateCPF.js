exports.validateCPF = (value) => {
  if (!value) return false

  const cleanValue = value.replace(/[^\d]+/g, '')
  if (cleanValue.length !== 11) return false

  if (/^(\d)\1+$/.test(cleanValue)) return false

  let sum = 0
  let remainder

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanValue.substring(i - 1, i), 10) * (11 - i)
  }

  remainder = (sum * 10) % 11

  if ((remainder === 10) || (remainder === 11)) remainder = 0
  if (remainder !== parseInt(cleanValue.substring(9, 10), 10)) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanValue.substring(i - 1, i), 10) * (12 - i)
  }

  remainder = (sum * 10) % 11

  if ((remainder === 10) || (remainder === 11)) remainder = 0
  if (remainder !== parseInt(cleanValue.substring(10, 11), 10)) return false

  return true
}