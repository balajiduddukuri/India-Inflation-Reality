import { AssetType, InflationType, TimeRange, DataPoint, ChartData } from '../types';

/**
 * ------------------------------------------------------------------
 * SIMULATION LOGIC DOCUMENTATION
 * ------------------------------------------------------------------
 * This service generates plausible synthetic financial data for the demo.
 * Since we do not have a live backend connected to NSE/MOSPI in this
 * specific build, we use a Stochastic Simulation known as:
 * 
 * Geometric Brownian Motion (GBM)
 * dS_t = μS_t dt + σS_t dW_t
 * 
 * Where:
 * - μ (Mean): The expected annualized return (Drift).
 * - σ (Vol): The annualized volatility (Standard Deviation).
 * - dW_t: A Wiener process (Random Walk).
 * 
 * The parameters below are calibrated to approximate the 10-year historical
 * behavior of Indian asset classes (approx. 2013-2023).
 * ------------------------------------------------------------------
 */

// --- Configuration Constants ---

const MONTHS_MAP: Record<TimeRange, number> = {
  [TimeRange.Y1]: 12,
  [TimeRange.Y3]: 36,
  [TimeRange.Y5]: 60,
  [TimeRange.Y10]: 120,
  [TimeRange.MAX]: 240,
};

const ASSET_CONFIG: Record<AssetType, { mean: number; vol: number }> = {
  [AssetType.NIFTY_50]: { mean: 0.12, vol: 0.15 },
  [AssetType.SENSEX]: { mean: 0.125, vol: 0.15 },
  [AssetType.GOLD]: { mean: 0.09, vol: 0.12 },
  [AssetType.FD]: { mean: 0.065, vol: 0.002 },
  [AssetType.PPF]: { mean: 0.071, vol: 0.0 },
  [AssetType.MEDIAN_SALARY]: { mean: 0.08, vol: 0.01 },
  [AssetType.CASH]: { mean: 0.0, vol: 0.0 },
};

const INFLATION_CONFIG: Record<InflationType, { baseRate: number; vol: number }> = {
  [InflationType.CPI_COMBINED]: { baseRate: 0.06, vol: 0.005 },
  [InflationType.CPI_FOOD]: { baseRate: 0.07, vol: 0.015 },
  [InflationType.CPI_FUEL]: { baseRate: 0.05, vol: 0.02 },
  [InflationType.WPI]: { baseRate: 0.04, vol: 0.01 },
  [InflationType.LIFESTYLE_METRO]: { baseRate: 0.10, vol: 0.008 },
};

/**
 * Helper for random normal distribution (Box-Muller transform).
 * Standard Math.random() is uniform (0-1). We need Gaussian (Normal) distribution
 * for realistic market returns (Bell curve).
 * 
 * @returns A number from a distribution with Mean=0, StdDev=1.
 */
const randn = () => {
  let u = 0, v = 0;
  while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

/**
 * Generates synthetic chart data using the parameters defined above.
 * 
 * Algorithm:
 * 1. Initialize Base Nominal Value (₹1L) and Base CPI (100).
 * 2. Loop through each month from Start Date to Today.
 * 3. Calculate Monthly Growth = (1 + AnnualMean)^(1/12) - 1.
 * 4. Apply Shock = RandomGaussian() * MonthlyVolatility.
 * 5. Update Cumulative Values.
 * 6. Derive Real Value = Nominal / (CPI_Current / CPI_Start).
 */
export const generateChartData = (
  asset: AssetType,
  inflation: InflationType,
  range: TimeRange
): ChartData => {
  const months = MONTHS_MAP[range] || 60;
  const data: DataPoint[] = [];
  
  const assetParams = ASSET_CONFIG[asset] || ASSET_CONFIG[AssetType.FD];
  const inflationParams = INFLATION_CONFIG[inflation] || INFLATION_CONFIG[InflationType.CPI_COMBINED];

  let currentNominal = 100000; // Start with ₹1 Lakh base
  let currentCPI = 100; // Base index
  
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() - months, 1);

  for (let i = 0; i <= months; i++) {
    const date = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
    const dateStr = date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });

    // --- Inflation Calculation ---
    // Convert annual rate to monthly geometric rate
    const monthlyInflationRate = Math.pow(1 + inflationParams.baseRate, 1/12) - 1;
    // Apply volatility shock to inflation (inflation isn't constant!)
    const inflationShock = randn() * inflationParams.vol;
    const periodInflation = Math.max(-0.01, monthlyInflationRate + inflationShock); 
    currentCPI = currentCPI * (1 + periodInflation);

    // --- Asset Value Calculation ---
    const monthlyAssetRate = Math.pow(1 + assetParams.mean, 1/12) - 1;
    let assetShock = randn() * assetParams.vol;

    // Special logic for Salary (step function simulation)
    // Salaries don't grow smoothly; they jump once a year (hike).
    if (asset === AssetType.MEDIAN_SALARY) {
      if (i > 0 && i % 12 === 0) {
        // Annual Hike month: Huge jump, no random noise in other months
        assetShock = 0.0; 
        // Hike = Mean + slight random variation (e.g., 8% +/- 2%)
        currentNominal = currentNominal * (1 + assetParams.mean + (Math.random() * 0.04 - 0.02)); 
      } else {
        // Flat nominal growth between hikes
        assetShock = 0.0; 
      }
    } else if (asset === AssetType.FD || asset === AssetType.PPF || asset === AssetType.CASH) {
       // Fixed Income / Cash: Very low volatility, smooth compounding
       currentNominal = currentNominal * (1 + monthlyAssetRate); 
    } else {
       // Market Assets (Stocks/Gold): Volatile geometric brownian motion
       currentNominal = currentNominal * (1 + monthlyAssetRate + assetShock);
    }

    // --- Real Value Calculation ---
    // Formula: Real = Nominal / (Inflation Factor)
    // If CPI goes from 100 to 106 (6% inflation), your ₹106 nominal is worth ₹100 real.
    const realValue = currentNominal / (currentCPI / 100);

    data.push({
      date: dateStr,
      nominalValue: Math.round(currentNominal),
      realValue: Math.round(realValue),
      inflationIndex: Number(currentCPI.toFixed(2)),
      assetGrowth: 0, 
      realGrowth: 0, 
    });
  }

  // --- Summary Statistics ---
  const startVal = data[0].nominalValue;
  const endVal = data[data.length - 1].nominalValue;
  const startReal = data[0].realValue;
  const endReal = data[data.length - 1].realValue;

  const totalNominalReturn = ((endVal - startVal) / startVal) * 100;
  const totalRealReturn = ((endReal - startReal) / startReal) * 100;

  // CAGR Calculation: (End/Start)^(1/Years) - 1
  const years = months / 12;
  const cagrNominal = (Math.pow(endVal / startVal, 1 / years) - 1) * 100;
  const cagrReal = (Math.pow(endReal / startReal, 1 / years) - 1) * 100;

  return {
    series: data,
    summary: {
      totalNominalReturn,
      totalRealReturn,
      cagrNominal,
      cagrReal
    }
  };
};