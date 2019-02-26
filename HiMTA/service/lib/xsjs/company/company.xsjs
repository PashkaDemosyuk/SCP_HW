const Companylib = $.import('xsjs.company', 'company').company;
const companyLib = new Companylib($.hdb.getConnection({
    treatDateAsUTC: true
}));

(function () {
    (function handleRequest() {
        try {
            switch ($.request.method) {
                case $.net.http.GET: {
                    companyLib.doGet();
                    break;
                }
                case $.net.http.PUT : {
                    companyLib.doPut(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.POST : {
                    companyLib.doPost(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.DEL : {
                    companyLib.doDelete(JSON.parse($.request.body.asString()));
                    break;
                }
                default: {
                    companyLib.doGet();
                    break;
                }
            }
        } catch (e) {
            $.response.status = $.net.http.BAD_REQUEST;
            $.response.setBody(e.message);
        }
    }());
}());