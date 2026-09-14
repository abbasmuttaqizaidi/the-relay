import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { QuestionService } from "../services/question.service";
import { updateQuestionSchema } from "../validators";

export const updateQuestion = createServerFn({ method: "POST" })
  .inputValidator(updateQuestionSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch user's business
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("Precondition Failed: Business not found.");
    }

    // 3. Delegate to QuestionService
    return await QuestionService.updateQuestion(data.question_id, business.id, {
      title: data.title,
      description: data.description,
      topic: data.topic,
      desired_perspective: data.desired_perspective,
      context_content_json: data.context_content_json,
    });
  });

export type UpdateQuestionFn = typeof updateQuestion;
