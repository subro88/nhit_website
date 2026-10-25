'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface BranchStat {
  highest: number;
  avg: number;
  rate: number;
  recruiters: number;
}

interface Milestone {
  step: string;
  title: string;
  desc: string;
}

interface RoleCard {
  company: string;
  tag: string;
  tagClass: string;
  title: string;
  scope: string;
  salary: string;
}

interface BranchConfig {
  id: string;
  tabLabel: string;
  tabTag: string;
  title: string;
  icon: string;
  desc: string;
  stats: BranchStat;
  milestones: Milestone[];
  roles: RoleCard[];
}

const branchDataset: Record<string, BranchConfig> = {
  all: {
    id: 'all',
    tabLabel: 'All Branches',
    tabTag: 'Overview',
    title: 'All Disciplines — Institutional Overview',
    icon: '🎓',
    desc: '6 AICTE-Approved Diploma Engineering Disciplines + B.Tech Lateral Pathway',
    stats: { highest: 4.8, avg: 2.65, rate: 88.4, recruiters: 200 },
    milestones: [
      {
        step: 'Phase 1 · Sem 1–2',
        title: 'Applied Engineering Labs',
        desc: 'Physics, chemistry, foundational CAD, and hands-on mechanical & electrical workshops.',
      },
      {
        step: 'Phase 2 · Sem 3–4',
        title: 'Core Industrial Training',
        desc: 'Real industrial visits and 4-week summer vocational internship in Durgapur-Asansol belt.',
      },
      {
        step: 'Phase 3 · Sem 5',
        title: 'T&P Aptitude & HR Bootcamps',
        desc: 'National Entrepreneurship Network (NEN) soft skills, coding drills, and mock corporate GDs.',
      },
      {
        step: 'Phase 4 · Sem 6',
        title: 'Tier-1 Campus Offers / JELET',
        desc: 'Day-1 placement drives by MNCs and direct lateral admission to 2nd Year B.Tech.',
      },
    ],
    roles: [
      {
        company: 'Tata Motors',
        tag: 'Auto',
        tagClass: 'nhit-tag--auto',
        title: 'Junior Engineer (Plant Operations)',
        scope: 'Assembly line automation, vehicle integration & quality inspection standards.',
        salary: '₹3.60 – ₹4.20 LPA',
      },
      {
        company: 'Larsen & Toubro',
        tag: 'Infra',
        tagClass: 'nhit-tag--infra',
        title: 'Graduate Site Trainee (L&T Construction)',
        scope: 'Structural fabrication, heavy site surveying, and high-precision quality control.',
        salary: '₹3.20 – ₹4.00 LPA',
      },
      {
        company: 'Cummins India',
        tag: 'Auto',
        tagClass: 'nhit-tag--auto',
        title: 'Powertrain Quality Engineer',
        scope: 'Heavy diesel engine testing, emission compliance, and CNC precision machining.',
        salary: '₹3.40 – ₹4.10 LPA',
      },
      {
        company: 'HCL Technologies',
        tag: 'Tech',
        tagClass: 'nhit-tag--tech',
        title: 'Associate Support Engineer',
        scope: 'Enterprise IT infrastructure, automated networking & systems maintenance.',
        salary: '₹3.00 – ₹4.80 LPA',
      },
    ],
  },
  me: {
    id: 'me',
    tabLabel: 'Mechanical (ME)',
    tabTag: '91% Placed',
    title: 'Mechanical Engineering (ME)',
    icon: '⚙️',
    desc: 'Precision Manufacturing, Thermal Engineering, CAD/CAM & Automobile Systems',
    stats: { highest: 4.2, avg: 2.55, rate: 91.2, recruiters: 48 },
    milestones: [
      {
        step: 'Phase 1 · Sem 1–2',
        title: 'Machine Drawing & Lathe Lab',
        desc: 'Foundational bench fitting, turning, smithy, and 2D AutoCAD mechanical drafting.',
      },
      {
        step: 'Phase 2 · Sem 3–4',
        title: 'CNC & Fluid Dynamics',
        desc: 'Hydraulics, heat engine performance tests, and 4-week industrial vocational training.',
      },
      {
        step: 'Phase 3 · Sem 5',
        title: 'Production Tech & GD&T',
        desc: 'Geometric tolerancing, automated jigs & fixtures, and company-specific aptitude drives.',
      },
      {
        step: 'Phase 4 · Sem 6',
        title: 'Auto MNC Day-1 Onboarding',
        desc: 'Direct hiring by OEM giants or entry to prestigious B.Tech mechanical degrees.',
      },
    ],
    roles: [
      {
        company: 'Tata Motors',
        tag: 'Auto',
        tagClass: 'nhit-tag--auto',
        title: 'Junior Production Engineer',
        scope: 'Supervising robotic weld lines, chassis assembly & shop-floor kaizen protocols.',
        salary: '₹3.60 – ₹4.20 LPA',
      },
      {
        company: 'Cummins India',
        tag: 'Power',
        tagClass: 'nhit-tag--power',
        title: 'Engine Testing Trainee',
        scope: 'Dynamometer testing, vibration diagnostics & fuel injection calibration.',
        salary: '₹3.20 – ₹3.90 LPA',
      },
      {
        company: 'JBM Group',
        tag: 'Auto',
        tagClass: 'nhit-tag--auto',
        title: 'Press Shop & Tooling Tech',
        scope: 'High-tonnage stamping dies, sheet metal tolerances & robotic spot-welding.',
        salary: '₹2.80 – ₹3.40 LPA',
      },
      {
        company: 'Kiswok Industries',
        tag: 'Foundry',
        tagClass: 'nhit-tag--infra',
        title: 'Metallurgy Quality Inspector',
        scope: 'Ductile iron casting inspection, spectrometer testing & precision CNC milling.',
        salary: '₹2.60 – ₹3.20 LPA',
      },
    ],
  },
  ee: {
    id: 'ee',
    tabLabel: 'Electrical (EE)',
    tabTag: '₹4.50L Max',
    title: 'Electrical Engineering (EE)',
    icon: '⚡',
    desc: 'Power Systems, PLC/SCADA Automation, Electric Drives & Renewable Energy',
    stats: { highest: 4.5, avg: 2.6, rate: 89.5, recruiters: 42 },
    milestones: [
      {
        step: 'Phase 1 · Sem 1–2',
        title: 'Circuits & Basic Electronics',
        desc: 'Ohmic theorem verification, wiring safety codes, transformer testing, and circuit analysis.',
      },
      {
        step: 'Phase 2 · Sem 3–4',
        title: 'AC/DC Machines & Switchgear',
        desc: 'Synchronous alternators, induction motor controls, and high-voltage substation visits.',
      },
      {
        step: 'Phase 3 · Sem 5',
        title: 'Industrial PLC & Automation',
        desc: 'Ladder logic programming, SCADA interfaces, and industrial power drive commissioning.',
      },
      {
        step: 'Phase 4 · Sem 6',
        title: 'Power Grid / MNC Commissioning',
        desc: 'Substation engineering roles, L&T power contracts, and WBSEDCL career tracks.',
      },
    ],
    roles: [
      {
        company: 'L&T Power',
        tag: 'Power',
        tagClass: 'nhit-tag--power',
        title: 'Substation Commissioning Trainee',
        scope: '132kV/33kV substation layout, circuit breaker timing & relay coordination.',
        salary: '₹3.40 – ₹4.50 LPA',
      },
      {
        company: 'Schneider Electric',
        tag: 'Auto',
        tagClass: 'nhit-tag--tech',
        title: 'PLC / Automation Technician',
        scope: 'Variable frequency drives (VFD), panel board wiring & energy audit telemetry.',
        salary: '₹3.10 – ₹3.80 LPA',
      },
      {
        company: 'TIL India',
        tag: 'Infra',
        tagClass: 'nhit-tag--infra',
        title: 'Heavy Crane Electrical Specialist',
        scope: 'Electro-hydraulic mobile crane wiring, motor control diagnostics & PLCs.',
        salary: '₹2.90 – ₹3.60 LPA',
      },
      {
        company: 'Tata Power',
        tag: 'Power',
        tagClass: 'nhit-tag--power',
        title: 'Solar & Renewable Grid Trainee',
        scope: 'Inverter array maintenance, solar PV string monitoring & SCADA supervision.',
        salary: '₹3.00 – ₹3.75 LPA',
      },
    ],
  },
  cst: {
    id: 'cst',
    tabLabel: 'Comp. Science (CST)',
    tabTag: '₹4.80L Max',
    title: 'Computer Science & Technology (CST)',
    icon: '💻',
    desc: 'Full-Stack Development, Cloud Systems, Database Architecture & DevOps',
    stats: { highest: 4.8, avg: 2.85, rate: 92.0, recruiters: 38 },
    milestones: [
      {
        step: 'Phase 1 · Sem 1–2',
        title: 'Algorithms, C & Web Tech',
        desc: 'Data structures in C, relational SQL queries, responsive HTML5/CSS, and Linux CLI.',
      },
      {
        step: 'Phase 2 · Sem 3–4',
        title: 'OOP, Python & Networking',
        desc: 'Java & Python programming, OSI stack packet inspection, and web application projects.',
      },
      {
        step: 'Phase 3 · Sem 5',
        title: 'Full-Stack Frameworks & Git',
        desc: 'Node.js/React architectures, cloud deployment, and technical coding interview rounds.',
      },
      {
        step: 'Phase 4 · Sem 6',
        title: 'IT MNC Onboarding / B.Tech',
        desc: 'Direct placements in tech services, QA automation, and lateral entry into CSE B.Tech.',
      },
    ],
    roles: [
      {
        company: 'HCL Technologies',
        tag: 'Tech',
        tagClass: 'nhit-tag--tech',
        title: 'Junior Software Engineer',
        scope: 'Enterprise backend APIs, SQL optimization, and automated continuous test pipelines.',
        salary: '₹3.20 – ₹4.80 LPA',
      },
      {
        company: 'Wipro Technologies',
        tag: 'Tech',
        tagClass: 'nhit-tag--tech',
        title: 'Cloud Infrastructure Associate',
        scope: 'Linux system administration, virtual machine provisioning & network telemetry.',
        salary: '₹3.00 – ₹4.00 LPA',
      },
      {
        company: 'TCS iON Partner',
        tag: 'Tech',
        tagClass: 'nhit-tag--tech',
        title: 'QA & Test Automation Trainee',
        scope: 'Automated test suite maintenance, regression test runs & API validation.',
        salary: '₹2.80 – ₹3.60 LPA',
      },
      {
        company: 'Capgemini',
        tag: 'Tech',
        tagClass: 'nhit-tag--tech',
        title: 'Application Development Intern',
        scope: 'Frontend component library development, bug remediation & Git collaboration.',
        salary: '₹3.00 – ₹4.20 LPA',
      },
    ],
  },
  ce: {
    id: 'ce',
    tabLabel: 'Civil (CE)',
    tabTag: 'Infra Hub',
    title: 'Civil Engineering (CE)',
    icon: '🏗️',
    desc: 'Structural Engineering, Total Station Surveying, Concrete Technology & CAD',
    stats: { highest: 3.9, avg: 2.4, rate: 84.6, recruiters: 32 },
    milestones: [
      {
        step: 'Phase 1 · Sem 1–2',
        title: 'Surveying & Building Materials',
        desc: 'Levelling, theodolite traverse, chain surveying, brickwork & cement testing standards.',
      },
      {
        step: 'Phase 2 · Sem 3–4',
        title: 'Total Station & RCC Design',
        desc: 'Digital Total Station surveying, reinforced concrete beams, and AutoCAD civil drafting.',
      },
      {
        step: 'Phase 3 · Sem 5',
        title: 'Highway & Soil Mechanics',
        desc: 'Soil compaction, California Bearing Ratio (CBR), estimation, costing & tender specs.',
      },
      {
        step: 'Phase 4 · Sem 6',
        title: 'Mega Infrastructure Projects',
        desc: 'Site execution supervisor roles with L&T, Afcons, Shapoorji, and state PWD contractors.',
      },
    ],
    roles: [
      {
        company: 'L&T Construction',
        tag: 'Infra',
        tagClass: 'nhit-tag--infra',
        title: 'Site Execution Trainee',
        scope: 'Reinforced concrete foundation casting, rebar checking & safety compliance on site.',
        salary: '₹3.00 – ₹3.90 LPA',
      },
      {
        company: 'Simplex Infrastructures',
        tag: 'Infra',
        tagClass: 'nhit-tag--infra',
        title: 'Total Station Surveyor',
        scope: 'High-precision coordinate setting, bridge pier alignment & digital elevation mapping.',
        salary: '₹2.70 – ₹3.40 LPA',
      },
      {
        company: 'Shapoorji Pallonji',
        tag: 'Infra',
        tagClass: 'nhit-tag--infra',
        title: 'Quality & Material Inspector',
        scope: 'Cube compressive strength testing, slump cone tests & material register logging.',
        salary: '₹2.80 – ₹3.50 LPA',
      },
      {
        company: 'Afcons Infrastructure',
        tag: 'Infra',
        tagClass: 'nhit-tag--infra',
        title: 'Junior Structural Drafter',
        scope: 'AutoCAD civil detailing, bar bending schedules (BBS) & structural revisions.',
        salary: '₹2.50 – ₹3.20 LPA',
      },
    ],
  },
  etce: {
    id: 'etce',
    tabLabel: 'Electronics (ETCE)',
    tabTag: 'IoT / 5G',
    title: 'Electronics & Telecomm (ETCE)',
    icon: '📡',
    desc: 'Embedded Systems, Microcontrollers, VLSI, Optical Fibres & 5G Telecommunications',
    stats: { highest: 4.3, avg: 2.5, rate: 87.8, recruiters: 30 },
    milestones: [
      {
        step: 'Phase 1 · Sem 1–2',
        title: 'Semiconductors & Digital Logic',
        desc: 'Diode circuits, BJT/FET biasing, logic gates, Boolean minimization, and oscilloscope labs.',
      },
      {
        step: 'Phase 2 · Sem 3–4',
        title: 'Microprocessors & Communication',
        desc: '8051/ARM programming, AM/FM modulation, fiber optic splicing, and antenna parameters.',
      },
      {
        step: 'Phase 3 · Sem 5',
        title: 'Embedded C, IoT & PCB Design',
        desc: 'Sensors interfacing, Arduino/ESP32 firmware, Eagle PCB layout, and telecom testing.',
      },
      {
        step: 'Phase 4 · Sem 6',
        title: 'Telecom & Hardware MNC Drives',
        desc: 'Telecom NOC engineering, consumer electronics testing, and lateral B.Tech entry.',
      },
    ],
    roles: [
      {
        company: 'Dixon Technologies',
        tag: 'Tech',
        tagClass: 'nhit-tag--tech',
        title: 'SMT & Hardware Testing Tech',
        scope: 'Surface-mount technology (SMT) inspection, automated PCB in-circuit testing.',
        salary: '₹3.10 – ₹4.30 LPA',
      },
      {
        company: 'Ericsson India',
        tag: 'Tech',
        tagClass: 'nhit-tag--tech',
        title: 'Telecom Field Operations Trainee',
        scope: '5G base transceiver station (BTS) verification, microwave links & spectrum checks.',
        salary: '₹3.00 – ₹3.80 LPA',
      },
      {
        company: 'Havells India',
        tag: 'Power',
        tagClass: 'nhit-tag--power',
        title: 'Electronic Switchgear Inspector',
        scope: 'Solid-state relay testing, surge suppression circuits & reliability qualification.',
        salary: '₹2.80 – ₹3.50 LPA',
      },
      {
        company: 'Schneider Electric',
        tag: 'Tech',
        tagClass: 'nhit-tag--tech',
        title: 'Smart Metering Systems Tech',
        scope: 'Digital power metering telemetry, RS-485 Modbus calibration & IoT interfaces.',
        salary: '₹3.00 – ₹3.70 LPA',
      },
    ],
  },
  ae: {
    id: 'ae',
    tabLabel: 'Automobile (AE)',
    tabTag: 'OEM Ties',
    title: 'Automobile Engineering (AE)',
    icon: '🚗',
    desc: 'Vehicle Dynamics, Powertrain Testing, Electric Vehicle (EV) Systems & Fleet Diagnostics',
    stats: { highest: 4.1, avg: 2.5, rate: 90.0, recruiters: 34 },
    milestones: [
      {
        step: 'Phase 1 · Sem 1–2',
        title: 'Automotive Mechanics & CAD',
        desc: 'Internal combustion engines, chassis layouts, suspension mechanics & 2D vehicle drafting.',
      },
      {
        step: 'Phase 2 · Sem 3–4',
        title: 'Transmission & Fuel Systems',
        desc: 'Multi-plate clutches, synchromesh gearboxes, CRDi injectors & summer plant internships.',
      },
      {
        step: 'Phase 3 · Sem 5',
        title: 'EV Powertrain & OBD-II Diagnostics',
        desc: 'Lithium-ion battery management (BMS), motor controllers, and computerized scan tools.',
      },
      {
        step: 'Phase 4 · Sem 6',
        title: 'Auto OEM Campus Placements',
        desc: 'Direct hiring by vehicle manufacturers, ancillaries, and specialized B.Tech programs.',
      },
    ],
    roles: [
      {
        company: 'Force Motors',
        tag: 'Auto',
        tagClass: 'nhit-tag--auto',
        title: 'Vehicle Assembly Line Supervisor',
        scope: 'Chassis decking, axle alignment, brake bleeding & final rollout inspection.',
        salary: '₹3.20 – ₹4.10 LPA',
      },
      {
        company: 'Magna Automotive',
        tag: 'Auto',
        tagClass: 'nhit-tag--auto',
        title: 'Tier-1 Seating & Body Engineer',
        scope: 'Automotive seat mechanism testing, laser welded subframes & crash compliance.',
        salary: '₹3.00 – ₹3.80 LPA',
      },
      {
        company: 'Tata Motors',
        tag: 'Auto',
        tagClass: 'nhit-tag--auto',
        title: 'Commercial Vehicle Assembly Tech',
        scope: 'Heavy truck transmission assembly, air-brake circuit testing & dyno audit.',
        salary: '₹3.40 – ₹4.10 LPA',
      },
      {
        company: 'Piaggio Vehicles',
        tag: 'Auto',
        tagClass: 'nhit-tag--auto',
        title: '3-Wheeler & EV Quality Specialist',
        scope: 'Electric powertrain dyno evaluation, hub-motor diagnostics & battery testing.',
        salary: '₹2.90 – ₹3.60 LPA',
      },
    ],
  },
};

const branchKeys = ['all', 'me', 'ee', 'cst', 'ce', 'etce', 'ae'];

export default function PlacementRadar() {
  const [activeBranch, setActiveBranch] = useState<string>('all');
  const [activeMilestone, setActiveMilestone] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const cycleRef = useRef<NodeJS.Timeout | null>(null);

  const currentData = branchDataset[activeBranch] || branchDataset.all;

  // Auto-cycle tabs every 8 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    cycleRef.current = setInterval(() => {
      setActiveBranch((prev) => {
        const nextIdx = (branchKeys.indexOf(prev) + 1) % branchKeys.length;
        return branchKeys[nextIdx];
      });
    }, 8000);

    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [isPaused]);

  return (
    <section
      id="placement-radar"
      className="wp-block-group nhit-placement-radar"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="nhit-radar-glow-cyan" aria-hidden="true" />
      <div className="wp-block-group edu-container">
        {/* Section Header */}
        <div className="nhit-radar-header">
          <span className="nhit-radar-kicker">
            <span className="nhit-radar-kicker__pulse" />
            Career Launchpad &amp; Placements
          </span>
          <h2 className="nhit-radar-title">
            From Diploma Classrooms to <span>Tier-1 Engineering MNCs</span>
          </h2>
          <p className="nhit-radar-sub">
            Explore branch-wise placement trajectories, verified compensation packages, and day-1
            corporate recruiter networks across 18+ years of technical excellence at NHIT Durgapur.
          </p>
        </div>

        {/* Branch Selector Tabs */}
        <div className="nhit-branch-nav" role="tablist" aria-label="Engineering Branch Placements">
          {branchKeys.map((key) => {
            const b = branchDataset[key];
            const isActive = activeBranch === key;
            return (
              <button
                key={key}
                className={`nhit-branch-tab ${isActive ? 'is-active' : ''}`}
                data-branch={key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveBranch(key)}
              >
                <span>{b.tabLabel}</span>
                <span className="nhit-branch-tab__tag">{b.tabTag}</span>
              </button>
            );
          })}
        </div>

        {/* Main Cockpit Console */}
        <div className="nhit-radar-console">
          {/* Topbar: Active Branch Title & Ambient Cycle Timer */}
          <div className="nhit-console-topbar">
            <div className="nhit-console-branch-info">
              <div className="nhit-console-branch-icon" aria-hidden="true">
                {currentData.icon}
              </div>
              <div>
                <h3 className="nhit-console-branch-title">{currentData.title}</h3>
                <p className="nhit-console-branch-desc">{currentData.desc}</p>
              </div>
            </div>
            <div
              className="nhit-cycle-widget"
              title="Auto-cycles through branches. Pauses on hover."
            >
              <span className="nhit-cycle-label">
                <i className="fa fa-refresh fa-spin" aria-hidden="true" /> Live Radar
              </span>
              <div className="nhit-cycle-track" aria-hidden="true">
                <div
                  className="nhit-cycle-fill"
                  style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                />
              </div>
            </div>
          </div>

          {/* Console Main Grid: Metrics HUD + SVG Trajectory Panel */}
          <div className="nhit-console-main">
            {/* Left Column: Metrics HUD */}
            <div className="nhit-metrics-hud">
              <div className="nhit-metric-box nhit-metric-box--orange">
                <div className="nhit-metric-label">
                  <span>Highest Package</span>
                  <i className="fa fa-trophy" aria-hidden="true" style={{ color: '#ff3115' }} />
                </div>
                <div className="nhit-metric-value-wrap">
                  <span className="nhit-metric-value">
                    ₹{currentData.stats.highest.toFixed(2)}
                  </span>
                  <span className="nhit-metric-unit">LPA</span>
                </div>
                <div className="nhit-metric-caption">Top compensation verified by T&amp;P Cell</div>
              </div>

              <div className="nhit-metric-box nhit-metric-box--cyan">
                <div className="nhit-metric-label">
                  <span>Average CTC</span>
                  <i className="fa fa-line-chart" aria-hidden="true" style={{ color: '#00d2ff' }} />
                </div>
                <div className="nhit-metric-value-wrap">
                  <span className="nhit-metric-value">₹{currentData.stats.avg.toFixed(2)}</span>
                  <span className="nhit-metric-unit">LPA</span>
                </div>
                <div className="nhit-metric-caption">
                  Across core engineering &amp; technology batches
                </div>
              </div>

              <div className="nhit-metric-box nhit-metric-box--green">
                <div className="nhit-metric-label">
                  <span>Placed &amp; Lateral Entry</span>
                  <i className="fa fa-check-circle" aria-hidden="true" style={{ color: '#10b981' }} />
                </div>
                <div className="nhit-metric-value-wrap">
                  <span className="nhit-metric-value">{currentData.stats.rate}%</span>
                </div>
                <div className="nhit-metric-caption">
                  Direct MNC employment + B.Tech 2nd Year JELET
                </div>
              </div>

              <div className="nhit-metric-box nhit-metric-box--purple">
                <div className="nhit-metric-label">
                  <span>Corporate Recruiters</span>
                  <i className="fa fa-briefcase" aria-hidden="true" style={{ color: '#a855f7' }} />
                </div>
                <div className="nhit-metric-value-wrap">
                  <span className="nhit-metric-value">{currentData.stats.recruiters}+</span>
                </div>
                <div className="nhit-metric-caption">Active industrial hiring network across India</div>
              </div>
            </div>

            {/* Right Column: Trajectory Radar Panel */}
            <div className="nhit-trajectory-panel">
              <div className="nhit-trajectory-panel__head">
                <h4 className="nhit-trajectory-panel__title">
                  <i className="fa fa-code-fork" aria-hidden="true" style={{ color: '#ff3115' }} />
                  Career Development Pipeline
                </h4>
                <span className="nhit-trajectory-panel__badge">Click Milestones to Inspect</span>
              </div>

              {/* Animated SVG Trajectory Canvas */}
              <div className="nhit-path-container">
                <svg
                  className="nhit-trajectory-svg"
                  viewBox="0 0 800 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="nhitGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff3115" />
                      <stop offset="50%" stopColor="#ff8342" />
                      <stop offset="100%" stopColor="#00d2ff" />
                    </linearGradient>
                  </defs>

                  {/* Base Track Line */}
                  <path
                    className="nhit-svg-base-line"
                    d="M 80 60 C 220 20, 260 100, 400 60 C 540 20, 580 100, 720 60"
                  />

                  {/* Animated Glowing Path */}
                  <path
                    className="nhit-svg-active-path"
                    d="M 80 60 C 220 20, 260 100, 400 60 C 540 20, 580 100, 720 60"
                  />

                  {/* 4 Interactive Nodes */}
                  {[
                    { x: 80, y: 60 },
                    { x: 290, y: 60 },
                    { x: 510, y: 60 },
                    { x: 720, y: 60 },
                  ].map((pos, idx) => (
                    <g
                      key={idx}
                      className="nhit-svg-node-group cursor-pointer"
                      transform={`translate(${pos.x}, ${pos.y})`}
                      onClick={() => setActiveMilestone(idx)}
                    >
                      <circle className="nhit-svg-pulse-ring" r="8" />
                      <circle
                        className={`nhit-svg-node-outer ${idx === activeMilestone ? 'is-active' : ''}`}
                        r="12"
                      />
                      <circle className="nhit-svg-node-inner" r="6" />
                    </g>
                  ))}
                </svg>
              </div>

              {/* 4-Stage Milestone Steppers */}
              <div className="nhit-milestones-grid">
                {currentData.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className={`nhit-milestone-card cursor-pointer transition-all ${
                      idx === activeMilestone ? 'is-current ring-2 ring-[#ff3115]' : ''
                    }`}
                    onClick={() => setActiveMilestone(idx)}
                  >
                    <div className="nhit-milestone-step">{m.step}</div>
                    <h5 className="nhit-milestone-title">{m.title}</h5>
                    <p className="nhit-milestone-desc">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recruiter Deck: Role Cards Grid */}
          <div className="nhit-console-recruiter-deck">
            <div className="nhit-deck-title-row">
              <h4 className="nhit-deck-heading">
                <i className="fa fa-building-o" aria-hidden="true" style={{ color: '#00d2ff' }} />
                Key Recruiting Partners &amp; Job Profiles
              </h4>
              <span className="nhit-deck-legend">* Annual CTC figures based on NHIT T&amp;P records</span>
            </div>

            <div className="nhit-roles-grid">
              {currentData.roles.map((role, idx) => (
                <div key={idx} className="nhit-role-card">
                  <div className="nhit-role-card__badge-row">
                    <span className="nhit-role-card__company">{role.company}</span>
                    <span className={`nhit-role-card__tag ${role.tagClass}`}>{role.tag}</span>
                  </div>
                  <h5 className="nhit-role-card__title">{role.title}</h5>
                  <p className="nhit-role-card__scope">{role.scope}</p>
                  <div className="nhit-role-card__footer">
                    <span>Package Range</span>
                    <span className="nhit-role-card__salary">{role.salary}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="nhit-radar-cta-banner">
            <div className="nhit-cta-text">
              <h4>Prepare for Your Engineering Future at NHIT</h4>
              <p>
                Our dedicated Training &amp; Placement Cell arranges campus interviews, soft-skill
                grooming, and industry MoUs.
              </p>
            </div>
            <div className="nhit-cta-btn-group">
              <a
                href="https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf"
                target="_blank"
                rel="noopener"
                className="nhit-radar-btn-primary"
              >
                <i className="fa fa-file-pdf-o" aria-hidden="true" /> Download Placement Brochure
              </a>
              <Link href="/placements" className="nhit-radar-btn-secondary">
                Explore T&amp;P Cell <i className="fa fa-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
