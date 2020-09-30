const express = require("express");
const router = express.Router();

///Login page
router.get("/login/", (req, res) => res.send("login"));

/// Register/signup page
router.get("/register/", (req, res) => res.send("register"));

module.exports = router;
