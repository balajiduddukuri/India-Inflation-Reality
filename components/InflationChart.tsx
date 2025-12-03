import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ChartData } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface InflationChartProps {
  data: ChartData;
}

interface TooltipPayloadItem {
  value: number;
  name: string;
  color: string;
  dataKey?: string;
  payload?: any;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CHART_THEME = {
  light: {
    grid: '#f1f5f9',
    axisText: '#64748b', // Slate-500
    nominalLine: '#2563eb', // Blue-600
    realLine: '#d97706', // Amber-600
  },
  dark: {
    grid: '#334155',
    axisText: '#94a3b8', // Slate-400
    nominalLine: '#60a5fa', // Blue-400
    realLine: '#fbbf24', // Amber-400
  }
};

/**
 * Custom Tooltip for Recharts.
 * Adapts to dark mode via standard Tailwind dark: classes.
 */
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-xl text-sm z-50 ring-1 ring-slate-900/5 dark:ring-white/10">
        <p className="font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider mb-2">{label}</p>
        {payload.map((p, index) => (
          <div key={index} className="flex items-center justify-between gap-6 mb-2 last:mb-0">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: p.color }}></div>
               <span className="text-slate-600 dark:text-slate-300 font-medium text-xs">{p.name}</span>
            </div>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              ₹{p.value.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const InflationChart: React.FC<InflationChartProps> = ({ data }) => {
  const { series, summary } = data;
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const colors = isDark ? CHART_THEME.dark : CHART_THEME.light;

  // Axis Scaling
  const allValues = series.flatMap(d => [d.nominalValue, d.realValue]);
  const minValue = Math.min(...allValues) * 0.9; 
  const maxValue = Math.max(...allValues) * 1.1; 

  const formatYAxis = (tick: number) => {
    if (tick >= 10000000) return `${(tick / 10000000).toFixed(1)}Cr`;
    if (tick >= 100000) return `${(tick / 100000).toFixed(1)}L`;
    if (tick >= 1000) return `${(tick / 1000).toFixed(0)}k`;
    return tick.toString();
  };

  return (
    <div 
      className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-10 transition-colors duration-300"
      role="region" 
      aria-label="Interactive Inflation Chart"
    >
      {/* Screen Reader Summary */}
      <div className="sr-only">
        <p>Chart showing Nominal versus Real value over time.</p>
        <p>Total Nominal Return is {summary.totalNominalReturn.toFixed(1)}%.</p>
        <p>Total Real Return after inflation is {summary.totalRealReturn.toFixed(1)}%.</p>
      </div>

      {/* Visual Summary Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 pb-8 border-b border-slate-100 dark:border-slate-800/50">
        <div>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Nominal Return</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
              {summary.totalNominalReturn > 0 ? '+' : ''}{summary.totalNominalReturn.toFixed(1)}%
            </p>
          </div>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1">CAGR: {summary.cagrNominal.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Real Return (Adj.)</p>
          <div className="flex items-baseline gap-2">
             <p className={`text-3xl font-extrabold tracking-tight ${summary.totalRealReturn >= 0 ? 'text-green-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
              {summary.totalRealReturn > 0 ? '+' : ''}{summary.totalRealReturn.toFixed(1)}%
            </p>
          </div>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1">CAGR: {summary.cagrReal.toFixed(1)}%</p>
        </div>
        <div className="hidden md:block pl-4 border-l border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Final Nominal Value</p>
          <p className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200">
            ₹{series[series.length - 1].nominalValue.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="hidden md:block pl-4 border-l border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Final Real Value</p>
          <p className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200">
            ₹{series[series.length - 1].realValue.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[450px] w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={colors.grid} />
            
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11, fill: colors.axisText, fontWeight: 600, fontFamily: 'Inter' }} 
              tickLine={false}
              axisLine={{ stroke: colors.grid }}
              minTickGap={40}
              dy={15}
            />
            
            <YAxis 
              domain={[minValue, maxValue]} 
              tickFormatter={formatYAxis}
              tick={{ fontSize: 11, fill: colors.axisText, fontWeight: 600, fontFamily: 'Inter' }}
              tickLine={false}
              axisLine={false}
              width={45}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: colors.grid, strokeWidth: 2, strokeDasharray: '5 5' }} />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            
            <Line 
              name="Nominal Value (On Paper)"
              type="monotone" 
              dataKey="nominalValue" 
              stroke={colors.nominalLine} 
              strokeWidth={3} 
              dot={false} 
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
            
            {/* Real Value Line with Dashed Pattern for accessibility/color-blindness */}
            <Line 
              name="Real Value (Purchasing Power)"
              type="monotone" 
              dataKey="realValue" 
              stroke={colors.realLine} 
              strokeWidth={3} 
              strokeDasharray="6 6" 
              dot={false}
              activeDot={{ r: 8, stroke: colors.realLine, strokeWidth: 4, fill: isDark ? '#0f172a' : '#fff' }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 bg-orange-50 dark:bg-amber-900/20 px-4 py-2 rounded-full border border-orange-100 dark:border-amber-800/30">
          <span className="text-xs text-orange-800 dark:text-amber-400 font-semibold">
            ℹ️ The <span className="underline decoration-dashed decoration-amber-500 underline-offset-4">dashed orange line</span> represents your actual wealth after inflation.
          </span>
        </div>
      </div>
    </div>
  );
};

export default InflationChart;