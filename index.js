var express = require("express");

const app = express();


// requiring routes
var authRoutes = require("./routes/auth");


// CONFIGURE APP
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));

app.use("/", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, process.env.IP, () => {
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit');
});

