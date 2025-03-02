
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart, FileText, Layers, LineChart, TrendingUp } from 'lucide-react';
import {
  companies,
  getCompetitors,
  financialDataMap,
  getComparisonData,
  Company,
  FinancialRatio
} from '@/utils/financialData';
import CompanyCard from '@/components/CompanyCard';
import AnimatedTabs from '@/components/AnimatedTabs';
import FinancialOverview from '@/components/FinancialOverview';
import RatioChart from '@/components/RatioChart';
import FinancialTable from '@/components/FinancialTable';

const CompanyComparison = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  
  const [company, setCompany] = useState<Company | null>(null);
  const [competitors, setCompetitors] = useState<Company[]>([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [comparisonData, setComparisonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) {
      navigate('/');
      return;
    }

    const foundCompany = companies.find(c => c.id === companyId);
    if (!foundCompany) {
      navigate('/');
      return;
    }

    setCompany(foundCompany);
    const availableCompetitors = getCompetitors(companyId);
    setCompetitors(availableCompetitors);
    
    // Select first competitor by default
    if (availableCompetitors.length > 0) {
      setSelectedCompetitor(availableCompetitors[0]);
      // Get comparison data
      const comparison = getComparisonData(companyId, availableCompetitors[0].id);
      setComparisonData(comparison);
    }
    
    setLoading(false);
  }, [companyId, navigate]);

  const handleCompetitorSelect = (competitor: Company) => {
    setSelectedCompetitor(competitor);
    const comparison = getComparisonData(companyId!, competitor.id);
    setComparisonData(comparison);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Group ratios by category
  const getRatiosByCategory = (
    category: 'Valuation' | 'Profitability' | 'Growth' | 'Risk' | 'Efficiency'
  ) => {
    if (!comparisonData) return [];
    
    return comparisonData.company.ratios
      .filter((ratio: FinancialRatio) => ratio.category === category)
      .map((companyRatio: FinancialRatio) => {
        const competitorRatio = comparisonData.competitor.ratios.find(
          (r: FinancialRatio) => r.name === companyRatio.name
        );
        return { companyRatio, competitorRatio };
      });
  };

  // Prepare quarterly data for the financial table
  const prepareQuarterlyData = () => {
    if (!comparisonData || !company || !selectedCompetitor) return null;
    
    const companyQuarterlyData = comparisonData.company.quarterlyData;
    const competitorQuarterlyData = comparisonData.competitor.quarterlyData;
    
    return {
      companyName: company.name,
      competitorName: selectedCompetitor.name,
      periods: companyQuarterlyData.map((d: any) => d.date),
      companyData: companyQuarterlyData,
      competitorData: competitorQuarterlyData,
      fields: [
        { key: 'revenue', label: 'Revenue' },
        { key: 'netIncome', label: 'Net Income' },
        { key: 'eps', label: 'EPS', format: (value: number) => `$${value.toFixed(2)}` },
        { key: 'ebitda', label: 'EBITDA' },
        { key: 'operatingCashFlow', label: 'Operating Cash Flow' },
        { key: 'freeCashFlow', label: 'Free Cash Flow' },
      ]
    };
  };

  // Prepare balance sheet data for the financial table
  const prepareBalanceSheetData = () => {
    if (!comparisonData || !company || !selectedCompetitor) return null;
    
    const companyBalanceSheet = comparisonData.company.balanceSheet;
    const competitorBalanceSheet = comparisonData.competitor.balanceSheet;
    
    return {
      companyName: company.name,
      competitorName: selectedCompetitor.name,
      periods: companyBalanceSheet.map((d: any) => d.date),
      companyData: companyBalanceSheet,
      competitorData: competitorBalanceSheet,
      fields: [
        { key: 'cashAndEquivalents', label: 'Cash & Equivalents' },
        { key: 'totalAssets', label: 'Total Assets' },
        { key: 'totalLiabilities', label: 'Total Liabilities' },
        { key: 'totalEquity', label: 'Total Equity' },
        { key: 'longTermDebt', label: 'Long Term Debt' },
      ]
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!company || !selectedCompetitor || !comparisonData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
          <button 
            className="text-primary hover:underline flex items-center gap-1"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const quarterlyDataForOverview = {
    companyData: comparisonData.company.quarterlyData,
    competitorData: comparisonData.competitor.quarterlyData
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      {/* Header Navigation */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-3">
          <div className="flex items-center">
            <button 
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <div className="ml-4 font-medium">Financial Comparison</div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-8">
        {/* Company Selection Area */}
        <div className="mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <h2 className="text-lg font-semibold mb-4">Selected Company</h2>
              <CompanyCard company={company} selected />
            </div>
            
            <div className="md:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Select a Competitor</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {competitors.map((competitor) => (
                  <div key={competitor.id}>
                    <CompanyCard 
                      company={competitor} 
                      selected={selectedCompetitor?.id === competitor.id}
                      onClick={() => handleCompetitorSelect(competitor)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="mb-6 animate-slide-left" style={{animationDelay: '0.2s'}}>
          <AnimatedTabs 
            tabs={[
              { id: 'overview', label: 'Overview', icon: <Layers className="h-4 w-4" /> },
              { id: 'ratios', label: 'Financial Ratios', icon: <BarChart className="h-4 w-4" /> },
              { id: 'income', label: 'Income Statement', icon: <TrendingUp className="h-4 w-4" /> },
              { id: 'balance', label: 'Balance Sheet', icon: <FileText className="h-4 w-4" /> },
            ]}
            defaultTab="overview"
            onTabChange={handleTabChange}
          />
        </div>
        
        {/* Tab Content */}
        <div className="animate-slide-right" style={{animationDelay: '0.3s'}}>
          {activeTab === 'overview' && (
            <FinancialOverview 
              company={company}
              competitor={selectedCompetitor}
              companyMetrics={comparisonData.company.metrics}
              competitorMetrics={comparisonData.competitor.metrics}
              companyRatios={comparisonData.company.ratios}
              competitorRatios={comparisonData.competitor.ratios}
              quarterlyData={quarterlyDataForOverview}
            />
          )}
          
          {activeTab === 'ratios' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RatioChart 
                companyName={company.name}
                competitorName={selectedCompetitor.name}
                ratios={getRatiosByCategory('Valuation')}
                category="Valuation"
              />
              
              <RatioChart 
                companyName={company.name}
                competitorName={selectedCompetitor.name}
                ratios={getRatiosByCategory('Profitability')}
                category="Profitability"
              />
              
              <RatioChart 
                companyName={company.name}
                competitorName={selectedCompetitor.name}
                ratios={getRatiosByCategory('Growth')}
                category="Growth"
              />
              
              <RatioChart 
                companyName={company.name}
                competitorName={selectedCompetitor.name}
                ratios={getRatiosByCategory('Risk')}
                category="Risk"
              />
              
              <div className="md:col-span-2">
                <RatioChart 
                  companyName={company.name}
                  competitorName={selectedCompetitor.name}
                  ratios={getRatiosByCategory('Efficiency')}
                  category="Efficiency"
                />
              </div>
            </div>
          )}
          
          {activeTab === 'income' && (
            <FinancialTable
              title="Income Statement"
              description="A financial statement that shows a company's revenues and expenses over a specific time period."
              data={prepareQuarterlyData() || {
                companyName: '',
                competitorName: '',
                periods: [],
                companyData: [],
                competitorData: [],
                fields: []
              }}
            />
          )}
          
          {activeTab === 'balance' && (
            <FinancialTable
              title="Balance Sheet"
              description="A financial statement that reports a company's assets, liabilities, and shareholders' equity."
              data={prepareBalanceSheetData() || {
                companyName: '',
                competitorName: '',
                periods: [],
                companyData: [],
                competitorData: [],
                fields: []
              }}
            />
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-4 bg-background">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Financial Comparison Tool
            </div>
            <div className="text-sm text-muted-foreground">
              Data for demonstration purposes only
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompanyComparison;
