"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────
const modules = [
  {
    id: 1,
    title: "OFM Introduction",
    tag: "Foundations",
    thumbColor: "linear-gradient(135deg, #1a3a8f, #2d5be3)",
    thumbLabel: "Foundations",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80",
    preview: "This is where everything starts. You will first understand how the business model works as a professional, how and why you'll be able to not only close clients as a beginner but also deliver outstanding results.",
    fullDesc: "This is where everything starts. You will first understand how the business model works as a professional, how and why you'll be able to not only close clients as a beginner but also deliver outstanding results. And also see a real life case study of one of Markuss' very own clients making over $143k in one month.",
    lessons: [
      "What is OFM & Why It Works in 2025",
      "The Professional Agency Model Explained",
      "Real Case Study: $143K in One Month",
      "How to Deliver Results From Day One",
      "Setting Up Your Mindset for Scale",
    ],
  },
  {
    id: 2,
    title: "Tool Kit",
    tag: "Softwares",
    thumbColor: "linear-gradient(135deg, #1a5c3a, #22c55e)",
    thumbLabel: "Tool Kit",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&q=80",
    preview: "Just before we get right into the practical steps of getting your next client and beginning to scale, we will showcase the exact software stack and tools that the top OFM agencies run on.",
    fullDesc: "Just before we get right into the practical steps of getting your next client and beginning to scale, we will showcase the exact software stack and tools that the top OFM agencies run on. From CRM setups to scheduling tools, content pipelines to analytics dashboards — you'll have the full tech stack ready before you sign your first client.",
    lessons: [
      "The Complete OFM Software Stack",
      "Infloww Setup & Configuration",
      "Content Scheduling & Pipeline Tools",
      "Analytics & Performance Dashboards",
      "Automating Your Back-End Operations",
    ],
  },
  {
    id: 3,
    title: "Client Acquisition",
    tag: "Unlimited Clients",
    thumbColor: "linear-gradient(135deg, #8b1a1a, #d10000)",
    thumbLabel: "Get Clients",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=300&q=80",
    preview: "We have simply cracked the code on how to get unlimited clients for your agency. Agency owners inside OFM Mastery find this part the easiest once they understand the appointment setting & sales strategy.",
    fullDesc: "We have simply cracked the code on how to get unlimited clients for your agency. Most people that try to do it all by themselves struggle with this very first hurdle, agency owners inside the OFM Mastery course find this part the easiest. Once you clearly understand the strategy behind appointment setting & sales — you'll have more clients ready to start working with you than you even know what to do with.",
    lessons: [
      "The Outreach System That Never Runs Dry",
      "Appointment Setting Scripts & Frameworks",
      "Sales Calls: Objection Handling Playbook",
      "Onboarding Clients at Scale",
      "Retaining Clients Long-Term",
    ],
  },
  {
    id: 4,
    title: "Marketing",
    tag: "How To Go Viral",
    thumbColor: "linear-gradient(135deg, #0e6b8a, #06b6d4)",
    thumbLabel: "Go Viral",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&q=80",
    preview: "This is one half of your business. After 5 years of testing, billions of online impressions, and working with the biggest influencers and celebrities, we can confidently say you'll learn everything you need here to go viral.",
    fullDesc: "This is one half of your business. After 5 years of testing and learning, after billions of online impressions and views generated and working with the biggest online influencers and celebrities we can confidently say that you will learn everything you need here to go viral. Viral content is not luck — it's a system, and we hand you that system.",
    lessons: [
      "The Viral Content Formula Decoded",
      "Platform-Specific Growth Strategies",
      "Working With Influencers & Celebrities",
      "Content Calendars That Convert",
      "Turning Views Into Revenue",
    ],
  },
  {
    id: 5,
    title: "Chatting",
    tag: "Generating Income",
    thumbColor: "linear-gradient(135deg, #7c3d0a, #f97316)",
    thumbLabel: "Chat Mastery",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80",
    preview: "This is your other half of the business. Understand that 80% or more of your income will be generated through chatting on your clients' OF accounts — the fundamentals, psychology, and maximising earnings.",
    fullDesc: "This is your other half of the business. Understand that 80% or more of your income will be generated through chatting on your clients OF accounts. Here you will understand the fundamentals of chatting how and why the subs spend money, but also the high level psychological triggers your team will need to know on how to maximise earnings & get the subs to come back the next day to buy more content.",
    lessons: [
      "The Psychology Behind Subscriber Spending",
      "High-Converting Chat Scripts & Templates",
      "Building a Chatting Team That Performs",
      "Maximising PPV & Revenue Per Sub",
      "Retention Strategies That Keep Subs Loyal",
    ],
  },
  {
    id: 6,
    title: "Hiring",
    tag: "Systems & Automation",
    thumbColor: "linear-gradient(135deg, #1a5c1a, #16a34a)",
    thumbLabel: "Scale Systems",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&q=80",
    preview: "Here you will learn how to actually automate your business as much as possible — hiring the right people so the business runs even whilst you're not there. This is where you become a true business owner.",
    fullDesc: "Here you will be learning about just how to actually automate your business as much as possible. Hiring the right people in the right places so the business runs even whilst you're not there. This is truly where you become a real business owner and no longer working in the business but rather on the business. Once set up correctly you will finally not only have location and financial freedom but also time freedom allowing you to go out there and do whatever it is that you want whenever.",
    lessons: [
      "Building Your Agency Org Chart",
      "Where & How to Hire A-Players",
      "SOPs: Making Your Business Self-Running",
      "KPIs & Performance Management",
      "From Operator to Owner: The Mindset Shift",
    ],
  },
];

// ─── Reusable card decoration ────────────────────────────────────────
const CardTopLine = () => (
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
);

// ─── Play icon ───────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────
export default function CourseCurriculumSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="relative w-full bg-[#050000] py-24 overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-red-900/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-8%] w-[450px] h-[450px] bg-red-900/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-14">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase
            tracking-[0.18em] mb-6 bg-red-900/8 border border-red-900/25 text-red-400">
            <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
            Course Curriculum
          </div>

          {/* Heading */}
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-black text-white tracking-tight leading-[1.1] max-w-[52rem] mb-5">
            Explore{" "}
            <span className="italic font-normal font-dancing text-red-400">Each Module</span>
            {" "}— Watch the Intro,{" "}
            <br className="hidden md:block" />
            Learn the System, Master the Framework.
          </h2>

          {/* Subtext */}
          <p className="text-[0.95rem] leading-[1.75] text-white/75 max-w-[40rem] mx-auto">
            Each module below unlocks a new layer of clarity. Tap to reveal Markuss&apos;
            breakdown and explore the exact lessons that will build your 6-Figure OFM foundation.
          </p>
        </div>

        {/* ── Accordion List ── */}
        <div className="flex flex-col gap-4">
          {modules.map((mod) => {
            const isOpen = openId === mod.id;
            return (
              <div
                key={mod.id}
                className={`relative rounded-2xl bg-[#0a0202] border overflow-hidden transition-colors duration-300
                  ${isOpen ? "border-red-700/45" : "border-red-900/25 hover:border-red-700/45"}`}
              >
                <CardTopLine />

                {/* Trigger row */}
                <button
                  type="button"
                  className="w-full flex items-center gap-5 px-6 py-5 bg-transparent border-none cursor-pointer text-left"
                  onClick={() => toggle(mod.id)}
                  aria-expanded={isOpen}
                >
                  {/* Thumbnail */}
                  <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <img
                      src={mod.image}
                      alt={mod.title}
                      className="w-full h-full object-cover brightness-80 saturate-85"
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 px-2 py-1.5 flex items-center justify-center gap-1
                        text-[10px] font-black text-white tracking-wide"
                      style={{ background: mod.thumbColor }}
                    >
                      <PlayIcon />
                      {mod.thumbLabel}
                    </div>
                  </div>

                  {/* Text block */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[1.4rem] font-black text-white leading-snug mb-1">
                      {mod.title}
                    </h3>
                    <p className="text-[0.8rem] font-bold text-red-400 mb-2">
                      {mod.tag}
                    </p>
                    <p className="text-[0.8rem] leading-[1.65] text-white/75 line-clamp-2">
                      {mod.preview}
                    </p>
                  </div>

                  {/* Toggle icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    border border-red-900/35 transition-all duration-300
                    ${isOpen
                      ? "bg-red-900/20 text-red-400 rotate-45"
                      : "bg-red-900/[0.08] text-white/70"
                    }`}>
                    <Plus size={16} strokeWidth={2.5} />
                  </div>
                </button>

                {/* Expandable body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="px-6 pb-6 pt-5 border-t border-red-900/15"
                    >
                      <p className="text-sm leading-[1.8] text-white/85 mb-4">
                        {mod.fullDesc}
                      </p>

                      <div className="flex flex-col gap-2">
                        {mod.lessons.map((lesson, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg
                              bg-white/[0.02] border border-red-900/10"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d10000] flex-shrink-0" />
                            <span className="text-[0.78rem] font-semibold text-white/80">
                              {lesson}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}