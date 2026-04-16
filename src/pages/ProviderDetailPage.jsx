import { Link, useParams } from 'react-router-dom'
import providersData from '../data/providersData.js'
import { ProviderCard } from './ProvidersPage.jsx'

const PLACEHOLDER_DETAIL = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='360'%3E%3Cdefs%3E%3Cpattern id='checker2' x='0' y='0' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Crect width='12' height='12' fill='%23dde0e0'/%3E%3Crect x='12' y='12' width='12' height='12' fill='%23dde0e0'/%3E%3Crect x='12' y='0' width='12' height='12' fill='%23edf0f0'/%3E%3Crect x='0' y='12' width='12' height='12' fill='%23edf0f0'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='300' height='360' fill='url(%23checker2)'/%3E%3C/svg%3E`

export default function ProviderDetailPage() {
  const { providerId } = useParams()
  const provider = providersData.find(p => p.id === providerId)

  if (!provider) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 40px' }}>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 24, color: 'var(--navy)', marginBottom: 12 }}>Provider not found</h2>
        <Link to="/providers" style={{ color: 'var(--teal-dark)', fontWeight: 700 }}>← Back to Providers</Link>
      </div>
    )
  }

  // Related: same location, different person, max 4
  const related = providersData.filter(p => p.id !== provider.id && p.location === provider.location).slice(0, 4)

  // Short location label for badge
  const locationShort = provider.location.replace(' Medical & Dental Clinic', '').replace(' Medical Clinic', '')

  return (
    <>
      {/* ── BREADCRUMB ── */}
      <div style={{ padding: '12px 40px', fontSize: 13, color: 'var(--muted)', background: 'white', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Link to="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link>
        {' / '}
        <Link to="/providers" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Find a Provider</Link>
        {' / '}
        <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{provider.name}</span>
      </div>

      {/* ── HERO ── */}
      <div style={{ background: 'var(--teal-light)', padding: 40 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '300px 1fr', gap: 40, alignItems: 'start' }}>

          {/* Left: photo + appointment card */}
          <div>
            <div style={{ width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '3px solid white', boxShadow: '0 8px 32px rgba(7,44,56,0.15)', aspectRatio: '5/6', background: '#e8eded', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={PLACEHOLDER_DETAIL} alt={provider.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1.5px solid rgba(0,0,0,0.07)', padding: 22, marginTop: 16 }}>
              <h4 style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>Schedule an Appointment</h4>
              <a
                href="#"
                style={{ display: 'block', width: '100%', padding: 13, borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, cursor: 'pointer', textAlign: 'center', marginBottom: 10, border: '2px solid var(--crimson)', background: 'var(--crimson)', color: 'white', textDecoration: 'none' }}
              >
                Book Online via MyChart
              </a>
              <a
                href="tel:2067883700"
                style={{ display: 'block', width: '100%', padding: 13, borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, cursor: 'pointer', textAlign: 'center', marginBottom: 10, border: '2px solid var(--teal-dark)', background: 'transparent', color: 'var(--teal-dark)', textDecoration: 'none' }}
              >
                Call (206) 788-3700
              </a>
              <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 6, lineHeight: 1.5 }}>
                Available for in-person &amp; <a href="#" style={{ color: 'var(--teal-dark)', fontWeight: 600 }}>Telehealth</a> visits.<br/>
                Sliding scale fees available.
              </p>
            </div>
          </div>

          {/* Right: provider info */}
          <div>
            <div style={{ display: 'inline-block', background: 'var(--teal-dark)', color: 'white', fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, borderRadius: 20, padding: '4px 14px', marginBottom: 14 }}>
              {provider.specialty}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
              <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 34, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15 }}>{provider.name}</h1>
              {provider.pronouns && (
                <span style={{ fontSize: 14, color: 'var(--muted)', fontStyle: 'italic' }}>({provider.pronouns})</span>
              )}
            </div>
            <div style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 20 }}>{provider.role}</div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {provider.accepting && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, background: 'rgba(2,110,112,0.1)', color: 'var(--teal-dark)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 13, height: 13 }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  Accepting New Patients
                </span>
              )}
              {provider.telehealth && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, background: 'rgba(7,44,56,0.08)', color: 'var(--navy)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2" style={{ width: 13, height: 13 }}>
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                  </svg>
                  Telehealth Available
                </span>
              )}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, background: 'rgba(207,235,234,0.5)', color: 'var(--teal-dark)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 13, height: 13 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {locationShort}
              </span>
              {provider.langs && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, background: 'rgba(225,237,195,0.6)', color: '#2d6a00' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2d6a00" strokeWidth="2" style={{ width: 13, height: 13 }}>
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
                  </svg>
                  {provider.langs}
                </span>
              )}
            </div>

            {/* Meta grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
              <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1.5px solid rgba(0,0,0,0.07)', padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 5 }}>Specialty</div>
                <div style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.5, fontWeight: 600 }}>{provider.specialty}</div>
              </div>
              <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1.5px solid rgba(0,0,0,0.07)', padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 5 }}>Location</div>
                <div style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.5, fontWeight: 600 }}>{provider.location}</div>
              </div>
              <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1.5px solid rgba(0,0,0,0.07)', padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 5 }}>Languages</div>
                <div style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.5, fontWeight: 600 }}>{provider.langs || 'English'}</div>
              </div>
              <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1.5px solid rgba(0,0,0,0.07)', padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 5 }}>Patient Status</div>
                <div style={{ fontSize: 14, lineHeight: 1.5, fontWeight: 600, color: provider.accepting ? 'var(--teal-dark)' : 'var(--crimson)' }}>
                  {provider.accepting ? '✓ Accepting New Patients' : '✗ Not Accepting'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY: About + Services / Sidebar ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 40, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }}>

        {/* Main */}
        <div>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 14, paddingBottom: 10, borderBottom: '2px solid var(--teal-light)' }}>About</div>
          <p style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.75, marginBottom: 36 }}>{provider.bio}</p>

          <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 14, paddingBottom: 10, borderBottom: '2px solid var(--teal-light)' }}>Services Offered</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
            {provider.services && provider.services.map(svc => (
              <span
                key={svc}
                style={{ padding: '8px 16px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600, color: 'var(--teal-dark)', border: '1.5px solid var(--teal-mid)', background: 'var(--teal-light)', cursor: 'pointer' }}
              >
                {svc}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Contact & Location */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1.5px solid rgba(0,0,0,0.07)', padding: 24, marginBottom: 16 }}>
            <h4 style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>Contact &amp; Location</h4>
            {[
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 16, height: 16 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                label: 'Address',
                value: provider.location,
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 16, height: 16 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                label: 'Phone',
                value: <a href="tel:2067883700" style={{ color: 'var(--teal-dark)', fontWeight: 600 }}>(206) 788-3700</a>,
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 16, height: 16 }}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                label: 'Clinic Hours',
                value: 'Mon–Sat: 8am–5pm',
              },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Education & Training */}
          {(provider.education || provider.residency) && (
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1.5px solid rgba(0,0,0,0.07)', padding: 24, marginBottom: 16 }}>
              <h4 style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>Education &amp; Training</h4>
              {provider.education && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--teal-dark)', flexShrink: 0, marginTop: 5 }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 2 }}>Medical Education</div>
                    <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{provider.education}</div>
                  </div>
                </div>
              )}
              {provider.residency && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--teal-mid)', flexShrink: 0, marginTop: 5 }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 2 }}>Residency</div>
                    <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{provider.residency}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Insurances */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1.5px solid rgba(0,0,0,0.07)', padding: 24, marginBottom: 16 }}>
            <h4 style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Insurances Accepted</h4>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              Medicaid / Apple Health<br/>
              Medicare<br/>
              Most major insurance plans<br/>
              <strong style={{ color: 'var(--teal-dark)' }}>Sliding Scale available</strong><br/>
              <em style={{ fontSize: 12 }}>Call (206) 788-3700 to verify coverage</em>
            </div>
          </div>
        </div>
      </div>

      {/* ── RELATED PROVIDERS ── */}
      {related.length > 0 && (
        <div style={{ background: 'var(--teal-light)', padding: '52px 40px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 700, color: 'var(--navy)' }}>Other Providers at This Location</div>
              <Link to="/providers" style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'var(--teal-dark)', textDecoration: 'none' }}>
                View All Providers →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {related.map(p => <ProviderCard key={p.id} provider={p} />)}
            </div>
          </div>
        </div>
      )}

      {/* ── HFY ── */}
      <div style={{ background: 'var(--crimson)', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 260, overflow: 'hidden' }}>
        <div style={{ padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 30, fontWeight: 700, color: 'white', marginBottom: 16, lineHeight: 1.2 }}>Here For You</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.88)', lineHeight: 1.7, marginBottom: 22, maxWidth: 340 }}>
            Fully access our affordable, quality health care services. All are welcome at ICHS, regardless of insurance or ability to pay.
          </p>
          <Link
            to="/services"
            style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 28px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, background: 'white', color: 'var(--crimson)', border: '2px solid white', textDecoration: 'none', width: 'fit-content' }}
          >
            Learn More
          </Link>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #6b0d2d 0%, #a01845 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 200 200" style={{ width: 110, height: 110, stroke: 'rgba(255,255,255,0.15)', fill: 'none', strokeWidth: 0.5 }}>
            <circle cx="65" cy="55" r="28"/><circle cx="135" cy="55" r="28"/>
            <path d="M15 175c0-27.6 22.4-50 50-50M135 125c27.6 0 50 22.4 50 50M65 125c19.3 0 35 15.7 35 35s15.7 35 35 35"/>
          </svg>
        </div>
      </div>
    </>
  )
}
