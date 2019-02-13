var statementConstructor = function () {

    this.createPreparedInsertStatement = function (sTableName, oValueObject) {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };
        let sColumnList = '', sValueList = '';

        Object.keys(oValueObject).forEach(value => {
            sColumnList += `"${value}",`;
            oResult.aParams.push(value);
        });

        Object.values(oValueObject).forEach(value => {
            sValueList += "?, ";
            oResult.aValues.push(value);
        });

        // Remove the last unnecessary comma and blank
        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `insert into "${sTableName}" (${sColumnList}) values (${sValueList})`;

        $.trace.error("sql to insert: " + oResult.sql);
        return oResult;
    };

    this.createPreparedUpdateStatement = function (sTableName, oValueObject) {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };
        let sColumnList = '', sValueList = '';

        Object.keys(oValueObject).forEach(value => {
            sColumnList += `"${value}",`;
            oResult.aParams.push(value);
        });

        Object.values(oValueObject).forEach(value => {
            sValueList += "?, ";
            oResult.aValues.push(value);
        });

        // Remove the last unnecessary comma and blank
        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `UPDATE "${sTableName}" SET "name"='${oValueObject.name}' WHERE "compid"=${oValueObject.compid};`;

        $.trace.error("sql to update: " + oResult.sql);
        return oResult;
    };

};


var company = function (connection) {

    const statementConstructorLib = new statementConstructor();

    const COMPANY_TABLE = "HiMTA::Company";
    const OFFICE_TABLE = "HiMTA::ExtraInfo.Office";
    const WORKERS_TABLE = "HiMTA::ExtraInfo.Workers";
    /*
            const COMPANY = $.session.securityContext.companyInfo.familyName ?
                $.session.securityContext.companyInfo.familyName + " " + $.session.securityContext.companyInfo.givenName :
                $.session.getCompanyname().toLocaleLowerCase(),
    */

    function getNextval(sSeqName) {

        const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;

        const result = connection.executeQuery(statement);

        if (result.length > 0) {
            return result[0].ID;
        } else {
            throw new Error('ID was not generated');
        }
    }

    this.doGet = function () { //this.doGet = function (obj) {

        const result = connection.executeQuery('SELECT * FROM "HiMTA::Company"');

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };


    this.doPost = function (oCompany) {

        //Get Next ID Number
        oCompany.compid = getNextval("HiMTA::compid");

        //generate query
        const statement = statementConstructorLib.createPreparedInsertStatement(COMPANY_TABLE, oCompany);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oCompany));
    };


    this.doPut = function (oCompany) {
        //generate query
        let sql="";

        sql = `UPDATE "${COMPANY_TABLE}" SET "name"='${oCompany.name}' WHERE "compid"=${oCompany.compid};`;
        $.trace.error("sql to update: " + sql);

        //execute update
        connection.executeUpdate(sql);
        connection.commit();

        $.response.status = $.net.http.OK;
        $.response.setBody('Company updated');
    };


    this.doDelete = function (oCompany) {

        let statement = `DELETE FROM "${OFFICE_TABLE}" WHERE "compid"=${oCompany.compid};`;
        $.trace.error("sql to delete: " + statement);
        connection.executeUpdate(statement);

        statement = `DELETE FROM "${WORKERS_TABLE}" WHERE "compid"=${oCompany.compid};`;
        $.trace.error("sql to delete: " + statement);
        connection.executeUpdate(statement);

        statement = `DELETE FROM "${COMPANY_TABLE}" WHERE "compid"=${oCompany.compid};`;
        connection.executeUpdate(statement);

        connection.commit();

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };
};
