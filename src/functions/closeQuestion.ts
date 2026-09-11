import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { QuestionService } from "../services/question.service";
import { closeQuestionSchema } from "../validators";

export const closeQuestion = createServerFn({ method: "POST" })
  .inputValidator(closeQuestionSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch user's business
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("Precondition Failed: Business not found.");
    }

    // 3. Delegate to QuestionService
    return await QuestionService.closeQuestion(data.question_id, business.id);
  });

export type CloseQuestionFn = typeof closeQuestion;
