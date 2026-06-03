import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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
      {/* Background orbs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none top-1/4 left-1/2 -translate-x-1/2"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)' }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none bottom-1/4 right-0"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)' }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(var(--gold, #C9A96E) 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <motion.div className="relative z-10 text-center px-6" style={{ y, opacity }}>
        {/* Top ornament */}
        <motion.div
          className="text-gold-light tracking-[0.6em] text-sm mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          ✦ ✦ ✦
        </motion.div>

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

        <motion.div
          className="w-16 h-px mx-auto my-8"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        />

        <motion.div
          className="font-body font-light text-text-soft tracking-[0.35em] uppercase leading-[2.4] text-[11px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <div>{t.heroDate}</div>
          <div className="text-gold">{t.heroTime}</div>
          <div>{t.heroVenue}</div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
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
