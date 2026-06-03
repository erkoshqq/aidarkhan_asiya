import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountdown } from '../hooks/useCountdown'

function CountCard({ value, label, delay, inView }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-5 px-2"
      style={{
        background: '#FDFBF7',
        border: '1px solid #E8D5A3',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <span
        className="font-display font-light text-text-deep leading-none"
        style={{ fontSize: 'clamp(2rem,7vw,2.8rem)' }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-body text-[8px] font-light tracking-[0.3em] text-gold mt-2 uppercase">
        {label}
      </span>
    </motion.div>
  )
}

export default function CountdownSection({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { days, hours, minutes, seconds } = useCountdown('2026-08-01T13:00:00')

  return (
    <section ref={ref} className="py-24 px-5 text-center max-w-[680px] mx-auto">
      <motion.span
        className="font-body text-[9px] font-light tracking-[0.45em] text-gold uppercase mb-5 block"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {t.cdLabel}
      </motion.span>

      <motion.h2
        className="font-display text-[clamp(1.6rem,5vw,2.4rem)] font-light text-text-deep mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1 }}
      >
        {t.cdTitle}
      </motion.h2>

      <div className="grid grid-cols-4 gap-3">
        <CountCard value={days} label={t.cdDays} delay={0.2} inView={inView} />
        <CountCard value={hours} label={t.cdHrs} delay={0.3} inView={inView} />
        <CountCard value={minutes} label={t.cdMin} delay={0.4} inView={inView} />
        <CountCard value={seconds} label={t.cdSec} delay={0.5} inView={inView} />
      </div>
    </section>
  )
}
