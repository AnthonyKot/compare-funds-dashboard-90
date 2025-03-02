
import React from 'react';
import CompanySearch from '@/components/CompanySearch';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/60 z-0" />
        
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNODAgMEw4MCAxNjBNMCA4MEwxNjAgODBNNDAgMEw0MCAxNjBNMTIwIDAgTDEyMCAxNjBNMCA0MEwxNjAgNDBNMCAxMjBMMTYwIDEyMCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1vcGFjaXR5PSIwLjgiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] bg-center"
        />
        
        <div className="container max-w-5xl relative z-10 py-20">
          <div className="text-center mb-8 stagger-children">
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              Intelligent Stock Analysis
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance">
              Compare Financial Performance<br className="hidden md:block" /> in a New Light
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Make informed investment decisions by comparing companies side-by-side. Analyze key metrics, financial ratios, and growth trends with clarity and precision.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mb-12 fade-in" style={{animationDelay: '0.4s'}}>
            <CompanySearch />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 slide-up" style={{animationDelay: '0.6s'}}>
            <div className="glass-card p-6 rounded-xl hover:shadow-md transition-all">
              <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                  <path d="M21 21H3M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2M13 13l4-4m0 0h-4m4 0v4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Comprehensive Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Compare financial statements, ratios, and metrics side-by-side with interactive visualizations.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover:shadow-md transition-all">
              <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Clear Insights</h3>
              <p className="text-muted-foreground text-sm">
                Understand complex financial data through intuitive visualizations that highlight key differences.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover:shadow-md transition-all">
              <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                  <path d="M10.1 2.182a1 1 0 0 1 1.8 0l1.81 3.682a1 1 0 0 0 .753.548l4.052.59a1 1 0 0 1 .555 1.705l-2.932 2.856a1 1 0 0 0-.288.885l.692 4.038a1 1 0 0 1-1.45 1.054L11 16.014l-3.623 1.916a1 1 0 0 1-1.45-1.054l.692-4.038a1 1 0 0 0-.288-.885L3.4 8.711a1 1 0 0 1 .554-1.705l4.053-.591a1 1 0 0 0 .753-.548L10.1 2.182Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Investment Decisions</h3>
              <p className="text-muted-foreground text-sm">
                Make confident investment choices by evaluating companies against their competitors.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center slide-up" style={{animationDelay: '0.8s'}}>
            <p className="text-muted-foreground mb-4">
              Start your analysis by searching for a company above
            </p>
            <div className="flex justify-center items-center gap-2 text-primary animate-float">
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border py-6 bg-background">
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

export default Index;
