/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016        69997                         Addition of var  	
1.0.2     steffie           18/4/2016         71908                    Amend Jp details	                                   
************************************************************************************************/
Ext.define('CueTrans.view.journey_management.JourneyPlanHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.screenName = "Journey Plan Help";
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		//Journey Summary Addtion
		//var jpSummary = Ext.create("CueTrans.view.journey_management.JPSummary")
		
		//mainpage.ptrMainSection.add(jpSummary)
		//Journey Search Section Begins
		plf.columns=3
		var helpOnJourneyHdrCollapse = plf.addColumnSection({title:"", collapsed: false}); 		//69997
	 	var helpOnJourneyFormCtrl=								//69997
		[
			plf.addText({"label":"Journey Plan No",id:"strJourneyPlanNoFrom","anywhereSearch":"true"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Date Type",id:"strDateType"}),	
			plf.addDate({"label":"Journey Date From",id:"dtJourneyDateFrom"}),
			plf.addDate({"label":"Journey Date To",id:"dtJourneyDateTo"}),
			
			plf.addText({"label":"Vehicle Code",id:"strTruckCode"}),
			plf.addText({"label":"Driver Code",id:"strDriverCode"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"}),	
			plf.addText({"label":"Load No",id:"strLoadNo"}),
			plf.addBlank(),
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."}),
		]
		
		helpOnJourneyHdrCollapse.add(helpOnJourneyFormCtrl);
		//Journey Search Section Ends
		
		//Journey Grid Section Begins
		var helpOnJourneyGridFieldObj=					//69997
		[
			
			//{columnname:"C",width:20,linkId:"journeyPlanRecreate"},
			{columnname:"Journey Plan No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:100},
			{columnname:"Journey Plan Date",dataname:"JOURNEY_PLAN_DT",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ROUTE_ORIGIN",datatype:"string",width:110},
			{columnname:"Destination",dataname:"ROUTE_DEST",datatype:"string",width:110},
			{columnname:"Vehicle Code",dataname:"TRUCK_CODE",datatype:"string",width:100},
			{columnname:"Vehicle Description",dataname:"TRUCK_DESC",datatype:"string",width:150},
			//{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:100},
			{columnname:"Driver Name",dataname:"DRIVER_CODE",datatype:"string",width:110},//DRIVER_NAME
			{columnname:"Driver Phone No",dataname:"PHONE_NO",datatype:"string",width:100},
			{columnname:"Journey Manager Name",dataname:"EMPLOYEE_NAME",datatype:"string",width:110},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:80},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
			{columnname:"Carrier",dataname:"CARRIER_CODE",datatype:"string",width:80},  /*71908   changes starts */
			//{columnname:"Contract No",dataname:"TRUCK_CONTRACT_NO",datatype:"string",width:80},
			{columnname:"Load No",dataname:"WAYBILL_NO",datatype:"string",width:80},
			{columnname:"Driver Licence",dataname:"LICENCE_NO",datatype:"string",width:80},
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:80},
			{columnname:"Reporting Driver",dataname:"REPORTING_DRIVER",datatype:"string",width:100},
			{columnname:"Reporting Vehicle",dataname:"REPORTING_VEHICLE",datatype:"string",width:100} /*71908   changes ends */
			
		
		]
		var helpOnJourneyGridDtl=							//69997
		{
			title:"Journey Plan Help",
			id:"journeySearch",
	        detail:helpOnJourneyGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
	   }
		helpGridSection = plf.addGrid(helpOnJourneyGridDtl,this)
		mainpage.hlpSearchGridPtr = helpGridSection
		//Driver Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnJourneyHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreJourneyPlanService",
				"methodName":"initJourneyPlanSummaryTS"
			},	
		{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strJourneyPlanNoFrom","dtJourneyDateFrom","dtJourneyDateTo","strDriverCode","strTruckCode","strStatus","strLoadNo","strDateType"],
			    "service":"CoreJourneyPlanService",
				"methodName":"fetchAllJourneyDetailsTS"
			},
			{
				
					"tasktype":"proto",
					"filename":"jm_master/journeyplanhlp.json"
			}			
		/*{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strDriverCodeFrom","strDriverCodeTo","strDriverName","str3plOwnerName","strDriverType","strLicenceType"],
			    "service":"CoreDriveService",
				"methodName":"fetchAllDriverDetailsTS"
			}*/
			
		];
		
		this.callParent(arguments);
		
	}
});
