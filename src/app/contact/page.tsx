import type { Metadata } from "next";
import { ContactContent } from "../page-content";
import SiteFooter from "../site-footer";
import SiteHeader from "../site-header";

export const metadata: Metadata = {
  title: "Contact — Highlander Crew",
  description: "Contact Highlander Crew for tickets, artists, bookings and partnerships.",
};

export default function ContactPage() {
  return (
    <main className="inner-page">
      <SiteHeader active="contact" />
      <header className="page-masthead section-shell">
        <p>Get in touch</p>
        <h1>Talk to our London team.</h1>
        <span>Tickets, artist collaborations, venue partnerships and festival programming.</span>
      </header>
      <ContactContent />
      <SiteFooter />
    </main>
  );
}
