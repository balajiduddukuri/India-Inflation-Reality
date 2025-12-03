import React from 'react';
import { Info } from 'lucide-react';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children, icon }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-orange-200 dark:hover:border-amber-900/50">
      <div className="flex items-center gap-3 mb-3">
        {icon || <Info size={20} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <div className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
