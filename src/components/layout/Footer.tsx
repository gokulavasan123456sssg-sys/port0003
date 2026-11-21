import React from 'react';
import { ArrowUp, Instagram, Youtube, Mail, Phone, MessageSquare } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { settings } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-neutral-900/80 pt-16 pb-12 overflow-hidden">
      {/* Red ambient glow on floor */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-cinema-red/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-900/80">
          {/* Column 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cinema-red shadow-[0_0_12px_#e50914]" />
              <span className="font-display tracking-[0.25em] text-2xl font-bold text-white">
                GOKULAVASAN
              </span>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-cinema-red">
              VISUAL STORYTELLER
            </p>
            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              Transforming raw ideas into cinematic experiences through rhythm, light, camera dynamics, and cutting-edge visual effects.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-4">
              DIRECTORY
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-neutral-400">
              <li>
                <a href="#gallery" className="hover:text-cinema-red transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#universe" className="hover:text-cinema-red transition-colors">
                  Creative Universe
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-cinema-red transition-colors">
                  Journey & Education
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:text-cinema-red transition-colors">
                  Mastered Tools
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-cinema-red transition-colors">
                  About Gokulavasan
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Connect */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-4">
              DIRECT REACH
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-cinema-red" />
                  <span className="truncate">{settings.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-cinema-red" />
                  <span>{settings.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-green-500" />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-3 mt-4">
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-cinema-red hover:border-cinema-red/50 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-cinema-red hover:border-cinema-red/50 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono gap-4">
          <p>© {new Date().getFullYear()} GOKULAVASAN. All rights reserved. Cinematic Portfolio Experience.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
