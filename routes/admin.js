const express = require("express");
const router = express.Router();

const nhanvienCtrl = require("../controllers/nhanvien");
const chucvuCtrl = require("../controllers/chucvu");
const phongbanCtrl = require("../controllers/phongban");
const hdldCtrl = require("../controllers/hdld");


// /
router.get("/", nhanvienCtrl.getIndex);
// ===================NhanVien=======================
// /nhanviens
router.get("/nhanviens", nhanvienCtrl.getNhanViens);

// /nhanviens/:MaNV
router.get("/nhanviens/:MaNV", nhanvienCtrl.getNhanVien);

// /add-nhanvien
router.get("/add-nhanvien", nhanvienCtrl.getAddNhanVien);
router.post("/add-nhanvien", nhanvienCtrl.postAddNhanVien);

// /edit-nhanvien
router.get("/edit-nhanvien/:MaNV", nhanvienCtrl.getEditNhanVien);
router.post("/edit-nhanvien", nhanvienCtrl.postEditNhanVien);

// /delete-nhanvien
router.post("/delete-nhanvien", nhanvienCtrl.postDeleteNhanVien);


// ===================CHUCVU=======================
// /chucvus
router.get("/chucvus", chucvuCtrl.getChucVus);

// /add-chucvu
router.get("/add-chucvu", chucvuCtrl.getAddChucVu);
router.post("/add-chucvu", chucvuCtrl.postAddChucVu);

// /edit-chucvu
router.get("/edit-chucvu/:MaCV", chucvuCtrl.getEditChucVu);
router.post("/edit-chucvu", chucvuCtrl.postEditChucVu);

// /delete-chucvu
router.post("/delete-chucvu", chucvuCtrl.postDeleteChucVu);

// ===================PHONGBAN=======================
// /phongbans
router.get("/phongbans", phongbanCtrl.getPhongBans)
// /add-phongban
router.get("/add-phongban", phongbanCtrl.getAddPhongBan);
router.post("/add-phongban", phongbanCtrl.postAddPhongBan);

// /edit-phongban
router.get("/edit-phongban/:MaPB", phongbanCtrl.getEditPhongBan);
router.post("/edit-phongban", phongbanCtrl.postEditPhongBan);

// /delete-phongban
router.post("/delete-phongban", phongbanCtrl.postDeletePhongBan);

// ===================HDLD=======================
// /hdlds
router.get("/hdlds", hdldCtrl.getHDLDs);

// 
router.get("/test");


module.exports = router;