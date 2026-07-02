export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  context: string;
  scope: string[];
  tools: string[];
  interventions: string[];
  outcomes: string[];
}

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  bestFor: string;
  whatYouGet: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GrowthNote {
  id: string;
  title: string;
  content: string;
}
