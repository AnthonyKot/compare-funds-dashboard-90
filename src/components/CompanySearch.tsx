
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { companies } from '@/utils/financialData';
import { useNavigate } from 'react-router-dom';

const CompanySearch = () => {
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredCompanies(companies);
    } else {
      setFilteredCompanies(
        companies.filter(
          company => 
            company.name.toLowerCase().includes(query.toLowerCase()) || 
            company.ticker.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query]);

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCompanySelect = (companyId: string) => {
    navigate(`/comparison/${companyId}`);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            placeholder="Search for a company (e.g., Apple, AAPL)"
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-background"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div 
          ref={dropdownRef}
          className="fixed mt-2 w-full bg-background border border-border rounded-xl shadow-lg overflow-hidden animate-scale-in max-h-[300px] overflow-y-auto"
          style={{ 
            zIndex: 9999,
            left: inputRef.current?.getBoundingClientRect().left,
            top: inputRef.current?.getBoundingClientRect().bottom + window.scrollY + 8,
            width: inputRef.current?.offsetWidth
          }}
        >
          {filteredCompanies.length > 0 ? (
            <ul className="divide-y divide-border">
              {filteredCompanies.map((company) => (
                <li 
                  key={company.id}
                  onClick={() => handleCompanySelect(company.id)}
                  className="flex items-center p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center mr-3 bg-background rounded-md overflow-hidden border border-border">
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      className="w-5 h-5 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{company.name}</div>
                    <div className="text-xs text-muted-foreground">{company.ticker}</div>
                  </div>
                  <div className="text-sm">
                    <span className={`font-medium ${company.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {company.priceChange >= 0 ? '+' : ''}{company.priceChangePercent.toFixed(2)}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No companies found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanySearch;
