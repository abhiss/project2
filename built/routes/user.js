"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var _a = require("../models"), Memory = _a.Memory, User = _a.User;
var bcrypt = require("bcryptjs");
var path = require("path");
var secret = require("../config/keys").secret;
var withAuth = function (req, res, next) {
    if (!req.session.userId) {
        res.redirect("/");
    }
    else {
        next();
    }
};
function default_1(app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/signin.html"));
    });
    app.get("/home", withAuth, function (req, res) {
        if (!req.session.userId) {
            res.redirect("/");
        }
        else {
            res.sendFile(path.join(__dirname + "/../public/home.html"));
        }
    });
    app.get("/text", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/text.html"));
    });
    app.get("/createaccount", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/signup.html"));
    });
    app.get("/play", function (req, res) {
        Memory.findAll({
            where: {
                userId: req.session.userId
            }
        }).then(function (memories) {
            res.json(memories);
            console.log(memories);
        });
    });
    app.post("/post", function (req, res) {
        var body = req.body;
        console.log(req.session.userId);
        Memory.create(__assign(__assign({}, body), { userId: req.session.userId }))
            .then(function (newMemory) {
            res.json(newMemory);
        })["catch"](function (err) {
            res.status(500).json(err);
        });
    });
    app.post("/user", function (req, res) {
        User.findOne({ where: { email: req.body.email } }).then(function (email) {
            console.log(email);
            if (email) {
                var error = "Email exists in database.";
                return res.status(400).json(error);
            }
            else {
                var newUser_1 = new User({
                    username: req.body.username,
                    email: req.body.email,
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
    app.post("/signin", function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        User.findOne({ where: { email: email } }).then(function (user) {
            if (!user) {
                var errors = void 0;
                errors.email = "No Account Found";
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
    app.post("/signout", function (req, res) {
        if (req.session) {
            req.session.destroy(function (i) { });
            res.sendStatus(204).send("User has been logged out");
        }
        else {
            res.sendStatus(404).send("User not signed in");
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
