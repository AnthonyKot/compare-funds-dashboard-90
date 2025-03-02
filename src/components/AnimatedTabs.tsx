
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
}

const AnimatedTabs: React.FC<AnimatedTabsProps> = ({ 
  tabs, 
  defaultTab, 
  onTabChange 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="relative flex items-center space-x-1 overflow-x-auto thin-scrollbar pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={`relative rounded-lg px-5 py-2.5 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            activeTab === tab.id
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground/80 hover:bg-muted/40'
          }`}
        >
          <div className="flex items-center gap-2">
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </div>
          
          {activeTab === tab.id && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
              layoutId="activeTab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default AnimatedTabs;
