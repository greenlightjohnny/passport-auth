module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "You must be logged into view");
    res.redirect("/users/login/");
  },
};
