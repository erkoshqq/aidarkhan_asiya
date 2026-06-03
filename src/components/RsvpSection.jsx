import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ⬇️ Replace with your Google Apps Script Web App URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0R6U-jY7D23fGXD_3nHD9fZFT66JYwZs2xzDGjbo9CE5XWaAPXLDaj2RrGf5WEuit/exec'

export default function RsvpSection({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [name, setName] = useState('')
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [nameError, setNameError] = useState(false)

  const options = [
    { id: 'come', label: t.rsvpOpt1 },
    { id: 'couple', label: t.rsvpOpt2 },
    { id: 'no', label: t.rsvpOpt3 },
  ]

  const handleSubmit = async () => {
    if (!name.trim()) { setNameError(true); return }
    if (!selected) return
    setLoading(true)

    const selectedLabel = options.find((o) => o.id === selected)?.label || selected
    const payload = {
      type: 'rsvp',
      name: name.trim(),
      status: selectedLabel,
      date: new Date().toLocaleString('ru-KZ'),
    }

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
      })
    } catch (_) {
      // no-cors always throws, that's expected
    }

    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section
      ref={ref}
      className="py-24 px-5 text-center"
      style={{ background: 'linear-gradient(to bottom, #FAF7F2, #F5EDD8)' }}
    >
      <div className="max-w-[480px] mx-auto">
        <motion.span
          className="font-body text-[9px] font-light tracking-[0.45em] text-gold uppercase mb-5 block"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {t.rsvpLabel}
        </motion.span>

        <motion.h2
          className="font-display text-[clamp(1.6rem,5vw,2.4rem)] font-light text-text-deep mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          {t.rsvpTitle}
        </motion.h2>

        <motion.p
          className="font-body text-[12px] font-light text-text-soft mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t.rsvpSub}
        </motion.p>

        <div className="w-10 h-px mx-auto mb-10" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              className="text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Name */}
              <div className="mb-5">
                <label className="font-body text-[9px] font-light tracking-[0.35em] uppercase text-text-soft block mb-2">
                  {t.rsvpNameLabel}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setNameError(false) }}
                  placeholder={t.rsvpNamePh}
                  className="w-full px-4 py-3 font-body font-light text-[14px] text-text-deep bg-ivory outline-none transition-all duration-300"
                  style={{
                    border: nameError ? '1px solid #C9A96E' : '1px solid #E8D5A3',
                    borderRadius: 0,
                  }}
                />
              </div>

              {/* Options */}
              <div className="mb-6">
                <label className="font-body text-[9px] font-light tracking-[0.35em] uppercase text-text-soft block mb-3">
                  {t.rsvpStatusLabel}
                </label>
                <div className="flex flex-col gap-2">
                  {options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelected(opt.id)}
                      className="flex items-center gap-3 px-4 py-3 text-left transition-all duration-300"
                      style={{
                        border: selected === opt.id ? '1px solid #C9A96E' : '1px solid #E8D5A3',
                        background: selected === opt.id ? 'linear-gradient(135deg, #FDFBF7, #F5EDD8)' : '#FDFBF7',
                      }}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{
                          borderColor: selected === opt.id ? '#C9A96E' : '#E8D5A3',
                          background: selected === opt.id ? '#C9A96E' : 'transparent',
                        }}
                      >
                        {selected === opt.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-ivory" />
                        )}
                      </div>
                      <span className="font-body font-light text-[13px] text-text-mid">
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 font-body text-[10px] font-light tracking-[0.4em] uppercase transition-all duration-400 relative overflow-hidden group"
                style={{ border: '1px solid #C9A96E', color: '#9B7B3E', background: 'transparent' }}
              >
                <span className="absolute inset-0 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative z-10 group-hover:text-ivory transition-colors duration-500">
                  {loading ? '...' : t.rsvpSubmit}
                </span>
              </button>

              <p className="font-body text-[10px] font-light text-text-soft text-center mt-4 tracking-[0.1em]">
                {t.rsvpNote}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="thanks"
              className="py-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-gold text-2xl mb-4">✦</div>
              <div className="font-display text-[2rem] font-light italic text-text-deep mb-3">
                {t.thankTitle}
              </div>
              <div className="font-body font-light text-[13px] text-text-mid leading-relaxed">
                {t.thankText}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
