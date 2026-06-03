import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen({ visible, onOpen, t }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.55 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }))

    // Kazakh ornament dots arranged in a pattern
    const ornamentDots = []
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    for (let r = 60; r <= 220; r += 55) {
      const count = Math.floor((2 * Math.PI * r) / 40)
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2
        ornamentDots.push({
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
          size: r < 120 ? 1.5 : 1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Ornament pattern
      ornamentDots.forEach((d) => {
        ctx.save()
        ctx.globalAlpha = 0.06
        ctx.fillStyle = '#C9A96E'
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Floating particles
      particles.forEach((p) => {
        p.pulse += 0.02
        const opacity = p.opacity + Math.sin(p.pulse) * 0.1
        ctx.save()
        ctx.globalAlpha = Math.max(0, opacity)
        ctx.fillStyle = '#C9A96E'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #FAF7F2 0%, #F0E6D3 50%, #EDE0C8 100%)',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[280px] h-[280px] rounded-full border border-gold-light opacity-10"
              style={{ borderWidth: '1px' }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[380px] h-[380px] rounded-full border border-gold-light opacity-[0.06]"
              style={{ borderWidth: '1px' }}
            />
          </div>

          <div className="relative z-10 text-center px-8">
            <motion.p
              className="font-body text-[10px] font-light tracking-[0.5em] text-gold-dark uppercase mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t.splashLabel}
            </motion.p>

            <motion.div
              className="font-display text-[clamp(3rem,13vw,5.5rem)] font-light leading-[0.9] text-text-deep tracking-[-0.02em]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div>Айдархан</div>
              <div className="italic text-gold font-light my-2" style={{ fontSize: '0.55em' }}>
                &amp;
              </div>
              <div>Асия</div>
            </motion.div>

            <motion.p
              className="font-body text-[12px] font-light tracking-[0.35em] text-text-soft mt-6 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              01 · 08 · 2026
            </motion.p>

            <motion.div
              className="w-14 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-8"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            />

            <motion.button
              onClick={onOpen}
              className="relative overflow-hidden border border-gold text-gold-dark font-body text-[10px] font-light tracking-[0.4em] uppercase px-10 py-4 transition-all duration-500 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-ivory transition-colors duration-500">
                {t.openBtn}
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
