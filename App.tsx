import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ChartControls from './components/ChartControls';
import InflationChart from './components/InflationChart';
import StoryBlock from './components/StoryBlock';
import InfoCard from './components/InfoCard';
import DataSourcesSection from './components/DataSourcesSection';
import Footer from './components/Footer';
import { generateChartData } from './services/mockData';
import { AssetType, InflationType, TimeRange } from './types';
import { ShoppingBasket, Landmark, TrendingDown, BookOpen } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';

const InflationApp: React.FC = () => {
  const [asset, setAsset] = useState<AssetType>(AssetType.NIFTY_50);
  const [inflation, setInflation] = useState<InflationType>(InflationType.CPI_COMBINED);
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.Y5);

  const chartData = useMemo(() => {
    return generateChartData(asset, inflation, timeRange);
  }, [asset, inflation, timeRange]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-orange-200 dark:selection:bg-amber-900">
      <Header />
      
      <main id="main-content" className="flex-grow outline-none" tabIndex={-1}>
        <Hero />

        {/* Main Chart Section */}
        <section id="chart" className="max-w-6xl mx-auto px-4 py-12 -mt-8 relative z-20">
          <ChartControls 
            asset={asset} 
            setAsset={setAsset}
            inflation={inflation} 
            setInflation={setInflation}
            timeRange={timeRange} 
            setTimeRange={setTimeRange}
          />
          
          <InflationChart data={chartData} />
          
          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <InfoCard title="What is CPI?" icon={<ShoppingBasket size={20} className="text-orange-600 dark:text-amber-500" aria-hidden="true"/>}>
              The <strong>Consumer Price Index</strong> measures the price change of a common basket of goods (food, fuel, clothing) for the average Indian household. It's the "official" inflation rate reported by MOSPI.
            </InfoCard>
            <InfoCard title="Why do I feel poorer?" icon={<TrendingDown size={20} className="text-red-600 dark:text-red-400" aria-hidden="true"/>}>
              Official CPI often underweights <strong>Lifestyle Inflation</strong>—private schooling, rent in metro cities, and healthcare costs rise much faster (10-12%) than the price of rice or wheat (6%).
            </InfoCard>
            <InfoCard title="Real Return Math" icon={<Landmark size={20} className="text-blue-600 dark:text-blue-400" aria-hidden="true"/>}>
              <strong>Real Return ≈ Nominal Return - Inflation Rate.</strong> If your Fixed Deposit gives 7% interest and inflation is 6%, your real wealth only grew by roughly 1%.
            </InfoCard>
          </div>
        </section>

        {/* Insights / Story Section with Art Fusion Grid */}
        <section id="stories" className="bg-white dark:bg-slate-900 py-20 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-12 justify-center">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <BookOpen size={24} className="text-slate-700 dark:text-slate-300" aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white tracking-tight">Common Indian Money Stories</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StoryBlock 
                title="The Salary Illusion" 
                emoji="💼"
                content="Meet Rahul. He got a 10% hike this year. But his rent in Bangalore went up 15%, and his grocery bill is up 8%. In real terms, his disposable income might have actually shrunk. When planning careers, always look at 'Real Wage Growth', not just the CTC number."
                stats={[
                  { label: 'Avg Hike', value: '8-10%', trend: 'neutral' },
                  { label: 'Real Growth', value: '< 2%', trend: 'down' }
                ]}
              />
              <StoryBlock 
                title="The 'Safe' FD Trap" 
                emoji="🏦"
                content="Generations of Indians love Fixed Deposits. But post-tax returns on FDs often fail to beat inflation. If you are in the 30% tax bracket, a 7% FD gives you ~4.9% in hand. If inflation is 6%, your purchasing power is eroding every single year."
                stats={[
                  { label: 'FD Return', value: '7.0%', trend: 'up' },
                  { label: 'Post-Tax Real', value: '-1.1%', trend: 'down' }
                ]}
              />
              <StoryBlock 
                title="Gold: The Silent Hedge" 
                emoji="👑"
                content="Gold is the ultimate safety net in India. Historically, it tracks CPI very closely over long periods (15+ years). While it doesn't create wealth like equities (no dividends), it successfully prevents wealth destruction during high inflation."
                stats={[
                  { label: 'Gold CAGR', value: '~9%', trend: 'up' },
                  { label: 'Real Growth', value: '~3%', trend: 'neutral' }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Methodology & Data Sources Section */}
        <DataSourcesSection />
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <InflationApp />
    </ThemeProvider>
  );
};

export default App;
