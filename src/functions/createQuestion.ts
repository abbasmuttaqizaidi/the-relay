import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { QuestionService } from "../services/question.service";
import { createQuestionSchema } from "../validators";

export const createQuestion = createServerFn({ method: "POST" })
  .inputValidator(createQuestionSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch user's business
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("Precondition Failed: You must register a business profile first.");
    }

    // 3. Verify business is approved
    if (business.status !== "approved") {
      throw new Error(
        `Forbidden: Your business profile is "${business.status}". Asking questions requires an approved business profile.`,
      );
    }

    // 4. Delegate to QuestionService
    return await QuestionService.createQuestion({
      business_id: business.id,
      title: data.title,
      description: data.description,
      topic: data.topic,
      desired_perspective: data.desired_perspective || null,
    });
  });

export type CreateQuestionFn = typeof createQuestion;
