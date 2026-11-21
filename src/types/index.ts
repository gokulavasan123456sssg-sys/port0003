export interface Project {
  id: string;
  title: string;
  description: string;
  category: string; // 'wedding' | 'editing' | 'cinematography' | 'photography' | 'vfx' | '3d' | 'youtube'
  cover_url: string;
  video_url?: string;
  video_preview_url?: string;
  date?: string;
  software: string[];
  client_label?: string; // 'Client Project' | 'Personal' | 'Showreel'
  featured: boolean;
  published: boolean;
  order_index: number;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order_index: number;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  icon?: string;
  order_index: number;
}

export interface CreativeTool {
  id: string;
  name: string;
  category: 'editing' | '3d_vfx' | 'production';
  level: string;
  icon_name?: string;
  description: string;
}

export interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  thumbnail_url?: string;
  size_kb?: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  project_type: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

export interface SiteSettings {
  name: string;
  title: string;
  about_heading: string;
  about_text: string;
  experience_years: string;
  projects_count: string;
  views_count: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  youtube: string;
  resume_url: string;
  hero_portrait_url: string;
  about_portrait_url: string;
}
