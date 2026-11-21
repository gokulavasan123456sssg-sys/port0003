import React, { useState } from 'react';
import { Calendar, GraduationCap, Briefcase, Award, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Scene03Timeline: React.FC = () => {
  const { timeline } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(timeline.length > 0 ? timeline.length - 1 : 0);

  if (!timeline || timeline.length === 0) return null;

  const currentEvent = timeline[activeIndex] || timeline[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev < timeline.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : timeline.length - 1));
  };

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('education')) {
      return <GraduationCap className="w-5 h-5 text-amber-500" />;
    }
    if (category.toLowerCase().includes('freelance') || category.toLowerCase().includes('wedding')) {
      return <Briefcase className="w-5 h-5 text-cinema-red" />;
    }
    return <Award className="w-5 h-5 text-cinema-orange" />;
  };

  return (
    <section id="timeline" className="relative min-h-screen w-full bg-[#050505] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* Background radial spotlight beam focused on active node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cinema-red/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono tracking-[0.25em] text-cinema-red uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cinema-red animate-ping" />
            <span>SCENE 03</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl tracking-wide uppercase font-bold text-white mb-4">
            A JOURNEY THROUGH TIME
          </h2>
          <p className="text-neutral-400 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            From rigorous engineering problem-solving to high-stakes wedding productions, commercial edits, and creative visual effects.
          </p>
        </div>

        {/* Luminous Interactive Year Rail */}
        <div className="relative max-w-4xl mx-auto mb-16 px-4">
          {/* Rail line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-[2px] bg-neutral-800 z-0">
            {/* Active progress fill */}
            <div
              className="h-full bg-gradient-to-r from-neutral-800 via-cinema-red to-cinema-orange transition-all duration-500"
              style={{
                width: `${(activeIndex / (timeline.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Year Node Buttons */}
          <div className="relative z-10 flex items-center justify-between">
            {timeline.map((event, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={event.id}
                  onClick={() => setActiveIndex(idx)}
                  className="group flex flex-col items-center focus:outline-none cursor-pointer"
                >
                  {/* Indicator Dot */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-black border-cinema-red shadow-[0_0_25px_rgba(229,9,20,0.8)] scale-110'
                        : 'bg-neutral-950 border-neutral-700 hover:border-neutral-500 scale-95'
                    }`}
                  >
                    <span
                      className={`text-xs font-mono font-bold transition-colors ${
                        isActive ? 'text-cinema-red' : 'text-neutral-400 group-hover:text-white'
                      }`}
                    >
                      {event.year}
                    </span>
                  </div>

                  {/* Active beam pointer */}
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-cinema-red mt-2 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Focused Milestone Stage Card */}
        <div className="max-w-3xl mx-auto relative">
          <div className="relative rounded-3xl border border-neutral-800/90 bg-neutral-950/80 backdrop-blur-xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* Ambient edge glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cinema-red/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-neutral-900">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-inner">
                  {getCategoryIcon(currentEvent.category)}
                </div>
                <div>
                  <span className="text-xs font-mono tracking-widest text-cinema-red uppercase font-semibold">
                    {currentEvent.category}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="text-sm font-mono text-neutral-400">
                      YEAR {currentEvent.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer"
                  title="Previous Milestone"
                  aria-label="Previous Milestone"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-neutral-500 px-2">
                  {activeIndex + 1} / {timeline.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer"
                  title="Next Milestone"
                  aria-label="Next Milestone"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Event Body */}
            <div className="relative z-10 pt-8 space-y-4">
              <h3 className="font-heading text-2xl sm:text-4xl font-bold tracking-wide uppercase text-white">
                {currentEvent.title}
              </h3>

              <p className="font-mono text-sm sm:text-base text-cinema-orange font-medium">
                {currentEvent.subtitle}
              </p>

              <p className="text-neutral-300 font-sans text-sm sm:text-base leading-relaxed pt-2">
                {currentEvent.description}
              </p>
            </div>
          </div>
        </div>

        {/* Note indicator */}
        <p className="text-center text-xs font-mono text-neutral-500 tracking-[0.2em] uppercase mt-12">
          EXPLORE CHRONOLOGICAL EVOLUTION · FULLY MANAGEABLE VIA ADMIN DASHBOARD
        </p>
      </div>
    </section>
  );
};
