import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'


export default function HostsSection({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24 px-5 text-center"
      style={{ background: 'linear-gradient(to bottom, #F5EDD8, #EDE0C8)' }}
    >
      <motion.span
        className="font-body text-[9px] font-bold tracking-[0.45em] text-gold uppercase mb-6 block"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {t.hostsLabel}
      </motion.span>

      <motion.div
        className="font-display text-[clamp(2rem,5vw,2.4rem)] font-bold text-text-mid mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1 }}
      >
        {t.hostsTitle}
      </motion.div>

      <motion.div
        className="font-display text-[clamp(3rem,8vw,3.5rem)] font-bold text-text-deep leading-tight tracking-[-0.01em]"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Марат
        <span className="text-gold mx-3 italic font-light">—</span>
        Ляззат
      </motion.div>

      {/* Ornament separator */}
      <motion.div
        className="mt-10 flex items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E)' }} />
        <span className="text-gold-bold text-xs tracking-[0.6em]">✦ ✦ ✦</span>
        <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />
      </motion.div>
    </section>
  )
}
