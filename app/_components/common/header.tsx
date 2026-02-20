"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Nav links — href anchors match section IDs on the page ──────────
const navLinks = [
  { name: "Home",        href: "#"             },
  { name: "About",       href: "#about"        },
  { name: "Curriculum",  href: "#curriculum"   },
  { name: "Results",     href: "#testimonials" },
  { name: "FAQ",         href: "#faq"          },
];

// ─── Component ───────────────────────────────────────────────────────
export default function Header() {
  const [scrolled,        setScrolled]        = useState(false);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [activeLink,      setActiveLink]      = useState("Home");

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          scrolled ? "py-3" : "py-5"
        )}
      >
        {/* ── Background layers ── */}

        {/* Scrolled: dark glass backed by #050000 */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            scrolled ? "opacity-100" : "opacity-0"
          )}
          style={{
            background:     "rgba(5,0,0,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom:   "1px solid rgba(209,0,0,0.12)",
            boxShadow:      "0 4px 32px rgba(0,0,0,0.5)",
          }}
        />

        {/* Top state: gradient vignette + accent line */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-700",
            scrolled ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
        </div>

        {/* ── Content ── */}
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setActiveLink("Home")}>
            <div className="relative">
              <Image
                src="/images/logo/main-logo.png"
                alt="SMP Agency"
                width={140}
                height={44}
                className="object-contain h-9 w-auto transition-opacity duration-200 group-hover:opacity-80"
                priority
              />
            </div>
            <div className="flex items-baseline gap-1 leading-none">
              <span className={cn(
                "font-black text-xl tracking-tight transition-colors duration-300",
                scrolled ? "text-white" : "text-[#d10000]"
              )}>
                SMP
              </span>
              <span className="font-black text-xl tracking-tight text-red-500 transition-colors duration-300">
                Business
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;

              const linkColor = scrolled
                ? (isActive ? "#ffffff" : "rgba(200,200,210,0.55)")
                : (isActive ? "#d10000"  : "rgba(255,255,255,0.85)");

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className="relative px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-colors duration-300 group cursor-pointer"
                  style={{ color: linkColor }}
                >
                  <span className={cn(
                    "relative z-10 transition-colors duration-200",
                    scrolled ? "group-hover:text-white" : "group-hover:text-[#d10000]"
                  )}>
                    {link.name}
                  </span>

                  {/* Active pill */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md"
                      style={{
                        background: scrolled
                          ? "rgba(209,0,0,0.10)"
                          : "rgba(255,255,255,0.05)",
                        border: scrolled
                          ? "1px solid rgba(209,0,0,0.22)"
                          : "1px solid rgba(255,255,255,0.08)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Hover underline */}
                  {!isActive && (
                    <span className="absolute bottom-1 left-4 right-4 h-px bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">

            {/* Desktop CTA */}
            <a href="#book" className="hidden md:block">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="btn-red-cta px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest"
              >
                <span className="relative z-10">Book a Call</span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10" />
              </motion.button>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg
                text-white transition-colors duration-300
                hover:bg-red-900/20 border border-transparent hover:border-red-900/30"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{ rotate: 90,   opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "rgba(5,0,0,0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* Spacer for header */}
            <div className="h-20" />

            {/* Top red divider line */}
            <div className="h-px mx-6 bg-gradient-to-r from-transparent via-red-700/60 to-transparent" />

            {/* Ambient glow */}
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-red-900/[0.12] rounded-full blur-[130px] pointer-events-none" />

            {/* Links */}
            <div className="flex flex-col flex-1 px-8 py-10 gap-2 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveLink(link.name);
                    }}
                    className="flex items-center justify-between py-5 group border-b border-white/[0.05] cursor-pointer"
                  >
                    <span className={cn(
                      "text-3xl font-black uppercase tracking-tight transition-colors duration-200",
                      activeLink === link.name ? "text-red-400" : "text-white group-hover:text-red-400"
                    )}>
                      {link.name}
                    </span>
                    <ArrowRight className="w-5 h-5 text-red-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </a>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pt-8"
              >
                <a href="#book" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn-red-cta w-full py-5 rounded-2xl font-black text-xl uppercase tracking-wider justify-center">
                    Book a Call — It&apos;s Free
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}