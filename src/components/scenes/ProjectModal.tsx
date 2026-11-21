import React, { useEffect, useRef } from 'react';
import { X, Play, Calendar, Tag, Layers, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onNext, onPrev }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!project) return null;

  const isEmbedVideo = project.video_url?.includes('youtube.com') ||
    project.video_url?.includes('youtu.be') ||
    project.video_url?.includes('vimeo.com');

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('vimeo.com/')) {
      const id = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#09090c] border border-neutral-800 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close button & nav */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-800/80 bg-neutral-950/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cinema-red animate-ping" />
            <span className="text-xs font-mono tracking-widest uppercase text-cinema-red font-semibold">
              {project.category} · {project.client_label || 'Portfolio Piece'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onPrev && (
              <button
                onClick={onPrev}
                className="p-2 rounded-lg border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white transition-colors"
                title="Previous Project (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                className="p-2 rounded-lg border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white transition-colors"
                title="Next Project (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Player Showcase */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {project.video_url ? (
            isEmbedVideo ? (
              <iframe
                src={getEmbedUrl(project.video_url)}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                ref={videoRef}
                src={project.video_url}
                controls
                autoPlay
                playsInline
                poster={project.cover_url}
                className="w-full h-full object-contain"
              />
            )
          ) : (
            <img
              src={project.cover_url}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Project Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-wide uppercase text-white">
                {project.title}
              </h2>
              {project.date && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-cinema-red" />
                  <span>PRODUCTION YEAR {project.date}</span>
                </div>
              )}
            </div>

            {project.client_label && (
              <span className="self-start px-3.5 py-1.5 rounded-full border border-cinema-red/40 bg-red-950/30 text-cinema-red text-xs font-mono uppercase tracking-widest">
                {project.client_label}
              </span>
            )}
          </div>

          <p className="text-neutral-300 font-sans text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>

          {/* Software & Tools Stack */}
          {project.software && project.software.length > 0 && (
            <div className="pt-4 border-t border-neutral-800/80">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
                SOFTWARE & GEAR STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {project.software.map((sw) => (
                  <span
                    key={sw}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200"
                  >
                    <Layers className="w-3 h-3 text-cinema-red" />
                    {sw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
