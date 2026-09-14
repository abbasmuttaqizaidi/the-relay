import { createServerFn } from "@tanstack/react-start";
import { QuestionService } from "../services/question.service";
import { z } from "zod";

const getQuestionsSchema = z
  .object({
    topic: z.string().optional().nullable(),
    industry: z.string().optional().nullable(),
    search: z.string().optional().nullable(),
    status: z.string().optional().nullable(),
    sortBy: z.enum(["newest", "perspectives"]).optional().nullable(),
    limit: z.union([z.number(), z.string()]).optional().nullable(),
    offset: z.union([z.number(), z.string()]).optional().nullable(),
  })
  .optional();

export const getQuestions = createServerFn({ method: "GET" })
  .inputValidator(getQuestionsSchema)
  .handler(async ({ data }) => {
    const filters: any = {};
    if (data?.topic && data.topic !== "All" && data.topic !== "undefined") {
      filters.topic = data.topic;
    }
    if (data?.industry && data.industry !== "All" && data.industry !== "undefined") {
      filters.industry = data.industry;
    }
    if (data?.search && data.search !== "undefined" && data.search.trim()) {
      filters.search = data.search.trim();
    }
    if (
      data?.status &&
      data.status !== "all" &&
      data.status !== "undefined" &&
      (data.status === "open" || data.status === "closed")
    ) {
      filters.status = data.status;
    }
    if (data?.sortBy === "perspectives" || data?.sortBy === "newest") {
      filters.sortBy = data.sortBy;
    }
    if (data?.limit) {
      filters.limit = Number(data.limit);
    }
    if (data?.offset) {
      filters.offset = Number(data.offset);
    }

    return await QuestionService.getQuestions(filters);
  });

export type GetQuestionsFn = typeof getQuestions;
