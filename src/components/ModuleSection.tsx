import React from 'react';
import ModuleCard from './ModuleCard';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Module {
  onClick: () => void;
  icon: LucideIcon;
  title: string;
  description?: string;
  badge?: string;
}

interface ModuleSectionProps {
  title: string;
  modules: Module[];
  className?: string;
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const ModuleSection: React.FC<ModuleSectionProps> = ({
  title,
  modules,
  className = '',
  showPagination = false,
  currentPage = 0,
  totalPages = 0,
  onPageChange
}) => {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 p-6 ${className}`}>
      <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></div>
        {title}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {modules.map((module, index) => (
          <ModuleCard
            key={index}
            icon={module.icon}
            title={module.title}
            description={module.description}
            badge={module.badge}
            onClick={module.onClick}
          />
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange?.(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentPage ? 'bg-blue-600' : 'bg-gray-300 hover:bg-blue-400'
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleSection;
