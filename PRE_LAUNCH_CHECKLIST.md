# Pre-Launch Checklist — Time Capsule: Memory Vault

Use this checklist before launching the **website** and **iOS app** to production. Items are grouped by area.

---

## 1. App Store & Download Links

- [ ] **Add real App Store URL**  
  All “Download on the App Store” buttons currently point to `#download` (in-page anchor). Once the app is live, replace with the real App Store link (e.g. `https://apps.apple.com/app/time-capsule-memory-vault/idXXXXXXXXX`) in:
  - `website/index.html` (hero CTA, CTA section, demo “Download the App” link)
  - `website/about.html` (CTA button)
  - Every blog post CTA and nav “Download” link (or use a single config/snippet so one change updates all)

- [ ] **Optional: Smart App Banners**  
  Consider adding `<meta name="apple-itunes-app" content="app-id=XXXXXXXXX">` on key pages so iOS shows the “Open in App” banner when the app is installed.

---

## 2. Copy & Punctuation

- [ ] **Fix missing space after commas in titles/descriptions**  
  Several places use `,Word` instead of `, Word`:
  - **index.html**: `<title>` and `og:title` — “Memory Vault,Lock” → “Memory Vault, Lock”
  - **index.html**: FAQ schema and FAQ answer — “experience,creating” → “experience, creating”; “design,the” → “design, the”
  - **index.html**: Review quote — “wedding,guests” → “wedding, guests”
  - **faq.html**, **privacy-policy.html**, **terms.html**, **age-suitability.html**: titles like “FAQ,Time” → “FAQ, Time”
  - **Blog posts**: titles like “Future Self,Time Capsule” → “Future Self, Time Capsule”; body copy “files,they're” → “files, they're” etc.

- [ ] **Proofread**  
  Run a quick pass on hero, features, FAQ, and legal pages for typos and consistency (“Lock your memories” vs “Lock Your Memories” where it matters).

---

## 3. SEO & Sitemap

- [ ] **Add `blog.html` and `press.html` to sitemap**  
  `website/sitemap.xml` lists individual blog posts but not the index pages `blog.html` or `press.html`. Add entries for both with appropriate `priority` and `changefreq`.

- [ ] **Confirm canonical URL**  
  Canonical and og:url point to `https://austinfrankel.github.io/timeCapsuleWebsite/`. If the production site will live at a different URL (custom domain, different path), update:
  - All `<link rel="canonical">`
  - All `og:url` and `twitter` URLs
  - `sitemap.xml` and `robots.txt` (Sitemap URL)

- [ ] **Optional: RSS for blog**  
  If you want feed discovery, add an RSS (or JSON feed) and link it from `blog.html` and/or `<head>`.

---

## 4. Legal & App Store Requirements

- [ ] **Privacy Policy**  
  Already present at `privacy-policy.html`. Ensure it matches exactly what the app does (data collection, retention, third parties, kids). App Store and age-gating may require a direct URL—use the production URL.

- [ ] **Terms of Use**  
  Already at `terms.html`. Confirm they’re final and linked from footer and any in-app “Terms” screen.

- [ ] **Age Suitability**  
  Already at `age-suitability.html`. Align with App Store age rating and any parental-gate or age prompts in the app.

- [ ] **In-app links**  
  If the iOS app shows “Privacy Policy” or “Terms” links, point them to the live website URLs (not localhost or staging).

---

## 5. Website Technical

- [ ] **404 page**  
  No custom 404 found. Add a `404.html` (and configure the host to serve it for 404s) so broken links show a branded page with nav and link back home.

- [ ] **Favicon / app icon**  
  `app-icon.png` is used. Confirm it exists in `website/` and that sizes are correct (e.g. 180×180 for apple-touch-icon if needed).

- [ ] **Performance**  
  - Confirm key images (e.g. app icon, og:image) are optimized (size/format).
  - Fonts: Inter is loaded from Google Fonts; consider self-hosting or `font-display: swap` if not already set for faster text render.

- [ ] **HTTPS**  
  Ensure the live site is served over HTTPS only (redirect HTTP → HTTPS).

---

## 6. Accessibility & UX

- [ ] **Interactive demo**  
  The phone demo has multiple screens and “Hold to Lock”. Verify keyboard/screen-reader flow and that “Hold to Lock” has an alternative (e.g. tap or button) for users who can’t use long-press.

- [ ] **Focus and contrast**  
  Quick pass: visible focus states on nav, buttons, and FAQ; contrast ratios for text and CTAs meet WCAG where required.

- [ ] **Blog “Download” from other pages**  
  Links like `href="#download"` from blog posts go to the same page’s `#download`; that ID lives on the homepage. Either use `index.html#download` for those CTAs or add a same-page target on blog template.

---

## 7. iOS App (Xcode / App Store Connect)

- [ ] **StoreKit sandbox (testing)**  
  A StoreKit Configuration file (`Time Capsule - Memory Vault.storekit`) is set up and wired to the scheme for local paywall testing in the simulator. **Ensure product IDs in that file exactly match those in your Superwall Dashboard and App Store Connect.** Current placeholders: `com.timecapsule.premium.monthly`, `com.timecapsule.premium.yearly`. To verify: Product → Scheme → Edit Scheme → Run → Options → StoreKit Configuration.

- [ ] **Superwall placement (fix `event_not_found`)**  
  Create placement `onboarding_complete` in the Superwall Dashboard and map it to your paywall campaign. See `SUPERWALL_SETUP.md` for step-by-step instructions.

- [ ] **Version and build**  
  Set a release version (e.g. 1.0.0) and build number for the first App Store upload.

- [ ] **Signing & capabilities**  
  Use correct team and distribution certificate; enable only needed capabilities (e.g. Keychain, Face ID/Touch ID if used).

- [ ] **App Store Connect**  
  Fill all required fields: name, subtitle, description, keywords, screenshots, preview video (if any), age rating, Privacy Policy URL, support URL (e.g. `about.html#support` or contact email).

- [ ] **ASO**  
  Use `ASO_PROMPT.md` (and referenced docs) to generate final App Store copy for all locales before submit.

- [ ] **TestFlight / internal testing**  
  Run through main flows (create capsule, add media, set date, seal, unlock, export/import .ltc) on real devices and different iOS versions.

---

## 8. Post-Launch (Quick Wins)

- [ ] **Analytics (optional)**  
  If you add a privacy-respecting analytics (e.g. no PII, minimal), add it only after launch and document in Privacy Policy if it applies to the website.

- [ ] **Monitor**  
  After going live, check: App Store listing, website on mobile/desktop, all “Download” buttons, and legal links.

---

## Summary

| Area              | Priority | Notes                                              |
|-------------------|----------|----------------------------------------------------|
| App Store URL     | Critical | Replace `#download` with real link everywhere       |
| Comma spacing     | High     | Fix “,Word” → “, Word” in titles and key copy     |
| Sitemap           | Medium   | Add `blog.html` and `press.html`                  |
| 404 page          | Medium   | Add `404.html` and host config                    |
| Canonical / URL   | High     | If domain or path changes, update all references  |
| Legal / in-app    | Critical | Finalize legal pages and in-app links             |
| iOS build & ASO   | Critical | Version, signing, Connect, ASO, TestFlight         |

---

*Generated from a full pass over the Time Capsule repo (website + iOS app).*
