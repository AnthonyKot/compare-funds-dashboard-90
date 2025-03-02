
import React, { useState } from 'react';
import { Bar, BarChart, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { HelpCircle } from 'lucide-react';
import { 
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FinancialRatio } from '@/utils/financialData';

interface RatioChartProps {
  companyName: string;
  competitorName: string;
  ratios: {
    companyRatio: FinancialRatio;
    competitorRatio: FinancialRatio;
  }[];
  category: 'Valuation' | 'Profitability' | 'Growth' | 'Risk' | 'Efficiency';
}

const RatioChart: React.FC<RatioChartProps> = ({ 
  companyName,
  competitorName,
  ratios,
  category
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const data = ratios.map(({ companyRatio, competitorRatio }) => {
    const isHigherBetter = companyRatio.isHigherBetter;
    const companyIsBetter = isHigherBetter 
      ? companyRatio.value > competitorRatio.value
      : companyRatio.value < competitorRatio.value;
    
    return {
      name: companyRatio.name,
      [companyName]: companyRatio.value,
      [competitorName]: competitorRatio.value,
      industryAvg: companyRatio.industryAvg,
      description: companyRatio.description,
      isHigherBetter,
      companyIsBetter
    };
  });

  // Define color scheme based on category
  const getColors = () => {
    const baseColors = {
      Valuation: { company: '#34d399', competitor: '#d4d4d8' },
      Profitability: { company: '#60a5fa', competitor: '#d4d4d8' },
      Growth: { company: '#818cf8', competitor: '#d4d4d8' },
      Risk: { company: '#f87171', competitor: '#d4d4d8' },
      Efficiency: { company: '#fbbf24', competitor: '#d4d4d8' }
    };
    
    return baseColors[category];
  };

  const colors = getColors();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const ratio = data.find(d => d.name === label);
      return (
        <div className="bg-background p-3 rounded-md border border-border shadow-lg">
          <p className="font-medium text-sm mb-2">{label}</p>
          <p className="text-xs text-muted-foreground mb-2">{ratio?.description}</p>
          <div className="text-xs mb-1">
            <span className="font-medium">{companyName}: </span> 
            <span className={ratio?.companyIsBetter ? 'text-green-600' : 'text-foreground'}>
              {payload[0].value.toFixed(2)}
            </span>
          </div>
          <div className="text-xs mb-1">
            <span className="font-medium">{competitorName}: </span>
            <span className={!ratio?.companyIsBetter ? 'text-green-600' : 'text-foreground'}>
              {payload[1].value.toFixed(2)}
            </span>
          </div>
          <div className="text-xs">
            <span className="font-medium">Industry Avg: </span>
            <span>{ratio?.industryAvg.toFixed(2)}</span>
          </div>
          <div className="text-xs mt-2 text-muted-foreground">
            {ratio?.isHigherBetter ? 'Higher is better' : 'Lower is better'}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="font-semibold">{category} Ratios</h3>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help inline-flex ml-1">
                  <HelpCircle className="h-4 w-4 text-muted-foreground/60" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Financial ratios measuring {category.toLowerCase()} performance</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 20, bottom: 10 }}
            barGap={4}
            onMouseMove={(e) => {
              if (e.activeLabel) {
                setHoveredItem(e.activeLabel);
              }
            }}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis 
              dataKey="name" 
              type="category" 
              scale="band" 
              tick={{ fontSize: 12 }}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" />
            <Bar dataKey={companyName} name={companyName} barSize={20}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={hoveredItem === entry.name ? colors.company : `${colors.company}CC`}
                  className="transition-colors duration-200"
                />
              ))}
            </Bar>
            <Bar dataKey={competitorName} name={competitorName} barSize={20}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={hoveredItem === entry.name ? colors.competitor : `${colors.competitor}CC`}
                  className="transition-colors duration-200"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RatioChart;
