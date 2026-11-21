import React, { useState, useEffect } from 'react';
import { X, Upload, Film, Image as ImageIcon, Save, Sparkles, Check } from 'lucide-react';
import { Project, Category } from '../../types';

interface ProjectEditorModalProps {
  project: Project | null; // null if creating new project
  categories: Category[];
  onClose: () => void;
  onSave: (projectData: Omit<Project, 'id' | 'created_at'>) => Promise<void>;
}

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  project,
  categories,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'wedding',
    cover_url: '',
    video_url: '',
    video_preview_url: '',
    date: new Date().getFullYear().toString(),
    software: 'Adobe Premiere Pro, DaVinci Resolve',
    client_label: 'Client Project',
    featured: false,
    published: true,
    order_index: 0,
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category,
        cover_url: project.cover_url,
        video_url: project.video_url || '',
        video_preview_url: project.video_preview_url || '',
        date: project.date || '',
        software: project.software ? project.software.join(', ') : '',
        client_label: project.client_label || 'Client Project',
        featured: project.featured,
        published: project.published,
        order_index: project.order_index,
      });
    }
  }, [project]);

  // Handle local image file upload preview
  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData((prev) => ({ ...prev, cover_url: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle local video file upload preview
  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, video_url: url, video_preview_url: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.cover_url.trim()) {
      alert('Please provide project title and a cover image thumbnail.');
      return;
    }

    setIsSaving(true);
    try {
      const softwareArray = formData.software
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await onSave({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        cover_url: formData.cover_url,
        video_url: formData.video_url,
        video_preview_url: formData.video_preview_url || formData.video_url,
        date: formData.date,
        software: softwareArray,
        client_label: formData.client_label,
        featured: formData.featured,
        published: formData.published,
        order_index: formData.order_index,
      });

      onClose();
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Failed to save project. Please verify inputs.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0c0c12] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-neutral-800/80 mb-6">
          <div>
            <h3 className="font-heading text-2xl uppercase tracking-wider text-white font-bold">
              {project ? 'EDIT PROJECT' : 'CREATE NEW PROJECT'}
            </h3>
            <p className="text-xs font-mono text-neutral-400 mt-0.5">
              DYNAMIC PORTFOLIO CONTENT MANAGEMENT
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Project Title */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                PROJECT TITLE *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. ETERNAL VOWS — WEDDING FILM"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-cinema-red"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                CATEGORY *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-cinema-red cursor-pointer"
              >
                {categories.filter((c) => c.slug !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
              PROJECT STORY & DESCRIPTION *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe camera gear, lighting style, color grading intent, rhythm cuts, or narrative meaning..."
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-cinema-red resize-none"
            />
          </div>

          {/* Media Links & Uploads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80">
            {/* Cover Image / Thumbnail */}
            <div className="space-y-3">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-cinema-red font-semibold">
                COVER IMAGE / THUMBNAIL (JPG, PNG, WEBP) *
              </label>
              <input
                type="text"
                value={formData.cover_url}
                onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                placeholder="URL or select local file below"
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cinema-red"
              />
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-200 cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>UPLOAD LOCAL IMAGE</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverFileUpload}
                  className="hidden"
                />
              </label>

              {formData.cover_url && (
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-neutral-800 bg-black mt-2">
                  <img
                    src={formData.cover_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Video File / URL */}
            <div className="space-y-3">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-cinema-orange font-semibold">
                VIDEO URL OR LOCAL FILE (MP4, YOUTUBE, VIMEO)
              </label>
              <input
                type="text"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                placeholder="https://youtube.com/watch?v=... or /assets/video.mp4"
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cinema-red"
              />
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-200 cursor-pointer">
                <Film className="w-3.5 h-3.5" />
                <span>SELECT LOCAL VIDEO FILE</span>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={handleVideoFileUpload}
                  className="hidden"
                />
              </label>

              {formData.video_url && (
                <p className="text-[10px] font-mono text-green-400">
                  Video source attached: {formData.video_url.slice(0, 45)}...
                </p>
              )}
            </div>
          </div>

          {/* Software & Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                SOFTWARE / GEAR (COMMA-SEPARATED)
              </label>
              <input
                type="text"
                value={formData.software}
                onChange={(e) => setFormData({ ...formData, software: e.target.value })}
                placeholder="Premiere, DaVinci, Sony FX3"
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cinema-red"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                CLIENT / PERSONAL LABEL
              </label>
              <input
                type="text"
                value={formData.client_label}
                onChange={(e) => setFormData({ ...formData, client_label: e.target.value })}
                placeholder="Wedding Client / Showreel"
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cinema-red"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                PRODUCTION YEAR
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="2025 / 2026"
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cinema-red"
              />
            </div>
          </div>

          {/* Toggles: Featured & Published */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded text-cinema-red focus:ring-0 bg-neutral-900 border-neutral-700"
              />
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                MARK AS FEATURED PROJECT
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 rounded text-cinema-red focus:ring-0 bg-neutral-900 border-neutral-700"
              />
              <span className="text-xs font-mono uppercase tracking-wider text-green-400 font-semibold">
                PUBLISHED (VISIBLE TO PUBLIC)
              </span>
            </label>
          </div>

          {/* Submit button */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-400 hover:text-white"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cinema-red hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(229,9,20,0.5)] transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'SAVING...' : 'SAVE PROJECT'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
