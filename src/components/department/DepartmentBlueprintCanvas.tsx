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

    // Circuit data packets traveling along buses
    interface Packet {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      progress: number;
      speed: number;
      size: number;
      alpha: number;
    }

    const packets: Packet[] = [];
    const maxPackets = 18;

    // Fixed circuit trace coordinates relative to width/height
    const createRandomPacket = (): Packet => {
      const startLeft = Math.random() > 0.5;
      const startX = startLeft ? Math.random() * (width * 0.4) : width * 0.6 + Math.random() * (width * 0.4);
      const startY = Math.random() * height;
      const angle = Math.random() > 0.5 ? 0 : Math.PI / 2;
      const dist = 80 + Math.random() * 140;
      
      return {
        x: startX,
        y: startY,
        targetX: startX + Math.cos(angle) * dist,
        targetY: startY + Math.sin(angle) * dist,
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        size: 2 + Math.random() * 2,
        alpha: 0.4 + Math.random() * 0.6,
      };
    };

    for (let i = 0; i < maxPackets; i++) {
      packets.push(createRandomPacket());
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // ── Draw CST Electronic Logic Gates & Bus Traces ──
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;

      // Draw subtle background logic lines
      const step = 48;
      for (let x = step; x < width; x += step * 2) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw stylized CPU Die Frame on the left/center
      const cpuX = width * 0.22;
      const cpuY = height * 0.52;
      const cpuSize = Math.min(width * 0.2, 140);

      // CPU Outer Boundary
      ctx.strokeStyle = `${accentHex}20`;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cpuX - cpuSize / 2, cpuY - cpuSize / 2, cpuSize, cpuSize);

      // CPU Inner Core
      ctx.fillStyle = `${accentHex}08`;
      ctx.fillRect(cpuX - cpuSize * 0.35, cpuY - cpuSize * 0.35, cpuSize * 0.7, cpuSize * 0.7);
      ctx.strokeStyle = `${accentHex}35`;
      ctx.strokeRect(cpuX - cpuSize * 0.35, cpuY - cpuSize * 0.35, cpuSize * 0.7, cpuSize * 0.7);

      // CPU Pin Traces (Top/Bottom/Left/Right)
      const numPins = 6;
      const pinLen = 18;
      ctx.strokeStyle = `${accentHex}25`;
      for (let i = 0; i < numPins; i++) {
        const offset = (cpuSize / (numPins + 1)) * (i + 1) - cpuSize / 2;
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
      }

      // CPU Core Pulsing Indicator
      const pulseRadius = 4 + Math.sin(time * 3) * 2;
      ctx.fillStyle = accentHex;
      ctx.beginPath();
      ctx.arc(cpuX, cpuY, pulseRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw stylized NAND / AND logic gates
      const gateX = width * 0.12;
      const gateY = height * 0.28;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.arc(gateX, gateY, 22, -Math.PI / 2, Math.PI / 2);
      ctx.lineTo(gateX - 22, gateY + 22);
      ctx.lineTo(gateX - 22, gateY - 22);
      ctx.closePath();
      ctx.stroke();

      // Output line from logic gate
      ctx.beginPath();
      ctx.moveTo(gateX + 22, gateY);
      ctx.lineTo(gateX + 45, gateY);
      ctx.stroke();

      // Small bubble for NAND
      ctx.beginPath();
      ctx.arc(gateX + 26, gateY, 3, 0, Math.PI * 2);
      ctx.stroke();

      // ── Animate Dynamic Circuit Signal Packets ──
      packets.forEach((p, idx) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          packets[idx] = createRandomPacket();
          return;
        }

        const currX = p.x + (p.targetX - p.x) * p.progress;
        const currY = p.y + (p.targetY - p.y) * p.progress;

        // Draw glowing signal packet
        ctx.fillStyle = accentHex;
        ctx.shadowColor = accentHex;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(currX, currY, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow to avoid performance hit
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
      className="absolute inset-0 w-full h-full pointer-events-none z-[2] opacity-70"
      aria-hidden="true"
    />
  );
}
