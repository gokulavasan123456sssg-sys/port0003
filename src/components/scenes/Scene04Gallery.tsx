import React, { useState } from 'react';
import { Play, Eye, Film, Sparkles, Filter, ChevronRight, Layers } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types';
import { ProjectModal } from './ProjectModal';

export const Scene04Gallery: React.FC = () => {
  const { projects, categories, selectedCategory, setSelectedCategory } = usePortfolio();
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Filter published projects only for public visitors
  const publishedProjects = projects.filter((p) => p.published);

  const filteredProjects = selectedCategory === 'all'
    ? publishedProjects
    : publishedProjects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  // Navigation inside modal
  const handleNextProject = () => {
    if (!activeModalProject) return;
    const currentIndex = filteredProjects.findIndex((p) => p.id === activeModalProject.id);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setActiveModalProject(filteredProjects[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!activeModalProject) return;
    const currentIndex = filteredProjects.findIndex((p) => p.id === activeModalProject.id);
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setActiveModalProject(filteredProjects[prevIndex]);
  };

  return (
    <section id="gallery" className="relative min-h-screen w-full bg-[#050505] py-28 px-4 sm:px-6 lg:px-8 select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cinema-red/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono tracking-[0.25em] text-cinema-red uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cinema-red animate-ping" />
            <span>SCENE 04</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl tracking-wide uppercase font-bold text-white mb-4">
            PROJECT GALLERY
          </h2>
          <p className="text-neutral-400 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Curated cinematic portfolio across wedding films, rhythmic commercial editing, cinematography, fine art photography, and visual effects.
          </p>
        </div>

        {/* Category Filter Navigation Bar */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-14 gap-2 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.slug.toLowerCase();
            const count = cat.slug === 'all'
              ? publishedProjects.length
              : publishedProjects.filter((p) => p.category.toLowerCase() === cat.slug.toLowerCase()).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-cinema-red border-cinema-red text-white shadow-[0_0_20px_rgba(229,9,20,0.5)] font-semibold'
                    : 'bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/30 text-white' : 'bg-neutral-900 text-neutral-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-neutral-800 rounded-3xl max-w-md mx-auto">
            <Film className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <p className="text-neutral-400 font-mono text-sm">No projects currently published in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const isHovered = hoveredProjectId === project.id;
              const hasVideo = Boolean(project.video_preview_url || project.video_url);

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  onClick={() => setActiveModalProject(project)}
                  className="group relative cursor-pointer rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-950/70 shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:border-cinema-red/70 hover:shadow-[0_0_35px_rgba(229,9,20,0.3)] transition-all duration-500 flex flex-col"
                >
                  {/* Media container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    {/* Cover image */}
                    <img
                      src={project.cover_url}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isHovered && hasVideo ? 'opacity-0 scale-105' : 'opacity-85 group-hover:scale-105 group-hover:opacity-100'
                      }`}
                      loading="lazy"
                    />

                    {/* Video preview on hover */}
                    {hasVideo && isHovered && (
                      <video
                        src={project.video_preview_url || project.video_url}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

                    {/* Category pill & Featured badge */}
                    <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-neutral-800 text-[10px] font-mono tracking-wider uppercase text-cinema-red">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-cinema-red/90 text-white text-[10px] font-mono tracking-wider uppercase font-bold shadow-md">
                          <Sparkles className="w-2.5 h-2.5" />
                          FEATURED
                        </span>
                      )}
                    </div>

                    {/* Play / View icon indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-cinema-red/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(229,9,20,0.8)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        {hasVideo ? <Play className="w-6 h-6 fill-white translate-x-0.5" /> : <Eye className="w-6 h-6" />}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1.5">
                        <span>{project.client_label || 'Portfolio'}</span>
                        {project.date && <span>{project.date}</span>}
                      </div>

                      <h3 className="font-heading text-xl font-bold tracking-wide uppercase text-white group-hover:text-cinema-red transition-colors line-clamp-1">
                        {project.title}
                      </h3>

                      <p className="text-neutral-400 font-sans text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Software tags */}
                    {project.software && project.software.length > 0 && (
                      <div className="pt-3 border-t border-neutral-900 flex flex-wrap gap-1.5">
                        {project.software.slice(0, 3).map((sw) => (
                          <span
                            key={sw}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800/80 text-neutral-300"
                          >
                            {sw}
                          </span>
                        ))}
                        {project.software.length > 3 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400">
                            +{project.software.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Player */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
        />
      </div>
    </section>
  );
};
