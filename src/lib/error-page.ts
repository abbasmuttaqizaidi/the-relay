export function renderErrorPage(error?: unknown): string {
  let errorMessage = "";
  let errorStack = "";

  if (error instanceof Error) {
    errorMessage = error.message;
    errorStack = error.stack || "";
  } else if (typeof error === "string") {
    errorMessage = error;
  } else if (error != null) {
    try {
      errorMessage = JSON.stringify(error);
    } catch (_) {
      errorMessage = String(error);
    }
  }

  const debugHtml = errorMessage
    ? `<div style="margin-top: 2rem; text-align: left; background: #f8fafc; padding: 1rem; border-radius: 0.375rem; border: 1px solid #e2e8f0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.875rem;">
        <details>
          <summary style="cursor: pointer; font-weight: 600; color: #b91c1c; outline: none;">Error Details: ${escapeHtml(errorMessage)}</summary>
          ${errorStack ? `<pre style="margin-top: 0.75rem; overflow-x: auto; white-space: pre-wrap; font-size: 0.75rem; color: #334155; line-height: 1.4;">${escapeHtml(errorStack)}</pre>` : ""}
        </details>
       </div>`
    : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 35rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/home">Go home</a>
      </div>
      ${debugHtml}
    </div>
  </body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

