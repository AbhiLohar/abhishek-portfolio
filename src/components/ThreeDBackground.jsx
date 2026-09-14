import React, { useEffect, useRef } from 'react';

/**
 * Ultra-High-Performance 60 FPS 3D Animated Background Engine
 * Optimized for buttery smoothness with zero GPU/CPU lag:
 *  - Cached offscreen glow sprites (no per-frame radial gradient allocations)
 *  - Batched path draws (single-call line rendering)
 *  - Fast squared-distance culling
 *  - React.memo to prevent unnecessary re-renders
 */
function ThreeDBackground({ mode = 'neural', accentColor = '#22c55e' }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const shockwavesRef = useRef([]);

  useEffect(() => {
    if (mode === 'off') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleClick = (e) => {
      if (shockwavesRef.current.length < 4) {
        shockwavesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          radius: 10,
          maxRadius: Math.min(width, height) * 0.4,
          opacity: 0.7
        });
      }
    };
    window.addEventListener('click', handleClick, { passive: true });

    // ==========================================
    // PRE-RENDER GLOW SPRITE (ZERO PER-FRAME ALLOCATIONS)
    // ==========================================
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 64;
    glowCanvas.height = 64;
    const gCtx = glowCanvas.getContext('2d');
    if (gCtx) {
      const g = gCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, 'rgba(74, 222, 128, 1)');
      g.addColorStop(0.35, 'rgba(34, 197, 94, 0.45)');
      g.addColorStop(1, 'rgba(34, 197, 94, 0)');
      gCtx.fillStyle = g;
      gCtx.beginPath();
      gCtx.arc(32, 32, 32, 0, Math.PI * 2);
      gCtx.fill();
    }

    // ==========================================
    // 1. NEURAL MESH PARTICLES DATA
    // ==========================================
    const NUM_NODES = Math.min(48, Math.max(22, Math.floor(width / 26)));
    const nodes = [];
    const FOV = 380;

    for (let i = 0; i < NUM_NODES; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * width * 1.4,
        y: (Math.random() - 0.5) * height * 1.4,
        z: Math.random() * 700 + 120,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        vz: (Math.random() - 0.5) * 0.65,
        size: Math.random() * 2.2 + 1.2,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // ==========================================
    // 2. 3D MATRIX RAIN DATA
    // ==========================================
    const matrixCols = Math.floor(width / 32);
    const matrixDrops = [];
    const chars = "01010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789αβγδεζηθλμξπρστυφχψω";

    for (let i = 0; i < matrixCols; i++) {
      matrixDrops.push({
        x: i * 32,
        y: Math.random() * -height,
        z: Math.random() * 500 + 180,
        speed: Math.random() * 2.5 + 2,
        char: chars[Math.floor(Math.random() * chars.length)],
        length: Math.floor(Math.random() * 8 + 5)
      });
    }

    // ==========================================
    // 3. 3D CYBER HORIZON GRID DATA
    // ==========================================
    let gridOffset = 0;

    // ==========================================
    // MAIN RENDER LOOP (SILKY SMOOTH 60 FPS)
    // ==========================================
    let frame = 0;

    const render = () => {
      frame++;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const rotY = mouseRef.current.x * 0.28;
      const rotX = -mouseRef.current.y * 0.2;

      ctx.clearRect(0, 0, width, height);

      // --- SHOCKWAVE UPDATES (LIGHTWEIGHT) ---
      if (shockwavesRef.current.length > 0) {
        shockwavesRef.current = shockwavesRef.current.filter(sw => sw.radius < sw.maxRadius && sw.opacity > 0.02);
        shockwavesRef.current.forEach(sw => {
          sw.radius += 14;
          sw.opacity *= 0.92;
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(34, 197, 94, ${sw.opacity * 0.35})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });
      }

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
          n.pulsePhase += 0.035;

          // Bounding box bounce
          if (Math.abs(n.x) > width * 0.75) n.vx *= -1;
          if (Math.abs(n.y) > height * 0.75) n.vy *= -1;
          if (n.z < 100 || n.z > 850) n.vz *= -1;

          // 3D Rotation Y
          const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
          let x1 = n.x * cosY + n.z * sinY;
          let z1 = -n.x * sinY + n.z * cosY;

          // 3D Rotation X
          const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
          let y2 = n.y * cosX - z1 * sinX;
          let z2 = n.y * sinX + z1 * cosX;

          if (z2 <= 20) continue;

          // 3D Perspective Projection
          const scale = FOV / z2;
          const sx = width / 2 + x1 * scale;
          const sy = height / 2 + y2 * scale;
          const alpha = Math.min(1, Math.max(0.12, (900 - z2) / 780));

          projected.push({ sx, sy, z: z2, scale, alpha, pulse: Math.sin(n.pulsePhase), size: n.size });
        }

        // BATCHED Axon Line Drawing (High Performance)
        const maxDist = 125;
        const maxDistSq = maxDist * maxDist;
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.18)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        for (let i = 0; i < projected.length; i++) {
          const p1 = projected[i];
          for (let j = i + 1; j < projected.length; j++) {
            const p2 = projected[j];
            const dx = p1.sx - p2.sx;
            const dy = p1.sy - p2.sy;
            const distSq = dx * dx + dy * dy;
            if (distSq < maxDistSq) {
              ctx.moveTo(p1.sx, p1.sy);
              ctx.lineTo(p2.sx, p2.sy);
            }
          }
        }
        ctx.stroke();

        // FAST Draw Neural Nodes using Precomputed Glow Canvas
        for (let i = 0; i < projected.length; i++) {
          const p = projected[i];
          const nodeRadius = Math.max(1, p.size * p.scale * (1 + p.pulse * 0.25));
          const drawSize = nodeRadius * 6;

          ctx.globalAlpha = p.alpha;
          ctx.drawImage(glowCanvas, p.sx - drawSize / 2, p.sy - drawSize / 2, drawSize, drawSize);

          // Solid core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, Math.max(0.8, nodeRadius * 0.55), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;
      }

      // ------------------------------------------
      // MODE B: 3D CYBER HORIZON WAVE GRID
      // ------------------------------------------
      else if (mode === 'grid') {
        gridOffset = (gridOffset + 1.2) % 40;
        const horizonY = height * 0.48 + mouseRef.current.y * 35;
        const vpX = width / 2 + mouseRef.current.x * 100;
        const vpY = horizonY;

        // Perspective longitudinal lines
        const numLong = 22;
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.16)';
        ctx.beginPath();
        for (let i = -numLong / 2; i <= numLong / 2; i++) {
          const bottomX = width / 2 + i * (width / (numLong * 0.75));
          ctx.moveTo(vpX, vpY);
          ctx.lineTo(bottomX, height);
        }
        ctx.stroke();

        // Horizontal perspective lines with wave undulation
        const numLat = 18;
        ctx.beginPath();
        for (let j = 0; j < numLat; j++) {
          const t = (j * 40 + gridOffset) / (numLat * 40);
          const py = vpY + Math.pow(t, 2.2) * (height - vpY);
          const waveAmp = Math.sin(frame * 0.04 + j * 0.3) * 5 * t;

          ctx.moveTo(0, py + waveAmp);
          ctx.lineTo(width, py + waveAmp);
        }
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.24)';
        ctx.stroke();
      }

      // ------------------------------------------
      // MODE C: 3D MATRIX VOLUMETRIC RAIN
      // ------------------------------------------
      else if (mode === 'matrix') {
        ctx.font = '10px monospace';

        matrixDrops.forEach(d => {
          d.y += d.speed;
          if (d.y > height + 80) {
            d.y = -80;
            d.char = chars[Math.floor(Math.random() * chars.length)];
          }

          const z = d.z;
          const scale = FOV / z;
          const sx = width / 2 + (d.x - width / 2) * scale + mouseRef.current.x * 25;
          const sy = d.y * scale + mouseRef.current.y * 25;
          const alpha = Math.min(1, Math.max(0.12, (750 - z) / 650));

          // Draw head glyph
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fillText(d.char, sx, sy);

          // Draw trailing glyphs
          for (let k = 1; k < d.length; k++) {
            const trailY = sy - k * (13 * scale);
            if (trailY > 0 && trailY < height) {
              const trailAlpha = alpha * (1 - k / d.length) * 0.65;
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

export default React.memo(ThreeDBackground);

