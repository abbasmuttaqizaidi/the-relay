# Clerk Authentication Integration: Block-by-Block Documentation

This guide provides a detailed, block-by-block explanation of how **Clerk Authentication** is integrated into the Nexorem React workspace.

---

## Block 1: Entry Point Provider Configuration (`src/main.tsx`)

This block initializes the main React DOM tree.

### Code Snippet

```tsx
// main.tsx (Lines 20-25)
// NOTE: ClerkProvider must be INSIDE BrowserRouter (in App.tsx) so Clerk can
// use React Router's navigate function for redirects. Moving it here wraps App
// which already contains BrowserRouter — see App.tsx for the correct structure.
createRoot(document.getElementById("root")!).render(<App />);
```

### Explanation

- **BrowserRouter Dependency:** Clerk needs React Router's context to handle SPA navigation properly during sign-ins and redirects.
- **Provider Wrapper location:** Instead of wrapping `<App />` directly in `main.tsx`, `ClerkProvider` is nested inside `<App />` under the `<BrowserRouter>` component (see Block 2).

---

## Block 2: Router Integration Wrapper (`src/App.tsx`)

This block couples Clerk's redirect engine with React Router v6's navigation system.

### Code Snippet

```tsx
// App.tsx (Lines 318-346)
const ClerkProviderWithRouter = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/login"
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      {children}
    </ClerkProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-left" />
      <BrowserRouter>
        <ClerkProviderWithRouter>
          <AppContent />
        </ClerkProviderWithRouter>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
```

### Explanation

- **`useNavigate` Hook:** The `useNavigate` hook is invoked inside `ClerkProviderWithRouter` to capture the router context.
- **Redirect Redirection binding:** The `routerPush` and `routerReplace` properties tell Clerk to navigate routes using React Router's single-page-app mechanics instead of forcing hard browser reloads.

---

## Block 3: Dynamic Axios Token Injector (`src/App.tsx`)

This block binds Clerk's live token generation functions directly into the custom Axios library client instance.

### Code Snippet

```tsx
// App.tsx (Lines 118-124)
const { getToken, isSignedIn, isLoaded } = useAuth();

useLayoutEffect(() => {
  if (isSignedIn) {
    setTokenProvider((opts) => getToken(opts));
  } else if (isLoaded) {
    setTokenProvider(null);
  }
}, [isSignedIn, isLoaded, getToken]);
```

### Explanation

- **`useLayoutEffect` Hooks:** Runs synchronously before browser paint to ensure the token provider function is registered immediately on page mount or login change.
- **`setTokenProvider`:** Injects a callback function that calls Clerk’s `getToken()` under the hood. This function is stored inside the Axios API wrapper to allow on-the-fly JWT token refreshes.

---

## Block 4: Axios Request Interceptor (`src/lib/api.ts`)

This block acts as the gatekeeper for all outgoing API requests, dynamically setting the correct backend headers and JWT format.

### Code Snippet

```ts
// api.ts (Lines 77-109)
if (tokenProvider) {
  try {
    const templateName = isDirectDB ? "supabase" : undefined;
    const token = await tokenProvider(templateName ? { template: templateName } : undefined);
    if (token) {
      // Check Supabase metadata sync
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(window.atob(base64));
        if (payload && isDirectDB) {
          clerkMetadataSynced = !!payload.tenant_id;
        }
      } catch (jwtErr) {}

      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  } catch (err) {
    console.error("[API Debug] Clerk token retrieval failed:", err);
  }
}
```

### Explanation

- **Live JWT Token retrieval:** Instead of using expired tokens cached in storage, `await tokenProvider()` requests a fresh, verified JWT token from Clerk.
- **Supabase Template Routing:** If `isDirectDB` is true (meaning a database request bypassing Deno edge functions is active), the interceptor calls `tokenProvider({ template: 'supabase' })`. This asks Clerk to sign the JWT payload using the Supabase templates RS256 signature key, enabling Supabase Row Level Security (RLS) policies to parse user metadata like `tenant_id` and `role`.

---

## Block 5: Route Protection Guard (`src/App.tsx`)

This block shields authenticated workspace pages from public guest access.

### Code Snippet

```tsx
// App.tsx (Lines 79-102)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const sessionToken = sessionStorage.getItem("token");

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50/50 backdrop-blur-md">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const hasValidSession = isSignedIn || !!sessionToken;
  if (!hasValidSession) return <Navigate to="/login" replace />;
  return <>{children}</>;
};
```

### Explanation

- **Loading Check:** Renders a spinner while Clerk is loaded (`isLoaded`) to verify session validity.
- **Session Check:** Allows access if either Clerk is authenticated (`isSignedIn`) OR a database fallback JWT exists in `sessionStorage` (`sessionToken`).
- **Sign-In Redirect:** Unauthenticated requests are immediately redirected back to `/login`.

---

## Block 6: Customized Theme Integration (`src/pages/AuthPage.tsx`)

This block renders Clerk's sign-in components while overriding styling elements to match Nexorem's premium sand-gold editorial canvas design.

### Code Snippet

```tsx
// AuthPage.tsx (Lines 189-217)
const clerkAppearance = {
  layout: { shadow: "none" },
  variables: {
    shadowShallow: "none",
    shadowNormal: "none",
    shadowDeep: "none",
  },
  elements: {
    rootBox: "w-full shadow-none",
    card: "shadow-none border-0 bg-transparent p-6 w-full",
    headerTitle: "text-2xl font-bold tracking-tight text-zinc-900",
    headerSubtitle: "text-zinc-500 font-medium mt-1 text-sm",
    socialButtonsBlockButton:
      "rounded-2xl border-amber-800/15 bg-[#f7f5f0] hover:bg-[#f0ede6] transition-all h-12 shadow-sm",
    socialButtonsBlockButtonText: "font-semibold text-zinc-700",
    formButtonPrimary:
      "bg-[#1e1e1a] hover:bg-zinc-800 rounded-2xl h-12 text-xs font-bold uppercase tracking-widest shadow-lg transition-all active:scale-[0.98]",
    formFieldInput:
      "h-12 rounded-xl border-amber-800/15 bg-[#f7f5f0]/60 focus:bg-white focus:border-[#c5a880] focus:ring-2 focus:ring-[#c5a880]/10 transition-all text-zinc-800",
    formFieldLabel: "text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5 ml-1",
    footerActionLink: "text-[#c5a880] font-bold hover:text-[#b4976f] transition-colors",
    dividerRow: "hidden",
    formResendCodeLink: "text-[#c5a880] font-bold",
    identityPreviewText: "font-semibold",
    formFieldInputShowPasswordButton: "text-zinc-400 hover:text-[#c5a880]",
    footer: "hidden",
  },
};

// ... inside render block:
<SignIn routing="path" path="/login" forceRedirectUrl="/login" appearance={clerkAppearance} />;
```

### Explanation

- **Appearance Styling Tokens:** Removes all default Clerk component shadows (`shadowShallow`, `shadowDeep`, `rootBox: shadow-none`) to align with a flat editorial aesthetic.
- **Custom CSS Classes:** Passes tailored Tailwind class names in the `elements` mapping to configure:
  - Input field heights, borders, and colors (`bg-[#f7f5f0]/60 focus:border-[#c5a880]`).
  - Primary button styles in brand colors (`bg-[#1e1e1a]`).
  - Font sizes and alignments (`formFieldLabel: text-[10px] uppercase`).
