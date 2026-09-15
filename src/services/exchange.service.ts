import { prisma } from "../db/prisma.server";
import {
  ExchangeType,
  ExchangeProposalStatus,
  ContactField,
} from "../types";
import { NotificationService } from "./notification.service";
import { EmailService } from "./email.service";
import { serverCache } from "../lib/server-cache";

export class ExchangeService {
  /**
   * Records acknowledgement from either the requesting business or the opportunity owner.
   */
  static async acknowledgeProcess(interestId: string, businessId: string) {
    const interest = await prisma.interest.findUnique({
      where: { id: interestId },
      include: {
        opportunity: {
          include: {
            business: true,
          },
        },
        requesting_business: true,
      },
    });

    if (!interest) {
      throw new Error("Interest request not found.");
    }

    const isRequester = interest.requesting_business_id === businessId;
    const isOwner = interest.opportunity.business_id === businessId;

    if (!isRequester && !isOwner) {
      throw new Error("Unauthorized: Your business is not a participant in this exchange.");
    }

    const now = new Date();
    const updateData: { requester_acknowledged_at?: Date; owner_acknowledged_at?: Date } = {};

    if (isRequester) {
      updateData.requester_acknowledged_at = now;
    } else {
      updateData.owner_acknowledged_at = now;
    }

    const updatedInterest = await prisma.interest.update({
      where: { id: interestId },
      data: updateData,
    });

    // Check if both parties have now acknowledged
    const bothAcknowledged =
      Boolean(updatedInterest.requester_acknowledged_at) &&
      Boolean(updatedInterest.owner_acknowledged_at);

    if (bothAcknowledged) {
      // Notify both parties that the exchange negotiation stage is unlocked
      try {
        await NotificationService.createNotification({
          user_id: interest.requesting_business.owner_user_id,
          title: "Exchange Negotiation Unlocked",
          description: `Both parties have acknowledged the exchange process for "${interest.opportunity.title}". You can now discuss and propose exchange terms.`,
        });

        await NotificationService.createNotification({
          user_id: interest.opportunity.business.owner_user_id,
          title: "Exchange Negotiation Unlocked",
          description: `Both parties have acknowledged the exchange process for "${interest.opportunity.title}". You can now discuss and propose exchange terms.`,
        });
      } catch (err) {
        console.error("[ExchangeService.acknowledgeProcess] Notification error:", err);
      }
    } else {
      // Notify the other party that one has acknowledged
      const recipientUserId = isRequester
        ? interest.opportunity.business.owner_user_id
        : interest.requesting_business.owner_user_id;
      const ackCompanyName = isRequester
        ? interest.requesting_business.company_name
        : interest.opportunity.business.company_name;

      try {
        await NotificationService.createNotification({
          user_id: recipientUserId,
          title: "Exchange Process Acknowledged",
          description: `${ackCompanyName} has acknowledged the exchange process for "${interest.opportunity.title}". Your acknowledgement is needed to proceed.`,
        });
      } catch (err) {
        console.error("[ExchangeService.acknowledgeProcess] Notification error:", err);
      }
    }

    return updatedInterest;
  }

  /**
   * Creates a new proposal or counter-proposal in the negotiation.
   */
  static async createProposal(params: {
    interest_id: string;
    proposing_business_id: string;
    exchange_type: ExchangeType;
    exchange_details: string;
    revenue_percentage?: number | null;
    fixed_amount?: number | null;
    currency?: string | null;
    additional_terms?: string | null;
  }) {
    const {
      interest_id,
      proposing_business_id,
      exchange_type,
      exchange_details,
      revenue_percentage,
      fixed_amount,
      currency,
      additional_terms,
    } = params;

    const interest = await prisma.interest.findUnique({
      where: { id: interest_id },
      include: {
        opportunity: {
          include: {
            business: true,
          },
        },
        requesting_business: true,
        exchange_proposals: {
          orderBy: { version: "desc" },
          take: 1,
        },
        exchange_agreement: true,
      },
    });

    if (!interest) {
      throw new Error("Interest request not found.");
    }

    if (interest.status === "declined" || interest.status === "withdrawn") {
      throw new Error(`Cannot propose terms for an interest request that is ${interest.status}.`);
    }

    // Both parties must have acknowledged the process
    if (!interest.requester_acknowledged_at || !interest.owner_acknowledged_at) {
      throw new Error("Both parties must acknowledge the exchange process before creating proposals.");
    }

    const isRequester = interest.requesting_business_id === proposing_business_id;
    const isOwner = interest.opportunity.business_id === proposing_business_id;

    if (!isRequester && !isOwner) {
      throw new Error("Unauthorized: Proposing business is not a participant in this exchange.");
    }

    const receiving_business_id = isRequester
      ? interest.opportunity.business_id
      : interest.requesting_business_id;

    // Check last proposal version
    const lastProposal = interest.exchange_proposals[0];
    const newVersion = lastProposal ? lastProposal.version + 1 : 1;

    // The Opportunity Owner does NOT create the first proposal. The interested business must submit the first proposal.
    if (!lastProposal && isOwner) {
      throw new Error("The interested business must submit the initial exchange proposal.");
    }

    // Use transaction to supersede pending proposals and invalidate unconfirmed agreements
    return await prisma.$transaction(async (tx) => {
      // Mark existing pending proposals as superseded / countered
      if (lastProposal && lastProposal.status === "pending_response") {
        await tx.exchangeProposal.update({
          where: { id: lastProposal.id },
          data: { status: "superseded" },
        });
      }

      // If there was a draft agreement, invalidate previous confirmations
      if (interest.exchange_agreement && interest.exchange_agreement.status === "draft") {
        await tx.exchangeAgreement.update({
          where: { id: interest.exchange_agreement.id },
          data: {
            status: "draft",
            owner_confirmed_at: null,
            requester_confirmed_at: null,
          },
        });
      }

      // Create new proposal
      const proposal = await tx.exchangeProposal.create({
        data: {
          interest_id,
          opportunity_id: interest.opportunity_id,
          proposing_business_id,
          receiving_business_id,
          exchange_type,
          exchange_details,
          revenue_percentage: revenue_percentage ?? null,
          fixed_amount: fixed_amount ?? null,
          currency: currency || "USD",
          additional_terms: additional_terms || null,
          version: newVersion,
          status: "pending_response",
        },
      });

      // Notify the recipient
      const recipientUserId = isRequester
        ? interest.opportunity.business.owner_user_id
        : interest.requesting_business.owner_user_id;
      const proposerName = isRequester
        ? interest.requesting_business.company_name
        : interest.opportunity.business.company_name;

      try {
        await NotificationService.createNotification({
          user_id: recipientUserId,
          title: newVersion === 1 ? "New Exchange Proposal" : "Counter Proposal Received",
          description: `${proposerName} sent a ${newVersion === 1 ? "proposal" : "counter-proposal"} for "${interest.opportunity.title}".`,
        });
      } catch (err) {
        console.error("[ExchangeService.createProposal] Notification error:", err);
      }

      return proposal;
    });
  }

  /**
   * Withdraws a pending exchange proposal by the proposing business.
   */
  static async withdrawProposal(proposalId: string, businessId: string) {
    const proposal = await prisma.exchangeProposal.findUnique({
      where: { id: proposalId },
      include: {
        interest: {
          include: {
            opportunity: {
              include: {
                business: true,
              },
            },
            requesting_business: true,
          },
        },
        proposing_business: true,
        receiving_business: true,
      },
    });

    if (!proposal) {
      throw new Error("Proposal not found.");
    }

    if (proposal.status !== "pending_response") {
      throw new Error(`Cannot withdraw a proposal with status ${proposal.status}.`);
    }

    if (proposal.proposing_business_id !== businessId) {
      throw new Error("Unauthorized: Only the proposing business can withdraw this proposal.");
    }

    const updated = await prisma.exchangeProposal.update({
      where: { id: proposalId },
      data: { status: "cancelled" },
    });

    try {
      await NotificationService.createNotification({
        user_id: proposal.receiving_business.owner_user_id,
        title: "Proposal Withdrawn",
        description: `${proposal.proposing_business.company_name} withdrew their exchange proposal for "${proposal.interest.opportunity.title}".`,
      });
    } catch (err) {
      console.error("[ExchangeService.withdrawProposal] Notification error:", err);
    }

    return updated;
  }

  /**
   * Responds to a proposal (Accept or Decline).
   */
  static async respondProposal(
    proposalId: string,
    businessId: string,
    action: "accept" | "decline",
    declineReason?: string | null,
    declineNote?: string | null
  ) {
    const proposal = await prisma.exchangeProposal.findUnique({
      where: { id: proposalId },
      include: {
        interest: {
          include: {
            opportunity: {
              include: {
                business: true,
              },
            },
            requesting_business: true,
          },
        },
        proposing_business: true,
        receiving_business: true,
      },
    });

    if (!proposal) {
      throw new Error("Proposal not found.");
    }

    if (proposal.status !== "pending_response") {
      throw new Error(`Cannot respond to a proposal with status ${proposal.status}.`);
    }

    if (proposal.receiving_business_id !== businessId) {
      throw new Error("Unauthorized: Only the receiving business can respond to this proposal.");
    }

    const { interest } = proposal;

    if (action === "decline") {
      const formattedTerms = declineReason
        ? `[DECLINE REASON: ${declineReason}]${declineNote ? ` Note: ${declineNote}` : ""}${proposal.additional_terms ? ` | Original Terms: ${proposal.additional_terms}` : ""}`
        : proposal.additional_terms;

      const updated = await prisma.exchangeProposal.update({
        where: { id: proposalId },
        data: {
          status: "declined",
          additional_terms: formattedTerms,
        },
      });

      const reasonFormatted = declineReason
        ? declineReason === "valuation_mismatch"
          ? "Commercial terms / Valuation mismatch"
          : declineReason === "exchange_type_unsuitable"
          ? "Exchange type not suitable"
          : declineReason === "timeline_conflict"
          ? "Timeline / Capacity conflict"
          : declineReason === "scope_unclear"
          ? "Scope needs more clarity"
          : "Other reason"
        : null;

      try {
        await NotificationService.createNotification({
          user_id: proposal.proposing_business.owner_user_id,
          title: "Proposal Declined",
          description: `${proposal.receiving_business.company_name} declined the exchange proposal for "${interest.opportunity.title}".${reasonFormatted ? ` Reason: ${reasonFormatted}` : ""}${declineNote ? ` ("${declineNote}")` : ""}`,
        });
      } catch (err) {
        console.error("[ExchangeService.respondProposal] Notification error:", err);
      }

      return updated;
    }

    // Action: ACCEPT
    // Atomic transaction creates/updates ExchangeAgreement and marks proposal accepted
    return await prisma.$transaction(async (tx) => {
      const acceptedProposal = await tx.exchangeProposal.update({
        where: { id: proposalId },
        data: { status: "accepted" },
      });

      const isReceiverOwner = interest.opportunity.business_id === businessId;

      // Upsert ExchangeAgreement
      const agreement = await tx.exchangeAgreement.upsert({
        where: { interest_id: interest.id },
        create: {
          interest_id: interest.id,
          opportunity_id: interest.opportunity_id,
          final_proposal_id: acceptedProposal.id,
          owner_business_id: interest.opportunity.business_id,
          interested_business_id: interest.requesting_business_id,
          exchange_type: acceptedProposal.exchange_type,
          exchange_details: acceptedProposal.exchange_details,
          revenue_percentage: acceptedProposal.revenue_percentage,
          fixed_amount: acceptedProposal.fixed_amount,
          currency: acceptedProposal.currency,
          additional_terms: acceptedProposal.additional_terms,
          status: "draft",
          // The accepting party is agreeing to these terms
          owner_confirmed_at: isReceiverOwner ? new Date() : null,
          requester_confirmed_at: !isReceiverOwner ? new Date() : null,
        },
        update: {
          final_proposal_id: acceptedProposal.id,
          exchange_type: acceptedProposal.exchange_type,
          exchange_details: acceptedProposal.exchange_details,
          revenue_percentage: acceptedProposal.revenue_percentage,
          fixed_amount: acceptedProposal.fixed_amount,
          currency: acceptedProposal.currency,
          additional_terms: acceptedProposal.additional_terms,
          status: "draft",
          owner_confirmed_at: isReceiverOwner ? new Date() : null,
          requester_confirmed_at: !isReceiverOwner ? new Date() : null,
        },
      });

      // Notify both parties to confirm final terms
      try {
        await NotificationService.createNotification({
          user_id: proposal.proposing_business.owner_user_id,
          title: "Proposal Accepted — Final Confirmation Needed",
          description: `${proposal.receiving_business.company_name} accepted your proposal for "${interest.opportunity.title}". Please confirm the final exchange terms.`,
        });

        await NotificationService.createNotification({
          user_id: proposal.receiving_business.owner_user_id,
          title: "Final Confirmation Required",
          description: `You accepted the proposal for "${interest.opportunity.title}". Please review and confirm the final exchange terms.`,
        });
      } catch (err) {
        console.error("[ExchangeService.respondProposal] Notification error:", err);
      }

      return { proposal: acceptedProposal, agreement };
    });
  }

  /**
   * Confirms the final exchange agreement.
   * When both parties confirm the EXACT same proposal, status becomes 'agreed' and interest becomes 'accepted'.
   */
  static async confirmAgreement(interestId: string, proposalId: string, businessId: string) {
    return await prisma.$transaction(async (tx) => {
      const agreement = await tx.exchangeAgreement.findUnique({
        where: { interest_id: interestId },
        include: {
          interest: {
            include: {
              opportunity: {
                include: {
                  business: true,
                },
              },
              requesting_business: true,
            },
          },
        },
      });

      if (!agreement) {
        throw new Error("Exchange agreement not found.");
      }

      if (agreement.final_proposal_id !== proposalId) {
        throw new Error("Conflict: The proposal being confirmed is no longer the active accepted proposal.");
      }

      const isOwner = agreement.owner_business_id === businessId;
      const isRequester = agreement.interested_business_id === businessId;

      if (!isOwner && !isRequester) {
        throw new Error("Unauthorized: Business is not part of this agreement.");
      }

      const now = new Date();
      const updateData: {
        owner_confirmed_at?: Date;
        requester_confirmed_at?: Date;
        status?: string;
        agreed_at?: Date;
      } = {};

      if (isOwner) {
        updateData.owner_confirmed_at = now;
      }
      if (isRequester) {
        updateData.requester_confirmed_at = now;
      }

      const willBeBothConfirmed =
        (isOwner ? true : Boolean(agreement.owner_confirmed_at)) &&
        (isRequester ? true : Boolean(agreement.requester_confirmed_at));

      if (willBeBothConfirmed) {
        updateData.status = "agreed";
        updateData.agreed_at = now;
      }

      const updatedAgreement = await tx.exchangeAgreement.update({
        where: { id: agreement.id },
        data: updateData,
      });

      if (willBeBothConfirmed) {
        // Update interest status to accepted
        await tx.interest.update({
          where: { id: interestId },
          data: { status: "accepted" },
        });

        // Notify both parties that Agreement is finalized and Contact Sharing is active
        try {
          await NotificationService.createNotification({
            user_id: agreement.interest.opportunity.business.owner_user_id,
            title: "Exchange Terms Confirmed",
            description: `Exchange terms for "${agreement.interest.opportunity.title}" are mutually agreed! Choose which contact details to share.`,
          });

          await NotificationService.createNotification({
            user_id: agreement.interest.requesting_business.owner_user_id,
            title: "Exchange Terms Confirmed",
            description: `Exchange terms for "${agreement.interest.opportunity.title}" are mutually agreed! Choose which contact details to share.`,
          });
        } catch (err) {
          console.error("[ExchangeService.confirmAgreement] Notification error:", err);
        }
      }

      return updatedAgreement;
    });
  }

  /**
   * Submits contact fields a business is willing to share.
   */
  static async shareContactConsent(interestId: string, businessId: string, fields: ContactField[]) {
    const interest = await prisma.interest.findUnique({
      where: { id: interestId },
      include: {
        opportunity: {
          include: {
            business: true,
          },
        },
        requesting_business: true,
        exchange_agreement: true,
      },
    });

    if (!interest) {
      throw new Error("Interest request not found.");
    }

    if (!interest.exchange_agreement || interest.exchange_agreement.status !== "agreed") {
      throw new Error("Contact sharing is only permitted after exchange terms are mutually confirmed.");
    }

    const isRequester = interest.requesting_business_id === businessId;
    const isOwner = interest.opportunity.business_id === businessId;

    if (!isRequester && !isOwner) {
      throw new Error("Unauthorized: Business is not a participant in this exchange.");
    }

    const to_business_id = isRequester
      ? interest.opportunity.business_id
      : interest.requesting_business_id;

    // Upsert consent for each selected field
    const results = await prisma.$transaction(
      fields.map((field) =>
        prisma.contactSharingConsent.upsert({
          where: {
            interest_id_from_business_id_contact_field: {
              interest_id: interestId,
              from_business_id: businessId,
              contact_field: field,
            },
          },
          create: {
            interest_id: interestId,
            from_business_id: businessId,
            to_business_id,
            contact_field: field,
            status: "requested",
          },
          update: {
            status: "requested",
            requested_at: new Date(),
          },
        })
      )
    );

    // Notify recipient
    const recipientUserId = isRequester
      ? interest.opportunity.business.owner_user_id
      : interest.requesting_business.owner_user_id;
    const senderName = isRequester
      ? interest.requesting_business.company_name
      : interest.opportunity.business.company_name;

    try {
      await NotificationService.createNotification({
        user_id: recipientUserId,
        title: "Contact Sharing Request",
        description: `${senderName} has chosen contact details to share with you for "${interest.opportunity.title}". Review and accept to connect.`,
      });
    } catch (err) {
      console.error("[ExchangeService.shareContactConsent] Notification error:", err);
    }

    return results;
  }

  /**
   * Accepts contact fields shared by the other business.
   */
  static async acceptContactConsent(interestId: string, businessId: string, fields: ContactField[]) {
    const interest = await prisma.interest.findUnique({
      where: { id: interestId },
      include: {
        opportunity: {
          include: {
            business: true,
          },
        },
        requesting_business: true,
        exchange_agreement: true,
      },
    });

    if (!interest) {
      throw new Error("Interest request not found.");
    }

    const isRequester = interest.requesting_business_id === businessId;
    const isOwner = interest.opportunity.business_id === businessId;

    if (!isRequester && !isOwner) {
      throw new Error("Unauthorized: Business is not a participant in this exchange.");
    }

    const now = new Date();

    // Update the consents where to_business_id === businessId and contact_field in fields
    const updated = await prisma.$transaction(
      fields.map((field) =>
        prisma.contactSharingConsent.updateMany({
          where: {
            interest_id: interestId,
            to_business_id: businessId,
            contact_field: field,
          },
          data: {
            status: "accepted",
            accepted_at: now,
          },
        })
      )
    );

    // Notify sender that contacts were accepted
    const senderUserId = isRequester
      ? interest.opportunity.business.owner_user_id
      : interest.requesting_business.owner_user_id;
    const acceptorName = isRequester
      ? interest.requesting_business.company_name
      : interest.opportunity.business.company_name;

    try {
      await NotificationService.createNotification({
        user_id: senderUserId,
        title: "Contact Sharing Accepted",
        description: `${acceptorName} accepted your shared contact details for "${interest.opportunity.title}".`,
      });
    } catch (err) {
      console.error("[ExchangeService.acceptContactConsent] Notification error:", err);
    }

    return updated;
  }

  /**
   * Sends an acknowledgement follow-up reminder to the other business.
   * Server-side enforces that 2 hours have passed since the requester's acknowledgement.
   */
  static async sendFollowUp(interestId: string, businessId: string) {
    const interest = await prisma.interest.findUnique({
      where: { id: interestId },
      include: {
        opportunity: {
          include: {
            business: true,
          },
        },
        requesting_business: true,
      },
    });

    if (!interest) {
      throw new Error("Interest request not found.");
    }

    const isRequester = interest.requesting_business_id === businessId;
    if (!isRequester) {
      throw new Error("Unauthorized: Only the requesting business can send an acknowledgement follow-up.");
    }

    if (!interest.requester_acknowledged_at) {
      throw new Error("You must acknowledge the exchange process before following up.");
    }

    if (interest.owner_acknowledged_at) {
      throw new Error("The partner business has already acknowledged the exchange process.");
    }

    if (interest.status !== "pending") {
      throw new Error(`Cannot send follow-up for an interest that is ${interest.status}.`);
    }

    const now = Date.now();
    const ackTime = new Date(interest.requester_acknowledged_at).getTime();
    const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

    if (now - ackTime < TWO_HOURS_MS) {
      throw new Error("Follow-up becomes available exactly 2 hours after acknowledging the exchange process.");
    }

    if (interest.last_follow_up_at) {
      const lastFollowUp = new Date(interest.last_follow_up_at).getTime();
      const COOLDOWN_MS = 24 * 60 * 60 * 1000;
      if (now - lastFollowUp < COOLDOWN_MS) {
        throw new Error("A follow-up has already been sent recently. Please allow time for the partner to respond.");
      }
    }

    const updatedInterest = await prisma.interest.update({
      where: { id: interestId },
      data: {
        last_follow_up_at: new Date(),
      },
    });

    // Notify the opportunity owner
    try {
      await NotificationService.createNotification({
        user_id: interest.opportunity.business.owner_user_id,
        title: "Follow-Up: Acknowledgement Pending",
        description: `${interest.requesting_business.company_name} sent a reminder regarding their interest in "${interest.opportunity.title}". Please review and acknowledge the exchange process.`,
      });
    } catch (err) {
      console.error("[ExchangeService.sendFollowUp] Notification error:", err);
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "Exchange Follow-Up Sent",
        details: `Follow-up sent by ${interest.requesting_business.company_name} to ${interest.opportunity.business.company_name} for opportunity "${interest.opportunity.title}"`,
      },
    });

    return updatedInterest;
  }

  /**
   * Checks and processes 7-day unresponsiveness for an interest request.
   * If unresponsive, marks status as 'unresponsive', records 1 ReliabilityEvent,
   * and restricts business if >= 3 events accumulated.
   */
  static async checkAndProcessUnresponsive(interestId: string) {
    const interest = await prisma.interest.findUnique({
      where: { id: interestId },
      include: {
        opportunity: {
          include: {
            business: true,
          },
        },
        requesting_business: true,
      },
    });

    if (!interest) return null;

    if (interest.status !== "pending" || interest.owner_acknowledged_at) {
      return interest;
    }

    const now = Date.now();
    const createdTime = new Date(interest.created_at).getTime();
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

    if (now - createdTime < SEVEN_DAYS_MS) {
      return interest;
    }

    const ownerBusinessId = interest.opportunity.business_id;

    return await prisma.$transaction(async (tx) => {
      const updated = await tx.interest.update({
        where: { id: interestId },
        data: { status: "unresponsive" },
      });

      const existingEvent = await tx.reliabilityEvent.findUnique({
        where: {
          interest_id_business_id: {
            interest_id: interestId,
            business_id: ownerBusinessId,
          },
        },
      });

      if (!existingEvent) {
        await tx.reliabilityEvent.create({
          data: {
            interest_id: interestId,
            business_id: ownerBusinessId,
            reason: "unresponsive_7_days",
          },
        });

        const count = await tx.reliabilityEvent.count({
          where: { business_id: ownerBusinessId },
        });

        if (count >= 3) {
          await tx.business.update({
            where: { id: ownerBusinessId },
            data: { status: "restricted" },
          });

          serverCache.delete(`business:id:${ownerBusinessId}`);
          serverCache.delete(`business:owner:${interest.opportunity.business.owner_user_id}`);

          try {
            await NotificationService.createNotification({
              user_id: interest.opportunity.business.owner_user_id,
              title: "Participation Restricted",
              description:
                "Your business participation in Relay activities has been restricted due to 3 Response Violations. Your account has been flagged for Relay review.",
            });
          } catch (err) {
            console.error("[ExchangeService.unresponsive] Notification error:", err);
          }
        }
      }

      try {
        await NotificationService.createNotification({
          user_id: interest.requesting_business.owner_user_id,
          title: "Interest Marked Unresponsive",
          description: `${interest.opportunity.business.company_name} was unresponsive after 7 days for "${interest.opportunity.title}". We have suggested alternative opportunities for you.`,
        });
      } catch (err) {
        console.error("[ExchangeService.unresponsive] Notification error:", err);
      }

      await tx.activityLog.create({
        data: {
          action: "Interest Unresponsive",
          details: `Interest ${interestId} marked unresponsive after 7 days. Response violation recorded for business ${ownerBusinessId}.`,
        },
      });

      return updated;
    });
  }

  /**
   * Fetches alternative recommended opportunities for an unresponsive or pending interest.
   */
  static async getSuggestedOpportunities(opportunityId: string, requestingBusinessId: string) {
    const opp = await prisma.opportunity.findUnique({
      where: { id: opportunityId },
      select: { category: true, industry: true },
    });

    if (!opp) return [];

    const suggestions = await prisma.opportunity.findMany({
      where: {
        id: { not: opportunityId },
        business_id: { not: requestingBusinessId },
        status: "active",
        business: {
          status: "approved",
        },
        OR: [
          { category: opp.category },
          { industry: opp.industry },
        ],
      },
      include: {
        business: {
          select: {
            id: true,
            company_name: true,
            logo_url: true,
            industry: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
      take: 4,
    });

    return suggestions.map((s) => ({
      id: s.id,
      opportunity_number: s.opportunity_number,
      title: s.title,
      description: s.description,
      category: s.category,
      industry: s.industry,
      location: s.location,
      offer_text: s.offer_text,
      business: s.business,
      created_at: s.created_at.toISOString(),
    }));
  }

  /**
   * Fetches the complete exchange state with strict server-side contact authorization and filtering.
   */
  static async getExchangeDetails(interestId: string, authenticatedBusinessId: string) {
    // 1. First process unresponsiveness check if 7 days have passed
    await ExchangeService.checkAndProcessUnresponsive(interestId);

    const interest = await prisma.interest.findUnique({
      where: { id: interestId },
      include: {
        opportunity: {
          include: {
            business: {
              include: {
                owner: {
                  select: {
                    id: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        requesting_business: {
          include: {
            owner: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
        exchange_proposals: {
          orderBy: { version: "desc" },
          include: {
            proposing_business: {
              select: {
                id: true,
                company_name: true,
                logo_url: true,
                industry: true,
              },
            },
            receiving_business: {
              select: {
                id: true,
                company_name: true,
                logo_url: true,
                industry: true,
              },
            },
          },
        },
        exchange_agreement: true,
        contact_consents: true,
      },
    });

    if (!interest) {
      throw new Error("Exchange details not found.");
    }

    const isRequester = interest.requesting_business_id === authenticatedBusinessId;
    const isOwner = interest.opportunity.business_id === authenticatedBusinessId;

    if (!isRequester && !isOwner) {
      throw new Error("Unauthorized: You do not have access to these exchange details.");
    }

    // Determine authorized fields for the other business
    const otherBusinessId = isRequester
      ? interest.opportunity.business_id
      : interest.requesting_business_id;

    const consentsFromOtherToMe = interest.contact_consents.filter(
      (c) =>
        c.from_business_id === otherBusinessId &&
        c.to_business_id === authenticatedBusinessId &&
        c.status === "accepted"
    );

    const allowedFieldsForOther = new Set(consentsFromOtherToMe.map((c) => c.contact_field));

    // Backward compatibility: Legacy handshakes (accepted interest with no agreement & consents)
    const isLegacyHandshake =
      interest.status === "accepted" &&
      !interest.exchange_agreement &&
      interest.contact_consents.length === 0;

    if (isLegacyHandshake) {
      allowedFieldsForOther.add("email");
    }

    // Filter target business contact information server-side
    const targetBusiness = isRequester
      ? interest.opportunity.business
      : interest.requesting_business;

    const filteredTargetContact: {
      email?: string | null;
      phone?: string | null;
      whatsapp?: string | null;
      linkedin?: string | null;
      twitter?: string | null;
    } = {};

    if (allowedFieldsForOther.has("email")) {
      filteredTargetContact.email =
        targetBusiness.contact_email || targetBusiness.owner?.email || null;
    }
    if (allowedFieldsForOther.has("linkedin")) {
      filteredTargetContact.linkedin = targetBusiness.linkedin_url || null;
    }
    if (allowedFieldsForOther.has("twitter")) {
      filteredTargetContact.twitter = targetBusiness.twitter_url || null;
    }

    // Strip raw sensitive fields from the other business object before sending to client
    if (isRequester) {
      if (!allowedFieldsForOther.has("email")) {
        interest.opportunity.business.contact_email = null;
        if (interest.opportunity.business.owner) {
          interest.opportunity.business.owner.email = null;
        }
      }
      if (!allowedFieldsForOther.has("linkedin")) {
        interest.opportunity.business.linkedin_url = null;
      }
      if (!allowedFieldsForOther.has("twitter")) {
        interest.opportunity.business.twitter_url = null;
      }
    } else {
      if (!allowedFieldsForOther.has("email")) {
        interest.requesting_business.contact_email = null;
        if (interest.requesting_business.owner) {
          interest.requesting_business.owner.email = null;
        }
      }
      if (!allowedFieldsForOther.has("linkedin")) {
        interest.requesting_business.linkedin_url = null;
      }
      if (!allowedFieldsForOther.has("twitter")) {
        interest.requesting_business.twitter_url = null;
      }
    }

    // Timing calculations
    const now = Date.now();
    const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

    const requesterAckTime = interest.requester_acknowledged_at
      ? new Date(interest.requester_acknowledged_at).getTime()
      : null;

    const canFollowUp =
      isRequester &&
      requesterAckTime !== null &&
      !interest.owner_acknowledged_at &&
      interest.status === "pending" &&
      now - requesterAckTime >= TWO_HOURS_MS;

    const followUpAvailableAt = requesterAckTime
      ? new Date(requesterAckTime + TWO_HOURS_MS).toISOString()
      : null;

    const createdTime = new Date(interest.created_at).getTime();
    const responseDeadline = new Date(createdTime + SEVEN_DAYS_MS).toISOString();

    // Fetch suggested opportunities if waiting or unresponsive
    let suggestedOpportunities: any[] = [];
    if (isRequester && (!interest.owner_acknowledged_at || interest.status === "unresponsive")) {
      suggestedOpportunities = await ExchangeService.getSuggestedOpportunities(
        interest.opportunity_id,
        interest.requesting_business_id
      );
    }

    return {
      interest: {
        id: interest.id,
        opportunity_id: interest.opportunity_id,
        requesting_business_id: interest.requesting_business_id,
        message: interest.message,
        status: interest.status,
        requester_acknowledged_at: interest.requester_acknowledged_at?.toISOString() || null,
        owner_acknowledged_at: interest.owner_acknowledged_at?.toISOString() || null,
        last_follow_up_at: interest.last_follow_up_at?.toISOString() || null,
        created_at: interest.created_at.toISOString(),
        updated_at: interest.updated_at.toISOString(),
      },
      opportunity: interest.opportunity,
      requesting_business: interest.requesting_business,
      owner_business: interest.opportunity.business,
      is_requester: isRequester,
      is_owner: isOwner,
      proposals: interest.exchange_proposals.map((p) => ({
        ...p,
        created_at: p.created_at.toISOString(),
        updated_at: p.updated_at.toISOString(),
      })),
      agreement: interest.exchange_agreement
        ? {
            ...interest.exchange_agreement,
            owner_confirmed_at: interest.exchange_agreement.owner_confirmed_at?.toISOString() || null,
            requester_confirmed_at:
              interest.exchange_agreement.requester_confirmed_at?.toISOString() || null,
            agreed_at: interest.exchange_agreement.agreed_at?.toISOString() || null,
            created_at: interest.exchange_agreement.created_at.toISOString(),
            updated_at: interest.exchange_agreement.updated_at.toISOString(),
          }
        : null,
      consents: interest.contact_consents.map((c) => ({
        ...c,
        requested_at: c.requested_at.toISOString(),
        accepted_at: c.accepted_at?.toISOString() || null,
        created_at: c.created_at.toISOString(),
        updated_at: c.updated_at.toISOString(),
      })),
      allowed_revealed_contacts: filteredTargetContact,
      is_legacy_handshake: isLegacyHandshake,
      can_follow_up: canFollowUp,
      follow_up_available_at: followUpAvailableAt,
      has_followed_up: Boolean(interest.last_follow_up_at),
      response_deadline: responseDeadline,
      suggested_opportunities: suggestedOpportunities,
    };
  }
}
