// Base Transaction Screen - React equivalent of ExtJS plfTransScreen
import React from 'react';
import { cuetrans_common_fn } from './cuetrans_common_fn';

export interface ToolbarAction {
  name: string;
  tooltip: string;
}

export interface ToolbarLink {
  name: string;
  linkid: string;
  tooltip: string;
}

export interface EventHandler {
  controlid: string;
  tasktype: string;
  action?: string;
  input: string[];
  service: string;
  methodName: string;
  filename?: string;
}

export interface ScreenMode {
  [modeName: string]: {
    enableAll: boolean;
    except: string[];
  };
}

export interface ScreenLink {
  [linkId: string]: {
    dest: string;
    hdr: Array<{ src: string; dest: string }>;
    grid: Array<{ src: string; dest: string }>;
  };
}

export interface HelpLink {
  [helpId: string]: {
    hlpType: string;
    hlpScreen: string;
    send: Array<{ parent: string; child: string; direct?: string }>;
    receive: Array<{ parent: string; child: string }>;
  };
}

export class PlfTransScreen {
  public screenName: string = '';
  public toolbarSectionFlag: boolean = false;
  public hlpSectionFlag: boolean = false;
  public toolbarActions: ToolbarAction[] = [];
  public toolbarLinks: ToolbarLink[] = [];
  public keyFields: string[] = [];
  public eventHandlers: EventHandler[] = [];
  public screenModes: ScreenMode = {};
  public screenLinks: ScreenLink = {};
  public hlpLinks: HelpLink = {};
  public gridPopupLinks: ScreenLink = {};

  public dataHistorySectionFlag: boolean = false;
  public hlpSearchGridPtr: any = null;
  public ptrMainSection: any = {
    components: [],
    add: function (component: any) {
      if (Array.isArray(component)) {
        this.components.push(...component);
      } else {
        this.components.push(component);
      }
    }
  };

  startPainting(): void {
    // Initialize the screen painting process
    //console.log('Starting screen painting...');
  }

  initComponent(): void {
    // Override in child classes
  }

  callParent(args: any[]): void {
    // React equivalent of ExtJS callParent
    //console.log('callParent called with:', args);
  }

  // Event handling methods
  handleToolbarClick(action: string): void {
    const handler = this.eventHandlers.find(
      h => h.tasktype === 'toolbarclick' && h.action === action
    );
    if (handler) {
      this.executeEventHandler(handler);
    }
  }

  handleFieldChange(fieldId: string, value: any): void {
    // Update internal form data
    this.setFieldValue(fieldId, value);

    const handler = this.eventHandlers.find(
      h => h.controlid === fieldId && h.tasktype === 'onenter'
    );
    if (handler) {
      this.executeEventHandler(handler);
    }
  }

  handleButtonClick(buttonId: string): void {
    const handler = this.eventHandlers.find(
      h => h.controlid === buttonId && h.tasktype === 'btnclick'
    );
    if (handler) {
      this.executeEventHandler(handler);
    }
  }

  executeEventHandler(handler: EventHandler): void {
    console.log(`Executing ${handler.methodName} for ${handler.tasktype}`);
    this.callService(handler.service, handler.methodName, handler.input, this.getFormData());
  }

  private async callService(service: string, method: string, inputs: string[], formData: any): Promise<void> {
    try {
      //console.log(inputs,formData,"-----------inputs")
      // Prepare parameters from form data based on input fields
      const params: any = {};
      inputs.forEach(field => {
        if (formData[field] !== undefined) {
          params[field] = formData[field];
        }
      });

      console.log(`Calling plfTransScreen ${service}.${method} with params:`, params);

      // Call service using cuetrans_common_fn - matches ExtJS pattern
      const result = await cuetrans_common_fn.callService(service, method, params);
      console.log(`Service call result:`, result);

      // Handle service response
      this.handleServiceResponse(method, result);
    } catch (error) {
      console.error(`Error calling ${service}.${method}:`, error);
      cuetrans_common_fn.showMessage(`Error: ${error}`, 'error');
    }
  }

  private handleServiceResponse(method: string, result: any): void {
    console.log('Handling service response for', method, result);

    // Handle header cache data
    if (result.hdrcache && result.hdrcache.length > 0) {
      console.log(result.hdrcache[0], "---------------result.hdrcache[0]")
      this.updateFormData(result.hdrcache[0]);
    }

    // Handle combo arrays - multiple formats supported
    const allStores: Record<string, any[]> = {};

    // Process combo_array (array of objects)
    if (result.combo_array && Array.isArray(result.combo_array)) {
      result.combo_array.forEach((comboObj: any) => {
        Object.keys(comboObj).forEach(storeId => {
          if (Array.isArray(comboObj[storeId])) {
            // Convert to expected format {value, label}
            allStores[storeId] = comboObj[storeId].map((item: any) => ({
              value: item.id || item.value,
              label: item.value || item.label || item.id
            }));
          }
        });
      });
    }
    /*
    // Process individual _array fields (like strStatus_array)
    Object.keys(result).forEach(key => {
      if (key.endsWith('_array') && Array.isArray(result[key]) && result[key].length > 0) {
        const storeId = key.replace('_array', '');
        if (result[key][0] && typeof result[key][0] === 'object') {
          // Convert to expected format {value, label}
          allStores[storeId] = result[key].map((item: any) => ({
            value: item.id || item.value,
            label: item.value || item.label || item.id
          }));
        }
      }
    });

    // Handle grid arrays
    if (Array.isArray(result.grid_array) && result.grid_array.length > 0) {
      result.grid_array.forEach((gridSet: { [x: string]: any; }, index: any) => {
        if (gridSet && typeof gridSet === 'object') {
          Object.keys(gridSet).forEach(gridId => {
            const data = gridSet[gridId];
            if (Array.isArray(data)) {
              console.log(`PlfTransScreen: Updating grid ${gridId} (index ${index}) with ${data.length} rows`);
              this.updateGridData(gridId, data);
            }
          });
        }
      });
    }


    // Update all stores at once
    if (Object.keys(allStores).length > 0) {
      console.log('PlfTransScreen: Processing all stores:', Object.keys(allStores));
      this.updateStores(allStores);
    }
    */
    const allGrids: Record<string, any[]> = {};

    // Process all *_array keys in result (top-level keys like 'myGrid_array', 'status_array', etc.)
    Object.entries(result).forEach(([key, value]) => {
      if (!key.endsWith('_array') || !Array.isArray(value) || value.length === 0) return;

      const id = key.replace('_array', '');

      // Heuristic: if the first element has multiple fields, treat as grid
      if (typeof value[0] === 'object' && Object.keys(value[0]).length > 2) {
        allGrids[id] = value;
        console.log(`Grid ${id} loaded with ${value.length} rows.`);
      } else {
        // Treat as dropdown/store
        allStores[id] = value.map((item: any) => ({
          value: item.id ?? item.value,
          label: item.value ?? item.label ?? item.id
        }));
        console.log(`Store ${id} loaded with ${allStores[id].length} entries.`);
      }
    });
    // Handle grid arrays
    if (result.grid_array && Array.isArray(result.grid_array)) {
        result.grid_array.forEach((gridGroup: any) => {
          Object.entries(gridGroup).forEach(([gridId, rows]) => {
            if (Array.isArray(rows)) {
              allGrids[gridId] = rows;
              console.log(`Grid ${gridId} loaded with ${rows.length} rows from grid_array.`);
            }
          });
        });
      }

      Object.entries(allGrids).forEach(([gridId, data]) => {
        this.updateGridData(gridId, data);
      });

       // Update all stores at once
      if (Object.keys(allStores).length > 0) {
        console.log('PlfTransScreen: Processing all stores:', Object.keys(allStores));
        this.updateStores(allStores);
      }




    // Handle success messages
    if (result.strSuccessMsg) {
      this.showMessage(result.strSuccessMsg, 'success');
    }

    // Handle failure messages
    if (result.strFailureMsg) {
      this.showMessage(result.strFailureMsg, 'error');
    }

    // Handle success message arrays
    if (result.successMsg_array && Array.isArray(result.successMsg_array)) {
      result.successMsg_array.forEach((msgObj: any) => {
        if (msgObj.strSuccessMsg) {
          this.showMessage(msgObj.strSuccessMsg, 'success');
        }
      });
    }

    // Handle error message arrays
    if (result.errorMsg_array && Array.isArray(result.errorMsg_array)) {
      result.errorMsg_array.forEach((msgObj: any) => {
        if (msgObj.strErrorMsg) {
          this.showMessage(msgObj.strErrorMsg, 'error');
        }
      });
    }
  }

  private formData: Record<string, any> = {};
  private stores: Record<string, any[]> = {};
  private gridData: Record<string, any[]> = {};
  private onFormChangeCallback?: (data: Record<string, any>) => void;
  private onStoreUpdateCallback?: (stores: Record<string, any[]>) => void;
  private onGridUpdateCallback?: (gridId: string, data: any[]) => void;
  private onMessageCallback?: (message: string, type: 'success' | 'error' | 'info') => void;

  // Form data management
  getFormData(): Record<string, any> {
    return this.formData;
  }

  setFieldValue(fieldId: string, value: any): void {
    this.formData[fieldId] = value;
    this.onFormChangeCallback?.(this.formData);
  }

  updateFormData(data: Record<string, any>): void {
    console.log('PlfTransScreen: Updating form data with:', data);
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        this.formData[key] = data[key];
        console.log(`PlfTransScreen: Form field ${key} updated to:`, data[key]);
      }
    });
    this.onFormChangeCallback?.(this.formData);
  }

  // Store management
  updateStores(stores: Record<string, any[]>): void {
    console.log('PlfTransScreen: Updating stores with:', stores);
    Object.keys(stores).forEach(storeId => {
      this.stores[storeId] = stores[storeId];
      console.log(`PlfTransScreen: Store ${storeId} updated with ${stores[storeId].length} items`);
    });
    this.onStoreUpdateCallback?.(this.stores);
  }

  // Grid data management
  updateGridData(gridId: string, data: any[]): void {
    console.log(`PlfTransScreen: Updating grid ${gridId} with data:`, data);
    this.gridData[gridId] = data;
    this.onGridUpdateCallback?.(gridId, data);
  }

  // Message handling
  showMessage(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.onMessageCallback?.(message, type);
  }

  // Callback setters for React integration
  setFormChangeCallback(callback: (data: Record<string, any>) => void): void {
    this.onFormChangeCallback = callback;
  }

  setStoreUpdateCallback(callback: (stores: Record<string, any[]>) => void): void {
    this.onStoreUpdateCallback = callback;
  }

  setGridUpdateCallback(callback: (gridId: string, data: any[]) => void): void {
    this.onGridUpdateCallback = callback;
  }

  setMessageCallback(callback: (message: string, type: 'success' | 'error' | 'info') => void): void {
    this.onMessageCallback = callback;
  }

  // Screen mode management
  setScreenMode(mode: string): void {
    const modeConfig = this.screenModes[mode];
    if (modeConfig) {
      console.log(`Setting screen mode to: ${mode}`);
      // Apply enable/disable logic based on mode configuration
    }
  }

  // Navigation methods
  navigateToScreen(linkId: string): void {
    const link = this.screenLinks[linkId];
    if (link) {
      console.log(`Navigating to ${link.dest}`);
      // Implement navigation logic
    }
  }

  // Help system
  showHelp(helpId: string): void {
    const helpConfig = this.hlpLinks[helpId];
    if (helpConfig) {
      console.log(`Showing help for ${helpId}: ${helpConfig.hlpScreen}`);
      // Implement help screen logic
    }
  }

  // Query methods (similar to ExtJS)
  queryById(id: string): any {
    return {
      getValue: () => {
        // Return field value
        return '';
      },
      setValue: (value: any) => {
        // Set field value
      }
    };
  }
}