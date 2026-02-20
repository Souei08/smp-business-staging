"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import ApplyModal from "../common/ApplyModal";
import ApplyNowForm from "../common/ApplyNowForm";
import type { ApplyNowFormData } from "../common/ApplyNowForm";

// ─── Animation variants ──────────────────────────────────────────────
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};



// ─── Component ───────────────────────────────────────────────────────
export default function HeroSection() {
  const [particles] = useState(() =>
  Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left:              `${Math.random() * 100}%`,
    width:             `${Math.random() * 3 + 1}px`,
    height:            `${Math.random() * 3 + 1}px`,
    animationDuration: `${Math.random() * 10 + 10}s`,
    animationDelay:    `-${Math.random() * 20}s`,
    opacity:            Math.random() * 0.5 + 0.2,
  }))
);
  const [viewerCount, setViewerCount] = useState(114);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(100, Math.min(130, prev + delta));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ── Form submission — swap console.log for useApplyFormSubmit later ──
  const handleSubmit = async (data: ApplyNowFormData) => {
    setSubmitting(true);
    // TODO: replace with API call once SMTP is configured
    console.log("Application submitted:", data);
    await new Promise((r) => setTimeout(r, 1000)); // simulate network
    setSubmitting(false);
    setModalOpen(false);
  };

  return (
    <>
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-[#050000] text-center">

        {/* ── Background Decorations ── */}
        <div className="hero-glow-red absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none opacity-80" />
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-red-900/[0.12] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-8%] w-[450px] h-[450px] bg-red-900/[0.08] rounded-full blur-[130px] pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="hero-spotlight absolute top-[-20%] left-[20%] w-[600px] h-[1000px] rotate-[-25deg] opacity-60" />
          <div className="hero-spotlight absolute top-[-20%] right-[20%] w-[600px] h-[1000px] rotate-[25deg] opacity-60" />
        </div>

        <div className="absolute inset-0 pointer-events-none z-0">
  {particles.map((p) => (
    <div
      key={p.id}
      className="hero-particle"
      style={{
        left:              p.left,
        width:             p.width,
        height:            p.height,
        animationDuration: p.animationDuration,
        animationDelay:    p.animationDelay,
        opacity:           p.opacity,
      }}
    />
  ))}
</div>

        <div className="hero-grid-pattern absolute inset-0 pointer-events-none opacity-[0.04]" />
        <div className="hero-noise-texture absolute inset-0 pointer-events-none opacity-[0.03]" />
        <div className="hero-vignette absolute inset-0 pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10
          bg-gradient-to-t from-[#050000] via-[#050000]/80 to-transparent" />

        {/* ── Content ── */}
        <div className="max-w-5xl mx-auto px-6 w-full relative z-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center space-y-8"
          >

            {/* 1. Live viewers pill */}
            <motion.div variants={fadeInUp} className="relative group">
              <div className="pill-glow-ring absolute -inset-[3px] rounded-full opacity-60 group-hover:opacity-90 transition duration-700" />
              <div className="pill-container relative flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-medium">
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#00d100]" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00af17]" />
                </span>
                <motion.span
                  key={viewerCount}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-bold text-white tabular-nums"
                >
                  {viewerCount}
                </motion.span>
                <span>people currently viewing this page</span>
              </div>
            </motion.div>

            {/* 2. Eyebrow pill */}
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase
                tracking-[0.18em] bg-red-900/[0.08] border border-red-900/25 text-red-400">
                <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
                OFM Mastery System
              </div>
            </motion.div>

            {/* 3. Main headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight max-w-4xl text-white drop-shadow-2xl"
            >
              The System That&apos;s Quietly
              <br />
              Rebuilding The{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-white drop-shadow-[0_0_15px_rgba(209,0,0,0.5)]">
                  Creator Economy
                </span>
                <svg
                  className="absolute w-full -bottom-2 left-0 z-0 opacity-90"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path d="M2 9C50 3 150 -1 298 4" stroke="#d10000" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            {/* 4. Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto text-white/75"
            >
              Learn the exact framework responsible for scaling creators to{" "}
              <span className="font-black text-white">$10K</span>,{" "}
              <span className="font-black text-white">$30K</span>, and even{" "}
              <span className="font-black text-white">$100K months</span> —
              trusted by over 4,000 students and top performers.
            </motion.p>

            {/* 5. CTA — opens apply modal */}
            <motion.div variants={fadeInUp} className="pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-red-cta px-10 py-5 rounded-xl text-lg font-black"
              >
                Yes — I&apos;m Ready To Scale My Brand
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* 6. Social proof */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row items-center justify-center gap-4 pt-2"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#050000]"
                    style={{ zIndex: i }}
                  >
                    <Image
                      src="/images/logo/main-logo.png"
                      alt={`User ${i}`}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
                <div className="relative w-10 h-10 rounded-full flex items-center justify-center
                  text-[9px] font-black text-white border-2 border-[#050000]
                  bg-gradient-to-br from-[#d10000] to-[#a80000] z-[6]">
                  7.5K+
                </div>
              </div>

              <div className="hidden md:block w-px h-8 self-center bg-red-900/30" />

              <div className="flex flex-col items-center md:items-start gap-0.5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="#f59e0b" stroke="none" className="drop-shadow-sm" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-white/75">
                  <span className="font-dancing italic font-bold text-base text-white mr-1">
                    7 Millionaires
                  </span>
                  Made By Our Management
                </p>
              </div>
            </motion.div>

            {/* 7. Trust badges */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3 pt-2 flex-wrap justify-center"
            >
              {["✦ Lifetime Access", "✦ Private Community", "✦ Live Q&A with Markus", "✦ All Future Updates"].map((badge) => (
                <span key={badge} className="text-[10px] font-bold text-white/30 uppercase tracking-[0.12em]">
                  {badge}
                </span>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ── Apply Modal — outside <section> so it can escape stacking context ── */}
      <ApplyModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ApplyNowForm
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          loading={submitting}
        />
      </ApplyModal>
    </>
  );
}