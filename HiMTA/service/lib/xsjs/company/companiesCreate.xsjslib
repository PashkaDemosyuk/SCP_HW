/**
 @param {connection} Connection - The SQL connection used in the OData request
 @param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
 @param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
 */

const _TOJSON = $.import('xsjs.company', 'toJSON').toJSON;
const toJSON = new _TOJSON();
const COMPANY_TABLE = "HiMTA::Company";
const COMPANY_ID = "HiMTA::compid";



function companiesCreate(param) {
    var after = param.afterTableName;

    //Get Input New Record Values
    var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

    var oCompanyItems = toJSON.recordSetToJSON(oResult, "items");
    var oCompany = oCompanyItems.items[0];
    $.trace.error(JSON.stringify(oCompany));

    //Get Next Personnel Number
    pStmt = param.connection.prepareStatement(`select "${COMPANY_ID}".NEXTVAL from dummy`);
    var result = pStmt.executeQuery();

    while (result.next()) {
        oCompany.id = result.getString(1);
    }

    $.trace.error(JSON.stringify(oCompany));
    pStmt.close();
    //Insert Record into DB Table and Temp Output Table
    for (var i = 0; i < 2; i++) {
        var pStmt;
        if (i < 1) {
            pStmt = param.connection.prepareStatement(`insert into "${COMPANY_TABLE}" values(?,?,?,?)`);
        } else {
            pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"");
            pStmt.executeUpdate();
            pStmt.close();
            pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?,?,?)");
        }
        pStmt.setString(1, oCompany.id.toString());
        pStmt.setString(2, oCompany.name.toString());
        pStmt.setTimestamp(3, (new Date()).toISOString());
        pStmt.setTimestamp(4, (new Date()).toISOString());
        pStmt.executeUpdate();
        pStmt.close();
    }
}

