import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
  badge?: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick, 
  className = '',
  badge 
}) => {
  return (
    <div 
      className={`relative group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {badge && (
        <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {badge}
        </div>
      )}
      
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{title}</h3>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
    </div>
  );
};

export default ModuleCard;