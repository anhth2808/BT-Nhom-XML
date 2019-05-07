const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();

// setting view
app.set("view engine", "pug");
app.set("views", "views");
app.set('port', process.env.PORT || 3000);
// routes
const adminRoutes = require('./routes/admin');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser("secret"));
app.use(session({cookie: {maxAge: 60000}}));
app.use(flash());
//



app.use((req, res, next) => {
    // res.locals.alert = JSON.stringify(req.flash("alert"));
    res.locals.alert = req.flash("alert")[0];
    next();
})

app.use("/", adminRoutes)


app.listen(app.get('port'));