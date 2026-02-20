"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What exactly do I get inside the program?",
    a: "You get lifetime access to the full OFM Mastery curriculum — 6 core modules covering everything from client acquisition and content strategy to chatting systems, hiring, and financial control. You also get access to our private community, live Q&A calls with Markus, and all future updates at no extra cost.",
  },
  {
    q: "How long will it take to see results?",
    a: "Most students who implement the system consistently start seeing tangible results within 30–90 days. Some have hit $10K/month in their first month. Results depend on your execution speed, but the framework is built to compress your learning curve as much as possible.",
  },
  {
    q: "Is this for beginners or experienced agency owners?",
    a: "Both. If you're brand new, the programme walks you through every step from zero. If you're already running an agency but stuck below $30K/month, the advanced modules on systems, retention, and scaling will be the unlock you've been missing.",
  },
  {
    q: "How is this different from other OFM or agency courses?",
    a: "Most courses teach theory. OFM Mastery is an operating playbook — built from real agencies that crossed $100K months. You get exact scripts, SOPs, dashboards, and case studies, not vague advice. Markus actively runs agencies himself, so everything you learn is current and battle-tested.",
  },
  {
    q: "Who is this program for?",
    a: "Anyone 18+ who wants to build a serious OFM agency — whether you're in a 9-5, currently in education, already running a business, or completely new to the online world. If you're ambitious and willing to execute, this programme was built for you.",
  },
  {
    q: "How long do I have access to the program?",
    a: "Lifetime access. Once you're in, you're in — including all future module updates, bonus content, and community access. There are no recurring fees or renewal costs.",
  },
  {
    q: "What if I don't have an OFM agency yet?",
    a: "That's exactly where many of our best students started — at zero. The programme is sequenced to take you from concept to your first client and beyond. You don't need prior experience, a team, or a big budget to get started.",
  },
];

// ─── Animation variants ──────────────────────────────────────────────
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.06 },
  }),
};

// ─── Card decoration ─────────────────────────────────────────────────
const CardTopLine = () => (
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
);

// ─── Component ───────────────────────────────────────────────────────
export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (i: number) => setOpenId((prev) => (prev === i ? null : i));

  return (

    <section 
    id="faq"
    className="relative w-full bg-[#050000] py-24 overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-red-900/[0.12] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-8%] w-[450px] h-[450px] bg-red-900/[0.08] rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase
            tracking-[0.18em] mb-6 bg-red-900/[0.08] border border-red-900/25 text-red-400">
            <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
            FAQ
          </div>

          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-black text-white tracking-tight leading-[1.08]">
            Frequently{" "}
            <span className="italic font-normal font-dancing text-red-400">Asked</span>{" "}
            Questions
          </h2>
        </div>

        {/* ── Accordion ── */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openId === i;
            return (
              <motion.div
                key={i}
                className={`relative rounded-2xl bg-[#0a0202] border overflow-hidden
                  transition-colors duration-300 card-hover
                  ${isOpen ? "border-red-700/45" : "border-red-900/25"}`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
              >
                <CardTopLine />

                {/* Trigger */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-transparent border-none cursor-pointer"
                >
                  <span className="text-sm md:text-base font-bold text-white leading-snug">
                    {faq.q}
                  </span>

                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    border border-red-900/35 transition-all duration-300
                    ${isOpen
                      ? "bg-red-900/20 text-red-400 rotate-45"
                      : "bg-red-900/[0.08] text-white/60"
                    }`}>
                    <Plus size={15} strokeWidth={2.5} />
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="px-6 pb-6 border-t border-red-900/15 pt-4"
                    >
                      <p className="text-sm leading-[1.8] text-white/70">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}