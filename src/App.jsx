/*
  Be Eternal — Motion-first homepage (be-eternal-homepage.jsx)
  - Tech: Vite + React + TailwindCSS + Framer Motion
  - Changes in this revision:
    • All tiles now have strong hover effects with pronounced shadows beneath (tilt + lift + shadow).
    • Added subtle "dashing" visuals: animated dashed ring and animated underline for service titles.
    • Stat, Timeline, Case and Service tiles all use the same TiltTile wrapper for consistent motion and shadows.
    • Global lightweight CSS added for dashed animations (kept inline in this single file).

  Drop this into src/App.jsx inside a Vite + React project. Replace /logo.png and add any custom SVGs into /public/assets.
*/

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// -----------------------------
// Single source of truth (edit content here)
// -----------------------------
const SITE_CONTENT = {
  logo: "/logo.png",
  colors: {
    primary: "#38b6ff",
    accent: "#6ee7b7",
    dark: "#0f172a",
  },
  hero: {
    eyebrow: "Digital-first — Forever.",
    title: "Be Eternal: Digital experiences that last",
    subtitle:
      "Pixel-perfect websites, growth-focused marketing, and content that converts. We make your brand memorable — and measurable.",
    ctaPrimary: "Let's Talk",
    ctaSecondary: "See Services",
  },
  about: {
    title: "About Be Eternal",
    blurb:
      "We craft strategic digital solutions — combining creative content, growth marketing and technically-sound builds. White background, bold intent, timeless results.",
  },
  // each service now includes a default link (replace with your real pages later)
  services: [
    {
      id: "seo",
      title: "Search Engine Optimization",
      short: "Drive organic visibility & qualified traffic.",
      bullets: [
        "On-page SEO",
        "Off-page SEO",
        "Technical SEO",
        "Emerging SEO (AI + Semantic Search)",
        "Geo & AEO (local + voice)",
      ],
      icon: "seo",
      link: "/services/seo",
    },
    {
      id: "content",
      title: "Content Development",
      short: "Strategy, writing and assets that move people.",
      bullets: [
        "Content strategy & briefs",
        "Creative content (video/graphics)",
        "Content writing: blogs, e-books, emails",
        "AI-assisted bulk content",
        "Website content & long-form",
      ],
      icon: "content",
      link: "/services/content",
    },
    {
      id: "social",
      title: "Social Media Marketing",
      short: "Campaigns, creatives and ad operations.",
      bullets: ["Social campaigns & growth", "Graphic design for socials", "Meta ads"],
      icon: "social",
      link: "/services/social",
    },
    {
      id: "gifts",
      title: "Gift Webpages — Digital Gifting",
      short: "Create memorable gift experiences & landing micro-sites.",
      bullets: ["Personalized gift pages", "Instant digital gifting UX", "Trackable deliveries & analytics"],
      icon: "gift",
      link: "/services/gifts",
    },
    {
      id: "landing",
      title: "Landing Pages",
      short: "High-converting landing pages for campaigns & funnels.",
      bullets: ["Speed-optimized pages", "A/B testing & tracking", "Seamless form integrations"],
      icon: "landing",
      link: "/services/landing-pages",
    },
    {
      id: "ads",
      title: "Google Ads",
      short: "Performance-driven search & display campaigns.",
      bullets: ["Search, Display & Performance Max", "Conversion tracking & ROAS focus", "Creative + copy for ads"],
      icon: "ads",
      link: "/services/google-ads",
    },
  ],
  caseStudies: [
    { id: "c1", title: "SaaS Growth Sprint", excerpt: "Landing + paid ads -> 2.4x MQLs", category: "Growth" },
    { id: "c2", title: "E‑commerce Revamp", excerpt: "Conversion revamp + content -> +42% CVR", category: "E‑commerce" },
    { id: "c3", title: "Digital Gifting Launch", excerpt: "Micro-sites for a holiday campaign", category: "Product" },
  ],
  stats: [
    { id: "st1", label: "Projects Delivered", value: 120 },
    { id: "st2", label: "Happy Clients", value: 85 },
    { id: "st3", label: "Campaigns Run", value: 200 },
    { id: "st4", label: "Avg ROI %", value: 350 },
  ],
  testimonials: [
    { quote: "Be Eternal helped us scale fast with SEO & ads.", author: "Startup Founder" },
    { quote: "Beautiful landing pages that actually convert.", author: "Ecom Brand" },
    { quote: "Content team is world-class and reliable.", author: "Marketing Lead" },
  ],
  timeline: [
    { year: 2019, title: "Founded", note: "Started as a two-person studio." },
    { year: 2020, title: "First 50 clients", note: "Work across SaaS & e-commerce." },
    { year: 2022, title: "Scaled offerings", note: "Added paid ads & gifting microsites." },
    { year: 2024, title: "Be Eternal today", note: "Full-stack digital growth studio." },
  ],
  contact: {
    email: "hello@be-eternal.com",
  },
};

// -----------------------------
// Inline icons
// -----------------------------
const Icon = ({ name, className = "w-6 h-6" }) => {
  switch (name) {
    case "seo":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 6h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 18h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="4.5" cy="6.5" r="1.2" fill="currentColor" />
          <circle cx="4.5" cy="12" r="1.2" fill="currentColor" />
          <circle cx="4.5" cy="18" r="1.2" fill="currentColor" />
        </svg>
      );
    case "content":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4 12h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4 18h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="16" y="10" width="4" height="4" rx="1" fill="currentColor" />
        </svg>
      );
    case "social":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 12a4 4 0 104 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 8h2l1-2h8l1 2h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="18" cy="6" r="1" fill="currentColor" />
        </svg>
      );
    case "gift":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 7v13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 3s2 2 4 2 2.5-1 2.5-1-1 2-3 2-3-3-3-3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "landing":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 9h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M7 13h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "ads":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 11h4v6H3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 7l10-4v14L7 17V7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 9v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
};

// -----------------------------
// Motion variants
// -----------------------------
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

// -----------------------------
// Smooth tilt effect for tiles (upgraded hover + shadow)
// -----------------------------
function TiltTile({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = null;
    let isHover = false;

    // set initial subtle shadow
    el.style.boxShadow = "0 8px 20px rgba(2,6,23,0.04)";
    el.style.transition = "box-shadow 220ms ease, transform 220ms ease";

    const handleMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const ry = (px - 0.5) * 12;
      const rx = (0.5 - py) * 12;
      const baseLift = isHover ? -8 : 0;
      const ty = baseLift - Math.abs((py - 0.5) * 8);
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${ty}px)`;
        el.style.boxShadow = `0 28px 60px rgba(2,6,23,0.08), 0 12px 36px ${SITE_CONTENT.colors.primary}18`;
      });
    };
... (truncated for brevity) ...
