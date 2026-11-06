"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FormEvent, useEffect, useId, useState } from "react";

const whatsappNumber = "447496555863";

function ChatIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4.5 5.5h15v10h-8.4L6 19v-3.5H4.5z" />
      <circle cx="8" cy="10.5" r="1" />
      <circle cx="12" cy="10.5" r="1" />
      <circle cx="16" cy="10.5" r="1" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20 11.8a8 8 0 0 1-11.8 7L4 20l1.2-4A8 8 0 1 1 20 11.8Z" />
      <path d="M8.4 7.8c.3-.4.6-.4.9-.1l1.1 1.5c.2.3.1.6-.1.9l-.6.7c.8 1.6 2 2.8 3.6 3.5l.7-.7c.3-.3.6-.3.9-.1l1.5 1c.4.2.4.6.2.9-.5.9-1.4 1.4-2.4 1.3-3.8-.5-6.8-3.4-7.3-7.2-.1-.7.5-1.4 1.5-1.7Z" />
    </svg>
  );
}

export default function SiteChat() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const nameId = useId();

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    let timer: ReturnType<typeof setTimeout> | undefined;
    const alreadySeen = window.sessionStorage.getItem("highlander-chat-seen");
    const desktop = window.matchMedia("(min-width: 701px)").matches;

    if (!alreadySeen && desktop) {
      timer = setTimeout(() => {
        setOpen(true);
        window.sessionStorage.setItem("highlander-chat-seen", "true");
      }, 2400);
    }

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const submitConversation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Namaste, I’m ${name.trim()}. I have a question about Babaal Fest.`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const directMessage = `Namaste, I have a question about Babaal Fest.`;

  return (
    <aside className="site-chat" aria-label="Contact Highlander Crew">
      <AnimatePresence>
        {open && (
          <motion.div
            id="site-chat-panel"
            className="site-chat-panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby="site-chat-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <header className="site-chat-header">
              <Image
                className="site-chat-logo"
                src="/highlander-crew-logo.png"
                alt=""
                width={1189}
                height={1323}
              />
              <div>
                <strong id="site-chat-title">Highlander Crew</strong>
                <span><i aria-hidden="true" /> Send us a message anytime</span>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className="site-chat-body">
              <h2>Namaste <span aria-hidden="true">🙏</span></h2>
              <p>Questions about an event or booking? Send us a message and our team will reply on WhatsApp.</p>

              <form onSubmit={submitConversation}>
                <label htmlFor={nameId}>Your name</label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="How should we address you?"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
                <button className="site-chat-start" type="submit">
                  Start conversation <span aria-hidden="true">→</span>
                </button>
              </form>

              <div className="site-chat-divider"><span>or</span></div>

              <a
                className="site-chat-whatsapp"
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(directMessage)}`}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon /> Continue on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="site-chat-launcher"
        type="button"
        aria-label={open ? "Close chat" : "Chat with Highlander Crew"}
        aria-expanded={open}
        aria-controls="site-chat-panel"
        onClick={() => setOpen((current) => !current)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
            transition={{ duration: 0.16 }}
          >
            {open ? "×" : <ChatIcon />}
          </motion.span>
        </AnimatePresence>
        {!open && <i className="site-chat-status" aria-hidden="true" />}
      </motion.button>
    </aside>
  );
}
