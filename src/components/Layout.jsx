import { Link, useLocation } from 'react-router-dom'
import { CalendarDays, PlusCircle, Settings } from 'lucide-react'

const NAV = [
  { to: '/',         icon: CalendarDays, label: 'INICIO'  },
  { to: '/add',      icon: PlusCircle,   label: 'AÑADIR'  },
  { to: '/settings', icon: Settings,     label: 'CONFIG'  },
]

function StarIcon({ size = 12, color = '#FFD740' }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} style={{ fill: color, flexShrink: 0 }}>
      <polygon points="10,1 12.9,7.3 19.5,7.6 14.5,12.1 16.2,18.5 10,15 3.8,18.5 5.5,12.1 0.5,7.6 7.1,7.3" />
    </svg>
  )
}

function DiamondIcon({ size = 10, color = '#00BCD4' }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} style={{ fill: color, flexShrink: 0 }}>
      <polygon points="10,0 20,10 10,20 0,10" />
    </svg>
  )
}

export default function Layout({ children }) {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Header 80s ── */}
      <header
        className="px-4 pt-5 pb-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A0A2E 0%, #3D1C6E 60%, #1A0A2E 100%)' }}
      >
        {/* Diagonal stripe overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.3) 8px, rgba(255,255,255,0.3) 16px)',
          }}
        />

        {/* Corner geometric triangles */}
        <div className="absolute top-0 left-0 w-0 h-0"
          style={{ borderTop: '40px solid #E91E63', borderRight: '40px solid transparent' }} />
        <div className="absolute top-0 right-0 w-0 h-0"
          style={{ borderTop: '40px solid #00BCD4', borderLeft: '40px solid transparent' }} />

        <div className="max-w-2xl mx-auto relative z-10">
          {/* Decorative row */}
          <div className="flex items-center gap-2 mb-1">
            <StarIcon size={11} color="#FFD740" />
            <DiamondIcon size={8} color="#00BCD4" />
            <DiamondIcon size={8} color="#E91E63" />
            <StarIcon size={11} color="#FFD740" />
          </div>

          {/* Title block */}
          <div className="flex items-end justify-between">
            <div>
              <h1
                className="font-display text-5xl leading-none tracking-wider"
                style={{ color: '#E91E63', textShadow: '3px 3px 0 #880E4F, 0 0 20px #E91E6340' }}
              >
                RECUÉRDAME
              </h1>
              <p className="font-mono text-xs tracking-[0.25em] mt-1" style={{ color: '#80DEEA' }}>
                ◆ CALENDARIO DE CUMPLEAÑOS ◆
              </p>
            </div>

            {/* Icon badge */}
            <div className="border-2 border-gold80 p-1" style={{ boxShadow: '3px 3px 0 #E65100' }}>
              <img src="/icons/icon.svg" alt="" className="w-10 h-10" />
            </div>
          </div>
        </div>
      </header>

      {/* ── Divider arco iris 80s ── */}
      <div className="h-1.5" style={{
        background: 'linear-gradient(90deg, #E91E63 0%, #9C27B0 25%, #00BCD4 50%, #FFD740 75%, #E91E63 100%)'
      }} />

      {/* ── Contenido ── */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-28">
        {children}
      </main>

      {/* ── Nav inferior 80s ── */}
      <nav className="fixed bottom-0 inset-x-0 z-20 border-t-2 border-dark80"
        style={{ background: '#1A0A2E', boxShadow: '0 -4px 0 #E91E6330' }}>
        <div className="max-w-2xl mx-auto flex">
          {NAV.map(({ to, icon: Icon, label }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className="flex-1 flex flex-col items-center py-3 gap-1 relative transition-colors duration-100"
                style={{ color: active ? '#E91E63' : '#80DEEA' }}
              >
                {active && (
                  <span
                    className="absolute top-0 inset-x-0 h-0.5"
                    style={{ background: '#E91E63', boxShadow: '0 0 8px #E91E63' }}
                  />
                )}
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                <span className="font-mono text-xs font-bold">{label}</span>
                {active && (
                  <span className="absolute bottom-1 text-gold80 text-xs leading-none">▲</span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
