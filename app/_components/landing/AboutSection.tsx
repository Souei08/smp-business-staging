"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────
const stats = [
  { value: "8+",   label: "Years in\nthe Industry" },
  { value: "$12M+", label: "Client\nRevenue"       },
  { value: "50+",  label: "Creators\nScaled"       },
];

const tags = [
  "OnlyFans Management",
  "Creator Strategy",
  "Sales Psychology",
  "E-Commerce Exit 2023",
  "Content Direction",
  "Team Building",
  "Dubai Based",
];

// ─── Animation variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.1 },
  }),
};

// ─── Component ───────────────────────────────────────────────────────
export default function AboutSection() {
  return (
    <section 
    id="about"
    className="relative w-full bg-[#050000] py-24 overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-red-900/[0.12] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-8%] w-[400px] h-[400px] bg-red-900/[0.07] rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase
            tracking-[0.18em] mb-6 bg-red-900/[0.08] border border-red-900/25 text-red-400">
            <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
            About Arthur
          </div>

          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-black text-white tracking-tight leading-[1.1]">
            The Strategist Behind Today&apos;s{" "}
            <br className="hidden md:block" />
            <span className="italic font-normal font-dancing text-red-400">Fastest-Growing</span>{" "}
            Personal Brands.
          </h2>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Left — Photo + Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
          >
            {/* Photo */}
            <div className="relative h-[520px] rounded-[1.25rem] overflow-hidden
              border border-red-900/20
              shadow-[0_24px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(209,0,0,0.1)]">

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d10000] to-transparent z-10" />

              <Image
                src="/images/arthur3.jpg"
                alt="Arthur Turner — CEO of SMP Agency"
                fill
                className="object-cover object-top brightness-90 saturate-95"
                priority
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-5
                bg-gradient-to-t from-[#050000]/90 to-transparent">
                <p className="text-sm font-black text-white">Arthur Turner</p>
                <p className="text-[0.7rem] font-bold text-red-400 uppercase tracking-[0.12em] mt-0.5">
                  CEO — SMP Agency
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl px-3 py-3.5 text-center bg-[#0a0202]
                    border border-red-900/20 hover:border-red-700/45 transition-colors duration-300"
                >
                  <p className="text-[1.3rem] font-black text-red-400 leading-none">{s.value}</p>
                  <p className="text-[0.6rem] font-semibold text-white/55 uppercase tracking-[0.1em] mt-1 whitespace-pre-line">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Bio */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={1}
            className="flex flex-col justify-center"
          >
            <p className="text-[0.9rem] leading-[1.85] text-white/85">
              I&apos;ve been in the social media game since 2016 — not watching from the sidelines,
              but building brands that actually make money.
            </p>

            <p className="text-[0.9rem] leading-[1.85] text-white/85 mt-4">
              Arthur Turner is a British entrepreneur, creator manager, and creative strategist
              based in Dubai. He specialises in scaling OnlyFans creators through disciplined
              execution, high-performance content strategy, and psychologically-driven sales
              systems — helping talent turn attention into consistent, long-term income.
            </p>

            <p className="text-[0.9rem] leading-[1.85] text-white/85 mt-4">
              Before entering the creator economy, Arthur built and scaled an e-commerce business
              before exiting in 2023. His background in sales, marketing, consumer psychology,
              and paid advertising gave him an edge that most creator managers simply don&apos;t have.
            </p>

            <p className="text-[0.9rem] leading-[1.85] text-white/85 mt-4">
              Having worked alongside major names in UK entertainment and culture —
              including{" "}
              <span className="font-black text-white italic">Maya Jama</span>,{" "}
              <span className="font-black text-white italic">Stormzy</span>, and{" "}
              <span className="font-black text-white italic">Aitch</span> — Arthur understands
              what it takes to build a real brand, not just a page.
            </p>

            <p className="text-[0.9rem] leading-[1.85] text-white/85 mt-4">
              Today he leads SMP with one mission: world-class OnlyFans management that
              scales creators into market-leading names through elite strategy and
              relentless execution.
            </p>

            {/* Credential tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                    text-[0.7rem] font-bold text-white/80
                    bg-red-900/[0.08] border border-red-900/20"
                >
                  <span className="w-1 h-1 rounded-full bg-[#d10000] flex-shrink-0" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Signature */}
            <div className="mt-8">
              <div className="w-12 h-px bg-red-900/40 mb-3" />
              <p className="font-dancing text-[2rem] text-white/70 leading-none">Arthur Turner</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}