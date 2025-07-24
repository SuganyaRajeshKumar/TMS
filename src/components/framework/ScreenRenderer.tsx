import React from 'react';
import FormField from './FormField';
import FormButton from './FormButton';
import DataGrid from './DataGrid';
import ScreenSection from './ScreenSection';
import { plf } from '../../lib/plf';

interface ScreenRendererProps {
  sections: any[];
  formData: Record<string, any>;
  stores?: Record<string, any[]>;
  gridData?: Record<string, any[]>;
  onFormChange: (field: string, value: any) => void;
  onButtonClick: (buttonId: string) => void;
  onHelpClick: (fieldId: string) => void;
  onRowDoubleClick?: (rowData: any) => void;
  onGridLinkClick?: (linkId: string, rowData: Record<string, any>) => void;
  onGridReportClick?: (reportId: string, rowData: Record<string, any>) => void;
}

const ScreenRenderer: React.FC<ScreenRendererProps> = ({
  sections,
  formData,
  stores = {},
  gridData = {},
  onFormChange,
  onButtonClick,
  onHelpClick,
  onRowDoubleClick,
  onGridLinkClick,
  onGridReportClick
}) => {
  const [localFormData, setLocalFormData] = React.useState<Record<string, any>>(formData);
  
  // Update local form data when prop changes
  React.useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleImmediateChange = (field: string, value: any) => {
    setLocalFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderComponent = (component: any, index: number): React.ReactNode => {
    if (!component) return null;

    const key = component.key || `component_${index}`;

    switch (component.type) {
      case 'FormField':
        return (
          <FormField
            key={key}
            label={component.label}
            id={component.id}
            type={component.fieldType}
            value={localFormData[component.id] || ''}
            onChange={(value: any) => onFormChange(component.id, value)}
            onChangeImmediate={(value: any) => handleImmediateChange(component.id, value)}
            mandatory={component.mandatory}
            helpButton={component.helpButton}
            onHelpClick={component.helpButton ? () => onHelpClick(component.hlpLinkID || component.id) : undefined}
            placeholder={component.placeholder}
            maxLength={component.maxLength}
            keyField={component.keyField}
            entity={component.entity}
            dateId={component.dateId}
            timeId={component.timeId}
            displayType={component.displayType}
            options={stores[component.id] || component.options || []}
          />
        );
      
      case 'FormButton':
        return (
          <FormButton
            key={key}
            label={component.label}
            id={component.id}
            onClick={() => onButtonClick(component.id)}
            tooltip={component.tooltip}
          />
        );
      
      case 'DataGrid':
        return (
          <DataGrid
            key={key}
            title={component.title}
            id={component.id}
            columns={component.columns}
            data={gridData[component.id] || []}
            visibleRows={component.visibleRows}
            readOnly={component.readOnly}
            removeAddDelete={component.removeAddDelete}
            columnWidth={component.columnWidth}
            onRowDoubleClick={onRowDoubleClick}
            onLinkClick={onGridLinkClick}
            onReportClick={onGridReportClick}
          />
        );
      
      case 'div':
        return (
          <div
            key={key}
            className={component.className}
            style={component.props?.style}
          />
        );
      
      case 'blank':
        return <div key={key} className="flex-1" />;
      
      default:
        return null;
    }
  };

  const renderSection = (section: any, index: number) => {
    const lgCols = `lg:grid-cols-${plf.columns}`;
    if (section.type === 'section' || section.type === 'collapse') {
      return (
        <ScreenSection
          key={index}
          title={section.title}
          type={section.type}
          collapsed={section.collapsed}
        >
          {section.type === 'section' ? (
           <div className={`grid grid-cols-1 md:grid-cols-2 ${lgCols} gap-4`}>
              {section.components.map(renderComponent)}
            </div>
          ) : (
            <div className="space-y-6">
              {section.components.map((comp: any, idx: number) => {
                if (comp.type === 'section') {
                  return renderSection(comp, idx);
                }
                return renderComponent(comp, idx);
              })}
            </div>
          )}
        </ScreenSection>
      );
    }

    // Handle direct components
    return renderComponent(section, index);
  };

  return (
    <div className="space-y-6">
      {sections.map(renderSection)}
    </div>
  );
};

export default ScreenRenderer;