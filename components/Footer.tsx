import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-12 mt-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-4">RupeeReality</h4>
            <p className="text-sm">
              An open-source initiative to visualize financial reality for Indians. 
              We believe in transparent data and honest money conversations.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Data Sources</h4>
            <ul className="text-sm space-y-2">
              <li><a href="https://cpi.mospi.gov.in/" className="hover:text-white transition-colors" target="_blank" rel="noreferrer">MOSPI (CPI Data)</a></li>
              <li><a href="https://www.nseindia.com/" className="hover:text-white transition-colors" target="_blank" rel="noreferrer">NSE India (Nifty 50)</a></li>
              <li><a href="https://www.rbi.org.in/" className="hover:text-white transition-colors" target="_blank" rel="noreferrer">RBI (Rates)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Disclaimer</h4>
            <p className="text-xs leading-relaxed">
              This tool is for educational purposes only. Data is simulated for demonstration and may not reflect exact historical values. 
              Past performance is not indicative of future returns. Not financial advice.
            </p>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-xs flex flex-col gap-2">
          <span>&copy; {new Date().getFullYear()} RupeeReality.</span>
          <span className="opacity-80">
            Created by <span className="text-slate-200 font-medium">Balaji Duddukuri</span>. Made with chai ☕ in Bangalore.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;