import React from 'react';
import { TrendingUp, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { triggerHaptic } from '../services/interaction';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    triggerHaptic();
    toggleTheme();
  };

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:font-bold focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-lg text-white shadow-lg shadow-orange-600/20">
              <TrendingUp size={20} aria-hidden="true" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
              Rupee<span className="text-orange-600 dark:text-amber-500">Reality</span>
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-700 dark:text-slate-300" aria-label="Main Navigation">
              <a href="#chart" className="hover:text-orange-600 dark:hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1">The Chart</a>
              <a href="#stories" className="hover:text-orange-600 dark:hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1">Insights</a>
              <a href="#sources" className="hover:text-orange-600 dark:hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1">Data Sources</a>
            </nav>

            <button 
              onClick={handleThemeToggle}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-amber-400 hover:bg-orange-100 dark:hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
            </button>

            <button className="md:hidden text-slate-700 dark:text-slate-300 p-2" aria-label="Open Menu">
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;