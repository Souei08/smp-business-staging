"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Make sure you have your LegalModal.tsx file in the same directory!
import LegalModal, { LegalModalType } from "./LegalModal"; 

// ─── Data ────────────────────────────────────────────────────────────
const navLinks = [
  { label: "About",         href: "#about"      },
  { label: "What's Inside", href: "#curriculum" },
  { label: "Who It's For",  href: "#who"        },
  { label: "Testimonials",  href: "#testimonials"},
  { label: "FAQ",           href: "#faq"        },
  { label: "Book a Call",   href: "#book"       },
];

const legalLinks: { id: LegalModalType; label: string }[] = [
  { id: "privacy",    label: "Privacy Policy" },
  { id: "terms",      label: "Terms of Service" },
  { id: "disclaimer", label: "Disclaimer" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-4.83-4.83h-2.83v13.54a2.9 2.9 0 1 1-2.06-2.77V9.73a5.73 5.73 0 1 0 5.73 5.73V8.58a7.65 7.65 0 0 0 3.99 1.12V6.87a4.85 4.85 0 0 1-1-.18z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://x.com",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

// ─── Component ───────────────────────────────────────────────────────
export default function Footer() {
  // FIX 1: Added <LegalModalType> here
  const [activeModal, setActiveModal] = useState<LegalModalType>(null);

  return (
    <>
      <footer className="relative w-full bg-[#050000] overflow-hidden border-t border-red-900/20">

        {/* Ambient glows */}
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[400px] bg-red-900/[0.08] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-[-8%] w-[400px] h-[400px] bg-red-900/[0.06] rounded-full blur-[130px] pointer-events-none" />

        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* ── CTA Band ── */}
          <div className="py-16 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-red-900/15">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400 mb-2">
                Ready to scale?
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
                Stop waiting.{" "}
                <span className="italic font-normal font-dancing text-red-400">
                  Start building.
                </span>
              </h3>
            </div>

            <a href="#book" className="btn-red-cta px-8 py-4 rounded-xl text-sm flex-shrink-0">
              Book Your Free Call
              <ArrowRight size={16} />
            </a>
          </div>

          {/* ── Main Footer Grid ── */}
          <div className="py-14 grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Col 1 — Logo + tagline */}
            <div className="flex flex-col gap-5">
              <Image
                src="/images/logo/main-logo.png"
                alt="OFM Mastery"
                width={160}
                height={48}
                className="object-contain"
              />

              <p className="text-[0.8rem] leading-[1.75] text-white/45 max-w-[18rem]">
                The operating system behind the world's fastest-growing OFM agencies.
                Built by operators, for operators.
              </p>

              {/* Socials */}
              <div className="flex items-center gap-2 mt-1">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center
                      bg-red-900/[0.08] border border-red-900/20 text-white/40
                      hover:bg-red-900/20 hover:border-red-700/40 hover:text-white/80
                      transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Nav links */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-400 mb-5">
                Navigate
              </p>
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.8rem] text-white/45 hover:text-white/80
                        transition-colors duration-200 font-semibold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Stats / trust */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-400 mb-5">
                By the Numbers
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { value: "7,500+", label: "Students Enrolled"   },
                  { value: "7",      label: "Millionaires Created" },
                  { value: "$12M+",  label: "Client Revenue"      },
                  { value: "4.9/5",  label: "Average Rating"      },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <span className="text-base font-black text-red-400 w-16 flex-shrink-0">
                      {stat.value}
                    </span>
                    <span className="text-[0.75rem] text-white/40 font-semibold">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="py-6 border-t border-red-900/15 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[0.7rem] text-white/25 font-semibold">
              © {new Date().getFullYear()} SMP Business. All rights reserved.
            </p>

            <div className="flex items-center gap-5">
              {legalLinks.map((link) => (
                <button
                  key={link.id}
                  type="button" // FIX 3: Added type="button" here
                  onClick={() => setActiveModal(link.id)}
                  className="text-[0.7rem] text-white/25 hover:text-white/50
                    transition-colors duration-200 font-semibold cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </footer>

      {/* FIX 2: We replaced all that raw AnimatePresence code with the component! */}
      <LegalModal 
        activeModal={activeModal} 
        onClose={() => setActiveModal(null)} 
      />
    </>
  );
}