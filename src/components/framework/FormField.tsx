import React from 'react';
import { Calendar, Search, Upload, Clock } from 'lucide-react';

interface FormFieldProps {
  label: string;
  id: string;
  type?: 'text' | 'date' | 'datetime' | 'select' | 'display' | 'file' | 'hidden';
  value?: string;
  onChange?: (value: string) => void;
  onChangeImmediate?: (value: string) => void;
  onEnter?: (value: string) => void;
  options?: { value: string; label: string }[];
  mandatory?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  helpButton?: boolean;
  onHelpClick?: () => void;
  maxLength?: number;
  keyField?: string;
  entity?: string;
  dateId?: string;
  timeId?: string;
  displayType?: string;
  onDoubleClick?: () => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type = 'text',
  value = '',
  onChange,
  options = [],
  mandatory = false,
  disabled = false,
  placeholder,
  className = '',
  helpButton = false,
  onHelpClick,
  maxLength,
  keyField,
  entity,
  dateId,
  timeId,
  displayType,
  onDoubleClick,
  onChangeImmediate,
  onEnter
}) => {
  const [localValue, setLocalValue] = React.useState(value || '');
  
  // Update local value when prop value changes
  React.useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleChange = (newValue: string, immediate = false) => {
    setLocalValue(newValue);
    
    if (immediate) {
      onChangeImmediate?.(newValue);
    }
    
    // Debounce the main onChange for performance
    const timeoutId = setTimeout(() => {
      onChange?.(newValue);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter?.(localValue);
    }
  };

  const formatDateValue = (dateValue: string) => {
    if (!dateValue) return '';
    
    // If it's already in dd-mm-yyyy format, return as is
    if (dateValue.match(/^\d{2}-\d{2}-\d{4}$/)) {
      return dateValue;
    }
    
    // If it's in yyyy-mm-dd format (HTML date input), convert to dd-mm-yyyy
    if (dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateValue.split('-');
      return `${day}-${month}-${year}`;
    }
    
    return dateValue;
  };

  const convertToInputFormat = (dateValue: string) => {
    if (!dateValue) return '';
    
    // If it's in dd-mm-yyyy format, convert to yyyy-mm-dd for HTML input
    if (dateValue.match(/^\d{2}-\d{2}-\d{4}$/)) {
      const [day, month, year] = dateValue.split('-');
      return `${year}-${month}-${day}`;
    }
    
    return dateValue;
  };
  const baseInputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm";
  const disabledClasses = "bg-gray-50 text-gray-500 cursor-not-allowed";

  const renderInput = () => {
    switch (type) {
      case 'hidden':
        return <input type="hidden" id={id} value={localValue} />;
      
      case 'display':
        return (
          <div className={`${baseInputClasses} ${disabledClasses} min-h-[38px] flex items-center`}>
            {displayType === 'date' && localValue ? formatDateValue(localValue) : (localValue || '-')}
          </div>
        );
      
      case 'select':
        return (
          <select
            id={id}
            value={localValue}
            onChange={(e) => handleChange(e.target.value, true)}
            disabled={disabled}
            className={`${baseInputClasses} ${disabled ? disabledClasses : ''}`}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'date':
        return (
          <div className="relative">
            <input
              type="date"
              id={id}
              value={convertToInputFormat(localValue)}
              onChange={(e) => {
                const formattedDate = formatDateValue(e.target.value);
                handleChange(formattedDate, true);
              }}
              disabled={disabled}
              className={`${baseInputClasses} ${disabled ? disabledClasses : ''}`}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        );
      
      case 'datetime':
        return (
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <input
                type="date"
                id={dateId}
                value={convertToInputFormat(localValue?.split(' ')[0] || '')}
                onChange={(e) => {
                  const time = localValue?.split(' ')[1] || '';
                  const formattedDate = formatDateValue(e.target.value);
                  handleChange(`${formattedDate} ${time}`.trim(), true);
                }}
                disabled={disabled}
                className={`${baseInputClasses} ${disabled ? disabledClasses : ''}`}
              />
              <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <input
                type="time"
                id={timeId}
                value={localValue?.split(' ')[1] || ''}
                onChange={(e) => {
                  const date = localValue?.split(' ')[0] || '';
                  handleChange(`${date} ${e.target.value}`.trim(), true);
                }}
                disabled={disabled}
                className={`${baseInputClasses} ${disabled ? disabledClasses : ''}`}
              />
              <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        );
      
      case 'file':
        return (
          <div className="relative">
            <input
              type="file"
              id={id}
              onChange={(e) => handleChange(e.target.files?.[0]?.name || '', true)}
              disabled={disabled}
              className={`${baseInputClasses} ${disabled ? disabledClasses : ''} file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
            />
            <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        );
      
      default:
        return (
          <div className="relative">
            <input
              type="text"
              id={id}
              value={localValue}
              onChange={(e) => handleChange(e.target.value)}
              onKeyPress={handleKeyPress}
              onDoubleClick={onDoubleClick}
              disabled={disabled}
              placeholder={placeholder}
              maxLength={maxLength}
              className={`${baseInputClasses} ${disabled ? disabledClasses : ''} ${helpButton ? 'pr-10' : ''}`}
            />
            {helpButton && (
              <button
                type="button"
                onClick={onHelpClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>
        );
    }
  };

  if (type === 'hidden') {
    return renderInput();
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {mandatory && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
    </div>
  );
};

export default FormField;