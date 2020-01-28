import * as express from 'express'
const { Memory, User } = require("../models");
import * as bcrypt from 'bcryptjs'
import * as path from 'path';
const { secret } = require("../config/keys");
// const withAuth = require("../routes/auth");

const withAuth = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect("/");
    } else {
        next();
    }
};

export default function (app: express.Application) {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/signin.html"))
    });

    app.get("/home", withAuth, (req, res) => {
        if (!req.session.userId) {
            res.redirect("/");
        } else {
            res.sendFile(path.join(__dirname + "/../public/home.html"))
        }
    });

    app.get("/text", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/text.html"))
    });

    app.get("/createaccount", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/signup.html"))
    });

    app.post("/post", (req, res) => {
        const body = req.body;
        console.log(req.session.userId);
        Memory.create({ ...body, userId: req.session.userId })
            .then(newMemory => {
                res.json(newMemory);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    });

    app.post("/user", (req, res) => {
        User.findOne({ where: { email: req.body.email } }).then(email => {
            console.log(email);
            if (email) {
                let error = "Email exists in database.";
                return res.status(400).json(error);
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                const payload = {
                                    id: user.id,
                                    username: user.username
                                };
                                req.session.userId = payload.id;
                                req.session.username = payload.username;
                                res.send(200);
                            });
                    })
                });
            }
        });
    });


    // app.get("/login", (req, res) => {
    //     res.render("login", {});
    // });

    app.post("/signin", (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({ where: { email } }).then(user => {
            if (!user) {
                let errors: { email: string; };
                errors.email = "No Account Found";
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    console.log("in")
                    const payload = {
                        id: user.id,
                        username: user.username
                    };
                    req.session.userId = payload.id;
                    req.session.username = payload.username;
                    res.status(200).json(payload.id);
                } else {
                    let errors = {
                        password: ''
                    };
                    errors.password = "Password is incorrect";
                    res.status(500).json(errors);
                }
            });
        });
    });

    app.post("/signout", (req, res) => {
        if (req.session) {
            req.session.destroy(i => { });
            res.sendStatus(204).send("User has been logged out");
            // req.session.cookie.expires = new Date().getTime();
        } else {
            res.sendStatus(404).send("User not signed in");
        }
    });

    app.delete("/user/:id", (req, res) => {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(affectedRows => {
                if (affectedRows > 0) {
                    res.status(200).end();
                } else {
                    res.status(404).end();
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
    });

}