var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// roote route
router.get("/", (req, res) => {
    res.render("landing");
});

//show register form
router.get("/register", (req, res) => {
    res.render("register");
});

//handle register logic
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/budget");
            });
        }
    });
});


module.exports = router;
