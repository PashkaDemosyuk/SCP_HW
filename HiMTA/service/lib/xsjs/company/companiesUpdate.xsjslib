/**
 @param {connection} Connection - The SQL connection used in the OData request
 @param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
 @param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
 */

const COMPANY_TABLE = "HiMTA::Company";
const CURR_TIMESTAMP = "current_timestamp";
const _TOJSON = $.import('xsjs.company', 'toJSON').toJSON;
const toJSON = new _TOJSON();

function companiesUpdate(param) {
    var after = param.afterTableName;
    var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();
    var oCompanyItems = toJSON.recordSetToJSON(oResult, "items");
    var oCompany = oCompanyItems.items[0];
    var uStmt;
    uStmt = param.connection.prepareStatement(`UPDATE "${COMPANY_TABLE}" SET "name"='${oCompany.name}', "update_date"=${CURR_TIMESTAMP} WHERE "compid"=${oCompany.compid}`);
    uStmt.executeQuery();

}
