import React from 'react';
import { 
  RefreshCw, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Printer, 
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { ToolbarAction, ToolbarLink } from '../../lib/plfTransScreen';

interface ToolbarProps {
  actions: ToolbarAction[];
  onActionClick?: (action: string) => void;
  className?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  actions, 
  onActionClick,
  className = '' 
}) => {
  const getActionIcon = (actionName: string) => {
    switch (actionName.toLowerCase()) {
      case 'refresh': return <RefreshCw className="w-4 h-4" />;
      case 'create': return <Plus className="w-4 h-4" />;
      case 'edit': return <Edit className="w-4 h-4" />;
      case 'delete': return <Trash2 className="w-4 h-4" />;
      case 'confirm': return <Check className="w-4 h-4" />;
      case 'short-close': return <AlertTriangle className="w-4 h-4" />;
      case 'reject': return <X className="w-4 h-4" />;
      case 'print': return <Printer className="w-4 h-4" />;
      default: return null;
    }
  };

  const getActionColor = (actionName: string) => {
    switch (actionName.toLowerCase()) {
      case 'create': return 'bg-green-600 hover:bg-green-700 text-white';
      case 'edit': return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'delete': return 'bg-red-600 hover:bg-red-700 text-white';
      case 'confirm': return 'bg-green-600 hover:bg-green-700 text-white';
      case 'short-close': return 'bg-orange-600 hover:bg-orange-700 text-white';
      case 'reject': return 'bg-red-600 hover:bg-red-700 text-white';
      case 'print': return 'bg-gray-600 hover:bg-gray-700 text-white';
      default: return 'bg-gray-600 hover:bg-gray-700 text-white';
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg z-50 ${className}`}>
      <div className="flex items-center justify-between">
        
        <div className="flex items-center space-x-4">
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => onActionClick?.(action.name)}
                title={action.tooltip}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${getActionColor(action.name)}`}
              >
                {getActionIcon(action.name)}
                <span className="ml-2">{action.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;