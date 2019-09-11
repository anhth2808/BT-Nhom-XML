const express = require("express");
const router = express.Router();

const {body} = require("express-validator");

const indexCtrl = require("../controllers/index");
const nhanvienCtrl = require("../controllers/nhanvien");
const chucvuCtrl = require("../controllers/chucvu");
const phongbanCtrl = require("../controllers/phongban");
const hdldCtrl = require("../controllers/hdld");


// /
router.get("/", indexCtrl.getIndex);
router.post("/", indexCtrl.postIndex);

// ===================NhanVien=======================
// /nhanviens
router.get("/nhanviens", nhanvienCtrl.getNhanViens);

// /nhanviens/:MaNV
router.get("/nhanviens/:MaNV", nhanvienCtrl.getNhanVien);

// /add-nhanvien
router.get("/add-nhanvien", nhanvienCtrl.getAddNhanVien);

router.post(
    "/add-nhanvien",    
    [
        body("TenNV")
            .isString()
            .isLength({min: 2})
            .trim(),
        body("DiaChi")
            .isString()
            .trim(),
        body("NgaySinh")
            .isString()
            .trim(),
        body("GioiTinh")
            .isString()
            .trim(),
        body("DanToc")
            .isString()
            .trim(),
        body("TonGiao")
            .isString()
            .trim(),
        body("CMND")
            .isString()
            .isLength({min: 5})
            .trim(),
        body("MaPB")
            .isString()
            .isLength({min: 2})
            .trim(),
        body("MaCV")
            .isString()
            .isLength({min: 2})
            .trim(),
        body("NgayBatDau")
            .isString()
            .isLength({min: 2})
            .trim(),
        body("NgayKetThuc")
            .isString()
            .isLength({min: 2})
            .trim(),
        body("HeSoLuong")
            .isFloat()
    ], 
    nhanvienCtrl.postAddNhanVien
);

// /edit-nhanvien
router.get("/edit-nhanvien/:MaNV", nhanvienCtrl.getEditNhanVien);

router.post(
    "/edit-nhanvien",
    [
        body("TenNV")
            .isString()
            .isLength({min: 2})
            .trim(),
        body("DiaChi")
            .isString()
            .trim(),
        body("NgaySinh")
            .isString()
            .trim(),
        body("GioiTinh")
            .isString()
            .trim(),
        body("DanToc")
            .isString()
            .trim(),
        body("TonGiao")
            .isString()
            .trim(),
        body("CMND")
            .isString()
            .isLength({min: 5})
            .trim(),
        body("MaPB")
            .isString()
            .isLength({min: 2})
            .trim(),
        body("MaCV")
            .isString()
            .isLength({min: 2})
            .trim(),
        body("NgayBatDau")
            .isString()
            .isLength({min: 2})
            .trim(),
        body("NgayKetThuc")
            .isString()
            .isLength({min: 2})
            .trim(),
        body("HeSoLuong")
            .isFloat()
    ], 
    nhanvienCtrl.postEditNhanVien
);

// /delete-nhanvien
router.post("/delete-nhanvien", nhanvienCtrl.postDeleteNhanVien);


// ===================CHUCVU=======================
// /chucvus
router.get("/chucvus", chucvuCtrl.getChucVus);

// /add-chucvu
router.get("/add-chucvu", chucvuCtrl.getAddChucVu);

router.post(
    "/add-chucvu",
    [
        body("TenCV", "Tên chức vụ ít nhất 5 kí tự!!")
            .isString()
            .isLength({min: 5})
            .trim(),
        body("PhuCap", "Phụ cấp phải là số!!")
            .isFloat()
    ], 
    chucvuCtrl.postAddChucVu
);

// /edit-chucvu
router.get("/edit-chucvu/:MaCV", chucvuCtrl.getEditChucVu);

router.post(
    "/edit-chucvu",
    [
        body("TenCV", "Tên chức vụ ít nhất 5 kí tự!!")
            .isString()
            .isLength({min: 5})
            .trim(),
        body("PhuCap", "Phụ cấp phải là số!!")
            .isFloat()
    ],
    chucvuCtrl.postEditChucVu
);

// /delete-chucvu
router.post("/delete-chucvu", chucvuCtrl.postDeleteChucVu);

// ===================PHONGBAN=======================
// /phongbans
router.get("/phongbans", phongbanCtrl.getPhongBans)
// /add-phongban
router.get("/add-phongban", phongbanCtrl.getAddPhongBan);

router.post(
    "/add-phongban",
    [
        body("TenPB", "Tên phòng ban có it nhất 2 ký tự")
            .isString()
            .isLength({min: 2})
    ],
    phongbanCtrl.postAddPhongBan
);

// /edit-phongban
router.get("/edit-phongban/:MaPB", phongbanCtrl.getEditPhongBan);

router.post(
    "/edit-phongban",
    [
        body("TenPB", "Tên phòng ban có it nhất 2 ký tự")
            .isString()
            .isLength({min: 2})
    ],
    phongbanCtrl.postEditPhongBan
);

// /delete-phongban
router.post("/delete-phongban", phongbanCtrl.postDeletePhongBan);

// ===================HDLD=======================
// /hdlds
router.get("/hdlds", hdldCtrl.getHDLDs);

// 
router.get("/test");


module.exports = router;