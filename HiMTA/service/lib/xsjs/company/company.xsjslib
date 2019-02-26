const COMPANY_TABLE = "HiMTA::Company";
const OFFICE_TABLE = "HiMTA::ExtraInfo.Office";
const WORKERS_TABLE = "HiMTA::ExtraInfo.Workers";
const COMPANY_ID = "HiMTA::compid";
var statementConstructor = function () {

    this.createPreparedInsertStatement = function (sTableName, oValueObject) {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };
        let sColumnList = '', sValueList = '';

        var currentDate = new Date();

        for (let key in oValueObject) {
            sColumnList += `"${key}",`;
            oResult.aParams.push(key);
            sValueList += "?, ";
            oResult.aValues.push(oValueObject[key]);
        }
        ;

        sColumnList += `"${create_date}",`;
        oResult.aParams.push(create_date);
        sValueList += "?, ";
        oResult.aValues.push(currentDate);

        sColumnList += `"${update_date}",`;
        oResult.aParams.push(update_date);
        sValueList += "?, ";
        oResult.aValues.push(currentDate);

        // Remove the last unnecessary comma and blank
        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `insert into "${sTableName}" (${sColumnList}) values (${sValueList})`;

        $.trace.error("sql to insert: " + oResult.sql);
        return oResult;
    };

    this.createPreparedUpdateStatement = function (sTableName, oValueObject) {
        let sql = `UPDATE "${sTableName}" SET `;

        for (let key in oValueObject) {
            if (key != 'compid') {
                sql += `"${key}"='${oValueObject[key]}', `
            }
        }
        ;

        sql = sql.slice(0, -2);
        sql += ` WHERE "compid"='${oValueObject.compid}';`;
        return sql;
    };

};


var company = function (connection) {

    const statementConstructorLib = new statementConstructor();


    function getNextval(sSeqName) {

        const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;
        const result = connection.executeQuery(statement);

        if (result.length > 0) {
            return result[0].ID;
        } else {
            throw new Error('ID was not generated');
        }
    }

    this.doGet = function () {
        const result = connection.executeQuery('SELECT * FROM "' + COMPANY_TABLE + '"');

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };


    this.doPost = function (oCompany) {

        //Get Next ID Number
        oCompany.compid = getNextval(COMPANY_ID);

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
        const statement = statementConstructorLib.createPreparedUpdateStatement(COMPANY_TABLE, oCompany);

        $.trace.error("sql to update: " + statement);
        //execute update
        connection.executeUpdate(statement);
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
