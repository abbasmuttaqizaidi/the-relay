import { createServerFn } from "@tanstack/react-start";
import { BusinessService } from "../services/business.service";

export const getVerifiedBusinessCount = createServerFn({ method: "GET" }).handler(async () => {
  return await BusinessService.getVerifiedBusinessCount(745);
});
