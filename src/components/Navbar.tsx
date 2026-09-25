import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { SupabaseModal } from './SupabaseModal';
import {
  Globe,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  ChevronDown,
  Database,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, language, setLanguage, currentPage, navigateTo, logout, supabaseStatus, t } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const navLinks = [
    { label: t('navHome'), page: 'home' as const, anchor: 'hero' },
    { label: t('navFeatures'), page: 'home' as const, anchor: 'features' },
    { label: t('navServices'), page: 'home' as const, anchor: 'demo' },
    { label: t('navAbout'), page: 'home' as const, anchor: 'about' },
    { label: t('navFaq'), page: 'home' as const, anchor: 'faq' },
  ];

  const handleNavClick = (page: 'home' | 'login' | 'register' | 'dashboard', anchor?: string) => {
    navigateTo(page, anchor);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Zone 1: Brand Zone */}
          <div className="shrink-0 flex items-center">
            <Logo size="md" showTagline={true} />
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.anchor}
                onClick={() => handleNavClick(link.page, link.anchor)}
                className="relative py-1 text-slate-600 hover:text-indigo-600 transition-colors whitespace-nowrap group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-200" />
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions & Auth */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Supabase Status Button */}
            <button
              onClick={() => setSupabaseModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/70 rounded-lg transition-colors whitespace-nowrap"
              title="Supabase PostgreSQL Database Settings"
            >
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Supabase</span>
              <span className={`w-1.5 h-1.5 rounded-full ${supabaseStatus.isConnected ? 'bg-emerald-500 animate-ping' : 'bg-emerald-600'}`} />
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors border border-slate-200/60"
              title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'EN' : 'العربية'}</span>
            </button>

            {/* If user is logged in */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all focus:outline-none"
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="text-xs font-medium text-slate-800 max-w-[100px] truncate hidden sm:inline-block">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute end-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    </div>
                    
                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-start"
                    >
                      <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                      <span>{t('navDashboard')}</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('home')}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors text-start"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span>{t('navHome')}</span>
                    </button>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors text-start"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('navLogout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Logged Out Actions */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    currentPage === 'login'
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100/70'
                  }`}
                >
                  {t('navSignIn')}
                </button>

                <button
                  onClick={() => handleNavClick('register')}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-sm shadow-indigo-600/30 rounded-lg transition-all whitespace-nowrap"
                >
                  {t('navSignUp')}
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-lg">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.anchor}
                  onClick={() => handleNavClick(link.page, link.anchor)}
                  className="text-start px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setSupabaseModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200"
              >
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'ar' ? 'إعدادات قاعدة بيانات Supabase' : 'Supabase Database Settings'}</span>
                </div>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded">Setup</span>
              </button>

              {currentUser ? (
                <>
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-800 bg-slate-50 rounded-lg"
                  >
                    <span>{t('navDashboard')}</span>
                    <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <span>{t('navLogout')}</span>
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleNavClick('login')}
                    className="w-full py-2.5 text-center text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    {t('navSignIn')}
                  </button>
                  <button
                    onClick={() => handleNavClick('register')}
                    className="w-full py-2.5 text-center text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
                  >
                    {t('navSignUp')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Supabase Status & Instructions Modal */}
      <SupabaseModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
      />
    </>
  );
};

