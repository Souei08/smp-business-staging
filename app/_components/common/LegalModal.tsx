"use client";

import { useEffect, ReactNode } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 1. Define exactly what strings are allowed to be passed in
export type LegalModalType = "privacy" | "terms" | "disclaimer" | null;

// 2. Define the shape of our Component Props
interface LegalModalProps {
  activeModal: LegalModalType;
  onClose: () => void;
}

// 3. Define the shape of our content dictionary so TypeScript doesn't yell about indexing
type LegalContentMap = {
  [key in NonNullable<LegalModalType>]: {
    title: string;
    content: ReactNode;
  };
};

// ─── Legal Content Dictionary ─────────────────────────────────────────
const legalContent: LegalContentMap = {
  privacy: {
  title: "Privacy Policy",
  content: (
    <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
      <p>Last Updated: February 20, 2026</p>

      <h4 className="text-white font-bold text-base mt-6">
        Introduction
      </h4>
      <p>
        At SMP, your privacy is important to us. This Privacy Policy explains
        how we collect, use, and protect your information when you visit our
        website or purchase any of our products or services.
      </p>
      <p>
        By using our website, you agree to the collection and use of
        information in accordance with this policy.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        Information We Collect
      </h4>

      <p className="font-semibold text-white">1. Personal Information</p>
      <p>
        When you register, apply, purchase a product, or contact us, we may
        collect personal information such as your name, email address, and
        billing details.
      </p>

      <p className="font-semibold text-white">2. Usage Data</p>
      <p>
        We may automatically collect certain information about how you access
        and use our website. This may include your IP address, browser type,
        device information, pages visited, and session duration. This data is
        used strictly to improve site performance and user experience.
      </p>

      <p className="font-semibold text-white">3. Payment Information</p>
      <p>
        Payments are processed securely through third-party providers such as
        Stripe or PayPal. SMP does not store or have direct access to your full
        payment details.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        How We Use Your Information
      </h4>
      <p>We use collected data to:</p>
      <ul className="list-disc pl-5 space-y-1 text-gray-400">
        <li>Process transactions and deliver digital products or services</li>
        <li>Provide customer support and respond to inquiries</li>
        <li>Send important updates, service notifications, or offers</li>
        <li>Improve website functionality and user experience</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h4 className="text-white font-bold text-base mt-6">
        Cookies & Tracking Technologies
      </h4>
      <p>
        We use cookies and similar tracking technologies to enhance your
        browsing experience, analyze traffic, and personalize content. You may
        disable cookies in your browser settings; however, some features of the
        site may not function properly.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        Data Protection & Security
      </h4>
      <p>
        We implement reasonable technical and organizational safeguards to
        protect your personal information. While no online system can be
        guaranteed 100% secure, we take commercially reasonable steps to
        safeguard your data.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        Third-Party Disclosure
      </h4>
      <p>
        We do not sell, trade, or rent your personal information. Information
        may be shared only with trusted third parties when necessary for
        payment processing, analytics, hosting services, or legal compliance.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        Your Rights
      </h4>
      <p>
        You may request access to, correction of, or deletion of your personal
        data by contacting us. We will respond within a reasonable timeframe,
        subject to applicable legal requirements.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        Changes to This Policy
      </h4>
      <p>
        We may update this Privacy Policy from time to time. Any updates will
        be reflected by revising the “Last Updated” date at the top of this
        page.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        Contact Us
      </h4>
      <p>
        For privacy-related questions or data requests, contact us at:
      </p>
      <p className="text-white font-semibold">
        smpagencyhub@gmail.com
      </p>
    </div>
  )
},
  terms: {
  title: "Terms of Service",
  content: (
    <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
      <p>Last Updated: January 30, 2025</p>

      <h4 className="text-white font-bold text-base mt-6">
        1. Agreement to Terms
      </h4>
      <p>
        By accessing this website or purchasing any products or services from
        SMP, you agree to be bound by these Terms of Service and all applicable
        laws and regulations. If you do not agree with any part of these terms,
        you must not use our website or services.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        2. Services Overview
      </h4>
      <p>
        SMP provides online education, mentorship, training programs, and
        digital products related to business growth, OFM agencies, and
        creator-based operations.
      </p>
      <p>
        All materials are provided for educational and informational purposes
        only. We do not guarantee specific financial results or business
        outcomes.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        3. Purchases & Payments
      </h4>
      <p>
        All prices are listed in USD unless otherwise stated. Payments are
        processed securely through third-party payment providers.
      </p>
      <p>
        Upon successful purchase, access details will be delivered to the email
        address provided at checkout. It is your responsibility to provide
        accurate contact information.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        4. Refund Policy
      </h4>
      <p>
        Due to the digital nature of our products and services, all sales are
        final unless explicitly stated otherwise in writing.
      </p>
      <p>
        Once access to a digital product, course, or training material has been
        granted, refunds will not be issued.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        5. Intellectual Property
      </h4>
      <p>
        All content, materials, frameworks, systems, branding, and training
        resources provided by SMP are the exclusive intellectual property of
        SMP.
      </p>
      <p>
        You may not copy, reproduce, distribute, modify, resell, share, or
        exploit any materials without prior written consent.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        6. User Responsibilities
      </h4>
      <p>
        You agree to use the SMP platform lawfully and ethically. You may not
        share login credentials, distribute course materials, or grant access
        to unauthorized users.
      </p>
      <p>
        Violation of these terms may result in immediate termination of access
        without refund.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        7. Limitation of Liability
      </h4>
      <p>
        SMP shall not be liable for any direct, indirect, incidental,
        consequential, or special damages arising from the use or inability to
        use our products or services.
      </p>
      <p>
        Business and financial decisions involve risk. You accept full
        responsibility for your actions and results.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        8. Modifications to Services
      </h4>
      <p>
        SMP reserves the right to modify, suspend, or discontinue any part of
        its services at any time without prior notice.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        9. Changes to These Terms
      </h4>
      <p>
        We may update these Terms of Service periodically. Continued use of the
        website after changes are posted constitutes acceptance of those
        changes.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        10. Contact Information
      </h4>
      <p>
        For questions regarding these Terms of Service, contact:
      </p>
      <p className="text-white font-semibold">
        smpagencyhub@gmail.com
      </p>
    </div>
  )
},
 disclaimer: {
  title: "Earnings & Income Disclaimer",
  content: (
    <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
      <p>Last updated: February 20, 2026</p>

      <h4 className="text-white font-bold text-base mt-6">
        No Guarantee of Results or Income
      </h4>
      <p>
        The information presented on this website — including testimonials,
        case studies, examples, and references to specific income or revenue
        amounts — reflects the experiences of certain individuals under
        particular conditions.
      </p>
      <p>
        These results are not typical, are not guaranteed, and should not be
        interpreted as a promise or guarantee of earnings.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        Individual Results Will Vary
      </h4>
      <p>Your results depend on many factors, including but not limited to:</p>
      <ul className="list-disc pl-5 space-y-1 text-gray-400">
        <li>Your background, experience, and skill level</li>
        <li>Your level of effort, execution, and consistency</li>
        <li>The time you dedicate to implementation</li>
        <li>Market conditions and economic factors</li>
        <li>Your ability to follow and apply strategies effectively</li>
      </ul>
      <p>
        We do not guarantee any specific financial outcome. Some participants
        earn nothing. Others earn significant amounts. Results vary based on
        execution, persistence, and individual circumstances.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        Testimonials and Examples
      </h4>
      <p>
        Testimonials shared on this website represent exceptional results and
        are not intended to represent or guarantee that anyone will achieve the
        same or similar results. They are provided for illustrative purposes
        only.
      </p>
      <p>
        Every business and individual situation is unique. Your success depends
        entirely on your own efforts and decisions.
      </p>

      <h4 className="text-white font-bold text-base mt-6">
        Assumption of Risk & Responsibility
      </h4>
      <p>
        By accessing this website and/or purchasing or participating in our
        programs, you acknowledge that you are solely responsible for your
        results. Risen Consulting LLC and its representatives are not
        responsible for your success or failure.
      </p>
      <p>
        All business ventures involve risk. You accept full responsibility for
        your actions, outcomes, and financial decisions.
      </p>
    </div>
  )
}
};

// ─── Component ───────────────────────────────────────────────────────
export default function LegalModal({ activeModal, onClose }: LegalModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [activeModal]);

  return (
    <AnimatePresence>
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-3xl bg-[#0a0202] border border-red-900/40 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-red-900/20 bg-[#050101]">
              <h3 className="text-xl font-bold text-white">
                {legalContent[activeModal].title}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-red-900/20 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 md:p-8 overflow-y-auto overscroll-contain">
              {legalContent[activeModal].content}
            </div>
            
            {/* Bottom Glow inside modal */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0202] to-transparent pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}