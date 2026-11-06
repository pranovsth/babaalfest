import type { Metadata } from "next";
import { EventsContent } from "../page-content";
import SiteFooter from "../site-footer";
import SiteHeader from "../site-header";

export const metadata: Metadata = {
  title: "Events — Highlander Crew",
  description: "Babaal Fest 2026 and past Highlander Crew concerts and cultural events across the UK.",
};

export default function EventsPage() {
  return (
    <main className="inner-page">
      <SiteHeader active="events" />
      <EventsContent />
      <SiteFooter />
    </main>
  );
}
