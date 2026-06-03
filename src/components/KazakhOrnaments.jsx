// Медальон для InvitationSection
export function Medallion() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 opacity-70">
      {/* Внешнее кольцо */}
      <circle cx="60" cy="60" r="54" stroke="#C9A96E" strokeWidth="0.6" opacity="0.5"/>
      <circle cx="60" cy="60" r="48" stroke="#C9A96E" strokeWidth="0.3" opacity="0.3"/>

      {/* 8 лепестков */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 60 + 36 * Math.cos(rad)
        const y1 = 60 + 36 * Math.sin(rad)
        const x2 = 60 + 50 * Math.cos(rad)
        const y2 = 60 + 50 * Math.sin(rad)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9A96E" strokeWidth="0.5" opacity="0.5"/>
      })}

      {/* 8 ромбов по кругу */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 60 + 42 * Math.cos(rad)
        const cy = 60 + 42 * Math.sin(rad)
        const size = 5
        return (
          <polygon
            key={i}
            points={`${cx},${cy-size} ${cx+size},${cy} ${cx},${cy+size} ${cx-size},${cy}`}
            fill={i % 2 === 0 ? '#C9A96E' : 'none'}
            fillOpacity="0.25"
            stroke="#C9A96E"
            strokeWidth="0.5"
            opacity="0.6"
          />
        )
      })}

      {/* Средний круг */}
      <circle cx="60" cy="60" r="28" stroke="#C9A96E" strokeWidth="0.5" opacity="0.4"/>

      {/* Внутренние 4 лепестка */}
      {[0,90,180,270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 60 + 18 * Math.cos(rad)
        const cy = 60 + 18 * Math.sin(rad)
        return (
          <ellipse
            key={i}
            cx={cx} cy={cy}
            rx="7" ry="4"
            transform={`rotate(${angle}, ${cx}, ${cy})`}
            fill="#C9A96E"
            fillOpacity="0.1"
            stroke="#C9A96E"
            strokeWidth="0.4"
            opacity="0.5"
          />
        )
      })}

      {/* Диагональные ромбы */}
      {[45,135,225,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 60 + 18 * Math.cos(rad)
        const cy = 60 + 18 * Math.sin(rad)
        const s = 4
        return (
          <polygon
            key={i}
            points={`${cx},${cy-s} ${cx+s},${cy} ${cx},${cy+s} ${cx-s},${cy}`}
            fill="none"
            stroke="#C9A96E"
            strokeWidth="0.4"
            opacity="0.45"
          />
        )
      })}

      {/* Центральный цветок */}
      <circle cx="60" cy="60" r="8" stroke="#C9A96E" strokeWidth="0.6" opacity="0.5"/>
      <circle cx="60" cy="60" r="4" fill="#C9A96E" fillOpacity="0.2" stroke="#C9A96E" strokeWidth="0.5" opacity="0.6"/>
      <circle cx="60" cy="60" r="1.5" fill="#C9A96E" opacity="0.7"/>
    </svg>
  )
}

// Парные кольца для HostsSection
export function WeddingRings() {
  return (
    <svg width="140" height="70" viewBox="0 0 140 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto my-6 opacity-75">
      {/* Левое кольцо */}
      <circle cx="45" cy="35" r="28" stroke="#C9A96E" strokeWidth="1" opacity="0.6"/>
      <circle cx="45" cy="35" r="22" stroke="#C9A96E" strokeWidth="0.4" opacity="0.3"/>
      {/* Орнамент на левом */}
      {[0,60,120,180,240,300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 45 + 25 * Math.cos(rad)
        const cy = 35 + 25 * Math.sin(rad)
        return <circle key={i} cx={cx} cy={cy} r="1.5" fill="#C9A96E" fillOpacity="0.5"/>
      })}
      <circle cx="45" cy="35" r="3" fill="#C9A96E" fillOpacity="0.2" stroke="#C9A96E" strokeWidth="0.5"/>

      {/* Правое кольцо */}
      <circle cx="95" cy="35" r="28" stroke="#C9A96E" strokeWidth="1" opacity="0.6"/>
      <circle cx="95" cy="35" r="22" stroke="#C9A96E" strokeWidth="0.4" opacity="0.3"/>
      {/* Орнамент на правом */}
      {[0,60,120,180,240,300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 95 + 25 * Math.cos(rad)
        const cy = 35 + 25 * Math.sin(rad)
        return <circle key={i} cx={cx} cy={cy} r="1.5" fill="#C9A96E" fillOpacity="0.5"/>
      })}
      <circle cx="95" cy="35" r="3" fill="#C9A96E" fillOpacity="0.2" stroke="#C9A96E" strokeWidth="0.5"/>

      {/* Пересечение — золотой акцент */}
      <path
        d="M 67 22 Q 70 35 67 48"
        stroke="#C9A96E" strokeWidth="1.5" opacity="0.7" fill="none"
      />
      <path
        d="M 73 22 Q 70 35 73 48"
        stroke="#C9A96E" strokeWidth="1.5" opacity="0.7" fill="none"
      />
      <circle cx="70" cy="35" r="2" fill="#C9A96E" opacity="0.6"/>
    </svg>
  )
}

// Горизонтальный разделитель с казахским узором (универсальный)
export function KazakhDivider({ width = 320 }) {
  const half = width / 2
  return (
    <svg width={width} height="28" viewBox={`0 0 ${width} 28`} fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      <line x1="0" y1="14" x2={half - 22} y2="14" stroke="#C9A96E" strokeWidth="0.5" opacity="0.6"/>
      <line x1={half + 22} y1="14" x2={width} y2="14" stroke="#C9A96E" strokeWidth="0.5" opacity="0.6"/>
      <polygon points={`${half},2 ${half+12},14 ${half},26 ${half-12},14`} fill="none" stroke="#C9A96E" strokeWidth="0.8" opacity="0.8"/>
      <polygon points={`${half},7 ${half+7},14 ${half},21 ${half-7},14`} fill="#C9A96E" fillOpacity="0.15"/>
      <circle cx={half} cy="14" r="2" fill="#C9A96E" opacity="0.7"/>
      <polygon points={`${half-30},10 ${half-22},14 ${half-30},18 ${half-38},14`} fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity="0.55"/>
      <polygon points={`${half+30},10 ${half+38},14 ${half+30},18 ${half+22},14`} fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity="0.55"/>
      <circle cx={half - 48} cy="14" r="1.3" fill="#C9A96E" fillOpacity="0.4"/>
      <circle cx={half + 48} cy="14" r="1.3" fill="#C9A96E" fillOpacity="0.4"/>
    </svg>
  )
}

// Декоративная арка для RsvpSection
export function RsvpArch() {
  return (
    <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-8 opacity-60">
      {/* Арка */}
      <path d="M 10 55 Q 10 5 100 5 Q 190 5 190 55" stroke="#C9A96E" strokeWidth="0.7" fill="none" opacity="0.7"/>
      {/* Внутренняя арка */}
      <path d="M 25 55 Q 25 18 100 18 Q 175 18 175 55" stroke="#C9A96E" strokeWidth="0.4" fill="none" opacity="0.4"/>
      {/* Вершина */}
      <circle cx="100" cy="5" r="3" fill="#C9A96E" fillOpacity="0.3" stroke="#C9A96E" strokeWidth="0.6"/>
      <circle cx="100" cy="5" r="1.2" fill="#C9A96E" opacity="0.7"/>
      {/* Ромбы на арке */}
      {[0.15, 0.5, 0.85].map((t, i) => {
        const angle = Math.PI - t * Math.PI
        const cx = 100 + 90 * Math.cos(angle)
        const cy = 5 + 50 * Math.abs(Math.sin(angle)) * (t === 0.5 ? 0 : 1)
        const s = 4
        return (
          <polygon
            key={i}
            points={`${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`}
            fill={i === 1 ? '#C9A96E' : 'none'}
            fillOpacity="0.2"
            stroke="#C9A96E"
            strokeWidth="0.5"
            opacity="0.6"
          />
        )
      })}
      {/* Боковые столбики */}
      <line x1="10" y1="55" x2="10" y2="30" stroke="#C9A96E" strokeWidth="0.5" opacity="0.4"/>
      <line x1="190" y1="55" x2="190" y2="30" stroke="#C9A96E" strokeWidth="0.5" opacity="0.4"/>
      <polygon points="10,26 14,30 10,34 6,30" fill="#C9A96E" fillOpacity="0.3" stroke="#C9A96E" strokeWidth="0.4"/>
      <polygon points="190,26 194,30 190,34 186,30" fill="#C9A96E" fillOpacity="0.3" stroke="#C9A96E" strokeWidth="0.4"/>
    </svg>
  )
}