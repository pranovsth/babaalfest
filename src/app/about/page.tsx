import type { Metadata } from "next";
import { AboutContent } from "../page-content";
import SiteFooter from "../site-footer";
import SiteHeader from "../site-header";

export const metadata: Metadata = {
  title: "Our Story — Highlander Crew",
  description: "How Highlander Crew brings Nepali music, culture and togetherness to stages across the UK.",
};

export default function AboutPage() {
  return (
    <main className="inner-page">
      <SiteHeader active="about" />
      <header className="page-masthead section-shell">
        <p>Our story · हाम्रो कथा</p>
        <h1>Built from culture. Made for the world.</h1>
        <span>Bold live experiences built around music, culture and community.</span>
      </header>
      <AboutContent />
      <SiteFooter />
    </main>
  );
}
