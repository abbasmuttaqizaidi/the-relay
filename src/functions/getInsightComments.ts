import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CommentService } from "../services/comment.service";
import { uuidSchema } from "../validators";

export const getInsightComments = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      item_type: z.enum(["question", "knowledge"]),
      item_id: uuidSchema,
    })
  )
  .handler(async ({ data }) => {
    return await CommentService.getComments(data.item_type, data.item_id);
  });
