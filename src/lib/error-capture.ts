// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 30_000;

export function record(error: unknown) {
  if (!error) return;
  lastCapturedError = { error, at: Date.now() };
}

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

if (typeof process !== "undefined" && typeof process.on === "function") {
  process.on("uncaughtException", (err) => record(err));
  process.on("unhandledRejection", (reason) => record(reason));
}

// Hook into console.error to intercept errors logged by h3, nitro, or React streaming
if (typeof console !== "undefined" && typeof console.error === "function") {
  const origConsoleError = console.error;
  console.error = function (...args: any[]) {
    for (const arg of args) {
      if (arg instanceof Error) {
        record(arg);
        break;
      } else if (arg && typeof arg === "object" && ("message" in arg || "stack" in arg)) {
        record(arg);
        break;
      }
    }
    return origConsoleError.apply(this, args);
  };
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
