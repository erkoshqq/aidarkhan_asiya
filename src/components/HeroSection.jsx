import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Угловой SVG орнамент
function CornerOrnament({ flip = false }) {
  return (
    <svg
      width="80" height="80" viewBox="0 0 80 80"
      style={{ transform: flip ? 'scale(-1,1)' : 'none' }}
      fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      {/* Две линии угла */}
      <line x1="8" y1="8" x2="60" y2="8" stroke="#C9A96E" strokeWidth="0.6" opacity="0.6"/>
      <line x1="8" y1="8" x2="8" y2="60" stroke="#C9A96E" strokeWidth="0.6" opacity="0.6"/>
      {/* Ромб в углу */}
      <polygon points="8,2 14,8 8,14 2,8" fill="none" stroke="#C9A96E" strokeWidth="0.7" opacity="0.7"/>
      <polygon points="8,5 11,8 8,11 5,8" fill="#C9A96E" fillOpacity="0.25" stroke="none"/>
      {/* Малый ромб на горизонтали */}
      <polygon points="36,4 42,8 36,12 30,8" fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity="0.5"/>
      <circle cx="24" cy="8" r="1.2" fill="#C9A96E" fillOpacity="0.45"/>
      <circle cx="52" cy="8" r="1.2" fill="#C9A96E" fillOpacity="0.3"/>
      {/* Малый ромб на вертикали */}
      <polygon points="4,36 8,42 12,36 8,30" fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity="0.5"/>
      <circle cx="8" cy="24" r="1.2" fill="#C9A96E" fillOpacity="0.45"/>
      <circle cx="8" cy="52" r="1.2" fill="#C9A96E" fillOpacity="0.3"/>
    </svg>
  )
}

// Горизонтальный казахский разделитель
function KazakhDivider() {
  return (
    <svg width="320" height="28" viewBox="0 0 320 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      {/* Левая линия */}
      <line x1="0" y1="14" x2="118" y2="14" stroke="#C9A96E" strokeWidth="0.5" opacity="0.6"/>
      {/* Правая линия */}
      <line x1="202" y1="14" x2="320" y2="14" stroke="#C9A96E" strokeWidth="0.5" opacity="0.6"/>
      {/* Центральный ромб */}
      <polygon points="160,2 172,14 160,26 148,14" fill="none" stroke="#C9A96E" strokeWidth="0.8" opacity="0.8"/>
      <polygon points="160,7 167,14 160,21 153,14" fill="#C9A96E" fillOpacity="0.15"/>
      <circle cx="160" cy="14" r="2" fill="#C9A96E" opacity="0.7"/>
      {/* Малые ромбы */}
      <polygon points="130,10 138,14 130,18 122,14" fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity="0.55"/>
      <polygon points="190,10 198,14 190,18 182,14" fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity="0.55"/>
      {/* Точки */}
      <circle cx="108" cy="14" r="1.3" fill="#C9A96E" fillOpacity="0.4"/>
      <circle cx="212" cy="14" r="1.3" fill="#C9A96E" fillOpacity="0.4"/>
      <circle cx="86" cy="14" r="1" fill="#C9A96E" fillOpacity="0.25"/>
      <circle cx="234" cy="14" r="1" fill="#C9A96E" fillOpacity="0.25"/>
    </svg>
  )
}

// Вертикальная боковая полоска с ромбами
function SideOrnament({ side = 'left' }) {
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 hidden md:block"
      style={{ [side]: '2rem' }}
    >
      <svg width="16" height="260" viewBox="0 0 16 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="8" y1="0" x2="8" y2="260" stroke="#C9A96E" strokeWidth="0.5" opacity="0.35"/>
        {[20, 60, 100, 130, 160, 200, 240].map((y, i) => (
          i % 2 === 0
            ? <polygon key={y} points={`8,${y-6} 13,${y} 8,${y+6} 3,${y}`} fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity="0.5"/>
            : <polygon key={y} points={`8,${y-4} 12,${y} 8,${y+4} 4,${y}`} fill="#C9A96E" fillOpacity="0.2" stroke="#C9A96E" strokeWidth="0.4" opacity="0.4"/>
        ))}
        {[20, 60, 100, 130, 160, 200, 240].map((y) => (
          <circle key={`c${y}`} cx="8" cy={y} r="1.2" fill="#C9A96E" fillOpacity="0.3"/>
        ))}
      </svg>
    </div>
  )
}

export default function HeroSection({ t }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #FDFBF7, #FAF7F2)' }}
    >
      {/* Фоновый орб */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none top-1/4 left-1/2 -translate-x-1/2"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)' }}
      />

      {/* Фото казахских костюмов — фоновый декор */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(https://tyrasoft.kz/uploads/beyne/page_builder_comp_1760257184116_b68c2249c61e4d18b8025a383d2b8dd2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.5,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Поверх — градиентная маска чтобы края растворялись */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, #FDFBF7 75%)',
        }}
      />

      {/* Угловые SVG орнаменты */}
      <div className="absolute top-20 left-4 opacity-60">
        <CornerOrnament />
      </div>
      <div className="absolute top-20 right-4 opacity-60">
        <CornerOrnament flip />
      </div>
      <div className="absolute bottom-16 left-4 opacity-60" style={{ transform: 'scale(1,-1)' }}>
        <CornerOrnament />
      </div>
      <div className="absolute bottom-16 right-4 opacity-60" style={{ transform: 'scale(-1,-1)' }}>
        <CornerOrnament />
      </div>

      {/* Боковые вертикальные орнаменты (только desktop) */}
      <SideOrnament side="left" />
      <SideOrnament side="right" />

      <motion.div className="relative z-10 text-center px-6" style={{ y, opacity }}>
        {/* Верхний лейбл */}
        <motion.div
          className="font-body text-[20px] font-bold tracking-[0.5em] text-gold uppercase mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          {t.splashLabel}
        </motion.div>

        {/* Имена */}
        <motion.div
          className="font-display font-light text-text-deep leading-[0.88]"
          style={{ fontSize: 'clamp(4rem, 16vw, 8rem)', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>Айдархан</div>
          <motion.div
            className="font-display italic text-gold font-light my-3"
            style={{ fontSize: '0.45em', letterSpacing: '0.05em' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            &amp;
          </motion.div>
          <div>Асия</div>
        </motion.div>

        {/* Казахский орнаментальный разделитель */}
        <motion.div
          className="my-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}
        >
          <KazakhDivider />
        </motion.div>

        {/* Дата и место */}
        <motion.div
          className="font-body font-bold text-text-soft tracking-[0.35em] uppercase leading-[2.4] text-[20px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <div>{t.heroDate}</div>
          <div className="text-gold">{t.heroTime}</div>
          <div>{t.heroVenue}</div>
        </motion.div>

        {/* Скролл-хинт */}
        <motion.div
          className="mt-16 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-transparent to-gold-light"
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}