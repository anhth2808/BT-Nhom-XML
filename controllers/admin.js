const fs = require("fs");
const xml2js = require("xml2js");
const Builder = xml2js.Builder();
const parseString = xml2js.parseString;
const path = require("path");

const NhanVien = require("../models/NhanVien");
const PhongBan = require("../models/PhongBan");
const HDLD = require("../models/HDLD");
const ChucVu = require("../models/ChucVu");

exports.getIndex = (req, res, next) => {
    NhanVien.fetchAll(nhanViens => {        
        res.render("./admin/index", {
            pageTitle: 'Index',
            path: '/',
            nhanViens: nhanViens
        });
    });
}

exports.getNhanViens = (req, res, next) => {
    NhanVien.fetchAll(nhanViens => {
        res.render("./admin/nhanvien-list", {
            pageTitle: 'Danh sách nhân viên',
            path: '/nhanviens',
            nhanViens: nhanViens
        });
    });
    
};


exports.getNhanVien = (req, res, next) => {
    const MaNV = req.params.MaNV;

    NhanVien.findById(MaNV, nhanVien => {
        // console.log("nhanVien:", nhanVien);

        PhongBan.findById(nhanVien.MaPB, phongBan => {
            // console.log(phongBan);

            ChucVu.findById(nhanVien.MaCV, chucVu => {
                // console.log(chucVu);
                
                HDLD.findById(nhanVien.MaHDLD, hdld => {
                    // console.log(hdld);

                    res.render("./admin/nhanvien-detail", {
                        pageTitle: nhanVien.TenNV,
                        path: '/nhanviens',
                        nhanVien: nhanVien,
                        phongBan: phongBan,
                        chucVu: chucVu,
                        hdld: hdld
                    });
                });
            
            });

        });

    });
    
};

exports.getAddNhanVien = (req, res, next) => {
    res.render("./admin/nhanvien-add");
}

exports.postAddNhanVien = (req, res, next ) => {

    // const TenNV = req.body.TenNV,
    //     DiaChi = req.body.TenNVDiaChi,
    //     NgaySinh = req.body.TenNVNgaySinh,
    //     GioiTinh = req.body.TenNVGioiTinh,
    //     DanToc = req.body.TenNVDanToc,
    //     TonGiao = req.body.TenNVTonGiao,
    //     CMND = req.body.TenNVCMND;

    // const MaHDLD = req.body.MaHDLD, 
    //     NgayBatDau = req.body.NgayBatDau, 
    //     NgayKetThuc = req.body.NgayKetThuc, 
    //     HeSoLuong = req.body.HeSoLuong;

    // nhanVien.save();
    // const nhanVien = new NhanVien(null, TenNV, DiaChi, NgaySinh, GioiTinh, DanToc, TonGiao, CMND, MaPB, MaCV, null);
    
    const nhanVien = new NhanVien(null, 
        "Trần Hoàng A", 
        "61/8, ĐTN, VP, Nha Trang, Khánh Hòa, Việt Nam, Trái Đất, Vũ trụ 7", 
        "1998-08-28", 
        "Nam", 
        "Kinh", 
        "Không", 
        "0383096008", 
        "MaPB1", 
        "MaCV0", 
        null);

    nhanVien.save().then((result) => {
        const hdld= new HDLD(result.MaHDLD, "1998-08-28", "1998-08-28", 12);
        hdld.save();
        console.log(hdld);
    });
     
    // hdld.save();

    // const MaPB = req.body.TenNVMaPB;
    // const MaCV = req.body.TenNVMaCV;
    // const MaHDLD = req.body.TenNVMaHDLD; 
    // res.redirect("/");
    res.send("..");
}

