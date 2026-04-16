import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import servicesData from '../data/servicesData.js'

const CATEGORY_LABELS = {
  general: 'General Care',
  specialized: 'Specialized Care',
  wellness: 'Wellness Programs & Community Services',
}

const SVC_ICONS = {
  Primary_Care: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg>,
  Dental_Care: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8.1 2 5 5.1 5 9c0 2.3.8 4 1.8 5.8.9 1.7 1.2 3.5 1.2 3.5C8.3 19.8 9 21 10 21c.7 0 1.3-.4 1.6-1.2.4-.9.7-1.8 1.4-1.8.7 0 1 .9 1.4 1.8.3.8.9 1.2 1.6 1.2 1 0 1.7-1.2 2-2.7 0 0 .3-1.8 1.2-3.5C20.2 13 21 11.3 21 9c0-3.9-3.1-7-7-7h-2z"/></svg>,
  After_Hours_Clinic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Pharmacy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m10.5 20.5-7-7a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7z"/><path d="m8.5 12.5 3 3"/></svg>,
  Sexual_Health_and_Wellness: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Eye_Care: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/></svg>,
  Behavioral_Health: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Pregnancy_Care: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="5" r="3"/><path d="M6 21v-2a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v2"/><path d="M10.5 16.5c.4-.5 1-.8 1.5-.8s1.1.3 1.5.8c.4.5.4 1.2 0 1.7L12 19.5l-1.5-1.3c-.4-.5-.4-1.2 0-1.7z"/></svg>,
  Geriatric_Care: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Medication_Assisted_Treatment: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 2h6l1 3H8zM7 5h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M12 10v4M10 12h4"/></svg>,
  School_Services: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  Integrative_Medicine: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Nutrition_Services: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20c4 0 7-3.5 7-9 0-3.5-1.5-6-4-7.5-1 .7-2 1-3 1s-2-.3-3-1C6.5 5 5 7.5 5 11c0 5.5 3 9 7 9z"/><path d="M12 4V2"/><path d="M14 1l-2 1-2-1"/></svg>,
  'Identity-Support': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>,
  Acupuncture: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="4" r="2"/><line x1="12" y1="6" x2="12" y2="20"/><path d="M11 20l1 2 1-2"/><line x1="9" y1="9" x2="15" y2="9"/></svg>,
  Women_Infants_and_Children_WIC: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="7" r="3.5"/><path d="M3 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2"/><circle cx="18" cy="11" r="2"/><path d="M22 21v-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v1"/></svg>,
  Healthy_Aging_and_Wellness: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
  Health_Education: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.22-1.2 4.16-3 5.2V18H9v-3.8C7.2 13.16 6 11.22 6 9a6 6 0 0 1 6-6z"/></svg>,
}

export default function ServicesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const navigate = useNavigate()

  const activeCount = [category].filter(Boolean).length

  function clearAll() {
    setSearch('')
    setCategory('')
    setFilterOpen(false)
  }

  const filtered = servicesData.filter(svc => {
    const matchSearch = !search || svc.name.toLowerCase().includes(search.toLowerCase()) || svc.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = !category || svc.category === category
    return matchSearch && matchCat
  })

  const categories = ['general', 'specialized', 'wellness']

  return (
    <>
      {/* ── HERO ── */}
      <div style={{ background: 'var(--teal-dark)', padding: '48px 40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 36, fontWeight: 700, color: 'white', marginBottom: 8 }}>Our Services</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 24 }}>
          Find the care you need — from primary care to community support.
        </p>

        {/* Search & filter row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 660, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: 40, padding: '10px 20px', gap: 10, flex: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" style={{ width: 16, height: 16, flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search for Services"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ border: 'none', outline: 'none', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', flex: 1, background: 'transparent' }}
            />
          </div>
          <button
            onClick={() => setFilterOpen(o => !o)}
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
            <button onClick={clearAll} style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline', padding: '4px', flexShrink: 0 }}>
              Clear All
            </button>
          )}
        </div>

        {/* Filter panel */}
        {filterOpen && (
          <div style={{ maxWidth: 660, margin: '16px auto 0', background: 'white', borderRadius: 14, padding: '24px 28px 20px', boxShadow: '0 8px 32px rgba(7,44,56,0.22)', textAlign: 'left' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Category</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    style={{ appearance: 'none', width: '100%', padding: '11px 36px 11px 14px', border: '1.5px solid #d0d8da', borderRadius: 8, background: 'white', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', cursor: 'pointer', outline: 'none' }}
                  >
                    <option value="">All Categories</option>
                    <option value="general">General Care</option>
                    <option value="specialized">Specialized Care</option>
                    <option value="wellness">Wellness &amp; Community Support</option>
                  </select>
                  <span style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: 'var(--muted)', pointerEvents: 'none' }}>▾</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(0,0,0,0.07)' }}>
              <button
                onClick={clearAll}
                style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'var(--muted)', cursor: 'pointer', background: 'none', border: 'none', padding: '8px 16px', borderRadius: 6 }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── SERVICE CATEGORIES ── */}
      {categories.map(cat => {
        const svcs = filtered.filter(s => s.category === cat)
        if (svcs.length === 0) return null
        return (
          <div key={cat} style={{ background: 'var(--teal-light)', padding: '0 40px 52px' }}>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 26, fontWeight: 700, color: 'var(--navy)', textAlign: 'center', padding: '40px 0 28px' }}>
              {CATEGORY_LABELS[cat]}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 980, margin: '0 auto' }}>
              {svcs.map(svc => (
                <div
                  key={svc.id}
                  onClick={() => navigate(`/services/${svc.id}`)}
                  style={{
                    background: 'white', borderRadius: 'var(--radius-lg)', border: '1.5px solid rgba(0,0,0,0.07)',
                    padding: '28px 22px 22px', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                    transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal-mid)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(2,110,112,0.12)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--teal-light)', border: '2px solid var(--teal-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                    <div style={{ width: 26, height: 26, color: 'var(--teal-dark)' }}>{SVC_ICONS[svc.id]}</div>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, color: 'var(--navy)', textAlign: 'center', marginBottom: 8, lineHeight: 1.3 }}>{svc.name}</h4>
                  <p style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.55, flex: 1 }}>{svc.description}</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'var(--crimson)', marginTop: 14, cursor: 'pointer', alignSelf: 'center' }}>
                    Learn More →
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 40px', background: 'var(--teal-light)' }}>
          <p style={{ fontSize: 16, color: 'var(--muted)' }}>No services match your search. <button onClick={clearAll} style={{ color: 'var(--crimson)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Clear filters</button></p>
        </div>
      )}

      {/* ── HERE FOR YOU CTA ── */}
      <div className="here-for-you">
        <div className="hfy-content">
          <h2>We're Here For You</h2>
          <p>
            ICHS accepts patients regardless of insurance, immigration status, or ability to pay. We offer sliding-scale fees and help with insurance enrollment.{' '}
            <a href="tel:2067883700">Call (206) 788-3700</a> to get started.
          </p>
          <a className="btn-white" href="tel:2067883700" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 28px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, cursor: 'pointer', background: 'white', color: 'var(--crimson)', border: '2px solid white', transition: 'all 0.15s', width: 'fit-content', textDecoration: 'none' }}>
            Call Us Today
          </a>
        </div>
        <div className="hfy-photo">
          <img src="/img/here-for-you.png" alt="ICHS here for you" />
        </div>
      </div>
    </>
  )
}
