export { }

const withAuth = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect("/signin");
    } else {
        next();
    }
};

module.exports = withAuth;
