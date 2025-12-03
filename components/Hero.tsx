import React from 'react';
import { ArrowDown } from 'lucide-react';
import { triggerHaptic } from '../services/interaction';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-slate-50 dark:bg-slate-950 py-20 md:py-28 px-4 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 overflow-hidden">
      {/* Decorative Background Elements - Klimt Style Geometrics */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="klimt-circles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-orange-300 dark:text-amber-700" />
              <circle cx="50" cy="50" r="10" fill="currentColor" className="text-orange-100 dark:text-amber-900" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#klimt-circles)" />
        </svg>
      </div>
      
      {/* Organic Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-amber-600/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-orange-200 dark:border-amber-800/50 rounded-full shadow-sm mb-4 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span className="text-orange-800 dark:text-amber-300 text-xs font-bold uppercase tracking-widest">
            RupeeReality • Beta v1.0
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
          Is your money <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 dark:from-amber-400 dark:to-orange-500">growing</span>
            <svg className="absolute w-full h-3 bottom-1 left-0 text-orange-200 dark:text-amber-900/40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>,<br />
          or just <span className="italic font-serif font-medium text-slate-500 dark:text-slate-400">inflating?</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
          The <span className="font-serif italic text-slate-900 dark:text-white">nominal</span> numbers lie. See the <span className="bg-orange-100 dark:bg-amber-900/30 px-1 rounded text-orange-800 dark:text-amber-300 font-bold decoration-2 decoration-orange-400 underline-offset-2">real purchasing power</span> of your Salary, FD, and Gold after adjusting for lifestyle inflation.
        </p>
        
        <div className="pt-10 flex justify-center gap-4">
          <a 
            href="#chart"
            onClick={() => triggerHaptic()}
            className="group relative inline-flex items-center px-8 py-4 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 font-bold text-lg rounded-xl overflow-hidden transition-all shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-500/30"
            aria-label="Scroll down to the real returns chart"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            <span className="relative flex items-center">
              Reveal the Truth
              <ArrowDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;