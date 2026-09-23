import { Resend } from "resend";
import { getServerConfig } from "../lib/config.server";

export class EmailService {
  private static getResendClient(): Resend | null {
    const config = getServerConfig();
    const apiKey = config.resendApiKey;
    if (!apiKey) {
      return null;
    }
    return new Resend(apiKey);
  }

  private static getFromEmail(): string {
    return process.env.EMAIL_FROM || "The Relay <updates@usetherelay.com>";
  }

  /**
   * Send an email using Resend if the API key is configured,
   * otherwise log a fallback placeholder message to console.
   */
  private static async sendEmail(params: {
    to: string;
    subject: string;
    html: string;
    templateName: string;
    variables?: Record<string, unknown>;
  }) {
    const from = this.getFromEmail();
    const resend = this.getResendClient();

    if (resend) {
      try {
        await resend.emails.send({
          from,
          to: [params.to],
          subject: params.subject,
          html: params.html,
        });
        console.log(
          `[Resend] Successfully sent email to ${params.to} using template: ${params.templateName}`,
        );
      } catch (error) {
        console.error(
          `[Resend] Failed to send email to ${params.to} using template ${params.templateName}:`,
          error,
        );
      }
    } else {
      console.log(
        `[EMAIL PLACEHOLDER] (Resend API Key Missing/Not Configured)
        - Template: ${params.templateName}
        - From: ${from}
        - To: ${params.to}
        - Subject: ${params.subject}
        - Variables: ${JSON.stringify(params.variables || {})}`,
      );
    }
  }

  private static wrapInBrandTemplate(headerTitle: string, bodyHtml: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${headerTitle}</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: #f8f9fa;
              color: #171e26;
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
            }
            .wrapper {
              width: 100%;
              table-layout: fixed;
              background-color: #f8f9fa;
              padding: 40px 0;
            }
            .container {
              max-width: 600px;
              background-color: #ffffff;
              margin: 0 auto;
              border: 1px solid rgba(23, 30, 38, 0.12);
              border-radius: 4px;
              overflow: hidden;
            }
            .header {
              background-color: #de5609; /* Operator Orange */
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              color: #ffffff;
              font-size: 24px;
              font-weight: 800;
              margin: 0;
              letter-spacing: -0.5px;
            }
            .content {
              padding: 40px 30px;
              line-height: 1.6;
            }
            .content h2 {
              font-size: 20px;
              font-weight: 700;
              color: #171e26;
              margin-top: 0;
              margin-bottom: 20px;
            }
            .content p {
              font-size: 15px;
              color: #334155;
              margin-bottom: 20px;
            }
            .cta-button {
              display: inline-block;
              background-color: #de5609;
              color: #ffffff !important;
              text-decoration: none;
              padding: 12px 24px;
              font-weight: 700;
              font-size: 14px;
              border-radius: 2px;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin: 20px 0;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px 30px;
              border-top: 1px solid rgba(23, 30, 38, 0.12);
              text-align: center;
              font-size: 11px;
              color: #64748b;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <h1 style="color: #ffffff; margin: 0;">THE RELAY</h1>
              </div>
              <div class="content">
                ${bodyHtml}
              </div>
              <div class="footer">
                © 2026 The Relay Protocol · Double Opt-In Verified B2B Network
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  static async sendWelcomeEmail(toEmail: string, userName?: string) {
    const subject = "Welcome to The Relay — Where growth finds momentum";
    const appUrl = process.env.APP_URL || "https://usetherelay.com";

    const bodyHtml = `
      <h2>Welcome to the Network, ${userName || "Operator"}!</h2>
      <p>
        We are excited to have you join <strong>The Relay</strong> — a curated, high-trust network built specifically for verified founders, operators, and B2B leaders to exchange high-value partnerships, referrals, and vendors.
      </p>
      <p>
        Here, we replace noisy social feeds with a focused, two-sided double opt-in handshake. You can list opportunities or respond to existing requests from vetted peers.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${appUrl}/opportunities" class="cta-button" style="color: #ffffff;">Explore Opportunities</a>
      </div>
      <p style="font-size: 13px; color: #64748b;">
        Need help? View our interactive product tour or reply directly to this email to get in touch with our team.
      </p>
    `;

    const html = this.wrapInBrandTemplate(subject, bodyHtml);

    await this.sendEmail({
      to: toEmail,
      subject,
      html,
      templateName: "welcome_email",
      variables: { userName },
    });
  }

  static async sendBusinessApproved(ownerEmail: string, companyName: string) {
    const subject = `Your business profile "${companyName}" has been approved!`;
    const appUrl = process.env.APP_URL || "https://usetherelay.com";

    const bodyHtml = `
      <h2 style="color: #de5609;">Profile Approved</h2>
      <p>Your business profile for <strong>${companyName}</strong> has been successfully approved.</p>
      <p>You can now post opportunities, pitch warm introductions, and express interest on the platform.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${appUrl}/opportunities" class="cta-button" style="color: #ffffff;">Go to Opportunities</a>
      </div>
    `;

    const html = this.wrapInBrandTemplate("Profile Approved — The Relay", bodyHtml);

    await this.sendEmail({
      to: ownerEmail,
      subject,
      html,
      templateName: "business_approved",
      variables: { companyName },
    });
  }

  static async sendBusinessRejected(ownerEmail: string, companyName: string, reason?: string) {
    const subject = `Update regarding your business profile: ${companyName}`;

    const bodyHtml = `
      <h2>Profile Verification Update</h2>
      <p>Thank you for submitting your profile for <strong>${companyName}</strong>.</p>
      <p>Currently, our team was unable to approve your application.</p>
      <p><strong>Reason provided:</strong> ${reason || "Did not meet criteria"}</p>
      <p style="font-size: 13px; color: #64748b; margin-top: 30px;">
        If you have questions or want to update your application details, please contact us.
      </p>
    `;

    const html = this.wrapInBrandTemplate("Profile Update — The Relay", bodyHtml);

    await this.sendEmail({
      to: ownerEmail,
      subject,
      html,
      templateName: "business_rejected",
      variables: { companyName, reason: reason ?? "Did not meet criteria" },
    });
  }

  static async sendInterestReceived(
    targetOwnerEmailOrParams:
      | string
      | {
          targetOwnerEmail: string;
          opportunityTitle: string;
          pitchingCompanyName: string;
          proposedTerms?: string | null;
          valueCategories?: string[];
          deliveryMethods?: string[];
        },
    opportunityTitle?: string,
    pitchingCompanyName?: string,
  ) {
    let toEmail = "";
    let oppTitle = "";
    let companyName = "";
    let proposedTerms: string | null | undefined = null;
    let valueCategories: string[] = [];
    let deliveryMethods: string[] = [];

    if (typeof targetOwnerEmailOrParams === "object") {
      toEmail = targetOwnerEmailOrParams.targetOwnerEmail;
      oppTitle = targetOwnerEmailOrParams.opportunityTitle;
      companyName = targetOwnerEmailOrParams.pitchingCompanyName;
      proposedTerms = targetOwnerEmailOrParams.proposedTerms;
      valueCategories = targetOwnerEmailOrParams.valueCategories || [];
      deliveryMethods = targetOwnerEmailOrParams.deliveryMethods || [];
    } else {
      toEmail = targetOwnerEmailOrParams;
      oppTitle = opportunityTitle || "Opportunity";
      companyName = pitchingCompanyName || "A verified partner";
    }

    if (!toEmail) {
      console.warn("[EmailService.sendInterestReceived] Aborting: No recipient email provided.");
      return;
    }

    const subject = `New Proposal Received: ${oppTitle}`;
    const appUrl = process.env.APP_URL || "https://usetherelay.com";

    const bodyHtml = `
      <h2 style="color: #de5609;">New Proposal Received!</h2>
      <p>A verified operator from <strong>${companyName}</strong> has expressed interest and submitted terms for your opportunity: <strong>${oppTitle}</strong>.</p>
      ${
        proposedTerms
          ? `<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #de5609; border-radius: 4px; padding: 14px 18px; margin: 16px 0;">
              <span style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Proposed Terms</span>
              <p style="font-size: 14px; color: #1e293b; margin: 0; line-height: 1.5; font-style: italic;">&ldquo;${proposedTerms}&rdquo;</p>
            </div>`
          : ""
      }
      <p>Log in to your dashboard to review their proposed exchange structure and accept or counter the proposal.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${appUrl}/proposals?tab=received" class="cta-button" style="color: #ffffff;">Review Received Proposal</a>
      </div>
    `;

    const html = this.wrapInBrandTemplate("New Proposal Received — The Relay", bodyHtml);

    await this.sendEmail({
      to: toEmail,
      subject,
      html,
      templateName: "interest_received",
      variables: {
        opportunityTitle: oppTitle,
        pitchingCompanyName: companyName,
        proposedTerms,
        valueCategories,
        deliveryMethods,
      },
    });
  }

  static async sendHandshakeCompleteEmail(params: {
    toEmail: string;
    acceptingCompanyName: string;
    acceptingBusinessEmail: string;
    opportunityTitle: string;
    pitchMessage?: string | null;
  }) {
    const subject = `Handshake Complete — ${params.opportunityTitle}`;
    const appUrl = process.env.APP_URL || "https://usetherelay.com";

    const bodyHtml = `
      <h2 style="color: #de5609;">Handshake Complete</h2>
      <p><strong>${params.acceptingCompanyName}</strong> has accepted your interest in this opportunity.</p>
      <p>You can now contact them directly at:</p>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 14px 18px; margin: 16px 0;">
        <span style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Direct Contact Email</span>
        <a href="mailto:${params.acceptingBusinessEmail}" style="font-size: 15px; font-weight: 700; color: #0f172a; font-family: monospace; text-decoration: none;">${params.acceptingBusinessEmail}</a>
      </div>
      <div style="margin: 20px 0; border-top: 1px solid #e2e8f0; padding-top: 16px;">
        <p style="font-size: 12px; color: #64748b; margin-bottom: 4px; text-transform: uppercase; font-weight: 700;">Opportunity</p>
        <p style="font-size: 15px; font-weight: 700; color: #1e293b; margin-top: 0;">${params.opportunityTitle}</p>
        <p style="font-size: 12px; color: #64748b; margin-bottom: 4px; text-transform: uppercase; font-weight: 700; margin-top: 14px;">Your Message</p>
        <p style="font-size: 13.5px; font-style: italic; color: #334155; margin-top: 0; background: #f8fafc; padding: 10px 14px; border-left: 3px solid #cbd5e1;">&ldquo;${params.pitchMessage || "No additional message was provided."}&rdquo;</p>
      </div>
      <p style="font-size: 14px; color: #475569;">Log in to The Relay to view the full introduction.</p>
      <div style="text-align: center; margin: 28px 0;">
        <a href="${appUrl}/requests/sent" class="cta-button" style="color: #ffffff;">View Full Introduction</a>
      </div>
    `;

    const html = this.wrapInBrandTemplate(subject, bodyHtml);

    await this.sendEmail({
      to: params.toEmail,
      subject,
      html,
      templateName: "handshake_complete",
      variables: params,
    });
  }
}
