const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model ==> untuk CRUD
const User = require("../../models/User.js");

// @route POST api/users
// @desc Register All new users
// @access Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // Simple Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: " Please enter all fields" });
  }
  // Check for existing user, by email
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User sudah ada" });

    // Klo user tidak ada
    const newUser = new User({
      name,
      email,
      password,
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        // Simpan new user
        newUser.password = hash;
        newUser.save().then((user) => {
          // Membuat token
          jwt.sign({ id: user.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;

            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          });
        });
      });
    });
  });
});

module.exports = router;
