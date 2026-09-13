import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  validateAdminCredentials,
  createAdminSessionToken,
} from "../lib/admin-auth.server";

const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator(adminLoginSchema)
  .handler(async ({ data }) => {
    // 1. Verify credentials securely on the server
    const isValid = validateAdminCredentials(data.email, data.password);

    if (!isValid) {
      throw new Error("Invalid admin credentials.");
    }

    // 2. Generate cryptographically signed session token
    const token = createAdminSessionToken(data.email);

    return {
      success: true,
      token,
    };
  });

export type AdminLoginFn = typeof adminLogin;
