import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Film } from 'lucide-react';
import { SoundToggle } from '../common/SoundToggle';

interface NavbarProps {
  onAdminClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAdminClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#gallery' },
    { label: 'UNIVERSE', href: '#universe' },
    { label: 'JOURNEY', href: '#timeline' },
    { label: 'TOOLS', href: '#tools' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-neutral-900/80 py-3'
            : 'bg-gradient-to-b from-black/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand mark */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="Gokulavasan Portfolio Home"
          >
            <div className="w-2 h-2 rounded-full bg-cinema-red shadow-[0_0_10px_#e50914] group-hover:scale-125 transition-transform duration-300" />
            <span className="font-display tracking-[0.2em] text-lg font-bold text-white group-hover:text-cinema-red transition-colors duration-300">
              GOKULAVASAN
            </span>
            <span className="hidden md:inline-block text-[11px] font-mono tracking-widest text-neutral-500 pl-2 border-l border-neutral-800">
              FILMMAKER & VFX
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase font-mono tracking-[0.2em] text-neutral-400 hover:text-white transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cinema-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions: Sound, Admin, Mobile Toggle */}
          <div className="flex items-center gap-3">
            <SoundToggle />

            {/* Admin access button */}
            <button
              onClick={onAdminClick}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900/80 rounded-lg border border-neutral-800/60 transition-all duration-200"
              title="Admin Portal"
              aria-label="Open Admin Dashboard"
            >
              <Shield className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center px-6 lg:hidden">
          <nav className="flex flex-col items-center gap-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-heading tracking-widest text-neutral-300 hover:text-cinema-red transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-6 border-t border-neutral-800/80 w-48 flex justify-center">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAdminClick();
                }}
                className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 hover:text-cinema-red"
              >
                <Shield className="w-4 h-4" />
                ADMIN PORTAL
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
