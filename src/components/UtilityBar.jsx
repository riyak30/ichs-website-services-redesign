import { useState, useEffect, useRef } from 'react'

const LANGUAGES = [
  { flag: '🇺🇸', en: 'English', native: null },
  { flag: '🇨🇳', en: 'Chinese (Simplified)', native: '简体字' },
  { flag: '🇹🇼', en: 'Chinese (Traditional)', native: '繁體字' },
  { flag: '🇻🇳', en: 'Vietnamese', native: 'Tiếng Việt' },
  { flag: '🇰🇷', en: 'Korean', native: '한국어' },
  { flag: '🇪🇸', en: 'Spanish', native: 'Español' },
  { flag: '🇪🇹', en: 'Amharic', native: 'አማርኛ' },
  { flag: '🇷🇺', en: 'Russian', native: 'Русский' },
  { flag: '🇮🇳', en: 'Hindi', native: 'हिन्दी' },
  { flag: '🇸🇴', en: 'Somali', native: 'Soomaali' },
  { flag: '🇵🇭', en: 'Tagalog', native: 'Tagalog' },
  { flag: '🇪🇷', en: 'Tigrinya', native: 'ትግርኛ' },
]

export default function UtilityBar() {
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="util-bar">
      <div className="util-left">
        {/* Language Selector */}
        <div
          ref={btnRef}
          className={`lang-btn${open ? ' open' : ''}`}
          onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}
        >
          <div className="g-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#026E70" strokeWidth="2"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#026E70" strokeWidth="2"/>
            </svg>
          </div>
          Select Language
          <span className="chevron">▼</span>
          {open && (
            <div className="lang-dropdown" onClick={(e) => e.stopPropagation()}>
              <div className="lang-dropdown-title">Choose your language</div>
              <div className="lang-grid">
                {LANGUAGES.map((lang, i) => (
                  <div key={lang.en} className={`lang-option${i === 0 ? ' active' : ''}`}>
                    <span className="flag">{lang.flag}</span>
                    <div className="lang-names">
                      <span className="lang-en">{lang.en}</span>
                      {lang.native && <span className="lang-native">{lang.native}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Call Center */}
        <div className="util-info-block">
          <div className="icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div className="info-text">
            <span className="info-label">Call Center</span>
            <span className="info-sub"><a href="tel:2067883700">(206) 788-3700</a></span>
          </div>
        </div>

        {/* Hours */}
        <div className="util-info-block">
          <div className="icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div className="info-text">
            <span className="info-label">Working Hours</span>
            <span className="info-sub">Mon–Sat: 8am–5pm · Sun: Closed</span>
          </div>
        </div>
      </div>

      <div className="util-right">
        <div className="util-search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Search" />
        </div>
        <a className="util-cta" href="https://wamt.myonlinechart.org" target="_blank" rel="noopener noreferrer">MyChart Login</a>
        <a className="util-cta" href="#">Donate</a>
      </div>
    </div>
  )
}
