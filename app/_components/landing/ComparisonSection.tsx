"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Zap, AlertCircle } from "lucide-react";
import { ApplyNowFormData } from "../common/ApplyNowForm";
import ApplyModal from "../common/ApplyModal";
import ApplyNowForm from "../common/ApplyNowForm";
 
// ─── Data ────────────────────────────────────────────────────────────
const winnerPoints = [
  "Proven 6-figure agency roadmap",
  "Elite private community & live Q&As",
  "All future updates included",
  "Psychologically-driven sales systems",
  "Real operator support, not theory",
];

const loserPoints = [
  "Recycled, outdated tactics",
  "No structure — constant guesswork",
  "Hidden upsells at every turn",
  "Lonely journey with zero support",
  "Stuck at $2K/month with no ceiling",
];

// ─── Animation variants ──────────────────────────────────────────────
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Component ───────────────────────────────────────────────────────
export default function ComparisonSection() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handlesubmit = async (data: ApplyNowFormData) => {
    setSubmitting(true);
    console.log("Form submitted with data:", data);
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitting(false);
    setModalOpen(false);
  }
  
  return (
    <section className="relative w-full bg-[#050000] py-24 overflow-hidden">

      {/* ── Ambient Glows — matches every other section ── */}
      <div className="absolute top-[5%]  right-[-10%] w-[600px] h-[600px] bg-red-900/[0.12] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0   left-[-8%]  w-[450px] h-[450px] bg-red-900/[0.07] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-900/[0.05] rounded-full blur-[100px] pointer-events-none" />

      {/* Grid texture */}
      <div className="hero-grid-pattern absolute inset-0 pointer-events-none opacity-[0.04]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">

          {/* Eyebrow — identical to every other section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase
              tracking-[0.18em] mb-6 bg-red-900/[0.08] border border-red-900/25 text-red-400"
          >
            <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
            Two Options. One Actually Works.
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-[clamp(2rem,4.5vw,3rem)] font-black text-white tracking-tight leading-[1.1]"
          >
            The SMP Protocol{" "}
            <span className="italic font-normal font-dancing text-red-600">VS.</span>{" "}
            <span className="text-white/25">Anything Else</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-[0.95rem] leading-relaxed text-white/50 max-w-xl"
          >
            Most programs sell you hope. We give you the exact operating system behind seven-figure OFM agencies.
          </motion.p>
        </div>

        {/* ── Comparison Cards ── */}
        <div className="grid md:grid-cols-2 gap-5 relative items-stretch">

          {/* VS Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 22 }}
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20
              w-16 h-16 rounded-full items-center justify-center
              bg-[#050000] border border-red-900/30
              shadow-[0_0_0_4px_#050000,0_0_30px_rgba(209,0,0,0.2)]"
          >
            <span className="nav-wordmark font-black text-lg italic text-white/50">VS</span>
          </motion.div>

          {/* ── CARD 1: Winner ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col rounded-[1.25rem] overflow-hidden
              bg-[#0a0202] border border-red-900/30
              shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(209,0,0,0.08)]"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d10000] to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-40 bg-red-900/[0.08] blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col flex-1 p-8">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #d10000, #a80000)", boxShadow: "0 8px 24px -4px rgba(209,0,0,0.4)" }}
              >
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 self-start
                bg-red-900/[0.12] border border-red-900/25">
                <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-red-400">SMP Protocol</span>
              </div>

              <h3 className="nav-wordmark text-xl font-black text-white mb-2 leading-snug">
                Pay Once. <span className="text-red-400">Scale Forever.</span>
              </h3>
              <p className="text-[0.85rem] leading-[1.75] text-white/50 mb-8">
                Plug into the exact frameworks used to build six-figure agencies.
                Real systems. Real results. No guesswork.
              </p>

              <ul className="flex flex-col gap-3 mt-auto">
                {winnerPoints.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-[0.85rem] font-semibold text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ── CARD 2: Loser ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col rounded-[1.25rem] overflow-hidden
              bg-[#080808] border border-white/[0.05]
              opacity-60 hover:opacity-80 transition-opacity duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />

            <div className="relative z-10 flex flex-col flex-1 p-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 flex-shrink-0
                bg-white/[0.03] border border-white/[0.07]">
                <AlertCircle className="w-6 h-6 text-white/15" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 self-start
                bg-white/[0.03] border border-white/[0.07]">
                <span className="w-1 h-1 rounded-full bg-white/15 flex-shrink-0" />
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white/20">Everything Else</span>
              </div>

              <h3 className="nav-wordmark text-xl font-black text-white/25 mb-2 leading-snug">
                The Guessing Game.
              </h3>
              <p className="text-[0.85rem] leading-[1.75] text-white/20 mb-8">
                Follow recycled advice, chase trends, and hope something sticks —
                staying stuck at $2K/month with no roadmap.
              </p>

              <ul className="flex flex-col gap-3 mt-auto">
                {loserPoints.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-white/10 flex-shrink-0 mt-0.5" />
                    <span className="text-[0.85rem] font-semibold text-white/20 line-through decoration-white/10">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-5 mt-16"
        >
          <button 
          onClick={() => setModalOpen(true)}
          className="btn-red-cta px-10 py-5 rounded-xl text-base font-black">
            Yes — Get Me Inside The Protocol
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Mini social proof — monogram avatars like TestimonialsSection */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {["M", "B", "E"].map((initial, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black text-white border-2 border-[#050000]"
                  style={{ background: "linear-gradient(135deg, #d10000, #a80000)", zIndex: i }}
                >
                  {initial}
                </div>
              ))}
            </div>
            <p className="text-[0.75rem] text-white/35 font-semibold">
              Join <span className="text-white/70 font-black">7,500+ members</span> already inside
            </p>
          </div>
        </motion.div>
      </div>
      <ApplyModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ApplyNowForm
          onSubmit={handlesubmit}
          onCancel={() => setModalOpen(false)}
          loading={submitting}
        />
      </ApplyModal>
    </section>
    

    
      
  );
}