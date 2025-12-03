/**
 * Supported Asset Classes for the simulation.
 * These represent common investment vehicles for Indian retail investors.
 */
export enum AssetType {
  /**
   * Nifty 50 Index: Represents the top 50 large-cap companies in India.
   * Proxy for broad equity market exposure.
   */
  NIFTY_50 = 'Nifty 50',
  
  /**
   * S&P BSE Sensex: Top 30 companies on BSE. Similar behavior to Nifty but different weighting.
   */
  SENSEX = 'Sensex',
  
  /**
   * Gold in INR terms. Often acts as a hedge against inflation and currency depreciation.
   * Note: This is domestic gold price, influenced by USD-INR rates and import duties.
   */
  GOLD = 'Gold (INR)',
  
  /**
   * Bank Fixed Deposits. The default savings instrument for most Indians.
   * Low volatility but often negative real returns post-tax.
   */
  FD = 'Fixed Deposit',
  
  /**
   * Public Provident Fund. Government-backed, tax-free small savings scheme.
   * Rates are set quarterly by the GoI.
   */
  PPF = 'PPF',
  
  /**
   * Median IT Salary. Represents human capital growth for white-collar workers.
   * Often grows via annual hikes (step function) rather than continuous compounding.
   */
  MEDIAN_SALARY = 'Median IT Salary',
  
  /**
   * Hard Cash. Zero nominal growth. Guarantees loss of purchasing power equal to inflation.
   */
  CASH = 'Cash (Keeping under mattress)'
}

/**
 * Different Inflation Indices to adjust against.
 * Allows comparing nominal wealth against different "baskets" of goods.
 */
export enum InflationType {
  /**
   * Headline CPI (Consumer Price Index) reported by MOSPI.
   * Includes Food, Fuel, Housing, Clothing, etc.
   */
  CPI_COMBINED = 'CPI (All India Combined)',
  
  /**
   * Food & Beverages component of CPI.
   * Relevant because food inflation in India is often higher and more volatile than core inflation.
   */
  CPI_FOOD = 'CPI (Food & Beverages)',
  
  /**
   * Fuel & Light component of CPI. Heavily influenced by global crude prices and local taxes.
   */
  CPI_FUEL = 'CPI (Fuel & Light)',
  
  /**
   * Wholesale Price Index. Tracks producer prices. 
   * Less relevant for personal finance but a leading indicator for CPI.
   */
  WPI = 'WPI (Wholesale)',
  
  /**
   * A synthetic custom index estimating inflation for metro-dwelling middle class.
   * Heavily weights Rent, Private Education, Healthcare, and Leisure which inflate faster than the official CPI basket.
   */
  LIFESTYLE_METRO = 'Metro Lifestyle Index (Est.)'
}

/**
 * Time ranges available for the chart visualization.
 */
export enum TimeRange {
  Y1 = '1Y',
  Y3 = '3Y',
  Y5 = '5Y',
  Y10 = '10Y',
  MAX = 'Max (20Y)'
}

/**
 * Represents a single point in time on the chart.
 * Used by Recharts to plot the X/Y coordinates.
 */
export interface DataPoint {
  /** Display date string (e.g., "Jan 23") used on X-Axis */
  date: string;
  
  /** 
   * The raw value of the asset in that month's currency terms. 
   * e.g., The actual balance in your bank account.
   */
  nominalValue: number;
  
  /** 
   * The purchasing power of that value adjusted to the start date's currency.
   * Formula: Nominal Value / (Current CPI / Start CPI)
   */
  realValue: number;
  
  /** The raw inflation index value (base 100 at simulation start) */
  inflationIndex: number;
  
  /** Percentage growth of asset since start (0-100 scale) */
  assetGrowth: number;
  
  /** Percentage growth of real value since start (0-100 scale) */
  realGrowth: number;
}

/**
 * Full dataset structure required by the InflationChart component.
 */
export interface ChartData {
  /** Array of monthly data points for the line chart */
  series: DataPoint[];
  
  /** High-level summary statistics for the period displayed in the header */
  summary: {
    totalNominalReturn: number;
    totalRealReturn: number;
    /** Compound Annual Growth Rate (Nominal) */
    cagrNominal: number;
    /** Compound Annual Growth Rate (Real / Inflation Adjusted) */
    cagrReal: number;
  };
}