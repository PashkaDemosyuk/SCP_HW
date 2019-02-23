jQuery.sap.registerPreloadedModules({version:"2.0",name:"company_display/Component-preload",modules:{"company_display/Component.js":'sap.ui.define(["sap/ui/core/UIComponent"],function(t){"use strict";return t.extend("Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments),this.getRouter().initialize()}})});',"company_display/controller/BaseController.js":'sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent"],function(o,t,e){"use strict";return o.extend("company_display.controller.BaseController",{getRouter:function(){return e.getRouterFor(this)},onNavBack:function(){var o,e;o=t.getInstance(),e=o.getPreviousHash(),void 0!==e?window.history.go(-1):this.getRouter().navTo("app",{},!0)}})});',"company_display/controller/CompanyDetails.controller.js":'sap.ui.define(["company_display/controller/BaseController","sap/ui/core/routing/History","jquery.sap.global","sap/m/MessageToast"],function(e,t,a,n){"use strict";return e.extend("company_display.controller.CompanyDetails",{onInit:function(){this.getRouter().getRoute("details").attachPatternMatched(this._onObjectMatched,this),this._showFormFragment("Display"),this.byId("edit").setEnabled(!0)},_formFragments:{},_showFormFragment:function(e){var t=this.byId("page");t.removeAllContent(),t.insertContent(this._getFormFragment(e))},_getFormFragment:function(e){var t=this._formFragments[e];if(t)return t;var t=sap.ui.xmlfragment("company_display.view."+e);return this._formFragments[e]=t,this._formFragments[e]},handleEditPress:function(){this._showFormFragment("Change"),this._toggleButtonsAndView(!0)},_toggleButtonsAndView:function(e){var t=this.getView();t.byId("edit").setVisible(!e),t.byId("save").setVisible(e),t.byId("cancel").setVisible(e),t.byId("delete").setVisible(!e),this._showFormFragment(e?"Change":"Display")},handleCancelPress:function(){this._toggleButtonsAndView(!1)},handleSavePress:function(){var e=sap.ui.getCore().byId("id").getText();console.log(e);var t=sap.ui.getCore().byId("name").getValue();console.log(t);var a={async:!0,crossDomain:!0,url:"https://p2001096821trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Companies(\'"+e+"\')",method:"PUT",headers:{"content-type":"application/json"},processData:!1,data:\'{"name": "\'+t+\'",  "update_date":null, "create_date":null}\'};$.ajax(a).done(function(e){console.log(e)}),this._toggleButtonsAndView(!1),n.show("Company was changed Please reload page")},handleDeletePress:function(){var e=sap.ui.getCore().byId("idText").getText();console.log(e);var t={async:!0,crossDomain:!0,url:"https://p2001096821trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/company/company.xsjs?compid=",method:"DELETE",headers:{"content-type":"application/json"},processData:!1,data:\'{\\n   "compid":"\'+e+\'"\\n}\'};$.ajax(t).done(function(e){console.log(e)}),this.onNavBack()},_onObjectMatched:function(e){this.getView().bindElement({path:decodeURIComponent(e.getParameter("arguments").companyID),model:"companies"})},onNavBack:function(){var e,a;e=t.getInstance(),a=e.getPreviousHash(),void 0!==a?window.history.go(-1):this.getRouter().navTo("home",{},!0)}})});',"company_display/controller/Home.controller.js":'sap.ui.define(["company_display/controller/BaseController","sap/ui/model/json/JSONModel","jquery.sap.global","sap/ui/model/Filter","sap/ui/core/Fragment"],function(e,o,t,a,n){"use strict";return e.extend("company_display.controller.Home",{onInit:function(){},onItemSelected:function(e){var o=e.getSource(),t=encodeURIComponent(o.getBindingContext("companies").getPath());this.getRouter().navTo("details",{companyID:t})},showCreateDialog:function(){var e=this.getView();this.byId("createDialog")?this.byId("createDialog").open():n.load({id:e.getId(),name:"company_display.view.Create",controller:this}).then(function(o){e.addDependent(o),o.open()})},createFridge:function(){var e=sap.ui.getCore().byId("NewCompanyName").getValue();console.log(e);var o={async:!0,crossDomain:!0,url:"https://p2001096821trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Companies",method:"POST",headers:{"Content-Type":"application/json"},processData:!1,data:\'{\\n   "name":"\'+e+\'"\\n}\'};$.ajax(o).done(function(e){console.log(e)})},closeDialog:function(){this.getView().byId("createDialog").close()},onSearch:function(e){var o=[],t=e.getSource().getValue();if(t&&t.length>0){var n=new a("name",sap.ui.model.FilterOperator.Contains,t);o.push(n)}this.byId("companyList").getBinding("items").filter(o,"Application")}})});',"company_display/initMockServer.js":'sap.ui.define([],function(){"use strict";sap.ui.require(["sap/ui/core/ComponentSupport"])});',"company_display/view/Change.fragment.xml":'<core:FragmentDefinition\n        xmlns="sap.m"\n        xmlns:l="sap.ui.layout"\n        xmlns:f="sap.ui.layout.form"\n        xmlns:core="sap.ui.core"><VBox class="sapUiSmallMargin"><f:SimpleForm id="SimpleFormChangeColumn_oneGroup234"\n                      editable="true"\n                      layout="ColumnLayout"\n                      columnsM="2"\n                      columnsL="3"\n                      columnsXL="4"\n        ><f:content><Label text="{i18n>companyListTitle}"/><Text id="id" text="{companies>compid}"/><Input id="name" value="{companies>name}"/></f:content></f:SimpleForm></VBox></core:FragmentDefinition>',"company_display/view/Create.fragment.xml":'<core:FragmentDefinition\r\n   xmlns="sap.m"\r\n   xmlns:core="sap.ui.core"\r\n   xmlns:l="sap.ui.layout" ><Dialog title="Create new company" id="createDialog"><Panel width="100%"><l:VerticalLayout><l:content><Label text="Company Name" width="300px" labelFor="newBrandNameInput"/><Input id="NewCompanyName" width="300px" required="true"/><Button text="Create" type="Accept" width="300px" press=".createFridge"/><Button text="Cancel" type="Reject" width="300px" press=".closeDialog"/></l:content></l:VerticalLayout></Panel></Dialog></core:FragmentDefinition>',"company_display/view/Display.fragment.xml":'<core:FragmentDefinition\n        xmlns="sap.m"\n        xmlns:l="sap.ui.layout"\n        xmlns:f="sap.ui.layout.form"\n        xmlns:core="sap.ui.core"><VBox class="sapUiSmallMargin"><f:SimpleForm id="SimpleFormDisplayColumn_oneGroup234"\n                      editable="false"\n                      layout="ColumnLayout"\n                      columnsM="2"\n                      columnsL="3"\n                      columnsXL="4"\n        ><f:content><Label text="{i18n>companyIdTitle}"/><Text id="idText" text="{companies>compid}"/><Label text="{i18n>companyListTitle}"/><Text id="nameText" text="{companies>name}"/><Label text="{i18n>update_dateListTitle}"/><Text id="updtateText" text="{companies>update_date}"/><Label text="{i18n>companyListTitle}"/><Text id="createText" text="{companies>create_date}"/></f:content></f:SimpleForm></VBox></core:FragmentDefinition>',"company_display/view/Details.view.xml":'<mvc:View\n        controllerName="company_display.controller.CompanyDetails"\n        xmlns="sap.m"\n        xmlns:mvc="sap.ui.core.mvc"\n        xmlns:f="sap.ui.layout.form"\n        busyIndicatorDelay="0"><Page\n            id="page"\n            title="{i18n>PageTitle}"\n            showNavButton="true"\n            navButtonPress=".onNavBack"\n            class="sapUiResponsiveContentPadding"><customHeader><Bar><contentRight><Button id="edit" text="Edit" enabled="false" press="handleEditPress"/><Button id="save" text="Change" type="Accept" visible="false" press="handleSavePress"/><Button id="cancel" text="Cancel" visible="false" press="handleCancelPress"/></contentRight><contentRight><Button id="delete" text="Delete" type="Reject" press="handleDeletePress"/></contentRight></Bar></customHeader></Page></mvc:View>\n',"company_display/view/Home.view.xml":'<mvc:View\n        controllerName="company_display.controller.Home"\n        displayBlock="true"\n        xmlns="sap.m"\n        xmlns:l="sap.ui.layout"\n        xmlns:mvc="sap.ui.core.mvc"\n        xmlns:semantic="sap.f.semantic"><Shell><App id="home"><pages><Page\n                        showHeader="false"\n                        enableScrolling="true"\n                        class="sapUiContentPadding"><subHeader><Toolbar><SearchField\n                                    liveChange=".onSearch"\n                                    width="100%"/></Toolbar></subHeader><content><List id="companyList"\n                              headerText="{i18n>companyListTitle}"\n                              growing="true"\n                              growingThreshold="10"\n                              items="{\n\t\t\t\t\t\t\tpath: \'companies>/Companies\'\n\t\t\t\t\t\t\t}"\n                        ><items><StandardListItem title="{companies>name}"\n                                                  info="Updated on: {companies>update_date}"\n                                                  description="Created on: {companies>create_date}"\n                                                  type="Navigation"\n                                                  press=".onItemSelected"\n                                /></items></List></content><footer><OverflowToolbar width="100%" height="46px" design="Auto" enabled="true" visible="true"><content><ToolbarSpacer width=""/><Button text="Change" type="Accept" press="showCreateDialog" iconFirst="true" width="auto" enabled="true" visible="true" iconDensityAware="false"/></content></OverflowToolbar></footer></Page></pages></App></Shell></mvc:View>\n',"company_display/i18n/i18n.properties":"\n# List Area\n#List Title\ncompanyListTitle=About Company\ncompanyIdTitle=Id Company\nupdate_dateTitle=update date\ncreate_dateTitle=create date\n\n#XFLD: Label for company Name\ncompanyNameLabelText=name\n\n#XFLD: Label for First Name\nupdateOnLabelText=Update On\n\n#XFLD: Label for Last Name\ncreateLabelText=Create On\n\n#Form Area\nPageTitle=company Details\nformname=name\n","company_display/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"company_display","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"dataSources":{"xsoDataService":{"uri":"https://p2001096821trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"company_display.view.Home","type":"XML","async":true,"id":"home"},"dependencies":{"minUI5Version":"1.48.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"company_display.i18n.i18n"}},"companies":{"dataSource":"xsoDataService"}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"company_display.view","controlId":"home","controlAggregation":"pages","transition":"slide","async":true},"routes":[{"pattern":"","name":"Home","target":"app"},{"pattern":"details","name":"Details","target":"details"},{"pattern":"details/{companyID}","name":"details","target":"details"}],"targets":{"app":{"viewId":"app","viewName":"Home","viewLevel":1},"details":{"viewId":"details","viewName":"Details","viewLevel":1}}}}}'}});