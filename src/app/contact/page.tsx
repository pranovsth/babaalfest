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
      <ContactContent />
      <SiteFooter />
    </main>
  );
}
