"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var htmlRoutes_1 = require("./routes/htmlRoutes");
var cors = require("cors");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname + '/public')));
app.use(cors());
htmlRoutes_1["default"](app);
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT);
});
