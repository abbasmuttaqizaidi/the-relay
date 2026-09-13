import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { verifyAdminSession } from "../lib/admin-auth.server";

export const checkAdminSession = createServerFn({ method: "GET" })
  .handler(async () => {
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";
    const isValid = verifyAdminSession(cookieHeader);

    return {
      isAdmin: isValid,
    };
  });
