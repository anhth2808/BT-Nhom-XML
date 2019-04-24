const express = require("express");
const router = express.Router();

const adminCtrl = require("../controllers/admin");



// /employees => GET
router.get("/", adminCtrl.getIndex);
router.get("/nhanviens", adminCtrl.getNhanViens);

// /employee => GET
router.get("/nhanviens/:MaNV", adminCtrl.getNhanVien);


// /add-employee => GET
router.get("/add-nhanvien", adminCtrl.getAddNhanVien);

// /add-employee => POST
router.post("/add-nhanvien", adminCtrl.postAddNhanVien);


// /edit-employee => GET
router.get("/edit-employee");

// /edit-employee => POST
router.post("/edit-employee");

// /employees => GET
router.get("/delete-employee");


// 
router.get("/test", adminCtrl.postAddNhanVien);


module.exports = router;