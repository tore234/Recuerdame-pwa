import { differenceInDays, format, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'

function parseDateStr(birthdateStr) {
  const [year, month, day] = String(birthdateStr).split('-').map(Number)
  return { year, month, day }
}

export function getNextBirthday(birthdateStr) {
  const { month, day } = parseDateStr(birthdateStr)
  const today = startOfDay(new Date())
  const thisYear = today.getFullYear()

  let next = new Date(thisYear, month - 1, day)
  if (next < today) {
    next = new Date(thisYear + 1, month - 1, day)
  }
  return next
}

export function getDaysUntilBirthday(birthdateStr) {
  const today = startOfDay(new Date())
  const next  = getNextBirthday(birthdateStr)
  return differenceInDays(next, today)
}

export function getAge(birthdateStr) {
  const { year } = parseDateStr(birthdateStr)
  const next = getNextBirthday(birthdateStr)
  return next.getFullYear() - year
}

export function formatBirthdate(birthdateStr) {
  const { year, month, day } = parseDateStr(birthdateStr)
  return format(new Date(year, month - 1, day), "d 'de' MMMM", { locale: es })
}

export function sortByUpcoming(birthdays) {
  return [...birthdays].sort((a, b) =>
    getDaysUntilBirthday(a.birthdate) - getDaysUntilBirthday(b.birthdate)
  )
}

export function isBirthdaySoon(birthdateStr, days = 30) {
  const d = getDaysUntilBirthday(birthdateStr)
  return d >= 0 && d <= days
}

export function getCountdownLabel(days) {
  if (days === 0) return '¡Hoy!'
  if (days === 1) return 'Mañana'
  return `En ${days} días`
}
