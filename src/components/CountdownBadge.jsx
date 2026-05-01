import { getCountdownLabel } from '../utils/dateUtils'

const BADGE = {
  today: {
    bg:     '#E91E63',
    border: '#880E4F',
    text:   '#FFFFFF',
    shadow: '2px 2px 0 #880E4F',
    neon:   '0 0 10px #E91E63, 0 0 20px #E91E6360',
    pulse:  true,
  },
  tomorrow: {
    bg:     '#00BCD4',
    border: '#006064',
    text:   '#1A0A2E',
    shadow: '2px 2px 0 #006064',
    neon:   null,
    pulse:  false,
  },
  week: {
    bg:     '#FFD740',
    border: '#E65100',
    text:   '#1A0A2E',
    shadow: '2px 2px 0 #E65100',
    neon:   null,
    pulse:  false,
  },
  month: {
    bg:     '#6A1B9A',
    border: '#1A0A2E',
    text:   '#FFFFFF',
    shadow: '2px 2px 0 #1A0A2E',
    neon:   null,
    pulse:  false,
  },
  far: {
    bg:     '#ECEFF1',
    border: '#607D8B',
    text:   '#37474F',
    shadow: '2px 2px 0 #607D8B',
    neon:   null,
    pulse:  false,
  },
}

function urgency(days) {
  if (days === 0)  return 'today'
  if (days === 1)  return 'tomorrow'
  if (days <= 7)   return 'week'
  if (days <= 30)  return 'month'
  return 'far'
}

export default function CountdownBadge({ days, className = '' }) {
  const u = urgency(days)
  const s = BADGE[u]

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-1 font-mono text-xs font-bold
        border-2 whitespace-nowrap uppercase tracking-wider
        ${s.pulse ? 'animate-[pulse-neon_2s_ease-in-out_infinite]' : ''}
        ${className}
      `}
      style={{
        background:  s.bg,
        borderColor: s.border,
        color:       s.text,
        boxShadow:   s.neon ? `${s.shadow}, ${s.neon}` : s.shadow,
      }}
    >
      {getCountdownLabel(days)}
    </span>
  )
}
