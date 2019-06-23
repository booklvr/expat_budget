var express = require("express");
var router = express.Router();

// roote route
router.get("/", (req, res) => {
    res.render("landing");
});

module.exports = router;
