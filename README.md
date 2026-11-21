<<<<<<< HEAD
# port0003
=======
# GOKULAVASAN — CINEMATIC CREATIVE PORTFOLIO

A world-class, premium, cinematic personal portfolio website and dynamic content management system built for **GOKULAVASAN** — Video Editor, Cinematographer, Photographer & VFX Artist.

Inspired by the visual experience and technical craftsmanship of cinematic WebGL productions, this application transforms a traditional portfolio into an interactive film experience.

---

## 🎬 1. DESIGN DIRECTION & CINEMATIC PALETTE

- **Background:** Deep Obsidian Black (`#050505`) with Charcoal sections (`#0a0a0f`).
- **Lighting Accents:** Fiery red (`#e50914`), amber (`#ff8400`), and crimson rim lighting.
- **Typography:** Large editorial headings in **Anton** & **Oswald** paired with **Inter** body copy and **JetBrains Mono** metadata.
- **Atmospheric Effects:** Real-time 35mm canvas film grain, floating red ember particles, and glowing light ribbons.
- **Audio Experience:** Integrated Web Audio API synthesized cinematic sub-bass ambient drone with interactive soundwave toggle.

---

## 🎞️ 2. THE 7 CINEMATIC SCENES

### SCENE 01 — THE OPENING HERO REVEAL
- Staged cinematic fade-in from pure darkness.
- Atmospheric sound toggle and floating ambient embers.
- Dramatic reveal of GOKULAVASAN's authentic portrait encircled by a red rim light halo.
- Oversized editorial wordmark: `GOKULAVASAN` with subtitled credentials:
  `VIDEO EDITOR / CINEMATOGRAPHER / PHOTOGRAPHER / VFX ARTIST`.
- Dual Call to Actions: **EXPLORE MY WORK** and **CONTACT ME**.
- Animated pulsing scroll-down indicator.

### SCENE 02 — MY CREATIVE UNIVERSE
- 3D interactive discipline universe with cursor-driven parallax and depth tilt.
- 6 floating discipline sectors:
  1. **Video Editing** (Rhythm, pacing, and speed-ramping cuts)
  2. **Cinematography** (Lighting, chiaroscuro, camera dynamics)
  3. **Photography** (Fine art portraiture, high dynamic range)
  4. **VFX & Compositing** (Node-based CGI integration, rotoscopy)
  5. **3D Design & LookDev** (Maya hard-surface modeling, Arnold lighting)
  6. **Filmmaking & Weddings** (End-to-end wedding film production)
- Orbiting procedural red/amber light ribbon trails and depth embers.
- Clicking any sector instantly filters the Project Gallery to that discipline.

### SCENE 03 — A JOURNEY THROUGH TIME (TIMELINE)
- Interactive luminous year rail spanning **2021 to 2026**.
- Dynamic spotlight projector that illuminates the selected milestone.
- Chronological narrative milestones:
  - **2021:** SSLC — Vetri Vikaas Higher Secondary School.
  - **2022:** Diploma in Engineering — Sri Ramakrishna Polytechnic College.
  - **2023:** Inception of Freelance Video Editing & Commercial Shoots.
  - **2024:** Bachelor of Engineering in Cyber Security — SRM Valliammai Engineering College.
  - **2025:** Wedding Film Production & Multi-pass VFX Specialization.
  - **2026:** Next-Gen Visual Storytelling & Direction.
- Fully manageable and editable through the private Admin Dashboard.

### SCENE 04 — IMMERSIVE PROJECT GALLERY
- Filterable showcase by categories:
  - `ALL WORKS`
  - `WEDDING FILMS`
  - `VIDEO EDITING`
  - `CINEMATOGRAPHY`
  - `PHOTOGRAPHY`
  - `VFX SHOWREEL`
  - `3D WORKS`
  - `YOUTUBE PROJECTS`
- Visual cards with hover video previews, production dates, client labels, and software badges.
- **Full-Screen Project Viewer Modal:**
  - Embedded HD Video Player (supports local MP4, YouTube, Vimeo).
  - High-resolution photography inspection.
  - Gear stack, complete project story, and keyboard navigation (Left/Right arrows, Escape).

### SCENE 05 — MY CREATIVE ARSENAL (TOOLS)
- Visual showcase of industry-grade hardware and software:
  - **Post-Production:** Adobe Premiere Pro, DaVinci Resolve (Color & Fairlight), Adobe After Effects.
  - **3D & VFX:** Autodesk Maya, Foundry Nuke.
  - **Cinematography:** Camera Operation, Gimbal Rigging, Three-Point Lighting, Storyboarding & Direction.
- 3D tilt cards with neon status badges and production-ready tags.

### SCENE 06 — ABOUT ME
- Editorial layout: *"BEHIND EVERY FRAME, THERE IS A STORY."*
- Authentic portrait of Gokulavasan.
- Freelance metrics: **2+ Years Experience**, **50+ Projects Delivered**, **150K+ Audience Reach**.
- Academic credentials (B.E. Cyber Security, Diploma, SSLC).
- **Download Resume & Preview Resume** buttons linking directly to his authentic CV.

### SCENE 07 — CONTACT & CINEMATIC FINALE
- Monumental headline: *"LET'S CREATE SOMETHING UNFORGETTABLE."*
- Direct communication channels:
  - **Email:** `gokulavasan.creative@gmail.com`
  - **Phone:** Direct call line
  - **WhatsApp:** Direct one-click chat link
  - **Socials:** Instagram & YouTube
- Interactive project inquiry form with validation that transmits inquiries directly to the database/admin inbox.

---

## 🔐 3. PRIVATE ADMIN DASHBOARD (`/admin`)

Access the private admin dashboard by navigating to `/admin` or clicking the shield icon in the top navigation bar.

### Features:
1. **Secure Authentication:**
   - Email and password login.
   - Protected routes.
   - Default local mode credentials:
     - **Email:** `admin@gokulavasan.com`
     - **Password:** `admin123`
2. **Real-time Overview:**
   - Counters for Total Projects, Photos, Videos, Categories, and Unread Client Inquiries.
3. **Projects Manager:**
   - Add new projects with custom title, category, description, and production year.
   - Upload local cover image or specify image URL.
   - Upload video file or provide YouTube/Vimeo/MP4 URL.
   - Mark as Featured or toggle Published status.
   - Edit, delete, and reorder existing projects.
4. **Media Library:**
   - Visual grid of uploaded images (JPG, PNG, WEBP) and videos (MP4, WEBM).
   - Drag & drop local media upload.
   - One-click copy URL for quick pasting into project forms.
   - Delete and replace assets.
5. **Timeline Manager:**
   - Edit, add, or delete journey milestones and education events dynamically.
6. **Inbox Inquiries:**
   - Review incoming client inquiries submitted through the Scene 07 contact form.
   - Direct mail reply button and delete option.
7. **Site Identity Settings:**
   - Edit bio, headlines, contact numbers, email, WhatsApp, and social URLs.

> **Zero Code Edits Needed:** Gokulavasan can add new projects, change photos, upload new showreel clips, and update contact information directly from the dashboard without touching source code.

---

## ⚡ 4. TECH STACK

- **Frontend Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS Keyframe Animations
- **3D & Canvas:** Three.js / Canvas 2D WebGL Compositing
- **Icons:** Lucide React
- **Backend & Auth:** Supabase (Database, Auth, Storage) + Local Storage Fallback Engine

---

## 🚀 5. LOCAL DEVELOPMENT & EXECUTION

The repository includes a self-contained portable Node.js runtime in `.tools/node` so it runs out-of-the-box on this system.

```bash
# 1. Start development server
$env:PATH = "d:\gtfhtng\.tools\node;$env:PATH"
npm run dev

# 2. Build for production
npm run build

# 3. Preview production build locally
npm run preview
```

Open `http://localhost:5173` in your browser.

---

## 🌐 6. SUPABASE CLOUD SETUP GUIDE

The website is already equipped with a seamless local fallback mode. When you are ready to connect your live Supabase cloud database:

1. Sign up for free at [supabase.com](https://supabase.com).
2. Create a new project named `gokulavasan-portfolio`.
3. Go to **SQL Editor** in the Supabase dashboard and run the entire SQL script from `supabase-schema.sql` (creates all tables, RLS security policies, and permissions).
4. Go to **Storage**, click **New Bucket**, name it `portfolio-media`, and toggle **Public Bucket** to ON.
5. Go to **Project Settings → API** and copy:
   - `Project URL`
   - `anon public key`
6. Open `.env` in the project root and fill in:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
7. Go to **Authentication → Users** in Supabase and click **Add User** to create your admin login email & password.

---

## ☁️ 7. FREE DEPLOYMENT GUIDE (VERCEL)

### Deploying to Vercel (Free Tier):
1. Push this project repository to GitHub or GitLab.
2. Visit [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **Add New Project** and select your `gokulavasan-portfolio` repository.
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`: (your Supabase URL)
   - `VITE_SUPABASE_ANON_KEY`: (your Supabase anon key)
5. Click **Deploy**. Vercel will build and assign you a free production domain (e.g., `gokulavasan.vercel.app`).
6. Your entire portfolio is live with continuous deployment! Every time you update content in `/admin`, the changes appear instantly on your live website.
>>>>>>> cc0db7a (feat: GOKULAVASAN cinematic portfolio with 7 scenes and admin dashboard)
