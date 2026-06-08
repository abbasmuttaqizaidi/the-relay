import { createServerFn } from "@tanstack/react-start";
import { getServerConfig } from "../lib/config.server";

export const getSupabaseClientConfig = createServerFn({ method: "GET" })
  .handler(async () => {
    const config = getServerConfig();
    return {
      supabaseUrl: config.supabaseUrl || "",
      supabaseAnonKey: config.supabaseAnonKey || "",
    };
  });
export type GetSupabaseClientConfigFn = typeof getSupabaseClientConfig;
