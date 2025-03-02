
import React from 'react';
import { ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import { Company } from '@/utils/financialData';
import { formatCurrency } from '@/utils/financialData';

interface CompanyCardProps {
  company: Company;
  selected?: boolean;
  onClick?: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, selected = false, onClick }) => {
  return (
    <div 
      className={`glass-card rounded-xl p-5 transition-all duration-300 hover:shadow-md cursor-pointer ${
        selected ? 'ring-1 ring-primary/50 shadow-md' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 flex items-center justify-center mr-3 bg-background rounded-lg overflow-hidden border border-border shadow-sm">
            <img 
              src={company.logo} 
              alt={company.name} 
              className="w-8 h-8 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }} 
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{company.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium bg-muted/70 px-2 py-0.5 rounded">{company.ticker}</span>
              <span className="text-xs text-muted-foreground">{company.sector}</span>
            </div>
          </div>
        </div>
        <a 
          href={`https://finance.yahoo.com/quote/${company.ticker}`} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">Current Price</span>
          <span className="font-medium">${company.price.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">Change</span>
          <div className="flex items-center">
            {company.priceChange >= 0 ? (
              <ChevronUp className="h-4 w-4 text-green-600" />
            ) : (
              <ChevronDown className="h-4 w-4 text-red-600" />
            )}
            <span className={`ml-1 font-medium ${company.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {company.priceChange.toFixed(2)} ({company.priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">Market Cap</span>
          <span className="font-medium">{formatCurrency(company.marketCap)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">Industry</span>
          <span className="font-medium text-sm truncate">{company.industry}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
