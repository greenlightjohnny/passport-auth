const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

///User model, mongoose
//Using capital because it is a class
const User = require("../models/User");
const expressEjsLayouts = require("express-ejs-layouts");

///Encrypt password
const saltRounds = 10;

///Login page
router.get("/login/", (req, res) => res.render("login"));

/// Register/signup page
router.get("/register/", (req, res) => res.render("register"));

///Register submit handle from client,
router.post("/register/", (req, res) => {
  //de-structure post body
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //Check to see if all forms filled out

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  ///Check for password match
  if (password !== password2) {
    errors.push({ msg: "Passwords are not the same" });
  }

  ////Check password Length
  if (password.length < 6) {
    errors.push({ msg: "Password is not long enough, six characters or more" });
  }
  /////If errors
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    ///if no validation, send data to MongoDB using mongoose model. Checks mongooseDB for username to make sure not registered. findONe returns a promise
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Username/email already exists, try another" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        //if there is no registered email encrypt password
        // console.log(process.env.MY_SALT);
        // const epass = bcrypt.genSalt(saltRounds, (err, salt) => {
        //   bcrypt.hash(password, process.env.MY_SALT, (err, hash) => {
        //     console.log("44444444", epass);
        //   });
        // });
        // console.log(epass);
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //sets the User object password to the hash that you created
            newUser.password = hash;
            ///save the user after the password change
            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "Thanks for registering!");
                res.redirect("/users/login/");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

module.exports = router;
