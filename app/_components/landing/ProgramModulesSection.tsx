"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Briefcase,
  Users,
  TrendingUp,
  MessageSquare,
  UserPlus,
  ArrowRight,
  Star,
} from "lucide-react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ApplyNowFormData } from "../common/ApplyNowForm";
import ApplyModal from "../common/ApplyModal";
import ApplyNowForm from "../common/ApplyNowForm";

// ─── Data ────────────────────────────────────────────────────────────
const modules = [
  {
    number: "01",
    title: "Intro / Mindset",
    description:
      "Start with a breakdown of a real-world case study: a client scaling to $143k in a single month. Whether starting from zero or scaling an existing agency, this sets the foundation.",
    icon: Brain,
  },
  {
    number: "02",
    title: "Tools & Infrastructure",
    description:
      "Avoid expensive mistakes by setting up your tech stack correctly from Day 1. We guide you through the essential tools and give you exclusive access to Infloww.",
    icon: Briefcase,
  },
  {
    number: "03",
    title: "Client Acquisition",
    description:
      "The lifeblood of your agency. Discover the exact sourcing channels top agencies use to find elite talent, plus the scripts that book calls on autopilot.",
    icon: Users,
  },
  {
    number: "04",
    title: "Marketing Mastery",
    description:
      "Traffic is currency. We deconstruct viral strategies used by the top 1% of agencies to generate millions of views. Master both organic virality and paid acquisition.",
    icon: TrendingUp,
  },
  {
    number: "05",
    title: "High-Ticket Chatting",
    description:
      "80% of your revenue happens in the DMs. Learn advanced psychological triggers and sales scripts that turn casual conversations into whale spenders.",
    icon: MessageSquare,
  },
  {
    number: "06",
    title: "Hiring & Scaling",
    description:
      "Transition from freelancer to CEO. Recruit, vet, and manage A-player staff who run daily operations for you. Build a machine that generates cash flow.",
    icon: UserPlus,
  },
];

const avatars = ["/images/logo/main-logo.png", "/images/Arthur1.jpg", "/images/Arthur.jpg"];

// ─── Component ───────────────────────────────────────────────────────
export default function ProgramModulesSection() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (data: ApplyNowFormData) => { 
    setSubmitting(true);
    console.log("Form submitted with data:", data);
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitting(false);
    setModalOpen(false);
  }
  return (
    <section className="relative w-full bg-[#050000] py-24 overflow-hidden">

      {/* ── Ambient Glows — matches every other section ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-900/[0.12] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-8%] w-[450px] h-[450px] bg-red-900/[0.07] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-red-900/[0.06] rounded-full blur-[150px] pointer-events-none" />

      {/* Grid texture */}
      <div className="hero-grid-pattern absolute inset-0 pointer-events-none opacity-[0.04]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">

          {/* Eyebrow — identical to every other section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase
              tracking-[0.18em] mb-6 bg-red-900/[0.08] border border-red-900/25 text-red-400"
          >
            <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
            Every Lesson Inside
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-[clamp(2rem,4.5vw,3rem)] font-black text-white tracking-tight leading-[1.1]"
          >
            Here&apos;s What&apos;s Covered{" "}
            <br className="hidden md:block" />
            <span className="italic font-normal font-dancing text-red-400">
              Inside The Program
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="mt-4 text-[0.95rem] leading-relaxed text-white/50 max-w-xl"
          >
            Six battle-tested modules built by operators who&apos;ve actually done it —
            from zero to seven figures in the creator economy.
          </motion.p>

          {/* CTA + Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4 mt-10"
          >
            <button 
            onClick={() => setModalOpen(true)}
            className="btn-red-cta px-8 py-4 rounded-xl text-sm font-black">
              Ok — I&apos;ve Seen Enough, I&apos;m Ready To Start
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Social proof row — matches HeroSection style */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#050000]"
                    style={{ zIndex: i }}
                  >
                    <Image
                      src="/images/logo/main-logo.png"
                      alt={`Member ${i}`}
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
                <div
                  className="relative w-8 h-8 rounded-full flex items-center justify-center
                    text-[8px] font-black text-white border-2 border-[#050000] z-[6]"
                  style={{ background: "linear-gradient(135deg, #d10000, #a80000)" }}
                >
                  7.5K+
                </div>
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} fill="#f59e0b" stroke="none" />
                  ))}
                </div>
                <span className="text-[10px] font-semibold text-white/40">
                  <span className="font-dancing italic text-sm text-white/60 mr-1">7 Millionaires</span>
                  Made By Our Management
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Carousel ── */}
        <div className="px-0 md:px-14">
          <Carousel
            opts={{ loop: true, align: "start" }}
            className="w-full relative pb-16 md:pb-0"
          >
            <CarouselContent className="-ml-4 md:-ml-5 py-4">
              {modules.map((mod, index) => {
                const Icon = mod.icon;
                return (
                  <CarouselItem
                    key={index}
                    className="pl-4 md:pl-5 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="card-hover group relative h-full min-h-[340px] rounded-[1.25rem] overflow-hidden
                        bg-[#0a0202] border border-red-900/20 transition-all duration-300 flex flex-col"
                    >
                      {/* Top accent line */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d10000]/50 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="flex flex-col flex-1 p-7">

                        {/* Module number + icon row */}
                        <div className="flex items-center justify-between mb-6">
                          <span className="nav-wordmark text-[2.5rem] font-black text-red-900/20 leading-none select-none">
                            {mod.number}
                          </span>
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center
                              bg-red-900/[0.12] border border-red-900/20
                              group-hover:border-red-700/40 transition-all duration-300"
                          >
                            <Icon className="w-5 h-5 text-red-400" />
                          </div>
                        </div>

                        {/* Text */}
                        <h3 className="nav-wordmark text-lg font-black text-white mb-3 leading-snug
                          group-hover:text-red-400 transition-colors duration-300">
                          {mod.title}
                        </h3>
                        <p className="text-[0.83rem] leading-[1.8] text-white/45 flex-1">
                          {mod.description}
                        </p>

                        {/* Bottom corner bracket */}
                        <div className="absolute bottom-4 right-4 w-6 h-6
                          border-b border-r border-red-900/15
                          group-hover:border-red-700/35 transition-colors duration-300 rounded-br-md" />
                      </div>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Nav arrows — styled to match site */}
            <CarouselPrevious
              className="hidden md:flex top-1/2 -left-12 lg:-left-16 -translate-y-1/2 size-11
                bg-[#0a0202] border border-red-900/20 text-white/40
                hover:bg-red-900/20 hover:border-red-700/40 hover:text-white
                shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 z-20"
            />
            <CarouselNext
              className="hidden md:flex top-1/2 -right-12 lg:-right-16 -translate-y-1/2 size-11
                bg-[#0a0202] border border-red-900/20 text-white/40
                hover:bg-red-900/20 hover:border-red-700/40 hover:text-white
                shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 z-20"
            />
          </Carousel>
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