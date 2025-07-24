import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';

interface GridColumn {
  key: string;
  title: string;
  dataType: 'string' | 'number' | 'date' | 'select';
  width?: number;
  editControl?: 'textbox' | 'combo' | 'date' | 'fileupload' | 'addDisplayOnly';
  options?: { value: string; label: string }[];
  hidden?: boolean;
  align?: 'left' | 'center' | 'right';
}

interface DataGridProps {
  title: string;
  columns: GridColumn[];
  data: Record<string, any>[];
  onDataChange?: (data: Record<string, any>[]) => void;
  readOnly?: boolean;
  removeAddDelete?: boolean;
  visibleRows?: number;
  className?: string;
}

const DataGrid: React.FC<DataGridProps> = ({
  title,
  columns,
  data,
  onDataChange,
  readOnly = false,
  removeAddDelete = false,
  visibleRows = 5,
  className = ''
}) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editData, setEditData] = useState<Record<string, any>>({});

  const visibleColumns = columns.filter(col => !col.hidden);

  const handleAddRow = () => {
    const newRow = columns.reduce((acc, col) => {
      acc[col.key] = '';
      return acc;
    }, {} as Record<string, any>);
    
    const newData = [...data, newRow];
    onDataChange?.(newData);
  };

  const handleDeleteRow = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    onDataChange?.(newData);
  };

  const handleEditRow = (index: number) => {
    setEditingRow(index);
    setEditData({ ...data[index] });
  };

  const handleSaveRow = () => {
    if (editingRow !== null) {
      const newData = [...data];
      newData[editingRow] = editData;
      onDataChange?.(newData);
      setEditingRow(null);
      setEditData({});
    }
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditData({});
  };

  const handleCellChange = (key: string, value: any) => {
    setEditData(prev => ({ ...prev, [key]: value }));
  };

  const renderCell = (row: Record<string, any>, column: GridColumn, rowIndex: number) => {
    const isEditing = editingRow === rowIndex;
    const value = isEditing ? editData[column.key] : row[column.key];

    if (!isEditing || column.editControl === 'addDisplayOnly') {
      return (
        <div className={`px-3 py-2 text-sm text-gray-900 ${column.align === 'right' ? 'text-right' : column.align === 'center' ? 'text-center' : 'text-left'}`}>
          {value || '-'}
        </div>
      );
    }

    switch (column.editControl) {
      case 'combo':
        return (
          <select
            value={value}
            onChange={(e) => handleCellChange(column.key, e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            {column.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleCellChange(column.key, e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
          />
        );
      
      case 'fileupload':
        return (
          <input
            type="file"
            onChange={(e) => handleCellChange(column.key, e.target.files?.[0]?.name || '')}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 file:mr-2 file:py-0 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700"
          />
        );
      
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleCellChange(column.key, e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
          />
        );
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {!readOnly && !removeAddDelete && (
          <div className="flex space-x-2">
            <button
              onClick={handleAddRow}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ width: column.width ? `${column.width}px` : 'auto' }}
                >
                  {column.title}
                </th>
              ))}
              {!readOnly && !removeAddDelete && (
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.slice(0, visibleRows).map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {visibleColumns.map((column) => (
                  <td key={column.key} className="border-b border-gray-200">
                    {renderCell(row, column, rowIndex)}
                  </td>
                ))}
                {!readOnly && !removeAddDelete && (
                  <td className="px-3 py-2 border-b border-gray-200">
                    {editingRow === rowIndex ? (
                      <div className="flex space-x-1">
                        <button
                          onClick={handleSaveRow}
                          className="p-1 text-green-600 hover:text-green-800"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-1 text-gray-600 hover:text-gray-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEditRow(rowIndex)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRow(rowIndex)}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
};

export default DataGrid;