var express = require("express");
var router = express.Router();


//Index -- Show current budget
router.get("/", (req, res) => {
    res.send("You made it to this page");
});


module.exports = router;
