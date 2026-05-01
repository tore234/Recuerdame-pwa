import { useEffect } from 'react'
import { getDaysUntilBirthday } from '../utils/dateUtils'

export function useNotifications(birthdays, settings) {
  useEffect(() => {
    if (!('Notification' in window)) return
    if (Notification.permission !== 'granted') return
    if (!birthdays.length) return

    const today = new Date().toDateString()

    birthdays.forEach((b) => {
      const days = getDaysUntilBirthday(b.birthdate)
      if (!settings.notificationDaysBefore.includes(days)) return

      const key = `notified_${b.id}_days${days}`
      if (localStorage.getItem(key) === today) return

      const body =
        days === 0
          ? `¡Hoy es el cumpleaños de ${b.name}! 🎉`
          : `El cumpleaños de ${b.name} es ${days === 1 ? 'mañana' : `en ${days} días`} 🎂`

      new Notification('Recuérdame', { body, icon: '/icons/icon.svg' })
      localStorage.setItem(key, today)
    })
  }, [birthdays, settings])
}
