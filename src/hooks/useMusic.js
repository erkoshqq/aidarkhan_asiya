import { useState, useRef } from 'react'

// 🎵 Укажи путь к своей песне здесь:
const MUSIC_SRC = '/song.mp3'

export function useMusic() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const start = () => {
    if (!audioRef.current) {
      const audio = new Audio(MUSIC_SRC)
      audio.loop = true
      audio.volume = 0.4
      audioRef.current = audio
    }
    audioRef.current.play().catch(() => {})
    setPlaying(true)
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setPlaying(false)
  }

  const toggle = () => (playing ? stop() : start())

  return { playing, toggle, start }
}