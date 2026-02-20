"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────
const CALENDLY_URL = "https://calendly.com/arthurturner042/30min";

// ─── Component ───────────────────────────────────────────────────────
export default function BookACallSection() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const existing = document.getElementById("calendly-script");
    if (existing) return;
    const script = document.createElement("script");
    script.id = "calendly-script";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <section 
    id="book"
    className="relative w-full bg-[#050000] py-24 overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-[10%] left-[-12%] w-[600px] h-[600px] bg-red-900/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-10%] w-[500px] h-[500px] bg-red-900/[0.08] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="book-card relative grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden
            border border-red-900/25 bg-[#0a0202]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Card top line */}
          <div className="absolute top-0 left-0 right-0 h-px z-10
            bg-gradient-to-r from-transparent via-red-700/60 to-transparent" />

          {/* ── Left Panel ── */}
          <div className="relative flex flex-col justify-between p-14">

            {/* Diagonal grid overlay */}
            <div className="absolute inset-0 pointer-events-none
              bg-[linear-gradient(45deg,rgba(209,0,0,0.03)_1px,transparent_1px),linear-gradient(-45deg,rgba(209,0,0,0.03)_1px,transparent_1px)]
              [background-size:28px_28px]" />

            <div className="relative z-10">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full w-fit
                text-[10px] font-black uppercase tracking-[0.18em] mb-8
                bg-red-900/10 border border-red-900/30 text-red-400">
                <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
                Book In Your Exclusive Call
              </div>

              {/* Heading */}
              <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-black text-white tracking-tight leading-[1.05] mb-0.5">
                Systems Don&apos;t
                <br />Build Themselves.
                <span className="block italic font-normal font-dancing text-red-400 text-[1.15em] leading-snug">
                  Leaders Do.
                </span>
              </h2>

              {/* Subtext */}
              <p className="text-[0.95rem] leading-[1.7] text-white/85 mt-5 max-w-[28rem]">
                A year from now, you&apos;ll either be glad you started — or wishing you did.
                Book your 30-minute strategy call with Arthur and find out exactly
                how SMP can scale your agency to the next level.
              </p>

              {/* Urgency */}
              <p className="flex items-center gap-2 text-[0.75rem] font-bold text-red-400 mt-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 animate-[urgency-pulse_1.8s_ease-in-out_infinite]" />
                Spots are limited. Enrollment opens for 48 hours each month. Don&apos;t miss your window.
              </p>

              {/* CTA — uses .btn-red-cta from globals.css */}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red-cta mt-8 px-8 py-4 rounded-[0.875rem] text-[0.9rem] tracking-wide"
              >
                <Calendar size={18} />
                Schedule Your Call
                <ArrowRight size={16} />
              </a>

              {/* 30 min note */}
              <div className="flex items-center gap-2 mt-4">
                <Clock size={13} className="text-white/40 flex-shrink-0" />
                <span className="text-[0.72rem] font-semibold text-white/45">
                  30 min · Free · No obligation
                </span>
              </div>
            </div>
          </div>

          {/* ── Right Panel — Calendly ── */}
          <div className="relative flex flex-col border-l border-red-900/15 min-h-[560px]">

            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] z-10
              bg-gradient-to-r from-red-700/50 via-red-900/20 to-transparent" />

            {/* Loading state */}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0a0202]">
                <div className="w-8 h-8 rounded-full border-2 border-red-900/15 border-t-[#d10000] animate-spin" />
                <p className="text-[0.75rem] font-semibold text-white/40">Loading calendar…</p>
              </div>
            )}

            {/* Calendly iframe */}
            <iframe
              src={`${CALENDLY_URL}?embed_type=Inline&hide_gdpr_banner=1&hide_event_type_details=0&background_color=0a0202&text_color=ffffff&primary_color=d10000`}
              className="w-full flex-1 min-h-[560px] border-none bg-transparent transition-opacity duration-400"
              style={{ opacity: iframeLoaded ? 1 : 0 }}
              title="Schedule a call with Arthur Turner"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>

        </motion.div>
      </div>
    </section>
  );
}