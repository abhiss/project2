"use strict";
exports.__esModule = true;
var User = require("../models/User");
var bcrypt = require("bcryptjs");
var secret = require("../config/keys").secret;
function default_1(app) {
    app.get("/signup", function (req, res) {
        res.render("signup", {});
    });
    app.post("/user", function (req, res) {
        User.findOne({ where: { username: req.body.username } }).then(function (user) {
            console.log(user);
            if (user) {
                var error = "Username exists in database.";
                return res.status(400).json(error);
            }
            else {
                var newUser_1 = new User({
                    username: req.body.username,
                    password: req.body.password
                });
                bcrypt.genSalt(10, function (err, salt) {
                    if (err)
                        throw err;
                    bcrypt.hash(newUser_1.password, salt, function (err, hash) {
                        if (err)
                            throw err;
                        newUser_1.password = hash;
                        newUser_1
                            .save()
                            .then(function (user) {
                            var payload = {
                                id: user.id,
                                username: user.username
                            };
                            req.session.userId = payload.id;
                            req.session.username = payload.username;
                            res.send(200);
                        });
                    });
                });
            }
        });
    });
    app.post("/login", function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                var errors = void 0;
                errors.username = "No Account Found";
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password).then(function (isMatch) {
                if (isMatch) {
                    console.log("in");
                    var payload = {
                        id: user.id,
                        username: user.username
                    };
                    req.session.userId = payload.id;
                    req.session.username = payload.username;
                    res.status(200).json(payload.id);
                }
                else {
                    var errors = {
                        password: ''
                    };
                    errors.password = "Password is incorrect";
                    res.status(500).json(errors);
                }
            });
        });
    });
    app.post("/logout", function (req, res) {
        if (req.session) {
            req.session.destroy(function (i) { });
            res.status(204).send("User has been logged out");
        }
        else {
            res.status(404).send("User not signed in");
        }
    });
    app["delete"]("/user/:id", function (req, res) {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (affectedRows) {
            if (affectedRows > 0) {
                res.status(200).end();
            }
            else {
                res.status(404).end();
            }
        })["catch"](function (err) {
            res.status(500).json(err);
        });
    });
}
exports["default"] = default_1;
