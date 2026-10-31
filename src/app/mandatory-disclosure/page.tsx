import React from 'react';
import type { Metadata } from 'next';
import {
  FileText,
  ShieldCheck,
  Landmark,
  Building2,
  GraduationCap,
  Users,
  Wallet,
  ClipboardList,
  Info,
  ArrowUpRight,
  CheckCircle2,
  ScrollText,
  Scale,
  University,
  FileBadge,
} from 'lucide-react';
import SubpageHero from '@/components/layout/SubpageHero';
import DisclosureNav from '@/components/disclosure/DisclosureNav';
import FacultyTable from '@/components/disclosure/FacultyTable';
import { readCmsPage } from '@/components/layout/CmsContentPage';
import '@/styles/disclosure.css';
import {
  institution,
  landDetails,
  society,
  principal,
  affiliation,
  bog,
  antiRaggingCommittee,
  antiRaggingSquad,
  icc,
  scst,
  iqac,
  committeeOrders,
  programmesDiploma,
  programmesWorking,
  programmesUg,
  placement,
  feesDiploma3y,
  feesDiploma2yIti,
  admissionProcess,
  admissionDocuments,
  teachingRooms,
  supportReadyRooms,
  officeRooms,
  loiDocs,
  eoaDocs,
  eoaReportPages,
  auditDocs,
  type KV,
  type DiscTable,
  type CommitteeRow,
} from '@/data/mandatoryDisclosure';

export function generateMetadata(): Metadata {
  const page = readCmsPage('mandatory-disclosure');
  return {
    title: page.meta?.title ?? 'Mandatory Disclosure — NHIT Durgapur',
    description: page.meta?.description,
  };
}

/* ------------------------------------------------------------ helpers -- */

function Section({
  id,
  no,
  title,
  sub,
  children,
}: {
  id: string;
  no: string;
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="disc-section" id={id}>
      <div className="disc-section__head">
        <span className="disc-section__no">{no}</span>
        <h2 className="disc-section__title">{title}</h2>
      </div>
      {sub && <p className="disc-section__sub">{sub}</p>}
      {children}
    </section>
  );
}

function Subhead({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <h3 className="disc-subhead">
      <Icon size={17} strokeWidth={2.2} />
      {children}
    </h3>
  );
}

function KVGrid({ items, wide }: { items: KV[]; wide?: boolean }) {
  return (
    <div className={`disc-kv${wide ? ' disc-kv--wide' : ''}`}>
      {items.map((kv) => (
        <div className="disc-kv__item" key={kv.label}>
          <div className="disc-kv__label">{kv.label}</div>
          <div className="disc-kv__value">
            {kv.href ? <a href={kv.href}>{kv.value}</a> : kv.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScrollTable({ table, wide }: { table: DiscTable; wide?: boolean }) {
  return (
    <div className="disc-scroll">
      <table className={`disc-table${wide ? ' disc-table--room' : ''}`}>
        <thead>
          <tr>
            {table.columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ratioClass(ratio: string): string {
  const v = parseFloat(ratio);
  if (v >= 85) return 'disc-ratio';
  if (v >= 60) return 'disc-ratio disc-ratio--mid';
  return 'disc-ratio disc-ratio--low';
}

function PlacementTable() {
  return (
    <div className="disc-scroll">
      <table className="disc-table disc-table--min">
        <thead>
          <tr>
            <th>Session / Batch</th>
            <th className="num">Total Students</th>
            <th className="num">Placeable / Opted for Placement</th>
            <th className="num">Placed</th>
            <th className="num">Ratio</th>
          </tr>
        </thead>
        <tbody>
          {placement.rows.map((r) => (
            <tr key={r[0]}>
              <td className="row-strong">{r[0]}</td>
              <td className="num">{r[1]}</td>
              <td className="num">{r[2]}</td>
              <td className="num">{r[3]}</td>
              <td className="num">
                <span className={ratioClass(r[4])}>{r[4]}%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Committee tables share the constant order reference + date, so those two
   values are stated once in the caption instead of repeated in every row. */
function CommitteeTable({
  rows,
  variant,
}: {
  rows: CommitteeRow[];
  variant: 'antiRagging' | 'icc' | 'scst' | 'iqac';
}) {
  const heads: Record<typeof variant, string[]> = {
    antiRagging: ['Name', 'Role', 'Department / Association', 'Mobile', 'E-mail'],
    icc: ['Name', 'Role', 'Department / Association', 'Designation', 'Gender', 'Mobile', 'E-mail'],
    scst: ['Name', 'Role', 'Department / Association', 'Caste', 'Gender', 'Mobile', 'E-mail'],
    iqac: ['Name', 'Designation', 'Associated with', 'Mobile', 'E-mail', 'Gender'],
  };

  return (
    <div className="disc-scroll">
      <table className="disc-table">
        <thead>
          <tr>
            {heads[variant].map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.name}-${r.role}`}>
              <td className="row-strong">{r.name}</td>
              <td className="nw">{r.role}</td>
              <td>{r.dept}</td>
              {variant === 'icc' && <td>{r.extra}</td>}
              {variant === 'icc' && <td>{r.gender}</td>}
              {variant === 'scst' && <td>{r.extra}</td>}
              {variant === 'scst' && <td>{r.gender}</td>}
              <td className="num">{r.mobile}</td>
              <td>
                <a href={`mailto:${r.email}`}>{r.email}</a>
              </td>
              {variant === 'iqac' && <td>{r.gender}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DocGrid({ docs }: { docs: { label: string; url: string }[] }) {
  return (
    <div className="disc-docs-grid">
      {docs.map((d) => (
        <a
          key={d.label}
          className="disc-doc"
          href={d.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="disc-doc__icon">
            <FileText size={17} strokeWidth={2} />
          </span>
          <span className="disc-doc__label">{d.label}</span>
          <span className="disc-doc__action">
            View
            <ArrowUpRight size={13} strokeWidth={2.4} />
          </span>
        </a>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------- page -- */

export default function MandatoryDisclosurePage() {
  const diplomaIntake = programmesDiploma.rows.reduce((sum, r) => sum + parseInt(r[5], 10), 0);
  const totalStaff = 58; /* = staff.length, kept in sync with the data file */
  const approvalCount = loiDocs.length + eoaDocs.length;

  const stats = [
    { num: String(approvalCount), label: 'AICTE approval documents (2007 – 2025)' },
    { num: '6 + 2', label: 'Diploma + Under-graduate programmes' },
    { num: String(diplomaIntake), label: 'Approved diploma intake 2024-25' },
    { num: String(totalStaff), label: 'Faculty members on record' },
  ];

  return (
    <>
      <SubpageHero
        kicker="AICTE Statutory Disclosure"
        title="Mandatory Disclosure"
        subtitle="Complete statutory information as required by the AICTE Approval Process Handbook — approvals, governance, committees, programmes, faculty, fees, admission and infrastructure."
        breadcrumbs={[{ label: 'About NHIT', href: '/about' }, { label: 'Mandatory Disclosure' }]}
        badge="AICTE Approved · Est. 2007"
      />

      <div className="disc-main">
        <div className="disc-shell">
          <div className="disc-layout">
            <DisclosureNav />

            <div className="disc-content">
              {/* ------------------------------------------------ stats */}
              <div className="disc-stats">
                {stats.map((s) => (
                  <div className="disc-stat" key={s.label}>
                    <div className="disc-stat__num">{s.num}</div>
                    <div className="disc-stat__label">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* ---------------------------------------- 01 institution */}
              <Section
                id="institution"
                no="01"
                title="Institution Details"
                sub="Legal identity and contact particulars of the institute, together with the land on which the campus stands."
              >
                <KVGrid items={institution} wide />
                <Subhead icon={Landmark}>Land Details</Subhead>
                <KVGrid items={landDetails} />
              </Section>

              {/* -------------------------------------------- 02 society */}
              <Section
                id="society"
                no="02"
                title="Name & Address of the Society"
                sub="The promoting body under which the institute is established."
              >
                <KVGrid items={society} wide />
              </Section>

              {/* ------------------------------------------- 03 principal */}
              <Section
                id="principal"
                no="03"
                title="Name & Address of the Principal"
                sub="Head of the institute — qualifications, experience and contact details (this also constitutes the statutory Profile of Director / Principal)."
              >
                <KVGrid items={principal} wide />
              </Section>

              {/* ---------------------------------------- 04 affiliation */}
              <Section
                id="affiliation"
                no="04"
                title="Affiliating Body"
                sub="The council to which the institute is affiliated for its diploma programmes."
              >
                <KVGrid items={affiliation} wide />
              </Section>

              {/* ----------------------------------------- 05 governance */}
              <Section
                id="governance"
                no="05"
                title="Board of Governors / Academic Advisory Body"
                sub="Constitution of the governing council with nominees of AICTE, the State Council and the Director of Technical Education."
              >
                <ScrollTable table={bog} />
              </Section>

              {/* ------------------------------------------ 06 approvals */}
              <Section
                id="approvals"
                no="06"
                title="AICTE Approvals — LoA & Extensions of Approval"
                sub="Letter of Intent and every yearly Extension of Approval (EoA) from 2007-08 through 2024-25, exactly as issued by AICTE. Links open the original PDFs on the institute's record server."
              >
                <div className="disc-docs">
                  {loiDocs.map((d) => (
                    <a key={d.label} className="disc-doc" href={d.url} target="_blank" rel="noopener noreferrer">
                      <span className="disc-doc__icon">
                        <FileBadge size={17} strokeWidth={2} />
                      </span>
                      <span className="disc-doc__label">{d.label}</span>
                      <span className="disc-doc__action">
                        View <ArrowUpRight size={13} strokeWidth={2.4} />
                      </span>
                    </a>
                  ))}
                  {eoaDocs.map((d) => (
                    <a key={d.label} className="disc-doc" href={d.url} target="_blank" rel="noopener noreferrer">
                      <span className="disc-doc__icon">
                        <FileText size={17} strokeWidth={2} />
                      </span>
                      <span className="disc-doc__label">{d.label}</span>
                      <span className="disc-doc__action">
                        View <ArrowUpRight size={13} strokeWidth={2.4} />
                      </span>
                    </a>
                  ))}
                </div>

                <Subhead icon={ScrollText}>EOA Report 2025-26 (AICTE Portal Copy)</Subhead>
                <div className="disc-pages">
                  {eoaReportPages.map((p) => (
                    <a key={p.label} className="disc-page" href={p.url} target="_blank" rel="noopener noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt={p.label} loading="lazy" />
                      <span className="disc-page__label">{p.label}</span>
                    </a>
                  ))}
                </div>
              </Section>

                      {/* -------------------------------------- 07 anti-ragging */}
              <Section
                id="anti-ragging"
                no="07"
                title="Anti-Ragging Cell"
                sub="Committee and Squad constituted per UGC / AICTE anti-ragging regulations. Ragging is strictly prohibited; complaints are acted on immediately."
              >
                <Subhead icon={Info}>Grievance Redressal System</Subhead>
                <div className="disc-note">
                  <Info size={17} strokeWidth={2.2} />
                  <span>
                    Grievances of students, parents and staff are handled by the Grievance Redressal
                    Committee constituted as per AICTE norms. Written grievances may be addressed to
                    the Principal at <a href="mailto:principal@nhit.in">principal@nhit.in</a> or
                    by phone at <a href="tel:+913432542106">0343-2542106</a>.
                  </span>
                </div>

                <Subhead icon={ShieldCheck}>Anti-Ragging Committee</Subhead>
                <p className="disc-caption">
                  Appointment Order: <strong>{committeeOrders.antiRagging}</strong> — applicable to all members below.
                </p>
                <CommitteeTable rows={antiRaggingCommittee} variant="antiRagging" />

                <Subhead icon={ShieldCheck}>Anti-Ragging Squad</Subhead>
                <p className="disc-caption">
                  Appointment Order: <strong>{committeeOrders.antiRagging}</strong> — applicable to all members below.
                </p>
                <CommitteeTable rows={antiRaggingSquad} variant="antiRagging" />
              </Section>

              {/* ------------------------------------------------ 08 icc */}
              <Section
                id="icc"
                no="08"
                title="Internal Complaint Committee (ICC)"
                sub="Constituted under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013."
              >
                <p className="disc-caption">
                  Appointment Order: <strong>{committeeOrders.icc}</strong> — applicable to all members below.
                </p>
                <CommitteeTable rows={icc} variant="icc" />
              </Section>

              {/* ---------------------------------------------- 09 sc/st */}
              <Section
                id="scst"
                no="09"
                title="Committee for SC / ST"
                sub="Redressal and monitoring cell for students and staff belonging to Scheduled Castes and Scheduled Tribes."
              >
                <p className="disc-caption">
                  Appointment Order: <strong>{committeeOrders.scst}</strong> — applicable to all members below.
                </p>
                <CommitteeTable rows={scst} variant="scst" />
              </Section>

              {/* ------------------------------------------------ 10 iqac */}
              <Section
                id="iqac"
                no="10"
                title="Internal Quality Assurance Cell (IQAC)"
                sub="Cell responsible for quality assurance and enhancement of academic and administrative performance."
              >
                <p className="disc-caption">
                  Appointment Order: <strong>{committeeOrders.iqac}</strong> — applicable to all members below.
                </p>
                <CommitteeTable rows={iqac} variant="iqac" />
              </Section>

              {/* ------------------------------------------ 11 programmes */}
              <Section
                id="programmes"
                no="11"
                title="Programmes & Approved Intake"
                sub="All programmes conducted by the institute with the intake approved by the affiliating bodies and AICTE."
              >
                <Subhead icon={GraduationCap}>Diploma Programs (AICTE Approved)</Subhead>
                <ScrollTable table={programmesDiploma} wide />

                <Subhead icon={GraduationCap}>Programs for Working Professionals — 2024-25</Subhead>
                <ScrollTable table={programmesWorking} />

                <Subhead icon={University}>Under-Graduate Programs — 2024-25</Subhead>
                <ScrollTable table={programmesUg} wide />
              </Section>

              {/* ------------------------------------------- 12 placement */}
              <Section
                id="placement"
                no="12"
                title="Placement Synopsis (Batch Wise)"
                sub="Session-wise placement record since the first graduating batch — placeable students versus students placed."
              >
                <PlacementTable />
              </Section>

              {/* --------------------------------------------- 13 faculty */}
              <Section
                id="faculty"
                no="13"
                title="Staff Pattern (Discipline Wise)"
                sub="Teaching staff on record with AICTE faculty unique IDs, designation, department and date of joining. Filter by department to inspect a discipline."
              >
                <FacultyTable />
              </Section>

              {/* ------------------------------------------------ 14 fees */}
              <Section
                id="fees"
                no="14"
                title="Fee Structure"
                sub="Published fee structure for diploma and ITI programmes — admission fee, per-installment amount and total course fee."
              >
                <div className="disc-fee-lead">
                  <Wallet size={14} strokeWidth={2.4} />
                  Official fee structure — Session 2024
                </div>

                <Subhead icon={Wallet}>3-Year Diploma Programs</Subhead>
                <ScrollTable table={feesDiploma3y} />

                <Subhead icon={Wallet}>2-Year Diploma & ITI Programs</Subhead>
                <ScrollTable table={feesDiploma2yIti} />
              </Section>

              {/* -------------------------------------------- 15 admission */}
              <Section
                id="admission"
                no="15"
                title="Admission & Admission Procedure"
                sub="Routes of entry, eligibility and the documents required at the time of admission."
              >
                <div className="disc-adm-grid">
                  {admissionProcess.rows.map((r) => (
                    <div className="disc-adm-card" key={r[0]}>
                      <h4>{r[0]}</h4>
                      <dl>
                        <dt>Eligibility</dt>
                        <dd>{r[1]}</dd>
                        <dt>Time / Quota</dt>
                        <dd>{r[2]}</dd>
                      </dl>
                    </div>
                  ))}
                </div>

                <Subhead icon={ClipboardList}>Documents Required at Admission</Subhead>
                <ul className="disc-doclist">
                  {admissionDocuments.map((d) => (
                    <li key={d}>
                      <CheckCircle2 size={15} strokeWidth={2.4} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* ---------------------------------------- 16 infrastructure */}
              <Section
                id="infrastructure"
                no="16"
                title="Information of Infrastructure & Resources"
                sub="Room-wise inventory of teaching areas, libraries, computer and language centers, offices and support facilities across the campus buildings."
              >
                <Subhead icon={Building2}>Teaching Areas — Classrooms, Laboratories & Workshops</Subhead>
                <ScrollTable table={teachingRooms} wide />

                <Subhead icon={Building2}>Library, Computer & Language Centers</Subhead>
                <ScrollTable table={supportReadyRooms} />

                <Subhead icon={Building2}>Offices & Support Facilities</Subhead>
                <ScrollTable table={officeRooms} wide />
              </Section>

              {/* ------------------------------------------------ 17 audit */}
              <Section
                id="audit"
                no="17"
                title="Audited Financial Statements"
                sub="Audited accounts of the institute for the last three financial years, as furnished to AICTE."
              >
                <Subhead icon={Scale}>Audit Reports</Subhead>
                <DocGrid docs={auditDocs} />
              </Section>

              {/* -------------------------------------------- source note */}
              <div className="disc-source">
                This page reproduces the institute's official AICTE Mandatory Disclosure record.
                Approval letters and audit reports link to the original PDF documents published at{' '}
                <a href="https://nhit.in/mandatory-disclosure/" target="_blank" rel="noopener noreferrer">
                  nhit.in/mandatory-disclosure
                </a>
                . For any correction or clarification, write to{' '}
                <a href="mailto:principal@nhit.in">principal@nhit.in</a>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
