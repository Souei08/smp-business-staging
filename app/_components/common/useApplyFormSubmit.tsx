"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { ApplyNowFormData } from "./ApplyNowForm";

const SUCCESS_MESSAGE =
  "Thank you for applying. Your details have been sent and our team will review your application within 24–48 hours.";

const DEFAULT_ERROR =
  "Something went wrong while sending your application. Please try again later.";

export function useApplyFormSubmit(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError,  setSubmitError]  = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (data: ApplyNowFormData) => {
      try {
        setIsSubmitting(true);
        setSubmitError(null);

        const response = await fetch("/api/apply", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(data),
        });

        const payload = await response
          .json()
          .catch(() => ({ error: "Unexpected response from server." }));

        if (!response.ok) {
          const message = payload?.error || "We couldn't send your application. Please try again in a moment.";
          setSubmitError(message);
          toast.error("Application failed", { description: message });
          return;
        }

        onSuccess?.();
        toast.success("Application sent! 🎉", { description: SUCCESS_MESSAGE });

      } catch (error) {
        console.error("Error submitting application:", error);
        const message = error instanceof Error ? error.message : DEFAULT_ERROR;
        setSubmitError(message);
        toast.error("Something went wrong", { description: message });
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSuccess],
  );

  return { isSubmitting, submitError, handleSubmit };
}