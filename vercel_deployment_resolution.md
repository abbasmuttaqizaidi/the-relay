# Vercel Deployment Resolution Guide

This document records the steps taken to resolve the Vercel deployment issues for the **The Relay** TanStack Start application.

---

## 🔍 Issue 1: 404 NOT_FOUND on Deployment UI

### Cause
Although the application successfully compiled raw client/server files, Vercel returned a `404: NOT_FOUND` error because it was looking for a pre-configured server output directory to deploy as Serverless/Edge functions. 
The `vite.config.ts` file did not register the **Nitro plugin** (`nitro/vite`). Without this, Vite was unable to invoke the Nitro bundler to output the unified serverless build inside `.output/`.

### Resolution
1. Imported the `nitro` plugin from `nitro/vite`.
2. Added `nitro()` to the `plugins` array in `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite"; // <-- Added

export default defineConfig({
  plugins: [
    // ... other plugins
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro(), // <-- Added
    viteReact(),
  ],
});
```

---

## 🔍 Issue 2: ERESOLVE npm Installation Failure

### Cause
During the Vercel build phase, npm failed with an `ERESOLVE` code and blocked the dependency install:
```
npm error code ERESOLVE
npm error While resolving: @tanstack/zod-adapter@1.167.0
npm error Found: zod@4.4.3
```
This occurred because `@tanstack/zod-adapter` expects Zod v3 as a peer dependency, but the project root uses Zod v4 (prerelease/alpha) required for React 19 compatibility. Standard npm installs strictly block when encountering peer mismatches.

### Resolution
Created an `.npmrc` file in the project root:

```ini
legacy-peer-deps=true
```

This tells npm to bypass strict peer checks and force-install compatible packages, which successfully unblocks the Vercel installation pipeline.
