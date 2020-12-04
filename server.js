// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const exphbs = require('express-handlebars');
const path = require("path");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");
// Creating express app and configuring middleware needed for authentication
const app = express();

//Declaring Express to use Handlerbars template engine with main.handlebars as
//the default layout
// Added partials directory
const hbs = exphbs.create({
  defaultLaout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),

  // Helper functions
  // helpers: {
  //   items: function(value, options) {
  //     return "<li>" + options.fn({ : value }) + "<li>";
  //   }
  // }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
