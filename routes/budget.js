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
        if (err) {
            console.log(err);
        } else {

            for (var i = 0; i < event.income.length; i++) {
                console.log(event.income[i]._id);

                if (event.income[i]._id == req.params.id) {
                    console.log("match");
                    event.income[i].item = req.body.item;
                    event.income[i].price = req.body.price;
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
