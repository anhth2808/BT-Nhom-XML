const express = require("express");
const router = express.Router();

const nhanvienCtrl = require("../controllers/nhanvien");
const chucvuCtrl = require("../controllers/chucvu");
const phongbanCtrl = require("../controllers/phongban");
const hdldCtrl = require("../controllers/hdld");


// /index => GET
router.get("/", nhanvienCtrl.getIndex);
// ===================NhanVien=======================
// /nhanviens => GET
router.get("/nhanviens", nhanvienCtrl.getNhanViens);

// /nhanviens/:MaNV => GET
router.get("/nhanviens/:MaNV", nhanvienCtrl.getNhanVien);

// /add-nhanvien => GET
router.get("/add-nhanvien", nhanvienCtrl.getAddNhanVien);
// /add-nhanvien => POST
router.post("/add-nhanvien", nhanvienCtrl.postAddNhanVien);

// /edit-nhanvien/:MaNV => GET
router.get("/edit-nhanvien/:MaNV", nhanvienCtrl.getEditNhanVien);
// /edit-nhanvien => POST
router.post("/edit-nhanvien", nhanvienCtrl.postEditNhanVien);

// /delete-nhanvien => POST
router.post("/delete-nhanvien", nhanvienCtrl.postDeleteNhanVien);


// ===================CHUCVU=======================
// /chucvus => GET
router.get("/chucvus", chucvuCtrl.getChucVus);

// /add-chucvu => GET
router.get("/add-chucvu", chucvuCtrl.getAddChucVu);
// /add-chucvu => POST
router.post("/add-chucvu", chucvuCtrl.postAddChucVu);

// /edit-chuvu => GET
router.get("/edit-chucvu/:MaCV", chucvuCtrl.getEditChucVu);
// /edit-chuvu => POST
router.post("/edit-chucvu", chucvuCtrl.postEditChucVu);

// ===================PHONGBAN=======================
// /phongbans => GET
router.get("/phongbans", phongbanCtrl.getPhongBans)



// ===================HDLD=======================
// /hdlds => GET
router.get("/hdlds", hdldCtrl.getHDLDs)

// 
router.get("/test");


module.exports = router;