import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FilmGrain } from './components/common/FilmGrain';
import { Scene01Hero } from './components/scenes/Scene01Hero';
import { Scene02Universe } from './components/scenes/Scene02Universe';
import { Scene03Timeline } from './components/scenes/Scene03Timeline';
import { Scene04Gallery } from './components/scenes/Scene04Gallery';
import { Scene05Tools } from './components/scenes/Scene05Tools';
import { Scene06About } from './components/scenes/Scene06About';
import { Scene07Contact } from './components/scenes/Scene07Contact';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { useAuth } from './context/AuthContext';

export function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  // Sync route with window.location pathname and hash
  useEffect(() => {
    const checkRoute = () => {
      const isPathAdmin = window.location.pathname.startsWith('/admin');
      const isHashAdmin = window.location.hash.startsWith('#/admin') || window.location.hash === '#admin';
      setIsAdminRoute(isPathAdmin || isHashAdmin);
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setIsAdminRoute(true);
  };

  const navigateToSite = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-cinema-red border-t-transparent animate-spin" />
      </div>
    );
  }

  // Admin Route View
  if (isAdminRoute) {
    return (
      <div className="bg-[#050505] min-h-screen text-white">
        <FilmGrain />
        {isAuthenticated ? (
          <AdminDashboard onBackToSite={navigateToSite} />
        ) : (
          <AdminLogin onBackToSite={navigateToSite} />
        )}
      </div>
    );
  }

  // Public Cinematic Portfolio View
  return (
    <div className="relative bg-[#050505] text-white selection:bg-cinema-red selection:text-white min-h-screen">
      {/* 35mm film grain overlay */}
      <FilmGrain />

      {/* Main navigation */}
      <Navbar onAdminClick={navigateToAdmin} />

      {/* Main flow */}
      <main>
        {/* Scene 01: Hero / Cinematic Opening */}
        <Scene01Hero />

        {/* Scene 02: My Creative Universe */}
        <Scene02Universe />

        {/* Scene 03: Journey & Timeline */}
        <Scene03Timeline />

        {/* Scene 04: Project Gallery */}
        <Scene04Gallery />

        {/* Scene 05: Creative Tools */}
        <Scene05Tools />

        {/* Scene 06: About Me */}
        <Scene06About />

        {/* Scene 07: Contact Finale */}
        <Scene07Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
