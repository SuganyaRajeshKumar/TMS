import { PlfTransScreen } from '../../lib/plfTransScreen';
import { plf } from '../../lib/plf';

// Journey Plan Screen - Direct conversion from ExtJS
export class JourneyPlanScreen extends PlfTransScreen {
  constructor() {
    super();
    this.initComponent();
  }

  initComponent() {
    this.screenName = "Journey Plan";
    
    // Add Toolbar
    this.toolbarSectionFlag = true;
    
    this.toolbarActions = [
     /*{
                "name": "Create",
                "tooltip": "Click here to create a journey."
            },*/
			{
                "name": "Save",
                "tooltip": "Click here to edit the journey."
            },
            /*{
                "name": "Delete",
                "tooltip": "Click here to delete the journey."
            },*/
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm the journey."
            },
			{
                "name": "Short-Close",
                "tooltip": "Click here to short close the journey."
            },/*,
			{
                "name": "Reject",
                "tooltip": "Click here to reject the journey."
            }*/
			{
                "name": "Print Waybill",
                "tooltip": "Click here to print the waybill report."
            },
			{
                "name": "Print Inspection",
                "tooltip": "Click here to print the inspection report."
            },
			{
                "name": "Print JP",
                "tooltip": "Click here to print the journey plan report."
			},
			{
                "name": "Print Diversion Letter",
                "tooltip": "Click here to print diversion letter."
            },
			/*{
                "name": "Print Release Letter",
                "tooltip": "Click here to print the Release Letter."
            }
           */
    ];

    this.toolbarLinks = [
      {"name":"Amendment History","linkid":"Amend_History","tooltip":"Click here to launch the Amendment History screen."},
			{"name":"Amend Journey Plan ","linkid":"Amend_JP","tooltip":"Click here to launch the Amend Journey Plan screen."},
			{"name":"Risk Assessment","linkid":"jms_assessment","tooltip":"Click here to launch risk assessment screen."},
			{"name":"Update Actuals","linkid":"jms_update","tooltip":"Click here to launch journey update actuals screen."},
			{"name":"Re-Plan","linkid":"jms_replan","tooltip":"Click here to launch journey replan screen."},//,
			{"name":"Violation History","linkid":"Violation_History","tooltip":"Click here to violation history."}//,
			//{"name":"Proof Of Delivery","linkid":"ProofOfDelivery_Journey","tooltip":"Click here for Proof Of Delivery."}
    ];

    // Add Keyfields
    //this.keyFields = ["strJourneyPlanNo","strInspectionNo","strJourneyManagerCode"];

    // Journey plan Header Section starts
    plf.columns = 6;
    const JourneyHdrFieldset1 = plf.addColumnSection({ title: "Journey Details" });
    const JourneyPlanFormCtrl1 = [
     plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"jpno",inputFormat:"string",InputLength:"80"},this),
			plf.addDate({"label":"Journey Plan Date",id:"dtJourneyPlanDate","mandatory":"true",Increment:"10"}),
			plf.addDisplayOnly({"label":"Journey Type",id:"strJourneyPlanType"}),			
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),		
			plf.addListEdit({"label":"Journey Mgr Name",id:"strJourneyManagerName",keyField:"strJourneyManagerCode"},this),
			plf.addHlpText({"label":"Journey Mgr Code",id:"strJourneyManagerCode","mandatory":"true",hlpLinkID:"journeyManagerCode",inputFormat:"string",InputLength:"40"},this),
            plf.addDisplayOnly({"label":"Phone Number",id:"strPhoneNo"}),
			//plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),			
			plf.addHidden({"label":"Coordinator Name",id:"strJourneyCoordinatorName",keyField:"strJourneyCoordinatorCode"},this),
			plf.addHidden({"label":"Coordinator Code",id:"strJourneyCoordinatorCode",hlpLinkID:"journeyCoordinatorCode",inputFormat:"string",InputLength:"40"},this),	
			
			plf.addHidden({"label":"Vehicle Description",id:"strTruckDescription",keyField:"strTruckCode"},this),
			plf.addHidden({"label":"Trailer Description",id:"strTrailerDescription",keyField:"strTrailerCode"},this),
			plf.addHidden({"label":"Trailer Code",id:"strTrailerCode",hlpLinkID:"trailerCode",inputFormat:"string",InputLength:"40"},this),	
      plf.addHidden({"label":"Load No",id:"strLoadNo"}),  // 74673 Starts 
      plf.addDisplayOnly({"label":"RAM Score",id:"iRiskAssessmentScore",inputFormat:"string",InputLength:"80"}),
			plf.addDisplayOnly({"label":"Load No",id:"strWaybillNo"/*,inputFormat:"string"*/}),	
			plf.addDisplayOnly({"label":"Load Origin",id:"strLoadOrigin",inputFormat:"string"}),
      plf.addDisplayOnly({"label":"Load Destination",id:"strLoadDestination",inputFormat:"string"}),			
      plf.addDisplayOnly({"label":"Load Description","id":"strLoadDesc"}),
			plf.addDisplayOnly({"label":"Loading Point","id":"strLoadAt"}),
			plf.addDisplayOnly({"label":"Unloading Point","id":"strDeliveryAt"}),
			plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),
			plf.addDisplayOnly({"label":"Inspection No",id:"strInspectionNo",hlpLinkID:"inspectionno",inputFormat:"string",InputLength:"80"},this),
			plf.addDisplayOnly({"label":"Driver Compliance",id:"strDriverCompliance","mandatory":"true"}),
	    plf.addDisplayOnly({"label":"Vehicle Compliance",id:"strTruckCompliance","mandatory":"true"}),
		  plf.addDisplayOnly({"label":"Load Compliance",id:"strLoadCompliance","mandatory":"true"}), // 74673 Ends 
			plf.addDisplayOnly({"label":"Trip No",id:"strTripNo"})
			//plf.addFileUpload({"label":"Attach File",id:"strFileAttach",Entity:"Journey_Plan\\File_Attachment"})
    ];
    JourneyHdrFieldset1.add(JourneyPlanFormCtrl1);

    //var JPInspSchedDtls = plf.addColumnSection({title:"Scheduled Vehicle/Driver Details"});//75145
		 const JPInspSchedDtls = plf.addColumnSection({title:"Scheduled Asset Details"});
		 const JPInspSchedDtlsCtrl=
              [			 
				plf.addDisplayOnly({"label":"Vehicle Code",id:"strTruckCode","mandatory":"true",hlpLinkID:"truckCode",inputFormat:"string",InputLength:"40"},this),
				plf.addDisplayOnly({"label":"Vehicle Regn No",id:"strVehicleRegNo"}),
				plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
				plf.addDisplayOnly({"label":"Contract No",id:"strContractNo"}),		
				plf.addDisplayOnly({"label":"Driver Code",id:"strDriverCode",inputFormat:"string"}),
				plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName",keyField:"strDriverCode"},this),			
				plf.addDisplayOnly({"label":"Driver Contact No",id:"strMobileNo"}),
				plf.addDisplayOnly({"label":"Driver License No",id:"strLicenseNo"}),
				plf.addDisplayOnly({"label":"Driver Age",id:"strDriverAge"}),
				plf.addDisplayOnly({"label":"Trailer Code",id:"strSTrai"})
				
			]
      JPInspSchedDtls.add(JPInspSchedDtlsCtrl);	


   const JPInspDtls = plf.addColumnSection({title:"Reporting Asset Details"}); // 74673			
		const JPInspDtlsCtrl=										
		[	
 
			plf.addDisplayOnly({"label":"Vehicle Code","id":"strRepTruckCode"}),
			plf.addDisplayOnly({"label":"Vehicle Regn No","id":"strRVReg"}),// strRepVehicleRegNo
			plf.addDisplayOnly({"label":"Vehicle Category","id":"strVCat"}),//75145
			//plf.addHlpText({"label":"Driver Code",id:"strRepDriverCode",hlpLinkID:"driver",inputFormat:"string"},this),
            plf.addDisplayOnly({"label":"Driver Code","id":"strRepDriverCode"}),//75145			
			plf.addDisplayOnly({"label":"Driver Name",id:"strRepDriverName"}),	
			plf.addDisplayOnly({"label":"Driver Contact No",id:"strRepMobileNo"}),		
			plf.addDisplayOnly({"label":"Driver License No",id:"strRepLicenceNo"}),
			plf.addDisplayOnly({"label":"Driver Age",id:"strRepoDriverAge"}),
			plf.addDisplayOnly({"label":"Driver Carrier",id:"strCarrierNameNew"}),
			//plf.addHlpText({"label":"Trailer Code","id":"strTrailerCode",hlpLinkID:"reportingTrailerCode"},this)//75145
			plf.addDisplayOnly({"label":"Trailer Code",id:"strRTri"})	
			
            			
		]
		JPInspDtls.add(JPInspDtlsCtrl);

    const truckAndDriverColumn = plf.addCollapseSection({collapsed:true,"title":"Documents Details"});			//69997
    const TruckGridFieldObj=							//69997
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:140},//188
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:140},//140
			{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"string",width:140}
			//{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:110}//Raj
		]
		const truckGridDtl=								//69997
		{
			title:"Truck Documents Details",
			id:"preJourneyTruck",
			columnWidth:0.33,
			detail:TruckGridFieldObj,
			visibleRow:6,	
			readonly:true,
			removeFilter:true,
			removeTbar:true,
			"rowHighlight":true

		}
		const  TruckGridSection = plf.addGrid(truckGridDtl,this)		//69997
    truckAndDriverColumn.add(TruckGridSection)
		//Pre Journey Inspection Truck Document Grid Section Ends

			//Pre Journey Inspection Trailer Document Grid Section start           	
		const TrailerGridFieldObj=							//69997
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:140},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:140},
			{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"string",width:140}
			//{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:110}//Raj
		]
		const TrailerGridDtl=								//69997
		{
			title:"Trailer Documents Details",
			id:"preJourneyTrailer",
			columnWidth:0.34,
			detail:TrailerGridFieldObj,
			visibleRow:6,	
			readonly:true,
			removeFilter:true,
			removeTbar:true,
			"rowHighlight":true

		}
		const  TrailerGridSection = plf.addGrid(TrailerGridDtl,this)		//69997
    truckAndDriverColumn.add(TrailerGridSection);
		//Pre Journey Inspection Truck Document Grid Section Ends        

		//Pre Journey Inspection Driver Document Grid Section Begins
		const preJourneyInspectionDriverGridFieldObj=	     //69997
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:140},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:140},
			//{columnname:"Issue Date",dataname:"DOC_ISSUE_DT",datatype:"string",width:140},//Raj
			{columnname:"Expiry Date",dataname:"DOC_EXPIRY_DT",datatype:"string",width:110}
			
		]
		const driverGridDtl=
		{
			title:"Driver Documents Details",
			id:"preJourneyDriver",
			columnWidth:0.33,
			detail:preJourneyInspectionDriverGridFieldObj,
			visibleRow:6,			
			readonly:true,
			removeFilter:true,
			removeTbar:true,
			"rowHighlight":true				
		}

		const DriverGridSection = plf.addGrid(driverGridDtl,this)
    truckAndDriverColumn.add(DriverGridSection)

    // Plan Details Section
    plf.columns = 6;
    var journeyPlanDetailsCollapse = plf.addColumnSection({title:"Route Details"});		//69997
    const journeyPlanDetailsFormCtrl = [     
      plf.addCombo({"label":"Manual Plan",id:"strManualPlan","mandatory":"true"}),
			plf.addListEdit({"label":"JMC Code","id":"strJMCCode",inputFormat:"string",InputLength:"100"
			,listeners: {
                     beforequery: function(record) {
                         record.query = new RegExp(record.query, 'i');
                         record.forceAll = true;
                         return true;
                     },
					render : function(cmp) {
                                    cmp.getEl().on('keypress', function(e) {
                                        if (e.getKey() == e.ENTER) {
											mainpage.queryById("methodName").setValue("onenterJmcCodeTS");
											process_ebpack_service(mainpage,["strJMCCode"],"CoreJourneyPlanService");
                                        }
                                    });
                                }
                 }		
			},this),
			//plf.addListEdit({"label":"JMC Code","id":"strJMCCode",inputFormat:"string",InputLength:"100"},this),
			plf.addListEdit({"label":"Route Description","id":"strRouteDescription",keyField:"strRouteCode",inputFormat:"string",InputLength:"100"},this),
			plf.addHlpText({"label":"Route Code","id":"strRouteCode",hlpLinkID:"routeCode",inputFormat:"string",InputLength:"40"},this),			
			//plf.addDate({"label":"Departure Date",id:"dtDepartureDate"}),
			//plf.addText({"label":"Departure Time",id:"tmDepartureTime",Increment:"10"}),
			plf.addDateTime({"label":"Departure Date/Time",dateid:"dtDepartureDate",timeid:"tmDepartureTime"}),
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Via","id":"strVia"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),			
			//plf.addText({"label":"Pickup Point",id:"strPickupPoint",inputFormat:"string",InputLength:"100"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addButton({"label":"Create Route Plan",id:"cmn_btnsubmit","tooltip":"Click here to schedule the journey."})

    ];
    journeyPlanDetailsCollapse.add(journeyPlanDetailsFormCtrl);

    // Plan Details Grid
    const planDtsGridFieldObj = [
      {columnname:"Transit Location",dataname:"INTRANSIT_LOCATION",datatype:"string",editControl:"addDisplayOnly",width:100},			
			{columnname:"Planned Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Planned Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"textbox",width:120},
			/*
			{"group":"Plan","dtl":[
			{columnname:"Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",width:100},
			{columnname:"Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",width:100},
			{columnname:"Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",width:100},
			{columnname:"Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",width:120},
			]},	*/		
			//{columnname:"Action",dataname:"ACTION_TYPE",datatype:"string",editControl:"combo",width:100,storeId:"strAction"},            			
           /* {columnname:"ReferenceType",dataname:"select",datatype:"string",editControl:"checkbox",width:150},*/		
			{columnname:"Motel",dataname:"MOTEL",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Call JM",dataname:"CALLJM",datatype:"string",editControl:"combo",width:100,storeId:"strCallJMNo"}
    ];

    const planDtsGridDtl = {
      title: "Plan Details",
      id: "planDetails",
      widthBasis: "flex",
      detail: planDtsGridFieldObj,
      visibleRow: 7,
      removeAddDelete: true
    };
    const planDtsGridSection = plf.addGrid(planDtsGridDtl, this);
    journeyPlanDetailsCollapse.add(planDtsGridSection);

    // Manual Plan Details Grid
    const planDtsGridManualFieldObj = [
     {columnname:"Transit Location",dataname:"INTRANSIT_LOCATION",datatype:"string",editControl:"combo",width:100,storeId:"strTransitLocation"},			
			{columnname:"Planned Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"RegexTime",width:100},
			{columnname:"Planned Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"RegexTime",width:120},
			/*
			{"group":"Plan","dtl":[
			{columnname:"Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"textbox",width:120},
			]},	*/	
			//{columnname:"Action",dataname:"ACTION_TYPE",datatype:"string",editControl:"combo",width:100,storeId:"strAction"},
            //{columnname:"Delay Reason",dataname:"DELAY_REASON",datatype:"string",editControl:"combo",width:100,storeId:"strDelayReason"},  			
           /* {columnname:"ReferenceType",dataname:"select",datatype:"string",editControl:"checkbox",width:150},*/		
			{columnname:"Motel",dataname:"MOTEL",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Call JM",dataname:"CALLJM",datatype:"string",editControl:"combo",width:100,storeId:"strCallJMYes"}
    ];

    const planDtsGridManualDtl = {
      title: "Manual Plan Details",
      id: "manualplanDetails",
      widthBasis: "flex",
      detail: planDtsGridManualFieldObj,
      visibleRow: 7
    };
    const planDtsGridManualSection = plf.addGrid(planDtsGridManualDtl, this);
    journeyPlanDetailsCollapse.add(planDtsGridManualSection);


    //Driver Rest Details  Section start
      
		const DriverRestDetailsGridObj=	
		[
			{columnname:"License No",dataname:"LICENSE_NO",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"GSM Number",dataname:"GSM_NUMBER",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Blue Key No",dataname:"BLUE_KEY_NO",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Driver",dataname:"DRIVER",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Vehicle",dataname:"VEHICLE",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Contract Number",dataname:"CONTRACT_NUMBER",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Registration Number",dataname:"REGISTRATION_NUMBER",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Event Description",dataname:"EVENT_DESCRIPTION",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Start Date",dataname:"START_DATE",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Start Time",dataname:"START_TIME",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"End Date",dataname:"END_DATE",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"End Time",dataname:"END_TIME",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Occurrences",dataname:"OCCURRENCES",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Event Value",dataname:"EVENT_VALUE",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Total Duration (hh:mm:ss)",dataname:"TOTAL_DURATION",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Measurement Unit",dataname:"MEASUREMENT_UNIT",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"JP Number",dataname:"JP_NUMBER",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Reason",dataname:"REASON",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Road Type",dataname:"ROAD_TYPE",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Provider",dataname:"PROVIDER",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Start Long/Lat",dataname:"START_LONG_LAT",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"End Long/Lat",dataname:"END_LONG_LAT",datatype:"string",editControl:"addDisplayOnly"}
			
		]
		const DriverRestDetailsGridDtl=
		{
			title:"Violation Details - 09:00 PM - 05:00 AM",
			id:"DriverRestDetails", 
			detail:DriverRestDetailsGridObj,
			columnWidth:1,
			visibleRow:5,	
			readonly:true
			
		}
		const DriverRestDetailsGridSection = plf.addGrid(DriverRestDetailsGridDtl,this)
		plf.columns=6
		const DriverRestDetailsColumn = plf.addColumnSection({id:"strDriverRestDetailsGrid",title:"Driver Rest Details - For Duty of Care"});
		const ValidateDriverCtrl=										
		[	
	
			plf.addButton({"label":"Validate Driver Rest",id:"strValidateDriverRest","tooltip":"Click here to validate driver rest."})      			
		]
		DriverRestDetailsColumn.add(ValidateDriverCtrl);
				
		DriverRestDetailsColumn.add(DriverRestDetailsGridSection)

    plf.columns=6
		const AllocateSection = plf.addCollapseSection({id:"strActionDriver",title:"Allocate the reporting driver irrespective of the above violations"});	
		const AllocateFormCtrl=															
		[			
			plf.addCombo({"label":"Allocate",id:"strAllocate"})			
		]
		AllocateSection.add(AllocateFormCtrl);
		plf.columns=6
		const freeActionTextEditor = plf.addColumnSection({title:"Reason",columnWidth:1});
		const freeActionTextEditorCtrl=															
		[			
			plf.addText({"label":"Reason",id:"strAllocateReason"})			
		]
    freeActionTextEditor.add(freeActionTextEditorCtrl);
    
		AllocateSection.add(freeActionTextEditor)
		plf.columns=6
		const AllocateDocDetailSection = plf.addColumnSection({id:"strAllocateDocSection",title:"",columnWidth:1});	
		const AllocateDocDetailFormCtrl=															
		[
			
			plf.addFileUpload({"label":"Upload Document",id:"strSupUploadDoc",mandatory:"true",Entity:"Service/Doc_Attachment",Path:"app"}),
			plf.addDisplayOnly({"label":"Action By",id:"strActionBy"}),
			plf.addDisplayOnly({"label":"Action Date/Time",id:"stActionDtTm"}),
			
		]
		AllocateDocDetailSection.add(AllocateDocDetailFormCtrl);
		AllocateSection.add(AllocateDocDetailSection);

    // Night Driving Section
    plf.columns = 6;
    const statusDetailsCollapse = plf.addColumnSection({ title: "Night Driving" });
    const statusDetailsFormCtrl = [
     plf.addCombo({"label":"Night Driving","id":"strNightDriveApproval"}),
			//plf.addButton({"label":"Browse","id":"browseBtn"}),
			plf.addCombo({"label":"Reason","id":"strApprovalReason"}),
			plf.addText({"label":"Approver Name","id":"strApproverName"}),
			plf.addText({"label":"Comments for Driver","id":"strCommentsForDriver"}),
			plf.addFileUpload({"label":"Attach File",id:"strFileAttach1",Entity:"Journey_Plan\\Night_Approval"})
    ];
    statusDetailsCollapse.add(statusDetailsFormCtrl);

    // Violations Grid
    const violationsDtsGridFieldObj = [
      {columnname:"Violation Type",dataname:"VIOLATION_TYPE",datatype:"string",editControl:"addDisplayOnly",	width:100},
			{columnname:"Violations Description",dataname:"VIOLATION_DESC",datatype:"string",editControl:"addDisplayOnly",width:200},
			{columnname:"Count",dataname:"COUNT",datatype:"string",editControl:"addDisplayOnly",width:150,colAlign:'right'}
			//{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT_VIO",datatype:"string",width:150,editControl:"fileupload",fileGroup:"Journey_Plan\\Violations",width:175}
    ];

    const violationsDtsGridDtl = {
      title: "Existing Violations",
      id: "violationDetails",
      detail: violationsDtsGridFieldObj,
      widthBasis: "flex",
      columnWidth: 0.5,
      readOnly: true,
      removeAddDelete: true
    };
    const violationsDtsGridSection = plf.addGrid(violationsDtsGridDtl, this);

    // Toolbox Talks Grid
    const toolBoxDtsGridFieldObj = [
     {columnname:"Tool Box Talk Code",dataname:"TOOLBOX_TYPE",datatype:"string",editControl:"textbox",	width:300,hidden:true},
			{columnname:"Tool Box Talks",dataname:"TYPE_DESC",datatype:"string",editControl:"textbox",	width:500},
			{columnname:"Seq_no",dataname:"SEQ_NO",datatype:"string",editControl:"addDisplayOnly",	width:300,hidden:true}
    ];

    const toolBoxDtsGridDtl = {
      title: "Toolbox Talks",
      id: "toolBoxTalksDetails",
      widthBasis: "flex",
      detail: toolBoxDtsGridFieldObj,
      columnWidth: 0.5
    };
    const toolBoxDtsGridSection = plf.addGrid(toolBoxDtsGridDtl, this);

    // Passengers Grid
    const passengerDtsGridFieldObj = [
     {columnname:"Passenger",dataname:"PASSENGER",datatype:"string",editControl:"textbox",width:200},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:400},
			{columnname:"serial no",dataname:"SERIAL_NO",datatype:"string",editControl:"textbox",width:300,hidden:true}
    ];

    const passengerDtsGridDtl = {
      title: "Passengers",
      id: "passengerDetails",
      widthBasis: "flex",
      detail: passengerDtsGridFieldObj,
      columnWidth: 0.5
    };
    const passengerDtsGridSection = plf.addGrid(passengerDtsGridDtl, this);

    // Reference Documents Grid
    const refDtsGridFieldObj = [
      //{columnname:"ReferenceType",dataname:"select",datatype:"string",editControl:"checkbox",width:150},
			{columnname:"Reference Type",dataname:"REFERENCE_TYPE",datatype:"string",editControl:"combo",width:100,storeId:"strReferenceType"},
			{columnname:"Reference No",dataname:"REFERENCE_NO",datatype:"string",editControl:"textbox",	width:100},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:100},
			{columnname:"SEQ NO",dataname:"SEQ_NO",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT_REF",datatype:"string",width:175,editControl:"fileupload",fileGroup:"Journey_Plan\\Reference_Documents"}
    ];

    const refDtsGridDtl = {
      title: "Reference Documents",
      id: "referenceDetails",
      widthBasis: "flex",
      detail: refDtsGridFieldObj,
      columnWidth: 0.5
    };
    const refDtsGridSection = plf.addGrid(refDtsGridDtl, this);

    // Item Details Grid
    const itemDtsGridFieldObj = [
      { columnname: "Item Code", dataname: "ITEM_CODE", datatype: "string", editControl: "textbox", width: 150 },
      { columnname: "Item Description", dataname: "ITEM_DESCRIPTION", datatype: "string", editControl: "textbox", width: 400 },
      { columnname: "Qty", dataname: "ITEM_QUANTITY", datatype: "string", editControl: "textbox", width: 100 },
      { columnname: "seq no", dataname: "SEQ_NO", datatype: "string", editControl: "textbox", width: 100, hidden: true }
    ];

    const itemDtsGridDtl = {
      title: "Item Details",
      id: "itemDetails",
      detail: itemDtsGridFieldObj,
      columnWidth: 0.6
    };
    const itemDtsGridSection = plf.addGrid(itemDtsGridDtl, this);

    // Collapsible sections
    const passRefDocDtl = plf.addCollapseSection({ title: "Reference / Passengers", collapsed: true });
    passRefDocDtl.add(refDtsGridSection);
    passRefDocDtl.add(plf.addSplitter);
    passRefDocDtl.add(passengerDtsGridSection);

    const itemDtlGridContainer = plf.addCollapseSection({ title: "Item Details", collapsed: true });
    itemDtlGridContainer.add(plf.addBlankBlock({ "columnWidth": ".2" }));
    itemDtlGridContainer.add(itemDtsGridSection);

    const violationAndToolBoxDocColumn = plf.addCollapseSection({ title: "Violations / Toolbox Talks", collapsed: false });
    violationAndToolBoxDocColumn.add(violationsDtsGridSection);
    violationAndToolBoxDocColumn.add(plf.addSplitter);
    violationAndToolBoxDocColumn.add(toolBoxDtsGridSection);

    

    // Add sections to main page
    JourneyHdrFieldset1.add(plf.addStripLine({}));
    this.ptrMainSection.add(JourneyHdrFieldset1);
    this.ptrMainSection.add(JPInspSchedDtls);
    this.ptrMainSection.add(JPInspDtls);
    this.ptrMainSection.add(truckAndDriverColumn)
    journeyPlanDetailsCollapse.add(plf.addStripLine({}));
    this.ptrMainSection.add(journeyPlanDetailsCollapse);
    this.ptrMainSection.add(DriverRestDetailsColumn);
    this.ptrMainSection.add(AllocateSection);
    this.ptrMainSection.add(statusDetailsCollapse);
    this.ptrMainSection.add(violationAndToolBoxDocColumn);
    this.ptrMainSection.add(passRefDocDtl);

    // History Data Section
    this.dataHistorySectionFlag = true;

    // Event Handlers
    	this.eventHandlers = 
			[
			
				{
				"controlid":"",
				"tasktype":"onload",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"initJourneyPlanScrTS"
			},	
			{
				"controlid":"strTruckCode",
				"tasktype":"onenter",
				"input":["strTruckCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchTruckDetailsTS"
			},
			{
				"controlid":"strJourneyPlanNo",
				"tasktype":"onenter",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchJourneyPlanScrTS"
			},
			
			{
				"controlid":"strRouteCode",
				"tasktype":"onenter",
				"input":["strRouteCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchRouteDetailsTS"
			},
			/*{
				"controlid":"strJMCCode",
				"tasktype":"onenter",
				"input":["strJMCCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"onenterJmcCodeTS"
			},*/
			{
				"controlid":"strDriverCode",
				"tasktype":"onenter",
				"input":["strDriverCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchDriverDetailsTS"
			},
			{
				"controlid":"strJourneyManagerCode",
				"tasktype":"onenter",
				"input":["strJourneyManagerCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchJourneyManagerDetails"
			},
			{
				"controlid":"strJourneyCoordinatorCode",
				"tasktype":"onenter",
				"input":["strJourneyCoordinatorCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchJourneyCoordinatorDetails"
			},
			{
				"controlid":"strTrailerCode",
				"tasktype":"onenter",
				"input":["strTrailerCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchTrailerDetailsTS"
			},
			/*{
				"controlid":"strCustomerVendorCode",
				"tasktype":"onenter",
				"input":["strCustomerVendorCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchCustomerVendorTS"
			},*/
			{
				"controlid":"strInspectionNo",
				"tasktype":"onenter",
				"input":["strInspectionNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchInspectionAdviceScrTS"
			},
			/*{
				"controlid":"strWaybillNo",
				"tasktype":"onenter",
				"input":["strWaybillNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchWaybillNoScrTS"
			},
			{
				"controlid":"strWayBillNo",
				"tasktype":"onenter",
				"input":["strWayBillNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchWaybillNoTS"
			},*/
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Save",
					"input":["strJourneyPlanNo","strInspectionNo","strJourneyManagerCode","strTruckCode","strCustomerVendorCode","dtNeedDate","dtJourneyPlanDate",
					"strWaybillNo","dtROSDate","strJourneyPlanType","strJourneyCoordinatorCode","strDriverCode","strCustomerCode","strPickupPoint","strDriverCompliance",
					"strTruckCompliance","strLoadCompliance","iRiskAssessmentScore","strStatus","strRouteCode","strManualPlan","dtDepatureDate","tmDepartureTime","strNightDriveApproval","strApprovalReason","strApproverName","strCommentsForDriver","strPassengerName","strPassengerRemarks","strToolBoxTalks","strTransitLocation","strJourneyMode",
					"strRiskAssessmentScore","strCommodity","strTrailerCode","strNightDriveApproval","dtDepartureDate","dtDepartureTime","strOrigin","strDestination","planDetails",
					"passengerDetails","toolBoxTalksDetails","referenceDetails","manualplanDetails","itemDetails","strFileAttach","strFileAttach1","violationDetails","strRepDriverCode","strBLDistance","strBLWeight","strBLRemarks","strFuelReq","strFuelChitNo","strFcnNo","strJMCCode",
                     "strAllocate","strSupUploadDoc","strActionBy","stActionDtTm","strAllocateReason"
                      ],
					"service":"CoreJourneyPlanService",
					"methodName":"modifyJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strJourneyPlanNo","strInspectionNo","strJourneyManagerCode","strTruckCode","strCustomerVendorCode","dtNeedDate","dtJourneyPlanDate",
					"strWaybillNo","dtROSDate","strJourneyPlanType","strJourneyCoordinatorCode","strDriverCode","strCustomerCode","strPickupPoint","strDriverCompliance",
					"strTruckCompliance","strLoadCompliance","iRiskAssessmentScore","strStatus","strRouteCode","strManualPlan","dtDepatureDate","tmDepartureTime","strNightDriveApproval","strApprovalReason",
					"strApproverName","strCommentsForDriver","strPassengerName","strPassengerRemarks","strToolBoxTalks","strTransitLocation","strJourneyMode",
					"strRiskAssessmentScore","strCommodity","strTrailerCode","strNightDriveApproval","dtDepartureDate","dtDepartureTime","strOrigin","strDestination","planDetails",
					"passengerDetails","toolBoxTalksDetails","referenceDetails","manualplanDetails","itemDetails","strFileAttach","strFileAttach1","violationDetails"],
					"service":"CoreJourneyPlanService",
					"methodName":"createJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strJourneyPlanNo"],
					"service":"CoreJourneyPlanService",
					"methodName":"deleteJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Confirm",
					"input":["strJourneyPlanNo","strInspectionNo","strJourneyManagerCode","strTruckCode","strCustomerVendorCode","dtNeedDate","dtJourneyPlanDate",
					"strWaybillNo","dtROSDate","strJourneyPlanType","strJourneyCoordinatorCode","strDriverCode","strCustomerCode","strPickupPoint","strDriverCompliance",
					"strTruckCompliance","strLoadCompliance","iRiskAssessmentScore","strStatus","strRouteCode","strManualPlan","dtDepatureDate","tmDepartureTime","strNightDriveApproval","strApprovalReason",
					"strApproverName","strCommentsForDriver","strPassengerName","strPassengerRemarks","strToolBoxTalks","strTransitLocation","strJourneyMode",
					"strRiskAssessmentScore","strCommodity","strTrailerCode","strNightDriveApproval","dtDepartureDate","dtDepartureTime","strOrigin","strDestination","planDetails",
					"passengerDetails","toolBoxTalksDetails","referenceDetails","manualplanDetails","itemDetails","strFileAttach","strFileAttach1","violationDetails","strRepDriverCode","strBLDistance","strBLWeight","strBLRemarks","strFuelReq","strFuelChitNo","strFcnNo","strJMCCode",
                    "strAllocate","strSupUploadDoc","strActionBy","stActionDtTm","strAllocateReason"],
					"service":"CoreJourneyPlanService",
					"methodName":"authorizeJourneyPlanTS"
					
				},
				/*
			{	
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Print Release Letter",
					"input":["strJourneyPlanNo","strInspectionNo","strJourneyManagerCode","strTruckCode","strCustomerVendorCode","dtNeedDate","dtJourneyPlanDate",
					"strWaybillNo","dtROSDate","strJourneyPlanType","strJourneyCoordinatorCode","strDriverCode","strCustomerCode","strPickupPoint","strDriverCompliance",
					"strTruckCompliance","strLoadCompliance","iRiskAssessmentScore","strStatus","strRouteCode","strManualPlan","dtDepatureDate","tmDepartureTime","strNightDriveApproval","strApprovalReason",
					"strApproverName","strCommentsForDriver","strPassengerName","strPassengerRemarks","strToolBoxTalks","strTransitLocation","strJourneyMode",
					"strRiskAssessmentScore","strCommodity","strTrailerCode","strNightDriveApproval","dtDepartureDate","dtDepartureTime","strOrigin","strDestination","planDetails",
					"passengerDetails","toolBoxTalksDetails","referenceDetails","manualplanDetails","itemDetails","strFileAttach","strFileAttach1","violationDetails","strRepDriverCode"],
					"service":"CoreJourneyPlanService",
					"methodName":"ReleaseJourneyPlanTS"
			},*/
            //69640
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Short-Close",
					"input":["strJourneyPlanNo","strWaybillNo","strTruckCode","strDriverCode","strTrailerCode","strFileAttach","strFileAttach1","violationDetails"],
					"service":"CoreJourneyPlanService",
					"methodName":"shortcloseJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Reject",
					"input":["strJourneyPlanNo","strInspectionNo","strTruckCode","strDriverCode","strTrailerCode","strFileAttach","strFileAttach1","violationDetails"],
					"service":"CoreJourneyPlanService",
					"methodName":"rejectJourneyPlanTS"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Waybill",
				"input":["strLoadNo"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillloadingReport"
			},
            {
			    "controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Inspection",
				"input":["strInspectionNo","strInspectionType"],
				"service":"CoreReportService",
				"methodName":"PrintVehicleInspectReport"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print JP",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"PrintJourneyPlanReport"
			},
			{       
				"controlid":"cmn_btnsubmit",
				"tasktype":"btnclick",
				"input":["strTruckCode","dtDepartureDate","tmDepartureTime","strRouteCode","strFileAttach","strFileAttach1","strWaybillNo","violationDetails"],
			    "service":"CoreJourneyPlanService",
				"methodName":"createPlanScheduleTS"
			},
			{
				"controlid":"strManualPlan",
				"tasktype":"onchange",
				"input":["strManualPlan"],
				"service":"CoreJourneyPlanService",
				"methodName":"onchange_manualplan"
			},
			{
				
					"tasktype":"proto",
					"filename":"jm_master/JourneyPlan.json"
			},
			{
					"controlid":"strRepDriverCode",
					"tasktype":"onenter",
					"input":["strRepDriverCode"],
					"service":"CoreJourneyPlanService",
					"methodName":"fetchJPDriverDetTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Diversion Letter",
				"input":["strLoadNo"],
				"service":"CoreReportService",
				"methodName":"JpPrintDiversionReport"
			},
			{       
				"controlid":"strValidateDriverRest",
				"tasktype":"btnclick",
				"input":["strRepDriverCode","strJourneyPlanNo","strDriverCode","dtDepartureDate","strRouteCode","strManualPlan"],
			    "service":"CoreJourneyPlanService",
				"methodName":"validateDriverRestTS"
			}
			
			];

    this.hlpLinks=
		{
			"jpno":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyPlanNo","child":"JOURNEY_PLAN_NO"}
							]
				},			
			"waybillno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.LoadBuildingHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strWaybillNo","child":"LOAD_NO"}
							]
				},	
				
			"driver":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""},
                                                 {"direct":"DRIVER_AC","child":"strContext"}//74993
						   ],
					"receive":[
							{"parent":"strRepDriverCode","child":"DRIVER_CODE"},
							{"parent":"strRepDriverName","child":"DRIVER_NAME"},	
							{"parent":"strRepMobileNo","child":"PHONE_NO"},
							]
				},
				"journeyManagerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.EmployeeHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"Tran","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strJourneyManagerCode","child":"EMPLOYEE_CODE"},
							{"parent":"strJourneyManagerName","child":"EMPLOYEE_NAME"}
							]
				},
				"journeyCoordinatorCode":
				{

					"hlpType":"Header",
					"hlpScreen":"jm_master.EmployeeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyCoordinatorCode","child":"EMPLOYEE_CODE"},
							{"parent":"strJourneyCoordinatorName","child":"EMPLOYEE_NAME"}
							]
				},
				"truckCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTruckCode","child":"TRUCK_CODE"},
							{"parent":"strTruckDescription","child":"TRUCK_DESC"}
							]
				},
				"trailerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTrailerCode","child":"TRUCK_CODE"},
							{"parent":"strTrailerDescription","child":"TRUCK_DESC"}
							]
				},
				/*"customerVendor":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerVendorHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCustomerVendorCode","child":"CUST_VENDOR_CODE"},
							{"parent":"strCustomerVendorName","child":"CUST_VENDOR_NAME"},
							{"parent":"strCustomerCode","child":"CUST_CODE"},
							{"parent":"strCustomerName","child":"CUST_NAME"}
							]
				},*/
				"routeCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.RouteHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"ROUTE_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strRouteCode","child":"ROUTE_CODE"},
							{"parent":"strRouteDescription","child":"JOURNEYLEGS"},
							{"parent":"strOrigin","child":"INTRANSIT_ORIGIN"},
							{"parent":"strDestination","child":"INTRANSIT_DEST"},
							{"parent":"strJMCCode","child":"JMC_CODE"}
							]
				},
				"inspectionno":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.InspectionHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strInspectionNo","child":"INSPECTION_NO"}
							]
				}/*,
				//for 75145
				 "reportingTrailerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"VEHICLE_AC","child":"strContext"}//74993
						   ],
					"receive":[
							{"parent":"strTrailerCode","child":"TRUCK_CODE"}
							]
				}*/
		}

    // Screen modes
    this.screenModes = {
      "open-ins": {
        "enableAll": true,
        "except": ["strTruckCode", "strDriverCode"]
      },
      "locked": {
        "enableAll": false,
        "except": ["strJourneyPlanNo"]
      }
    };

    this.callParent([]);
  }
}