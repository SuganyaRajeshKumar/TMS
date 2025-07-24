import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X, Upload, ExternalLink, FileText, Printer, Map } from 'lucide-react';
import { GridColumn } from '../../lib/plf';

interface DataGridProps {
  title: string;
  id: string;
  columns: GridColumn[];
  data?: Record<string, any>[];
  onDataChange?: (data: Record<string, any>[]) => void;
  readOnly?: boolean;
  removeAddDelete?: boolean;
  visibleRows?: number;
  className?: string;
  columnWidth?: number;
  onRowDoubleClick?: (rowData: Record<string, any>) => void;
  onLinkClick?: (linkId: string, rowData: Record<string, any>) => void;
  onReportClick?: (reportId: string, rowData: Record<string, any>) => void;
}

const DataGrid: React.FC<DataGridProps> = ({
  title,
  id,
  columns,
  data = [],
  onDataChange,
  readOnly = false,
  removeAddDelete = false,
  visibleRows = 5,
  className = '',
  columnWidth,
  onRowDoubleClick,
  onLinkClick,
  onReportClick
}) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editData, setEditData] = useState<Record<string, any>>({});
  const [localGridData, setLocalGridData] = useState<Record<string, any>[]>(data);

  // Update local grid data when prop changes
  React.useEffect(() => {
    console.log(`DataGrid ${id}: Received data update`, data);
    setLocalGridData(data);
  }, [data, id]);

  const visibleColumns = columns.filter(col => !col.hidden);

  const handleAddRow = () => {
    const newRow = columns.reduce((acc, col) => {
      acc[col.dataname] = '';
      return acc;
    }, {} as Record<string, any>);
    
    const newData = [...localGridData, newRow];
    setLocalGridData(newData);
    onDataChange?.(newData);
  };

  const handleDeleteRow = (index: number) => {
    const newData = localGridData.filter((_, i) => i !== index);
    setLocalGridData(newData);
    onDataChange?.(newData);
  };

  const handleEditRow = (index: number) => {
    setEditingRow(index);
    setEditData({ ...localGridData[index] });
  };

  const handleSaveRow = () => {
    if (editingRow !== null) {
      const newData = [...localGridData];
      newData[editingRow] = editData;
      setLocalGridData(newData);
      onDataChange?.(newData);
      setEditingRow(null);
      setEditData({});
    }
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditData({});
  };

  const handleCellChange = (dataname: string, value: any) => {
    setEditData(prev => ({ ...prev, [dataname]: value }));
  };

  const getColumnWidth = (column: GridColumn, data: any[]) => {
    if (column.width) return `${column.width}px`;
    
    // Auto-calculate width based on content
    const headerLength = column.columnname.length;
    const maxContentLength = data.reduce((max, row) => {
      const content = String(row[column.dataname] || '');
      return Math.max(max, content.length);
    }, 0);
    
    const calculatedWidth = Math.max(headerLength, maxContentLength) * 8 + 32; // 8px per char + padding
    return `${Math.min(calculatedWidth, 300)}px`; // Max 300px
  };

  const getLinkIcon = (linkId: string) => {
    switch (linkId) {
      case 'journeyPlanScr':
      case 'journeyPlan':
        return <ExternalLink className="w-4 h-4" />;
      case 'PrintWaybill':
      case 'PrintInspectionVech':
      case 'PrintJourneyReport':
        return <Printer className="w-4 h-4" />;
      case 'maplink':
        return <Map className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleLinkClick = (column: GridColumn, row: Record<string, any>) => {
    if (column.linkId) {
      if (column.gridReport) {
        // Handle report links
        onReportClick?.(column.gridReport, row);
      } else if (column.linkType === 'DYN' && row[column.dataname]) {
        // Dynamic link - use the value from the row
        onLinkClick?.(row[column.dataname], row);
      } else {
        // Static link
        onLinkClick?.(column.linkId, row);
      }
    }
  };

  const renderCell = (row: Record<string, any>, column: GridColumn, rowIndex: number) => {
    const isEditing = editingRow === rowIndex;
    const value = isEditing ? editData[column.dataname] : (row[column.dataname] || '');

    // Handle link columns
    if (column.linkId && !isEditing) {
      const displayValue = column.linkType === 'DYN' ? value : column.columnname;
      const alignClass = column.colAlign === 'right' ? 'text-right' : 
                        column.colAlign === 'center' ? 'text-center' : 'text-left';
      
      return (
        <div className={`px-3 py-2 ${alignClass}`}>
          <button
            onClick={() => handleLinkClick(column, row)}
            className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            title={column.tooltip || `Click to ${column.linkId}`}
          >
            {getLinkIcon(column.linkId)}
            <span className="text-sm">{displayValue}</span>
          </button>
        </div>
      );
    }

    if (!isEditing || column.editControl === 'addDisplayOnly') {
      const alignClass = column.colAlign === 'right' ? 'text-right' : 
                        column.colAlign === 'center' ? 'text-center' : 'text-left';
      return (
        <div className={`px-3 py-2 text-sm text-gray-900 ${alignClass}`}>
          {value || '-'}
        </div>
      );
    }

    const inputClasses = "w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500";

    switch (column.editControl) {
      case 'combo':
        return (
          <select
            value={value}
            onChange={(e) => handleCellChange(column.dataname, e.target.value)}
            className={inputClasses}
          >
            <option value="">Select...</option>
            {/* Options would be populated from storeId */}
          </select>
        );
      
      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleCellChange(column.dataname, e.target.value)}
            className={inputClasses}
          />
        );
      
      case 'fileupload':
        return (
          <div className="relative">
            <input
              type="file"
              onChange={(e) => handleCellChange(column.dataname, e.target.files?.[0]?.name || '')}
              className={`${inputClasses} file:mr-2 file:py-0 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700`}
            />
            <Upload className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        );
      
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleCellChange(column.dataname, e.target.value)}
            className={inputClasses}
          />
        );
    }
  };

  const gridStyle = columnWidth ? { width: `${columnWidth * 100}%` } : {};

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`} style={gridStyle}>
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
                  key={column.dataname}
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 last:border-r-0"
                  style={{ 
                    width: getColumnWidth(column, localGridData),
                    minWidth: column.width ? `${column.width}px` : '100px'
                  }}
                >
                  {column.columnname}
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
            {localGridData.slice(0, visibleRows).map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="hover:bg-gray-50 cursor-pointer"
                onDoubleClick={() => onRowDoubleClick?.(row)}
              >
                {visibleColumns.map((column) => (
                  <td key={column.dataname} className="border-b border-gray-200 border-r border-gray-200 last:border-r-0">
                    {renderCell(row, column, rowIndex)}
                  </td>
                ))}
                {!readOnly && !removeAddDelete && (
                  <td className="px-3 py-2 border-b border-gray-200 border-r border-gray-200 last:border-r-0">
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

      {localGridData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
};

export default DataGrid;