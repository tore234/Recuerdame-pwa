import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const RELATIONSHIPS = ['familia', 'amigo', 'pareja', 'trabajo', 'otro']

const EMPTY = {
  name: '', relationship: 'familia', birthdate: '', email: '', whatsapp: '',
}

export default function BirthdayForm({ initial = EMPTY, onSave, submitLabel = 'Guardar' }) {
  const [form,   setForm]   = useState(initial)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim())  { toast.error('El nombre es obligatorio');              return }
    if (!form.birthdate)    { toast.error('La fecha de nacimiento es obligatoria'); return }
    setSaving(true)
    try {
      await onSave({
        name:         form.name.trim(),
        relationship: form.relationship,
        birthdate:    form.birthdate,
        email:        form.email.trim(),
        whatsapp:     form.whatsapp.trim(),
      })
      navigate('/')
    } catch (err) {
      console.error(err)
      toast.error('Error al guardar. Verifica tu conexión e inténtalo de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Nombre */}
      <div>
        <label className="label-80">Nombre *</label>
        <input
          type="text"
          value={form.name}
          onChange={set('name')}
          placeholder="Nombre completo"
          className="input-80"
          required
          autoFocus
        />
      </div>

      {/* Parentesco */}
      <div>
        <label className="label-80">Parentesco / Relación *</label>
        <select value={form.relationship} onChange={set('relationship')} className="input-80">
          {RELATIONSHIPS.map((r) => (
            <option key={r} value={r}>
              {r.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Fecha */}
      <div>
        <label className="label-80">Fecha de Nacimiento *</label>
        <input
          type="date"
          value={form.birthdate}
          onChange={set('birthdate')}
          className="input-80"
          required
          max={new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* Contacto */}
      <div
        className="border-2 border-dark80 p-4 space-y-4"
        style={{ background: '#FFF5E6', boxShadow: '3px 3px 0 #1A0A2E' }}
      >
        <p className="font-mono text-xs text-dark80/50 uppercase tracking-widest flex items-center gap-2">
          <span style={{ color: '#00BCD4' }}>◆</span>
          Datos de contacto — opcionales
        </p>
        <div>
          <label className="label-80">Correo Electrónico</label>
          <input
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="correo@ejemplo.com"
            className="input-80"
          />
        </div>
        <div>
          <label className="label-80">WhatsApp</label>
          <input
            type="tel"
            value={form.whatsapp}
            onChange={set('whatsapp')}
            placeholder="+52 1 55 0000 0000"
            className="input-80"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-80-outline flex-1"
          disabled={saving}
        >
          Cancelar
        </button>
        <button type="submit" className="btn-80 flex-1" disabled={saving}>
          {saving ? 'Guardando…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
