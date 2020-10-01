const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const mainRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const { MongoURI } = require("./config/keys");
const passport = require("passport");
const app = express();
require("dotenv").config();
const passsport = require("passport");
require("./config/passport")(passport);

const mongURI = process.env.MONGO_URI;

/// EJS middleware
app.use(expressLayouts);
//Set view engine
app.set("view engine", "ejs");

///Body parser middleware this is for POST/PUT requests, parsing JSON into JS objects that were sent to the server by the client.You don't need for GET or DELETE requests.
// a. express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());

// b. express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

/////express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

////Passport middleware!
app.use(passport.initialize());
app.use(passport.session());

///Connect flash middleware!
app.use(flash());

///set global vars for??
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//Routes!
app.use("/", mainRoutes);
app.use("/users", userRoutes);

////Connect to the database
mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => console.log("WE have connection to the DB"))
  .catch((err) => console.log("%%%%%%%%%app.js", err));
///Connect to the DB

const PORT = process.env.port || 5000;
app.listen(PORT, console.log(`running on port ${PORT}`));
