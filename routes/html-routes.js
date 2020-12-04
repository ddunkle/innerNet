// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", isAuthenticated, (req, res) => {
    // If the user already has an account send them to the members page
      db.Post.findAll({
        where: {
          UserId: req.user.id
        }
      }).then(function (dbPost) {
        res.render("home");
      })
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/");
    }
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    if (req.user) {
      return res.redirect("/");
    }
    res.render("signup");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("home");
  });
};