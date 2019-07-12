var express = require("express");
var router = express.Router();
var middlewareObj = require("../middleware");
var budgetHelper = require("./helpers/budgetHelper");


//Index -- Show current budget
router.get("/", middlewareObj.isLoggedIn, (req, res) => {
    // Get user's budget from DB
    // User.findById(req.user._id, {}, (err, userData) => {
    //     const data = budgetHelper.populateData(userData);

    //     // console.log(totalsObject);
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.render("budget", {userData: userData, data: data});
    //     }
    // });

    //maybe use try catch instead of if else not sure yet. but it works. :)
    try {
        User.findById(req.user._id, {}, (err, userData) => {
            const data = budgetHelper.populateData(userData);
            res.render("budget", {userData: userData, data: data});

        });
    }
    catch (err) {
        return err;
    }
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


router.put('/:id', (req, res) => {

    console.log(req.params.id);
    // User.findById(req.user.id, function(err, event) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(event.income[0].item);
    //     }
    // });

    User.findById(req.user.id, function(err, event) {
        var type = req.body.inc_or_exp;
        if (err) {
            console.log(err);
        } else {

            for (var i = 0; i < event[type].length; i++) {
                console.log(event[type][i]._id);

                if (event[type][i]._id == req.params.id) {
                    console.log("match");
                    event[type][i].item = req.body.item;
                    event[type][i].price = req.body.price;
                    event.save(function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('/budget');
                        }
                    });
                    return;
                }
            }
            console.log("not found");





        }
    });

    // var modify = {};
    // modify.name = "tutor";
    // modify.price = "10000";


    // console.log("item id: " + req.params.id);

    // var id = req.params.id;

    // User.findByIdAndUpdate(

    //     id,
    //     { $set: modify},
    //     {new: true},
    //     function (err, model) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log('success');
    //             console.log(model);
    //         }
    //     }
    // );


    // User.update(
    //     obj,
    //     { '$set': {
    //         [obj]: 'fuck'
    //     }},
    //     {safe: true, upsert: true},
    //     function(err, model) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(model);
    //             res.redirect('/budget')
    //         }
    //     }
    // )


    // User.update(
    // {emp_no: req.body.emp_no, 'skills._id': 123},
    // {'$set': {
    //     'skills.$.startDate': req.body.startDate
    // }},
    // function(err, numAffected) {...}
// );

    // User.findByIdAndUpdate(
    //     { _id: req.user._id },

    // )
});

router.delete('/:id', (req, res) => {

    var obj = {};
    obj[req.body.inc_or_exp] = { _id: req.params.id };

    User.findByIdAndUpdate(
        { _id: req.user._id },
        // { "$pull": { "income": { "_id": req.params.id } }},
        { "$pull": obj},
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
