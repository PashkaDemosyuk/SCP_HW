sap.ui.define([
    "company_display/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    'jquery.sap.global',
    'sap/ui/model/Filter',
    "sap/ui/core/Fragment"
], function (BaseController, JSONModel, jQuery, Filter, Fragment) {
    "use strict";

    var TableController = BaseController.extend("company_display.controller.Home", {

        /**
         *  Hook for initializing the BaseController
         */
        onInit: function () {
        },

        onItemSelected: function (oEvent) {

            var oSelectedItem = oEvent.getSource();
            var context = encodeURIComponent(oSelectedItem.getBindingContext('companies').getPath());
            this.getRouter().navTo("details", {companyID: context});

        },

        showCreateDialog: function () {
            var oView = this.getView();
            if (!this.byId("createDialog")) {
                Fragment.load({
                    id: oView.getId(),
                    name: "company_display.view.Create",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                this.byId("createDialog").open();
            }
        },
        createFridge: function(){
            var NewCompanyName = sap.ui.getCore().byId("NewCompanyName").getValue();
            console.log(NewCompanyName);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://p2001096821trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Companies",
                "method": "POST",
                "headers": {
                  "Content-Type": "application/json",
                },
                "processData": false,
                "data": "{\n   \"name\":\"" + NewCompanyName + "\"\n}"
              }
              
              $.ajax(settings).done(function (response) {
                console.log(response);
              });
        },
        closeDialog: function () {
            this.getView().byId("createDialog").close();
        },

        onSearch: function (oEvt) {

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