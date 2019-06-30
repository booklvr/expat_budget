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

//show login form
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/budget",
        failureRedirect: "/login"
    }), (req, res) => {
});



// router.get("/budget", (req, res) => {
//     res.render("budget");
// })



module.exports = router;
