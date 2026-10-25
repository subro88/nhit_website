'use client';

import React, { useRef, useEffect } from 'react';

interface Props {
  deptCode: string;
  accentHex: string;
}

export default function DepartmentBlueprintCanvas({ deptCode, accentHex }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Detect Department Archetype
    const codeUpper = (deptCode || 'CST_01').toUpperCase();
    let deptType = 'CST';
    if (codeUpper.includes('CST') || codeUpper.includes('CS')) {
      deptType = 'CST';
    } else if (codeUpper.includes('EE') || codeUpper.includes('ELE')) {
      deptType = 'EE';
    } else if (codeUpper.includes('CE') || codeUpper.includes('CIVIL')) {
      deptType = 'CE';
    } else if (codeUpper.includes('AE') || codeUpper.includes('AUTO')) {
      deptType = 'AE';
    } else if (codeUpper.includes('ETC') || codeUpper.includes('TEL')) {
      deptType = 'ETCE';
    } else if (codeUpper.includes('ME') || codeUpper.includes('MECH')) {
      deptType = 'ME';
    }

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Ambient perimeter zones across full hero banner (keeping central headline and radar clear)
    const ambientZones = [
      { minX: 0.04, maxX: 0.28, minY: 0.04, maxY: 0.18 }, // Top-Left above title
      { minX: 0.04, maxX: 0.38, minY: 0.78, maxY: 0.94 }, // Bottom-Left below buttons
      { minX: 0.70, maxX: 0.94, minY: 0.05, maxY: 0.22 }, // Top-Right above radar
      { minX: 0.68, maxX: 0.94, minY: 0.78, maxY: 0.94 }, // Bottom-Right below radar
      { minX: 0.01, maxX: 0.045, minY: 0.36, maxY: 0.65 }, // Far Left outer margin
      { minX: 0.91, maxX: 0.97, minY: 0.36, maxY: 0.65 },  // Far Right outer margin
      { minX: 0.38, maxX: 0.62, minY: 0.03, maxY: 0.12 }   // Top-Center header strip
    ];

    interface EngItem {
      type: number;
      zoneIdx: number;
      relX: number;
      relY: number;
      size: number;
      progress: number;
      drawSpeed: number;
      state: 'drawing' | 'linger' | 'dissolving';
      lingerFrames: number;
      maxLinger: number;
      alpha: number;
      rotationAngle: number;
    }

    const createEngItem = (zoneIdx: number, initialProgress?: number): EngItem => {
      const z = ambientZones[zoneIdx % ambientZones.length];
      const relX = z.minX + Math.random() * (z.maxX - z.minX);
      const relY = z.minY + Math.random() * (z.maxY - z.minY);
      const type = Math.floor(Math.random() * 6);
      const size = 56 + Math.random() * 28;

      return {
        type,
        zoneIdx,
        relX,
        relY,
        size,
        progress: typeof initialProgress !== 'undefined' ? initialProgress : 0,
        drawSpeed: 0.008 + Math.random() * 0.006,
        state: initialProgress && initialProgress >= 1 ? 'linger' : 'drawing',
        lingerFrames: 0,
        maxLinger: 120 + Math.random() * 60,
        alpha: 0.9,
        rotationAngle: 0,
      };
    };

    const initialProgresses = [0.35, 0.70, 0.95, 0.45, 0.80, 0.60, 0.25];
    const items: EngItem[] = ambientZones.map((_, idx) =>
      createEngItem(idx, initialProgresses[idx])
    );

    // ── DRAW COMPUTER SCIENCE & TECHNOLOGY SCHEMATICS ──
    const drawCst = (c: CanvasRenderingContext2D, it: EngItem, px: number, py: number) => {
      const prog = it.progress;
      const size = it.size;

      if (it.type === 0) {
        // Laptop with Terminal & Blinking Cursor
        c.save();
        c.translate(px, py);
        const lapW = size * 0.95 * Math.min(1, prog * 1.3);
        const lapH = size * 0.65;

        // Glowing Screen Frame
        c.beginPath();
        c.strokeRect(-lapW * 0.45, -lapH * 0.65, lapW * 0.9, lapH * 0.65);
        c.moveTo(-lapW * 0.45, -lapH * 0.52);
        c.lineTo(lapW * 0.45, -lapH * 0.52);
        // Base
        c.moveTo(-lapW * 0.5, 0);
        c.lineTo(lapW * 0.5, 0);
        c.lineTo(lapW * 0.42, lapH * 0.35);
        c.lineTo(-lapW * 0.42, lapH * 0.35);
        c.closePath();
        c.strokeRect(-lapW * 0.12, lapH * 0.15, lapW * 0.24, lapH * 0.12);
        c.stroke();

        if (prog > 0.3) {
          c.font = '7px monospace';
          c.fillText('admin@nhit:~$ ./run_script', -lapW * 0.4, -lapH * 0.36);
          c.fillText('[STATUS: 200 OK]', -lapW * 0.4, -lapH * 0.2);
          if (Math.floor(Date.now() / 400) % 2 === 0) {
            c.fillRect(-lapW * 0.4 + 92, -lapH * 0.44, 4, 7);
          }
        }
        c.restore();

      } else if (it.type === 1) {
        // Code Editor Window (VS Code / Vim style)
        c.save();
        c.translate(px, py);
        const edW = size * 1.05 * Math.min(1, prog * 1.3);
        const edH = size * 0.75;

        c.beginPath();
        c.strokeRect(-edW / 2, -edH / 2, edW, edH);
        c.moveTo(-edW / 2, -edH / 2 + 10);
        c.lineTo(edW / 2, -edH / 2 + 10);
        // Control Dots
        c.arc(-edW / 2 + 8, -edH / 2 + 5, 2, 0, Math.PI * 2);
        c.arc(-edW / 2 + 15, -edH / 2 + 5, 2, 0, Math.PI * 2);
        c.arc(-edW / 2 + 22, -edH / 2 + 5, 2, 0, Math.PI * 2);
        c.stroke();

        if (prog > 0.3) {
          c.font = '7px monospace';
          c.fillText('def train_model(X, y):', -edW / 2 + 8, -edH / 2 + 22);
          c.fillText('  loss = compute_grad(X)', -edW / 2 + 8, -edH / 2 + 33);
          c.fillText('  return optimize(loss)', -edW / 2 + 8, -edH / 2 + 44);
          c.fillText('<code/> // SCRIPT.PY', -edW / 2 + 8, edH / 2 - 4);
        }
        c.restore();

      } else if (it.type === 2) {
        // Flowchart Diagram (Process & Decision Blocks)
        c.save();
        c.translate(px, py);
        const fcS = size * 0.7 * Math.min(1, prog * 1.3);

        c.beginPath();
        c.strokeRect(-fcS * 0.35, -fcS * 0.7, fcS * 0.7, 10); // Start oval
        c.moveTo(0, -fcS * 0.7 + 10);
        c.lineTo(0, -fcS * 0.35);
        c.strokeRect(-fcS * 0.45, -fcS * 0.35, fcS * 0.9, 14); // Process rect
        c.moveTo(0, -fcS * 0.35 + 14);
        c.lineTo(0, 0);
        // Decision diamond
        c.moveTo(0, 0);
        c.lineTo(fcS * 0.4, fcS * 0.2);
        c.lineTo(0, fcS * 0.4);
        c.lineTo(-fcS * 0.4, fcS * 0.2);
        c.closePath();
        c.moveTo(fcS * 0.4, fcS * 0.2);
        c.lineTo(fcS * 0.65, fcS * 0.2);
        c.moveTo(0, fcS * 0.4);
        c.lineTo(0, fcS * 0.65);
        c.stroke();

        if (prog > 0.4) {
          c.font = '7px monospace';
          c.textAlign = 'center';
          c.fillText('START', 0, -fcS * 0.7 + 8);
          c.fillText('PROCESS', 0, -fcS * 0.35 + 10);
          c.fillText('IF COND?', 0, fcS * 0.2 + 3);
          c.textAlign = 'start';
          c.fillText('Y', fcS * 0.45, fcS * 0.16);
        }
        c.restore();

      } else if (it.type === 3) {
        // Binary Search Tree & Algorithm Graph
        c.save();
        c.translate(px, py - size * 0.25);
        const nR = 6;
        c.beginPath();
        c.arc(0, 0, nR, 0, Math.PI * 2);
        c.stroke();

        if (prog > 0.3) {
          c.beginPath();
          c.moveTo(-nR * 0.7, nR * 0.7);
          c.lineTo(-size * 0.3, size * 0.35);
          c.moveTo(nR * 0.7, nR * 0.7);
          c.lineTo(size * 0.3, size * 0.35);
          c.stroke();

          c.beginPath();
          c.arc(-size * 0.3, size * 0.35, nR, 0, Math.PI * 2);
          c.arc(size * 0.3, size * 0.35, nR, 0, Math.PI * 2);
          c.moveTo(-size * 0.3, size * 0.35 + nR);
          c.lineTo(0, size * 0.7);
          c.moveTo(size * 0.3, size * 0.35 + nR);
          c.lineTo(0, size * 0.7);
          c.arc(0, size * 0.7, nR, 0, Math.PI * 2);
          c.stroke();
        }

        if (prog > 0.5) {
          c.font = '7px monospace';
          c.fillText('GRAPH // O(V+E)', -22, size * 0.82);
        }
        c.restore();

      } else if (it.type === 4) {
        // Microprocessor CPU Architecture Core (ALU, Registers, Bus Pins)
        const pkg = size * 0.82 * Math.min(1, prog * 1.3);
        c.save();
        c.translate(px, py);
        c.beginPath();
        c.strokeRect(-pkg / 2, -pkg / 2, pkg, pkg);

        // Pins
        const pins = 6;
        const pStep = pkg / (pins + 1);
        for (let p = 1; p <= pins; p++) {
          const po = -pkg / 2 + p * pStep;
          c.moveTo(po, -pkg / 2);
          c.lineTo(po, -pkg / 2 - 5);
          c.moveTo(po, pkg / 2);
          c.lineTo(po, pkg / 2 + 5);
          c.moveTo(-pkg / 2, po);
          c.lineTo(-pkg / 2 - 5, po);
          c.moveTo(pkg / 2, po);
          c.lineTo(pkg / 2 + 5, po);
        }
        // Inner Core Matrix
        c.strokeRect(-pkg * 0.3, -pkg * 0.3, pkg * 0.6, pkg * 0.6);
        c.stroke();

        if (prog > 0.4) {
          c.font = '7px monospace';
          c.textAlign = 'center';
          c.fillText('CPU // 64-BIT', 0, -pkg * 0.1);
          c.fillText('ALU & CACHE', 0, pkg * 0.15);
          c.textAlign = 'start';
        }
        c.restore();

      } else {
        // Logic Gates: NAND Gate with Truth Table
        c.save();
        c.translate(px, py);
        const gW = size * 0.75 * Math.min(1, prog * 1.3);
        c.beginPath();
        c.arc(0, 0, gW * 0.4, -Math.PI / 2, Math.PI / 2);
        c.lineTo(-gW * 0.4, gW * 0.4);
        c.lineTo(-gW * 0.4, -gW * 0.4);
        c.closePath();
        // NAND Inversion Bubble & Output
        c.arc(gW * 0.4 + 4, 0, 3, 0, Math.PI * 2);
        c.moveTo(gW * 0.4 + 7, 0);
        c.lineTo(gW * 0.7, 0);
        // Inputs
        c.moveTo(-gW * 0.7, -gW * 0.2);
        c.lineTo(-gW * 0.4, -gW * 0.2);
        c.moveTo(-gW * 0.7, gW * 0.2);
        c.lineTo(-gW * 0.4, gW * 0.2);
        c.stroke();

        if (prog > 0.4) {
          c.font = '7px monospace';
          c.fillText('A ──┐', -gW * 0.7 - 20, -gW * 0.2 + 3);
          c.fillText('B ──┴─[NAND]─ Y=!(A&B)', -gW * 0.7 - 20, gW * 0.2 + 3);
        }
        c.restore();
      }
    };

    // ── DRAW MECHANICAL ENGINEERING SCHEMATICS ──
    const drawMechanical = (c: CanvasRenderingContext2D, it: EngItem, px: number, py: number) => {
      const prog = it.progress;
      const size = it.size;

      if (it.type === 0) {
        // UTM (Universal Testing Machine - Tensile Load Frame)
        c.save();
        c.translate(px, py);
        const frameW = size * 0.85 * Math.min(1, prog * 1.3);
        const frameH = size * 1.1;

        // Base & Top Crosshead
        c.beginPath();
        c.strokeRect(-frameW / 2, frameH * 0.35, frameW, frameH * 0.15);
        c.strokeRect(-frameW / 2, -frameH * 0.5, frameW, frameH * 0.12);
        // Twin Vertical Columns / Lead Screws
        c.moveTo(-frameW * 0.38, -frameH * 0.5); c.lineTo(-frameW * 0.38, frameH * 0.35);
        c.moveTo(frameW * 0.38, -frameH * 0.5);  c.lineTo(frameW * 0.38, frameH * 0.35);
        // Moving Crosshead
        const moveY = -frameH * 0.1 + Math.sin(Date.now() * 0.002) * 4;
        c.strokeRect(-frameW * 0.34, moveY, frameW * 0.68, frameH * 0.1);
        // Specimen
        c.moveTo(-4, moveY + frameH * 0.1); c.lineTo(-4, frameH * 0.35);
        c.moveTo(4, moveY + frameH * 0.1);  c.lineTo(4, frameH * 0.35);
        c.stroke();

        if (prog > 0.4) {
          c.beginPath();
          c.moveTo(0, moveY - 12); c.lineTo(0, moveY - 2);
          c.lineTo(-3, -7); c.moveTo(0, moveY - 2); c.lineTo(3, -7);
          c.moveTo(0, frameH * 0.25); c.lineTo(0, frameH * 0.15);
          c.lineTo(-3, frameH * 0.2); c.moveTo(0, frameH * 0.15); c.lineTo(3, frameH * 0.2);
          c.stroke();
          c.font = '8px monospace';
          c.textAlign = 'center';
          c.fillText('UTM // 100 kN [TENSILE]', 0, -frameH * 0.5 - 6);
          c.textAlign = 'start';
        }
        c.restore();

      } else if (it.type === 1) {
        // Pulley Hoist with Suspended Weight
        it.rotationAngle += 0.02;
        c.save();
        c.translate(px, py);
        const pR = size * 0.34;

        c.beginPath();
        c.strokeRect(-pR * 0.8, -size * 0.55, pR * 1.6, 6);
        c.moveTo(0, -size * 0.55 + 6); c.lineTo(0, -size * 0.25);
        c.stroke();

        c.beginPath();
        c.arc(0, -size * 0.25, pR, 0, Math.PI * 2);
        c.arc(0, -size * 0.25, pR * 0.3, 0, Math.PI * 2);
        c.stroke();

        c.save();
        c.translate(0, -size * 0.25);
        c.rotate(it.rotationAngle);
        c.beginPath();
        c.moveTo(0, 0); c.lineTo(pR * 0.9, 0);
        c.moveTo(0, 0); c.lineTo(-pR * 0.9, 0);
        c.stroke();
        c.restore();

        if (prog > 0.3) {
          const ropeProg = Math.min(1, (prog - 0.3) * 1.5);
          c.beginPath();
          c.moveTo(-pR, -size * 0.25); c.lineTo(-pR, size * 0.35 * ropeProg);
          c.moveTo(pR, -size * 0.25);  c.lineTo(pR, size * 0.15 * ropeProg);
          c.stroke();

          const wBoxW = size * 0.5;
          const wBoxH = size * 0.35;
          const wY = size * 0.35 * ropeProg;
          c.beginPath();
          c.arc(-pR, wY + 6, 6, 0, Math.PI);
          c.strokeRect(-pR - wBoxW / 2, wY + 12, wBoxW, wBoxH);
          c.stroke();

          c.font = '8px monospace';
          c.textAlign = 'center';
          c.fillText('W [500 kg]', -pR, wY + 24);
          c.fillText('T [CABLE]', -pR - 18, wY - 4);
          c.fillText('F [PULL]', pR + 18, size * 0.1);
          c.textAlign = 'start';
        }
        c.restore();

      } else if (it.type === 2) {
        // Continuously Rotating Involute Cog
        it.rotationAngle += 0.012;
        const teeth = 12;
        const toothDepth = 7;
        const radius = size * 0.46;
        const fullSteps = Math.floor(teeth * 4 * prog);

        c.save();
        c.translate(px, py);
        c.rotate(it.rotationAngle);

        c.beginPath();
        for (let i = 0; i <= fullSteps; i++) {
          const angle = (i / (teeth * 4)) * (Math.PI * 2);
          const r = (i % 4 === 1 || i % 4 === 2) ? radius + toothDepth : radius;
          const lx = Math.cos(angle) * r;
          const ly = Math.sin(angle) * r;
          if (i === 0) c.moveTo(lx, ly);
          else c.lineTo(lx, ly);
        }
        c.stroke();

        if (prog > 0.3) {
          c.beginPath();
          c.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
          c.rect(-3, -radius * 0.35 - 3, 6, 4);
          c.stroke();
        }
        c.restore();

      } else if (it.type === 3) {
        // Dual Pulley and Belt Transmission
        it.rotationAngle += 0.02;
        const r1 = size * 0.38;
        const r2 = size * 0.22;
        const dist = size * 1.35 * Math.min(1, prog * 1.3);

        c.save();
        c.translate(px - dist * 0.45, py);

        c.beginPath();
        c.arc(0, 0, r1 * Math.min(1, prog * 1.5), 0, Math.PI * 2);
        c.arc(0, 0, r1 * 0.3, 0, Math.PI * 2);
        c.stroke();

        c.save();
        c.rotate(it.rotationAngle);
        c.beginPath();
        c.moveTo(0, 0); c.lineTo(r1 * 0.85, 0);
        c.stroke();
        c.restore();

        if (prog > 0.3) {
          c.beginPath();
          c.arc(dist, 0, r2, 0, Math.PI * 2);
          c.arc(dist, 0, r2 * 0.35, 0, Math.PI * 2);
          c.stroke();

          c.save();
          c.translate(dist, 0);
          c.rotate(-it.rotationAngle * (r1 / r2));
          c.beginPath();
          c.moveTo(0, 0); c.lineTo(r2 * 0.85, 0);
          c.stroke();
          c.restore();
        }

        if (prog > 0.6) {
          const beltProg = Math.min(1, (prog - 0.6) * 2.5);
          c.beginPath();
          c.moveTo(0, -r1); c.lineTo(dist * beltProg, -r2);
          c.moveTo(0, r1);  c.lineTo(dist * beltProg, r2);
          c.stroke();
        }
        c.restore();

      } else if (it.type === 4) {
        // Compression Helical Spring Under Dynamic Load
        const coils = 7;
        const springW = size * 0.44;
        const maxH = size * 1.15;
        const compressFactor = 1 - 0.16 * Math.sin(Date.now() * 0.0035);
        const springH = maxH * compressFactor * Math.min(1, prog * 1.3);

        c.save();
        c.translate(px, py - springH / 2);

        c.beginPath();
        c.rect(-springW * 0.7, -6, springW * 1.4, 6);
        c.stroke();

        if (prog > 0.3) {
          c.beginPath();
          c.moveTo(0, -26); c.lineTo(0, -8);
          c.lineTo(-4, -13); c.moveTo(0, -8); c.lineTo(4, -13);
          c.stroke();
          c.font = '8px monospace';
          c.fillText('F [LOAD]', 7, -14);
        }

        const stepY = springH / coils;
        c.beginPath();
        c.moveTo(0, 0);
        for (let s = 0; s < coils; s++) {
          const sy = s * stepY;
          const dir = (s % 2 === 0) ? 1 : -1;
          c.lineTo(dir * (springW / 2), sy + stepY * 0.5);
          c.lineTo(0, sy + stepY);
        }
        c.stroke();

        c.beginPath();
        c.rect(-springW * 0.7, springH, springW * 1.4, 6);
        c.stroke();
        c.restore();

      } else {
        // Precision Stepped Shaft with Fit Tolerances
        const shaftW = size * 1.25 * Math.min(1, prog * 1.3);
        const shaftH = 16;
        c.save();
        c.translate(px, py);
        c.beginPath();
        c.strokeRect(-shaftW / 2, -shaftH / 2, shaftW, shaftH);
        c.strokeRect(-shaftW / 4, -shaftH * 0.75, shaftW / 2, shaftH * 1.5);
        c.stroke();

        if (prog > 0.4) {
          c.font = '7px monospace';
          c.fillText('Ø45 h7 // ISO 286', -shaftW * 0.35, -shaftH - 4);
          c.fillText('Ra 0.8 [GROUND]', -shaftW * 0.35, shaftH + 12);
        }
        c.restore();
      }
    };

    // ── CIVIL ENGINEERING DRAWINGS (CE) ──
    const drawCe = (c: CanvasRenderingContext2D, it: EngItem, px: number, py: number) => {
      const prog = it.progress;
      const size = it.size;

      if (it.type === 0) {
        // Building Scaffolding & Tower Crane
        c.save();
        c.translate(px, py);
        const bW = size * 0.8 * Math.min(1, prog * 1.3);
        const bH = size * 1.2;

        c.beginPath();
        c.strokeRect(-bW * 0.5, -bH * 0.4, bW * 0.55, bH * 0.85);
        c.moveTo(-bW * 0.5, -bH * 0.1); c.lineTo(bW * 0.05, -bH * 0.1);
        c.moveTo(-bW * 0.5, bH * 0.18); c.lineTo(bW * 0.05, bH * 0.18);
        for (let f = -1; f <= 1; f++) {
          const fy = f * (bH * 0.28);
          c.moveTo(-bW * 0.5, fy); c.lineTo(bW * 0.05, fy + bH * 0.28);
          c.moveTo(-bW * 0.5, fy + bH * 0.28); c.lineTo(bW * 0.05, fy);
        }
        c.stroke();

        if (prog > 0.3) {
          c.beginPath();
          c.moveTo(bW * 0.2, bH * 0.45); c.lineTo(bW * 0.2, -bH * 0.65);
          c.moveTo(bW * 0.28, bH * 0.45); c.lineTo(bW * 0.28, -bH * 0.65);
          c.moveTo(-bW * 0.25, -bH * 0.6); c.lineTo(bW * 0.7, -bH * 0.6);
          c.strokeRect(-bW * 0.28, -bH * 0.64, bW * 0.1, 8);
          c.strokeRect(bW * 0.45, -bH * 0.6, 6, 4);
          c.moveTo(bW * 0.48, -bH * 0.56); c.lineTo(bW * 0.48, -bH * 0.25);
          c.strokeRect(bW * 0.35, -bH * 0.25, bW * 0.26, 4);
          c.stroke();
          c.font = '7px monospace';
          c.fillText('CRANE // LVL +12', -bW * 0.5, -bH * 0.45);
        }
        c.restore();

      } else if (it.type === 1) {
        // Viaduct Highway Pier
        c.save();
        c.translate(px, py);
        const iW = size * 1.3 * Math.min(1, prog * 1.3);
        const iH = size * 0.8;

        c.beginPath();
        c.strokeRect(-iW / 2, -iH * 0.4, iW, 8);
        c.moveTo(-iW / 2, -iH * 0.4 - 4); c.lineTo(iW / 2, -iH * 0.4 - 4);
        c.moveTo(-10, -iH * 0.4 + 8); c.lineTo(-14, iH * 0.4);
        c.moveTo(10, -iH * 0.4 + 8);  c.lineTo(14, iH * 0.4);
        c.strokeRect(-24, iH * 0.4, 48, 8);
        c.stroke();

        if (prog > 0.4) {
          c.font = '7px monospace';
          c.textAlign = 'center';
          c.fillText('INFRA // PIER-04', 0, iH * 0.4 + 16);
          c.fillText('BM +45.20m', 0, -iH * 0.4 - 8);
          c.textAlign = 'start';
        }
        c.restore();

      } else if (it.type === 2) {
        // Site Inspection Engineers & Hard Hats
        c.save();
        c.translate(px, py);
        const scale = (size / 80) * Math.min(1, prog * 1.3);
        c.scale(scale, scale);

        c.beginPath();
        c.arc(-22, -18, 7, 0, Math.PI * 2);
        c.strokeRect(-25, -27, 14, 5);
        c.moveTo(-22, -11); c.lineTo(-22, 16);
        c.moveTo(-22, 16); c.lineTo(-30, 38);
        c.moveTo(-22, 16); c.lineTo(-14, 38);
        c.moveTo(-22, -5); c.lineTo(-10, 2);
        c.moveTo(-22, -5); c.lineTo(-34, 2);
        c.strokeRect(-34, 2, 24, 16);
        c.stroke();

        if (prog > 0.3) {
          c.beginPath();
          c.arc(18, -18, 7, 0, Math.PI * 2);
          c.strokeRect(15, -27, 14, 5);
          c.moveTo(18, -11); c.lineTo(18, 16);
          c.moveTo(18, 16); c.lineTo(10, 38);
          c.moveTo(18, 16); c.lineTo(26, 38);
          c.moveTo(18, -5); c.lineTo(38, -26);
          c.stroke();
          c.font = '8px monospace';
          c.fillText('SITE CAD-04', -35, 48);
        }
        c.restore();

      } else if (it.type === 3) {
        // Warren Bridge Structural Truss
        c.save();
        c.translate(px - size * 0.6, py);
        const panels = 4;
        const pW = ((size * 1.2) / panels) * Math.min(1, prog * 1.3);
        const tH = size * 0.45;
        c.beginPath();
        c.moveTo(0, tH); c.lineTo(panels * pW, tH);
        c.moveTo(pW * 0.5, 0); c.lineTo((panels - 0.5) * pW, 0);
        for (let i = 0; i < panels; i++) {
          const bx1 = i * pW;
          const bx2 = (i + 1) * pW;
          const tx = (i + 0.5) * pW;
          c.moveTo(bx1, tH); c.lineTo(tx, 0);
          c.lineTo(bx2, tH);
        }
        c.stroke();
        if (prog > 0.5) {
          c.font = '7px monospace';
          c.fillText('TRUSS // BM & SF', 8, tH + 12);
        }
        c.restore();

      } else if (it.type === 4) {
        // Total Station Theodolite
        c.save();
        c.translate(px, py);
        const tS = size * 0.5 * Math.min(1, prog * 1.3);
        c.beginPath();
        c.strokeRect(-tS * 0.4, -tS * 0.7, tS * 0.8, tS * 0.5);
        c.moveTo(-tS * 0.8, -tS * 0.45); c.lineTo(tS * 0.8, -tS * 0.45);
        c.moveTo(-tS * 0.5, -tS * 0.2); c.lineTo(tS * 0.5, -tS * 0.2);
        c.moveTo(0, -tS * 0.2); c.lineTo(0, tS * 0.3);
        c.moveTo(0, tS * 0.3); c.lineTo(-tS * 0.6, tS * 0.9);
        c.moveTo(0, tS * 0.3); c.lineTo(0, tS * 0.9);
        c.moveTo(0, tS * 0.3); c.lineTo(tS * 0.6, tS * 0.9);
        c.stroke();
        if (prog > 0.5) {
          c.font = '7px monospace';
          c.fillText('θ=42°18\'', 10, -tS * 0.6);
        }
        c.restore();

      } else {
        // Elevation Contours
        c.save();
        c.translate(px, py);
        const cR = size * 0.5 * Math.min(1, prog * 1.3);
        c.beginPath();
        c.ellipse(0, 0, cR, cR * 0.6, 0.2, 0, Math.PI * 2);
        c.ellipse(4, -2, cR * 0.65, cR * 0.4, 0.2, 0, Math.PI * 2);
        c.ellipse(8, -4, cR * 0.35, cR * 0.22, 0.2, 0, Math.PI * 2);
        c.stroke();
        if (prog > 0.4) {
          c.font = '7px monospace';
          c.fillText('N ▲ +105m', -12, 4);
        }
        c.restore();
      }
    };

    // ── ELECTRICAL ENGINEERING DRAWINGS (EE) ──
    const drawEe = (c: CanvasRenderingContext2D, it: EngItem, px: number, py: number) => {
      const prog = it.progress;
      const size = it.size;

      if (it.type === 0) {
        // High-Voltage HVAC Tower
        c.save();
        c.translate(px, py);
        const tH = size * 1.3 * Math.min(1, prog * 1.3);
        const bW = size * 0.5;
        c.beginPath();
        c.moveTo(-bW / 2, tH * 0.5); c.lineTo(-bW * 0.12, -tH * 0.5);
        c.moveTo(bW / 2, tH * 0.5);  c.lineTo(bW * 0.12, -tH * 0.5);
        c.moveTo(0, -tH * 0.5 - 10); c.lineTo(0, -tH * 0.5);
        c.moveTo(-bW * 0.6, -tH * 0.25); c.lineTo(bW * 0.6, -tH * 0.25);
        c.moveTo(-bW * 0.75, -tH * 0.05); c.lineTo(bW * 0.75, -tH * 0.05);
        c.moveTo(-bW * 0.35, tH * 0.25); c.lineTo(bW * 0.35, tH * 0.05);
        c.moveTo(bW * 0.35, tH * 0.25); c.lineTo(-bW * 0.35, tH * 0.05);
        c.stroke();
        if (prog > 0.5) {
          c.font = '7px monospace';
          c.textAlign = 'center';
          c.fillText('400 kV HVAC', 0, tH * 0.5 + 12);
          c.textAlign = 'start';
        }
        c.restore();

      } else if (it.type === 1) {
        // Transmission Lines & Bulb
        c.save();
        c.translate(px, py);
        const spanW = size * 1.2 * Math.min(1, prog * 1.3);
        c.beginPath();
        c.moveTo(-spanW * 0.6, -14);
        c.quadraticCurveTo(0, -4, spanW * 0.2, -14);
        c.moveTo(-spanW * 0.6, -2);
        c.quadraticCurveTo(0, 8, spanW * 0.2, -2);
        c.stroke();

        const pulseX = (-spanW * 0.6) + ((Date.now() * 0.06) % (spanW * 0.8));
        c.beginPath();
        c.arc(pulseX, -9, 3, 0, Math.PI * 2);
        c.stroke();

        if (prog > 0.3) {
          const bX = spanW * 0.35;
          const bY = 4;
          c.beginPath();
          c.arc(bX, bY - 8, 12, 0, Math.PI * 2);
          c.strokeRect(bX - 5, bY + 4, 10, 8);
          c.moveTo(bX - 4, bY); c.lineTo(bX, bY - 8); c.lineTo(bX + 4, bY);
          c.stroke();
          c.font = '7px monospace';
          c.fillText('POWER FLOW 50Hz', -spanW * 0.5, 24);
        }
        c.restore();

      } else if (it.type === 2) {
        // Wind Turbine
        it.rotationAngle += 0.015;
        c.save();
        c.translate(px, py);
        const towerH = size * 1.2 * Math.min(1, prog * 1.3);
        c.beginPath();
        c.moveTo(-6, towerH * 0.45); c.lineTo(-2, -towerH * 0.4);
        c.moveTo(6, towerH * 0.45);  c.lineTo(2, -towerH * 0.4);
        c.strokeRect(-6, -towerH * 0.4 - 4, 12, 8);
        c.stroke();

        c.save();
        c.translate(0, -towerH * 0.4);
        c.rotate(it.rotationAngle);
        const bladeLen = size * 0.55;
        for (let b = 0; b < 3; b++) {
          const bAng = b * (Math.PI * 2 / 3);
          c.save();
          c.rotate(bAng);
          c.beginPath();
          c.moveTo(0, 0);
          c.quadraticCurveTo(4, -bladeLen * 0.5, 2, -bladeLen);
          c.quadraticCurveTo(-3, -bladeLen * 0.5, 0, 0);
          c.stroke();
          c.restore();
        }
        c.restore();
        if (prog > 0.4) {
          c.font = '7px monospace';
          c.textAlign = 'center';
          c.fillText('GEN // 2.5 MW', 0, towerH * 0.45 + 12);
          c.textAlign = 'start';
        }
        c.restore();

      } else if (it.type === 3) {
        // Turbine Runner
        it.rotationAngle += 0.02;
        c.save();
        c.translate(px, py);
        const rW = size * 0.48 * Math.min(1, prog * 1.3);
        c.beginPath();
        c.arc(0, 0, rW, 0, Math.PI * 2);
        c.stroke();
        c.save();
        c.rotate(it.rotationAngle);
        for (let v = 0; v < 8; v++) {
          const vAng = v * (Math.PI * 2 / 8);
          c.beginPath();
          c.moveTo(Math.cos(vAng) * rW * 0.3, Math.sin(vAng) * rW * 0.3);
          c.quadraticCurveTo(Math.cos(vAng + 0.3) * rW * 0.7, Math.sin(vAng + 0.3) * rW * 0.7, Math.cos(vAng) * rW * 0.95, Math.sin(vAng) * rW * 0.95);
          c.stroke();
        }
        c.arc(0, 0, rW * 0.3, 0, Math.PI * 2);
        c.stroke();
        c.restore();
        if (prog > 0.4) {
          c.font = '7px monospace';
          c.fillText('3000 RPM', -rW, rW + 14);
        }
        c.restore();

      } else if (it.type === 4) {
        // AC Waveform
        c.save();
        c.translate(px - size * 0.5, py);
        const waveW = size * 1.2 * Math.min(1, prog * 1.3);
        c.beginPath();
        c.moveTo(0, -size * 0.4); c.lineTo(0, size * 0.4);
        c.moveTo(0, 0); c.lineTo(waveW, 0);
        c.stroke();

        c.beginPath();
        const steps = Math.floor(40 * prog);
        for (let i = 0; i <= steps; i++) {
          const wx = (i / 40) * (size * 1.2);
          const wy = -Math.sin((i / 40) * Math.PI * 4) * (size * 0.32);
          if (i === 0) c.moveTo(wx, wy);
          else c.lineTo(wx, wy);
        }
        c.stroke();
        if (prog > 0.5) {
          c.font = '7px monospace';
          c.fillText('V(t)=Vm·sin(ωt)', 8, -size * 0.35);
        }
        c.restore();

      } else {
        // 3-Phase Phasor
        it.rotationAngle += 0.01;
        c.save();
        c.translate(px, py);
        c.rotate(it.rotationAngle);
        const pR = size * 0.45 * Math.min(1, prog * 1.3);
        c.beginPath();
        for (let a = 0; a < 3; a++) {
          const ang = a * (Math.PI * 2 / 3);
          c.moveTo(0, 0);
          c.lineTo(Math.cos(ang) * pR, Math.sin(ang) * pR);
        }
        c.stroke();
        c.font = '7px monospace';
        c.fillText('VR', pR + 2, 0);
        c.fillText('VY', Math.cos(2.09) * pR - 10, Math.sin(2.09) * pR + 8);
        c.fillText('VB', Math.cos(4.18) * pR - 10, Math.sin(4.18) * pR - 8);
        c.restore();
      }
    };

    // ── AUTOMOBILE ENGINEERING DRAWINGS (AE) ──
    const drawAutomobile = (c: CanvasRenderingContext2D, it: EngItem, px: number, py: number) => {
      const prog = it.progress;
      const size = it.size;

      if (it.type === 0) {
        // Piston & Crank
        c.save();
        c.translate(px, py);
        const cylW = size * 0.6 * Math.min(1, prog * 1.3);
        const cylH = size * 1.1;
        c.beginPath();
        c.moveTo(-cylW / 2, -cylH * 0.45); c.lineTo(-cylW / 2, cylH * 0.25);
        c.moveTo(cylW / 2, -cylH * 0.45);  c.lineTo(cylW / 2, cylH * 0.25);
        c.moveTo(-cylW / 2, -cylH * 0.45); c.lineTo(cylW / 2, -cylH * 0.45);
        c.stroke();

        const pistY = -cylH * 0.2 + Math.sin(Date.now() * 0.005) * (cylH * 0.15);
        c.beginPath();
        c.strokeRect(-cylW * 0.44, pistY, cylW * 0.88, cylH * 0.2);
        c.moveTo(0, pistY + cylH * 0.1);
        c.lineTo(Math.cos(Date.now() * 0.005) * 10, cylH * 0.35);
        c.arc(0, cylH * 0.35, 12, 0, Math.PI * 2);
        c.stroke();

        if (prog > 0.4) {
          c.font = '7px monospace';
          c.textAlign = 'center';
          c.fillText('4-STROKE // TDC', 0, cylH * 0.45 + 12);
          c.textAlign = 'start';
        }
        c.restore();

      } else if (it.type === 1) {
        // Cast Engine Block
        c.save();
        c.translate(px, py);
        const bW = size * 1.1 * Math.min(1, prog * 1.3);
        const bH = size * 0.75;
        c.beginPath();
        c.strokeRect(-bW / 2, -bH / 2, bW, bH);
        const numBores = 4;
        const boreW = bW / (numBores + 0.6);
        for (let b = 0; b < numBores; b++) {
          const bx = -bW * 0.42 + b * (boreW * 0.95);
          c.strokeRect(bx, -bH * 0.35, boreW * 0.75, bH * 0.7);
        }
        c.stroke();
        if (prog > 0.4) {
          c.font = '7px monospace';
          c.fillText('BLOCK 2.0L I-4', -bW * 0.45, -bH / 2 - 6);
        }
        c.restore();

      } else if (it.type === 2) {
        // Wheel & Rim
        it.rotationAngle += 0.02;
        c.save();
        c.translate(px, py);
        const wR = size * 0.46 * Math.min(1, prog * 1.3);
        c.beginPath();
        c.arc(0, 0, wR, 0, Math.PI * 2);
        c.arc(0, 0, wR * 0.8, 0, Math.PI * 2);
        c.stroke();
        c.save();
        c.rotate(it.rotationAngle);
        c.beginPath();
        c.arc(0, 0, wR * 0.35, 0, Math.PI * 2);
        for (let s = 0; s < 5; s++) {
          const sang = s * (Math.PI * 2 / 5);
          c.moveTo(Math.cos(sang) * wR * 0.35, Math.sin(sang) * wR * 0.35);
          c.lineTo(Math.cos(sang) * wR * 0.78, Math.sin(sang) * wR * 0.78);
        }
        c.stroke();
        c.restore();
        if (prog > 0.4) {
          c.font = '7px monospace';
          c.textAlign = 'center';
          c.fillText('225/45 R18', 0, wR + 12);
          c.textAlign = 'start';
        }
        c.restore();

      } else if (it.type === 3) {
        // Vehicle Silhouette Profile
        c.save();
        c.translate(px, py);
        const vW = size * 1.3 * Math.min(1, prog * 1.3);
        const vH = size * 0.45;
        c.beginPath();
        c.moveTo(-vW * 0.48, vH * 0.3);
        c.lineTo(-vW * 0.48, 0);
        c.quadraticCurveTo(-vW * 0.35, -vH * 0.2, -vW * 0.15, -vH * 0.2);
        c.quadraticCurveTo(-vW * 0.05, -vH * 0.7, vW * 0.15, -vH * 0.7);
        c.quadraticCurveTo(vW * 0.35, -vH * 0.4, vW * 0.48, 0);
        c.lineTo(vW * 0.48, vH * 0.3);
        c.arc(-vW * 0.28, vH * 0.3, 10, Math.PI, 0, true);
        c.arc(vW * 0.28, vH * 0.3, 10, Math.PI, 0, true);
        c.stroke();
        c.beginPath();
        c.arc(-vW * 0.28, vH * 0.3, 7, 0, Math.PI * 2);
        c.arc(vW * 0.28, vH * 0.3, 7, 0, Math.PI * 2);
        c.stroke();
        if (prog > 0.4) {
          c.font = '7px monospace';
          c.fillText('AERO // 120km/h', -vW * 0.4, -vH * 0.8);
        }
        c.restore();

      } else if (it.type === 4) {
        // Disc Brake
        c.save();
        c.translate(px, py);
        const dR = size * 0.45 * Math.min(1, prog * 1.3);
        c.beginPath();
        c.arc(0, 0, dR, 0, Math.PI * 2);
        c.arc(0, 0, dR * 0.5, 0, Math.PI * 2);
        c.stroke();
        c.strokeRect(dR * 0.5, -dR * 0.7, dR * 0.6, dR * 0.8);
        if (prog > 0.4) {
          c.font = '7px monospace';
          c.fillText('CALIPER // HYD', -dR, dR + 12);
        }
        c.restore();

      } else {
        // Rack & Pinion
        c.save();
        c.translate(px, py);
        const rW = size * 1.1 * Math.min(1, prog * 1.3);
        c.beginPath();
        c.strokeRect(-rW / 2, -4, rW, 8);
        c.strokeRect(-10, -22, 20, 18);
        c.moveTo(0, -22); c.lineTo(0, -30);
        c.stroke();
        if (prog > 0.4) {
          c.font = '7px monospace';
          c.textAlign = 'center';
          c.fillText('RACK & PINION', 0, 16);
          c.textAlign = 'start';
        }
        c.restore();
      }
    };

    // ── ELECTRONICS & TELECOMMUNICATION DRAWINGS (ETCE) ──
    const drawEtce = (c: CanvasRenderingContext2D, it: EngItem, px: number, py: number) => {
      const prog = it.progress;
      const size = it.size;

      if (it.type === 0) {
        // Orbiting Satellite
        c.save();
        c.translate(px, py);
        const satW = size * 1.2 * Math.min(1, prog * 1.3);
        const satH = size * 0.35;
        c.beginPath();
        c.strokeRect(-satH * 0.6, -satH * 0.6, satH * 1.2, satH * 1.2);
        const wingW = satW * 0.4;
        c.strokeRect(-satW * 0.5, -satH * 0.4, wingW, satH * 0.8);
        c.strokeRect(satW * 0.5 - wingW, -satH * 0.4, wingW, satH * 0.8);
        c.arc(0, satH * 0.6 + 6, 9, Math.PI, 0, true);
        c.moveTo(0, satH * 0.6); c.lineTo(0, satH * 0.6 + 6);
        c.stroke();
        if (prog > 0.3) {
          for (let w = 1; w <= 3; w++) {
            c.beginPath();
            c.arc(0, satH * 0.6 + 6, 10 + w * 6, Math.PI * 0.3, Math.PI * 0.7);
            c.stroke();
          }
          c.font = '7px monospace';
          c.textAlign = 'center';
          c.fillText('GEO-SAT // 36,000km', 0, -satH * 0.8);
          c.textAlign = 'start';
        }
        c.restore();

      } else if (it.type === 1) {
        // 5G Cell Tower
        c.save();
        c.translate(px, py);
        const towH = size * 1.25 * Math.min(1, prog * 1.3);
        const towW = size * 0.35;
        c.beginPath();
        c.moveTo(-towW / 2, towH * 0.45); c.lineTo(-2, -towH * 0.45);
        c.moveTo(towW / 2, towH * 0.45);  c.lineTo(2, -towH * 0.45);
        c.strokeRect(-towW * 0.7, -towH * 0.45, 6, 14);
        c.strokeRect(towW * 0.7 - 6, -towH * 0.45, 6, 14);
        c.moveTo(-towW * 0.7, -towH * 0.38); c.lineTo(towW * 0.7, -towH * 0.38);
        c.stroke();
        if (prog > 0.3) {
          c.font = '7px monospace';
          c.fillText('5G NR // 3.5GHz', -towW * 0.4, -towH * 0.52);
        }
        c.restore();

      } else if (it.type === 2) {
        // Transistor & Op-Amp
        c.save();
        c.translate(px, py);
        const cSize = size * 0.8 * Math.min(1, prog * 1.3);
        c.beginPath();
        c.arc(-cSize * 0.3, 0, 14, 0, Math.PI * 2);
        c.moveTo(-cSize * 0.3 - 6, -8); c.lineTo(-cSize * 0.3 - 6, 8);
        c.moveTo(-cSize * 0.3 - 14, 0); c.lineTo(-cSize * 0.3 - 6, 0);
        c.moveTo(-cSize * 0.3 - 6, -4); c.lineTo(-cSize * 0.3 + 6, -10);
        c.moveTo(-cSize * 0.3 - 6, 4);  c.lineTo(-cSize * 0.3 + 6, 10);
        c.stroke();
        if (prog > 0.4) {
          const opX = cSize * 0.25;
          c.beginPath();
          c.moveTo(opX, -14); c.lineTo(opX + 22, 0); c.lineTo(opX, 14);
          c.closePath();
          c.moveTo(opX + 22, 0); c.lineTo(opX + 30, 0);
          c.stroke();
          c.font = '7px monospace';
          c.fillText('NPN / OP-AMP', opX - 10, -18);
        }
        c.restore();

      } else if (it.type === 3) {
        // DIP IC Chip
        c.save();
        c.translate(px, py);
        const icW = size * 0.85 * Math.min(1, prog * 1.3);
        const icH = size * 0.45;
        c.beginPath();
        c.strokeRect(-icW / 2, -icH / 2, icW, icH);
        c.arc(-icW / 2, 0, 4, -Math.PI / 2, Math.PI / 2);
        c.stroke();
        const pinCount = 6;
        const pinSpacing = icW / (pinCount + 1);
        for (let p = 1; p <= pinCount; p++) {
          const pxPos = -icW / 2 + p * pinSpacing;
          c.moveTo(pxPos, -icH / 2); c.lineTo(pxPos, -icH / 2 - 5);
          c.moveTo(pxPos, icH / 2);  c.lineTo(pxPos, icH / 2 + 5);
        }
        c.stroke();
        if (prog > 0.4) {
          c.font = '7px monospace';
          c.textAlign = 'center';
          c.fillText('STM32 ARM', 0, 3);
          c.textAlign = 'start';
        }
        c.restore();

      } else if (it.type === 4) {
        // RF Carrier Wave
        c.save();
        c.translate(px - size * 0.5, py);
        const rfW = size * 1.2 * Math.min(1, prog * 1.3);
        c.beginPath();
        c.moveTo(0, 0); c.lineTo(rfW, 0);
        c.stroke();
        c.beginPath();
        const rfSteps = Math.floor(45 * prog);
        for (let i = 0; i <= rfSteps; i++) {
          const rx = (i / 45) * rfW;
          const env = 0.5 + 0.5 * Math.cos((i / 45) * Math.PI * 2);
          const ry = -Math.sin((i / 45) * Math.PI * 18) * (size * 0.3 * env);
          if (i === 0) c.moveTo(rx, ry);
          else c.lineTo(rx, ry);
        }
        c.stroke();
        if (prog > 0.5) {
          c.font = '7px monospace';
          c.fillText('fc ± fm', 4, -size * 0.35);
        }
        c.restore();

      } else {
        // Fiber Optic Core TIR
        c.save();
        c.translate(px - size * 0.55, py);
        const fLen = size * 1.25 * Math.min(1, prog * 1.3);
        const fH = 14;
        c.beginPath();
        c.strokeRect(0, -fH, fLen, fH * 2);
        c.moveTo(0, -fH * 0.4); c.lineTo(fLen, -fH * 0.4);
        c.moveTo(0, fH * 0.4);  c.lineTo(fLen, fH * 0.4);
        c.stroke();
        if (prog > 0.3) {
          c.beginPath();
          c.moveTo(0, 0);
          const zPoints = Math.floor(7 * prog);
          const zStep = fLen / 7;
          for (let z = 1; z <= zPoints; z++) {
            const zDir = (z % 2 === 1) ? -fH * 0.35 : fH * 0.35;
            c.lineTo(z * zStep, zDir);
          }
          c.stroke();
          c.font = '7px monospace';
          c.fillText('FIBER // TIR', 6, fH + 12);
        }
        c.restore();
      }
    };

    // ── MAIN ANIMATION LOOP (DRAWING -> LINGER -> DISSOLVE) ──
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      items.forEach((it) => {
        // State Machine
        if (it.state === 'drawing') {
          it.progress += it.drawSpeed;
          if (it.progress >= 1) {
            it.progress = 1;
            it.state = 'linger';
            it.lingerFrames = 0;
          }
        } else if (it.state === 'linger') {
          it.lingerFrames++;
          if (it.lingerFrames >= it.maxLinger) {
            it.state = 'dissolving';
          }
        } else if (it.state === 'dissolving') {
          it.alpha -= 0.012;
          if (it.alpha <= 0) {
            // Respawn with new type in same or next zone
            const nextIdx = (it.zoneIdx + 1) % ambientZones.length;
            const newItem = createEngItem(nextIdx, 0);
            Object.assign(it, newItem);
          }
        }

        const px = it.relX * width;
        const py = it.relY * height;

        ctx.save();
        ctx.strokeStyle = accentHex;
        ctx.fillStyle = accentHex;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = Math.max(0, it.alpha);
        ctx.shadowColor = accentHex;
        ctx.shadowBlur = 6;

        if (deptType === 'ME') {
          drawMechanical(ctx, it, px, py);
        } else if (deptType === 'EE') {
          drawEe(ctx, it, px, py);
        } else if (deptType === 'CE') {
          drawCe(ctx, it, px, py);
        } else if (deptType === 'AE') {
          drawAutomobile(ctx, it, px, py);
        } else if (deptType === 'ETCE') {
          drawEtce(ctx, it, px, py);
        } else {
          drawCst(ctx, it, px, py);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [deptCode, accentHex]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-90 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}
