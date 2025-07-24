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

interface ToolbarAction {
  name: string;
  tooltip: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

interface ToolbarLink {
  name: string;
  linkid: string;
  tooltip: string;
  onClick?: () => void;
}

interface ToolbarProps {
  title: string;
  actions: ToolbarAction[];
  links?: ToolbarLink[];
  className?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ title, actions, links = [], className = '' }) => {
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
    <div className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        
        <div className="flex items-center space-x-4">
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                disabled={action.disabled}
                title={action.tooltip}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${getActionColor(action.name)}`}
              >
                {action.icon || getActionIcon(action.name)}
                <span className="ml-2">{action.name}</span>
              </button>
            ))}
          </div>

          {/* Quick Links */}
          {links.length > 0 && (
            <div className="flex items-center space-x-2 border-l border-gray-300 pl-4">
              {links.map((link, index) => (
                <button
                  key={index}
                  onClick={link.onClick}
                  title={link.tooltip}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {link.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;