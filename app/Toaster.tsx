"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        style: {
          background:   "#0a0202",
          border:       "1px solid rgba(209,0,0,0.25)",
          color:        "#ffffff",
          borderRadius: "12px",
          boxShadow:    "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(209,0,0,0.08)",
          fontFamily:   "var(--font-montserrat), sans-serif",
          fontSize:     "0.875rem",
        },
      }}
    />
  );
}