var express = require("express");
var router = express.Router();
var middlewareObj = require("../middleware");


//Index -- Show current budget
router.get("/", (req, res) => {
    // Get user's budget from DB
    // User.findById(req.user.id).populate("income").exec((err, foundIncome) => {
    //     if (err)
    // })
    res.render("budget");
});

router.post("/", middlewareObj.isLoggedIn, (req, res) => {

    const item = req.body.item;
    const price = req.body.price;
    // // const inc_or_exp = req.body.inc_or_exp;


    const newBudgetItem = {
        item: item,
        price: price,
    };

    var obj = {};
    obj[req.body.inc_or_exp] = newBudgetItem;

    console.log("user id: " + req.user._id);

    // User.findByIdAndUpdate(
    //     req.user._id,
    //     // {$push: {"income": {item: item, price: price}}},
    //     {$push: {obj}},

    //     {safe: true, upsert: true, new: true},
    //     function(err, model) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(model);
    //         }
    //     }
    // );

    User.findByIdAndUpdate(req.user._id, {$push: obj}, {safe: true, upsert: true, new: true}, function(err, model) {
        if (err) {
            console.log(err);
        } else {
            console.log(model);
            res.redirect('/budget');
        }
    });

    // User.findByIdAndUpdate({ _id: req.params._id }, { $push: { "income": newBudgetItem } }, (err, newlyCreated) => {
    //     if(err) {
    //         console.log("i didn't insert fucking anything");
    //         console.log(err);
    //     } else {
    //         console.log("I tried but I added fucking shit");
    //         console.log(newlyCreated);
    //         res.redirect("/budget");
    //     }
    // });


});


module.exports = router;
