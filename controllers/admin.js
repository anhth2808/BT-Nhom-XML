const fs = require("fs");
const xml2js = require("xml2js");
const Builder = xml2js.Builder();
const parseString = xml2js.parseString;
const path = require("path");

const NhanVien = require("../models/NhanVien");
const PhongBan = require("../models/PhongBan");
const HDLD = require("../models/HDLD");
const ChucVu = require("../models/ChucVu");

exports.getIndex = (req, res) => {
    NhanVien.fetchAll(nhanViens => {        
        res.render("./admin/index", {
            pageTitle: 'Index',
            path: '/',
            nhanViens: nhanViens
        });
    });
}

exports.getNhanViens = (req, res) => {
    NhanVien.fetchAll(nhanViens => {
        res.render("./admin/nhanvien-list", {
            pageTitle: 'Danh sách nhân viên',
            path: '/nhanviens',
            nhanViens: nhanViens
        });
    });
    
};


exports.getNhanVien = (req, res) => {
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

exports.getAddNhanVien = (req, res) => {
    res.render("./admin/nhanvien-add");
}