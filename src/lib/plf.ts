// Platform Library Framework - React equivalent of ExtJS plf
import React from 'react';

export interface FieldConfig {
  label: string;
  id: string;
  mandatory?: string | boolean;
  hlpLinkID?: string;
  inputFormat?: string;
  InputLength?: string;
  keyField?: string;
  Increment?: string;
  Entity?: string;
  dateid?: string;
  timeid?: string;
  tooltip?: string;
  storeId?:string
}

export interface GridColumn {
  columnname: string;
  dataname: string;
  datatype: 'string' | 'number' | 'date';
  editControl?: 'textbox' | 'combo' | 'date' | 'fileupload' | 'addDisplayOnly';
  width?: number;
  storeId?: string;
  hidden?: boolean;
  colAlign?: 'left' | 'center' | 'right';
  fileGroup?: string;
  group?: string;
  dtl?: GridColumn[];
  linkId?: string;
  linkType?: string;
  gridReport?: string;
  tooltip?: string;
  imageURL?: string;
  gridpopup?: boolean;
}

export interface GridConfig {
  title: string;
  id: string;
  widthBasis?: string;
  detail: GridColumn[];
  visibleRow?: number;
  removeAddDelete?: boolean;
  readOnly?: boolean;
  columnWidth?: number;
}

export interface SectionConfig {
  title: string;
  collapsed?: boolean;
}

export class PLF {
  public columns: number = 6;
  public components: any[] = [];

  // Field creation methods
  addText(config: FieldConfig, context?: any): any {
    return {
      type: 'FormField',
      key: config.id,
      fieldType: 'text',
      label: config.label,
      id: config.id,
      mandatory: config.mandatory === 'true' || config.mandatory === true,
      placeholder: config.label,
      maxLength: config.InputLength ? parseInt(config.InputLength) : undefined
    };
  }

  addHlpText(config: FieldConfig, context?: any): any {
    return {
      type: 'FormField',
      key: config.id,
      fieldType: 'text',
      label: config.label,
      id: config.id,
      mandatory: config.mandatory === 'true' || config.mandatory === true,
      helpButton: true,
      hlpLinkID: config.hlpLinkID,
      placeholder: config.label,
      maxLength: config.InputLength ? parseInt(config.InputLength) : undefined
    };
  }

  addDate(config: FieldConfig): any {
    return {
      type: 'FormField',
      key: config.id,
      fieldType: 'date',
      label: config.label,
      id: config.id,
      mandatory: config.mandatory === 'true' || config.mandatory === true
    };
  }

  addDateTime(config: { label: string; dateid: string; timeid: string }): any {
    return {
      type: 'FormField',
      key: `${config.dateid}_${config.timeid}`,
      fieldType: 'datetime',
      label: config.label,
      id: `${config.dateid}_${config.timeid}`,
      dateId: config.dateid,
      timeId: config.timeid
    };
  }

  addDisplayOnly(config: FieldConfig): any {
    return {
      type: 'FormField',
      key: config.id,
      fieldType: 'display',
      label: config.label,
      id: config.id
    };
  }

  addDisplayOnlyDate(config: FieldConfig): any {
    return {
      type: 'FormField',
      key: config.id,
      fieldType: 'display',
      label: config.label,
      id: config.id,
      displayType: 'date'
    };
  }

  addCombo(config: FieldConfig): any {
    return {
      type: 'FormField',
      key: config.id,
      fieldType: 'select',
      label: config.label,
      id: config.id,
      mandatory: config.mandatory === 'true' || config.mandatory === true,
      options: [] // Will be populated by store
    };
  }

   addComboWithoutStore(config: FieldConfig): any {
    return {
      type: 'FormField',
      key: config.id,
      fieldType: 'select',
      label: config.label,
      id: config.id,
      mandatory: config.mandatory === 'true' || config.mandatory === true,
      options: [] // Will be populated by store
    };
  }

  addListEdit(config: FieldConfig, context?: any): any {
    return {
      type: 'FormField',
      key: config.id,
      fieldType: 'text',
      label: config.label,
      id: config.id,
      keyField: config.keyField,
      helpButton: true
    };
  }

  addFileUpload(config: FieldConfig): any {
    return {
      type: 'FormField',
      key: config.id,
      fieldType: 'file',
      label: config.label,
      id: config.id,
      entity: config.Entity
    };
  }

  addButton(config: FieldConfig): any {
    return {
      type: 'FormButton',
      key: config.id,
      label: config.label,
      id: config.id,
      tooltip: config.tooltip
    };
  }

  addHidden(config: FieldConfig): any {
    return {
      type: 'FormField',
      key: config.id,
      fieldType: 'hidden',
      label: config.label,
      id: config.id
    };
  }

  // Layout methods
  addColumnSection(config: SectionConfig): any {
    return {
      title: config.title,
      type: 'section',
      components: [],
      add: function(components: any | any[]) {
        if (Array.isArray(components)) {
          this.components.push(...components);
        } else {
          this.components.push(components);
        }
      }
    };
  }

  addCollapseSection(config: SectionConfig): any {
    return {
      title: config.title,
      type: 'collapse',
      collapsed: config.collapsed || false,
      components: [],
      add: function(components: any | any[]) {
        if (Array.isArray(components)) {
          this.components.push(...components);
        } else {
          this.components.push(components);
        }
      }
    };
  }

  addGrid(config: GridConfig, context?: any): any {
    return {
      type: 'DataGrid',
      key: config.id,
      title: config.title,
      id: config.id,
      columns: config.detail,
      visibleRows: config.visibleRow || 5,
      readOnly: config.readOnly || false,
      removeAddDelete: config.removeAddDelete || false,
      columnWidth: config.columnWidth
    };
  }

  addStripLine(config: any): any {
    return {
      type: 'div',
      key: `stripline_${Date.now()}`,
      className: 'border-t border-gray-200 my-4'
    };
  }

  addBlankBlock(config: { columnWidth: string }): any {
    return {
      type: 'div',
      key: `blank_${Date.now()}`,
      className: 'flex-1',
      props: { style: { width: config.columnWidth } }
    };
  }

  addBlank(): any {
    return {
      type: 'blank',
      key: `blank_${Date.now()}`
    };
  }

  addSplitter = {
    type: 'div',
    key: `splitter_${Date.now()}`,
    className: 'w-px bg-gray-200 mx-4'
  };

  // Global settings
  helpVisibleRows = 10;
}

// Global plf instance
export const plf = new PLF();