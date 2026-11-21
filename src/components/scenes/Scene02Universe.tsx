import React, { useRef, useState, useEffect } from 'react';
import { Film, Video, Camera, Sparkles, Box, Clapperboard, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface UniverseNode {
  title: string;
  subtitle: string;
  categorySlug: string;
  icon: React.ReactNode;
  tags: string[];
  depth: number; // depth offset for parallax
  color: string;
  previewImg: string;
}

export const Scene02Universe: React.FC = () => {
  const { setSelectedCategory } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const universeNodes: UniverseNode[] = [
    {
      title: 'VIDEO EDITING',
      subtitle: 'Rhythm, Pacing & Pacing Cuts',
      categorySlug: 'editing',
      icon: <Film className="w-5 h-5 text-cinema-red" />,
      tags: ['Premiere Pro', 'DaVinci', 'Speed Ramping'],
      depth: 1.2,
      color: '#e50914',
      previewImg: '/assets/gokul/photo-2.jpg',
    },
    {
      title: 'CINEMATOGRAPHY',
      subtitle: 'Lighting, Framing & Camera Dynamics',
      categorySlug: 'cinematography',
      icon: <Video className="w-5 h-5 text-amber-500" />,
      tags: ['Sony Cine EI', 'Anamorphic', 'Chiaroscuro'],
      depth: 1.8,
      color: '#ff8400',
      previewImg: '/assets/gokul/photo-3.jpg',
    },
    {
      title: 'PHOTOGRAPHY',
      subtitle: 'Portraits, Atmosphere & Soul',
      categorySlug: 'photography',
      icon: <Camera className="w-5 h-5 text-red-400" />,
      tags: ['85mm Primes', 'High DR', 'Editorial Tone'],
      depth: 0.9,
      color: '#f87171',
      previewImg: '/assets/gokul/photo-4.jpg',
    },
    {
      title: 'VFX & COMPOSITING',
      subtitle: 'Node-Based CGI Integration',
      categorySlug: 'vfx',
      icon: <Sparkles className="w-5 h-5 text-cinema-orange" />,
      tags: ['Nuke', 'After Effects', 'Rotoscopy'],
      depth: 1.5,
      color: '#ff5500',
      previewImg: '/assets/projects/p01_timeless.png',
    },
    {
      title: '3D DESIGN & LOOKDEV',
      subtitle: 'Hard Surface, Shading & Lights',
      categorySlug: '3d',
      icon: <Box className="w-5 h-5 text-orange-400" />,
      tags: ['Maya', 'Arnold', 'Substance'],
      depth: 1.0,
      color: '#fb923c',
      previewImg: '/assets/projects/p09_space.png',
    },
    {
      title: 'FILMMAKING & WEDDINGS',
      subtitle: 'End-to-End Cinematic Storytelling',
      categorySlug: 'wedding',
      icon: <Clapperboard className="w-5 h-5 text-red-500" />,
      tags: ['Direction', 'Sound Design', 'Color Grade'],
      depth: 1.4,
      color: '#ef4444',
      previewImg: '/assets/gokul/photo-1.jpg',
    },
  ];

  // Mouse move handler for interactive parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Canvas red light trail and cosmic particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D-like particle pool
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.5,
      radius: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    // Orbiting light trail ribbon
    let angle = 0;
    const trailPoints: { x: number; y: number; alpha: number }[] = [];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render ribbon light trail
      angle += 0.015;
      const headX = width / 2 + Math.cos(angle) * (width * 0.35) + Math.sin(angle * 2) * 50;
      const headY = height / 2 + Math.sin(angle * 1.5) * (height * 0.3) + Math.cos(angle * 0.8) * 40;

      trailPoints.push({ x: headX, y: headY, alpha: 1.0 });
      if (trailPoints.length > 55) {
        trailPoints.shift();
      }

      ctx.save();
      for (let i = 1; i < trailPoints.length; i++) {
        const pt = trailPoints[i];
        const prev = trailPoints[i - 1];
        const ageRatio = i / trailPoints.length;

        ctx.strokeStyle = `rgba(229, 9, 20, ${ageRatio * 0.4})`;
        ctx.lineWidth = ageRatio * 4;
        ctx.shadowColor = 'rgba(255, 80, 0, 0.7)';
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
      }
      ctx.restore();

      // Render floating particles with parallax
      particles.forEach((p) => {
        p.x += p.vx + mousePos.x * p.z * -0.3;
        p.y += p.vy + mousePos.y * p.z * -0.3;
        p.phase += 0.02;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = Math.max(0.1, p.alpha + Math.sin(p.phase) * 0.15);

        ctx.fillStyle = `rgba(255, ${Math.floor(60 + p.z * 40)}, 20, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [mousePos]);

  const handleCardClick = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="universe"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#050505] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Background 3D Ribbon & Cosmic Dust Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Ambient Red Lighting Spheres */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cinema-red/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cinema-orange/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono tracking-[0.25em] text-cinema-red uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cinema-red animate-ping" />
            <span>SCENE 02</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl tracking-wide uppercase font-bold text-white mb-4">
            MY CREATIVE UNIVERSE
          </h2>
          <p className="text-neutral-400 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Six interconnected disciplines spanning cinematic camera techniques, narrative editing rhythm, and multi-pass visual effects compositing.
          </p>
        </div>

        {/* 3D Floating Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universeNodes.map((node) => {
            const isHovered = hoveredCard === node.title;
            // Dynamic 3D tilt calculation based on mouse
            const tiltX = mousePos.y * node.depth * -8;
            const tiltY = mousePos.x * node.depth * 8;

            return (
              <div
                key={node.title}
                onMouseEnter={() => setHoveredCard(node.title)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(node.categorySlug)}
                style={{
                  transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${
                    isHovered ? 1.03 : 1
                  })`,
                  transition: isHovered
                    ? 'transform 0.15s ease-out, box-shadow 0.3s ease'
                    : 'transform 0.5s ease-out, box-shadow 0.3s ease',
                }}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border border-neutral-800/90 bg-neutral-950/70 backdrop-blur-md p-6 flex flex-col justify-between h-[340px] shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-cinema-red/60 hover:shadow-[0_0_35px_rgba(229,9,20,0.25)]"
              >
                {/* Background image preview with subtle zoom */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={node.previewImg}
                    alt={node.title}
                    className="w-full h-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
                </div>

                {/* Top Row: Icon & Category Indicator */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800/80 group-hover:border-cinema-red/50 transition-colors">
                    {node.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase flex items-center gap-1 group-hover:text-cinema-red transition-colors">
                    <span>EXPLORE</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                {/* Bottom Row: Title, Subtitle, Tags */}
                <div className="relative z-10 space-y-3">
                  <div>
                    <h3 className="font-heading text-2xl font-bold tracking-wider uppercase text-white group-hover:text-cinema-red transition-colors">
                      {node.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans mt-1">
                      {node.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-900/80">
                    {node.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-900/90 border border-neutral-800/60 text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive hint */}
        <p className="text-center text-xs font-mono text-neutral-500 tracking-[0.2em] uppercase mt-14">
          CLICK ANY SECTOR TO FILTER GALLERY · MOVE CURSOR TO ORBIT 3D SPACE
        </p>
      </div>
    </section>
  );
};
