import { motion } from 'framer-motion'

export default function Header({ lang, setLang, visible }) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 py-4"
      style={{
        background: 'linear-gradient(to bottom, rgba(250,247,242,0.95) 0%, transparent 100%)',
        backdropFilter: 'blur(10px)',
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="font-display text-[1.05rem] font-light text-text-mid tracking-[0.12em]">
        А&nbsp;&amp;&nbsp;А
      </div>

      <div className="flex border border-gold-light">
        <button
          onClick={() => setLang('kk')}
          className={`px-3 py-2 font-body text-[9px] font-light tracking-[0.25em] uppercase transition-all duration-300 ${
            lang === 'kk' ? 'bg-gold text-ivory' : 'text-text-soft hover:text-text-mid'
          }`}
        >
          ҚАЗ
        </button>
        <button
          onClick={() => setLang('ru')}
          className={`px-3 py-2 font-body text-[9px] font-light tracking-[0.25em] uppercase transition-all duration-300 ${
            lang === 'ru' ? 'bg-gold text-ivory' : 'text-text-soft hover:text-text-mid'
          }`}
        >
          РУС
        </button>
      </div>
    </motion.header>
  )
}
