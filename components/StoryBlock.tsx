import React from 'react';

interface StoryBlockProps {
  title: string;
  emoji: string;
  content: string;
  stats?: { label: string; value: string; trend: 'up' | 'down' | 'neutral' }[];
}

const StoryBlock: React.FC<StoryBlockProps> = ({ title, emoji, content, stats }) => {
  return (
    <article className="group relative h-full flex flex-col transition-all duration-500 hover:-translate-y-2">
      {/* Card Background with 'Gold Leaf' Art Fusion */}
      <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-amber-500/20 shadow-lg dark:shadow-black/50 overflow-hidden">
        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
        
        {/* Gradient Accents */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-100/50 to-transparent dark:from-amber-600/10 dark:to-transparent rounded-bl-full transition-transform duration-700 group-hover:scale-110"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/50 to-transparent dark:from-indigo-600/10 dark:to-transparent rounded-tr-full transition-transform duration-700 group-hover:scale-110"></div>
      </div>

      {/* Content */}
      <div className="relative p-8 flex flex-col h-full z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-[4px_4px_10px_rgba(0,0,0,0.05)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-700 text-3xl transform group-hover:rotate-6 transition-transform duration-300">
            <span role="img" aria-label={title} className="filter drop-shadow-sm">{emoji}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-amber-50 leading-tight">
            {title}
          </h3>
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 mb-8 flex-grow leading-relaxed font-medium text-[0.95rem]">
          {content}
        </p>
        
        {stats && (
          <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
            {stats.map((stat, idx) => (
              <div key={idx} className="group/stat">
                <p className="text-[10px] font-bold text-slate-400 dark:text-amber-500/60 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className={`text-lg font-bold font-mono tracking-tight ${
                  stat.trend === 'down' 
                    ? 'text-red-600 dark:text-red-400' 
                    : stat.trend === 'up' 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-slate-800 dark:text-amber-100'
                }`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Hover Golden Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-200 dark:group-hover:border-amber-500/30 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
    </article>
  );
};

export default StoryBlock;