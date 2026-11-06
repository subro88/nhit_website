'use client';

/*
 * TradeDetail — full page renderer for an ITI trade detail route.
 * Composes sections from the trade's data object with scroll-reveal
 * animations, count-up metrics and accent theming via CSS variables.
 */

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SubpageHero from '@/components/layout/SubpageHero';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Cog,
  Quote,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import type { ITITrade } from './tradeData';
import { ADMISSION_STEPS } from './tradeData';
import {
  accVars,
  ApplyCard,
  BrochureCard,
  CareerPath,
  ContactCard,
  CtaBand,
  FaqRow,
  MetricStrip,
  PayBands,
  Reveal,
  SectionHead,
  SemesterRow,
  ToolGroupList,
} from './tradeShared';

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}

export default function TradeDetail({ trade }: { trade: ITITrade }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openSem, setOpenSem] = useState<number>(1);

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]" style={accVars(trade.accent, trade.accentDeep)}>
      <SubpageHero
        kicker={trade.heroKicker}
        title={`ITI ${trade.trade} Trade`}
        subtitle={trade.heroSubtitle}
        breadcrumbs={[
          { label: 'ITI Courses', href: '/iti-courses' },
          { label: `ITI ${trade.trade}` },
        ]}
      />

      <MetricStrip metrics={trade.metrics} />

      <main className="max-w-7xl mx-auto px-5 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ------------------------------- main column ------------------------------- */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <Reveal>
              <Card>
                <SectionHead
                  icon={trade.trade === 'Electrician' ? Zap : Cog}
                  kicker="About the Trade"
                  title="Trade Overview"
                />
                <div className="space-y-4">
                  {trade.overview.paras.map((p, i) => (
                    <p key={i} className="text-gray-600 leading-relaxed text-sm md:text-[15px]">
                      {p}
                    </p>
                  ))}
                </div>

                {/* image collage */}
                <div className="relative mt-6 mb-10">
                  <div className="relative h-60 md:h-80 w-full rounded-2xl overflow-hidden border border-gray-200">
                    <Image
                      src={trade.overview.image}
                      alt={trade.overview.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-gray-900 shadow">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[color:var(--acc)]" /> {trade.overview.badge}
                    </span>
                  </div>
                  <div className="trade-float absolute -bottom-8 right-3 md:right-6 w-40 md:w-56">
                    <div className="relative h-24 md:h-32 rounded-xl overflow-hidden border-4 border-white shadow-xl">
                      <Image
                        src={trade.overview.inset.image}
                        alt={trade.overview.inset.alt}
                        fill
                        className="object-cover"
                        sizes="220px"
                      />
                    </div>
                    <span className="mt-2 text-[10px] font-bold text-gray-600 bg-white/90 rounded-full px-2.5 py-1 shadow-sm inline-block">
                      {trade.overview.inset.caption}
                    </span>
                  </div>
                </div>

                {/* key facts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {trade.keyFacts.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:border-[color:var(--acc-soft2)] transition-colors"
                    >
                      <f.icon className="w-[18px] h-[18px] text-[color:var(--acc)] shrink-0 mt-0.5" />
                      <span>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          {f.label}
                        </span>
                        <span className="block text-xs font-bold text-gray-900 mt-0.5">{f.value}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>

            {/* Why this trade — highlights */}
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trade.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="w-10 h-10 rounded-xl bg-[color:var(--acc-soft)] flex items-center justify-center">
                      <h.icon className="w-5 h-5 text-[color:var(--acc)]" />
                    </span>
                    <h4 className="font-black text-gray-900 text-sm mt-3 font-montserrat">{h.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1.5">{h.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Career path, outcomes & pay */}
            <Reveal>
              <Card>
                <SectionHead
                  icon={TrendingUp}
                  kicker="Career Scope"
                  title="Career Path, Roles & Earnings"
                  lead="From paid apprenticeship to supervisory cadre — the structured growth ladder for an NCVT-certified craftsman."
                />
                <CareerPath steps={trade.career.steps} />

                <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 font-montserrat mt-8 mb-3">
                  Top Career Outcomes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {trade.career.outcomes.map((o, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:border-[color:var(--acc-soft2)] hover:bg-white transition-colors"
                    >
                      <span className="w-8 h-8 shrink-0 rounded-lg bg-[color:var(--acc-soft)] flex items-center justify-center">
                        <o.icon className="w-4 h-4 text-[color:var(--acc)]" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold text-gray-900">{o.role}</span>
                        <span className="block text-[11px] text-gray-500 mt-0.5 leading-relaxed">{o.where}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 font-montserrat mt-8 mb-4">
                  Indicative Earnings
                </h4>
                <div className="bg-gray-50 rounded-xl border border-gray-100 p-5">
                  <PayBands bands={trade.career.payBands} note={trade.career.payNote} />
                </div>
              </Card>
            </Reveal>

            {/* Curriculum */}
            <Reveal>
              <Card>
                <SectionHead
                  icon={Cog}
                  kicker="Curriculum"
                  title="2-Year Trade Curriculum"
                  lead="Prescribed by DGT / NCVT under the Craftsman Training Scheme (CTS)."
                />
                <div className="flex justify-end -mt-2 mb-4">
                  <a
                    href={trade.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-[11px] font-bold hover:bg-gray-800 transition-colors shadow-sm"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[color:var(--acc)]" /> Download Brochure
                  </a>
                </div>
                <div className="space-y-3">
                  {trade.semesters.map((s) => (
                    <SemesterRow
                      key={s.sem}
                      s={s}
                      open={openSem === s.sem}
                      onToggle={() => setOpenSem(openSem === s.sem ? 0 : s.sem)}
                    />
                  ))}
                </div>
              </Card>
            </Reveal>

            {/* Workshop & equipment */}
            <Reveal>
              <Card>
                <SectionHead
                  icon={Wrench}
                  kicker="Infrastructure"
                  title="Workshop, Tools & Equipment"
                  lead="DGT-prescribed machinery, instruments and trainers — every trainee works hands-on, not on paper."
                />
                <div className="relative mb-8">
                  <div className="relative h-56 md:h-72 w-full rounded-2xl overflow-hidden border border-gray-200">
                    <Image
                      src={trade.workshop.image}
                      alt={trade.workshop.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    <span className="absolute top-4 right-4 text-[10px] font-bold text-white bg-[linear-gradient(135deg,var(--acc),var(--acc-deep))] rounded-full px-3 py-1.5 shadow">
                      {trade.workshop.caption}
                    </span>
                  </div>
                  {trade.workshop.inset && (
                    <>
                      <div className="absolute -bottom-6 left-3 md:left-6">
                        <div className="relative h-20 md:h-28 w-32 md:w-48 rounded-xl overflow-hidden border-4 border-white shadow-xl">
                          <Image
                            src={trade.workshop.inset.image}
                            alt={trade.workshop.inset.alt}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        </div>
                      </div>
                      <span className="absolute -bottom-3 right-3 md:right-6 text-[10px] font-bold text-white bg-[linear-gradient(135deg,var(--acc),var(--acc-deep))] rounded-full px-3 py-1.5 shadow">
                        {trade.workshop.inset.caption}
                      </span>
                    </>
                  )}
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${trade.workshop.inset ? 'mt-10' : 'mt-2'}`}>
                  {trade.workshop.groups.map((g, i) => (
                    <ToolGroupList key={i} heading={g.heading} items={g.items} />
                  ))}
                </div>
              </Card>
            </Reveal>

            {/* Recruiters */}
            <Reveal>
              <Card>
                <SectionHead
                  icon={Building2}
                  kicker="Recruitment"
                  title="Government PSU & Railway Recruiters"
                  lead="NCVT certification makes graduates eligible for the biggest public-sector technician intakes in the country."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trade.recruitersGov.map((p, i) => (
                    <div
                      key={i}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-[color:var(--acc-soft2)] hover:shadow-md transition-all"
                    >
                      <h4 className="font-bold text-gray-900 text-sm">{p.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 font-montserrat mt-6 mb-3">
                  Private-Sector Recruiters
                </h4>
                <div className="flex flex-wrap gap-2">
                  {trade.recruitersPrivate.map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[color:var(--acc-soft)] text-[11px] font-bold text-gray-800 border border-[color:var(--acc-soft2)]"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[color:var(--acc)]" /> {c}
                    </span>
                  ))}
                </div>
              </Card>
            </Reveal>

            {/* In-charge perspective */}
            <Reveal>
              <div className="relative bg-[#151515] rounded-2xl p-6 md:p-8 border border-gray-800 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 15% 20%, var(--acc) 0%, transparent 45%), radial-gradient(circle at 85% 80%, var(--acc-deep) 0%, transparent 45%)',
                  }}
                />
                <Quote className="relative w-8 h-8 text-[color:var(--acc)] mb-4" />
                <p className="relative text-sm md:text-base text-neutral-200 leading-relaxed italic">
                  &ldquo;{trade.inCharge.quote}&rdquo;
                </p>
                <div className="relative flex items-center gap-3 mt-6">
                  <span className="w-11 h-11 rounded-full bg-[linear-gradient(135deg,var(--acc),var(--acc-deep))] text-white font-black flex items-center justify-center text-base font-montserrat">
                    {trade.inCharge.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-black text-white font-montserrat">
                      {trade.inCharge.name}
                    </span>
                    <span className="block text-[11px] text-neutral-400">{trade.inCharge.role}</span>
                  </span>
                </div>
              </div>
            </Reveal>

            {/* FAQ */}
            <Reveal>
              <Card>
                <SectionHead
                  icon={Users}
                  kicker="Admission Help"
                  title="Frequently Asked Questions"
                />
                <div className="space-y-3">
                  {trade.faqs.map((f, i) => (
                    <FaqRow
                      key={i}
                      q={f.q}
                      a={f.a}
                      open={openFaq === i}
                      onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                    />
                  ))}
                </div>
              </Card>
            </Reveal>
          </div>

          {/* ------------------------------- sidebar ------------------------------- */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 space-y-6">
              <ApplyCard
                trade={`ITI ${trade.trade}`}
                seats={20}
                eligibility="10th standard (Madhyamik) pass with Science & Mathematics. Minimum age 14 years, no upper limit."
              />

              <Reveal delay={100}>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-3 font-montserrat">
                    Other ITI Trade at NHIT
                  </h4>
                  <Link
                    href={trade.otherTrade.href}
                    className="group block rounded-xl overflow-hidden border border-gray-200 hover:border-[color:var(--acc)] hover:shadow-lg transition-all"
                  >
                    <div className="relative h-28 w-full">
                      <Image
                        src={trade.otherTrade.image}
                        alt={trade.otherTrade.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="360px"
                      />
                    </div>
                    <div className="p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm text-gray-900 font-montserrat">
                          {trade.otherTrade.name}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[color:var(--acc)] group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">{trade.otherTrade.desc}</p>
                      <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[color:var(--acc-soft)] text-[color:var(--acc)]">
                        20 Seats · 2 Years
                      </span>
                    </div>
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <BrochureCard href={trade.brochureUrl} />
              </Reveal>

              <Reveal delay={200}>
                <ContactCard />
              </Reveal>
            </div>
          </div>
        </div>
      </main>

      <CtaBand trade={trade.trade} steps={ADMISSION_STEPS} />
    </div>
  );
}
