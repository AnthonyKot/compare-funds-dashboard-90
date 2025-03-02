
import React from 'react';
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FinancialMetric } from '@/utils/financialData';

interface MetricCardProps {
  metric: FinancialMetric;
  formatValue?: (value: number) => string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  metric, 
  formatValue = (value) => value.toLocaleString() 
}) => {
  return (
    <div className="glass-card rounded-xl p-4 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{metric.name}</h3>
        {metric.description && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help">
                  <HelpCircle className="h-4 w-4 text-muted-foreground/60" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{metric.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      <div className="font-semibold text-xl">{formatValue(metric.value)}</div>
      
      {(metric.change !== undefined && metric.changePercent !== undefined) && (
        <div className="flex items-center mt-1">
          {metric.isPositive ? (
            <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
          )}
          <span className={`text-xs font-medium ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {metric.changePercent >= 0 ? '+' : ''}{metric.changePercent.toFixed(2)}% from previous
          </span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
