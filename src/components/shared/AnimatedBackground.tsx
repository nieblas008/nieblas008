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
    
    const gridSpacing = 48;
    const lineLength = 12;
    const lineWidth = 2;
    const rotationSpeed = 0.25;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
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
      const colorRGB = isDark ? "50, 50, 50" : "205, 205, 205";
      
      ctx.lineWidth = lineWidth;

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
