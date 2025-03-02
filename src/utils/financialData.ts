
export type Company = {
  id: string;
  name: string;
  ticker: string;
  logo: string;
  sector: string;
  industry: string;
  marketCap: number;
  price: number;
  priceChange: number;
  priceChangePercent: number;
};

export type FinancialMetric = {
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  changePercent?: number;
  isPositive?: boolean;
  description?: string;
};

export type FinancialRatio = {
  name: string;
  category: 'Valuation' | 'Profitability' | 'Growth' | 'Risk' | 'Efficiency';
  value: number;
  industryAvg: number;
  description: string;
  isHigherBetter: boolean;
};

export type FinancialData = {
  companyId: string;
  quarterlyData: {
    date: string;
    revenue: number;
    netIncome: number;
    eps: number;
    ebitda: number;
    operatingCashFlow: number;
    freeCashFlow: number;
  }[];
  balanceSheet: {
    date: string;
    cashAndEquivalents: number;
    totalAssets: number;
    totalLiabilities: number;
    totalEquity: number;
    longTermDebt: number;
  }[];
  ratios: FinancialRatio[];
  metrics: FinancialMetric[];
};

// Mock Companies
export const companies: Company[] = [
  {
    id: '1',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    marketCap: 2850000000000,
    price: 185.92,
    priceChange: 1.28,
    priceChangePercent: 0.69,
  },
  {
    id: '2',
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    sector: 'Technology',
    industry: 'Software',
    marketCap: 2830000000000,
    price: 420.45,
    priceChange: 2.31,
    priceChangePercent: 0.55,
  },
  {
    id: '3',
    name: 'Alphabet Inc.',
    ticker: 'GOOGL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    sector: 'Technology',
    industry: 'Internet Services',
    marketCap: 1740000000000,
    price: 138.72,
    priceChange: -0.68,
    priceChangePercent: -0.49,
  },
  {
    id: '4',
    name: 'Amazon.com Inc.',
    ticker: 'AMZN',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    sector: 'Consumer Cyclical',
    industry: 'Internet Retail',
    marketCap: 1680000000000,
    price: 181.43,
    priceChange: 0.98,
    priceChangePercent: 0.54,
  },
  {
    id: '5',
    name: 'Samsung Electronics Co.',
    ticker: 'SSNLF',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    marketCap: 390000000000,
    price: 56.28,
    priceChange: -0.72,
    priceChangePercent: -1.26,
  },
];

// Financial data by company
export const financialDataMap: Record<string, FinancialData> = {
  '1': { // Apple
    companyId: '1',
    quarterlyData: [
      { date: '2023-Q4', revenue: 119685, netIncome: 33915, eps: 2.18, ebitda: 46289, operatingCashFlow: 31947, freeCashFlow: 29043 },
      { date: '2023-Q3', revenue: 95465, netIncome: 26313, eps: 1.67, ebitda: 41423, operatingCashFlow: 28765, freeCashFlow: 26082 },
      { date: '2023-Q2', revenue: 94836, netIncome: 24923, eps: 1.58, ebitda: 39556, operatingCashFlow: 28566, freeCashFlow: 25763 },
      { date: '2023-Q1', revenue: 117154, netIncome: 29998, eps: 1.89, ebitda: 45037, operatingCashFlow: 34014, freeCashFlow: 30165 },
      { date: '2022-Q4', revenue: 116801, netIncome: 29999, eps: 1.88, ebitda: 44886, operatingCashFlow: 30395, freeCashFlow: 25358 },
    ],
    balanceSheet: [
      { date: '2023-Q4', cashAndEquivalents: 33828, totalAssets: 352583, totalLiabilities: 287414, totalEquity: 65169, longTermDebt: 95281 },
      { date: '2023-Q3', cashAndEquivalents: 34355, totalAssets: 335033, totalLiabilities: 262553, totalEquity: 72480, longTermDebt: 96826 },
      { date: '2023-Q2', cashAndEquivalents: 28408, totalAssets: 336255, totalLiabilities: 264847, totalEquity: 71408, longTermDebt: 98959 },
      { date: '2023-Q1', cashAndEquivalents: 33828, totalAssets: 335998, totalLiabilities: 262429, totalEquity: 73569, longTermDebt: 99632 },
      { date: '2022-Q4', cashAndEquivalents: 23646, totalAssets: 352755, totalLiabilities: 302083, totalEquity: 50672, longTermDebt: 98959 },
    ],
    ratios: [
      { name: 'P/E Ratio', category: 'Valuation', value: 28.3, industryAvg: 25.2, description: 'Price to Earnings ratio', isHigherBetter: false },
      { name: 'P/S Ratio', category: 'Valuation', value: 7.1, industryAvg: 5.3, description: 'Price to Sales ratio', isHigherBetter: false },
      { name: 'P/B Ratio', category: 'Valuation', value: 35.4, industryAvg: 8.7, description: 'Price to Book ratio', isHigherBetter: false },
      { name: 'ROE', category: 'Profitability', value: 143.8, industryAvg: 31.2, description: 'Return on Equity', isHigherBetter: true },
      { name: 'Net Margin', category: 'Profitability', value: 25.3, industryAvg: 17.8, description: 'Net Profit Margin', isHigherBetter: true },
      { name: 'Gross Margin', category: 'Profitability', value: 44.3, industryAvg: 41.2, description: 'Gross Profit Margin', isHigherBetter: true },
      { name: 'Revenue Growth', category: 'Growth', value: 2.1, industryAvg: 9.8, description: 'Year-over-Year Revenue Growth', isHigherBetter: true },
      { name: 'EPS Growth', category: 'Growth', value: 3.8, industryAvg: 8.9, description: 'Year-over-Year EPS Growth', isHigherBetter: true },
      { name: 'D/E Ratio', category: 'Risk', value: 1.7, industryAvg: 0.8, description: 'Debt to Equity Ratio', isHigherBetter: false },
      { name: 'Current Ratio', category: 'Risk', value: 0.94, industryAvg: 1.5, description: 'Current Assets / Current Liabilities', isHigherBetter: true },
      { name: 'Asset Turnover', category: 'Efficiency', value: 0.8, industryAvg: 0.9, description: 'Revenue / Average Total Assets', isHigherBetter: true },
      { name: 'Inventory Turnover', category: 'Efficiency', value: 38.7, industryAvg: 10.3, description: 'COGS / Average Inventory', isHigherBetter: true },
    ],
    metrics: [
      { name: 'Market Cap', value: 2850000000000, description: 'Total market value of a company\'s outstanding shares of stock' },
      { name: 'Revenue (TTM)', value: 383000000000, previousValue: 370000000000, change: 13000000000, changePercent: 3.5, isPositive: true, description: 'Trailing Twelve Months Revenue' },
      { name: 'EPS (TTM)', value: 6.14, previousValue: 5.89, change: 0.25, changePercent: 4.2, isPositive: true, description: 'Trailing Twelve Months Earnings Per Share' },
      { name: 'Dividend Yield', value: 0.55, previousValue: 0.62, change: -0.07, changePercent: -11.3, isPositive: false, description: 'Annual dividend per share / price per share' },
      { name: 'Free Cash Flow (TTM)', value: 99000000000, previousValue: 90000000000, change: 9000000000, changePercent: 10, isPositive: true, description: 'Operating Cash Flow - Capital Expenditures' },
    ]
  },
  '3': { // Google
    companyId: '3',
    quarterlyData: [
      { date: '2023-Q4', revenue: 86310, netIncome: 23664, eps: 1.89, ebitda: 32975, operatingCashFlow: 28665, freeCashFlow: 20238 },
      { date: '2023-Q3', revenue: 76693, netIncome: 19690, eps: 1.55, ebitda: 29105, operatingCashFlow: 24179, freeCashFlow: 17536 },
      { date: '2023-Q2', revenue: 74604, netIncome: 18367, eps: 1.44, ebitda: 29272, operatingCashFlow: 28466, freeCashFlow: 21829 },
      { date: '2023-Q1', revenue: 69787, netIncome: 15051, eps: 1.17, ebitda: 21091, operatingCashFlow: 23503, freeCashFlow: 17207 },
      { date: '2022-Q4', revenue: 76048, netIncome: 13624, eps: 1.05, ebitda: 20871, operatingCashFlow: 23649, freeCashFlow: 16007 },
    ],
    balanceSheet: [
      { date: '2023-Q4', cashAndEquivalents: 110914, totalAssets: 393630, totalLiabilities: 119961, totalEquity: 273669, longTermDebt: 13241 },
      { date: '2023-Q3', cashAndEquivalents: 99856, totalAssets: 379541, totalLiabilities: 118598, totalEquity: 260943, longTermDebt: 14683 },
      { date: '2023-Q2', cashAndEquivalents: 118298, totalAssets: 376514, totalLiabilities: 128936, totalEquity: 247578, longTermDebt: 14724 },
      { date: '2023-Q1', cashAndEquivalents: 108947, totalAssets: 356979, totalLiabilities: 120623, totalEquity: 236356, longTermDebt: 14698 },
      { date: '2022-Q4', cashAndEquivalents: 89015, totalAssets: 335731, totalLiabilities: 107389, totalEquity: 228342, longTermDebt: 14701 },
    ],
    ratios: [
      { name: 'P/E Ratio', category: 'Valuation', value: 24.7, industryAvg: 25.2, description: 'Price to Earnings ratio', isHigherBetter: false },
      { name: 'P/S Ratio', category: 'Valuation', value: 5.6, industryAvg: 5.3, description: 'Price to Sales ratio', isHigherBetter: false },
      { name: 'P/B Ratio', category: 'Valuation', value: 6.3, industryAvg: 8.7, description: 'Price to Book ratio', isHigherBetter: false },
      { name: 'ROE', category: 'Profitability', value: 25.6, industryAvg: 31.2, description: 'Return on Equity', isHigherBetter: true },
      { name: 'Net Margin', category: 'Profitability', value: 23.8, industryAvg: 17.8, description: 'Net Profit Margin', isHigherBetter: true },
      { name: 'Gross Margin', category: 'Profitability', value: 55.6, industryAvg: 41.2, description: 'Gross Profit Margin', isHigherBetter: true },
      { name: 'Revenue Growth', category: 'Growth', value: 13.5, industryAvg: 9.8, description: 'Year-over-Year Revenue Growth', isHigherBetter: true },
      { name: 'EPS Growth', category: 'Growth', value: 73.6, industryAvg: 8.9, description: 'Year-over-Year EPS Growth', isHigherBetter: true },
      { name: 'D/E Ratio', category: 'Risk', value: 0.05, industryAvg: 0.8, description: 'Debt to Equity Ratio', isHigherBetter: false },
      { name: 'Current Ratio', category: 'Risk', value: 2.10, industryAvg: 1.5, description: 'Current Assets / Current Liabilities', isHigherBetter: true },
      { name: 'Asset Turnover', category: 'Efficiency', value: 0.82, industryAvg: 0.9, description: 'Revenue / Average Total Assets', isHigherBetter: true },
      { name: 'Inventory Turnover', category: 'Efficiency', value: 12.7, industryAvg: 10.3, description: 'COGS / Average Inventory', isHigherBetter: true },
    ],
    metrics: [
      { name: 'Market Cap', value: 1740000000000, description: 'Total market value of a company\'s outstanding shares of stock' },
      { name: 'Revenue (TTM)', value: 307394000000, previousValue: 282836000000, change: 24558000000, changePercent: 8.7, isPositive: true, description: 'Trailing Twelve Months Revenue' },
      { name: 'EPS (TTM)', value: 6.05, previousValue: 4.56, change: 1.49, changePercent: 32.7, isPositive: true, description: 'Trailing Twelve Months Earnings Per Share' },
      { name: 'Dividend Yield', value: 0, previousValue: 0, change: 0, changePercent: 0, isPositive: false, description: 'Annual dividend per share / price per share' },
      { name: 'Free Cash Flow (TTM)', value: 76810000000, previousValue: 65000000000, change: 11810000000, changePercent: 18.2, isPositive: true, description: 'Operating Cash Flow - Capital Expenditures' },
    ]
  },
  '5': { // Samsung
    companyId: '5',
    quarterlyData: [
      { date: '2023-Q4', revenue: 67780, netIncome: 5310, eps: 0.78, ebitda: 10540, operatingCashFlow: 15640, freeCashFlow: 5430 },
      { date: '2023-Q3', revenue: 70980, netIncome: 9390, eps: 1.37, ebitda: 14760, operatingCashFlow: 16890, freeCashFlow: 7820 },
      { date: '2023-Q2', revenue: 59200, netIncome: 4330, eps: 0.63, ebitda: 8120, operatingCashFlow: 13260, freeCashFlow: 3450 },
      { date: '2023-Q1', revenue: 63750, netIncome: 4450, eps: 0.65, ebitda: 9860, operatingCashFlow: 10120, freeCashFlow: 2380 },
      { date: '2022-Q4', revenue: 70460, netIncome: 9530, eps: 1.39, ebitda: 14890, operatingCashFlow: 19420, freeCashFlow: 9750 },
    ],
    balanceSheet: [
      { date: '2023-Q4', cashAndEquivalents: 25670, totalAssets: 340520, totalLiabilities: 97460, totalEquity: 243060, longTermDebt: 17890 },
      { date: '2023-Q3', cashAndEquivalents: 24120, totalAssets: 337980, totalLiabilities: 98750, totalEquity: 239230, longTermDebt: 16950 },
      { date: '2023-Q2', cashAndEquivalents: 26540, totalAssets: 332650, totalLiabilities: 95670, totalEquity: 236980, longTermDebt: 17230 },
      { date: '2023-Q1', cashAndEquivalents: 23870, totalAssets: 331290, totalLiabilities: 96540, totalEquity: 234750, longTermDebt: 18450 },
      { date: '2022-Q4', cashAndEquivalents: 28430, totalAssets: 328760, totalLiabilities: 96370, totalEquity: 232390, longTermDebt: 17670 },
    ],
    ratios: [
      { name: 'P/E Ratio', category: 'Valuation', value: 19.1, industryAvg: 25.2, description: 'Price to Earnings ratio', isHigherBetter: false },
      { name: 'P/S Ratio', category: 'Valuation', value: 1.5, industryAvg: 5.3, description: 'Price to Sales ratio', isHigherBetter: false },
      { name: 'P/B Ratio', category: 'Valuation', value: 1.6, industryAvg: 8.7, description: 'Price to Book ratio', isHigherBetter: false },
      { name: 'ROE', category: 'Profitability', value: 9.7, industryAvg: 31.2, description: 'Return on Equity', isHigherBetter: true },
      { name: 'Net Margin', category: 'Profitability', value: 9.1, industryAvg: 17.8, description: 'Net Profit Margin', isHigherBetter: true },
      { name: 'Gross Margin', category: 'Profitability', value: 30.7, industryAvg: 41.2, description: 'Gross Profit Margin', isHigherBetter: true },
      { name: 'Revenue Growth', category: 'Growth', value: -3.8, industryAvg: 9.8, description: 'Year-over-Year Revenue Growth', isHigherBetter: true },
      { name: 'EPS Growth', category: 'Growth', value: -43.9, industryAvg: 8.9, description: 'Year-over-Year EPS Growth', isHigherBetter: true },
      { name: 'D/E Ratio', category: 'Risk', value: 0.07, industryAvg: 0.8, description: 'Debt to Equity Ratio', isHigherBetter: false },
      { name: 'Current Ratio', category: 'Risk', value: 2.62, industryAvg: 1.5, description: 'Current Assets / Current Liabilities', isHigherBetter: true },
      { name: 'Asset Turnover', category: 'Efficiency', value: 0.77, industryAvg: 0.9, description: 'Revenue / Average Total Assets', isHigherBetter: true },
      { name: 'Inventory Turnover', category: 'Efficiency', value: 5.8, industryAvg: 10.3, description: 'COGS / Average Inventory', isHigherBetter: true },
    ],
    metrics: [
      { name: 'Market Cap', value: 390000000000, description: 'Total market value of a company\'s outstanding shares of stock' },
      { name: 'Revenue (TTM)', value: 261710000000, previousValue: 272390000000, change: -10680000000, changePercent: -3.9, isPositive: false, description: 'Trailing Twelve Months Revenue' },
      { name: 'EPS (TTM)', value: 3.43, previousValue: 6.11, change: -2.68, changePercent: -43.9, isPositive: false, description: 'Trailing Twelve Months Earnings Per Share' },
      { name: 'Dividend Yield', value: 2.08, previousValue: 1.95, change: 0.13, changePercent: 6.7, isPositive: true, description: 'Annual dividend per share / price per share' },
      { name: 'Free Cash Flow (TTM)', value: 19080000000, previousValue: 38970000000, change: -19890000000, changePercent: -51.0, isPositive: false, description: 'Operating Cash Flow - Capital Expenditures' },
    ]
  }
};

// Get competitors for a company
export const getCompetitors = (companyId: string): Company[] => {
  // Return all companies except the one selected
  return companies.filter(company => company.id !== companyId);
};

// Format large numbers in a readable way
export const formatCurrency = (value: number): string => {
  if (value >= 1000000000000) {
    return `$${(value / 1000000000000).toFixed(2)}T`;
  } else if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
};

// Format percentages
export const formatPercent = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

// Calculate the percent difference between two values
export const calculatePercentChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
};

// Get financial data for comparison
export const getComparisonData = (
  companyId: string,
  competitorId: string
): { company: FinancialData; competitor: FinancialData } | null => {
  const companyData = financialDataMap[companyId];
  const competitorData = financialDataMap[competitorId];
  
  if (!companyData || !competitorData) {
    return null;
  }
  
  return { company: companyData, competitor: competitorData };
};
