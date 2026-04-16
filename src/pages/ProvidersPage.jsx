import { useState } from 'react'
import { Link } from 'react-router-dom'
import providersData from '../data/providersData.js'

// Checkerboard placeholder SVG (matches providers.html)
const PLACEHOLDER_IMG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cdefs%3E%3Cpattern id='checker' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Crect width='10' height='10' fill='%23e0e0e0'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%23e0e0e0'/%3E%3Crect x='10' y='0' width='10' height='10' fill='%23f5f5f5'/%3E%3Crect x='0' y='10' width='10' height='10' fill='%23f5f5f5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='160' height='160' fill='url(%23checker)'/%3E%3C/svg%3E`

export function ProviderCard({ provider }) {
  return (
    <Link
      to={`/providers/${provider.id}`}
      style={{ display: 'block', background: 'white', borderRadius: 'var(--radius-md)', border: '1.5px solid rgba(0,0,0,0.07)', overflow: 'hidden', cursor: 'pointer', textDecoration: 'none', transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal-mid)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(2,110,112,0.13)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
    >
      {/* Photo */}
      <div style={{ width: '100%', aspectRatio: '1', overflow: 'hidden', background: '#eee' }}>
        <img src={PLACEHOLDER_IMG} alt={provider.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      {/* Info */}
      <div style={{ padding: '14px 14px 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 3 }}>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>{provider.pronouns}</span>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3 }}>{provider.name}</div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10, lineHeight: 1.4, minHeight: 30 }}>{provider.role}</div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12, color: 'var(--muted)', marginBottom: 5, lineHeight: 1.4 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 13, height: 13, flexShrink: 0, marginTop: 1 }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {provider.location}
        </div>
        {provider.langs && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12, color: 'var(--muted)', marginBottom: 5, lineHeight: 1.4 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 13, height: 13, flexShrink: 0, marginTop: 1 }}>
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
            </svg>
            {provider.langs}
          </div>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
          {provider.accepting && (
            <span style={{ fontFamily: 'var(--font-head)', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: 'rgba(2,110,112,0.1)', color: 'var(--teal-dark)' }}>Accepting Patients</span>
          )}
          {!provider.accepting && (
            <span style={{ fontFamily: 'var(--font-head)', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: 'rgba(135,17,57,0.08)', color: 'var(--crimson)' }}>Not Accepting</span>
          )}
          {provider.telehealth && (
            <span style={{ fontFamily: 'var(--font-head)', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: 'rgba(7,44,56,0.08)', color: 'var(--navy)' }}>Telehealth</span>
          )}
        </div>
        <span style={{ display: 'inline-block', marginTop: 12, fontFamily: 'var(--font-head)', fontSize: 12, fontWeight: 700, color: 'var(--teal-dark)', borderBottom: '2px solid var(--teal-dark)', cursor: 'pointer' }}>
          View Profile →
        </span>
      </div>
    </Link>
  )
}

const INITIAL_COUNT = 8

export default function ProvidersPage() {
  const [search, setSearch] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterLocation, setFilterLocation] = useState('')
  const [filterService, setFilterService] = useState('')
  const [filterLanguage, setFilterLanguage] = useState('')
  const [filterPronouns, setFilterPronouns] = useState('')
  const [showAll, setShowAll] = useState(false)

  function clearAll() {
    setSearch('')
    setFilterLocation('')
    setFilterService('')
    setFilterLanguage('')
    setFilterPronouns('')
    setShowAll(false)
    setFilterOpen(false)
  }

  const activeCount = [filterLocation, filterService, filterLanguage, filterPronouns].filter(Boolean).length

  let filtered = providersData.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = !search ||
      p.name.toLowerCase().includes(q) ||
      p.role.toLowerCase().includes(q) ||
      p.specialty.toLowerCase().includes(q) ||
      (p.langs || '').toLowerCase().includes(q)
    const matchLocation = !filterLocation || p.location === filterLocation
    const matchService = !filterService || p.role.toLowerCase().includes(filterService.toLowerCase())
    const matchLang = !filterLanguage || (p.langs || '').includes(filterLanguage)
    const matchPronouns = !filterPronouns || p.pronouns === filterPronouns
    return matchSearch && matchLocation && matchService && matchLang && matchPronouns
  })

  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_COUNT)
  const hasMore = !showAll && filtered.length > INITIAL_COUNT

  return (
    <>
      {/* ── HERO ── */}
      <div style={{ background: 'var(--teal-dark)', padding: '48px 40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 36, fontWeight: 700, color: 'white', marginBottom: 8 }}>Find a Provider</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 24 }}>
          Available for in-person or telehealth visits. Call{' '}
          <a href="tel:2067883700" style={{ color: 'var(--teal-mid)', fontWeight: 600 }}>206.788.3700</a>{' '}
          to make an appointment.
        </p>

        {/* Search row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: 40, padding: '12px 22px', gap: 10, flex: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" style={{ width: 18, height: 18, flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search by name or specialty"
              value={search}
              onChange={e => { setSearch(e.target.value); setShowAll(false) }}
              style={{ border: 'none', outline: 'none', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink)', flex: 1, background: 'transparent' }}
            />
          </div>
          <button
            onClick={() => setFilterOpen(o => !o)}
            aria-expanded={filterOpen}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.6)', borderRadius: 40, padding: '10px 22px', fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, color: 'white', cursor: 'pointer', flexShrink: 0 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 15, height: 15 }}>
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filters
            {activeCount > 0 && (
              <span style={{ background: 'var(--crimson)', color: 'white', borderRadius: 20, padding: '1px 8px', fontSize: 11, fontWeight: 700 }}>{activeCount}</span>
            )}
            <span style={{ fontSize: 10, transition: 'transform 0.2s', transform: filterOpen ? 'rotate(180deg)' : 'none', marginLeft: 2 }}>▾</span>
          </button>
          {(activeCount > 0 || search) && (
            <button onClick={clearAll} style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline', padding: 4, flexShrink: 0 }}>
              Clear All
            </button>
          )}
        </div>

        {/* Filter panel */}
        {filterOpen && (
          <div style={{ maxWidth: 720, margin: '16px auto 0', background: 'white', borderRadius: 14, padding: '24px 28px 20px', boxShadow: '0 8px 32px rgba(7,44,56,0.22)', textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 20px' }}>
              {[
                { label: 'Location', value: filterLocation, setter: setFilterLocation, options: [
                  ['International District Medical & Dental Clinic', 'International District'],
                  ['Holly Park Medical & Dental Clinic', 'Holly Park'],
                  ['Shoreline Medical & Dental Clinic', 'Shoreline'],
                  ['Bellevue Medical & Dental Clinic', 'Bellevue'],
                ]},
                { label: 'Service Type', value: filterService, setter: setFilterService, options: [
                  ['Physician', 'Physician'],
                  ['Dentist', 'Dental'],
                  ['Optometrist', 'Vision / Eye Care'],
                  ['Behavioral', 'Behavioral Health'],
                  ['Dietitian', 'Nutrition / Dietitian'],
                  ['Advanced Practice', 'Advanced Practice'],
                ]},
                { label: 'Language', value: filterLanguage, setter: setFilterLanguage, options: [
                  ['Mandarin', 'Mandarin'],
                  ['Cantonese', 'Cantonese'],
                  ['Korean', 'Korean'],
                  ['Hindi', 'Hindi'],
                  ['Urdu', 'Urdu'],
                  ['Vietnamese', 'Vietnamese'],
                ]},
                { label: 'Pronouns', value: filterPronouns, setter: setFilterPronouns, options: [
                  ['she/her', 'She / Her'],
                  ['he/him', 'He / Him'],
                  ['they/them', 'They / Them'],
                ]},
              ].map(({ label, value, setter, options }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={value}
                      onChange={e => { setter(e.target.value); setShowAll(false) }}
                      style={{ appearance: 'none', width: '100%', padding: '11px 36px 11px 14px', border: '1.5px solid #d0d8da', borderRadius: 8, background: 'white', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', cursor: 'pointer', outline: 'none' }}
                    >
                      <option value="">All {label}s</option>
                      {options.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
                    </select>
                    <span style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: 'var(--muted)', pointerEvents: 'none' }}>▾</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.07)' }}>
              <button onClick={clearAll} style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'var(--muted)', cursor: 'pointer', background: 'none', border: 'none', padding: '8px 16px', borderRadius: 6 }}>
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── RESULTS ── */}
      <div style={{ background: 'var(--teal-light)', padding: '52px 40px 60px' }}>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 700, color: 'var(--navy)', textAlign: 'center', marginBottom: 32 }}>
          Providers — {filterLocation || 'All Locations'}
        </h2>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>No providers found</h3>
            <p style={{ fontSize: 14, color: 'var(--muted)' }}>
              Try adjusting your filters or call{' '}
              <a href="tel:2067883700" style={{ color: 'var(--teal-dark)', fontWeight: 600 }}>(206) 788-3700</a>{' '}
              to speak with our team.
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, maxWidth: 1100, margin: '0 auto' }}>
              {displayed.map(p => <ProviderCard key={p.id} provider={p} />)}
            </div>

            <div style={{ textAlign: 'center', marginTop: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              {hasMore && (
                <button
                  onClick={() => setShowAll(true)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 36px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, cursor: 'pointer', background: 'var(--teal-dark)', color: 'white', border: '2px solid var(--teal-dark)' }}
                >
                  View More Providers
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              )}
              {showAll && filtered.length > INITIAL_COUNT && (
                <button
                  onClick={() => setShowAll(false)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 36px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, cursor: 'pointer', background: 'transparent', color: 'var(--teal-dark)', border: '2px solid var(--teal-dark)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, transform: 'rotate(180deg)' }}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  View Less
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── HFY ── */}
      <div style={{ background: 'var(--crimson)', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 260, overflow: 'hidden' }}>
        <div style={{ padding: '56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
