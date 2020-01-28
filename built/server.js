"use strict";
exports.__esModule = true;
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var sequelize = require('./config/config');
var htmlRoutes_1 = require("./routes/htmlRoutes");
var user_1 = require("./routes/user");
var auth = require('./routes/auth');
var cors = require("cors");
var path = require("path");
var app = express();
var sess = {
    secret: process.env.APP_SECRET,
    cookie: {
        secure: false
    }
};
if (app.get("env") === "production") {
    app.set("trust proxy", 1);
    sess.cookie.secure = true;
}
var PORT = process.env.PORT || 3000;
app.use(session(sess));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname + '/public')));
app.use(cors());
htmlRoutes_1["default"](app);
user_1["default"](app);
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT);
    sequelize.sync({ force: false });
});
