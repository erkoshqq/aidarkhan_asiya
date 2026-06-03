import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer
      ref={ref}
      className="text-center py-16 px-5 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #EDE0C8, #E0D3BA)',
        borderTop: '1px solid #E8D5A3',
      }}
    >
      {/* Фото — симметрично с двух сторон */}
      <div
        className="absolute top-0 left-0 bottom-0 w-32 pointer-events-none"
        style={{
          backgroundImage: 'url(https://tyrasoft.kz/uploads/beyne/page_builder_comp_1760257184116_b68c2249c61e4d18b8025a383d2b8dd2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
          opacity: 0.5,
        }}
      />
      <div
        className="absolute top-0 left-0 bottom-0 w-48 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #EDE0C8, transparent)' }}
      />
      <div
        className="absolute top-0 right-0 bottom-0 w-32 pointer-events-none"
        style={{
          backgroundImage: 'url(https://tyrasoft.kz/uploads/beyne/page_builder_comp_1760257184116_b68c2249c61e4d18b8025a383d2b8dd2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          opacity: 0.5,
          transform: 'scaleX(-1)',
        }}
      />
      <div
        className="absolute top-0 right-0 bottom-0 w-48 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #EDE0C8, transparent)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <div className="font-display text-[1.3rem] text-gold-light tracking-[0.7em] mb-6 select-none">✦ ✦ ✦</div>
        <div
          className="font-display font-bold text-text-deep mb-5"
          style={{ fontSize: 'clamp(2rem, 7vw, 3rem)', letterSpacing: '-0.01em' }}
        >
          Айдархан <span className="italic text-gold">&amp;</span> Асия
        </div>
        <div className="w-12 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
        <p className="font-display italic font-bold text-[1.05rem] text-text-mid max-w-sm mx-auto leading-relaxed">
          {t.footerText}
        </p>
        <p className="font-body text-[9px] font-bold tracking-[0.3em] text-text-soft mt-8 uppercase">
          {t.footerSub}
        </p>
      </motion.div>
    </footer>
  )
}