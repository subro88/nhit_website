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

    // Handle high DPI retina displays
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Dynamic Circuit signal packets traveling along buses
    interface Packet {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      progress: number;
      speed: number;
      size: number;
      trailLength: number;
    }

    const packets: Packet[] = [];
    const maxPackets = 24;

    const createRandomPacket = (): Packet => {
      const isHorizontal = Math.random() > 0.4;
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      const dist = 100 + Math.random() * 220;

      return {
        x: startX,
        y: startY,
        targetX: isHorizontal ? startX + (Math.random() > 0.5 ? dist : -dist) : startX,
        targetY: !isHorizontal ? startY + (Math.random() > 0.5 ? dist : -dist) : startY,
        progress: 0,
        speed: 0.007 + Math.random() * 0.012,
        size: 3 + Math.random() * 2.5,
        trailLength: 20 + Math.random() * 30,
      };
    };

    for (let i = 0; i < maxPackets; i++) {
      packets.push(createRandomPacket());
    }

    let time = 0;

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Determine engineering discipline
      const isElectrical = deptCode.includes('EE') || deptCode.toLowerCase().includes('electric');
      const isMechanical = deptCode.includes('ME') || deptCode.toLowerCase().includes('mechan');
      const isCivil = deptCode.includes('CE') || deptCode.toLowerCase().includes('civil');
      const isTelecom = deptCode.includes('ETCE') || deptCode.toLowerCase().includes('telecom');

      // ── 1. Draw High-Tech Grid & Circuit Bus Lines ──
      ctx.lineWidth = 1;
      const step = 60;

      // Subtle vertical bus lines
      for (let x = step; x < width; x += step * 2) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        // Accent circuit junctions
        ctx.fillStyle = `${accentHex}40`;
        for (let y = step; y < height; y += step * 2) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Horizontal bus lines
      for (let y = step; y < height; y += step * 2) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // ── 2. Discipline-Specific Living Engineering Blueprint ──
      if (isElectrical) {
        // ── Electrical: AC Sinusoidal Waveforms & Transformer Coils ──
        const waveY = height * 0.45;
        const amp = 45;
        const freq = 0.012;

        // AC Sine Wave 1 (Phase R)
        ctx.strokeStyle = accentHex;
        ctx.shadowColor = accentHex;
        ctx.shadowBlur = 10;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < width * 0.55; x += 4) {
          const y = waveY + Math.sin(x * freq + time * 3) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // AC Sine Wave 2 (Phase Y - 120 deg shifted)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let x = 0; x < width * 0.55; x += 4) {
          const y = waveY + Math.sin(x * freq + time * 3 + (2 * Math.PI) / 3) * amp * 0.8;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Inductive Helical Coil representation on Left
        const coilX = width * 0.12;
        const coilY = height * 0.65;
        ctx.strokeStyle = `${accentHex}80`;
        ctx.lineWidth = 1.8;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.ellipse(coilX + i * 22, coilY, 8, 26, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

      } else if (isMechanical) {
        // ── Mechanical: Meshed Spur Gears & Planetary Rotation ──
        const gearX = width * 0.18;
        const gearY = height * 0.48;
        const gearR = 60;
        const teeth = 14;

        ctx.strokeStyle = `${accentHex}90`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = accentHex;
        ctx.shadowBlur = 8;

        // Primary Pitch Circle
        ctx.beginPath();
        ctx.arc(gearX, gearY, gearR, 0, Math.PI * 2);
        ctx.stroke();

        // Gear Teeth
        for (let i = 0; i < teeth; i++) {
          const angle = (i * Math.PI * 2) / teeth + time * 0.8;
          const x1 = gearX + Math.cos(angle) * (gearR - 6);
          const y1 = gearY + Math.sin(angle) * (gearR - 6);
          const x2 = gearX + Math.cos(angle) * (gearR + 12);
          const y2 = gearY + Math.sin(angle) * (gearR + 12);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        // Gear Hub & Center Axle
        ctx.fillStyle = `${accentHex}30`;
        ctx.beginPath();
        ctx.arc(gearX, gearY, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

      } else if (isCivil) {
        // ── Civil: Warren Truss Bridge Joints & Load Vectors ──
        const trussStartX = width * 0.05;
        const trussY = height * 0.55;
        const panelW = 70;
        const trussH = 65;

        ctx.strokeStyle = `${accentHex}85`;
        ctx.lineWidth = 2;
        ctx.shadowColor = accentHex;
        ctx.shadowBlur = 8;

        // Bottom Chord
        ctx.beginPath();
        ctx.moveTo(trussStartX, trussY);
        ctx.lineTo(trussStartX + panelW * 4, trussY);
        ctx.stroke();

        // Top Chord
        ctx.beginPath();
        ctx.moveTo(trussStartX + panelW * 0.5, trussY - trussH);
        ctx.lineTo(trussStartX + panelW * 3.5, trussY - trussH);
        ctx.stroke();

        // Diagonals
        for (let i = 0; i < 4; i++) {
          const bx1 = trussStartX + i * panelW;
          const tx1 = trussStartX + (i + 0.5) * panelW;
          const bx2 = trussStartX + (i + 1) * panelW;

          ctx.beginPath();
          ctx.moveTo(bx1, trussY);
          ctx.lineTo(tx1, trussY - trussH);
          ctx.lineTo(bx2, trussY);
          ctx.stroke();

          // Joint Pins
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(bx1, trussY, 3.5, 0, Math.PI * 2);
          ctx.arc(tx1, trussY - trussH, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;

      } else {
        // ── CST & Computing: 64-Bit Microprocessor CPU Die & Logic Gates ──
        const cpuX = width * 0.18;
        const cpuY = height * 0.50;
        const cpuSize = Math.min(width * 0.22, 140);

        // Outer Silicon Package Frame
        ctx.strokeStyle = `${accentHex}85`;
        ctx.lineWidth = 2;
        ctx.shadowColor = accentHex;
        ctx.shadowBlur = 12;
        ctx.strokeRect(cpuX - cpuSize / 2, cpuY - cpuSize / 2, cpuSize, cpuSize);

        // Inner Core Matrix
        ctx.fillStyle = `${accentHex}15`;
        ctx.fillRect(cpuX - cpuSize * 0.35, cpuY - cpuSize * 0.35, cpuSize * 0.7, cpuSize * 0.7);
        ctx.strokeStyle = `${accentHex}60`;
        ctx.strokeRect(cpuX - cpuSize * 0.35, cpuY - cpuSize * 0.35, cpuSize * 0.7, cpuSize * 0.7);

        // Core Pulsing Node
        const pulseR = 5 + Math.sin(time * 3.5) * 2;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cpuX, cpuY, pulseR, 0, Math.PI * 2);
        ctx.fill();

        // Ripple Wave dissolving outward from CPU core
        const ripple = (time * 45) % 90;
        const rippleAlpha = Math.max(0, 1 - ripple / 90);
        ctx.strokeStyle = `${accentHex}${Math.floor(rippleAlpha * 200).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cpuX, cpuY, ripple, 0, Math.PI * 2);
        ctx.stroke();

        // CPU Pin Connectors (Top, Bottom, Left, Right)
        const pins = 6;
        const pinLen = 18;
        ctx.strokeStyle = `${accentHex}75`;
        ctx.lineWidth = 1.5;
        for (let i = 0; i < pins; i++) {
          const offset = (cpuSize / (pins + 1)) * (i + 1) - cpuSize / 2;
          // Left
          ctx.beginPath();
          ctx.moveTo(cpuX - cpuSize / 2, cpuY + offset);
          ctx.lineTo(cpuX - cpuSize / 2 - pinLen, cpuY + offset);
          ctx.stroke();
          // Right
          ctx.beginPath();
          ctx.moveTo(cpuX + cpuSize / 2, cpuY + offset);
          ctx.lineTo(cpuX + cpuSize / 2 + pinLen, cpuY + offset);
          ctx.stroke();
          // Top
          ctx.beginPath();
          ctx.moveTo(cpuX + offset, cpuY - cpuSize / 2);
          ctx.lineTo(cpuX + offset, cpuY - cpuSize / 2 - pinLen);
          ctx.stroke();
          // Bottom
          ctx.beginPath();
          ctx.moveTo(cpuX + offset, cpuY + cpuSize / 2);
          ctx.lineTo(cpuX + offset, cpuY + cpuSize / 2 + pinLen);
          ctx.stroke();
        }

        // Logic Gate: NAND Gate on Upper Left
        const gateX = width * 0.08;
        const gateY = height * 0.24;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(gateX, gateY, 20, -Math.PI / 2, Math.PI / 2);
        ctx.lineTo(gateX - 20, gateY + 20);
        ctx.lineTo(gateX - 20, gateY - 20);
        ctx.closePath();
        ctx.stroke();

        // NAND Bubble & Output Trace
        ctx.beginPath();
        ctx.arc(gateX + 23, gateY, 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(gateX + 26, gateY);
        ctx.lineTo(gateX + 55, gateY);
        ctx.stroke();

        ctx.shadowBlur = 0;
      }

      // ── 3. Traveling Glowing Electron Packets with Dissolving Trails ──
      packets.forEach((p, idx) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          packets[idx] = createRandomPacket();
          return;
        }

        const currX = p.x + (p.targetX - p.x) * p.progress;
        const currY = p.y + (p.targetY - p.y) * p.progress;

        // Direction vector for trail
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const uX = dx / dist;
        const uY = dy / dist;

        // Draw Dissolving Trail
        const trailStartX = currX - uX * p.trailLength;
        const trailStartY = currY - uY * p.trailLength;
        const grad = ctx.createLinearGradient(trailStartX, trailStartY, currX, currY);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(1, accentHex);

        ctx.strokeStyle = grad;
        ctx.lineWidth = p.size * 0.8;
        ctx.beginPath();
        ctx.moveTo(trailStartX, trailStartY);
        ctx.lineTo(currX, currY);
        ctx.stroke();

        // Draw Glowing Packet Head
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = accentHex;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(currX, currY, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
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
      className="absolute inset-0 w-full h-full pointer-events-none z-[2] opacity-90 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}
