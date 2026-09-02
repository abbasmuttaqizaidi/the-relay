import { createServerFn } from "@tanstack/react-start";
import { BusinessService } from "../services/business.service";
import { z } from "zod";

const listNetworkFilterSchema = z
  .object({
    q: z.string().optional(),
    industry: z.string().optional(),
    stage: z.string().optional(),
    size: z.string().optional(),
    status: z.string().optional(),
  })
  .optional();

export const listNetworkBusinesses = createServerFn({ method: "GET" })
  .inputValidator(listNetworkFilterSchema)
  .handler(async ({ data }) => {
    return await BusinessService.listNetworkBusinesses(data || {});
  });

export type ListNetworkBusinessesFn = typeof listNetworkBusinesses;
