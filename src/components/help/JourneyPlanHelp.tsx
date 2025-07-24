import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import FormField from '../framework/FormField';
import DataGrid from '../framework/DataGrid';
import { cuetrans_common_fn } from '../../lib/cuetrans_common_fn';

interface JourneyPlanHelpProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedData: any) => void;
  initialValues?: Record<string, any>;
}

const JourneyPlanHelp: React.FC<JourneyPlanHelpProps> = ({
  isOpen,
  onClose,
  onSelect,
  initialValues = {}
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    strJourneyPlanNoFrom: '',
    strStatus: '',
    strDateType: '',
    dtJourneyDateFrom: '',
    dtJourneyDateTo: '',
    strTruckCode: '',
    strDriverCode: '',
    strDocNo: '',
    strLoadNo: '',
    ...initialValues
  });

  const [gridData, setGridData] = useState<any[]>([]);
  const [stores, setStores] = useState<Record<string, any[]>>({
    strStatus: [
      { value: 'Draft', label: 'Draft' },
      { value: 'Confirmed', label: 'Confirmed' },
      { value: 'In-Progress', label: 'In-Progress' },
      { value: 'Completed', label: 'Completed' },
      { value: 'Cancelled', label: 'Cancelled' }
    ],
    strDateType: [
      { value: 'Journey Date', label: 'Journey Date' },
      { value: 'Created Date', label: 'Created Date' },
      { value: 'Modified Date', label: 'Modified Date' }
    ]
  });

  const [loading, setLoading] = useState(false);

  // Grid columns configuration
  const gridColumns = [
    { columnname: "Journey Plan No", dataname: "JOURNEY_PLAN_NO", datatype: "string", width: 100 },
    { columnname: "Journey Plan Date", dataname: "JOURNEY_PLAN_DT", datatype: "string", width: 120 },
    { columnname: "Origin", dataname: "ROUTE_ORIGIN", datatype: "string", width: 110 },
    { columnname: "Destination", dataname: "ROUTE_DEST", datatype: "string", width: 110 },
    { columnname: "Vehicle Code", dataname: "TRUCK_CODE", datatype: "string", width: 100 },
    { columnname: "Vehicle Description", dataname: "TRUCK_DESC", datatype: "string", width: 150 },
    { columnname: "Driver Name", dataname: "DRIVER_CODE", datatype: "string", width: 110 },
    { columnname: "Driver Phone No", dataname: "PHONE_NO", datatype: "string", width: 100 },
    { columnname: "Journey Manager Name", dataname: "EMPLOYEE_NAME", datatype: "string", width: 110 },
    { columnname: "Status", dataname: "STATUS", datatype: "string", width: 80 },
    { columnname: "Ref Doc No", dataname: "DO_NO", datatype: "string", width: 80 },
    { columnname: "Carrier", dataname: "CARRIER_CODE", datatype: "string", width: 80 },
    { columnname: "Load No", dataname: "WAYBILL_NO", datatype: "string", width: 80 },
    { columnname: "Driver Licence", dataname: "LICENCE_NO", datatype: "string", width: 80 },
    { columnname: "Inspection No", dataname: "INSPECTION_NO", datatype: "string", width: 80 },
    { columnname: "Reporting Driver", dataname: "REPORTING_DRIVER", datatype: "string", width: 100 },
    { columnname: "Reporting Vehicle", dataname: "REPORTING_VEHICLE", datatype: "string", width: 100 }
  ];

  useEffect(() => {
    if (isOpen) {
      initializeHelp();
    }
  }, [isOpen]);

  const initializeHelp = async () => {
    setLoading(true);
    try {
      const response = await cuetrans_common_fn.callService(
        'CoreJourneyPlanService',
        'initJourneyPlanSummaryTS',
        {}
      );
      
      if (response.combo_array && response.combo_array[0]) {
        setStores(prev => ({ ...prev, ...response.combo_array[0] }));
      }
    } catch (error) {
      console.error('Error initializing help screen:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await cuetrans_common_fn.callService(
        'CoreJourneyPlanService',
        'fetchAllJourneyDetailsTS',
        formData
      );

      if (response.grid_array && response.grid_array[0] && response.grid_array[0].journeySearch) {
        setGridData(response.grid_array[0].journeySearch);
      } else {
        // Mock data for demo
        setGridData([
          {
            JOURNEY_PLAN_NO: 'JP-2024-001',
            JOURNEY_PLAN_DT: '15-01-2024',
            ROUTE_ORIGIN: 'Muscat',
            ROUTE_DEST: 'Salalah',
            TRUCK_CODE: 'TRK-001',
            TRUCK_DESC: 'Mercedes Actros 2024',
            DRIVER_CODE: 'Ahmed Al-Rashid',
            PHONE_NO: '+968-9999-9999',
            EMPLOYEE_NAME: 'John Manager',
            STATUS: 'Confirmed',
            DO_NO: 'DO-001',
            CARRIER_CODE: 'PDO',
            WAYBILL_NO: 'WB-001',
            LICENCE_NO: 'DL123456',
            INSPECTION_NO: 'INS-001',
            REPORTING_DRIVER: 'Ahmed',
            REPORTING_VEHICLE: 'TRK-001'
          },
          {
            JOURNEY_PLAN_NO: 'JP-2024-002',
            JOURNEY_PLAN_DT: '16-01-2024',
            ROUTE_ORIGIN: 'Nizwa',
            ROUTE_DEST: 'Muscat',
            TRUCK_CODE: 'TRK-002',
            TRUCK_DESC: 'Volvo FH16 2023',
            DRIVER_CODE: 'Mohammed Ali',
            PHONE_NO: '+968-8888-8888',
            EMPLOYEE_NAME: 'Sarah Manager',
            STATUS: 'Draft',
            DO_NO: 'DO-002',
            CARRIER_CODE: 'PDO',
            WAYBILL_NO: 'WB-002',
            LICENCE_NO: 'DL789012',
            INSPECTION_NO: 'INS-002',
            REPORTING_DRIVER: 'Mohammed',
            REPORTING_VEHICLE: 'TRK-002'
          }
        ]);
      }
    } catch (error) {
      console.error('Error searching journey plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRowDoubleClick = (rowData: any) => {
    onSelect(rowData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[90vw] h-[80vh] max-w-7xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Journey Plan Help</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Search Form */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Journey Plan No"
                id="strJourneyPlanNoFrom"
                type="text"
                value={formData.strJourneyPlanNoFrom}
                onChange={(value) => handleFormChange('strJourneyPlanNoFrom', value)}
                placeholder="Enter Journey Plan No"
              />
              
              <FormField
                label="Status"
                id="strStatus"
                type="select"
                value={formData.strStatus}
                onChange={(value) => handleFormChange('strStatus', value)}
                options={stores.strStatus || []}
              />
              
              <FormField
                label="Date Type"
                id="strDateType"
                type="select"
                value={formData.strDateType}
                onChange={(value) => handleFormChange('strDateType', value)}
                options={stores.strDateType || []}
              />
              
              <FormField
                label="Journey Date From"
                id="dtJourneyDateFrom"
                type="date"
                value={formData.dtJourneyDateFrom}
                onChange={(value) => handleFormChange('dtJourneyDateFrom', value)}
              />
              
              <FormField
                label="Journey Date To"
                id="dtJourneyDateTo"
                type="date"
                value={formData.dtJourneyDateTo}
                onChange={(value) => handleFormChange('dtJourneyDateTo', value)}
              />
              
              <FormField
                label="Vehicle Code"
                id="strTruckCode"
                type="text"
                value={formData.strTruckCode}
                onChange={(value) => handleFormChange('strTruckCode', value)}
                placeholder="Enter Vehicle Code"
              />
              
              <FormField
                label="Driver Code"
                id="strDriverCode"
                type="text"
                value={formData.strDriverCode}
                onChange={(value) => handleFormChange('strDriverCode', value)}
                placeholder="Enter Driver Code"
              />
              
              <FormField
                label="Ref Doc No"
                id="strDocNo"
                type="text"
                value={formData.strDocNo}
                onChange={(value) => handleFormChange('strDocNo', value)}
                placeholder="Enter Ref Doc No"
              />
              
              <FormField
                label="Load No"
                id="strLoadNo"
                type="text"
                value={formData.strLoadNo}
                onChange={(value) => handleFormChange('strLoadNo', value)}
                placeholder="Enter Load No"
              />
              
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1 p-6 overflow-hidden">
            <div className="h-full">
              <DataGrid
                title="Journey Plan Results"
                id="journeySearch"
                columns={gridColumns}
                data={gridData}
                readOnly={true}
                removeAddDelete={true}
                visibleRows={10}
                onRowDoubleClick={handleRowDoubleClick}
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (gridData.length > 0) {
                onSelect(gridData[0]);
                onClose();
              }
            }}
            disabled={gridData.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default JourneyPlanHelp;