const express = require("express");
const router = express.Router();

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
    res.send("Passed");
  }
  ///
  console.log("POST req", req.body);

  res.send(errors.msg);
});

module.exports = router;
