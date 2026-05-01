import { useState } from 'react'
import { Bell, Mail, MessageCircle, Info } from 'lucide-react'
import { toast } from 'sonner'
import { useBirthdays } from '../context/BirthdaysContext'
import { isFirebaseConfigured } from '../firebase/config'

const ALERT_OPTIONS = [
  { value: 0,  label: 'El mismo día'   },
  { value: 1,  label: '1 día antes'    },
  { value: 3,  label: '3 días antes'   },
  { value: 7,  label: '7 días antes'   },
  { value: 15, label: '15 días antes'  },
]

function RetroCheckbox({ checked, onToggle, label }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-3 text-sm font-sans font-semibold text-dark80 hover:text-pink80 transition-colors w-full text-left py-1"
    >
      <span
        className="w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 transition-colors"
        style={{
          borderColor: checked ? '#E91E63' : '#1A0A2E',
          background:  checked ? '#E91E63' : 'transparent',
          boxShadow:   checked ? '2px 2px 0 #880E4F' : '2px 2px 0 #1A0A2E',
          color: '#FFF',
        }}
      >
        {checked && <span className="font-mono text-xs font-bold leading-none">✓</span>}
      </span>
      {label}
    </button>
  )
}

function PanelBlock({ icon: Icon, iconColor, title, children }) {
  return (
    <div
      className="bg-white border-2 border-dark80 p-5"
      style={{ boxShadow: '4px 4px 0 #1A0A2E' }}
    >
      <div className="flex items-center gap-2 mb-4 border-b-2 border-dark80/10 pb-3">
        <div
          className="w-7 h-7 border-2 border-dark80 flex items-center justify-center flex-shrink-0"
          style={{ background: iconColor }}
        >
          <Icon size={15} color="#fff" strokeWidth={2.5} />
        </div>
        <h3 className="font-display text-base tracking-widest text-dark80">{title.toUpperCase()}</h3>
      </div>
      {children}
    </div>
  )
}

export default function Settings() {
  const { settings, saveSettings } = useBirthdays()
  const [form, setForm] = useState(settings)

  const toggleDay = (val) => {
    const list = form.notificationDaysBefore
    setForm((f) => ({
      ...f,
      notificationDaysBefore: list.includes(val) ? list.filter((d) => d !== val) : [...list, val],
    }))
  }

  const handleSave = () => {
    saveSettings(form)
    toast.success('★ Configuración guardada')
  }

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('Tu navegador no soporta notificaciones.')
      return
    }
    const perm = await Notification.requestPermission()
    if (perm === 'granted') {
      new Notification('Recuérdame', {
        body: '¡Las notificaciones están activas! ★',
        icon: '/icons/icon.svg',
      })
      toast.success('¡Notificaciones activadas! ★')
    } else {
      toast.error('Permiso denegado. Actívalas desde la config. del navegador.')
    }
  }

  return (
    <div className="space-y-6">

      {/* Título 80s */}
      <div className="flex items-end gap-3">
        <div className="flex gap-1 items-stretch" style={{ height: 36 }}>
          <div className="w-3" style={{ background: '#E91E63' }} />
          <div className="w-2" style={{ background: '#00BCD4' }} />
          <div className="w-1" style={{ background: '#FFD740' }} />
        </div>
        <div>
          <h2
            className="font-display text-3xl tracking-widest leading-none"
            style={{ color: '#1A0A2E' }}
          >
            CONFIG
          </h2>
          <p className="font-mono text-xs text-dark80/50 uppercase tracking-widest mt-0.5">
            Recordatorios & alertas
          </p>
        </div>
      </div>

      {/* Firebase status */}
      {!isFirebaseConfigured && (
        <div
          className="border-2 p-4 flex gap-3"
          style={{ borderColor: '#FFD740', background: '#FFF9C4', boxShadow: '3px 3px 0 #E65100' }}
        >
          <Info size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#E65100' }} />
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-dark80">
              Firebase no configurado
            </p>
            <p className="font-sans text-xs text-dark80/70 mt-1">
              Datos guardados localmente. Copia <code className="font-mono">.env.example</code> → <code className="font-mono">.env</code> y añade tus credenciales.
            </p>
          </div>
        </div>
      )}

      {/* Notificaciones browser */}
      <PanelBlock icon={Bell} iconColor="#E91E63" title="Notificaciones">
        <button onClick={requestPermission} className="btn-80-outline w-full text-xs">
          Activar notificaciones del navegador
        </button>
        <p className="font-mono text-xs text-dark80/40 mt-2">
          ◆ Alerta al abrir la app cuando hay cumpleaños próximos.
        </p>
      </PanelBlock>

      {/* Cuándo avisar */}
      <PanelBlock icon={Bell} iconColor="#6A1B9A" title="Cuándo avisar">
        <div className="space-y-2.5">
          {ALERT_OPTIONS.map((opt) => (
            <RetroCheckbox
              key={opt.value}
              checked={form.notificationDaysBefore.includes(opt.value)}
              onToggle={() => toggleDay(opt.value)}
              label={opt.label}
            />
          ))}
        </div>
      </PanelBlock>

      {/* Email */}
      <PanelBlock icon={Mail} iconColor="#00BCD4" title="Email">
        <RetroCheckbox
          checked={form.emailEnabled}
          onToggle={() => setForm((f) => ({ ...f, emailEnabled: !f.emailEnabled }))}
          label="Activar recordatorio por email"
        />
        {form.emailEnabled && (
          <input
            type="email"
            value={form.userEmail}
            onChange={(e) => setForm((f) => ({ ...f, userEmail: e.target.value }))}
            placeholder="tu@correo.com"
            className="input-80 mt-3"
          />
        )}
        <p className="font-mono text-xs text-dark80/30 mt-2 italic">
          Requiere Firebase Extension Trigger Email + SendGrid.
        </p>
      </PanelBlock>

      {/* WhatsApp */}
      <PanelBlock icon={MessageCircle} iconColor="#2E7D32" title="WhatsApp">
        <RetroCheckbox
          checked={form.whatsappEnabled}
          onToggle={() => setForm((f) => ({ ...f, whatsappEnabled: !f.whatsappEnabled }))}
          label="Activar recordatorio por WhatsApp"
        />
        {form.whatsappEnabled && (
          <input
            type="tel"
            value={form.userWhatsapp}
            onChange={(e) => setForm((f) => ({ ...f, userWhatsapp: e.target.value }))}
            placeholder="+52 1 55 0000 0000"
            className="input-80 mt-3"
          />
        )}
        <p className="font-mono text-xs text-dark80/30 mt-2 italic">
          Requiere Cloud Function + Twilio WhatsApp API.
        </p>
      </PanelBlock>

      {/* Guardar */}
      <button onClick={handleSave} className="btn-80 w-full text-base">
        GUARDAR CONFIGURACIÓN
      </button>
    </div>
  )
}
