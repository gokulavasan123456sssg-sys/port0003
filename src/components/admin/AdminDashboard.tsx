import React, { useState } from 'react';
import {
  Film,
  Image as ImageIcon,
  Video,
  Layers,
  Calendar,
  MessageSquare,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  LogOut,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Database,
  ArrowLeft,
  HelpCircle,
  Save,
  Upload,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, TimelineEvent } from '../../types';
import { ProjectEditorModal } from './ProjectEditorModal';
import { MediaLibraryModal } from './MediaLibraryModal';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const { logout, isSupabaseConnected } = useAuth();
  const {
    projects,
    categories,
    timeline,
    media,
    settings,
    messages,
    addProject,
    updateProject,
    deleteProject,
    addTimelineEvent,
    updateTimelineEvent,
    deleteTimelineEvent,
    updateSettings,
    markMessageStatus,
    deleteMessage,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'media' | 'timeline' | 'messages' | 'settings'>('overview');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showSupabaseGuide, setShowSupabaseGuide] = useState(false);

  // Settings form local state
  const [localSettings, setLocalSettings] = useState(settings);
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);

  // Stats calculation
  const totalProjects = projects.length;
  const totalPhotos = media.filter((m) => m.type === 'image').length;
  const totalVideos = media.filter((m) => m.type === 'video').length;
  const unreadMessages = messages.filter((m) => m.status === 'new').length;

  const handleCreateProject = () => {
    setEditingProject(null);
    setShowProjectModal(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const handleSaveProject = async (data: Omit<Project, 'id' | 'created_at'>) => {
    if (editingProject) {
      await updateProject(editingProject.id, data);
    } else {
      await addProject(data);
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(localSettings);
    setSavedSettingsSuccess(true);
    setTimeout(() => setSavedSettingsSuccess(false), 3000);
  };

  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'hero_portrait_url' | 'about_portrait_url') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setLocalSettings((prev) => ({ ...prev, [field]: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col select-none">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#09090e]/95 backdrop-blur-md border-b border-neutral-800 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cinema-red shadow-[0_0_10px_#e50914]" />
          <span className="font-display tracking-[0.2em] text-lg font-bold">
            GOKULAVASAN CONSOLE
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
            ADMIN v1.0
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Supabase status badge */}
          <button
            onClick={() => setShowSupabaseGuide(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/80 hover:border-neutral-700 text-xs font-mono transition-all"
            title="Supabase Connection Guide"
          >
            <Database className="w-3.5 h-3.5 text-cinema-red" />
            <span className="hidden sm:inline text-neutral-300">
              {isSupabaseConnected ? 'Supabase Connected' : 'Local Storage Mode'}
            </span>
            <HelpCircle className="w-3 h-3 text-neutral-500" />
          </button>

          {/* View Live Portfolio */}
          <button
            onClick={onBackToSite}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-cinema-orange" />
            <span className="hidden sm:inline">VIEW SITE</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 hover:bg-red-900/60 text-xs font-mono text-cinema-red border border-cinema-red/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Main Admin Shell */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 bg-[#08080c] border-b md:border-b-0 md:border-r border-neutral-800 p-4 space-y-1.5 flex-shrink-0">
          {[
            { id: 'overview', label: 'DASHBOARD', icon: <Layers className="w-4 h-4" /> },
            { id: 'projects', label: 'PROJECTS MANAGER', icon: <Film className="w-4 h-4" /> },
            { id: 'media', label: 'MEDIA LIBRARY', icon: <ImageIcon className="w-4 h-4" /> },
            { id: 'timeline', label: 'JOURNEY / TIMELINE', icon: <Calendar className="w-4 h-4" /> },
            {
              id: 'messages',
              label: 'INBOX INQUIRIES',
              icon: <MessageSquare className="w-4 h-4" />,
              badge: unreadMessages > 0 ? unreadMessages : undefined,
            },
            { id: 'settings', label: 'SITE SETTINGS', icon: <Settings className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as unknown as 'overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-cinema-red text-white font-bold shadow-[0_0_15px_rgba(229,9,20,0.35)]'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
              {tab.badge && (
                <span className="px-1.5 py-0.2 rounded-full bg-white text-black text-[10px] font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </aside>

        {/* Content View */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h1 className="font-heading text-3xl font-bold uppercase text-white">
                  CREATIVE METRICS OVERVIEW
                </h1>
                <p className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                  REAL-TIME PORTFOLIO STATS & CONTENT HEALTH
                </p>
              </div>

              {/* Stats Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center justify-between text-neutral-400 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest">TOTAL PROJECTS</span>
                    <Film className="w-4 h-4 text-cinema-red" />
                  </div>
                  <span className="font-heading text-4xl font-bold text-white">{totalProjects}</span>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center justify-between text-neutral-400 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest">PHOTOS IN ASSETS</span>
                    <ImageIcon className="w-4 h-4 text-cinema-orange" />
                  </div>
                  <span className="font-heading text-4xl font-bold text-white">{totalPhotos}</span>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center justify-between text-neutral-400 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest">VIDEOS AVAILABLE</span>
                    <Video className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="font-heading text-4xl font-bold text-white">{totalVideos}</span>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center justify-between text-neutral-400 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest">INBOX INQUIRIES</span>
                    <MessageSquare className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="font-heading text-4xl font-bold text-white">{messages.length}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
                <h3 className="font-heading text-lg uppercase tracking-wide text-white">
                  QUICK MANAGEMENT SHORTCUTS
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleCreateProject}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cinema-red hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-bold shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD NEW PROJECT</span>
                  </button>

                  <button
                    onClick={() => setShowMediaModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-widest cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4 text-cinema-red" />
                    <span>OPEN MEDIA LIBRARY</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-widest cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-neutral-400" />
                    <span>EDIT PROFILE SETTINGS</span>
                  </button>
                </div>
              </div>

              {/* Recent Projects Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl uppercase tracking-wider text-white">
                    RECENT PROJECTS
                  </h3>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="text-xs font-mono text-cinema-red hover:underline"
                  >
                    VIEW ALL PROJECTS →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {projects.slice(0, 3).map((proj) => (
                    <div
                      key={proj.id}
                      className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden flex flex-col"
                    >
                      <div className="aspect-video w-full bg-black overflow-hidden relative">
                        <img
                          src={proj.cover_url}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-cinema-red uppercase">
                          {proj.category}
                        </span>
                      </div>
                      <div className="p-3">
                        <h4 className="font-heading text-sm font-bold uppercase truncate text-white">
                          {proj.title}
                        </h4>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-900 text-[10px] font-mono text-neutral-400">
                          <span>{proj.published ? 'Published' : 'Draft'}</span>
                          <button
                            onClick={() => handleEditProject(proj)}
                            className="text-cinema-red hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGER */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-heading text-3xl font-bold uppercase text-white">
                    PROJECTS MANAGER
                  </h1>
                  <p className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                    UPLOAD, EDIT, REORDER, PUBLISH & UNPUBLISH YOUR FILMS & WORKS
                  </p>
                </div>

                <button
                  onClick={handleCreateProject}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cinema-red hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(229,9,20,0.4)] cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD NEW PROJECT</span>
                </button>
              </div>

              {/* Projects Table / Cards List */}
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Thumbnail */}
                      <div className="w-20 h-14 rounded-lg bg-black overflow-hidden border border-neutral-800 flex-shrink-0">
                        <img
                          src={proj.cover_url}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-cinema-red px-2 py-0.2 rounded bg-red-950/40 border border-cinema-red/30">
                            {proj.category}
                          </span>
                          {proj.featured && (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400">
                              <Sparkles className="w-3 h-3" />
                              Featured
                            </span>
                          )}
                        </div>
                        <h4 className="font-heading text-base font-bold uppercase text-white mt-1">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-neutral-400 line-clamp-1 max-w-md">
                          {proj.description}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {/* Toggle Published */}
                      <button
                        onClick={() => updateProject(proj.id, { published: !proj.published })}
                        className={`p-2 rounded-lg border text-xs font-mono transition-colors ${
                          proj.published
                            ? 'border-green-800 text-green-400 bg-green-950/30'
                            : 'border-neutral-800 text-neutral-500 bg-neutral-900'
                        }`}
                        title={proj.published ? 'Published (Click to Unpublish)' : 'Unpublished (Click to Publish)'}
                      >
                        {proj.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => handleEditProject(proj)}
                        className="p-2 rounded-lg border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${proj.title}"?`)) {
                            deleteProject(proj.id);
                          }
                        }}
                        className="p-2 rounded-lg border border-neutral-800 text-red-400 hover:bg-red-950/40 hover:border-red-800 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-heading text-3xl font-bold uppercase text-white">
                    MEDIA REPOSITORY
                  </h1>
                  <p className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                    PHOTOS, SHOWREEL FOOTAGE & POSTERS
                  </p>
                </div>
                <button
                  onClick={() => setShowMediaModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-cinema-red hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-bold shadow-md cursor-pointer"
                >
                  MANAGE MEDIA FILES
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {media.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden"
                  >
                    <div className="aspect-video w-full bg-black relative">
                      {item.type === 'video' ? (
                        <video src={item.url} className="w-full h-full object-cover" muted />
                      ) : (
                        <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                      )}
                      <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-cinema-red uppercase">
                        {item.type}
                      </span>
                    </div>
                    <div className="p-3 text-[10px] font-mono text-neutral-400 truncate">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="font-heading text-3xl font-bold uppercase text-white">
                  JOURNEY & TIMELINE MANAGER
                </h1>
                <p className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                  EDIT EDUCATION, FREELANCE MILESTONES & FILM PRODUCTION YEARS
                </p>
              </div>

              <div className="space-y-4">
                {timeline.map((event) => (
                  <div
                    key={event.id}
                    className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cinema-red">
                          YEAR {event.year}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-neutral-500">
                          · {event.category}
                        </span>
                      </div>
                      <h4 className="font-heading text-lg font-bold uppercase text-white">
                        {event.title}
                      </h4>
                      <p className="text-xs font-mono text-cinema-orange">{event.subtitle}</p>
                      <p className="text-xs text-neutral-300 font-sans pt-1 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const newTitle = prompt('Update milestone title:', event.title);
                        if (newTitle) {
                          updateTimelineEvent(event.id, { title: newTitle });
                        }
                      }}
                      className="p-2 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white"
                      title="Quick Edit Title"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INBOX INQUIRIES */}
          {activeTab === 'messages' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="font-heading text-3xl font-bold uppercase text-white">
                  CLIENT INQUIRIES & MESSAGES
                </h1>
                <p className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                  DIRECT TRANSMISSIONS FROM SCENE 07 CONTACT FORM
                </p>
              </div>

              {messages.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-neutral-800 rounded-3xl">
                  <MessageSquare className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                  <p className="text-neutral-400 font-mono text-xs">No client inquiries received yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
                        <div>
                          <span className="font-heading text-lg font-bold text-white uppercase">
                            {msg.name}
                          </span>
                          <span className="text-xs font-mono text-cinema-red ml-3">
                            {msg.email}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-500">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-cinema-orange">
                        Category: {msg.project_type}
                      </div>

                      <p className="text-sm font-sans text-neutral-200 leading-relaxed bg-neutral-900/40 p-4 rounded-xl border border-neutral-900">
                        {msg.message}
                      </p>

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <a
                          href={`mailto:${msg.email}?subject=Re: Creative Project Inquiry`}
                          className="px-4 py-1.5 rounded-lg bg-cinema-red text-white text-xs font-mono font-bold"
                        >
                          REPLY VIA EMAIL
                        </a>
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="p-1.5 rounded-lg border border-neutral-800 text-neutral-500 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="font-heading text-3xl font-bold uppercase text-white">
                  SITE & IDENTITY SETTINGS
                </h1>
                <p className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                  EDIT BIO, HEADLINES, DIRECT CONTACT NUMBERS & SOCIAL ACCOUNTS
                </p>
              </div>

              {savedSettingsSuccess && (
                <div className="p-3 rounded-xl bg-green-950/60 border border-green-800 text-green-200 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Portfolio settings updated successfully and saved.</span>
                </div>
              )}

              <form onSubmit={handleSettingsSubmit} className="space-y-6">
                {/* PROFILE PHOTOGRAPHS & PORTRAITS */}
                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-6">
                  <div>
                    <h3 className="font-heading text-base font-bold uppercase text-white">
                      PROFILE PHOTOGRAPHS & PORTRAITS
                    </h3>
                    <p className="text-xs font-mono text-neutral-400 mt-0.5">
                      UPLOAD OR SELECT HERO AND ABOUT SCENE PORTRAITS
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Hero Portrait (Scene 01) */}
                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cinema-red font-semibold block">
                        HERO SCENE 01 PORTRAIT
                      </span>

                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-cinema-red shadow-[0_0_15px_rgba(229,9,20,0.4)] bg-black flex-shrink-0">
                          <img
                            src={localSettings.hero_portrait_url || '/assets/gokul/gokul@0.75x.jpg'}
                            alt="Hero Portrait Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white cursor-pointer transition-colors">
                            <Upload className="w-3.5 h-3.5 text-cinema-red" />
                            <span>UPLOAD NEW PHOTO</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleProfilePhotoUpload(e, 'hero_portrait_url')}
                              className="hidden"
                            />
                          </label>
                          <span className="block text-[9px] font-mono text-neutral-500 mt-1">JPG, PNG, WEBP</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                          IMAGE PATH / URL
                        </label>
                        <input
                          type="text"
                          value={localSettings.hero_portrait_url}
                          onChange={(e) => setLocalSettings({ ...localSettings, hero_portrait_url: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
                        <span className="text-[9px] font-mono text-neutral-400 uppercase block">QUICK SELECT EXISTING:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { label: 'Gokul High-Res', url: '/assets/gokul/gokul.png' },
                            { label: 'Film Set', url: '/assets/gokul/cinematic-film-set.png' },
                            { label: 'Original 1', url: '/assets/gokul/gokul@0.75x.jpg' },
                            { label: 'Original 2', url: '/assets/gokul/gokul@0.75x-1.jpg' },
                            { label: 'Passport', url: '/assets/gokul/passport-photo.jpg' },
                          ].map((preset) => (
                            <button
                              key={preset.url}
                              type="button"
                              onClick={() => setLocalSettings({ ...localSettings, hero_portrait_url: preset.url })}
                              className={`text-[9px] font-mono px-2 py-1 rounded border transition-colors ${
                                localSettings.hero_portrait_url === preset.url
                                  ? 'border-cinema-red bg-red-950/40 text-white font-bold'
                                  : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* About Me Portrait (Scene 06) */}
                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cinema-orange font-semibold block">
                        ABOUT SCENE 06 PORTRAIT
                      </span>

                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-cinema-orange shadow-[0_0_15px_rgba(255,85,0,0.3)] bg-black flex-shrink-0">
                          <img
                            src={localSettings.about_portrait_url || localSettings.hero_portrait_url || '/assets/gokul/gokul@0.75x.jpg'}
                            alt="About Portrait Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white cursor-pointer transition-colors">
                            <Upload className="w-3.5 h-3.5 text-cinema-orange" />
                            <span>UPLOAD NEW PHOTO</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleProfilePhotoUpload(e, 'about_portrait_url')}
                              className="hidden"
                            />
                          </label>
                          <span className="block text-[9px] font-mono text-neutral-500 mt-1">JPG, PNG, WEBP</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                          IMAGE PATH / URL
                        </label>
                        <input
                          type="text"
                          value={localSettings.about_portrait_url}
                          onChange={(e) => setLocalSettings({ ...localSettings, about_portrait_url: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
                        <span className="text-[9px] font-mono text-neutral-400 uppercase block">QUICK SELECT EXISTING:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { label: 'Film Set', url: '/assets/gokul/cinematic-film-set.png' },
                            { label: 'Gokul High-Res', url: '/assets/gokul/gokul.png' },
                            { label: 'Original 1', url: '/assets/gokul/gokul@0.75x.jpg' },
                            { label: 'Original 2', url: '/assets/gokul/gokul@0.75x-1.jpg' },
                          ].map((preset) => (
                            <button
                              key={preset.url}
                              type="button"
                              onClick={() => setLocalSettings({ ...localSettings, about_portrait_url: preset.url })}
                              className={`text-[9px] font-mono px-2 py-1 rounded border transition-colors ${
                                localSettings.about_portrait_url === preset.url
                                  ? 'border-cinema-orange bg-orange-950/40 text-white font-bold'
                                  : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
                  <h3 className="font-heading text-base font-bold uppercase text-white">
                    PRIMARY IDENTITY & HEADINGS
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        value={localSettings.name}
                        onChange={(e) => setLocalSettings({ ...localSettings, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                        PROFESSIONAL TITLE
                      </label>
                      <input
                        type="text"
                        value={localSettings.title}
                        onChange={(e) => setLocalSettings({ ...localSettings, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      ABOUT HEADING
                    </label>
                    <input
                      type="text"
                      value={localSettings.about_heading}
                      onChange={(e) => setLocalSettings({ ...localSettings, about_heading: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      ABOUT STORY TEXT
                    </label>
                    <textarea
                      rows={4}
                      value={localSettings.about_text}
                      onChange={(e) => setLocalSettings({ ...localSettings, about_text: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white resize-none"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
                  <h3 className="font-heading text-base font-bold uppercase text-white">
                    CONTACT & SOCIAL CHANNELS
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        value={localSettings.email}
                        onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                        PHONE NUMBER
                      </label>
                      <input
                        type="text"
                        value={localSettings.phone}
                        onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                        WHATSAPP NUMBER
                      </label>
                      <input
                        type="text"
                        value={localSettings.whatsapp}
                        onChange={(e) => setLocalSettings({ ...localSettings, whatsapp: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                        INSTAGRAM URL
                      </label>
                      <input
                        type="text"
                        value={localSettings.instagram}
                        onChange={(e) => setLocalSettings({ ...localSettings, instagram: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-cinema-red hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-bold shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE SETTINGS</span>
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Project Editor Modal */}
      {showProjectModal && (
        <ProjectEditorModal
          project={editingProject}
          categories={categories}
          onClose={() => setShowProjectModal(false)}
          onSave={handleSaveProject}
        />
      )}

      {/* Media Library Modal */}
      {showMediaModal && (
        <MediaLibraryModal onClose={() => setShowMediaModal(false)} />
      )}

      {/* Supabase Connection Setup Guide Modal */}
      {showSupabaseGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto"
          onClick={() => setShowSupabaseGuide(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#0c0c12] border border-neutral-800 rounded-3xl p-8 shadow-2xl my-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-cinema-red" />
                <h3 className="font-heading text-xl uppercase font-bold text-white">
                  SUPABASE BACKEND CONNECTION GUIDE
                </h3>
              </div>
              <button
                onClick={() => setShowSupabaseGuide(false)}
                className="p-1 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-neutral-300 leading-relaxed">
              <p>
                <strong>Current Status:</strong>{' '}
                <span className={isSupabaseConnected ? 'text-green-400' : 'text-amber-400'}>
                  {isSupabaseConnected ? 'Connected to live Supabase project' : 'Running in Local Storage Mode'}
                </span>
              </p>
              <p>
                In Local Storage Mode, all uploads, edits, and settings persist securely in your browser session. To connect to Supabase:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-neutral-400">
                <li>Create a free project at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-cinema-red underline">supabase.com</a></li>
                <li>Go to <strong>Project Settings → API</strong> and copy your Project URL and Anon Public Key.</li>
                <li>In your workspace root, create or edit the <code>.env</code> file with:</li>
              </ol>

              <pre className="p-4 rounded-xl bg-black border border-neutral-800 text-neutral-300 overflow-x-auto text-[11px]">
{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key`}
              </pre>

              <p>
                Run the database migration provided in <code>supabase-schema.sql</code> inside the Supabase SQL Editor.
              </p>
            </div>

            <button
              onClick={() => setShowSupabaseGuide(false)}
              className="w-full py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white"
            >
              GOT IT, CLOSE GUIDE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
