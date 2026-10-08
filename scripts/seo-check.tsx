/**
 * Content regression check — `npm run check:content`.
 *
 * Renders the homepage to static markup and asserts that every headline,
 * section anchor, analytics hook and structured-data string from the previous
 * version is still present. Run it after any copy or layout change so the SEO
 * surface cannot quietly regress.
 */
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import App from "../src/App";

const html = renderToStaticMarkup(<App />);

const mustInclude = [
  // hero + copy fidelity
  "Performance Marketing &amp; Growth",
  ">Performance Marketing &amp; Growth<",
  "I help consumer brands improve acquisition, media efficiency, and",
  "Mars Pet Nutrition · Domino&#x27;s Pizza India · IIM Calcutta MBA",
  "CAC ↓22%",
  "ROAS 3.4x",
  "CVR ↑25%",
  "₹7Cr+",
  // section anchors
  'id="about"',
  'id="about-anvesh-seeli"',
  'id="capabilities"',
  'id="work"',
  'id="operating-system"',
  'id="services"',
  'id="timeline"',
  'id="credentials"',
  'id="growth-notes"',
  'id="faq"',
  'id="contact"',
  'id="main"',
  // nav + analytics ids
  'id="nav-item-articles"',
  'id="nav-cta"',
  'id="mobile-menu-toggle"',
  'id="book-call-hero"',
  'id="download-resume-hero"',
  'id="calendly-button"',
  'id="email-button"',
  "hi@anveshseeli.com",
  "https://calendly.com/seelianvesh/30min",
  "/articles/",
  // section labels
  "Strategic Thesis",
  "Entity Profile",
  "Capabilities",
  "Selected Work",
  "Operating System",
  "Services",
  "Professional History",
  "Credentials",
  "Strategic Insights",
  "Clarifications",
  "Collaboration",
  // case study payload — all five must render, not just the open one
  "Domino&#x27;s India",
  "Mars Pet Nutrition",
  "Brane Enterprises",
  "Prione / Cloudtail",
  "Jumia Egypt",
  "Context &amp; Objective",
  "Scope of Engagement",
  "Technical Stack &amp; Core Tools",
  "Strategic Interventions",
  "Measurable Outcomes",
  // FAQ: every answer must be in the DOM
  "Who is Anvesh Seeli?",
  "What does a performance marketing consultant do?",
  "How do I contact or hire Anvesh Seeli?",
];

const missing = mustInclude.filter((needle) => !html.includes(needle));

// heading outline
const headings = [...html.matchAll(/<(h1|h2|h3)[^>]*>([\s\S]*?)<\/\1>/g)].map(
  (match) => `${match[1]}: ${match[2].replace(/<[^>]+>/g, "").trim()}`,
);

const h1Count = headings.filter((h) => h.startsWith("h1:")).length;

/**
 * Every expand/collapse mark must render its upright stroke at rest, otherwise
 * the mark reads "−" on a collapsed row. Both strokes are 1px hairlines, so the
 * upright one is only visible when it carries rotate(90deg).
 */
const uprightStrokes = (html.match(/rotate\(90deg\)/g) || []).length;
const expectedStrokes = 5 + 8; // five case files + eight FAQ rows, all closed
if (uprightStrokes !== expectedStrokes) {
  missing.push(
    `expand marks: expected ${expectedStrokes} upright strokes (all rows closed), found ${uprightStrokes}`,
  );
}

/**
 * Sitemap coverage.
 *
 * Every article published under public/articles/ must be listed in sitemap.xml,
 * otherwise it can only be discovered by crawling internal links. This is how
 * /articles/marketing-audit went missing.
 */
const publicDir = path.resolve(process.cwd(), "public");
const sitemap = readFileSync(path.join(publicDir, "sitemap.xml"), "utf8");
const onDisk = readdirSync(path.join(publicDir, "articles"))
  .filter((file) => file.endsWith(".html") && file !== "index.html")
  .map((file) => `/articles/${file.replace(/\.html$/, "")}`);

const notListed = onDisk.filter((slug) => !sitemap.includes(`<loc>https://anveshseeli.com${slug}</loc>`));

/**
 * Internal linking.
 *
 * Every article should link to at least two sibling articles. Before this was
 * enforced, fifteen of sixteen articles linked to none.
 */
const thinLinking = onDisk.filter((slug) => {
  const file = readFileSync(path.join(publicDir, slug.replace(/^\//, "") + ".html"), "utf8");
  const targets = new Set(
    [...file.matchAll(/href="\/articles\/([a-z0-9-]+)"/g)].map((match) => match[1]),
  );
  targets.delete(slug.replace("/articles/", ""));
  return targets.size < 2;
});

console.log("markup length:", html.length);
console.log("h1 count:", h1Count);
console.log("--- heading outline ---");
console.log(headings.join("\n"));
console.log("--- sitemap coverage ---");
console.log(`articles on disk: ${onDisk.length}`);
console.log(notListed.length ? `NOT IN SITEMAP:\n  ${notListed.join("\n  ")}` : "every article is listed");

console.log("--- internal linking ---");
console.log(
  thinLinking.length
    ? `under-linked (<2 sibling links):\n  ${thinLinking.join("\n  ")}`
    : "every article links to at least 2 siblings",
);

console.log("--- missing strings ---");
console.log(missing.length ? missing.join("\n") : "none");

if (missing.length || h1Count !== 1 || notListed.length || thinLinking.length) {
  process.exitCode = 1;
}
