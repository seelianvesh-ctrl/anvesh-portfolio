const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({
  size: 'A4',
  margins: {
    top: 36,
    bottom: 36,
    left: 40,
    right: 40
  }
});

const outputPath = path.join(__dirname, 'public', 'Anvesh_Seeli_Resume.pdf');
const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Colors (matching editorial aesthetic)
const COLOR_INK = '#1F1B17';
const COLOR_TERRACOTTA = '#B24A2E';
const COLOR_MUTED = '#5C5248';
const COLOR_LINE = '#E2D9CC';

// Header
doc.fillColor(COLOR_INK)
   .font('Helvetica-Bold')
   .fontSize(22)
   .text('ANVESH SEELI', { align: 'center' });

doc.moveDown(0.2);

doc.fontSize(10)
   .font('Helvetica-Bold')
   .fillColor(COLOR_TERRACOTTA)
   .text('Performance Marketing & Growth | Paid Media, Measurement & Commerce-led Growth', { align: 'center' });

doc.moveDown(0.2);

doc.fontSize(8.5)
   .font('Helvetica')
   .fillColor(COLOR_MUTED)
   .text('+91 81431 30661  |  seelianvesh@gmail.com  |  linkedin.com/in/anvesh-seeli  |  anveshseeli.com', { align: 'center' });

doc.moveDown(0.5);

// Divider Line
doc.strokeColor(COLOR_LINE)
   .lineWidth(0.5)
   .moveTo(40, doc.y)
   .lineTo(555, doc.y)
   .stroke();

doc.moveDown(0.6);

// Section Helper
function addSectionHeader(title) {
  doc.fillColor(COLOR_TERRACOTTA)
     .font('Helvetica-Bold')
     .fontSize(10)
     .text(title.toUpperCase());
  
  doc.strokeColor(COLOR_LINE)
     .lineWidth(0.5)
     .moveTo(40, doc.y + 2)
     .lineTo(555, doc.y + 2)
     .stroke();
  
  doc.moveDown(0.5);
}

// 1. PROFESSIONAL SUMMARY
addSectionHeader('Professional Summary');
doc.fillColor(COLOR_INK)
   .font('Helvetica')
   .fontSize(8.5)
   .text(
     'Performance marketing and growth professional with 4+ years across QSR, FMCG / pet care, SaaS product marketing and financial services, backed by an MBA from IIM Calcutta and B.Tech from NIT Calicut. I operate where media, measurement and business outcomes meet — running full-funnel acquisition across Google, Meta, Performance Max, YouTube, UAC, CRM and social commerce while keeping a strict eye on CAC, ROAS and unit economics. I have managed a Rs. 7 Cr+ monthly media portfolio, driven 17% YoY customer growth, and used incrementality testing to turn marketing activity into clear decisions leadership can trust.',
     { align: 'justify', lineGap: 2.5 }
   );

doc.moveDown(0.8);

// 2. CORE EXPERTISE
addSectionHeader('Core Expertise');

const expertise = [
  { label: 'Performance Marketing', desc: 'Google Ads (Search, Performance Max, Shopping, YouTube, UAC); Meta Ads (prospecting, retargeting, creative scaling); paid social, affiliates, influencers; budget governance' },
  { label: 'Measurement & Analytics', desc: 'GA4, SQL, Power BI, Amplitude, Singular (MMP), Cube; incrementality testing; attribution sanity checks; funnel reporting; source-of-truth dashboards' },
  { label: 'Growth & Commerce', desc: 'GTM strategy; CAC optimization; CRM & lifecycle; sampling / trial-led acquisition; social commerce (Instagram Shop, payment-partner campaigns); marketing-mix modeling' },
  { label: 'Economics & Discipline', desc: 'CAC, CPA, LTV, ROAS, contribution margin, unit economics; scale / hold / cut decisions; ROI-accountable budget planning' },
  { label: 'Leadership & Operations', desc: 'Cross-functional leadership (product, design, engineering); agency governance (10+ partners); leadership-ready reporting; Lean Six Sigma Green Belt' }
];

expertise.forEach(exp => {
  doc.fillColor(COLOR_INK)
     .font('Helvetica-Bold')
     .fontSize(8.5)
     .text(exp.label + ': ', { continued: true })
     .font('Helvetica')
     .fillColor(COLOR_MUTED)
     .text(exp.desc, { lineGap: 1.5 });
  doc.moveDown(0.25);
});

doc.moveDown(0.5);

// 3. PROFESSIONAL EXPERIENCE
addSectionHeader('Professional Experience');

// Exp 1
doc.fillColor(COLOR_INK)
   .font('Helvetica-Bold')
   .fontSize(9)
   .text('DDM Program Manager – Pet Nutrition', { continued: true })
   .font('Helvetica-Oblique')
   .fillColor(COLOR_MUTED)
   .text(' — Mars Pet Nutrition, Hyderabad', { continued: true })
   .font('Helvetica')
   .text(' '.repeat(45) + 'May 2025 – Feb 2026', { align: 'right' });

doc.moveDown(0.1);
doc.font('Helvetica-Oblique')
   .fontSize(8)
   .fillColor(COLOR_MUTED)
   .text('Performance marketing, sampling-led acquisition, DDM planning, social commerce and measurement for brands including Pedigree, Whiskas and Sheba.');

doc.moveDown(0.2);
const exp1Bullets = [
  'Drove Google, Meta and Performance Max-led acquisition initiatives with a focus on bottom-line cost efficiency.',
  'Ran sampling-led acquisition across media and payment-partner channels, delivering 655K samples in 3 months (50% of the annual target).',
  'Improved visibility into channel efficiency and reduced cost-per-sample by 40% through optimised conversion funnels.',
  'Led DDM reporting, planning and performance governance; launched a social-commerce integration via Instagram Shop to lift trial-to-purchase.'
];
exp1Bullets.forEach(b => {
  doc.fillColor(COLOR_INK)
     .font('Helvetica')
     .fontSize(8.5)
     .text('•  ', { continued: true })
     .text(b, { lineGap: 1.5 });
  doc.moveDown(0.15);
});

doc.moveDown(0.4);

// Exp 2
doc.fillColor(COLOR_INK)
   .font('Helvetica-Bold')
   .fontSize(9)
   .text('Product Leader – Marketing', { continued: true })
   .font('Helvetica-Oblique')
   .fillColor(COLOR_MUTED)
   .text(' — Brane Enterprises, India', { continued: true })
   .font('Helvetica')
   .text(' '.repeat(61) + 'Mar 2024 – Feb 2025', { align: 'right' });

doc.moveDown(0.1);
doc.font('Helvetica-Oblique')
   .fontSize(8)
   .fillColor(COLOR_MUTED)
   .text('Product marketing, GTM planning, positioning and cross-functional operating systems for a product-led (SaaS) business.');

doc.moveDown(0.2);
const exp2Bullets = [
  'Built product-marketing workflows and launch-planning structures; created GTM narratives, positioning documents and communication frameworks.',
  'Partnered with product, design, engineering and business teams; supported OKR-based planning and improved launch readiness.'
];
exp2Bullets.forEach(b => {
  doc.fillColor(COLOR_INK)
     .font('Helvetica')
     .fontSize(8.5)
     .text('•  ', { continued: true })
     .text(b, { lineGap: 1.5 });
  doc.moveDown(0.15);
});

doc.moveDown(0.4);

// Exp 3
doc.fillColor(COLOR_INK)
   .font('Helvetica-Bold')
   .fontSize(9)
   .text('Deputy Manager – Digital Marketing', { continued: true })
   .font('Helvetica-Oblique')
   .fillColor(COLOR_MUTED)
   .text(' — Jubilant FoodWorks / Domino\'s Pizza India, Noida', { continued: true })
   .font('Helvetica')
   .text(' '.repeat(20) + 'Aug 2021 – Mar 2023', { align: 'right' });

doc.moveDown(0.1);
doc.font('Helvetica-Oblique')
   .fontSize(8)
   .fillColor(COLOR_MUTED)
   .text('Pan-India digital marketing across acquisition, retention, app growth, CRM, paid media, influencers, affiliates and brand partnerships.');

doc.moveDown(0.2);
const exp3Bullets = [
  'Managed a Rs. 7 Cr+ monthly media portfolio with full ROI accountability across Meta, Google, YouTube, UAC, CRM, affiliates and influencers.',
  'Contributed to 17% YoY customer-acquisition growth; lifted traffic 35% and conversion 25% via CRM and app-journey optimization.',
  'Ran incrementality tests to validate true media contribution; coordinated 30+ stakeholders and 10+ partner agencies.'
];
exp3Bullets.forEach(b => {
  doc.fillColor(COLOR_INK)
     .font('Helvetica')
     .fontSize(8.5)
     .text('•  ', { continued: true })
     .text(b, { lineGap: 1.5 });
  doc.moveDown(0.15);
});

doc.moveDown(0.4);

// Exp 4
doc.fillColor(COLOR_INK)
   .font('Helvetica-Bold')
   .fontSize(9)
   .text('Assistant Sales Manager', { continued: true })
   .font('Helvetica-Oblique')
   .fillColor(COLOR_MUTED)
   .text(' — Simply Grow Technologies, Hyderabad', { continued: true })
   .font('Helvetica')
   .text(' '.repeat(44) + 'Dec 2017 – Nov 2018', { align: 'right' });

doc.moveDown(0.2);
const exp4Bullets = [
  'Managed partnerships with 35 BSE-listed AMC fund houses; expanded SIP book by Rs. 120 Cr and lump-sum by Rs. 42 Cr; 12,500+ registrations in 7 months (peak 190% MoM), 95% CSAT across 11,000+ tickets.'
];
exp4Bullets.forEach(b => {
  doc.fillColor(COLOR_INK)
     .font('Helvetica')
     .fontSize(8.5)
     .text('•  ', { continued: true })
     .text(b, { lineGap: 1.5 });
  doc.moveDown(0.15);
});

doc.moveDown(0.5);

// 4. CONSULTING & LIVE PROJECTS
addSectionHeader('Consulting & Live Projects');

// Project 1
doc.fillColor(COLOR_INK)
   .font('Helvetica-Bold')
   .fontSize(8.5)
   .text('Lead Generation & Store-Location Model — Prione / Cloudtail (Amazon JV) — MBA Internship', { continued: true })
   .font('Helvetica')
   .text(' '.repeat(10) + '2020', { align: 'right' });
doc.moveDown(0.15);
const proj1Bullets = [
  'Designed and ran A/B-tested Meta lead-gen campaigns for Amazon Easy Exclusive Stores, lifting hot-lead conversion to 66–74% and cutting cost-per-hot-lead to ~Rs. 29; built a channel cost-effectiveness framework to generate 4,000+ leads.',
  'Built a scalable location-scouting tool (Google My Maps + browser automation + Excel macros) that reduced store-location turnaround time by ~40%.'
];
proj1Bullets.forEach(b => {
  doc.fillColor(COLOR_INK)
     .font('Helvetica')
     .fontSize(8)
     .text('•  ', { continued: true })
     .text(b, { lineGap: 1.5 });
  doc.moveDown(0.15);
});

doc.moveDown(0.3);

// Project 2
doc.fillColor(COLOR_INK)
   .font('Helvetica-Bold')
   .fontSize(8.5)
   .text('Return-Rate Reduction & Reverse Logistics — Jumia (Egypt) — Live Project (CM Validated)', { continued: true })
   .font('Helvetica')
   .text(' '.repeat(11) + 'MBA', { align: 'right' });
doc.moveDown(0.15);
const proj2Bullets = [
  'Identified 20+ opportunities and policy changes targeting a 30% return-rate reduction; benchmarked return policy vs local/global peers and ideated 6 UX initiatives; built an interactive dashboard to track return-rate contributors across categories, sellers and warehouses.'
];
proj2Bullets.forEach(b => {
  doc.fillColor(COLOR_INK)
     .font('Helvetica')
     .fontSize(8)
     .text('•  ', { continued: true })
     .text(b, { lineGap: 1.5 });
  doc.moveDown(0.15);
});

doc.moveDown(0.5);

// 5. EDUCATION
addSectionHeader('Education');

doc.fillColor(COLOR_INK)
   .font('Helvetica-Bold')
   .fontSize(8.5)
   .text('MBA — Marketing & Organizational Behavior, IIM Calcutta', { continued: true })
   .font('Helvetica')
   .text(' '.repeat(63) + '2019 – 2021', { align: 'right' });
doc.moveDown(0.2);

doc.font('Helvetica-Bold')
   .fontSize(8.5)
   .text('B.Tech — Mechanical Engineering, NIT Calicut', { continued: true })
   .font('Helvetica')
   .text(' '.repeat(78) + '2013 – 2017', { align: 'right' });

doc.moveDown(0.6);

// 6. CERTIFICATIONS & TECHNICAL STACK
addSectionHeader('Certifications & Technical Stack');

doc.fillColor(COLOR_INK)
   .font('Helvetica-Bold')
   .fontSize(8.5)
   .text('Certifications: ', { continued: true })
   .font('Helvetica')
   .fillColor(COLOR_MUTED)
   .text('Google Ads — Measurement, Display, Apps & AI-Powered Performance Ads; Fundamentals of Digital Marketing; Lean Six Sigma Green Belt — KPMG.', { lineGap: 1.5 });

doc.moveDown(0.25);

doc.fillColor(COLOR_INK)
   .font('Helvetica-Bold')
   .fontSize(8.5)
   .text('Tools & Tech: ', { continued: true })
   .font('Helvetica')
   .fillColor(COLOR_MUTED)
   .text('Google Ads, Meta Ads, Performance Max, YouTube, DV360, Programmatic, Instagram Shop, GA4, SQL, Power BI, Amplitude, Singular, Cube.', { lineGap: 1.5 });

doc.end();

writeStream.on('finish', () => {
  const shortOutputPath = path.join(__dirname, 'public', 'resume.pdf, and resume');
  const cleanOutputPath = path.join(__dirname, 'public', 'resume');
  fs.copyFileSync(outputPath, shortOutputPath);
  fs.copyFileSync(outputPath, cleanOutputPath);
  console.log('PDF generation complete! Wrote Anvesh_Seeli_Resume.pdf and resume.pdf, and resume');
});
