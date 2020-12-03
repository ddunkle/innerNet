// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // -------------Passport Authentication Routing-------------
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });


  // -----------------------App Routing-----------------------
  // GET route for getting all items
  app.get("/api/items", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Item.findAll({}).then(function (dbItem) {
      // We have access to the items as an argument inside of the callback function
      res.json(dbItem);
    });
  });

  // POST route for saving a new item
  app.post("/api/toDos", function (req, res) {
    db.Post.create({
      title: req.body.titleToDo,
      category: req.body.categoryToDo,
      isActive: true,
      UserId: req.user.id
    })
      .then(function (dbPost) {
        res.json(dbPost);
      })
      .catch(function (err) {
        res.json(err)
        res.end()
      });
  });

  app.post("/api/toReads", function (req, res) {
    db.Post.create({
      title: req.body.titleToRead,
      category: req.body.categoryToRead,
      isActive: true,
      UserId: req.user.id
    })
      .then(function (dbPost) {
        res.json(dbPost);
      })
      .catch(function (err) {
        res.json(err)
      });
  });

  app.post("/api/toWatches", function (req, res) {
    db.Post.create({
      title: req.body.titleToWatch,
      category: req.body.categoryToWatch,
      isActive: true,
      UserId: req.user.id
    })
      .then(function (dbPost) {
        res.json(dbPost);
      })
      .catch(function (err) {
        res.json(err)
      });
  });

  app.post("/api/toBuys", function (req, res) {
    db.Post.create({
      title: req.body.titleToBuy,
      category: req.body.categoryToBuy,
      isActive: true,
      UserId: req.user.id
    })
      .then(function (dbPost) {
        res.json(dbPost);
      })
      .catch(function (err) {
        res.json(err)
      });
  });

  // DELETE route for deleting an item 
  app.delete("/api/items/:id", function (req, res) {
    db.Item.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbItem) {
        res.json(dbItem);
      });
  });

  app.post("/api/user_post", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });


};



