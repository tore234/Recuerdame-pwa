import { useBirthdays } from '../context/BirthdaysContext'
import { useNotifications } from '../hooks/useNotifications'
import BirthdayCard from '../components/BirthdayCard'
import EmptyState from '../components/EmptyState'
import { isBirthdaySoon } from '../utils/dateUtils'

function SectionTitle({ label, color = '#E91E63', colorB = '#00BCD4' }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {/* Barras geométricas decorativas */}
      <div className="flex gap-1 items-stretch" style={{ height: 28 }}>
        <div className="w-3" style={{ background: color }} />
        <div className="w-2" style={{ background: colorB }} />
        <div className="w-1" style={{ background: '#FFD740' }} />
      </div>
      <h2
        className="font-display text-xl tracking-widest"
        style={{ color: '#1A0A2E' }}
      >
        {label.toUpperCase()}
      </h2>
    </div>
  )
}

export default function Dashboard() {
  const { birthdays, loading, settings } = useBirthdays()
  useNotifications(birthdays, settings)

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div
          className="w-16 h-16 border-2 border-dark80 flex items-center justify-center"
          style={{ background: '#1A0A2E', animation: 'pulse 1.5s ease-in-out infinite' }}
        >
          <span className="text-3xl">🎂</span>
        </div>
        <p className="font-mono text-xs text-dark80/40 uppercase tracking-widest">
          Cargando…
        </p>
      </div>
    )
  }

  if (birthdays.length === 0) return <EmptyState />

  const soon  = birthdays.filter((b) =>  isBirthdaySoon(b.birthdate, 30))
  const later = birthdays.filter((b) => !isBirthdaySoon(b.birthdate, 30))

  return (
    <div className="space-y-8">
      {soon.length > 0 && (
        <section>
          <SectionTitle label="Próximos 30 días" color="#E91E63" colorB="#00BCD4" />
          <div className="space-y-3">
            {soon.map((b) => <BirthdayCard key={b.id} birthday={b} />)}
          </div>
        </section>
      )}

      {later.length > 0 && (
        <section>
          <SectionTitle label="Más adelante" color="#6A1B9A" colorB="#00BCD4" />
          <div className="space-y-3">
            {later.map((b) => <BirthdayCard key={b.id} birthday={b} />)}
          </div>
        </section>
      )}
    </div>
  )
}
