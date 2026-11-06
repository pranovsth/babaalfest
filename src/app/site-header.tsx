"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ActivePage = "home" | "events" | "gallery" | "about" | "contact";

const links: { href: string; label: string; page: ActivePage }[] = [
  { href: "/", label: "Home", page: "home" },
  { href: "/events", label: "Events", page: "events" },
  { href: "/gallery", label: "Gallery", page: "gallery" },
  { href: "/about", label: "About", page: "about" },
  { href: "/contact", label: "Contact", page: "contact" },
];

export default function SiteHeader({
  active,
  overlay = false,
}: {
  active: ActivePage;
  overlay?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className={`site-header${overlay ? "" : " site-header-solid"}`}>
      <div className="site-nav">
        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="main-navigation"
          className={`nav-links${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <Link
              className={`nav-link${active === link.page ? " active" : ""}`}
              href={link.href}
              key={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link className="wordmark" href="/" aria-label="Highlander Crew home">
          <Image
            className="brand-logo"
            src="/highlander-crew-logo.png"
            alt="Highlander Crew"
            width={1189}
            height={1323}
            priority
          />
        </Link>

        <a
          className="ticket-button"
          href="https://mamagharentertainment.com/tickets"
          target="_blank"
          rel="noreferrer"
        >
          Book tickets
        </a>
      </div>
    </header>
  );
}
