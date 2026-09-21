The architecture now looks correct.

Before we consider technical SEO complete, do a final verification-only pass.

Do NOT modify page content, keywords, routes, or SEO strategy.

Show me the exact final contents of:

1. public/robots.txt

2. public/sitemap.xml

3. The canonical output for these pages:
   - /
   - /solutions
   - /b2b-opportunity-exchange
   - /insights
   - /insights/:id
   - /8-step-journey

4. The response behavior for:
   - /eight-step-journey
   - /home

5. Confirm that none of these appear in sitemap.xml:
   - /eight-step-journey
   - /home
   - /login
   - /signup
   - /onboarding
   - /my-relay
   - /opportunities
   - /network
   - /admin
   - other authenticated/private routes

6. Confirm that /eight-step-journey is NOT blocked by robots.txt.

7. Confirm that private routes use noindex and are NOT blocked by robots.txt solely to achieve noindex.

8. Verify whether the HowTo JSON-LD on the three "how-to" pages actually corresponds to visible step-by-step content. If not, recommend removing it for now.

9. Confirm that the production build succeeds.

10. Most importantly, test the actual generated HTML/head output rather than relying only on TypeScript source inspection.

Report PASS/FAIL for each item.
Do not make changes unless a verification failure is found.