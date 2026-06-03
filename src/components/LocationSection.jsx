import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function LocationSection({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const twoGisUrl =
    'https://2gis.kz/karaganda/search/Dastur%20Hall%20%D0%A8%D0%B0%D1%85%D1%82%D0%B5%D1%80%D0%BE%D0%B2%2035%2F1'
  const gmapsUrl =
    'https://maps.google.com/maps?q=Dastur+Hall+%D0%A8%D0%B0%D1%85%D1%82%D0%B5%D1%80%D0%BE%D0%B2+35%2F1+%D0%9A%D0%B0%D1%80%D0%B0%D0%B3%D0%B0%D0%BD%D0%B4%D0%B0&output=embed&z=15'

  return (
    <section
      ref={ref}
      className="py-24 px-5 text-center"
      style={{ background: 'linear-gradient(to bottom, #EDE0C8, #FAF7F2)' }}
    >
      <div className="max-w-[640px] mx-auto">
        <motion.span
          className="font-body text-[9px] font-bold tracking-[0.45em] text-gold uppercase mb-5 block"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {t.locLabel}
        </motion.span>

        <motion.h2
          className="font-display text-[clamp(2rem,5vw,2.4rem)] font-bold text-text-deep mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          {t.locTitle}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div
            className="relative overflow-hidden"
            style={{ border: '2px solid #E8D5A3', background: '#FDFBF7' }}
          >
            {/* Venue header */}
            <div className="px-6 py-7">
              <div className="font-display text-[2.5rem] font-bold text-text-deep tracking-[0.04em]">
                Dastur Hall
              </div>
              <div className="font-body font-semibold text-[12px] tracking-[0.2em] text-text-soft mt-1 uppercase">
                Шахтеров 35/1 · Қарағанды
              </div>

              <div className="w-10 h-px mx-auto my-5" style={{ background: '#E8D5A3' }} />

              <div className="font-body font-bold text-[11px] tracking-[0.2em] text-gold uppercase">
                {t.locDate}
              </div>
            </div>

            {/* Map */}
            <div className="relative h-52 overflow-hidden">
              <iframe
                src={gmapsUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="Dastur Hall location"
              />
            </div>

            {/* Button */}
            <div className="px-6 py-5">
              <a
                href={twoGisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 font-body text-[12px] font-bold tracking-[0.35em] uppercase text-gold-dark transition-all duration-300 hover:text-ivory group relative overflow-hidden"
                style={{ border: '1px solid #C9A96E' }}
              >
                <span className="absolute inset-0 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400" />
                <span className="relative z-10">
                  {t.mapBtn} →
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
