import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const STATS = [
  { target: 60000, label: 'Patients Served Annually', suffix: '+', display: '60k+' },
  { target: 90,    label: 'Languages Spoken',          suffix: '+', display: '90+' },
  { target: 13,    label: 'Clinics & Service Sites',   suffix: '',  display: '13' },
  { target: 50,    label: 'Years of Community Care',   suffix: '+', display: '50+' },
]

const TIMELINE = [
  { year: '1973', tag: 'Founded', title: 'ICHS Opens Its Doors', desc: 'Founded by community advocates in Seattle\'s Chinatown-International District to address the lack of culturally appropriate healthcare for Asian American residents. The clinic opened with a small team of volunteer physicians and nurses.' },
  { year: '1980s', tag: 'Growth', title: 'Expanding Services & Languages', desc: 'ICHS expanded its language services and began offering dental care and social services. The organization grew to serve Vietnamese, Cambodian, Laotian, and other Southeast Asian refugee communities arriving in Seattle.' },
  { year: '1990s', tag: 'Federally Qualified', title: 'Federally Qualified Health Center Designation', desc: 'ICHS received its FQHC designation, enabling expanded services and sliding-scale fees. Behavioral health, pharmacy, and women\'s health programs were introduced, creating a truly comprehensive care model.' },
  { year: '2000s', tag: 'New Clinics', title: 'Holly Park & Shoreline Clinics Open', desc: 'ICHS expanded beyond the International District, opening new clinics in Holly Park and Shoreline to meet growing demand. ICHS Legacy House, an assisted living facility for older adults, opened in the International District.' },
  { year: '2010s', tag: 'Innovation', title: 'Telehealth & Integrated Care', desc: 'ICHS pioneered integrated behavioral health, embedding mental health professionals into primary care settings. Telehealth services were launched to reach patients across Washington State, dramatically improving access to care.' },
  { year: 'Today', tag: 'Present', title: '13 Sites. 60,000+ Patients. Still Growing.', desc: 'ICHS now operates 13 full-service clinics and community sites across Seattle, Shoreline, Bellevue, and Auburn — serving 60,000+ patients annually in 90+ languages, with a team of over 600 dedicated staff and providers.', isToday: true },
]

const LEADERS = [
  { name: 'Teresita Batayola', initials: 'TC', title: 'President & Chief Executive Officer', grad: 'linear-gradient(135deg,var(--teal-dark),#015557)' },
  { name: 'Melissa Burroughs', initials: 'MB', title: 'Chief Operating Officer',             grad: 'linear-gradient(135deg,var(--navy),#0d3848)' },
  { name: 'Dr. David Frank',   initials: 'DF', title: 'Chief Medical Officer',               grad: 'linear-gradient(135deg,var(--crimson),#5a0b25)' },
  { name: 'Sharon Leong',      initials: 'SL', title: 'Chief Financial Officer',             grad: 'linear-gradient(135deg,#5a4f00,#8a7800)' },
  { name: 'Kim Nguyen',        initials: 'KN', title: 'Chief People Officer',                grad: 'linear-gradient(135deg,#2d6a00,#4a9c00)' },
  { name: 'Rosa Park',         initials: 'RP', title: 'Chief Dental Officer',                grad: 'linear-gradient(135deg,#3d2060,#6040a0)' },
]

const ACCREDITATIONS = [
  { name: 'FQHC Designation',           desc: 'Federally Qualified Health Center',                       icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.5" style={{width:22,height:22}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg> },
  { name: 'Joint Commission Accredited', desc: 'Gold Seal of Approval — Quality & Safety',               icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.5" style={{width:22,height:22}}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg> },
  { name: 'NCQA PCMH Level 3',           desc: 'Patient-Centered Medical Home Recognition',              icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.5" style={{width:22,height:22}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { name: 'Health Center Quality Leader', desc: 'HRSA Top-Performing Health Center',                     icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.5" style={{width:22,height:22}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { name: 'Health Equity Champion',       desc: 'Washington State DOH Recognition',                     icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.5" style={{width:22,height:22}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { name: 'LGBTQ+ Inclusive Care',        desc: 'Human Rights Campaign Healthcare Equality Index',      icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.5" style={{width:22,height:22}}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
  { name: 'Community Health Center',      desc: 'HRSA Health Center Program Grantee',                   icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.5" style={{width:22,height:22}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
]

const WELCOME_ITEMS = [
  { text: 'All races and ethnicities',       icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-mid)" strokeWidth="1.5" style={{width:18,height:18}}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
  { text: 'All immigrants and refugees',     icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-mid)" strokeWidth="1.5" style={{width:18,height:18}}><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg> },
  { text: 'All languages and cultures',      icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-mid)" strokeWidth="1.5" style={{width:18,height:18}}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { text: 'All faiths and beliefs',          icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-mid)" strokeWidth="1.5" style={{width:18,height:18}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
  { text: 'All genders and sexual orientations', icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-mid)" strokeWidth="1.5" style={{width:18,height:18}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { text: 'All ages and abilities',          icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-mid)" strokeWidth="1.5" style={{width:18,height:18}}><circle cx="12" cy="5" r="2"/><path d="M12 7v10M9 10h6M9 17l3 4 3-4"/></svg> },
]

const LANG_PILLS = [
  { flag: '🇺🇸', lang: 'English' }, { flag: '🇨🇳', lang: 'Mandarin' }, { flag: '🇨🇳', lang: 'Cantonese' },
  { flag: '🇻🇳', lang: 'Vietnamese' }, { flag: '🇰🇷', lang: 'Korean' }, { flag: '🇪🇸', lang: 'Spanish' },
  { flag: '🇪🇹', lang: 'Amharic' }, { flag: '🇷🇺', lang: 'Russian' }, { flag: '🇮🇳', lang: 'Hindi' },
  { flag: '🇮🇳', lang: 'Urdu' }, { flag: '🇵🇭', lang: 'Tagalog' }, { flag: '🇸🇴', lang: 'Somali' },
  { flag: '🇪🇷', lang: 'Tigrinya' }, { flag: null, lang: '+ 80 more' },
]

function animateCount(el, target, suffix) {
  const duration = 1800
  const start = performance.now()
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(eased * target)
    if (target >= 60000) el.textContent = Math.round(current / 1000) + 'k' + suffix
    else el.textContent = current + suffix
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function AboutPage() {
  const statRefs = useRef([])

  useEffect(() => {
    const observers = []
    statRefs.current.forEach((el, i) => {
      if (!el) return
      const stat = STATS[i]
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { animateCount(el, stat.target, stat.suffix); obs.unobserve(el) } })
      }, { threshold: 0.5 })
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 420px' }}>
        {/* Left: navy */}
        <div style={{ background: 'var(--navy)', padding: '64px 48px 48px', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(117,205,211,0.15)', border: '1px solid rgba(117,205,211,0.3)', borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 700, color: 'var(--teal-mid)', fontFamily: 'var(--font-head)', marginBottom: 20 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-mid)" strokeWidth="2" style={{ width: 12, height: 12 }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            Since 1973 · Seattle, WA
          </div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 40, fontWeight: 700, color: 'white', lineHeight: 1.15, marginBottom: 20 }}>
            Make ICHS Your<br/>Health Care Home
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: 36, maxWidth: 520 }}>
            ICHS isn't just a clinic — it's a community-rooted wellness system built for every stage of life. Serving Seattle's diverse communities with compassionate, affordable, and culturally responsive care.
          </p>
          {/* Stat strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 24, gap: 0 }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{ textAlign: 'center', padding: '0 8px', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
                <div ref={el => statRefs.current[i] = el} style={{ fontFamily: 'var(--font-head)', fontSize: 26, fontWeight: 700, color: 'white', lineHeight: 1 }}>{s.display}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 600, color: 'var(--muted)', marginTop: 5, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: teal-light */}
        <div style={{ background: 'var(--teal-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '52px 40px', gap: 32 }}>
          {/* Welcome badge with logo */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '28px 32px', textAlign: 'center', width: '100%', boxShadow: '0 8px 32px rgba(2,110,112,0.12)', border: '2px solid rgba(2,110,112,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <img src="/img/logo.png" alt="ICHS Logo" style={{ height: 36 }} onError={e => e.target.style.display = 'none'} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 700, color: 'var(--teal-dark)', lineHeight: 1.1, marginBottom: 0 }}>
              <span style={{ color: 'var(--navy)' }}>Everyone</span> Is<br/>WELCOME
            </h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 10, lineHeight: 1.6 }}>
              We serve all patients regardless of insurance, immigration status, or ability to pay.
            </p>
          </div>
          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="#mission"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, background: 'var(--crimson)', color: 'white', border: '2px solid var(--crimson)', textDecoration: 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#6b0d2d'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--crimson)'}
            >
              Learn Our Mission
            </a>
            <Link
              to="/location"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, background: 'transparent', color: 'var(--navy)', border: '2px solid rgba(7,44,56,0.4)', textDecoration: 'none', transition: 'background 0.15s, color 0.15s, border-color 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--navy)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--navy)'; e.currentTarget.style.borderColor = 'rgba(7,44,56,0.4)' }}
            >
              Find a Location
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT LAYOUT: Sidebar + Sections ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', alignItems: 'start' }}>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', background: 'white', borderRight: '1px solid rgba(0,0,0,0.07)', padding: '28px 0', zIndex: 50 }}>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--teal-dark)', padding: '0 20px 10px', borderBottom: '1px solid rgba(0,0,0,0.06)', marginBottom: 8 }}>
            About ICHS
          </div>
          {[
            { href: '#mission',      label: 'Our Mission' },
            { href: '#welcome',      label: 'Everyone Is Welcome' },
            { href: '#history',      label: 'Our History' },
            { href: '#leadership',   label: 'Leadership' },
            { href: '#accreditation',label: 'Accreditation' },
            { href: '#join',         label: 'Get Involved' },
          ].map(({ href, label }) => (
            <a key={href} href={href} style={{ display: 'block', padding: '11px 20px', fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600, color: 'var(--navy)', borderLeft: '3px solid transparent', textDecoration: 'none', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(2,110,112,0.06)'; e.currentTarget.style.color = 'var(--teal-dark)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--navy)' }}
            >
              {label}
            </a>
          ))}
          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '12px 0' }} />
          <div style={{ margin: 16, background: 'var(--navy)', borderRadius: 'var(--radius-md)', padding: 18 }}>
            <h6 style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 6 }}>Find a Location</h6>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, marginBottom: 14 }}>13 clinics serving Greater Seattle — find the one closest to you.</p>
            <Link to="/location" style={{ display: 'block', textAlign: 'center', padding: '9px 16px', borderRadius: 40, background: 'var(--crimson)', color: 'white', border: '1.5px solid var(--crimson)', fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
              View Locations
            </Link>
          </div>
        </aside>

        {/* Main sections */}
        <div>

          {/* ── MISSION ── */}
          <section id="mission" style={{ background: 'white', padding: '88px 40px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
              {/* Visual column */}
              <div style={{ position: 'relative' }}>
                <div style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg, var(--teal-light) 0%, #a8dfe0 60%, var(--teal-mid) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(2,110,112,0.2)' }}>
                  <svg viewBox="0 0 200 200" style={{ width: '55%', height: '55%', stroke: 'var(--teal-dark)', fill: 'none', strokeWidth: 0.6, opacity: 0.25 }}>
                    <circle cx="100" cy="70" r="40"/><path d="M30 180c0-38.7 31.3-70 70-70s70 31.3 70 70"/>
                  </svg>
                </div>
                <div style={{ position: 'absolute', bottom: 8, right: 10, background: 'var(--teal-dark)', borderRadius: 'var(--radius-lg)', padding: '18px 22px', textAlign: 'center', boxShadow: '0 8px 24px rgba(7,44,56,0.3)' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 32, fontWeight: 700, color: 'var(--teal-mid)', lineHeight: 1 }}>1973</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 3, fontFamily: 'var(--font-head)' }}>Serving Our Community</div>
                </div>
              </div>

              {/* Text column */}
              <div>
                <span style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--teal-dark)', display: 'block', marginBottom: 10 }}>Our Mission</span>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 36, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15, marginBottom: 16 }}>Rooted in Community.<br/>Committed to All.</h2>
                <p style={{ fontSize: 16, color: 'var(--ink)', lineHeight: 1.8, marginBottom: 20 }}>
                  ICHS isn't just a clinic — it's a <strong style={{ color: 'var(--teal-dark)', fontWeight: 700 }}>community-rooted wellness system</strong> designed for every stage of life. From primary medical care to behavioral health, dental, and vision, we provide a seamless circle of support for all, promoting health equity and ensuring everyone receives culturally and linguistically appropriate care.
                </p>
                <p style={{ fontSize: 16, color: 'var(--ink)', lineHeight: 1.8, marginBottom: 20 }}>
                  Deeply rooted in the Asian Pacific Islander community, ICHS has grown into a trusted health and wellness home for people of <strong style={{ color: 'var(--teal-dark)', fontWeight: 700 }}>all backgrounds</strong>. Our mission is to meet every patient where they are — honoring their culture, their language, and their unique needs.
                </p>
                <p style={{ fontSize: 16, color: 'var(--ink)', lineHeight: 1.8, marginBottom: 36 }}>
                  Visit one of our <strong style={{ color: 'var(--teal-dark)', fontWeight: 700 }}>13 full service clinics or service sites</strong> today, conveniently located in Seattle's Chinatown-International District and Holly Park neighborhoods, and in the cities of Shoreline, Bellevue, and Auburn.
                </p>

                {/* Pillars */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { title: 'Accessibility', desc: 'Affordable care: Sliding-scale discounts and insurance enrollment help.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{width:18,height:18}}><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg> },
                    { title: 'Inclusivity', desc: 'Interpretation in 90+ languages; care for all, regardless of age, status, or income.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{width:18,height:18}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                    { title: 'Comprehensive Care', desc: 'All-in-one care: Medical, dental, vision, behavioral health, and nutrition.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{width:18,height:18}}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
                    { title: 'Community Centered', desc: 'You are at the heart of everything we do — care that meets you where you are.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{width:18,height:18}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
                  ].map(p => (
                    <div key={p.title} style={{ background: 'var(--teal-light)', borderRadius: 'var(--radius-md)', padding: '18px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--teal-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {p.icon}
                      </div>
                      <div>
                        <h4 style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>{p.title}</h4>
                        <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── WE WELCOME ALL PEOPLE ── */}
          <section id="welcome" style={{ background: 'var(--navy)', padding: '88px 40px' }}>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginBottom: 60 }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 10 }}>Inclusion &amp; Equity</span>
                  <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 36, fontWeight: 700, color: 'white', lineHeight: 1.15 }}>
                    We Welcome<br/><span style={{ color: 'var(--teal-mid)' }}>All People</span>
                  </h2>
                </div>
                <div>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75 }}>
                    ICHS advocates for health as a human right and welcomes all in need of care regardless of health, immigration status or ability to pay. We honor and respect every person who walks through our doors — their identity, their background, and their story.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                {WELCOME_ITEMS.map(item => (
                  <div key={item.text} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', padding: '20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(117,205,211,0.15)', border: '1.5px solid rgba(117,205,211,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <span style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600, color: 'white', lineHeight: 1.3 }}>{item.text}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 52 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, color: 'var(--teal-mid)', marginBottom: 16 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-mid)" strokeWidth="2" style={{ width: 16, height: 16 }}>
                    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  We provide interpretation in 90+ languages, including:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {LANG_PILLS.map(({ flag, lang }) => (
                    <span key={lang} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.12)', fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 600, color: 'white' }}>
                      {flag && <span style={{ fontSize: 16 }}>{flag}</span>}{lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── HISTORY TIMELINE ── */}
          <section id="history" style={{ background: '#f8f7f5', padding: '88px 40px' }}>
            <div>
              <div style={{ marginBottom: 56 }}>
                <span style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--teal-dark)', display: 'block', marginBottom: 10 }}>Our History</span>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 36, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15, marginBottom: 16 }}>Over 50 Years of<br/>Serving Our Community</h2>
                <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.75, maxWidth: 600 }}>From a single clinic in the International District to a network of 13 sites across Greater Seattle — our story is one of growth, resilience, and unwavering commitment to health equity.</p>
              </div>

              <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
                {/* Left vertical line */}
                <div style={{ position: 'absolute', left: 32, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, var(--teal-dark) 0%, var(--teal-mid) 100%)' }} />
                {TIMELINE.map(item => (
                  <div key={item.year} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 28, marginBottom: 40, position: 'relative' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: item.isToday ? 'var(--teal-mid)' : 'var(--teal-dark)', border: '4px solid #f8f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, boxShadow: '0 4px 16px rgba(2,110,112,0.3)' }}>
                      <span style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, color: item.isToday ? 'var(--navy)' : 'white', textAlign: 'center', lineHeight: 1.1 }}>{item.year}</span>
                    </div>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: item.isToday ? '1.5px solid var(--teal-mid)' : '1.5px solid rgba(0,0,0,0.06)', padding: '22px 26px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                      <span style={{ display: 'inline-block', background: item.isToday ? 'var(--teal-dark)' : 'var(--teal-light)', color: item.isToday ? 'white' : 'var(--teal-dark)', fontFamily: 'var(--font-head)', fontSize: 10, fontWeight: 700, borderRadius: 20, padding: '3px 10px', marginBottom: 8 }}>{item.tag}</span>
                      <h4 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>{item.title}</h4>
                      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── LEADERSHIP ── */}
          <section id="leadership" style={{ background: 'white', padding: '88px 40px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--teal-dark)', display: 'block', marginBottom: 10 }}>Our Team</span>
              <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 36, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15, marginBottom: 12 }}>Leadership</h2>
              <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.75, maxWidth: 600, marginBottom: 52 }}>Our experienced leadership team is committed to ICHS's mission of providing accessible, culturally responsive health care for all.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                {LEADERS.map(leader => (
                  <article
                    key={leader.name}
                    style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1.5px solid rgba(0,0,0,0.07)', overflow: 'hidden', transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal-mid)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(2,110,112,0.13)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
                  >
                    <div style={{ height: 192, background: leader.grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-head)', fontSize: 52, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: -2 }}>{leader.initials}</span>
                    </div>
                    <div style={{ padding: 20 }}>
                      <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>{leader.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.4 }}>{leader.title}</div>
                      <a
                        href="#"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, color: 'var(--teal-dark)', marginTop: 10, borderBottom: '1.5px solid var(--teal-dark)', textDecoration: 'none', transition: 'color 0.15s, border-color 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#015557'; e.currentTarget.style.borderBottomColor = '#015557' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--teal-dark)'; e.currentTarget.style.borderBottomColor = 'var(--teal-dark)' }}
                      >
                        Read Bio →
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: 40 }}>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, background: 'transparent', color: 'var(--teal-dark)', border: '2px solid var(--teal-dark)', textDecoration: 'none' }}>
                  View Full Leadership Team
                </a>
              </div>
            </div>
          </section>

          {/* ── ACCREDITATION ── */}
          <section id="accreditation" style={{ background: '#EFE9E6', padding: '64px 40px' }}>
            <div>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <span style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--teal-dark)', display: 'block', marginBottom: 10 }}>Standards &amp; Recognition</span>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 36, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Accreditation &amp; Recognition</h2>
                <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.75, maxWidth: 540, margin: '0 auto' }}>ICHS is committed to the highest standards of care, safety, and community health excellence.</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
                {ACCREDITATIONS.map(a => (
                  <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 22px', background: 'white', borderRadius: 'var(--radius-md)', border: '1.5px solid rgba(0,0,0,0.07)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {a.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>{a.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── JOIN / GET INVOLVED ── */}
          <section id="join" style={{ background: 'var(--crimson)', padding: '88px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 38, fontWeight: 700, color: 'white', marginBottom: 18, lineHeight: 1.15 }}>
                Here For You.<br/>Here For Our Community.
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, marginBottom: 30, maxWidth: 440 }}>
                Fully access our affordable, quality health care services. <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>All are welcome at ICHS</a>, regardless of <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>insurance</a> or <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>ability to pay</a>. Join us — as a patient, a donor, or a member of our team.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 28px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, background: 'white', color: 'var(--crimson)', border: '2px solid white', textDecoration: 'none' }}>
                  Make an Appointment
                </a>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 26px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                  Donate to ICHS
                </a>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 26px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                  View Careers
                </a>
              </div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #6b0d2d 0%, #a01845 60%, #c02058 100%)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <svg viewBox="0 0 200 200" style={{ width: 120, height: 120, stroke: 'rgba(255,255,255,0.15)', fill: 'none', strokeWidth: 0.5 }}>
                <circle cx="65" cy="55" r="30"/><circle cx="135" cy="55" r="30"/>
                <path d="M10 180c0-33.1 26.9-60 60-60M135 120c33.1 0 60 26.9 60 60M65 120c19.3 0 35 15.7 35 35s15.7 35 35 35"/>
              </svg>
              <div style={{ position: 'absolute', bottom: 24, left: 24, background: 'white', borderRadius: 'var(--radius-md)', padding: '12px 18px' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>1973</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Serving Seattle</div>
              </div>
            </div>
          </section>

        </div>{/* /.about-sections */}
      </div>{/* /.about-layout */}
    </>
  )
}
