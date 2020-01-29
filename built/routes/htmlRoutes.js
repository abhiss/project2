"use strict";
exports.__esModule = true;
var path = require("path");
var request = require("request");
function default_1(app) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/signin.html"));
    });
    app.post('/test', function (req, res) {
        var data = req.body.test;
        request.post({
            headers: { 'content-type': 'application/json' },
            url: 'http://69.4.155.132:45545/sendfile', body: JSON.stringify({ data: data, name: 'test23' })
        }, function (error, response, body) {
            console.log(error, '\n\n\n', response, '\n\n\n', body);
        });
        res.json('success');
    });
}
exports["default"] = default_1;
