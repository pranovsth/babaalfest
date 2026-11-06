import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import SiteChat from "./site-chat";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Highlander Crew — Babaal Fest 2026",
  description: "Babaal Fest 2026. Escape the winter blues with live Nepali music, DJs and community celebration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SiteChat />
      </body>
    </html>
  );
}
