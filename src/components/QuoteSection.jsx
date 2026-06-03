import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function QuoteSection({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24 px-6 text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #FAF7F2, #F5EDD8)' }}
    >
      {/* Фото фоном */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/photo1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.24,
          mixBlendMode: 'multiply',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, #F5EDD8 80%)',
        }}
      />

      {/* Остальной контент без изменений */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg mx-auto relative z-10"
      >
        <div className="font-display text-[5rem] leading-[0] text-gold-light select-none">"</div>
        <p
          className="font-display italic font-bold text-text-mid leading-relaxed mt-2"
          style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2rem)' }}
        >
          {t.quote}
        </p>
        <div className="w-10 h-px mx-auto my-6" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
        <p className="font-body text-[15px] font-bold tracking-[0.35em] text-text-soft uppercase">
          {t.quoteAuthor}
        </p>
      </motion.div>
    </section>
  )
}