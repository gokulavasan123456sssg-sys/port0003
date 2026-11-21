import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Category, TimelineEvent, CreativeTool, SiteSettings, MediaItem, ContactMessage } from '../types';
import {
  INITIAL_PROJECTS,
  INITIAL_CATEGORIES,
  INITIAL_TIMELINE,
  CREATIVE_TOOLS,
  INITIAL_SITE_SETTINGS,
  INITIAL_MEDIA,
} from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface PortfolioContextType {
  projects: Project[];
  categories: Category[];
  timeline: TimelineEvent[];
  tools: CreativeTool[];
  media: MediaItem[];
  settings: SiteSettings;
  messages: ContactMessage[];
  loading: boolean;
  selectedCategory: string;
  setSelectedCategory: (slug: string) => void;
  // Project actions
  addProject: (project: Omit<Project, 'id' | 'created_at'>) => Promise<Project>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  // Media actions
  addMedia: (mediaItem: Omit<MediaItem, 'id' | 'created_at'>) => Promise<MediaItem>;
  deleteMedia: (id: string) => Promise<void>;
  // Timeline actions
  addTimelineEvent: (event: Omit<TimelineEvent, 'id'>) => Promise<void>;
  updateTimelineEvent: (id: string, updates: Partial<TimelineEvent>) => Promise<void>;
  deleteTimelineEvent: (id: string) => Promise<void>;
  // Category actions
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  // Settings actions
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  // Contact messages
  submitContactMessage: (msg: { name: string; email: string; project_type: string; message: string }) => Promise<{ success: boolean; error?: string }>;
  markMessageStatus: (id: string, status: 'new' | 'read' | 'replied') => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  // Reset data to defaults
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'gokul_portfolio_projects',
  CATEGORIES: 'gokul_portfolio_categories',
  TIMELINE: 'gokul_portfolio_timeline',
  SETTINGS: 'gokul_portfolio_settings',
  MEDIA: 'gokul_portfolio_media',
  MESSAGES: 'gokul_portfolio_messages',
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [tools] = useState<CreativeTool[]>(CREATIVE_TOOLS);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Load data from Supabase or LocalStorage
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      if (isSupabaseConfigured && supabase) {
        try {
          // Fetch from Supabase
          const [projectsRes, categoriesRes, timelineRes, mediaRes, settingsRes, messagesRes] = await Promise.all([
            supabase.from('projects').select('*').order('order_index', { ascending: true }),
            supabase.from('categories').select('*').order('order_index', { ascending: true }),
            supabase.from('timeline_events').select('*').order('order_index', { ascending: true }),
            supabase.from('media').select('*').order('created_at', { ascending: false }),
            supabase.from('site_settings').select('*').eq('id', 'current').single(),
            supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
          ]);

          if (projectsRes.data && projectsRes.data.length > 0) {
            setProjects(projectsRes.data as Project[]);
          } else {
            setProjects(INITIAL_PROJECTS);
          }

          if (categoriesRes.data && categoriesRes.data.length > 0) {
            setCategories(categoriesRes.data as Category[]);
          } else {
            setCategories(INITIAL_CATEGORIES);
          }

          if (timelineRes.data && timelineRes.data.length > 0) {
            setTimeline(timelineRes.data as TimelineEvent[]);
          } else {
            setTimeline(INITIAL_TIMELINE);
          }

          if (mediaRes.data && mediaRes.data.length > 0) {
            setMedia(mediaRes.data as MediaItem[]);
          } else {
            setMedia(INITIAL_MEDIA);
          }

          if (settingsRes.data && settingsRes.data.data) {
            setSettings(settingsRes.data.data as SiteSettings);
          } else {
            setSettings(INITIAL_SITE_SETTINGS);
          }

          if (messagesRes.data) {
            setMessages(messagesRes.data as ContactMessage[]);
          }
        } catch (err) {
          console.warn('Error fetching from Supabase, using local fallback:', err);
          loadLocalFallback();
        }
      } else {
        loadLocalFallback();
      }

      setLoading(false);
    };

    const loadLocalFallback = () => {
      const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      const savedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      const savedTimeline = localStorage.getItem(STORAGE_KEYS.TIMELINE);
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const savedMedia = localStorage.getItem(STORAGE_KEYS.MEDIA);
      const savedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);

      setProjects(savedProjects ? JSON.parse(savedProjects) : INITIAL_PROJECTS);
      setCategories(savedCategories ? JSON.parse(savedCategories) : INITIAL_CATEGORIES);
      setTimeline(savedTimeline ? JSON.parse(savedTimeline) : INITIAL_TIMELINE);
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          if (parsed.hero_portrait_url === '/assets/gokul/gokul@0.75x.jpg' || !parsed.hero_portrait_url) {
            parsed.hero_portrait_url = '/assets/gokul/profile.jpg';
          }
          if (parsed.about_portrait_url === '/assets/gokul/gokul@0.75x-1.jpg' || parsed.about_portrait_url === '/assets/gokul/gokul@0.75x.jpg' || !parsed.about_portrait_url) {
            parsed.about_portrait_url = '/assets/gokul/profile.jpg';
          }
          setSettings(parsed);
        } catch {
          setSettings(INITIAL_SITE_SETTINGS);
        }
      } else {
        setSettings(INITIAL_SITE_SETTINGS);
      }
      setMedia(savedMedia ? JSON.parse(savedMedia) : INITIAL_MEDIA);
      setMessages(savedMessages ? JSON.parse(savedMessages) : []);
    };

    loadData();
  }, []);

  // Save to LocalStorage whenever state changes (keeps local testing always synchronized)
  const persistStateLocally = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // ignore
    }
  };

  // PROJECT ACTIONS
  const addProject = async (projectData: Omit<Project, 'id' | 'created_at'>): Promise<Project> => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    const updated = [newProject, ...projects];
    setProjects(updated);
    persistStateLocally(STORAGE_KEYS.PROJECTS, updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('projects').insert([newProject]);
    }

    return newProject;
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    const updated = projects.map(p => (p.id === id ? { ...p, ...updates } : p));
    setProjects(updated);
    persistStateLocally(STORAGE_KEYS.PROJECTS, updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('projects').update(updates).eq('id', id);
    }
  };

  const deleteProject = async (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    persistStateLocally(STORAGE_KEYS.PROJECTS, updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('projects').delete().eq('id', id);
    }
  };

  // MEDIA ACTIONS
  const addMedia = async (mediaData: Omit<MediaItem, 'id' | 'created_at'>): Promise<MediaItem> => {
    const newItem: MediaItem = {
      ...mediaData,
      id: `media-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    const updated = [newItem, ...media];
    setMedia(updated);
    persistStateLocally(STORAGE_KEYS.MEDIA, updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('media').insert([newItem]);
    }

    return newItem;
  };

  const deleteMedia = async (id: string) => {
    const updated = media.filter(m => m.id !== id);
    setMedia(updated);
    persistStateLocally(STORAGE_KEYS.MEDIA, updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('media').delete().eq('id', id);
    }
  };

  // TIMELINE ACTIONS
  const addTimelineEvent = async (eventData: Omit<TimelineEvent, 'id'>) => {
    const newEvent: TimelineEvent = {
      ...eventData,
      id: `tl-${Date.now()}`,
    };

    const updated = [...timeline, newEvent].sort((a, b) => a.order_index - b.order_index);
    setTimeline(updated);
    persistStateLocally(STORAGE_KEYS.TIMELINE, updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('timeline_events').insert([newEvent]);
    }
  };

  const updateTimelineEvent = async (id: string, updates: Partial<TimelineEvent>) => {
    const updated = timeline.map(t => (t.id === id ? { ...t, ...updates } : t));
    setTimeline(updated);
    persistStateLocally(STORAGE_KEYS.TIMELINE, updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('timeline_events').update(updates).eq('id', id);
    }
  };

  const deleteTimelineEvent = async (id: string) => {
    const updated = timeline.filter(t => t.id !== id);
    setTimeline(updated);
    persistStateLocally(STORAGE_KEYS.TIMELINE, updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('timeline_events').delete().eq('id', id);
    }
  };

  // CATEGORY ACTIONS
  const addCategory = async (catData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`,
    };

    const updated = [...categories, newCat];
    setCategories(updated);
    persistStateLocally(STORAGE_KEYS.CATEGORIES, updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('categories').insert([newCat]);
    }
  };

  const deleteCategory = async (id: string) => {
    const updated = categories.filter(c => c.id !== id);
    setCategories(updated);
    persistStateLocally(STORAGE_KEYS.CATEGORIES, updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('categories').delete().eq('id', id);
    }
  };

  // SETTINGS ACTIONS
  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    persistStateLocally(STORAGE_KEYS.SETTINGS, updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('site_settings').upsert({ id: 'current', data: updated });
    }
  };

  // CONTACT MESSAGES
  const submitContactMessage = async (msg: { name: string; email: string; project_type: string; message: string }) => {
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...msg,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    persistStateLocally(STORAGE_KEYS.MESSAGES, updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('contact_messages').insert([newMessage]);
      if (error) return { success: false, error: error.message };
    }

    return { success: true };
  };

  const markMessageStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
    const updated = messages.map(m => (m.id === id ? { ...m, status } : m));
    setMessages(updated);
    persistStateLocally(STORAGE_KEYS.MESSAGES, updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('contact_messages').update({ status }).eq('id', id);
    }
  };

  const deleteMessage = async (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    persistStateLocally(STORAGE_KEYS.MESSAGES, updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('contact_messages').delete().eq('id', id);
    }
  };

  const resetToDefaults = () => {
    setProjects(INITIAL_PROJECTS);
    setCategories(INITIAL_CATEGORIES);
    setTimeline(INITIAL_TIMELINE);
    setSettings(INITIAL_SITE_SETTINGS);
    setMedia(INITIAL_MEDIA);
    persistStateLocally(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    persistStateLocally(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    persistStateLocally(STORAGE_KEYS.TIMELINE, INITIAL_TIMELINE);
    persistStateLocally(STORAGE_KEYS.SETTINGS, INITIAL_SITE_SETTINGS);
    persistStateLocally(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        categories,
        timeline,
        tools,
        media,
        settings,
        messages,
        loading,
        selectedCategory,
        setSelectedCategory,
        addProject,
        updateProject,
        deleteProject,
        addMedia,
        deleteMedia,
        addTimelineEvent,
        updateTimelineEvent,
        deleteTimelineEvent,
        addCategory,
        deleteCategory,
        updateSettings,
        submitContactMessage,
        markMessageStatus,
        deleteMessage,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
};
