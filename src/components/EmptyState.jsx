import { Link } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center py-16 px-6 text-center">

      {/* Decoración geométrica 80s */}
      <div className="relative mb-6">
        {/* Cuadrado de fondo con shadow duro */}
        <div
          className="w-28 h-28 border-2 border-dark80 flex items-center justify-center"
          style={{ background: '#1A0A2E', boxShadow: '6px 6px 0 #E91E63' }}
        >
          <span className="text-6xl select-none">🎂</span>
        </div>
        {/* Estrella decorativa */}
        <span
          className="absolute -top-3 -right-3 font-mono text-2xl leading-none"
          style={{ color: '#FFD740', textShadow: '1px 1px 0 #E65100' }}
        >★</span>
        <span
          className="absolute -bottom-2 -left-2 font-mono text-xl leading-none"
          style={{ color: '#00BCD4', textShadow: '1px 1px 0 #006064' }}
        >◆</span>
      </div>

      {/* Texto */}
      <h3
        className="font-display text-3xl tracking-widest mb-2"
        style={{ color: '#E91E63', textShadow: '2px 2px 0 #880E4F' }}
      >
        SIN REGISTROS
      </h3>

      <div
        className="h-0.5 w-24 my-3"
        style={{ background: 'linear-gradient(90deg, #E91E63, #00BCD4, #FFD740)' }}
      />

      <p className="font-sans text-sm text-dark80/60 mb-8 max-w-xs">
        Añade a tus amigos y familiares para recibir recordatorios automáticos de sus cumpleaños.
      </p>

      <Link to="/add" className="btn-80 inline-flex">
        <PlusCircle size={17} />
        Añadir cumpleaños
      </Link>
    </div>
  )
}
