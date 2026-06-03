import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyCf2TzFbPWUUCgMSGWauwXJUyUxb21Dvi8Pk8YqgfdD-PiHvyCuy_3zJvmIl9SmuCM/exec'

export default function WishesSection({ t }) {
  const ref = useRef(null)
  const scrollRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [wishes, setWishes] = useState([])

  // Загружаем пожелания из Google Sheets при монтировании
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${APPS_SCRIPT_URL}?type=wishes`)
        const data = await res.json()
        if (Array.isArray(data.wishes)) {
          setWishes(data.wishes)
        }
      } catch (_) {
        // если не получилось — просто показываем пусто
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [])

  const handleSubmit = async () => {
    if (!name.trim() || !text.trim()) return
    setLoading(true)

    const payload = {
      type: 'wish',
      name: name.trim(),
      text: text.trim(),
      date: new Date().toLocaleString('ru-KZ'),
    }

    try {
      await fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) })
    } catch (_) {}

    const newWish = {
      id: Date.now().toString(),
      name: name.trim(),
      text: text.trim(),
      date: new Date().toLocaleDateString('ru-KZ'),
      isNew: true,
    }

    setWishes((prev) => [newWish, ...prev])
    setName('')
    setText('')
    setLoading(false)

    setTimeout(() => {
      scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
    }, 100)
  }

  return (
    <section
      ref={ref}
      className="py-24 px-5"
      style={{ background: 'linear-gradient(to bottom, #F5EDD8, #EDE0C8)' }}
    >
      <div className="max-w-[580px] mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            className="font-body text-[9px] font-bold tracking-[0.45em] text-gold uppercase mb-5 block"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            {t.wishesLabel}
          </motion.span>

          <motion.h2
            className="font-display text-[clamp(2rem,5vw,2.4rem)] font-bold text-text-deep mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            {t.wishesTitle}
          </motion.h2>

          <motion.p
            className="font-body text-[15px] font-bold text-text-soft"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.wishesSub}
          </motion.p>

          <div
            className="w-10 h-px mx-auto mt-8"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
          />
        </div>

        {/* ── HORIZONTAL SCROLL WISHES (above form) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mb-10 relative"
        >
          {/* Left fade mask */}
          <div
            className="absolute top-0 left-0 bottom-0 w-8 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to right, #F0E6D3, transparent)' }}
          />
          {/* Right fade mask */}
          <div
            className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to left, #EDE0C8, transparent)' }}
          />

          <div
            ref={scrollRef}
            className="overflow-x-auto overflow-y-hidden"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <style>{`.wishes-scroll::-webkit-scrollbar { display: none; }`}</style>

            {fetching ? (
              /* Скелетон загрузки */
              <div className="flex gap-4 pb-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 px-5 py-5"
                    style={{
                      width: '240px',
                      background: 'rgba(253,251,247,0.5)',
                      border: '1px solid #E8D5A3',
                    }}
                  >
                    <div className="h-3 rounded mb-3" style={{ background: '#E8D5A3', width: '60%', opacity: 0.5 }} />
                    <div className="h-2 rounded mb-2" style={{ background: '#E8D5A3', opacity: 0.4 }} />
                    <div className="h-2 rounded mb-2" style={{ background: '#E8D5A3', width: '80%', opacity: 0.4 }} />
                    <div className="h-2 rounded" style={{ background: '#E8D5A3', width: '50%', opacity: 0.3 }} />
                  </div>
                ))}
              </div>
            ) : wishes.length === 0 ? (
              /* Пусто — красивая заглушка */
              <div
                className="flex flex-col items-center justify-center py-10 px-6 text-center"
                style={{ minWidth: '100%' }}
              >
                <span className="text-2xl mb-3" style={{ color: '#C9A96E', opacity: 0.6 }}>✦</span>
                <p className="font-display text-[2rem] font-bold italic mb-2" style={{ color: '#9B7B3E' }}>
                  {t.wEmpty}
                </p>
                <p className="font-body text-[15px] font-bold tracking-[0.15em]" style={{ color: '#B89A6E', opacity: 0.8 }}>
                  {t.wishesSub}
                </p>
              </div>
            ) : (
              <div
                className="wishes-scroll flex gap-4 pb-2"
                style={{ width: 'max-content' }}
              >
                <AnimatePresence initial={false}>
                  {wishes.map((w, i) => (
                    <motion.div
                      key={w.id || i}
                      className="relative flex-shrink-0 px-5 py-5"
                      style={{
                        width: '240px',
                        background: w.isNew
                          ? 'linear-gradient(135deg, #FDFBF7, #F9F1E0)'
                          : 'rgba(253,251,247,0.75)',
                        border: w.isNew ? '1px solid #C9A96E' : '1px solid #E8D5A3',
                      }}
                      initial={{ opacity: 0, x: -20, scale: 0.97 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {w.isNew && (
                        <span className="absolute top-2 right-3 font-body text-[1px] text-gold">✦</span>
                      )}

                      <span
                        className="font-display text-[2rem] leading-[0] text-gold-light select-none block mb-2"
                        style={{ lineHeight: 1 }}
                      >
                        "
                      </span>

                      <p className="font-body font-bold text-[13px] text-text-mid leading-relaxed">
                        {w.text}
                      </p>

                      <div className="mt-4 pt-3" style={{ borderTop: '1px solid #E8D5A3' }}>
                        <div className="font-display text-[0.9rem] font-medium text-gold-dark italic">
                          — {w.name}
                        </div>
                        {w.date && (
                          <span className="font-body text-[9px] font-light text-text-soft tracking-[0.1em]">
                            {w.date}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>

        {/* Divider between list and form */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #E8D5A3)' }} />
          <span className="font-body text-[12px] font-bold tracking-[0.4em] text-gold uppercase">
            {t.wWishLabel}
          </span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #E8D5A3, transparent)' }} />
        </div>

        {/* ── FORM (below scroll list) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="mb-4">
            <label className="font-body text-[12px] font-bold tracking-[0.35em] uppercase text-text-soft block mb-2">
              {t.wNameLabel}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.wNamePh}
              className="w-full px-4 py-3 font-body font-bold text-[13px] text-text-deep bg-ivory outline-none transition-all duration-300"
              style={{ border: '1px solid #E8D5A3', borderRadius: 0 }}
            />
          </div>

          <div className="mb-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.wWishPh}
              rows={3}
              className="w-full px-4 py-3 font-body font-bold text-[13px] text-text-deep bg-ivory outline-none transition-all duration-300 resize-none"
              style={{ border: '1px solid #E8D5A3', borderRadius: 0 }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !name.trim() || !text.trim()}
            className="w-full py-3 font-body text-[15px] font-bold tracking-[0.35em] uppercase relative overflow-hidden group disabled:opacity-40"
            style={{ border: '1px solid #C9A96E', color: '#9B7B3E', background: 'transparent' }}
          >
            <span className="absolute inset-0 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 group-disabled:hidden" />
            <span className="relative z-10 group-hover:text-ivory transition-colors duration-500">
              {loading ? '...' : t.wSubmit}
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  )
}