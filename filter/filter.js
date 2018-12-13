
var convert = require('../util/convert');
var moment = require("moment");
var service = require('../service/publish_service');

module.exports = (function () {

    var guest = {};

    var init = function () {
        guest = {};
        guest.id = 10001;
        guest.status = 0;
        guest.name = 'Guest';
        guest.role = 10000;
        guest.access = ['article'];
    };

    var indexOf = (list, element) => list.indexOf(element);

    var before = function (req, res, next) {
        console.log('[%s] %s %s', moment().format("YYYY-MM-DD HH:mm:ss.SSS"), req.method, req.url);

        req.navex = (req.cookies.navex == null) ? 'true' : req.cookies.navex;
        if (req.method == 'GET') {
            req.page = convert.int(req.query.page, 1);
            req.limit = convert.int(req.query.limit, 10);
        } else if (req.method == 'POST') {
            req.page = convert.int(req.body.page, 1);
            req.limit = convert.int(req.body.limit, 10);
        }

        if (req.session.user == null || req.session.user.id == null) {
            req.session.user = guest;
        }

        req.has = indexOf;

        // res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        next();
    };


    var after = function (req, res, next) {
        next();
    };

    var login_filter = function (req, res, next) {
        console.log(moment().format("YYYY-MM-DD HH:mm:ss.SSS") + ' load_menu');
        next();
    };

    init();

    return {
        before: before,
        after: after,
    }
})();
