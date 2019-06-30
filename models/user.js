var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    income: [{
        item: String,
        price: String
    }],
    expenses: [{
        item: String,
        price: String,
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
