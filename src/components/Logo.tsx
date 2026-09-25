import React from 'react';
import { useAuth } from '../context/AuthContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = false }) => {
  const { language, navigateTo } = useAuth();

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base font-bold',
    md: 'text-xl font-extrabold',
    lg: 'text-2xl font-black',
  };

  return (
    <button
      onClick={() => navigateTo('home')}
      className={`group inline-flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-0.5 transition-transform active:scale-95 ${className}`}
      aria-label="NovaSphere Home"
    >
      {/* Precision Vector Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-0.5 shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-shadow`}>
        <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center overflow-hidden relative">
          {/* Subtle geometric lines */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-400/20 via-transparent to-transparent" />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5/6 h-5/6 text-white transform group-hover:rotate-12 transition-transform duration-300"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Outer orbit */}
            <circle cx="12" cy="12" r="9" className="stroke-indigo-400/50" strokeDasharray="3 3" />
            {/* Dynamic geometric core */}
            <path d="M12 3a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9" className="stroke-white stroke-[2.2]" />
            <polygon points="12 2 15 8 9 8" fill="currentColor" className="text-sky-300" />
            <circle cx="12" cy="12" r="3.5" fill="currentColor" className="text-indigo-400" />
            <circle cx="12" cy="12" r="1.5" fill="white" />
          </svg>
        </div>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span className={`tracking-tight text-slate-900 ${textSizes[size]}`}>
            {language === 'ar' ? 'نوفا سفير' : 'NovaSphere'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-slate-500 hidden sm:block">
            {language === 'ar' ? 'منصة الويب الحديثة' : 'Modern Web Platform'}
          </span>
        )}
      </div>
    </button>
  );
};
