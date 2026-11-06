import Countdown from "./countdown";
import { HomeHighlights } from "./page-content";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

export default function Home() {
  return (
    <main id="home" className="festival-page">
      <SiteHeader active="home" overlay />

      <section className="hero" aria-labelledby="hero-title">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/babaal-fest-hero-poster.webp"
          aria-hidden="true"
        >
          <source src="/babaal-fest-hero.webm" type="video/webm" />
        </video>

        <div className="hero-wash" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        <div className="hero-content">
          <h1 id="hero-title" className="hero-title">
            <span>Babaal</span>
            <span>Fest</span>
            <small>2026</small>
          </h1>

          <p className="hero-lineup">
            Abhaya &amp; The Steam Engines <i /> Laure <i /> Prajina <i /> Sabda Band <i /> and more
          </p>

          <Countdown />

          <div className="hero-footer">
            <p>
              <span>Lakeside International Hotel</span>
              <span>Frimley Green</span>
            </p>
            <div className="hero-meta" aria-label="Event date">
              <time dateTime="2026-12-12">12 Dec 2026</time>
            </div>
          </div>
        </div>

      </section>
      <HomeHighlights />
      <SiteFooter />
    </main>
  );
}
