const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports.registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.gentSalt();
  } catch {}
};
