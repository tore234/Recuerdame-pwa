import { useParams, useNavigate } from 'react-router-dom'
import { useBirthdays } from '../context/BirthdaysContext'
import BirthdayForm from '../components/BirthdayForm'

export default function EditBirthday() {
  const { id }  = useParams()
  const navigate = useNavigate()
  const { birthdays, updateBirthday } = useBirthdays()

  const birthday = birthdays.find((b) => b.id === id)

  if (!birthday) {
    return (
      <div className="text-center py-16">
        <p className="font-mono text-sm text-dark80/50 mb-4">Registro no encontrado.</p>
        <button onClick={() => navigate('/')} className="btn-80-outline">
          Volver al inicio
        </button>
      </div>
    )
  }

  const initial = {
    name:         birthday.name         ?? '',
    relationship: birthday.relationship ?? 'familia',
    birthdate:    birthday.birthdate    ?? '',
    email:        birthday.email        ?? '',
    whatsapp:     birthday.whatsapp     ?? '',
  }

  return (
    <div>
      <div className="mb-6 flex items-end gap-3">
        <div className="flex gap-1 items-stretch" style={{ height: 36 }}>
          <div className="w-3" style={{ background: '#00BCD4' }} />
          <div className="w-2" style={{ background: '#E91E63' }} />
          <div className="w-1" style={{ background: '#FFD740' }} />
        </div>
        <div>
          <h2 className="font-display text-3xl tracking-widest leading-none text-dark80">
            EDITAR
          </h2>
          <p className="font-mono text-xs text-dark80/50 uppercase tracking-widest mt-0.5">
            {birthday.name}
          </p>
        </div>
      </div>
      <BirthdayForm
        initial={initial}
        onSave={(data) => updateBirthday(id, data)}
        submitLabel="Actualizar"
      />
    </div>
  )
}
