sap.ui.define([
	"company_display/controller/BaseController",
    "sap/ui/core/routing/History",
		'jquery.sap.global'
],function (BaseController, History,  jQuery) {
	"use strict";
	return BaseController.extend("company_display.controller.CompanyDetails", {
		onInit: function(){
			var oRouter = this.getRouter();
			oRouter.getRoute("details").attachPatternMatched(this._onObjectMatched, this);

			this._showFormFragment('Display');
			this.byId('edit').setEnabled(true);
		},

		_formFragments: {},

		_showFormFragment : function (sFragmentName) {
			var oPage = this.byId("page");

			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
    },

		_getFormFragment: function (sFragmentName) {
		
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

		var	oFormFragment = sap.ui.xmlfragment("company_display.view." + sFragmentName);
	
			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},
		
		handleEditPress : function () {
			this._showFormFragment('Change');
			this._toggleButtonsAndView(true);
		},

		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			this._showFormFragment(bEdit ? "Change" : "Display");
		},

		handleCancelPress : function () {
			this._toggleButtonsAndView(false);
			
		},

		handleSavePress : function () {
	
			var Name = sap.ui.getCore().byId("name").getValue();
			console.log(Name);
			if (!Name) {
		// 		var dialog = new sap.m.Dialog({
		// 				title: 'Error',
		// 				type: 'Message',
		// 				state: 'Error',
		// 				content: new sap.m.Text({
		// 						text: 'Enter all necessarry field'
		// 				}),
		// 				beginButton: new sap.m.Button({
		// 						text: 'OK',
		// 						press: function () {
		// 								dialog.close();
		// 						}
		// 				}),
		// 				afterClose: function() {
		// 						dialog.destroy();
		// 				}
		// 		});

		// 		dialog.open();
		// }else {
			 //var oTable = getView().byId('details');
			var settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://p2001096821trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Companies('1030')",
					"method": "PUT",
					"headers": {
							"content-type": "application/json"
					},
					"processData": false,
					"data": "{\"name\": \"" + Name + "\", + \"update_date\":null, \"create_date\":null}"
			};
			$.ajax(settings).done(function (response) {
					console.log(response);
					// oTable.getModel("companies").refresh(true);
			});
			this.byId("createDialog").close();
	}

			this._toggleButtonsAndView(false);

		},

		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: decodeURIComponent(oEvent.getParameter("arguments").companyID),
				model: "companies"
			}
			);
		},


		onNavBack: function () {

			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
	  
			if (sPreviousHash !== undefined) {
			  window.history.go(-1);
			} else {
			  this.getRouter().navTo("app", {}, true);
			}
		}
	});
});