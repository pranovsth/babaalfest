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
      <GalleryContent />
      <SiteFooter />
    </main>
  );
}
