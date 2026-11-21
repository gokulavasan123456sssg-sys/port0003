import React, { useState } from 'react';
import { Download, GraduationCap, Briefcase, Award, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Scene06About: React.FC = () => {
  const { settings } = usePortfolio();
  const [showResumeModal, setShowResumeModal] = useState(false);

  const skillsList = [
    'Cinematography & Dynamic Framing',
    'Commercial Video Editing & Rhythm Cuts',
    'DaVinci Resolve Color Grading & Film Emulation',
    'VFX Compositing & Multi-pass EXR Integration',
    '3D Modeling & Lighting (Maya / Arnold)',
    'Fine Art Photography & Editorial Retouching',
    'On-Set Production & Sound Design',
    'High Retention YouTube Content Direction',
  ];

  return (
    <section id="about" className="relative min-h-screen w-full bg-[#050505] py-28 px-4 sm:px-6 lg:px-8 select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[700px] h-[500px] bg-cinema-red/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono tracking-[0.25em] text-cinema-red uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cinema-red animate-ping" />
            <span>SCENE 06</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl tracking-wide uppercase font-bold text-white mb-4">
            {settings.about_heading || 'BEHIND EVERY FRAME, THERE IS A STORY.'}
          </h2>
          <p className="text-neutral-400 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            The philosophy, craft, and human dedication that fuels every second of visual storytelling.
          </p>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Portrait & Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative group rounded-3xl overflow-hidden border-2 border-neutral-800 bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
              {/* Red halo spotlight */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-cinema-red/30 to-transparent blur-xl opacity-50 group-hover:opacity-80 transition duration-700" />

              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                <img
                  src={settings.about_portrait_url || settings.hero_portrait_url || '/assets/gokul/gokul@0.75x.jpg'}
                  alt="Gokulavasan Portrait"
                  className="w-full h-full object-cover filter grayscale contrast-115 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono tracking-widest text-cinema-red uppercase font-semibold">
                    CREATIVE IDENTITY
                  </span>
                  <h3 className="font-heading text-2xl font-bold uppercase text-white">
                    GOKULAVASAN
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mt-0.5">
                    VIDEO EDITOR · CINEMATOGRAPHER · VFX ARTIST
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-center">
                <span className="font-heading text-3xl font-bold text-cinema-red block">
                  {settings.experience_years || '2+'}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  YEARS FREELANCE
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-center">
                <span className="font-heading text-3xl font-bold text-white block">
                  {settings.projects_count || '50+'}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  PROJECTS DELIVERED
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-center">
                <span className="font-heading text-3xl font-bold text-cinema-orange block">
                  {settings.views_count || '150K+'}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  AUDIENCE REACH
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Skills, Education, Resume (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Biography */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-cinema-red font-semibold">
                PROFESSIONAL INTRODUCTION
              </h3>
              <p className="text-neutral-200 font-sans text-base sm:text-lg leading-relaxed font-light">
                {settings.about_text}
              </p>
            </div>

            {/* Core Skills Checklist */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-4">
                CORE DISCIPLINES & CAPABILITIES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillsList.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs font-sans text-neutral-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cinema-red flex-shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Track Record */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-4">
                ACADEMIC & TECHNICAL FOUNDATION
              </h4>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex items-start gap-3.5">
                  <GraduationCap className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-heading text-sm font-bold text-white uppercase">
                      Bachelor of Engineering – Cyber Security
                    </h5>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      SRM Valliammai Engineering College
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex items-start gap-3.5">
                  <GraduationCap className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-heading text-sm font-bold text-white uppercase">
                      Diploma in Engineering
                    </h5>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      Sri Ramakrishna Polytechnic College
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex items-start gap-3.5">
                  <GraduationCap className="w-5 h-5 text-neutral-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-heading text-sm font-bold text-white uppercase">
                      SSLC Higher Secondary
                    </h5>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      Vetri Vikaas Higher Secondary School
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Button */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setShowResumeModal(true)}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-900 border border-cinema-red/50 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-[0.25em] font-bold shadow-[0_0_20px_rgba(229,9,20,0.3)] hover:shadow-[0_0_30px_rgba(229,9,20,0.6)] transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4 text-cinema-red" />
                <span>PREVIEW RESUME</span>
              </button>

              <a
                href={settings.resume_url || '/assets/gokul/gokulavasan-resume.jpg'}
                download="GOKULAVASAN_RESUME.jpg"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cinema-red hover:bg-red-700 text-white font-mono text-xs uppercase tracking-[0.25em] font-bold shadow-[0_0_25px_rgba(229,9,20,0.5)] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Preview Modal */}
      {showResumeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl overflow-y-auto"
          onClick={() => setShowResumeModal(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0d0d12] border border-neutral-800 rounded-3xl p-6 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cinema-red" />
                <span className="font-heading text-lg uppercase text-white font-bold">
                  GOKULAVASAN — CURRICULUM VITAE
                </span>
              </div>
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-3 py-1 rounded-lg border border-neutral-800 text-xs font-mono text-neutral-400 hover:text-white"
              >
                CLOSE [ESC]
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto rounded-xl border border-neutral-800 bg-black flex justify-center">
              <img
                src={settings.resume_url || '/assets/gokul/gokulavasan-resume.jpg'}
                alt="Resume"
                className="max-w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
