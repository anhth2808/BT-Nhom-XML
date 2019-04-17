const express = require("express");
const xml2json = require("xml2js");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();


app.set("view engine", "pug");
app.set("views", "views");



// routes

const adminRoutes = require('./routes/admin');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//

app.use("/", adminRoutes)





app.listen(3000);