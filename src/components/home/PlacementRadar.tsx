'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { PlacementRadarData } from '@/lib/homeTypes';

export default function PlacementRadar({ data }: { data: PlacementRadarData }) {
  const branches = data.branches ?? [];
  const branchKeys = branches.map((b) => b.id);
  const [activeBranch, setActiveBranch] = useState<string>('all');
  const [activeMilestone, setActiveMilestone] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const cycleRef = useRef<NodeJS.Timeout | null>(null);

  const currentData = branches.find((b) => b.id === activeBranch) || branches[0];

  // Auto-cycle tabs every 8 seconds when not paused
  useEffect(() => {
    if (isPaused || branches.length === 0) return;
    cycleRef.current = setInterval(() => {
      setActiveBranch((prev) => {
        const nextIdx = (branchKeys.indexOf(prev) + 1) % branchKeys.length;
        return branchKeys[nextIdx];
      });
    }, 8000);

    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [isPaused, branches.length]);

  if (!currentData) return null;

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
            {data.kicker}
          </span>
          <h2 className="nhit-radar-title">
            {data.title}{" "}
            {data.titleEm && <span>{data.titleEm}</span>}
            {data.titleAfter}
          </h2>
          <p className="nhit-radar-sub">{data.sub}</p>
        </div>

        {/* Branch Selector Tabs */}
        <div className="nhit-branch-nav" role="tablist" aria-label="Engineering Branch Placements">
          {branches.map((b) => {
            const isActive = activeBranch === b.id;
            return (
              <button
                key={b.id}
                className={`nhit-branch-tab ${isActive ? 'is-active' : ''}`}
                data-branch={b.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveBranch(b.id)}
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
                  <i className="fa fa-trophy" aria-hidden="true" style={{ color: 'var(--edu-primary)' }} />
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
                  <i className="fa fa-code-fork" aria-hidden="true" style={{ color: 'var(--edu-primary)' }} />
                  {data.pipelineTitle}
                </h4>
                <span className="nhit-trajectory-panel__badge">{data.pipelineBadge}</span>
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
                      <stop offset="0%" style={{ stopColor: 'var(--edu-primary)' }} />
                      <stop offset="50%" style={{ stopColor: 'color-mix(in srgb, var(--edu-primary) 55%, white)' }} />
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
                      idx === activeMilestone ? 'is-current ring-2 ring-[color:var(--edu-primary)]' : ''
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
                {data.deckHeading}
              </h4>
              <span className="nhit-deck-legend">{data.deckLegend}</span>
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
              <h4>{data.ctaTitle}</h4>
              <p>{data.ctaText}</p>
            </div>
            <div className="nhit-cta-btn-group">
              <a
                href={data.ctaBtn1Href || '#'}
                target="_blank"
                rel="noopener"
                className="nhit-radar-btn-primary"
              >
                <i className="fa fa-file-pdf-o" aria-hidden="true" /> {data.ctaBtn1Text}
              </a>
              <Link href={data.ctaBtn2Href || '#'} className="nhit-radar-btn-secondary">
                {data.ctaBtn2Text} <i className="fa fa-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
