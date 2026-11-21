import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Instagram, Youtube, Send, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Scene07Contact: React.FC = () => {
  const { settings, submitContactMessage } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: 'Wedding Film',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', project_type: 'Wedding Film', message: '' });
      } else {
        setErrorMessage(res.error || 'Failed to deliver message. Please try again or reach out directly.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please reach out via WhatsApp or email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen w-full bg-[#050505] py-28 px-4 sm:px-6 lg:px-8 select-none overflow-hidden">
      {/* Cinematic Red Rim & Floor Smoke Spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-cinema-red/15 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-[500px] h-[350px] bg-cinema-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Dramatic Closing Headline */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono tracking-[0.25em] text-cinema-red uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cinema-red animate-ping" />
            <span>SCENE 07 — CINEMATIC FINALE</span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase font-bold text-white leading-none">
            LET&apos;S CREATE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cinema-red via-cinema-orange to-red-400">
              SOMETHING
            </span>
            UNFORGETTABLE.
          </h2>

          <p className="text-neutral-400 font-sans text-sm sm:text-lg max-w-xl mx-auto mt-6 leading-relaxed">
            Ready to bring your wedding, brand commercial, music video, or creative vision to life with cinematic authority.
          </p>
        </div>

        {/* Contact Grid: Direct Reach (Left) + Interactive Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-neutral-800/80 bg-neutral-950/70 backdrop-blur-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6">
              <h3 className="font-heading text-xl uppercase tracking-wider text-white font-bold pb-4 border-b border-neutral-900">
                DIRECT CHANNELS
              </h3>

              {/* Email */}
              <a
                href={`mailto:${settings.email}`}
                className="group flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-cinema-red/50 hover:bg-neutral-900 transition-all"
              >
                <div className="p-3 rounded-xl bg-black border border-neutral-800 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-cinema-red" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                    ELECTRONIC MAIL
                  </span>
                  <span className="text-sm font-sans font-medium text-white group-hover:text-cinema-red transition-colors">
                    {settings.email}
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${settings.phone}`}
                className="group flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-cinema-red/50 hover:bg-neutral-900 transition-all"
              >
                <div className="p-3 rounded-xl bg-black border border-neutral-800 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-cinema-orange" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                    PHONE & DIRECT LINE
                  </span>
                  <span className="text-sm font-sans font-medium text-white group-hover:text-cinema-orange transition-colors">
                    {settings.phone}
                  </span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-green-500/50 hover:bg-neutral-900 transition-all"
              >
                <div className="p-3 rounded-xl bg-black border border-neutral-800 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                    WHATSAPP DIRECT CHAT
                  </span>
                  <span className="text-sm font-sans font-medium text-white group-hover:text-green-400 transition-colors">
                    Instant Messaging Available
                  </span>
                </div>
              </a>

              {/* Social Channels */}
              <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  SOCIAL HUBS
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:text-cinema-red hover:border-cinema-red/50 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={settings.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:text-cinema-red hover:border-cinema-red/50 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Submission Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-neutral-800/80 bg-neutral-950/70 backdrop-blur-xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <h3 className="font-heading text-2xl uppercase tracking-wider text-white font-bold mb-2">
                PROJECT INQUIRY FORM
              </h3>
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-8">
                DIRECT TRANSMISSION TO GOKULAVASAN
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cinema-red/20 border border-cinema-red/40 flex items-center justify-center mx-auto text-cinema-red animate-pulse">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading text-2xl font-bold uppercase text-white">
                    TRANSMISSION RECEIVED
                  </h4>
                  <p className="text-neutral-300 font-sans text-sm max-w-sm mx-auto">
                    Thank you. Gokulavasan has received your inquiry and will review your project parameters within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full border border-neutral-800 text-xs font-mono text-neutral-400 hover:text-white"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/50 border border-red-800/80 text-red-200 text-xs font-mono">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                        YOUR FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cinema-red transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cinema-red transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      PROJECT CATEGORY
                    </label>
                    <select
                      value={formData.project_type}
                      onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-cinema-red transition-colors cursor-pointer"
                    >
                      <option value="Wedding Film">Cinematic Wedding Film</option>
                      <option value="Commercial Video Editing">Commercial Video Editing</option>
                      <option value="Cinematography Shoot">Cinematography & Camera Direction</option>
                      <option value="Photography Series">Fine Art / Event Photography</option>
                      <option value="VFX Compositing">VFX & Compositing Sequence</option>
                      <option value="3D LookDev">3D Modeling & LookDev</option>
                      <option value="YouTube Production">YouTube Production & Strategy</option>
                      <option value="Other Creative Work">Other Creative Collaboration</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      PROJECT BRIEF & VISION *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your vision, timeline, shoot locations, or required post-production deliverables..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cinema-red transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-cinema-red hover:bg-red-700 text-white font-mono text-xs uppercase tracking-[0.25em] font-bold shadow-[0_0_30px_rgba(229,9,20,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING MESSAGE...</span>
                    ) : (
                      <>
                        <span>TRANSMIT INQUIRY</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
