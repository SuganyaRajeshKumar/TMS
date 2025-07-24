import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ScreenSectionProps {
  title: string;
  children: React.ReactNode;
  type?: 'section' | 'collapse';
  collapsed?: boolean;
  className?: string;
}

const ScreenSection: React.FC<ScreenSectionProps> = ({
  title,
  children,
  type = 'section',
  collapsed = false,
  className = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  if (type === 'section') {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        {title && (
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{title}</h2>
        )}
        {children}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      
      {!isCollapsed && (
        <div className="border-t border-gray-200 p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default ScreenSection;