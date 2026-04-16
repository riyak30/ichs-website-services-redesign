import { useState } from 'react'

export default function NewsletterStrip() {
  const [email, setEmail] = useState('')

  function handleSubscribe(e) {
    e.preventDefault()
    setEmail('')
  }

  return (
    <div className="newsletter-strip">
      <div className="newsletter-strip-content">
        <h2>Sign Up For<br />Our Newsletter</h2>
        <p>Join our mailing list to stay up-to-date on ICHS news and stories.</p>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className="newsletter-strip-photo">
        <img src="/img/newsletter.png" alt="Photo of a little girl with sunglasses smiling" />
      </div>
    </div>
  )
}
