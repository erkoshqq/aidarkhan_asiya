import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function InvitationSection({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-5 max-w-[680px] mx-auto text-center">
      <motion.span
        className="font-body text-[20px] font-bold tracking-[0.45em] text-gold uppercase mb-6 block"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {t.invLabel}
      </motion.span>

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Card */}
        <div
          className="relative px-8 py-12"
          style={{
            background: 'linear-gradient(135deg, #FDFBF7 0%, #F5EDD8 100%)',
            border: '1px solid #E8D5A3',
          }}
        >
          {/* Corner ornaments */}
          {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
            <span key={i} className={`absolute ${pos} text-gold-light text-xs`}>✦</span>
          ))}

          {/* Inner border */}
          <div
            className="absolute inset-3 pointer-events-none"
            style={{ border: '0.5px solid rgba(201,169,110,0.25)' }}
          />

          <div
            className="font-display text-[2rem] font-light text-text-deep mb-2"
            style={{ letterSpacing: '0.02em' }}
          >
            Айдархан <span className="italic text-gold">&amp;</span> Асия
          </div>

          <div className="w-10 h-px mx-auto my-5" style={{ background: '#E8D5A3' }} />

          <h2 className="font-display text-[20px] font-bold text-text-mid mb-5 leading-relaxed">
            {t.invTitle}
          </h2>

          <p className="font-body font-medium text-[18px] text-text-mid leading-[2] max-w-md mx-auto">
            {t.invText}
          </p>

          <div className="mt-8 font-body text-[10px] font-bold tracking-[0.35em] text-gold uppercase">
            01.08.2026 · 13:00 · Dastur Hall
          </div>
        </div>
      </motion.div>
    </section>
  )
}
