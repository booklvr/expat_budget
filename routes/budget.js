var express = require("express");
var router = express.Router();
var middlewareObj = require("../middleware");


//Index -- Show current budget
router.get("/", middlewareObj.isLoggedIn, (req, res) => {
    // Get user's budget from DB
    // User.findById(req.user.id).populate("income").exec((err, foundIncome) => {
    //     if (err)
    // })
    User.findById(req.user._id, {}, (err, userData) => {
        if (err) {
            console.log(err);
        } else {
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

router.delete('/:id', (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.user._id },
        { "$pull": { "income": { "_id": req.params.id } }},
        { safe: true, multi:true },
        function(err, obj) {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/budget')
            }
    });

    // User.findByIdAndRemove(req.user._id.income.req.params.id, (err) => {
    //     if (err) {
    //         console.log("you fucked up deleting ");
    //         res.redirect("/budget");
    //     } else {
    //         res.redirect("/budget");
    //     }
    // });
});


module.exports = router;
