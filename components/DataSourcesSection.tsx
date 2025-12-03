import React from 'react';
import { ExternalLink, Database, Calculator, ScrollText, Globe, AlertCircle } from 'lucide-react';

const sources = [
  {
    name: "Ministry of Statistics (MOSPI)",
    description: "The primary source for Consumer Price Index (CPI) data in India. We use the 'CPI Combined' (All India) figures to calculate inflation-adjusted returns.",
    url: "https://cpi.mospi.gov.in/",
    category: "Inflation"
  },
  {
    name: "National Stock Exchange (NSE)",
    description: "Source for Nifty 50 and other equity indices. Our simulation approximates the Total Return Index (TRI) which includes reinvested dividends.",
    url: "https://www.nseindia.com/",
    category: "Equities"
  },
  {
    name: "Reserve Bank of India (RBI)",
    description: "Provides historical data on Repo rates and aggregate deposit rates, which serves as the benchmark for Fixed Deposit simulations.",
    url: "https://www.rbi.org.in/",
    category: "Interest Rates"
  },
  {
    name: "India Bullion & Jewellers Assoc. (IBJA)",
    description: "Referenced for historical daily gold rates (999 purity) in INR, which is standard for tracking domestic gold price movements.",
    url: "https://ibja.co/",
    category: "Commodities"
  },
  {
    name: "Labour Bureau",
    description: "Publishes CPI for Industrial Workers (CPI-IW), often used for Dearness Allowance (DA) calculations for government employees.",
    url: "http://labourbureau.gov.in/",
    category: "Inflation"
  }
];

const DataSourcesSection: React.FC = () => {
  return (
    <section id="sources" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm mb-4 border border-slate-100 dark:border-slate-800">
            <Database size={24} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Data Sources & References</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            RupeeReality relies on official public datasets to model financial scenarios. Below are the primary sources used to calibrate our simulations.
          </p>
        </div>

        {/* Data Sources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {sources.map((source, index) => (
            <a 
              key={index}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg dark:hover:shadow-blue-900/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="inline-block px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full uppercase tracking-wide">
                  {source.category}
                </span>
                <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {source.name}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {source.description}
              </p>
            </a>
          ))}
          
          {/* Simulation Disclaimer Card */}
          <div className="bg-orange-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-orange-100 dark:border-amber-800/30 flex flex-col justify-center">
             <div className="flex items-center gap-2 mb-3 text-orange-800 dark:text-amber-500 font-bold">
                <AlertCircle size={20} />
                <span>Simulation Note</span>
             </div>
             <p className="text-sm text-orange-800/80 dark:text-amber-500/80 leading-relaxed">
                Data presented in charts is generated using a <strong>Stochastic Model (Geometric Brownian Motion)</strong> calibrated to the historical mean and volatility of the sources listed here. It is not a live data feed.
             </p>
          </div>
        </div>

        {/* Methodology Divider */}
        <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-grow"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Methodology</span>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-grow"></div>
        </div>

        {/* Methodology & Math */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* The Math */}
            <article className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
                <Calculator className="text-blue-600 dark:text-blue-400" size={24} aria-hidden="true" />
                <h4 className="font-bold text-xl text-slate-900 dark:text-white">The Mathematics</h4>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-5 font-medium">
                We define <strong>Real Value</strong> as the nominal value discounted by the cumulative inflation since the start of the investment period.
            </p>
            <div className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 p-4 rounded-xl font-mono text-sm overflow-x-auto mb-5 border border-slate-200 dark:border-slate-800">
                Real Value_t = Nominal_t / (CPI_t / CPI_start)
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Where <code>Nominal_t</code> is the asset price at time <code>t</code>, and <code>CPI_t</code> is the inflation index value at time <code>t</code>.
            </p>
            </article>

            {/* Assumptions */}
            <article className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
                <ScrollText className="text-orange-600 dark:text-amber-500" size={24} aria-hidden="true" />
                <h4 className="font-bold text-xl text-slate-900 dark:text-white">Key Assumptions</h4>
            </div>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mt-2 flex-shrink-0"></div>
                <div>
                    <strong className="text-slate-900 dark:text-slate-200">Pre-Tax Returns:</strong> All returns shown are pre-tax. Real-world returns for FDs and Salaries would be 10-30% lower depending on your tax slab.
                </div>
                </li>
                <li className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mt-2 flex-shrink-0"></div>
                <div>
                    <strong className="text-slate-900 dark:text-slate-200">Total Return Index (TRI):</strong> For Nifty/Sensex, we simulate Total Returns (Price Appreciation + Dividends reinvested).
                </div>
                </li>
                <li className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mt-2 flex-shrink-0"></div>
                <div>
                    <strong className="text-slate-900 dark:text-slate-200">Lumpsum Strategy:</strong> We assume a "Buy and Hold" strategy initiated at the start of the selected period.
                </div>
                </li>
            </ul>
            </article>
        </div>
      </div>
    </section>
  );
};

export default DataSourcesSection;
