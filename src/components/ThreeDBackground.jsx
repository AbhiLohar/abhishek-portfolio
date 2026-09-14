import React, { useEffect, useRef } from 'react';

/**
 * High-Performance 3D Animated Background Engine
 * Inspired by MotionSites.ai (Digital Epoch, Digital Reality, Aetheris Voyage)
 * Modes:
 *  - 'neural': 3D Neural Synapse Network (AI Nodes & Axons pulsing in 3D space)
 *  - 'grid'  : 3D Cyber Horizon Wave (Undulating perspective grid)
 *  - 'matrix': 3D Volumetric Matrix Data Stream
 */
export default function ThreeDBackground({ mode = 'neural', accentColor = '#22c55e' }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const shockwavesRef = useRef([]);

  useEffect(() => {
    if (mode === 'off') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      // Normalize cursor between -1 and 1
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleClick = (e) => {
      // Add shockwave ripple origin
      shockwavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: Math.max(width, height) * 0.45,
        opacity: 0.8
      });
    };
    window.addEventListener('click', handleClick);

    // ==========================================
    // 1. NEURAL MESH PARTICLES DATA
    // ==========================================
    const NUM_NODES = Math.min(85, Math.floor(width / 18));
    const nodes = [];
    const FOV = 400;

    for (let i = 0; i < NUM_NODES; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 100,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        vz: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2.5 + 1.2,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // ==========================================
    // 2. 3D MATRIX RAIN DATA
    // ==========================================
    const matrixCols = Math.floor(width / 24);
    const matrixDrops = [];
    const chars = "01010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789αβγδεζηθλμξπρστυφχψω";

    for (let i = 0; i < matrixCols; i++) {
      matrixDrops.push({
        x: i * 24,
        y: Math.random() * -height,
        z: Math.random() * 600 + 150,
        speed: Math.random() * 3 + 2,
        char: chars[Math.floor(Math.random() * chars.length)],
        length: Math.floor(Math.random() * 12 + 6)
      });
    }

    // ==========================================
    // 3. 3D CYBER HORIZON GRID DATA
    // ==========================================
    let gridOffset = 0;

    // ==========================================
    // MAIN RENDER LOOP (60 FPS)
    // ==========================================
    let frame = 0;

    const render = () => {
      frame++;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const rotY = mouseRef.current.x * 0.35;
      const rotX = -mouseRef.current.y * 0.25;

      ctx.clearRect(0, 0, width, height);

      // --- SHOCKWAVE UPDATES ---
      shockwavesRef.current = shockwavesRef.current.filter(sw => sw.radius < sw.maxRadius && sw.opacity > 0.01);
      shockwavesRef.current.forEach(sw => {
        sw.radius += 12;
        sw.opacity *= 0.94;
        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 197, 94, ${sw.opacity * 0.4})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      });

      // ------------------------------------------
      // MODE A: 3D NEURAL SYNAPSE NETWORK
      // ------------------------------------------
      if (mode === 'neural') {
        const projected = [];

        // Project and rotate 3D nodes
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          n.z += n.vz;
          n.pulsePhase += 0.03;

          // Bounding box bounce
          if (Math.abs(n.x) > width * 0.8) n.vx *= -1;
          if (Math.abs(n.y) > height * 0.8) n.vy *= -1;
          if (n.z < 80 || n.z > 950) n.vz *= -1;

          // 3D Rotation Y
          let x1 = n.x * Math.cos(rotY) + n.z * Math.sin(rotY);
          let z1 = -n.x * Math.sin(rotY) + n.z * Math.cos(rotY);

          // 3D Rotation X
          let y2 = n.y * Math.cos(rotX) - z1 * Math.sin(rotX);
          let z2 = n.y * Math.sin(rotX) + z1 * Math.cos(rotX);

          if (z2 <= 20) continue;

          // 3D Perspective Projection
          const scale = FOV / z2;
          const sx = width / 2 + x1 * scale;
          const sy = height / 2 + y2 * scale;
          const alpha = Math.min(1, Math.max(0.1, (1000 - z2) / 850));

          projected.push({ sx, sy, z: z2, scale, alpha, pulse: Math.sin(n.pulsePhase), size: n.size });
        }

        // Draw connecting 3D Synaptic Axons
        for (let i = 0; i < projected.length; i++) {
          for (let j = i + 1; j < projected.length; j++) {
            const p1 = projected[i];
            const p2 = projected[j];
            const dx = p1.sx - p2.sx;
            const dy = p1.sy - p2.sy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Connect nearby nodes
            if (dist < 130) {
              const lineAlpha = (1 - dist / 130) * Math.min(p1.alpha, p2.alpha) * 0.35;
              ctx.beginPath();
              ctx.moveTo(p1.sx, p1.sy);
              ctx.lineTo(p2.sx, p2.sy);
              ctx.strokeStyle = `rgba(34, 197, 94, ${lineAlpha})`;
              ctx.lineWidth = Math.max(0.5, (1 - dist / 130) * 1.5);
              ctx.stroke();
            }
          }
        }

        // Draw Neural Nodes
        for (let i = 0; i < projected.length; i++) {
          const p = projected[i];
          const nodeRadius = Math.max(1, p.size * p.scale * (1 + p.pulse * 0.25));

          // Outer synaptic glow
          const grad = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, nodeRadius * 3);
          grad.addColorStop(0, `rgba(74, 222, 128, ${p.alpha * 0.9})`);
          grad.addColorStop(0.4, `rgba(34, 197, 94, ${p.alpha * 0.4})`);
          grad.addColorStop(1, 'rgba(34, 197, 94, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, nodeRadius * 3, 0, Math.PI * 2);
          ctx.fill();

          // Solid core
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.95})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, Math.max(0.8, nodeRadius * 0.6), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ------------------------------------------
      // MODE B: 3D CYBER HORIZON WAVE GRID
      // ------------------------------------------
      else if (mode === 'grid') {
        gridOffset = (gridOffset + 1.2) % 40;
        const horizonY = height * 0.48 + mouseRef.current.y * 40;

        // Ambient cyber horizon gradient
        const horizonGlow = ctx.createLinearGradient(0, horizonY - 120, 0, horizonY + 180);
        horizonGlow.addColorStop(0, 'rgba(5, 5, 16, 0)');
        horizonGlow.addColorStop(0.45, 'rgba(34, 197, 94, 0.18)');
        horizonGlow.addColorStop(1, 'rgba(5, 5, 16, 0)');
        ctx.fillStyle = horizonGlow;
        ctx.fillRect(0, horizonY - 120, width, 300);

        ctx.lineWidth = 1.2;

        // Perspective longitudinal lines converging to vanishing point
        const vpX = width / 2 + mouseRef.current.x * 120;
        const vpY = horizonY;

        const numLong = 28;
        for (let i = -numLong / 2; i <= numLong / 2; i++) {
          const bottomX = width / 2 + i * (width / (numLong * 0.75));
          ctx.beginPath();
          ctx.moveTo(vpX, vpY);
          ctx.lineTo(bottomX, height);
          const lineAlpha = 0.25 * (1 - Math.abs(i) / (numLong / 2));
          ctx.strokeStyle = `rgba(34, 197, 94, ${Math.max(0.05, lineAlpha)})`;
          ctx.stroke();
        }

        // Horizontal perspective lines with wave undulation
        const numLat = 22;
        for (let j = 0; j < numLat; j++) {
          const t = (j * 40 + gridOffset) / (numLat * 40);
          const py = vpY + Math.pow(t, 2.2) * (height - vpY);
          const waveAmp = Math.sin(frame * 0.04 + j * 0.3) * 6 * t;

          ctx.beginPath();
          ctx.moveTo(0, py + waveAmp);
          ctx.lineTo(width, py + waveAmp);
          ctx.strokeStyle = `rgba(34, 197, 94, ${t * 0.45})`;
          ctx.stroke();
        }
      }

      // ------------------------------------------
      // MODE C: 3D MATRIX VOLUMETRIC RAIN
      // ------------------------------------------
      else if (mode === 'matrix') {
        ctx.font = '11px monospace';

        matrixDrops.forEach(d => {
          d.y += d.speed;
          if (d.y > height + 100) {
            d.y = -100;
            d.char = chars[Math.floor(Math.random() * chars.length)];
          }

          // 3D Perspective rotation
          const z = d.z;
          const scale = FOV / z;
          const sx = width / 2 + (d.x - width / 2) * scale + mouseRef.current.x * 30;
          const sy = d.y * scale + mouseRef.current.y * 30;
          const alpha = Math.min(1, Math.max(0.1, (800 - z) / 700));

          // Draw head glyph (glowing bright white/green)
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fillText(d.char, sx, sy);

          // Draw trailing glyphs
          for (let k = 1; k < d.length; k++) {
            const trailY = sy - k * (14 * scale);
            if (trailY > 0 && trailY < height) {
              const trailAlpha = alpha * (1 - k / d.length) * 0.7;
              ctx.fillStyle = `rgba(34, 197, 94, ${trailAlpha})`;
              ctx.fillText(chars[(frame + k) % chars.length], sx, trailY);
            }
          }
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [mode, accentColor]);

  if (mode === 'off') return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ opacity: 0.88 }}
    />
  );
}
