"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, UserCheck, Globe, GraduationCap, Video, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ApplyModal from "../common/ApplyModal";
import ApplyNowForm from "../common/ApplyNowForm";
import type { ApplyNowFormData } from "../common/ApplyNowForm";

// ─── Data ────────────────────────────────────────────────────────────
const audiences = [
  {
    icon: <Rocket size={22} />,
    title: "Existing OFM Agency Owners",
    desc: "Already running an agency but haven't cracked $30K/month yet? This is the one investment that changes that. You'll get the tactics to retain clients, keep content on schedule, collect invoices on time, and finally dial in the metrics that move your revenue needle on Infloww.",
  },
  {
    icon: <UserCheck size={22} />,
    title: "Currently Employed",
    desc: "Working a 9-5 and feel like time is your biggest bottleneck? That's exactly the point. This programme is built to be beginner-friendly — even if you've never run a single online business, the OFM Masterclass removes the guesswork and shows you the exact path forward.",
  },
  {
    icon: <Globe size={22} />,
    title: "Other Online Business Owners",
    desc: "Already in e-commerce, brand scaling, growth ops, or a marketing agency? This programme won't just introduce you to OFM — it'll show you exactly how to plug your existing skill set into a model that compounds faster than whatever you're running now.",
  },
  {
    icon: <GraduationCap size={22} />,
    title: "Currently in Education",
    desc: "University or college — as long as you're 18+, this model fits your life. You're already juggling deadlines and a social life. OFM Masterclass strips out the figuring-out phase so you can follow a clearly laid out roadmap and start your entrepreneurial journey now.",
  },
  {
    icon: <Video size={22} />,
    title: "Completely New to Business",
    desc: "Everyone starts at zero. If you haven't already seen our YouTube breakdown comparing the top online business models, watch it — then come back. OFM is the clearest path for anyone 18+ who wants the highest chance of success with the lowest startup risk.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Success-Driven Adults",
    desc: "Between 35–55 and looking for a real extra income stream — or even a full career pivot? We've had students enrol from 18 to 57, across every walk of life. If you want something that can be systemised, automated, and give you back your time, OFM Masterclass is it.",
  },
];

// ─── Animation variants ──────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.07 },
  }),
};

// ─── Reusable card decorations ───────────────────────────────────────
const CardTopLine = () => (
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/45 to-transparent" />
);

const CardHoverGlow = () => (
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl
    bg-[radial-gradient(ellipse_at_50%_0%,rgba(209,0,0,0.06)_0%,transparent_65%)]" />
);

// ─── Component ───────────────────────────────────────────────────────
export default function WhoThisIsForSection() {
  const [modalOpen,  setModalOpen]  = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data: ApplyNowFormData) => {
    setSubmitting(true);
    console.log("Application submitted:", data);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setModalOpen(false);
  };
  return (
    <section className="relative w-full bg-[#050000] py-24 overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-red-900/[0.12] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-8%] w-[450px] h-[450px] bg-red-900/[0.08] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-16">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase
            tracking-[0.18em] mb-6 bg-red-900/[0.08] border border-red-900/25 text-red-400">
            <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
            Who This Is For
          </div>

          {/* Heading */}
          <h2 className="text-[clamp(2.2rem,5.5vw,3.5rem)] font-black text-white tracking-tight leading-[1.05] mb-4">
            Built for the Ambitious.
            <span className="block italic font-normal font-dancing text-red-400 text-[1.1em] leading-snug">
              Those who know they deserve more.
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-base leading-[1.7] text-white/75 max-w-[38rem] mx-auto mb-10">
            Whether you&apos;re launching your first OFM agency or scaling past $30K months,
            this programme is built to sharpen your systems, multiply your revenue, and give
            you total clarity at every level.
          </p>

          {/* CTA — .btn-red-cta from global.css */}
          <button type="button" onClick={() => setModalOpen(true)} className="btn-red-cta px-10 py-4 rounded-xl text-base mb-6">
            Yes — I&apos;m Ready to Scale My OFM
            <ArrowRight size={18} />
          </button>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#050000] -ml-2 first:ml-0 overflow-hidden">
                  <Image
                    src="/images/allaya5.jpg"
                    alt={`Student ${i}`}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full -ml-2 border-2 border-[#050000]
                flex items-center justify-center text-[10px] font-black text-white
                bg-gradient-to-br from-[#d10000] to-[#7a0000]">
                7.5K+
              </div>
            </div>

            <span className="text-yellow-400 text-sm tracking-wide">★★★★★</span>

            <p className="text-[0.8rem] text-white/75">
              <span className="font-dancing italic font-bold text-white text-[0.95rem]">7 Millionaires</span>{" "}
              Made By Our Management
            </p>
          </div>
        </div>

        {/* ── Audience Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {audiences.map((item, i) => (
            <motion.div
              key={i}
              className="group relative rounded-2xl bg-[#0a0202] border border-red-900/25 overflow-hidden
                transition-all duration-300 card-hover"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
            >
              <CardTopLine />
              <CardHoverGlow />

              {/* Header band — .card-header-band from global.css */}
              <div className="card-header-band">
                <div className="relative z-10 w-12 h-12 rounded-[0.625rem] flex items-center justify-center flex-shrink-0
                  bg-red-900/[0.12] border border-red-900/25 text-red-400">
                  {item.icon}
                </div>
                <h3 className="relative z-10 text-base font-black text-white leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Body */}
              <div className="px-6 py-5 pb-6">
                <p className="text-[0.8rem] leading-[1.75] text-white/[0.75]">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
       <ApplyModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ApplyNowForm
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          loading={submitting}
        />
      </ApplyModal>
    </section>
    
  );
}