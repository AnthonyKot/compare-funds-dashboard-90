
import React from 'react';
import { Company, formatCurrency, FinancialMetric, FinancialRatio } from '@/utils/financialData';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import MetricCard from './MetricCard';

interface FinancialOverviewProps {
  company: Company;
  competitor: Company;
  companyMetrics: FinancialMetric[];
  competitorMetrics: FinancialMetric[];
  companyRatios: FinancialRatio[];
  competitorRatios: FinancialRatio[];
  quarterlyData: {
    companyData: { date: string; revenue: number }[];
    competitorData: { date: string; revenue: number }[];
  };
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({
  company,
  competitor,
  companyMetrics,
  competitorMetrics,
  companyRatios,
  competitorRatios,
  quarterlyData
}) => {
  // Prepare chart data for revenue comparison
  const revenueData = quarterlyData.companyData.map((item, index) => ({
    date: item.date,
    [company.name]: item.revenue,
    [competitor.name]: quarterlyData.competitorData[index]?.revenue || 0
  })).reverse();

  // Group key metrics
  const keyMetrics = companyMetrics.slice(0, 4);

  // Prepare key ratios (get 1 from each category)
  const categories = ['Valuation', 'Profitability', 'Growth', 'Risk', 'Efficiency'] as const;
  const keyRatios = categories.map(category => {
    return companyRatios.find(ratio => ratio.category === category);
  }).filter(Boolean) as FinancialRatio[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Revenue Chart */}
      <div className="md:col-span-3 glass-card rounded-xl p-6">
        <h3 className="font-semibold mb-4">Quarterly Revenue Comparison</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="date" />
              <YAxis 
                tickFormatter={(value) => formatCurrency(value).replace('$', '')} 
                width={80}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                labelFormatter={(value) => `Quarter: ${value}`}
              />
              <Line 
                type="monotone" 
                dataKey={company.name} 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey={competitor.name} 
                stroke="#94a3b8" 
                strokeWidth={2} 
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="md:col-span-3">
        <h3 className="font-semibold mb-4">Key Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyMetrics.map((metric, index) => (
            <MetricCard 
              key={index} 
              metric={metric} 
              formatValue={
                metric.name === 'Market Cap' || 
                metric.name === 'Revenue (TTM)' || 
                metric.name === 'Free Cash Flow (TTM)' 
                  ? formatCurrency 
                  : metric.name === 'Dividend Yield' 
                    ? (value) => `${value.toFixed(2)}%` 
                    : undefined
              } 
            />
          ))}
        </div>
      </div>

      {/* Key Ratios */}
      <div className="md:col-span-3">
        <h3 className="font-semibold mb-4">Key Financial Ratios</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {keyRatios.map((ratio, index) => (
            <div key={index} className="glass-card rounded-xl p-4">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                {ratio.name} <span className="text-xs font-normal">({ratio.category})</span>
              </div>
              
              <div className="flex items-end gap-2">
                <div className="text-xl font-semibold">
                  {ratio.value.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  Industry: {ratio.industryAvg.toFixed(1)}
                </div>
              </div>
              
              <div className="flex items-center mt-2">
                <div className="w-full bg-muted/50 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      ratio.isHigherBetter 
                        ? ratio.value > ratio.industryAvg ? 'bg-green-500' : 'bg-red-500'
                        : ratio.value < ratio.industryAvg ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ 
                      width: `${Math.min(Math.abs(ratio.value / ratio.industryAvg) * 100, 200)}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mt-1">
                {ratio.isHigherBetter ? 'Higher is better' : 'Lower is better'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;
