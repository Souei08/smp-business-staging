"use client";

import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// ─── Data ────────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
    badge: "$228K",
    quote: "In the last 30 days alone my OFM agency has done $228K in revenue. Two years ago I joined Markus' mentorship from zero — everything we're doing now was built off what I learned inside.",
    name: "Finn",
    role: "OFM Agency Owner",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=600&q=80",
    badge: "$40K with OFM",
    quote: "I joined Markus's coaching around 10K/month. Six months later my agency's doing 40K/month. The coaching group showed me exactly when and how to scale instead of flatlining at 10K.",
    name: "Enzo",
    role: "OFM Agency Owner",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    badge: "$1,337.45 / Day",
    quote: "A year ago I was in sixth form. Now I run my OFM agency from my laptop. I can work from a café, book a last-minute flight, or come to Dubai — and I don't need to ask anyone for permission. FameU gave me the blueprint and the network to make that jump.",
    name: "Lucas",
    role: "OFM Agency Owner",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    badge: "$67K / Month",
    quote: "Before joining I was stuck at $8K a month and couldn't figure out why nothing was scaling. Within 60 days of implementing the system my revenue tripled. The frameworks here are unlike anything I found online for free.",
    name: "Marcus",
    role: "OFM Agency Owner",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    badge: "$22K First Month",
    quote: "I had zero experience in OFM. I literally started from nothing. The step-by-step acquisition system got me to $22K in my very first full month. I still can't believe this is my life now.",
    name: "Sofia",
    role: "OFM Agency Owner",
  },
];

const mediaLogos = [
  { name: "DIE",         isSerif: false, hasBadge: false },
  { name: "TIME",        isSerif: true,  hasBadge: false },
  { name: "yahoo!",      isSerif: false, hasBadge: false },
  { name: "TechBullion", isSerif: false, hasBadge: true  },
  { name: "Forbes",      isSerif: true,  hasBadge: false },
  { name: "Bloomberg",   isSerif: false, hasBadge: false },
];

// ─── Reusable card decorations ───────────────────────────────────────
const CardTopLine = () => (
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent z-10" />
);

const CardHoverGlow = () => (
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl
    bg-[radial-gradient(ellipse_at_50%_0%,rgba(209,0,0,0.07)_0%,transparent_65%)]" />
);

// ─── Component ───────────────────────────────────────────────────────
export default function TestimonialsSection2() {
  return (
    <section className="relative w-full bg-[#050000] py-24 overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] bg-red-900/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-8%] w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase
            tracking-[0.18em] mb-6 bg-red-900/[0.08] border border-red-900/25 text-red-400">
            <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
            Testimonials
          </div>

          <h2 className="text-[clamp(2rem,5vw,3rem)] font-black text-white tracking-tight leading-[1.08] max-w-3xl">
            What Happens When You{" "}
            <span className="italic font-normal font-dancing text-red-400">Stop Guessing</span>
            <br />— and Start Building Systems.
          </h2>
        </div>

        {/* ── Carousel — same engine as ProgramModulesSection ── */}
        <div className="px-0 md:px-14">
          <Carousel
            opts={{ loop: true, align: "start" }}
            className="w-full relative pb-16 md:pb-0"
          >
            <CarouselContent className="-ml-4 md:-ml-6 py-4">
              {testimonials.map((data, index) => (
                <CarouselItem
                  key={data.id}
                  className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative rounded-2xl bg-[#0a0202] border border-red-900/30
                      flex flex-col overflow-hidden h-full
                      shadow-[0_4px_24px_rgba(0,0,0,0.4)]
                      card-hover transition-colors duration-300"
                  >
                    <CardTopLine />
                    <CardHoverGlow />

                    {/* Thumbnail */}
                    <div className="relative w-full overflow-hidden flex-shrink-0" style={{ aspectRatio: "4/3" }}>
                      <img
                        src={data.image}
                        alt={`${data.name} testimonial`}
                        className="w-full h-full object-cover brightness-75 saturate-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-[#050000]/50" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-sm font-black text-white
                        bg-red-800/88 border border-red-400/40 backdrop-blur-[8px]
                        shadow-[0_2px_12px_rgba(209,0,0,0.5)]">
                        {data.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6 gap-5">
                      <p className="text-sm leading-[1.65] italic flex-1 text-white/85">
                        &ldquo;{data.quote}&rdquo;
                      </p>
                      <div className="mt-auto">
                        <div className="h-px w-full bg-red-900/20 mb-4" />
                        <p className="text-sm font-black text-white">{data.name}</p>
                        <p className="text-xs mt-0.5 text-white/50">{data.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Nav arrows — same style as ProgramModulesSection */}
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

        {/* ── Media Logos Marquee ── */}
        <div className="mt-24">
          <div className="h-px mb-10 bg-[linear-gradient(90deg,transparent,rgba(209,0,0,0.2),rgba(255,255,255,0.08),rgba(209,0,0,0.2),transparent)]" />

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#050000] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#050000] to-transparent" />

            <motion.div
              className="flex items-center gap-16 whitespace-nowrap"
              style={{ width: "max-content" }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              {[...mediaLogos, ...mediaLogos].map((logo, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 flex items-center gap-1.5 text-white/35 text-[1.4rem] font-black
                    select-none hover:text-white/60 transition-colors duration-200
                    ${logo.isSerif ? "font-serif italic" : ""}`}
                >
                  {logo.hasBadge && (
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black
                      bg-white/15 text-white/40">
                      T
                    </span>
                  )}
                  {logo.name}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}