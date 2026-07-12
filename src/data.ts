import { CaseStudy, TimelineItem, ServiceItem, FAQItem, GrowthNote } from "./types";

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "dominos",
    title: "Domino's India",
    subtitle: "Scale & Efficiency at National Scale",
    context: "Managed and scaled digital media operations for India's largest food delivery app across 2,000+ physical stores, balancing massive volume acquisition with strict ROAS and efficiency metrics.",
    scope: [
      "₹7Cr+ monthly media spend management",
      "Full-funnel optimization across search, social, app, and programmatic channels",
      "Agency governance, cross-functional stakeholder leadership, and budget governance"
    ],
    tools: [
      "Meta Ads Manager",
      "Google Ads (Search & PMax)",
      "YouTube Ads & DV360",
      "Universal App Campaigns (UAC)",
      "MoEngage CRM & Lifecycle",
      "Affiliate Networks"
    ],
    interventions: [
      "Re-structured digital marketing campaign architecture across Google and Meta, separating retention and acquisition to eliminate self-competing bids.",
      "Coordinated 30+ cross-functional stakeholders (brand managers, pricing, ops) and managed 10+ external media and creative agencies.",
      "Designed and executed 5 localized geo-incrementality tests to isolate and justify over ₹2Cr in monthly media budgets.",
      "Optimized downstream conversion funnels by linking paid programmatic spend directly with high-converting location-based promotions."
    ],
    outcomes: [
      "Achieved 17% YoY customer acquisition growth across digital orders.",
      "Delivered a +35% lift in total website/app traffic and an +11% increase in sales.",
      "Improved mobile app conversion rates (CVR) by +25% through landing page A/B tests.",
      "Proved an +8% incremental revenue lift, justifying strategic media investments to board members."
    ]
  },
  {
    id: "mars",
    title: "Mars Pet Nutrition",
    subtitle: "Data-Driven Marketing & First-Party Scaling",
    context: "Designed and implemented the strategic Data-Driven Marketing (DDM) framework across premium pet care brands (Pedigree, Whiskas, Sheba) in India.",
    scope: [
      "End-to-end launch of the digital first-party data framework (DDM)",
      "Sampling-led lead acquisition models & lifecycle CRM strategy",
      "Social commerce integration and strategic payment-partner programs"
    ],
    tools: [
      "Google Ads",
      "Meta Ads Manager",
      "Instagram Shop & Social Commerce",
      "Salesforce Marketing Cloud",
      "Google Analytics 4",
      "Payment APIs (Google Pay, PhonePe, Paytm)"
    ],
    interventions: [
      "Built the architectural roadmap for first-party CRM collection, designing compliance-aligned user flows to turn passive shoppers into active contacts.",
      "Launched a high-velocity, digital sampling engine matching prospective pet owners with specialized, age-appropriate pet food samples.",
      "Spearheaded the integration of Mars Petcare's first native Instagram Shop social commerce channel in India.",
      "Engineered co-branded acquisition offers inside GPay, PhonePe, and Paytm, utilizing transactional signals to identify high-intent consumers."
    ],
    outcomes: [
      "Distributed 655K samples in 3 months—hitting 50% of the annual scale target ahead of schedule.",
      "Reduced the cost-per-sample (CPS) by an outstanding 40% through precise spatial targeting.",
      "Established standard social checkout pipelines, transforming social discovery into direct, friction-free transactions."
    ]
  },
  {
    id: "brane",
    title: "Brane Enterprises",
    subtitle: "SaaS Go-To-Market Systems",
    context: "Structured marketing operations and designed scalable Go-To-Market (GTM) frameworks for an enterprise-grade SaaS technology platform.",
    scope: [
      "Cross-functional squad leadership (PMs, designers, developers)",
      "Funnel mapping, core messaging, and customer journey orchestration",
      "GTM positioning templates and operating model creation"
    ],
    tools: [
      "Amplitude Analytics",
      "Google Analytics 4",
      "SQL Data Extraction",
      "Jira / Confluence",
      "Figma Prototype Mapping",
      "Customer.io (Email automation)"
    ],
    interventions: [
      "Chaired a 12-person cross-functional squad of product managers, copywriters, interface designers, and front-end engineers.",
      "Map out product-led onboarding paths, isolating primary drop-off spots and proposing personalized lifecycle emails.",
      "Created standardized GTM operational templates to govern future product releases, feature launch criteria, and messaging guidelines."
    ],
    outcomes: [
      "Shortened product release-to-market marketing cycles by aligning design and development sprints.",
      "Established comprehensive analytical tracking from initial touchpoint to product signup, mapping conversion friction accurately."
    ]
  },
  {
    id: "cloudtail",
    title: "Prione / Cloudtail",
    subtitle: "Amazon JV Store-Scouting & Lead Generation Models",
    context: "Optimized lead-generation models and physical expansion frameworks for the 'Amazon Easy' franchise store networks during a competitive MBA internship.",
    scope: [
      "Quantitative performance evaluation of acquisition channels",
      "A/B test coordination for digital lead acquisition models",
      "Spatial scouting and store expansion turnaround optimization"
    ],
    tools: [
      "Meta Ads Manager",
      "Excel (Solver, Optimization Models)",
      "QGIS Spatial Analysis",
      "A/B Testing Methodologies",
      "Salesforce CRM"
    ],
    interventions: [
      "Designed and executed structured A/B tests comparing standard Meta Lead Ads against custom interactive quiz flows.",
      "Formulated a rigorous mathematical channel cost-effectiveness framework to evaluate lead channels.",
      "Built a prototype location-scouting tool incorporating demographic and logistics layers to score potential franchise territories."
    ],
    outcomes: [
      "Boosted high-intent (hot-lead) conversion rates from lead ads to 66%–74%.",
      "Slashed cost-per-hot-lead (CPHL) by over 50% down to approximately ~₹29.",
      "Generated over 4,000+ validated leads within a 2-month pilot timeframe.",
      "Reduced store location turnaround times by ~40% through automated scoring filters."
    ]
  },
  {
    id: "jumia",
    title: "Jumia (Egypt)",
    subtitle: "E-Commerce Return-Rate Analysis & Optimization",
    context: "A live, Country Manager-validated project targeting the optimization and reduction of product returns for Egypt's leading e-commerce portal.",
    scope: [
      "Root-cause analytics of return contributors across categories and warehouses",
      "Policy auditing and benchmarking against regional peer networks",
      "UX concept design for size-recommendation tools and onboarding flows"
    ],
    tools: [
      "Power BI",
      "SQL Querying (Redshift)",
      "Excel Statistical Analysis",
      "Figma Prototype Layouts",
      "Google Analytics"
    ],
    interventions: [
      "Extracted and segmented millions of purchase records to trace high-frequency return indicators.",
      "Audited return rules and timelines against major Middle East/North Africa competitors, revealing friction gaps.",
      "Co-designed 6 targeted UX initiatives, including high-accuracy interactive size guides and unboxing tutorials.",
      "Built a diagnostic Power BI dashboard to track returns by category, seller tier, and specific warehouse sorting facilities."
    ],
    outcomes: [
      "Identified 20+ specific operational and return policy improvements aiming for a 30% overall reduction in returns.",
      "Presented and successfully validated the analytical findings and proposals directly with the Country Manager of Jumia Egypt."
    ]
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "mars-timeline",
    role: "DDM Program Manager",
    company: "Mars Pet Nutrition",
    location: "Hyderabad, India",
    period: "May 2025 – Feb 2026",
    highlights: [
      "Established the Data-Driven Marketing framework from scratch, creating valuable first-party relationships with pet owners.",
      "Led the sampling-led lead program delivering 655K direct product trials in a 3-month cycle, hitting 50% of the annual scale goal.",
      "Optimized digital acquisition strategies, achieving a 40% reduction in cost-per-sample.",
      "Collaborated with product, sales, and tech to deploy first-of-its-kind social commerce integrations (Instagram Shop) and major digital payments partnerships."
    ]
  },
  {
    id: "brane-timeline",
    role: "Product Leader – Marketing",
    company: "Brane Enterprises",
    location: "Hyderabad, India",
    period: "Mar 2024 – Feb 2025",
    highlights: [
      "Directed cross-functional marketing and design squads for high-growth SaaS initiatives, managing timelines and core features.",
      "Engineered comprehensive funnel tracking, onboarding analytics, and automated CRM retention schedules.",
      "Designed and executed targeted B2B/B2C acquisition campaigns, structuring scalable marketing operational models."
    ]
  },
  {
    id: "dominos-timeline",
    role: "Deputy Manager – Digital Marketing",
    company: "Jubilant FoodWorks / Domino's Pizza India",
    location: "Noida, India",
    period: "Aug 2021 – Mar 2023",
    highlights: [
      "Owned digital spend execution of ₹7Cr+ monthly across Meta, Google, CRM, affiliates, and influencers for 2,000+ nationwide restaurants.",
      "Achieved 17% YoY order/customer growth, lifting web traffic by +35%, conversion rates by +25%, and total sales by +11%.",
      "Pioneered structured geo-incrementality testing models (5 completed pilots), proving net-positive media budget attribution.",
      "Supervised a network of 10+ creative, influencer, and performance media agencies, streamlining media buying operations."
    ]
  },
  {
    id: "simplygrow-timeline",
    role: "Assistant Sales Manager",
    company: "Simply Grow Technologies",
    location: "Hyderabad, India",
    period: "Dec 2017 – Nov 2018",
    highlights: [
      "Led financial distributor onboarding and managed relationships across 35 BSE-listed Asset Management Companies (AMCs).",
      "Maintained a total SIP volume book of +₹120Cr and lump-sum investment portfolios of +₹42Cr.",
      "Acquired over 12,500+ investor registrations in 7 months, achieving a 95% overall Customer Satisfaction (CSAT) rating."
    ]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "audit",
    title: "Performance Marketing Audit",
    bestFor: "Brands seeking a rigorous, unbiased second opinion on media spend efficiency, account structure, and growth potential.",
    whatYouGet: [
      "Deep-dive structural audit of Google, Meta, and programmatic accounts to isolate budget waste.",
      "Attribution and tracking integrity check, conducting attribution clean-up and incrementality testing.",
      "Practical, priority-ranked checklist of immediate optimizations to reduce CAC and boost ROAS."
    ]
  },
  {
    id: "sprint",
    title: "Growth Strategy Sprint",
    bestFor: "D2C and consumer brands aiming to double spend or prepare for structured, VC-backed scaling.",
    whatYouGet: [
      "Custom-built unit economics models aligning paid media targets directly with gross margin requirements.",
      "A complete 90-day multi-channel execution blueprint defining budget caps, targeting grids, and content plans.",
      "Structured messaging grids detailing visual and copy requirements for creative and video hooks."
    ]
  },
  {
    id: "measurement",
    title: "Measurement & Tracking Review",
    bestFor: "Teams experiencing conversion discrepancies, GA4 reporting lag, or attribution gaps.",
    whatYouGet: [
      "Complete GTM & GA4 configuration audit, ensuring custom events align with backend revenue logs.",
      "Implementation guidelines for GA4 & GTM tracking audits, first-party cookies, and first-party measurement clarity.",
      "Pre-written SQL models and cohort analytics templates to monitor user lifetime value (LTV) and CAC cycles."
    ]
  },
  {
    id: "fractional",
    title: "Fractional Performance Support",
    bestFor: "High-growth consumer or SaaS brands needing senior, strategic media and metrics oversight without the overhead of a full-time CMO.",
    whatYouGet: [
      "Weekly strategic squad governance, keeping creative and technical media agencies accountable to margin goals.",
      "Active budget orchestration, dynamically shifting media investments based on real-time margin metrics.",
      "Polished, board-ready performance and incrementality reporting decks matching executive expectations."
    ]
  }
];

export const GROWTH_NOTES: GrowthNote[] = [
  {
    id: "note-1",
    title: "Incrementality beats platform comfort",
    content: "Platform-reported ROAS is frequently a mirage of overlapping claims. Only structured geo-incrementality tests—evaluating lift in isolated control vs. test regions—can truly prove if digital media spending is generating net-new, profitable acquisitions."
  },
  {
    id: "note-2",
    title: "Social commerce is a performance channel",
    content: "With deeply integrated checkout funnels and co-marketing payment-partner rewards, social channels have evolved from general awareness billboards to highly direct, single-tap purchase portals."
  },
  {
    id: "note-3",
    title: "Measurement clarity is a growth advantage",
    content: "When you know exactly how first-party sampling programs, transaction-led partnerships, and digital programmatic budgets combine to lift customer lifetime value, scaling decisions cease to be a gamble."
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Who is Anvesh Seeli?",
    answer: "Anvesh Seeli is a performance marketing and growth professional based in India. He has worked across Domino's Pizza India, Mars Pet Nutrition, Brane Enterprises, Prione / Cloudtail, Jumia Egypt and Simply Grow Technologies, with a focus on paid media, measurement, incrementality and commerce-led growth."
  },
  {
    id: "faq-2",
    question: "What does Anvesh Seeli specialize in?",
    answer: "Anvesh specializes in performance marketing, growth strategy, Google Ads, Meta Ads, Performance Max, GA4/GTM measurement, attribution clean-up, geo-incrementality testing, CAC optimization, CRM, social commerce and D2C growth."
  },
  {
    id: "faq-3",
    question: "What brands and businesses has Anvesh Seeli worked with?",
    answer: "Anvesh has worked on growth and marketing problems across Domino's Pizza India, Mars Pet Nutrition brands including Pedigree, Whiskas and Sheba, Brane Enterprises, Prione / Cloudtail, Jumia Egypt and Simply Grow Technologies."
  },
  {
    id: "faq-4",
    question: "Does Anvesh Seeli offer GA4 and GTM tracking audits?",
    answer: "Yes. Anvesh works on GA4/GTM tracking reviews, attribution sanity checks, funnel measurement audits and source-of-truth reporting structures to help brands understand whether media spend is generating measurable business outcomes."
  },
  {
    id: "faq-5",
    question: "What is Anvesh Seeli's experience with geo-incrementality?",
    answer: "At Domino's Pizza India, Anvesh helped run localized geo-incrementality tests to evaluate true media contribution, justify ₹2Cr+ in monthly media spend and prove an 8% incremental revenue lift."
  },
  {
    id: "faq-6",
    question: "What does a performance marketing consultant do?",
    answer: "A performance marketing consultant drives measurable business outcomes such as customer acquisition, app installs and incremental sales using paid digital channels. They optimize media budgets, improve conversion rates, evaluate tracking integrity and align CAC, ROAS and LTV with business profitability."
  },
  {
    id: "faq-7",
    question: "What services does Anvesh Seeli offer?",
    answer: "Anvesh offers performance marketing audits, growth strategy sprints, GA4/GTM measurement reviews and fractional growth/performance support for consumer brands, D2C businesses, QSR, FMCG, pet nutrition, SaaS and ecommerce teams."
  },
  {
    id: "faq-8",
    question: "How do I contact or hire Anvesh Seeli?",
    answer: "You can book a 30-minute introductory call through the Calendly link on this website, download his resume, email him at hi@anveshseeli.com or connect with him on LinkedIn at linkedin.com/in/anvesh-seeli."
  }
];
