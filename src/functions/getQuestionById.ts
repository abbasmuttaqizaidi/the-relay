import { createServerFn } from "@tanstack/react-start";
import { QuestionService } from "../services/question.service";
import { z } from "zod";

const getQuestionByIdSchema = z.object({
  question_id: z.string().min(1, "Identifier is required"),
});

export const getQuestionById = createServerFn({ method: "GET" })
  .inputValidator(getQuestionByIdSchema)
  .handler(async ({ data }) => {
    const question = await QuestionService.getQuestionById(data.question_id);
    if (!question) {
      throw new Error("Question not found");
    }
    return question;
  });

export type GetQuestionByIdFn = typeof getQuestionById;
