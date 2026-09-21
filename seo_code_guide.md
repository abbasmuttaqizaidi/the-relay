Implement IndexNow for The Relay.

Domain:
https://www.usetherelay.com

IndexNow API key:
0cdb24a0857f4d83bf7839b1b83e5833

Requirements:

1. Create the IndexNow verification key file at the public/root URL:

https://www.usetherelay.com/0cdb24a0857f4d83bf7839b1b83e5833.txt

The file must contain ONLY this exact text:

0cdb24a0857f4d83bf7839b1b83e5833

It must be publicly accessible with an HTTP GET request and return the key as plain text.

2. Implement a reusable server-side IndexNow submission utility.

Use:
https://api.indexnow.org/indexnow

It should support submitting:
- a single URL
- multiple URLs in one request

Payload format:

{
  "host": "www.usetherelay.com",
  "key": "0cdb24a0857f4d83bf7839b1b83e5833",
  "keyLocation": "https://www.usetherelay.com/0cdb24a0857f4d83bf7839b1b83e5833.txt",
  "urlList": [...]
}

3. Do NOT expose the IndexNow submission logic in client-side JavaScript.

The submission utility must run server-side only.

4. Integrate it with the existing Relay publishing/update workflow where appropriate.

For public SEO content:
- newly published Insights/Questions
- updated public Insights/Questions
- newly created/updated important public SEO pages

notify IndexNow after the content change succeeds.

Do NOT submit:
- private/authenticated routes
- login/signup/onboarding
- user dashboards
- opportunities that are not public/indexable
- every authenticated user action

5. Also create a way to manually submit the current public sitemap URLs once, preferably through a server-side utility/script rather than adding unnecessary UI.

The current canonical public sitemap is:

https://www.usetherelay.com/sitemap.xml

The current public SEO URL set is already defined by the existing sitemap implementation. Reuse that source rather than maintaining a second hard-coded list if possible.

6. Do not change the existing sitemap implementation.

7. Do not change robots.txt.

8. Do not add IndexNow code to localhost/development execution paths unnecessarily.

9. Add clear error handling/logging for IndexNow responses:
- 200 = success
- 400 = invalid request
- 403 = key verification failure
- 422 = invalid URL/host/key relationship
- 429 = rate limited

IndexNow notification failure must NEVER cause a successful content publish/update to fail.

10. Run the production build/typecheck/tests and fix any issues introduced by the implementation.

11. Commit and push the changes to the production branch.

After implementation, report:
- files changed
- where the key file is served from
- how the server-side IndexNow submission is triggered
- whether the production build passes

One thing I want you to be careful about
The key file is not a .env secret. It needs to be publicly accessible because Bing uses it to verify domain ownership.
So this is correct:
https://www.usetherelay.com/0cdb24a0857f4d83bf7839b1b83e5833.txt
And the response should literally be:
0cdb24a0857f4d83bf7839b1b83e5833