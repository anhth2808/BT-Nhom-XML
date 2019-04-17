const express = require("express");
const router = express.Router();

const adminCtrl = require("../controllers/admin");



// /employees => GET
router.get("/", adminCtrl.getEmployees);

router.get("/employees", adminCtrl.getEmployees);

router.get("/employee", adminCtrl.getEmployee);


// /add-employee => GET
router.get("/add-employee");

// /add-employee => POST
router.post("/add-employee");

// /edit-employee => GET
router.get("/edit-employee");

// /edit-employee => POST
router.post("/edit-employee");

// /employees => GET
router.get("/delete-employee");

module.exports = router;