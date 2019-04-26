const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// setting view
app.set("view engine", "pug");
app.set("views", "views");
app.set('port', process.env.PORT || 3000);
// routes
const adminRoutes = require('./routes/admin');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//
app.use("/", adminRoutes)


app.listen(app.get('port'));