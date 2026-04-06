"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let points: { x: number; y: number; rotation: number }[] = [];

    // Core parameters (density will change based on device)
    let gridSpacing = 48;
    const lineLength = 12;
    const lineWidth = 2;
    const rotationSpeed = 0.25;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let isMobile = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return; // Ignore real mouse on simulated devices
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Determine if touch/mobile for performance gating and automated movement
      isMobile = window.matchMedia?.("(pointer: coarse)").matches || window.innerWidth <= 768;
      // Drastically reduce density on mobile to prevent blocking the scrolling paint thread
      gridSpacing = isMobile ? 84 : 48;

      points = [];
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        for (let y = 0; y < canvas.height; y += gridSpacing) {
          points.push({ x, y, rotation: 0 });
        }
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Determine line color based on resolved theme
      const isDark = resolvedTheme !== "light"; // default to dark if undefined
      const colorRGB = isDark ? "50, 50, 50" : "200, 200, 200";

      ctx.lineWidth = lineWidth;

      // Simulate a graceful, winding phantom cursor if we are on a mobile device
      if (isMobile) {
        const time = performance.now() / 2500;
        mouseX = canvas.width / 2 + Math.sin(time) * (canvas.width / 2.5);
        mouseY = canvas.height / 2 + Math.cos(time * 0.8) * (canvas.height / 2.5);
      }

      // Group rendering to avoid excessive context switches
      ctx.strokeStyle = `rgba(${colorRGB}, 1)`; // Base stroke state set here initially

      points.forEach((p) => {
        const dxM = mouseX - p.x;
        const dyM = mouseY - p.y;
        let angleToMouse = Math.atan2(dyM, dxM);
        const distanceToMouse = Math.sqrt(dxM * dxM + dyM * dyM);
        const interpolation = rotationSpeed / (distanceToMouse / gridSpacing + 1);

        // Normalize rotation loop
        while (angleToMouse - p.rotation > Math.PI) angleToMouse -= 2 * Math.PI;
        while (angleToMouse - p.rotation < -Math.PI) angleToMouse += 2 * Math.PI;

        p.rotation += (angleToMouse - p.rotation) * interpolation;

        const dx = Math.cos(p.rotation) * lineLength;
        const dy = Math.sin(p.rotation) * lineLength;

        // mapping distanceToMouse (0 to width) to alpha (255 to 50)
        let alpha = 255 + (distanceToMouse) * (50 - 255) / window.innerWidth;
        alpha = Math.max(0, Math.min(255, alpha)) / 255;

        // We still must change alpha per line unfortunately unless we group by identical alpha mapping
        ctx.strokeStyle = `rgba(${colorRGB}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(p.x - dx, p.y - dy);
        ctx.lineTo(p.x + dx, p.y + dy);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 pointer-events-none opacity-60"
    />
  );
}
