sap.ui.define([
	"company_display/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	'jquery.sap.global',
	'sap/ui/model/Filter'
], function (BaseController, JSONModel, jQuery, Filter) {
	"use strict";

	var TableController = BaseController.extend("company_display.controller.Home", {

		/**
		 *  Hook for initializing the BaseController
		 */
		onInit : function () {	
		},

		onItemSelected: function(oEvent) {

			var oSelectedItem = oEvent.getSource();
			var context = encodeURIComponent(oSelectedItem.getBindingContext('companies').getPath());
			this.getRouter().navTo("details",  {companyID: context});
            
		},

		onSearch : function (oEvt) {

			// add filter for search
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("name", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var list = this.byId("companyList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		}
	});

	return TableController;
});