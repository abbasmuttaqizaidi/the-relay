import { getServerConfig } from "../lib/config.server";

export class EmailService {
  /**
   * Placeholder helper simulating the trigger of email sending.
   * Resend client can be integrated here in the future.
   */
  private static async sendPlaceholderEmail(params: {
    to: string;
    subject: string;
    templateName: string;
    variables: Record<string, unknown>;
  }) {
    const config = getServerConfig();
    const apiKey = config.resendApiKey;

    console.log(
      `[EMAIL PLACEHOLDER] Triggered email:
      - Template: ${params.templateName}
      - To: ${params.to}
      - Subject: ${params.subject}
      - Variables: ${JSON.stringify(params.variables)}
      - API Key Status: ${apiKey ? "CONFIGURED (Ready to enable)" : "MISSING (Development Mode)"}`,
    );

    // Future implementation:
    // if (apiKey) {
    //   const resend = new Resend(apiKey);
    //   await resend.emails.send({ ... });
    // }
  }

  static async sendBusinessApproved(ownerEmail: string, companyName: string) {
    await this.sendPlaceholderEmail({
      to: ownerEmail,
      subject: `Your business profile "${companyName}" has been approved!`,
      templateName: "business_approved",
      variables: { companyName },
    });
  }

  static async sendBusinessRejected(ownerEmail: string, companyName: string, reason?: string) {
    await this.sendPlaceholderEmail({
      to: ownerEmail,
      subject: `Update regarding your business profile: ${companyName}`,
      templateName: "business_rejected",
      variables: { companyName, reason: reason ?? "Did not meet criteria" },
    });
  }

  static async sendInterestReceived(
    targetOwnerEmail: string,
    opportunityTitle: string,
    pitchingCompanyName: string,
  ) {
    await this.sendPlaceholderEmail({
      to: targetOwnerEmail,
      subject: `New Interest in your Opportunity: ${opportunityTitle}`,
      templateName: "interest_received",
      variables: { opportunityTitle, pitchingCompanyName },
    });
  }
}
