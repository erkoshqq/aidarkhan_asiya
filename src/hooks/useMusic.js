import { useState, useRef } from 'react'

export function useMusic() {
  const [playing, setPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const masterRef = useRef(null)

  const start = () => {
    if (audioCtxRef.current) return
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    audioCtxRef.current = ctx

    const master = ctx.createGain()
    master.gain.value = 0.1
    master.connect(ctx.destination)
    masterRef.current = master

    // Reverb-like effect using convolver
    const delay = ctx.createDelay(2)
    delay.delayTime.value = 0.3
    const delayGain = ctx.createGain()
    delayGain.gain.value = 0.25
    delay.connect(delayGain)
    delayGain.connect(master)

    const playNote = (freq, start, dur, vol = 0.3, type = 'sine') => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(master)
      gain.connect(delay)
      osc.type = type
      osc.frequency.value = freq
      const t = ctx.currentTime + start
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(vol, t + 0.15)
      gain.gain.setValueAtTime(vol, t + dur - 0.2)
      gain.gain.linearRampToValueAtTime(0, t + dur + 0.1)
      osc.start(t)
      osc.stop(t + dur + 0.15)
    }

    // Gentle pentatonic melody — warm, romantic
    const melody = [
      // Phrase 1
      [392, 0, 1.5, 0.3],
      [440, 1.2, 1.2, 0.28],
      [494, 2.2, 1.0, 0.28],
      [523, 3.0, 1.8, 0.32],
      [494, 4.5, 1.0, 0.25],
      [440, 5.3, 1.2, 0.28],
      [392, 6.2, 2.2, 0.3],
      // Phrase 2
      [349, 8.8, 1.2, 0.25],
      [392, 9.8, 1.0, 0.28],
      [440, 10.6, 1.5, 0.3],
      [494, 11.8, 1.8, 0.32],
      [440, 13.3, 1.0, 0.28],
      [392, 14.2, 1.2, 0.28],
      [349, 15.2, 2.5, 0.3],
      // Phrase 3
      [330, 18, 1.2, 0.25],
      [349, 19, 1.0, 0.28],
      [392, 19.8, 1.5, 0.3],
      [440, 21, 2.0, 0.32],
      [392, 22.8, 1.0, 0.28],
      [349, 23.7, 1.2, 0.28],
      [330, 24.6, 3.0, 0.3],
      // Phrase 4 — resolution
      [294, 27.8, 1.2, 0.22],
      [330, 28.8, 1.0, 0.25],
      [349, 29.6, 1.5, 0.28],
      [392, 30.8, 2.5, 0.3],
      [440, 33, 1.5, 0.32],
      [392, 34.3, 3.5, 0.3],
    ]

    // Bass pad — ambient undertone
    const pads = [
      [196, 0, 8, 0.08],
      [220, 8, 8, 0.08],
      [196, 16, 8, 0.08],
      [165, 24, 14, 0.08],
    ]

    const scheduleBatch = (offset = 0) => {
      melody.forEach(([freq, start, dur, vol]) => {
        playNote(freq, start + offset, dur, vol)
      })
      pads.forEach(([freq, start, dur, vol]) => {
        playNote(freq * 0.5, start + offset, dur, vol, 'triangle')
      })
    }

    scheduleBatch(0)
    scheduleBatch(38)
    scheduleBatch(76)

    setPlaying(true)
  }

  const stop = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close()
      audioCtxRef.current = null
    }
    setPlaying(false)
  }

  const toggle = () => (playing ? stop() : start())

  return { playing, toggle, start }
}
