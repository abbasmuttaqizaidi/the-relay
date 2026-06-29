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
    const appUrl = process.env.APP_URL || "http://localhost:3000";

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
    const appUrl = process.env.APP_URL || "http://localhost:3000";

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
    targetOwnerEmail: string,
    opportunityTitle: string,
    pitchingCompanyName: string,
  ) {
    const subject = `New Interest in your Opportunity: ${opportunityTitle}`;
    const appUrl = process.env.APP_URL || "http://localhost:3000";

    const bodyHtml = `
      <h2 style="color: #de5609;">New Interest Received!</h2>
      <p>A verified operator from <strong>${pitchingCompanyName}</strong> has expressed interest in your opportunity: <strong>${opportunityTitle}</strong>.</p>
      <p>Please log in to your dashboard to review their pitch and accept or decline the handshake.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${appUrl}/requests/incoming" class="cta-button" style="color: #ffffff;">Review Handshake Request</a>
      </div>
    `;

    const html = this.wrapInBrandTemplate("New Interest Received — The Relay", bodyHtml);

    await this.sendEmail({
      to: targetOwnerEmail,
      subject,
      html,
      templateName: "interest_received",
      variables: { opportunityTitle, pitchingCompanyName },
    });
  }
}
