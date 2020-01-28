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
var router = require("express").Router();
var _a = require("../models/"), Post = _a.Post, Comment = _a.Comment, User = _a.User;
var withAuth = require("../controllers/auth");
router.get("/", function (req, res) {
    Post.findAll({
        include: [User]
    })
        .then(function (posts) {
        res.render("all-posts", { posts: posts });
    })["catch"](function (err) {
        res.status(500).json(err);
    });
});
router.get("/post/:id", function (req, res) {
    Post.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [User]
            }
        ]
    })
        .then(function (post) {
        if (post) {
            res.render("single-post", { post: post });
        }
        else {
            res.status(404).end();
        }
    })["catch"](function (err) {
        res.status(500).json(err);
    });
});
router.get("/dashboard", withAuth, function (req, res) {
    Post.findAll({
        where: {
            userId: req.session.userId
        }
    })
        .then(function (posts) {
        res.render("all-posts-admin", {
            layout: "dashboard",
            posts: posts
        });
    })["catch"](function (err) {
        console.log(err);
        res.redirect("login");
    });
});
router.get("/dashboard/new", withAuth, function (req, res) {
    res.render("new-post", {
        layout: "dashboard"
    });
});
router.get("/dashboard/edit/:id", withAuth, function (req, res) {
    Post.findByPk(req.params.id)
        .then(function (post) {
        if (post) {
            res.render("edit-post", {
                layout: "dashboard",
                post: post
            });
        }
        else {
            res.status(404).end();
        }
    })["catch"](function (err) {
        res.status(500).json(err);
    });
});
router.post("/post", withAuth, function (req, res) {
    var body = req.body;
    console.log(req.session.userId);
    Post.create(__assign(__assign({}, body), { userId: req.session.userId }))
        .then(function (newPost) {
        res.json(newPost);
    })["catch"](function (err) {
        res.status(500).json(err);
    });
});
router.put("/post/:id", withAuth, function (req, res) {
    Post.update(req.body, {
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
router["delete"]("/post/:id", withAuth, function (req, res) {
    Post.destroy({
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
module.exports = router;
