import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer
      ref={ref}
      className="text-center py-16 px-5"
      style={{
        background: 'linear-gradient(to bottom, #EDE0C8, #E0D3BA)',
        borderTop: '1px solid #E8D5A3',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Ornament */}
        <div className="font-display text-[1.3rem] text-gold-light tracking-[0.7em] mb-6 select-none">
          ✦ ✦ ✦
        </div>

        {/* Big names */}
        <div
          className="font-display font-light text-text-deep mb-5"
          style={{ fontSize: 'clamp(2rem, 7vw, 3rem)', letterSpacing: '-0.01em' }}
        >
          Айдархан <span className="italic text-gold">&amp;</span> Асия
        </div>

        <div className="w-12 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />

        <p className="font-display italic font-light text-[1.05rem] text-text-mid max-w-sm mx-auto leading-relaxed">
          {t.footerText}
        </p>

        <p className="font-body text-[9px] font-light tracking-[0.3em] text-text-soft mt-8 uppercase">
          {t.footerSub}
        </p>
      </motion.div>
    </footer>
  )
}
