import { useState } from 'react'
import { useLang } from './hooks/useLang'
import { useMusic } from './hooks/useMusic'
import SplashScreen from './components/SplashScreen'
import Header from './components/Header'
import MusicButton from './components/MusicButton'
import HeroSection from './components/HeroSection'
import QuoteSection from './components/QuoteSection'
import InvitationSection from './components/InvitationSection'
import HostsSection from './components/HostsSection'
import CountdownSection from './components/CountdownSection'
import LocationSection from './components/LocationSection'
import RsvpSection from './components/RsvpSection'
import WishesSection from './components/WishesSection'
import Footer from './components/Footer'

export default function App() {
  const { lang, setLang, t } = useLang()
  const { playing, toggle, start } = useMusic()
  const [splashVisible, setSplashVisible] = useState(true)
  const [uiVisible, setUiVisible] = useState(false)

  const handleOpen = () => {
    setSplashVisible(false)
    setTimeout(() => {
      setUiVisible(true)
      start()
    }, 400)
  }

  return (
    <div className="min-h-screen" style={{ background: '#FAF7F2' }}>
      <SplashScreen visible={splashVisible} onOpen={handleOpen} t={t} />

      <Header lang={lang} setLang={setLang} visible={uiVisible} />
      <MusicButton playing={playing} onToggle={toggle} visible={uiVisible} />

      {/* Main content — always in DOM for SEO, but opacity transition */}
      <main
        style={{
          opacity: uiVisible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.4s',
          pointerEvents: uiVisible ? 'auto' : 'none',
        }}
      >
        <HeroSection t={t} />
        <QuoteSection t={t} />
        <InvitationSection t={t} />
        <HostsSection t={t} />
        <CountdownSection t={t} />
        <LocationSection t={t} />
        <RsvpSection t={t} />
        <WishesSection t={t} />
        <Footer t={t} />
      </main>
    </div>
  )
}
