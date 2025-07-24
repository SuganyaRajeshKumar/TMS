import React, { useState, useEffect, useRef } from 'react';
import { PlfTransScreen } from '../../lib/plfTransScreen';
import Toolbar from './Toolbar';
import ScreenRenderer from './ScreenRenderer';
import JourneyPlanHelp from '../help/JourneyPlanHelp';
import { useLocation } from 'react-router-dom';

interface ScreenWrapperProps {
  screenClass: new () => PlfTransScreen;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ screenClass }) => {
  const [screen] = useState(() => new screenClass());
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [stores, setStores] = useState<Record<string, any[]>>({});
  const [gridData, setGridData] = useState<Record<string, any[]>>({});
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [helpScreen, setHelpScreen] = useState<{ isOpen: boolean; helpId: string }>({ 
    isOpen: false, 
    helpId: ''
  });
const onLoadCalledRef = useRef(false);
const navigate = useNavigate();
const location = useLocation();
const initialValues = location.state?.initialValues || {};

useEffect(() => {
  if (onLoadCalledRef.current) return;
  onLoadCalledRef.current = true;

  //console.log('ScreenWrapper: Initializing screen', screen.screenName);

  screen.setFormChangeCallback(setFormData);
  screen.setStoreUpdateCallback(setStores);
  screen.setGridUpdateCallback((gridId, data) => {
    setGridData(prev => ({ ...prev, [gridId]: data }));
  });
  screen.setMessageCallback((text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  });
  
  // 💡 Apply initial values if any
  Object.entries(initialValues).forEach(([key, value]) => {
    screen.setFieldValue(key, value);
    //screen.handleFieldChange(key, value);  // trigger any dependencies
  });


  const initHandler = screen.eventHandlers.find(h => h.tasktype === 'onload');
  if (initHandler) {
    //console.log('ScreenWrapper: Calling onload handler');
    screen.executeEventHandler(initHandler);
  }
}, [screen]);

  const handleFormChange = (field: string, value: any) => {
    //console.log('ScreenWrapper: Form change', field, value);
    screen.handleFieldChange(field, value);
  };

  const handleToolbarAction = (action: string) => {
    //console.log('ScreenWrapper: Toolbar action', action);
    screen.handleToolbarClick(action);
  };

  const handleToolbarLink = (linkId: string) => {
    //console.log('ScreenWrapper: Toolbar link', linkId);
    screen.navigateToScreen(linkId);
  };

  const handleButtonClick = (buttonId: string) => {
    //console.log('ScreenWrapper: Button click', buttonId);
    screen.handleButtonClick(buttonId);
  };

  const handleHelpClick = (fieldId: string) => {
    //console.log('ScreenWrapper: Help click', fieldId);
    
    // Map field IDs to help screen types
    const helpScreenMap: Record<string, string> = {
      'strJourneyPlanNo': 'jpno',
      'jpno': 'jpno'
    };
    
    const helpType = helpScreenMap[fieldId] || fieldId;
    //console.log('ScreenWrapper: Opening help screen for', helpType);
    
    if (helpType === 'jpno') {
      setHelpScreen({ 
        isOpen: true, 
        helpId: helpType
      });
    }
  };

  const handleHelpClose = () => {
    //console.log('ScreenWrapper: Closing help screen');
    setHelpScreen({ isOpen: false, helpId: '' });
  };

  const handleHelpSelect = (selectedData: any) => {
    //console.log('ScreenWrapper: Help select', selectedData);
    if (helpScreen.helpId && selectedData) {
      // Map selected data to form fields based on help screen type
      if (helpScreen.helpId === 'jpno' && selectedData.JOURNEY_PLAN_NO) {
        screen.setFieldValue('strJourneyPlanNo', selectedData.JOURNEY_PLAN_NO);
        screen.handleFieldChange('strJourneyPlanNo', selectedData.JOURNEY_PLAN_NO);
      }
    }
    handleHelpClose();
  };

  const handleGridLinkClick = (linkId: string, rowData: Record<string, any>) => {
    console.log('ScreenWrapper: Grid link click', linkId, rowData);
    
    // Handle navigation based on screen links configuration
    if (screen.screenLinks && screen.screenLinks[linkId]) {
      const linkConfig = screen.screenLinks[linkId];
      console.log('ScreenWrapper: Navigating to', linkConfig.dest);
      
      // Map grid data to form fields based on link configuration
      if (linkConfig.grid && linkConfig.grid.length > 0) {
        linkConfig.grid.forEach((mapping: any) => {
          if (rowData[mapping.src]) {
            screen.setFieldValue(mapping.dest, rowData[mapping.src]);
          }
        });
      }
      
      // Navigate to destination screen
      // For now, just log - you can implement actual navigation here
      console.log('ScreenWrapper: Would navigate to', linkConfig.dest, 'with data:', rowData,screen);
      navigate('/journeyPlanNew', {
        state: { initialValues: rowData }  // passing the data
      });
    }
  };

  const handleGridReportClick = (reportId: string, rowData: Record<string, any>) => {
    console.log('ScreenWrapper: Grid report click', reportId, rowData);
    
    // Handle report generation
    // You can implement actual report generation here
    console.log('ScreenWrapper: Would generate report', reportId, 'with data:', rowData);
  };
  console.log('ScreenWrapper: Rendering with sections', screen.ptrMainSection?.components?.length || 0);
  console.log('ScreenWrapper: Form data', formData);
  console.log('ScreenWrapper: Stores', Object.keys(stores));
  console.log('ScreenWrapper: Grid data', gridData);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header with Screen Name and Links */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{screen.screenName}</h1>
          
          {/* Toolbar Links */}
          {screen.toolbarLinks && screen.toolbarLinks.length > 0 && (
            <div className="flex items-center space-x-2">
              {screen.toolbarLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleToolbarLink(link.linkid)}
                  title={link.tooltip}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {link.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg ${
          message.type === 'success' ? 'bg-green-500 text-white' :
          message.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex-1 overflow-auto p-6 pb-24">
        <ScreenRenderer
          sections={screen.ptrMainSection.components}
          formData={formData}
          stores={stores}
          gridData={gridData}
          onFormChange={handleFormChange}
          onButtonClick={handleButtonClick}
          onHelpClick={handleHelpClick}
          onGridLinkClick={handleGridLinkClick}
          onGridReportClick={handleGridReportClick}
        />
      </div>

      {/* Fixed Bottom Toolbar */}
      {screen.toolbarSectionFlag && (
        <Toolbar
          actions={screen.toolbarActions}
          onActionClick={handleToolbarAction}
        />
      )}

      {/* Help Screen Modal */}
      {helpScreen.isOpen && helpScreen.helpId === 'jpno' && (
        <JourneyPlanHelp
          isOpen={helpScreen.isOpen}
          onClose={handleHelpClose}
          onSelect={handleHelpSelect}
          initialValues={{}}
        />
      )}
    </div>
  );
};

import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default ScreenWrapper;