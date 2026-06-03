import { motion } from 'framer-motion'

export default function MusicButton({ playing, onToggle, visible }) {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed bottom-6 right-4 z-[200] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group"
      style={{
        background: 'rgba(253,251,247,0.92)',
        border: '1px solid #E8D5A3',
        backdropFilter: 'blur(10px)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      title={playing ? 'Музыка өшіру' : 'Музыка қосу'}
    >
      {playing ? (
        <MusicOnIcon />
      ) : (
        <MusicOffIcon />
      )}
    </motion.button>
  )
}

function MusicOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B7B3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

function MusicOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  )
}
