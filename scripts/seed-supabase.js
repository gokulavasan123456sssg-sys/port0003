const supabaseUrl = 'https://nluakjlhcyzhdqgkiidc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sdWFramxoY3l6aGRxZ2tpaWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyNDI2MzQsImV4cCI6MjExMDgxODYzNH0.JqZs3xfKYMf62oZVuIre2Qn9Evf95pd5BFK0r6mULRw';

const headers = {
  'apikey': supabaseAnonKey,
  'Authorization': `Bearer ${supabaseAnonKey}`,
  'Content-Type': 'application/json',
  'Prefer': 'resolution=merge-duplicates',
};

const CATEGORIES = [
  { id: 'cat-all', name: 'ALL WORKS', slug: 'all', order_index: 0 },
  { id: 'cat-1', name: 'WEDDING FILMS', slug: 'wedding', description: 'Emotional cinematic wedding stories and highlights', order_index: 1 },
  { id: 'cat-2', name: 'VIDEO EDITING', slug: 'editing', description: 'Commercial cuts, rhythm pacing, and narrative edits', order_index: 2 },
  { id: 'cat-3', name: 'CINEMATOGRAPHY', slug: 'cinematography', description: 'Visual lighting, camera operation, and frame composition', order_index: 3 },
  { id: 'cat-4', name: 'PHOTOGRAPHY', slug: 'photography', description: 'Fine art portraiture, street, and event photography', order_index: 4 },
  { id: 'cat-5', name: 'VFX SHOWREEL', slug: 'vfx', description: 'CGI integration, clean plates, rotoscopy, and compositing', order_index: 5 },
  { id: 'cat-6', name: '3D WORKS', slug: '3d', description: '3D modeling, lighting, look-development, and simulation', order_index: 6 },
  { id: 'cat-7', name: 'YOUTUBE PROJECTS', slug: 'youtube', description: 'Engaging content production, storytelling, and vlogs', order_index: 7 },
];

const PROJECTS = [
  {
    id: 'proj-1',
    title: 'ETERNAL VOWS — WEDDING HIGHLIGHT',
    description: 'A deeply emotional wedding teaser capturing candid moments, ceremonial richness, and delicate natural lighting. Graded in DaVinci Resolve with film emulation LUTs.',
    category: 'wedding',
    cover_url: '/assets/gokul/photo-1.jpg',
    video_url: '/assets/gokul/cinematic-reel-1.mp4',
    video_preview_url: '/assets/gokul/cinematic-reel-1.mp4',
    date: '2025',
    software: ['DaVinci Resolve', 'Sony Cine EI', 'Adobe Premiere Pro'],
    client_label: 'Wedding Production',
    featured: true,
    published: true,
    order_index: 0,
    created_at: new Date('2025-10-15').toISOString(),
  },
  {
    id: 'proj-2',
    title: 'URBAN KINETICS — COMMERCIAL CUT',
    description: 'High-energy rhythmic video edit syncing punchy sound design with speed ramping, masking transitions, and dynamic typography.',
    category: 'editing',
    cover_url: '/assets/gokul/photo-2.jpg',
    video_url: '/assets/gokul/cinematic-reel-2.mp4',
    video_preview_url: '/assets/gokul/cinematic-reel-2.mp4',
    date: '2025',
    software: ['Adobe Premiere Pro', 'After Effects', 'Audition'],
    client_label: 'Commercial Client',
    featured: true,
    published: true,
    order_index: 1,
    created_at: new Date('2025-11-01').toISOString(),
  },
  {
    id: 'proj-3',
    title: 'SHADOWS OF TAMIL NADU — CINEMATOGRAPHY',
    description: 'Exploration of natural golden-hour lighting, high contrast chiaroscuro, and atmospheric haze. Captured on cinema primes with precise framing.',
    category: 'cinematography',
    cover_url: '/assets/gokul/photo-3.jpg',
    video_url: '/assets/gokul/cinematic-reel-3.mp4',
    video_preview_url: '/assets/gokul/cinematic-reel-3.mp4',
    date: '2026',
    software: ['Cinema Camera', 'Gimbal Rig', 'DaVinci Resolve'],
    client_label: 'Personal Film',
    featured: true,
    published: true,
    order_index: 2,
    created_at: new Date('2026-01-20').toISOString(),
  },
  {
    id: 'proj-4',
    title: 'PORTRAITURE & SOUL — FINE ART SERIES',
    description: 'Intimate visual study of expression, tone, and character. Shot with 85mm prime lens under ambient rim lights with subtle skin retouching.',
    category: 'photography',
    cover_url: '/assets/gokul/photo-4.jpg',
    date: '2025',
    software: ['Lightroom Classic', 'Photoshop', 'Capture One'],
    client_label: 'Editorial Shoot',
    featured: true,
    published: true,
    order_index: 3,
    created_at: new Date('2025-12-05').toISOString(),
  },
  {
    id: 'proj-5',
    title: 'CYBER DIMENSION — VFX COMPOSITING',
    description: 'Complex multi-pass compositing combining green-screen footage, custom 3D holographic UI, particle simulations, and atmospheric smoke pass in Nuke.',
    category: 'vfx',
    cover_url: '/assets/projects/p01_timeless.png',
    video_url: '/assets/media/hero.mp4',
    video_preview_url: '/assets/media/hero.mp4',
    date: '2025',
    software: ['Foundry Nuke', 'After Effects', 'Mocha Pro'],
    client_label: 'VFX Showreel',
    featured: true,
    published: true,
    order_index: 4,
    created_at: new Date('2025-08-10').toISOString(),
  },
  {
    id: 'proj-6',
    title: 'TITAN MECH — 3D HARD SURFACE LOOKDEV',
    description: 'Detailed 3D model with UDIM texture workflow, subsurface scattering, procedural metallic wear, and Arnold cinematic lighting.',
    category: '3d',
    cover_url: '/assets/projects/p09_space.png',
    date: '2025',
    software: ['Autodesk Maya', 'Substance Painter', 'Arnold'],
    client_label: '3D Portfolio',
    featured: false,
    published: true,
    order_index: 5,
    created_at: new Date('2025-09-18').toISOString(),
  },
  {
    id: 'proj-7',
    title: 'SGV VLOGS — YOUTUBE CREATIVE SERIES',
    description: 'End-to-end YouTube production encompassing storytelling, on-location shooting, sound mixing, color grading, and thumb design with high viewer retention.',
    category: 'youtube',
    cover_url: '/assets/gokul/photo-1.jpg',
    video_url: '/assets/gokul/cinematic-reel-1.mp4',
    video_preview_url: '/assets/gokul/cinematic-reel-1.mp4',
    date: '2026',
    software: ['Premiere Pro', 'After Effects', 'Photoshop'],
    client_label: 'YouTube Production',
    featured: true,
    published: true,
    order_index: 6,
    created_at: new Date('2026-02-14').toISOString(),
  },
];

const TIMELINE = [
  {
    id: 'tl-1',
    year: '2021',
    title: 'SSLC — ACADEMIC FOUNDATION',
    subtitle: 'Vetri Vikaas Higher Secondary School',
    description: 'Formative education developing discipline, analytical thinking, and early discovery of visual aesthetics and storytelling.',
    category: 'Education',
    order_index: 0,
  },
  {
    id: 'tl-2',
    year: '2022',
    title: 'DIPLOMA IN ENGINEERING',
    subtitle: 'Sri Ramakrishna Polytechnic College',
    description: 'Hands-on technical engineering grounding, structured problem-solving, and expanding creative experiments with digital cameras and video software.',
    category: 'Education',
    order_index: 1,
  },
  {
    id: 'tl-3',
    year: '2023',
    title: 'INCEPTION OF FREELANCE JOURNEY',
    subtitle: 'First Commercial Video Editing & Shoots',
    description: 'Commenced independent freelance journey. Produced short films, music edits, and local brand promotions with rapid turnaround and cinematic color grading.',
    category: 'Freelance Experience',
    order_index: 2,
  },
  {
    id: 'tl-4',
    year: '2024',
    title: 'B.E. CYBER SECURITY & CREATIVE EXPANSION',
    subtitle: 'SRM Valliammai Engineering College',
    description: 'Pursuing Bachelor of Engineering in Cyber Security while scaling filmmaking operations, mastering DaVinci Resolve, camera rigs, and lighting gear.',
    category: 'Education & Freelance',
    order_index: 3,
  },
  {
    id: 'tl-5',
    year: '2025',
    title: 'WEDDING FILM PRODUCTION & VFX',
    subtitle: 'Cinematography, 3D & Advanced Compositing',
    description: 'Directed full-length wedding cinematic films, executed complex VFX sequences using Nuke & Maya, and scaled YouTube content reach.',
    category: 'Wedding & VFX',
    order_index: 4,
  },
  {
    id: 'tl-6',
    year: '2026',
    title: 'VISUAL STORYTELLER SHOWREEL',
    subtitle: 'Next-Gen Cinematic Filmmaking & Direction',
    description: 'Full-spectrum creative portfolio uniting video editing, cinematography, photography, and VFX into unforgettable interactive film experiences.',
    category: 'Creative Milestone',
    order_index: 5,
  },
];

const SITE_SETTINGS = {
  name: 'GOKULAVASAN',
  title: 'VIDEO EDITOR | CINEMATOGRAPHER | PHOTOGRAPHER | VFX ARTIST',
  about_heading: 'BEHIND EVERY FRAME, THERE IS A STORY.',
  about_text: 'I am GOKULAVASAN, a visual storyteller working across video editing, cinematography, photography and visual effects. My passion is creating visually engaging stories through camera, light, composition and post-production. With over 2 years of dedicated freelance experience, I merge technical rigor with cinematic poetry to transform fleeting moments into timeless art.',
  experience_years: '2+',
  projects_count: '50+',
  views_count: '150K+',
  email: 'gokulavasan.creative@gmail.com',
  phone: '+91 98765 43210',
  whatsapp: '+919876543210',
  instagram: 'https://instagram.com',
  youtube: 'https://youtube.com',
  resume_url: '/assets/gokul/gokulavasan-resume.jpg',
  hero_portrait_url: '/assets/gokul/profile.jpg',
  about_portrait_url: '/assets/gokul/profile.jpg',
};

async function postTable(table, data) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  console.log(`POST /${table}:`, res.status, res.statusText);
  if (!res.ok) {
    const text = await res.text();
    console.error('Error details:', text);
  }
}

async function seed() {
  console.log('Seeding Supabase REST API...');
  await postTable('categories', CATEGORIES);
  await postTable('projects', PROJECTS);
  await postTable('timeline_events', TIMELINE);
  await postTable('site_settings', [{ id: 'current', data: SITE_SETTINGS }]);
  console.log('Seeding completed successfully!');
}

seed();
