When designing the page use the color scheme present in color_scheme.md and reuse the components from design-system(strict).

Throughtout the app on all the routes wherever a business logo is required use ui/default_business_logo.tsx as the default business logo. If a logo is present use it otherwise use this. The business initials will be used only as fallback. Business logo is used in the following routes:
- /opportunities
- inbound and outbound tabs of /my-relay route
- questions and knowledge tabs of /insights route.
- business card, present in the top right side of the nav bar.