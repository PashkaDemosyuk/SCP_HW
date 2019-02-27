sap.ui.define([
    "company_display/controller/BaseController",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (BaseController, History, JSONModel, MessageToast) {
    "use strict";
    return BaseController.extend("company_display.controller.CompanyDetails", {

        onInit: function () {
            var oRouter = this.getRouter();
            oRouter.getRoute("details").attachPatternMatched(this._onObjectMatched, this);

            this._showFormFragment('Display');
            this._toggleButtonsAndView('Display');
        },

        _formFragments: {},

        _showFormFragment: function (sFragmentName) {
            var oPage = this.byId("page");

            oPage.removeAllContent();
            oPage.insertContent(this._getFormFragment(sFragmentName));
        },

        _getFormFragment: function (sFragmentName) {

            var oFormFragment = this._formFragments[sFragmentName];

            if (oFormFragment) {
                return oFormFragment;
            }

            var oFormFragment = sap.ui.xmlfragment("company_display.view." + sFragmentName);
            this._formFragments[sFragmentName] = oFormFragment;

            return this._formFragments[sFragmentName];
        },

        handleEditPress: function () {
            this._showFormFragment('Change');
            this._toggleButtonsAndView('Edit');
        },

        _toggleButtonsAndView: function (bEdit) {
            var oMdl = new JSONModel();
            if (bEdit === 'Edit') {
                oMdl.loadData("./model/editMode.json");
            } else {
                oMdl.loadData("./model/displayMode.json");
            }

            this.getView().setModel(oMdl);
        },

        handleCancelPress: function () {
            this._toggleButtonsAndView('Display');
        },

        handleSavePress: function () {
            var Compid = sap.ui.getCore().byId("id").getText();
            console.log(Compid);
            var Name = sap.ui.getCore().byId("name").getValue();
            console.log(Name);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://p2001096821trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Companies('" + Compid + "')",
                "method": "PUT",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false,
                "data": "{\"name\": \"" + Name + "\",  \"update_date\":null, \"create_date\":null}"
            };
            $.ajax(settings).done(function (response) {
                console.log(response);
            });

            this._toggleButtonsAndView('Display');
           window.location.reload();

            //MessageToast.show("Company was changed Please reload page");
        },

        handleDeletePress: function () {
            var Compid = sap.ui.getCore().byId("idText").getText();
            console.log(Compid);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://p2001096821trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/company/company.xsjs?compid=",
                "method": "DELETE",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false,
                "data": "{\n   \"compid\":\"" + Compid + "\"\n}"
            };
            $.ajax(settings).done(function (response) {
                console.log(response);

            });
            this.onNavBack();
            window.location.reload();
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