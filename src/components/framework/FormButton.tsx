import React from 'react';

interface FormButtonProps {
  label: string;
  id: string;
  onClick?: () => void;
  disabled?: boolean;
  tooltip?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  className?: string;
}

const FormButton: React.FC<FormButtonProps> = ({
  label,
  id,
  onClick,
  disabled = false,
  tooltip,
  variant = 'primary',
  className = ''
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      className={`
        px-4 py-2 rounded-md font-medium text-sm transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${getVariantClasses()}
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default FormButton;