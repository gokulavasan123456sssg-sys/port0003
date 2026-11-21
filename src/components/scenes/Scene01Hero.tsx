import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ArrowRight, Play } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Scene01Hero: React.FC = () => {
  const { settings } = usePortfolio();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Cinematic staged reveal
  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Ambient floating red ember particles in canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.45 + 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.7 + 0.2,
      flickerSpeed: Math.random() * 0.03 + 0.01,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * p.flickerSpeed) * 0.01;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(229, 9, 20, ${Math.max(0.1, Math.min(0.85, p.opacity))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 60, 0, 0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#050505]">
      {/* 1. Background Canvas Embers */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 2. Red Rim Lighting & Radial Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cinema-red/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cinema-orange/20 rounded-full blur-[90px] pointer-events-none z-0" />

      {/* 3. Subtle floor reflection grid */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center pt-24 pb-16">
        {/* Intro sequence badge */}
        <div
          className={`transition-all duration-1000 transform ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-400 text-xs font-mono tracking-[0.25em] uppercase mb-8 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cinema-red animate-ping" />
            <span>SCENE 01 — THE OPENING REVEAL</span>
          </div>
        </div>

        {/* Silhouette / Portrait with Red Rim Lighting */}
        <div
          className={`relative mb-8 transition-all duration-1000 delay-300 transform ${
            revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Red rim glow ring */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cinema-red via-cinema-orange to-transparent blur-md opacity-75 group-hover:opacity-100 transition duration-1000" />
          
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-cinema-red/80 shadow-[0_0_40px_rgba(229,9,20,0.4)] bg-neutral-950">
            <img
              src={settings.hero_portrait_url || '/assets/gokul/gokul@0.75x.jpg'}
              alt="GOKULAVASAN — Visual Storyteller"
              className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-95 hover:grayscale-0 transition-all duration-700"
            />
            {/* Subtle cinematic red rim overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-cinema-red/20 pointer-events-none" />
          </div>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-black/90 border border-cinema-red/60 text-[10px] font-mono tracking-widest text-neutral-300 shadow-lg">
            DIRECTOR
          </div>
        </div>

        {/* GOKULAVASAN Dramatic Wordmark Typography */}
        <div
          className={`transition-all duration-1000 delay-500 transform ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.12em] uppercase font-bold text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] select-none">
            GOKULAVASAN
          </h1>
        </div>

        {/* Visual Storyteller Subtitle */}
        <div
          className={`transition-all duration-1000 delay-700 transform ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="font-heading text-lg sm:text-2xl md:text-3xl tracking-[0.3em] uppercase text-neutral-200 mt-2 mb-4 font-light">
            VISUAL STORYTELLER
          </p>

          {/* Professional Title Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-2xl text-xs sm:text-sm font-mono tracking-widest text-neutral-400 mb-10">
            <span className="text-cinema-red font-semibold">VIDEO EDITOR</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-300">CINEMATOGRAPHER</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-300">PHOTOGRAPHER</span>
            <span className="text-neutral-600">/</span>
            <span className="text-cinema-orange font-semibold">VFX ARTIST</span>
          </div>
        </div>

        {/* Call to Actions (CTAs) */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transition-all duration-1000 delay-900 transform ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href="#gallery"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cinema-red hover:bg-red-700 text-white font-mono text-xs uppercase tracking-[0.25em] font-bold shadow-[0_0_25px_rgba(229,9,20,0.5)] hover:shadow-[0_0_40px_rgba(229,9,20,0.8)] transition-all duration-300 hover:scale-105"
          >
            <span>EXPLORE MY WORK</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-[0.25em] border border-neutral-800 hover:border-neutral-600 transition-all duration-300 hover:scale-105"
          >
            <span>CONTACT ME</span>
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-neutral-500 transition-all duration-1000 delay-1000 transform ${
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">SCROLL TO ENTER</span>
        <div className="w-5 h-9 rounded-full border border-neutral-700 flex justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-cinema-red animate-bounce" />
        </div>
      </div>
    </section>
  );
};
