import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import servicesData from '../data/servicesData.js'
import locationsData from '../data/locationsData.js'
import providersData from '../data/providersData.js'
import NewsletterStrip from '../components/NewsletterStrip.jsx'

const SIDEBAR_GROUPS = [
  { label: 'General Care', items: servicesData.filter(s => s.category === 'general') },
  { label: 'Specialized Care', items: servicesData.filter(s => s.category === 'specialized') },
  { label: 'Wellness & Community Support', items: servicesData.filter(s => s.category === 'wellness') },
]

export default function ServiceDetailPage() {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const service = servicesData.find(s => s.id === serviceId)
  const [openGroups, setOpenGroups] = useState(() => {
    const initialGroup = SIDEBAR_GROUPS.findIndex(g => g.items.some(i => i.id === serviceId))
    return [initialGroup >= 0 ? initialGroup : 0]
  })
  const [provLocation, setProvLocation] = useState('')
  const [showProviders, setShowProviders] = useState(false)

  const serviceSpecialty = serviceId.replace(/_/g, ' ')
  const filteredProviders = providersData.filter(p => {
    const matchSpecialty = p.specialty === serviceSpecialty
    const matchLocation = !provLocation || p.location === provLocation
    return matchSpecialty && matchLocation
  })

  if (!service) {
    navigate('/services')
    return null
  }

  function toggleGroup(idx) {
    setOpenGroups(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  const relatedLocations = locationsData.filter(loc =>
    loc.servicesOffered.includes(serviceId)
  )

  return (
    <>
      {/* ── BREADCRUMB ── */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>{service.name}</span>
      </div>

      {/* ── DETAIL HERO ── */}
      <div style={{ background: 'var(--navy)', minHeight: 280, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden', position: 'relative' }}>
        <div style={{ padding: '48px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'inline-block', background: 'var(--teal-dark)', color: 'white', fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, borderRadius: 20, padding: '6px 18px', marginBottom: 18, width: 'fit-content', alignSelf: 'flex-start' }}>
            {service.name}
          </div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 36, fontWeight: 700, color: 'white', lineHeight: 1.2, marginBottom: 14 }}>
            Caring for <em style={{ color: 'var(--teal-mid)', fontStyle: 'normal' }}>You,</em><br />Today and Beyond
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: 24, maxWidth: 400 }}>
            {service.description}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href="tel:2067883700">Book an Appointment</a>
            <a className="btn btn-outline-white" href="/providers">Find a Provider</a>
          </div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #0d3848 0%, #1a5a6e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,44,56,0.3)' }} />
          <img
            src="/img/service-expanded.png"
            alt={service.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, zIndex: 0 }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <svg viewBox="0 0 24 24" style={{ width: 140, height: 140, stroke: 'rgba(255,255,255,0.12)', fill: 'none', strokeWidth: 0.4, position: 'relative', zIndex: 1 }}>
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </div>
      </div>

      {/* ── DETAIL BODY ── */}
      <div style={{ background: 'var(--bg)', display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' }}>

        {/* ── SIDEBAR ── */}
        <div style={{ background: 'white', borderRight: '1px solid rgba(0,0,0,0.07)', padding: '32px 0', position: 'sticky', top: 0, alignSelf: 'start' }}>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--teal-dark)', padding: '0 20px 10px', borderBottom: '1px solid rgba(0,0,0,0.06)', marginBottom: 8 }}>
            Services
          </div>
          {SIDEBAR_GROUPS.map((group, gi) => (
            <div key={gi}>
              <div
                onClick={() => toggleGroup(gi)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 20px', fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700,
                  color: openGroups.includes(gi) ? 'var(--teal-dark)' : 'var(--navy)',
                  cursor: 'pointer',
                  background: openGroups.includes(gi) ? 'var(--teal-light)' : 'rgba(2,110,112,0.04)',
                  borderLeft: openGroups.includes(gi) ? '3px solid var(--teal-dark)' : '3px solid transparent',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!openGroups.includes(gi)) { e.currentTarget.style.background = 'rgba(2,110,112,0.1)'; e.currentTarget.style.color = 'var(--teal-dark)' } }}
                onMouseLeave={e => { if (!openGroups.includes(gi)) { e.currentTarget.style.background = 'rgba(2,110,112,0.04)'; e.currentTarget.style.color = 'var(--navy)' } }}
              >
                {group.label}
                <span style={{ fontSize: 10, color: 'var(--muted)', transition: 'transform 0.2s', transform: openGroups.includes(gi) ? 'rotate(180deg)' : 'none' }}>▾</span>
              </div>
              {openGroups.includes(gi) && (
                <div>
                  {group.items.map(item => (
                    <Link
                      key={item.id}
                      to={`/services/${item.id}`}
                      style={{
                        padding: '8px 20px 8px 28px', fontFamily: 'var(--font-body)', fontSize: 13,
                        color: item.id === serviceId ? 'var(--teal-dark)' : 'var(--muted)',
                        cursor: 'pointer', display: 'block', textDecoration: 'none',
                        borderLeft: item.id === serviceId ? '3px solid var(--teal-dark)' : '3px solid transparent',
                        background: item.id === serviceId ? 'rgba(207,235,234,0.3)' : 'transparent',
                        fontWeight: item.id === serviceId ? 600 : 400,
                        transition: 'background 0.15s, color 0.15s',
                      }}
                      onMouseEnter={e => { if (item.id !== serviceId) { e.currentTarget.style.background = 'rgba(2,110,112,0.06)'; e.currentTarget.style.color = 'var(--teal-dark)' } }}
                      onMouseLeave={e => { if (item.id !== serviceId) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)' } }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
              <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '12px 0' }} />
            </div>
          ))}
          <div style={{ margin: 16, background: 'var(--navy)', borderRadius: 'var(--radius-md)', padding: 18 }}>
            <h6 style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 6 }}>Book an Appointment</h6>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, marginBottom: 14 }}>Call us and we can help you schedule a visit.</p>
            <a href="tel:2067883700" style={{ display: 'block', textAlign: 'center', padding: '9px 16px', borderRadius: 40, border: '1.5px solid var(--crimson)', background: 'var(--crimson)', color: 'white', fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }}>
              Call (206) 788-3700
            </a>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ padding: '44px 52px' }}>

          {/* Fun Fact Strip — only for Primary Care and Dental Care */}
          {service.funFact && (
            <div style={{ background: '#fffbf0', border: '1.5px solid #f0d080', borderRadius: 'var(--radius-md)', padding: '20px 24px', marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-head)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9a6f00', marginBottom: 14 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#c89400" strokeWidth="2" style={{ width: 14, height: 14, flexShrink: 0 }}>
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.6-1.4 4.9-3.5 6.2V17a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1.8C6.4 13.9 5 11.6 5 9a7 7 0 0 1 7-7z"/>
                  <path d="M9 21h6"/><path d="M9 17h6"/>
                </svg>
                Did you know?
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fff3c4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#b07e00" strokeWidth="1.8" style={{ width: 16, height: 16 }}>
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>{service.funFact.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{service.funFact.text}</div>
                </div>
              </div>
            </div>
          )}

          <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--teal-dark)', marginBottom: 8 }}>
            What We Offer
          </div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>
            Our Services Include
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 32, maxWidth: 640 }}>
            Comprehensive care for your whole family, from newborns to seniors — all in a welcoming, culturally responsive environment.
          </p>

          {/* Sub-services grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 40 }}>
            {service.subServices.map((sub, i) => (
              <div
                key={i}
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid rgba(0,0,0,0.07)',
                  padding: 22,
                  transition: 'border-color 0.15s',
                }}
              >
                <h5 style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>{sub.name}</h5>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: sub.description }} />
              </div>
            ))}
          </div>

          {/* Provider Finder */}
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--teal-dark)', marginBottom: 8 }}>
            Meet our providers
          </div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>
            Our {service.name} Providers
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 24, maxWidth: 640 }}>
            Expert care from providers who put community first. Browse our {service.name} team below to find a provider for you.
          </p>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1.5px solid rgba(0,0,0,0.07)', padding: '28px 32px', marginBottom: 40 }}>
            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Find Providers in this Service</h3>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 20 }}>
              Browse our {service.name} providers accepting new patients near you. Need help with coverage?{' '}
              <a href="tel:2067883700" style={{ color: 'var(--teal-dark)', fontWeight: 600, textDecoration: 'underline', textDecorationColor: 'rgba(2,110,112,0.35)', textUnderlineOffset: 2 }}>Learn about insurance assistance</a>.
            </p>
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <select
                value={provLocation}
                onChange={e => setProvLocation(e.target.value)}
                style={{ appearance: 'none', width: '100%', padding: '12px 40px 12px 16px', border: '1.5px solid #d0d8da', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', background: 'white', outline: 'none', cursor: 'pointer' }}
              >
                <option value="">All Locations</option>
                {locationsData.map(loc => <option key={loc.id} value={loc.name}>{loc.name}</option>)}
              </select>
              <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: 'var(--muted)', pointerEvents: 'none' }}>▼</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link
                to="/providers"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 22px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, cursor: 'pointer', background: 'transparent', color: 'var(--teal-dark)', border: '2px solid var(--teal-dark)', textDecoration: 'none', transition: 'background 0.15s, color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--teal-dark)'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--teal-dark)' }}
              >
                View All Providers
              </Link>
              <button
                onClick={() => setShowProviders(v => !v)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 22px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, cursor: 'pointer', background: 'var(--crimson)', color: 'white', border: '2px solid var(--crimson)', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#6b0d2d'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--crimson)'}
              >
                {showProviders ? 'Hide Providers' : 'Find Provider'}
              </button>
            </div>

            {showProviders && (
              <div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--navy)', margin: '20px 0 14px' }}>Results</div>
                {filteredProviders.length === 0 ? (
                  <p style={{ fontSize: 14, color: 'var(--muted)' }}>No providers found for the selected location. Try a different location or <Link to="/providers" style={{ color: 'var(--teal-dark)', fontWeight: 600 }}>view all providers</Link>.</p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                    {filteredProviders.map(p => (
                      <Link
                        key={p.id}
                        to={`/providers/${p.id}`}
                        style={{ display: 'block', background: 'white', borderRadius: 'var(--radius-md)', border: '1.5px solid rgba(0,0,0,0.07)', overflow: 'hidden', textDecoration: 'none', transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s', cursor: 'pointer' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal-mid)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(2,110,112,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
                      >
                        <div style={{ height: 120, background: 'linear-gradient(135deg, var(--teal-light) 0%, #b8dfe0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg viewBox="0 0 100 100" style={{ width: 44, height: 44, stroke: 'var(--teal-dark)', fill: 'none', strokeWidth: 0.8, opacity: 0.4 }}>
                            <circle cx="50" cy="35" r="22"/><path d="M15 90c0-19.3 15.7-35 35-35s35 15.7 35 35"/>
                          </svg>
                        </div>
                        <div style={{ padding: 14 }}>
                          <div style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>{p.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, lineHeight: 1.4 }}>{p.role}</div>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 11, height: 11, flexShrink: 0, marginTop: 1 }}>
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                            {p.location}
                          </div>
                          {p.langs && (
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 11, height: 11, flexShrink: 0, marginTop: 1 }}>
                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
                              </svg>
                              {p.langs}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Locations */}
          {relatedLocations.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--teal-dark)', marginBottom: 4 }}>Where We Offer This</div>
                  <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 700, color: 'var(--navy)' }}>Clinic Locations</h3>
                </div>
                <Link to="/location" style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'var(--teal-dark)', cursor: 'pointer', textDecoration: 'none' }}>View All →</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
                {relatedLocations.map(loc => (
                  <div key={loc.id} style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1.5px solid rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                    <div style={{ height: 120, background: 'linear-gradient(135deg, var(--teal-light) 0%, #b8dfe0 100%)', overflow: 'hidden' }}>
                      <img src={loc.imageFile} alt={loc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />
                    </div>
                    <div style={{ padding: 16 }}>
                      <h5 style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'var(--navy)', marginBottom: 10, lineHeight: 1.3 }}>{loc.name}</h5>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 5, fontSize: 12, color: 'var(--muted)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 12, height: 12, flexShrink: 0, marginTop: 1 }}>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        {loc.address}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 5, fontSize: 12, color: 'var(--muted)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 12, height: 12, flexShrink: 0, marginTop: 1 }}>
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        {loc.phone}
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                        {loc.mapUrl && (
                          <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '7px 10px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, textAlign: 'center', border: '1.5px solid var(--teal-dark)', color: 'var(--teal-dark)', background: 'transparent', textDecoration: 'none' }}>
                            Get Directions
                          </a>
                        )}
                        <Link to={`/location/${loc.id}`} style={{ flex: 1, padding: '7px 10px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, textAlign: 'center', border: '1.5px solid var(--teal-dark)', color: 'white', background: 'var(--teal-dark)', textDecoration: 'none' }}>
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <NewsletterStrip />
    </>
  )
}
