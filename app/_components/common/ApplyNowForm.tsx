"use client";

import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countries from "world-countries";
import { ArrowRight, Loader2 } from "lucide-react";
import SearchableCountrySelect from "./SearchableCountrySelect";

// ─── Shared input style ──────────────────────────────────────────────
const inputBase =
  "w-full px-4 py-3 text-sm font-medium text-white placeholder-white/30 rounded-lg outline-none transition-all duration-200 " +
  "bg-white/[0.04] border border-white/10 " +
  "focus:border-red-700/50 focus:ring-2 focus:ring-red-900/20";

// ─── Country list ────────────────────────────────────────────────────
const countryList = [...countries]
  .filter((c) => c.name.common)
  .sort((a, b) => a.name.common.localeCompare(b.name.common))
  .map((c) => ({ name: c.name.common, code: c.cca2 }));

// ─── Types ───────────────────────────────────────────────────────────
export interface ApplyNowFormData {
  name:      string;
  phone:     string;
  email:     string;
  instagram: string;
  country:   string;
}

export interface ApplyNowFormProps {
  onSubmit?: (data: ApplyNowFormData) => void | Promise<void>;
  onCancel?: () => void;
  loading?:  boolean;
}

// ─── Label ───────────────────────────────────────────────────────────
const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor}
    className="block text-[0.7rem] font-black uppercase tracking-[0.12em] text-white/45 mb-1.5">
    {children}
  </label>
);

// ─── Component ───────────────────────────────────────────────────────
export default function ApplyNowForm({ onSubmit, onCancel, loading }: ApplyNowFormProps) {
  const [formData, setFormData] = useState<ApplyNowFormData>({
    name: "", phone: "", email: "", instagram: "", country: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 4000);
    return () => clearTimeout(t);
  }, [error]);

  const validate = (): string | null => {
    if (!formData.name.trim())
      return "Please enter your full name.";
    if (!formData.phone?.trim())
      return "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Please enter a valid email address.";
    if (!formData.country.trim())
      return "Please select your country.";
    if (formData.instagram && !/^[A-Za-z0-9._]{2,30}$/.test(formData.instagram.replace(/^@+/, "")))
      return "Instagram username can only contain letters, numbers, dots and underscores.";
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, instagram: e.target.value.replace(/^@+/, "") }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    onSubmit?.({
      ...formData,
      instagram: formData.instagram ? `@${formData.instagram}` : "",
      phone:     formData.phone || "",
    });
  };

  return (
    <div className="relative">

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4
          bg-[#0a0202]/96 backdrop-blur-sm rounded-b-2xl">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          <div className="text-center">
            <p className="text-sm font-black text-white">Submitting application…</p>
            <p className="text-[0.7rem] text-white/35 mt-0.5">Please wait a moment</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`px-6 py-6 flex flex-col gap-4 ${loading ? "pointer-events-none" : ""}`}
      >
        {/* Error */}
        {error && (
          <div className="rounded-lg px-4 py-3 text-[0.8rem] font-semibold
            bg-red-900/20 border border-red-700/40 text-red-400">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <input type="text" id="name" name="name" required
            value={formData.name} onChange={handleChange}
            className={inputBase} placeholder="Your full name" />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <PhoneInput
            international defaultCountry="US"
            value={formData.phone || undefined}
            onChange={(value) => setFormData((prev) => ({ ...prev, phone: value || "" }))}
            placeholder="Enter phone number"
            className="apply-form-phone-input"
            numberInputProps={{ id: "phone", name: "phone", required: true }}
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email *</Label>
          <input type="email" id="email" name="email" required
            value={formData.email} onChange={handleChange}
            className={inputBase} placeholder="your@email.com" />
        </div>

        {/* Country */}
        <div>
          <Label htmlFor="country">Country *</Label>
          <SearchableCountrySelect
            id="country" options={countryList} value={formData.country}
            onChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
            required placeholder="Select your country"
          />
        </div>

        {/* Instagram */}
        <div>
          <Label htmlFor="instagram">
            Instagram{" "}
            <span className="text-white/25 normal-case tracking-normal font-semibold">(optional)</span>
          </Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none text-sm">
              @
            </span>
            <input type="text" id="instagram" name="instagram"
              value={formData.instagram} onChange={handleInstagramChange}
              className={`${inputBase} pl-8`} placeholder="username" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
          {onCancel && (
            <button type="button" onClick={onCancel}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white/45
                bg-white/[0.03] border border-white/10
                hover:bg-white/[0.06] hover:text-white/70 transition-all duration-200">
              Cancel
            </button>
          )}
          <button type="submit" disabled={!!loading}
            className="btn-red-cta flex-1 py-3 rounded-xl text-sm justify-center">
            {loading ? "Sending…" : "Submit Application"}
            {!loading && <ArrowRight size={15} />}
          </button>
        </div>

        {/* Trust note */}
        <p className="text-center text-[0.65rem] text-white/20 leading-relaxed -mt-1">
          Your details are kept private and only shared with our team.
          We respond within 24–48 hours.
        </p>
      </form>
    </div>
  );
}