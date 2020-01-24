"use strict";
exports.__esModule = true;
var express = require("express");
var htmlRoutes_1 = require("./routes/htmlRoutes");
var cors = require("cors");
var path = require("path");
var app = express();
var PORT = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));
app.use(cors());
htmlRoutes_1["default"](app);
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT);
});
