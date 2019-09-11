const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();

const errorCtrl = require("./controllers/error");


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
    res.locals.alert = req.flash("alert")[0];
    res.locals.searchResult = req.flash("searchResult");
    next();
})

app.use("/", adminRoutes)

app.get("/500", errorCtrl.get500);

app.use(errorCtrl.get404);

// catch errors
app.use((error, req, res, next) => {
    // res.redirect("/500");
    console.log(error);
    res.status(500).render('500', { 
        pageTitle: 'Error',
        path: "/500"
    });
})

app.listen(app.get('port'));