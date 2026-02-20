"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Muharem",
    role: "Agency Owner",
    review: "I signed my first client within 2 days. Their education and UI is the best I've seen.",
    rating: 5,
    metric: "First client in 48hrs",
  },
  {
    name: "Blair Obanda",
    role: "Creator Manager",
    review: "The course is great value for money. The team are always updating the material with the latest trends.",
    rating: 4.8,
    metric: "Consistently updated",
  },
  {
    name: "Enzo",
    role: "Agency Founder",
    review: "SMP took me from my regular 9-5 to scaling a 5–6 figure a month agency. Everyone in the community is so helpful.",
    rating: 5,
    metric: "$10–50K/mo",
  },
  {
    name: "Rayne Obrien",
    role: "OFM Beginner",
    review: "Started OFM 2 weeks ago, already signed my first two clients. Definitely recommend for beginners.",
    rating: 5,
    metric: "2 clients in 2 weeks",
  },
  {
    name: "Isaiah",
    role: "Full-Time Operator",
    review: "I've tried SMA, drop-shipping, crypto... nothing compares. With SMP I actually got results.",
    rating: 5,
    metric: "Finally got results",
  },
  {
    name: "Malone",
    role: "Agency Owner",
    review: "This course changed everything for me. I went from 0 to 10–15k/month within 4–5 months.",
    rating: 5,
    metric: "$10–15K/mo in 5 months",
  },
];

const summaryStats = [
  { value: "7,500+", label: "Students" },
  { value: "4.9/5",  label: "Avg Rating" },
  { value: "7",      label: "Millionaires" },
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

const staggerContainer: Variants = {
  hidden:   { opacity: 0 },
  visible:  { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

// ─── Component ───────────────────────────────────────────────────────
export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#050000] py-24 overflow-hidden"
    >

      {/* ── Ambient Glows — matches HeroSection & AboutSection ── */}
      <div className="absolute top-[5%] left-[-10%]  w-[600px] h-[600px] bg-red-900/[0.12] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0   right-[-8%] w-[450px] h-[450px] bg-red-900/[0.07] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2   left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-900/[0.06] rounded-full blur-[120px] pointer-events-none" />

      {/* Grid texture */}
      <div className="hero-grid-pattern absolute inset-0 pointer-events-none opacity-[0.04]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">

          {/* Eyebrow — matches HeroSection & AboutSection exactly */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase
              tracking-[0.18em] mb-6 bg-red-900/[0.08] border border-red-900/25 text-red-400"
          >
            <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
            Real Results. Real People.
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-[clamp(2rem,4.5vw,3rem)] font-black text-white tracking-tight leading-[1.1]"
          >
            Built from Experience.{" "}
            <br className="hidden md:block" />
            <span className="italic font-normal font-dancing text-red-400">Backed by</span>{" "}
            Results.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-[0.95rem] leading-relaxed text-white/55 max-w-xl"
          >
            The system trusted by creators, chatters, and agency owners rewriting the OFM industry.
          </motion.p>

          {/* Summary stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22 }}
            className="flex items-center gap-px mt-10 rounded-2xl overflow-hidden border border-red-900/20"
          >
            {summaryStats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center px-8 py-4 bg-[#0a0202]
                  border-r border-red-900/15 last:border-r-0"
              >
                <span className="text-xl font-black text-red-400 leading-none">{s.value}</span>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/35 mt-1">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Testimonials Grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="card-hover group relative flex flex-col rounded-[1.25rem] overflow-hidden
                bg-[#0a0202] border border-red-900/20 transition-all duration-300"
            >
              {/* Top accent line — matches photo card in AboutSection */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d10000]/60 to-transparent" />

              <div className="flex flex-col flex-1 p-6 gap-5">

                {/* Header row */}
                <div className="flex items-center justify-between">
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, si) => (
                      <Star
                        key={si}
                        size={13}
                        className={
                          si < Math.floor(item.rating)
                            ? "fill-[#d10000] text-[#d10000]"
                            : "fill-red-900/20 text-red-900/20"
                        }
                      />
                    ))}
                  </div>

                  {/* Verified badge */}
                  <span className="text-[9px] font-black uppercase tracking-[0.12em] text-red-400/70">
                    ✦ Verified Member
                  </span>
                </div>

                {/* Review text */}
                <p className="flex-1 text-[0.88rem] leading-[1.8] text-white/70 font-medium">
                  &ldquo;{item.review}&rdquo;
                </p>

                {/* Metric chip */}
                <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full
                  bg-red-900/[0.12] border border-red-900/25">
                  <TrendingUp size={11} className="text-red-400 flex-shrink-0" />
                  <span className="text-[0.7rem] font-black text-red-400 uppercase tracking-[0.1em]">
                    {item.metric}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-red-900/15" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  {/* Monogram avatar */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
                      font-black text-sm text-white"
                    style={{ background: "linear-gradient(135deg, #d10000, #a80000)" }}
                  >
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="nav-wordmark text-sm font-black text-white leading-none">{item.name}</p>
                    <p className="text-[0.7rem] font-bold text-red-400 uppercase tracking-[0.1em] mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}