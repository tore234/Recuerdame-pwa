import { Link } from 'react-router-dom'
import { Trash2, Pencil, Mail, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { getDaysUntilBirthday, formatBirthdate, getAge } from '../utils/dateUtils'
import CountdownBadge from './CountdownBadge'
import { useBirthdays } from '../context/BirthdaysContext'

// Accent colors per relationship (left border + avatar)
const REL = {
  familia: { border: '#E91E63', shadow: '#880E4F', tag: '#FCE4EC', tagText: '#880E4F' },
  amigo:   { border: '#00BCD4', shadow: '#006064', tag: '#E0F7FA', tagText: '#006064' },
  pareja:  { border: '#FFD740', shadow: '#E65100', tag: '#FFF9C4', tagText: '#E65100' },
  trabajo: { border: '#6A1B9A', shadow: '#1A0A2E', tag: '#F3E5F5', tagText: '#4A148C' },
  otro:    { border: '#607D8B', shadow: '#37474F', tag: '#ECEFF1', tagText: '#37474F' },
}

function avatarColorFor(name) {
  const COLORS = ['#E91E63','#00BCD4','#FFD740','#6A1B9A','#F57F17']
  let n = 0
  for (const c of name) n += c.charCodeAt(0)
  return COLORS[n % COLORS.length]
}

export default function BirthdayCard({ birthday }) {
  const { deleteBirthday } = useBirthdays()
  const days  = getDaysUntilBirthday(birthday.birthdate)
  const age   = getAge(birthday.birthdate)
  const rel   = REL[birthday.relationship] ?? REL.otro
  const isToday = days === 0

  const handleDelete = () => {
    toast(`¿Eliminar a ${birthday.name}?`, {
      duration: 8000,
      action: {
        label: 'Eliminar',
        onClick: async () => {
          await deleteBirthday(birthday.id)
          toast.success(`${birthday.name} eliminado`)
        },
      },
      cancel: { label: 'Cancelar' },
    })
  }

  return (
    <div
      className="bg-white border-2 border-dark80 flex gap-0 overflow-hidden animate-[slide-in_0.25s_ease-out]"
      style={{
        boxShadow: isToday
          ? `4px 4px 0 ${rel.shadow}, 0 0 16px #E91E6340`
          : `4px 4px 0 ${rel.shadow}`,
      }}
    >
      {/* Barra de color izquierda con inicial */}
      <div
        className="w-14 flex-shrink-0 flex flex-col items-center justify-center gap-1 py-4"
        style={{ background: rel.border }}
      >
        <span className="font-display text-2xl text-white leading-none drop-shadow-sm">
          {birthday.name.charAt(0).toUpperCase()}
        </span>
        {isToday && (
          <span className="text-white text-lg leading-none">★</span>
        )}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0 p-3">
        {/* Fila superior: nombre + badge */}
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <p className="font-sans font-bold text-dark80 text-base leading-tight">
              {birthday.name}
            </p>
            <span
              className="inline-block font-mono text-xs font-bold px-1.5 py-0.5 border uppercase tracking-wider mt-0.5"
              style={{
                background:  rel.tag,
                color:       rel.tagText,
                borderColor: rel.border,
              }}
            >
              {birthday.relationship}
            </span>
          </div>
          <CountdownBadge days={days} />
        </div>

        {/* Fecha */}
        <p className="mt-2 font-mono text-xs text-dark80/60 flex items-center gap-1">
          <span>◆</span>
          <span>{formatBirthdate(birthday.birthdate)}</span>
          <span className="text-dark80/30">·</span>
          <span className="font-bold text-dark80/80">{age} años</span>
        </p>

        {/* Acciones */}
        <div className="mt-2.5 flex items-center gap-2 border-t border-dark80/10 pt-2">
          {birthday.email && (
            <a
              href={`mailto:${birthday.email}?subject=¡Feliz cumpleaños ${birthday.name}!`}
              className="text-dark80/40 hover:text-pink80 transition-colors"
              title="Email"
            >
              <Mail size={15} />
            </a>
          )}
          {birthday.whatsapp && (
            <a
              href={`https://wa.me/${birthday.whatsapp.replace(/\D/g, '')}?text=¡Feliz cumpleaños ${birthday.name}! 🎂`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark80/40 hover:text-cyan80 transition-colors"
              title="WhatsApp"
            >
              <MessageCircle size={15} />
            </a>
          )}
          <span className="flex-1" />
          <Link
            to={`/edit/${birthday.id}`}
            className="text-dark80/40 hover:text-pink80 transition-colors p-1"
            title="Editar"
          >
            <Pencil size={14} />
          </Link>
          <button
            onClick={handleDelete}
            className="text-dark80/40 hover:text-red-600 transition-colors p-1"
            title="Eliminar"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
