const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mainRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const app = express();

/// EJS middleware
app.use(expressLayouts);
//Set view engine
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

//Routes!
app.use("/", mainRoutes);
app.use("/users", userRoutes);

const PORT = process.env.port || 5000;
app.listen(PORT, console.log(`running on port ${PORT}`));
