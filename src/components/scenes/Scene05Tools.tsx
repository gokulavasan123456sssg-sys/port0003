import React, { useState } from 'react';
import { Film, Video, Camera, Sparkles, Sliders, Box, Layers, Aperture, SunMedium, Compass } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Scene05Tools: React.FC = () => {
  const { tools } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'all' | 'editing' | '3d_vfx' | 'production'>('all');

  const filteredTools = activeTab === 'all'
    ? tools
    : tools.filter((t) => t.category === activeTab);

  const getToolIcon = (iconName?: string) => {
    switch (iconName) {
      case 'premiere':
        return <Film className="w-6 h-6 text-purple-400" />;
      case 'resolve':
        return <Sliders className="w-6 h-6 text-cinema-red" />;
      case 'aftereffects':
        return <Sparkles className="w-6 h-6 text-indigo-400" />;
      case 'maya':
        return <Box className="w-6 h-6 text-teal-400" />;
      case 'nuke':
        return <Layers className="w-6 h-6 text-yellow-400" />;
      case 'camera':
        return <Video className="w-6 h-6 text-cinema-orange" />;
      case 'aperture':
        return <Aperture className="w-6 h-6 text-amber-400" />;
      case 'film':
        return <Compass className="w-6 h-6 text-red-500" />;
      default:
        return <Camera className="w-6 h-6 text-cinema-red" />;
    }
  };

  return (
    <section id="tools" className="relative min-h-screen w-full bg-[#050505] py-28 px-4 sm:px-6 lg:px-8 select-none">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[500px] bg-cinema-orange/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono tracking-[0.25em] text-cinema-red uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cinema-red animate-ping" />
            <span>SCENE 05</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl tracking-wide uppercase font-bold text-white mb-4">
            MY CREATIVE ARSENAL
          </h2>
          <p className="text-neutral-400 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Hardware rigs and industry-grade software calibrated for high-throughput post-production, precision color timing, and 3D compositing.
          </p>

          {/* Sub-tabs */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'ALL GEAR & TOOLS' },
              { id: 'editing', label: 'POST-PRODUCTION' },
              { id: '3d_vfx', label: '3D & VFX' },
              { id: 'production', label: 'ON-SET CINEMATOGRAPHY' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as unknown as 'all')}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-neutral-800 border-cinema-red text-white shadow-[0_0_15px_rgba(229,9,20,0.3)]'
                    : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="group relative rounded-2xl border border-neutral-800/80 bg-neutral-950/70 p-6 shadow-[0_10px_25px_rgba(0,0,0,0.8)] hover:border-cinema-red/60 hover:shadow-[0_0_30px_rgba(229,9,20,0.25)] transition-all duration-300 flex flex-col justify-between h-[230px]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800/80 group-hover:scale-110 transition-transform duration-300">
                    {getToolIcon(tool.icon_name)}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-cinema-red px-2.5 py-0.5 rounded-full bg-red-950/30 border border-cinema-red/30 uppercase">
                    {tool.level}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold tracking-wide uppercase text-white group-hover:text-cinema-red transition-colors">
                  {tool.name}
                </h3>

                <p className="text-xs text-neutral-400 font-sans mt-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Progress bar line */}
              <div className="pt-4 border-t border-neutral-900/80 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                <span>MASTERY LEVEL</span>
                <span className="text-neutral-300">100% PRODUCTION READY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
