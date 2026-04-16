export default function CareersPage() {
  return (
    <div style={{ background: '#f8f7f5', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '80px 40px' }}>
        <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 32, fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>Careers at ICHS</h1>
        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 32px' }}>
          Join our team and help us deliver compassionate, culturally appropriate health care to communities across Greater Seattle.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://ichshealth.org/careers" target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Open Positions</a>
          <a href="mailto:hr@ichshealth.org" className="btn btn-outline">Contact HR</a>
        </div>
      </div>
    </div>
  )
}
