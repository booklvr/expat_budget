var express = require("express");
var router = express.Router();
var middlewareObj = require("../middleware");


//Index -- Show current budget
router.get("/", (req, res) => {
    // Get user's budget from DB
    // User.findById(req.user.id).populate("income").exec((err, foundIncome) => {
    //     if (err)
    // })
    console.log(req.user._id);
    User.findById(req.user._id, {}, (err, userData) => {
        if (err) {
            console.log(err);
        } else {
            console.log("**********************");
            console.log("user data");
            res.render("budget", {userData: userData});
        }
    });
});

router.post("/", middlewareObj.isLoggedIn, (req, res) => {

    const newBudgetItem = {
        item: req.body.item,
        price: req.body.price,
    };

    var obj = {};
    obj[req.body.inc_or_exp] = newBudgetItem;

    User.findByIdAndUpdate(
        req.user._id,
        {$push: obj},
        {safe: true, upsert: true, new: true},
        function(err, model) {
            if (err) {
                console.log(err);
            } else {
                console.log(model);
                res.redirect('/budget');
            }
    });
});


module.exports = router;
