"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ApplyNowFormData } from '../common/ApplyNowForm';
import { useState } from 'react';
import ApplyModal from "../common/ApplyModal";
import ApplyNowForm from "../common/ApplyNowForm";

// ─── Shared card classes ─────────────────────────────────────────────
const CARD_BASE =
  "rounded-2xl bg-[#0a0202] border border-red-900/40 p-6 flex flex-col shadow-lg relative overflow-hidden " +
  "group hover:border-red-700/60 transition-all duration-300";

// ─── Reusable card decorations ───────────────────────────────────────
const CardTopLine = () => (
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
);

const CardHoverGlow = () => (
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
    bg-[radial-gradient(ellipse_at_50%_0%,rgba(209,0,0,0.06)_0%,transparent_60%)]" />
);

// ─── Stat icons ──────────────────────────────────────────────────────
const ICON_PROPS = {
  className: "w-3.5 h-3.5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#d10000",
  strokeWidth: "1.8",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const StatIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'revenue':
      return (
        <svg {...ICON_PROPS}>
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'conversion':
      return (
        <svg {...ICON_PROPS}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    case 'ltv':
      return (
        <svg {...ICON_PROPS}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case 'lifetime':
      return (
        <svg {...ICON_PROPS}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'client':
      return (
        <svg {...ICON_PROPS}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return (
        <svg {...ICON_PROPS}>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
  }
};

// ─── Data ────────────────────────────────────────────────────────────
const ticker6Figure = [
  { url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', label: '$127,400 — Q3 Revenue' },
  { url: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80', label: '$84,200 — Monthly Net' },
  { url: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80', label: '$210K — Annual Milestone' },
];

const revenueMonths = [
  { month: 'Jan', value: 38 },
  { month: 'Feb', value: 55 },
  { month: 'Mar', value: 42 },
  { month: 'Apr', value: 78 },
  { month: 'May', value: 65 },
  { month: 'Jun', value: 100 },
  { month: 'Jul', value: 88 },
];

const revenueStats = [
  { label: 'Monthly Revenue',   value: '$100K',  change: '+17.6%', icon: 'revenue'    },
  { label: 'Conversion Rate',   value: '69.6%',  change: '+31.1%', icon: 'conversion' },
  { label: 'Client LTV',        value: '$25K',   change: '+44.8%', icon: 'ltv'        },
  { label: 'Lifetime Earnings', value: '$4.2M',  change: '+58.3%', icon: 'lifetime'   },
  { label: 'Client Revenue',    value: '$12.4M', change: '+24.3%', icon: 'client'     },
  { label: 'Total Revenue',     value: '$340K',  change: '+19.2%', icon: 'total'      },
  // duplicated for seamless loop
  { label: 'Monthly Revenue',   value: '$100K',  change: '+17.6%', icon: 'revenue'    },
  { label: 'Conversion Rate',   value: '69.6%',  change: '+31.1%', icon: 'conversion' },
  { label: 'Client LTV',        value: '$25K',   change: '+44.8%', icon: 'ltv'        },
  { label: 'Lifetime Earnings', value: '$4.2M',  change: '+58.3%', icon: 'lifetime'   },
  { label: 'Client Revenue',    value: '$12.4M', change: '+24.3%', icon: 'client'     },
  { label: 'Total Revenue',     value: '$340K',  change: '+19.2%', icon: 'total'      },
];

const STROKE_ICON = "fill-none stroke-current stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]";

const blueprintSteps = [
  {
    label: 'Client Focus',
    icon: (
      <svg className={`w-7 h-7 ${STROKE_ICON}`} viewBox="0 0 24 24">
        <line x1="9" y1="21" x2="15" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M12 2a7 7 0 0 1 5 11.95V17H7v-3.05A7 7 0 0 1 12 2z" />
      </svg>
    ),
  },
  {
    label: 'Person Strategies',
    icon: (
      <svg className={`w-7 h-7 ${STROKE_ICON}`} viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Personalize Comms',
    icon: (
      <svg className={`w-7 h-7 ${STROKE_ICON}`} viewBox="0 0 24 24">
        <path d="M16 11c1.5-1 3-1 4 0l1 1-5 5-1.5-1.5" />
        <path d="M8 11c-1.5-1-3-1-4 0L3 12l5 5 1.5-1.5" />
        <path d="M12 4v4M10 6l2 2 2-2" />
        <path d="M9 13l2 2 2-2 2 2" />
      </svg>
    ),
  },
  {
    label: 'Guaranteed Results',
    icon: (
      <svg className={`w-7 h-7 ${STROKE_ICON} stroke-[2.2]`} viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

// ─── Section ─────────────────────────────────────────────────────────
export default function MachineThatPrintsSection() {
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
    <>
      <section className="relative w-full bg-[#050000] py-24 overflow-hidden">

        {/* Ambient glows */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* ── Section Header ── */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-[0.18em] mb-5
              bg-red-900/10 border border-red-900/20 text-red-400">
              <span className="w-1 h-1 rounded-full bg-red-500" />
              What gets built inside the OFM Mastery System
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-[1.08]">
              Stop chasing clients. Start running{' '}
              <br className="hidden md:block" />a{' '}
              <span className="italic text-red-400 font-dancing">Machine That Prints</span>{' '}
              Revenue.
            </h2>

            <p className="text-gray-400 text-sm md:text-base mb-8 max-w-2xl leading-relaxed">
              This isn&apos;t another course about theory. You&apos;re getting the exact operating playbook that took real agencies
              from zero to $10K, $30K — even $100K months — without burning out or wasting money on ads that don&apos;t convert.
            </p>

            {/* ── CTA — uses global .btn-red-cta, identical to every other section ── */}
            <button
              onClick={() => setModalOpen(true)}
              className="btn-red-cta px-10 py-5 rounded-xl text-lg font-black mb-5"
            >
              Yes — I&apos;m Ready to Build
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gray-600 border border-[#050000]" />
                ))}
              </div>
              <div className="text-yellow-400 text-xs flex gap-0.5">★★★★★</div>
              <span className="text-xs text-gray-400">4.9/5 — Rated Excellent</span>
            </div>
          </div>

          {/* ── Bento Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[minmax(300px,auto)]">

            {/* Card 1 — 6-Figure Foundation */}
            <div className={`md:col-span-2 ${CARD_BASE} justify-between`}>
              <CardTopLine />
              <CardHoverGlow />

              <div className="relative w-full h-56 bg-[#050101] rounded-xl border border-gray-800/60 mb-6 overflow-hidden">
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#050101] via-transparent to-[#050101]" />
                <motion.div
                  className="flex flex-col gap-3 p-3"
                  animate={{ y: ['0%', '-50%'] }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                >
                  {[...ticker6Figure, ...ticker6Figure].map((item, idx) => (
                    <div key={idx} className="relative w-full flex-shrink-0 rounded-lg border border-white/10 overflow-hidden bg-gray-900"
                      style={{ aspectRatio: '2.8/1' }}>
                      <img src={item.url} alt={item.label} className="w-full h-full object-cover opacity-55" />
                      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/[0.88] to-transparent">
                        <span className="text-xs font-black text-white">{item.label}</span>
                      </div>
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[9px] text-green-400 font-black">LIVE</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div>
                <h3 className="text-xl font-black text-white mb-2">Your First 6-Figure OFM Blueprint</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Not theory. Not fluff. You get the exact acquisition engine that moved 7 of our students past $10K/month
                  within their first 90 days — structured, repeatable, and ready to install.
                </p>
              </div>
            </div>

            {/* Card 2 — Revenue Bar Chart */}
            <div className={`md:col-span-1 ${CARD_BASE}`}>
              <CardTopLine />
              <CardHoverGlow />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1">Total Revenue</p>
                  <p className="text-2xl font-black text-white">$466K</p>
                </div>
                <span className="text-[10px] font-black px-2 py-1 rounded-md mt-1
                  text-green-400 bg-green-400/[0.08] border border-green-400/20">
                  +23.4% ↑
                </span>
              </div>

              <div className="flex items-end justify-between gap-1.5 w-full h-36 relative">
                {[0, 33, 66].map((p) => (
                  <div key={p} className="absolute left-0 right-0 border-t border-gray-800/30" style={{ bottom: `${p}%` }} />
                ))}
                {revenueMonths.map((d, i) => (
                  <div key={i} className="flex-1 h-full flex flex-col items-center justify-end">
                    <motion.div
                      className="w-full rounded-t-md relative overflow-hidden"
                      style={{ height: `${d.value}%` }}
                      initial={{ scaleY: 0, originY: 'bottom' }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: i * 0.08 + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {d.value === 100 ? (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#a80000] to-[#ff4d4d]" />
                          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-md bg-[#ff6666]/90" />
                          <div className="absolute inset-0 bg-gradient-to-t from-red-700/30 to-transparent blur-[5px]" />
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-red-700/28" />
                          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-md bg-[#c00]/90" />
                        </>
                      )}
                    </motion.div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between w-full mt-2">
                {revenueMonths.map((d, i) => (
                  <span key={i} className="text-[8px] text-gray-500 text-center flex-1">{d.month}</span>
                ))}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-black text-white mb-1">Attention that pays — every month.</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Predictable pipelines. No feast-or-famine. Locked-in recurring revenue that compounds over time.
                </p>
              </div>
            </div>

            {/* Card 3 — Systems */}
            <div className={`md:col-span-1 ${CARD_BASE}`}>
              <CardTopLine />
              <CardHoverGlow />

              <h3 className="text-xl font-black text-white mb-2">Outcomes that run without you.</h3>
              <p className="text-sm text-gray-400 mb-2">
                Plug in our battle-tested SOPs and dashboards — then watch your agency scale on autopilot while you focus on growth.
              </p>

              <div className="mt-auto flex justify-center items-center py-4">
                <div className="relative flex items-center justify-center w-40 h-40">
                  {[
                    { size: 160, delay: 0,   opacity: [0.35, 0.1,  0.35] as number[], border: 'border-red-800/20' },
                    { size: 112, delay: 0.3, opacity: [0.45, 0.15, 0.45] as number[], border: 'border-red-700/30' },
                    { size: 84,  delay: 0.6, opacity: [0.55, 0.2,  0.55] as number[], border: 'border-red-600/40' },
                  ].map(({ size, delay, opacity, border }) => (
                    <motion.div
                      key={size}
                      className={`absolute rounded-full border ${border}`}
                      style={{ width: size, height: size }}
                      animate={{ scale: [1, 1.1, 1], opacity }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
                    />
                  ))}
                  <div className="relative z-10 flex items-center justify-center w-[60px] h-[60px] rounded-full
                    bg-[radial-gradient(circle,rgba(209,0,0,0.28)_0%,rgba(209,0,0,0.06)_100%)]
                    border border-red-700/55
                    shadow-[0_0_28px_rgba(209,0,0,0.4),inset_0_0_14px_rgba(209,0,0,0.12)]">
                    <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 — Control Your Money */}
            <div className={`md:col-span-2 ${CARD_BASE} justify-between`}>
              <CardTopLine />
              <CardHoverGlow />

              <div className="relative w-full h-52 rounded-xl border border-gray-800/60 bg-[#050101] mb-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-10 z-10 pointer-events-none bg-gradient-to-b from-[#050101] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-10 z-10 pointer-events-none bg-gradient-to-t from-[#050101] to-transparent" />

                <motion.div
                  className="flex flex-col gap-2.5 p-4 pt-5"
                  animate={{ y: ['0%', '-50%'] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                >
                  {revenueStats.map((stat, idx) => (
                    <div key={idx}
                      className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-800/50 flex-shrink-0 bg-white/[0.02]">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                          bg-red-900/10 border border-red-900/20">
                          <StatIcon type={stat.icon} />
                        </div>
                        <span className="text-xs text-gray-400 font-semibold">{stat.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-base font-black text-white">{stat.value}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md
                          text-green-400 bg-green-400/[0.08] border border-green-400/[0.15]">
                          {stat.change} ↑
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div>
                <h3 className="text-xl font-black text-white mb-2">Own your numbers. Own your future.</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Most agencies bleed revenue without knowing it. You&apos;ll master your margins, reinvest with precision,
                  and build growth that doesn&apos;t collapse when one client leaves.
                </p>
              </div>
            </div>

            {/* Card 5 — Blueprint Full Width */}
            <div className="md:col-span-3 rounded-2xl bg-[#0a0202] border border-red-900/40 p-8 flex flex-col justify-between shadow-lg relative overflow-hidden
              group hover:border-red-700/60 transition-all duration-300">
              <CardTopLine />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                bg-[radial-gradient(ellipse_at_50%_20%,rgba(209,0,0,0.05)_0%,transparent_60%)]" />

              <div className="w-full py-8 flex items-center justify-center gap-4 md:gap-14 mb-6 relative">
                <div className="absolute top-[38%] left-[8%] right-[8%] h-px -z-0
                  bg-[linear-gradient(90deg,transparent,rgba(209,0,0,0.25),rgba(209,0,0,0.5),rgba(209,0,0,0.25),transparent)]" />

                {blueprintSteps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3 relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center relative text-red-400
                        bg-[#060101] border border-red-700/45 shadow-[0_0_0_5px_rgba(209,0,0,0.04)]"
                      whileHover={{ scale: 1.1, boxShadow: '0 0 22px rgba(209,0,0,0.35)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {step.icon}
                      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[9px] font-black text-white
                        flex items-center justify-center bg-[#d10000]">
                        {idx + 1}
                      </span>
                    </motion.div>
                    <span className="text-[9px] font-black text-gray-300 text-center w-24 leading-snug uppercase tracking-wider">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-black text-white mb-2">The four pillars behind every breakout agency.</h3>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                  Every agency that crossed $30K/month had one thing in common — they followed a sequence, not a shortcut.
                  These four pillars are the backbone of that sequence.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Apply Modal — outside <section> to escape stacking context ── */}
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