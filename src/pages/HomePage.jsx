import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NewsletterStrip from '../components/NewsletterStrip.jsx'

const SLIDES = [
  {
    tag: 'Serving Greater Seattle Since 1973',
    tagClass: '',
    title: <>Care Without Borders.<br /><span>Quality Without Barriers.</span></>,
    sub: "Serving diverse communities across the Greater Seattle area with equitable, compassionate care.",
    btns: [
      { label: 'Make an Appointment', href: 'tel:2067883700', cls: 'btn btn-primary' },
      { label: 'Learn More →', to: '/about', cls: 'btn btn-outline-white' },
    ],
    image: '/img/care-without-borders.png',
    imageAlt: 'Care Without Borders',
    rightClass: '',
  },
  {
    tag: 'Multilingual · Multicultural',
    tagClass: '',
    title: <>Healthcare in<br /><span>Your Language.</span></>,
    sub: "We provide care in over 12 languages, ensuring every patient feels heard, understood, and respected.",
    btns: [
      { label: 'Our Services', to: '/services', cls: 'btn btn-primary' },
      { label: 'Find a Provider →', to: '/providers', cls: 'btn btn-outline-white' },
    ],
    image: '/img/multilingual.png',
    imageAlt: 'Multilingual Care',
    rightClass: '',
  },
  {
    tag: 'New · Beginning May 2026',
    tagClass: 'hero-tag--announce',
    title: <>Behavioral Health Care<br /><span>at Bellevue Clinic.</span></>,
    titleClass: 'hero-title--announce',
    announce: true,
    announceItems: ['2nd and 4th Saturday', 'ICHS Bellevue Clinic', 'Provider: Yeji Youn Hirai, LSWAIC'],
    btns: [
      { label: 'Call (425) 373-3000', href: 'tel:4253733000', cls: 'btn btn-primary' },
      { label: 'Find the Clinic →', to: '/location/bellevue', cls: 'btn btn-outline-white' },
    ],
    image: '/img/bell-location.jpeg',
    imageAlt: 'Bellevue Clinic Location',
    rightClass: 'hero-slide-right--announce',
  },
]

const STEPS = [
  {
    num: '01',
    text: 'Browse & Choose a Service',
    detail: "Look through the services we provide under Clinic Services to find the right resource for you. Whether it's primary care, dental, behavioral health, or wellness — we have a service that fits your needs.",
  },
  {
    num: '02',
    text: 'Book an Appointment',
    detail: "Call us at (206) 788-3700 or use MyChart to schedule your visit online. New patients are always welcome — our team will help match you with the right provider at a location convenient for you.",
  },
  {
    num: '03',
    text: 'Consult with a Doctor',
    detail: "Meet with one of our multilingual providers in person or via telehealth. Interpreter services are available in 90+ languages at no cost, so you can always communicate clearly and feel confident in your care.",
  },
  {
    num: '04',
    text: 'Get Treatment & Support',
    detail: "Receive personalized care tailored to your needs. From prescriptions and referrals to behavioral health support and nutrition services, our team is here to support every aspect of your well-being.",
  },
  {
    num: '05',
    text: 'Follow Up & Recovery',
    detail: "Stay connected through MyChart to track your health, view test results, and message your care team. We'll schedule follow-up visits as needed to ensure your recovery and long-term wellness.",
  },
]

const SERVICE_CARDS = [
  {
    id: 'Primary_Care',
    title: 'Primary Care',
    desc: 'Our medical services include infant and well child checkups, immunizations, health screenings and women\'s health.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <path d="M12 8v8M8 12h8"/>
      </svg>
    ),
  },
  {
    id: 'Dental_Care',
    title: 'Dental Care',
    desc: 'Full dental care for the whole family includes check-ups, cleanings, restoration and urgent care.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C8.1 2 5 5.1 5 9c0 2.3.8 4 1.8 5.8.9 1.7 1.2 3.5 1.2 3.5C8.3 19.8 9 21 10 21c.7 0 1.3-.4 1.6-1.2.4-.9.7-1.8 1.4-1.8.7 0 1 .9 1.4 1.8.3.8.9 1.2 1.6 1.2 1 0 1.7-1.2 2-2.7 0 0 .3-1.8 1.2-3.5C20.2 13 21 11.3 21 9c0-3.9-3.1-7-7-7h-2z"/>
      </svg>
    ),
  },
  {
    id: 'Healthy_Aging_and_Wellness',
    title: 'Healthy Aging & Wellness',
    desc: 'Multi culturally appropriate elder care for the Asian community.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    id: 'Behavioral_Health',
    title: 'Behavioral Health',
    desc: 'Professional consultation and treatment for depression, anxiety, relationship, and lifestyle issues.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
]

const VALUE_CARDS = [
  {
    title: 'Accessibility',
    desc: 'Affordable care: Sliding-scale discounts and insurance enrollment help.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  },
  {
    title: 'Inclusivity',
    desc: 'Interpretation in 90+ languages: care for all, regardless of age, status, or income.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    title: 'Comprehensive Care',
    desc: 'All-in-one care: Medical, dental, vision, behavioral health, and nutrition.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    title: 'Empowerment',
    desc: 'Wellness support: Telehealth, pharmacy, acupuncture, and senior health.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
]

export default function HomePage() {
  const [slide, setSlide] = useState(0)
  const [openStep, setOpenStep] = useState(null)
  const navigate = useNavigate()
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSlide(s => (s + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(intervalRef.current)
  }, [])

  function moveSlide(dir) {
    clearInterval(intervalRef.current)
    setSlide(s => (s + dir + SLIDES.length) % SLIDES.length)
    intervalRef.current = setInterval(() => {
      setSlide(s => (s + 1) % SLIDES.length)
    }, 5000)
  }

  function goSlide(n) {
    clearInterval(intervalRef.current)
    setSlide(n)
    intervalRef.current = setInterval(() => {
      setSlide(s => (s + 1) % SLIDES.length)
    }, 5000)
  }

  function toggleStep(idx) {
    setOpenStep(openStep === idx ? null : idx)
  }

  return (
    <>
      {/* ── HERO SLIDER ── */}
      <section style={{ position: 'relative', overflow: 'hidden', height: '480px', background: 'var(--navy)' }}>
        <div
          style={{
            display: 'flex', width: `${SLIDES.length * 100}%`, height: '100%',
            transform: `translateX(-${slide * (100 / SLIDES.length)}%)`,
            transition: 'transform 0.6s ease',
          }}
        >
          {SLIDES.map((s, i) => (
            <div
              key={i}
              style={{ width: `${100 / SLIDES.length}%`, height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', flexShrink: 0 }}
            >
              <div style={{ background: 'var(--teal-dark)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 60px' }}>
                <div className={`hero-tag${s.tagClass ? ' ' + s.tagClass : ''}`}>{s.tag}</div>
                <h1 className={`hero-title${s.titleClass ? ' ' + s.titleClass : ''}`}>{s.title}</h1>
                {s.announce ? (
                  <ul className="hero-announce-list">
                    {s.announceItems.map(item => <li key={item}>{item}</li>)}
                  </ul>
                ) : (
                  <p className="hero-sub">{s.sub}</p>
                )}
                <div className="hero-btns">
                  {s.btns.map(btn =>
                    btn.to ? (
                      <Link key={btn.label} className={btn.cls} to={btn.to}>{btn.label}</Link>
                    ) : (
                      <a key={btn.label} className={btn.cls} href={btn.href}>{btn.label}</a>
                    )
                  )}
                </div>
              </div>
              <div className={`hero-slide-right${s.rightClass ? ' ' + s.rightClass : ''}`}>
                <img src={s.image} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          ))}
        </div>

        <div className="hero-arrow prev" onClick={() => moveSlide(-1)}>&#8249;</div>
        <div className="hero-arrow next" onClick={() => moveSlide(1)}>&#8250;</div>
        <div className="hero-dots">
          {SLIDES.map((_, i) => (
            <div key={i} className={`hero-dot${slide === i ? ' active' : ''}`} onClick={() => goSlide(i)} />
          ))}
        </div>
      </section>

      {/* ── SHORTCUT BAR ── */}
      <div style={{ background: 'white', padding: '20px 16px 0' }}>
        <div style={{ background: 'var(--teal-dark)', padding: '24px 40px', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 20px rgba(2,110,112,0.18)' }}>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 16, letterSpacing: '0.04em' }}>
            Shortcut For Patients
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>, label: 'Appointments' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M16 8H8M16 12H8M12 16H8"/></svg>, label: 'MyChart' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>, label: 'Clinic Services', to: '/services' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: 'After Hours Care' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>, label: 'Paying for your Care' },
            ].map(btn => (
              btn.to ? (
                <Link key={btn.label} to={btn.to} style={{ textDecoration: 'none', flex: '1 1 140px' }}>
                  <div
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 'var(--radius-md)', padding: '16px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'white', textAlign: 'center', transition: 'background 0.15s, border-color 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
                  >
                    <div style={{ width: 26, height: 26 }}>{btn.icon}</div>
                    <span style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700 }}>{btn.label}</span>
                  </div>
                </Link>
              ) : (
                <div
                  key={btn.label}
                  style={{ flex: '1 1 140px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 'var(--radius-md)', padding: '16px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'white', textAlign: 'center', transition: 'background 0.15s, border-color 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
                >
                  <div style={{ width: 26, height: 26 }}>{btn.icon}</div>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700 }}>{btn.label}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* ── GET STARTED ── */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '72px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <div className="section-label">How it Works</div>
            <h2 className="section-title">Get Started with ICHS</h2>
            <p className="section-desc">We are accepting new patients.</p>
            <p className="section-desc" style={{ marginTop: 8 }}>It is simple to begin receiving care that's right for you at ICHS in just a few easy steps.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
              <div style={{ background: 'white', border: '1.5px solid rgba(0,0,0,0.08)', borderRadius: 'var(--radius-md)', padding: '20px 22px' }}>
                <h4 style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, color: 'var(--teal-dark)', marginBottom: 6 }}>For New Patients,</h4>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 10 }}>Appointment-making, services, insurance questions,</p>
                <a href="tel:2067883700" style={{ color: 'var(--crimson)', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-head)', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>Please call (206) 788-3700</a>
              </div>
              <div style={{ background: 'white', border: '1.5px solid rgba(0,0,0,0.08)', borderRadius: 'var(--radius-md)', padding: '20px 22px' }}>
                <h4 style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>For Returning Patients,</h4>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 10 }}>Please call the clinic number.</p>
                <Link to="/location" style={{ color: 'var(--crimson)', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-head)', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>View all Locations</Link>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <a className="btn btn-primary" href="tel:2067883700">Have any questions? Call us at (206) 788-3700</a>
            </div>
          </div>
          <div>
            <ol style={{ listStyle: 'none' }}>
              {STEPS.map((step, i) => (
                <li
                  key={i}
                  onClick={() => toggleStep(i)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                    padding: openStep === i ? '16px 12px' : '16px 0',
                    margin: openStep === i ? '0 -12px' : '0',
                    borderBottom: i < STEPS.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                    cursor: 'pointer', gap: 14,
                    background: openStep === i ? 'rgba(2,110,112,0.03)' : 'transparent',
                    borderRadius: openStep === i ? 'var(--radius-sm)' : 0,
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, color: openStep === i ? 'var(--teal-dark)' : 'var(--muted)', minWidth: 24, paddingTop: 2 }}>{step.num}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 600, color: 'var(--navy)', lineHeight: 1.4, display: 'block' }}>{step.text}</span>
                    {openStep === i && (
                      <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, display: 'block', marginTop: 8 }}>{step.detail}</span>
                    )}
                  </div>
                  <span style={{ fontSize: 18, color: openStep === i ? 'var(--teal-dark)' : 'var(--muted)', transform: openStep === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.25s', paddingTop: 1, flexShrink: 0 }}>›</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* ── SERVICES GRID ── */}
      <div style={{ background: 'var(--teal-light)', padding: '72px 0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Comprehensive Health &amp; Wellness Services</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 40 }}>
            {SERVICE_CARDS.map(card => (
              <div
                key={card.id}
                className="service-card"
                onClick={() => navigate(`/services/${card.id}`)}
                style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(0,0,0,0.07)', padding: '24px 20px', transition: 'border-color 0.15s, transform 0.15s', cursor: 'pointer' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--teal-light)', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 24, height: 24, color: 'var(--teal-dark)' }}>{card.icon}</div>
                </div>
                <h4 style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 8, lineHeight: 1.3 }}>{card.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MISSION ── */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '72px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 60, alignItems: 'center' }}>
          <div>
            <h2 className="section-title">Comprehensive, Multilingual, Equitable</h2>
            <p className="section-desc">ICHS isn't just a clinic — it's a community-rooted wellness system designed for every stage of life. From primary medical care to behavioral health, dental, and vision, we provide a seamless circle of support. Our mission is to deliver culturally responsive care that empowers individuals, strengthens families, and ensures health equity for all.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 32 }}>
              {VALUE_CARDS.map(v => (
                <div key={v.title} style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0,0,0,0.07)', padding: 18 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--teal-light)', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 18, height: 18, color: 'var(--teal-dark)' }}>{v.icon}</div>
                  </div>
                  <h5 style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>{v.title}</h5>
                  <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'linear-gradient(135deg, var(--teal-light) 0%, var(--teal-mid) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '85%', aspectRatio: '1', borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg, #026E70 0%, #75CDD3 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/img/comprehensive.png" alt="Group of diverse individuals smiling" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── NEWSLETTER ── */}
      <NewsletterStrip />
    </>
  )
}
