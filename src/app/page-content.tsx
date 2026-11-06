"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type FormEvent, type ReactNode } from "react";

const galleryImages = [
  ["/event-babaal-fest-2026.png", "Babaal Fest 2026 event poster"],
  ["/event-north-fest-2025.png", "North Fest 2025 event poster"],
  ["/event-north-fest-2024.png", "North Fest 2024 event poster"],
] as const;

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

const featuredEvents = [
  {
    title: "Babaal Fest 2026",
    description: "A winter celebration led by Abhaya and The Steam Engines, Laure, Prajina, Sabda Band, Rai Vam, DJs and more.",
    date: "12 Dec 2026",
    venue: "Lakeside International Hotel, Frimley Green, GU16 6JR",
    image: "/event-babaal-fest-2026.png",
    status: "Upcoming",
    href: "https://mamagharentertainment.com/tickets",
    cta: "Book tickets",
  },
  {
    title: "North Fest 2025",
    description: "Adrian Pradhan, Sabda Band, Rai Vai and emcee Malvika Subba brought another generation-spanning celebration to Catterick Garrison.",
    date: "16 Aug 2025",
    venue: "Risedale School, Catterick Garrison",
    image: "/event-north-fest-2025.png",
    status: "Past event",
    href: "/gallery",
    cta: "View gallery",
  },
  {
    title: "North Fest 2024",
    description: "Raju Lama and a full supporting lineup turned the bank holiday weekend into a vibrant community music celebration.",
    date: "25 Aug 2024",
    venue: "Risedale School, Catterick Garrison",
    image: "/event-north-fest-2024.png",
    status: "Past event",
    href: "/gallery",
    cta: "View gallery",
  },
];

export function HomeHighlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-18%", "24%"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        cards.children,
        { y: 72, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: { trigger: cards, start: "top 82%", once: true },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="home-highlights">
        <section ref={sectionRef} className="home-featured section-shell">
          <motion.div className="home-featured-glow" style={{ y: glowY }} aria-hidden="true" />
          <Reveal className="home-section-heading home-section-heading-simple">
            <h2>Featured events</h2>
            <Link className="text-link" href="/events">Browse all <ArrowIcon /></Link>
          </Reveal>

          <div ref={cardsRef} className="home-events-grid">
            {featuredEvents.map((event, index) => (
              <motion.article
                className={`home-event-card${index === 0 ? " home-event-card-main" : ""}`}
                key={event.title}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className={`home-event-media${index === 0 ? " home-event-media-poster" : ""}`}>
                  <Image src={event.image} alt={`${event.title} event artwork`} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 48vw" : "(max-width: 800px) 100vw, 24vw"} />
                  <span>{event.status}</span>
                </div>
                <div className="home-event-copy">
                  <p>{event.venue}</p>
                  <h3>{event.title}</h3>
                  <p className="home-event-description">{event.description}</p>
                  <div className="home-event-meta"><time>{event.date}</time><span>{event.venue}</span></div>
                  <Link className="home-event-link" href={event.href}>{event.cta} <ArrowIcon /></Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="home-partners section-shell">
          <Reveal className="home-partners-heading home-partners-heading-simple">
            <h2>Our partners</h2>
          </Reveal>
          <div className="partner-logo-grid">
            {[
              ["Nepal Foods", "Food & Catering", "/partner-nepal-foods.webp"],
              ["Rastriya Poshak Ghar", "Official Outfitter", "/partner-rastriya-poshak-ghar.webp"],
              ["Maya Events", "Event Production", "/partner-maya-events.webp"],
            ].map(([name, role, image], index) => (
              <motion.article
                key={name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 0.985 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.58, delay: index * 0.09 }}
              >
                <div className="partner-logo-wrap"><Image src={image} alt={`${name} logo`} fill sizes="(max-width: 700px) 100vw, 30vw" /></div>
                <div><h3>{name}</h3><p>{role}</p></div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}

export function EventsContent() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="home-content">
        <section className="featured-section section-shell compact-section-top">
          <Reveal className="section-heading section-heading-simple">
            <h2>Next on stage</h2>
          </Reveal>
          <motion.article
            className="featured-event"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="featured-media featured-media-poster">
              <Image src="/event-babaal-fest-2026.png" alt="Babaal Fest 2026 event poster" fill sizes="(max-width: 900px) 100vw, 58vw" />
              <span className="featured-badge">Upcoming</span>
            </div>
            <div className="featured-copy">
              <p className="event-location">Frimley Green · GU16 6JR</p>
              <h3>Babaal Fest 2026</h3>
              <p className="event-description">Escape the winter blues with a full day of live bands, solo artists, DJs and community celebration.</p>
              <dl className="event-facts">
                <div><dt>Date</dt><dd>Saturday, 12 December 2026</dd></div>
                <div><dt>Venue</dt><dd>Lakeside International Hotel, Frimley Green, GU16 6JR</dd></div>
              </dl>
              <a className="primary-action" href="https://mamagharentertainment.com/tickets" target="_blank" rel="noreferrer">Book tickets <ArrowIcon /></a>
            </div>
          </motion.article>
        </section>

        <section className="archive-section archive-section-compact">
          <div className="archive-intro archive-intro-simple section-shell">
            <h2>The archive</h2>
          </div>
          <div className="home-events-grid archive-events-grid section-shell">
            {featuredEvents.slice(1).map((event) => (
              <motion.article
                className="home-event-card"
                key={event.title}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="home-event-media">
                  <Image src={event.image} alt={`${event.title} event artwork`} fill sizes="(max-width: 800px) 100vw, 48vw" />
                  <span>{event.status}</span>
                </div>
                <div className="home-event-copy">
                  <p>{event.venue}</p>
                  <h3>{event.title}</h3>
                  <p className="home-event-description">{event.description}</p>
                  <div className="home-event-meta"><time>{event.date}</time><span>{event.venue}</span></div>
                  <Link className="home-event-link" href={event.href}>{event.cta} <ArrowIcon /></Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}

export function GalleryContent() {
  const instagramUrl = "https://www.instagram.com/highlander_crew/";

  return (
    <MotionConfig reducedMotion="user">
      <section className="gallery-section instagram-gallery section-shell compact-section-top">
        <Reveal className="instagram-profile">
          <div className="instagram-profile-identity">
            <Image src="/highlander-crew-logo.png" alt="" width={1189} height={1323} />
            <div>
              <p className="section-eyebrow">Gallery</p>
              <h1>@highlander_crew</h1>
              <p>Event posters, artists and moments from the Highlander Crew community.</p>
            </div>
          </div>
          <a href={instagramUrl} target="_blank" rel="noreferrer">View Instagram <ArrowIcon /></a>
        </Reveal>
        <div className="instagram-gallery-grid">
          {galleryImages.map(([src, alt], index) => (
            <motion.a
              className="instagram-gallery-tile"
              key={src}
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${alt} on Instagram`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 0.985 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.65, delay: index * 0.06 }}
            >
              <Image src={src} alt={alt} fill sizes="(max-width: 700px) 100vw, 50vw" />
              <span>View on Instagram <ArrowIcon /></span>
            </motion.a>
          ))}
        </div>
      </section>
    </MotionConfig>
  );
}

export function AboutContent() {
  const storyRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="home-content">
        <section ref={storyRef} className="story-section section-shell compact-section-top">
          <div className="section-index" aria-hidden="true">01 / Our story</div>
          <div className="story-copy">
            <Reveal>
              <p className="section-eyebrow">Our origin · उत्पत्ति</p>
              <h2>From family gatherings<span>to festival stages.</span></h2>
            </Reveal>
            <Reveal className="story-body" delay={0.08}>
              <p>Highlander Crew was built to bring Nepali music, food and community together in bold live experiences made for every generation.</p>
              <p>Sarangi, madal and ritual meet modern stage design and immersive storytelling. Every show feels cinematic, warm and unmistakably Nepali.</p>
            </Reveal>
            <Reveal className="story-stats" delay={0.14}>
              <div><strong>06</strong><span>landmark shows</span></div>
              <div><strong>02</strong><span>countries connected</span></div>
              <div><strong>01</strong><span>feeling of home</span></div>
            </Reveal>
          </div>
          <motion.div className="story-visual" style={{ y: imageY }}>
            <Image src="/event-kandara.webp" alt="Highlander Crew concert artwork featuring Nepali artists" fill sizes="(max-width: 900px) 100vw, 42vw" />
            <span className="story-visual-label">Himalayas → London</span>
          </motion.div>
        </section>
        <div className="culture-marquee" aria-label="Highlander Crew values">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}>
            <span>Live music</span><i /><span>For all generations</span><i /><span>Nepali culture</span><i /><span>Feels like home</span><i />
            <span aria-hidden="true">Live music</span><i /><span aria-hidden="true">For all generations</span><i /><span aria-hidden="true">Nepali culture</span><i /><span aria-hidden="true">Feels like home</span><i />
          </motion.div>
        </div>
        <section className="promise-section section-shell">
          <Reveal className="promise-quote"><p>Our promise</p><blockquote>“Where Nepali music<span>feels like home.”</span></blockquote></Reveal>
          <Reveal className="partners" delay={0.1}>
            <p>In partnership with</p>
            <div><span>Nepal Foods<small>Food & catering</small></span><span>Rastriya Poshak Ghar<small>Official outfitter</small></span><span>Maya Events<small>Event production</small></span></div>
          </Reveal>
        </section>
      </div>
    </MotionConfig>
  );
}

export function ContactContent() {
  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const mobile = String(data.get("mobile") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "General enquiry");
    const message = String(data.get("message") ?? "");
    const emailSubject = encodeURIComponent(`${subject} — ${name}`);
    const emailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nMobile / WhatsApp: ${mobile}\nSubject: ${subject}\n\nMessage:\n${message}`,
    );

    window.location.href = `mailto:highlandercrew@outlook.com?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className="contact-section contact-section-simple section-shell compact-section-top">
        <Reveal className="contact-intro">
          <p className="section-eyebrow">Contact</p>
          <h1>Send an enquiry.</h1>
          <p>Questions about tickets, artists, partnerships or an upcoming event? Tell us what you need and our team will get back to you.</p>
          <div className="contact-quick-links">
            <a href="mailto:highlandercrew@outlook.com"><span>Email</span><strong>highlandercrew@outlook.com</strong></a>
            <a href="tel:+447496555863"><span>Phone</span><strong>+44 7496 555863</strong></a>
            <a href="https://wa.me/447496555863" target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>Message the booking team ↗</strong></a>
          </div>
        </Reveal>

        <Reveal className="enquiry-card" delay={0.1}>
          <div className="enquiry-heading">
            <p className="section-eyebrow">Enquiry form</p>
            <h2>How can we help?</h2>
          </div>
          <form className="enquiry-form" onSubmit={submitEnquiry}>
            <div className="enquiry-form-row">
              <label>Your name *<input name="name" type="text" autoComplete="name" placeholder="Full name" required /></label>
              <label>Mobile number *<input name="mobile" type="tel" autoComplete="tel" placeholder="+44 7…" required /></label>
            </div>
            <label>Email address *<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
            <label>Subject
              <select name="subject" defaultValue="Event booking">
                <option>Event booking</option>
                <option>Artist enquiry</option>
                <option>Partnership or sponsorship</option>
                <option>Press and media</option>
                <option>General enquiry</option>
              </select>
            </label>
            <label>Your message *<textarea name="message" rows={5} placeholder="Tell us how we can help…" required /></label>
            <label className="enquiry-consent">
              <input name="consent" type="checkbox" required />
              <span>I agree to Highlander Crew using these details to respond to my enquiry.</span>
            </label>
            <button type="submit">Send enquiry <ArrowIcon /></button>
            <p className="enquiry-note">Submitting prepares the enquiry in your email app so you can review and send it.</p>
          </form>
        </Reveal>
      </section>
    </MotionConfig>
  );
}
