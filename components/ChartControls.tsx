import React from 'react';
import { AssetType, InflationType, TimeRange } from '../types';
import { Wallet, TrendingUp, Calendar, ArrowDownCircle } from 'lucide-react';
import { triggerHaptic } from '../services/interaction';

interface ChartControlsProps {
  asset: AssetType;
  setAsset: (a: AssetType) => void;
  inflation: InflationType;
  setInflation: (i: InflationType) => void;
  timeRange: TimeRange;
  setTimeRange: (t: TimeRange) => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({
  asset,
  setAsset,
  inflation,
  setInflation,
  timeRange,
  setTimeRange,
}) => {
  
  const handleAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    triggerHaptic();
    setAsset(e.target.value as AssetType);
  };

  const handleInflationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    triggerHaptic();
    setInflation(e.target.value as InflationType);
  };

  const handleTimeChange = (t: TimeRange) => {
    triggerHaptic();
    setTimeRange(t);
  };

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/50 transition-colors duration-300 relative overflow-hidden"
      role="search"
      aria-label="Chart Parameters"
    >
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-orange-500 to-amber-500 opacity-80"></div>

      <div className="space-y-3">
        <label htmlFor="asset-select" className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          <Wallet size={14} aria-hidden="true" className="text-slate-400" />
          Asset Class
        </label>
        <div className="relative group">
          <select 
            id="asset-select"
            value={asset} 
            onChange={handleAssetChange}
            className="appearance-none block w-full pl-4 pr-10 py-4 text-base font-bold border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer shadow-sm"
          >
            {Object.values(AssetType).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500 dark:text-slate-400 group-hover:text-orange-600 transition-colors">
             <ArrowDownCircle size={18} />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="inflation-select" className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          <TrendingUp size={14} aria-hidden="true" className="text-slate-400" />
          Adjusted For
        </label>
        <div className="relative group">
          <select 
            id="inflation-select"
            value={inflation} 
            onChange={handleInflationChange}
            className="appearance-none block w-full pl-4 pr-10 py-4 text-base font-bold border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer shadow-sm"
          >
            {Object.values(InflationType).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500 dark:text-slate-400 group-hover:text-red-500 transition-colors">
             <ArrowDownCircle size={18} />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <span className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest" id="time-range-label">
          <Calendar size={14} aria-hidden="true" className="text-slate-400" />
          Time Period
        </span>
        <div className="flex gap-2 h-[58px] items-center bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl" role="group" aria-labelledby="time-range-label">
          {Object.values(TimeRange).map((t) => (
            <button
              key={t}
              onClick={() => handleTimeChange(t)}
              aria-pressed={timeRange === t}
              className={`flex-1 h-full text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                timeRange === t 
                ? 'bg-white dark:bg-slate-700 text-orange-600 dark:text-amber-400 shadow-md transform scale-[1.02] border border-orange-100 dark:border-amber-500/20' 
                : 'text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              {t.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartControls;