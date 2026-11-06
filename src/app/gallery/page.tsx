import type { Metadata } from "next";
import { GalleryContent } from "../page-content";
import SiteFooter from "../site-footer";
import SiteHeader from "../site-header";

export const metadata: Metadata = {
  title: "Gallery — Highlander Crew",
  description: "Moments, artwork and memories from Highlander Crew.",
};

export default function GalleryPage() {
  return (
    <main className="inner-page">
      <SiteHeader active="gallery" />
      <header className="page-masthead section-shell">
        <p>Seen & felt</p>
        <h1>Every frame holds a memory.</h1>
        <span>Posters, people and the energy that turns a concert into home.</span>
      </header>
      <GalleryContent />
      <SiteFooter />
    </main>
  );
}
