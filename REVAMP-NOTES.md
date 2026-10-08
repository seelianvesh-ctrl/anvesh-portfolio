# Homepage revamp — what changed and what was protected

A design and motion rebuild of the homepage, plus light reading polish on the
article template. **No URL, meta tag, structured data or analytics event was
removed.** Visible copy is unchanged except for two deliberate corrections
(see *Copy corrections* below).

---

## 1. The user journey now has a spine

| # | Section | What the visitor experiences |
|---|---------|------------------------------|
| — | Masthead | Fixed, quiet at the top; gains a hairline and tightens once you scroll. Current chapter marked by a rule that slides between items. |
| — | Reading progress | A 2px terracotta hairline across the top of the viewport. |
| — | Chapter rail | A column of ticks in the right gutter (desktop). Hover reveals the section name; the active chapter is terracotta. |
| 01 | Hero | Headline rises line by line out of a mask; portrait drifts on scroll; four metrics with rules and tabular numerals. |
| — | Brand ticker | Full-bleed band, pauses on hover/focus, marks desaturate until hovered. |
| 02 | Strategic Thesis | The statement paragraph sets itself word by word as you scroll. |
| 03 | Entity Profile | A plain, quotable fact sheet — reference rows, not marketing boxes. |
| 04 | Capabilities | A ledger: the index follows you down the left, the active group is marked by a terracotta rule. |
| 05 | Selected Work | A case ledger. Each case opens into a two-column spread; outcomes sit in a dark panel whose rules draw in. All five files start closed and stay in the page at all times. |
| 06 | Operating System | One inverted dark band mid-page. A spine fills as you read; the phase you are on comes forward. |
| 07 | Services | A divided menu with hairline gutters; each panel inverts to ink on hover. |
| 08 | Career Timeline | Dated ledger with a rule that fills while you scroll; the entry you are reading carries the terracotta mark. |
| 09 | Credentials | Three reference columns — education, certifications, stack. |
| 10 | Growth Notes | Three numbered field notes that lift slightly on hover. |
| 11 | FAQ | Sticky question column; answers stay mounted and collapse by height so the text is always in the page. |
| 12 | Contact | Full-width rows that flood terracotta on hover, then the footer. |

## 2. Design language

* **Palette unchanged** (cream `#F7F3EC`, ink `#1F1B17`, terracotta `#B24A2E`)
  so the homepage and the 22 article pages still read as one publication. Two
  supporting tones were added: `paper` (#FFFDF8) and `ember` (#D98B62, for
  accents on dark).
* **Two type roles, strictly separated:** Fraunces/Newsreader for voice,
  system monospace for chrome (labels, folios, dates, tags, numbers).
* **Print conventions:** hairline rules, folio numerals in the margin, hanging
  measures, tabular numerals, optical sizing, curly quotes, sharp corners
  instead of rounded cards, no drop shadows except one deliberate paper mount
  under the portrait.
* **Motion:** one easing family, 320–950 ms, transform and opacity only. No
  springs, no bouncing, no scroll-jacking. Everything is wrapped in a
  `prefers-reduced-motion` path that keeps the layout and drops the movement.
* **Craft details:** the expand/collapse mark is drawn from two hairlines rather
  than an icon font; the diamond bullets, the paper-grain overlay, the "rule
  draws itself" section mastheads, and a keyboard-visible focus ring everywhere.

## 3. Copy corrections

Two changes were made on review, and they are the only edits to visible text:

1. **Removed a line that talked about the page instead of the person.**
   The entity section previously opened with *"A concise profile for recruiters,
   founders, brand teams, search engines and AI systems."* It broke the fourth
   wall — it told a human reader the page was written for machines — and it
   earned nothing: nobody searches for that phrase. It now reads *"The work, the
   record, and the remit — in one screen."*, which describes the section without
   narrating its optimisation.
2. **Every case file now starts closed**, so all five rows show a "+" rather than
   the first row showing a "−" before the visitor has done anything. The "+" is
   the invitation; the mark flips to "−" on open. The section's own instruction
   (*"Click any project row to expand details…"*) now does real work.

   A follow-up bug is worth recording, because the first fix looked correct and
   was not. The mark is two 1px hairlines, one always horizontal and one meant to
   stand upright. On refactoring it into a shared component the upright stroke
   was animated to `rotate: 0` when closed — laying it flat, exactly on top of
   the horizontal stroke, so every row read "−" in every state. The fix pins the
   rotation at 90deg and animates only opacity and scaleX.

   The test that was supposed to catch this asserted the stroke's **opacity**,
   which was correctly 1 the whole time. It verified the wrong property and gave
   false confidence. `npm run check:content` now asserts the real thing: that all
   13 marks (5 case files + 8 FAQ rows) render an upright stroke at rest. That
   guard was confirmed to fail when the bug is reintroduced.

Worth noting the machine-facing framing was never necessary: the profile text,
FAQ answers and structured data are what parse cleanly for search engines and AI
systems, not any claim about doing so. That intent now lives in code comments,
where readers never see it.

## 4. SEO protection (verified, not assumed)

* Every `<head>` tag is untouched: title, description, keywords, canonical, Open
  Graph, Twitter card, GA4 snippet, and the full JSON-LD graph (WebSite, Person,
  ProfessionalService, FAQPage with all 8 Q&As).
* The prerendered fallback inside `#root` is intact and now uses the cream
  palette, so the first paint no longer flashes dark.
* Section heading hierarchy was **improved**: section titles are now real `<h2>`
  elements (they were styled paragraphs before), with `<h3>` for items.
* The case ledger and the FAQ now keep every panel mounted — previously only the
  open case study existed in the DOM. More of your content is now crawlable.
* All anchor ids, the `/articles/` link, `/resume.pdf`, the resume gate global,
  and every GA4 event (`book_call_click`, `case_study_open`, `service_cta_click`,
  `email_click`, `linkedin_click`, `instagram_click`, `github_click`,
  `boldpro_click`) are preserved.
* `sitemap.xml`, `robots.txt`, `llms.txt`, `_redirects`, `_headers` untouched.

### Audit results (baseline commit vs. this branch)

Measured by diffing the built HTML and rendering both apps with JS on and off.

| Surface | Baseline | This branch |
|---|---|---|
| `<head>` tags | 37 | 37 — nothing removed or added |
| JSON-LD | 1 block | **byte-identical** (WebSite, Person, ProfessionalService, FAQPage with 8 Q&As, 5 `sameAs`, 12 `knowsAbout`) |
| `<html lang>`, canonical, `<h1>` count | `en`, set, 1 | unchanged |
| `noindex` / `nofollow` | absent | absent |
| Crawlable text, JS **off** | 146 words | 144 words (the difference is punctuation, not content) |
| Links & headings, JS **off** | 7 links, 4 headings | 7 links, 4 headings — identical hrefs |
| Crawlable text, JS **on** | 2,073 words | **2,983 words (+44%)** |
| `robots.txt`, `sitemap.xml`, `llms.txt`, `_redirects`, `_headers` | — | untouched |

The rendered-DOM gain comes from the case ledger and the FAQ keeping every panel
mounted: all five case files and all eight FAQ answers are now in the DOM, where
previously only the open one existed.

### The one thing worth knowing (pre-existing, not a regression)

AI crawlers — GPTBot, ClaudeBot, PerplexityBot — largely do **not** execute
JavaScript, so what they read is the pre-rendered fallback: 142 words covering
the headline, metrics, about, services and contact links. The case studies,
timeline and FAQ body copy never reach them in either version.

The FAQ text does reach them regardless, because it is in the FAQPage JSON-LD,
which these crawlers do parse.

Closing the rest is possible without writing a word of new copy: the fallback
inside `#root` could carry the case-study summaries, timeline and FAQ answers
that already exist in `src/data.ts`. It is the standard SSR-hydration pattern
(same content, styled, visible until React takes over). The trade-off is a
larger pre-hydration paint and more reflow when the webfonts swap in, so it is
a deliberate choice rather than an obvious win.

### Run the content regression check any time

```bash
npm run check:content   # renders the page and asserts every headline,
                        # anchor, analytics hook and case study is still present
npm run lint            # type check
npm run build           # production build
```

## 5. Performance

| | Before | After |
|---|---|---|
| JS | 403.86 kB (124.19 kB gzip) | 419.51 kB (130.87 kB gzip) |
| CSS | 38.33 kB (7.28 kB gzip) | 48.79 kB (9.89 kB gzip) |

Layout-shift sources were removed rather than added: the masthead is now a fixed
header (its height change can no longer move the page), the portrait has
intrinsic `width`/`height`, brand marks sit in a fixed box so late image loads
cannot reflow the ticker, and the hero reserves the masthead's height. Numbers
use tabular figures so they never reflow while animating.

## 6. New files

```
src/lib/motion.ts              easing tokens, reveal helpers, GA4 helper, scrolling
src/lib/scroll.ts              one shared scroll subscription (header + chapter rail)
src/components/ui/             Reveal/Rise, SectionHeader, ScrollProgress,
                               ChapterRail, Marquee, ScrollText, Mark
scripts/seo-check.tsx          the content regression check
```

## 7. Sharing a preview without a server

```bash
npm run build:standalone   # -> anvesh-seeli-preview.html (one self-contained file)
```

The whole homepage — bundle, stylesheet and portrait — is inlined into a single
HTML file that runs straight from `file://`, so it can be opened offline or sent
to someone. Two details make that work: the bundle is emitted as a classic script
rather than a module (no CORS on `file://`), and it is placed **after** `#root`,
because an inline classic script in `<head>` runs before the container exists.
The file is git-ignored; regenerate it any time. Fonts and brand marks are
remote, so online they render exactly as deployed and offline they fall back to
Georgia and typeset wordmarks.

## 8. SEO / GEO follow-ups (separate from the redesign)

Found by auditing the article set rather than assuming it was fine.

**Internal linking.** Fifteen of the sixteen articles linked to no sibling
articles at all — their "related" block only pointed at `/articles/`, the
homepage and the resume. Every article now carries 2–5 contextual links to
related pieces, added by wrapping phrases that already existed in the prose.
No copy was written, removed or reordered, and each phrase was validated to
appear exactly once in a body paragraph before the edit was made, so no link
lands in a meta description or a heading. 72 internal links, all resolving.

The cluster now reads as a graph rather than sixteen islands:

| Cluster | Pieces |
|---|---|
| Measurement & audits | marketing-audit, performance-marketing-audit-beyond-roas, ga4-gtm-tracking-audit, why-ga4-google-ads-meta-dont-match, geo-incrementality-testing, performance-max-measurement-discipline |
| Unit economics | cac-roas-ltv, acquisition-vs-retention-paid-media, sampling-led-acquisition, first-7-days-paid-media-account, present-performance-marketing-to-leadership |
| Brand playbooks | boat, cred, nykaa, zepto, zomato |

**Sitemap.** `/articles/marketing-audit` existed and was linked from the index
but was missing from `sitemap.xml`, so it could only be found by crawling.
Added, and `lastmod` bumped for the pages this branch actually changed.

**Two new guards in `npm run check:content`** so neither problem can come back
silently: every file in `public/articles/` must be listed in the sitemap, and
every article must link to at least two siblings. The second guard immediately
caught `sampling-led-acquisition` sitting at one link.

**Deploy config stays in the Cloudflare Pages dashboard.** The site is hosted on
Cloudflare Pages (project `anvesh-portfolio`), which is why `_redirects` and
`_headers` live in `public/` — Pages reads both from the publish root, so
`dist/_redirects` and `dist/_headers` are picked up automatically. Build command
and output directory are set in the dashboard; nothing in the repo needs to
change, and `package.json` documents the Node requirement via `engines`.

An earlier revision of this branch added a `netlify.toml`. It was removed: the
deploy target is Cloudflare, so the file would have done nothing.

## 9. Notes

* The articles themselves are unchanged; `public/articles/style.css` gained a
  reading polish (68-character measure, sticky masthead, balanced headings,
  scroll-driven reading bar where the browser supports it, print styles).
* `@types/react` and `@types/react-dom` were missing, so `npm run lint` was
  failing before this work. They are now installed and the type check is clean.
* `vite.config.ts` now allows the hosted preview domain, so the dev server is
  reachable from preview links.
