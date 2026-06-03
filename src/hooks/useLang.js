import { useState, useEffect } from 'react'
import { translations } from '../i18n/translations'

export function useLang() {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('wedding_lang') || 'kk'
  })

  const setLang = (l) => {
    setLangState(l)
    localStorage.setItem('wedding_lang', l)
  }

  const t = translations[lang]

  return { lang, setLang, t }
}
