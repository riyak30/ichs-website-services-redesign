import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { searchSite } from '../lib/siteSearch.js'

const TYPE_LABELS = {
  page: 'Page',
  service: 'Service',
  provider: 'Provider',
  location: 'Location',
}

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = (searchParams.get('q') || '').trim()
  const results = useMemo(() => searchSite(query), [query])

  return (
    <div style={{ background: '#f7f5f1', minHeight: '70vh', padding: '52px 40px 72px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal-dark)', marginBottom: 10 }}>
            Site Search
          </div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 38, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.12, marginBottom: 8 }}>
            {query ? `Results for "${query}"` : 'Search the ICHS site'}
          </h1>
          <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7 }}>
            {query
              ? `${results.length} result${results.length === 1 ? '' : 's'} across pages, services, providers, and locations.`
              : 'Use the search field in the top bar to find services, providers, clinic locations, and key site pages.'}
          </p>
        </div>

        {query && results.length > 0 && (
          <div style={{ display: 'grid', gap: 16 }}>
            {results.map((result) => (
              <Link
                key={result.id}
                to={result.url}
                style={{
                  display: 'block',
                  background: 'white',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(7,44,56,0.08)',
                  padding: '22px 24px',
                  boxShadow: '0 10px 28px rgba(7,44,56,0.05)',
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 999, padding: '4px 10px', background: 'rgba(2,110,112,0.08)', color: 'var(--teal-dark)', fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                  {TYPE_LABELS[result.type] || 'Result'}
                </div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2, marginBottom: 8 }}>
                  {result.title}
                </div>
                <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 10 }}>
                  {result.description}
                </div>
                <div style={{ fontSize: 13, color: 'var(--teal-dark)', fontWeight: 700 }}>
                  {result.url}
                </div>
              </Link>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(7,44,56,0.08)', padding: '32px 28px' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>
              No results found
            </div>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>
              Try a provider name, service name, clinic location, specialty, or address keyword.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
