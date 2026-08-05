import React from 'react';
import { Calendar, Mail, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-[#1F1B17] text-[#EDE6DA]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-[#A89F91] block mb-2">
            COLLABORATION
          </span>
          <h2 className="font-serif text-3xl font-medium text-[#EDE6DA]">
            Let's engineer your growth pipeline.
          </h2>
          <p className="mt-4 text-[#A89F91]">
            Whether you want to audit a high-spend account, run GA4 &amp; GTM tracking audits, or require fractional growth management, let's explore how we can align your spend with business margins.
          </p>
        </div>

        <div className="grid gap-4">
          {/* Introductory Session Card */}
          <a
            href="https://calendly.com/seelianvesh/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between rounded-lg border border-[#38332E] bg-[#B04A2A] p-5 transition-all hover:bg-[#A04022]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-white/80">
                  INTRODUCTORY SESSION
                </span>
                <span className="font-serif text-lg font-medium text-white">
                  Book a 30-Min Call
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Direct Inquiry Card */}
          <a
            href="mailto:hi@anveshseeli.com"
            className="group relative flex items-center justify-between rounded-lg border border-[#38332E] bg-[#26221D] p-5 transition-all hover:border-[#524B44]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#38332E] text-[#EDE6DA]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#A89F91]">
                  DIRECT INQUIRY
                </span>
                <span className="font-serif text-lg font-medium text-[#EDE6DA]">
                  hi@anveshseeli.com
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#A89F91] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Professional Network Card */}
          <a
            href="https://www.linkedin.com/in/anvesh-seeli/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between rounded-lg border border-[#38332E] bg-[#26221D] p-5 transition-all hover:border-[#524B44]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#38332E] text-[#EDE6DA]">
                <Linkedin className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#A89F91]">
                  PROFESSIONAL NETWORK
                </span>
                <span className="font-serif text-lg font-medium text-[#EDE6DA]">
                  LinkedIn Profile
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#A89F91] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Creative & Insights / Instagram Card */}
          <a
            href="https://www.instagram.com/the_performanceengineer/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between rounded-lg border border-[#38332E] bg-[#26221D] p-5 transition-all hover:border-[#524B44]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#38332E] text-[#EDE6DA]">
                <Instagram className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#A89F91]">
                  CREATIVE &amp; INSIGHTS
                </span>
                <span className="font-serif text-lg font-medium text-[#EDE6DA]">
                  Instagram Profile
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#A89F91] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
