import React from 'react';
import { PlfTransScreen } from '../../lib/plfTransScreen';
import { plf } from '../../lib/plf';

// Journey Plan Help Screen - Direct conversion from ExtJS
export class JourneyPlanHelpScreen extends PlfTransScreen {
  constructor() {
    super();
    this.initComponent();
  }

  initComponent() {
    const mainpage = this;
    mainpage.screenName = "Journey Plan Help";
    mainpage.hlpSectionFlag = true;
    mainpage.startPainting();

    // Journey Search Section Begins
    plf.columns = 3;
    const helpOnJourneyHdrCollapse = plf.addColumnSection({ title: "", collapsed: false });
    const helpOnJourneyFormCtrl = [
      plf.addText({ "label": "Journey Plan No", id: "strJourneyPlanNoFrom", "anywhereSearch": "true" }),
      plf.addCombo({ "label": "Status", id: "strStatus" }),
      plf.addCombo({ "label": "Date Type", id: "strDateType" }),
      plf.addDate({ "label": "Journey Date From", id: "dtJourneyDateFrom" }),
      plf.addDate({ "label": "Journey Date To", id: "dtJourneyDateTo" }),

      plf.addText({ "label": "Vehicle Code", id: "strTruckCode" }),
      plf.addText({ "label": "Driver Code", id: "strDriverCode" }),
      plf.addText({ "label": "Ref Doc No", id: "strDocNo", "anywhereSearch": "true" }),
      plf.addText({ "label": "Load No", id: "strLoadNo" }),
      plf.addBlank(),
      plf.addButton({ "label": "Search", id: "searchBtn", "tooltip": "Click here to search." }),
    ];

    helpOnJourneyHdrCollapse.add(helpOnJourneyFormCtrl);

    // Journey Grid Section Begins
    const helpOnJourneyGridFieldObj = [
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

    const helpOnJourneyGridDtl = {
      title: "Journey Plan Help",
      id: "journeySearch",
      detail: helpOnJourneyGridFieldObj,
      visibleRow: plf.helpVisibleRows,
      removeAddDelete: true,
      removePaging: true
    };

    const helpGridSection = plf.addGrid(helpOnJourneyGridDtl, this);
    mainpage.hlpSearchGridPtr = helpGridSection;

    // Add Child Sections
    mainpage.ptrMainSection.add(helpOnJourneyHdrCollapse); // Add Header Section to Main Page
    mainpage.ptrMainSection.add(helpGridSection); // Add Grid Section to Main Page

    // Event Handlers Mapping Begins
    mainpage.eventHandlers = [
      {
        "controlid": "",
        "tasktype": "onload",
        "input": [""],
        "service": "CoreJourneyPlanService",
        "methodName": "initJourneyPlanSummaryTS"
      },
      {
        "controlid": "searchBtn",
        "tasktype": "btnclick",
        "input": ["strJourneyPlanNoFrom", "dtJourneyDateFrom", "dtJourneyDateTo", "strDriverCode", "strTruckCode", "strStatus", "strLoadNo", "strDateType"],
        "service": "CoreJourneyPlanService",
        "methodName": "fetchAllJourneyDetailsTS"
      },
      {
        "tasktype": "proto",
        "filename": "jm_master/journeyplanhlp.json"
      }
    ];

    this.callParent([]);
  }
}