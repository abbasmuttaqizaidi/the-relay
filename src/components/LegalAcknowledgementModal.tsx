import * as React from "react";
import { useState } from "react";
import { Modal, Button, Checkbox } from "@/design-system";
import { ShieldCheck, Lock, FileText, Scale } from "lucide-react";
import { acceptLegalAcknowledgement } from "@/functions/acceptLegalAcknowledgement";

export interface LegalAcknowledgementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgree: () => void;
}

export function LegalAcknowledgementModal({
  open,
  onOpenChange,
  onAgree,
}: LegalAcknowledgementModalProps) {
  const [agreedRep, setAgreedRep] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedSharing, setAgreedSharing] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const allRequiredChecked = agreedRep && agreedTerms && agreedPrivacy && agreedSharing;

  const handleSelectAllRequired = (checked: boolean) => {
    setAgreedRep(checked);
    setAgreedTerms(checked);
    setAgreedPrivacy(checked);
    setAgreedSharing(checked);
  };

  const handleAgreeAndContinue = async () => {
    if (!allRequiredChecked) return;
    try {
      localStorage.setItem(
        "relay.legal_ack_accepted.v1",
        JSON.stringify({
          acceptedAt: new Date().toISOString(),
          version: "1.0.0",
          acceptanceTypes: [
            "BUSINESS_AUTHORITY",
            "BUSINESS_INFORMATION_ACCURACY",
            "TERMS_OF_SERVICE",
            "PRIVACY_POLICY_ACKNOWLEDGEMENT",
            "OPPORTUNITY_SHARING_ACKNOWLEDGEMENT",
            ...(marketingConsent ? ["MARKETING_EMAIL_CONSENT"] : []),
          ],
          marketingConsent,
        })
      );
    } catch (_) {}

    try {
      await acceptLegalAcknowledgement({ data: { marketingConsent } });
    } catch (err) {
      console.error("[LegalAcknowledgement] Server sync error:", err);
    }

    onAgree();
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#9d4300]" />
          <span>Before you join Relay</span>
        </div>
      }
      description="Relay is a business opportunity exchange platform. Please review and acknowledge the following legal framework and terms before continuing."
      maxWidth="max-w-[660px]"
      className="h-[80dvh] min-h-[80dvh] sm:h-auto sm:min-h-0"
      footer={
        <div className="w-full flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 font-sans hidden sm:block">
            {allRequiredChecked ? (
              <span className="text-emerald-700 font-medium">All required acknowledgements completed</span>
            ) : (
              <span>Please check all required items (*) to proceed</span>
            )}
          </div>
          <Button
            type="button"
            variant="monochrome"
            size="default"
            disabled={!allRequiredChecked}
            onClick={handleAgreeAndContinue}
            className="w-full sm:w-auto px-6 font-medium"
          >
            I Agree &amp; Continue
          </Button>
        </div>
      }
    >
      <div className="space-y-3.5 font-sans text-left flex flex-col min-h-0 flex-1">
        {/* Scrollable Comprehensive Document Box */}
        <div className="min-h-[200px] flex-1 max-h-[38vh] sm:max-h-[260px] overflow-y-auto p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 space-y-3.5 leading-relaxed select-text font-sans overscroll-contain">
          
          <div className="border-b border-slate-200 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-[13px]">
              <Scale className="w-4 h-4 text-[#9d4300] shrink-0" />
              <span>Relay Business Onboarding Legal Framework</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wide">v1.0 • DPDP &amp; GDPR</span>
          </div>

          {/* 1. Purpose and Scope */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs">1. Purpose, Platform Model &amp; Scope</h4>
            <p className="mt-1 text-[11.5px] sm:text-xs">
              Relay operates as a curated B2B exchange network designed for verified enterprises, agencies, and operators. The platform facilitates discovery, bilateral negotiation, and reciprocal opportunities ("Handshakes"). Relay is neither an employer, broker, nor commercial agent for any participant.
            </p>
          </div>

          {/* 2. Business Authority & Accuracy */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs">2. Business Representation &amp; Authority (Sections 4 – 6)</h4>
            <ul className="list-disc pl-4 mt-1 space-y-1 text-[11.5px] sm:text-xs">
              <li>
                <strong>Corporate Authority:</strong> You confirm and warrant that you are legally authorized to act on behalf of the registered business entity and enter into binding platform terms.
              </li>
              <li>
                <strong>Information Accuracy:</strong> All corporate credentials, company name, registration details, website domains, and identity parameters submitted are truthful, current, and complete.
              </li>
              <li>
                <strong>Identity Verification:</strong> You agree to platform vetting standards, domain ownership validation, and manual KYB desk verification requirements.
              </li>
            </ul>
          </div>

          {/* 3. Opportunity Sharing & Data Lawfulness */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs">3. Opportunity Sharing &amp; Data Protection Compliance (Sections 7 – 10)</h4>
            <ul className="list-disc pl-4 mt-1 space-y-1 text-[11.5px] sm:text-xs">
              <li>
                <strong>Lawful Opportunity Data:</strong> You are strictly responsible for ensuring that all deal parameters, client referrals, collaboration requests, and materials submitted may lawfully be shared and exchanged under applicable privacy laws (including India's Digital Personal Data Protection Act, 2023 / 2025 Rules and EU GDPR).
              </li>
              <li>
                <strong>No Unauthorized Personal Data:</strong> You warrant that you will not upload unauthorized third-party personal data, unconsented confidential records, or proprietary trade secrets belonging to non-consenting parties.
              </li>
            </ul>
          </div>

          {/* 4. Privacy by Default & Bilateral Masking */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs">4. Bilateral Masking &amp; Handshake Protocol (Sections 11 – 14)</h4>
            <ul className="list-disc pl-4 mt-1 space-y-1 text-[11.5px] sm:text-xs">
              <li>
                <strong>Privacy by Default:</strong> Direct company contact credentials (emails, phone numbers, direct identities) remain blinded across public feeds until bilateral mutual interest is confirmed.
              </li>
              <li>
                <strong>Stage 4 Handshake Consent:</strong> Contact sharing is granular and field-specific. Contact values are exchanged only after mutual reciprocal confirmation by both businesses.
              </li>
            </ul>
          </div>

          {/* 5. Commercial Exchange Disclaimer */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs">5. Commercial Exchange Disclaimer &amp; Non-Guarantee (Section 15)</h4>
            <p className="mt-1 text-[11.5px] sm:text-xs">
              Relay facilitates workflow discovery, negotiation, and Handshakes between independent businesses. Relay does not evaluate commercial fairness, nor guarantee payment, conversion, revenue, delivery, fulfillment, or counterparty performance. Businesses execute separate commercial contracts for underlying engagements.
            </p>
          </div>

          {/* 6. Prohibited Use */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs">6. Prohibited Conduct &amp; Platform Integrity (Section 16)</h4>
            <p className="mt-1 text-[11.5px] sm:text-xs">
              Users agree not to: (a) impersonate any person or entity; (b) publish false, misleading, or deceptive opportunities; (c) engage in spamming, harassment, or manipulation; or (d) circumvent platform masking, security mechanisms, or verification gates.
            </p>
          </div>

          {/* 7. Acceptance Audit Records */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs">7. Legal Audit Records &amp; Policy Versioning (Sections 18 – 20)</h4>
            <p className="mt-1 text-[11.5px] sm:text-xs">
              Mandatory legal acceptances are recorded with immutable timestamps, user identity hashes, document version numbers, and audit classifications.
            </p>
          </div>
        </div>

        {/* Section 21.5: Disclosure Callout */}
        <div className="p-2 sm:p-2.5 bg-amber-50/70 border border-amber-200/80 rounded text-[11px] text-amber-900 leading-normal">
          <span className="font-bold">Disclosure (Section 21.5):</span> Relay facilitates discovery, negotiation, agreement, and Handshake between Businesses. Relay does not guarantee payment, conversion, revenue, delivery, fulfilment, or performance by either Business.
        </div>

        {/* Section 21.3: Required Checkboxes */}
        <div className="space-y-2 pt-1 border-t border-slate-200">
          <div className="flex items-center justify-between pb-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Required Acknowledgements (Section 21.3)
            </span>
            <button
              type="button"
              onClick={() => handleSelectAllRequired(!allRequiredChecked)}
              className="text-[11px] text-[#9d4300] hover:underline font-medium cursor-pointer"
            >
              {allRequiredChecked ? "Uncheck All" : "Select All"}
            </button>
          </div>

          {/* 1. Authority Checkbox */}
          <label className="flex items-start gap-2.5 p-1 -mx-1 rounded cursor-pointer select-none hover:bg-slate-50 active:bg-slate-100 transition-colors">
            <Checkbox
              checked={agreedRep}
              onCheckedChange={(checked) => setAgreedRep(!!checked)}
              accent="black"
              className="mt-0.5"
            />
            <span className="text-xs text-slate-700 leading-snug">
              I confirm that I am authorised to represent this Business and that the information I provide is accurate. <span className="text-red-500">*</span>
            </span>
          </label>

          {/* 2. Terms Checkbox */}
          <label className="flex items-start gap-2.5 p-1 -mx-1 rounded cursor-pointer select-none hover:bg-slate-50 active:bg-slate-100 transition-colors">
            <Checkbox
              checked={agreedTerms}
              onCheckedChange={(checked) => setAgreedTerms(!!checked)}
              accent="black"
              className="mt-0.5"
            />
            <span className="text-xs text-slate-700 leading-snug">
              I have read and agree to the Relay Terms of Service. <span className="text-red-500">*</span>
            </span>
          </label>

          {/* 3. Privacy Checkbox */}
          <label className="flex items-start gap-2.5 p-1 -mx-1 rounded cursor-pointer select-none hover:bg-slate-50 active:bg-slate-100 transition-colors">
            <Checkbox
              checked={agreedPrivacy}
              onCheckedChange={(checked) => setAgreedPrivacy(!!checked)}
              accent="black"
              className="mt-0.5"
            />
            <span className="text-xs text-slate-700 leading-snug">
              I acknowledge the Relay Privacy Policy and understand how Relay processes personal data. <span className="text-red-500">*</span>
            </span>
          </label>

          {/* 4. Opportunity Sharing Checkbox */}
          <label className="flex items-start gap-2.5 p-1 -mx-1 rounded cursor-pointer select-none hover:bg-slate-50 active:bg-slate-100 transition-colors">
            <Checkbox
              checked={agreedSharing}
              onCheckedChange={(checked) => setAgreedSharing(!!checked)}
              accent="black"
              className="mt-0.5"
            />
            <span className="text-xs text-slate-700 leading-snug">
              I understand that I am responsible for ensuring that the Opportunities and information I submit may lawfully be shared and exchanged. <span className="text-red-500">*</span>
            </span>
          </label>

          {/* Section 21.4: Optional Marketing Checkbox */}
          <div className="pt-1.5 border-t border-slate-100">
            <label className="flex items-start gap-2.5 p-1 -mx-1 rounded cursor-pointer select-none hover:bg-slate-50 active:bg-slate-100 transition-colors">
              <Checkbox
                checked={marketingConsent}
                onCheckedChange={(checked) => setMarketingConsent(!!checked)}
                accent="black"
                className="mt-0.5"
              />
              <span className="text-xs text-slate-500 leading-snug">
                Send me Relay product updates and business-related communications. (Optional)
              </span>
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
}
