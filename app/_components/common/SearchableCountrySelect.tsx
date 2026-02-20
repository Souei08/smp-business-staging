"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

const inputBase =
  "w-full px-4 py-3 text-sm font-medium text-white placeholder-white/30 rounded-lg outline-none transition-all duration-200 " +
  "bg-white/[0.04] border border-white/10 " +
  "focus:border-red-700/50 focus:ring-2 focus:ring-red-900/20 cursor-pointer text-left flex items-center justify-between gap-2 min-h-[46px]";

export interface CountryOption {
  name: string;
  code: string;
}

interface Props {
  options:      CountryOption[];
  value:        string;
  onChange:     (value: string) => void;
  id?:          string;
  required?:    boolean;
  placeholder?: string;
}

export default function SearchableCountrySelect({
  options, value, onChange,
  id = "country", required = false, placeholder = "Select your country",
}: Props) {
  const [open,     setOpen]     = useState(false);
  const [search,   setSearch]   = useState("");
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const searchId     = `${id}-search`;
  const listboxId    = `${id}-listbox`;

  const filtered = search.trim()
    ? options.filter((c) => c.name.toLowerCase().includes(search.toLowerCase().trim()))
    : options;

  const selectedOption = options.find((c) => c.name === value);

  const updatePosition = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom + 4, left: rect.left, width: rect.width });
  };

  useEffect(() => { if (open) updatePosition(); }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const portal = document.getElementById("country-dropdown-portal");
      if (containerRef.current?.contains(e.target as Node)) return;
      if (portal?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Reposition on scroll / resize
  useEffect(() => {
    if (!open) return;
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  const handleSelect = (name: string) => {
    onChange(name);
    setOpen(false);
    setSearch("");
  };

  // ── Dropdown rendered into a portal ─────────────────────────────────
  // ARIA structure:
  //   <div>                     ← wrapper (no role)
  //     <div>                   ← search area (no role — keeps search OUTSIDE listbox)
  //       <input aria-controls="listboxId" />
  //     </div>
  //     <ul role="listbox">     ← listbox only contains option children
  //       <li role="option" />
  //     </ul>
  //   </div>
  const dropdown = open && (
    <div
      id="country-dropdown-portal"
      className="fixed z-[300] flex flex-col rounded-xl overflow-hidden
        bg-[#0d0303] border border-red-900/30
        shadow-[0_16px_48px_rgba(0,0,0,0.8),0_0_0_1px_rgba(209,0,0,0.08)]"
      style={{ top: position.top, left: position.left, width: position.width }}
    >
      {/* Search — intentionally outside the listbox so it doesn't violate ARIA */}
      <div className="px-2 pt-2 pb-1 border-b border-red-900/15" role="search">
        <input
          id={searchId}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search countries…"
          autoFocus
          autoComplete="off"
          aria-label="Search countries"
          aria-controls={listboxId}
          onKeyDown={(e) => e.stopPropagation()}
          className="w-full px-3 py-2 text-sm rounded-lg outline-none
            bg-white/[0.04] border border-white/10 text-white placeholder-white/30
            focus:border-red-700/40 transition-all duration-200"
        />
      </div>

      {/* Listbox — only contains option-role children (li > [role=option]) */}
      <ul
        id={listboxId}
        role="listbox"
        aria-label="Countries"
        aria-multiselectable="false"
        className="overflow-y-auto overscroll-contain max-h-52 py-1"
      >
        {filtered.length === 0 ? (
          // Not role="option" — just an informational row
          <li role="presentation" className="px-4 py-3 text-sm text-white/30">
            No countries found
          </li>
        ) : (
          filtered.map((c) => (
            <li     
              key={c.code}
              role="option"
              aria-selected={value === c.name ? "true" : "false"}
              onClick={() => handleSelect(c.name)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSelect(c.name); }}
              tabIndex={0}
              className={`px-4 py-2.5 text-sm cursor-pointer outline-none
                transition-colors duration-150 select-none
                focus-visible:bg-white/[0.06]
                ${value === c.name
                  ? "bg-red-900/25 text-red-400 font-bold"
                  : "text-white/70 hover:bg-white/[0.04] hover:text-white"}`}
            >
              {c.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Combobox trigger */}
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open ? "true" : "false"}
        aria-controls={listboxId}
        className={`${inputBase} ${!value ? "text-white/30" : "text-white"}`}
      >
        <span>{selectedOption ? selectedOption.name : placeholder}</span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-white/30 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Hidden native input for form validation */}
      <input
        type="text"
        name={id}
        value={value}
        readOnly
        tabIndex={-1}
        required={required}
        aria-hidden="true"
        id={`${id}-hidden`}
        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
      />

      {typeof document !== "undefined" && createPortal(dropdown, document.body)}
    </div>
  );
}