"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ApplyModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
};

const panelVariants = {
  hidden:  { opacity: 0, scale: 0.96, y: 20 },
  visible: { opacity: 1, scale: 1,    y: 0  },
  exit:    { opacity: 0, scale: 0.96, y: 20 },
};

export default function ApplyModal({ open, onClose, children }: ApplyModalProps) {

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Scroll container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-6 overflow-y-auto pointer-events-none">
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Apply Now"
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto relative w-full max-w-[30rem] my-auto flex flex-col
                bg-[#0a0202] border border-red-900/30 rounded-2xl overflow-hidden
                shadow-[0_0_0_1px_rgba(209,0,0,0.08),0_32px_64px_-12px_rgba(0,0,0,0.8)]"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

              {/* Header */}
              <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-red-900/20">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase
                    tracking-[0.18em] mb-2 bg-red-900/[0.08] border border-red-900/25 text-red-400">
                    <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
                    Applications Open
                  </div>
                  <h2 className="text-lg font-black text-white tracking-tight leading-snug">
                    Apply to OFM Mastery
                  </h2>
                  <p className="text-[0.75rem] text-white/45 mt-0.5 leading-snug">
                    Fill in your details and our team will review within 24–48 hours.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg
                    bg-red-900/[0.08] border border-red-900/20 text-white/50
                    hover:bg-red-900/20 hover:border-red-700/40 hover:text-white
                    transition-all duration-200"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body — scrollable */}
              <div className="overflow-y-auto overscroll-contain max-h-[calc(100vh-12rem)]">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}