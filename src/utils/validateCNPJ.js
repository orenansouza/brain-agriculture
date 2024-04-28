exports.validateCNPJ = (value) => {
  if (!value) return false

  const cleanValue = value.replace(/[^\d]+/g, '')
  if (cleanValue.length !== 14) return false

  if (/^(\d)\1+$/.test(cleanValue)) return false

  let sum = 0
  let factor = 5
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanValue.charAt(i)) * factor
    factor = (factor === 2) ? 9 : factor - 1
  }
  let remainder = sum % 11
  const digit = (remainder < 2) ? 0 : 11 - remainder
  if (parseInt(cleanValue.charAt(12)) !== digit) return false

  sum = 0
  factor = 6
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanValue.charAt(i)) * factor
    factor = (factor === 2) ? 9 : factor - 1
  }
  remainder = sum % 11
  const digit2 = (remainder < 2) ? 0 : 11 - remainder
  if (parseInt(cleanValue.charAt(13)) !== digit2) return false

  return true
}