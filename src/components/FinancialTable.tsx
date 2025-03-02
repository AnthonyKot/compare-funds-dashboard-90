
import React, { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { formatCurrency, calculatePercentChange } from '@/utils/financialData';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FinancialTableProps {
  title: string;
  description?: string;
  data: {
    companyName: string;
    competitorName: string;
    periods: string[];
    companyData: Record<string, number>[];
    competitorData: Record<string, number>[];
    fields: Array<{
      key: string;
      label: string;
      description?: string;
      format?: (value: number) => string;
    }>;
  };
}

const FinancialTable: React.FC<FinancialTableProps> = ({ 
  title,
  description,
  data
}) => {
  const [expandedField, setExpandedField] = useState<string | null>(null);

  const toggleField = (field: string) => {
    if (expandedField === field) {
      setExpandedField(null);
    } else {
      setExpandedField(field);
    }
  };

  // Calculate percent difference between company and competitor for the most recent period
  const getPercentDifference = (field: string): number => {
    const companyValue = data.companyData[0][field];
    const competitorValue = data.competitorData[0][field];
    return calculatePercentChange(companyValue, competitorValue);
  };

  return (
    <div className="glass-card rounded-xl p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-[200px]">Item</TableHead>
              {data.periods.map((period, i) => (
                <TableHead 
                  key={period} 
                  className={`text-right ${i === 0 ? 'font-medium' : ''}`}
                >
                  {period}
                </TableHead>
              ))}
              <TableHead className="text-right font-medium">
                vs. {data.competitorName}
              </TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            <TableRow className="bg-muted/20 font-medium">
              <TableCell colSpan={data.periods.length + 2}>
                {data.companyName}
              </TableCell>
            </TableRow>
            
            {data.fields.map((field) => (
              <React.Fragment key={field.key}>
                <TableRow className="hover:bg-muted/10 cursor-pointer transition-colors" onClick={() => toggleField(field.key)}>
                  <TableCell className="flex items-center gap-1">
                    {expandedField === field.key ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{field.label}</span>
                    {field.description && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help">
                              <Info className="h-3 w-3 text-muted-foreground/60" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{field.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </TableCell>
                  
                  {data.periods.map((period, i) => (
                    <TableCell key={period} className={`text-right ${i === 0 ? 'font-medium' : ''}`}>
                      {field.format 
                        ? field.format(data.companyData[i][field.key]) 
                        : formatCurrency(data.companyData[i][field.key])
                      }
                    </TableCell>
                  ))}
                  
                  <TableCell className="text-right font-medium">
                    <span className={getPercentDifference(field.key) > 0 ? 'text-green-600' : 'text-red-600'}>
                      {getPercentDifference(field.key) > 0 ? '+' : ''}
                      {getPercentDifference(field.key).toFixed(1)}%
                    </span>
                  </TableCell>
                </TableRow>
                
                {expandedField === field.key && (
                  <TableRow className="bg-muted/5">
                    <TableCell colSpan={1} className="pl-8 font-medium">
                      {data.competitorName}:
                    </TableCell>
                    {data.periods.map((period, i) => (
                      <TableCell key={period} className="text-right">
                        {field.format 
                          ? field.format(data.competitorData[i][field.key]) 
                          : formatCurrency(data.competitorData[i][field.key])
                        }
                      </TableCell>
                    ))}
                    <TableCell />
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FinancialTable;
