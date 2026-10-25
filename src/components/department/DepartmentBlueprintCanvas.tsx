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
