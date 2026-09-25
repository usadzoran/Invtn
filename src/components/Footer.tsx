import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { Send, CheckCircle2, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, navigateTo } = useAuth();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="brightness-110">
              <Logo size="md" />
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              {t('footerDesc')}
            </p>

            {/* Newsletter Input */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-200 mb-2">
                {t('footerNewsletterTitle')}
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 p-2.5 bg-emerald-950/60 border border-emerald-800/80 rounded-lg text-emerald-300 text-xs animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{t('footerSubscribeSuccess')}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="flex-1 px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <span>{t('footerSubscribeBtn')}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links Column 1: Solutions */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              {t('footerColProduct')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('home', 'features')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {t('navFeatures')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('home', 'demo')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {t('navServices')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('register')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {t('navSignUp')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('login')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {t('navSignIn')}
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Company */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              {t('footerColCompany')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('home', 'about')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {t('navAbout')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('home', 'faq')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {t('navFaq')}
                </button>
              </li>
              <li>
                <a href="#contact" className="hover:text-indigo-400 transition-colors">
                  {t('navContact')}
                </a>
              </li>
              <li>
                <span className="text-slate-600 cursor-not-allowed">
                  Careers (2026)
                </span>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Legal & Community */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              {t('footerColLegal')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#privacy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-indigo-400 transition-colors">
                  Security Standards
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-indigo-400 transition-colors">
                  Cookie Settings
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            {t('footerRights')}
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@novasphere.com"
              className="p-2 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
