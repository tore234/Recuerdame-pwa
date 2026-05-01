import { useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { getDaysUntilBirthday } from '../utils/dateUtils'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export function useEmailReminders(birthdays, settings) {
  useEffect(() => {
    if (!settings.emailEnabled)                        return
    if (!settings.userEmail)                           return
    if (!birthdays.length)                             return
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY)    return

    const today = new Date().toDateString()

    birthdays.forEach((b) => {
      const days = getDaysUntilBirthday(b.birthdate)
      if (!settings.notificationDaysBefore.includes(days)) return

      const key = `emailed_${b.id}_days${days}`
      if (localStorage.getItem(key) === today) return

      const message =
        days === 0
          ? `¡Hoy es el cumpleaños de ${b.name}! 🎉`
          : days === 1
            ? `El cumpleaños de ${b.name} es mañana 🎂`
            : `El cumpleaños de ${b.name} es en ${days} días 🎂`

      emailjs
        .send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            to_email:      settings.userEmail,
            birthday_name: b.name,
            relationship:  b.relationship,
            days,
            message,
          },
          PUBLIC_KEY,
        )
        .then(() => localStorage.setItem(key, today))
        .catch((err) => console.error('EmailJS:', err))
    })
  }, [birthdays, settings])
}
