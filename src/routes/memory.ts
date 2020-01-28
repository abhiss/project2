const router = require("express").Router();
const { Post, Comment, User } = require("../models/");
const withAuth = require("../controllers/auth");

router.get("/", (req, res) => {
    Post.findAll({
        include: [User]
    })
        .then(posts => {
            res.render("all-posts", { posts });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get("/post/:id", (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [User]
            }
        ]
    })
        .then(post => {
            if (post) {
                res.render("single-post", { post });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get("/dashboard", withAuth, (req, res) => {
    Post.findAll({
        where: {
            userId: req.session.userId
        }
    })
        .then(posts => {
            res.render("all-posts-admin", {
                layout: "dashboard",
                posts
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect("login");
        });
});

router.get("/dashboard/new", withAuth, (req, res) => {
    res.render("new-post", {
        layout: "dashboard"
    });
})

router.get("/dashboard/edit/:id", withAuth, (req, res) => {
    Post.findByPk(req.params.id)
        .then(post => {
            if (post) {
                res.render("edit-post", {
                    layout: "dashboard",
                    post
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post("/post", withAuth, (req, res) => {
    const body = req.body;
    console.log(req.session.userId);
    Post.create({ ...body, userId: req.session.userId })
        .then(newPost => {
            res.json(newPost);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put("/post/:id", withAuth, (req, res) => {
    Post.update(req.body, {
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

router.delete("/post/:id", withAuth, (req, res) => {
    Post.destroy({
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

module.exports = router;
