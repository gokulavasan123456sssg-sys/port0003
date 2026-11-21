import React, { useEffect, useRef } from 'react';

export const FilmGrain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate random noise
    const generateNoise = () => {
      const imgData = ctx.createImageData(width, height);
      const buffer = new Uint32Array(imgData.data.buffer);
      const len = buffer.length;

      for (let i = 0; i < len; i += 2) {
        // Subtle monochrome noise
        if (Math.random() < 0.12) {
          const val = Math.floor(Math.random() * 255);
          // Set RGBA packed: A=20, R=val, G=val, B=val
          buffer[i] = (20 << 24) | (val << 16) | (val << 8) | val;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      animationFrameId = requestAnimationFrame(generateNoise);
    };

    generateNoise();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.045] mix-blend-screen"
      aria-hidden="true"
    />
  );
};
