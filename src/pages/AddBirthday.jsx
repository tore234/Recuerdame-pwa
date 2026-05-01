import { useBirthdays } from '../context/BirthdaysContext'
import BirthdayForm from '../components/BirthdayForm'

export default function AddBirthday() {
  const { addBirthday } = useBirthdays()

  return (
    <div>
      <div className="mb-6 flex items-end gap-3">
        <div className="flex gap-1 items-stretch" style={{ height: 36 }}>
          <div className="w-3" style={{ background: '#E91E63' }} />
          <div className="w-2" style={{ background: '#00BCD4' }} />
          <div className="w-1" style={{ background: '#FFD740' }} />
        </div>
        <div>
          <h2 className="font-display text-3xl tracking-widest leading-none text-dark80">
            NUEVO
          </h2>
          <p className="font-mono text-xs text-dark80/50 uppercase tracking-widest mt-0.5">
            Registro de cumpleaños
          </p>
        </div>
      </div>
      <BirthdayForm onSave={addBirthday} submitLabel="Añadir" />
    </div>
  )
}
