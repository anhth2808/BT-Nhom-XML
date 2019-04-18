const fs = require("fs");
const xml2js = require("xml2js");
const Builder = xml2js.Builder();
const parseString = xml2js.parseString;
const path = require("path");

const NhanVien = require("../models/NhanVien");
const PhongBan = require("../models/PhongBan");

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

        PhongBan.findById(nhanVien.MaPB[0], phongBan => {
            // console.log(phongBan);
            
            res.render("./admin/nhanvien-detail", {
                pageTitle: nhanVien.TenNV[0],
                path: '/nhanviens',
                nhanVien: nhanVien,
                phongBan: phongBan
            });
        });

    });
    
};