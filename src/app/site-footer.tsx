import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-grid">
        <div className="footer-brand">
          <Image
            src="/highlander-crew-logo.png"
            alt="Highlander Crew"
            width={180}
            height={200}
          />
          <p>Highlander Crew creates vibrant Nepali concerts, festivals and cultural experiences that bring every generation together.</p>
        </div>

        <div className="footer-column">
          <h2>Explore</h2>
          <nav aria-label="Footer navigation">
            <Link href="/events">Upcoming events</Link>
            <a href="https://mamagharentertainment.com/tickets" target="_blank" rel="noreferrer">Book tickets</a>
            <Link href="/gallery">Gallery</Link>
            <Link href="/about">Our story</Link>
            <Link href="/contact">Contact</Link>
            <a href="https://mamagharentertainment.com/privacy" target="_blank" rel="noreferrer">Privacy notice</a>
          </nav>
        </div>

        <div className="footer-column footer-newsletter">
          <h2>Join the list</h2>
          <p>Early access to tickets, artist news and festival dates. No spam—only celebration.</p>
          <form action="mailto:highlandercrew@outlook.com" method="post" encType="text/plain">
            <label className="sr-only" htmlFor="footer-email">Your email address</label>
            <input id="footer-email" name="email" type="email" placeholder="Your email address" required />
            <button type="submit" aria-label="Join the mailing list">→</button>
          </form>
          <small>Ticket bookings automatically add you to this list.</small>
        </div>

        <div className="footer-column footer-connect">
          <h2>Connect</h2>
          <address>
            <span>82 Montrose Ave,<br />Edgware HA8 0DT, UK</span>
            <a href="mailto:highlandercrew@outlook.com">highlandercrew@outlook.com</a>
            <a href="tel:+447496555863">+44 7496 555863</a>
            <a href="https://wa.me/447496555863" target="_blank" rel="noreferrer">WhatsApp booking ↗</a>
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Highlander Crew. Built for music, culture and community.</span>
        <span>Made with heart in Nepal</span>
      </div>
    </footer>
  );
}
