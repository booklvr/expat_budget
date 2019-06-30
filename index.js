var express             = require("express"),
    path                = require("path"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override");
    User                = require("./models/user");



// requiring routes
var authRoutes = require("./routes/auth"),
    budgetRoutes = require("./routes/budget");

// CONFIGURE APP

//configure mongooose
var url = process.env.DATABASEURL || "mongodb://localhost:27017/expat_budget";
mongoose.connect(url, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false); // so that i can insert into income and expense array


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "expat budget app!",
    resave: false,
    saveUninitialized: false
}));
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

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", authRoutes);
app.use("/budget", budgetRoutes);
// app.use("/budget", budgetRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, process.env.IP, () => {
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit');
});

