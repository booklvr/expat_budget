var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override");
    User                = require("./models/user");



// requiring routes
var authRoutes = require("./routes/auth");


// CONFIGURE APP

//configure mongooose
var url = process.env.DATABASEURL || "mongodb://localhost:27017/expat_budget";
mongoose.connect(url, {useNewUrlParser: true});


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride("_method"));

// PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) => {
//     res.locals.currentUser = req.user;
//     res.locals.error = req.flash("error");
//     res.locals.success = req.flash("success");
//     next();
// });

app.use("/", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, process.env.IP, () => {
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit');
});

