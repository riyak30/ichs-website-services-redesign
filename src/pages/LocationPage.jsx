import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import locationsData from '../data/locationsData.js'
import NewsletterStrip from '../components/NewsletterStrip.jsx'

export default function LocationPage() {
  const [search, setSearch] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [clinicType, setClinicType] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const { hash } = useLocation()

  // Scroll to hash on mount
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
      }
    }
  }, [hash])

  const activeCount = [clinicType, sortBy !== 'default' ? sortBy : ''].filter(Boolean).length

  function clearAll() {
    setSearch('')
    setClinicType('')
    setSortBy('default')
    setFilterOpen(false)
  }

  let filtered = locationsData.filter(loc => {
    const matchSearch = !search ||
      loc.name.toLowerCase().includes(search.toLowerCase()) ||
      loc.address.toLowerCase().includes(search.toLowerCase())
    const matchType = !clinicType || loc.types.some(t => t.toLowerCase().includes(clinicType.toLowerCase()))
    return matchSearch && matchType
  })

  if (sortBy === 'az') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
  if (sortBy === 'za') filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name))

  return (
    <>
      {/* ── HERO ── */}
      <div style={{ background: 'var(--teal-dark)', padding: '48px 40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 36, fontWeight: 700, color: 'white', marginBottom: 8 }}>Find a Location</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 24 }}>
          ICHS has 13 clinic sites across Greater Seattle, Bellevue, and Auburn.
        </p>

        {/* Search row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 660, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: 40, padding: '10px 20px', gap: 10, flex: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" style={{ width: 16, height: 16, flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              id="locSearch"
              type="text"
              placeholder="Search by name or address..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ border: 'none', outline: 'none', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', flex: 1, background: 'transparent' }}
            />
          </div>
          <button
            onClick={() => setFilterOpen(o => !o)}
            aria-expanded={filterOpen}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.6)', borderRadius: 40, padding: '10px 18px', fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, color: 'white', cursor: 'pointer', flexShrink: 0 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 14, height: 14 }}>
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filters
            {activeCount > 0 && (
              <span style={{ background: 'var(--crimson)', color: 'white', borderRadius: 20, padding: '1px 8px', fontSize: 11, fontWeight: 700 }}>{activeCount}</span>
            )}
            <span style={{ fontSize: 10, transition: 'transform 0.2s', transform: filterOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
          </button>
          {(activeCount > 0 || search) && (
            <button onClick={clearAll} style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline', padding: 4, flexShrink: 0 }}>
              Clear All
            </button>
          )}
        </div>

        {/* Filter panel */}
        {filterOpen && (
          <div style={{ maxWidth: 660, margin: '16px auto 0', background: 'white', borderRadius: 14, padding: '24px 28px 20px', boxShadow: '0 8px 32px rgba(7,44,56,0.22)', textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sort By</label>
                <div style={{ position: 'relative' }}>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ appearance: 'none', width: '100%', padding: '11px 36px 11px 14px', border: '1.5px solid #d0d8da', borderRadius: 8, background: 'white', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', cursor: 'pointer', outline: 'none' }}>
                    <option value="default">Default</option>
                    <option value="az">Name A–Z</option>
                    <option value="za">Name Z–A</option>
                  </select>
                  <span style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: 'var(--muted)', pointerEvents: 'none' }}>▾</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Clinic Type</label>
                <div style={{ position: 'relative' }}>
                  <select value={clinicType} onChange={e => setClinicType(e.target.value)} style={{ appearance: 'none', width: '100%', padding: '11px 36px 11px 14px', border: '1.5px solid #d0d8da', borderRadius: 8, background: 'white', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', cursor: 'pointer', outline: 'none' }}>
                    <option value="">All Types</option>
                    <option value="medical">Medical</option>
                    <option value="dental">Dental</option>
                    <option value="wellness">Wellness</option>
                    <option value="mobile">Mobile</option>
                    <option value="school">School Health</option>
                  </select>
                  <span style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: 'var(--muted)', pointerEvents: 'none' }}>▾</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(0,0,0,0.07)' }}>
              <button onClick={clearAll} style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'var(--muted)', cursor: 'pointer', background: 'none', border: 'none', padding: '8px 16px', borderRadius: 6 }}>
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── LOCATION CARDS ── */}
      <div style={{ background: 'var(--teal-light)', padding: '40px 40px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-head)', fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>
            Showing {filtered.length} location{filtered.length !== 1 ? 's' : ''}
          </p>
          <div id="locCards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {filtered.map(loc => (
              <Link
                key={loc.id}
                id={loc.id}
                to={`/location/${loc.id}`}
                style={{ display: 'block', background: 'white', borderRadius: 'var(--radius-lg)', border: '1.5px solid rgba(0,0,0,0.07)', overflow: 'hidden', transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s', textDecoration: 'none', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal-mid)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(2,110,112,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ height: 180, overflow: 'hidden', background: 'linear-gradient(135deg, var(--teal-light) 0%, #b8dfe0 100%)' }}>
                  <img
                    src={loc.imageFile}
                    alt={loc.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.style.display = 'none' }}
                  />
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, lineHeight: 1.3 }}>{loc.name}</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 7, fontSize: 13, color: 'var(--muted)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 1 }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{loc.address}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 7, fontSize: 13, color: 'var(--muted)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 1 }}>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span>{loc.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 7, fontSize: 13, color: 'var(--muted)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 1 }}>
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {Object.entries(loc.hoursDetailed)[0][1]}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                    {loc.mapUrl && (
                      <a
                        href={loc.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ flex: 1, padding: '9px 12px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, textAlign: 'center', border: '1.5px solid var(--teal-dark)', color: 'var(--teal-dark)', background: 'transparent', textDecoration: 'none' }}
                      >
                        Get Directions
                      </a>
                    )}
                    <div style={{ flex: 1, padding: '9px 12px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, textAlign: 'center', border: '1.5px solid var(--teal-dark)', color: 'white', background: 'var(--teal-dark)' }}>
                      Learn More
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 40px' }}>
              <p style={{ fontSize: 16, color: 'var(--muted)' }}>No locations match your search. <button onClick={clearAll} style={{ color: 'var(--crimson)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Clear filters</button></p>
            </div>
          )}
        </div>
      </div>

      <NewsletterStrip />
    </>
  )
}
